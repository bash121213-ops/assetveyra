import type { Locale } from './i18n';

/** Public-page translations for all supported locales. */
export const PUBLIC_TRANSLATIONS: Record<Locale, Record<string, string>> = {
  en: {},
  ar: {
    'ASSETVEYRA CONTACT': 'تواصل مع AssetVeyra',
    'Tell us what you are looking for.': 'أخبرنا بما تبحث عنه.',
    'For investment opportunities, asset submissions and business enquiries. We review the request before sharing controlled information.': 'للاستفسارات الاستثمارية وتقديم الأصول والاستفسارات التجارية. نراجع الطلب قبل مشاركة المعلومات الخاضعة للرقابة.',
    'Name': 'الاسم', 'Email': 'البريد الإلكتروني', 'Phone': 'الهاتف', '(optional)': '(اختياري)',
    'What can we help with?': 'كيف يمكننا مساعدتك؟', 'Investment opportunity': 'فرصة استثمارية', 'Submit an asset': 'إضافة أصل',
    'Partnership': 'شراكة', 'General enquiry': 'استفسار عام', 'Message': 'الرسالة',
    'Briefly tell us what you are looking for.': 'أخبرنا باختصار بما تبحث عنه.', 'Sending…': 'جارٍ الإرسال…', 'Send request': 'إرسال الطلب',
    'Your request has been received. We will review it and respond through the contact details you provided.': 'تم استلام طلبك. سنراجعه ونرد عليك عبر بيانات الاتصال التي قدمتها.',
    'SECURE ACCESS': 'دخول آمن', 'Sign in': 'تسجيل الدخول', 'Create account': 'إنشاء حساب',
    'Access your investor, seller or operations workspace.': 'ادخل إلى مساحة عمل المستثمر أو مالك الأصل أو العمليات الخاصة بك.',
    'Create an account to enter the AssetVeyra transaction network.': 'أنشئ حسابًا للدخول إلى شبكة معاملات AssetVeyra.',
    'Password': 'كلمة المرور', 'Processing…': 'جارٍ المعالجة…', 'Create a new account': 'إنشاء حساب جديد',
    'Already have an account? Sign in': 'لديك حساب بالفعل؟ سجّل الدخول',
    'Account created. Check your email to verify the account, then sign in.': 'تم إنشاء الحساب. تحقق من بريدك الإلكتروني لتأكيد الحساب، ثم سجّل الدخول.',
    'SELLER INTAKE': 'تقديم أصل', 'The record enters verification first. It is not published automatically.': 'يدخل السجل إلى مرحلة التحقق أولًا. ولا يتم نشره تلقائيًا.',
    'Asset title': 'اسم الأصل', 'Asset type': 'نوع الأصل', 'Land': 'أرض', 'Residential': 'سكني', 'Commercial': 'تجاري', 'Hotel': 'فندق',
    'Hospitality': 'ضيافة', 'Industrial': 'صناعي', 'Mixed use': 'متعدد الاستخدامات', 'Development project': 'مشروع تطوير',
    'Infrastructure': 'بنية تحتية', 'Renewable energy': 'طاقة متجددة', 'Other': 'أخرى', 'Country code': 'رمز الدولة', 'City': 'المدينة',
    'Area m²': 'المساحة بالمتر المربع', 'Currency': 'العملة', 'Asking price': 'السعر المطلوب', 'Public summary': 'الملخص العام',
    'Create verification case': 'إنشاء ملف تحقق', 'Workspace': 'مساحة العمل', 'Marketplace': 'السوق', 'GLOBAL MARKETPLACE': 'السوق العالمي',
    'Verified opportunities': 'الفرص الموثقة',
    'Only opportunities that pass the publication gate are displayed. Private diligence and seller records remain protected.': 'تُعرض فقط الفرص التي تجتاز مرحلة اعتماد النشر. وتبقى بيانات العناية الواجبة الخاصة وسجلات مالك الأصل محمية.',
    'The marketplace is temporarily unable to load live inventory.': 'يتعذر تحميل الأصول المتاحة حاليًا في السوق مؤقتًا.',
    'Price on request': 'السعر عند الطلب', 'No published opportunities': 'لا توجد فرص منشورة',
    'Live inventory will appear here after verification and publication approval.': 'ستظهر الأصول المتاحة هنا بعد التحقق والموافقة على النشر.'
  },
  es: {
    'ASSETVEYRA CONTACT': 'CONTACTO ASSETVEYRA', 'Tell us what you are looking for.': 'Cuéntenos qué está buscando.',
    'Name': 'Nombre', 'Email': 'Correo electrónico', 'Phone': 'Teléfono', '(optional)': '(opcional)', 'What can we help with?': '¿En qué podemos ayudarle?',
    'Investment opportunity': 'Oportunidad de inversión', 'Submit an asset': 'Enviar un activo', 'Partnership': 'Colaboración', 'General enquiry': 'Consulta general',
    'Message': 'Mensaje', 'Briefly tell us what you are looking for.': 'Cuéntenos brevemente qué está buscando.', 'Sending…': 'Enviando…', 'Send request': 'Enviar solicitud',
    'SECURE ACCESS': 'ACCESO SEGURO', 'Sign in': 'Iniciar sesión', 'Create account': 'Crear cuenta', 'Password': 'Contraseña', 'Processing…': 'Procesando…',
    'Create a new account': 'Crear una cuenta nueva', 'Already have an account? Sign in': '¿Ya tiene una cuenta? Inicie sesión', 'SELLER INTAKE': 'PRESENTACIÓN DE ACTIVOS',
    'Asset title': 'Nombre del activo', 'Asset type': 'Tipo de activo', 'Land': 'Terreno', 'Residential': 'Residencial', 'Commercial': 'Comercial', 'Hotel': 'Hotel',
    'Hospitality': 'Hostelería', 'Industrial': 'Industrial', 'Mixed use': 'Uso mixto', 'Development project': 'Proyecto de desarrollo', 'Infrastructure': 'Infraestructura',
    'Renewable energy': 'Energía renovable', 'Other': 'Otro', 'Country code': 'Código de país', 'City': 'Ciudad', 'Area m²': 'Superficie m²', 'Currency': 'Moneda',
    'Asking price': 'Precio solicitado', 'Public summary': 'Resumen público', 'Create verification case': 'Crear expediente de verificación', 'Workspace': 'Espacio de trabajo',
    'Marketplace': 'Mercado', 'GLOBAL MARKETPLACE': 'MERCADO GLOBAL', 'Verified opportunities': 'Oportunidades verificadas', 'Price on request': 'Precio bajo consulta',
    'No published opportunities': 'No hay oportunidades publicadas', 'Live inventory will appear here after verification and publication approval.': 'Las oportunidades aparecerán aquí tras la verificación y aprobación de publicación.'
  },
  fr: {
    'ASSETVEYRA CONTACT': 'CONTACT ASSETVEYRA', 'Tell us what you are looking for.': 'Indiquez-nous ce que vous recherchez.', 'Name': 'Nom', 'Email': 'E-mail',
    'Phone': 'Téléphone', '(optional)': '(facultatif)', 'What can we help with?': 'Comment pouvons-nous vous aider ?', 'Investment opportunity': 'Opportunité d’investissement',
    'Submit an asset': 'Soumettre un actif', 'Partnership': 'Partenariat', 'General enquiry': 'Demande générale', 'Message': 'Message',
    'Briefly tell us what you are looking for.': 'Indiquez brièvement ce que vous recherchez.', 'Sending…': 'Envoi…', 'Send request': 'Envoyer la demande',
    'SECURE ACCESS': 'ACCÈS SÉCURISÉ', 'Sign in': 'Se connecter', 'Create account': 'Créer un compte', 'Password': 'Mot de passe', 'Processing…': 'Traitement…',
    'Create a new account': 'Créer un nouveau compte', 'Already have an account? Sign in': 'Vous avez déjà un compte ? Connectez-vous', 'SELLER INTAKE': 'SOUMISSION D’ACTIF',
    'Asset title': 'Nom de l’actif', 'Asset type': 'Type d’actif', 'Land': 'Terrain', 'Residential': 'Résidentiel', 'Commercial': 'Commercial', 'Hotel': 'Hôtel',
    'Hospitality': 'Hôtellerie', 'Industrial': 'Industriel', 'Mixed use': 'Usage mixte', 'Development project': 'Projet de développement', 'Infrastructure': 'Infrastructure',
    'Renewable energy': 'Énergie renouvelable', 'Other': 'Autre', 'Country code': 'Code pays', 'City': 'Ville', 'Area m²': 'Surface m²', 'Currency': 'Devise',
    'Asking price': 'Prix demandé', 'Public summary': 'Résumé public', 'Create verification case': 'Créer un dossier de vérification', 'Workspace': 'Espace de travail',
    'Marketplace': 'Marché', 'GLOBAL MARKETPLACE': 'MARCHÉ MONDIAL', 'Verified opportunities': 'Opportunités vérifiées', 'Price on request': 'Prix sur demande',
    'No published opportunities': 'Aucune opportunité publiée', 'Live inventory will appear here after verification and publication approval.': 'Les opportunités apparaîtront ici après vérification et approbation de la publication.'
  },
  zh: {
    'ASSETVEYRA CONTACT': '联系 AssetVeyra', 'Tell us what you are looking for.': '请告诉我们您正在寻找什么。', 'Name': '姓名', 'Email': '电子邮件', 'Phone': '电话',
    '(optional)': '（可选）', 'What can we help with?': '我们可以如何帮助您？', 'Investment opportunity': '投资机会', 'Submit an asset': '提交资产', 'Partnership': '合作伙伴关系',
    'General enquiry': '一般咨询', 'Message': '留言', 'Briefly tell us what you are looking for.': '请简要说明您的需求。', 'Sending…': '正在发送…', 'Send request': '发送请求',
    'SECURE ACCESS': '安全访问', 'Sign in': '登录', 'Create account': '创建账户', 'Password': '密码', 'Processing…': '处理中…', 'Create a new account': '创建新账户',
    'Already have an account? Sign in': '已有账户？登录', 'SELLER INTAKE': '资产提交', 'Asset title': '资产名称', 'Asset type': '资产类型', 'Land': '土地',
    'Residential': '住宅', 'Commercial': '商业', 'Hotel': '酒店', 'Hospitality': '酒店及旅游业', 'Industrial': '工业', 'Mixed use': '综合用途',
    'Development project': '开发项目', 'Infrastructure': '基础设施', 'Renewable energy': '可再生能源', 'Other': '其他', 'Country code': '国家代码', 'City': '城市',
    'Area m²': '面积 m²', 'Currency': '货币', 'Asking price': '要价', 'Public summary': '公开摘要', 'Create verification case': '创建验证档案', 'Workspace': '工作区',
    'Marketplace': '市场', 'GLOBAL MARKETPLACE': '全球市场', 'Verified opportunities': '已验证机会', 'Price on request': '价格面议', 'No published opportunities': '暂无已发布机会',
    'Live inventory will appear here after verification and publication approval.': '通过验证并获准发布后，真实机会将显示在这里。'
  }
};
