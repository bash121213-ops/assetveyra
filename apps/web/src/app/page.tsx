const opportunities = [
  ['🇪🇸','Spain','$12,000,000','Luxury Villa / Palace','1,200 sqm','Europe','Verified Opportunity','verified'],
  ['🇦🇪','United Arab Emirates','$25,000,000','Luxury Development','15,000 sqm','Middle East','Verified Opportunity','verified'],
  ['🇨🇳','China','$18,000,000','Luxury Hospitality','5,500 sqm','Asia','Verified Opportunity','verified'],
  ['🇺🇸','United States','$32,000,000','Luxury Villa Estate','2,800 sqm','Americas','Confidential Opportunity','confidential'],
  ['🇦🇺','Australia','$14,500,000','Luxury Coastal Villas','3,100 sqm','Australia','Pending Review','pending'],
  ['🇫🇷','France','$21,000,000','Historic Luxury Estate','2,450 sqm','Europe','Confidential Opportunity','confidential'],
] as const;

export default function HomePage() {
  return <main className="av-final-home">
    <header className="av-final-header">
      <a className="av-final-brand" href="/">ASSETVEYRA</a>
      <nav><a href="#opportunities">Opportunities</a><a href="#how-it-works">How It Works</a><a href="/submit">Submit Asset</a><a href="/contact">Contact</a><a href="#language">العربية</a><a href="#language">中文</a><a href="#language">Español</a><a href="#language">FR</a><a href="/login">Login</a></nav>
    </header>

    <section className="av-final-hero">
      <div className="av-final-hero-copy"><div className="av-kicker">GLOBAL HIGH-VALUE OPPORTUNITIES</div><h1>Exclusive Access to $100,000+ Assets</h1><p>Curated opportunities for qualified investors worldwide.</p><div className="av-actions"><a className="av-btn av-primary" href="#opportunities">View Opportunities</a><a className="av-btn av-secondary" href="/login">Request Access</a></div><small>Controlled information. Structured access. Professional enquiries.</small></div>
      <div className="av-final-hero-image"><div><span>ASSETVEYRA</span><strong>Global Asset Access</strong></div></div>
    </section>

    <section className="av-trust"><div><span>Minimum Asset Value</span><strong>$100,000+</strong></div><div><span>Opportunity Status</span><strong>Verified Opportunities</strong></div><div><span>Global Coverage</span><strong>50+ Countries</strong></div><div><span>Information Access</span><strong>NDA-Protected Access</strong></div></section>

    <section id="opportunities" className="av-section"><div className="av-section-head"><div className="av-kicker">SELECTED OPPORTUNITIES</div><h2>High-value assets. Clear information.</h2><p>Explore a curated selection of investment opportunities across key global regions. Further access is available through the AssetVeyra registration and enquiry process.</p></div>
      <div className="av-cards">{opportunities.map(([flag,country,amount,sector,size,region,status,statusKey]) => <article className="av-card" key={country+amount}><div className="av-card-top"><strong><span>{flag}</span>{country}</strong><em className={statusKey}>{status}</em></div><div className="av-amount">{amount}</div><div className="av-details"><div><span>Sector</span><strong>{sector}</strong></div><div><span>Size</span><strong>{size}</strong></div><div><span>Region</span><strong>{region}</strong></div><div><span>Access</span><strong>Controlled</strong></div></div><a className="av-btn av-primary" href="/login">Request Access</a></article>)}</div>
    </section>

    <section id="how-it-works" className="av-cta"><div><div className="av-kicker">ASSETVEYRA ACCESS</div><h2>From opportunity to controlled access.</h2><p>Register to explore available information, submit an investment requirement, or request access to a specific opportunity.</p></div><a className="av-btn av-primary" href="/contact">Contact AssetVeyra</a></section>

    <footer className="av-footer"><div><strong>ASSETVEYRA</strong><span>Global high-value investment opportunities</span></div><div className="av-footer-links"><a href="#opportunities">Opportunities</a><a href="#how-it-works">How It Works</a><a href="/submit">Submit Asset</a><a href="/contact">Contact</a><a href="/security">Security</a><a href="/privacy">Privacy</a><a href="/terms">Terms</a></div></footer>
  </main>;
}
