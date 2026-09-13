'use client';

import { useEffect } from 'react';

export default function Error({error,reset}:{error:Error & {digest?:string};reset:()=>void}){
 useEffect(()=>{console.error(error)},[error]);
 return <main className="auth-page"><section className="auth-card"><div className="eyebrow">SYSTEM ERROR</div><h1>Something went wrong.</h1><p>The transaction workspace could not complete this request. No sensitive data was exposed by this error boundary.</p><div className="hero-actions"><button className="button primary" onClick={()=>reset()}>Try again</button><a className="button secondary" href="/workspace">Workspace</a></div></section></main>
}
