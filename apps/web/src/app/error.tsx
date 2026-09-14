'use client';
import { useEffect } from 'react';
import { I18nText } from '@/components/LocaleShell';
export default function Error({error,reset}:{error:Error & {digest?:string};reset:()=>void}){useEffect(()=>{console.error(error)},[error]);return <main className="auth-page"><section className="auth-card"><div className="eyebrow"><I18nText id="SYSTEM ERROR"/></div><h1><I18nText id="Something went wrong."/></h1><p><I18nText id="The transaction workspace could not complete this request. No sensitive data was exposed by this error boundary."/></p><div className="hero-actions"><button className="button primary" onClick={()=>reset()}><I18nText id="Try again"/></button><a className="button secondary" href="/workspace"><I18nText id="Workspace"/></a></div></section></main>}
