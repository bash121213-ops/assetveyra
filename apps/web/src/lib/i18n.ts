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
  const base = (value || '').toLowerCase().split('-')[0];
  return (SUPPORTED_LOCALES as readonly string[]).includes(base) ? (base as Locale) : 'en';
}

export function detectLocaleFromLanguages(languages: readonly string[]): Locale {
  for (const language of languages) {
    const locale = normalizeLocale(language);
    if ((SUPPORTED_LOCALES as readonly string[]).includes(locale)) return locale;
  }
  return 'en';
}

const translations: Record<Locale, Record<string, string>> = {
  en: {},
  ar: {
    'Platform': 'المنصة', 'Workflow': 'سير العمل', 'Opportunities': 'الفرص', 'Sign in': 'تسجيل الدخول',
    'Sign out': 'تسجيل الخروج', 'Marketplace': 'السوق', 'Workspace': 'مساحة العمل', 'Submit an asset': 'إضافة أصل',
    'Explore opportunities': 'استكشف الفرص', 'GLOBAL ASSET & INVESTMENT TRANSACTION INFRASTRUCTURE': 'بنية عالمية للمعاملات والاستثمار في الأصول',
    'GLOBAL MARKETPLACE': 'السوق العالمي', 'Verified opportunities': 'فرص موثقة', 'Investment opportunity': 'فرصة استثمارية',
    'Price on request': 'السعر عند الطلب', 'No published opportunities': 'لا توجد فرص منشورة',
    'Live inventory will appear here after verification and publication approval.': 'ستظهر الفرص الفعلية هنا بعد التحقق والموافقة على النشر.',
    'Only opportunities that pass the publication gate are displayed. Private diligence and seller records remain protected.': 'تظهر فقط الفرص التي اجتازت مرحلة الموافقة على النشر. تبقى إجراءات العناية الواجبة وبيانات البائع محمية.',
    'The marketplace is temporarily unable to load live inventory.': 'يتعذر على السوق تحميل البيانات الفعلية مؤقتًا.',
    'SECURE ACCESS': 'دخول آمن', 'Create account': 'إنشاء حساب', 'Email': 'البريد الإلكتروني', 'Password': 'كلمة المرور',
    'Processing…': 'جارٍ المعالجة…', 'Create a new account': 'إنشاء حساب جديد', 'Already have an account? Sign in': 'لديك حساب بالفعل؟ تسجيل الدخول',
    'Account created. Check your email to verify the account, then sign in.': 'تم إنشاء الحساب. تحقق من بريدك الإلكتروني لتأكيد الحساب ثم سجّل الدخول.',
    'Access your investor, seller or operations workspace.': 'ادخل إلى مساحة عمل المستثمر أو البائع أو العمليات.',
    'Create an account to enter the AssetVeyra transaction network.': 'أنشئ حسابًا للدخول إلى شبكة معاملات AssetVeyra.',
    'CONTROL CENTER': 'مركز التحكم', 'Transaction workspace': 'مساحة معاملاتك', 'Organizations': 'المؤسسات',
    'Published opportunities': 'الفرص المنشورة', 'Pipeline records': 'سجلات المسار', 'YOUR ORGANIZATIONS': 'مؤسساتك',
    'Access and roles': 'الوصول والأدوار', 'LIVE DATA': 'البيانات الحية', 'Recent opportunities': 'أحدث الفرص',
    'View marketplace': 'عرض السوق', 'THE PLATFORM': 'المنصة', 'TRANSACTION LIFECYCLE': 'دورة حياة المعاملة',
    'OPPORTUNITIES': 'الفرص', 'Global investment infrastructure': 'بنية الاستثمار العالمية',
    'From verified asset to executable transaction.': 'من أصل موثق إلى معاملة قابلة للتنفيذ.',
    'Built around the transaction, not the listing.': 'مصممة حول المعاملة، وليس مجرد الإدراج.',
    'A single controlled workflow from intake to closing.': 'سير عمل موحد ومضبوط من الاستلام حتى الإغلاق.',
    'No public opportunities yet': 'لا توجد فرص عامة حتى الآن',
    'Inventory will populate from the live transaction database.': 'ستظهر الفرص من قاعدة بيانات المعاملات الفعلية.',
  },
  es: {
    'Platform': 'Plataforma', 'Workflow': 'Flujo de trabajo', 'Opportunities': 'Oportunidades', 'Sign in': 'Iniciar sesión',
    'Sign out': 'Cerrar sesión', 'Marketplace': 'Mercado', 'Workspace': 'Espacio de trabajo', 'Submit an asset': 'Enviar un activo',
    'Explore opportunities': 'Explorar oportunidades', 'GLOBAL MARKETPLACE': 'MERCADO GLOBAL', 'Verified opportunities': 'Oportunidades verificadas',
    'Investment opportunity': 'Oportunidad de inversión', 'Price on request': 'Precio bajo consulta', 'No published opportunities': 'No hay oportunidades publicadas',
    'Live inventory will appear here after verification and publication approval.': 'El inventario real aparecerá aquí después de la verificación y aprobación de publicación.',
    'SECURE ACCESS': 'ACCESO SEGURO', 'Create account': 'Crear cuenta', 'Email': 'Correo electrónico', 'Password': 'Contraseña',
    'Processing…': 'Procesando…', 'Create a new account': 'Crear una cuenta nueva', 'Already have an account? Sign in': '¿Ya tienes una cuenta? Inicia sesión',
    'CONTROL CENTER': 'CENTRO DE CONTROL', 'Transaction workspace': 'Espacio de transacciones', 'Organizations': 'Organizaciones',
    'Published opportunities': 'Oportunidades publicadas', 'Pipeline records': 'Registros del proceso', 'YOUR ORGANIZATIONS': 'TUS ORGANIZACIONES',
    'Access and roles': 'Acceso y funciones', 'LIVE DATA': 'DATOS EN VIVO', 'Recent opportunities': 'Oportunidades recientes',
    'View marketplace': 'Ver mercado', 'THE PLATFORM': 'LA PLATAFORMA', 'TRANSACTION LIFECYCLE': 'CICLO DE VIDA DE LA TRANSACCIÓN',
    'OPPORTUNITIES': 'OPORTUNIDADES', 'Global investment infrastructure': 'Infraestructura global de inversión',
    'From verified asset to executable transaction.': 'Del activo verificado a una transacción ejecutable.',
    'Built around the transaction, not the listing.': 'Construida alrededor de la transacción, no del anuncio.',
    'A single controlled workflow from intake to closing.': 'Un flujo controlado desde la recepción hasta el cierre.',
    'No public opportunities yet': 'Aún no hay oportunidades públicas',
    'Inventory will populate from the live transaction database.': 'El inventario aparecerá desde la base de datos de transacciones en vivo.',
  },
  fr: {
    'Platform': 'Plateforme', 'Workflow': 'Flux de travail', 'Opportunities': 'Opportunités', 'Sign in': 'Se connecter',
    'Sign out': 'Se déconnecter', 'Marketplace': 'Marché', 'Workspace': 'Espace de travail', 'Submit an asset': 'Soumettre un actif',
    'Explore opportunities': 'Explorer les opportunités', 'GLOBAL MARKETPLACE': 'MARCHÉ MONDIAL', 'Verified opportunities': 'Opportunités vérifiées',
    'Investment opportunity': 'Opportunité d’investissement', 'Price on request': 'Prix sur demande', 'No published opportunities': 'Aucune opportunité publiée',
    'Live inventory will appear here after verification and publication approval.': 'Les actifs réels apparaîtront ici après vérification et approbation de la publication.',
    'SECURE ACCESS': 'ACCÈS SÉCURISÉ', 'Create account': 'Créer un compte', 'Email': 'E-mail', 'Password': 'Mot de passe',
    'Processing…': 'Traitement…', 'Create a new account': 'Créer un nouveau compte', 'Already have an account? Sign in': 'Vous avez déjà un compte ? Connectez-vous',
    'CONTROL CENTER': 'CENTRE DE CONTRÔLE', 'Transaction workspace': 'Espace de transactions', 'Organizations': 'Organisations',
    'Published opportunities': 'Opportunités publiées', 'Pipeline records': 'Dossiers du pipeline', 'YOUR ORGANIZATIONS': 'VOS ORGANISATIONS',
    'Access and roles': 'Accès et rôles', 'LIVE DATA': 'DONNÉES EN DIRECT', 'Recent opportunities': 'Opportunités récentes',
    'View marketplace': 'Voir le marché', 'THE PLATFORM': 'LA PLATEFORME', 'TRANSACTION LIFECYCLE': 'CYCLE DE VIE DE LA TRANSACTION',
    'OPPORTUNITIES': 'OPPORTUNITÉS', 'Global investment infrastructure': 'Infrastructure mondiale d’investissement',
    'From verified asset to executable transaction.': 'De l’actif vérifié à la transaction exécutable.',
    'Built around the transaction, not the listing.': 'Conçue autour de la transaction, et non de la simple annonce.',
    'A single controlled workflow from intake to closing.': 'Un flux contrôlé unique, de la réception à la clôture.',
    'No public opportunities yet': 'Aucune opportunité publique pour le moment',
    'Inventory will populate from the live transaction database.': 'Les opportunités apparaîtront depuis la base de données des transactions en direct.',
  },
  zh: {
    'Platform': '平台', 'Workflow': '工作流程', 'Opportunities': '投资机会', 'Sign in': '登录', 'Sign out': '退出登录',
    'Marketplace': '市场', 'Workspace': '工作区', 'Submit an asset': '提交资产', 'Explore opportunities': '探索机会',
    'GLOBAL MARKETPLACE': '全球市场', 'Verified opportunities': '已验证机会', 'Investment opportunity': '投资机会',
    'Price on request': '价格面议', 'No published opportunities': '暂无已发布机会',
    'Live inventory will appear here after verification and publication approval.': '通过验证并获准发布后，真实资产机会将显示在这里。',
    'SECURE ACCESS': '安全访问', 'Create account': '创建账户', 'Email': '电子邮件', 'Password': '密码', 'Processing…': '处理中…',
    'Create a new account': '创建新账户', 'Already have an account? Sign in': '已有账户？登录',
    'CONTROL CENTER': '控制中心', 'Transaction workspace': '交易工作区', 'Organizations': '组织', 'Published opportunities': '已发布机会',
    'Pipeline records': '流程记录', 'YOUR ORGANIZATIONS': '您的组织', 'Access and roles': '访问权限与角色', 'LIVE DATA': '实时数据',
    'Recent opportunities': '最新机会', 'View marketplace': '查看市场', 'THE PLATFORM': '平台', 'TRANSACTION LIFECYCLE': '交易生命周期',
    'OPPORTUNITIES': '投资机会', 'Global investment infrastructure': '全球投资基础设施',
    'From verified asset to executable transaction.': '从经过验证的资产到可执行的交易。',
    'Built around the transaction, not the listing.': '围绕交易构建，而不仅仅是挂牌。',
    'A single controlled workflow from intake to closing.': '从接收到成交的统一受控流程。',
    'No public opportunities yet': '目前没有公开机会', 'Inventory will populate from the live transaction database.': '真实交易数据库中的机会将在此显示。',
  },
};

export function translate(text: string, locale: Locale): string {
  return translations[locale][text] ?? text;
}
