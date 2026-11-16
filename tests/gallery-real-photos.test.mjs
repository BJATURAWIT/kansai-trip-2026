import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {galleryByDay} from '../data/gallery.js';
const photos=JSON.parse(fs.readFileSync(new URL('../data/photo-sources.json',import.meta.url),'utf8'));
test('all nine day galleries have distinct photos with proper source licenses',()=>{
 assert.equal(Object.keys(galleryByDay).length,9);
 assert.equal(photos.length,41);
 const names=new Set(),images=new Set();
 for(const src of photos){
  assert.ok(!names.has(src.file),'duplicate photo: '+src.file);
  names.add(src.file);
  assert.ok(src.url?.startsWith('https://'),'missing photo URL '+src.file);
  assert.ok(src.source?.startsWith('https://'),'missing source attribution '+src.file);
 }
 for(let day=1;day<=9;day++){
  const cards=galleryByDay[day];
  assert.ok(cards?.length>=3,'missing gallery for day '+day);
  for(const card of cards){
   assert.ok(card.title&&card.map,'missing title/map '+day);
   if(card.image){
    const filename=card.image.split('/').at(-1);
    assert.ok(names.has(filename)||filename==='day-8-crepe-user.webp','image missing from manifest: '+filename);
    assert.ok(!images.has(filename),'duplicate photo across gallery cards: '+filename);
    images.add(filename);
   }else{
    assert.equal(card.photoStatus,'official-embed');
    assert.match(card.embedUrl,/^https:\/\/www\.instagram\.com\/p\//);
   }
  }
 }
});
test('Kyoto East photos moved to day 8 and original Namba photos to day 9',()=>{
 assert.equal(galleryByDay[8].length,3);
 assert.equal(galleryByDay[9].length,4);
 assert.ok(galleryByDay[8].some(x=>x.title.includes('Fushimi')&&x.image==='/photos/day-8-7.jpg'));
 assert.ok(galleryByDay[8].some(x=>x.title.includes('Kiyomizu')&&x.image==='/photos/day-8-8.jpg'));
 assert.ok(galleryByDay[8].some(x=>x.title.includes('Yasaka')&&x.image==='/photos/day-8-9.jpg'));
 assert.equal(galleryByDay[9].find(x=>x.title.includes('Crepe')).image,'/photos/day-8-crepe-user.webp');
 assert.equal(galleryByDay[9].find(x=>x.title.includes('Crepe')).photoStatus,'user-provided');
 assert.match(galleryByDay[9].find(x=>x.title.includes('Rikuro')).image,/day-8-5/);
 assert.match(galleryByDay[4].find(x=>x.title.includes('Kodaiji')).image,/day-4-9/);
});
