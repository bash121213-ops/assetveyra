'use client';

import '../av-final.css';
import '../external-market.css';
import { I18nText, LanguageSelect, useLocale } from '@/components/LocaleShell';

type ExternalListing = {
  country: string;
  city: string;
  countryCode: string;
  classification: 'External Market Listing';
  title: string;
  propertyType: string;
  price: string;
  facts: string[];
  imageUrl?: string;
  imageAlt?: string;
};

const listings: ExternalListing[] = [
  { country: 'United Arab Emirates', city: 'Dubai · Palm Jumeirah', countryCode: 'AE', classification: 'External Market Listing', title: '250-Room Luxury Beachfront & Wellness Hotel', propertyType: 'Hospitality', price: '€152,000,000', facts: ['250 rooms', 'Beachfront', '5-star resort'] },
  { country: 'United Arab Emirates', city: 'Dubai · Jumeirah Garden City', countryCode: 'AE', classification: 'External Market Listing', title: '4-Star Off-Plan Hotel', propertyType: 'Hospitality / Development', price: 'AED 170,000,000', facts: ['96 rooms', '13,000 sq ft plot', 'Q2 2027 handover'] },
  { country: 'United States', city: 'St. Simons Island, Georgia', countryCode: 'US', classification: 'External Market Listing', title: 'Ocean Lodge Boutique Resort', propertyType: 'Hospitality', price: '$9,000,000', facts: ['15 units', '20,000 sq ft', '0.6 acre lot'] },
  { country: 'Jordan', city: 'Amman', countryCode: 'JO', classification: 'External Market Listing', title: 'Newly Established Apart-Hotel', propertyType: 'Hospitality', price: 'JOD 930,000', facts: ['12 suites', '1,200 sq m built area', '350 sq m commercial land'], imageUrl: 'https://www.smergers.com/media/businessphoto/113009-1741767127-b2b1be01-41f0-43f9-8a52-6326da40a62e.png', imageAlt: 'Newly established apart-hotel in Amman' },
  { country: 'Spain', city: 'Marbella, Málaga', countryCode: 'ES', classification: 'External Market Listing', title: 'Luxury Hotel Complex', propertyType: 'Hospitality', price: '€200,000,000', facts: ['149 rooms', '40,106 sq m built area', 'Luxury resort'], imageUrl: 'https://pic.le-cdn.com/thumbs/1024x768/04/1/properties/Property-f6af0000000007e20001699ec03e-132296694.jpg', imageAlt: 'Luxury hotel complex in Marbella' },
  { country: 'Spain', city: 'Sant Antoni de Portmany, Ibiza', countryCode: 'ES', classification: 'External Market Listing', title: 'Seafront Hotel Asset', propertyType: 'Hospitality', price: '€22,000,000', facts: ['86 rooms', '5,000 sq m', 'Seafront'], imageUrl: 'https://pic.le-cdn.com/thumbs/520x390/917/1/properties/Property-47812f0af06e52014e7d803530632032-129473957.jpg', imageAlt: 'Seafront hotel in Ibiza' }
];

const copy = {
  en: { heading: 'External Market Opportunities', intro: 'Selected market opportunities presented through AssetVeyra. Contact AssetVeyra for current details, availability and transaction information.', contact: 'Contact AssetVeyra', ask: 'Request This Opportunity', source: 'Market opportunity', details: 'Ask AssetVeyra for details', location: 'Location', type: 'Type' },
  ar: { heading: 'فرص السوق العقاري', intro: 'فرص عقارية مختارة معروضة عبر AssetVeyra. تواصل مع AssetVeyra للحصول على التفاصيل الحالية والتوفر ومعلومات المعاملة.', contact: 'تواصل مع AssetVeyra', ask: 'اطلب هذه الفرصة', source: 'فرصة من السوق', details: 'اسأل AssetVeyra عن التفاصيل', location: 'الموقع', type: 'النوع' },
  zh: { heading: '市场机会', intro: 'AssetVeyra 精选并展示市场机会。请联系 AssetVeyra 获取最新详情、可用性和交易信息。', contact: '联系 AssetVeyra', ask: '咨询此机会', source: '市场机会', details: '向 AssetVeyra 咨询详情', location: '位置', type: '类型' },
  es: { heading: 'Oportunidades del mercado', intro: 'Oportunidades seleccionadas presentadas por AssetVeyra. Contacte con AssetVeyra para obtener detalles actuales, disponibilidad e información de la operación.', contact: 'Contactar con AssetVeyra', ask: 'Solicitar esta oportunidad', source: 'Oportunidad de mercado', details: 'Solicite los detalles a AssetVeyra', location: 'Ubicación', type: 'Tipo' },
  fr: { heading: 'Opportunités du marché', intro: 'Opportunités sélectionnées présentées par AssetVeyra. Contactez AssetVeyra pour obtenir les informations actuelles, la disponibilité et les détails de la transaction.', contact: 'Contacter AssetVeyra', ask: 'Demander cette opportunité', source: 'Opportunité du marché', details: 'Demander les détails à AssetVeyra', location: 'Emplacement', type: 'Type' }
} as const;

export default function ExternalMarketPage() {
  const locale = useLocale();
  const t = copy[locale];

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
          <div className="av-menu-account"><a className="av-menu-login" href="/login"><I18nText id="Login"/></a><a className="av-menu-signup" href="/signup"><I18nText id="Sign Up"/></a></div>
        </nav>
      </details>
    </header>

    <section className="external-market-section">
      <div className="external-market-heading">
        <div><div className="eyebrow"><I18nText id="Marketplace"/></div><h2>{t.heading}</h2><p>{t.intro}</p></div>
        <a className="external-market-contact" href="/contact">{t.contact}</a>
      </div>

      <div className="external-listing-grid">
        {listings.map((listing) => <article className="external-listing-card" key={`${listing.countryCode}-${listing.title}`}>
          <div className="external-listing-image">
            {listing.imageUrl ? <img src={listing.imageUrl} alt={listing.imageAlt ?? listing.title} loading="lazy" /> : <div className="external-image-placeholder" aria-hidden="true"><span>{listing.countryCode}</span></div>}
            <div className="external-image-watermark" aria-hidden="true">ASSETVEYRA</div>
          </div>
          <div className="card-meta"><span>{listing.country}</span><span>{t.source}</span></div>
          <h4>{listing.title}</h4>
          <p>{listing.city} · {listing.propertyType}</p>
          <div className="external-facts">{listing.facts.map((fact) => <span key={fact}><b>•</b>{fact}</span>)}</div>
          <div className="external-card-footer"><strong>{listing.price}</strong><a className="external-market-contact-link" href={`/contact?opportunity=${encodeURIComponent(listing.title)}`}>{t.ask}</a></div>
          <a className="external-details-link" href={`/contact?opportunity=${encodeURIComponent(listing.title)}`}>{t.details}</a>
        </article>)}
      </div>
    </section>

    <footer className="av-footer"><I18nText id="AssetVeyra is a marketplace, not an investment advisor. Confidentiality and access controls apply where applicable."/></footer>
  </main>;
}
