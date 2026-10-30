import test from 'node:test';
import assert from 'node:assert/strict';
import {itinerary} from '../data/trip.js';
import {foodVenues,foodStopsForDay} from '../data/foodExperience.js';
import {detailedRouteGuide} from '../data/detailedTransit.js';
import {normalizePreferences,resolvedSchedule} from '../data/experience.js';
import {mapDirectionsUrl} from '../data/mobility.js';
import {galleryByDay} from '../data/gallery.js';
import {transportByDay} from '../data/travelTools.js';
import {travelBookings} from '../data/centralTravel.js';
const prefs=mode=>normalizePreferences({dayPlans:{2:mode}});
const expected=[
 ['09:00–11:10','Osaka Castle'],
 ['11:10–11:55','Osaka Castle → Namba'],
 ['12:00–13:00','Lunch — Tempura Makino Namba'],
 ['13:00–13:30','Dotonbori / Glico Sign'],
 ['13:30–14:55','Shinsaibashi Shopping'],
 ['14:55–15:40','Shinsaibashi → Umeda Sky Building'],
 ['15:45–16:15','Umeda Sky Building'],
 ['16:20–17:20','Sunset Special Moment'],
 ['18:15–20:00','Special Dinner']
];
test('original Day 2 shows all nine requested time blocks, no Kuromon, and unchanged sunset/dinner',()=>{
 const actual=resolvedSchedule(2,prefs('original'));
 assert.deepEqual(actual.map(x=>[x.time,x.title]),expected);
 assert.ok(!JSON.stringify(actual).includes('Kuromon'));
 assert.ok(!JSON.stringify(galleryByDay[2]).includes('Kuromon'));
 assert.equal(travelBookings.restaurants.stardust.status,'confirmed');
 assert.equal(travelBookings.restaurants.stardust.reservationTimeLocal,null);
});
test('Makino is primary and Tenya backup for every Day 2 mode without changing other days',()=>{
 for(const mode of ['original','rainy','relaxed']){
  const p=prefs(mode);
  const lunch=foodStopsForDay(2,p).filter(x=>x.kind==='lunch');
  assert.deepEqual(lunch.map(x=>[x.id,x.role,x.time]),[['makino','primary','12:00'],['tenya','backup','12:00']]);
  const schedule=resolvedSchedule(2,p);
  assert.equal(schedule.some(x=>/Kuromon/.test(x.title)),false);
  assert.ok(schedule.some(x=>x.title==='Special Dinner'&&x.time==='18:15–20:00'));
 }
 assert.match(foodVenues.makino.hours,/11:00/);
 assert.match(foodVenues.tenya.hours,/11:00/);
 assert.ok(foodVenues.makino.image?.src);
 assert.ok(foodVenues.tenya.image?.src);
 assert.equal(foodVenues.makino.queueLimitMinutes,15);
 assert.ok(foodVenues.makino.diet.includes('น้ำซุป'));
 assert.ok(foodVenues.tenya.diet.includes('สารสกัด'));
 assert.ok(itinerary.length===8);
});
test('N20-N15-M19-M20 route, individual Osaka walk links and optional Tenya without mandatory stop',()=>{
 const route=detailedRouteGuide(2,prefs('original')).legs;
 const namba=route.find(x=>x.to==='Namba Station (M20)');
 assert.ok(namba);
 assert.deepEqual(namba.steps.map(s=>s.station),[
  'Morinomiya (N20)','Shinsaibashi (N15)','Shinsaibashi (M19)','Namba (M20)'
 ]);
 assert.match(namba.pay,/ICOCA/);
 for(const [from,to] of [
  ['Namba Station (M20)','Tempura Makino Namba Sennichimae'],
  ['Tempura Makino Namba Sennichimae','Dotonbori Glico Sign'],
  ['Dotonbori Glico Sign','Shinsaibashi-suji Shopping Street'],
  ['Shinsaibashi-suji Shopping Street','Shinsaibashi Station (M19)'],
  ['Umeda Station (M16)','Umeda Sky Building']
 ])assert.ok(route.some(x=>x.from===from&&x.to===to&&x.icon==='walk'),from+' → '+to);
 assert.ok(route.some(x=>x.from==='Shinsaibashi Station (M19)'&&x.to==='Umeda Station (M16)'));
 assert.equal(route.some(x=>x.to==='Tendon Tenya Namba Sennichimae'),false);
 for(const venue of [foodVenues.makino,foodVenues.tenya]){
  const url=new URL(mapDirectionsUrl('Namba Station (M20)',venue.map,'walking'));
  assert.match(url.searchParams.get('origin'),/Osaka, Japan$/);
  assert.match(url.searchParams.get('destination'),/Osaka, Japan$/);
  assert.equal(url.searchParams.get('travelmode'),'walking');
 }
 assert.equal(transportByDay[2].filter(x=>x.type==='metro').length,4);
});
