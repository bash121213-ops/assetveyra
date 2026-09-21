import type { ReactNode } from 'react';
import Brand from '@/components/Brand';
import { I18nText, LanguageSelect } from '@/components/LocaleShell';

/**
 * Shared frame for authentication screens (sign in, create account, password
 * recovery, organization setup). Presentation only: the forms keep using the
 * existing Supabase auth client and redirect logic.
 */
export default function AuthShell({
  eyebrow,
  title,
  intro,
  children,
  footer,
}: {
  eyebrow: string;
  title: string;
  intro: string;
  children: ReactNode;
  footer?: ReactNode;
}) {
  return (
    <main className="auth-page">
      <section className="auth-card" aria-labelledby="auth-title">
        <div className="auth-topbar">
          <Brand />
          <a className="auth-home" href="/">
            <span className="av-dir" aria-hidden="true">←</span>
            <I18nText id="Back to home" />
          </a>
        </div>

        <div className="eyebrow"><I18nText id={eyebrow} /></div>
        <h1 id="auth-title"><I18nText id={title} /></h1>
        <p><I18nText id={intro} /></p>

        {children}

        {footer && <div className="auth-footer">{footer}</div>}

        <div className="auth-lang">
          <I18nText id="Language" />
          <LanguageSelect />
        </div>
      </section>
    </main>
  );
}
