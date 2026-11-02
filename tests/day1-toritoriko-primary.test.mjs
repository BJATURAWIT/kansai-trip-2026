import test from 'node:test';
import assert from 'node:assert/strict';
import {foodVenues,foodStopsForDay,validateFoodPlan} from '../data/foodExperience.js';
import {resolveDay,normalizePreferences} from '../data/experience.js';
import {detailedRouteGuide} from '../data/detailedTransit.js';
const p=normalizePreferences({});
test('Toritoriko yakitori is Day 1 primary, with Kura and Tsurutontan backups',()=>{
 const stops=foodStopsForDay(1,p);
 assert.deepEqual(stops.map(s=>[s.id,s.role]),[['toritoriko','primary'],['kura','backup'],['tsurutontan','backup']]);
 assert.equal(stops[0].time,'21:00');
 assert.ok(validateFoodPlan(1,p));
 assert.equal(foodVenues.toritoriko.reservation,'not-booked');
 assert.match(foodVenues.toritoriko.map,/とりとりこ/);
 assert.match(foodVenues.toritoriko.diet,/ไม่ทานเนื้อวัว/);
});
test('Day 1 timeline follows flight, railway, check-in then first-choice dinner',()=>{
 const events=resolveDay(1,p).schedule;
 const indices=[/บินออกจาก DMK/,/ถึง Kansai Airport/,/เลือกที่นั่ง Nankai/,/Rapi:t Super Seat/,/Check-in/,/Toritoriko/].map(re=>events.findIndex(x=>re.test(x.title)));
 assert.ok(indices.every(i=>i>=0),JSON.stringify(indices));
 assert.ok(indices.every((v,i)=>i===0||v>indices[i-1]),JSON.stringify(indices));
 const guide=detailedRouteGuide(1,p);
 assert.ok(guide.legs.some(s=>String(s.to).includes('とりとりこ')));
});
