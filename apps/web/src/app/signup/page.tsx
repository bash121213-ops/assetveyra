'use client';

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { I18nText, useLocale } from '@/components/LocaleShell';
import AuthShell from '@/components/AuthShell';

/**
 * Account type selected here is written to Supabase auth user metadata only.
 * It expresses intent for the existing organization-setup flow; no role,
 * membership or authorization rule is decided on this screen.
 */
type AccountType = 'investor' | 'seller';

export default function SignupPage() {
  const router = useRouter();
  const locale = useLocale();
  const [accountType, setAccountType] = useState<AccountType>('investor');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [accepted, setAccepted] = useState(false);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  async function submit(event: FormEvent) {
    event.preventDefault();
    setError('');
    setMessage('');
    if (!accepted) {
      setError('Please acknowledge the Terms and Privacy Policy before creating an account.');
      return;
    }
    setBusy(true);
    const result = await createClient().auth.signUp({
      email,
      password,
      options: {
        data: { locale, account_type: accountType },
        emailRedirectTo: `${window.location.origin}/auth/callback?next=/onboarding`,
      },
    });
    if (result.error) setError(result.error.message);
    else if (!result.data.session) setMessage('Account created. Check your email to verify the account, then sign in.');
    else router.push('/onboarding');
    setBusy(false);
  }

  return <AuthShell
    eyebrow="SECURE ACCESS"
    title="Create Account"
    intro="Create an account to enter the AssetVeyra transaction network."
    footer={<a className="text-button" href="/login"><I18nText id="Sign in" /></a>}
  >
    <form onSubmit={submit}>
      <fieldset className="auth-choice">
        <legend><I18nText id="How will you use AssetVeyra?" /></legend>
        <button type="button" aria-pressed={accountType === 'investor'} onClick={() => setAccountType('investor')}>
          <strong><I18nText id="Investor" /></strong>
          <span><I18nText id="Discover opportunities and request controlled access." /></span>
        </button>
        <button type="button" aria-pressed={accountType === 'seller'} onClick={() => setAccountType('seller')}>
          <strong><I18nText id="Seller" /></strong>
          <span><I18nText id="Submit an asset and follow its verification status." /></span>
        </button>
      </fieldset>
      <label><I18nText id="Email" /><input required type="email" autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} /></label>
      <label><I18nText id="Password" /><input required minLength={8} type="password" autoComplete="new-password" value={password} onChange={(event) => setPassword(event.target.value)} /></label>
      <label className="auth-consent">
        <input type="checkbox" checked={accepted} onChange={(event) => setAccepted(event.target.checked)} required />
        <span><I18nText id="Terms/Privacy acknowledgement" /> — <a href="/terms"><I18nText id="Terms" /></a> / <a href="/privacy"><I18nText id="Privacy" /></a></span>
      </label>
      {error && <div className="form-error" role="alert"><I18nText id={error === 'Please acknowledge the Terms and Privacy Policy before creating an account.' ? error : 'Something went wrong.'} /></div>}
      {message && <div className="form-success" role="status"><I18nText id="Account created. Check your email to verify the account, then sign in." /></div>}
      <button className="button primary" disabled={busy}>{busy ? <I18nText id="Processing…" /> : <I18nText id="Create Account" />}</button>
    </form>
  </AuthShell>;
}
