import { TRANSLATIONS, type Locale } from '@/lib/i18n';

const workspaceEntries: Record<string, Record<Locale, string>> = {
  'Add Property': {
    en: 'Add Property',
    ar: 'إضافة عقار',
    zh: '添加物业',
    es: 'Añadir propiedad',
    fr: 'Ajouter un bien',
  },
};

for (const [key, value] of Object.entries(workspaceEntries)) {
  TRANSLATIONS[key] = value;
}
