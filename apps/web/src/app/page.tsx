const marketListings = [
  { country: 'United Arab Emirates', price: '$89,860,000' },
  { country: 'United Arab Emirates', price: '$54,460,000' },
  { country: 'United Arab Emirates', price: '$10,890,000' },
  { country: 'Egypt', price: '$19,470,000' },
];

const capabilities = [
  ['Discover', 'Selected opportunities', 'Explore high-value opportunities through a simple public view without exposing sensitive ownership or source information.'],
  ['Protect', 'Controlled information', 'Detailed asset information is available after registration and appropriate access controls.'],
  ['Review', 'Qualification first', 'Investor interest is reviewed before sensitive commercial, legal or technical information is disclosed.'],
  ['Proceed', 'Structured transaction', 'Move from interest to qualification, diligence, offers and transaction execution through AssetVeyra.'],
];

const lifecycle = ['Discover', 'Register', 'Review', 'Qualify', 'NDA', 'Data Room', 'Diligence', 'Offer'];

export default function HomePage() {
  return (
    <main>
      <header className="site-header">
        <a className="brand" href="/">ASSET<span>VEYRA</span></a>
        <nav>
          <a href="#market">Opportunities</a>
          <a href="#platform">How it works</a>
          <a href="#contact">Contact</a>
          <a href="/login">Sign in</a>
          <a className="nav-cta" href="/login">Register</a>
        </nav>
      </header>

      <section className="hero hero-home">
        <div className="hero-copy-block">
          <div className="eyebrow">GLOBAL HIGH-VALUE OPPORTUNITIES</div>
          <h1>Investment opportunities from $100,000.</h1>
          <p className="hero-copy">Discover selected opportunities around the world. Public visitors see only the country and value. Register with AssetVeyra to access the information available for each opportunity.</p>
          <div className="hero-actions">
            <a className="button primary" href="#market">Explore opportunities</a>
            <a className="button secondary" href="/login">Register for access</a>
          </div>
          <div className="hero-note">Sensitive ownership, source and transaction information is not displayed publicly.</div>
        </div>
        <div className="hero-visual">
          <img src="https://commons.wikimedia.org/wiki/Special:FilePath/Aerial_shot_of_the_coast.jpg" alt="Global investment landscape" />
          <div className="hero-grid" />
          <div className="hero-location"><span className="live-dot" /> GLOBAL OPPORTUNITIES</div>
          <div className="hero-floating-card">
            <span>ASSETVEYRA</span>
            <strong>$100K+ opportunities</strong>
            <small>Country and value shown publicly</small>
          </div>
        </div>
      </section>

      <section className="market-strip">
        <div><span>ENTRY VALUE</span><strong>$100,000+</strong></div>
        <div><span>REACH</span><strong>Global opportunities</strong></div>
        <div><span>PUBLIC VIEW</span><strong>Country · Value</strong></div>
        <div><span>ACCESS</span><strong>Registration required</strong></div>
      </section>

      <section id="market" className="section market-section">
        <div className="section-heading wide-heading">
          <div>
            <div className="eyebrow">GLOBAL OPPORTUNITIES</div>
            <h2>Selected opportunities, presented simply.</h2>
          </div>
          <p>Public discovery is intentionally limited. Before registration, AssetVeyra shows only the country and indicative value of each opportunity. Detailed information becomes available through the controlled access process.</p>
        </div>
        <div className="market-toolbar">
          <span>{marketListings.length} opportunities</span><span>$100K+ minimum</span><span>USD display</span><span>Global</span>
        </div>
        <div className="market-grid">
          {marketListings.map((item, index) => (
            <article className="market-card public-opportunity-card" key={`${item.country}-${item.price}`}>
              <div className="market-card-body">
                <div className="public-card-index">{String(index + 1).padStart(2, '0')}</div>
                <div className="eyebrow">INVESTMENT OPPORTUNITY</div>
                <h3>{item.country}</h3>
                <div className="price-row public-price-row"><strong>{item.price}</strong></div>
                <div className="public-card-lock">Register to view opportunity details</div>
                <div className="card-actions">
                  <a className="button small primary" href="/login">Register to view details</a>
                </div>
              </div>
            </article>
          ))}
        </div>
        <div className="market-disclaimer">Public listings intentionally do not display exact locations, ownership details, source contacts, documents or sensitive commercial information. Registration and qualification control access to further information.</div>
      </section>

      <section id="platform" className="section platform-section">
        <div className="section-heading">
          <div className="eyebrow">HOW ASSETVEYRA WORKS</div>
          <h2>Clear access. Controlled information. Structured opportunities.</h2>
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
          <div className="eyebrow">ACCESS PROCESS</div>
          <h2>From public discovery to controlled access.</h2>
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
          <div className="eyebrow">CONTROLLED DISCLOSURE</div>
          <h2>The public view is only the beginning.</h2>
          <p>After registration, the platform can provide the appropriate opportunity information and guide qualified users through review, diligence and transaction steps.</p>
          <div className="intelligence-points">
            <span>01 · Opportunity information</span><span>02 · Qualification</span><span>03 · Controlled documents</span><span>04 · Transaction process</span>
          </div>
        </div>
        <div className="intelligence-map">
          <img src="https://commons.wikimedia.org/wiki/Special:FilePath/Jumeirah_at_Saadiyat_Resort.jpg" alt="Global development context" loading="lazy" />
          <div className="map-overlay"><span>ASSETVEYRA ACCESS</span><strong>Information · Review · Transaction</strong></div>
        </div>
      </section>

      <section id="contact" className="contact-section">
        <div>
          <div className="eyebrow">ASSETVEYRA</div>
          <h2>Looking for a specific opportunity?</h2>
          <p>Tell us what you are looking for. We can review your requirements and guide you through the appropriate access and enquiry process.</p>
        </div>
        <div className="contact-card">
          <span>CONTROLLED ACCESS</span>
          <strong>Start with AssetVeyra</strong>
          <a className="button primary" href="/contact">Contact AssetVeyra</a>
          <small>Seller, owner, broker and source contact details are not exposed publicly.</small>
        </div>
      </section>

      <footer className="footer">
        <div><strong>ASSETVEYRA</strong><span>Global high-value investment opportunities</span></div>
        <div className="footer-links"><a href="#platform">How it works</a><a href="#market">Opportunities</a><a href="/contact">Contact</a><a href="/security">Security</a><a href="/privacy">Privacy</a><a href="/terms">Terms</a></div>
      </footer>
    </main>
  );
}
