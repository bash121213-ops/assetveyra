'use client';

import { ReactNode, useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { I18nText, LanguageSelect } from '@/components/LocaleShell';
import Brand from '@/components/Brand';
import { PRIMARY_NAV, type NavItem } from '@/components/navigation';

type Props = {
  /** Renders Sign In / Create Account, or workspace + Sign Out when signed in. */
  signedIn?: boolean;
  /** Server-provided status slot (real data only). */
  children?: ReactNode;
  /** Primary navigation links. Defaults to the public marketplace navigation. */
  nav?: NavItem[];
  /** Extra mobile-only links, e.g. role-specific workspace entries. */
  extras?: NavItem[];
  /** When false the "Submit an Asset" CTA is hidden (e.g. investor-only views). */
  showSubmit?: boolean;
};

const FOCUSABLE = 'a[href], button:not([disabled])';

/** Workspace destinations shown when no page-specific account nav is supplied. */
const DEFAULT_WORKSPACE_NAV: NavItem[] = [
  { href: '/workspace', label: 'Workspace' },
  { href: '/workspace/interests', label: 'My Interests' },
  { href: '/workspace/deals', label: 'Transactions' },
];

/**
 * Site header with desktop-visible account actions and an accessible
 * full-height overlay navigation for narrow viewports.
 */
export default function SiteHeader({ signedIn = false, children, nav = PRIMARY_NAV, extras = [], showSubmit = true }: Props) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const panelRef = useRef<HTMLDivElement | null>(null);
  const toggleRef = useRef<HTMLButtonElement | null>(null);

  // Longest matching href wins, and when two entries share a destination
  // (e.g. Opportunities / Buy an Asset) only the first one is marked current.
  const isActive = (item: NavItem, index: number) => {
    const href = item.href.split('#')[0].replace(/\/$/, '') || '/';
    const matches = href === '/' ? pathname === '/' : pathname === href || pathname.startsWith(`${href}/`);
    if (!matches) return false;
    if (nav.findIndex((other) => other.href.split('#')[0].replace(/\/$/, '') === href) !== index) return false;
    return !nav.some((other, otherIndex) => {
      const otherHref = other.href.split('#')[0].replace(/\/$/, '') || '/';
      return otherIndex !== index && otherHref.startsWith(`${href}/`) && (pathname === otherHref || pathname.startsWith(`${otherHref}/`));
    });
  };
  const accountNav = signedIn
    ? (extras.length ? extras : nav.some((item) => item.href.startsWith('/workspace')) ? [] : DEFAULT_WORKSPACE_NAV)
    : [];

  // In the mobile list, keep account links in one place: page-provided items
  // are already rendered by the main loop, so only add what is missing.
  const provided = new Set([...nav, ...extras].map((item) => item.href));
  const mobileAccountNav = accountNav.filter((item) => !provided.has(item.href));

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const returnFocusTarget = toggleRef.current;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        setOpen(false);
        return;
      }
      if (event.key !== 'Tab' || !panelRef.current) return;
      const nodes = Array.from(panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
        (node) => node.offsetParent !== null,
      );
      if (!nodes.length) return;
      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    const frame = requestAnimationFrame(() => panelRef.current?.querySelector<HTMLElement>(FOCUSABLE)?.focus());
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = previousOverflow;
      cancelAnimationFrame(frame);
      returnFocusTarget?.focus();
    };
  }, [open]);

  return (
    <header className="av-header">
      <div className="av-header-inner">
        <Brand />

        <nav className="av-nav" aria-label="Primary navigation">
          {nav.map((item, index) => (
            <a key={`${item.href}-${item.label}`} href={item.href} aria-current={isActive(item, index) ? 'page' : undefined}>
              <I18nText id={item.label} />
            </a>
          ))}
        </nav>

        <div className="av-header-actions">
          {children}

          {signedIn ? (
            <>
              <a className="av-btn av-btn-ghost" href="/workspace"><I18nText id="Workspace" /></a>
              <form action="/logout" method="post">
                <button className="av-btn av-outline" type="submit"><I18nText id="Sign out" /></button>
              </form>
            </>
          ) : (
            <>
              <a className="av-btn av-btn-ghost" href="/login"><I18nText id="Sign In" /></a>
              <a className="av-btn av-btn-outline" href="/signup"><I18nText id="Create Account" /></a>
            </>
          )}

          {showSubmit && <a className="av-btn av-primary" href="/submit"><I18nText id="Submit an Asset" /></a>}

          <button
            ref={toggleRef}
            type="button"
            className="av-menu-toggle"
            aria-expanded={open}
            aria-controls="av-mobile-navigation"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((value) => !value)}
          >
            <span className="av-menu-icon" aria-hidden="true"><i /><i /><i /></span>
            <span className="av-menu-label"><I18nText id="Menu" /></span>
          </button>
        </div>
      </div>

      {open && (
        <div className="av-mobile-overlay" role="presentation" onClick={(event) => { if (event.target === event.currentTarget) setOpen(false); }}>
          <div
            id="av-mobile-navigation"
            className="av-mobile-panel"
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label="Site navigation"
          >
            <div className="av-mobile-head">
              <Brand />
              <button type="button" className="av-mobile-close" aria-label="Close menu" onClick={() => setOpen(false)}>×</button>
            </div>

            <div className="av-mobile-body">
              <nav className="av-mobile-nav" aria-label="Mobile navigation">
                <a href="/" aria-current={pathname === '/' ? 'page' : undefined}><I18nText id="Home" /></a>
                {nav.map((item, index) => (
                  <a key={`m-${item.href}-${item.label}`} href={item.href} aria-current={isActive(item, index) ? 'page' : undefined}><I18nText id={item.label} /></a>
                ))}
                {extras.map((item) => (
                  <a key={`mx-${item.href}-${item.label}`} href={item.href}><I18nText id={item.label} /></a>
                ))}

                <div className="av-mobile-divider" />

                {signedIn ? (
                  <>
                    {mobileAccountNav.map((item) => (
                      <a key={`ma-${item.href}-${item.label}`} href={item.href}><I18nText id={item.label} /></a>
                    ))}
                  </>
                ) : (
                  <>
                    <a className="av-menu-row" href="/login"><I18nText id="Sign In" /></a>
                    <a className="av-menu-row" href="/signup"><I18nText id="Create Account" /></a>
                  </>
                )}

                {showSubmit && (
                  <a className="av-btn av-primary" href="/submit" style={{ marginTop: 12, width: '100%' }}>
                    <I18nText id="Submit an Asset" />
                  </a>
                )}
              </nav>

              <div className="av-mobile-divider" />

              <div className="av-mobile-lang">
                <I18nText id="Language" />
                <LanguageSelect />
              </div>

              {signedIn && (
                <>
                  <div className="av-mobile-divider" />
                  <form action="/logout" method="post" className="av-mobile-account">
                    <button className="av-btn av-outline" type="submit" style={{ width: '100%' }}>
                      <I18nText id="Sign out" />
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
