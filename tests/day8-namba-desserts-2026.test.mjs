import test from 'node:test';
import assert from 'node:assert/strict';
import {itinerary} from '../data/trip.js';
import {normalizePreferences,resolvedSchedule,resolvedSegments} from '../data/experience.js';
import {foodStopsForDay,validateFoodPlan} from '../data/foodExperience.js';
import {detailedRouteGuide} from '../data/detailedTransit.js';
import {pricedSegment} from '../data/transportPricing.js';
import {passEndDate,defaultTickets} from '../data/travelTools.js';
const p=normalizePreferences({});
test('24 November Day 8 visits Fushimi Inari and Kiyomizu, while JR Pass stays valid',()=>{
 const s=resolvedSchedule(8,p);
 assert.equal(itinerary[7].date,'24 NOV');
 assert.ok(s.some(x=>x.title.includes('Fushimi Inari')));
 assert.ok(s.some(x=>x.title.includes('Kiyomizu-dera Autumn Night')));
 assert.equal(passEndDate(defaultTickets.passStart),'2026-11-24');
 const seg=resolvedSegments(8,p);
 assert.ok(seg.some(x=>x.route.includes('Inari')&&x.type==='jr'));
 assert.ok(seg.some(x=>x.type==='bus'));
 assert.equal(validateFoodPlan(8,p),true);
});
test('25 November Day 9 keeps Namba desserts then early TG673 KIX departure',()=>{
 const s=resolvedSchedule(9,p),i=x=>s.findIndex(v=>v.title.includes(x));
 assert.equal(itinerary[8].date,'25 NOV');
 assert.ok(i('Namba Yasaka')>=0);
 assert.ok(i('Crepe & Espresso')>i('Namba Yasaka'));
 assert.ok(i('Rikuro')>i('Crepe & Espresso'));
 assert.ok(i('KIX / Check-in')>i('Rikuro'));
 assert.ok(s.some(x=>x.title.includes('TG673')&&x.time==='17:25'));
 assert.ok(foodStopsForDay(9,p).some(x=>x.id==='crepe9'));
 assert.ok(foodStopsForDay(9,p).some(x=>x.id==='rikuroNamba'));
 assert.equal(validateFoodPlan(9,p),true);
});
test('Day 9 airport modes show TG673 and do not pretend Pass covers JR on 25 Nov',()=>{
 for(const airportTrain of ['express','rapit','jr']){
  const pref=normalizePreferences({airportTrain});
  const legs=detailedRouteGuide(9,pref).legs;
  assert.ok(legs.some(x=>x.to.includes('Namba Yasaka')));
  assert.ok(legs.some(x=>x.to.includes('Crepe')));
  assert.ok(legs.some(x=>x.to.includes('Rikuro')));
  assert.ok(legs.some(x=>x.to.includes('Kansai-airport')));
  assert.ok(legs.some(x=>x.to.includes('Suvarnabhumi')));
  if(airportTrain==='jr')assert.ok(legs.some(x=>x.pay.includes('หมด')));
 }
 const metro=resolvedSegments(9,p).filter(x=>x.route.includes('Tanimachi 9-chome')&&x.type==='metro');
 assert.equal(metro.length,2);
 assert.ok(metro.every(x=>pricedSegment(x)?.yen===190));
});
