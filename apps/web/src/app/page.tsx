const marketListings = [
  { country: 'UAE', city: 'Ras Al Khaimah', title: 'Breeze Island — Al Marjan Island', type: 'Mixed-use beachfront development land', area: '134,650 sq ft', price: '$89.86M', original: 'AED 330M', image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Aerial_shot_of_the_coast.jpg' },
  { country: 'UAE', city: 'Dubai', title: 'Palm Jumeirah — Frond N', type: 'Prime beachfront development plot', area: '27,158 sq ft', price: '$54.46M', original: 'AED 200M', image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Royal_Atlantis_Resort_hotel_under_construction%2C_Palm_Jumeirah%2C_Dubai.jpg' },
  { country: 'UAE', city: 'Dubai', title: 'Palm Jebel Ali — Frond O', type: 'Waterfront development land', area: '24,035 sq ft', price: '$10.89M', original: 'AED 40M', image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Aerial_view_of_the_coastline_of_Muttrah.jpg' },
  { country: 'Egypt', city: 'Soma Bay', title: 'Prime beachfront hotel development land', type: 'Hospitality development land', area: '32,000 m²', price: '$19.47M*', original: 'EGP 1B headline', image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Albatros_Citadel_Sahl_Hasheesh_R13.jpg', note: '*Indicative market figure; final commercial terms require direct verification.' },
];

const capabilities = [
  ['Verified', 'Structured opportunities', 'Asset records, verification states and publication gates keep market discovery separate from controlled transaction data.'],
  ['Private', 'Data rooms', 'NDA gates, permissioned documents, versions, diligence requirements and activity history in one controlled workspace.'],
  ['Execute', 'Transaction workflow', 'Interest, qualification, offers, negotiation, contracts, approvals and closing connected to the same transaction graph.'],
  ['Control', 'Compliance architecture', 'KYC/KYB, AML, risk review and evidence stay isolated from public listing data and follow least-privilege access.'],
];

const lifecycle = ['Intake', 'Verification', 'Compliance', 'Publication', 'Qualification', 'NDA', 'Data Room', 'Diligence', 'Offer', 'Negotiation', 'Contract', 'Closing'];

export default function HomePage() {
  return (
    <main>
      <header className="site-header">
        <a className="brand" href="/">ASSET<span>VEYRA</span></a>
        <nav>
          <a href="#market">Market</a>
          <a href="#platform">Platform</a>
          <a href="#workflow">Workflow</a>
          <a href="/contact">Contact</a>
          <a href="/login">Sign in</a>
          <a className="nav-cta" href="/submit">Submit an asset</a>
        </nav>
      </header>

      <section className="hero hero-home">
        <div className="hero-visual">
          <img src="https://commons.wikimedia.org/wiki/Special:FilePath/Aerial_shot_of_the_coast.jpg" alt="Coastal real-estate landscape" />
          <div className="hero-grid" />
          <div className="hero-location"><span className="live-dot" /> GLOBAL REAL-ASSET MARKET</div>
          <div className="hero-floating-card">
            <span>MARKET INTELLIGENCE</span>
            <strong>High-value commercial opportunities</strong>
            <small>Prices shown in USD · market intelligence</small>
          </div>
        </div>
        <div className="hero-copy-block">
          <div className="eyebrow">GLOBAL REAL-ASSET TRANSACTION INFRASTRUCTURE</div>
          <h1>Capital meets real assets.</h1>
          <p className="hero-copy">Discover high-value commercial opportunities, understand the asset, control disclosure and move from qualified interest to executable transaction in one institutional workspace.</p>
          <div className="hero-actions">
            <a className="button primary" href="#market">Explore the market</a>
            <a className="button secondary" href="/contact">Request information</a>
          </div>
          <div className="hero-note">Public market discovery is separated from private diligence, compliance and deal records.</div>
        </div>
      </section>

      <section className="market-strip">
        <div><span>GLOBAL</span><strong>High-value assets</strong></div>
        <div><span>WORKFLOW</span><strong>Source → Diligence → Deal</strong></div>
        <div><span>DISCLOSURE</span><strong>Public → Controlled → Private</strong></div>
        <div><span>ACCESS</span><strong>Investor workspace</strong></div>
      </section>

      <section id="market" className="section market-section">
        <div className="section-heading wide-heading">
          <div>
            <div className="eyebrow">GLOBAL HIGH-VALUE MARKET</div>
            <h2>Commercial opportunities at institutional ticket sizes.</h2>
          </div>
          <p>AssetVeyra focuses this public discovery layer on high-value commercial and development opportunities. Individual opportunities shown here are market intelligence examples and are not represented as AssetVeyra-owned inventory.</p>
        </div>
        <div className="market-toolbar">
          <span>4 opportunities</span><span>USD display</span><span>$10M+ focus</span><span>Global commercial</span>
        </div>
        <div className="market-grid">
          {marketListings.map((item, index) => (
            <article className="market-card" key={`${item.country}-${item.title}`}>
              <div className="market-image">
                <img src={item.image} alt={`${item.title} — ${item.city}`} loading={index > 1 ? 'lazy' : 'eager'} />
                <span className="source-badge">MARKET INTELLIGENCE</span>
                <span className="market-index">{String(index + 1).padStart(2, '0')}</span>
              </div>
              <div className="market-card-body">
                <div className="card-meta"><span>{item.country} · {item.city}</span><span>{item.type}</span></div>
                <h3>{item.title}</h3>
                <div className="price-row"><strong>{item.price}</strong><span>{item.original}</span></div>
                <div className="card-data"><span>AREA</span><strong>{item.area}</strong></div>
                {item.note && <p className="market-warning">{item.note}</p>}
                <div className="card-actions">
                  <a className="button small primary" href="/contact">Request information</a>
                </div>
              </div>
            </article>
          ))}
        </div>
        <div className="market-disclaimer">Market examples are presented for discovery and comparison only. AssetVeyra does not expose third-party seller, broker or listing-platform contact details on this public interface. Any transaction requires separate AssetVeyra verification, qualification and controlled disclosure.</div>
      </section>

      <section id="platform" className="section platform-section">
        <div className="section-heading">
          <div className="eyebrow">THE PLATFORM</div>
          <h2>Built around the transaction, not the listing.</h2>
        </div>
        <div className="capability-grid">
          {capabilities.map(([label, title, description]) => (
            <article className="capability" key={title}>
              <span className="capability-label">{label}</span>
              <h3>{title}</h3>
              <p>{description}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="workflow" className="workflow-section">
        <div className="section-heading">
          <div className="eyebrow">TRANSACTION LIFECYCLE</div>
          <h2>One controlled path from asset intake to closing.</h2>
        </div>
        <div className="lifecycle">
          {lifecycle.map((step, index) => (
            <div className="lifecycle-step" key={step}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <strong>{step}</strong>
            </div>
          ))}
        </div>
      </section>

      <section className="section intelligence-section">
        <div className="intelligence-copy">
          <div className="eyebrow">REAL-ASSET INTELLIGENCE</div>
          <h2>See the asset before you see the deal.</h2>
          <p>Location, physical characteristics, source evidence, verification state, diligence completeness and transaction history belong in the same decision environment.</p>
          <div className="intelligence-points">
            <span>01 · Location intelligence</span><span>02 · Source evidence</span><span>03 · Due diligence</span><span>04 · Controlled disclosure</span>
          </div>
        </div>
        <div className="intelligence-map">
          <img src="https://commons.wikimedia.org/wiki/Special:FilePath/Jumeirah_at_Saadiyat_Resort.jpg" alt="Coastal development context" loading="lazy" />
          <div className="map-overlay"><span>ASSETVEYRA INTELLIGENCE</span><strong>Location · Risk · Evidence</strong></div>
        </div>
      </section>

      <section id="contact" className="contact-section">
        <div>
          <div className="eyebrow">CONTROLLED INTRODUCTION</div>
          <h2>Interested in an opportunity?</h2>
          <p>Tell us what you are looking for. We review the request first, then route the appropriate information and transaction workflow through AssetVeyra.</p>
        </div>
        <div className="contact-card">
          <span>ASSETVEYRA</span>
          <strong>Request information</strong>
          <a className="button primary" href="/contact">Contact AssetVeyra</a>
          <small>Seller and broker contact details are not exposed on this public interface.</small>
        </div>
      </section>

      <footer className="footer">
        <div><strong>ASSETVEYRA</strong><span>Global real-asset transaction infrastructure</span></div>
        <div className="footer-links"><a href="#platform">Platform</a><a href="#market">Market</a><a href="/contact">Contact</a><a href="/security">Security</a><a href="/privacy">Privacy</a><a href="/terms">Terms</a></div>
      </footer>
    </main>
  );
}
