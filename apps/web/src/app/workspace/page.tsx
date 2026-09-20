import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { I18nText } from '@/components/LocaleShell';
const ADMIN_ROLES = ['platform_admin', 'operations_admin', 'compliance_officer'];
const SELLER_ROLES = ['seller_admin', 'seller_member', 'platform_admin', 'operations_admin'];

type Membership = { organization_id: string; role: string; organizations?: { display_name?: string; type?: string } | null };

export default async function WorkspacePage() {
  const s = await createClient();
  const { data: { user } } = await s.auth.getUser();
  if (!user) redirect('/login');
  const { data: memberships } = await s.from('organization_members').select('organization_id,role,organizations(display_name,type)').eq('user_id', user.id);
  const typedMemberships = (memberships ?? []) as Membership[];
  const orgIds = typedMemberships.map((m) => m.organization_id);
  const isAdmin = typedMemberships.some((m) => ADMIN_ROLES.includes(m.role));
  const isInvestor = typedMemberships.some((m) => m.organizations?.type === 'investor');
  const isSeller = typedMemberships.some((m) => SELLER_ROLES.includes(m.role));
  const [{ data: assets }, { data: interests }, { data: deals }] = await Promise.all([
    orgIds.length ? s.from('assets').select('id,title,status,asset_type,city,country_code').in('organization_id', orgIds).order('updated_at', { ascending: false }).limit(5) : Promise.resolve({ data: [] }),
    isInvestor && orgIds.length ? s.from('investor_interests').select('id,status,created_at,opportunities(slug,assets(title,city,country_code))').in('investor_organization_id', orgIds).order('updated_at', { ascending: false }).limit(5) : Promise.resolve({ data: [] }),
    orgIds.length ? s.from('deals').select('id,status,target_close_date,opportunities(slug,assets(title))').or(`organization_id.in.(${orgIds.join(',')}),buyer_organization_id.in.(${orgIds.join(',')}),seller_organization_id.in.(${orgIds.join(',')})`).order('updated_at', { ascending: false }).limit(5) : Promise.resolve({ data: [] }),
  ]);
  return <main className="app-shell"><header className="app-header"><a className="brand" href="/">ASSETVEYRA</a><nav><a href="/workspace"><I18nText id="Overview" /></a><a href="/opportunities"><I18nText id="Marketplace" /></a><a href="/workspace/interests"><I18nText id="My Interests" /></a><a href="/workspace/deals"><I18nText id="Transactions" /></a>{isSeller && <a href="/workspace/assets"><I18nText id="My Assets" /></a>}{isAdmin && <a href="/workspace/admin"><I18nText id="Admin Console" /></a>}<form action="/logout" method="post"><button className="text-button"><I18nText id="Sign out" /></button></form></nav></header>
    <section className="page-head dashboard-head"><div><div className="eyebrow"><I18nText id="Overview" /></div><h1><I18nText id="Transaction Workspace" /></h1><p><I18nText id="Your authenticated view of opportunities, interests and transactions." /></p></div>{isSeller && <a className="button primary" href="/submit"><I18nText id="Add Property" /></a>}</section>
    <section className="stats"><div><span><I18nText id="Organizations" /></span><strong>{typedMemberships.length || 0}</strong></div><div><span><I18nText id="My Interests" /></span><strong>{interests?.length || 0}</strong></div><div><span><I18nText id="Active Transactions" /></span><strong>{deals?.length || 0}</strong></div>{isSeller && <div><span><I18nText id="My Assets" /></span><strong>{assets?.length || 0}</strong></div>}</section>
    <section className="panel"><div className="panel-title"><div><div className="eyebrow"><I18nText id="NEXT STEPS" /></div><h2><I18nText id="Your activity" /></h2></div></div><div className="opportunity-grid" style={{ padding: 0 }}><a className="opportunity-card" href="/opportunities"><div className="card-meta"><span><I18nText id="MARKETPLACE" /></span></div><h2><I18nText id="Explore opportunities" /></h2><p><I18nText id="Review the available real-estate opportunities and open an opportunity to see its permitted details." /></p><strong><I18nText id="Open Marketplace →" /></strong></a><a className="opportunity-card" href="/workspace/interests"><div className="card-meta"><span><I18nText id={isInvestor ? 'INVESTOR' : 'INTERESTS'} /></span><span>{interests?.length ?? 0}</span></div><h2><I18nText id="My Interests" /></h2><p><I18nText id="Track qualification, NDA, data-room and diligence progress for opportunities you requested." /></p><strong><I18nText id="Open My Interests →" /></strong></a><a className="opportunity-card" href="/workspace/deals"><div className="card-meta"><span><I18nText id="TRANSACTIONS" /></span><span>{deals?.length ?? 0}</span></div><h2><I18nText id="Transactions" /></h2><p><I18nText id="Follow active transactions through their controlled lifecycle to closing." /></p><strong><I18nText id="Open Transactions →" /></strong></a>{isSeller && <a className="opportunity-card" href="/workspace/assets"><div className="card-meta"><span><I18nText id="SELLER" /></span><span>{assets?.length ?? 0}</span></div><h2><I18nText id="My Assets" /></h2><p><I18nText id="Manage submitted assets and their controlled verification and publication status." /></p><strong><I18nText id="Open My Assets →" /></strong></a>}</div></section>
    <section className="panel"><div className="panel-title"><div><div className="eyebrow"><I18nText id="RECENT ACTIVITY" /></div><h2><I18nText id="Recent transactions" /></h2></div></div><div className="table">{(deals ?? []).map((d: any) => <a className="row" href={`/workspace/deals/${d.id}`} key={d.id}><strong>{d.opportunities?.assets?.title || <I18nText id="Transaction" />}</strong><span>{d.status}</span><span>{d.target_close_date || <I18nText id="Pending" />}</span></a>)}{!deals?.length && <div className="empty-state"><strong><I18nText id="No active transactions yet." /></strong><span><I18nText id="Your transaction records will appear here after an offer is accepted." /></span></div>}</div></section>
  </main>;
}
