'use client';

import '../av-final.css';
import '../external-market.css';
import { I18nText, LanguageSelect, useLocale } from '@/components/LocaleShell';
import { createClient } from '@/lib/supabase/client';
import type { Locale } from '@/lib/i18n';
import { useEffect, useState } from 'react';

type Localized = Record<Locale, string>;

type ExternalListing = {
  country: Localized;
  city: Localized;
  countryCode: string;
  title: Localized;
  propertyType: Localized;
  price: string;
  facts: Record<Locale, string[]>;
  imageUrl: string | null;
  imageAlt: Localized;
  sourceUrl: string;
  sourceName: string;
};

const listings: ExternalListing[] = [
  {
    country: { en: 'United Arab Emirates', ar: 'الإمارات العربية المتحدة', zh: '阿拉伯联合酋长国', es: 'Emiratos Árabes Unidos', fr: 'Émirats arabes unis' },
    city: { en: 'Dubai · Palm Jumeirah', ar: 'دبي · نخلة جميرا', zh: '迪拜 · 棕榈岛', es: 'Dubái · Palm Jumeirah', fr: 'Dubaï · Palm Jumeirah' },
    countryCode: 'AE',
    title: { en: '250-Room Luxury Beachfront & Wellness Hotel', ar: 'فندق فاخر على الواجهة البحرية والعافية – 250 غرفة', zh: '250间豪华海滨康养酒店', es: 'Hotel de lujo frente al mar y bienestar – 250 habitaciones', fr: 'Hôtel de luxe en bord de mer et bien-être – 250 chambres' },
    propertyType: { en: 'Hospitality', ar: 'ضيافة', zh: '酒店及旅游', es: 'Hostelería', fr: 'Hôtellerie' },
    price: '€152,000,000',
    facts: { en: ['250 rooms', 'Beachfront', '5-star resort', 'NDA + proof of funds'], ar: ['250 غرفة', 'واجهة بحرية', 'منتجع 5 نجوم', 'NDA + إثبات أموال'], zh: ['250间客房', '临海', '五星级度假村', 'NDA + 资金证明'], es: ['250 habitaciones', 'Frente al mar', 'Resort de 5 estrellas', 'NDA + prueba de fondos'], fr: ['250 chambres', 'Bord de mer', 'Complexe 5 étoiles', 'NDA + preuve de fonds'] },
    imageUrl: null,
    imageAlt: { en: 'Original listing image is available on the source listing', ar: 'الصورة الأصلية للإعلان متاحة في المصدر', zh: '原始挂牌图片可在来源页面查看', es: 'La imagen original está disponible en el anuncio fuente', fr: 'L’image originale est disponible sur l’annonce source' },
    sourceUrl: 'https://www.luxuryestate.com/p132160711-hotel-for-sale-dubai',
    sourceName: 'LuxuryEstate',
  },
  {
    country: { en: 'United Arab Emirates', ar: 'الإمارات العربية المتحدة', zh: '阿拉伯联合酋长国', es: 'Emiratos Árabes Unidos', fr: 'Émirats arabes unis' },
    city: { en: 'Dubai · Jumeirah Garden City', ar: 'دبي · جميرا جاردن سيتي', zh: '迪拜 · 朱美拉花园城', es: 'Dubái · Jumeirah Garden City', fr: 'Dubaï · Jumeirah Garden City' },
    countryCode: 'AE',
    title: { en: '4-Star Off-Plan Hotel', ar: 'فندق 4 نجوم قيد التطوير', zh: '四星级期房酒店', es: 'Hotel de 4 estrellas en construcción', fr: 'Hôtel 4 étoiles en développement' },
    propertyType: { en: 'Hospitality / Development', ar: 'ضيافة / تطوير', zh: '酒店 / 开发', es: 'Hostelería / Desarrollo', fr: 'Hôtellerie / Développement' },
    price: 'AED 170,000,000',
    facts: { en: ['96 rooms', '13,000 sq ft plot', '49,566 sq ft GFA', 'Handover Q2 2027'], ar: ['96 غرفة', 'أرض 13,000 قدم²', 'مساحة إجمالية 49,566 قدم²', 'التسليم Q2 2027'], zh: ['96间客房', '13,000平方英尺土地', '49,566平方英尺总建筑面积', '2027年第二季度交付'], es: ['96 habitaciones', 'Parcela de 13.000 pies²', '49.566 pies² GFA', 'Entrega T2 2027'], fr: ['96 chambres', 'Terrain de 13 000 pi²', '49 566 pi² GFA', 'Livraison T2 2027'] },
    imageUrl: null,
    imageAlt: { en: 'Original listing image is available on the source listing', ar: 'الصورة الأصلية للإعلان متاحة في المصدر', zh: '原始挂牌图片可在来源页面查看', es: 'La imagen original está disponible en el anuncio fuente', fr: 'L’image originale est disponible sur l’annonce source' },
    sourceUrl: 'https://dxboffplan.com/properties/hotel-for-sale-in-jumeirah-garden-city/',
    sourceName: 'DXB Off Plan',
  },
  {
    country: { en: 'United States', ar: 'الولايات المتحدة', zh: '美国', es: 'Estados Unidos', fr: 'États-Unis' },
    city: { en: 'St. Simons Island, Georgia', ar: 'جزيرة سانت سايمونز، جورجيا', zh: '乔治亚州圣西蒙斯岛', es: 'St. Simons Island, Georgia', fr: 'St. Simons Island, Géorgie' },
    countryCode: 'US',
    title: { en: 'Ocean Lodge Boutique Resort', ar: 'منتجع Ocean Lodge البوتيكي', zh: 'Ocean Lodge精品度假村', es: 'Resort boutique Ocean Lodge', fr: 'Complexe boutique Ocean Lodge' },
    propertyType: { en: 'Hospitality', ar: 'ضيافة', zh: '酒店及旅游', es: 'Hostelería', fr: 'Hôtellerie' },
    price: '$9,000,000',
    facts: { en: ['15 suites', '20,000 sq ft', '0.6 acre lot', 'Built 2008'], ar: ['15 جناحاً', '20,000 قدم²', 'أرض 0.6 فدان', 'بناء 2008'], zh: ['15间套房', '20,000平方英尺', '0.6英亩土地', '2008年建成'], es: ['15 suites', '20.000 pies²', 'Parcela de 0,6 acres', 'Construido en 2008'], fr: ['15 suites', '20 000 pi²', 'Terrain de 0,6 acre', 'Construit en 2008'] },
    imageUrl: null,
    imageAlt: { en: 'Original listing image is available on the source listing', ar: 'الصورة الأصلية للإعلان متاحة في المصدر', zh: '原始挂牌图片可在来源页面查看', es: 'La imagen original está disponible en el anuncio fuente', fr: 'L’image originale est disponible sur l’annonce source' },
    sourceUrl: 'https://www.commercialsearch.com/commercial-property/us/ga/st-simons-island/boutique-resort-in-the-heart-of-st-simons-island/',
    sourceName: 'CommercialSearch',
  },
  {
    country: { en: 'Jordan', ar: 'الأردن', zh: '约旦', es: 'Jordania', fr: 'Jordanie' },
    city: { en: 'Amman', ar: 'عمّان', zh: '安曼', es: 'Amán', fr: 'Amman' },
    countryCode: 'JO',
    title: { en: 'Newly Established Apart-Hotel', ar: 'شقق فندقية حديثة التأسيس', zh: '新建公寓式酒店', es: 'Apartahotel de nueva creación', fr: 'Appart-hôtel récemment établi' },
    propertyType: { en: 'Hospitality', ar: 'ضيافة', zh: '酒店及旅游', es: 'Hostelería', fr: 'Hôtellerie' },
    price: 'JOD 930,000',
    facts: { en: ['12 suites', '1,200 sq m built area', '350 sq m commercial land', '7-car garage'], ar: ['12 جناحاً', 'مساحة مبنية 1,200 م²', 'أرض تجارية 350 م²', 'مرآب لـ7 سيارات'], zh: ['12间套房', '建筑面积1,200平方米', '350平方米商业用地', '7车位车库'], es: ['12 suites', '1.200 m² construidos', '350 m² de terreno comercial', 'Garaje para 7 coches'], fr: ['12 suites', '1 200 m² bâtis', '350 m² de terrain commercial', 'Garage pour 7 voitures'] },
    imageUrl: 'https://www.smergers.com/media/businessphoto/113009-1741767127-b2b1be01-41f0-43f9-8a52-6326da40a62e.png',
    imageAlt: { en: 'Original image from the Amman apart-hotel listing source', ar: 'الصورة الأصلية من مصدر إعلان الشقق الفندقية في عمّان', zh: '来自安曼公寓式酒店原始挂牌的图片', es: 'Imagen original de la fuente del anuncio del apartahotel de Amán', fr: 'Image originale de la source de l’annonce de l’appart-hôtel d’Amman' },
    sourceUrl: 'https://www.smergers.com/business/newly-established-hotel-for-sale-in-amman-jordan/1y5n5/',
    sourceName: 'SMERGERS',
  },
  {
    country: { en: 'Spain', ar: 'إسبانيا', zh: '西班牙', es: 'España', fr: 'Espagne' },
    city: { en: 'San Pedro de Alcantara · Marbella, Málaga', ar: 'سان بيدرو دي ألكانتارا · ماربيا، مالقة', zh: '马贝拉圣佩德罗-德阿尔坎塔拉', es: 'San Pedro de Alcántara · Marbella, Málaga', fr: 'San Pedro de Alcántara · Marbella, Málaga' },
    countryCode: 'ES',
    title: { en: '5-Star Golf Resort Hotel', ar: 'منتجع فندقي 5 نجوم وملعب غولف', zh: '五星级高尔夫度假酒店', es: 'Hotel resort de 5 estrellas con golf', fr: 'Hôtel resort 5 étoiles avec golf' },
    propertyType: { en: 'Hospitality', ar: 'ضيافة', zh: '酒店及旅游', es: 'Hostelería', fr: 'Hôtellerie' },
    price: '€125,000,000',
    facts: { en: ['172 rooms & suites', '12,369 sq m built area', '11,245 sq m plot', '27-hole golf course'], ar: ['172 غرفة وجناح', '12,369 م² مساحة مبنية', '11,245 م² أرض', 'ملعب غولف 27 حفرة'], zh: ['172间客房及套房', '12,369平方米建筑面积', '11,245平方米土地', '27洞高尔夫球场'], es: ['172 habitaciones y suites', '12.369 m² construidos', '11.245 m² de parcela', 'Campo de golf de 27 hoyos'], fr: ['172 chambres et suites', '12 369 m² bâtis', '11 245 m² de terrain', 'Golf 27 trous'] },
    imageUrl: 'https://cdn.thinkwebcontent.com/property/40791/9782021/20260417114351/w800h600/s1600x1200/x-279027633.jpg',
    imageAlt: { en: 'Original image from the Marbella hotel listing source', ar: 'الصورة الأصلية من مصدر إعلان الفندق في ماربيا', zh: '来自马贝拉酒店原始挂牌的图片', es: 'Imagen original de la fuente del anuncio del hotel de Marbella', fr: 'Image originale de la source de l’annonce de l’hôtel de Marbella' },
    sourceUrl: 'https://www.thinkspain.com/property-for-sale/9782021',
    sourceName: 'thinkSPAIN',
  },
  {
    country: { en: 'Spain', ar: 'إسبانيا', zh: '西班牙', es: 'España', fr: 'Espagne' },
    city: { en: 'Sant Antoni de Portmany, Ibiza', ar: 'سانت أنتوني دي بورتماني، إيبيزا', zh: '伊维萨岛圣安طوني德波特曼尼', es: 'Sant Antoni de Portmany, Ibiza', fr: 'Sant Antoni de Portmany, Ibiza' },
    countryCode: 'ES',
    title: { en: 'Seafront Hotel Asset', ar: 'أصل فندقي على الواجهة البحرية', zh: '海滨酒店资产', es: 'Activo hotelero frente al mar', fr: 'Actif hôtelier en bord de mer' },
    propertyType: { en: 'Hospitality', ar: 'ضيافة', zh: '酒店及旅游', es: 'Hostelería', fr: 'Hôtellerie' },
    price: '€22,000,000',
    facts: { en: ['92 rooms', '4,500 sq m built area', '2,000 sq m plot', 'Seafront / sea views'], ar: ['92 غرفة', '4,500 م² مساحة مبنية', '2,000 م² أرض', 'واجهة بحرية / إطلالات بحرية'], zh: ['92间客房', '4,500平方米建筑面积', '2,000平方米土地', '临海 / 海景'], es: ['92 habitaciones', '4.500 m² construidos', '2.000 m² de parcela', 'Frente al mar / vistas al mar'], fr: ['92 chambres', '4 500 m² bâtis', '2 000 m² de terrain', 'Bord de mer / vue mer'] },
    imageUrl: 'https://cdn.thinkwebcontent.com/property/32695/9519372/20260117152701/w800h533/s1600x1200/x-270873193.jpg',
    imageAlt: { en: 'Original image from the Ibiza hotel listing source', ar: 'الصورة الأصلية من مصدر إعلان الفندق في إيبيزا', zh: '来自伊维萨酒店原始挂牌的图片', es: 'Imagen original de la fuente del anuncio del hotel de Ibiza', fr: 'Image originale de la source de l’annonce de l’hôtel d’Ibiza' },
    sourceUrl: 'https://www.thinkspain.com/property-for-sale/9519372',
    sourceName: 'thinkSPAIN',
  },
];

const copy = {
  en: { heading: 'External Market Opportunities', intro: 'Selected third-party market listings presented separately from AssetVeyra opportunities. Availability, pricing and transaction terms must be independently verified.', contact: 'Contact AssetVeyra', ask: 'Request This Opportunity', pricing: 'Sign in to view pricing', source: 'Market opportunity', viewSource: 'View original listing', imageUnavailable: 'Original photo unavailable for direct embedding', footer: 'External listings are third-party market references, not verified AssetVeyra opportunities. AssetVeyra is a marketplace and transaction-coordination platform, not an investment advisor.' },
  ar: { heading: 'فرص السوق الخارجي', intro: 'قوائم عقارية مختارة من السوق الخارجي ومعروضة بشكل منفصل عن فرص AssetVeyra. يجب التحقق بشكل مستقل من التوفر والأسعار وشروط المعاملة.', contact: 'تواصل مع AssetVeyra', ask: 'اطلب هذه الفرصة', pricing: 'سجّل الدخول لعرض السعر', source: 'فرصة من السوق', viewSource: 'عرض الإعلان الأصلي', imageUnavailable: 'الصورة الأصلية غير متاحة للإدراج المباشر', footer: 'القوائم الخارجية هي مراجع من سوق الغير وليست فرصاً موثقة من AssetVeyra. AssetVeyra منصة للسوق العقاري وتنسيق المعاملات وليست مستشاراً استثمارياً.' },
  zh: { heading: '外部市场机会', intro: '精选第三方市场挂牌，与 AssetVeyra 机会明确分开。可用性、价格和交易条款必须独立核实。', contact: '联系 AssetVeyra', ask: '咨询此机会', pricing: '登录后查看价格', source: '市场机会', viewSource: '查看原始挂牌', imageUnavailable: '无法直接嵌入原始图片', footer: '外部挂牌是第三方市场参考，并非经 AssetVeyra 核实的机会。AssetVeyra 是房地产市场和交易协调平台，并非投资顾问。' },
  es: { heading: 'Oportunidades del mercado externo', intro: 'Listados seleccionados de terceros, presentados por separado de las oportunidades de AssetVeyra. La disponibilidad, el precio y las condiciones deben verificarse de forma independiente.', contact: 'Contactar con AssetVeyra', ask: 'Solicitar esta oportunidad', pricing: 'Inicie sesión para ver el precio', source: 'Oportunidad de mercado', viewSource: 'Ver anuncio original', imageUnavailable: 'La foto original no está disponible para inserción directa', footer: 'Los listados externos son referencias de terceros y no oportunidades verificadas por AssetVeyra. AssetVeyra es una plataforma de mercado y coordinación de operaciones, no un asesor de inversiones.' },
  fr: { heading: 'Opportunités du marché externe', intro: 'Sélection de biens proposés par des tiers, présentés séparément des opportunités AssetVeyra. La disponibilité, le prix et les conditions doivent être vérifiés indépendamment.', contact: 'Contacter AssetVeyra', ask: 'Demander cette opportunité', pricing: 'Connectez-vous pour voir le prix', source: 'Opportunité du marché', viewSource: 'Voir l’annonce originale', imageUnavailable: 'La photo originale ne peut pas être intégrée directement', footer: 'Les annonces externes sont des références de marché de tiers et non des opportunités vérifiées par AssetVeyra. AssetVeyra est une plateforme de marché et de coordination des transactions, et non un conseiller en investissement.' },
} satisfies Record<Locale, { heading:string; intro:string; contact:string; ask:string; pricing:string; source:string; viewSource:string; imageUnavailable:string; footer:string }>;

export default function ExternalMarketPage() {
  const locale = useLocale();
  const t = copy[locale];
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const supabase = createClient();
    let active = true;
    supabase.auth.getUser().then(({ data }) => { if (active) setAuthenticated(Boolean(data.user)); });
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => { if (active) setAuthenticated(Boolean(session?.user)); });
    return () => { active = false; listener.subscription.unsubscribe(); };
  }, []);

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
        <a className="external-market-contact" href={authenticated ? '/contact' : '/login'}>{t.contact}</a>
      </div>

      <div className="external-listing-grid">
        {listings.map((listing) => {
          const title = listing.title[locale];
          return <article className="external-listing-card" key={`${listing.countryCode}-${listing.title.en}`}>
            <a className="external-listing-image-link" href={listing.sourceUrl} target="_blank" rel="noreferrer noopener" aria-label={`${t.viewSource}: ${title}`}>
              <div className="external-listing-image">
                {listing.imageUrl ? <img src={listing.imageUrl} alt={listing.imageAlt[locale]} loading="lazy" /> : <div className="external-image-missing"><span>{t.imageUnavailable}</span><strong>{listing.sourceName}</strong></div>}
                <div className="external-image-watermark" aria-hidden="true">ASSETVEYRA · EXTERNAL</div>
              </div>
            </a>
            <div className="card-meta"><span>{listing.country[locale]}</span><span>{t.source}</span></div>
            <h4><a className="external-listing-title-link" href={listing.sourceUrl} target="_blank" rel="noreferrer noopener">{title}</a></h4>
            <p>{listing.city[locale]} · {listing.propertyType[locale]}</p>
            <div className="external-facts">{listing.facts[locale].map((fact) => <span key={fact}><b>•</b>{fact}</span>)}</div>
            <div className="external-card-footer"><strong>{authenticated ? listing.price : t.pricing}</strong><div className="external-card-actions"><a className="external-source-link" href={listing.sourceUrl} target="_blank" rel="noreferrer noopener">{t.viewSource}</a><a className="external-market-contact-link" href={authenticated ? `/contact?opportunity=${encodeURIComponent(title)}` : '/login'}>{t.ask}</a></div></div>
          </article>;
        })}
      </div>
    </section>

    <footer className="av-footer">{t.footer}</footer>
  </main>;
}
