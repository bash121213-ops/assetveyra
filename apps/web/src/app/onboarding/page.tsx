'use client';
import { FormEvent,useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { I18nText } from '@/components/LocaleShell';

function safeNext(value:string|null){
  if(!value || !value.startsWith('/') || value.startsWith('//')) return '/dashboard';
  return value;
}

export default function OnboardingPage(){
  const router=useRouter();
  const [type,setType]=useState('investor');
  const [displayName,setDisplayName]=useState('');
  const [legalName,setLegalName]=useState('');
  const [country,setCountry]=useState('JO');
  const [error,setError]=useState('');
  const [busy,setBusy]=useState(false);

  async function submit(e:FormEvent){
    e.preventDefault();
    setBusy(true); setError('');
    const {error}=await createClient().rpc('create_organization',{p_type:type,p_legal_name:legalName||null,p_display_name:displayName,p_country_code:country});
    if(error)setError(error.message);
    else {
      const next=new URLSearchParams(window.location.search).get('next');
      router.push(safeNext(next));
    }
    setBusy(false);
  }

  return <main className="auth-page"><section className="auth-card"><a className="brand" href="/">ASSETVEYRA</a><div className="eyebrow"><I18nText id="ORGANIZATION SETUP"/></div><h1><I18nText id="Set up your workspace"/></h1><p><I18nText id="Your organization is the security boundary for assets, documents and transactions."/></p><form onSubmit={submit}><label><I18nText id="Organization type"/><select value={type} onChange={e=>setType(e.target.value)}><option value="investor"><I18nText id="Investor"/></option><option value="seller"><I18nText id="Seller"/></option><option value="advisor"><I18nText id="Advisor"/></option><option value="broker"><I18nText id="Broker"/></option><option value="legal"><I18nText id="Legal"/></option><option value="service_provider"><I18nText id="Service provider"/></option></select></label><label><I18nText id="Display name"/><input required value={displayName} onChange={e=>setDisplayName(e.target.value)}/></label><label><I18nText id="Legal name"/><input value={legalName} onChange={e=>setLegalName(e.target.value)}/></label><label><I18nText id="Country code"/><input required maxLength={2} value={country} onChange={e=>setCountry(e.target.value.toUpperCase())}/></label>{error&&<div className="form-error" role="alert">{error}</div>}<button className="button primary" disabled={busy}>{busy?<I18nText id="Processing…"/>:<I18nText id="Create workspace"/></button></form></section></main>}
