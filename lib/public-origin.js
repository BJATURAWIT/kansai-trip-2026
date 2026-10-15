// Vercel may rewrite request.url to a deployment hostname while the browser
// sends Origin for the production alias. Compare the public Origin to the
// actual forwarded/Host values and our own verified project aliases.
const vercelAliases = new Set([
  'kansai-trip-2026-theta.vercel.app',
  'kansai-trip-2026-japen3.vercel.app',
  'kansai-trip-2026-git-main-japen3.vercel.app',
]);

function normalizedHost(value) {
  if (!value) return null;
  const host = String(value).split(',')[0].trim().toLowerCase();
  return /^[a-z0-9.-]+(?::[0-9]{1,5})?$/.test(host) ? host : null;
}

function isOurVercelHost(host) {
  return vercelAliases.has(host) ||
    /^kansai-trip-2026-[a-z0-9-]+-japen3\.vercel\.app$/.test(host);
}

export function getPublicOrigin(request) {
  const hosts = [
    normalizedHost(request.headers.get('host')),
    normalizedHost(request.headers.get('x-forwarded-host')),
    normalizedHost(new URL(request.url).host),
  ].filter(Boolean);

  const browserOrigin = request.headers.get('origin');
  if (browserOrigin) {
    let url;
    try { url = new URL(browserOrigin); } catch { return null; }
    // Production submissions must use HTTPS, including those from mobile.
    if (url.protocol !== 'https:' || url.username || url.password ||
        url.pathname !== '/' || url.search || url.hash) return null;
    const browserHost = normalizedHost(url.host);
    if (!browserHost || (!hosts.includes(browserHost) && !isOurVercelHost(browserHost))) {
      return null;
    }
    return url.origin;
  }

  // Non-browser clients may omit Origin. Use a known public Vercel alias
  // (never the internal request.url when a public Host is supplied).
  const publicHost = hosts.find(isOurVercelHost) || hosts[0];
  return publicHost ? 'https://' + publicHost : null;
}
