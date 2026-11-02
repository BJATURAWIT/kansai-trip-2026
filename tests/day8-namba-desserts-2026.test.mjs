import test from 'node:test';
import assert from 'node:assert/strict';
import {itinerary} from '../data/trip.js';
import {normalizePreferences,resolvedSchedule,resolvedSegments} from '../data/experience.js';
import {foodStopsForDay,validateFoodPlan} from '../data/foodExperience.js';
import {detailedRouteGuide} from '../data/detailedTransit.js';
import {pricedSegment} from '../data/transportPricing.js';
const p=normalizePreferences({});
test('Nov 24 keeps three stops in order and airport exit 15:00',()=>{
 const s=resolvedSchedule(8,p),t=s.map(x=>x.title).join(' | ');
 const i=x=>s.findIndex(v=>v.title.includes(x));
 assert.ok(i('Namba Yasaka Shrine —')>0);
 assert.ok(i('Crepe & Espresso & 9-chome')>i('Namba Yasaka Shrine —'));
 assert.ok(i('Rikuro’s Cheesecake —')>i('Crepe & Espresso & 9-chome'));
 assert.ok(i('ออกจากโรงแรมไป KIX')>i('Rikuro’s Cheesecake —'));
 assert.equal(s[i('ออกจากโรงแรมไป KIX')].time,'15:00 (แนะนำ)');
 assert.equal(itinerary[7].date,'24 NOV');
});
test('Day 8 guide names correct Metro stations and works for all airport options',()=>{
 for(const choice of ['express','rapit','jr']){
  const pref=normalizePreferences({airportTrain:choice}), legs=detailedRouteGuide(8,pref).legs;
  assert.ok(legs.some(x=>x.to.includes('Namba Yasaka')));
  assert.ok(legs.some(x=>x.to.includes('Crepe & Espresso')));
  assert.ok(legs.some(x=>x.to.includes('Rikuro')));
  assert.ok(legs.some(x=>x.steps?.some(y=>y.station.includes('Tanimachi 9-chome'))));
  assert.ok(legs.some(x=>x.to.includes('Kansai-airport')));
 }
});
test('Transport calculator includes Sennichimae roundtrip and no duplicated lunch',()=>{
 const seg=resolvedSegments(8,p);
 const metro=seg.filter(s=>s.route.includes('Tanimachi 9-chome')&&s.type==='metro');
 assert.equal(metro.length,2);
 assert.ok(metro.every(x=>pricedSegment(x)?.yen===190));
 const stops=foodStopsForDay(8,p);
 assert.equal(validateFoodPlan(8,p),true);
 assert.ok(stops.some(x=>x.id==='crepe9'));
 assert.ok(stops.some(x=>x.id==='rikuroNamba'));
 assert.equal(resolvedSchedule(8,p).filter(x=>x.title.includes('Optional Light Lunch')).length,1);
});
