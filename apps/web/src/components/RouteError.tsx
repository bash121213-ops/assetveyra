'use client';

import { I18nText } from '@/components/LocaleShell';

export default function RouteError({ reset, label = 'Unable to load this page.' }: { reset: () => void; label?: string }) {
  return (
    <main className="route-state" role="alert">
      <div className="route-state-card route-state-card-error">
        <span className="eyebrow"><I18nText id="Error" /></span>
        <h1><I18nText id="Something went wrong" /></h1>
        <p><I18nText id={label} /></p>
        <div className="route-state-actions">
          <button className="button primary" type="button" onClick={() => reset()}><I18nText id="Try again" /></button>
          <a className="button secondary" href="/opportunities"><I18nText id="Marketplace" /></a>
        </div>
      </div>
    </main>
  );
}
