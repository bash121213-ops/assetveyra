import './av-final.css';

const opportunities = [
  ['🇪🇸','Spain','€12,900,000','Historic Luxury Villa & Estate','2,235 sqm villa / 253,786 sqm estate','Europe','Pending','pending'],
  ['🇦🇪','United Arab Emirates','AED 53,000,000','Waterfront Luxury Villa','60,027 sq ft','Middle East','Pending','pending'],
  ['🇨🇳','China','¥1,800,000,000','Five-Star Luxury Hotel','45,000 sqm / 202 rooms','Asia','Pending','pending'],
  ['🇺🇸','United States','$32,000,000','Luxury Mountain Penthouse','6,559 sq ft','Americas','Pending','pending'],
  ['🇦🇺','Australia','AUD $29,000,000','Waterfront Luxury Estate','2,041 sqm residence / 2,197 sqm land','Australia','Pending','pending'],
  ['🇫🇷','France','€21,000,000','Prime Luxury Residence','302 sqm living / 360 sqm total','Europe','Pending','pending'],
] as const;

export default function HomePage() {
  return <main className="av-final-home">
    <header className="av-final-header">
      <a className="av-final-brand" href="/">ASSETVEYRA</a>
      <nav><a href="#opportunities">Opportunities</a><a href="#how-it-works">How It Works</a><a href="/submit">Submit Asset</a><a href="/contact">Contact</a><a href="#language">العربية</a><a href="#language">中文</a><a href="#language">Español</a><a href="#language">FR</a><a href="/login">Login</a></nav>
    </header>
    <section className="av-final-hero">
      <div className="av-final-hero-copy"><div className="av-kicker">GLOBAL HIGH-VALUE OPPORTUNITIES</div><h1>Exclusive Access to $100,000+ Assets</h1><p>Real market opportunities sourced from current public listings, presented for structured review.</p><div className="av-actions"><a className="av-btn av-primary" href="#opportunities">View Opportunities</a><a className="av-btn av-secondary" href="/login">Request Access</a></div><small>Market data is subject to availability and independent verification.</small></div>
      <div className="av-final-hero-image"><div><span>ASSETVEYRA</span><strong>Global Asset Access</strong></div></div>
    </section>
    <section className="av-trust"><div><span>Minimum Asset Value</span><strong>$100,000+</strong></div><div><span>Market Data</span><strong>Current Public Listings</strong></div><div><span>Global Coverage</span><strong>Multiple Regions</strong></div><div><span>Information Access</span><strong>Structured Review</strong></div></section>
    <section id="opportunities" className="av-section"><div className="av-section-head"><div className="av-kicker">CURRENT MARKET OPPORTUNITIES</div><h2>Real assets. Current market data.</h2><p>Explore a selection of currently advertised high-value assets across key global markets. Availability, pricing and status can change and are subject to independent verification.</p></div>
      <div className="av-cards">{opportunities.map(([flag,country,amount,sector,size,region,status,statusKey]) => <article className="av-card" key={country+amount}><div className="av-card-top"><strong><span>{flag}</span>{country}</strong><em className={statusKey}>{status}</em></div><div className="av-amount">{amount}</div><div className="av-details"><div><span>Sector</span><strong>{sector}</strong></div><div><span>Size</span><strong>{size}</strong></div><div><span>Region</span><strong>{region}</strong></div><div><span>Status</span><strong>{status}</strong></div></div><a className="av-btn av-primary" href="/login">Request Access</a></article>)}</div></section>
    <section id="how-it-works" className="av-cta"><div><div className="av-kicker">ASSETVEYRA ACCESS</div><h2>From opportunity to controlled access.</h2><p>Register to explore available information, submit an investment requirement, or request access to a specific opportunity.</p></div><a className="av-btn av-primary" href="/contact">Contact AssetVeyra</a></section>
    <footer className="av-footer"><div><strong>ASSETVEYRA</strong><span>Global high-value investment opportunities</span></div><div className="av-footer-links"><a href="#opportunities">Opportunities</a><a href="#how-it-works">How It Works</a><a href="/submit">Submit Asset</a><a href="/contact">Contact</a><a href="/security">Security</a><a href="/privacy">Privacy</a><a href="/terms">Terms</a></div></footer>
  </main>;
}
