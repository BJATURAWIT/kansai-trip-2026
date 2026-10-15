import { NextResponse } from 'next/server';
import { timingSafeEqual } from 'node:crypto';
import { createSessionToken, safeNext } from '../../../lib/access';

export const runtime = 'nodejs';

/**
 * Form login uses relative Location headers. Vercel may expose an internal
 * deployment hostname through request.url, whereas the visitor uses a public
 * alias. A relative redirect stays on the visitor's actual hostname.
 *
 * Deliberately do NOT validate Origin on this shared-PIN login endpoint:
 * browsers and hosting proxies can omit/rewrite it, which locked out users.
 * The action merely issues a Secure/HttpOnly/SameSite session cookie after
 * verifying the PIN on the server. No sensitive data is returned to callers.
 */
function redirectTo(path) {
  const response = new NextResponse(null, {
    status: 303,
    headers: { Location: path, 'Cache-Control': 'no-store' },
  });
  return response;
}

export async function POST(request) {
  const expected = process.env.TRIP_ACCESS_KEY;
  if (!expected || !process.env.TRIP_SESSION_SECRET) {
    return new Response('The access gate is not configured.', {
      status: 503, headers: { 'Cache-Control': 'no-store' },
    });
  }

  const form = await request.formData();
  if (String(form.get('website') ?? '').trim()) {
    return new Response('Bad request.', {
      status: 400, headers: { 'Cache-Control': 'no-store' },
    });
  }

  const supplied = String(form.get('code') ?? '').trim();
  const next = safeNext(form.get('next'));
  const lhs = Buffer.from(supplied);
  const rhs = Buffer.from(expected);
  const valid = /^\d{6}$/.test(supplied) &&
    lhs.length === rhs.length && timingSafeEqual(lhs, rhs);

  if (!valid) {
    const params = new URLSearchParams({ error: '1' });
    if (next !== '/') params.set('next', next);
    return redirectTo('/unlock?' + params.toString());
  }

  const response = redirectTo(next === '/unlock' ? '/' : next);
  response.cookies.set('kansai_access', await createSessionToken(), {
    httpOnly: true, secure: true, sameSite: 'strict',
    path: '/', maxAge: 30 * 24 * 60 * 60, priority: 'high',
  });
  return response;
}
