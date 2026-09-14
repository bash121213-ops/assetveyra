export const SUPPORTED_LOCALES = ['en', 'ar', 'zh', 'es', 'fr'] as const;
export type Locale = (typeof SUPPORTED_LOCALES)[number];
export const LOCALE_LABELS: Record<Locale,string> = {
  en:'English', ar:'العربية', zh:'中文', es:'Español', fr:'Français'
};
export const RTL_LOCALES = new Set<Locale>(['ar']);
export function normalizeLocale(value?: string|null): Locale {
  const base=(value??'').toLowerCase().split('-')[0];
  return (SUPPORTED_LOCALES as readonly string[]).includes(base) ? base as Locale : 'en';
}
export function detectLocaleFromLanguages(languages: readonly string[]): Locale {
  for(const language of languages){
    const base=(language??'').toLowerCase().split('-')[0];
    if((SUPPORTED_LOCALES as readonly string[]).includes(base)) return base as Locale;
  }
  return 'en';
}
type TranslationSet = Partial<Record<Locale,string>>;
const CORE_TRANSLATIONS: Record<string,TranslationSet> = {
  Platform:{en:'Platform',ar:'المنصة',zh:'平台',es:'Plataforma',fr:'Plateforme'},
  Workflow:{en:'Workflow',ar:'سير العمل',zh:'工作流程',es:'Flujo de trabajo',fr:'Flux de travail'},
  Opportunities:{en:'Opportunities',ar:'الفرص',zh:'投资机会',es:'Oportunidades',fr:'Opportunités'},
  'Sign in':{en:'Sign in',ar:'تسجيل الدخول',zh:'登录',es:'Iniciar sesión',fr:'Se connecter'},
  'Sign out':{en:'Sign out',ar:'تسجيل الخروج',zh:'退出登录',es:'Cerrar sesión',fr:'Se déconnecter'},
  Marketplace:{en:'Marketplace',ar:'السوق',zh:'市场',es:'Mercado',fr:'Marché'},
  Workspace:{en:'Workspace',ar:'مساحة العمل',zh:'工作区',es:'Espacio de trabajo',fr:'Espace de travail'},
  Home:{en:'Home',ar:'الرئيسية',zh:'首页',es:'Inicio',fr:'Accueil'},
  Details:{en:'Details',ar:'التفاصيل',zh:'详情',es:'Detalles',fr:'Détails'},
  Dashboard:{en:'Dashboard',ar:'لوحة التحكم',zh:'控制面板',es:'Panel',fr:'Tableau de bord'},
  Login:{en:'Login',ar:'تسجيل الدخول',zh:'登录',es:'Iniciar sesión',fr:'Se connecter'},
  'Sign Up':{en:'Sign Up',ar:'إنشاء حساب',zh:'注册',es:'Registrarse',fr:'Créer un compte'},
  About:{en:'About',ar:'من نحن',zh:'关于我们',es:'Nosotros',fr:'À propos'},
  Contact:{en:'Contact',ar:'اتصل بنا',zh:'联系我们',es:'Contacto',fr:'Contact'},
  Legal:{en:'Legal',ar:'قانوني',zh:'法律信息',es:'Legal',fr:'Mentions légales'},
  Sector:{en:'Sector',ar:'القطاع',zh:'行业',es:'Sector',fr:'Secteur'},
  Size:{en:'Size',ar:'المساحة',zh:'面积',es:'Superficie',fr:'Surface'},
  ROI:{en:'ROI',ar:'العائد على الاستثمار',zh:'投资回报率',es:'ROI',fr:'ROI'},
  Region:{en:'Region',ar:'المنطقة',zh:'地区',es:'Región',fr:'Région'},
  Status:{en:'Status',ar:'الحالة',zh:'状态',es:'Estado',fr:'Statut'},
  Pending:{en:'Pending',ar:'قيد المراجعة',zh:'待审核',es:'Pendiente',fr:'En attente'},
  Email:{en:'Email',ar:'البريد الإلكتروني',zh:'电子邮件',es:'Correo electrónico',fr:'E-mail'},
  Password:{en:'Password',ar:'كلمة المرور',zh:'密码',es:'Contraseña',fr:'Mot de passe'},
  Name:{en:'Name',ar:'الاسم',zh:'姓名',es:'Nombre',fr:'Nom'},
  Phone:{en:'Phone',ar:'الهاتف',zh:'电话',es:'Teléfono',fr:'Téléphone'},
  'Create account':{en:'Create account',ar:'إنشاء حساب',zh:'创建账户',es:'Crear cuenta',fr:'Créer un compte'},
  'Contact Us':{en:'Contact Us',ar:'اتصل بنا',zh:'联系我们',es:'Contáctenos',fr:'Nous contacter'},
  'Legal Information':{en:'Legal Information',ar:'المعلومات القانونية',zh:'法律信息',es:'Información legal',fr:'Informations légales'},
  'View Opportunities':{en:'View Opportunities',ar:'استكشف الفرص',zh:'查看投资机会',es:'Ver oportunidades',fr:'Voir les opportunités'},
  'Request Access':{en:'Request Access',ar:'طلب الوصول',zh:'申请访问',es:'Solicitar acceso',fr:'Demander l’accès'}
};
export function translate(key:string, locale:Locale):string {
  const set=CORE_TRANSLATIONS[key];
  return set?.[locale] ?? set?.en ?? key;
}
export const CORE_TRANSLATION_KEYS=Object.freeze(Object.keys(CORE_TRANSLATIONS));
