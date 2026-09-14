'use client';

import { FormEvent, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { I18nText } from '@/components/LocaleShell';

export default function ResetPasswordPage() {
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  async function submit(event: FormEvent) {
    event.preventDefault();
    setError('');
    setMessage('');
    if (password !== confirm) {
      setError('Passwords do not match.');
      return;
    }
    setBusy(true);
    const result = await createClient().auth.updateUser({ password });
    if (result.error) setError(result.error.message);
    else {
      setMessage('Password updated. You can now sign in.');
      setPassword('');
      setConfirm('');
    }
    setBusy(false);
  }

  return (
    <main className="auth-page">
      <section className="auth-card">
        <a className="brand" href="/">ASSETVEYRA</a>
        <div className="eyebrow"><I18nText id="SECURE ACCESS" /></div>
        <h1><I18nText id="Reset password" /></h1>
        <p><I18nText id="Choose a new password for your AssetVeyra account." /></p>
        <form onSubmit={submit}>
          <label>
            <I18nText id="New password" />
            <input required minLength={8} type="password" autoComplete="new-password" value={password} onChange={(event) => setPassword(event.target.value)} />
          </label>
          <label>
            <I18nText id="Confirm password" />
            <input required minLength={8} type="password" autoComplete="new-password" value={confirm} onChange={(event) => setConfirm(event.target.value)} />
          </label>
          {error && <div className="form-error" role="alert"><I18nText id={error === 'Passwords do not match.' ? error : 'Unable to update the password.'} /></div>}
          {message && <div className="form-success" role="status"><I18nText id={message} /></div>}
          <button className="button primary" disabled={busy}>{busy ? <I18nText id="Processing…" /> : <I18nText id="Reset password" />}</button>
        </form>
        <a className="text-button" href="/login"><I18nText id="Sign in" /></a>
      </section>
    </main>
  );
}
