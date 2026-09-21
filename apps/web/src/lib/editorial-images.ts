/**
 * Editorial photography used by the public site chrome.
 *
 * Every entry is a real, freely-licensed photograph (Wikimedia Commons) stored
 * locally in `public/media`, so the site never depends on a third-party host at
 * runtime. `subject` records what the photograph actually shows so each image is
 * only ever used for a purpose it truthfully depicts. Full licence and source
 * metadata is kept in `public/media/ATTRIBUTION.json`.
 *
 * These are editorial/brand images for the interface itself. They are never
 * attached to published opportunities, because doing so would imply the
 * photograph depicts a specific listed asset.
 */
export type EditorialImage = {
  src: string;
  subject: string;
  alt: string;
};

export const EDITORIAL_IMAGES = {
  /** Master-planned coastal community, aerial — hero. */
  hero: {
    src: '/media/hero-masterplan.jpg',
    subject: 'Master-planned coastal resort community, aerial view',
    alt: 'Aerial view of a master-planned coastal development',
  },
  /** Master-planned community under development, aerial — featured band. */
  masterplan: {
    src: '/media/featured-aerial.jpg',
    subject: 'Master-planned residential community under development, aerial view',
    alt: 'Aerial view of a master-planned residential community under development',
  },
  /** Coastal city skyline at night — international investment context. */
  cityscape: {
    src: '/media/coastal-cityscape.jpg',
    subject: 'Coastal city waterfront illuminated at night',
    alt: 'Coastal city waterfront illuminated at night',
  },
  /** Waterfront construction site — development pipeline. */
  waterfront: {
    src: '/media/featured-waterfront.jpg',
    subject: 'Waterfront development construction site',
    alt: 'Waterfront development under construction',
  },
  /** Residential development — land development. */
  development: {
    src: '/media/featured-community.jpg',
    subject: 'New residential development, aerial view',
    alt: 'Aerial view of a new residential development',
  },
  /** Aerial land development site — controlled access band. */
  access: {
    src: '/media/dev-site.jpg',
    subject: 'Aerial view of a waterfront development land site',
    alt: 'Aerial view of a development land site',
  },
  /** Resort coastline — hospitality assets. */
  resort: {
    src: '/media/resort-coast.jpg',
    subject: 'Coastal resort and marina',
    alt: 'Coastal resort and marina',
  },
  /** Modern architecture — architectural treatment. */
  architecture: {
    src: '/media/architecture.jpg',
    subject: 'Modernist building exterior',
    alt: 'Modernist building exterior',
  },
} as const satisfies Record<string, EditorialImage>;
