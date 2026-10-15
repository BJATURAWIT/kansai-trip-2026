const enc=new TextEncoder();
const secret=()=>process.env.TRIP_SESSION_SECRET;
async function key(){if(!secret())throw Error('Missing TRIP_SESSION_SECRET');return crypto.subtle.importKey('raw',enc.encode(secret()),{name:'HMAC',hash:'SHA-256'},false,['sign','verify']);}
const hex=b=>Array.from(new Uint8Array(b)).map(x=>x.toString(16).padStart(2,'0')).join('');
export async function token(){const exp=String(Date.now()+30*86400000);const sig=await crypto.subtle.sign('HMAC',await key(),enc.encode(exp));return exp+'.'+hex(sig);}
export async function valid(t){if(!t||!/^\d{13}\.[a-f0-9]{64}$/.test(t))return false;const [e,h]=t.split('.');if(+e<Date.now())return false;try{return await crypto.subtle.verify('HMAC',await key(),new Uint8Array(h.match(/../g).map(v=>parseInt(v,16))),enc.encode(e));}catch{return false}}
export const safeNext=x=>typeof x==='string'&&x.startsWith('/')&&!x.startsWith('//')&&!x.includes('\\')?x:'/';