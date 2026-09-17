import { TRANSLATIONS, type Locale } from '@/lib/i18n';

const entries: Record<string, Record<Locale, string>> = {
  'Opportunity details': { en: 'Opportunity details', ar: 'تفاصيل الفرصة', zh: '机会详情', es: 'Detalles de la oportunidad', fr: 'Détails de l’opportunité' },
  'Property gallery': { en: 'Property gallery', ar: 'معرض صور العقار', zh: '物业图片库', es: 'Galería del inmueble', fr: 'Galerie du bien' },
  'View all property images': { en: 'View all property images', ar: 'عرض جميع صور العقار', zh: '查看全部物业图片', es: 'Ver todas las imágenes del inmueble', fr: 'Voir toutes les images du bien' },
  'No property images are available for this opportunity.': { en: 'No property images are available for this opportunity.', ar: 'لا تتوفر صور للعقار لهذه الفرصة.', zh: '此机会暂无物业图片。', es: 'No hay imágenes del inmueble disponibles para esta oportunidad.', fr: 'Aucune image du bien n’est disponible pour cette opportunité.' },
  'Public information': { en: 'Public information', ar: 'المعلومات العامة', zh: '公开信息', es: 'Información pública', fr: 'Informations publiques' },
  'Location': { en: 'Location', ar: 'الموقع', zh: 'الموقع', es: 'Ubicación', fr: 'Emplacement' },
  'Description': { en: 'Description', ar: 'الوصف', zh: '描述', es: 'Descripción', fr: 'Description' },
  'Investment thesis': { en: 'Investment thesis', ar: 'أطروحة الاستثمار', zh: '投资逻辑', es: 'Tesis de inversión', fr: 'Thèse d’investissement' },
  'Transaction structure': { en: 'Transaction structure', ar: 'هيكل المعاملة', zh: '交易结构', es: 'Estructura de la operación', fr: 'Structure de la transaction' },
  'Contact AssetVeyra': { en: 'Contact AssetVeyra', ar: 'تواصل مع AssetVeyra', zh: '联系 AssetVeyra', es: 'Contactar con AssetVeyra', fr: 'Contacter AssetVeyra' },
  'Request information about this opportunity': { en: 'Request information about this opportunity', ar: 'اطلب معلومات عن هذه الفرصة', zh: '申请获取此机会的信息', es: 'Solicitar información sobre esta oportunidad', fr: 'Demander des informations sur cette opportunité' },
  'Register qualified interest': { en: 'Register qualified interest', ar: 'تسجيل اهتمام مؤهل', zh: '登记合格意向', es: 'Registrar interés cualificado', fr: 'Enregistrer un intérêt qualifié' },
  'Register interest': { en: 'Register interest', ar: 'تسجيل الاهتمام', zh: '登记意向', es: 'Registrar interés', fr: 'Enregistrer l’intérêt' },
  'Contact us': { en: 'Contact us', ar: 'تواصل معنا', zh: '联系我们', es: 'Contáctenos', fr: 'Nous contacter' },
  'Published opportunity': { en: 'Published opportunity', ar: 'فرصة منشورة', zh: '已发布机会', es: 'Oportunidad publicada', fr: 'Opportunité publiée' },
  'Asset type': { en: 'Asset type', ar: 'نوع الأصل', zh: '资产类型', es: 'Tipo de activo', fr: 'Type d’actif' },
  'Country': { en: 'Country', ar: 'الدولة', zh: '国家', es: 'País', fr: 'Pays' },
  'Region': { en: 'Region', ar: 'المنطقة', zh: '地区', es: 'Región', fr: 'Région' },
  'City': { en: 'City', ar: 'المدينة', zh: '城市', es: 'Ciudad', fr: 'Ville' },
  'Area': { en: 'Area', ar: 'المساحة', zh: '面积', es: 'Superficie', fr: 'Surface' },
  'Asking price': { en: 'Asking price', ar: 'السعر المطلوب', zh: '要价', es: 'Precio solicitado', fr: 'Prix demandé' },
  'Minimum ticket': { en: 'Minimum ticket', ar: 'الحد الأدنى للاستثمار', zh: '最低投资额', es: 'Inversión mínima', fr: 'Ticket minimum' },
  'Target return': { en: 'Target return', ar: 'العائد المستهدف', zh: '目标回报', es: 'Rentabilidad objetivo', fr: 'Rendement cible' },
  'Controlled access': { en: 'Controlled access', ar: 'وصول منضبط', zh: '受控访问', es: 'Acceso controlado', fr: 'Accès contrôlé' },
  'Additional ownership, legal, financial or technical material may require qualification, confidentiality terms or Data Room access.': { en: 'Additional ownership, legal, financial or technical material may require qualification, confidentiality terms or Data Room access.', ar: 'قد تتطلب معلومات الملكية أو القانونية أو المالية أو الفنية الإضافية التأهيل أو شروط السرية أو الوصول إلى غرفة البيانات.', zh: '更多所有权、法律、财务或技术资料可能需要资格审查、保密条款或数据室访问权限。', es: 'La información adicional de propiedad, legal, financiera o técnica puede requerir cualificación, confidencialidad o acceso a la sala de datos.', fr: 'Les informations complémentaires relatives à la propriété, aux aspects juridiques, financiers ou techniques peuvent nécessiter une qualification, des conditions de confidentialité ou un accès à la data room.' },
  'Back to opportunities': { en: 'Back to opportunities', ar: 'العودة إلى الفرص', zh: '返回机会列表', es: 'Volver a oportunidades', fr: 'Retour aux opportunités' },
};

for (const [key, value] of Object.entries(entries)) TRANSLATIONS[key] = value;
