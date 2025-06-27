import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const locales = ['en', 'ru'] as const;
const defaultLocale = 'en' as const;

const isProtectedRoute = createRouteMatcher(['/bookings(.*)', '/book(.*)']);

function getLocale(request: NextRequest): string {
  // Check if locale is in URL
  const pathname = request.nextUrl.pathname;
  const pathnameLocale = locales.find(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );
  
  if (pathnameLocale) return pathnameLocale;
  
  // Check Accept-Language header
  const acceptLanguage = request.headers.get('accept-language') || '';
  
  // Simple language detection
  if (acceptLanguage.includes('ru')) return 'ru';
  return defaultLocale;
}

export default clerkMiddleware(async (auth, req) => {
  const { pathname } = req.nextUrl;
  
  // Skip internal Next.js paths and api routes
  if (pathname.startsWith('/_next') || pathname.startsWith('/api')) {
    return;
  }
  
  // Check if pathname has locale
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );
  
  // Redirect if no locale in pathname
  if (!pathnameHasLocale) {
    const locale = getLocale(req);
    const newPathname = `/${locale}${pathname === '/' ? '' : pathname}`;
    return NextResponse.redirect(new URL(newPathname, req.url));
  }
  
  // Handle protected routes (preserve your existing Clerk protection)
  if (isProtectedRoute(req)) {
    await auth.protect();
  }
});

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
};