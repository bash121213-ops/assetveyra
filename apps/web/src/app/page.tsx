import Image from 'next/image';
import { createClient } from '@/lib/supabase/server';
import { I18nText } from '@/components/LocaleShell';
import SiteChrome from '@/components/SiteChrome';
import OpportunityCard, { formatAmount, formatArea, SECTOR_KEYS } from '@/components/OpportunityCard';
import { EDITORIAL_IMAGES } from '@/lib/editorial-images';
import { getPublicAssetImageUrl } from '@/lib/public-asset-image-url';
import { isSuppressedLegacyOpportunity } from '@/lib/publicOpportunityPolicy';

type Opportunity = { id: string; slug: string; status: string; visibility: string; investment_thesis: string | null; minimum_ticket: number | null; target_return: number | null; asset_id: string };
type Asset = { id: string; title: string; asset_type: string; country_code: string | null; region: string | null; city: string | null; area_sqm: number | null; currency: string | null; asking_price: number | null; public_summary: string | null };

const MIN_PUBLIC_VALUE = 100_000;

async function getPublishedOpportunities() {
  const supabase = await createClient();
  const { data: opportunities, error: opportunityError } = await supabase
    .from('public_opportunities')
    .select('id,slug,status,visibility,investment_thesis,minimum_ticket,target_return,asset_id')
    .order('published_at', { ascending: false })
    .limit(7);
  if (opportunityError || !opportunities?.length) return { rows: [], error: opportunityError };

  const typed = (opportunities as Opportunity[]).filter((opportunity) => !isSuppressedLegacyOpportunity(opportunity));
  const assetIds = typed.map((x) => x.asset_id).filter(Boolean);
  const { data: assets, error: assetError } = await supabase
    .from('public_assets')
    .select('id,title,asset_type,country_code,region,city,area_sqm,currency,asking_price,public_summary')
    .in('id', assetIds);
  if (assetError) return { rows: [], error: assetError };

  // Only the published media for these assets — real photography, never stock.
  const { data: assetImages } = assetIds.length
    ? await supabase
        .from('published_asset_images')
        .select('asset_id,storage_path,sort_order')
        .in('asset_id', assetIds)
        .order('sort_order', { ascending: true })
    : { data: [] };

  const firstImageByAsset = new Map<string, string>();
  for (const image of (assetImages ?? []) as { asset_id: string; storage_path: string }[]) {
    if (firstImageByAsset.has(image.asset_id)) continue;
    firstImageByAsset.set(image.asset_id, getPublicAssetImageUrl(image.storage_path));
  }

  const byId = new Map(((assets ?? []) as Asset[]).map((a) => [a.id, a]));
  const rows = typed
    .map((opportunity) => ({ opportunity, asset: byId.get(opportunity.asset_id) }))
    .flatMap(({ opportunity, asset }) =>
      asset && Number(asset.asking_price ?? 0) >= MIN_PUBLIC_VALUE
        ? [{
            opportunity,
            asset,
            imageUrl: firstImageByAsset.get(asset.id) ?? null,
            location: [asset.city, asset.region, asset.country_code].filter(Boolean).join(', '),
          }]
        : []
    );
  return { rows, error: null };
}

export default async function HomePage() {
  const { rows, error } = await getPublishedOpportunities();
  const featured = rows.slice(0, 5);

  return (
    <SiteChrome>
      <main id="home" className="av-final-home">
        {/* Hero — full-bleed photograph, restrained overlay, oversized type. */}
        <section className="av-final-hero">
          <div className="av-final-hero-copy">
            <div className="av-hero-kicker"><span className="av-status-dot" aria-hidden="true" /><I18nText id="PRIVATE MARKETS / REAL ASSETS" /></div>
            <h1>
              <span><I18nText id="LAND." /></span>
              <span><I18nText id="CAPITAL." /></span>
              <span><I18nText id="OPPORTUNITY." /></span>
            </h1>
            <p><I18nText id="Institutional-grade real-asset opportunities, presented through controlled access and documented verification." /></p>
            <div className="av-hero-actions">
              <a className="av-btn av-primary" href="/opportunities"><I18nText id="Explore Opportunities" /></a>
              <a className="av-btn av-outline" href="/submit"><I18nText id="Submit an Opportunity" /></a>
            </div>
          </div>
          <aside className="av-hero-brief">
            <span className="eyebrow"><I18nText id="THE INVESTOR BRIEF" /></span>
            <strong><I18nText id="Private-market opportunities with a documented path from first review to closing." /></strong>
            <a href="/how-it-works"><I18nText id="See how it works →" /></a>
          </aside>
        </section>

        <section className="av-trust">
          <div><I18nText id="1% seller + 1% buyer" /></div>
          <div><I18nText id="We do not receive transaction funds." /></div>
          <div><I18nText id="Commission on completion" /></div>
          <div><I18nText id="Mr. Tariq Al-Zyoud" /></div>
        </section>

        {/* Intro — photograph paired with the platform position. */}
        <section className="av-page">
          <div className="av-intro">
            <div className="av-intro-media">
              <Image src={EDITORIAL_IMAGES.masterplan.src} alt={EDITORIAL_IMAGES.masterplan.alt} fill sizes="(max-width: 900px) 92vw, 46vw" priority />
            </div>
            <div className="av-intro-copy">
              <div className="eyebrow"><I18nText id="Global market watch" /></div>
              <h2><I18nText id="AssetVeyra is a controlled marketplace and transaction workspace for high-value real-asset opportunities." /></h2>
              <p><I18nText id="Real-estate opportunity discovery, intermediation and transaction coordination." /></p>
              <p><I18nText id="The platform separates public discovery from sensitive transaction information and organization-scoped workflows." /></p>
            </div>
          </div>
        </section>

        <section className="av-marketplace-intro av-page">
          <div>
            <div className="eyebrow"><I18nText id="PUBLIC MARKETPLACE" /></div>
            <h2><I18nText id="A focused view of opportunities ready for an initial investor review." /></h2>
          </div>
          <div className="av-marketplace-count"><span><I18nText id="Public briefs" /></span><strong>{rows.length}</strong><small><I18nText id="Published records currently available" /></small></div>
        </section>

        {/* Featured opportunities — image-led cards with an editorial rhythm. */}
        {featured.length > 0 && (
          <section id="opportunities" className="av-page">
            <div className="av-featured-head">
              <div>
                <div className="eyebrow"><I18nText id="Opportunities" /></div>
                <h2><I18nText id="Featured Opportunities" /></h2>
              </div>
              <a href="/opportunities"><I18nText id="View Opportunities" /></a>
            </div>
            <div className="av-featured">
              {featured.map(({ opportunity, asset, imageUrl, location }, index) => (
                <OpportunityCard
                  key={opportunity.id}
                  data={{
                    slug: opportunity.slug,
                    title: asset.title,
                    assetType: asset.asset_type,
                    countryCode: asset.country_code,
                    location,
                    summary: asset.public_summary || opportunity.investment_thesis,
                    areaSqm: asset.area_sqm,
                    askingPrice: asset.asking_price,
                    currency: asset.currency,
                    imageUrl,
                    statusLabel: 'Published opportunity',
                    priority: index < 2,
                  }}
                />
              ))}
            </div>
          </section>
        )}

        {/* Image band — coastal / international investment context. */}
        <section className="av-band">
          <Image src={EDITORIAL_IMAGES.cityscape.src} alt={EDITORIAL_IMAGES.cityscape.alt} fill sizes="100vw" />
          <span className="av-band-caption"><I18nText id="International investment" /></span>
        </section>

        {/* How it works */}
        <section id="how-it-works" className="av-page">
          <div className="eyebrow"><I18nText id="How We Work" /></div>
          <h2><I18nText id="How It Works" /></h2>
          <p><I18nText id="How we work in four steps" /></p>
          <div className="av-steps">
            <div><strong>01</strong><h3><I18nText id="Submit a request" /></h3><p><I18nText id="Submit your property or acquisition request" /></p></div>
            <div><strong>02</strong><h3><I18nText id="Review" /></h3><p><I18nText id="We review the request and applicable requirements" /></p></div>
            <div><strong>03</strong><h3><I18nText id="Verification" /></h3><p><I18nText id="Applicable property and document verification is coordinated" /></p></div>
            <div><strong>04</strong><h3><I18nText id="Transaction coordination" /></h3><p><I18nText id="Commercial terms are coordinated until the parties are ready to close" /></p></div>
          </div>
        </section>

        {/* Controlled access — dark photographic band. */}
        <section className="av-section av-access">
          <div className="av-access-inner">
            <div className="eyebrow"><I18nText id="Controlled Access" /></div>
            <h2><I18nText id="Public information leads into registration, qualification and controlled transaction workflows." /></h2>
            <p><I18nText id="You are viewing the controlled opportunity information available to registered users. Additional ownership, legal, financial or technical material may require qualification, confidentiality terms or Data Room access depending on the opportunity." /></p>
            <div className="av-access-steps">
              <div><span>01</span><strong><I18nText id="Interest" /></strong></div>
              <div><span>02</span><strong><I18nText id="Qualify" /></strong></div>
              <div><span>03</span><strong><I18nText id="Data Room" /></strong></div>
              <div><span>04</span><strong><I18nText id="Due Diligence" /></strong></div>
            </div>
            <a className="av-btn av-primary" href="/opportunities"><I18nText id="Explore Opportunities" /></a>
          </div>
        </section>

        {/* Fees */}
        <section id="fees" className="av-page">
          <div className="eyebrow"><I18nText id="Fees & Commissions" /></div>
          <h2><I18nText id="Fees & Commissions" /></h2>
          <div className="facts">
            <div><strong><I18nText id="1% from the seller + 1% from the buyer" /></strong><span><I18nText id="The commission is due on completion under the applicable written agreement." /></span></div>
            <div><strong><I18nText id="Commission on completion" /></strong><span><I18nText id="We do not charge a fee solely for submitting an inquiry." /></span></div>
            <div><strong><I18nText id="Legal coordination" /></strong><span><I18nText id="Legal advice is provided by the relevant legal professional under the applicable engagement." /></span></div>
            <div><strong><I18nText id="Transaction funds" /></strong><span><I18nText id="No transaction funds are held by AssetVeyra." /></span></div>
          </div>
          <a className="av-btn av-primary" style={{ marginTop: 'var(--av-s6)' }} href="/fees"><I18nText id="Fees & Commissions" /></a>
        </section>

        {/* CTA over waterfront development photography. */}
        <section className="av-band">
          <Image src={EDITORIAL_IMAGES.waterfront.src} alt={EDITORIAL_IMAGES.waterfront.alt} fill sizes="100vw" />
          <span className="av-band-caption"><I18nText id="Development Land" /></span>
        </section>

        <section className="av-cta">
          <h2><I18nText id="Submit your property or acquisition request" /></h2>
          <div className="av-cta-actions">
            <a className="av-btn av-primary" href="/submit"><I18nText id="Submit an Opportunity" /></a>
            <a className="av-btn av-outline" href="/contact"><I18nText id="Contact Us" /></a>
          </div>
        </section>

        {/* Trust */}
        <section id="why-trust-us" className="av-page">
          <div className="eyebrow"><I18nText id="Trust & Transparency" /></div>
          <h2><I18nText id="Why Trust Us" /></h2>
          <p><I18nText id="Our role and limits are stated clearly." /></p>
          <div className="opportunity-grid">
            <div className="opportunity-card"><div className="opportunity-card-body"><h2><I18nText id="We are an intermediary and transaction coordinator." /></h2></div></div>
            <div className="opportunity-card"><div className="opportunity-card-body"><h2><I18nText id="No transaction funds are held by AssetVeyra." /></h2></div></div>
            <div className="opportunity-card"><div className="opportunity-card-body"><h2><I18nText id="AssetVeyra does not guarantee completion, value or profit." /></h2></div></div>
            <div className="opportunity-card"><div className="opportunity-card-body"><h2><I18nText id="Independent legal advice remains available to each party." /></h2></div></div>
          </div>
        </section>

        <section id="legal-partners" className="av-page">
          <div className="eyebrow"><I18nText id="Legal Partners" /></div>
          <h2><I18nText id="Legal Partners" /></h2>
          <h3><I18nText id="Mr. Tariq Al-Zyoud" /></h3>
          <p><I18nText id="AssetVeyra works with Mr. Tariq Al-Zyoud on relevant legal matters within the agreed scope." /></p>
          <p><I18nText id="Independent legal advice remains available to each party." /></p>
          <a className="av-btn av-outline" style={{ marginTop: 'var(--av-s5)' }} href="/legal-partners"><I18nText id="Legal Partners" /></a>
        </section>

        <section id="faq" className="av-page">
          <div className="eyebrow"><I18nText id="FAQ" /></div>
          <h2><I18nText id="FAQ" /></h2>
          <details><summary><I18nText id="What does Verified mean?" /></summary><p><I18nText id="Verified means only that the stated verification workflow has been completed within its documented scope; it is not a guarantee of value, profit or closing." /></p></details>
          <details><summary><I18nText id="Are external listings verified by AssetVeyra?" /></summary><p><I18nText id="No. External market listings are third-party references and must be independently verified before any commitment." /></p></details>
          <details><summary><I18nText id="Does AssetVeyra hold transaction funds?" /></summary><p><I18nText id="No. AssetVeyra does not receive or hold the purchase price or transaction funds." /></p></details>
          <details><summary><I18nText id="Who provides legal advice?" /></summary><p><I18nText id="The relevant legal professional provides legal advice under the applicable engagement." /></p></details>
          <details><summary><I18nText id="Who manages AssetVeyra?" /></summary><p><I18nText id="AssetVeyra is managed by Bashar Kassab AlMasaeid." /></p></details>
        </section>

        <section id="contact" className="av-page">
          <div className="eyebrow"><I18nText id="Contact Us" /></div>
          <h2><I18nText id="Contact Us" /></h2>
          <p><I18nText id="info@assetveyra.com" /></p>
          <p><I18nText id="+353 899 450 711" /></p>
          <a className="av-btn av-primary" style={{ marginTop: 'var(--av-s5)' }} href="/submit"><I18nText id="Submit an Opportunity" /></a>
        </section>

        {rows.length === 0 && <section className="av-page av-empty-market"><div className="eyebrow"><I18nText id="PUBLIC INVENTORY" /></div><h2><I18nText id="No published opportunities yet" /></h2><p><I18nText id="No sample or fabricated inventory is displayed." /></p><a className="av-btn av-primary" style={{ marginTop: 'var(--av-s5)' }} href="/opportunities"><I18nText id="Open Marketplace" /></a>{error && <p className="av-error-note"><I18nText id="The live marketplace could not be loaded. Please try again shortly." /></p>}</section>}
      </main>
    </SiteChrome>
  );
}
