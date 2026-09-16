import { notFound, redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { I18nText } from '@/components/LocaleShell';

const STATUS_ORDER = ['initiated', 'nda', 'data_room', 'diligence', 'offer', 'negotiation', 'approval', 'contract', 'signing', 'closing', 'completed'];

async function advanceDeal(formData: FormData) {
  'use server';
  const s = await createClient();
  const { data: { user } } = await s.auth.getUser();
  if (!user) redirect('/login');
  const dealId = String(formData.get('deal_id') || '');
  const nextStatus = String(formData.get('status') || '');
  const note = String(formData.get('note') || '').trim();
  if (!dealId || !STATUS_ORDER.includes(nextStatus)) redirect('/workspace/deals');
  const { data: deal } = await s.from('deals').select('id,organization_id,buyer_organization_id,seller_organization_id,status').eq('id', dealId).maybeSingle();
  if (!deal) notFound();
  const { data: member } = await s.from('organization_members').select('role').eq('user_id', user.id).in('role', ['platform_admin', 'operations_admin', 'deal_manager', 'seller_admin']).in('organization_id', [deal.organization_id, deal.seller_organization_id]).maybeSingle();
  if (!member) redirect('/workspace/deals');
  const currentIndex = STATUS_ORDER.indexOf(deal.status);
  const nextIndex = STATUS_ORDER.indexOf(nextStatus);
  if (nextIndex !== currentIndex + 1) redirect(`/workspace/deals/${dealId}`);
  const { error } = await s.from('deals').update({ status: nextStatus }).eq('id', dealId);
  if (error) throw new Error(error.message);
  const { error: eventError } = await s.from('deal_events').insert({ deal_id: dealId, actor_id: user.id, event_type: `deal.${nextStatus}`, payload: { note } });
  if (eventError) throw new Error(eventError.message);
  const { error: workflowError } = await s.from('workflow_events').insert({ organization_id: deal.organization_id, actor_id: user.id, event_type: `deal.${nextStatus}`, entity_type: 'deal', entity_id: dealId, payload: { note } });
  if (workflowError) throw new Error(workflowError.message);
  redirect(`/workspace/deals/${dealId}`);
}

export default async function DealDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const s = await createClient();
  const { data: { user } } = await s.auth.getUser();
  if (!user) redirect('/login');
  const { data: deal } = await s.from('deals').select('id,status,target_close_date,created_at,updated_at,organization_id,buyer_organization_id,seller_organization_id,accepted_offer_id,opportunity_id,opportunities(slug,investment_thesis,assets(title,currency,asking_price))').eq('id', id).maybeSingle();
  if (!deal) notFound();
  const { data: member } = await s.from('organization_members').select('organization_id').eq('user_id', user.id).in('organization_id', [deal.organization_id, deal.buyer_organization_id, deal.seller_organization_id]).maybeSingle();
  if (!member) notFound();
  const { data: events } = await s.from('deal_events').select('id,event_type,payload,created_at,actor_id').eq('deal_id', id).order('created_at', { ascending: false });
  const { data: rooms } = await s.from('data_rooms').select('id,name,status,nda_required').eq('opportunity_id', deal.opportunity_id).order('updated_at', { ascending: false });
  const currentIndex = STATUS_ORDER.indexOf(deal.status);
  const nextStatus = STATUS_ORDER[currentIndex + 1];
  const asset = (deal as any).opportunities?.assets;

  return <main className="app-shell">
    <header className="app-header"><a className="brand" href="/">ASSETVEYRA</a><nav><a href="/workspace"><I18nText id="Overview"/></a><a href="/workspace/deals"><I18nText id="Transactions"/></a><a href="/opportunities"><I18nText id="Marketplace"/></a></nav></header>
    <section className="page-head"><div className="eyebrow"><I18nText id="TRANSACTION"/></div><h1>{asset?.title || <I18nText id="Transaction"/>}</h1><p>{(deal as any).opportunities?.slug || <I18nText id="Transaction"/>} · {deal.status}</p></section>
    <section className="panel"><div className="facts"><div><span><I18nText id="Asset value"/></span><strong>{asset?.asking_price ? `${asset.currency || ''} ${Number(asset.asking_price).toLocaleString()}` : '—'}</strong></div><div><span><I18nText id="Target closing"/></span><strong>{deal.target_close_date || <I18nText id="Pending"/>}</strong></div><div><span><I18nText id="Accepted offer"/></span><strong>{deal.accepted_offer_id ? <I18nText id="Recorded"/> : <I18nText id="Pending"/>}</strong></div></div><div className="lifecycle" style={{ marginTop: 35 }}>{STATUS_ORDER.map((status, index) => <div className="lifecycle-step" key={status} style={{ opacity: index <= currentIndex ? 1 : .45 }}><span>{String(index + 1).padStart(2, '0')}</span><strong>{status.replace('_', ' ')}</strong></div>)}</div></section>
    <section className="panel" style={{ marginTop: 24 }}><div className="panel-title"><div><div className="eyebrow"><I18nText id="CONTROLLED ACCESS"/></div><h2><I18nText id="Data Rooms"/></h2></div></div><p><I18nText id="Confidential disclosure remains inside the transaction context. Access is controlled by the existing data-room and NDA rules."/></p><div className="table">{(rooms ?? []).map((room: any) => <a className="row" href={`/workspace/data-rooms/${room.id}`} key={room.id}><strong>{room.name}</strong><span>{room.status}</span><span>{room.nda_required ? <I18nText id="NDA required"/> : <I18nText id="NDA optional"/>}</span><span><I18nText id="Open Data Room →"/></span></a>)}{!rooms?.length && <div className="empty-state"><strong><I18nText id="No data room currently linked."/></strong><span><I18nText id="A controlled data room may be created when the transaction reaches the appropriate disclosure stage."/></span></div>}</div></section>
    <section className="detail-grid"><section className="panel"><div className="eyebrow"><I18nText id="TRANSACTION HISTORY"/></div><h2><I18nText id="Recorded transaction events"/></h2><div className="table" style={{ marginTop: 20 }}>{(events ?? []).map((event: any) => <div className="row" key={event.id}><strong>{event.event_type}</strong><span>{new Date(event.created_at).toLocaleString()}</span><span>{event.payload?.note || '—'}</span></div>)}{!(events?.length) && <div className="empty-state"><strong><I18nText id="No events recorded."/></strong></div>}</div></section><aside className="deal-gate"><div className="eyebrow"><I18nText id="NEXT CONTROLLED STEP"/></div><h2>{nextStatus ? nextStatus.replace('_', ' ') : <I18nText id="Completed"/>}</h2><p><I18nText id="Advance the transaction only when the current legal, diligence and commercial gate has been satisfied."/></p>{nextStatus && <form action={advanceDeal}><input type="hidden" name="deal_id" value={id}/><input type="hidden" name="status" value={nextStatus}/><label><I18nText id="Execution note"/><textarea name="note" rows={5} placeholder="Record the reason and evidence for advancing this transaction stage." required /></label><button className="button primary" type="submit"><I18nText id="Advance transaction"/></button></form>}</aside></section>
  </main>;
}
