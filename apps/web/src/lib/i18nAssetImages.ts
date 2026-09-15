import { TRANSLATIONS, type Locale } from '@/lib/i18n';

const entries: Record<string, Record<Locale, string>> = {
  'Property images': { en: 'Property images', ar: 'صور العقار', zh: '物业图片', es: 'Imágenes del inmueble', fr: 'Images du bien' },
  'Up to 20 images. Images are compressed before upload.': { en: 'Up to 20 images. Images are compressed before upload.', ar: 'حتى 20 صورة. يتم ضغط الصور قبل الرفع.', zh: '最多 20 张图片。上传前会自动压缩。', es: 'Hasta 20 imágenes. Se comprimen antes de subirlas.', fr: 'Jusqu’à 20 images. Elles sont compressées avant l’envoi.' },
  'Preparing images…': { en: 'Preparing images…', ar: 'جارٍ تجهيز الصور…', zh: '正在准备图片…', es: 'Preparando imágenes…', fr: 'Préparation des images…' },
  'Remove': { en: 'Remove', ar: 'إزالة', zh: 'إزالة', es: 'Quitar', fr: 'Supprimer' },
  'ASSET MEDIA': { en: 'ASSET MEDIA', ar: 'صور الأصل', zh: '资产媒体', es: 'MEDIOS DEL ACTIVO', fr: 'MÉDIAS DU BIEN' },
  'Manage property images. The first image is the marketplace thumbnail.': { en: 'Manage property images. The first image is the marketplace thumbnail.', ar: 'إدارة صور العقار. الصورة الأولى هي الصورة المصغرة في السوق.', zh: '管理物业图片。第一张图片将作为市场缩略图。', es: 'Gestione las imágenes del inmueble. La primera será la miniatura del mercado.', fr: 'Gérez les images du bien. La première image sera la miniature du marché.' },
  'Upload images': { en: 'Upload images', ar: 'رفع الصور', zh: '上传图片', es: 'Subir imágenes', fr: 'Téléverser les images' },
  'Images are compressed in the browser before they are stored securely.': { en: 'Images are compressed in the browser before they are stored securely.', ar: 'يتم ضغط الصور في المتصفح قبل تخزينها بشكل آمن.', zh: '图片会在浏览器中压缩后再安全存储。', es: 'Las imágenes se comprimen en el navegador antes de almacenarse de forma segura.', fr: 'Les images sont compressées dans le navigateur avant leur stockage sécurisé.' },
  'Image order': { en: 'Image order', ar: 'ترتيب الصور', zh: '图片顺序', es: 'Orden de las imágenes', fr: 'Ordre des images' },
  'Drag an image to change its order. The first image becomes the marketplace thumbnail.': { en: 'Drag an image to change its order. The first image becomes the marketplace thumbnail.', ar: 'اسحب الصورة لتغيير ترتيبها. الصورة الأولى تصبح الصورة المصغرة في السوق.', zh: '拖动图片调整顺序。第一张图片将成为市场缩略图。', es: 'Arrastre una imagen para cambiar su orden. La primera será la miniatura del mercado.', fr: 'Faites glisser une image pour modifier son ordre. La première devient la miniature du marché.' },
  'No property images yet.': { en: 'No property images yet.', ar: 'لا توجد صور للعقار بعد.', zh: '暂无物业图片。', es: 'Aún no hay imágenes del inmueble.', fr: 'Aucune image du bien pour le moment.' },
  'Upload images from the asset submission form.': { en: 'Upload images from the asset submission form.', ar: 'ارفع الصور من نموذج إرسال الأصل.', zh: '请从资产提交表单上传图片。', es: 'Suba las imágenes desde el formulario de envío del activo.', fr: 'Téléversez les images depuis le formulaire de soumission de l’actif.' },
  'Saving image changes…': { en: 'Saving image changes…', ar: 'جارٍ حفظ تغييرات الصور…', zh: '正在保存图片更改…', es: 'Guardando cambios de imágenes…', fr: 'Enregistrement des modifications…' },
  'Main image': { en: 'Main image', ar: 'الصورة الرئيسية', zh: '主图', es: 'Imagen principal', fr: 'Image principale' },
  'Delete': { en: 'Delete', ar: 'حذف', zh: '删除', es: 'Eliminar', fr: 'Supprimer' }
};

for (const [key, value] of Object.entries(entries)) TRANSLATIONS[key] = value;
