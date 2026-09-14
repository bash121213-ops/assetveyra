export const SUPPORTED_LOCALES = ['en', 'ar', 'zh', 'es', 'fr', 'de', 'ja', 'ko'] as const;
export type Locale = (typeof SUPPORTED_LOCALES)[number];
export const LOCALE_LABELS: Record<Locale,string> = { en:'English', ar:'العربية', zh:'中文', es:'Español', fr:'Français', de:'Deutsch', ja:'日本語', ko:'한국어' };
export const RTL_LOCALES = new Set<Locale>(['ar']);
export function normalizeLocale(value?: string|null): Locale { const base=(value??'').toLowerCase().split('-')[0]; return (SUPPORTED_LOCALES as readonly string[]).includes(base) ? base as Locale : 'en'; }
export function detectLocaleFromLanguages(languages: readonly string[]): Locale { for(const language of languages){const base=(language??'').toLowerCase().split('-')[0]; if((SUPPORTED_LOCALES as readonly string[]).includes(base)) return base as Locale;} return 'en'; }
type TranslationSet = Partial<Record<Locale,string>>;
const CORE_TRANSLATIONS: Record<string,TranslationSet> = {
Platform:{en:'Platform',ar:'المنصة',zh:'平台',es:'Plataforma',fr:'Plateforme',de:'Plattform',ja:'プラットフォーム',ko:'플랫폼'},
Workflow:{en:'Workflow',ar:'سير العمل',zh:'工作流程',es:'Flujo de trabajo',fr:'Flux de travail',de:'Workflow',ja:'ワークフロー',ko:'워크플로'},
Opportunities:{en:'Opportunities',ar:'الفرص',zh:'投资机会',es:'Oportunidades',fr:'Opportunités',de:'Investitionsmöglichkeiten',ja:'投資機会',ko:'투자 기회'},
'Sign in':{en:'Sign in',ar:'تسجيل الدخول',zh:'登录',es:'Iniciar sesión',fr:'Se connecter',de:'Anmelden',ja:'サインイン',ko:'로그인'},
'Sign out':{en:'Sign out',ar:'تسجيل الخروج',zh:'退出登录',es:'Cerrar sesión',fr:'Se déconnecter',de:'Abmelden',ja:'サインアウト',ko:'로그아웃'},
Marketplace:{en:'Marketplace',ar:'السوق',zh:'市场',es:'Mercado',fr:'Marché',de:'Marktplatz',ja:'マーケットプレイス',ko:'마켓플레이스'},
Workspace:{en:'Workspace',ar:'مساحة العمل',zh:'工作区',es:'Espacio de trabajo',fr:'Espace de travail',de:'Arbeitsbereich',ja:'ワークスペース',ko:'워크스페이스'},
'Home':{en:'Home',ar:'الرئيسية',zh:'首页',es:'Inicio',fr:'Accueil',de:'Startseite',ja:'ホーム',ko:'홈'},
'Details':{en:'Details',ar:'التفاصيل',zh:'详情',es:'Detalles',fr:'Détails',de:'Details',ja:'詳細',ko:'세부 정보'},
'Dashboard':{en:'Dashboard',ar:'لوحة التحكم',zh:'控制面板',es:'Panel',fr:'Tableau de bord',de:'Dashboard',ja:'ダッシュボード',ko:'대시보드'},
'Login':{en:'Login',ar:'تسجيل الدخول',zh:'登录',es:'Iniciar sesión',fr:'Se connecter',de:'Anmelden',ja:'ログイン',ko:'로그인'},
'Sign Up':{en:'Sign Up',ar:'إنشاء حساب',zh:'注册',es:'Registrarse',fr:'Créer un compte',de:'Registrieren',ja:'アカウント登録',ko:'가입'},
'About':{en:'About',ar:'من نحن',zh:'关于我们',es:'Nosotros',fr:'À propos',de:'Über uns',ja:'会社情報',ko:'소개'},
'Contact':{en:'Contact',ar:'اتصل بنا',zh:'联系我们',es:'Contacto',fr:'Contact',de:'Kontakt',ja:'お問い合わせ',ko:'문의'},
'Legal':{en:'Legal',ar:'قانوني',zh:'法律信息',es:'Legal',fr:'Mentions légales',de:'Rechtliches',ja:'法務',ko:'법률'},
'Sector':{en:'Sector',ar:'القطاع',zh:'行业',es:'Sector',fr:'Secteur',de:'Sektor',ja:'セクター',ko:'섹터'},
'Size':{en:'Size',ar:'المساحة',zh:'面积',es:'Superficie',fr:'Surface',de:'Fläche',ja:'面積',ko:'면적'},
'ROI':{en:'ROI',ar:'العائد على الاستثمار',zh:'投资回报率',es:'ROI',fr:'ROI',de:'ROI',ja:'ROI',ko:'ROI'},
'Region':{en:'Region',ar:'المنطقة',zh:'地区',es:'Región',fr:'Région',de:'Region',ja:'地域',ko:'지역'},
'Status':{en:'Status',ar:'الحالة',zh:'状态',es:'Estado',fr:'Statut',de:'Status',ja:'ステータス',ko:'상태'},
'Pending':{en:'Pending',ar:'قيد المراجعة',zh:'待审核',es:'Pendiente',fr:'En attente',de:'Ausstehend',ja:'保留中',ko:'대기 중'},
'Email':{en:'Email',ar:'البريد الإلكتروني',zh:'电子邮件',es:'Correo electrónico',fr:'E-mail',de:'E-Mail',ja:'メールアドレス',ko:'이메일'},
'Password':{en:'Password',ar:'كلمة المرور',zh:'密码',es:'Contraseña',fr:'Mot de passe',de:'Passwort',ja:'パスワード',ko:'비밀번호'},
'Name':{en:'Name',ar:'الاسم',zh:'姓名',es:'Nombre',fr:'Nom',de:'Name',ja:'名前',ko:'이름'},
'Phone':{en:'Phone',ar:'الهاتف',zh:'电话',es:'Teléfono',fr:'Téléphone',de:'Telefon',ja:'電話',ko:'전화'},
'Create account':{en:'Create account',ar:'إنشاء حساب',zh:'创建账户',es:'Crear cuenta',fr:'Créer un compte',de:'Konto erstellen',ja:'アカウントを作成',ko:'계정 만들기'},
'Contact Us':{en:'Contact Us',ar:'اتصل بنا',zh:'联系我们',es:'Contáctenos',fr:'Nous contacter',de:'Kontaktieren Sie uns',ja:'お問い合わせ',ko:'문의하기'},
'Legal Information':{en:'Legal Information',ar:'المعلومات القانونية',zh:'法律信息',es:'Información legal',fr:'Informations légales',de:'Rechtliche Informationen',ja:'法的情報',ko:'법률 정보'},
'View Opportunities':{en:'View Opportunities',ar:'استكشف الفرص',zh:'查看投资机会',es:'Ver oportunidades',fr:'Voir les opportunités',de:'Möglichkeiten ansehen',ja:'投資機会を見る',ko:'투자 기회 보기'},
'Request Access':{en:'Request Access',ar:'طلب الوصول',zh:'申请访问',es:'Solicitar acceso',fr:'Demander l’accès',de:'Zugriff anfordern',ja:'アクセスを申請',ko:'접근 요청'},
};
export function translate(key:string, locale:Locale):string { const set=CORE_TRANSLATIONS[key]; return set?.[locale] ?? set?.en ?? key; }
export const CORE_TRANSLATION_KEYS=Object.freeze(Object.keys(CORE_TRANSLATIONS));
