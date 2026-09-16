import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { I18nText } from '@/components/LocaleShell';

export default async function DealsPage() {
  const s = await createClient();
  const { data: { user } } = await s.auth.getUser();
  if (!user) redirect('/login');
  const { data: members } = await s.from('organization_members').select('organization_id').eq('user_id', user.id);
  const ids = (members ?? []).map((m: any) => m.organization_id);
  let deals: any[] = [];
  if (ids.length) {
    const { data } = await s.from('deals').select('id,status,target_close_date,created_at,updated_at,opportunities(slug,assets(title,currency,asking_price)),buyer_organization_id,seller_organization_id').or(`organization_id.in.(${ids.join(',')}),buyer_organization_id.in.(${ids.join(',')}),seller_organization_id.in.(${ids.join(',')})`).order('updated_at', { ascending: false });
    deals = data ?? [];
  }
  return <main className="app-shell">
    <header className="app-header">
      <a className="brand" href="/">ASSETVEYRA</a>
      <nav><a href="/workspace"><I18nText id="Overview"/></a><a href="/opportunities"><I18nText id="Marketplace"/></a><a href="/workspace/interests"><I18nText id="My Interests"/></a><a href="/workspace/deals"><I18nText id="Transactions"/></a><form action="/logout" method="post"><button className="text-button"><I18nText id="Sign out"/></button></form></nav>
    </header>
    <section className="page-head"><div className="eyebrow"><I18nText id="TRANSACTIONS"/></div><h1><I18nText id="Transactions"/></h1><p><I18nText id="Follow each transaction through its controlled lifecycle from initiation to closing."/></p></section>
    <section className="panel"><div className="panel-title"><div><div className="eyebrow"><I18nText id="ACTIVE"/></div><h2><I18nText id="Active Transactions"/></h2></div></div><div className="table">{deals.filter((d: any) => d.status !== 'completed').map((d: any) => <a className="row" key={d.id} href={`/workspace/deals/${d.id}`}><strong>{d.opportunities?.assets?.title || <I18nText id="Transaction"/>}</strong><span>{d.status}</span><span>{d.target_close_date || <I18nText id="Pending"/>}</span><span>{d.opportunities?.assets?.asking_price ? `${d.opportunities.assets.currency || ''} ${Number(d.opportunities.assets.asking_price).toLocaleString()}` : '—'}</span><span><I18nText id="Open →"/></span></a>)}{!deals.filter((d: any) => d.status !== 'completed').length && <div className="empty-state"><strong><I18nText id="No active transactions."/></strong><span><I18nText id="Accepted offers and transaction records will appear here."/></span></div>}</div></section>
    <section className="panel" style={{ marginTop: 24 }}><div className="panel-title"><div><div className="eyebrow"><I18nText id="COMPLETED"/></div><h2><I18nText id="Completed Transactions"/></h2></div></div><div className="table">{deals.filter((d: any) => d.status === 'completed').map((d: any) => <a className="row" key={d.id} href={`/workspace/deals/${d.id}`}><strong>{d.opportunities?.assets?.title || <I18nText id="Transaction"/>}</strong><span>{d.status}</span><span>{d.target_close_date || '—'}</span><span><I18nText id="Open →"/></span></a>)}{!deals.filter((d: any) => d.status === 'completed').length && <div className="empty-state"><strong><I18nText id="No completed transactions yet."/></strong></div>}</div></section>
  </main>;
}
