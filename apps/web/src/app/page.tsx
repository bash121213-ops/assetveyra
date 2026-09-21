import './av-final.css';
import Image from 'next/image';
import { createClient } from '@/lib/supabase/server';
import { I18nText } from '@/components/LocaleShell';
import SiteChrome from '@/components/SiteChrome';
import { getPublicAssetImageUrl } from '@/lib/public-asset-image-url';

const MIN_PUBLIC_VALUE = 100_000;

const sectorKeys: Record<string, string> = {
  land: 'Land',
  residential: 'Residential',
  commercial: 'Commercial',
  hotel: 'Hotel',
  hospitality: 'Hospitality',
  industrial: 'Industrial',
  mixed_use: 'Mixed use',
  development_project: 'Development project',
  infrastructure: 'Infrastructure',
  renewable_energy: 'Renewable energy',
  other: 'Other',
};

type Opportunity = { id: string; slug: string; status: string; investment_thesis: string | null; asset_id: string };
type Asset = {
  id: string; title: string; asset_type: string; country_code: string | null;
  region: string | null; city: string | null; area_sqm: number | null;
  currency: string | null; asking_price: number | null; public_summary: string | null;
};

function formatAmount(value: number | null, currency: string | null) {
  if (value === null) return '—';
  return `${currency || 'USD'} ${new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 }).format(Number(value))}`;
}
function formatArea(value: number | null) {
  if (value === null) return '—';
  return `${new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 }).format(Number(value))} m²`;
}

/**
 * Homepage data: only published opportunities that are publicly visible and
 * meet the public-value threshold. No sample or fabricated inventory.
 */
async function getHomeData() {
  const s = await createClient();
  const { data: opportunities, error } = await s
    .from('public_opportunities')
    .select('id,slug,status,investment_thesis,asset_id')
    .order('published_at', { ascending: false })
    .limit(9);

  if (error || !opportunities?.length) return { rows: [], error };

  const assetIds = (opportunities as Opportunity[]).map((item) => item.asset_id).filter(Boolean);
  const { data: assets, error: assetError } = await s
    .from('public_assets')
    .select('id,title,asset_type,country_code,region,city,area_sqm,currency,asking_price,public_summary')
    .in('id', assetIds);
  if (assetError) return { rows: [], error: assetError };

  const assetById = new Map(((assets ?? []) as Asset[]).map((asset) => [asset.id, asset]));
  const qualifying = (opportunities as Opportunity[])
    .map((opportunity) => ({ opportunity, asset: assetById.get(opportunity.asset_id) }))
    .filter((row): row is { opportunity: Opportunity; asset: Asset } =>
      Boolean(row.asset && row.asset.asking_price !== null && Number(row.asset.asking_price) >= MIN_PUBLIC_VALUE));

  const ids = qualifying.map((row) => row.asset.id);
  const { data: images } = ids.length
    ? await s.from('published_asset_images').select('asset_id,storage_path,sort_order').in('asset_id', ids).order('sort_order', { ascending: true })
    : { data: [] };

  const firstImage = new Map<string, string>();
  for (const image of (images ?? []) as { asset_id: string; storage_path: string }[]) {
    if (!firstImage.has(image.asset_id)) firstImage.set(image.asset_id, getPublicAssetImageUrl(image.storage_path));
  }

  const rows = qualifying.map((row) => ({ ...row, imageUrl: firstImage.get(row.asset.id) ?? null }));

  // Real metrics only: counts derived from the actual published records.
  const countryCount = new Set(rows.map((row) => row.asset.country_code).filter(Boolean)).size;
  const totalArea = rows.reduce((sum, row) => sum + Number(row.asset.area_sqm ?? 0), 0);
  const currency = rows.find((row) => row.asset.currency)?.asset.currency ?? 'USD';
  const totalValue = rows.reduce((sum, row) => sum + Number(row.asset.asking_price ?? 0), 0);

  return {
    rows: rows.slice(0, 6),
    total: rows.length,
    countryCount,
    totalArea,
    totalValue,
    currency,
    error: null,
  };
}

export default async function HomePage() {
  const data = await getHomeData();
  const s = await createClient();
  const { data: { user } } = await s.auth.getUser();

  const stats = [
    data.total ? { id: 'Published Opportunities', value: String(data.total), amber: true } : null,
    data.countryCount ? { id: 'Countries Represented', value: String(data.countryCount), amber: false } : null,
    data.totalArea ? { id: 'Total Land Area', value: `${new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 }).format(data.totalArea)} m²`, amber: false } : null,
  ].filter(Boolean) as { id: string; value: string; amber: boolean }[];

  return (
    <SiteChrome signedIn={Boolean(user)}>
      <main id="home" className="av-final-home">
        <section className="av-hero">
          <div className="av-hero-inner">
            <span className="av-hero-eyebrow">
              <span aria-hidden="true">🔒</span>
              <I18nText id="A trusted platform for institutional investors and developers" />
            </span>

            <h1><I18nText id="LAND. CAPITAL. OPPORTUNITY." /></h1>

            <p className="av-hero-lead">
              <I18nText id="AssetVeyra connects serious land owners with global investors, developers, family offices and strategic buyers through a controlled verification and transaction workflow." />
            </p>

            <div className="av-hero-actions">
              <a className="av-btn av-primary av-btn-lg" href="/opportunities">
                <I18nText id="Explore Opportunities" />
                <span aria-hidden="true" className="av-dir">→</span>
              </a>
              <a className="av-btn av-outline av-btn-lg" href="/submit">
                <I18nText id="Submit an Asset" />
              </a>
            </div>

            {stats.length > 0 && (
              <div className="av-stats">
                {stats.map((stat) => (
                  <div className="av-stat" key={stat.id}>
                    <span className={`av-stat-value av-numeric${stat.amber ? ' is-amber' : ''}`}>{stat.value}</span>
                    <span className="av-stat-label"><I18nText id={stat.id} /></span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        <section className="av-trust">
          <div><I18nText id="Controlled verification" /></div>
          <div><I18nText id="Confidential data room access" /></div>
          <div><I18nText id="Institutional transaction workflow" /></div>
          <div><I18nText id="Intermediary and transaction coordinator" /></div>
        </section>

        <section className="av-section">
          <div className="av-section-title">
            <div>
              <span className="eyebrow"><I18nText id="Exclusive investment opportunity" /></span>
              <h2><I18nText id="Available Opportunities" /></h2>
            </div>
            <a className="av-opp-cta" href="/opportunities"><I18nText id="View all" /> <span aria-hidden="true" className="av-dir">→</span></a>
          </div>

          <div className="av-cards">
            {data.rows.length > 0 ? data.rows.map(({ opportunity, asset, imageUrl }) => (
              <a className="av-opp-card" href={`/opportunities/${opportunity.slug}`} key={opportunity.id}>
                <div className="av-opp-media">
                  {imageUrl
                    ? <Image src={imageUrl} alt={asset.title} fill sizes="(max-width: 768px) 92vw, (max-width: 1080px) 45vw, 30vw" quality={75} />
                    : <div className="av-opp-media-placeholder"><span aria-hidden="true">◻</span><I18nText id="No image available" /></div>}
                  <span className="av-opp-badge av-badge av-badge-verified">✓ <I18nText id="Published" /></span>
                </div>
                <div className="av-opp-body">
                  <div className="av-opp-location">
                    {[asset.city, asset.region, asset.country_code].filter(Boolean).join(', ') || <I18nText id="Location" />}
                  </div>
                  <h3>{asset.title}</h3>
                  <p className="av-opp-summary">{asset.public_summary || opportunity.investment_thesis || <I18nText id="Investment opportunity" />}</p>
                  <div className="av-opp-foot">
                    <span><I18nText id="Area" />: <strong className="av-numeric">{formatArea(asset.area_sqm)}</strong></span>
                  </div>
                  <div className="av-opp-foot">
                    <span className="av-numeric">{formatAmount(asset.asking_price, asset.currency)}</span>
                    <strong className="av-opp-cta"><I18nText id="Request Access" /></strong>
                  </div>
                </div>
              </a>
            )) : (
              <div className="av-empty">
                <strong><I18nText id="No published opportunities yet" /></strong>
                <span><I18nText id="No sample or fabricated inventory is displayed." /></span>
                <a className="av-btn av-outline" href="/opportunities"><I18nText id="Available Opportunities" /></a>
              </div>
            )}
          </div>
        </section>

        <section className="av-section av-section-tight">
          <div className="av-card">
            <div className="av-card-title">
              <div>
                <span className="eyebrow"><I18nText id="How We Work" /></span>
                <h2><I18nText id="How It Works" /></h2>
              </div>
              <a className="av-opp-cta" href="/how-it-works"><I18nText id="How It Works" /> <span aria-hidden="true" className="av-dir">→</span></a>
            </div>
            <div className="av-grid av-grid-4">
              {[
                ['01', 'Submit a request', 'Submit your property or acquisition request'],
                ['02', 'Review', 'We review the request and applicable requirements'],
                ['03', 'Verification', 'Applicable property and document verification is coordinated'],
                ['04', 'Transaction coordination', 'Commercial terms are coordinated until the parties are ready to close'],
              ].map(([step, title, body]) => (
                <div className="av-card av-card-pad-sm" key={step}>
                  <span className="av-stat-value is-amber av-numeric">{step}</span>
                  <h3><I18nText id={title} /></h3>
                  <p className="av-caption"><I18nText id={body} /></p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="av-section av-section-tight">
          <div className="av-grid av-grid-2">
            <div className="av-card">
              <h3><I18nText id="Why Trust Us" /></h3>
              <p className="av-lead"><I18nText id="Our role and limits are stated clearly." /></p>
              <a className="av-opp-cta" href="/why-trust-us"><I18nText id="Why Trust Us" /> <span aria-hidden="true" className="av-dir">→</span></a>
            </div>
            <div className="av-card">
              <h3><I18nText id="Fees & Commissions" /></h3>
              <p className="av-lead"><I18nText id="1% from the seller + 1% from the buyer" /></p>
              <a className="av-opp-cta" href="/fees"><I18nText id="Fees & Commissions" /> <span aria-hidden="true" className="av-dir">→</span></a>
            </div>
          </div>
        </section>
      </main>
    </SiteChrome>
  );
}
