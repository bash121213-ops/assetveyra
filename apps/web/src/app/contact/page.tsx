'use client';

import { FormEvent, useState } from 'react';

export default function ContactPage() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [error, setError] = useState('');

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus('sending');
    setError('');
    const form = new FormData(event.currentTarget);
    const payload = Object.fromEntries(form.entries());

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Unable to send the request.');
      setStatus('success');
      event.currentTarget.reset();
    } catch (err) {
      setStatus('error');
      setError(err instanceof Error ? err.message : 'Unable to send the request.');
    }
  }

  return (
    <main className="app-shell">
      <header className="app-header">
        <a className="brand" href="/">ASSETVEYRA</a>
        <nav>
          <a href="/#market">Market</a>
          <a href="/#platform">Platform</a>
          <a href="/login">Sign in</a>
        </nav>
      </header>

      <section className="form-page">
        <div className="eyebrow">ASSETVEYRA CONTACT</div>
        <h1>Tell us what you are looking for.</h1>
        <p>For investment opportunities, asset submissions and business enquiries. We review the request before sharing controlled information.</p>

        <form onSubmit={submit} className="form-grid">
          <label>Name<input name="name" required minLength={2} maxLength={120} autoComplete="name" /></label>
          <label>Email<input name="email" type="email" required maxLength={320} autoComplete="email" /></label>
          <label>Phone <span>(optional)</span><input name="phone" maxLength={40} autoComplete="tel" /></label>
          <label>What can we help with?
            <select name="interest" defaultValue="investment">
              <option value="investment">Investment opportunity</option>
              <option value="asset">Submit an asset</option>
              <option value="partnership">Partnership</option>
              <option value="general">General enquiry</option>
            </select>
          </label>
          <label className="full">Message<textarea name="message" rows={7} required minLength={10} maxLength={4000} placeholder="Briefly tell us what you are looking for." /></label>
          <div aria-hidden="true" style={{ position: 'absolute', left: '-10000px' }}><input name="website" tabIndex={-1} autoComplete="off" /></div>
          <div className="full">
            <button className="button primary" type="submit" disabled={status === 'sending'}>{status === 'sending' ? 'Sending…' : 'Send request'}</button>
            {status === 'success' && <p role="status">Your request has been received. We will review it and respond through the contact details you provided.</p>}
            {status === 'error' && <p role="alert">{error}</p>}
          </div>
        </form>
      </section>
    </main>
  );
}
