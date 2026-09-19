import { createClient } from '@/lib/supabase/server';

const BUCKET = 'property-images';
const CACHE_CONTROL = 'public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800';

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

  return new Response(data, {
    status: 200,
    headers: {
      'Content-Type': data.type || 'application/octet-stream',
      'Cache-Control': CACHE_CONTROL,
      'X-Content-Type-Options': 'nosniff',
    },
  });
}