import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const dir=path.join(root,'public','photos');
const sources=JSON.parse(await fs.readFile(path.join(root,'data','photo-sources.json'),'utf8'));
await fs.mkdir(dir,{recursive:true});
if(sources.length!==39)throw Error('Photo manifest must contain all 39 images');
const failures=[];const successes=[];
for(const x of sources){
 const filename=x.file;
 if(!/^day-[1-8]-(?:[1-9]|10)\.jpg$/.test(filename))throw Error('Invalid image file name: '+filename);
 const filepath=path.join(dir,filename);
 try {
  const stat=await fs.stat(filepath);
  if(stat.size>=9000){successes.push(filename);continue;}
 } catch {}
 let saved=false,reason='No valid image';
 // Commons may respond 429 on consecutive Vercel builds. Retry the exact same
 // licensed photo through a cached image proxy only when the source fails.
 const candidates=[x.url];
 if(x.url.includes('commons.wikimedia.org/wiki/Special:FilePath/'))candidates.push('https://images.weserv.nl/?url='+encodeURIComponent(x.url)+'&output=jpg');
 for(const candidate of candidates){
  try{
   const ctrl=new AbortController();const timer=setTimeout(()=>ctrl.abort(),18000);
   let res;
   try{res=await fetch(candidate,{signal:ctrl.signal,headers:{'User-Agent':'KansaiTrip2026/1.0'}});}
   finally{clearTimeout(timer);}
   if(!res.ok)throw Error('HTTP '+res.status);
   if(!res.headers.get('content-type')?.startsWith('image/'))throw Error('Unexpected media type');
   const b=Buffer.from(await res.arrayBuffer());
   if(b.length<8000||b.length>2500000||b[0]!==255||b[1]!==216)throw Error('Invalid JPEG data');
   await fs.writeFile(filepath,b);successes.push(filename);saved=true;
   console.log('PHOTO OK',filename,b.length,candidate===x.url?'source':'verified-source-cache');
   break;
  }catch(e){reason=e.message;console.warn('PHOTO RETRY',filename,reason);}
 }
 if(!saved){failures.push(filename+' '+reason);console.error('PHOTO ERROR',filename,reason);}

}
await fs.writeFile(path.join(dir,'credits.json'),JSON.stringify(sources.map(x=>({file:x.file,license:x.license,creator:x.creator,source:x.source})),null,2));
if(successes.length!==39||failures.length){
 console.error('Photo validation failed. Successful:',successes.length,'Missing:',failures.join('; '));
 process.exit(1);
}
console.log('Photo validation succeeded: 39/39 self-hosted JPEG images.');
