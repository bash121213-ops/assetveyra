'use client';

import { FormEvent, useState } from 'react';
import { I18nText, useLocale } from '@/components/LocaleShell';
import { translate } from '@/lib/i18n';
import '@/lib/i18nLegalConsultation';

export default function LegalConsultationPage() {
  const locale = useLocale();
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formElement = event.currentTarget;
    setStatus('sending');
    const form = new FormData(formElement);
    form.set('locale', locale);
    try {
      const response = await fetch('/api/legal-consultation', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(Object.fromEntries(form.entries())) });
      if (!response.ok) throw new Error();
      formElement.reset(); setStatus('success');
    } catch { setStatus('error'); }
  }

  return (
    <main className="app-shell">
      <header className="app-header"><a className="brand" href="/">ASSETVEYRA</a><nav><a href="/#opportunities"><I18nText id="Opportunities" /></a><a href="/#about"><I18nText id="About" /></a><a href="/login"><I18nText id="Sign in" /></a></nav></header>
      <section className="form-page">
        <div className="eyebrow"><I18nText id="ASSETVEYRA LEGAL" /></div>
        <h1><I18nText id="Request a legal consultation" /></h1>
        <p><I18nText id="AssetVeyra can coordinate access to qualified legal professionals and established legal relationships for matters connected with real estate, investment transactions and related documentation." /></p>
        <div className="notice" style={{ margin: '1.25rem 0', padding: '1rem', border: '1px solid rgba(255,255,255,.14)', borderRadius: 14 }}><strong><I18nText id="Important" /></strong><p style={{ marginBottom: 0 }}><I18nText id="Submitting this form does not create a lawyer-client relationship or guarantee representation. Your request is reviewed first and may be referred according to jurisdiction, subject matter, availability and applicable professional rules." /></p></div>
        <form onSubmit={submit} className="form-grid">
          <label><I18nText id="Name" /><input name="name" required minLength={2} maxLength={120} autoComplete="name" /></label>
          <label><I18nText id="Email" /><input name="email" type="email" required maxLength={320} autoComplete="email" /></label>
          <label><I18nText id="Phone" /><input name="phone" required maxLength={40} autoComplete="tel" /></label>
          <label><I18nText id="Country of legal matter" /><input name="matter_country" required maxLength={100} /></label>
          <label><I18nText id="City or jurisdiction" /><input name="jurisdiction" required maxLength={120} /></label>
          <label><I18nText id="Legal matter type" /><select name="matter_type" defaultValue="real_estate" required><option value="real_estate">{translate('Real estate', locale)}</option><option value="transaction">{translate('Real estate transaction', locale)}</option><option value="investment">{translate('Investment structure or documentation', locale)}</option><option value="contract">{translate('Contract review or drafting', locale)}</option><option value="due_diligence">{translate('Legal due diligence', locale)}</option><option value="dispute">{translate('Dispute or claim', locale)}</option><option value="corporate">{translate('Corporate or entity matter', locale)}</option><option value="other">{translate('Other legal matter', locale)}</option></select></label>
          <label><I18nText id="Your role" /><select name="role" defaultValue="investor" required><option value="investor">{translate('Investor', locale)}</option><option value="seller">{translate('Seller', locale)}</option><option value="buyer">{translate('Buyer', locale)}</option><option value="company">{translate('Company or organization', locale)}</option><option value="other">{translate('Other', locale)}</option></select></label>
          <label><I18nText id="Urgency" /><select name="urgency" defaultValue="standard" required><option value="standard">{translate('Standard', locale)}</option><option value="soon">{translate('Within a few days', locale)}</option><option value="urgent">{translate('Urgent', locale)}</option></select></label>
          <label className="full"><I18nText id="Describe your legal matter" /><textarea name="description" rows={8} required minLength={20} maxLength={6000} /></label>
          <label className="full"><I18nText id="What outcome or assistance do you need?" /><textarea name="desired_outcome" rows={5} maxLength={3000} /></label>
          <label className="full" style={{ display: 'flex', gap: '.7rem', alignItems: 'flex-start' }}><input name="consent" type="checkbox" value="true" required style={{ width: 'auto', marginTop: '.3rem' }} /><span><I18nText id="I consent to AssetVeyra reviewing this request and sharing relevant information with an appropriate legal professional for the purpose of evaluating the consultation request." /></span></label>
          <div aria-hidden="true" style={{ position: 'absolute', left: '-10000px' }}><input name="website" tabIndex={-1} autoComplete="off" /></div>
          <div className="full"><button className="button primary" type="submit" disabled={status === 'sending'}>{status === 'sending' ? <I18nText id="Sending…" /> : <I18nText id="Submit consultation request" />}</button>{status === 'success' && <p role="status"><I18nText id="Your legal consultation request has been received. We will review it and contact you about the next step." /></p>}{status === 'error' && <p role="alert"><I18nText id="Unable to submit the consultation request. Please try again." /></p>}</div>
        </form>
      </section>
    </main>
  );
}
