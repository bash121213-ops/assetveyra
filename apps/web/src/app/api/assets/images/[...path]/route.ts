import { createClient } from '@/lib/supabase/server';

const BUCKET = 'property-images';
const CACHE_CONTROL = 'public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800';

function detectImageContentType(bytes: Uint8Array, fallback: string) {
  if (bytes.length >= 8 && bytes[0] === 0x89 && bytes[1] === 0x50 && bytes[2] === 0x4e && bytes[3] === 0x47) {
    return 'image/png';
  }

  if (bytes.length >= 3 && bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff) {
    return 'image/jpeg';
  }

  if (bytes.length >= 6 && bytes[0] === 0x47 && bytes[1] === 0x49 && bytes[2] === 0x46) {
    return 'image/gif';
  }

  if (
    bytes.length >= 12 &&
    bytes[0] === 0x52 &&
    bytes[1] === 0x49 &&
    bytes[2] === 0x46 &&
    bytes[3] === 0x46 &&
    bytes[8] === 0x57 &&
    bytes[9] === 0x45 &&
    bytes[10] === 0x42 &&
    bytes[11] === 0x50
  ) {
    return 'image/webp';
  }

  return fallback;
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ path: string[] }> },
) {
  const { path } = await params;
  const storagePath = path.map((segment) => decodeURIComponent(segment)).join('/');

  if (!storagePath || storagePath.includes('..')) return new Response('Not found', { status: 404 });

  const supabase = await createClient();
  const { data: image, error: imageError } = await supabase
    .from('published_asset_images')
    .select('id')
    .eq('storage_path', storagePath)
    .maybeSingle();

  if (imageError || !image) return new Response('Not found', { status: 404 });

  const { data, error } = await supabase.storage.from(BUCKET).download(storagePath);
  if (error || !data) return new Response('Image unavailable', { status: 404 });

  const bytes = new Uint8Array(await data.arrayBuffer());
  const contentType = detectImageContentType(bytes, data.type || 'application/octet-stream');

  return new Response(bytes, {
    status: 200,
    headers: {
      'Content-Type': contentType,
      'Cache-Control': CACHE_CONTROL,
      'X-Content-Type-Options': 'nosniff',
    },
  });
}
