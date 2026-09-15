import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { I18nText } from '@/components/LocaleShell';

export default async function DataRoomsPage(){
 const s=await createClient(); const {data:{user}}=await s.auth.getUser(); if(!user)redirect('/login');
 const {data:members}=await s.from('organization_members').select('organization_id').eq('user_id',user.id); const ids=(members??[]).map((m:any)=>m.organization_id);
 const {data:rooms}=ids.length?await s.from('data_rooms').select('id,name,status,nda_required,watermark_enabled,download_enabled,created_at,opportunities(slug,assets(title))').in('organization_id',ids).order('updated_at',{ascending:false}):{data:[] as any[]};
 return <main className="app-shell"><header className="app-header"><a className="brand" href="/">ASSETVEYRA</a><nav><a href="/workspace"><I18nText id="Workspace"/></a><a href="/opportunities"><I18nText id="Marketplace"/></a></nav></header><section className="page-head"><div className="eyebrow"><I18nText id="PRIVATE DATA ROOMS"/></div><h1><I18nText id="Controlled disclosure."/></h1><p><I18nText id="Private diligence material is separated from the public marketplace. Access is organization-scoped and can be time-limited."/></p></section><section className="panel"><div className="table">{(rooms??[]).map((r:any)=><a className="row" href={`/workspace/data-rooms/${r.id}`} key={r.id}><strong>{r.name}</strong><span><I18nText id="Opportunity"/></span><span><I18nText id={r.status}/></span><span><I18nText id={r.nda_required?'NDA required':'NDA optional'}/> · <I18nText id={r.download_enabled?'Downloads on':'View only'}/></span></a>)}{!(rooms?.length)&&<div className="empty-state"><strong><I18nText id="No active data rooms."/></strong><span><I18nText id="Data rooms are created only for controlled opportunities."/></span></div>}</div></section></main>;
}
