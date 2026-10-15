import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dir = path.join(root, 'public', 'photos');
const dataFile = path.join(root, 'data', 'gallery.js');
const strict = process.env.PHOTOS_REQUIRED === '1';
const queries = [
  ['Dotonbori Osaka night Glico neon', 'Shinsekai Tsutenkaku Osaka', 'Namba Osaka street night'],
  ['Osaka castle cherry park', 'Kuromon Ichiba Market Osaka', 'Umeda Sky Building Osaka'],
  ['Universal Studios Japan globe', 'Universal Studios Japan Nintendo World', 'Wizarding World Harry Potter Universal Studios Japan castle'],
  ['Fushimi Inari Kyoto torii', 'Kiyomizu dera Kyoto temple', 'Gion Kyoto street'],
  ['Nara park deer Japan', 'Todaiji Daibutsuden Nara', 'Kasuga Taisha Nara shrine'],
  ['JR West Kounotori train', 'Kinosaki Onsen town canal', 'Kinosaki Onsen Yukata street'],
  ['Kinosaki Onsen morning street', 'Gosho no Yu Kinosaki Onsen', 'Shinsaibashi Osaka at night'],
  ['Namba Osaka shopping street', 'Nankai Rapit train Osaka', 'Kansai International Airport exterior'],
];
const safeHtmlText = html => String(html || '').replace(/<[^>]*>/g, '').replaceAll('&amp;', '&').replaceAll('&quot;', '"').trim();
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
const allowedLicense = s => /^(CC0|PD|Public domain|CC BY|CC-BY|cc-by)/i.test(s) && !/NC|ND/i.test(s);
const mimeOK = (mime, filename) => mime === 'image/jpeg' && /\.jpe?g$/i.test(filename);

async function timedFetch(url, opts = {}) {
  const c = new AbortController();
  const timer = setTimeout(() => c.abort(), 18000);
  try {return await fetch(url, { ...opts, signal: c.signal, headers: { 'User-Agent': 'KansaiTripPlanner/1.0 (personal travel site, credits in public/photos/credits.json)', ...opts.headers }});}
  finally {clearTimeout(timer);}
}
async function getJSON(params) {
  const uri = `https://commons.wikimedia.org/w/api.php?${new URLSearchParams(params)}`;
  for (let i = 0; i < 3; i++) {
    try {
      const response = await timedFetch(uri);
      if (!response.ok) throw new Error(`Commons API ${response.status}`);
      return await response.json();
    } catch (e) {if (i === 2) throw e; await sleep(550 * (i + 1));}
  }
}
async function download(candidate, filepath) {
  const url = candidate.thumburl || candidate.url;
  if (!url || !url.startsWith('https://upload.wikimedia.org/')) throw new Error('Unexpected download host');
  const response = await timedFetch(url);
  if (!response.ok) throw new Error(`Image ${response.status}`);
  if (!(response.headers.get('content-type') || '').includes('image/')) throw new Error('Not image');
  const data = Buffer.from(await response.arrayBuffer());
  if (data.length < 6000 || data.length > 3200000 || data[0] !== 0xff || data[1] !== 0xd8) throw new Error('Invalid JPEG');
  await fs.writeFile(filepath, data);
  return data.length;
}

async function searchCandidates(query) {
  const json = await getJSON({action:'query',generator:'search',gsrsearch:query,gsrnamespace:'6',gsrlimit:'15',prop:'imageinfo',iiprop:'url|mime|size|extmetadata',iiurlwidth:'960',format:'json',formatversion:'2'});
  const pages = json?.query?.pages || [];
  return pages.filter(page => Array.isArray(page.imageinfo) && page.imageinfo.length).map(page => ({ ...page.imageinfo[0], title: page.title })).filter(info => {
    const lic = safeHtmlText(info.extmetadata?.LicenseShortName?.value || info.extmetadata?.License?.value);
    return mimeOK(info.mime, info.title) && allowedLicense(lic) && info.width >= 850 && info.height >= 550;
  });
}

await fs.mkdir(dir, { recursive:true });
const credits = [];
const failed = [];
let downloaded = 0;
let reused = 0;

for (let day = 1; day <= 8; day++) {
  for (let index = 0; index < 3; index++) {
    const name = `day-${day}-${index + 1}.jpg`;
    const file = path.join(dir, name);
    let existing = false;
    try {const stat = await fs.stat(file);existing = stat.size > 6000;} catch {}
    if (existing) {
      reused++;
      continue;
    }
    const query = queries[day-1][index];
    try {
      const candidates = await searchCandidates(query);
      let success = false;
      for (const candidate of candidates.slice(0, 5)) {
        try {
          const bytes = await download(candidate, file);
          const lic = safeHtmlText(candidate.extmetadata?.LicenseShortName?.value || candidate.extmetadata?.License?.value);
          credits.push({ file: name, title: candidate.title, license: lic, author: safeHtmlText(candidate.extmetadata?.Artist?.value), attribution: safeHtmlText(candidate.extmetadata?.Attribution?.value), source: `https://commons.wikimedia.org/wiki/${encodeURIComponent(candidate.title.replaceAll(' ', '_'))}`, downloadedBytes: bytes });
          downloaded++;
          success = true;
          break;
        } catch (e) {console.log(`[image candidate unavailable] ${name}: ${e.message}`);}
      }
      if (!success) throw new Error(`No downloadable licensed photo for ${query}`);
    } catch (e) {
      failed.push({file:name, query, reason:e.message});
      console.warn(`[photo missing] ${name}: ${e.message}`);
    }
  }
}
// Merge previous credits for already-cached files.
try {
  const prior = JSON.parse(await fs.readFile(path.join(dir, 'credits.json'), 'utf8'));
  for (const credit of prior) if (!credits.some(row=>row.file === credit.file)) credits.push(credit);
} catch {}
credits.sort((a,b) => a.file.localeCompare(b.file, undefined, {numeric:true}));
await fs.writeFile(path.join(dir,'credits.json'), JSON.stringify(credits,null,2) + '\n');
await fs.writeFile(path.join(dir,'MISSING.txt'), failed.map(x => `${x.file}\t${x.query}\t${x.reason}`).join('\n') + (failed.length ? '\n' : ''));
console.log(`Self-hosted photos: ${downloaded} newly downloaded, ${reused} cached, ${failed.length} missing (of 24).`);
if (strict && failed.length) process.exit(1);
