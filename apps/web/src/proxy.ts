import { NextResponse, type NextRequest } from 'next/server';
import { createServerClient } from '@supabase/ssr';
import { SUPABASE_PUBLISHABLE_KEY, SUPABASE_URL } from './lib/supabase/config';

export async function proxy(request: NextRequest) {
  let response = NextResponse.next({ request });

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

    // Verify the JWT cryptographically. Do not use getSession()/getUser()
    // as the authorization primitive in middleware/proxy.
    const { data: claimsData } = await supabase.auth.getClaims();
    if (protectedPath && !claimsData?.claims?.sub) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  } catch {
    if (protectedPath) return NextResponse.redirect(new URL('/login', request.url));
  }

  return response;
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)'],
};
