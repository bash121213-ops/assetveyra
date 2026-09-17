import type { Locale } from '@/lib/i18n';
import { BASE_TRANSLATIONS } from '@/lib/i18nBase';
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
  'Checking your account…': { en: 'Checking your account…', ar: 'جارٍ التحقق من حسابك…', zh: '正在检查您的账户……', es: 'Comprobando su cuenta…', fr: 'Vérification de votre compte…' },
  'Transaction Agreement': { en: 'Transaction Agreement', ar: 'اتفاقية المعاملة', zh: '交易协议', es: 'Acuerdo de transacción', fr: 'Accord de transaction' },
  '1% transaction fee, non-circumvention and service terms': { en: '1% transaction fee, non-circumvention and service terms', ar: 'رسوم معاملة بنسبة 1% وشروط عدم الالتفاف وشروط الخدمة', zh: '1%交易费、禁止规避及服务条款', es: 'Comisión de transacción del 1 %, términos de no elusión y condiciones del servicio', fr: 'Frais de transaction de 1 %, conditions de non-contournement et conditions de service' },
  Overview: { en: 'Overview', ar: 'نظرة عامة', zh: '概览', es: 'Descripción general', fr: 'Vue d’ensemble' },
  'Additional Information': { en: 'Additional Information', ar: 'معلومات إضافية', zh: '其他信息', es: 'Información adicional', fr: 'Informations complémentaires' },
  Assets: { en: 'Assets', ar: 'الأصول', zh: '资产', es: 'Activos', fr: 'Actifs' },
  MARKETPLACE: { en: 'MARKETPLACE', ar: 'السوق', zh: '市场', es: 'MERCADO', fr: 'MARCHÉ' },
  'MY ASSETS': { en: 'MY ASSETS', ar: 'أصولي', zh: 'أصولي', es: 'MIS ACTIVOS', fr: 'MES ACTIFS' },
  'Manage submitted assets and their controlled verification and publication status.': { en: 'Manage submitted assets and their controlled verification and publication status.', ar: 'إدارة الأصول المقدمة وحالة التحقق والنشر المنضبطة الخاصة بها.', zh: '管理已提交资产及其受控验证和发布状态。', es: 'Gestione los activos enviados y su estado controlado de verificación y publicación.', fr: 'Gérez les actifs soumis ainsi que leur statut contrôlé de vérification et de publication.' },
  TRANSACTION: { en: 'TRANSACTION', ar: 'المعاملة', zh: '交易', es: 'TRANSACCIÓN', fr: 'TRANSACTION' },
  Transaction: { en: 'Transaction', ar: 'المعاملة', zh: '交易', es: 'Transacción', fr: 'Transaction' },
  'Asset value': { en: 'Asset value', ar: 'قيمة الأصل', zh: '资产价值', es: 'Valor del activo', fr: 'Valeur de l’actif' },
  'Target closing': { en: 'Target closing', ar: 'الإغلاق المستهدف', zh: '目标交割', es: 'Cierre previsto', fr: 'Clôture cible' },
  'Accepted offer': { en: 'Accepted offer', ar: 'العرض المقبول', zh: '已接受报价', es: 'Oferta aceptada', fr: 'Offre acceptée' },
  Recorded: { en: 'Recorded', ar: 'مسجل', zh: '已记录', es: 'Registrado', fr: 'Enregistré' },
  'CONTROLLED ACCESS': { en: 'CONTROLLED ACCESS', ar: 'الوصول المنضبط', zh: '受控访问', es: 'ACCESO CONTROLADO', fr: 'ACCÈS CONTRÔLÉ' },
  'Data Rooms': { en: 'Data Rooms', ar: 'غرف البيانات', zh: '数据室', es: 'Salas de datos', fr: 'Data rooms' },
  'Confidential disclosure remains inside the transaction context. Access is controlled by the existing data-room and NDA rules.': { en: 'Confidential disclosure remains inside the transaction context. Access is controlled by the existing data-room and NDA rules.', ar: 'يبقى الإفصاح السري ضمن سياق المعاملة. ويخضع الوصول لقواعد غرفة البيانات واتفاقية عدم الإفصاح الحالية.', zh: '机密披露仅限于交易范围内。访问受现有数据室和保密协议规则控制。', es: 'La divulgación confidencial permanece dentro del contexto de la transacción. El acceso se controla mediante las reglas existentes de la sala de datos y la NDA.', fr: 'La divulgation confidentielle reste dans le contexte de la transaction. L’accès est contrôlé par les règles existantes de la data room et de la NDA.' },
  'NDA required': { en: 'NDA required', ar: 'اتفاقية عدم الإفصاح مطلوبة', zh: '需要保密协议', es: 'NDA obligatoria', fr: 'NDA requise' },
  'NDA optional': { en: 'NDA optional', ar: 'اتفاقية عدم الإفصاح اختيارية', zh: '保密协议可选', es: 'NDA opcional', fr: 'NDA facultative' },
  'Open Data Room →': { en: 'Open Data Room →', ar: 'فتح غرفة البيانات ←', zh: '打开数据室 →', es: 'Abrir sala de datos →', fr: 'Ouvrir la data room →' },
  'No data room currently linked.': { en: 'No data room currently linked.', ar: 'لا توجد غرفة بيانات مرتبطة حاليًا.', zh: '目前没有关联的数据室。', es: 'No hay ninguna sala de datos vinculada actualmente.', fr: 'Aucune data room n’est actuellement liée.' },
  'A controlled data room may be created when the transaction reaches the appropriate disclosure stage.': { en: 'A controlled data room may be created when the transaction reaches the appropriate disclosure stage.', ar: 'يمكن إنشاء غرفة بيانات منضبطة عندما تصل المعاملة إلى مرحلة الإفصاح المناسبة.', zh: '当交易达到适当的披露阶段时，可以创建受控数据室。', es: 'Puede crearse una sala de datos controlada cuando la transacción alcance la etapa de divulgación adecuada.', fr: 'Une data room contrôlée peut être créée lorsque la transaction atteint l’étape de divulgation appropriée.' },
  'TRANSACTION HISTORY': { en: 'TRANSACTION HISTORY', ar: 'سجل المعاملة', zh: '交易历史', es: 'HISTORIAL DE TRANSACCIONES', fr: 'HISTORIQUE DE LA TRANSACTION' },
  'Recorded transaction events': { en: 'Recorded transaction events', ar: 'أحداث المعاملة المسجلة', zh: '已记录的交易事件', es: 'Eventos de transacción registrados', fr: 'Événements de transaction enregistrés' },
  'No events recorded.': { en: 'No events recorded.', ar: 'لم يتم تسجيل أي أحداث.', zh: '尚未记录任何事件。', es: 'No se han registrado eventos.', fr: 'Aucun événement enregistré.' },
  'NEXT CONTROLLED STEP': { en: 'NEXT CONTROLLED STEP', ar: 'الخطوة المنضبطة التالية', zh: '下一受控步骤', es: 'SIGUIENTE PASO CONTROLADO', fr: 'PROCHAINE ÉTAPE CONTRÔLÉE' },
  Completed: { en: 'Completed', ar: 'مكتمل', zh: '已完成', es: 'Completado', fr: 'Terminé' },
  'Advance the transaction only when the current legal, diligence and commercial gate has been satisfied.': { en: 'Advance the transaction only when the current legal, diligence and commercial gate has been satisfied.', ar: 'تابع المعاملة فقط بعد استيفاء المتطلبات القانونية والعناية الواجبة والتجارية الحالية.', zh: '仅在当前法律、尽职调查和商业关卡满足后推进交易。', es: 'Avance la transacción solo cuando se hayan cumplido las condiciones legales, de diligencia y comerciales actuales.', fr: 'Faites avancer la transaction uniquement lorsque les conditions juridiques, de due diligence et commerciales actuelles sont remplies.' },
  'Execution note': { en: 'Execution note', ar: 'ملاحظة التنفيذ', zh: '执行备注', es: 'Nota de ejecución', fr: 'Note d’exécution' },
  'Advance transaction': { en: 'Advance transaction', ar: 'متابعة المعاملة', zh: '推进交易', es: 'Avanzar la transacción', fr: 'Faire avancer la transaction' },
  TRANSACTIONS: { en: 'TRANSACTIONS', ar: 'المعاملات', zh: '交易', es: 'TRANSACCIONES', fr: 'TRANSACTIONS' },
  'Follow each transaction through its controlled lifecycle from initiation to closing.': { en: 'Follow each transaction through its controlled lifecycle from initiation to closing.', ar: 'تابع كل معاملة عبر دورة حياتها المنضبطة من البدء حتى الإغلاق.', zh: '从启动到交割，跟踪每笔交易的受控生命周期。', es: 'Siga cada transacción durante su ciclo de vida controlado desde el inicio hasta el cierre.', fr: 'Suivez chaque transaction dans son cycle de vie contrôlé, de l’initiation à la clôture.' },
  ACTIVE: { en: 'ACTIVE', ar: 'نشطة', zh: '进行中', es: 'ACTIVAS', fr: 'ACTIVES' },
  'Active Transactions': { en: 'Active Transactions', ar: 'المعاملات النشطة', zh: '进行中的交易', es: 'Transacciones activas', fr: 'Transactions actives' },
  'Open →': { en: 'Open →', ar: 'فتح ←', zh: '打开 →', es: 'Abrir →', fr: 'Ouvrir →' },
  'No active transactions.': { en: 'No active transactions.', ar: 'لا توجد معاملات نشطة.', zh: '暂无进行中的交易。', es: 'No hay transacciones activas.', fr: 'Aucune transaction active.' },
  COMPLETED: { en: 'COMPLETED', ar: 'مكتملة', zh: '已完成', es: 'COMPLETADAS', fr: 'TERMINÉES' },
  'Completed Transactions': { en: 'Completed Transactions', ar: 'المعاملات المكتملة', zh: '已完成的交易', es: 'Transacciones completadas', fr: 'Transactions terminées' },
  'No completed transactions yet.': { en: 'No completed transactions yet.', ar: 'لا توجد معاملات مكتملة بعد.', zh: '暂无已完成的交易。', es: 'Aún no hay transacciones completadas.', fr: 'Aucune transaction terminée pour le moment.' },
  'Due diligence': { en: 'Due diligence', ar: 'العناية الواجبة', zh: '尽职调查', es: 'Due diligence', fr: 'Due diligence' },
  'MY INTERESTS': { en: 'MY INTERESTS', ar: 'اهتماماتي', zh: '我的意向', es: 'MIS INTERESES', fr: 'MES INTÉRÊTS' },
  'One place to track opportunity interest and its controlled progression toward a transaction.': { en: 'One place to track opportunity interest and its controlled progression toward a transaction.', ar: 'مكان واحد لمتابعة الاهتمام بالفرص وتقدمها المنضبط نحو المعاملة.', zh: '在一个地方跟踪机会意向及其向交易推进的受控过程。', es: 'Un solo lugar para seguir el interés en oportunidades y su avance controlado hacia una transacción.', fr: 'Un seul endroit pour suivre les intérêts dans les opportunités et leur progression contrôlée vers une transaction.' },
  'Opportunities I requested': { en: 'Opportunities I requested', ar: 'الفرص التي طلبتها', zh: '我申请的机会', es: 'Oportunidades que solicité', fr: 'Opportunités demandées' },
  'Interest in your opportunities': { en: 'Interest in your opportunities', ar: 'الاهتمام بفرصك', zh: '对您机会的意向', es: 'Interés en sus oportunidades', fr: 'Intérêt pour vos opportunités' },
  'Investor organization': { en: 'Investor organization', ar: 'مؤسسة المستثمر', zh: '投资者机构', es: 'Organización del inversor', fr: 'Organisation de l’investisseur' },
  'Review →': { en: 'Review →', ar: 'مراجعة ←', zh: '查看 →', es: 'Revisar →', fr: 'Examiner →' },
  'No interests available for this account.': { en: 'No interests available for this account.', ar: 'لا توجد اهتمامات متاحة لهذا الحساب.', zh: '此账户暂无意向记录。', es: 'No hay intereses disponibles para esta cuenta.', fr: 'Aucun intérêt disponible pour ce compte.' },
  'Interest records appear here when your organization participates in an opportunity.': { en: 'Interest records appear here when your organization participates in an opportunity.', ar: 'تظهر سجلات الاهتمام هنا عندما تشارك مؤسستك في فرصة.', zh: '当您的机构参与机会时，意向记录会显示在这里。', es: 'Los registros de interés aparecen aquí cuando su organización participa en una oportunidad.', fr: 'Les enregistrements d’intérêt apparaissent ici lorsque votre organisation participe à une opportunité.' },
  'Admin Console': { en: 'Admin Console', ar: 'لوحة الإدارة', zh: '管理控制台', es: 'Consola de administración', fr: 'Console d’administration' },
  'Your authenticated view of opportunities, interests and transactions.': { en: 'Your authenticated view of opportunities, interests and transactions.', ar: 'عرضك الموثق للفرص والاهتمامات والمعاملات.', zh: '您经过身份验证的机会、意向和交易视图。', es: 'Su vista autenticada de oportunidades, intereses y transacciones.', fr: 'Votre vue authentifiée des opportunités, intérêts et transactions.' },
  'NEXT STEPS': { en: 'NEXT STEPS', ar: 'الخطوات التالية', zh: '下一步', es: 'PRÓXIMOS PASOS', fr: 'PROCHAINES ÉTAPES' },
  'Your activity': { en: 'Your activity', ar: 'نشاطك', zh: '您的活动', es: 'Su actividad', fr: 'Votre activité' },
  'Explore opportunities': { en: 'Explore opportunities', ar: 'استكشف الفرص', zh: '探索机会', es: 'Explorar oportunidades', fr: 'Explorer les opportunités' },
  'Review the available real-estate opportunities and open an opportunity to see its permitted details.': { en: 'Review the available real-estate opportunities and open an opportunity to see its permitted details.', ar: 'راجع الفرص العقارية المتاحة وافتح فرصة لعرض تفاصيلها المسموح بها.', zh: '查看可用的房地产机会，并打开机会以查看获准的信息。', es: 'Revise las oportunidades inmobiliarias disponibles y abra una para ver sus detalles permitidos.', fr: 'Consultez les opportunités immobilières disponibles et ouvrez-en une pour voir les détails autorisés.' },
  'Open Marketplace →': { en: 'Open Marketplace →', ar: 'فتح السوق ←', zh: '打开市场 →', es: 'Abrir mercado →', fr: 'Ouvrir le marché →' },
  'Track qualification, NDA, data-room and diligence progress for opportunities you requested.': { en: 'Track qualification, NDA, data-room and diligence progress for opportunities you requested.', ar: 'تابع تقدم التأهيل واتفاقية عدم الإفصاح وغرفة البيانات والعناية الواجبة للفرص التي طلبتها.', zh: '跟踪您申请的机会的资格审查、保密协议、数据室和尽职调查进度。', es: 'Siga el progreso de cualificación, NDA, sala de datos y diligencia de las oportunidades que solicitó.', fr: 'Suivez l’avancement de la qualification, de la NDA, de la data room et de la due diligence des opportunités demandées.' },
  'Open My Interests →': { en: 'Open My Interests →', ar: 'فتح اهتماماتي ←', zh: '打开我的意向 →', es: 'Abrir mis intereses →', fr: 'Ouvrir mes intérêts →' },
  'Follow active transactions through their controlled lifecycle to closing.': { en: 'Follow active transactions through their controlled lifecycle to closing.', ar: 'تابع المعاملات النشطة عبر دورتها المنضبطة حتى الإغلاق.', zh: '跟踪进行中的交易，直至其受控生命周期完成交割。', es: 'Siga las transacciones activas durante su ciclo de vida controlado hasta el cierre.', fr: 'Suivez les transactions actives dans leur cycle de vie contrôlé jusqu’à la clôture.' },
  'Open Transactions →': { en: 'Open Transactions →', ar: 'فتح المعاملات ←', zh: '打开交易 →', es: 'Abrir transacciones →', fr: 'Ouvrir les transactions →' },
  'Open My Assets →': { en: 'Open My Assets →', ar: 'فتح أصولي ←', zh: '打开我的资产 →', es: 'Abrir mis activos →', fr: 'Ouvrir mes actifs →' },
  'RECENT ACTIVITY': { en: 'RECENT ACTIVITY', ar: 'النشاط الأخير', zh: '最近活动', es: 'ACTIVIDAD RECIENTE', fr: 'ACTIVITÉ RÉCENTE' },
  'Recent transactions': { en: 'Recent transactions', ar: 'المعاملات الأخيرة', zh: '最近交易', es: 'Transacciones recientes', fr: 'Transactions récentes' },
  'No active transactions yet.': { en: 'No active transactions yet.', ar: 'لا توجد معاملات نشطة بعد.', zh: '暂无进行中的交易。', es: 'Aún no hay transacciones activas.', fr: 'Aucune transaction active pour le moment.' },
  'Your transaction records will appear here after an offer is accepted.': { en: 'Your transaction records will appear here after an offer is accepted.', ar: 'ستظهر سجلات معاملاتك هنا بعد قبول عرض.', zh: '接受报价后，您的交易记录会显示在这里。', es: 'Sus registros de transacciones aparecerán aquí después de aceptar una oferta.', fr: 'Vos enregistrements de transactions apparaîtront ici après l’acceptation d’une offre.' },
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
  'AssetVeyra is a marketplace, not an investment advisor.': { en: 'AssetVeyra is a marketplace, not an investment advisor.', ar: 'AssetVeyra منصة لعرض الفرص وتنسيق المعاملات وليست مستشارًا استثماريًا.', zh: 'AssetVeyra 是机会展示和交易协调平台，不是投资顾问。', es: 'AssetVeyra es una plataforma de oportunidades y coordinación de transacciones, no un asesor de inversiones.', fr: 'AssetVeyra est une plateforme d’opportunités et de coordination des transactions, et non un conseiller en investissement.' },
};

export const CENTRAL_TRANSLATION_REGISTRY: Record<string, TranslationSet> = {
  ...BASE_TRANSLATIONS,
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
