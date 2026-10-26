import test from 'node:test';import assert from 'node:assert/strict';
import {normalizePreferences,resolvedSegments} from '../data/experience.js';
import {fareSummary} from '../data/transportPricing.js';
import {defaultTickets} from '../data/travelTools.js';
test('all selected fare segments priced or covered for original, rainy and relaxed routes',()=>{
for(const kyoto of ['west','east'])for(const mode of ['original','rainy','relaxed'])for(const airportTrain of ['express','rapit','jr']){
const p=normalizePreferences({kyoto,airportTrain,dayPlans:Object.fromEntries(Array.from({length:8},(_,i)=>[i+1,mode]))});
assert.equal(p.airportTrain,airportTrain);
for(let day=1;day<=8;day++){const sum=fareSummary(day,resolvedSegments(day,p),defaultTickets);
assert.equal(sum.unresolved,0,JSON.stringify({day,kyoto,mode,airportTrain,unknown:sum.rows.filter(x=>x.yen===null).map(x=>x.route)}));
assert.ok(sum.twoPeopleYen>=0);}}});
test('return airport alternatives are exclusive and user selected',()=>{
const selections={express:1940,rapit:3340,jr:0};
for(const [airportTrain,cost] of Object.entries(selections)){const p=normalizePreferences({airportTrain});const seg=resolvedSegments(8,p);
assert.equal(seg.filter(x=>x.type==='nankai'||x.type==='jr').length,1);
assert.equal(fareSummary(8,seg,defaultTickets).twoPeopleYen,cost);}
});
test('already purchased KIX inbound Rapi:t never charged twice',()=>{
const seg=resolvedSegments(1,normalizePreferences({}));
const sum=fareSummary(1,seg,defaultTickets);
assert.equal(sum.twoPeopleYen,0);
assert.equal(sum.rows[0].status,'prepaid');
assert.equal(sum.rows[0].paidYen,3180);
});
