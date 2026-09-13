'use client';

import { FormEvent, useState } from 'react';
import { createClient } from '@/lib/supabase/client';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  async function submit(event: FormEvent) {
    event.preventDefault(); setBusy(true); setError(''); setMessage('');
    const supabase = createClient();
    const result = mode === 'signin'
      ? await supabase.auth.signInWithPassword({ email, password })
      : await supabase.auth.signUp({ email, password, options: { emailRedirectTo: `${window.location.origin}/auth/callback?next=/dashboard` } });
    if (result.error) setError(result.error.message);
    else if (mode === 'signup' && !result.data.session) setMessage('Account created. Check your email to verify the account, then sign in.');
    else window.location.href = '/dashboard';
    setBusy(false);
  }

  return <main className="auth-page"><section className="auth-card">
    <a className="brand" href="/">ASSETVEYRA</a>
    <div className="eyebrow">SECURE ACCESS</div>
    <h1>{mode === 'signin' ? 'Sign in' : 'Create account'}</h1>
    <p>{mode === 'signin' ? 'Access your investor, seller or operations workspace.' : 'Create an account to enter the AssetVeyra transaction network.'}</p>
    <form onSubmit={submit}>
      <label>Email<input required type="email" autoComplete="email" value={email} onChange={e=>setEmail(e.target.value)} /></label>
      <label>Password<input required minLength={8} type="password" autoComplete={mode==='signin'?'current-password':'new-password'} value={password} onChange={e=>setPassword(e.target.value)} /></label>
      {error && <div className="form-error">{error}</div>}{message && <div className="form-success">{message}</div>}
      <button className="button primary" disabled={busy}>{busy ? 'Processing…' : mode === 'signin' ? 'Sign in' : 'Create account'}</button>
    </form>
    <button className="text-button" onClick={()=>{setMode(mode==='signin'?'signup':'signin');setError('');setMessage('')}}>{mode==='signin' ? 'Create a new account' : 'Already have an account? Sign in'}</button>
  </section></main>;
}
