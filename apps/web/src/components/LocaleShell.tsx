'use client';

import { ReactNode, useEffect, useState } from 'react';
import { detectLocaleFromLanguages, LOCALE_LABELS, normalizeLocale, RTL_LOCALES, SUPPORTED_LOCALES, translate, type Locale } from '@/lib/i18n';

function translateTextNodes(root: HTMLElement, locale: Locale) {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  const nodes: Text[] = [];
  let node: Node | null;
  while ((node = walker.nextNode())) {
    const text = node.textContent?.trim();
    if (text && text.length > 1 && node.parentElement?.tagName !== 'SCRIPT' && node.parentElement?.tagName !== 'STYLE') nodes.push(node as Text);
  }
  for (const textNode of nodes) {
    const raw = textNode.textContent ?? '';
    const leading = raw.match(/^\s*/)?.[0] ?? '';
    const trailing = raw.match(/\s*$/)?.[0] ?? '';
    const translated = translate(raw.trim(), locale);
    if (translated !== raw.trim()) textNode.textContent = `${leading}${translated}${trailing}`;
  }
}

export default function LocaleShell({ children, initialLocale }: { children: ReactNode; initialLocale: Locale }) {
  const [locale, setLocale] = useState<Locale>(initialLocale);

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
    translateTextNodes(document.body, locale);
  }, [locale]);

  function changeLocale(next: Locale) {
    setLocale(next);
    window.localStorage.setItem('assetveyra-locale', next);
  }

  return <>
    {children}
    <div className="language-switcher" aria-label="Language">
      <select value={locale} onChange={(e) => changeLocale(e.target.value as Locale)}>
        {SUPPORTED_LOCALES.map((code) => <option key={code} value={code}>{LOCALE_LABELS[code]}</option>)}
      </select>
    </div>
  </>;
}
