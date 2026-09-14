import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { I18nText } from '@/components/LocaleShell';

export default async function DataRoomsPage(){
 const s=await createClient(); const {data:{user}}=await s.auth.getUser(); if(!user)redirect('/login');
 const {data:members}=await s.from('organization_members').select('organization_id').eq('user_id',user.id); const ids=(members??[]).map((m:any)=>m.organization_id);
 const {data:rooms}=ids.length?await s.from('data_rooms').select('id,name,status,nda_required,watermark_enabled,download_enabled,created_at,opportunities(slug,assets(title))').in('organization_id',ids).order('updated_at',{ascending:false}):{data:[] as any[]};
 return <main className="app-shell"><header className="app-header"><a className="brand" href="/">ASSETVEYRA</a><nav><a href="/workspace"><I18nText id="Workspace"/></a><a href="/opportunities"><I18nText id="Marketplace"/></a></nav></header><section className="page-head"><div className="eyebrow"><I18nText id="DATA ROOM"/></div><h1><I18nText id="Private data rooms"/></h1><p><I18nText id="Control document access, confidentiality gates, expiry and download policy."/></p></section><section className="panel"><div className="table">{(rooms??[]).map((r:any)=><a className="row" href={`/workspace/data-rooms/${r.id}`} key={r.id}><strong>{r.name}</strong><span>{r.opportunities?.assets?.title||<I18nText id="Opportunity"/>}</span><span>{r.status}</span><span>{r.nda_required?<I18nText id="NDA"/>:<I18nText id="NDA-gated information"/>} · {r.download_enabled?<I18nText id="Open workspace →"/>:<I18nText id="Public information"/>}</span></a>)}{!(rooms?.length)&&<div className="empty-state"><strong><I18nText id="No published opportunities yet"/></strong><span><I18nText id="Control document access, confidentiality gates, expiry and download policy."/></span></div>}</div></section></main>;
}
