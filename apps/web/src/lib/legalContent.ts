import type { Locale } from '@/lib/i18n';

export type LegalSection = { title: string; paragraphs?: string[]; bullets?: string[]; body?: string[] };
export type TermsCopy = { eyebrow: string; title: string; updated: string; intro: string; sections: LegalSection[]; notice: string };
export type TransactionCopy = { eyebrow: string; title: string; updated: string; intro: string; sections: LegalSection[]; notice: string };

export const TERMS_COPY: Record<Locale, TermsCopy> = {
  "en": {
    "eyebrow": "LEGAL TERMS",
    "title": "Terms & Conditions of Use",
    "updated": "Effective date: 16 September 2026",
    "intro": "These Terms govern access to and use of AssetVeyra, a real-estate opportunity, matching, intermediation and transaction-support platform. By using the Platform, you acknowledge these Terms. Where a separate written agreement applies to a transaction or service, that agreement also governs the relevant service.",
    "sections": [
      {
        "title": "1. AssetVeyra’s role",
        "paragraphs": [
          "AssetVeyra connects property owners, sellers, buyers, investors and professional service providers and may facilitate discovery, matching, introductions, commercial negotiation, transaction coordination and access to professional services, subject to applicable law and the specific service provided.",
          "AssetVeyra does not acquire properties for its own account and does not represent itself as the owner of a listed property unless that ownership is expressly disclosed. AssetVeyra may act as an intermediary where legally permitted and may use or coordinate with licensed or otherwise authorized partners where a jurisdiction requires a regulated activity to be performed by an authorized person or entity."
        ]
      },
      {
        "title": "2. Requests, matching and negotiation",
        "paragraphs": [
          "A buyer or investor may submit requirements including property type, location, budget, intended use and other transaction criteria. AssetVeyra may search available opportunities and present potential matches.",
          "AssetVeyra may communicate offers and counteroffers and facilitate commercial negotiations between the parties. The final price and commercial terms are determined and accepted by the buyer and seller. AssetVeyra does not compel either party to enter into a transaction."
        ]
      },
      {
        "title": "3. Transaction service fee — 1%",
        "paragraphs": [
          "For a transaction successfully completed through AssetVeyra’s intermediary and transaction-support services, AssetVeyra’s standard transaction service fee is 1% of the final agreed transaction value, unless a different written fee arrangement is expressly agreed for the relevant transaction.",
          "The party responsible for the 1% fee, the completion event that makes the fee due, and the payment timing must be disclosed and agreed in writing. Unless otherwise agreed, the fee is separate from the purchase price of the property.",
          "The 1% fee does not include government charges, registration fees, legal fees, valuation fees, inspection fees, travel, accommodation, transport or other third-party costs. Such costs are payable separately by the party responsible for them."
        ]
      },
      {
        "title": "4. No custody of property funds",
        "paragraphs": [
          "AssetVeyra does not receive, hold, safeguard, control or transfer the purchase price, deposit, earnest money or other funds belonging to the buyer or seller unless a separate legally authorized service is expressly disclosed and agreed.",
          "The purchase price is paid directly between the relevant parties through the applicable legal, banking, registration or conveyancing process. AssetVeyra does not operate as an escrow agent, bank or payment processor for the property purchase price."
        ]
      },
      {
        "title": "5. Legal and professional services",
        "paragraphs": [
          "AssetVeyra may coordinate access to law firms and other professional specialists with whom it has contractual, referral or service relationships. Legal advice and legal work are provided by the relevant law firm under its own professional engagement with the client.",
          "Professional services remain subject to the professional provider’s scope of engagement, qualifications, duties and applicable law. AssetVeyra does not replace the client’s independent legal, tax, valuation, inspection or other professional adviser."
        ]
      },
      {
        "title": "6. Travel and transaction coordination",
        "paragraphs": [
          "Where a transaction requires the client to travel, AssetVeyra may coordinate practical arrangements and introductions connected with the transaction. Travel, accommodation, transport and similar third-party costs are separate from AssetVeyra’s 1% transaction service fee unless expressly agreed otherwise.",
          "AssetVeyra does not guarantee visas, flights, accommodation, governmental appointments or the completion of any transaction."
        ]
      },
      {
        "title": "7. Listings and seller responsibilities",
        "paragraphs": [
          "Property and opportunity information may be supplied by owners, sellers or other authorized parties. A listing party is responsible for having the authority to offer the property or opportunity and for the accuracy and completeness of information supplied to AssetVeyra.",
          "Where verification is offered, the applicable verification scope will be identified. A verification status does not constitute a guarantee of title, value, profitability, future performance or transaction completion. Buyers must conduct appropriate legal and commercial due diligence."
        ]
      },
      {
        "title": "8. Buyer responsibilities",
        "bullets": [
          "Verify ownership, title, authority to sell, encumbrances, restrictions and registration status as appropriate.",
          "Obtain independent legal, tax, valuation, inspection and financial advice where appropriate.",
          "Confirm foreign-ownership, investment, zoning, planning, financing and other jurisdiction-specific requirements.",
          "Review and approve the final sale price and contractual terms before committing to the transaction.",
          "Provide accurate information and documents required for the applicable transaction and compliance process."
        ]
      },
      {
        "title": "9. No guarantee of transaction outcome",
        "paragraphs": [
          "AssetVeyra facilitates and coordinates transactions but cannot guarantee that a buyer and seller will reach agreement, that a transaction will close, that financing will be obtained, or that an asset will achieve any particular value, return or investment result.",
          "Any statement concerning verification, protection, valuation, expected return or transaction security must be understood only within the documented scope of the relevant service and any separate written agreement."
        ]
      },
      {
        "title": "10. Prohibited conduct",
        "bullets": [
          "Providing false, misleading, fraudulent or unauthorized information.",
          "Using AssetVeyra to circumvent an agreed fee or deliberately conceal a transaction introduced or facilitated by AssetVeyra.",
          "Using the Platform for unlawful activity, fraud, money laundering, sanctions evasion or other prohibited conduct.",
          "Accessing confidential information without authorization or sharing protected information contrary to applicable confidentiality obligations."
        ]
      },
      {
        "title": "11. Compliance and jurisdictional restrictions",
        "paragraphs": [
          "AssetVeyra may restrict, suspend or refuse services where required by law, licensing requirements, sanctions, anti-money-laundering controls, foreign-ownership rules, professional regulations or other applicable restrictions.",
          "The legal classification and licensing requirements for intermediary activities can differ by jurisdiction. These Terms do not claim that one regulatory status applies worldwide. AssetVeyra will use an appropriate licensed or authorized structure where required by applicable law."
        ]
      },
      {
        "title": "12. Liability and third parties",
        "paragraphs": [
          "AssetVeyra is not responsible for independent acts, omissions, advice, representations or professional work performed by sellers, buyers, lawyers, valuers, inspectors, banks, government authorities, transport providers, accommodation providers or other third parties.",
          "Nothing in these Terms excludes liability that cannot lawfully be excluded or limited under applicable law. Any contractual liability limitation must be interpreted subject to mandatory legal rights and the specific written agreement applicable to the service."
        ]
      },
      {
        "title": "13. Confidentiality and information",
        "paragraphs": [
          "Users must protect confidential information received through the Platform and use it only for the relevant opportunity or transaction. AssetVeyra may apply access controls, confidentiality terms, qualification requirements and data-room restrictions to sensitive materials."
        ]
      },
      {
        "title": "14. Privacy",
        "paragraphs": [
          "Personal data is handled according to AssetVeyra’s Privacy Policy and applicable data-protection law. Users should review the Privacy Policy before submitting personal or transaction information."
        ]
      },
      {
        "title": "15. Governing law and disputes",
        "paragraphs": [
          "For transactions governed by Jordanian law, the parties will be subject to the applicable laws and competent courts of Jordan unless a separate written agreement provides another lawful arrangement. Cross-border transactions may be subject to mandatory laws and jurisdictional rules in the country where the property or transaction is located."
        ]
      },
      {
        "title": "16. Changes and termination",
        "paragraphs": [
          "AssetVeyra may update these Terms when reasonably necessary. The version applicable to a transaction should be identified in the relevant agreement or acceptance record. AssetVeyra may suspend or terminate access for breach, unlawful conduct, security risk or other legitimate operational reasons."
        ]
      },
      {
        "title": "17. Contact and legal review",
        "paragraphs": [
          "These Terms are intended to describe the operating model of AssetVeyra. They should be reviewed and approved by qualified legal counsel before reliance in a particular jurisdiction, especially where AssetVeyra performs regulated intermediary or brokerage activities."
        ]
      }
    ],
    "notice": "Important: these Terms are platform terms, not a substitute for transaction-specific legal advice. AssetVeyra’s 1% fee applies only as stated in the applicable written agreement and subject to applicable law."
  },
  "ar": {
    "eyebrow": "الشروط القانونية",
    "title": "الشروط والأحكام للاستخدام",
    "updated": "تاريخ السريان: 16 سبتمبر 2026",
    "intro": "تنظم هذه الشروط الدخول إلى AssetVeyra واستخدامها، وهي منصة للفرص العقارية والمطابقة والوساطة ودعم المعاملات. باستخدام المنصة، يقر المستخدم بهذه الشروط. وعند وجود اتفاقية مكتوبة منفصلة لمعاملة أو خدمة معينة، تسري تلك الاتفاقية أيضاً على الخدمة ذات الصلة.",
    "sections": [
      {
        "title": "1. دور AssetVeyra",
        "paragraphs": [
          "تربط AssetVeyra بين مالكي العقارات والبائعين والمشترين والمستثمرين ومقدمي الخدمات المهنية، وقد تقوم بتسهيل اكتشاف الفرص والمطابقة والتعريف بالأطراف والتفاوض التجاري وتنسيق المعاملة والوصول إلى الخدمات المهنية، وفق القانون والخدمة المقدمة.",
          "لا تشتري AssetVeyra العقارات لحسابها الخاص ولا تقدم نفسها كمالك للعقار المدرج إلا إذا تم الإفصاح عن ذلك صراحة. ويجوز لها العمل كوسيط حيث يسمح القانون بذلك، والاستعانة بشركاء مرخصين أو مخولين عندما تتطلب الدولة تنفيذ النشاط المنظم من شخص أو جهة مخولة."
        ]
      },
      {
        "title": "2. الطلبات والمطابقة والتفاوض",
        "paragraphs": [
          "يجوز للمشتري أو المستثمر تقديم متطلباته، بما في ذلك نوع العقار والموقع والميزانية والغرض من الاستخدام ومعايير المعاملة الأخرى. وقد تبحث AssetVeyra عن الفرص المتاحة وتعرض المطابقات المحتملة.",
          "يجوز لـAssetVeyra نقل العروض والعروض المقابلة وتسهيل التفاوض التجاري بين الأطراف. ويحدد المشتري والبائع السعر النهائي والشروط التجارية ويقبلان بها. ولا تجبر AssetVeyra أي طرف على إتمام المعاملة."
        ]
      },
      {
        "title": "3. أتعاب المعاملة — 1%",
        "paragraphs": [
          "عند إتمام معاملة بنجاح من خلال خدمات AssetVeyra للوساطة ودعم المعاملة، تكون أتعاب AssetVeyra القياسية 1% من قيمة المعاملة النهائية المتفق عليها، ما لم يتم الاتفاق كتابياً على ترتيب مختلف للمعاملة المعنية.",
          "يجب الإفصاح كتابياً عن الطرف المسؤول عن دفع نسبة 1%، وعن الحدث الذي يجعل الأتعاب مستحقة، وموعد الدفع. وما لم يتفق على خلاف ذلك، تكون الأتعاب منفصلة عن ثمن العقار.",
          "لا تشمل نسبة 1% الرسوم الحكومية أو رسوم التسجيل أو أتعاب المحامين أو التقييم أو الفحص أو السفر أو الإقامة أو النقل أو أي تكاليف لطرف ثالث. وتدفع هذه التكاليف بصورة منفصلة من الطرف المسؤول عنها."
        ]
      },
      {
        "title": "4. عدم حيازة أموال العقار",
        "paragraphs": [
          "لا تستلم AssetVeyra أو تحتفظ أو تحوز أو تتحكم أو تحول ثمن العقار أو العربون أو الدفعة المقدمة أو أي أموال تخص المشتري أو البائع، إلا إذا تم الإفصاح صراحة عن خدمة منفصلة ومصرح بها قانوناً والاتفاق عليها.",
          "يدفع ثمن العقار مباشرة بين الأطراف المعنية من خلال الإجراءات القانونية أو المصرفية أو إجراءات التسجيل ونقل الملكية المعمول بها. ولا تعمل AssetVeyra كحساب ضمان أو بنك أو معالج دفع لثمن شراء العقار."
        ]
      },
      {
        "title": "5. الخدمات القانونية والمهنية",
        "paragraphs": [
          "يجوز لـAssetVeyra تنسيق الوصول إلى مكاتب المحاماة وغيرها من المختصين المهنيين الذين تربطها بهم تعاقدات أو ترتيبات إحالة أو خدمات. وتقدم المشورة والعمل القانوني الجهة القانونية المعنية بموجب تعاقد مهني مستقل مع العميل.",
          "تبقى الخدمات المهنية خاضعة لنطاق تكليف مقدم الخدمة ومؤهلاته وواجباته والقانون المطبق. ولا تحل AssetVeyra محل المحامي أو المستشار الضريبي أو المقيم أو المفتش أو أي مستشار مهني مستقل للعميل."
        ]
      },
      {
        "title": "6. السفر وتنسيق المعاملة",
        "paragraphs": [
          "عندما تتطلب المعاملة سفر العميل، يجوز لـAssetVeyra تنسيق الترتيبات العملية والتعريف بمقدمي الخدمات المرتبطين بالمعاملة. وتكون تكاليف السفر والإقامة والنقل والتكاليف المماثلة لطرف ثالث منفصلة عن نسبة 1% ما لم يتفق كتابياً على خلاف ذلك.",
          "لا تضمن AssetVeyra الحصول على التأشيرات أو الرحلات أو الإقامة أو المواعيد الحكومية أو إتمام أي معاملة."
        ]
      },
      {
        "title": "7. الإعلانات ومسؤوليات البائع",
        "paragraphs": [
          "قد يقدم مالكو العقارات أو البائعون أو الأطراف المخولة معلومات العقارات والفرص. ويتحمل مقدم الإعلان مسؤولية امتلاكه الصلاحية لعرض العقار أو الفرصة، ودقة واكتمال المعلومات التي يقدمها إلى AssetVeyra.",
          "عند تقديم خدمة تحقق، يتم تحديد نطاق التحقق المعمول به. ولا تعني حالة التحقق ضمان الملكية أو القيمة أو الربحية أو الأداء المستقبلي أو إتمام المعاملة. وعلى المشتري إجراء العناية الواجبة القانونية والتجارية المناسبة."
        ]
      },
      {
        "title": "8. مسؤوليات المشتري",
        "bullets": [
          "التحقق من الملكية وسند الملكية والصلاحية للبيع والقيود والحقوق والرهونات وحالة التسجيل حسب الاقتضاء.",
          "الحصول على المشورة القانونية والضريبية والتقييمية والفنية والمالية المستقلة عند الحاجة.",
          "التحقق من متطلبات تملك الأجانب والاستثمار والتنظيم والتخطيط والتمويل والمتطلبات الخاصة بكل دولة.",
          "مراجعة واعتماد السعر النهائي وشروط العقد قبل الالتزام بالمعاملة.",
          "تقديم معلومات ووثائق صحيحة مطلوبة لإجراءات المعاملة والامتثال."
        ]
      },
      {
        "title": "9. عدم ضمان نتيجة المعاملة",
        "paragraphs": [
          "تقوم AssetVeyra بتسهيل وتنسيق المعاملات، لكنها لا تضمن توصل المشتري والبائع إلى اتفاق أو إتمام البيع أو الحصول على التمويل أو تحقيق العقار لقيمة أو عائد أو نتيجة استثمارية معينة.",
          "أي بيان يتعلق بالتحقق أو الحماية أو التقييم أو العائد المتوقع أو أمان المعاملة يفهم فقط ضمن نطاق الخدمة الموثق وأي اتفاقية مكتوبة منفصلة."
        ]
      },
      {
        "title": "10. السلوك المحظور",
        "bullets": [
          "تقديم معلومات كاذبة أو مضللة أو احتيالية أو غير مصرح بها.",
          "استخدام AssetVeyra للتحايل على الأتعاب المتفق عليها أو إخفاء معاملة تم التعريف بها أو تسهيلها من خلال AssetVeyra.",
          "استخدام المنصة في نشاط غير قانوني أو احتيال أو غسل أموال أو التحايل على العقوبات أو أي نشاط محظور.",
          "الوصول إلى المعلومات السرية دون تصريح أو مشاركة المعلومات المحمية بالمخالفة لالتزامات السرية."
        ]
      },
      {
        "title": "11. الامتثال والقيود القضائية",
        "paragraphs": [
          "يجوز لـAssetVeyra تقييد أو تعليق أو رفض الخدمات عندما يقتضي ذلك القانون أو متطلبات الترخيص أو العقوبات أو ضوابط مكافحة غسل الأموال أو قواعد تملك الأجانب أو الأنظمة المهنية أو غيرها من القيود المطبقة.",
          "قد يختلف التصنيف القانوني ومتطلبات الترخيص للوساطة من دولة إلى أخرى. ولا تدعي هذه الشروط وجود صفة تنظيمية واحدة في جميع الدول. وستستخدم AssetVeyra الهيكل المرخص أو المخول المناسب حيث يفرض القانون ذلك."
        ]
      },
      {
        "title": "12. المسؤولية والأطراف الثالثة",
        "paragraphs": [
          "لا تتحمل AssetVeyra مسؤولية الأفعال أو الامتناعات أو المشورة أو التصريحات أو الأعمال المهنية المستقلة التي يقوم بها البائعون أو المشترون أو المحامون أو المقيمون أو المفتشون أو البنوك أو الجهات الحكومية أو شركات النقل أو الإقامة أو أي أطراف ثالثة أخرى.",
          "لا تستبعد هذه الشروط أي مسؤولية لا يجوز استبعادها أو تحديدها قانوناً. وأي حد تعاقدي للمسؤولية يفسر وفق الحقوق الإلزامية والقانون والاتفاقية المكتوبة الخاصة بالخدمة."
        ]
      },
      {
        "title": "13. السرية والمعلومات",
        "paragraphs": [
          "يجب على المستخدم حماية المعلومات السرية التي يحصل عليها من خلال المنصة واستخدامها فقط للفرصة أو المعاملة ذات الصلة. وقد تطبق AssetVeyra ضوابط وصول وشروط سرية ومتطلبات تأهيل وقيود غرف البيانات على المواد الحساسة."
        ]
      },
      {
        "title": "14. الخصوصية",
        "paragraphs": [
          "تتم معالجة البيانات الشخصية وفق سياسة الخصوصية الخاصة بـAssetVeyra والقوانين المطبقة لحماية البيانات. وعلى المستخدم مراجعة سياسة الخصوصية قبل إرسال المعلومات الشخصية أو معلومات المعاملة."
        ]
      },
      {
        "title": "15. القانون وتسوية النزاعات",
        "paragraphs": [
          "بالنسبة للمعاملات الخاضعة للقانون الأردني، تخضع الأطراف للقوانين والمحاكم المختصة في الأردن ما لم تنص اتفاقية مكتوبة منفصلة على ترتيب قانوني آخر جائز. وقد تخضع المعاملات العابرة للحدود للقوانين الإلزامية وقواعد الاختصاص في الدولة التي يقع فيها العقار أو المعاملة."
        ]
      },
      {
        "title": "16. التعديل والإنهاء",
        "paragraphs": [
          "يجوز لـAssetVeyra تحديث هذه الشروط عندما يكون ذلك ضرورياً بصورة معقولة. وينبغي تحديد النسخة المطبقة على المعاملة في الاتفاقية ذات الصلة أو سجل القبول. ويجوز تعليق أو إنهاء الوصول بسبب المخالفة أو النشاط غير القانوني أو مخاطر الأمن أو لأسباب تشغيلية مشروعة أخرى."
        ]
      },
      {
        "title": "17. الاتصال والمراجعة القانونية",
        "paragraphs": [
          "تهدف هذه الشروط إلى وصف نموذج تشغيل AssetVeyra. ويجب مراجعتها واعتمادها من مستشار قانوني مؤهل قبل الاعتماد عليها في ولاية قضائية معينة، ولا سيما عندما تمارس AssetVeyra أنشطة وساطة أو سمسرة منظمة."
        ]
      }
    ],
    "notice": "مهم: هذه الشروط تنظم استخدام المنصة ولا تحل محل الاستشارة القانونية الخاصة بالمعاملة. وتطبق نسبة 1% فقط وفق الاتفاقية المكتوبة المعمول بها وبما لا يخالف القانون."
  },
  "zh": {
    "eyebrow": "法律条款",
    "title": "使用条款与条件",
    "updated": "生效日期：2026年9月16日",
    "intro": "本条款规范您对 AssetVeyra 的访问和使用。AssetVeyra 是房地产机会、匹配、中介及交易支持平台。使用平台即表示您确认本条款；如特定交易或服务另有书面协议，该协议也适用于相关服务。",
    "sections": [
      {
        "title": "1. AssetVeyra 的角色",
        "paragraphs": [
          "AssetVeyra 连接业主、卖方、买方、投资者和专业服务提供商，并可依法提供机会发现、匹配、介绍、商业谈判、交易协调及专业服务接入。",
          "AssetVeyra 不为自身账户购买房地产，除非明确披露，否则不表示自己是所列房地产的所有者。在法律允许的情况下，AssetVeyra 可以作为中介；需要持牌主体开展受监管活动时，可与相应授权合作伙伴合作。"
        ]
      },
      {
        "title": "2. 需求、匹配与谈判",
        "paragraphs": [
          "买方或投资者可以提交房地产类型、地点、预算、用途及其他交易要求。AssetVeyra 可以搜索机会并提供潜在匹配。",
          "AssetVeyra 可以传递报价和反报价并促进商业谈判。最终价格和商业条件由买卖双方决定并接受，AssetVeyra 不强迫任何一方完成交易。"
        ]
      },
      {
        "title": "3. 交易服务费 — 1%",
        "paragraphs": [
          "通过 AssetVeyra 的中介及交易支持服务成功完成交易时，标准交易服务费为最终约定交易价值的 1%，除非针对具体交易另有书面约定。",
          "应以书面形式明确付款方、费用触发的完成事件和付款时间。除非另有约定，该费用与房地产购买价分开。",
          "1% 不包括政府费用、登记费、律师费、估价费、检查费、旅行、住宿、交通或其他第三方费用。"
        ]
      },
      {
        "title": "4. 不保管交易资金",
        "paragraphs": [
          "除非另有明确披露并约定合法授权的独立服务，AssetVeyra 不接收、持有、保管、控制或转移买卖双方的购买价、定金或其他交易资金。",
          "房地产购买价由买卖双方按照适用的法律、银行、登记或产权转让程序直接支付。AssetVeyra 不作为托管机构、银行或购买价支付处理机构。"
        ]
      },
      {
        "title": "5. 法律及专业服务",
        "paragraphs": [
          "AssetVeyra 可以协调其有合同、转介或服务关系的律师事务所及其他专业人士。法律意见和法律工作由相关律师事务所根据与客户的独立专业委托提供。",
          "专业服务受服务提供商的委托范围、资质、职责和适用法律约束。AssetVeyra 不取代客户独立的法律、税务、估价、检查或其他专业顾问。"
        ]
      },
      {
        "title": "6. 旅行与交易协调",
        "paragraphs": [
          "如交易需要客户旅行，AssetVeyra 可以协调相关实际安排和介绍。旅行、住宿、交通等第三方费用与 1% 服务费分开，除非另有书面约定。",
          "AssetVeyra 不保证签证、航班、住宿、政府预约或交易完成。"
        ]
      },
      {
        "title": "7. 房源信息与卖方责任",
        "paragraphs": [
          "房地产及机会信息可能由业主、卖方或授权方提供。发布方负责确认其有权提供该房地产或机会，并对向 AssetVeyra 提供的信息的准确性和完整性负责。",
          "如提供验证服务，其范围将被明确说明。验证状态不构成对产权、价值、盈利能力、未来表现或交易完成的保证。买方应进行适当的法律和商业尽职调查。"
        ]
      },
      {
        "title": "8. 买方责任",
        "bullets": [
          "适当核实所有权、产权、出售授权、负担、限制和登记状态。",
          "在适当情况下取得独立的法律、税务、估价、检查和财务意见。",
          "确认外国人持有、投资、规划、融资及其他当地要求。",
          "在承诺交易前审查并批准最终价格和合同条件。",
          "提供交易及合规流程所需的真实信息和文件。"
        ]
      },
      {
        "title": "9. 不保证交易结果",
        "paragraphs": [
          "AssetVeyra 协调交易，但不保证双方达成协议、交易完成、获得融资或取得任何特定价值、回报或投资结果。",
          "任何有关验证、保护、估价、预期回报或交易安全的陈述，仅在相关服务的书面范围及单独协议内有效。"
        ]
      },
      {
        "title": "10. 禁止行为",
        "bullets": [
          "提供虚假、误导、欺诈或未经授权的信息。",
          "利用平台规避已约定费用或隐瞒由 AssetVeyra 介绍或促成的交易。",
          "将平台用于违法、欺诈、洗钱、规避制裁或其他禁止活动。",
          "未经授权访问或违反保密义务披露受保护信息。"
        ]
      },
      {
        "title": "11. 合规与地域限制",
        "paragraphs": [
          "在法律、许可、制裁、反洗钱、外国人持有、专业监管或其他适用限制要求时，AssetVeyra 可以限制、暂停或拒绝服务。",
          "不同司法管辖区对中介活动的法律分类和许可要求可能不同。本条款不声称全球统一的监管身份；在法律要求时，AssetVeyra 将使用适当的持牌或授权结构。"
        ]
      },
      {
        "title": "12. 责任与第三方",
        "paragraphs": [
          "AssetVeyra 不对卖方、买方、律师、估价师、检查人员、银行、政府机构、运输或住宿供应商等第三方的独立行为、意见、陈述或专业工作负责。",
          "本条款不排除适用法律禁止排除或限制的责任。任何责任限制均受强制性法律权利和具体书面协议约束。"
        ]
      },
      {
        "title": "13. 保密与信息",
        "paragraphs": [
          "用户必须保护通过平台获得的机密信息，并仅为相关机会或交易使用。AssetVeyra 可以对敏感材料实施访问控制、保密条件、资格要求和数据室限制。"
        ]
      },
      {
        "title": "14. 隐私",
        "paragraphs": [
          "个人数据按照 AssetVeyra 隐私政策及适用的数据保护法律处理。提交个人或交易信息前，用户应阅读隐私政策。"
        ]
      },
      {
        "title": "15. 法律与争议",
        "paragraphs": [
          "对于受约旦法律管辖的交易，除非单独书面协议作出其他合法安排，双方受约旦适用法律和有管辖权的法院管辖。跨境交易还可能受房地产或交易所在地的强制性法律和管辖规则约束。"
        ]
      },
      {
        "title": "16. 修改与终止",
        "paragraphs": [
          "AssetVeyra 可在合理必要时更新本条款。适用于特定交易的版本应在相关协议或接受记录中确定。对于违约、违法行为、安全风险或其他合法运营原因，AssetVeyra 可以暂停或终止访问。"
        ]
      },
      {
        "title": "17. 联系与法律审查",
        "paragraphs": [
          "本条款用于说明 AssetVeyra 的运营模式。在特定司法管辖区依赖本条款之前，尤其是在进行受监管中介或经纪活动时，应由合格法律顾问审查和批准。"
        ]
      }
    ],
    "notice": "重要提示：本条款是平台使用条款，不替代针对具体交易的法律意见。1% 费用仅按照适用的书面协议并在适用法律允许的范围内收取。"
  },
  "es": {
    "eyebrow": "TÉRMINOS LEGALES",
    "title": "Términos y condiciones de uso",
    "updated": "Fecha de entrada en vigor: 16 de septiembre de 2026",
    "intro": "Estos Términos regulan el acceso y uso de AssetVeyra, una plataforma de oportunidades inmobiliarias, intermediación, conexión y apoyo a transacciones. Al utilizar la Plataforma, usted reconoce estos Términos. Cuando exista un acuerdo escrito separado para una transacción o servicio, dicho acuerdo también regirá el servicio correspondiente.",
    "sections": [
      {
        "title": "1. Función de AssetVeyra",
        "paragraphs": [
          "AssetVeyra conecta propietarios, vendedores, compradores, inversores y proveedores profesionales, y puede facilitar el descubrimiento, la búsqueda, las presentaciones, la negociación comercial, la coordinación de transacciones y el acceso a servicios profesionales, sujeto a la ley aplicable.",
          "AssetVeyra no adquiere inmuebles por cuenta propia y no se presenta como propietaria de un inmueble listado salvo que se indique expresamente. Puede actuar como intermediaria cuando la ley lo permita y colaborar con socios autorizados cuando una actividad regulada deba realizarla una persona o entidad autorizada."
        ]
      },
      {
        "title": "2. Solicitudes, coincidencias y negociación",
        "paragraphs": [
          "Los compradores e inversores pueden presentar requisitos como tipo de inmueble, ubicación, presupuesto, uso previsto y otros criterios. AssetVeyra puede buscar oportunidades y presentar coincidencias potenciales.",
          "AssetVeyra puede transmitir ofertas y contraofertas y facilitar la negociación comercial. El precio final y las condiciones son decididos y aceptados por comprador y vendedor. AssetVeyra no obliga a ninguna parte a cerrar una operación."
        ]
      },
      {
        "title": "3. Comisión de servicio de transacción — 1%",
        "paragraphs": [
          "Cuando una operación se completa con éxito mediante los servicios de intermediación y apoyo de AssetVeyra, la comisión estándar es del 1% del valor final acordado, salvo acuerdo escrito distinto para esa operación.",
          "La parte responsable del 1%, el hecho que haga exigible la comisión y el momento de pago deberán constar por escrito. Salvo acuerdo contrario, la comisión es independiente del precio del inmueble.",
          "El 1% no incluye impuestos o tasas gubernamentales, registro, honorarios jurídicos, valoración, inspección, viajes, alojamiento, transporte u otros costes de terceros."
        ]
      },
      {
        "title": "4. No custodia de fondos",
        "paragraphs": [
          "AssetVeyra no recibe, conserva, custodia, controla ni transfiere el precio de compra, depósitos u otros fondos de comprador o vendedor, salvo un servicio independiente legalmente autorizado y expresamente acordado.",
          "El precio del inmueble se paga directamente entre las partes mediante el proceso legal, bancario, registral o de transmisión aplicable. AssetVeyra no actúa como escrow, banco ni procesador del precio de compra."
        ]
      },
      {
        "title": "5. Servicios jurídicos y profesionales",
        "paragraphs": [
          "AssetVeyra puede coordinar el acceso a despachos de abogados y otros especialistas con los que mantenga relaciones contractuales, de referencia o de servicio. El asesoramiento y trabajo jurídico lo presta el despacho correspondiente bajo un encargo profesional independiente.",
          "Los servicios profesionales están sujetos al alcance, cualificaciones y obligaciones del proveedor y a la legislación aplicable. AssetVeyra no sustituye al asesor jurídico, fiscal, tasador, inspector u otro profesional independiente del cliente."
        ]
      },
      {
        "title": "6. Viajes y coordinación",
        "paragraphs": [
          "Cuando una operación requiera viajar, AssetVeyra puede coordinar arreglos prácticos y presentaciones relacionadas con la operación. Los costes de viaje, alojamiento, transporte y terceros son independientes del 1%, salvo acuerdo escrito contrario.",
          "AssetVeyra no garantiza visados, vuelos, alojamiento, citas gubernamentales ni la finalización de una operación."
        ]
      },
      {
        "title": "7. Anuncios y responsabilidades del vendedor",
        "paragraphs": [
          "La información sobre inmuebles y oportunidades puede ser proporcionada por propietarios, vendedores u otras partes autorizadas. El anunciante es responsable de tener autoridad para ofrecer el inmueble u oportunidad y de la exactitud e integridad de la información proporcionada.",
          "Cuando exista verificación, se indicará su alcance. La verificación no garantiza título, valor, rentabilidad, rendimiento futuro ni cierre de la operación. Los compradores deben realizar la debida diligencia jurídica y comercial adecuada."
        ]
      },
      {
        "title": "8. Responsabilidades del comprador",
        "bullets": [
          "Verificar propiedad, título, autoridad para vender, cargas, restricciones y estado registral cuando corresponda.",
          "Obtener asesoramiento jurídico, fiscal, de valoración, inspección y financiero independiente cuando sea necesario.",
          "Confirmar las restricciones de propiedad extranjera, inversión, planificación, financiación y demás requisitos locales.",
          "Revisar y aprobar el precio final y las condiciones contractuales antes de comprometerse.",
          "Proporcionar información y documentos exactos requeridos por la operación y los controles de cumplimiento."
        ]
      },
      {
        "title": "9. Sin garantía del resultado",
        "paragraphs": [
          "AssetVeyra facilita y coordina operaciones, pero no garantiza que las partes lleguen a un acuerdo, que la operación se cierre, que se obtenga financiación o que el inmueble produzca un valor, rendimiento o resultado de inversión determinado.",
          "Cualquier declaración sobre verificación, protección, valoración, rentabilidad prevista o seguridad de la operación se limita al alcance documentado del servicio y a cualquier acuerdo escrito separado."
        ]
      },
      {
        "title": "10. Conductas prohibidas",
        "bullets": [
          "Proporcionar información falsa, engañosa, fraudulenta o no autorizada.",
          "Utilizar AssetVeyra para eludir una comisión acordada u ocultar una operación introducida o facilitada por AssetVeyra.",
          "Utilizar la Plataforma para actividades ilegales, fraude, blanqueo de capitales, evasión de sanciones u otras actividades prohibidas.",
          "Acceder sin autorización a información confidencial o divulgar información protegida infringiendo obligaciones de confidencialidad."
        ]
      },
      {
        "title": "11. Cumplimiento y restricciones jurisdiccionales",
        "paragraphs": [
          "AssetVeyra puede limitar, suspender o rechazar servicios cuando lo exijan la ley, licencias, sanciones, controles contra el blanqueo, normas de propiedad extranjera, regulación profesional u otras restricciones aplicables.",
          "La clasificación legal y los requisitos de licencia de la intermediación varían según la jurisdicción. Estos Términos no afirman un único estatus regulatorio mundial. Cuando la ley lo exija, AssetVeyra utilizará una estructura autorizada o licenciada adecuada."
        ]
      },
      {
        "title": "12. Responsabilidad y terceros",
        "paragraphs": [
          "AssetVeyra no responde por actos, omisiones, asesoramiento, declaraciones o trabajos profesionales independientes de vendedores, compradores, abogados, tasadores, inspectores, bancos, autoridades públicas u otros terceros.",
          "Nada excluye responsabilidades que no puedan excluirse o limitarse legalmente. Cualquier limitación de responsabilidad está sujeta a derechos legales imperativos y al acuerdo escrito aplicable."
        ]
      },
      {
        "title": "13. Confidencialidad e información",
        "paragraphs": [
          "Los usuarios deben proteger la información confidencial recibida a través de la Plataforma y utilizarla solo para la oportunidad o transacción correspondiente. AssetVeyra puede aplicar controles de acceso, condiciones de confidencialidad, requisitos de cualificación y restricciones de data room."
        ]
      },
      {
        "title": "14. Privacidad",
        "paragraphs": [
          "Los datos personales se gestionan conforme a la Política de Privacidad de AssetVeyra y a la legislación aplicable de protección de datos. Los usuarios deben revisar la Política de Privacidad antes de enviar información personal o transaccional."
        ]
      },
      {
        "title": "15. Ley y controversias",
        "paragraphs": [
          "Para las operaciones sujetas a la ley jordana, se aplicarán las leyes y tribunales competentes de Jordania salvo que un acuerdo escrito separado establezca otra solución legal. Las operaciones transfronterizas también pueden estar sujetas a leyes imperativas y reglas jurisdiccionales del país donde se encuentre el inmueble o se realice la operación."
        ]
      },
      {
        "title": "16. Cambios y terminación",
        "paragraphs": [
          "AssetVeyra puede actualizar estos Términos cuando sea razonablemente necesario. La versión aplicable a una operación deberá identificarse en el acuerdo o registro de aceptación correspondiente. AssetVeyra puede suspender o terminar el acceso por incumplimiento, conducta ilegal, riesgos de seguridad u otras razones operativas legítimas."
        ]
      },
      {
        "title": "17. Contacto y revisión legal",
        "paragraphs": [
          "Estos Términos describen el modelo operativo de AssetVeyra. Deben ser revisados y aprobados por asesoría jurídica cualificada antes de utilizarse en una jurisdicción concreta, especialmente cuando AssetVeyra realice actividades de intermediación o corretaje reguladas."
        ]
      }
    ],
    "notice": "Importante: estos Términos son condiciones de la plataforma y no sustituyen asesoramiento jurídico específico. El 1% se aplica únicamente conforme al acuerdo escrito aplicable y a la legislación vigente."
  },
  "fr": {
    "eyebrow": "CONDITIONS JURIDIQUES",
    "title": "Conditions générales d’utilisation",
    "updated": "Date d’entrée en vigueur : 16 septembre 2026",
    "intro": "Les présentes Conditions régissent l’accès et l’utilisation d’AssetVeyra, plateforme d’opportunités immobilières, de mise en relation, d’intermédiation et d’accompagnement des transactions. L’utilisation de la Plateforme vaut reconnaissance des présentes Conditions. Lorsqu’un accord écrit distinct s’applique à une transaction ou à un service, cet accord régit également le service concerné.",
    "sections": [
      {
        "title": "1. Rôle d’AssetVeyra",
        "paragraphs": [
          "AssetVeyra met en relation propriétaires, vendeurs, acheteurs, investisseurs et prestataires professionnels et peut faciliter la découverte, la mise en correspondance, les présentations, la négociation commerciale, la coordination des transactions et l’accès à des services professionnels, sous réserve du droit applicable.",
          "AssetVeyra n’acquiert pas de biens pour son propre compte et ne se présente pas comme propriétaire d’un bien annoncé sauf indication expresse. Elle peut agir comme intermédiaire lorsque la loi l’autorise et recourir à des partenaires agréés lorsque l’activité réglementée doit être exercée par une personne ou entité autorisée."
        ]
      },
      {
        "title": "2. Demandes, mise en relation et négociation",
        "paragraphs": [
          "Les acheteurs et investisseurs peuvent transmettre leurs critères : type de bien, localisation, budget, usage prévu et autres conditions. AssetVeyra peut rechercher des opportunités et présenter des correspondances potentielles.",
          "AssetVeyra peut transmettre les offres et contre-offres et faciliter les négociations commerciales. Le prix final et les conditions sont décidés et acceptés par l’acheteur et le vendeur. AssetVeyra n’oblige aucune partie à conclure."
        ]
      },
      {
        "title": "3. Frais de transaction — 1 %",
        "paragraphs": [
          "Lorsqu’une transaction est conclue avec succès grâce aux services d’intermédiation et d’accompagnement d’AssetVeyra, les frais standards sont de 1 % de la valeur finale convenue, sauf accord écrit différent pour la transaction concernée.",
          "La partie responsable du 1 %, l’événement déclenchant l’exigibilité et la date de paiement doivent être convenus par écrit. Sauf accord contraire, ces frais sont distincts du prix du bien.",
          "Le 1 % n’inclut pas les frais publics, d’enregistrement, honoraires juridiques, évaluation, inspection, voyage, hébergement, transport ou autres frais de tiers."
        ]
      },
      {
        "title": "4. Absence de détention des fonds",
        "paragraphs": [
          "AssetVeyra ne reçoit, ne détient, ne conserve, ne contrôle et ne transfère pas le prix d’achat, les dépôts ou autres fonds appartenant à l’acheteur ou au vendeur, sauf service distinct légalement autorisé et expressément convenu.",
          "Le prix du bien est payé directement entre les parties selon le processus juridique, bancaire, d’enregistrement ou de transfert applicable. AssetVeyra n’agit pas comme séquestre, banque ou prestataire de paiement du prix d’achat."
        ]
      },
      {
        "title": "5. Services juridiques et professionnels",
        "paragraphs": [
          "AssetVeyra peut coordonner l’accès à des cabinets d’avocats et autres spécialistes avec lesquels elle entretient des relations contractuelles, de recommandation ou de service. Les conseils et travaux juridiques sont fournis par le cabinet concerné dans le cadre de sa mission professionnelle indépendante.",
          "Les services professionnels restent soumis à la mission, aux qualifications et aux obligations du prestataire et au droit applicable. AssetVeyra ne remplace pas le conseil juridique, fiscal, évaluateur, inspecteur ou autre professionnel indépendant du client."
        ]
      },
      {
        "title": "6. Voyages et coordination",
        "paragraphs": [
          "Lorsqu’une transaction nécessite un déplacement du client, AssetVeyra peut coordonner les aspects pratiques et les mises en relation. Les frais de voyage, d’hébergement, de transport et autres frais de tiers sont distincts du 1 %, sauf accord écrit contraire.",
          "AssetVeyra ne garantit pas les visas, vols, hébergements, rendez-vous administratifs ni la réalisation d’une transaction."
        ]
      },
      {
        "title": "7. Annonces et responsabilités du vendeur",
        "paragraphs": [
          "Les informations relatives aux biens et opportunités peuvent être fournies par les propriétaires, vendeurs ou personnes autorisées. L’annonceur est responsable de son habilitation à proposer le bien ou l’opportunité et de l’exactitude et de l’exhaustivité des informations fournies.",
          "Lorsqu’une vérification est proposée, son périmètre est précisé. Une vérification ne constitue pas une garantie de propriété, de valeur, de rentabilité, de performance future ou de réalisation de la transaction. L’acheteur doit effectuer les diligences juridiques et commerciales appropriées."
        ]
      },
      {
        "title": "8. Responsabilités de l’acheteur",
        "bullets": [
          "Vérifier la propriété, le titre, l’autorité de vendre, les charges, restrictions et l’état d’enregistrement selon le cas.",
          "Obtenir des conseils juridiques, fiscaux, d’évaluation, d’inspection et financiers indépendants lorsque nécessaire.",
          "Vérifier les règles relatives à la propriété étrangère, à l’investissement, à l’urbanisme, au financement et autres exigences locales.",
          "Examiner et approuver le prix final et les conditions contractuelles avant de s’engager.",
          "Fournir des informations et documents exacts nécessaires à la transaction et aux contrôles de conformité."
        ]
      },
      {
        "title": "9. Absence de garantie de résultat",
        "paragraphs": [
          "AssetVeyra facilite et coordonne les transactions, mais ne garantit pas qu’un accord sera conclu, qu’une transaction sera finalisée, qu’un financement sera obtenu ou qu’un bien produira une valeur, un rendement ou un résultat d’investissement déterminé.",
          "Toute déclaration relative à la vérification, à la protection, à l’évaluation, au rendement attendu ou à la sécurité de la transaction est limitée au périmètre documenté du service et à tout accord écrit distinct."
        ]
      },
      {
        "title": "10. Comportements interdits",
        "bullets": [
          "Fournir des informations fausses, trompeuses, frauduleuses ou non autorisées.",
          "Utiliser AssetVeyra pour contourner des frais convenus ou dissimuler une transaction présentée ou facilitée par AssetVeyra.",
          "Utiliser la Plateforme pour une activité illégale, une fraude, le blanchiment, le contournement de sanctions ou toute activité interdite.",
          "Accéder sans autorisation à des informations confidentielles ou divulguer des informations protégées en violation d’obligations de confidentialité."
        ]
      },
      {
        "title": "11. Conformité et restrictions territoriales",
        "paragraphs": [
          "AssetVeyra peut limiter, suspendre ou refuser des services lorsque la loi, les licences, les sanctions, les contrôles anti-blanchiment, les règles de propriété étrangère, la réglementation professionnelle ou d’autres restrictions l’exigent.",
          "La qualification juridique et les exigences de licence relatives à l’intermédiation varient selon les juridictions. Les présentes Conditions ne revendiquent pas un statut réglementaire mondial unique. Lorsqu’il est requis, AssetVeyra utilisera une structure agréée ou autorisée appropriée."
        ]
      },
      {
        "title": "12. Responsabilité et tiers",
        "paragraphs": [
          "AssetVeyra n’est pas responsable des actes, omissions, conseils, déclarations ou travaux professionnels indépendants des vendeurs, acheteurs, avocats, évaluateurs, inspecteurs, banques, autorités publiques ou autres tiers.",
          "Rien dans les présentes Conditions n’exclut une responsabilité qui ne peut légalement être exclue ou limitée. Toute limitation de responsabilité reste soumise aux droits impératifs et à l’accord écrit applicable."
        ]
      },
      {
        "title": "13. Confidentialité et informations",
        "paragraphs": [
          "Les utilisateurs doivent protéger les informations confidentielles reçues via la Plateforme et ne les utiliser que pour l’opportunité ou la transaction concernée. AssetVeyra peut appliquer des contrôles d’accès, conditions de confidentialité, exigences de qualification et restrictions de data room."
        ]
      },
      {
        "title": "14. Vie privée",
        "paragraphs": [
          "Les données personnelles sont traitées conformément à la Politique de confidentialité d’AssetVeyra et au droit applicable en matière de protection des données. Les utilisateurs doivent consulter la Politique de confidentialité avant de transmettre des informations personnelles ou transactionnelles."
        ]
      },
      {
        "title": "15. Droit applicable et litiges",
        "paragraphs": [
          "Pour les transactions soumises au droit jordanien, les lois applicables et les tribunaux compétents de Jordanie s’appliquent sauf accord écrit distinct établissant un autre arrangement légal. Les transactions transfrontalières peuvent également être soumises aux lois impératives et règles de compétence du pays où se situe le bien ou la transaction."
        ]
      },
      {
        "title": "16. Modifications et résiliation",
        "paragraphs": [
          "AssetVeyra peut mettre à jour les présentes Conditions lorsque cela est raisonnablement nécessaire. La version applicable à une transaction doit être identifiée dans l’accord ou le registre d’acceptation correspondant. AssetVeyra peut suspendre ou résilier l’accès en cas de violation, d’activité illégale, de risque de sécurité ou pour d’autres raisons opérationnelles légitimes."
        ]
      },
      {
        "title": "17. Contact et revue juridique",
        "paragraphs": [
          "Les présentes Conditions décrivent le modèle opérationnel d’AssetVeyra. Elles doivent être examinées et approuvées par un conseil juridique qualifié avant leur utilisation dans une juridiction donnée, notamment lorsque AssetVeyra exerce des activités d’intermédiation ou de courtage réglementées."
        ]
      }
    ],
    "notice": "Important : ces Conditions sont des conditions d’utilisation de la plateforme et ne remplacent pas un conseil juridique spécifique à une transaction. Le 1 % s’applique uniquement conformément à l’accord écrit applicable et au droit en vigueur."
  }
};
export const TRANSACTION_AGREEMENT_COPY: Record<Locale, TransactionCopy> = {
  "en": {
    "eyebrow": "TRANSACTION AGREEMENT",
    "title": "Transaction Service & 1% Fee Agreement",
    "updated": "Effective date: 16 September 2026",
    "intro": "This template records the commercial relationship between AssetVeyra and a client using AssetVeyra to identify, negotiate and coordinate a real-estate transaction. A transaction-specific agreement may supplement or replace these terms where required by applicable law.",
    "sections": [
      {
        "title": "1. Scope of AssetVeyra services",
        "body": [
          "AssetVeyra may receive and prepare the client request, search and match opportunities, communicate with owners and buyers, transmit offers and counteroffers, facilitate commercial negotiations, coordinate transaction steps, coordinate access to legal and other professional providers, and coordinate practical travel arrangements where required by the transaction."
        ]
      },
      {
        "title": "2. Final price and decision",
        "body": [
          "AssetVeyra may negotiate and facilitate a mutually acceptable commercial outcome, but the buyer and seller remain the parties who approve the final price and contractual terms. AssetVeyra does not have authority to bind either party unless a separate written authority expressly provides otherwise."
        ]
      },
      {
        "title": "3. AssetVeyra fee — 1%",
        "body": [
          "The standard AssetVeyra transaction service fee is 1% of the final agreed transaction value for a transaction successfully completed through AssetVeyra’s services, unless a different written fee is expressly agreed for that transaction.",
          "The agreement must identify who pays the 1% fee and the completion event that makes it due. Unless otherwise stated, the fee is separate from the property purchase price."
        ]
      },
      {
        "title": "4. When the fee becomes due",
        "body": [
          "Unless the transaction-specific agreement states a different lawful trigger, the 1% fee becomes due when the transaction reaches the agreed completion event, such as completion of the sale, official transfer or registration, or execution of the legally effective sale agreement, as applicable to the transaction and jurisdiction."
        ]
      },
      {
        "title": "5. No custody of transaction funds",
        "body": [
          "AssetVeyra does not receive, hold, safeguard, control or transfer the purchase price, deposit or other property transaction funds. The buyer and seller arrange payment directly through the applicable legal, banking, registration or conveyancing process. AssetVeyra is not an escrow agent, bank or payment processor for the property purchase price."
        ]
      },
      {
        "title": "6. Anti-circumvention and introduced parties",
        "body": [
          "Where AssetVeyra introduces or materially facilitates contact between parties concerning an opportunity, the parties agree not to deliberately bypass AssetVeyra in order to avoid the agreed fee. If the parties complete the same or substantially related transaction with an introduced counterparty during the protection period stated in the transaction-specific agreement, the agreed 1% fee remains payable, subject to applicable law.",
          "AssetVeyra should retain records of introductions, communications, offers, negotiations and transaction milestones sufficient to establish the service provided and the agreed fee."
        ]
      },
      {
        "title": "7. Seller and buyer confirmations",
        "body": [
          "Each party confirms that it has authority to enter the transaction and will provide accurate material information and documents. Each party is responsible for its own representations, approvals and obligations."
        ],
        "bullets": [
          "The seller confirms authority to sell or otherwise offer the asset.",
          "The buyer confirms authority and lawful capacity to purchase.",
          "Neither party will knowingly provide materially false or misleading information.",
          "Each party will disclose material restrictions, claims, encumbrances or circumstances relevant to the transaction where legally required."
        ]
      },
      {
        "title": "8. Legal and professional providers",
        "body": [
          "AssetVeyra may coordinate law firms and other professional specialists under separate arrangements. Legal advice, document drafting, title review, valuation, inspection and other regulated professional services remain the responsibility of the appointed professional within the scope of its engagement. Third-party professional fees are separate from AssetVeyra’s 1% fee unless expressly agreed otherwise."
        ]
      },
      {
        "title": "9. Third-party costs and travel",
        "body": [
          "Government charges, registration fees, legal fees, valuation and inspection fees, flights, accommodation, transport and other third-party costs are not included in the 1% fee unless expressly stated in writing. AssetVeyra may coordinate these services but does not guarantee third-party performance."
        ]
      },
      {
        "title": "10. No guarantee of closing",
        "body": [
          "AssetVeyra facilitates the transaction but does not guarantee that the parties will agree, that financing will be available, that title will be transferable, or that the transaction will close. Legal completion depends on the applicable law, documents, approvals and actions of the relevant parties and authorities."
        ]
      },
      {
        "title": "11. Client protection and cooperation",
        "body": [
          "The client must promptly disclose information that could affect the transaction and cooperate with reasonable verification, compliance and documentation requests. AssetVeyra may pause or terminate services where information is materially false, the transaction is unlawful, required approvals are unavailable, sanctions or compliance concerns arise, or continuing would expose AssetVeyra or its partners to material legal risk."
        ]
      },
      {
        "title": "12. Evidence, records and electronic acceptance",
        "body": [
          "The parties may use electronic acceptance, messages, signed documents and transaction records to evidence the agreed services, fee and milestones, subject to applicable electronic-transactions law. The transaction-specific agreement should identify the client, property/opportunity, fee payer, 1% fee, completion trigger, protection period and governing law."
        ]
      },
      {
        "title": "13. Governing law",
        "body": [
          "The governing law and dispute forum should be stated in the transaction-specific agreement. For Jordan transactions, the agreement must be aligned with applicable Jordanian real-estate, licensing, registration, professional and consumer laws. Cross-border transactions require jurisdiction-specific review."
        ]
      }
    ],
    "notice": "Legal protection depends on the actual licensed structure, the transaction-specific agreement and the law governing the transaction. This template should be reviewed by qualified counsel before being used as a binding contract."
  },
  "ar": {
    "eyebrow": "اتفاقية المعاملة",
    "title": "اتفاقية خدمات المعاملة وأتعاب 1%",
    "updated": "تاريخ السريان: 16 سبتمبر 2026",
    "intro": "تحدد هذه الصيغة العلاقة التجارية بين AssetVeyra والعميل الذي يستخدم خدماتها للبحث عن المعاملة العقارية والتفاوض بشأنها وتنسيقها. ويجوز أن تكملها اتفاقية خاصة بكل معاملة أو تحل محلها عندما يتطلب القانون ذلك.",
    "sections": [
      {
        "title": "1. نطاق خدمات AssetVeyra",
        "body": [
          "يجوز لـAssetVeyra استقبال طلب العميل وتجهيزه، والبحث عن الفرص ومطابقتها، والتواصل مع المالكين والمشترين، ونقل العروض والعروض المقابلة، وتسهيل التفاوض التجاري، وتنسيق مراحل المعاملة، وتنسيق الوصول إلى المحامين والمختصين، وترتيب الجوانب العملية للسفر عند حاجة المعاملة لذلك."
        ]
      },
      {
        "title": "2. السعر النهائي والقرار",
        "body": [
          "يجوز لـAssetVeyra التفاوض وتسهيل الوصول إلى نتيجة تجارية مقبولة للطرفين، لكن المشتري والبائع هما صاحبا القرار في اعتماد السعر النهائي والشروط التعاقدية. ولا تملك AssetVeyra إلزام أي طرف بالبيع أو الشراء إلا بموجب تفويض خطي مستقل وصريح."
        ]
      },
      {
        "title": "3. أتعاب AssetVeyra — 1%",
        "body": [
          "تبلغ أتعاب خدمة المعاملة القياسية لـAssetVeyra نسبة 1% من قيمة المعاملة النهائية المتفق عليها عند إتمام المعاملة من خلال خدمات AssetVeyra، ما لم يتم الاتفاق خطياً على أتعاب مختلفة للمعاملة المحددة.",
          "يجب أن تحدد اتفاقية المعاملة الطرف المسؤول عن دفع نسبة 1% والحدث الذي يجعلها مستحقة. وما لم يتفق على خلاف ذلك، تكون الأتعاب منفصلة عن ثمن العقار."
        ]
      },
      {
        "title": "4. استحقاق الأتعاب",
        "body": [
          "ما لم تنص اتفاقية المعاملة على نقطة استحقاق قانونية مختلفة، تستحق نسبة 1% عند تحقق نقطة الإتمام المتفق عليها، مثل إتمام البيع أو نقل/تسجيل الملكية رسمياً أو توقيع عقد البيع النافذ قانوناً، بحسب طبيعة المعاملة والقانون المطبق."
        ]
      },
      {
        "title": "5. عدم حيازة أموال المعاملة",
        "body": [
          "لا تستلم AssetVeyra أو تحتفظ أو تتحكم أو تحول ثمن العقار أو العربون أو أي أموال خاصة بمعاملة العقار. ويتولى المشتري والبائع الدفع مباشرة بينهما وفق الإجراءات القانونية أو المصرفية أو إجراءات التسجيل ونقل الملكية المعمول بها. ولا تعمل AssetVeyra كحساب ضمان أو بنك أو معالج دفع لثمن العقار."
        ]
      },
      {
        "title": "6. منع الالتفاف وحماية الأطراف التي تم التعريف بها",
        "body": [
          "عندما تقوم AssetVeyra بالتعريف بين الأطراف أو تسهيل التواصل بشأن فرصة معينة، يتعهد الأطراف بعدم الالتفاف عليها عمداً بقصد تجنب الأتعاب المتفق عليها. وإذا أتم الأطراف المعاملة نفسها أو معاملة مرتبطة بها بصورة جوهرية مع الطرف الذي عرّفتهم به AssetVeyra خلال مدة الحماية المحددة في الاتفاقية الخاصة بالمعاملة، تبقى نسبة 1% مستحقة، بالقدر الذي يسمح به القانون.",
          "يجب أن تحتفظ AssetVeyra بسجلات للتعريف والتواصل والعروض والمفاوضات ومراحل المعاملة بما يكفي لإثبات الخدمة والأتعاب المتفق عليها."
        ]
      },
      {
        "title": "7. إقرارات البائع والمشتري",
        "body": [
          "يقر كل طرف بأن لديه الصلاحية للدخول في المعاملة وأن المعلومات والمستندات التي يقدمها دقيقة في الجوانب الجوهرية، ويتحمل كل طرف مسؤولية إقراراته وموافقاته والتزاماته."
        ],
        "bullets": [
          "يؤكد البائع أن لديه الصلاحية القانونية لبيع العقار أو عرضه.",
          "يؤكد المشتري أهليته وصلاحيته القانونية للشراء.",
          "لا يقدم أي طرف عن علم معلومات جوهرية كاذبة أو مضللة.",
          "يفصح كل طرف عن القيود أو المطالبات أو الحقوق أو الرهون أو الظروف الجوهرية ذات الصلة عندما يوجب القانون ذلك."
        ]
      },
      {
        "title": "8. المحامون والمختصون المهنيون",
        "body": [
          "يجوز لـAssetVeyra تنسيق خدمات مكاتب المحاماة والمختصين الآخرين بموجب ترتيبات منفصلة. وتبقى الاستشارة القانونية وإعداد المستندات وفحص الملكية والتقييم والفحص والخدمات المهنية المنظمة مسؤولية المختص المعين ضمن نطاق تكليفه. وتكون أتعاب الأطراف الثالثة منفصلة عن نسبة 1% ما لم يتفق خطياً على خلاف ذلك."
        ]
      },
      {
        "title": "9. تكاليف الأطراف الثالثة والسفر",
        "body": [
          "الرسوم الحكومية ورسوم التسجيل وأتعاب المحامين والتقييم والفحص وتذاكر السفر والإقامة والنقل وغيرها من تكاليف الأطراف الثالثة لا تدخل ضمن نسبة 1% ما لم ينص على ذلك خطياً. ويجوز لـAssetVeyra تنسيق هذه الخدمات دون ضمان أداء الطرف الثالث."
        ]
      },
      {
        "title": "10. عدم ضمان إتمام الصفقة",
        "body": [
          "تقوم AssetVeyra بتسهيل المعاملة لكنها لا تضمن اتفاق الأطراف أو توفر التمويل أو قابلية نقل الملكية أو إتمام الصفقة. ويعتمد الإتمام القانوني على القانون والمستندات والموافقات وإجراءات الأطراف والجهات المختصة."
        ]
      },
      {
        "title": "11. حماية العميل والتعاون",
        "body": [
          "يلتزم العميل بالإفصاح في الوقت المناسب عن المعلومات التي قد تؤثر في المعاملة والتعاون مع طلبات التحقق والامتثال والمستندات المعقولة. ويجوز لـAssetVeyra إيقاف أو إنهاء الخدمة إذا كانت المعلومات جوهرية الكذب أو التضليل، أو كانت المعاملة غير قانونية، أو تعذر الحصول على الموافقات اللازمة، أو ظهرت مخاطر عقوبات أو امتثال، أو أصبح استمرار الخدمة يعرض AssetVeyra أو شركاءها لمخاطر قانونية جوهرية."
        ]
      },
      {
        "title": "12. الإثبات والسجلات والقبول الإلكتروني",
        "body": [
          "يجوز استخدام القبول الإلكتروني والرسائل والمستندات الموقعة وسجلات المعاملة لإثبات الخدمات والأتعاب والمراحل المتفق عليها، وفق القانون المطبق. ويجب أن تحدد الاتفاقية الخاصة بالمعاملة العميل والعقار أو الفرصة والطرف الذي يدفع الأتعاب ونسبة 1% ونقطة الاستحقاق ومدة الحماية والقانون المطبق."
        ]
      },
      {
        "title": "13. القانون الواجب التطبيق",
        "body": [
          "يجب تحديد القانون والجهة المختصة في اتفاقية المعاملة الخاصة. وفي المعاملات الأردنية يجب مواءمة الاتفاقية مع القوانين الأردنية المتعلقة بالعقار والترخيص والتسجيل والخدمات المهنية وحقوق المستهلك. أما المعاملات الدولية فتتطلب مراجعة قانونية خاصة بكل دولة."
        ]
      }
    ],
    "notice": "تعتمد الحماية القانونية على الهيكل المرخص فعلياً وعلى اتفاقية المعاملة الخاصة والقانون الواجب التطبيق. يجب مراجعة هذه الصيغة من محامٍ مختص قبل استخدامها كعقد ملزم."
  },
  "zh": {
    "eyebrow": "交易协议",
    "title": "交易服务及1%费用协议",
    "updated": "生效日期：2026年9月16日",
    "intro": "本模板用于记录AssetVeyra与客户之间就房地产机会搜索、谈判和交易协调形成的商业关系。具体交易可根据适用法律另行签署交易协议。",
    "sections": [
      {
        "title": "1. 服务范围",
        "body": [
          "AssetVeyra可接收并整理客户需求、寻找和匹配机会、联系买卖双方、传递报价和反报价、协助商业谈判、协调交易流程，并协调律师及其他专业服务。"
        ]
      },
      {
        "title": "2. 最终价格",
        "body": [
          "AssetVeyra可协助谈判，但最终价格和合同条件由买卖双方自行批准。"
        ]
      },
      {
        "title": "3. 1%费用",
        "body": [
          "成功完成的交易标准服务费为最终约定交易价值的1%，除非具体交易书面约定其他费用。应书面确定付款方和费用触发条件。"
        ]
      },
      {
        "title": "4. 不持有交易资金",
        "body": [
          "AssetVeyra不接收、保管或控制房地产购买价款、定金或其他交易资金。价款由买卖双方通过适用的法律、银行、登记或过户程序直接支付。"
        ]
      },
      {
        "title": "5. 反规避",
        "body": [
          "双方不得故意绕过AssetVeyra以逃避已约定的费用。对于AssetVeyra介绍的交易对手，在具体协议约定的保护期内完成同一或实质相关交易的，适用法律允许的范围内仍应支付约定费用。"
        ]
      },
      {
        "title": "6. 专业服务",
        "body": [
          "律师、评估师、检查人员等提供独立专业服务，其费用与AssetVeyra的1%费用分开。"
        ]
      },
      {
        "title": "7. 法律审查",
        "body": [
          "本模板应由适用司法辖区的合格律师审查后用于具有约束力的交易。"
        ]
      }
    ],
    "notice": "本模板不是针对所有国家的最终法律意见；实际保护取决于许可结构、具体交易协议和适用法律。"
  },
  "es": {
    "eyebrow": "ACUERDO DE TRANSACCIÓN",
    "title": "Acuerdo de servicios de transacción y tarifa del 1%",
    "updated": "Fecha de vigencia: 16 de septiembre de 2026",
    "intro": "Este modelo establece la relación comercial entre AssetVeyra y el cliente para buscar, negociar y coordinar una operación inmobiliaria.",
    "sections": [
      {
        "title": "1. Servicios",
        "body": [
          "AssetVeyra puede recibir y preparar solicitudes, buscar y emparejar oportunidades, contactar a las partes, transmitir ofertas, facilitar negociaciones y coordinar servicios profesionales."
        ]
      },
      {
        "title": "2. Precio final",
        "body": [
          "AssetVeyra puede facilitar la negociación, pero comprador y vendedor aprueban el precio y las condiciones finales."
        ]
      },
      {
        "title": "3. Tarifa del 1%",
        "body": [
          "La tarifa estándar es el 1% del valor final acordado de una operación completada mediante los servicios de AssetVeyra, salvo acuerdo escrito distinto."
        ]
      },
      {
        "title": "4. Fondos",
        "body": [
          "AssetVeyra no recibe ni custodia el precio de compra, depósitos u otros fondos de la operación. El pago se realiza directamente entre comprador y vendedor mediante el proceso legal aplicable."
        ]
      },
      {
        "title": "5. No elusión",
        "body": [
          "Las partes no deberán eludir deliberadamente a AssetVeyra para evitar la tarifa acordada."
        ]
      },
      {
        "title": "6. Profesionales",
        "body": [
          "Los abogados y otros profesionales prestan servicios independientes y sus honorarios son separados de la tarifa del 1%."
        ]
      },
      {
        "title": "7. Revisión legal",
        "body": [
          "Este modelo debe ser revisado por asesoría jurídica cualificada antes de utilizarse como contrato vinculante."
        ]
      }
    ],
    "notice": "La protección jurídica depende de la estructura autorizada, del acuerdo específico y de la ley aplicable."
  },
  "fr": {
    "eyebrow": "ACCORD DE TRANSACTION",
    "title": "Accord de services de transaction et frais de 1 %",
    "updated": "Date d’effet : 16 septembre 2026",
    "intro": "Ce modèle encadre la relation commerciale entre AssetVeyra et le client pour rechercher, négocier et coordonner une opération immobilière.",
    "sections": [
      {
        "title": "1. Services",
        "body": [
          "AssetVeyra peut recevoir et préparer les demandes, rechercher et faire correspondre des opportunités, contacter les parties, transmettre les offres, faciliter les négociations et coordonner les services professionnels."
        ]
      },
      {
        "title": "2. Prix final",
        "body": [
          "AssetVeyra peut faciliter la négociation, mais l’acheteur et le vendeur approuvent le prix et les conditions finales."
        ]
      },
      {
        "title": "3. Frais de 1 %",
        "body": [
          "Les frais standards sont de 1 % de la valeur finale convenue d’une transaction réalisée grâce aux services d’AssetVeyra, sauf accord écrit différent."
        ]
      },
      {
        "title": "4. Fonds",
        "body": [
          "AssetVeyra ne reçoit ni ne conserve le prix d’achat, les dépôts ou autres fonds de la transaction. Le paiement est effectué directement entre acheteur et vendeur selon le processus légal applicable."
        ]
      },
      {
        "title": "5. Non-contournement",
        "body": [
          "Les parties ne doivent pas contourner délibérément AssetVeyra afin d’éviter les frais convenus."
        ]
      },
      {
        "title": "6. Professionnels",
        "body": [
          "Les avocats et autres professionnels fournissent des services indépendants et leurs honoraires sont distincts des frais de 1 %."
        ]
      },
      {
        "title": "7. Revue juridique",
        "body": [
          "Ce modèle doit être examiné par un conseil juridique qualifié avant toute utilisation comme contrat contraignant."
        ]
      }
    ],
    "notice": "La protection juridique dépend de la structure autorisée, de l’accord spécifique et du droit applicable."
  }
};
