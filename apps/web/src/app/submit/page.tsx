import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';

const SELLER_ROLES = ['seller_admin','seller_member','platform_admin','operations_admin'] as const;

async function submit(formData: FormData) {
  'use server';
  const s = await createClient();
  const { data: { user } } = await s.auth.getUser();
  if (!user) redirect('/login');
  const { data: memberships } = await s.from('organization_members').select('organization_id,role').eq('user_id', user.id);
  const membership = (memberships ?? []).find(m => SELLER_ROLES.includes(m.role as typeof SELLER_ROLES[number]));
  if (!membership) redirect('/workspace?error=seller_access_required');

  const title = String(formData.get('title') || '').trim();
  const type = String(formData.get('asset_type') || 'land');
  const country = String(formData.get('country_code') || '').toUpperCase();
  const city = String(formData.get('city') || '').trim();
  const area = Number(formData.get('area_sqm') || 0);
  const price = Number(formData.get('asking_price') || 0);
  const summary = String(formData.get('public_summary') || '').trim();
  if (!title || country.length !== 2 || !Number.isFinite(area) || area < 0 || !Number.isFinite(price) || price < 0 || summary.length > 4000) redirect('/submit?error=invalid_input');

  const { data: a, error: ae } = await s.from('assets').insert({ organization_id: membership.organization_id, asset_type: type, title, country_code: country, city, area_sqm: area || null, asking_price: price || null, currency: String(formData.get('currency') || 'USD').toUpperCase(), public_summary: summary, created_by: user.id, status: 'submitted' }).select('id').single();
  if (ae) throw new Error(ae.message);
  const slug = `${title.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'')}-${a.id.slice(0,8)}`;
  const { data: o, error: oe } = await s.from('opportunities').insert({ asset_id: a.id, owner_organization_id: membership.organization_id, slug, status: 'submitted', visibility: 'private', investment_thesis: summary }).select('id').single();
  if (oe) throw new Error(oe.message);
  const { error: ve } = await s.from('verification_cases').insert({ organization_id: membership.organization_id, asset_id: a.id, opportunity_id: o.id, category: 'asset_intake', status: 'open' });
  if (ve) throw new Error(ve.message);
  await s.from('workflow_events').insert({ organization_id: membership.organization_id, actor_id: user.id, event_type: 'opportunity.submitted', entity_type: 'opportunity', entity_id: o.id, payload: { asset_id: a.id } });
  redirect('/workspace/assets?submitted=1');
}

export default async function SubmitPage() {
  const s = await createClient();
  const { data: { user } } = await s.auth.getUser();
  if (!user) redirect('/login');
  const { data: memberships } = await s.from('organization_members').select('role').eq('user_id', user.id);
  const canSubmit = (memberships ?? []).some(m => SELLER_ROLES.includes(m.role as typeof SELLER_ROLES[number]));
  if (!canSubmit) redirect('/workspace');
  return <main className="app-shell"><header className="app-header"><a className="brand" href="/">ASSETVEYRA</a><nav><a href="/dashboard">Workspace</a><a href="/opportunities">Marketplace</a></nav></header><section className="form-page"><div className="eyebrow">SELLER INTAKE</div><h1>Submit an asset</h1><p>The record enters verification first. It is not published automatically.</p><form action={submit} className="form-grid"><label>Asset title<input name="title" required maxLength={200}/></label><label>Asset type<select name="asset_type"><option value="land">Land</option><option value="residential">Residential</option><option value="commercial">Commercial</option><option value="hotel">Hotel</option><option value="hospitality">Hospitality</option><option value="industrial">Industrial</option><option value="mixed_use">Mixed use</option><option value="development_project">Development project</option><option value="infrastructure">Infrastructure</option><option value="renewable_energy">Renewable energy</option><option value="other">Other</option></select></label><label>Country code<input name="country_code" required maxLength={2} placeholder="JO" /></label><label>City<input name="city" maxLength={120}/></label><label>Area m²<input name="area_sqm" type="number" min="0" /></label><label>Currency<input name="currency" defaultValue="USD" maxLength={3} /></label><label>Asking price<input name="asking_price" type="number" min="0" /></label><label className="full">Public summary<textarea name="public_summary" rows={6} maxLength={4000}/></label><div className="full"><button className="button primary">Create verification case</button></div></form></section></main>;
}
