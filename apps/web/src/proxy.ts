import { NextResponse, type NextRequest } from 'next/server';
import { createServerClient } from '@supabase/ssr';
import { SUPABASE_PUBLISHABLE_KEY, SUPABASE_URL } from './lib/supabase/config';

export async function proxy(request: NextRequest) {
  let response = NextResponse.next({ request });

  // The public site must remain available even if Supabase runtime configuration
  // is unavailable. Authentication is enforced only for protected routes.
  const protectedPath = /^\/(dashboard|onboarding|submit|account|data-room|deals|investor|seller|operations)(\/|$)/.test(request.nextUrl.pathname);

  if (!SUPABASE_URL || !SUPABASE_PUBLISHABLE_KEY) {
    if (protectedPath) return NextResponse.redirect(new URL('/login', request.url));
    return response;
  }

  try {
    const supabase = createServerClient(
      SUPABASE_URL,
      SUPABASE_PUBLISHABLE_KEY,
      {
        cookies: {
          getAll: () => request.cookies.getAll(),
          setAll: cookies => cookies.forEach(({ name, value, options }) => {
            response.cookies.set(name, value, options);
          }),
        },
      },
    );

    const { data: { user } } = await supabase.auth.getUser();
    if (protectedPath && !user) return NextResponse.redirect(new URL('/login', request.url));
  } catch {
    // Never turn the public marketplace/landing pages into HTTP 500 because
    // authentication infrastructure is temporarily unavailable.
    if (protectedPath) return NextResponse.redirect(new URL('/login', request.url));
  }

  return response;
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)'],
};
