import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { headers } from 'next/headers';
import './globals.css';
import LocaleShell from '@/components/LocaleShell';
import { detectLocaleFromLanguages } from '@/lib/i18n';

export const metadata: Metadata = {
  title: 'AssetVeyra | Global Real Estate Investment',
  description: 'Discover, verify, diligence and execute institutional-grade real estate opportunities.',
};

export default async function RootLayout({ children }: { children: ReactNode }) {
  const headerList = await headers();
  const acceptLanguage = headerList.get('accept-language') || 'en';
  const initialLocale = detectLocaleFromLanguages(acceptLanguage.split(',').map((part) => part.split(';')[0].trim()));

  return (
    <html lang={initialLocale} dir={initialLocale === 'ar' ? 'rtl' : 'ltr'} suppressHydrationWarning>
      <body><LocaleShell initialLocale={initialLocale}>{children}</LocaleShell></body>
    </html>
  );
}
