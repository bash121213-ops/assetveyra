import { NextRequest } from 'next/server';

const ALLOWED_HOSTS = new Set([
  'www.luxuryestate.com',
  'd1ov4zfz2t2vta.cloudfront.net',
  'assets.simpleviewinc.com',
  'www.smergers.com',
  'cdn.thinkwebcontent.com',
  'dalsyria.com',
  'img-2.aqarmap.com.eg',
  'img-4.aqarmap.com.eg',
  'yafaoffice.com',
  'www.propertyfinder.ae',
  'www.propertyfinder.eg',
  'jo.opensooq.com',
]);

function isAllowed(url: URL) {
  return url.protocol === 'https:' && ALLOWED_HOSTS.has(url.hostname);
}

function isAllowedImage(url: URL, source: URL) {
  if (url.protocol !== 'https:') return false;
  if (isAllowed(url)) return true;
  const sourceRoot = source.hostname.split('.').slice(-2).join('.');
  const imageRoot = url.hostname.split('.').slice(-2).join('.');
  return sourceRoot === imageRoot;
}

function extractOgImage(html: string, baseUrl: URL) {
  const match = html.match(/<meta[^>]+property=[\"']og:image[\"'][^>]+content=[\"']([^\"']+)[\"'][^>]*>/i)
    ?? html.match(/<meta[^>]+content=[\"']([^\"']+)[\"'][^>]+property=[\"']og:image[\"'][^>]*>/i);
  if (!match?.[1]) return null;
  try {
    const imageUrl = new URL(match[1], baseUrl);
    return isAllowedImage(imageUrl, baseUrl) ? imageUrl : null;
  } catch {
    return null;
  }
}

async function fetchAllowed(url: URL, redirects = 0) {
  if (redirects > 3) return null;
  const response = await fetch(url, {
    headers: { 'User-Agent': 'AssetVeyra/1.0 (+https://assetveyra.com)' },
    cache: 'no-store',
    redirect: 'manual',
  });

  if (response.status >= 300 && response.status < 400) {
    const location = response.headers.get('location');
    if (!location) return null;
    try {
      const redirected = new URL(location, url);
      if (!isAllowed(redirected)) return null;
      return fetchAllowed(redirected, redirects + 1);
    } catch {
      return null;
    }
  }

  return response;
}

export async function GET(request: NextRequest) {
  const raw = request.nextUrl.searchParams.get('url');
  if (!raw) return new Response('Missing image URL', { status: 400 });

  let target: URL;
  try {
    target = new URL(raw);
  } catch {
    return new Response('Invalid image URL', { status: 400 });
  }

  if (!isAllowed(target)) return new Response('Image host not allowed', { status: 403 });

  try {
    const response = await fetchAllowed(target);
    if (!response) return new Response('Image unavailable', { status: 404 });

    const contentType = response.headers.get('content-type') ?? '';
    if (response.ok && ['image/jpeg', 'image/png', 'image/webp', 'image/avif'].includes(contentType.split(';', 1)[0].toLowerCase())) {
      return new Response(response.body, {
        status: 200,
        headers: {
          'Content-Type': contentType,
          'Cache-Control': 'public, max-age=3600, s-maxage=86400',
        },
      });
    }

    if (response.ok && contentType.includes('text/html')) {
      const html = await response.text();
      const imageUrl = extractOgImage(html, target);
      if (imageUrl) {
        const imageResponse = await fetchAllowed(imageUrl);
        const imageType = imageResponse?.headers.get('content-type') ?? '';
        if (imageResponse?.ok && ['image/jpeg', 'image/png', 'image/webp', 'image/avif'].includes(imageType.split(';', 1)[0].toLowerCase())) {
          return new Response(imageResponse.body, {
            status: 200,
            headers: {
              'Content-Type': imageType,
              'Cache-Control': 'public, max-age=3600, s-maxage=86400',
            },
          });
        }
      }
    }
  } catch {
    // Fall through to a stable 404 so the UI can show its explicit image-unavailable state.
  }

  return new Response('Image unavailable', { status: 404 });
}
