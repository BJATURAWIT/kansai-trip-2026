import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {galleryByDay} from '../data/gallery.js';
const photos=JSON.parse(fs.readFileSync(new URL('../data/photo-sources.json',import.meta.url),'utf8'));
test('all 8 day galleries contain only distinct actual-photo assets with known sources',()=>{
 assert.equal(Object.keys(galleryByDay).length,8);
 assert.equal(photos.length,39);
 const names=new Set(),images=new Set();
 for(const src of photos){
  assert.ok(!names.has(src.file),'duplicate manifest file: '+src.file);
  names.add(src.file);
  assert.ok(src.source?.startsWith('https://'),'missing attribution '+src.file);
  assert.ok(src.url?.startsWith('https://'),'missing source URL '+src.file);
 }
 for(let day=1;day<=8;day++){
  const cards=galleryByDay[day];
  assert.ok(cards?.length>=3,'gallery missing for day '+day);
  for(const card of cards){
   assert.ok(card.title&&card.map,'card missing title/map: day '+day);
   if(card.image){
    const filename=card.image.split('/').at(-1);
    assert.ok(names.has(filename)||filename==='day-8-crepe-user.webp','image file not in manifest or user upload: '+filename);
    assert.ok(!images.has(filename),'gallery reused file across different cards: '+filename);
    images.add(filename);
   }else{
    assert.equal(card.photoStatus,'official-embed','unlicensed photos must use official embed rather than image fallback');
    assert.match(card.embedUrl,/^https:\/\/www\.instagram\.com\/p\/[^/]+\/embed\/$/);
    assert.ok(card.photoSource?.startsWith('https://'),'missing official photo source');
   }
  }
 }
});
test('Day 4 and Day 8 landmarks and restaurant photos never use the same file',()=>{
 for(const day of [4,8]){
  const cards=galleryByDay[day];
  assert.equal(cards.length,day===4?6:4);
  assert.equal(new Set(cards.map(x=>x.image||x.embedUrl)).size,cards.length);
 }
 assert.equal(galleryByDay[5].length,6);
 assert.deepEqual(galleryByDay[5].slice(0,3).map(x=>x.image),['/photos/day-5-4.jpg','/photos/day-5-5.jpg','/photos/day-5-6.jpg']);
 assert.match(galleryByDay[4].find(x=>x.title.includes('Kodaiji')).image,/day-4-9/);
 assert.match(galleryByDay[8].find(x=>x.title.includes('Yasaka')).image,/day-8-4/);
 assert.match(galleryByDay[8].find(x=>x.title.includes('Rikuro')).image,/day-8-5/);
 assert.equal(galleryByDay[8].find(x=>x.title.includes('Crepe')).image,'/photos/day-8-crepe-user.webp');
 assert.equal(galleryByDay[8].find(x=>x.title.includes('Crepe')).photoStatus,'user-provided');
});
