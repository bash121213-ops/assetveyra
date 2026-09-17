import type { Locale } from '@/lib/i18n';
import { WORKSPACE_TRANSLATIONS } from '@/lib/i18nWorkspace';
import { OPPORTUNITY_TRANSLATIONS } from '@/lib/i18nOpportunity';
import { ASSET_IMAGE_TRANSLATIONS } from '@/lib/i18nAssetImages';
import { LEGAL_CONSULTATION_TRANSLATIONS } from '@/lib/i18nLegalConsultation';
import { QUALIFIED_INVESTOR_TRANSLATIONS } from '@/lib/i18nQualifiedInvestors';

type TranslationSet = Record<Locale, string>;

const BASE_TRANSLATION_REGISTRY: Record<string, TranslationSet> = {
  'Investment interest': { en: 'Investment interest', ar: 'اهتمام استثماري', zh: '投资意向', es: 'Interés de inversión', fr: 'Intérêt d’investissement' },
  'Pipeline state': { en: 'Pipeline state', ar: 'حالة المسار', zh: '流程状态', es: 'Estado del proceso', fr: 'État du processus' },
  'Each transaction stage is gated by authorization and the required evidence.': { en: 'Each transaction stage is gated by authorization and the required evidence.', ar: 'كل مرحلة من مراحل المعاملة تخضع للتفويض والأدلة المطلوبة.', zh: '每个交易阶段都受授权和所需证据的控制。', es: 'Cada etapa de la transacción está sujeta a autorización y a las pruebas requeridas.', fr: 'Chaque étape de la transaction est soumise à autorisation et aux justificatifs requis.' },
  'Interest opened': { en: 'Interest opened', ar: 'تاريخ فتح الاهتمام', zh: '意向开启时间', es: 'Interés abierto', fr: 'Intérêt ouvert' },
  'Offers': { en: 'Offers', ar: 'العروض', zh: '报价', es: 'Ofertas', fr: 'Offres' },
  'Transaction gates': { en: 'Transaction gates', ar: 'بوابات المعاملة', zh: '交易关卡', es: 'Etapas de la transacción', fr: 'Étapes de la transaction' },
  'Qualification': { en: 'Qualification', ar: 'التأهيل', zh: '资格审查', es: 'Cualificación', fr: 'Qualification' },
  'Initial investor review': { en: 'Initial investor review', ar: 'المراجعة الأولية للمستثمر', zh: '投资者初步审核', es: 'Revisión inicial del inversor', fr: 'Examen initial de l’investisseur' },
  'Required': { en: 'Required', ar: 'مطلوب', zh: '必需', es: 'Obligatorio', fr: 'Requis' },
  'Qualify investor': { en: 'Qualify investor', ar: 'تأهيل المستثمر', zh: '审核投资者资格', es: 'Cualificar al inversor', fr: 'Qualifier l’investisseur' },
  'Request controlled disclosure': { en: 'Request controlled disclosure', ar: 'طلب الإفصاح المنضبط', zh: '请求受控披露', es: 'Solicitar divulgación controlada', fr: 'Demander une divulgation contrôlée' },
  'Request NDA': { en: 'Request NDA', ar: 'طلب اتفاقية عدم الإفصاح', zh: '请求保密协议', es: 'Solicitar NDA', fr: 'Demander une NDA' },
  'NDA / data room': { en: 'NDA / data room', ar: 'اتفاقية عدم الإفصاح / غرفة البيانات', zh: '保密协议 / 数据室', es: 'NDA / sala de datos', fr: 'NDA / data room' },
  'NDA accepted and data-room access verified': { en: 'NDA accepted and data-room access verified', ar: 'تم قبول اتفاقية عدم الإفصاح والتحقق من الوصول إلى غرفة البيانات', zh: '保密协议已接受，数据室访问已验证', es: 'NDA aceptada y acceso a la sala de datos verificado', fr: 'NDA acceptée et accès à la data room vérifié' },
  'NDA accepted; waiting for data-room access': { en: 'NDA accepted; waiting for data-room access', ar: 'تم قبول اتفاقية عدم الإفصاح؛ بانتظار الوصول إلى غرفة البيانات', zh: '保密协议已接受；等待数据室访问权限', es: 'NDA aceptada; esperando el acceso a la sala de datos', fr: 'NDA acceptée ; en attente de l’accès à la data room' },
  'Accept the NDA to continue': { en: 'Accept the NDA to continue', ar: 'اقبل اتفاقية عدم الإفصاح للمتابعة', zh: '接受保密协议后继续', es: 'Acepte la NDA para continuar', fr: 'Acceptez la NDA pour continuer' },
  'Ready': { en: 'Ready', ar: 'جاهز', zh: '就绪', es: 'Listo', fr: 'Prêt' },
  'Blocked': { en: 'Blocked', ar: 'محظور', zh: '受阻', es: 'Bloqueado', fr: 'Bloqué' },
  'Record NDA signed': { en: 'Record NDA signed', ar: 'تسجيل توقيع اتفاقية عدم الإفصاح', zh: '记录保密协议已签署', es: 'Registrar NDA firmada', fr: 'Enregistrer la signature de la NDA' },
  'Enter data room': { en: 'Enter data room', ar: 'دخول غرفة البيانات', zh: '进入数据室', es: 'Entrar en la sala de datos', fr: 'Entrer dans la data room' },
  'Start the formal diligence case': { en: 'Start the formal diligence case', ar: 'بدء ملف العناية الواجبة الرسمي', zh: '开始正式尽职调查案件', es: 'Iniciar el expediente formal de diligencia', fr: 'Démarrer le dossier formel de due diligence' },
  'Start diligence': { en: 'Start diligence', ar: 'بدء العناية الواجبة', zh: '开始尽职调查', es: 'Iniciar diligencia', fr: 'Démarrer la due diligence' },
  'No expiry': { en: 'No expiry', ar: 'لا يوجد انتهاء', zh: '无到期日', es: 'Sin vencimiento', fr: 'Sans expiration' },
  'Accept & open deal': { en: 'Accept & open deal', ar: 'قبول وفتح الصفقة', zh: '接受并创建交易', es: 'Aceptar y abrir la operación', fr: 'Accepter et ouvrir la transaction' },
  'No offers submitted.': { en: 'No offers submitted.', ar: 'لم يتم تقديم أي عروض.', zh: '尚未提交报价。', es: 'No se han presentado ofertas.', fr: 'Aucune offre soumise.' },
  'Formal offers become available only after diligence has started.': { en: 'Formal offers become available only after diligence has started.', ar: 'تصبح العروض الرسمية متاحة فقط بعد بدء العناية الواجبة.', zh: '正式报价仅在尽职调查开始后可用。', es: 'Las ofertas formales solo están disponibles después de iniciar la diligencia.', fr: 'Les offres formelles sont disponibles uniquement après le début de la due diligence.' },
  'Formal offer': { en: 'Formal offer', ar: 'عرض رسمي', zh: '正式报价', es: 'Oferta formal', fr: 'Offre formelle' },
  'Submit an offer': { en: 'Submit an offer', ar: 'تقديم عرض', zh: '提交报价', es: 'Presentar una oferta', fr: 'Soumettre une offre' },
  'Offers are gated until the investor reaches the diligence stage. This prevents a commercial offer from bypassing qualification, NDA and controlled disclosure.': { en: 'Offers are gated until the investor reaches the diligence stage. This prevents a commercial offer from bypassing qualification, NDA and controlled disclosure.', ar: 'تظل العروض مقيدة حتى يصل المستثمر إلى مرحلة العناية الواجبة، لمنع تجاوز التأهيل واتفاقية السرية والإفصاح المنضبط.', zh: '在投资者进入尽职调查阶段前，报价受到限制，以防商业报价绕过资格审查、保密协议和受控披露。', es: 'Las ofertas están restringidas hasta que el inversor alcanza la diligencia, evitando que una oferta comercial omita la cualificación, la NDA y la divulgación controlada.', fr: 'Les offres sont bloquées jusqu’à l’étape de due diligence afin d’éviter qu’une offre commerciale contourne la qualification, la NDA et la divulgation contrôlée.' },
  'Amount': { en: 'Amount', ar: 'المبلغ', zh: '金额', es: 'Importe', fr: 'Montant' },
  'Commercial terms': { en: 'Commercial terms', ar: 'الشروط التجارية', zh: '商业条款', es: 'Condiciones comerciales', fr: 'Conditions commerciales' },
  'Key conditions, due diligence conditions, target closing…': { en: 'Key conditions, due diligence conditions, target closing…', ar: 'الشروط الأساسية وشروط العناية الواجبة وموعد الإغلاق المستهدف…', zh: '主要条件、尽职调查条件、目标交割时间……', es: 'Condiciones clave, condiciones de diligencia, cierre previsto…', fr: 'Conditions clés, conditions de due diligence, clôture cible…' },
  'Submit formal offer': { en: 'Submit formal offer', ar: 'إرسال العرض الرسمي', zh: '提交正式报价', es: 'Enviar oferta formal', fr: 'Soumettre l’offre formelle' },
  'Offer gate locked': { en: 'Offer gate locked', ar: 'بوابة العرض مقفلة', zh: '报价关卡已锁定', es: 'Etapa de oferta bloqueada', fr: 'Étape de l’offre verrouillée' },
  'Current stage': { en: 'Current stage', ar: 'المرحلة الحالية', zh: '当前阶段', es: 'Etapa actual', fr: 'Étape actuelle' },
  'Complete the required transaction gates first.': { en: 'Complete the required transaction gates first.', ar: 'أكمل بوابات المعاملة المطلوبة أولًا.', zh: '请先完成所需的交易关卡。', es: 'Complete primero las etapas requeridas de la transacción.', fr: 'Complétez d’abord les étapes requises de la transaction.' },
  'Add Property': { en: 'Add Property', ar: 'إضافة عقار', zh: '添加物业', es: 'Añadir propiedad', fr: 'Ajouter un bien' },
  'Property gallery': { en: 'Property gallery', ar: 'معرض صور العقار', zh: '物业图片库', es: 'Galería del inmueble', fr: 'Galerie du bien' },
  'View all property images': { en: 'View all property images', ar: 'عرض جميع صور العقار', zh: '查看全部物业图片', es: 'Ver todas las imágenes del inmueble', fr: 'Voir toutes les images du bien' },
  'No property images are available for this opportunity.': { en: 'No property images are available for this opportunity.', ar: 'لا تتوفر صور للعقار لهذه الفرصة.', zh: '此机会没有可用的物业图片。', es: 'No hay imágenes disponibles para esta oportunidad.', fr: 'Aucune image du bien n’est disponible pour cette opportunité.' },
  'Public information': { en: 'Public information', ar: 'المعلومات العامة', zh: '公开信息', es: 'Información pública', fr: 'Informations publiques' },
  'Opportunity details': { en: 'Opportunity details', ar: 'تفاصيل الفرصة', zh: '机会详情', es: 'Detalles de la oportunidad', fr: 'Détails de l’opportunité' },
  'Register interest': { en: 'Register interest', ar: 'تسجيل الاهتمام', zh: '登记意向', es: 'Registrar interés', fr: 'Enregistrer l’intérêt' },
  'Register qualified interest': { en: 'Register qualified interest', ar: 'تسجيل اهتمام مؤهل', zh: '登记合格意向', es: 'Registrar interés cualificado', fr: 'Enregistrer un intérêt qualifié' },
  'Contact AssetVeyra': { en: 'Contact AssetVeyra', ar: 'تواصل مع AssetVeyra', zh: '联系 AssetVeyra', es: 'Contactar con AssetVeyra', fr: 'Contacter AssetVeyra' },
  'Request information about this opportunity': { en: 'Request information about this opportunity', ar: 'اطلب معلومات عن هذه الفرصة', zh: '申请获取此机会的信息', es: 'Solicitar información sobre esta oportunidad', fr: 'Demander des informations sur cette opportunité' },
  'Back to opportunities': { en: 'Back to opportunities', ar: 'العودة إلى الفرص', zh: '返回机会列表', es: 'Volver a oportunidades', fr: 'Retour aux opportunités' },
  'Asset type': { en: 'Asset type', ar: 'نوع الأصل', zh: '资产类型', es: 'Tipo de activo', fr: 'Type d’actif' },
  Country: { en: 'Country', ar: 'الدولة', zh: '国家', es: 'País', fr: 'Pays' },
  Region: { en: 'Region', ar: 'المنطقة', zh: '地区', es: 'Región', fr: 'Région' },
  City: { en: 'City', ar: 'المدينة', zh: '城市', es: 'Ciudad', fr: 'Ville' },
  Area: { en: 'Area', ar: 'المساحة', zh: '面积', es: 'Superficie', fr: 'Surface' },
  'Asking price': { en: 'Asking price', ar: 'السعر المطلوب', zh: '要价', es: 'Precio solicitado', fr: 'Prix demandé' },
  'Minimum ticket': { en: 'Minimum ticket', ar: 'الحد الأدنى للاستثمار', zh: '最低投资额', es: 'Inversión mínima', fr: 'Ticket minimum' },
  'Target return': { en: 'Target return', ar: 'العائد المستهدف', zh: '目标回报', es: 'Rentabilidad objetivo', fr: 'Rendement cible' },
  'Property details': { en: 'Property details', ar: 'تفاصيل العقار', zh: '物业详情', es: 'Detalles del inmueble', fr: 'Détails du bien' },
  'My Assets': { en: 'My Assets', ar: 'أصولي', zh: '我的资产', es: 'Mis activos', fr: 'Mes actifs' },
  'My Interests': { en: 'My Interests', ar: 'اهتماماتي', zh: '我的关注', es: 'Mis intereses', fr: 'Mes intérêts' },
  Transactions: { en: 'Transactions', ar: 'المعاملات', zh: '交易', es: 'Transacciones', fr: 'Transactions' },
  Opportunity: { en: 'Opportunity', ar: 'فرصة', zh: '机会', es: 'Oportunidad', fr: 'Opportunité' },
  Download: { en: 'Download', ar: 'تنزيل', zh: '下载', es: 'Descargar', fr: 'Télécharger' },
  Save: { en: 'Save', ar: 'حفظ', zh: '保存', es: 'Guardar', fr: 'Enregistrer' },
  Submit: { en: 'Submit', ar: 'إرسال', zh: '提交', es: 'Enviar', fr: 'Soumettre' },
  Cancel: { en: 'Cancel', ar: 'إلغاء', zh: '取消', es: 'Cancelar', fr: 'Annuler' },
  Close: { en: 'Close', ar: 'إغلاق', zh: '关闭', es: 'Cerrar', fr: 'Fermer' },
  Delete: { en: 'Delete', ar: 'حذف', zh: '删除', es: 'Eliminar', fr: 'Supprimer' },
  Edit: { en: 'Edit', ar: 'تعديل', zh: '编辑', es: 'Editar', fr: 'Modifier' },
  Back: { en: 'Back', ar: 'رجوع', zh: '返回', es: 'Atrás', fr: 'Retour' },
  Next: { en: 'Next', ar: 'التالي', zh: '下一步', es: 'Siguiente', fr: 'Suivant' },
  Loading: { en: 'Loading', ar: 'جارٍ التحميل', zh: '加载中', es: 'Cargando', fr: 'Chargement' },
  Error: { en: 'Error', ar: 'خطأ', zh: '错误', es: 'Error', fr: 'Erreur' },
  Success: { en: 'Success', ar: 'نجاح', zh: '成功', es: 'Éxito', fr: 'Succès' },
  'No results': { en: 'No results', ar: 'لا توجد نتائج', zh: '没有结果', es: 'Sin resultados', fr: 'Aucun résultat' },
  'This field is required': { en: 'This field is required', ar: 'هذا الحقل مطلوب', zh: '此字段为必填', es: 'Este campo es obligatorio', fr: 'Ce champ est obligatoire' },
  'Asset images': { en: 'Asset images', ar: 'صور الأصل', zh: '资产图片', es: 'Imágenes del activo', fr: 'Images du bien' },
  'Upload images': { en: 'Upload images', ar: 'رفع الصور', zh: '上传图片', es: 'Subir imágenes', fr: 'Télécharger des images' },
  'Main image': { en: 'Main image', ar: 'الصورة الرئيسية', zh: '主图', es: 'Imagen principal', fr: 'Image principale' },
};

export const CENTRAL_TRANSLATION_REGISTRY: Record<string, TranslationSet> = {
  ...BASE_TRANSLATION_REGISTRY,
  ...WORKSPACE_TRANSLATIONS,
  ...OPPORTUNITY_TRANSLATIONS,
  ...ASSET_IMAGE_TRANSLATIONS,
  ...LEGAL_CONSULTATION_TRANSLATIONS,
  ...QUALIFIED_INVESTOR_TRANSLATIONS,
};

export const STATUS_TRANSLATIONS = {
  draft: { en: 'Draft', ar: 'مسودة', zh: '草稿', es: 'Borrador', fr: 'Brouillon' },
  submitted: { en: 'Submitted', ar: 'مُقدم', zh: '已提交', es: 'Enviado', fr: 'Soumis' },
  published: { en: 'Published', ar: 'منشور', zh: '已发布', es: 'Publicado', fr: 'Publié' },
  pending: { en: 'Pending', ar: 'قيد الانتظار', zh: '待处理', es: 'Pendiente', fr: 'En attente' },
  qualified: { en: 'Qualified', ar: 'مؤهل', zh: '已合格', es: 'Calificado', fr: 'Qualifié' },
  rejected: { en: 'Rejected', ar: 'مرفوض', zh: '已拒绝', es: 'Rechazado', fr: 'Refusé' },
} as const;;

export const ASSET_TYPE_TRANSLATIONS = {
  land: { en: 'Land', ar: 'أرض', zh: '土地', es: 'Terreno', fr: 'Terrain' },
  residential: { en: 'Residential', ar: 'سكني', zh: '住宅', es: 'Residencial', fr: 'Résidentiel' },
  commercial: { en: 'Commercial', ar: 'تجاري', zh: '商业', es: 'Comercial', fr: 'Commercial' },
  hotel: { en: 'Hotel', ar: 'فندق', zh: '酒店', es: 'Hotel', fr: 'Hôtel' },
  hospitality: { en: 'Hospitality', ar: 'ضيافة', zh: '酒店及度假', es: 'Hostelería', fr: 'Hôtellerie' },
  industrial: { en: 'Industrial', ar: 'صناعي', zh: '工业', es: 'Industrial', fr: 'Industriel' },
  mixed_use: { en: 'Mixed use', ar: 'استخدام مختلط', zh: '混合用途', es: 'Uso mixto', fr: 'Usage mixte' },
  development_project: { en: 'Development project', ar: 'مشروع تطوير', zh: '开发项目', es: 'Proyecto de desarrollo', fr: 'Projet de développement' },
  infrastructure: { en: 'Infrastructure', ar: 'البنية التحتية', zh: '基础设施', es: 'Infraestructura', fr: 'Infrastructure' },
  renewable_energy: { en: 'Renewable energy', ar: 'طاقة متجددة', zh: '可再生能源', es: 'Energía renovable', fr: 'Énergie renouvelable' },
  other: { en: 'Other', ar: 'أخرى', zh: '其他', es: 'Otro', fr: 'Autre' },
} as const;;

export function resolveLocaleText(key: string, locale: Locale): string {
  return CENTRAL_TRANSLATION_REGISTRY[key]?.[locale] ?? CENTRAL_TRANSLATION_REGISTRY[key]?.en ?? key;
}

export function resolveStatusLabel(status: string, locale: Locale): string {
  const normalized = String(status || '').toLowerCase();
  return STATUS_TRANSLATIONS[normalized as keyof typeof STATUS_TRANSLATIONS]?.[locale] ?? normalized;
}

export function resolveAssetTypeLabel(type: string, locale: Locale): string {
  const normalized = String(type || '').toLowerCase();
  return ASSET_TYPE_TRANSLATIONS[normalized as keyof typeof ASSET_TYPE_TRANSLATIONS]?.[locale] ?? type ?? 'Other';
}

export function getLocaleCoverage(locales: readonly Locale[]) {
  const keys = Object.keys(CENTRAL_TRANSLATION_REGISTRY);
  return Object.fromEntries(
    locales.map((locale) => [
      locale,
      { missing: keys.filter((key) => !CENTRAL_TRANSLATION_REGISTRY[key]?.[locale]) },
    ]),
  ) as Record<Locale, { missing: string[] }>;
}

export function hasCompleteLocaleCoverage(locales: readonly Locale[]) {
  return locales.every((locale) => getLocaleCoverage([locale])[locale].missing.length === 0);
}
