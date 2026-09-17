import { CENTRAL_TRANSLATION_REGISTRY } from '@/lib/i18nRegistry';
import { TRUST_TRANSLATIONS } from '@/lib/i18nTrust';
export const SUPPORTED_LOCALES=['en','ar','zh','es','fr'] as const;
export type Locale=(typeof SUPPORTED_LOCALES)[number];
export const LOCALE_LABELS:Record<Locale,string>={en:'English',ar:'العربية',zh:'中文',es:'Español',fr:'Français'};
export const RTL_LOCALES=new Set<Locale>(['ar']);
export function normalizeLocale(value?:string|null):Locale{const base=(value??'').toLowerCase().split('-')[0];return (SUPPORTED_LOCALES as readonly string[]).includes(base)?base as Locale:'en';}
export function detectLocaleFromLanguages(languages:readonly string[]):Locale{for(const language of languages){const base=(language??'').toLowerCase().split('-')[0];if((SUPPORTED_LOCALES as readonly string[]).includes(base))return base as Locale;}return 'en';}
type TranslationSet=Record<Locale,string>;
export const TRANSLATIONS:Record<string,TranslationSet>={};
Object.assign(TRANSLATIONS, CENTRAL_TRANSLATION_REGISTRY, TRUST_TRANSLATIONS);
export function translate(key:string,locale:Locale):string{return TRANSLATIONS[key]?.[locale]??TRANSLATIONS[key]?.en??key;}
export const CORE_TRANSLATION_KEYS=Object.freeze(Object.keys(TRANSLATIONS));
