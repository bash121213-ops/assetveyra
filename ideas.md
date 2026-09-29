# AssetVeyra — Design Direction

## الاتجاه المعتمد

**Modern Private Markets / Institutional Real Estate** — واجهة تحريرية هادئة تشبه مذكرة استثمار أو عرض Family Office، لا لوحة SaaS عامة.

## المبادئ

- فصل واضح بين **الاستكشاف العام** و**مساحة العمل المصادق عليها**.
- كثافة بصرية منخفضة: مساحات بيضاء واسعة، خطوط دقيقة، وبطاقات قليلة ذات وزن عالٍ.
- عرض الفرصة كـ **Investment Brief**: قرار استثماري أولي، لا إعلان عقاري استهلاكي.
- إبراز حالة التحقق وحدود المعلومات دون ادعاءات أو أرقام غير معتمدة.
- الحفاظ على التدفق الحالي: Opportunity → Interest → Qualification → NDA → Data Room → Due Diligence → Offer.

## اللغة البصرية

- لوحة ألوان: أبيض، أسود، رمادي فحمي، رمادي فاتح؛ لون إبراز واحد هادئ للـstatus والروابط المهمة فقط.
- تخطيط تحريري: شبكة واسعة، عناوين كبيرة، eyebrow labels صغيرة، وفواصل أفقية دقيقة.
- الصور: إعادة استخدام صور العمارة/الأرض/الساحل الموجودة في المشروع؛ لا صور stock جديدة ولا صور توحي بفرصة غير موثقة.
- الأزرار: أفعال قليلة وواضحة، primary واحد لكل شاشة، وحدود رفيعة بدل ألوان SaaS.
- الحركة: انتقالات قصيرة وهادئة، مع احترام `prefers-reduced-motion`.

## الخط والنص

- عناوين كبيرة ومتماسكة مع وزن متوسط، ونصوص قصيرة قابلة للمسح.
- إظهار البيانات الرقمية بوضوح وبـ LTR داخل RTL عند الحاجة.
- ترجمة واجهة كاملة إلى English / Arabic / Chinese / Spanish / French؛ المحتوى الديناميكي يبقى مصدره بيانات الفرصة ولا يُعاد اختراعه.

## العمارة المعلوماتية

- **Public shell:** Home، Marketplace، Opportunity، How it works، About، Contact، مع Sign in / Create account.
- **Authenticated shell:** Workspace، Interests، Deals، Data Rooms، Assets، Review، Admin؛ لا يظهر في Public shell.
- **Marketplace:** عنوان تحريري + شريط بحث/فلاتر بسيط + نتائج مختارة + حالات loading/error/empty.
- **Opportunity:** نبذة استثمارية، facts grid، verification boundary، transaction path، CTA Interest، ثم Similar opportunities.
- **RTL:** نفس hierarchy مع انعكاس الاتجاه، لا مجرد `text-align: right`؛ يجب أن تنعكس المسافات والـcontrols ومواقع badges.

## حدود المرحلة

لا تغيير في business logic أو Supabase schema أو RLS أو auth أو production data أو Investor Finder أو commission logic أو verification rules. أي سجل قديم متعارض يُعالج بحد العرض الآمن لا بالحذف المباشر.
