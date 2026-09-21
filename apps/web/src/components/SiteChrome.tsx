'use client';

import { useEffect, useState, type ReactNode } from 'react';
import { I18nText, LanguageSelect } from '@/components/LocaleShell';

export type ChromeLink = { href: string; id: string };

/** Primary public navigation, shared by the desktop row and the mobile overlay. */
export const PUBLIC_LINKS: ChromeLink[] = [
  { href: '/external-market', id: 'Institutional Land' },
  { href: '/opportunities', id: 'Opportunities' },
  { href: '/qualified-investors', id: 'Buy an Asset' },
  { href: '/submit', id: 'Sell / Submit an Asset' },
  { href: '/how-it-works', id: 'How It Works' },
  { href: '/about', id: 'About' },
  { href: '/contact', id: 'Contact' },
];

/** Secondary links kept in the mobile overlay so the policy set stays reachable. */
const PUBLIC_MORE: ChromeLink[] = [
  { href: '/faq', id: 'FAQ' },
  { href: '/fees', id: 'Fees & Commissions' },
  { href: '/verification', id: 'Opportunity Verification' },
  { href: '/why-trust-us', id: 'Why Trust Us' },
  { href: '/terms', id: 'Terms & Conditions' },
  { href: '/privacy', id: 'Privacy Policy' },
];

function MobileNav({ links, action, signOut, more }: { links: ChromeLink[]; action?: ChromeLink; signOut?: boolean; more?: ChromeLink[] }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => { if (event.key === 'Escape') setOpen(false); };
    document.addEventListener('keydown', onKey);
    document.documentElement.classList.add('av-nav-open');
    return () => {
      document.removeEventListener('keydown', onKey);
      document.documentElement.classList.remove('av-nav-open');
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        className="av-menu-trigger av-menu-toggle"
        aria-expanded={open}
        aria-controls="av-mobile-nav"
        onClick={() => setOpen(true)}
      >
        <span className="av-menu-icon" aria-hidden="true"><i /><i /><i /></span>
        <I18nText id="Menu" />
      </button>
      {open && (
        <div className="av-mobile-nav" id="av-mobile-nav">
          <button type="button" className="av-mobile-nav-backdrop" aria-label="Close menu" onClick={() => setOpen(false)} />
          <div className="av-mobile-nav-panel" role="dialog" aria-modal="true" aria-label="Site navigation">
            <div className="av-mobile-nav-head">
              <strong>ASSETVEYRA</strong>
              <button type="button" className="av-mobile-nav-close" aria-label="Close menu" onClick={() => setOpen(false)}>&times;</button>
            </div>
            <div className="av-mobile-nav-body">
              {links.map((link) => (
                <a key={link.href} className="av-mobile-nav-link" href={link.href} onClick={() => setOpen(false)}><I18nText id={link.id} /></a>
              ))}
              {more?.length ? (
                <details className="av-mobile-nav-group">
                  <summary><I18nText id="More" /></summary>
                  <div className="av-mobile-nav-sub">
                    {more.map((link) => (
                      <a key={link.href} href={link.href} onClick={() => setOpen(false)}><I18nText id={link.id} /></a>
                    ))}
                  </div>
                </details>
              ) : null}
              <div className="av-mobile-nav-actions">
                {signOut && (
                  <form action="/logout" method="post"><button className="av-btn" type="submit"><I18nText id="Sign out" /></button></form>
                )}
                {action && <a className="av-btn av-primary" href={action.href} onClick={() => setOpen(false)}><I18nText id={action.id} /></a>}
                <a className="av-btn" href="/login" onClick={() => setOpen(false)}><I18nText id="Sign in" /></a>
                <a className="av-btn av-primary" href="/signup" onClick={() => setOpen(false)}><I18nText id="Create account" /></a>
              </div>
              <div className="av-mobile-nav-lang">
                <I18nText id="Language" />
                <LanguageSelect />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function Footer({ compact }: { compact?: boolean }) {
  return (
    <footer className={compact ? 'av-site-footer is-compact' : 'av-site-footer'}>
      <div className="av-footer-grid">
        <div><h3><I18nText id="Company" /></h3><a href="/about"><I18nText id="About Us" /></a><a href="/why-trust-us"><I18nText id="Why Trust Us" /></a><a href="/legal-partners"><I18nText id="Legal Partners" /></a></div>
        <div><h3><I18nText id="How We Work" /></h3><a href="/how-it-works"><I18nText id="How It Works" /></a><a href="/fees"><I18nText id="Fees & Commissions" /></a><a href="/failed-deal"><I18nText id="Failed Deal" /></a></div>
        <div><h3><I18nText id="Opportunities" /></h3><a href="/opportunities"><I18nText id="Available Opportunities" /></a><a href="/external-market"><I18nText id="Institutional Land" /></a><a href="/verification"><I18nText id="Opportunity Verification" /></a></div>
        <div><h3><I18nText id="Policies" /></h3><a href="/terms"><I18nText id="Terms & Conditions" /></a><a href="/privacy"><I18nText id="Privacy Policy" /></a><a href="/policies#conflicts"><I18nText id="Conflicts of Interest" /></a><a href="/faq"><I18nText id="FAQ" /></a></div>
        <div><h3><I18nText id="Contact Us" /></h3><a href="/contact"><I18nText id="info@assetveyra.com" /></a><a href="tel:+353899450711"><I18nText id="+353 899 450 711" /></a></div>
      </div>
      <div className="av-footer-disclaimer"><I18nText id="We are an intermediary and transaction coordinator." /> <I18nText id="We do not guarantee a sale or profit." /> <I18nText id="We do not receive transaction funds." /></div>
      <div className="av-footer-copy"><I18nText id="Copyright" /> © 2026 <I18nText id="Kassab and Sons for Land and Real Estate Trading" />.</div>
    </footer>
  );
}

/** Public site chrome: marketing header with the full link set, plus the footer. */
export default function SiteChrome({ children }: { children?: ReactNode }) {
  return (
    <>
      <header className="av-final-header">
        <a className="av-final-brand" href="/">ASSETVEYRA</a>
        <nav className="av-nav" aria-label="Primary navigation">
          {PUBLIC_LINKS.map((link) => <a key={link.href} href={link.href}><I18nText id={link.id} /></a>)}
        </nav>
        <div className="av-header-actions">
          <nav className="av-nav" aria-label="Account">
            <a className="av-nav-signin" href="/login"><I18nText id="Sign in" /></a>
            <a href="/signup"><I18nText id="Create account" /></a>
            <a className="av-nav-cta" href="/submit"><I18nText id="Submit an Asset" /></a>
          </nav>
          <MobileNav links={PUBLIC_LINKS} action={{ href: '/submit', id: 'Submit an Asset' }} more={PUBLIC_MORE} />
        </div>
      </header>
      {children}
      <Footer />
    </>
  );
}

/**
 * Authenticated workspace chrome.
 *
 * Shares the header/footer design language with the public site. The link set
 * and the role-gated action are supplied by the server page, so no authorization
 * decision is made here.
 */
export function AppChrome({ links, action, signOut = true, children }: { links: ChromeLink[]; action?: ChromeLink; signOut?: boolean; children?: ReactNode }) {
  return (
    <>
      <header className="av-final-header">
        <a className="av-final-brand" href="/workspace">ASSETVEYRA</a>
        <nav className="av-nav" aria-label="Workspace navigation">
          {links.map((link) => <a key={link.href} href={link.href}><I18nText id={link.id} /></a>)}
          <a href="/opportunities"><I18nText id="Marketplace" /></a>
        </nav>
        <div className="av-header-actions">
          <nav className="av-nav" aria-label="Account">
            {action && <a className="av-nav-cta" href={action.href}><I18nText id={action.id} /></a>}
            {signOut && <form action="/logout" method="post"><button className="av-header-signout" type="submit"><I18nText id="Sign out" /></button></form>}
          </nav>
          <MobileNav links={[...links, { href: '/opportunities', id: 'Marketplace' }]} action={action} signOut={signOut} />
        </div>
      </header>
      {children}
      <Footer compact />
    </>
  );
}
