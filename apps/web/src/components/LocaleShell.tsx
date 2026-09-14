'use client';

import { ReactNode, useEffect, useRef, useState } from 'react';
import { detectLocaleFromLanguages, LOCALE_LABELS, normalizeLocale, RTL_LOCALES, SUPPORTED_LOCALES, translate, type Locale } from '@/lib/i18n';
import { translateExtra } from '@/lib/i18n-extra';
import { translateHome } from '@/lib/i18n-home';
import { PUBLIC_TRANSLATIONS } from '@/lib/i18n-public-ar';

function translateValue(value: string, locale: Locale) {
  const key = value.trim();
  const base = translate(key, locale);
  if (base !== key) return base;
  const home = translateHome(key, locale);
  if (home !== key) return home;
  const extra = translateExtra(key, locale);
  if (extra !== key) return extra;
  return PUBLIC_TRANSLATIONS[locale]?.[key] ?? key;
}

function translateTextNodes(root: HTMLElement, locale: Locale, originals: Map<Text, string>) {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  const nodes: Text[] = [];
  let node: Node | null;
  while ((node = walker.nextNode())) {
    const parent = node.parentElement;
    if (!parent || parent.tagName === 'SCRIPT' || parent.tagName === 'STYLE' || parent.closest('.language-switcher') || parent.closest('[data-no-translate]')) continue;
    if ((node.textContent ?? '').trim().length > 1) nodes.push(node as Text);
  }

  for (const textNode of nodes) {
    const current = textNode.textContent ?? '';
    const original = originals.get(textNode) ?? current;
    originals.set(textNode, original);
    const leading = original.match(/^\s*/)?.[0] ?? '';
    const trailing = original.match(/\s*$/)?.[0] ?? '';
    const translated = `${leading}${translateValue(original, locale)}${trailing}`;
    if (current !== translated) textNode.textContent = translated;
  }
}

function translateAttributes(root: HTMLElement, locale: Locale) {
  root.querySelectorAll<HTMLElement>('[placeholder], [aria-label], [title]').forEach((element) => {
    for (const attribute of ['placeholder', 'aria-label', 'title']) {
      const value = element.getAttribute(attribute);
      if (!value) continue;
      const translated = translateValue(value, locale);
      if (translated !== value) element.setAttribute(attribute, translated);
    }
  });
}

const ARABIC_LAYOUT_CSS = `
html.rtl body{font-family:Inter,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",Arial,sans-serif;direction:rtl;text-align:right}
html.rtl .site-header,html.rtl .app-header{direction:rtl}
html.rtl .site-header nav,html.rtl .app-header nav{flex-direction:row;direction:rtl}
html.rtl .hero-home{direction:rtl;grid-template-columns:.95fr 1.05fr}
html.rtl .hero-copy-block{order:1;text-align:right}
html.rtl .hero-visual{order:2}
html.rtl .hero-location{left:auto;right:24px}
html.rtl .hero-floating-card{right:auto;left:24px;text-align:right}
html.rtl .hero h1{letter-spacing:-.045em;line-height:1.02}
html.rtl .hero-actions{justify-content:flex-start;flex-direction:row}
html.rtl .market-strip{direction:rtl}
html.rtl .market-strip>div{border-right:0;border-left:1px solid var(--line)}
html.rtl .market-strip>div:last-child{border-left:0}
html.rtl .section,html.rtl .workflow-section{direction:rtl}
html.rtl .wide-heading{direction:rtl;grid-template-columns:.8fr 1.2fr}
html.rtl .wide-heading p{justify-self:start}
html.rtl .market-toolbar{direction:rtl}
html.rtl .market-grid,html.rtl .opportunity-grid{direction:rtl}
html.rtl .market-card,html.rtl .opportunity-card{direction:rtl;text-align:right}
html.rtl .source-badge{left:auto;right:15px}
html.rtl .market-index{right:auto;left:15px}
html.rtl .card-meta,html.rtl .card-data,html.rtl .card-actions{direction:rtl}
html.rtl .price-row{direction:rtl}
html.rtl .capability-grid,html.rtl .lifecycle{direction:rtl}
html.rtl .lifecycle{border-left:0;border-right:1px solid var(--line)}
html.rtl .lifecycle-step{border-right:0;border-left:1px solid var(--line)}
html.rtl .lifecycle-step:last-child{border-left:0}
html.rtl .intelligence-section{direction:rtl;grid-template-columns:1.2fr .8fr}
html.rtl .intelligence-copy{order:1}
html.rtl .intelligence-map{order:2}
html.rtl .map-overlay{left:20px;right:20px;text-align:right}
html.rtl .contact-section{direction:rtl;grid-template-columns:.8fr 1.2fr}
html.rtl .contact-card{order:1;text-align:right}
html.rtl .contact-section>div:first-child{order:2}
html.rtl .footer{direction:rtl}
html.rtl .footer>div{flex-direction:row-reverse}
html.rtl .footer-links{flex-direction:row-reverse}
html.rtl .dashboard-head,html.rtl .page-head,html.rtl .form-page,html.rtl .detail{direction:rtl;text-align:right}
html.rtl .dashboard-head{flex-direction:row-reverse}
html.rtl .stats,html.rtl .facts,html.rtl .row{direction:rtl}
html.rtl .stats div{border-right:0;border-left:1px solid var(--line)}
html.rtl .stats div:last-child{border-left:0}
html.rtl .facts div{padding:20px 0 20px 16px}
html.rtl .detail-grid{direction:rtl;grid-template-columns:.7fr 1.5fr}
html.rtl .deal-gate{order:1;text-align:right}
html.rtl .detail-grid>div:first-child{order:2}
html.rtl .form-grid{direction:rtl}
html.rtl .form-grid .full{grid-column:1/-1}
html.rtl .auth-page{direction:rtl}
html.rtl .auth-card{text-align:right}
html.rtl input,html.rtl textarea,html.rtl select{direction:rtl;text-align:right}
`;

export default function LocaleShell({ children, initialLocale }: { children: ReactNode; initialLocale: Locale }) {
  const [locale, setLocale] = useState<Locale>(initialLocale);
  const originalsRef = useRef(new Map<Text, string>());

  useEffect(() => {
    const saved = window.localStorage.getItem('assetveyra-locale');
    const detected = saved ? normalizeLocale(saved) : detectLocaleFromLanguages(navigator.languages?.length ? navigator.languages : [navigator.language]);
    setLocale(detected);
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = RTL_LOCALES.has(locale) ? 'rtl' : 'ltr';
    document.documentElement.dataset.locale = locale;
    document.documentElement.classList.toggle('rtl', RTL_LOCALES.has(locale));
    window.localStorage.setItem('assetveyra-locale', locale);

    const languageSelects = document.querySelectorAll<HTMLSelectElement>('[data-language-menu]');
    languageSelects.forEach((select) => {
      select.value = locale;
      select.onchange = () => {
        const next = normalizeLocale(select.value);
        setLocale(next);
        window.localStorage.setItem('assetveyra-locale', next);
      };
    });

    const apply = () => {
      translateTextNodes(document.body, locale, originalsRef.current);
      translateAttributes(document.body, locale);
    };
    apply();

    const observer = new MutationObserver(apply);
    observer.observe(document.body, { childList: true, subtree: true, attributes: true, attributeFilter: ['placeholder', 'aria-label', 'title'] });
    return () => {
      observer.disconnect();
      languageSelects.forEach((select) => { select.onchange = null; });
    };
  }, [locale]);

  return (
    <>
      <style id="assetveyra-arabic-layout">{ARABIC_LAYOUT_CSS}</style>
      {children}
    </>
  );
}
