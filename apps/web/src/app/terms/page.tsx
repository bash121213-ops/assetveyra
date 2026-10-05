'use client';

import { useLocale } from '@/components/LocaleShell';
import { TERMS_COPY } from '@/lib/legalContent';
import SiteChrome from '@/components/SiteChrome';
export default function TermsPage() {
  const locale = useLocale();
  const copy = TERMS_COPY[locale];
  return (
    <SiteChrome>
      <main className="app-shell">
      <article className="form-page">
        <div className="eyebrow">{copy.eyebrow}</div>
        <h1>{copy.title}</h1>
        <p>{copy.updated}</p>
        <p>{copy.intro}</p>
        {copy.sections.map((section) => (
          <section key={section.title}>
            <h2>{section.title}</h2>
            {section.paragraphs?.map((p) => <p key={p}>{p}</p>)}
            {section.bullets && <ul>{section.bullets.map((b) => <li key={b}>{b}</li>)}</ul>}
          </section>
        ))}
        <aside>
          <strong>{copy.notice}</strong>
        </aside>
      </article>
    </main>
    </SiteChrome>
  );
}
