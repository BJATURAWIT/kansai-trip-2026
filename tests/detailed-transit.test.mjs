import test from 'node:test';
import assert from 'node:assert/strict';
import {detailedRouteGuide} from '../data/detailedTransit.js';
import {normalizePreferences,resolvedGuide} from '../data/experience.js';
import {travelBookings} from '../data/centralTravel.js';
const prefs=(kyoto='west',mode='original',airportTrain='express')=>normalizePreferences({kyoto,airportTrain,dayPlans:Object.fromEntries(Array.from({length:8},(_,i)=>[i+1,mode]))});
test('every day and variant has complete ordered station-by-station transport instructions',()=>{
 for(let day=1;day<=8;day++)for(const kyoto of ['west','east'])for(const mode of ['original','rainy','relaxed']){
  const p=prefs(kyoto,mode);
  const plan=detailedRouteGuide(day,p);
  assert.ok(plan.legs.length>=3,'Day '+day+' '+kyoto+' '+mode);
  assert.equal(resolvedGuide(day,p).legs.length,plan.legs.length);
  for(const leg of plan.legs){
   assert.ok(leg.from&&leg.to&&leg.pay,'missing from/to/pay '+day);
   assert.ok(leg.steps.length>=2,'missing station steps '+day+': '+leg.line);
   for(const step of leg.steps)assert.ok(step.station&&step.detail,'missing station instructions '+day);
  }
 }
});
test('Osaka Castle direction explicitly includes platform transfer Hommachi M18 C16 to Morinomiya C19',()=>{
 const plan=detailedRouteGuide(2,prefs());
 const section=plan.legs.find(x=>x.to.includes('Morinomiya'));
 assert.deepEqual(section.steps.map(x=>x.station),['Daikokucho (M21)','Hommachi (M18 / C16)','Hommachi (C16)','Morinomiya (C19)']);
 assert.match(section.pay,/ICOCA/);
});
test('Kyoto switch and rainy mode follow their own routes',()=>{
 const west=detailedRouteGuide(4,prefs('west'));
 const east=detailedRouteGuide(4,prefs('east'));
 const rainy=detailedRouteGuide(4,prefs('west','rainy'));
 assert.ok(west.legs.some(x=>x.to.includes('Ozuru')));
 assert.ok(west.legs.some(x=>x.to.includes('Hanamikoji')));
 assert.ok(west.legs.some(x=>x.to.includes('Kodaiji')));
 assert.ok(west.legs.some(x=>x.to.includes('Gion Kyomen')));
 assert.ok(east.legs.some(x=>x.to.includes('Tofuku')));
 assert.ok(!east.legs.some(x=>x.to.includes('Arashiyama')));
 assert.ok(rainy.legs.some(x=>x.to.includes('Covered Shops')));
 assert.ok(rainy.legs.some(x=>x.to.includes('Kodaiji')));
 assert.ok(!rainy.legs.some(x=>x.to.includes('Togetsukyo')));
});
test('preserve booked train information and avoid misleading airport fares',()=>{
 const d1=detailedRouteGuide(1,prefs()),d6=detailedRouteGuide(6,prefs()),d7=detailedRouteGuide(7,prefs());
 assert.ok(d1.legs.some(x=>x.pay.includes('3,180')));
 assert.ok(d6.legs.some(x=>x.steps.some(s=>s.detail.includes('9C'))));
 assert.ok(d7.legs.some(x=>x.steps.some(s=>s.detail.includes('8C'))));
 assert.equal(travelBookings.kounotori.outward.depart,'10:12');
 assert.equal(travelBookings.kounotori.return.depart,'15:30');
 for(const airportTrain of ['express','rapit','jr']){
  const d8=detailedRouteGuide(8,prefs('west','original',airportTrain));
  assert.ok(d8.legs.some(x=>x.to.includes('Kansai-airport')));
  assert.ok(d8.legs.some(x=>x.to.includes('Don Mueang')));
 }
});
