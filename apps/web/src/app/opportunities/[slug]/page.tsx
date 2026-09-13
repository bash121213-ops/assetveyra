import { notFound, redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';

async function registerInterest(formData: FormData) {
  'use server';
  const s = await createClient();
  const { data: { user } } = await s.auth.getUser();
  if (!user) redirect('/login');
  const slug = String(formData.get('slug') || '');
  const { data: opportunity } = await s.from('opportunities').select('id').eq('slug', slug).eq('status', 'published').maybeSingle();
  if (!opportunity) redirect('/opportunities');
  const { data: membership } = await s.from('organization_members').select('organization_id,organizations(type)').eq('user_id', user.id).limit(20);
  const investor = (membership ?? []).find((m:any) => m.organizations?.type === 'investor');
  if (!investor) redirect('/onboarding?next=/opportunities/' + encodeURIComponent(slug));
  const { data: existing } = await s.from('investor_interests').select('id').eq('investor_organization_id', investor.organization_id).eq('opportunity_id', opportunity.id).maybeSingle();
  if (!existing) {
    await s.from('investor_interests').insert({ investor_organization_id: investor.organization_id, opportunity_id: opportunity.id, status: 'interest', created_by: user.id });
  }
  redirect('/workspace/interests');
}

export default async function OpportunityPage({params}:{params:Promise<{slug:string}>}){
 const {slug}=await params; const s=await createClient();
 const {data:{user}}=await s.auth.getUser();
 const {data:o}=await s.from('opportunities').select('id,slug,status,investment_thesis,structure,minimum_ticket,target_return,asset_id,assets(*)').eq('slug',slug).eq('status','published').maybeSingle();
 if(!o)notFound();
 const asset=(o as any).assets;
 if(!asset || !asset.asking_price || Number(asset.asking_price) < 100000) redirect('/opportunities');
 if(!user) redirect('/login');
 return <main className="app-shell"><header className="app-header"><a className="brand" href="/">ASSETVEYRA</a><nav><a href="/opportunities">Opportunities</a><a href="/workspace">Workspace</a><form action="/logout" method="post"><button className="text-button">Sign out</button></form></nav></header><article className="detail"><div className="eyebrow">PUBLISHED OPPORTUNITY · CONTROLLED ACCESS</div><h1>{asset.title}</h1><div className="detail-grid"><section><p className="lead">{asset.public_summary||o.investment_thesis}</p><div className="facts"><div><span>Asset type</span><strong>{asset.asset_type}</strong></div><div><span>Location</span><strong>{[asset.city,asset.region,asset.country_code].filter(Boolean).join(', ')}</strong></div><div><span>Area</span><strong>{asset.area_sqm?`${Number(asset.area_sqm).toLocaleString()} m²`:'—'}</strong></div><div><span>Asking price</span><strong>{`${asset.currency||'USD'} ${Number(asset.asking_price).toLocaleString()}`}</strong></div><div><span>Minimum ticket</span><strong>{o.minimum_ticket?`${asset.currency||'USD'} ${Number(o.minimum_ticket).toLocaleString()}`:'—'}</strong></div><div><span>Target return</span><strong>{o.target_return?`${o.target_return}%`:'—'}</strong></div></div><div className="panel" style={{margin:'55px 0 0',padding:'35px 0'}}><div className="eyebrow">TRANSACTION PATH</div><div className="lifecycle"><div className="lifecycle-step"><span>01</span><strong>Interest</strong></div><div className="lifecycle-step"><span>02</span><strong>Qualification</strong></div><div className="lifecycle-step"><span>03</span><strong>NDA</strong></div><div className="lifecycle-step"><span>04</span><strong>Data room</strong></div><div className="lifecycle-step"><span>05</span><strong>Diligence</strong></div><div className="lifecycle-step"><span>06</span><strong>Offer</strong></div></div></div></section><aside className="deal-gate"><div className="eyebrow">INVESTOR ACCESS</div><h2>Register qualified interest</h2><p>You are viewing the controlled opportunity information available to registered users. Private ownership, legal, financial and technical material remains gated behind qualification and NDA.</p><form action={registerInterest}><input type="hidden" name="slug" value={slug}/><button className="button primary" type="submit">Register interest</button></form></aside></div></article></main>;
}
