import { NextResponse } from 'next/server';
import { verifySessionToken } from './lib/access';

function applySecurityHeaders(response) {
  response.headers.set('Cache-Control', 'no-store');
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'no-referrer');
  response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=(), payment=(), usb=()');
  response.headers.set('Cross-Origin-Opener-Policy', 'same-origin');
  response.headers.set('Cross-Origin-Resource-Policy', 'same-origin');
  response.headers.set('Content-Security-Policy', [
    "default-src 'self'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
    "object-src 'none'",
    "img-src 'self' data: https:",
    "style-src 'self' 'unsafe-inline'",
    "script-src 'self' 'unsafe-inline'",
    "font-src 'self' data:",
    "connect-src 'self'",
    "upgrade-insecure-requests",
  ].join('; '));
  return response;
}

export async function middleware(request) {
  const { pathname, search } = request.nextUrl;
  if (pathname === '/unlock' || pathname === '/api/unlock') return applySecurityHeaders(NextResponse.next());
  if (await verifySessionToken(request.cookies.get('kansai_access')?.value)) return applySecurityHeaders(NextResponse.next());
  const login = new URL('/unlock', request.url);
  if (pathname !== '/') login.searchParams.set('next', pathname + search);
  return applySecurityHeaders(NextResponse.redirect(login));
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|icon|apple-icon|manifest.webmanifest|robots.txt|sitemap.xml).*)'],
};
