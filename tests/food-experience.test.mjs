import test from 'node:test';
import assert from 'node:assert/strict';
import {foodVenues,foodStopsForDay,foodScheduleEvents,validateFoodPlan} from '../data/foodExperience.js';
import {normalizePreferences,resolvedSchedule,resolveDay,nextScheduleEntry} from '../data/experience.js';
import {travelBookings} from '../data/centralTravel.js';
import {itinerary,checklist} from '../data/trip.js';
const prefs=(kyoto='west',mode='original',day=4)=>normalizePreferences({kyoto,dayPlans:{[day]:mode}});
const names=stops=>stops.filter(x=>x.id).map(x=>x.id);

test('Kyoto West and East restaurants follow selected route and never overlap',()=>{
 for(const mode of ['original','relaxed','rainy']){
  const west=prefs('west',mode),east=prefs('east',mode);
  assert.ok(validateFoodPlan(4,west),'west venues valid '+mode);
  assert.ok(validateFoodPlan(4,east),'east venues valid '+mode);
  assert.ok(!names(foodStopsForDay(4,west)).includes('izuju'));
  assert.ok(!names(foodStopsForDay(4,west)).includes('tsujiri'));
  assert.ok(!names(foodStopsForDay(4,east)).includes('yudofu'));
  assert.ok(!names(foodStopsForDay(4,east)).includes('excafe'));
  const eastTitles=resolvedSchedule(4,east).map(x=>x.title).join(' ');
  const westTitles=resolvedSchedule(4,west).map(x=>x.title).join(' ');
  assert.ok(!eastTitles.includes('Yudofu Sagano'));
  assert.ok(!westTitles.includes('Izuju Sushi'));
 }
 const west=resolvedSchedule(4,prefs('west')).map(x=>x.title);
 assert.ok(west.indexOf('Arashiyama Bamboo Grove')<west.indexOf('Tenryu-ji Temple'));
 assert.ok(west.indexOf('Tenryu-ji Temple')<west.indexOf('Yudofu Sagano · Lunch'));
 assert.ok(west.indexOf('Yudofu Sagano · Lunch')<west.indexOf('Togetsukyo Bridge'));
});

test('all restaurant stops are on their plan routes and not on venue closing days',()=>{
 for(let day=1;day<=8;day++){
  for(const kyoto of ['west','east'])for(const mode of ['original','rainy','relaxed']){
   const p=prefs(kyoto,mode,day);
   assert.ok(validateFoodPlan(day,p),JSON.stringify({day,kyoto,mode}));
   const stops=foodStopsForDay(day,p);
   for(const x of stops){
    if(!x.id)continue;
    assert.ok(foodVenues[x.id],x.id);
    assert.equal(foodVenues[x.id].reservation,'not-booked');
    assert.ok(foodVenues[x.id].diet);
    assert.ok(foodVenues[x.id].map);
    assert.equal(foodVenues[x.id].priceYen===null||Number.isInteger(foodVenues[x.id].priceYen),true);
   }
  }
 }
});
test('timed USJ and Kounotori events remain unchanged',()=>{
 for(const mode of ['original','rainy','relaxed'])for(const kyoto of ['west','east']){
  const p=normalizePreferences({kyoto,dayPlans:{3:mode,6:mode,7:mode}});
  const usj=resolvedSchedule(3,p);
  assert.ok(usj.some(s=>String(s.time)===travelBookings.usj.nintendoEntry&&/Nintendo/i.test(s.title)));
  assert.ok(usj.some(s=>String(s.time)===travelBookings.usj.harryPotterEntry&&/Harry Potter/i.test(s.title)));
  const forward=resolvedSchedule(6,p).find(s=>/Kounotori 5/i.test(s.title));
  const backward=resolvedSchedule(7,p).find(s=>/Kounotori 22/i.test(s.title));
  assert.equal(forward?.time,travelBookings.kounotori.outward.depart);
  assert.equal(backward?.time,travelBookings.kounotori.return.depart);
 }
});
test('no duplicate ryokan meals or Centara breakfasts; rainy Nara no Nara food',()=>{
 assert.ok(!foodStopsForDay(6,prefs()).some(s=>s.kind==='dinner'));
 assert.ok(!foodStopsForDay(7,prefs()).some(s=>s.kind==='breakfast'));
 assert.ok(!foodStopsForDay(8,prefs()).some(s=>s.kind==='breakfast'));
 assert.ok(!names(foodStopsForDay(5,prefs('west','rainy',5))).includes('nakatanidou'));
 assert.ok(names(foodStopsForDay(5,prefs('west','original',5))).includes('nakatanidou'));
});
test('Day 2 special evening is discreet and dinner is not booked',()=>{
 const p=prefs('west','original',2);
 const events=resolveDay(2,p).schedule;
 assert.ok(events.some(s=>s.time==='15:45–16:15'&&s.title==='Umeda Sky Building'));
 assert.ok(events.some(s=>s.time==='16:20–17:20'&&s.title==='Sunset Special Moment'));
 assert.ok(events.some(s=>s.time==='18:15–20:00'&&s.title==='Special Dinner'));
 const food=foodStopsForDay(2,p);
 assert.deepEqual(names(food).filter(x=>x==='stardust'||x==='xex'),['stardust','xex']);
 assert.equal(foodVenues.stardust.reservation,'not-booked');
 assert.equal(foodVenues.xex.reservation,'not-booked');
 const serialized=JSON.stringify([foodVenues,events]);
 assert.ok(!serialized.includes('private-surprise-details'));
});
test('food items appear in original schedule and selected routes and dining data is stable',()=>{
 const p=prefs('east');
 const food=foodScheduleEvents(4,p);
 assert.ok(food.some(x=>x.title.includes('Izuju')));
 assert.ok(food.some(x=>x.title.includes('Tsujiri')));
 assert.ok(resolveDay(4,p).schedule.some(x=>x.title.includes('Izuju')));
 assert.equal(itinerary.length,8);
 assert.ok(checklist.some(x=>x.id==='flight'&&x.done));
});
