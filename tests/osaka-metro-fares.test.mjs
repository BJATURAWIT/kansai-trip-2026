import test from 'node:test';import assert from 'node:assert/strict';
import {osakaMetroFareTable,metroFareForSegment,metroChoiceForDay} from '../data/osakaMetroFares.js';
import {transportByDay} from '../data/travelTools.js';
test('Day 2 metro rides resolve and include the three formerly missing fares',()=>{
 const metro=transportByDay[2].filter(x=>x.type==='metro');
 assert.equal(metro.length,5);
 const fares=metro.map(metroFareForSegment);
 assert.ok(fares.every(Boolean));
 assert.deepEqual(fares.map(x=>x.yen),[240,240,190,240,240]);
});
test('ICOCA vs weekday Enjoy Eco Card for two passengers',()=>{
 const x=metroChoiceForDay(2,transportByDay[2]);
 assert.equal(x.known,true);assert.equal(x.regularYenForTwo,2300);
 assert.equal(x.dayPassYenForTwo,1640);assert.equal(x.savingForTwo,660);
 assert.equal(x.recommendation,'day-pass');
 const walked=metroChoiceForDay(2,transportByDay[2],true);
 assert.equal(walked.regularYenForTwo,1920);
 assert.equal(walked.savingForTwo,280);
});
test('unknown metro routes remain explicitly unknown',()=>{
 const x=metroChoiceForDay(4,[{type:'metro',route:'Unknown → Unknown'}]);
 assert.equal(x.known,false);assert.equal(x.missing,1);
});
