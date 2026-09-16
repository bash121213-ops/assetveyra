'use client';

import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from 'react';
import { normalizeLocale, RTL_LOCALES, translate, type Locale } from '@/lib/i18n';

type LocaleContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
};

const LocaleContext = createContext<LocaleContextValue>({
  locale: 'en',
  setLocale: () => undefined,
});

export function useLocale(): Locale {
  return useContext(LocaleContext).locale;
}

export function useLocaleActions(): Pick<LocaleContextValue, 'setLocale'> {
  return useContext(LocaleContext);
}

export function I18nText({ id, as = 'span' }: { id: string; as?: keyof JSX.IntrinsicElements }) {
  const locale = useLocale();
  const Tag = as;
  return <Tag>{translate(id, locale)}</Tag>;
}

export function LanguageSelect() {
  const { locale, setLocale } = useContext(LocaleContext);
  return (
    <select
      data-language-menu
      value={locale}
      aria-label={translate('Language', locale)}
      onChange={(event) => setLocale(normalizeLocale(event.target.value))}
    >
      <option value="en">English</option>
      <option value="ar">العربية</option>
      <option value="zh">中文</option>
      <option value="es">Español</option>
      <option value="fr">Français</option>
    </select>
  );
}

const ARABIC_LAYOUT_CSS = `
html.rtl body{direction:rtl;text-align:right}
html.rtl .site-header,html.rtl .app-header,html.rtl .hero-home,html.rtl .market-strip,html.rtl .section,html.rtl .workflow-section,html.rtl .wide-heading,html.rtl .market-toolbar,html.rtl .market-grid,html.rtl .opportunity-grid,html.rtl .market-card,html.rtl .opportunity-card,html.rtl .capability-grid,html.rtl .lifecycle,html.rtl .intelligence-section,html.rtl .contact-section,html.rtl .footer,html.rtl .dashboard-head,html.rtl .page-head,html.rtl .form-page,html.rtl .detail,html.rtl .stats,html.rtl .facts,html.rtl .row,html.rtl .form-grid,html.rtl .auth-page{direction:rtl}
html.rtl .hero-copy-block,html.rtl .market-card,html.rtl .opportunity-card,html.rtl .contact-card,html.rtl .auth-card{text-align:right}
html.rtl .hero-copy-block{order:1}html.rtl .hero-visual{order:2}
html.rtl .hero-location{left:auto;right:24px}html.rtl .hero-floating-card{right:auto;left:24px}
html.rtl .market-strip>div{border-right:0;border-left:1px solid var(--line)}html.rtl .market-strip>div:last-child{border-left:0}
html.rtl .lifecycle{border-left:0;border-right:1px solid var(--line)}html.rtl .lifecycle-step{border-right:0;border-left:1px solid var(--line)}html.rtl .lifecycle-step:last-child{border-left:0}
html.rtl .source-badge{left:auto;right:15px}html.rtl .market-index{right:auto;left:15px}
html.rtl .stats div{border-right:0;border-left:1px solid var(--line)}html.rtl .stats div:last-child{border-left:0}
html.rtl .facts div{padding:20px 0 20px 16px}
`;

export default function LocaleShell({ children, initialLocale }: { children: ReactNode; initialLocale: Locale }) {
  const [locale, setLocale] = useState<Locale>(initialLocale);

  useEffect(() => {
    const direction = RTL_LOCALES.has(locale) ? 'rtl' : 'ltr';
    document.documentElement.lang = locale;
    document.documentElement.dir = direction;
    document.documentElement.dataset.locale = locale;
    document.documentElement.classList.toggle('rtl', direction === 'rtl');
    document.cookie = `assetveyra-locale=${locale}; Max-Age=31536000; Path=/; SameSite=Lax`;
  }, [locale]);

  useEffect(() => {
    const outside = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Node)) return;
      document.querySelectorAll<HTMLDetailsElement>('details.av-menu[open]').forEach((menu) => {
        if (!menu.contains(target)) menu.removeAttribute('open');
      });
    };
    const escape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        document.querySelectorAll<HTMLDetailsElement>('details.av-menu[open]').forEach((menu) => menu.removeAttribute('open'));
      }
    };
    document.addEventListener('click', outside);
    document.addEventListener('keydown', escape);
    return () => {
      document.removeEventListener('click', outside);
      document.removeEventListener('keydown', escape);
    };
  }, []);

  const value = useMemo(() => ({ locale, setLocale }), [locale]);

  return (
    <LocaleContext.Provider value={value}>
      <style id="assetveyra-arabic-layout">{ARABIC_LAYOUT_CSS}</style>
      {children}
    </LocaleContext.Provider>
  );
}
