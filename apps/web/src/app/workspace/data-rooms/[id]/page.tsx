import { notFound, redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { I18nText } from '@/components/LocaleShell';

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
  return <main className="app-shell"><header className="app-header"><a className="brand" href="/">ASSETVEYRA</a><nav><a href="/workspace"><I18nText id="Workspace"/></a><a href={`/opportunities/${(room as any).opportunities?.slug}`}><I18nText id="Opportunity"/></a></nav></header><section className="page-head"><div className="eyebrow"><I18nText id="DATA ROOM"/></div><h1>{room.name}</h1><p>{(room as any).opportunities?.assets?.title || <I18nText id="Opportunity"/>} · {room.status} · {room.nda_required ? <I18nText id="NDA"/> : <I18nText id="Public information"/>}</p></section><section className="panel"><div className="panel-title"><div><div className="eyebrow"><I18nText id="Access Model"/></div><h2>{membership?.access_level || <I18nText id="Your access"/>}</h2></div><span style={{color:expired?'#efb0b0':'var(--muted)',fontSize:12}}>{expired?<I18nText id="Record unavailable."/>:membership?.expires_at?`${new Date(membership.expires_at).toLocaleString()}`:<I18nText id="No registered interests"/>}</span></div>{expired?<div className="form-error"><I18nText id="Sensitive information may require confidentiality terms."/></div>:gated?<div className="deal-gate"><div className="eyebrow"><I18nText id="NDA-gated information"/></div><h2><I18nText id="NDA"/></h2><p><I18nText id="Accept confidentiality terms when required."/></p><form action={acceptNda}><input type="hidden" name="room_id" value={id}/><button className="button primary" type="submit"><I18nText id="Request Access"/></button></form></div>:<><div className="facts"><div><span><I18nText id="NDA"/></span><strong>{room.nda_required?(nda?<I18nText id="Accepted offers and transaction records will appear here."/>:<I18nText id="Pending"/>):<I18nText id="Public information"/>}</strong></div><div><span><I18nText id="Security"/></span><strong>{room.watermark_enabled?<I18nText id="Controlled Data Room access"/>:<I18nText id="Public information"/>}</strong></div><div><span><I18nText id="Access Model"/></span><strong>{room.download_enabled?<I18nText id="Open workspace →"/>:<I18nText id="Public information"/>}</strong></div></div><div className="table" style={{marginTop:35}}>{(documents??[]).map((d:any)=><a className="row" href={`/workspace/data-rooms/${id}/documents/${d.id}`} key={d.id}><strong>{d.title}</strong><span>{d.document_type||<I18nText id="Details"/>}</span><span>v{d.version}</span><span>{d.visibility}</span><span>{room.download_enabled?<I18nText id="Open workspace →"/>:<I18nText id="Public information"/>}</span></a>)}{!(documents?.length)&&<div className="empty-state"><strong><I18nText id="No published opportunities yet"/></strong><span><I18nText id="Control document access, confidentiality gates, expiry and download policy."/></span></div>}</div></>}</section></main>;
}
