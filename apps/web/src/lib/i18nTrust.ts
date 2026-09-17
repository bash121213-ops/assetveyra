import { I18nText } from '@/components/LocaleShell';
import { TRUST_TRANSLATIONS } from '@/lib/i18nTrust';

export const OPPORTUNITY_TRANSLATIONS: Record<string, Record<Locale, string>> = {
  'Opportunity details': { en: 'Opportunity details', ar: 'تفاصيل الفرصة', zh: '机会详情', es: 'Detalles de la oportunidad', fr: 'Détails de l’opportunité' },
  'Property gallery': { en: 'Property gallery', ar: 'معرض صور العقار', zh: '物业图片库', es: 'Galería del inmueble', fr: 'Galerie du bien' },
  'View all property images': { en: 'View all property images', ar: 'عرض جميع صور العقار', zh: '查看全部 صور العقار', es: 'Ver todas las imágenes del inmueble', fr: 'Voir toutes les images du bien' },
  'No property images are available for this opportunity.': { en: 'No property images are available for this opportunity.', ar: 'لا تتوفر صور للعقار لهذه الفرصة.', zh: '此机会目前暂无物业图片。', es: 'No hay imágenes del inmueble disponibles para esta oportunidad.', fr: 'Aucune image du bien n’est disponible pour cette opportunité.' },
  'Public information': { en: 'Public information', ar: 'المعلومات العامة', zh: '公开信息', es: 'Información pública', fr: 'Informations publiques' },
  'Location': { en: 'Location', ar: 'الموقع', zh: '位置', es: 'Ubicación', fr: 'Emplacement' },
  'Description': { en: 'Description', ar: 'الوصف', zh: '描述', es: 'Descripción', fr: 'Description' },
  'Investment thesis': { en: 'Investment thesis', ar: 'أطروحة الاستثمار', zh: '投资论点', es: 'Tesis de inversión', fr: 'Thèse d’investissement' },
  'Transaction structure': { en: 'Transaction structure', ar: 'هيكل المعاملة', zh: '交易结构', es: 'Estructura de la operación', fr: 'Structure de la transaction' },
  'Contact AssetVeyra': { en: 'Contact AssetVeyra', ar: 'تواصل مع AssetVeyra', zh: '联系 AssetVeyra', es: 'Contactar con AssetVeyra', fr: 'Contacter AssetVeyra' },
  'Request information about this opportunity': { en: 'Request information about this opportunity', ar: 'اطلب معلومات عن هذه الفرصة', zh: '申请了解此机会', es: 'Solicitar información sobre esta oportunidad', fr: 'Demander des informations sur cette opportunité' },
  'Register qualified interest': { en: 'Register qualified interest', ar: 'تسجيل اهتمام مؤهل', zh: '登记合格意向', es: 'Registrar interés cualificado', fr: 'Enregistrer un intérêt qualifié' },
  'Register interest': { en: 'Register interest', ar: 'تسجيل الاهتمام', zh: '登记意向', es: 'Registrar interés', fr: 'Enregistrer l’intérêt' },
  'Contact us': { en: 'Contact us', ar: 'تواصل معنا', zh: '联系我们', es: 'Contáctenos', fr: 'Nous contacter' },
  'Published opportunity': { en: 'Published opportunity', ar: 'فرصة منشورة', zh: '已发布机会', es: 'Oportunidad publicada', fr: 'Opportunité publiée' },
  'Controlled access': { en: 'Controlled access', ar: 'وصول منضبط', zh: '受控访问', es: 'Acceso controlado', fr: 'Accès contrôlé' },
  'Investor access': { en: 'Investor access', ar: 'وصول المستثمر', zh: '投资者访问', es: 'Acceso del inversor', fr: 'Accès investisseur' },
  'TRANSACTION PATH': { en: 'TRANSACTION PATH', ar: 'مسار المعاملة', zh: '交易路径', es: 'RUTA DE LA OPERACIÓN', fr: 'PARCOURS DE TRANSACTION' },
  'Asset type': { en: 'Asset type', ar: 'نوع الأصل', zh: '资产类型', es: 'Tipo de activo', fr: 'Type d’actif' },
  'Country': { en: 'Country', ar: 'الدولة', zh: '国家', es: 'País', fr: 'Pays' },
  'Region': { en: 'Region', ar: 'المنطقة', zh: '地区', es: 'Región', fr: 'Région' },
  'City': { en: 'City', ar: 'المدينة', zh: '城市', es: 'Ciudad', fr: 'Ville' },
  'Area': { en: 'Area', ar: 'المساحة', zh: '面积', es: 'Superficie', fr: 'Surface' },
  'Asking price': { en: 'Asking price', ar: 'السعر المطلوب', zh: '要价', es: 'Precio solicitado', fr: 'Prix demandé' },
  'Minimum ticket': { en: 'Minimum ticket', ar: 'الحد الأدنى للاستثمار', zh: '最低投资额', es: 'Inversión mínima', fr: 'Ticket minimum' },
  'Target return': { en: 'Target return', ar: 'العائد المستهدف', zh: '目标回报', es: 'Rentabilidad objetivo', fr: 'Rendement cible' },
  'Additional ownership, legal, financial or technical material may require qualification, confidentiality terms or Data Room access.': { en: 'Additional ownership, legal, financial or technical material may require qualification, confidentiality terms or Data Room access.', ar: 'قد تتطلب المواد الإضافية المتعلقة بالملكية أو القانونية أو المالية أو التقنية تأهيلًا أو شروط سرية أو وصولًا إلى غرفة البيانات.', zh: '补充的所有权、法律、财务或技术材料可能需要资格审查、保密条款或数据室访问。', es: 'El material adicional sobre propiedad, legales, financieros o técnicos puede requerir cualificación, condiciones de confidencialidad o acceso a la sala de datos.', fr: 'Des éléments supplémentaires sur la propriété, le cadre juridique, financier ou technique peuvent nécessiter une qualification, des conditions de confidentialité ou un accès à la data room.' },
  'Back to opportunities': { en: 'Back to opportunities', ar: 'العودة إلى الفرص', zh: '返回机会列表', es: 'Volver a oportunidades', fr: 'Retour aux opportunités' },
};

export const TRUST_TRANSLATIONS_WITHOUT_DOUBLE_IMPORT = TRUST_TRANSLATIONS;
