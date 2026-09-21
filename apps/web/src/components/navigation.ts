export type NavItem = { href: string; label: string };

/** Primary desktop + mobile navigation. Labels are i18n keys. */
export const PRIMARY_NAV: NavItem[] = [
  { href: '/opportunities', label: 'Opportunities' },
  { href: '/opportunities', label: 'Buy an Asset' },
  { href: '/submit', label: 'Sell / Submit an Asset' },
  { href: '/how-it-works', label: 'How It Works' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

export const FOOTER_GROUPS: { title: string; links: NavItem[] }[] = [
  {
    title: 'Company',
    links: [
      { href: '/about', label: 'About Us' },
      { href: '/why-trust-us', label: 'Why Trust Us' },
      { href: '/legal-partners', label: 'Legal Partners' },
    ],
  },
  {
    title: 'How We Work',
    links: [
      { href: '/how-it-works', label: 'How It Works' },
      { href: '/fees', label: 'Fees & Commissions' },
      { href: '/failed-deal', label: 'Failed Deal' },
    ],
  },
  {
    title: 'Opportunities',
    links: [
      { href: '/opportunities', label: 'Available Opportunities' },
      { href: '/verification', label: 'Opportunity Verification' },
    ],
  },
  {
    title: 'Policies',
    links: [
      { href: '/terms', label: 'Terms & Conditions' },
      { href: '/privacy', label: 'Privacy Policy' },
      { href: '/policies#conflicts', label: 'Conflicts of Interest' },
      { href: '/policies#complaints', label: 'Complaints' },
    ],
  },
];
