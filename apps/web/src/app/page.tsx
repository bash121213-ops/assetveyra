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
      <nav><a href="#home">Home</a><a href="#opportunities">Opportunities</a><a href="#details">Details</a><a href="#dashboard">Dashboard</a><a href="/login">Login</a><a href="/signup">Sign Up</a><a href="#about">About</a><a href="/contact">Contact</a><a href="#legal">Legal</a></nav>
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
        {opportunities.map(([flag,country,amount,sector,size,region,status,statusKey]) => <article className="av-card" key={country+amount}>
          <div className="av-card-top"><strong><span>{flag}</span>{country}</strong><em className={statusKey}>{status}</em></div>
          <div className="av-amount">{amount}</div>
          <div className="av-details">
            <div><span>Sector</span><strong>{sector}</strong></div>
            <div><span>Size</span><strong>{size}</strong></div>
            <div><span>ROI</span><strong>—</strong></div>
            <div><span>Region</span><strong>{region}</strong></div>
            <div><span>Status</span><strong>{status}</strong></div>
          </div>
          <a className="av-btn av-primary" href="/login">Request Access</a>
        </article>)}
      </div>
    </section>

    <section id="details" className="av-page"><h2>Opportunity Details</h2><p>Detailed opportunity information is available to registered users and approved participants.</p></section>
    <section id="dashboard" className="av-page"><h2>User Dashboard</h2><p>Registered users can review saved opportunities and access controlled information.</p></section>
    <section id="about" className="av-page"><h2>About AssetVeyra</h2><p>Global marketplace for high-value investment opportunities.</p></section>
    <section id="contact" className="av-page"><h2>Contact Us</h2><p>Contact AssetVeyra for access and investment requirements.</p><a className="av-btn av-primary" href="/contact">Contact</a></section>
    <section id="legal" className="av-page"><h2>Legal Information</h2><p>Terms of Service and Privacy Policy apply.</p></section>

    <footer className="av-footer">AssetVeyra is a marketplace, not an investment advisor. Confidentiality protocols apply.</footer>
  </main>;
}
