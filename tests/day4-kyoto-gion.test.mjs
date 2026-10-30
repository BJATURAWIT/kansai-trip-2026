import test from 'node:test';
import assert from 'node:assert/strict';
import {itinerary} from '../data/trip.js';
import {kyotoOptions,transportByDay} from '../data/travelTools.js';
import {resolvedSchedule,defaultPreferences,resolveDay,resolvedGuide} from '../data/experience.js';
import {foodStopsForDay,validateFoodPlan} from '../data/foodExperience.js';
const prefs={...defaultPreferences,kyoto:'west',dayPlans:{4:'original'}};
test('Day 4 main route includes Gion and Kodaiji, returns around 21:00',()=>{
 const plan=resolveDay(4,prefs),route=plan.schedule.map(s=>s.title).join(' | ');
 assert.match(route,/Arashiyama Bamboo Grove/);
 assert.match(route,/Tenryu-ji/);
 assert.match(route,/Hanamikoji/);
 assert.match(route,/Kodaiji Night Illumination/);
 assert.match(route,/Dinner/);
 assert.match(route,/Gion-Shijo/);
 assert.ok(!route.includes('Fushimi Inari'));
 assert.ok(!route.includes('Kiyomizu-dera'));
 assert.equal(plan.schedule.at(-1).time,'19:30–21:00');
 assert.equal(itinerary[3].date,'20 NOV');
});
test('Kyoto guide covers JR, Hankyu and Keihan transfers',()=>{
 const guide=resolvedGuide(4,prefs),steps=guide.legs.flatMap(x=>x.steps||[]).map(x=>x.station).join(' ');
 assert.match(steps,/Katsura/);
 assert.match(steps,/Kyoto-Kawaramachi/);
 assert.match(steps,/Gion-Shijo/);
 assert.ok(guide.legs.length>10);
 assert.ok(transportByDay[4].some(x=>x.type==='hankyu'));
 assert.ok(transportByDay[4].some(x=>x.type==='keihan'));
});
test('Kyoto lunches and dinners appear with backup and are not duplicated on timeline',()=>{
 const stops=foodStopsForDay(4,prefs);
 assert.ok(stops.some(x=>x.id==='ozuru'&&x.role==='primary'));
 assert.ok(stops.some(x=>x.id==='gionKyomen'&&x.role==='primary'));
 assert.ok(stops.some(x=>x.kind==='dinner'&&x.role==='backup'));
 assert.equal(validateFoodPlan(4,prefs),true);
 assert.equal(resolvedSchedule(4,prefs).filter(x=>x.title.includes('Lunch')).length,1);
 assert.equal(resolvedSchedule(4,prefs).filter(x=>x.title.includes('Dinner')).length,1);
});
test('Rainy and Relaxed Kyoto plans preserve Kodaiji option and Day 2 lunch',()=>{
 for(const mode of ['rainy','relaxed']){
  const r=resolvedSchedule(4,{...prefs,dayPlans:{4:mode}});
  assert.ok(r.some(x=>x.title.includes('Kodaiji')));
 }
 assert.match(itinerary[1].schedule.map(x=>x.title).join(' '),/Tempura Makino/);
 assert.ok(!itinerary[1].schedule.some(x=>x.title.includes('Kuromon')));
});
