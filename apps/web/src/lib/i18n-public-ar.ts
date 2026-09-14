import type { Locale } from './i18n';

export const PUBLIC_TRANSLATIONS: Partial<Record<Locale, Record<string,string>>> = {
  en:{},de:{},ja:{},ko:{},
  ar:{'ASSETVEYRA CONTACT':'تواصل ASSETVEYRA','Tell us what you are looking for.':'أخبرنا بما تبحث عنه.','For investment opportunities, asset submissions and business enquiries. We review the request before sharing controlled information.':'للفرص الاستثمارية وتقديم الأصول والاستفسارات التجارية. نراجع الطلب قبل مشاركة المعلومات الخاضعة للرقابة.','Name':'الاسم','Email':'البريد الإلكتروني','Phone':'الهاتف','Message':'الرسالة','Send request':'إرسال الطلب','Contact AssetVeyra':'تواصل مع AssetVeyra','Legal Information':'المعلومات القانونية','Transaction process':'عملية المعاملة','Security':'الأمان','Privacy':'الخصوصية','Terms':'الشروط','Request Access':'طلب الوصول','Submit an asset':'تقديم أصل','Sign in':'تسجيل الدخول'},
  es:{'Name':'Nombre','Email':'Correo electrónico','Phone':'Teléfono','Message':'Mensaje','Send request':'Enviar solicitud','Security':'Seguridad','Privacy':'Privacidad','Terms':'Términos'},
  fr:{'Name':'Nom','Email':'E-mail','Phone':'Téléphone','Message':'Message','Send request':'Envoyer la demande','Security':'Sécurité','Privacy':'Confidentialité','Terms':'Conditions'},
  zh:{'Name':'姓名','Email':'电子邮件','Phone':'电话','Message':'消息','Send request':'发送请求','Security':'安全','Privacy':'隐私','Terms':'条款'}
};
