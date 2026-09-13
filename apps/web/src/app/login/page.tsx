'use client';

import { FormEvent, useState } from 'react';
import { createClient } from '@/lib/supabase/client';

export default function LoginPage() {
  const [mode, setMode] = useState<'login'|'signup'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [message, setMessage] = useState('');
  const [busy, setBusy] = useState(false);

  async function submit(e: FormEvent) {
    e.preventDefault(); setBusy(true); setMessage('');
    const supabase = createClient();
    const result = mode === 'login'
      ? await supabase.auth.signInWithPassword({ email, password })
      : await supabase.auth.signUp({ email, password, options: { data: { full_name: fullName } } });
    setBusy(false);
    if (result.error) { setMessage(result.error.message); return; }
    window.location.href = mode === 'login' ? '/dashboard' : '/onboarding';
  }

  return <main className="auth-page"><section className="auth-card">
    <a className="brand" href="/">ASSETVEYRA</a>
    <div className="eyebrow">SECURE ACCESS</div>
    <h1>{mode === 'login' ? 'Sign in to your workspace' : 'Create your account'}</h1>
    <p>Identity, organization and transaction access are governed by AssetVeyra security policies.</p>
    <form onSubmit={submit}>
      {mode === 'signup' && <label>Full name<input required value={fullName} onChange={e=>setFullName(e.target.value)} /></label>}
      <label>Email<input required type="email" value={email} onChange={e=>setEmail(e.target.value)} /></label>
      <label>Password<input required minLength={8} type="password" value={password} onChange={e=>setPassword(e.target.value)} /></label>
      {message && <div className="form-error">{message}</div>}
      <button className="button primary" disabled={busy}>{busy ? 'Processing…' : mode === 'login' ? 'Sign in' : 'Create account'}</button>
    </form>
    <button className="text-button" onClick={()=>setMode(mode==='login'?'signup':'login')}>
      {mode === 'login' ? 'Create an account' : 'Already have an account? Sign in'}
    </button>
  </section></main>;
}
