import { CENTRAL_TRANSLATION_REGISTRY } from '@/lib/i18nRegistry';

export const SUPPORTED_LOCALES = ['en', 'ar', 'zh', 'es', 'fr'] as const;
export type Locale = (typeof SUPPORTED_LOCALES)[number];

export const LOCALE_LABELS: Record<Locale, string> = {
  en: 'English',
  ar: 'العربية',
  zh: '中文',
  es: 'Español',
  fr: 'Français',
};

export const RTL_LOCALES = new Set<Locale>(['ar']);

export function normalizeLocale(value?: string | null): Locale {
  const base = (value ?? '').toLowerCase().split('-')[0];
  return (SUPPORTED_LOCALES as readonly string[]).includes(base)
    ? (base as Locale)
    : 'en';
}

export function detectLocaleFromLanguages(languages: readonly string[]): Locale {
  for (const language of languages) {
    const base = (language ?? '').toLowerCase().split('-')[0];
    if ((SUPPORTED_LOCALES as readonly string[]).includes(base)) {
      return base as Locale;
    }
  }
  return 'en';
}

type TranslationSet = Record<Locale, string>;
export const TRANSLATIONS: Record<string, TranslationSet> = {
  ...CENTRAL_TRANSLATION_REGISTRY,
};

export function translate(key: string, locale: Locale): string {
  const entry = TRANSLATIONS[key];
  if (!entry) {
    if (process.env.NODE_ENV !== 'production') {
      console.warn(`Missing i18n key: ${key}`);
    }
    return key;
  }

  const value = entry[locale];
  if (value) return value;

  if (process.env.NODE_ENV !== 'production') {
    console.warn(`Missing i18n locale "${locale}" for key: ${key}`);
  }
  return key;
}

export const CORE_TRANSLATION_KEYS = Object.freeze(Object.keys(TRANSLATIONS));
