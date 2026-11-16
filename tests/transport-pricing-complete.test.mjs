import test from 'node:test';
import assert from 'node:assert/strict';
import {normalizePreferences,resolvedSegments} from '../data/experience.js';
import {fareSummary} from '../data/transportPricing.js';
import {defaultTickets,passEndDate} from '../data/travelTools.js';
test('all 9-day travel plans calculate transport; unknown JR tickets are shown as unknown',()=>{
 for(const kyoto of ['west','east'])for(const mode of ['original','rainy','relaxed'])for(const airportTrain of ['express','rapit','jr']){
  const p=normalizePreferences({kyoto,airportTrain,dayPlans:Object.fromEntries(Array.from({length:9},(_,i)=>[i+1,mode]))});
  for(let day=1;day<=9;day++){
   const sum=fareSummary(day,resolvedSegments(day,p),defaultTickets);
   assert.ok(sum.twoPeopleYen>=0);
   if(day===9&&airportTrain==='jr')assert.ok(sum.unresolved>=1,'JR option after Pass expires must not be shown as free');
   else assert.equal(sum.unresolved,0,JSON.stringify({day,kyoto,mode,airportTrain,missing:sum.rows.filter(x=>x.yen===null).map(x=>x.route)}));
  }
 }
});
test('25 Nov Nankai Airport Express must be paid; JR Pass ends 24 Nov',()=>{
 assert.equal(passEndDate(defaultTickets.passStart),'2026-11-24');
 for(const [airportTrain,expected] of Object.entries({express:2700,rapit:3580})){
  const p=normalizePreferences({airportTrain});
  const seg=resolvedSegments(9,p);
  assert.equal(seg.filter(x=>x.type==='nankai'||x.type==='jr').length,1);
  assert.equal(fareSummary(9,seg,defaultTickets).twoPeopleYen,expected);
 }
});
test('already bought inbound Rapi:t Super Seat not charged twice',()=>{
 const sum=fareSummary(1,resolvedSegments(1,normalizePreferences({})),defaultTickets);
 assert.equal(sum.twoPeopleYen,0);
 assert.equal(sum.rows[0].status,'prepaid');
 assert.equal(sum.rows[0].paidYen,3180);
});
