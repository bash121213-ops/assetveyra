import '../av-final.css';
import './external-market.css';
import { I18nText, LanguageSelect } from '@/components/LocaleShell';

type ExternalListing = {
  country: string;
  city: string;
  countryCode: string;
  classification: 'External Market Listing';
  title: string;
  propertyType: string;
  price: string;
  facts: string[];
  source: string;
  sourceUrl: string;
  checked: string;
  note: string;
};

const listings: ExternalListing[] = [
  {
    country: 'United Arab Emirates', city: 'Dubai · Palm Jumeirah', countryCode: 'AE', classification: 'External Market Listing',
    title: '250-Room Luxury Beachfront & Wellness Hotel', propertyType: 'Hospitality', price: '€152,000,000',
    facts: ['250 rooms', 'Beachfront', '5-star resort'], source: 'LuxuryEstate', sourceUrl: 'https://www.luxuryestate.com/p132160711-hotel-for-sale-dubai', checked: '16 Sep 2026',
    note: 'External listing. Ownership, seller authority, title, financial claims and availability have not been independently verified by AssetVeyra.'
  },
  {
    country: 'United Arab Emirates', city: 'Dubai · Jumeirah Garden City', countryCode: 'AE', classification: 'External Market Listing',
    title: '4-Star Off-Plan Hotel', propertyType: 'Hospitality / Development', price: 'AED 170,000,000',
    facts: ['96 rooms', '13,000 sq ft plot', 'Q2 2027 handover'], source: 'DXB Off Plan', sourceUrl: 'https://dxboffplan.com/properties/hotel-for-sale-in-jumeirah-garden-city/', checked: '16 Sep 2026',
    note: 'External listing. Construction, developer authority, title structure and final availability require direct confirmation.'
  },
  {
    country: 'United States', city: 'St. Simons Island, Georgia', countryCode: 'US', classification: 'External Market Listing',
    title: 'Ocean Lodge Boutique Resort', propertyType: 'Hospitality', price: '$9,000,000',
    facts: ['15 units', '20,000 sq ft', '0.6 acre lot'], source: 'CommercialCafe', sourceUrl: 'https://www.commercialcafe.com/commercial-property/us/ga/st-simons-island/boutique-resort-in-the-heart-of-st-simons-island/', checked: '16 Sep 2026',
    note: 'External listing. Availability and seller authority require confirmation with the advertiser.'
  },
  {
    country: 'Jordan', city: 'Amman', countryCode: 'JO', classification: 'External Market Listing',
    title: 'Newly Established Apart-Hotel', propertyType: 'Hospitality', price: 'JOD 930,000',
    facts: ['12 suites', '1,200 sq m built area', '350 sq m commercial land'], source: 'SMERGERS', sourceUrl: 'https://www.smergers.com/business/newly-established-hotel-for-sale-in-amman-jordan/1y5n5/', checked: '16 Sep 2026',
    note: 'External owner listing. Ownership and legal documentation are source claims and require AssetVeyra due diligence before transaction work.'
  },
  {
    country: 'Spain', city: 'Marbella, Málaga', countryCode: 'ES', classification: 'External Market Listing',
    title: 'Luxury Hotel Complex', propertyType: 'Hospitality', price: '€200,000,000',
    facts: ['149 rooms', '40,106 sq m built area', 'Luxury resort'], source: 'LuxuryEstate', sourceUrl: 'https://www.luxuryestate.com/p132296694-hotel-for-sale-marbella', checked: '16 Sep 2026',
    note: 'External listing. Licensing, ownership, operating status and availability require direct confirmation.'
  },
  {
    country: 'Spain', city: 'Sant Antoni de Portmany, Ibiza', countryCode: 'ES', classification: 'External Market Listing',
    title: 'Seafront Hotel Asset', propertyType: 'Hospitality', price: '€22,000,000',
    facts: ['86 rooms', '5,000 sq m', 'Seafront'], source: 'LuxuryEstate', sourceUrl: 'https://www.luxuryestate.com/hotels-spain/ibiza-island', checked: '16 Sep 2026',
    note: 'Current market source shows €22M. Earlier research references a different price; AssetVeyra uses the currently checked source value.'
  }
];

export default function ExternalMarketPage() {
  return <main className="av-final-home">
    <header className="av-final-header">
      <a className="av-final-brand" href="/">ASSETVEYRA</a>
      <details className="av-menu">
        <summary className="av-menu-trigger"><span className="av-menu-icon" aria-hidden="true"><i></i><i></i><i></i></span><I18nText id="Menu"/></summary>
        <nav className="av-menu-panel" aria-label="Primary navigation">
          <a href="/"><I18nText id="Home"/></a>
          <a href="/external-market"><I18nText id="Marketplace"/></a>
          <a href="/contact"><I18nText id="Contact"/></a>
          <a href="/dashboard"><I18nText id="Dashboard"/></a>
          <div className="av-menu-divider"/>
          <div className="av-language-group"><I18nText id="Language"/><LanguageSelect/></div>
          <div className="av-menu-account">
            <a className="av-menu-login" href="/login"><I18nText id="Login"/></a>
            <a className="av-menu-signup" href="/signup"><I18nText id="Sign Up"/></a>
          </div>
        </nav>
      </details>
    </header>

    <section className="external-market-section">
      <div className="external-market-heading">
        <div>
          <div className="eyebrow"><I18nText id="Marketplace"/></div>
          <h2><I18nText id="External Market Opportunities"/></h2>
          <p><I18nText id="Selected live market listings sourced from external publishers and checked for source availability. These are not AssetVeyra-verified properties."/></p>
        </div>
        <div className="external-market-note"><I18nText id="Source Confirmed does not mean ownership or transaction verified."/></div>
      </div>

      {listings.map((listing) => <article className="external-listing-card" key={listing.sourceUrl}>
        <div className="card-meta"><span>{listing.country}</span><span>{listing.classification}</span></div>
        <h4>{listing.title}</h4>
        <p>{listing.city} · {listing.propertyType}</p>
        <div className="external-facts">{listing.facts.map((fact) => <span key={fact}><b>•</b>{fact}</span>)}</div>
        <div className="external-card-footer">
          <strong>{listing.price}</strong>
          <a href={listing.sourceUrl} target="_blank" rel="noopener noreferrer">View Original Listing ↗</a>
        </div>
        <small><strong>{listing.source}</strong> · Last checked {listing.checked}. {listing.note}</small>
      </article>)}
    </section>

    <footer className="av-footer"><I18nText id="AssetVeyra is a marketplace, not an investment advisor. Confidentiality and access controls apply where applicable."/></footer>
  </main>;
}
