import NextAuth from 'next-auth';
import { authConfig } from './auth.config';

export default NextAuth(authConfig).auth;

let locales = ['en', 'fr'];

export function middleware(request: any) {
  if (
    request.nextUrl.pathname.startsWith('/_next') ||
    request.nextUrl.pathname.includes('/api/')
  ) {
    return;
  }

  // Check if there is any supported locale in the pathname
  const { pathname } = request.nextUrl;
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) return;

  // Redirect if there is no locale
  const locale = 'en';
  request.nextUrl.pathname = `/${locale}${pathname}`;
  // e.g. if the incoming request is /products
  // the new URL iwill be /en/products
  return Response.redirect(request.nextUrl);
}

export const config = {
  matcher: [
    '/([a-z]/movies)*',
    // ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
    // Skip all internal paths (_next)
    '/((?!_next).*)',
    // Only run on root (/) URL
    // '/',
  ],
};
