'use client';

import { ReactNode, useEffect, useRef, useState } from 'react';
import { detectLocaleFromLanguages, LOCALE_LABELS, normalizeLocale, RTL_LOCALES, SUPPORTED_LOCALES, translate, type Locale } from '@/lib/i18n';
import { translateExtra } from '@/lib/i18n-extra';
import { translateHome } from '@/lib/i18n-home';

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
    const key = original.trim();
    const base = translate(key, locale);
    const translated = `${leading}${base !== key ? base : translateHome(key, locale) !== key ? translateHome(key, locale) : translateExtra(key, locale)}${trailing}`;
    if (current !== translated) textNode.textContent = translated;
  }
}

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

    const apply = () => translateTextNodes(document.body, locale, originalsRef.current);
    apply();

    const observer = new MutationObserver(apply);
    observer.observe(document.body, { childList: true, subtree: true });
    return () => observer.disconnect();
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
