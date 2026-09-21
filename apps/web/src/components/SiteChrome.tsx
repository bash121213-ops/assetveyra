import type { ReactNode } from 'react';
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';

/**
 * Public chrome used by the homepage and company/information pages.
 * `signedIn` and `headerStatus` come from the server only when real session
 * or status data exists; nothing here fabricates metrics.
 */
export default function SiteChrome({
  children,
  signedIn = false,
  headerStatus,
}: {
  children?: ReactNode;
  signedIn?: boolean;
  headerStatus?: ReactNode;
}) {
  return (
    <>
      <SiteHeader signedIn={signedIn}>{headerStatus}</SiteHeader>
      {children}
      <SiteFooter />
    </>
  );
}
