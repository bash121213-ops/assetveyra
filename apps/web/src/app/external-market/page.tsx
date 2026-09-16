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
  imageUrl: string;
  imageAlt: string;
};

const WHATSAPP_NUMBER = '353899450711';
const whatsappUrl = (title?: string) => {
  const message = title
    ? `Hello AssetVeyra, I would like to request information about: ${title}`
    : 'Hello AssetVeyra, I would like to request information about an opportunity.';
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
};

const listings: ExternalListing[] = [
  {
    country: 'United Arab Emirates', city: 'Dubai · Palm Jumeirah', countryCode: 'AE', classification: 'External Market Listing',
    title: '250-Room Luxury Beachfront & Wellness Hotel', propertyType: 'Hospitality', price: '€152,000,000',
    facts: ['250 rooms', 'Beachfront', '5-star resort'],
    imageUrl: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1400&q=85',
    imageAlt: 'Luxury beachfront hotel representing a Dubai hospitality opportunity'
  },
  {
    country: 'United Arab Emirates', city: 'Dubai · Jumeirah Garden City', countryCode: 'AE', classification: 'External Market Listing',
    title: '4-Star Off-Plan Hotel', propertyType: 'Hospitality / Development', price: 'AED 170,000,000',
    facts: ['96 rooms', '13,000 sq ft plot', 'Q2 2027 handover'],
    imageUrl: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1400&q=85',
    imageAlt: 'Dubai skyline representing a Jumeirah Garden City hotel opportunity'
  },
  {
    country: 'United States', city: 'St. Simons Island, Georgia', countryCode: 'US', classification: 'External Market Listing',
    title: 'Ocean Lodge Boutique Resort', propertyType: 'Hospitality', price: '$9,000,000',
    facts: ['15 units', '20,000 sq ft', '0.6 acre lot'],
    imageUrl: 'https://images.unsplash.com/photo-1501117716987-c8e1ecb210b5?auto=format&fit=crop&w=1400&q=85',
    imageAlt: 'Coastal boutique resort representing a St. Simons Island opportunity'
  },
  {
    country: 'Jordan', city: 'Amman', countryCode: 'JO', classification: 'External Market Listing',
    title: 'Newly Established Apart-Hotel', propertyType: 'Hospitality', price: 'JOD 930,000',
    facts: ['12 suites', '1,200 sq m built area', '350 sq m commercial land'],
    imageUrl: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1400&q=85',
    imageAlt: 'Modern hotel representing an Amman apart-hotel opportunity'
  },
  {
    country: 'Spain', city: 'Marbella, Málaga', countryCode: 'ES', classification: 'External Market Listing',
    title: 'Luxury Hotel Complex', propertyType: 'Hospitality', price: '€200,000,000',
    facts: ['149 rooms', '40,106 sq m built area', 'Luxury resort'],
    imageUrl: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=1400&q=85',
    imageAlt: 'Luxury Mediterranean hotel representing a Marbella opportunity'
  },
  {
    country: 'Spain', city: 'Sant Antoni de Portmany, Ibiza', countryCode: 'ES', classification: 'External Market Listing',
    title: 'Seafront Hotel Asset', propertyType: 'Hospitality', price: '€22,000,000',
    facts: ['86 rooms', '5,000 sq m', 'Seafront'],
    imageUrl: 'https://images.unsplash.com/photo-1601918774946-25832a4be0d6?auto=format&fit=crop&w=1400&q=85',
    imageAlt: 'Seafront hotel representing an Ibiza hospitality opportunity'
  }
];

const copy = {
  en: { heading: 'External Market Opportunities', intro: 'Selected market opportunities presented through AssetVeyra. Contact AssetVeyra for current details, availability and transaction information.', contact: 'Contact AssetVeyra', ask: 'Request This Opportunity', source: 'Market opportunity', location: 'Location', type: 'Type' },
  ar: { heading: 'فرص السوق العقاري', intro: 'فرص عقارية مختارة معروضة عبر AssetVeyra. تواصل مع AssetVeyra للحصول على التفاصيل الحالية والتوفر ومعلومات المعاملة.', contact: 'تواصل مع AssetVeyra', ask: 'اطلب هذه الفرصة', source: 'فرصة من السوق', location: 'الموقع', type: 'النوع' },
  zh: { heading: '市场机会', intro: 'AssetVeyra 精选并展示市场机会。请联系 AssetVeyra 获取最新详情、可用性和交易信息。', contact: '联系 AssetVeyra', ask: '咨询此机会', source: '市场机会', location: '位置', type: '类型' },
  es: { heading: 'Oportunidades del mercado', intro: 'Oportunidades seleccionadas presentadas por AssetVeyra. Contacte con AssetVeyra para obtener detalles actuales, disponibilidad e información de la operación.', contact: 'Contactar con AssetVeyra', ask: 'Solicitar esta oportunidad', source: 'Oportunidad de mercado', location: 'Ubicación', type: 'Tipo' },
  fr: { heading: 'Opportunités du marché', intro: 'Opportunités sélectionnées présentées par AssetVeyra. Contactez AssetVeyra pour obtenir les informations actuelles, la disponibilité et les détails de la transaction.', contact: 'Contacter AssetVeyra', ask: 'Demander cette opportunité', source: 'Opportunité du marché', location: 'Emplacement', type: 'Type' }
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
        <a className="external-market-contact" href={whatsappUrl()} target="_blank" rel="noreferrer">{t.contact}</a>
      </div>

      <div className="external-listing-grid">
        {listings.map((listing) => <article className="external-listing-card" key={`${listing.countryCode}-${listing.title}`}>
          <div className="external-listing-image">
            <img src={listing.imageUrl} alt={listing.imageAlt} loading="lazy" />
            <div className="external-image-watermark" aria-hidden="true">ASSETVEYRA</div>
          </div>
          <div className="card-meta"><span>{listing.country}</span><span>{t.source}</span></div>
          <h4>{listing.title}</h4>
          <p>{listing.city} · {listing.propertyType}</p>
          <div className="external-facts">{listing.facts.map((fact) => <span key={fact}><b>•</b>{fact}</span>)}</div>
          <div className="external-card-footer"><strong>{listing.price}</strong><a className="external-market-contact-link" href={whatsappUrl(listing.title)} target="_blank" rel="noreferrer">{t.ask}</a></div>
        </article>)}
      </div>
    </section>

    <footer className="av-footer"><I18nText id="AssetVeyra is a marketplace, not an investment advisor. Confidentiality and access controls apply where applicable."/></footer>
  </main>;
}
