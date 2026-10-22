import { NextResponse } from 'next/server';
import { get, put } from '@vercel/blob';
import { verifySessionToken } from '../../../lib/access';
import { checklist } from '../../../data/trip';
export const runtime='nodejs';
export const dynamic='force-dynamic';
const path='kansai-trip-2026/checklist.json';
const allowed=new Set(checklist.map(x=>x.id));
const headers={'Cache-Control':'no-store'};
async function authorize(req){return verifySessionToken(req.cookies.get('kansai_access')?.value)}
export async function GET(request){
  if(!await authorize(request))return NextResponse.json({error:'Unauthorized'},{status:401,headers});
  try{
    const file=await get(path,{access:'private',useCache:false});
    if(!file||file.statusCode===404)return NextResponse.json({exists:false},{headers});
    if(file.statusCode!==200||!file.stream)throw Error('storage read error');
    const saved=await new Response(file.stream).json();
    return NextResponse.json({exists:true,checked:saved.checked,updatedAt:saved.updatedAt},{headers});
  }catch(e){console.error('checklist GET',e);return NextResponse.json({error:'Storage unavailable'},{status:503,headers})}
}
export async function POST(request){
  if(!await authorize(request))return NextResponse.json({error:'Unauthorized'},{status:401,headers});
  try{
    const body=await request.json();
    if(!body?.checked||typeof body.checked!=='object'||Array.isArray(body.checked))return NextResponse.json({error:'Invalid data'},{status:400,headers});
    const checked={};
    for(const [key,value] of Object.entries(body.checked)){
      if(!allowed.has(key)||typeof value!=='boolean')return NextResponse.json({error:'Invalid item'},{status:400,headers});
      checked[key]=value;
    }
    const saved={checked,updatedAt:new Date().toISOString()};
    await put(path,JSON.stringify(saved),{access:'private',addRandomSuffix:false,allowOverwrite:true,contentType:'application/json'});
    return NextResponse.json({ok:true,updatedAt:saved.updatedAt},{headers});
  }catch(e){console.error('checklist POST',e);return NextResponse.json({error:'Storage unavailable'},{status:503,headers})}
}
