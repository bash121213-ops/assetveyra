import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';

const REVIEWER_ROLES = ['platform_admin','operations_admin','compliance_officer','risk_analyst'];
type Decision = 'approved' | 'rejected' | 'needs_information';

async function decide(formData: FormData) {
  'use server';
  const s = await createClient();
  const { data: { user } } = await s.auth.getUser();
  if (!user) redirect('/login');
  const caseId = String(formData.get('case_id') || '');
  const decision = String(formData.get('decision') || '') as Decision;
  const reason = String(formData.get('reason') || '').trim();
  if (!caseId || !['approved','rejected','needs_information'].includes(decision) || !reason) redirect('/workspace/review?error=invalid_decision');
  const { data: members } = await s.from('organization_members').select('organization_id,role').eq('user_id', user.id);
  const reviewer = (members ?? []).some((m: any) => REVIEWER_ROLES.includes(m.role));
  if (!reviewer) redirect('/workspace');
  const { data: verification, error: ve } = await s.from('verification_cases').select('id,organization_id,asset_id,opportunity_id,status').eq('id', caseId).single();
  if (ve || !verification) redirect('/workspace/review?error=case_not_found');
  const terminal = ['approved','rejected'].includes(decision);
  const { error: updateError } = await s.from('verification_cases').update({status: decision,decision_reason: reason,reviewer_id:user.id,resolved_at:terminal?new Date().toISOString():null}).eq('id', caseId);
  if (updateError) throw new Error(updateError.message);
  const nextStatus = decision === 'approved' ? 'approved' : decision === 'rejected' ? 'archived' : 'verification';
  if (verification.asset_id) { const {error}=await s.from('assets').update({status:nextStatus}).eq('id',verification.asset_id); if(error) throw new Error(error.message); }
  if (verification.opportunity_id) { const {error}=await s.from('opportunities').update({status:nextStatus}).eq('id',verification.opportunity_id); if(error) throw new Error(error.message); }
  const {error:eventError}=await s.from('workflow_events').insert({organization_id:verification.organization_id,actor_id:user.id,event_type:`verification.${decision}`,entity_type:'verification_case',entity_id:verification.id,payload:{reason,asset_id:verification.asset_id,opportunity_id:verification.opportunity_id}});
  if(eventError) throw new Error(eventError.message);
  redirect('/workspace/review?updated=1');
}

export default async function ReviewPage({ searchParams }: { searchParams: Promise<{ updated?: string; error?: string }> }) {
  const s = await createClient(); const { data: { user } } = await s.auth.getUser(); if (!user) redirect('/login');
  const { data: members } = await s.from('organization_members').select('organization_id,role').eq('user_id', user.id);
  const ids = (members ?? []).map((m: any) => m.organization_id);
  const reviewer = (members ?? []).some((m: any) => REVIEWER_ROLES.includes(m.role)); if (!reviewer) redirect('/workspace');
  const platformReviewer = (members ?? []).some((m: any) => ['platform_admin','operations_admin','compliance_officer','risk_analyst'].includes(m.role));
  const query = s.from('verification_cases').select('id,status,category,decision_reason,opened_at,resolved_at,asset_id,opportunity_id,assets(title),opportunities(slug)').order('opened_at',{ascending:false}).limit(50);
  const {data:cases}=platformReviewer?await query:(ids.length?await query.in('organization_id',ids):{data:[] as any[]});
  const params=await searchParams;
  return <main className="app-shell"><header className="app-header"><a className="brand" href="/">ASSETVEYRA</a><nav><a href="/workspace">Workspace</a><a href="/opportunities">Marketplace</a></nav></header><section className="page-head"><div className="eyebrow">CONTROL & COMPLIANCE</div><h1>Verification queue.</h1><p>Every decision is recorded against the verification case and drives the controlled asset state.</p></section>{params.updated&&<section className="panel"><strong>Decision recorded.</strong></section>}{params.error&&<section className="panel"><strong>Unable to process the requested decision.</strong></section>}<section className="panel"><div className="table">{(cases??[]).map((c:any)=><div className="row" key={c.id} style={{display:'grid',gap:10}}><div><strong>{c.assets?.title||c.opportunities?.slug||'Verification case'}</strong><div style={{color:'var(--muted)',fontSize:11,marginTop:5}}>{c.category} · {c.status}</div></div><span>{c.decision_reason||'Decision pending'}</span>{['open','in_review','needs_information'].includes(c.status)&&<form action={decide} style={{display:'grid',gap:8}}><input type="hidden" name="case_id" value={c.id}/><input name="reason" required placeholder="Decision rationale"/><div style={{display:'flex',gap:8,flexWrap:'wrap'}}><button className="button primary" name="decision" value="approved">Approve</button><button className="button" name="decision" value="needs_information">Request changes</button><button className="button" name="decision" value="rejected">Reject</button></div></form>}</div>)}{!(cases?.length)&&<div className="empty-state"><strong>No verification cases visible.</strong><span>Cases appear here when your organization has review scope.</span></div>}</div></section></main>;
}
