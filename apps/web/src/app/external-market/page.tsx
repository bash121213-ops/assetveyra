import ExternalMarketClient, { type ExternalListing } from './ExternalMarketClient';
import { createClient } from '@/lib/supabase/server';

export const dynamic = 'force-dynamic';

export default async function ExternalMarketPage() {
  const supabase = await createClient();
  const [{ data: { user } }, { data, error }] = await Promise.all([
    supabase.auth.getUser(),
    supabase
      .from('external_market_listings')
      .select('id,country_code,country_name,city,title,asset_type,price_amount,currency,area_sqm,rooms,summary,source_name,source_url,listed_at,checked_at')
      .eq('active', true)
      .order('country_code', { ascending: true })
      .order('price_amount', { ascending: false }),
  ]);

  if (error) {
    return <main className="app-shell"><section className="external-market-section"><div className="form-error">The external market is temporarily unavailable. Please try again shortly.</div></section></main>;
  }

  return <ExternalMarketClient listings={(data ?? []) as ExternalListing[]} authenticated={Boolean(user)} />;
}
