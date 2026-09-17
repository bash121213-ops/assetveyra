'use client';

import { I18nText, LanguageSelect } from '@/components/LocaleShell';

export default function SiteChrome({ children }: { children?: React.ReactNode }) {
  return <>
    <header className="av-final-header">
      <a className="av-final-brand" href="/">ASSETVEYRA</a>
      <details className="av-menu">
        <summary className="av-menu-trigger"><span className="av-menu-icon" aria-hidden="true"><i></i><i></i><i></i></span><I18nText id="Menu"/></summary>
        <nav className="av-menu-panel" aria-label="Primary navigation">
          <a href="/"><I18nText id="Home"/></a>
          <details><summary><I18nText id="About Company"/></summary><a href="/about"><I18nText id="About Us"/></a><a href="/why-trust-us"><I18nText id="Why Trust Us"/></a><a href="/legal-partners"><I18nText id="Legal Partners"/></a></details>
          <details><summary><I18nText id="How We Work"/></summary><a href="/how-it-works"><I18nText id="How It Works"/></a><a href="/fees"><I18nText id="Fees & Commissions"/></a><a href="/failed-deal"><I18nText id="Failed Deal"/></a></details>
          <details><summary><I18nText id="Opportunities"/></summary><a href="/opportunities"><I18nText id="Available Opportunities"/></a><a href="/verification"><I18nText id="Opportunity Verification"/></a></details>
          <details><summary><I18nText id="Policies"/></summary><a href="/terms"><I18nText id="Terms & Conditions"/></a><a href="/privacy"><I18nText id="Privacy Policy"/></a><a href="/policies"><I18nText id="Conflicts of Interest"/></a><a href="/policies#complaints"><I18nText id="Complaints"/></a><a href="/policies#aml"><I18nText id="AML/KYC"/></a></details>
          <a href="/faq"><I18nText id="FAQ"/></a>
          <a href="/contact"><I18nText id="Contact Us"/></a>
          <a className="av-menu-request" href="/submit"><I18nText id="Submit Your Request"/></a>
          <div className="av-menu-divider"/>
          <div className="av-language-group"><I18nText id="Language"/><LanguageSelect/></div>
          <div className="av-menu-account"><a className="av-menu-login" href="/login"><I18nText id="Login"/></a><a className="av-menu-signup" href="/signup"><I18nText id="Sign Up"/></a></div>
        </nav>
      </details>
    </header>
    {children}
    <footer className="av-site-footer">
      <div className="av-footer-grid">
        <div><h3><I18nText id="Company"/></h3><a href="/about"><I18nText id="About Us"/></a><a href="/why-trust-us"><I18nText id="Why Trust Us"/></a><a href="/legal-partners"><I18nText id="Legal Partners"/></a></div>
        <div><h3><I18nText id="How We Work"/></h3><a href="/how-it-works"><I18nText id="How It Works"/></a><a href="/fees"><I18nText id="Fees & Commissions"/></a><a href="/failed-deal"><I18nText id="Failed Deal"/></a></div>
        <div><h3><I18nText id="Opportunities"/></h3><a href="/opportunities"><I18nText id="Available Opportunities"/></a><a href="/verification"><I18nText id="Opportunity Verification"/></a></div>
        <div><h3><I18nText id="Policies"/></h3><a href="/terms"><I18nText id="Terms & Conditions"/></a><a href="/privacy"><I18nText id="Privacy Policy"/></a><a href="/policies#conflicts"><I18nText id="Conflicts of Interest"/></a><a href="/policies#complaints"><I18nText id="Complaints"/></a><a href="/policies#aml"><I18nText id="AML/KYC"/></a></div>
        <div><h3><I18nText id="Contact Us"/></h3><a href="/contact"><I18nText id="info@assetveyra.com"/></a><a href="tel:+353899450711"><I18nText id="+353 899 450 711"/></a></div>
      </div>
      <div className="av-footer-disclaimer"><I18nText id="We are an intermediary and transaction coordinator."/> <I18nText id="We do not guarantee a sale or profit."/> <I18nText id="We do not receive transaction funds."/></div>
      <div className="av-footer-copy"><I18nText id="Copyright"/> © 2026 <I18nText id="Kassab and Sons for Land and Real Estate Trading"/>.</div>
    </footer>
  </>;
}