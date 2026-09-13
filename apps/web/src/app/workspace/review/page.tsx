import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';

export default async function ReviewPage(){
 const s=await createClient(); const {data:{user}}=await s.auth.getUser(); if(!user)redirect('/login');
 const {data:members}=await s.from('organization_members').select('organization_id,role').eq('user_id',user.id); const ids=(members??[]).map((m:any)=>m.organization_id); const reviewer=(members??[]).some((m:any)=>['platform_admin','operations_admin','compliance_officer','risk_analyst','legal_reviewer','external_reviewer'].includes(m.role));
 if(!reviewer)redirect('/workspace');
 const {data:cases}=ids.length?await s.from('verification_cases').select('id,status,category,decision_reason,opened_at,resolved_at,assets(title),opportunities(slug)').in('organization_id',ids).order('opened_at',{ascending:false}).limit(50):{data:[] as any[]};
 return <main className="app-shell"><header className="app-header"><a className="brand" href="/">ASSETVEYRA</a><nav><a href="/workspace">Workspace</a><a href="/opportunities">Marketplace</a></nav></header><section className="page-head"><div className="eyebrow">CONTROL & COMPLIANCE</div><h1>Verification queue.</h1><p>Review cases are explicit workflow records. Approval is a decision, not an implicit side effect of asset creation.</p></section><section className="panel"><div className="table">{(cases??[]).map((c:any)=><div className="row" key={c.id}><strong>{c.assets?.title||c.opportunities?.slug||'Verification case'}</strong><span>{c.category}</span><span>{c.status}</span><span>{c.decision_reason||'Decision pending'}</span></div>)}{!(cases?.length)&&<div className="empty-state"><strong>No verification cases visible.</strong><span>Cases appear here when your organization has review scope.</span></div>}</div></section></main>;
}
