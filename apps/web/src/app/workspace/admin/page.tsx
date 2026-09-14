import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';

const ADMIN_ROLES = ['platform_admin', 'operations_admin', 'compliance_officer'] as const;

async function act(formData: FormData) {
  'use server';
  const s = await createClient();
  const { data: claims } = await s.auth.getClaims();
  const userId = claims?.claims?.sub;
  if (!userId) redirect('/login');
  const { data: members } = await s.from('organization_members').select('organization_id,role').eq('user_id', userId);
  const allowed = (members ?? []).some(m => ADMIN_ROLES.includes(m.role as typeof ADMIN_ROLES[number]));
  if (!allowed) redirect('/workspace');
  const action = String(formData.get('action') || '');
  const id = String(formData.get('id') || '');
  if (!id) redirect('/workspace/admin?error=missing_id');

  const { data: opportunity, error: oe } = await s.from('opportunities').select('id,asset_id,status,owner_organization_id').eq('id', id).maybeSingle();
  if (!opportunity || oe) redirect('/workspace/admin?error=not_found');

  if (action === 'approve_compliance') {
    if (opportunity.status !== 'compliance_review') redirect('/workspace/admin?error=compliance_gate');
    const { error } = await s.from('opportunities').update({ status: 'approved' }).eq('id', id);
    if (error) throw new Error(error.message);
    if (opportunity.asset_id) await s.from('assets').update({ status: 'approved' }).eq('id', opportunity.asset_id);
    await s.from('audit_events').insert({ organization_id: opportunity.owner_organization_id, actor_id: userId, action: 'opportunity.compliance_approved', entity_type: 'opportunity', entity_id: id, previous_state: { status: opportunity.status }, new_state: { status: 'approved' }, metadata: {} });
  } else if (action === 'publish') {
    if (opportunity.status !== 'approved') redirect('/workspace/admin?error=publish_gate');
    const { error } = await s.from('opportunities').update({ status: 'published', visibility: 'public', published_at: new Date().toISOString() }).eq('id', id);
    if (error) throw new Error(error.message);
    if (opportunity.asset_id) {
      const { error: ae } = await s.from('assets').update({ status: 'published' }).eq('id', opportunity.asset_id);
      if (ae) throw new Error(ae.message);
    }
    await s.from('audit_events').insert({ organization_id: opportunity.owner_organization_id, actor_id: userId, action: 'opportunity.published', entity_type: 'opportunity', entity_id: id, previous_state: { status: 'approved' }, new_state: { status: 'published' }, metadata: {} });
  } else if (action === 'suspend') {
    if (!['published','approved'].includes(opportunity.status)) redirect('/workspace/admin?error=suspend_gate');
    const { error } = await s.from('opportunities').update({ status: 'suspended', visibility: 'private' }).eq('id', id);
    if (error) throw new Error(error.message);
    if (opportunity.asset_id) await s.from('assets').update({ status: 'suspended' }).eq('id', opportunity.asset_id);
    await s.from('audit_events').insert({ organization_id: opportunity.owner_organization_id, actor_id: userId, action: 'opportunity.suspended', entity_type: 'opportunity', entity_id: id, previous_state: { status: opportunity.status }, new_state: { status: 'suspended' }, metadata: {} });
  } else if (action === 'resolve_contact') {
    const { error } = await s.from('contact_submissions').update({ status: 'resolved', resolved_at: new Date().toISOString() }).eq('id', id);
    if (error) throw new Error(error.message);
  }
  redirect('/workspace/admin?updated=1');
}

export default async function AdminPage({ searchParams }: { searchParams: Promise<{ updated?: string; error?: string }> }) {
  const s = await createClient();
  const { data: claims } = await s.auth.getClaims();
  const userId = claims?.claims?.sub;
  if (!userId) redirect('/login');
  const { data: members } = await s.from('organization_members').select('organization_id,role').eq('user_id', userId);
  const allowed = (members ?? []).some(m => ADMIN_ROLES.includes(m.role as typeof ADMIN_ROLES[number]));
  if (!allowed) redirect('/workspace');
  const [{ data: opportunities }, { data: contacts }] = await Promise.all([
    s.from('opportunities').select('id,slug,status,visibility,published_at,assets(title,country_code,asking_price,currency)').order('updated_at', { ascending: false }).limit(50),
    s.from('contact_submissions').select('id,name,email,interest,message,status,created_at').order('created_at', { ascending: false }).limit(50),
  ]);
  const params = await searchParams;
  return <main className="app-shell">
    <header className="app-header"><a className="brand" href="/">ASSETVEYRA</a><nav><a href="/workspace">Workspace</a><a href="/workspace/review">Verification</a><a href="/opportunities">Marketplace</a></nav></header>
    <section className="page-head"><div className="eyebrow">OPERATIONS CONTROL</div><h1>Platform operations.</h1><p>Verification, compliance and publication are separate controlled gates. Contact requests are retained for operational follow-up.</p></section>
    {params.updated && <section className="panel"><strong>Change recorded.</strong></section>}
    {params.error && <section className="panel"><strong>Action blocked by the control gate.</strong></section>}
    <section className="panel"><h2>Opportunity control</h2><div className="table">{(opportunities ?? []).map((o: any) => <div className="row" key={o.id} style={{display:'grid',gap:10}}>
      <div><strong>{o.assets?.title || o.slug}</strong><div style={{color:'var(--muted)',fontSize:11,marginTop:5}}>{o.status} · {o.visibility} · {o.assets?.country_code || '—'}</div></div>
      <span>{o.assets?.asking_price ? `${o.assets.asking_price} ${o.assets.currency || ''}` : 'Price pending'}</span>
      <div style={{display:'flex',gap:8,flexWrap:'wrap'}}>
        {o.status === 'compliance_review' && <form action={act}><input type="hidden" name="action" value="approve_compliance"/><input type="hidden" name="id" value={o.id}/><button className="button primary">Approve compliance</button></form>}
        {o.status === 'approved' && <form action={act}><input type="hidden" name="action" value="publish"/><input type="hidden" name="id" value={o.id}/><button className="button primary">Publish</button></form>}
        {['published','approved'].includes(o.status) && <form action={act}><input type="hidden" name="action" value="suspend"/><input type="hidden" name="id" value={o.id}/><button className="button">Suspend</button></form>}
      </div>
    </div>)}{!(opportunities?.length) && <div className="empty-state"><strong>No opportunities.</strong><span>Submitted assets will appear here after intake.</span></div>}</div></section>
    <section className="panel"><h2>Contact intake</h2><div className="table">{(contacts ?? []).map((c: any) => <div className="row" key={c.id} style={{display:'grid',gap:8}}><div><strong>{c.name}</strong><div style={{color:'var(--muted)',fontSize:11,marginTop:5}}>{c.email} · {c.interest} · {c.status}</div></div><span>{c.message}</span>{c.status !== 'resolved' && <form action={act}><input type="hidden" name="action" value="resolve_contact"/><input type="hidden" name="id" value={c.id}/><button className="button">Mark resolved</button></form>}</div>)}{!(contacts?.length) && <div className="empty-state"><strong>No contact requests.</strong><span>New requests are stored securely even before outbound email is configured.</span></div>}</div></section>
  </main>;
}
