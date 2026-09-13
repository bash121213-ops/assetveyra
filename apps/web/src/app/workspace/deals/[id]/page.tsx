import { notFound, redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';

const STATUS_ORDER = ['initiated','nda','data_room','diligence','offer','negotiation','approval','contract','signing','closing','completed'];

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
  const { data: member } = await s.from('organization_members').select('role').eq('user_id', user.id).in('role',['platform_admin','operations_admin','deal_manager','seller_admin']).in('organization_id',[deal.organization_id,deal.seller_organization_id]).maybeSingle();
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
  const { data: member } = await s.from('organization_members').select('organization_id').eq('user_id', user.id).in('organization_id',[deal.organization_id,deal.buyer_organization_id,deal.seller_organization_id]).maybeSingle();
  if (!member) notFound();
  const { data: events } = await s.from('deal_events').select('id,event_type,payload,created_at,actor_id').eq('deal_id', id).order('created_at',{ascending:false});
  const currentIndex = STATUS_ORDER.indexOf(deal.status);
  const nextStatus = STATUS_ORDER[currentIndex + 1];
  const asset = (deal as any).opportunities?.assets;
  return <main className="app-shell"><header className="app-header"><a className="brand" href="/">ASSETVEYRA</a><nav><a href="/workspace">Workspace</a><a href="/workspace/deals">Deals</a><a href="/opportunities">Marketplace</a></nav></header><section className="page-head"><div className="eyebrow">TRANSACTION EXECUTION</div><h1>{asset?.title || 'Deal'}</h1><p>{(deal as any).opportunities?.slug || 'Transaction'} · {deal.status}</p></section><section className="panel"><div className="facts"><div><span>Asset value</span><strong>{asset?.asking_price ? `${asset.currency || ''} ${Number(asset.asking_price).toLocaleString()}` : '—'}</strong></div><div><span>Target closing</span><strong>{deal.target_close_date || 'Pending'}</strong></div><div><span>Accepted offer</span><strong>{deal.accepted_offer_id ? 'Recorded' : 'Pending'}</strong></div></div><div className="lifecycle" style={{marginTop:35}}>{STATUS_ORDER.map((status,index)=><div className="lifecycle-step" key={status} style={{opacity:index<=currentIndex?1:.45}}><span>{String(index+1).padStart(2,'0')}</span><strong>{status.replace('_',' ')}</strong></div>)}</div></section><section className="detail-grid"><section className="panel"><div className="eyebrow">DEAL HISTORY</div><h2>Immutable transaction events</h2><div className="table" style={{marginTop:20}}>{(events??[]).map((event:any)=><div className="row" key={event.id}><strong>{event.event_type}</strong><span>{new Date(event.created_at).toLocaleString()}</span><span>{event.payload?.note || '—'}</span></div>)}{!(events?.length)&&<div className="empty-state"><strong>No events recorded.</strong></div>}</div></section><aside className="deal-gate"><div className="eyebrow">NEXT CONTROLLED STEP</div><h2>{nextStatus ? nextStatus.replace('_',' ') : 'Completed'}</h2><p>Advance the transaction only when the current legal, diligence and commercial gate has been satisfied.</p>{nextStatus&&<form action={advanceDeal}><input type="hidden" name="deal_id" value={id}/><input type="hidden" name="status" value={nextStatus}/><label>Execution note<textarea name="note" rows={5} placeholder="Record the reason and evidence for advancing this transaction stage." required /></label><button className="button primary" type="submit">Advance transaction</button></form>}</aside></section></main>;
}
