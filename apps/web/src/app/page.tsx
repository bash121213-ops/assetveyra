import './av-final.css';
import { createClient } from '@/lib/supabase/server';

type Opportunity = {
  id: string;
  slug: string;
  status: string;
  visibility: string;
  investment_thesis: string | null;
  minimum_ticket: number | null;
  target_return: number | null;
  asset_id: string;
};

type Asset = {
  id: string;
  title: string;
  asset_type: string;
  country_code: string | null;
  region: string | null;
  area_sqm: number | null;
  currency: string | null;
  asking_price: number | null;
  public_summary: string | null;
};

const FLAGS: Record<string, string> = { ES: '🇪🇸', AE: '🇦🇪', CN: '🇨🇳', US: '🇺🇸', AU: '🇦🇺', FR: '🇫🇷', GB: '🇬🇧', IT: '🇮🇹', DE: '🇩🇪', SA: '🇸🇦', QA: '🇶🇦', JO: '🇯🇴' };
const MIN_PUBLIC_VALUE = 100_000;

async function getPublishedOpportunities() {
  const supabase = await createClient();
  const { data: opportunities, error: opportunityError } = await supabase
    .from('opportunities')
    .select('id,slug,status,visibility,investment_thesis,minimum_ticket,target_return,asset_id')
    .eq('status', 'published')
    .eq('visibility', 'public')
    .order('published_at', { ascending: false })
    .limit(6);

  if (opportunityError || !opportunities?.length) return { rows: [], error: opportunityError };

  const typed = opportunities as Opportunity[];
  const assetIds = typed.map((item) => item.asset_id).filter(Boolean);
  const { data: assets, error: assetError } = await supabase
    .from('assets')
    .select('id,title,asset_type,country_code,region,area_sqm,currency,asking_price,public_summary')
    .in('id', assetIds);

  if (assetError) return { rows: [], error: assetError };

  const assetById = new Map(((assets ?? []) as Asset[]).map((asset) => [asset.id, asset]));
  const rows = typed
    .map((opportunity) => ({ opportunity, asset: assetById.get(opportunity.asset_id) }))
    .filter(({ asset }) => Boolean(asset?.asking_price && Number(asset.asking_price) >= MIN_PUBLIC_VALUE));

  return { rows, error: null };
}

export default async function HomePage() {
  const { rows, error } = await getPublishedOpportunities();

  return <main className="av-final-home">
    <header className="av-final-header">
      <a className="av-final-brand" href="/">ASSETVEYRA</a>
      <details className="av-menu">
        <summary className="av-menu-trigger" aria-label="Open menu"><span className="av-menu-icon" aria-hidden="true"><i></i><i></i><i></i></span><span>Menu</span></summary>
        <nav className="av-menu-panel" aria-label="Main navigation">
          <a href="#home">Home</a>
          <a href="#opportunities">Opportunities</a>
          <a href="#details">Details</a>
          <a href="/dashboard">Dashboard</a>
          <a href="#about">About</a>
          <a href="/contact">Contact</a>
          <a href="#legal">Legal</a>
          <div className="av-menu-divider" />
          <div className="av-language-group">
            <span>Language</span>
            <select data-language-menu aria-label="Language" defaultValue="en">
              <option value="en">English</option>
              <option value="ar">العربية</option>
              <option value="zh">中文</option>
              <option value="es">Español</option>
              <option value="fr">Français</option>
            </select>
          </div>
          <div className="av-menu-account">
            <a className="av-menu-login" href="/login">Login</a>
            <a className="av-menu-signup" href="/signup">Sign Up</a>
          </div>
        </nav>
      </details>
    </header>

    <section id="home" className="av-final-hero">
      <div className="av-final-hero-copy">
        <h1>Exclusive Access to $100,000+ Assets</h1>
        <p>Curated opportunities for qualified investors worldwide.</p>
        <a className="av-btn av-primary" href="#opportunities">View Opportunities</a>
      </div>
    </section>

    <section className="av-trust">
      <div>Minimum Asset Value: $100,000+</div>
      <div>Verified Opportunities</div>
      <div>Global Coverage: 50+ Countries</div>
      <div>NDA-Protected Access</div>
    </section>

    <section id="opportunities" className="av-section">
      <div className="av-cards">
        {error ? <div className="av-page" style={{gridColumn:'1/-1',margin:0}}><h2>Opportunities temporarily unavailable</h2><p>The live marketplace could not be loaded. Please try again shortly.</p></div> : rows.map(({ opportunity, asset }) => asset ? <article className="av-card" key={opportunity.id}>
          <div className="av-card-top"><strong><span>{FLAGS[asset.country_code ?? ''] ?? '🌐'}</span>{asset.country_code ?? 'Global'}</strong><em className="verified">Verified</em></div>
          <div className="av-amount">{asset.currency || 'USD'} {Number(asset.asking_price).toLocaleString()}</div>
          <div className="av-details">
            <div><span>Sector</span><strong>{asset.title}</strong></div>
            <div><span>Size</span><strong>{asset.area_sqm ? `${Number(asset.area_sqm).toLocaleString()} sqm` : '—'}</strong></div>
            <div><span>ROI</span><strong>{opportunity.target_return != null ? `${Number(opportunity.target_return)}%` : '—'}</strong></div>
            <div><span>Region</span><strong>{asset.region || '—'}</strong></div>
            <div><span>Status</span><strong>Verified</strong></div>
          </div>
          <a className="av-btn av-primary" href={`/opportunities/${opportunity.slug}`}>Request Access</a>
        </article> : null)}
        {!error && rows.length === 0 && <div className="av-page" style={{gridColumn:'1/-1',margin:0}}><h2>No published opportunities yet</h2><p>Verified opportunities will appear here automatically after publication approval. No sample or fabricated inventory is displayed.</p><a className="av-btn av-primary" href="/opportunities">Open Marketplace</a></div>}
      </div>
    </section>

    <section id="details" className="av-page"><h2>Opportunity Details</h2><p>Detailed opportunity information is available to registered users and approved participants.</p></section>
    <section id="dashboard" className="av-page"><h2>User Dashboard</h2><p>Registered users can review saved opportunities and access controlled information.</p><a className="av-btn av-primary" href="/dashboard">View Dashboard</a></section>

    <section id="about" className="av-page">
      <h2>About AssetVeyra</h2>
      <p>AssetVeyra is a global marketplace for high-value investment opportunities.</p>
      <p>We connect qualified investors with high-value assets and opportunities worldwide, including luxury estates, commercial projects, hospitality assets and strategic opportunities.</p>
      <p>Access is structured in levels. Public visitors can review limited opportunity information; registered and approved users can access additional information, while sensitive ownership, legal, financial and technical information remains controlled and may require confidentiality protocols.</p>
      <p>AssetVeyra supports Arabic, English, Spanish, French and Chinese, with the interface adapting to the user's preferred language and direction.</p>
      <a className="av-btn av-primary" href="#opportunities">Explore Opportunities</a>
    </section>

    <section id="contact" className="av-page"><h2>Contact Us</h2><p>Contact AssetVeyra for access and investment requirements.</p><a className="av-btn av-primary" href="/contact">Contact</a></section>
    <section id="legal" className="av-page"><h2>Legal Information</h2><p>Terms of Service and Privacy Policy apply.</p></section>

    <footer className="av-footer">AssetVeyra is a marketplace, not an investment advisor. Confidentiality protocols apply.</footer>
  </main>;
}
