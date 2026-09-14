export const SUPPORTED_LOCALES = ['en', 'ar', 'zh', 'es', 'fr'] as const;
export type Locale = (typeof SUPPORTED_LOCALES)[number];

export const LOCALE_LABELS: Record<Locale, string> = {
  en: 'English',
  ar: 'العربية',
  zh: '中文',
  es: 'Español',
  fr: 'Français',
};

export const RTL_LOCALES = new Set<Locale>(['ar']);

export function normalizeLocale(value?: string | null): Locale {
  const base = (value ?? '').toLowerCase().split('-')[0];
  return (SUPPORTED_LOCALES as readonly string[]).includes(base) ? (base as Locale) : 'en';
}

export function detectLocaleFromLanguages(languages: readonly string[]): Locale {
  for (const language of languages) {
    const locale = normalizeLocale(language);
    if ((SUPPORTED_LOCALES as readonly string[]).includes(locale)) return locale;
  }
  return 'en';
}

type TranslationSet = Partial<Record<Locale, string>>;

// Core UI translations. Page/domain dictionaries stay in their dedicated modules.
const CORE_TRANSLATIONS: Record<string, TranslationSet> = {
  Platform: { en: 'Platform', ar: 'المنصة', es: 'Plataforma', fr: 'Plateforme', zh: '平台' },
  Workflow: { en: 'Workflow', ar: 'سير العمل', es: 'Flujo de trabajo', fr: 'Flux de travail', zh: '工作流程' },
  Opportunities: { en: 'Opportunities', ar: 'الفرص', es: 'Oportunidades', fr: 'Opportunités', zh: '投资机会' },
  'Sign in': { en: 'Sign in', ar: 'تسجيل الدخول', es: 'Iniciar sesión', fr: 'Se connecter', zh: '登录' },
  'Sign out': { en: 'Sign out', ar: 'تسجيل الخروج', es: 'Cerrar sesión', fr: 'Se déconnecter', zh: '退出登录' },
  Marketplace: { en: 'Marketplace', ar: 'السوق', es: 'Mercado', fr: 'Marché', zh: '市场' },
  Workspace: { en: 'Workspace', ar: 'مساحة العمل', es: 'Espacio de trabajo', fr: 'Espace de travail', zh: '工作区' },
  'Submit an asset': { en: 'Submit an asset', ar: 'تقديم أصل', es: 'Enviar un activo', fr: 'Soumettre un actif', zh: '提交资产' },
  'Explore opportunities': { en: 'Explore opportunities', ar: 'استكشف الفرص', es: 'Explorar oportunidades', fr: 'Explorer les opportunités', zh: '探索机会' },
  Home: { en: 'Home', ar: 'الرئيسية', es: 'Inicio', fr: 'Accueil', zh: '首页' },
  Details: { en: 'Details', ar: 'التفاصيل', es: 'Detalles', fr: 'Détails', zh: '详情' },
  Dashboard: { en: 'Dashboard', ar: 'لوحة التحكم', es: 'Panel', fr: 'Tableau de bord', zh: '控制面板' },
  Login: { en: 'Login', ar: 'تسجيل الدخول', es: 'Iniciar sesión', fr: 'Se connecter', zh: '登录' },
  'Sign Up': { en: 'Sign Up', ar: 'إنشاء حساب', es: 'Registrarse', fr: 'Créer un compte', zh: '注册' },
  About: { en: 'About', ar: 'من نحن', es: 'Nosotros', fr: 'À propos', zh: '关于我们' },
  Contact: { en: 'Contact', ar: 'اتصل بنا', es: 'Contacto', fr: 'Contact', zh: '联系我们' },
  Legal: { en: 'Legal', ar: 'قانوني', es: 'Legal', fr: 'Mentions légales', zh: '法律信息' },
  'View Opportunities': { en: 'View Opportunities', ar: 'استكشف الفرص', es: 'Ver oportunidades', fr: 'Voir les opportunités', zh: '查看投资机会' },
  'Request Access': { en: 'Request Access', ar: 'طلب الوصول', es: 'Solicitar acceso', fr: 'Demander l’accès', zh: '申请访问' },
  'Opportunity Details': { en: 'Opportunity Details', ar: 'تفاصيل الفرصة', es: 'Detalles de la oportunidad', fr: 'Détails de l’opportunité', zh: '投资机会详情' },
  'User Dashboard': { en: 'User Dashboard', ar: 'لوحة تحكم المستخدم', es: 'Panel del usuario', fr: 'Tableau de bord utilisateur', zh: '用户控制面板' },
  Sector: { en: 'Sector', ar: 'القطاع', es: 'Sector', fr: 'Secteur', zh: '行业' },
  Size: { en: 'Size', ar: 'المساحة', es: 'Superficie', fr: 'Surface', zh: '面积' },
  ROI: { en: 'ROI', ar: 'العائد على الاستثمار', es: 'ROI', fr: 'ROI', zh: '投资回报率' },
  Region: { en: 'Region', ar: 'المنطقة', es: 'Región', fr: 'Région', zh: '地区' },
  Status: { en: 'Status', ar: 'الحالة', es: 'Estado', fr: 'Statut', zh: '状态' },
  Pending: { en: 'Pending', ar: 'قيد المراجعة', es: 'Pendiente', fr: 'En attente', zh: '待审核' },
  'SECURE ACCESS': { en: 'SECURE ACCESS', ar: 'دخول آمن', es: 'ACCESO SEGURO', fr: 'ACCÈS SÉCURISÉ', zh: '安全访问' },
  'Create account': { en: 'Create account', ar: 'إنشاء حساب', es: 'Crear cuenta', fr: 'Créer un compte', zh: '创建账户' },
  Email: { en: 'Email', ar: 'البريد الإلكتروني', es: 'Correo electrónico', fr: 'E-mail', zh: '电子邮件' },
  Password: { en: 'Password', ar: 'كلمة المرور', es: 'Contraseña', fr: 'Mot de passe', zh: '密码' },
  'Processing…': { en: 'Processing…', ar: 'جارٍ المعالجة…', es: 'Procesando…', fr: 'Traitement…', zh: '处理中…' },
  Name: { en: 'Name', ar: 'الاسم', es: 'Nombre', fr: 'Nom', zh: '姓名' },
  Phone: { en: 'Phone', ar: 'الهاتف', es: 'Teléfono', fr: 'Téléphone', zh: '电话' },
  '(optional)': { en: '(optional)', ar: '(اختياري)', es: '(opcional)', fr: '(facultatif)', zh: '（可选）' },
  'Contact Us': { en: 'Contact Us', ar: 'اتصل بنا', es: 'Contáctenos', fr: 'Nous contacter', zh: '联系我们' },
  'Legal Information': { en: 'Legal Information', ar: 'المعلومات القانونية', es: 'Información legal', fr: 'Informations légales', zh: '法律信息' },
};

export function translate(key: string, locale: Locale): string {
  return CORE_TRANSLATIONS[key]?.[locale] ?? key;
}

export const CORE_TRANSLATION_KEYS = Object.freeze(Object.keys(CORE_TRANSLATIONS));
