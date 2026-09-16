'use client';
import { FormEvent, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { I18nText } from '@/components/LocaleShell';
import { createClient } from '@/lib/supabase/client';

export default function ContactPage(){
  const router=useRouter();
  const searchParams=useSearchParams();
  const [status,setStatus]=useState<'idle'|'sending'|'success'|'error'>('idle');
  const [checkingAuth,setCheckingAuth]=useState(true);
  const [message,setMessage]=useState('');

  useEffect(()=>{
    const supabase=createClient();
    let active=true;
    supabase.auth.getUser().then(({data})=>{
      if(!active)return;
      if(!data.user){
        router.replace(`/login?next=${encodeURIComponent('/contact'+(searchParams.toString()?`?${searchParams.toString()}`:''))}`);
        return;
      }
      setCheckingAuth(false);
      const opportunity=searchParams.get('opportunity');
      if(opportunity)setMessage(`I would like to request information about: ${opportunity}`);
    });
    return()=>{active=false;};
  },[router,searchParams]);

  async function submit(event:FormEvent<HTMLFormElement>){
    event.preventDefault();
    const formElement=event.currentTarget;
    setStatus('sending');
    const form=new FormData(formElement);
    try{
      const response=await fetch('/api/contact',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(Object.fromEntries(form.entries()))});
      if(response.status===401){router.replace('/login?next=/contact');return;}
      if(!response.ok)throw new Error();
      formElement.reset();
      setMessage('');
      setStatus('success');
    }catch{
      setStatus('error');
    }
  }

  if(checkingAuth)return <main className="app-shell"><section className="form-page"><p><I18nText id="Checking your account…"/></p></section></main>;

  return <main className="app-shell"><header className="app-header"><a className="brand" href="/">ASSETVEYRA</a><nav><a href="/opportunities"><I18nText id="Opportunities"/></a><a href="/dashboard"><I18nText id="Dashboard"/></a><a href="/logout"><I18nText id="Sign out"/></a></nav></header><section className="form-page"><div className="eyebrow"><I18nText id="ASSETVEYRA CONTACT"/></div><h1><I18nText id="Tell us what you are looking for."/></h1><p><I18nText id="For investment opportunities, asset submissions and business enquiries. We review the request before sharing controlled information."/></p><form onSubmit={submit} className="form-grid"><label><I18nText id="Name"/><input name="name" required minLength={2} maxLength={120} autoComplete="name"/></label><label><I18nText id="Email"/><input name="email" type="email" required maxLength={320} autoComplete="email"/></label><label><I18nText id="Phone"/> <span>(<I18nText id="optional"/>)</span><input name="phone" maxLength={40} autoComplete="tel"/></label><label><I18nText id="What can we help with?"/><select name="interest" defaultValue="investment"><option value="investment"><I18nText id="Investment opportunity"/></option><option value="asset"><I18nText id="Submit an asset"/></option><option value="partnership"><I18nText id="Partnership"/></option><option value="general"><I18nText id="General enquiry"/></option></select></label><label className="full"><I18nText id="Message"/><textarea name="message" rows={7} required minLength={10} maxLength={4000} value={message} onChange={event=>setMessage(event.target.value)}/></label><div aria-hidden="true" style={{position:'absolute',left:'-10000px'}}><input name="website" tabIndex={-1} autoComplete="off"/></div><div className="full"><button className="button primary" type="submit" disabled={status==='sending'}>{status==='sending'?<I18nText id="Sending…"/>:<I18nText id="Send request"/>}</button>{status==='success'&&<p role="status"><I18nText id="Your request has been received."/></p>}{status==='error'&&<p role="alert"><I18nText id="Unable to send the request."/></p>}</div></form></section></main>;
}
