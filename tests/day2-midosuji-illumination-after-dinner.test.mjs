import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {normalizePreferences,resolveDay,resolvedSegments} from '../data/experience.js';
import {detailedRouteGuide} from '../data/detailedTransit.js';
import {fareSummary} from '../data/transportPricing.js';
import {defaultTickets,importantStops} from '../data/travelTools.js';
import {galleryByDay} from '../data/gallery.js';
import {beginnerDayGuide} from '../data/beginnerGuide.js';

for(const mode of ['original','rainy','relaxed']){
 test('Day 2 '+mode+' has Midosuji Illumination right after the booked dinner',()=>{
  const p=normalizePreferences({dayPlans:{2:mode}});
  const day=resolveDay(2,p),a=day.schedule;
  const dinner=a.findIndex(x=>x.title==='Special Dinner');
  const walk=a.findIndex(x=>x.title==='STARDUST → Midosuji Umeda');
  const light=a.findIndex(x=>x.title==='Midosuji Illumination 2026 · Night Walk');
  const back=a.findIndex(x=>x.title==='Yodoyabashi → Daikokucho → Centara');
  assert.ok(dinner>=0&&walk>dinner&&light>walk&&back>light,JSON.stringify({mode,dinner,walk,light,back}));
  assert.equal(a[dinner].time,'18:15–20:00');
  assert.match(a[dinner].detail,/Confirmed booking/);
  assert.match(a[dinner].detail,/ยังไม่ยืนยัน/);
  assert.equal(a[light].time,'20:20–20:55');
  assert.match(a[light].detail,/17:00–01:00/);
  assert.match(a[light].detail,/เข้าฟรี/);
  assert.ok(!a.some(x=>x.title==='Kuromon Market'));
  const route=detailedRouteGuide(2,p).legs;
  const idx=route.findIndex(x=>x.to.includes('Midosuji Illumination Hanshin-mae'));
  assert.ok(idx>=0&&route[idx].from.includes('STARDUST'));
  assert.ok(route[idx+1].to.includes('Yodoyabashi'));
  assert.ok(route[idx+2].to.includes('Daikokucho'));
  assert.ok(route[idx+2].pay.includes('¥240'));
 });
}

test('Day 2 illumination is free, Metro return unchanged at ¥240/adult',()=>{
 const p=normalizePreferences({});
 const segments=resolvedSegments(2,p);
 assert.equal(segments.filter(x=>x.type==='metro').length,4);
 assert.ok(segments.some(x=>x.route==='Yodoyabashi → Daikokucho'));
 assert.ok(!segments.some(x=>x.route==='Umeda → Daikokucho'));
 const sum=fareSummary(2,segments,defaultTickets);
 assert.equal(sum.unresolved,0);
 assert.equal(sum.perPersonYen,960);
 assert.equal(sum.twoPeopleYen,1920);
 assert.ok(importantStops[2].some(x=>x.includes('Midosuji Illumination')));
});

test('Day 2 photo shows actual Midosuji lights with 2023 date stated',()=>{
 const cards=galleryByDay[2];
 assert.equal(cards.length,4);
 const photo=cards.find(x=>x.title.includes('Midosuji Illumination'));
 assert.equal(photo.image,'/photos/day-2-4.jpg');
 assert.match(photo.why,/2023/);
 const all=JSON.parse(fs.readFileSync(new URL('../data/photo-sources.json',import.meta.url),'utf8'));
 const attribution=all.find(x=>x.file==='day-2-4.jpg');
 assert.equal(attribution.creator,'coniferconifer');
 assert.equal(attribution.license,'CC BY 2.0');
 assert.match(attribution.source,/commons\.wikimedia\.org/);
 assert.match(beginnerDayGuide[2].label,/Midosuji Illumination/);
});
