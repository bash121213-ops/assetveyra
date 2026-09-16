'use client';

import '../av-final.css';
import '../external-market.css';
import { I18nText, LanguageSelect, useLocale } from '@/components/LocaleShell';
import type { Locale } from '@/lib/i18n';

type Localized = Record<Locale, string>;

type ExternalListing = {
  country: Localized;
  city: Localized;
  countryCode: string;
  title: Localized;
  propertyType: Localized;
  price: string;
  facts: Record<Locale, string[]>;
  imageUrl: string;
  imageAlt: Localized;
};

const WHATSAPP_NUMBER = '353899450711';

const whatsappUrl = (title: string, locale: Locale) => {
  const messages: Record<Locale, string> = {
    en: `Hello AssetVeyra, I would like to request information about: ${title}`,
    ar: `مرحباً AssetVeyra، أرغب في طلب معلومات حول: ${title}`,
    zh: `您好 AssetVeyra，我想咨询以下机会：${title}`,
    es: `Hola AssetVeyra, quiero solicitar información sobre: ${title}`,
    fr: `Bonjour AssetVeyra, je souhaite demander des informations sur : ${title}`,
  };
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(messages[locale])}`;
};

const listings: ExternalListing[] = [
  {
    country: { en: 'United Arab Emirates', ar: 'الإمارات العربية المتحدة', zh: '阿拉伯联合酋长国', es: 'Emiratos Árabes Unidos', fr: 'Émirats arabes unis' },
    city: { en: 'Dubai · Palm Jumeirah', ar: 'دبي · نخلة جميرا', zh: '迪拜 · 棕榈岛', es: 'Dubái · Palm Jumeirah', fr: 'Dubaï · Palm Jumeirah' },
    countryCode: 'AE',
    title: { en: '250-Room Luxury Beachfront & Wellness Hotel', ar: 'فندق فاخر على الواجهة البحرية والعافية – 250 غرفة', zh: '250间豪华海滨康养酒店', es: 'Hotel de lujo frente al mar y bienestar – 250 habitaciones', fr: 'Hôtel de luxe en bord de mer et bien-être – 250 chambres' },
    propertyType: { en: 'Hospitality', ar: 'ضيافة', zh: '酒店及旅游', es: 'Hostelería', fr: 'Hôtellerie' },
    price: '€152,000,000',
    facts: {
      en: ['250 rooms', 'Beachfront', '5-star resort'],
      ar: ['250 غرفة', 'واجهة بحرية', 'منتجع 5 نجوم'],
      zh: ['250间客房', '临海', '五星级度假村'],
      es: ['250 habitaciones', 'Frente al mar', 'Resort de 5 estrellas'],
      fr: ['250 chambres', 'Bord de mer', 'Complexe 5 étoiles'],
    },
    imageUrl: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1400&q=85',
    imageAlt: { en: 'Luxury beachfront hotel representing a Dubai hospitality opportunity', ar: 'فندق فاخر على الواجهة البحرية يمثل فرصة ضيافة في دبي', zh: '代表迪拜酒店投资机会的豪华海滨酒店', es: 'Hotel de lujo frente al mar que representa una oportunidad hotelera en Dubái', fr: 'Hôtel de luxe en bord de mer représentant une opportunité hôtelière à Dubaï' },
  },
  {
    country: { en: 'United Arab Emirates', ar: 'الإمارات العربية المتحدة', zh: '阿拉伯联合酋长国', es: 'Emiratos Árabes Unidos', fr: 'Émirats arabes unis' },
    city: { en: 'Dubai · Jumeirah Garden City', ar: 'دبي · جميرا جاردن سيتي', zh: '迪拜 · 朱美拉花园城', es: 'Dubái · Jumeirah Garden City', fr: 'Dubaï · Jumeirah Garden City' },
    countryCode: 'AE',
    title: { en: '4-Star Off-Plan Hotel', ar: 'فندق 4 نجوم قيد التطوير', zh: '四星级期房酒店', es: 'Hotel de 4 estrellas en construcción', fr: 'Hôtel 4 étoiles en développement' },
    propertyType: { en: 'Hospitality / Development', ar: 'ضيافة / تطوير', zh: '酒店 / 开发', es: 'Hostelería / Desarrollo', fr: 'Hôtellerie / Développement' },
    price: 'AED 170,000,000',
    facts: {
      en: ['96 rooms', '13,000 sq ft plot', 'Q2 2027 handover'],
      ar: ['96 غرفة', 'أرض بمساحة 13,000 قدم²', 'التسليم الربع الثاني 2027'],
      zh: ['96间客房', '13,000平方英尺土地', '2027年第二季度交付'],
      es: ['96 habitaciones', 'Parcela de 13.000 pies²', 'Entrega T2 2027'],
      fr: ['96 chambres', 'Terrain de 13 000 pi²', 'Livraison T2 2027'],
    },
    imageUrl: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1400&q=85',
    imageAlt: { en: 'Dubai skyline representing a Jumeirah Garden City hotel opportunity', ar: 'أفق دبي يمثل فرصة فندق في جميرا جاردن سيتي', zh: '代表朱美拉花园城酒店机会的迪拜城市景观', es: 'Horizonte de Dubái que representa una oportunidad hotelera en Jumeirah Garden City', fr: 'Vue de Dubaï représentant une opportunité hôtelière à Jumeirah Garden City' },
  },
  {
    country: { en: 'United States', ar: 'الولايات المتحدة', zh: '美国', es: 'Estados Unidos', fr: 'États-Unis' },
    city: { en: 'St. Simons Island, Georgia', ar: 'جزيرة سانت سايمونز، جورجيا', zh: '乔治亚州圣西蒙斯岛', es: 'St. Simons Island, Georgia', fr: 'St. Simons Island, Géorgie' },
    countryCode: 'US',
    title: { en: 'Ocean Lodge Boutique Resort', ar: 'منتجع Ocean Lodge البوتيكي', zh: 'Ocean Lodge精品度假村', es: 'Resort boutique Ocean Lodge', fr: 'Complexe boutique Ocean Lodge' },
    propertyType: { en: 'Hospitality', ar: 'ضيافة', zh: '酒店及旅游', es: 'Hostelería', fr: 'Hôtellerie' },
    price: '$9,000,000',
    facts: {
      en: ['15 units', '20,000 sq ft', '0.6 acre lot'],
      ar: ['15 وحدة', '20,000 قدم²', 'أرض بمساحة 0.6 فدان'],
      zh: ['15个单元', '20,000平方英尺', '0.6英亩土地'],
      es: ['15 unidades', '20.000 pies²', 'Parcela de 0,6 acres'],
      fr: ['15 unités', '20 000 pi²', 'Terrain de 0,6 acre'],
    },
    imageUrl: 'https://images.unsplash.com/photo-1501117716987-c8e1ecb210b5?auto=format&fit=crop&w=1400&q=85',
    imageAlt: { en: 'Coastal boutique resort representing a St. Simons Island opportunity', ar: 'منتجع بوتيكي ساحلي يمثل فرصة في جزيرة سانت سايمونز', zh: '代表圣西蒙斯岛机会的海滨精品度假村', es: 'Resort boutique costero que representa una oportunidad en St. Simons Island', fr: 'Complexe boutique côtier représentant une opportunité à St. Simons Island' },
  },
  {
    country: { en: 'Jordan', ar: 'الأردن', zh: '约旦', es: 'Jordania', fr: 'Jordanie' },
    city: { en: 'Amman', ar: 'عمّان', zh: '安曼', es: 'Amán', fr: 'Amman' },
    countryCode: 'JO',
    title: { en: 'Newly Established Apart-Hotel', ar: 'شقق فندقية حديثة التأسيس', zh: '新建公寓式酒店', es: 'Apartahotel de nueva creación', fr: 'Appart-hôtel récemment établi' },
    propertyType: { en: 'Hospitality', ar: 'ضيافة', zh: '酒店及旅游', es: 'Hostelería', fr: 'Hôtellerie' },
    price: 'JOD 930,000',
    facts: {
      en: ['12 suites', '1,200 sq m built area', '350 sq m commercial land'],
      ar: ['12 جناحاً', 'مساحة مبنية 1,200 م²', 'أرض تجارية 350 م²'],
      zh: ['12间套房', '建筑面积1,200平方米', '350平方米商业用地'],
      es: ['12 suites', '1.200 m² construidos', '350 m² de terreno comercial'],
      fr: ['12 suites', '1 200 m² bâtis', '350 m² de terrain commercial'],
    },
    imageUrl: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1400&q=85',
    imageAlt: { en: 'Modern hotel representing an Amman apart-hotel opportunity', ar: 'فندق حديث يمثل فرصة شقق فندقية في عمّان', zh: '代表安曼公寓式酒店机会的现代酒店', es: 'Hotel moderno que representa una oportunidad de apartahotel en Amán', fr: 'Hôtel moderne représentant une opportunité d’appart-hôtel à Amman' },
  },
  {
    country: { en: 'Spain', ar: 'إسبانيا', zh: '西班牙', es: 'España', fr: 'Espagne' },
    city: { en: 'Marbella, Málaga', ar: 'ماربيا، مالقة', zh: '马贝拉，马拉加', es: 'Marbella, Málaga', fr: 'Marbella, Málaga' },
    countryCode: 'ES',
    title: { en: 'Luxury Hotel Complex', ar: 'مجمع فندقي فاخر', zh: '豪华酒店综合体', es: 'Complejo hotelero de lujo', fr: 'Complexe hôtelier de luxe' },
    propertyType: { en: 'Hospitality', ar: 'ضيافة', zh: '酒店及旅游', es: 'Hostelería', fr: 'Hôtellerie' },
    price: '€200,000,000',
    facts: {
      en: ['149 rooms', '40,106 sq m built area', 'Luxury resort'],
      ar: ['149 غرفة', 'مساحة مبنية 40,106 م²', 'منتجع فاخر'],
      zh: ['149间客房', '建筑面积40,106平方米', '豪华度假村'],
      es: ['149 habitaciones', '40.106 m² construidos', 'Resort de lujo'],
      fr: ['149 chambres', '40 106 m² bâtis', 'Complexe de luxe'],
    },
    imageUrl: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=1400&q=85',
    imageAlt: { en: 'Luxury Mediterranean hotel representing a Marbella opportunity', ar: 'فندق فاخر على البحر المتوسط يمثل فرصة في ماربيا', zh: '代表马贝拉机会的地中海豪华酒店', es: 'Hotel mediterráneo de lujo que representa una oportunidad en Marbella', fr: 'Hôtel méditerranéen de luxe représentant une opportunité à Marbella' },
  },
  {
    country: { en: 'Spain', ar: 'إسبانيا', zh: '西班يا', es: 'España', fr: 'Espagne' },
    city: { en: 'Sant Antoni de Portmany, Ibiza', ar: 'سانت أنتوني دي بورتماني، إيبيزا', zh: '伊维萨岛圣安东尼德波特曼尼', es: 'Sant Antoni de Portmany, Ibiza', fr: 'Sant Antoni de Portmany, Ibiza' },
    countryCode: 'ES',
    title: { en: 'Seafront Hotel Asset', ar: 'أصل فندقي على الواجهة البحرية', zh: '海滨酒店资产', es: 'Activo hotelero frente al mar', fr: 'Actif hôtelier en bord de mer' },
    propertyType: { en: 'Hospitality', ar: 'ضيافة', zh: '酒店及旅游', es: 'Hostelería', fr: 'Hôtellerie' },
    price: '€22,000,000',
    facts: {
      en: ['86 rooms', '5,000 sq m', 'Seafront'],
      ar: ['86 غرفة', '5,000 م²', 'واجهة بحرية'],
      zh: ['86间客房', '5,000平方米', '临海'],
      es: ['86 habitaciones', '5.000 m²', 'Frente al mar'],
      fr: ['86 chambres', '5 000 m²', 'Bord de mer'],
    },
    imageUrl: 'https://images.unsplash.com/photo-1601918774946-25832a4be0d6?auto=format&fit=crop&w=1400&q=85',
    imageAlt: { en: 'Seafront hotel representing an Ibiza hospitality opportunity', ar: 'فندق على الواجهة البحرية يمثل فرصة ضيافة في إيبيزا', zh: '代表伊维萨酒店机会的海滨酒店', es: 'Hotel frente al mar que representa una oportunidad hotelera en Ibiza', fr: 'Hôtel en bord de mer représentant une opportunité hôtelière à Ibiza' },
  },
];

const copy = {
  en: { heading: 'External Market Opportunities', intro: 'Selected market opportunities presented through AssetVeyra. Contact AssetVeyra for current details, availability and transaction information.', contact: 'Contact AssetVeyra', ask: 'Request This Opportunity', source: 'Market opportunity', location: 'Location', type: 'Type', footer: 'AssetVeyra is a marketplace, not an investment advisor. Confidentiality and access controls apply where applicable.' },
  ar: { heading: 'فرص السوق العقاري', intro: 'فرص عقارية مختارة معروضة عبر AssetVeyra. تواصل مع AssetVeyra للحصول على التفاصيل الحالية والتوفر ومعلومات المعاملة.', contact: 'تواصل مع AssetVeyra', ask: 'اطلب هذه الفرصة', source: 'فرصة من السوق', location: 'الموقع', type: 'النوع', footer: 'AssetVeyra منصة للسوق العقاري وليست مستشاراً استثمارياً. تسري ضوابط السرية والوصول حيثما ينطبق ذلك.' },
  zh: { heading: '市场机会', intro: 'AssetVeyra 精选并展示市场机会。请联系 AssetVeyra 获取最新详情、可用性和交易信息。', contact: '联系 AssetVeyra', ask: '咨询此机会', source: '市场机会', location: '位置', type: '类型', footer: 'AssetVeyra 是房地产市场平台，并非投资顾问。在适用情况下适用保密和访问控制。' },
  es: { heading: 'Oportunidades del mercado', intro: 'Oportunidades seleccionadas presentadas por AssetVeyra. Contacte con AssetVeyra para obtener detalles actuales, disponibilidad e información de la operación.', contact: 'Contactar con AssetVeyra', ask: 'Solicitar esta oportunidad', source: 'Oportunidad de mercado', location: 'Ubicación', type: 'Tipo', footer: 'AssetVeyra es una plataforma de mercado, no un asesor de inversiones. Se aplican controles de confidencialidad y acceso cuando corresponda.' },
  fr: { heading: 'Opportunités du marché', intro: 'Opportunités sélectionnées présentées par AssetVeyra. Contactez AssetVeyra pour obtenir les informations actuelles, la disponibilité et les détails de la transaction.', contact: 'Contacter AssetVeyra', ask: 'Demander cette opportunité', source: 'Opportunité du marché', location: 'Emplacement', type: 'Type', footer: 'AssetVeyra est une plateforme de marché et non un conseiller en investissement. Des contrôles de confidentialité et d’accès s’appliquent lorsque nécessaire.' },
} satisfies Record<Locale, { heading: string; intro: string; contact: string; ask: string; source: string; location: string; type: string; footer: string }>;

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
          <div className="av-menu-divider" />
          <div className="av-language-group"><I18nText id="Language" /><LanguageSelect /></div>
          <div className="av-menu-account"><a className="av-menu-login" href="/login"><I18nText id="Login" /></a><a className="av-menu-signup" href="/signup"><I18nText id="Sign Up" /></a></div>
        </nav>
      </details>
    </header>

    <section className="external-market-section">
      <div className="external-market-heading">
        <div><div className="eyebrow"><I18nText id="Marketplace" /></div><h2>{t.heading}</h2><p>{t.intro}</p></div>
        <a className="external-market-contact" href={whatsappUrl(t.heading, locale)} target="_blank" rel="noreferrer">{t.contact}</a>
      </div>

      <div className="external-listing-grid">
        {listings.map((listing) => {
          const title = listing.title[locale];
          return <article className="external-listing-card" key={`${listing.countryCode}-${listing.title.en}`}>
            <div className="external-listing-image">
              <img src={listing.imageUrl} alt={listing.imageAlt[locale]} loading="lazy" />
              <div className="external-image-watermark" aria-hidden="true">ASSETVEYRA</div>
            </div>
            <div className="card-meta"><span>{listing.country[locale]}</span><span>{t.source}</span></div>
            <h4>{title}</h4>
            <p>{listing.city[locale]} · {listing.propertyType[locale]}</p>
            <div className="external-facts">{listing.facts[locale].map((fact) => <span key={fact}><b>•</b>{fact}</span>)}</div>
            <div className="external-card-footer"><strong>{listing.price}</strong><a className="external-market-contact-link" href={whatsappUrl(title, locale)} target="_blank" rel="noreferrer">{t.ask}</a></div>
          </article>;
        })}
      </div>
    </section>

    <footer className="av-footer">{t.footer}</footer>
  </main>;
}
