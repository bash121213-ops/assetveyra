import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { I18nText } from '@/components/LocaleShell';
import '@/lib/i18nAssetImages';

export default async function AssetsWorkspacePage({ searchParams }: { searchParams: Promise<{ images_failed?: string }> }) {
  const s = await createClient();
  const { data: { user } } = await s.auth.getUser();
  if (!user) redirect('/login');
  const { data: members } = await s.from('organization_members').select('organization_id,organizations(type)').eq('user_id', user.id);
  const ids = (members ?? []).map((m: any) => m.organization_id);
  const { data: assets } = ids.length ? await s.from('assets').select('id,title,status,asset_type,country_code,city,area_sqm,asking_price,currency,updated_at,opportunities(slug,status)').in('organization_id', ids).order('updated_at', { ascending: false }) : { data: [] as any[] };
  const params = await searchParams;
  const failedImages = Number(params.images_failed || 0);
  return <main className="app-shell">
    <header className="app-header"><a className="brand" href="/">ASSETVEYRA</a><nav><a href="/workspace"><I18nText id="Overview"/></a><a href="/opportunities"><I18nText id="Marketplace"/></a><a href="/workspace/assets"><I18nText id="My Assets"/></a><a href="/workspace/deals"><I18nText id="Transactions"/></a><a className="button primary" href="/submit"><I18nText id="Submit an asset"/></a><form action="/logout" method="post"><button className="text-button"><I18nText id="Sign out"/></button></form></nav></header>
    <section className="page-head"><div className="eyebrow"><I18nText id="MY ASSETS"/></div><h1><I18nText id="My Assets"/></h1><p><I18nText id="Manage submitted assets and their controlled verification and publication status."/></p>{failedImages > 0 && <div role="status" style={{ marginTop: 12, padding: 12, border: '1px solid var(--border)', borderRadius: 12, color: 'var(--muted)' }}><I18nText id="Some images could not be uploaded. You can add them later from the asset page." /> <strong>({failedImages})</strong></div>}</section>
    <section className="panel"><div className="table">{(assets ?? []).map((a: any) => <div className="row" key={a.id}>
      <div><a href={`/workspace/assets/${a.id}`} style={{ fontWeight: 600 }}>{a.title}</a><div style={{ color: 'var(--muted)', fontSize: 11, marginTop: 5 }}>{[a.city, a.country_code].filter(Boolean).join(', ') || <I18nText id="Location pending"/>}</div></div>
      <span>{a.asset_type}</span><span>{a.status}</span><span>{a.opportunities?.[0]?.status || <I18nText id="No opportunity"/>}</span>
      <a className="button" href={`/workspace/assets/${a.id}/images`}><I18nText id="Add images" /></a>
    </div>)}{!(assets?.length) && <div className="empty-state"><strong><I18nText id="No assets yet."/></strong><span><I18nText id="Start the controlled intake process."/></span><a className="button primary" href="/submit"><I18nText id="Submit an asset"/></a></div>}</div></section>
  </main>;
}
