'use client';

import { useLocale } from '@/components/LocaleShell';
import { TRANSACTION_AGREEMENT_COPY } from '@/lib/legalContent';
export default function TransactionAgreementPage() {
  const locale = useLocale();
  const copy = TRANSACTION_AGREEMENT_COPY[locale];
  const copy = COPY[locale] ?? COPY.en;
  return <main className="app-shell"><section className="form-page legal-page"><div className="eyebrow">{copy.eyebrow}</div><h1>{copy.title}</h1><p className="muted">{copy.updated}</p><p>{copy.intro}</p>{copy.sections.map((s)=><section key={s.title}><h2>{s.title}</h2>{s.body.map((p)=><p key={p}>{p}</p>)}{s.bullets&&<ul>{s.bullets.map((b)=><li key={b}>{b}</li>)}</ul>}</section>)}<div className="notice">{copy.notice}</div></section></main>;
}
