import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const locales = ['en', 'ru'] as const;
const defaultLocale = 'en' as const;

const isProtectedRoute = createRouteMatcher(['/en/bookings(.*)', '/en/book(.*)', '/en/admin(.*)', '/ru/bookings(.*)', '/ru/book(.*)', '/ru/admin(.*)']);

// SEO and static files that should NOT be redirected with locale
const seoAndStaticFiles = [
  '/sitemap.xml',
  '/robots.txt',
  '/favicon.ico',
  '/apple-touch-icon.png',
  '/icon.png',
  '/manifest.json',
  '/sw.js',
  '/service-worker.js',
  'yandex_b695a93374d0e257.html'
];

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
  if (acceptLanguage.includes('en')) return 'en';
  return defaultLocale;
}

export default clerkMiddleware(async (auth, req) => {
  const { pathname } = req.nextUrl;
  
  // Skip internal Next.js paths and api routes
  if (pathname.startsWith('/_next') || pathname.startsWith('/api')) {
    return;
  }
  
  // Skip SEO and static files - these should be accessible at root level
  if (seoAndStaticFiles.includes(pathname)) {
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