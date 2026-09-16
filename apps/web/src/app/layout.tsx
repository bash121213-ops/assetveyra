import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { cookies, headers } from 'next/headers';
import { Cairo, Inter } from 'next/font/google';
import './globals.css';
import './locale-overrides.css';
import './external-market.css';
import LocaleShell from '@/components/LocaleShell';
import { detectLocaleFromLanguages, normalizeLocale } from '@/lib/i18n';
const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });
const cairo = Cairo({ subsets: ['arabic'], variable: '--font-cairo', display: 'swap', weight: ['400', '500', '600', '700', '800'] });
export const metadata: Metadata = { metadataBase:new URL('https://assetveyra.com'), title:'AssetVeyra | Global Real Estate Investment', description:'Discover, verify, diligence and execute institutional-grade real estate opportunities.', alternates:{canonical:'/'}, robots:{index:true,follow:true}, openGraph:{type:'website',url:'https://assetveyra.com/',siteName:'AssetVeyra',title:'AssetVeyra | Global Real Estate Investment',description:'Discover, verify, diligence and execute institutional-grade real estate opportunities.'} };
export default async function RootLayout({children}:{children:ReactNode}){const headerList=await headers();const cookieStore=await cookies();const saved=cookieStore.get('assetveyra-locale')?.value;const acceptLanguage=headerList.get('accept-language')||'en';const initialLocale=saved?normalizeLocale(saved):detectLocaleFromLanguages(acceptLanguage.split(',').map(part=>part.split(';')[0].trim()));return <html lang={initialLocale} dir={initialLocale==='ar'?'rtl':'ltr'} suppressHydrationWarning><body className={`${inter.variable} ${cairo.variable}`}><LocaleShell initialLocale={initialLocale}>{children}</LocaleShell></body></html>}
