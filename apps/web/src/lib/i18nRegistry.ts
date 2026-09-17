import { TRANSLATIONS, type Locale, SUPPORTED_LOCALES } from '@/lib/i18n';

export const CENTRAL_TRANSLATION_REGISTRY = {
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
} as const;

export const STATUS_TRANSLATIONS = {
  draft: { en: 'Draft', ar: 'مسودة', zh: '草稿', es: 'Borrador', fr: 'Brouillon' },
  submitted: { en: 'Submitted', ar: 'مُقدم', zh: '已提交', es: 'Enviado', fr: 'Soumis' },
  published: { en: 'Published', ar: 'منشور', zh: '已发布', es: 'Publicado', fr: 'Publié' },
  pending: { en: 'Pending', ar: 'قيد الانتظار', zh: '待处理', es: 'Pendiente', fr: 'En attente' },
  qualified: { en: 'Qualified', ar: 'مؤهل', zh: '已合格', es: 'Calificado', fr: 'Qualifié' },
  rejected: { en: 'Rejected', ar: 'مرفوض', zh: '已拒绝', es: 'Rechazado', fr: 'Refusé' },
} as const;

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
} as const;

function mergeCentralTranslations() {
  for (const [key, translations] of Object.entries(CENTRAL_TRANSLATION_REGISTRY)) {
    const current = TRANSLATIONS[key] ?? {};
    for (const locale of SUPPORTED_LOCALES) {
      const value = translations[locale as keyof typeof translations];
      if (value) {
        current[locale] = value;
      }
    }
    TRANSLATIONS[key] = current;
  }
}

mergeCentralTranslations();

const LOCALE_SET = new Set<string>(SUPPORTED_LOCALES);

export function getLocaleCoverage() {
  const knownKeys = new Set<string>();
  for (const locale of SUPPORTED_LOCALES) {
    const map = CENTRAL_TRANSLATION_REGISTRY;
    for (const key of Object.keys(map)) {
      knownKeys.add(key);
    }
    for (const key of Object.keys(TRANSLATIONS)) {
      knownKeys.add(key);
    }
  }
  const coverage: Record<string, { missing: string[] }> = {};
  for (const locale of SUPPORTED_LOCALES) {
    const missing = [...knownKeys].filter((key) => !(TRANSLATIONS[key]?.[locale] ?? CENTRAL_TRANSLATION_REGISTRY[key]?.[locale]));
    coverage[locale] = { missing };
  }
  return coverage;
}

export function hasCompleteLocaleCoverage() {
  return Object.values(getLocaleCoverage()).every((entry) => entry.missing.length === 0);
}

export function resolveLocaleText(key: string, locale: Locale): string {
  const legacyValue = TRANSLATIONS[key]?.[locale];
  if (legacyValue) return legacyValue;
  const centralValue = CENTRAL_TRANSLATION_REGISTRY[key]?.[locale];
  if (centralValue) return centralValue;
  const fallback = CENTRAL_TRANSLATION_REGISTRY[key]?.en ?? TRANSLATIONS[key]?.en ?? key;
  return fallback;
}

export function resolveStatusLabel(status: string, locale: Locale): string {
  const normalized = String(status || '').toLowerCase();
  return STATUS_TRANSLATIONS[normalized as keyof typeof STATUS_TRANSLATIONS]?.[locale] ?? normalized;
}

export function resolveAssetTypeLabel(type: string, locale: Locale): string {
  const normalized = String(type || '').toLowerCase();
  return ASSET_TYPE_TRANSLATIONS[normalized as keyof typeof ASSET_TYPE_TRANSLATIONS]?.[locale] ?? type || 'Other';
}

export const localeCompliance = { supported: [...SUPPORTED_LOCALES], rtl: ['ar'], hasCompleteCoverage: hasCompleteLocaleCoverage() };
