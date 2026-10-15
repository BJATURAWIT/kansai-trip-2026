const encoder = new TextEncoder();

function getSigningSecret() {
  const secret = process.env.TRIP_SESSION_SECRET;
  if (!secret || secret.length < 32) throw new Error('TRIP_SESSION_SECRET must be configured');
  return secret;
}

async function hmacKey() {
  return crypto.subtle.importKey('raw', encoder.encode(getSigningSecret()), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign', 'verify']);
}

function toHex(bytes) {
  return [...new Uint8Array(bytes)].map(x => x.toString(16).padStart(2, '0')).join('');
}

export async function createSessionToken() {
  const expiry = String(Date.now() + 30 * 24 * 60 * 60 * 1000);
  const signature = await crypto.subtle.sign('HMAC', await hmacKey(), encoder.encode(expiry));
  return `${expiry}.${toHex(signature)}`;
}

export async function verifySessionToken(token) {
  if (!token || !/^\d{13}\.[0-9a-f]{64}$/.test(token)) return false;
  const [expiry, hex] = token.split('.');
  if (Number(expiry) <= Date.now()) return false;
  const signature = new Uint8Array(hex.match(/../g).map(x => parseInt(x, 16)));
  try {
    return await crypto.subtle.verify('HMAC', await hmacKey(), signature, encoder.encode(expiry));
  } catch {
    return false;
  }
}

export function safeNext(value) {
  return typeof value === 'string' && value.startsWith('/') && !value.startsWith('//') && !value.startsWith('/\\') && !value.includes('\\') ? value : '/';
}
