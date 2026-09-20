'use client';

import { useLocale } from '@/components/LocaleShell';
import { TERMS_COPY } from '@/lib/legalContent';
export default function TermsPage() {
  const locale = useLocale();
  const copy = TERMS_COPY[locale];
  return (
    <main className="app-shell">
      <article className="form-page" style={{ maxWidth: 980, margin: '0 auto' }}>
        <div className="eyebrow">{copy.eyebrow}</div>
        <h1>{copy.title}</h1>
        <p style={{ opacity: 0.7 }}>{copy.updated}</p>
        <p style={{ fontSize: '1.05rem', lineHeight: 1.8 }}>{copy.intro}</p>
        {copy.sections.map((section) => (
          <section key={section.title} style={{ marginTop: 32 }}>
            <h2>{section.title}</h2>
            {section.paragraphs?.map((p) => <p key={p} style={{ lineHeight: 1.8 }}>{p}</p>)}
            {section.bullets && <ul style={{ lineHeight: 1.8, paddingInlineStart: 24 }}>{section.bullets.map((b) => <li key={b}>{b}</li>)}</ul>}
          </section>
        ))}
        <aside style={{ marginTop: 40, padding: 20, border: '1px solid var(--line)', borderRadius: 14, lineHeight: 1.8 }}>
          <strong>{copy.notice}</strong>
        </aside>
      </article>
    </main>
  );
}
