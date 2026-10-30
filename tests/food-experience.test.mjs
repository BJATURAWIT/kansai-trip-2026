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
 assert.ok(west.indexOf('Arashiyama Bamboo Grove')<west.indexOf('Tenryu-ji Temple & Garden'));
 assert.ok(west.indexOf('Tenryu-ji Temple & Garden')<west.indexOf('Lunch — Ozuru Udon'));
 assert.ok(west.indexOf('Lunch — Ozuru Udon')<west.indexOf('Togetsukyo Bridge'));
 assert.ok(west.indexOf('Togetsukyo Bridge')<west.indexOf('Hanamikoji Street / Gion'));
 assert.ok(west.indexOf('Hanamikoji Street / Gion')<west.indexOf('Kodaiji Night Illumination'));
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
    assert.equal(foodVenues[x.id].reservation,x.id==='stardust'?'confirmed':'not-booked');
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
test('Day 2 special dinner is confirmed but unknown booking details remain unset',()=>{
 const p=prefs('west','original',2);
 const events=resolveDay(2,p).schedule;
 assert.ok(events.some(s=>s.time==='15:45–16:15'&&s.title==='Umeda Sky Building'));
 assert.ok(events.some(s=>s.time==='16:20–17:20'&&s.title==='Sunset Special Moment'));
 assert.ok(events.some(s=>s.time==='18:15–20:00'&&s.title==='Special Dinner'));
 const food=foodStopsForDay(2,p);
 assert.deepEqual(names(food).filter(x=>x==='stardust'||x==='xex'),['stardust','xex']);
 assert.equal(foodVenues.stardust.reservation,'confirmed');
 assert.equal(travelBookings.restaurants.stardust.status,'confirmed');
 assert.equal(travelBookings.restaurants.stardust.reservationTimeLocal,null);
 assert.equal(travelBookings.restaurants.stardust.courseName,null);
 assert.equal(travelBookings.restaurants.stardust.windowSeatConfirmed,null);
 assert.equal(travelBookings.restaurants.stardust.beefSubstitutionConfirmed,null);
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

test('walk-in budget strategy has fallback and never labels ordinary courses as booked',()=>{
 const important=[[1,'late-dinner'],[2,'lunch'],[4,'lunch'],[5,'lunch'],[7,'lunch'],[7,'dinner'],[8,'lunch']];
 for(const [day,kind] of important){
  const stops=foodStopsForDay(day,prefs('west','original',day)).filter(x=>x.kind===kind);
  assert.equal(stops.filter(x=>x.role==='primary').length,1,day+'/'+kind);
  assert.ok(stops.filter(x=>x.role==='backup').length>=1,day+'/'+kind);
  for(const stop of stops){
   if(!stop.id)continue;
   const venue=foodVenues[stop.id];
   assert.equal(venue.reservation,'not-booked');
   assert.ok(venue.site&&venue.map&&venue.diet);
   assert.ok(venue.review&&venue.reviewSource);
   assert.ok(venue.hours&&venue.closures);
  }
 }
 assert.equal(foodStopsForDay(2,prefs('west','original',2)).find(x=>x.kind==='dinner'&&x.role==='primary').id,'stardust');
 assert.ok(foodVenues.stardust.window.includes('ยังไม่ยืนยัน'));
 assert.ok(foodVenues.stardust.diet.includes('ก่อนวันใช้บริการ'));
 assert.ok(foodVenues.stardust.priceNote.includes('10%'));
 const normal=['kura','sushiro','yayoiken','ozuru','saganoya'];
 assert.ok(normal.every(id=>foodVenues[id].priceYen===null||foodVenues[id].priceYen<=1800));
});
test('2026-11-20 Kyoto West and Gion are combined with Kodaiji night and lunch before bridge',()=>{
 const p=prefs('west','original',4);
 const entries=resolvedSchedule(4,p);
 const at=title=>entries.findIndex(e=>e.title.includes(title));
 assert.ok(at('Arashiyama Bamboo Grove')<at('Tenryu-ji'));
 assert.ok(at('Tenryu-ji')<at('Togetsukyo Bridge'));
 assert.ok(at('Ozuru Udon')<at('Togetsukyo Bridge'));
 assert.equal(entries[at('Ozuru Udon')].time,'10:50–11:50');
 assert.ok(at('Togetsukyo Bridge')<at('Kodaiji Night Illumination'));
 assert.equal(entries.at(-1).time,'19:30–21:00');
 assert.equal(entries.some(e=>/Izuju|Tsujiri/.test(e.title)),false);
 assert.equal(foodVenues.saganoya.days.includes(5),true);
});
