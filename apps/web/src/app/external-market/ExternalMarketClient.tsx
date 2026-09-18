'use client';

import '../av-final.css';
import '../external-market.css';
import { I18nText, LanguageSelect, useLocale } from '@/components/LocaleShell';
import { createClient } from '@/lib/supabase/client';
import type { Locale } from '@/lib/i18n';
import { useEffect, useState } from 'react';

type Localized = { en: string; ar: string };
type Detail = { label: Localized; value: Localized };
type Listing = {
  id: string;
  country: Localized;
  city: Localized;
  title: Localized;
  type: Localized;
  price: string;
  summary: Localized;
  facts: Localized[];
  details: Detail[];
  features: Localized[];
  imageUrls: string[];
  imageAlt: Localized;
};

const L = (en: string, ar: string = en): Localized => ({ en, ar });

const listings: Listing[] = [
  {
    id: 'dubai-palm-250', country: L('United Arab Emirates', 'الإمارات العربية المتحدة'), city: L('Dubai · Palm Jumeirah', 'دبي · نخلة جميرا'),
    title: L('250-Room Luxury Beachfront & Wellness Resort', 'منتجع فاخر شاطئي وعافية – 250 غرفة'), type: L('5-Star Hospitality Asset', 'أصل فندقي 5 نجوم'), price: '€152,000,000',
    summary: L('Five-star beachfront and wellness resort with more than 250 keys, multiple restaurants and bars, four retail spaces, extensive wellness and spa facilities, conference and event facilities, and direct private beach access. The public listing states an established hospitality operator and further disclosure after NDA and proof of funds.', 'منتجع شاطئي وعافية من فئة 5 نجوم، يضم أكثر من 250 غرفة، ومطاعم وبارات متعددة، وأربع مساحات تجارية، ومرافق عافية وسبا واسعة، ومرافق للمؤتمرات والفعاليات، ووصولاً مباشراً إلى شاطئ خاص. يذكر الإعلان مشغلاً قائماً وأن المعلومات الإضافية متاحة بعد NDA وإثبات القدرة المالية.'),
    facts: [L('250+ rooms', 'أكثر من 250 غرفة'), L('Private beachfront', 'شاطئ خاص'), L('5-star resort', 'منتجع 5 نجوم'), L('Approx. 8% stated yield', 'عائد معلن يقارب 8%')],
    details: [
      { label: L('Location', 'الموقع'), value: L('Palm Jumeirah, Dubai, UAE', 'نخلة جميرا، دبي، الإمارات') },
      { label: L('Asking price', 'السعر المطلوب'), value: L('€152 million; subject to AED/EUR exchange-rate adjustment at transaction', '152 مليون يورو؛ خاضع لتعديل سعر صرف الدرهم/اليورو وقت المعاملة') },
      { label: L('Rooms / keys', 'الغرف'), value: L('More than 250', 'أكثر من 250') },
      { label: L('Classification', 'التصنيف'), value: L('Five-star beachfront and wellness resort', 'منتجع شاطئي وعافية من فئة خمس نجوم') },
      { label: L('Food & beverage', 'الأغذية والمشروبات'), value: L('Multiple restaurants and bars; health-focused dining concepts', 'مطاعم وبارات متعددة؛ مفاهيم طعام موجهة للصحة والعافية') },
      { label: L('Retail', 'التجزئة'), value: L('4 retail spaces', '4 مساحات تجارية') },
      { label: L('Wellness', 'العافية'), value: L('Extensive wellness and spa facilities', 'مرافق عافية وسبا واسعة') },
      { label: L('Events', 'الفعاليات'), value: L('Conference and event facilities', 'مرافق مؤتمرات وفعاليات') },
      { label: L('Beach access', 'الوصول إلى الشاطئ'), value: L('Direct private beach access', 'وصول مباشر إلى شاطئ خاص') },
      { label: L('Operator', 'المشغّل'), value: L('Established hospitality operator, according to listing', 'مشغّل ضيافة قائم بحسب الإعلان') },
      { label: L('Information access', 'الوصول للمعلومات'), value: L('Further information after NDA and proof of funds', 'المعلومات الإضافية بعد NDA وإثبات القدرة المالية') },
      { label: L('Listing reference', 'مرجع الإعلان'), value: L('3405', '3405') },
    ],
    features: [L('Beachfront', 'واجهة بحرية'), L('Wellness', 'عافية'), L('Restaurants & bars', 'مطاعم وبارات'), L('Retail', 'تجزئة'), L('Spa', 'سبا'), L('Conference facilities', 'مؤتمرات'), L('Private beach', 'شاطئ خاص')],
    imageUrls: ['https://www.luxuryestate.com/p132160711-hotel-for-sale-dubai'], imageAlt: L('Property image', 'صورة العقار')
  },
  {
    id: 'dubai-jumeirah-garden-city', country: L('United Arab Emirates', 'الإمارات العربية المتحدة'), city: L('Dubai · Jumeirah Garden City', 'دبي · جميرا جاردن سيتي'),
    title: L('4-Star Off-Plan Hotel Development', 'فندق 4 نجوم قيد التطوير'), type: L('Hospitality / Development', 'ضيافة / تطوير'), price: 'AED 170,000,000',
    summary: L('A 4-star off-plan hotel development with 96 rooms, four commercial shops, a 13,000 sq ft plot, 49,566 sq ft gross floor area, G+2 podiums+9 floors, skyline views and stated completion in June 2027.', 'مشروع فندق 4 نجوم قيد التطوير يضم 96 غرفة، وأربع وحدات تجارية، وأرضاً بمساحة 13,000 قدم²، ومساحة بناء إجمالية 49,566 قدم²، وتكوين أرضي + طابقين بوديوم + 9 طوابق، وإطلالات على أفق دبي وتسليم متوقع في يونيو 2027.'),
    facts: [L('96 hotel rooms', '96 غرفة فندقية'), L('4 retail shops', '4 محلات تجارية'), L('49,566 sq ft GFA', '49,566 قدم² مساحة بناء'), L('Completion June 2027', 'التسليم يونيو 2027')],
    details: [
      { label: L('Location', 'الموقع'), value: L('Jumeirah Garden City, Dubai, UAE', 'جميرا جاردن سيتي، دبي، الإمارات') }, { label: L('Asking price', 'السعر المطلوب'), value: L('AED 170,000,000', '170,000,000 درهم إماراتي') },
      { label: L('Hotel rooms', 'الغرف'), value: L('96 rooms', '96 غرفة') }, { label: L('Retail', 'الوحدات التجارية'), value: L('4 commercial shops', '4 محلات تجارية') },
      { label: L('Plot size', 'مساحة الأرض'), value: L('13,000 sq ft', '13,000 قدم²') }, { label: L('Gross floor area', 'المساحة الإجمالية'), value: L('49,566 sq ft', '49,566 قدم²') },
      { label: L('Configuration', 'التكوين'), value: L('G + 2 podiums + 9 floors', 'أرضي + طابقان بوديوم + 9 طوابق') }, { label: L('Views', 'الإطلالات'), value: L('Panoramic Dubai skyline views', 'إطلالات بانورامية على أفق دبي') },
      { label: L('Construction status', 'حالة الإنشاء'), value: L('Under construction; ground-floor stage stated', 'قيد الإنشاء؛ الإعلان يذكر مرحلة الطابق الأرضي') }, { label: L('Expected completion', 'التسليم المتوقع'), value: L('June 2027 / Q2 2027', 'يونيو 2027 / الربع الثاني 2027') },
      { label: L('Operator', 'المشغّل'), value: L('Flexible operator selection stated', 'مرونة اختيار المشغّل بحسب الإعلان') }, { label: L('Additional material', 'مواد إضافية'), value: L('Presentation, ROI analysis, floor plans and payment schedule available by request', 'العرض وتحليل ROI والمخططات وجدول الدفعات متاحة عند الطلب') }
    ],
    features: [L('Central Dubai', 'موقع مركزي في دبي'), L('Retail component', 'مكوّن تجاري'), L('Skyline views', 'إطلالات على الأفق'), L('Off-plan', 'قيد التطوير'), L('Flexible operator', 'مرونة اختيار المشغّل')],
    imageUrls: ['https://d1ov4zfz2t2vta.cloudfront.net/storage/project_files/135r325.jpg'], imageAlt: L('Property image', 'صورة العقار')
  },
  {
    id: 'st-simons-ocean-lodge', country: L('United States', 'الولايات المتحدة'), city: L('St. Simons Island, Georgia', 'جزيرة سانت سايمونز، جورجيا'),
    title: L('Ocean Lodge Boutique Resort', 'منتجع Ocean Lodge البوتيكي'), type: L('Boutique Hospitality Asset', 'أصل ضيافة بوتيكي'), price: '$9,000,000',
    summary: L('A 15-suite boutique resort at 935 Beach View Drive, described as 20,000 sq ft on 0.6 acre, built in 2008, with Spanish-Mediterranean architecture, full kitchens, private balconies, rooftop restaurant and lounge, and lodging, food-and-beverage and event potential.', 'منتجع بوتيكي يضم 15 جناحاً في 935 Beach View Drive، بمساحة 20,000 قدم² على أرض 0.6 فدان، وبناء 2008، وطابع إسباني-متوسطي، ومطابخ كاملة، وشرفات خاصة، ومطعم وصالة على السطح، مع إمكانات للإقامة والطعام والشراب والفعاليات.'),
    facts: [L('15 luxury suites', '15 جناحاً فاخراً'), L('20,000 sq ft', '20,000 قدم²'), L('0.6 acre lot', 'أرض 0.6 فدان'), L('Built 2008', 'بناء 2008')],
    details: [
      { label: L('Address', 'العنوان'), value: L('935 Beach View Drive, St. Simons Island, GA 31522', '935 Beach View Drive، St. Simons Island، جورجيا 31522') }, { label: L('Asking price', 'السعر المطلوب'), value: L('$9,000,000', '9,000,000 دولار') },
      { label: L('Property size', 'مساحة العقار'), value: L('20,000 sq ft', '20,000 قدم²') }, { label: L('Lot size', 'مساحة الأرض'), value: L('0.6 acre', '0.6 فدان') },
      { label: L('Units', 'الوحدات'), value: L('15 luxury guest suites', '15 جناح ضيافة فاخر') }, { label: L('Year built', 'سنة البناء'), value: L('2008', '2008') },
      { label: L('Architecture', 'الطابع المعماري'), value: L('Spanish-Mediterranean', 'إسباني-متوسطي') }, { label: L('Suites', 'الأجنحة'), value: L('Full kitchens, spacious living areas, private balconies; some with two bathrooms', 'مطابخ كاملة ومساحات معيشة واسعة وشرفات خاصة؛ بعض الأجنحة تضم حمامين') },
      { label: L('Restaurant', 'المطعم'), value: L('Rooftop restaurant and lounge', 'مطعم وصالة على السطح') }, { label: L('Location', 'الموقع'), value: L('Approx. 75 steps from the Atlantic Ocean; walking distance to Pier Village', 'على بعد نحو 75 خطوة من المحيط الأطلسي وعلى مسافة مشي من Pier Village') },
      { label: L('Operations', 'التشغيل'), value: L('Operated by a lender for continuity and asset preservation, according to the listing', 'يذكر الإعلان أنه يُدار من قبل جهة ممولة للحفاظ على استمرارية التشغيل والأصل') }, { label: L('Value-add', 'إمكانات التطوير'), value: L('Operations, marketing, events and capital improvements are identified as potential value-add areas', 'التشغيل والتسويق والفعاليات والتحسينات الرأسمالية مذكورة كمجالات محتملة لزيادة القيمة') }
    ],
    features: [L('Rooftop restaurant', 'مطعم على السطح'), L('Private balconies', 'شرفات خاصة'), L('Full kitchens', 'مطابخ كاملة'), L('Ocean proximity', 'قرب المحيط'), L('Event potential', 'إمكانات الفعاليات')],
    imageUrls: ['https://assets.simpleviewinc.com/simpleview/image/upload/c_fill%2Ch_798%2Cq_75%2Cw_1200/v1/clients/goldenislesga/ocean_lodge_day_34dbd79b-4eff-42c5-9978-7b1014bae2b7.jpg'], imageAlt: L('Property image', 'صورة العقار')
  },
  {
    id: 'marbella-golf-resort', country: L('Spain', 'إسبانيا'), city: L('San Pedro de Alcántara · Marbella, Málaga', 'سان بيدرو دي ألكانتارا · ماربيا، مالقة'), title: L('5-Star Golf Resort Hotel', 'منتجع فندقي 5 نجوم مع ملعب غولف'), type: L('Luxury Hospitality / Golf', 'ضيافة فاخرة / غولف'), price: '€125,000,000',
    summary: L('Five-star resort in Marbella with a 27-hole golf course, 172 rooms and suites, 12,369 sq m built area on an 11,245 sq m plot, major renovation completed in July 2016, multiple dining venues, a 1,500 sq m spa and wellness facility, outdoor pool, gym, kids club and landscaped gardens.', 'منتجع 5 نجوم في ماربيا يضم ملعب غولف من 27 حفرة، و172 غرفة وجناحاً، ومساحة مبنية 12,369 م² على أرض 11,245 م²، مع تجديد رئيسي اكتمل في يوليو 2016، ومطاعم متعددة، وسبا وعافية 1,500 م²، ومسبح خارجي وجيم ونادي أطفال وحدائق.'),
    facts: [L('172 rooms & suites', '172 غرفة وجناح'), L('12,369 sq m built', '12,369 م² مبني'), L('11,245 sq m plot', '11,245 م² أرض'), L('27-hole golf course', 'ملعب غولف 27 حفرة')],
    details: [
      { label: L('Location', 'الموقع'), value: L('San Pedro de Alcántara, Marbella, Málaga, Spain', 'سان بيدرو دي ألكانتارا، ماربيا، مالقة، إسبانيا') }, { label: L('Advertised price', 'السعر المعلن'), value: L('€125,000,000', '125,000,000 يورو') },
      { label: L('Rooms & suites', 'الغرف والأجنحة'), value: L('172: 114 standard double rooms, 52 suites, 3 junior suites, 2 executive suites, 1 presidential suite', '172: 114 غرفة مزدوجة، 52 جناحاً، 3 أجنحة جونيور، جناحان تنفيذيان، جناح رئاسي') },
      { label: L('Plot', 'الأرض'), value: L('11,245 sq m', '11,245 م²') }, { label: L('Built area', 'المساحة المبنية'), value: L('12,369 sq m', '12,369 م²') }, { label: L('Construction', 'البناء'), value: L('Built in 2000', 'بُني عام 2000') },
      { label: L('Renovation', 'التجديد'), value: L('Extensive renovation and repositioning completed July 2016', 'تجديد وإعادة تموضع واسعة اكتملت في يوليو 2016') }, { label: L('Operations', 'التشغيل'), value: L('Listing states year-round full-capacity operation', 'الإعلان يذكر تشغيل العقار بكامل طاقته على مدار العام') },
      { label: L('Lease', 'الإيجار'), value: L('Long-term lease to a prestigious hotel chain, according to listing', 'عقد إيجار طويل الأجل مع سلسلة فندقية مرموقة بحسب الإعلان') }, { label: L('Dining', 'المطاعم'), value: L('Mediterranean/international restaurant, bar, snack/café venue, pool bar and golf-course restaurant', 'مطعم متوسطي/دولي، بار، مطعم خفيف/مقهى، بار مسبح، ومطعم في ملعب الغولف') },
      { label: L('Spa & wellness', 'السبا والعافية'), value: L('1,500 sq m spa and wellness facility with outdoor terrace', 'مرفق سبا وعافية بمساحة 1,500 م² مع تراس خارجي') }, { label: L('Recreation', 'الترفيه'), value: L('Outdoor pool, gym, kids club, landscaped gardens and outdoor areas', 'مسبح خارجي وجيم ونادي أطفال وحدائق ومساحات خارجية') },
      { label: L('Golf', 'الغولف'), value: L('27 holes across three 9-hole courses', '27 حفرة موزعة على ثلاثة ملاعب من 9 حفر') }, { label: L('Nearby', 'المعالم القريبة'), value: L('Puerto Banús approx. 10 minutes; Marbella centre approx. 15 minutes', 'بورتو بانوس نحو 10 دقائق؛ مركز ماربيا نحو 15 دقيقة') }
    ],
    features: [L('27-hole golf', 'غولف 27 حفرة'), L('1,500 sq m spa', 'سبا 1,500 م²'), L('Outdoor pool', 'مسبح خارجي'), L('Kids club', 'نادي أطفال'), L('Year-round operation stated', 'تشغيل سنوي بحسب الإعلان')],
    imageUrls: ['https://cdn.thinkwebcontent.com/property/40791/9782021/20260417114351/w800h600/s1600x1200/x-279027633.jpg'], imageAlt: L('Property image', 'صورة العقار')
  },
  {
    id: 'ibiza-seafront-hotel', country: L('Spain', 'إسبانيا'), city: L('Sant Antoni de Portmany, Ibiza', 'سانت أنتوني دي بورتماني، إيبيزا'), title: L('Seafront 3-Star Hotel Asset', 'أصل فندقي 3 نجوم على الواجهة البحرية'), type: L('Hospitality / Repositioning', 'ضيافة / إعادة تموضع'), price: '€22,000,000',
    summary: L('A 3-star hotel with 92 rooms, 4,500 sq m built area on a 2,000 sq m plot, six storeys and sea views. The listing also describes a restaurant and terrace, pool area, laundry, office, equipped kitchen, parking/garage, communal garden, air conditioning, lift and terrace/balcony, and states the hotel is currently non-operational and needs updating.', 'فندق 3 نجوم يضم 92 غرفة، بمساحة مبنية 4,500 م² على أرض 2,000 م²، ويتكون من 6 طوابق مع إطلالات بحرية. يذكر الإعلان أيضاً مطعماً وتراساً ومنطقة مسبح ومغسلة ومكتباً ومطبخاً مجهزاً ومواقف/مرآباً وحديقة وتكييفاً ومصعداً وتراساً/شرفات، ويذكر أن الفندق غير عامل حالياً ويحتاج إلى تحديث.'),
    facts: [L('92 rooms', '92 غرفة'), L('4,500 sq m built', '4,500 م² مبني'), L('2,000 sq m plot', '2,000 م² أرض'), L('Seafront / sea views', 'واجهة بحرية / إطلالات بحرية')],
    details: [
      { label: L('Location', 'الموقع'), value: L('Sant Antoni de Portmany, Ibiza, Spain', 'سانت أنتوني دي بورتماني، إيبيزا، إسبانيا') }, { label: L('Asking price', 'السعر المطلوب'), value: L('€22,000,000', '22,000,000 يورو') },
      { label: L('Classification', 'التصنيف'), value: L('3-star hotel', 'فندق 3 نجوم') }, { label: L('Rooms', 'الغرف'), value: L('92 rooms, including 6 staff rooms', '92 غرفة، منها 6 غرف للموظفين') },
      { label: L('Bathrooms', 'الحمامات'), value: L('92', '92') }, { label: L('Built area', 'المساحة المبنية'), value: L('4,500 sq m', '4,500 م²') }, { label: L('Plot', 'الأرض'), value: L('2,000 sq m', '2,000 م²') },
      { label: L('Storeys', 'الطوابق'), value: L('6', '6') }, { label: L('Year built', 'سنة البناء'), value: L('1970', '1970') }, { label: L('Sea views', 'إطلالة البحر'), value: L('Guest rooms described as having sea views', 'الإعلان يذكر إطلالات بحرية لغرف الضيوف') },
      { label: L('Food & beverage', 'الأغذية والمشروبات'), value: L('Restaurant with terrace; pool area with potential pool bar', 'مطعم مع تراس؛ منطقة مسبح مع إمكانية إضافة بار') }, { label: L('Operations', 'التشغيل'), value: L('Currently not operating and requires updating, according to listing', 'غير عامل حالياً ويحتاج إلى تحديث بحسب الإعلان') },
      { label: L('Laundry / back of house', 'المغسلة والخدمات'), value: L('Dedicated laundry, office and two professional washing machines', 'مغسلة مخصصة ومكتب وغسالتان مهنيتان') }, { label: L('Kitchen', 'المطبخ'), value: L('Equipped kitchen for food and beverage operations', 'مطبخ مجهز لتشغيل الأغذية والمشروبات') },
      { label: L('Parking / access', 'المواقف والوصول'), value: L('Parking/garage, lift and wheelchair-friendly features stated', 'مواقف/مرآب ومصعد وخصائص مناسبة للكراسي المتحركة بحسب الإعلان') }, { label: L('Energy rating', 'التصنيف الطاقي'), value: L('Energy consumption E; emissions E', 'استهلاك الطاقة E؛ الانبعاثات E') },
      { label: L('Repositioning', 'إعادة التموضع'), value: L('Full renovation, modernization, upgraded dining and premium positioning are identified opportunities', 'التجديد والتحديث ورفع مستوى المطاعم واستهداف شريحة أعلى هي فرص مذكورة لإعادة التموضع') }
    ],
    features: [L('Seafront', 'واجهة بحرية'), L('Sea views', 'إطلالات بحرية'), L('Pool', 'مسبح'), L('Restaurant', 'مطعم'), L('Parking / garage', 'مواقف / مرآب'), L('Lift', 'مصعد'), L('Repositioning potential', 'إمكانات إعادة التموضع')],
    imageUrls: ['https://cdn.thinkwebcontent.com/property/32695/9519372/20260117152701/w800h533/s1600x1200/x-270873193.jpg'], imageAlt: L('Property image', 'صورة العقار')
  },
];

const copy: Record<Locale, { heading: string; intro: string; contact: string; request: string; pricing: string; details: string; features: string; more: string; less: string; unavailable: string; footer: string }> = {
  en: { heading: 'External Market Opportunities', intro: 'Selected third-party market listings presented separately from AssetVeyra opportunities. Availability, pricing and transaction terms must be independently verified.', contact: 'Contact AssetVeyra', request: 'Request This Opportunity', pricing: 'Sign in to view pricing', details: 'Property details', features: 'Key features', more: 'Open full details', less: 'Hide details', unavailable: 'Original listing photo could not be retrieved', footer: 'External listings are third-party market references, not verified AssetVeyra opportunities.' },
  ar: { heading: 'فرص السوق الخارجي', intro: 'قوائم عقارية مختارة من السوق الخارجي ومعروضة بشكل منفصل عن فرص AssetVeyra. يجب التحقق بشكل مستقل من التوفر والأسعار وشروط المعاملة.', contact: 'تواصل مع AssetVeyra', request: 'اطلب هذه الفرصة', pricing: 'سجّل الدخول لعرض السعر', details: 'تفاصيل العقار', features: 'أهم المزايا', more: 'فتح كامل التفاصيل', less: 'إخفاء التفاصيل', unavailable: 'تعذر جلب الصورة الأصلية للإعلان', footer: 'القوائم الخارجية هي مراجع من سوق الغير وليست فرصاً موثقة من AssetVeyra.' },
  zh: { heading: '外部市场机会', intro: '精选第三方市场挂牌，与 AssetVeyra 机会分开显示。可用性、价格和交易条款必须独立核实。', contact: '联系 AssetVeyra', request: '咨询此机会', pricing: '登录后查看价格', details: '物业详情', features: '主要特点', more: '打开完整详情', less: '隐藏详情', unavailable: '无法获取原始挂牌图片', footer: '外部挂牌是第三方市场参考，并非经 AssetVeyra 核实的机会。' },
  es: { heading: 'Oportunidades del mercado externo', intro: 'Listados seleccionados de terceros, separados de las oportunidades de AssetVeyra. La disponibilidad, el precio y las condiciones deben verificarse de forma independiente.', contact: 'Contactar con AssetVeyra', request: 'Solicitar esta oportunidad', pricing: 'Inicie sesión para ver el precio', details: 'Detalles del inmueble', features: 'Características', more: 'Abrir todos los detalles', less: 'Ocultar detalles', unavailable: 'No se pudo recuperar la foto original', footer: 'Los listados externos son referencias de terceros y no oportunidades verificadas por AssetVeyra.' },
  fr: { heading: 'Opportunités du marché externe', intro: 'Sélection de biens proposés par des tiers, séparés des opportunités AssetVeyra. La disponibilité, le prix et les conditions doivent être vérifiés indépendamment.', contact: 'Contacter AssetVeyra', request: 'Demander cette opportunité', pricing: 'Connectez-vous pour voir le prix', details: 'Détails du bien', features: 'Caractéristiques', more: 'Ouvrir tous les détails', less: 'Masquer les détails', unavailable: 'La photo originale n’a pas pu être récupérée', footer: 'Les annonces externes sont des références de marché de tiers et non des opportunités vérifiées par AssetVeyra.' },
};

export default function ExternalMarketClient() {
  const locale = useLocale();
  const t = copy[locale];
  const [authenticated, setAuthenticated] = useState(false);
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});
  const [imageIndexes, setImageIndexes] = useState<Record<string, number>>({});
  const [lightbox, setLightbox] = useState<{ listingId: string; index: number } | null>(null);

  useEffect(() => {
    const supabase = createClient();
    let active = true;
    supabase.auth.getUser().then(({ data }) => { if (active) setAuthenticated(Boolean(data.user)); });
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => { if (active) setAuthenticated(Boolean(session?.user)); });
    return () => { active = false; listener.subscription.unsubscribe(); };
  }, []);

  const textFor = (value: Localized) => value[locale === 'ar' ? 'ar' : 'en'];
  const imageSrc = (url: string) => `/api/external-market/image?url=${encodeURIComponent(url)}`;
  const moveImage = (listingId: string, count: number, direction: number) => {
    setImageIndexes((current) => ({ ...current, [listingId]: ((current[listingId] ?? 0) + direction + count) % count }));
  };

  return <main className="av-final-home external-market-page">
    <header className="av-final-header">
      <a className="av-final-brand" href="/">ASSETVEYRA</a>
      <details className="av-menu"><summary className="av-menu-trigger"><span className="av-menu-icon" aria-hidden="true"><i></i><i></i><i></i></span><I18nText id="Menu"/></summary>
        <nav className="av-menu-panel" aria-label="Primary navigation"><a href="/"><I18nText id="Home"/></a><a href="/external-market"><I18nText id="Marketplace"/></a><a href="/contact"><I18nText id="Contact"/></a><a href="/dashboard"><I18nText id="Dashboard"/></a><div className="av-menu-divider"/><div className="av-language-group"><I18nText id="Language"/><LanguageSelect/></div><div className="av-menu-account"><a className="av-menu-login" href="/login"><I18nText id="Login"/></a><a className="av-menu-signup" href="/signup"><I18nText id="Sign Up"/></a></div></nav>
      </details>
    </header>

    <section className="external-market-section">
      <div className="external-market-heading"><div><div className="eyebrow"><I18nText id="Marketplace"/></div><h2>{t.heading}</h2><p>{t.intro}</p></div><a className="external-market-contact" href={authenticated ? '/contact' : '/login'}>{t.contact}</a></div>
      <div className="external-listing-grid">
        {listings.map((listing) => {
          const title = textFor(listing.title);
          const failedCount = listing.imageUrls.filter((url) => failedImages[`${listing.id}:${url}`]).length;
          if (listing.imageUrls.length === 0 || failedCount === listing.imageUrls.length) return null;
          return <article className="external-listing-card" key={listing.id}>
            <div className="external-listing-image-link" aria-label={title}>
              <div className="external-listing-image external-gallery">
                {listing.imageUrls.length > 0 && !failed ? <>
                  <button type="button" className="external-gallery-image-button" onClick={() => setLightbox({ listingId: listing.id, index: imageIndexes[listing.id] ?? 0 })} aria-label={title}>
                    <img src={imageSrc(listing.imageUrls[imageIndexes[listing.id] ?? 0])} alt={textFor(listing.imageAlt)} loading="lazy" onError={() => setFailedImages((current) => ({ ...current, [`${listing.id}:${listing.imageUrls[imageIndexes[listing.id] ?? 0]}`]: true }))}/>
                  </button>
                  {listing.imageUrls.length > 1 && <>
                    <button type="button" className="external-gallery-prev" onClick={() => moveImage(listing.id, listing.imageUrls.length, -1)} aria-label="Previous image">‹</button>
                    <button type="button" className="external-gallery-next" onClick={() => moveImage(listing.id, listing.imageUrls.length, 1)} aria-label="Next image">›</button>
                    <span className="external-gallery-counter">{(imageIndexes[listing.id] ?? 0) + 1} / {listing.imageUrls.length}</span>
                  </>}
                </> : <div className="external-image-missing"><strong>{t.unavailable}</strong></div>}
              </div>
            </div><div className="card-meta"><span>{textFor(listing.country)}</span><span>{textFor(listing.city)}</span></div>
            <h4>{title}</h4>
            <p>{textFor(listing.type)} · {textFor(listing.summary)}</p>
            <div className="external-facts">{listing.facts.map((fact, index) => <span key={index}><b>•</b>{textFor(fact)}</span>)}</div>
            <div className="external-card-footer"><strong>{authenticated ? listing.price : t.pricing}</strong><div className="external-card-actions"><details className="external-inline-details" open><summary>{t.details}</summary><div className="external-inline-details-body"><div className="external-detail-table">{listing.details.map((detail, index) => <div className="external-detail-row" key={index}><strong>{textFor(detail.label)}</strong><span>{textFor(detail.value)}</span></div>)}</div><h5>{t.features}</h5><div className="external-feature-list">{listing.features.map((feature, index) => <span key={index}>{textFor(feature)}</span>)}</div></div></details><a className="external-market-contact-link" href={authenticated ? `/contact?opportunity=${encodeURIComponent(title)}` : '/login'}>{t.request}</a></div></div>
          </article>;
        })}
      </div>
    </section>
    {lightbox && (() => {
      const listing = listings.find((item) => item.id === lightbox.listingId);
      if (!listing) return null;
      return <div className="external-lightbox" role="dialog" aria-modal="true" aria-label={textFor(listing.title)} onClick={() => setLightbox(null)}>
        <button type="button" className="external-lightbox-close" onClick={() => setLightbox(null)} aria-label="Close">×</button>
        <img src={imageSrc(listing.imageUrls[lightbox.index])} alt={textFor(listing.imageAlt)} onClick={(event) => event.stopPropagation()}/>
        {listing.imageUrls.length > 1 && <>
          <button type="button" className="external-lightbox-prev" onClick={(event) => { event.stopPropagation(); setLightbox({ listingId: listing.id, index: (lightbox.index - 1 + listing.imageUrls.length) % listing.imageUrls.length }); }} aria-label="Previous image">‹</button>
          <button type="button" className="external-lightbox-next" onClick={(event) => { event.stopPropagation(); setLightbox({ listingId: listing.id, index: (lightbox.index + 1) % listing.imageUrls.length }); }} aria-label="Next image">›</button>
        </>}
      </div>;
    })()}
    <footer className="av-footer">{t.footer}</footer>
  </main>;
}
