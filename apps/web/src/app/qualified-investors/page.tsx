'use client';

import { FormEvent, useState } from 'react';
import Link from 'next/link';
import { I18nText, useLocale } from '@/components/LocaleShell';
import { createClient } from '@/lib/supabase/client';
const option = (value: string, label: string) => ({ value, label });

const investorTypes = [
  option('hnwi', 'Individual (HNWI)'), option('family_office', 'Family Office'),
  option('fund', 'Investment Fund'), option('developer', 'Development Company'),
  option('corporate', 'Corporation'), option('other', 'Other'),
];
const assetRanges = ['100k-500k','500k-1m','1m-5m','5m-10m','10m+'];
const investmentRanges = ['100k-500k','500k-1m','1m-3m','3m-5m','5m+'];
const markets = [
  ['jordan','Jordan — Amman'], ['uae','UAE — Dubai'], ['saudi','Saudi Arabia — Riyadh / NEOM'],
  ['uk','United Kingdom — London'], ['france','France — Paris'], ['syria','Syria — Latakia'],
] as const;
const propertyTypes = [
  ['cashflow','Rental Apartments (Cash Flow)'], ['luxury','Luxury Villas (Appreciation)'],
  ['commercial','Commercial (Retail / Office)'], ['land','Development Land'],
  ['multifamily','Multifamily (5+ units)'], ['joint_venture','Joint Venture / Co-Development'],
] as const;
const financing = [
  ['cash','No — 100% cash'], ['30-50','Yes — 30–50% LTV'], ['50-70','Yes — 50–70% LTV'], ['70+','Yes — 70%+ LTV'],
] as const;
const timelines = [['30','Within 30 days'],['60','30–60 days'],['90','60–90 days'],['research','90+ days — research phase']] as const;
const dealCounts = [['1','1 deal'],['2-3','2–3 deals'],['4-5','4–5 deals'],['5+','5+ deals']] as const;
const ndaHistory = [['yes','Yes — multiple times'],['once','Yes — once'],['no','No']] as const;
const advisors = [['yes_local','Yes — in my country'],['yes_target','Yes — in the target market'],['no','No — need professional recommendations']] as const;
const experience = [['0','First investment'],['1-3','1–3 years'],['3-5','3–5 years'],['5+','5+ years']] as const;
const sources = [['google','Google Search'],['linkedin','LinkedIn'],['referral','Referral'],['conference','Conference / Event'],['portal','Property Portal'],['other','Other']] as const;

function SelectField({name,label,required=true,children}:{name:string;label:string;required?:boolean;children:React.ReactNode}) {
  return <label><span><I18nText id={label}/>{required && ' *'}</span><select name={name} required={required} defaultValue=""><option value="">Select…</option>{children}</select></label>;
}

export default function QualifiedInvestorsPage() {
  const locale = useLocale();
  const [status,setStatus] = useState<'idle'|'sending'|'success'|'error'>('idle');
  const [nda,setNda] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === 'sending') return;
    const form = event.currentTarget;
    const data = new FormData(form);
    if (String(data.get('website') || '').trim()) return;
    if (!nda) return;
    setStatus('sending');
    const marketsSelected = data.getAll('markets').map(String).slice(0,10);
    const supabase = createClient();
    const { error } = await supabase.from('investor_qualification_applications').insert({
      full_name: String(data.get('full_name') || '').trim(),
      email: String(data.get('email') || '').trim().toLowerCase(),
      phone: String(data.get('phone') || '').trim(),
      nationality: String(data.get('nationality') || '').trim(),
      residence_country: String(data.get('residence') || '').trim(),
      investor_type: String(data.get('investor_type') || ''),
      investable_assets: String(data.get('investable_assets') || ''),
      investor_classification: String(data.get('investor_classification') || ''),
      markets: marketsSelected,
      property_type: String(data.get('property_type') || ''),
      investment_size: String(data.get('investment_size') || ''),
      financing: String(data.get('financing') || ''),
      proof_of_funds: String(data.get('pof') || ''),
      timeline: String(data.get('timeline') || ''),
      deals_count: String(data.get('deals_count') || ''),
      nda_before: String(data.get('nda_before') || ''),
      advisor: String(data.get('advisor') || ''),
      experience: String(data.get('experience') || ''),
      source: String(data.get('source') || ''),
      referral_name: String(data.get('referral_name') || '').trim() || null,
      comments: String(data.get('comments') || '').trim() || null,
      consent: data.get('consent') === 'on',
      nda_acknowledged: true,
      nda_acknowledged_at: new Date().toISOString(),
      nda_signatory_name: String(data.get('nda_signatory_name') || '').trim(),
      locale,
    });
    if (error) { setStatus('error'); return; }
    form.reset();
    setNda(false);
    setStatus('success');
  }

  return <main className="app-shell qualified-page">
    <header className="app-header">
      <Link className="brand" href="/">ASSETVEYRA</Link>
      <nav><Link href="/#opportunities"><I18nText id="Opportunities"/></Link><Link href="/#about"><I18nText id="About"/></Link><Link href="/login"><I18nText id="Sign in"/></Link></nav>
    </header>

    <section className="qualified-hero">
      <div className="eyebrow"><I18nText id="Qualified Investors"/></div>
      <h1><I18nText id="Exclusive Real Estate Opportunities for Qualified Investors"/></h1>
      <p><I18nText id="Off-market opportunities. Controlled access. Transaction-ready workflows."/></p>
      <div className="qualified-alert"><strong><I18nText id="Qualified Investors"/></strong><span><I18nText id="For serious investors seeking verified, controlled access to real-asset opportunities."/></span></div>
      <a className="button primary" href="#qualification-form"><I18nText id="Apply for Access"/> →</a>
    </section>

    <section className="qualified-section">
      <div className="section-heading"><div className="eyebrow"><I18nText id="Platform"/></div><h2><I18nText id="What We Offer"/></h2></div>
      <div className="qualified-grid">
        {[
          ['Structured opportunity information','Relevant financial, legal and technical materials are shared according to opportunity stage and access controls.'],
          ['Controlled diligence','Due-diligence materials are provided where available and applicable; verification is not an investment guarantee.'],
          ['Legal and transaction support','Transactions may involve qualified local legal, tax or other professional advisers as appropriate.'],
          ['Private opportunity access','Sensitive information is disclosed only through the applicable registration, qualification, confidentiality and data-room controls.'],
        ].map(([title,body])=><article className="qualified-card" key={title}><h3><I18nText id={title}/></h3><p><I18nText id={body}/></p></article>)}
      </div>
    </section>

    <section className="qualified-section qualified-markets">
      <div className="section-heading"><div className="eyebrow"><I18nText id="Market"/></div><h2><I18nText id="Focus Markets"/></h2><p><I18nText id="Market availability, eligibility and transaction feasibility are assessed individually."/></p></div>
      <div className="qualified-market-grid">{markets.map(([value,label])=><div className="qualified-market" key={value}><strong><I18nText id={label}/></strong><span><I18nText id="Controlled access"/></span></div>)}</div>
    </section>

    <section className="qualified-section" id="qualification-form">
      <div className="section-heading"><div className="eyebrow"><I18nText id="Qualified Investors"/></div><h2><I18nText id="Investor Qualification Form"/></h2><p><I18nText id="To protect confidentiality and sellers, access may require the following information and steps:"/></p></div>
      <form className="form-grid qualified-form" onSubmit={submit}>
        <fieldset><legend>1. <I18nText id="Contact Information"/></legend>
          <label><span><I18nText id="Full Name"/> *</span><input name="full_name" required minLength={2} maxLength={120} autoComplete="name"/></label>
          <label><span><I18nText id="Email Address"/> *</span><input name="email" type="email" required maxLength={320} autoComplete="email"/></label>
          <label><span><I18nText id="Phone Number (with country code)"/> *</span><input name="phone" type="tel" required maxLength={40} autoComplete="tel"/></label>
          <label><span><I18nText id="Nationality"/> *</span><input name="nationality" required maxLength={120}/></label>
          <label><span><I18nText id="Current Country of Residence"/> *</span><input name="residence" required maxLength={120}/></label>
        </fieldset>

        <fieldset><legend>2. <I18nText id="Investor Profile"/></legend>
          <SelectField name="investor_type" label="Investor Type">{investorTypes.map(o=><option key={o.value} value={o.value}>{o.label}</option>)}</SelectField>
          <SelectField name="investable_assets" label="Investable Assets Available">{assetRanges.map(v=><option key={v} value={v}>${v.replace('k','K').replace('m','M')}</option>)}</SelectField>
          <SelectField name="investor_classification" label="Investor classification (where applicable)"><option value="yes"><I18nText id="Yes"/></option><option value="no"><I18nText id="No"/></option><option value="entity"><I18nText id="Entity / Not applicable"/></option></SelectField>
        </fieldset>

        <fieldset><legend>3. <I18nText id="Market Interest"/></legend>
          <div className="check-grid">{markets.map(([value,label])=><label className="check" key={value}><input type="checkbox" name="markets" value={value}/><span><I18nText id={label}/></span></label>)}</div>
          <SelectField name="property_type" label="Preferred Property Type">{propertyTypes.map(([v,l])=><option key={v} value={v}><I18nText id={l}/></option>)}</SelectField>
          <SelectField name="investment_size" label="Target Investment Size (per deal)">{investmentRanges.map(v=><option key={v} value={v}>${v.replace('k','K').replace('m','M')}</option>)}</SelectField>
        </fieldset>

        <fieldset><legend>4. <I18nText id="Funding"/></legend>
          <SelectField name="financing" label="Will you need financing?">{financing.map(([v,l])=><option key={v} value={v}><I18nText id={l}/></option>)}</SelectField>
          <SelectField name="pof" label="Proof of Funds Available?"><option value="yes"><I18nText id="Yes — can provide within 24h"/></option><option value="no"><I18nText id="No — prefer not to share yet"/></option></SelectField>
        </fieldset>

        <fieldset><legend>5. <I18nText id="Timeline"/></legend>
          <SelectField name="timeline" label="When do you plan to close a deal?">{timelines.map(([v,l])=><option key={v} value={v}><I18nText id={l}/></option>)}</SelectField>
          <SelectField name="deals_count" label="How many deals are you looking to close in the next 12 months?">{dealCounts.map(([v,l])=><option key={v} value={v}><I18nText id={l}/></option>)}</SelectField>
        </fieldset>

        <fieldset><legend>6. <I18nText id="Experience"/></legend>
          <SelectField name="nda_before" label="Have you signed an NDA before?">{ndaHistory.map(([v,l])=><option key={v} value={v}><I18nText id={l}/></option>)}</SelectField>
          <SelectField name="advisor" label="Do you have a lawyer / tax adviser?">{advisors.map(([v,l])=><option key={v} value={v}><I18nText id={l}/></option>)}</SelectField>
          <SelectField name="experience" label="Years of real estate investing experience">{experience.map(([v,l])=><option key={v} value={v}><I18nText id={l}/></option>)}</SelectField>
        </fieldset>

        <fieldset><legend>7. <I18nText id="How did you find us?"/></legend>
          <SelectField name="source" label="How did you find us?">{sources.map(([v,l])=><option key={v} value={v}><I18nText id={l}/></option>)}</SelectField>
          <label><span><I18nText id="If referral, who referred you?"/></span><input name="referral_name" maxLength={200}/></label>
        </fieldset>

        <fieldset><legend>8. <I18nText id="Additional Information"/></legend>
          <label><span><I18nText id="Anything else we should know?"/></span><textarea name="comments" rows={5} maxLength={4000} placeholder=""/></label>
        </fieldset>

        <fieldset className="qualified-nda full"><legend><I18nText id="Standard NDA"/></legend>
          <h3><I18nText id="Confidentiality Agreement"/></h3>
          <p><I18nText id="Confidential information includes opportunity details, pricing, financial, legal, technical and seller information disclosed for evaluation."/></p>
          <p><I18nText id="Use confidential information only to evaluate a potential transaction and do not disclose it to third parties without written authorization."/></p>
          <p><I18nText id="Public information and information lawfully known before disclosure are excluded from confidentiality obligations."/></p>
          <p className="legal-note"><I18nText id="The standard terms are provided as a platform draft and must be reviewed for the applicable jurisdiction before being used as a binding agreement."/></p>
          <label className="check"><input type="checkbox" name="nda" checked={nda} onChange={e=>setNda(e.target.checked)} required/><span><I18nText id="I acknowledge the confidentiality terms and understand that a final NDA may be required before controlled information is shared."/> *</span></label>
          <label><span><I18nText id="Type your full name as acknowledgement"/> *</span><input name="nda_signatory_name" required maxLength={120}/></label>
        </fieldset>

        <div className="consent-box full"><label className="check"><input type="checkbox" name="consent" required/><span><I18nText id="I confirm that the information I provided is accurate and agree to be contacted about relevant real-estate opportunities."/> *</span></label></div>
        <div className="qualified-honeypot" aria-hidden="true"><input name="website" tabIndex={-1} autoComplete="off"/></div>
        <div className="full qualified-submit"><button className="button primary" type="submit" disabled={status==='sending'}>{status==='sending'?<I18nText id="Submitting…"/>:<I18nText id="Submit Application"/>} →</button>
          {status==='success'&&<p className="form-success" role="status"><I18nText id="Application received. Our team will review the information and contact you using the details provided."/></p>}
          {status==='error'&&<p className="form-error" role="alert"><I18nText id="Unable to submit the application. Please try again."/></p>}
        </div>
      </form>
    </section>

    <section className="qualified-next qualified-section">
      <div className="section-heading"><div className="eyebrow"><I18nText id="Workflow"/></div><h2><I18nText id="What happens next?"/></h2><p><I18nText id="We review the application, confirm any applicable qualification steps, and contact you if further information is required."/></p></div>
      <div className="qualified-steps"><span>01</span><span>02</span><span>03</span><div><strong>Review</strong><small>Application review and qualification checks</small></div><div><strong>Contact</strong><small>Follow-up if further information is required</small></div><div><strong>Access</strong><small>Controlled opportunity access where approved</small></div></div>
      <div className="qualified-disclaimer"><strong><I18nText id="No investment guarantee"/></strong><p><I18nText id="AssetVeyra is a marketplace and transaction platform, not an investment adviser."/> <I18nText id="Please consult qualified legal, tax and financial advisers for your circumstances."/></p></div>
      <Link className="button" href="/"><I18nText id="Return to marketplace"/></Link>
    </section>

    <style jsx>{`
      .qualified-hero{max-width:1280px;margin:0 auto;padding:100px 6vw 80px;background:radial-gradient(circle at 75% 20%,rgba(184,138,77,.16),transparent 30%)}
      .qualified-hero h1{max-width:900px;margin:16px 0 20px;color:var(--av-green);font-size:clamp(42px,6vw,78px);line-height:.96;letter-spacing:-.055em}
      .qualified-hero>p{max-width:760px;color:var(--av-muted);font-size:18px;line-height:1.7}
      .qualified-alert{max-width:850px;margin:32px 0;padding:18px 20px;display:grid;gap:5px;border:1px solid rgba(184,138,77,.55);background:#fffaf0;color:var(--av-charcoal)}
      .qualified-alert strong{color:var(--av-green);font-size:13px;text-transform:uppercase;letter-spacing:.08em}.qualified-alert span{font-size:13px;line-height:1.6}
      .qualified-section{max-width:1280px;margin:0 auto;padding:75px 6vw}.section-heading{margin-bottom:30px}.section-heading h2{margin:8px 0 10px;color:var(--av-green);font-size:clamp(36px,5vw,58px);line-height:1;letter-spacing:-.045em}.section-heading p{max-width:780px;color:var(--av-muted);line-height:1.7}
      .qualified-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:16px}.qualified-card{min-height:190px;padding:26px;background:#fff;border:1px solid var(--av-line)}.qualified-card h3{margin:0 0 12px;color:var(--av-green);font-size:21px}.qualified-card p{margin:0;color:var(--av-muted);line-height:1.7;font-size:14px}
      .qualified-markets{background:#f1eee7}.qualified-market-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:1px;background:var(--av-line);border:1px solid var(--av-line)}.qualified-market{min-height:120px;padding:22px;background:#fff;display:grid;align-content:center;gap:8px}.qualified-market strong{color:var(--av-green);font-size:17px}.qualified-market span{color:var(--av-muted);font-size:11px;text-transform:uppercase;letter-spacing:.08em}
      .qualified-form{margin-top:38px}.qualified-form fieldset{min-width:0;margin:0;padding:24px;border:1px solid var(--av-line);background:#fff;display:grid;gap:17px}.qualified-form legend{padding:0 7px;color:var(--av-bronze);font-size:12px;font-weight:700;letter-spacing:.1em;text-transform:uppercase}.qualified-form label{display:grid;gap:7px;color:var(--av-green);font-size:12px;font-weight:700}.qualified-form input,.qualified-form textarea,.qualified-form select{box-sizing:border-box;width:100%;padding:13px;border:1px solid #ccc8bf;border-radius:0;background:#fff;color:var(--av-charcoal);font-size:16px}.qualified-form input:focus,.qualified-form textarea:focus,.qualified-form select:focus{outline:2px solid rgba(184,138,77,.35);outline-offset:1px;border-color:var(--av-bronze)}.check-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px}.check{display:flex!important;grid-template-columns:none!important;align-items:flex-start;gap:9px!important;font-weight:500!important;line-height:1.45}.check input{width:18px;min-width:18px;margin-top:2px}.qualified-nda{grid-column:1/-1}.qualified-nda h3{margin:0;color:var(--av-green)}.qualified-nda p{margin:0;color:var(--av-muted);font-size:13px;line-height:1.7}.qualified-nda .legal-note{padding:13px;border-left:3px solid var(--av-bronze);background:#faf8f2}.consent-box{padding:18px;background:#f5f3ee;border:1px solid var(--av-line)}.qualified-submit{display:grid;gap:14px}.qualified-submit .button{width:max-content}.qualified-honeypot{position:absolute;left:-10000px}.qualified-next{border-top:1px solid var(--av-line)}.qualified-steps{display:grid;grid-template-columns:repeat(3,1fr);gap:0;border-top:1px solid var(--av-line);border-bottom:1px solid var(--av-line);margin-bottom:30px}.qualified-steps>span{padding:18px 18px 0;color:var(--av-bronze);font-size:11px;font-weight:700}.qualified-steps>div{padding:8px 18px 22px}.qualified-steps strong{display:block;color:var(--av-green);font-size:18px}.qualified-steps small{display:block;color:var(--av-muted);margin-top:5px;line-height:1.5}.qualified-disclaimer{max-width:850px;padding:18px 20px;margin-bottom:25px;border:1px solid var(--av-line);background:#fff}.qualified-disclaimer strong{color:var(--av-green)}.qualified-disclaimer p{margin:6px 0 0;color:var(--av-muted);font-size:13px;line-height:1.6}
      @media(max-width:767px){.qualified-hero,.qualified-section{padding-left:5vw;padding-right:5vw}.qualified-hero{padding-top:60px}.qualified-grid,.qualified-market-grid,.check-grid,.qualified-steps{grid-template-columns:1fr}.qualified-form{grid-template-columns:1fr}.qualified-form .full{grid-column:1}.qualified-submit .button{width:100%}.qualified-steps{display:grid}.qualified-steps>span{padding-top:16px}.qualified-steps>div{padding-bottom:16px}}
    `}</style>
  </main>;
}
