import test from 'node:test';
import assert from 'node:assert/strict';
import { getPublicOrigin } from '../lib/public-origin.js';

const request = (origin, host, forwardedHost, internalUrl = 'https://kansai-trip-2026-ekvey6yb4-japen3.vercel.app/api/unlock') => ({
  url: internalUrl,
  headers: new Headers({
    ...(origin ? { origin } : {}),
    ...(host ? { host } : {}),
    ...(forwardedHost ? { 'x-forwarded-host': forwardedHost } : {}),
  }),
});

test('public production alias survives Vercel proxy URL rewrite', () => {
  assert.equal(getPublicOrigin(request('https://kansai-trip-2026-theta.vercel.app', 'internal.vercel.app')),
    'https://kansai-trip-2026-theta.vercel.app');
});
test('project scope alias is accepted', () => {
  assert.equal(getPublicOrigin(request('https://kansai-trip-2026-japen3.vercel.app', 'internal.vercel.app')),
    'https://kansai-trip-2026-japen3.vercel.app');
});
test('forwarded host allows matching custom domain', () => {
  assert.equal(getPublicOrigin(request('https://travel.example.com', 'internal.vercel.app', 'travel.example.com')),
    'https://travel.example.com');
});
test('cross-origin form post is refused', () => {
  assert.equal(getPublicOrigin(request('https://attacker.example.com', 'kansai-trip-2026-theta.vercel.app')), null);
});
test('insecure browser origins are refused', () => {
  assert.equal(getPublicOrigin(request('http://kansai-trip-2026-theta.vercel.app', 'kansai-trip-2026-theta.vercel.app')), null);
});
test('non-browser request without Origin uses public Host', () => {
  assert.equal(getPublicOrigin(request(null, 'kansai-trip-2026-theta.vercel.app')),
    'https://kansai-trip-2026-theta.vercel.app');
});
