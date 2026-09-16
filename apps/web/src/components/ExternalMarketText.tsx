'use client';

import { useLocale } from '@/components/LocaleShell';

type Key='Global market watch'|'Real external listings, organized by country'|'These are live third-party market listings discovered from public sources. They are not yet represented as verified AssetVeyra opportunities.'|'External source · independently verify before transaction'|'listings'|'Area'|'Rooms'|'View source listing'|'Source'|'Checked'|'Land'|'Hotel'|'Hospitality';

const COPY:Record<Key,Record<'en'|'ar'|'zh'|'es'|'fr',string>>={
  'Global market watch':{en:'Global market watch',ar:'رصد السوق العالمي',zh:'全球市场监测',es:'Monitoreo del mercado global',fr:'Veille du marché mondial'},
  'Real external listings, organized by country':{en:'Real external listings, organized by country',ar:'عروض عقارية حقيقية من مصادر خارجية، مرتبة حسب الدولة',zh:'真实外部挂牌信息，按国家整理',es:'Listados inmobiliarios reales de fuentes externas, organizados por país',fr:'Annonces immobilières réelles de sources externes, classées par pays'},
  'These are live third-party market listings discovered from public sources. They are not yet represented as verified AssetVeyra opportunities.':{en:'These are live third-party market listings discovered from public sources. They are not yet represented as verified AssetVeyra opportunities.',ar:'هذه عروض منشورة حاليًا من مصادر عقارية خارجية عامة. لم يتم اعتمادها بعد كفرص موثقة من AssetVeyra.',zh:'这些是从公开来源发现的第三方市场挂牌信息，目前尚未作为 AssetVeyra 已验证机会发布。',es:'Son anuncios actuales de terceros encontrados en fuentes públicas. Aún no representan oportunidades verificadas por AssetVeyra.',fr:"Il s’agit d’annonces de tiers actuellement publiées et trouvées dans des sources publiques. Elles ne constituent pas encore des opportunités vérifiées par AssetVeyra."},
  'External source · independently verify before transaction':{en:'External source · independently verify before transaction',ar:'مصدر خارجي · يجب التحقق المستقل قبل أي معاملة',zh:'外部来源 · 交易前须独立核实',es:'Fuente externa · verificar de forma independiente antes de cualquier operación',fr:'Source externe · vérification indépendante avant toute transaction'},
  listings:{en:'listings',ar:'عروض',zh:'条挂牌信息',es:'anuncios',fr:'annonces'},
  Area:{en:'Area',ar:'المساحة',zh:'面积',es:'Superficie',fr:'Surface'},
  Rooms:{en:'Rooms',ar:'الغرف',zh:'房间',es:'Habitaciones',fr:'Chambres'},
  'View source listing':{en:'View source listing',ar:'عرض المصدر الأصلي',zh:'查看原始挂牌',es:'Ver anuncio original',fr:"Voir l’annonce source"},
  Source:{en:'Source',ar:'المصدر',zh:'来源',es:'Fuente',fr:'Source'},
  Checked:{en:'Checked',ar:'تم التحقق من المصدر',zh:'核查日期',es:'Comprobado',fr:'Vérifié'},
  Land:{en:'Land',ar:'أرض',zh:'土地',es:'Terreno',fr:'Terrain'},
  Hotel:{en:'Hotel',ar:'فندق',zh:'酒店',es:'Hotel',fr:'Hôtel'},
  Hospitality:{en:'Hospitality',ar:'ضيافة',zh:'酒店及度假',es:'Hostelería',fr:'Hôtellerie'},
};

export function ExternalMarketText({id}: {id:Key}){const locale=useLocale();return <>{COPY[id]?.[locale]??COPY[id].en}</>;}
