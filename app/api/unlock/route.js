import { NextResponse } from 'next/server';
import { timingSafeEqual } from 'node:crypto';
import { createSessionToken, safeNext } from '../../../lib/access';
import { getPublicOrigin } from '../../../lib/public-origin';

export const runtime = 'nodejs';

export async function POST(request) {
  const publicOrigin = getPublicOrigin(request);
  if (!publicOrigin) {
    return new Response('Invalid origin.', { status: 403, headers: { 'Cache-Control': 'no-store' } });
  }

  const form = await request.formData();
  const trap = String(form.get('website') ?? '').trim();
  if (trap) {
    return new Response('Bad request.', { status: 400, headers: { 'Cache-Control': 'no-store' } });
  }

  const supplied = String(form.get('code') ?? '').trim();
  const expected = process.env.TRIP_ACCESS_KEY;
  const next = safeNext(form.get('next'));
  if (!expected || !process.env.TRIP_SESSION_SECRET) {
    return new Response('The access gate is not configured.', { status: 503, headers: { 'Cache-Control': 'no-store' } });
  }

  const lhs = Buffer.from(supplied);
  const rhs = Buffer.from(expected);
  const valid = /^\d{6}$/.test(supplied) && lhs.length === rhs.length && timingSafeEqual(lhs, rhs);
  if (!valid) {
    const failed = new URL('/unlock?error=1', publicOrigin);
    if (next !== '/') failed.searchParams.set('next', next);
    const response = NextResponse.redirect(failed, { status: 303 });
    response.headers.set('Cache-Control', 'no-store');
    return response;
  }

  const response = NextResponse.redirect(new URL(next === '/unlock' ? '/' : next, publicOrigin), { status: 303 });
  response.cookies.set('kansai_access', await createSessionToken(), {
    httpOnly: true, secure: true, sameSite: 'strict', path: '/',
    maxAge: 30 * 24 * 60 * 60, priority: 'high',
  });
  response.headers.set('Cache-Control', 'no-store');
  return response;
}
