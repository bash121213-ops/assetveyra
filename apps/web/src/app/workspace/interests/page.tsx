import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { I18nText } from '@/components/LocaleShell';

export default async function InterestsPage() {
  const s = await createClient();
  const { data: { user } } = await s.auth.getUser();
  if (!user) redirect('/login');

  const { data: members } = await s.from('organization_members').select('organization_id,organizations(display_name,type)').eq('user_id', user.id);
  const ids = (members ?? []).map((m: any) => m.organization_id);
  const isInvestor = (members ?? []).some((m: any) => m.organizations?.type === 'investor');

  const { data: items } = isInvestor && ids.length
    ? await s.from('investor_interests').select('id,status,created_at,updated_at,opportunities(id,slug,owner_organization_id,investment_thesis,assets(title,city,country_code))').in('investor_organization_id', ids).order('updated_at', { ascending: false })
    : { data: [] as any[] };

  const { data: ownedOpps } = ids.length
    ? await s.from('opportunities').select('id').in('owner_organization_id', ids)
    : { data: [] as any[] };
  const ownedOppIds = (ownedOpps ?? []).map((o: any) => o.id);
  const { data: sellerItems } = ownedOppIds.length
    ? await s.from('investor_interests').select('id,status,created_at,updated_at,investor_organization_id,opportunities(id,slug,owner_organization_id,investment_thesis,assets(title,city,country_code))').in('opportunity_id', ownedOppIds).order('updated_at', { ascending: false })
    : { data: [] as any[] };

  return <main className="app-shell">
    <header className="app-header">
      <a className="brand" href="/">ASSETVEYRA</a>
      <nav>
        <a href="/workspace"><I18nText id="Overview"/></a>
        <a href="/opportunities"><I18nText id="Marketplace"/></a>
        {isInvestor && <a href="/workspace/interests"><I18nText id="My Interests"/></a>}
        <a href="/workspace/deals"><I18nText id="Transactions"/></a>
        <form action="/logout" method="post"><button className="text-button"><I18nText id="Sign out"/></button></form>
      </nav>
    </header>

    <section className="page-head">
      <div className="eyebrow"><I18nText id="MY INTERESTS"/></div>
      <h1><I18nText id="My Interests"/></h1>
      <p><I18nText id="One place to track opportunity interest and its controlled progression toward a transaction."/></p>
    </section>

    {isInvestor && <section className="panel">
      <div className="panel-title"><div><div className="eyebrow"><I18nText id="INVESTOR"/></div><h2><I18nText id="Opportunities I requested"/></h2></div></div>
      <div className="table">{(items ?? []).map((i: any) => <a className="row" href={`/workspace/interests/${i.id}`} key={`i-${i.id}`}><strong>{i.opportunities?.assets?.title || <I18nText id="Opportunity"/>}</strong><span>{[i.opportunities?.assets?.city, i.opportunities?.assets?.country_code].filter(Boolean).join(', ') || '—'}</span><span>{i.status}</span><span><I18nText id="Open →"/></span></a>)}{!items?.length && <div className="empty-state"><strong><I18nText id="No registered interests"/></strong><span><I18nText id="Open the marketplace to review available opportunities."/></span><a className="button secondary" href="/opportunities"><I18nText id="Marketplace"/></a></div>}</div>
    </section>}

    {!!sellerItems?.length && <section className="panel" style={{ marginTop: 24 }}>
      <div className="panel-title"><div><div className="eyebrow"><I18nText id="SELLER"/></div><h2><I18nText id="Interest in your opportunities"/></h2></div></div>
      <div className="table">{sellerItems.map((i: any) => <a className="row" href={`/workspace/interests/${i.id}`} key={`s-${i.id}`}><strong>{i.opportunities?.assets?.title || <I18nText id="Opportunity"/>}</strong><span><I18nText id="Investor organization"/></span><span>{i.status}</span><span><I18nText id="Review →"/></span></a>)}</div>
    </section>}

    {!isInvestor && !sellerItems?.length && <section className="panel"><div className="empty-state"><strong><I18nText id="No interests available for this account."/></strong><span><I18nText id="Interest records appear here when your organization participates in an opportunity."/></span></div></section>}
  </main>;
}
