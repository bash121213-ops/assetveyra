'use client';

import { useLocale } from '@/components/LocaleShell';
import { translate } from '@/lib/i18n';

type Key = 'Global market watch' | 'Real external listings, organized by country' | 'These are live third-party market listings discovered from public sources. They are not yet represented as verified AssetVeyra opportunities.' | 'External source · independently verify before transaction' | 'listings' | 'Area' | 'Rooms' | 'View source listing' | 'Source' | 'Checked' | 'Land' | 'Hotel' | 'Hospitality';

export function ExternalMarketText({id}: {id:Key}){const locale=useLocale();return <>{translate(id, locale)}</>;}
