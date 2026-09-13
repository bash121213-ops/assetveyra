const pillars = [
  ["01", "Verified Opportunities", "Structured opportunities with controlled publication and verification workflows."],
  ["02", "Private Deal Rooms", "NDA-gated access to documents, diligence materials and transaction records."],
  ["03", "Institutional Execution", "Move from qualified interest to offer, negotiation, contract and closing."],
];

export default function HomePage() {
  return (
    <main>
      <header style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"28px 6vw",borderBottom:"1px solid var(--line)"}}>
        <strong style={{letterSpacing:".12em"}}>ASSETVEYRA</strong>
        <nav style={{display:"flex",gap:24,color:"var(--muted)",fontSize:14}}>
          <a href="#opportunities">Opportunities</a>
          <a href="#platform">Platform</a>
          <a href="#process">Process</a>
        </nav>
      </header>

      <section style={{padding:"110px 6vw 90px",maxWidth:1200}}>
        <p style={{color:"var(--accent)",letterSpacing:".18em",fontSize:12}}>GLOBAL REAL ESTATE INVESTMENT INFRASTRUCTURE</p>
        <h1 style={{fontSize:"clamp(48px,8vw,92px)",lineHeight:.95,margin:"22px 0",maxWidth:950}}>
          Where serious property opportunities become executable deals.
        </h1>
        <p style={{maxWidth:680,color:"var(--muted)",fontSize:19,lineHeight:1.7}}>
          AssetVeyra connects verified real-estate opportunities with qualified investors through a controlled workflow for discovery, diligence, negotiation and closing.
        </p>
        <div style={{display:"flex",gap:14,marginTop:36,flexWrap:"wrap"}}>
          <a href="#opportunities" style={{padding:"14px 20px",background:"var(--accent)",color:"#071019",fontWeight:700}}>Explore Opportunities</a>
          <a href="#process" style={{padding:"14px 20px",border:"1px solid var(--line)"}}>How the platform works</a>
        </div>
      </section>

      <section id="platform" style={{padding:"70px 6vw",borderTop:"1px solid var(--line)"}}>
        <p style={{color:"var(--muted)",letterSpacing:".14em",fontSize:12}}>THE PLATFORM</p>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(230px,1fr))",gap:18,marginTop:28}}>
          {pillars.map(([number,title,description]) => (
            <article key={number} style={{background:"var(--panel)",border:"1px solid var(--line)",padding:28,minHeight:210}}>
              <span style={{color:"var(--accent)",fontSize:12}}>{number}</span>
              <h2 style={{fontSize:24,margin:"35px 0 12px"}}>{title}</h2>
              <p style={{color:"var(--muted)",lineHeight:1.65,margin:0}}>{description}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="process" style={{padding:"80px 6vw",background:"var(--panel)"}}>
        <p style={{color:"var(--accent)",letterSpacing:".14em",fontSize:12}}>TRANSACTION WORKFLOW</p>
        <p style={{fontSize:22,lineHeight:1.7,maxWidth:950,marginTop:24}}>
          Submit → Verify → Compliance → Publish → Qualify → NDA → Data Room → Due Diligence → Offer → Negotiate → Contract → Close
        </p>
      </section>

      <section id="opportunities" style={{padding:"80px 6vw"}}>
        <h2 style={{fontSize:38,marginTop:0}}>Opportunities</h2>
        <p style={{color:"var(--muted)",maxWidth:650,lineHeight:1.7}}>
          The marketplace layer will support land, hotels, income-producing assets and development projects, with public information separated from private transaction data.
        </p>
      </section>

      <footer style={{padding:"30px 6vw",borderTop:"1px solid var(--line)",color:"var(--muted)",fontSize:13}}>
        AssetVeyra — global investment infrastructure.
      </footer>
    </main>
  );
}
