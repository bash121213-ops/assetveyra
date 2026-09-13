const capabilities = [
  ['01', 'Verified opportunities', 'Structured asset and opportunity records with controlled verification and publication.'],
  ['02', 'Private transaction rooms', 'Permissioned documents, NDA gates, diligence requirements, Q&A and immutable activity history.'],
  ['03', 'Transaction execution', 'Interest, qualification, offers, negotiation, approvals, contracts and closing in one transaction graph.'],
  ['04', 'Compliance by design', 'KYC/KYB, AML, risk review and evidence remain separate from public marketplace data.'],
];

const lifecycle = ['Intake', 'Verification', 'Compliance', 'Publication', 'Qualification', 'NDA', 'Data Room', 'Diligence', 'Offer', 'Negotiation', 'Contract', 'Closing'];

export default function HomePage() {
  return (
    <main>
      <header className="site-header">
        <a className="brand" href="/">ASSETVEYRA</a>
        <nav>
          <a href="#platform">Platform</a>
          <a href="#workflow">Workflow</a>
          <a href="#opportunities">Opportunities</a>
          <a href="/login">Sign in</a>
        </nav>
      </header>

      <section className="hero">
        <div className="eyebrow">GLOBAL ASSET & INVESTMENT TRANSACTION INFRASTRUCTURE</div>
        <h1>From verified asset to executable transaction.</h1>
        <p className="hero-copy">AssetVeyra is the operating layer for serious real-estate opportunities: structured asset data, controlled disclosure, due diligence, investor qualification and transaction execution.</p>
        <div className="hero-actions">
          <a className="button primary" href="#opportunities">Explore opportunities</a>
          <a className="button secondary" href="/submit">Submit an asset</a>
        </div>
        <div className="hero-note">Public discovery is separated from private diligence, compliance and deal records.</div>
      </section>

      <section id="platform" className="section">
        <div className="section-heading">
          <div className="eyebrow">THE PLATFORM</div>
          <h2>Built around the transaction, not the listing.</h2>
        </div>
        <div className="capability-grid">
          {capabilities.map(([number, title, description]) => (
            <article className="capability" key={number}>
              <span className="number">{number}</span>
              <h3>{title}</h3>
              <p>{description}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="workflow" className="workflow-section">
        <div className="section-heading">
          <div className="eyebrow">TRANSACTION LIFECYCLE</div>
          <h2>A single controlled workflow from intake to closing.</h2>
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

      <section id="opportunities" className="section opportunity-section">
        <div>
          <div className="eyebrow">OPPORTUNITIES</div>
          <h2>Real opportunities will appear here only after their publication gate is satisfied.</h2>
          <p>AssetVeyra does not manufacture inventory for presentation. Published opportunities will come from verified asset records and carry their actual workflow state.</p>
        </div>
        <div className="empty-state">
          <span className="empty-dot" />
          <strong>No public opportunities yet</strong>
          <span>Inventory will populate from the live transaction database.</span>
        </div>
      </section>

      <footer className="footer">
        <span>ASSETVEYRA</span>
        <span>Global investment infrastructure</span>
      </footer>
    </main>
  );
}
