import { notFound, redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';

async function acceptNda(formData: FormData) {
  'use server';
  const roomId = String(formData.get('room_id') || '');
  const s = await createClient();
  const { data: { user } } = await s.auth.getUser();
  if (!user) redirect('/login');
  const { data: room } = await s.from('data_rooms').select('id,organization_id,opportunity_id,nda_required').eq('id', roomId).maybeSingle();
  if (!room) notFound();
  const { data: member } = await s.from('data_room_members').select('organization_id,expires_at').eq('data_room_id', roomId).eq('user_id', user.id).maybeSingle();
  if (!member || (member.expires_at && new Date(member.expires_at).getTime() <= Date.now())) throw new Error('Data-room access is not active.');
  const { data: existing } = await s.from('nda_acceptances').select('id').eq('opportunity_id', room.opportunity_id).eq('organization_id', room.organization_id).eq('user_id', user.id).maybeSingle();
  if (!existing) {
    const { error } = await s.from('nda_acceptances').insert({ opportunity_id: room.opportunity_id, organization_id: room.organization_id, user_id: user.id, accepted_at: new Date().toISOString() });
    if (error) throw new Error(error.message);
  }
  redirect(`/workspace/data-rooms/${roomId}`);
}

export default async function DataRoomDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const s = await createClient();
  const { data: { user } } = await s.auth.getUser();
  if (!user) redirect('/login');
  const { data: room } = await s.from('data_rooms').select('id,name,status,nda_required,watermark_enabled,download_enabled,organization_id,opportunity_id,opportunities(slug,assets(title))').eq('id', id).maybeSingle();
  if (!room) notFound();
  const { data: membership } = await s.from('data_room_members').select('access_level,expires_at').eq('data_room_id', id).eq('user_id', user.id).maybeSingle();
  const { data: orgMember } = await s.from('organization_members').select('organization_id,role').eq('user_id', user.id).eq('organization_id', room.organization_id).maybeSingle();
  if (!membership && !orgMember) notFound();
  const expired = membership?.expires_at ? new Date(membership.expires_at).getTime() < Date.now() : false;
  const { data: nda } = await s.from('nda_acceptances').select('id,accepted_at').eq('opportunity_id', room.opportunity_id).eq('organization_id', room.organization_id).eq('user_id', user.id).maybeSingle();
  const gated = Boolean(room.nda_required && membership && !orgMember && !nda);
  const { data: documents } = gated || expired ? { data: [] as any[] } : await s.from('documents').select('id,title,document_type,storage_path,visibility,version,created_at').eq('opportunity_id', room.opportunity_id).order('created_at', { ascending: false });
  return <main className="app-shell"><header className="app-header"><a className="brand" href="/">ASSETVEYRA</a><nav><a href="/workspace">Workspace</a><a href={`/opportunities/${(room as any).opportunities?.slug}`}>Opportunity</a></nav></header><section className="page-head"><div className="eyebrow">PRIVATE DATA ROOM</div><h1>{room.name}</h1><p>{(room as any).opportunities?.assets?.title || 'Opportunity'} · {room.status} · {room.nda_required ? 'NDA gated' : 'Open access'}</p></section><section className="panel"><div className="panel-title"><div><div className="eyebrow">ACCESS POLICY</div><h2>{membership?.access_level || 'Organization manager'}</h2></div><span style={{color:expired?'#efb0b0':'var(--muted)',fontSize:12}}>{expired?'Access expired':membership?.expires_at?`Expires ${new Date(membership.expires_at).toLocaleString()}`:'No expiry set'}</span></div>{expired?<div className="form-error">Your data-room membership has expired. No document access is granted.</div>:gated?<div className="deal-gate"><div className="eyebrow">LEGAL ACCESS GATE</div><h2>Non-disclosure agreement required</h2><p>Accept the current NDA before confidential documents become visible. Your acceptance is recorded against this opportunity and organization.</p><form action={acceptNda}><input type="hidden" name="room_id" value={id}/><button className="button primary" type="submit">Accept NDA and continue</button></form></div>:<><div className="facts"><div><span>NDA</span><strong>{room.nda_required?'Accepted':'Not required'}</strong></div><div><span>Watermark</span><strong>{room.watermark_enabled?'Enabled':'Disabled'}</strong></div><div><span>Downloads</span><strong>{room.download_enabled?'Enabled':'View only'}</strong></div></div><div className="table" style={{marginTop:35}}>{(documents??[]).map((d:any)=><div className="row" key={d.id}><strong>{d.title}</strong><span>{d.document_type||'Document'}</span><span>v{d.version}</span><span>{d.visibility}</span></div>)}{!(documents?.length)&&<div className="empty-state"><strong>No documents published to this room.</strong><span>Documents will appear after controlled disclosure.</span></div>}</div></>}</section></main>;
}
