'use client';

import { FormEvent, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { I18nText } from '@/components/LocaleShell';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState(false);

  async function submit(event: FormEvent) {
    event.preventDefault();
    setBusy(true);
    setError(false);
    setMessage(false);
    const redirectTo = `${window.location.origin}/auth/callback?next=/reset-password`;
    const result = await createClient().auth.resetPasswordForEmail(email, { redirectTo });
    if (result.error) setError(true);
    else setMessage(true);
    setBusy(false);
  }

  return (
    <main className="auth-page">
      <section className="auth-card">
        <a className="brand" href="/">ASSETVEYRA</a>
        <div className="eyebrow"><I18nText id="SECURE ACCESS" /></div>
        <h1><I18nText id="Reset password" /></h1>
        <p><I18nText id="Enter your email and we will send you a password reset link." /></p>
        <form onSubmit={submit}>
          <label>
            <I18nText id="Email" />
            <input required type="email" autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} />
          </label>
          {error && <div className="form-error" role="alert"><I18nText id="Unable to send the password reset link." /></div>}
          {message && <div className="form-success" role="status"><I18nText id="Password reset link sent. Check your email." /></div>}
          <button className="button primary" disabled={busy}>{busy ? <I18nText id="Processing…" /> : <I18nText id="Send reset link" />}</button>
        </form>
        <a className="text-button" href="/login"><I18nText id="Sign in" /></a>
      </section>
    </main>
  );
}
