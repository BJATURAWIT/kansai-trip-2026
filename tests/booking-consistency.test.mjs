import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import {travelBookings,flightDurationMinutes,flightNumberLabel,tripFlightList,localClock} from '../data/centralTravel.js';
import {trip,itinerary,checklist} from '../data/trip.js';
import {travelGuide} from '../data/mobility.js';
import {beginnerDayGuide} from '../data/beginnerGuide.js';
import {defaultTickets,passEndDate} from '../data/travelTools.js';
import {normalizePreferences,resolveDay,nextScheduleEntry} from '../data/experience.js';

test('confirmed Thai Airways PDF is authoritative for both flights and bag PIECE counts',()=>{
 const {outbound,inbound}=travelBookings.flights;
 assert.deepEqual([outbound.departure.local,outbound.arrival.local],['2026-11-17T08:15:00+07:00','2026-11-17T15:45:00+09:00']);
 assert.deepEqual([inbound.departure.local,inbound.arrival.local],['2026-11-25T17:25:00+09:00','2026-11-25T22:00:00+07:00']);
 assert.equal(outbound.number,'TG672');
 assert.equal(inbound.number,'TG673');
 assert.equal(flightNumberLabel(inbound),'TG673');
 assert.equal(flightDurationMinutes(outbound),330);
 assert.equal(flightDurationMinutes(inbound),395);
 assert.equal(localClock(inbound.arrival),'22:00');
 assert.equal(outbound.departure.airport,'BKK');
 assert.equal(inbound.arrival.airport,'BKK');
 assert.equal(outbound.checkedBaggagePieces,1);
 assert.equal(inbound.checkedBaggagePieces,2);
 assert.equal(outbound.checkedBaggageWeightKg,null);
 assert.equal(inbound.checkedBaggageWeightKg,null);
});
test('canonical booking source drives 9 days, confirmed/pending hotel nights, JR and USJ',()=>{
 assert.equal(trip.days,9);
 assert.equal(trip.nights,8);
 assert.equal(itinerary.length,9);
 assert.deepEqual(trip.flights,tripFlightList());
 assert.deepEqual(trip.hotels,travelBookings.hotels);
 assert.equal(trip.hotels.filter(x=>!x.booked).length,1);
 assert.equal(defaultTickets.passStart,'2026-11-20');
 assert.equal(passEndDate(defaultTickets.passStart),'2026-11-24');
 assert.equal(defaultTickets.outward.train,'Kounotori 5');
 assert.equal(defaultTickets.return.train,'Kounotori 22');
 assert.equal(travelBookings.usj.nintendoEntry,'13:40–14:40');
 assert.equal(travelBookings.usj.marioKartExpress,'13:40–14:10');
 assert.equal(travelBookings.usj.donkeyKongExpress,'14:10–14:40');
 assert.equal(itinerary[2].schedule.find(s=>s.title.includes('Harry Potter and the Forbidden Journey')).time,'17:30–18:15');
 assert.equal(checklist.find(x=>x.id==='hotel-extra')?.done,false);
});
test('departure and arrival instructions match Thai Airways, and day 8 is Kyoto',()=>{
 const line=travelGuide[8].legs.at(-1).line;
 assert.match(line,/17:25.*22:00/);
 assert.match(line,/TG673/);
 assert.ok(beginnerDayGuide[9].steps.some(x=>x[0].includes('17:25')));
 assert.ok(itinerary[7].schedule.some(x=>x.title.includes('Kiyomizu-dera')));
 assert.equal(itinerary[8].schedule.find(x=>x.title.includes('TG673 ออกจาก'))?.time,'17:25');
 assert.equal(resolveDay(9,normalizePreferences({})).schedule.find(x=>x.title.includes('ถึง BKK'))?.date,'2026-11-25');
 assert.equal(trip.flights[1].numberVerified,true);
});
test('Today-mode uses Japan dates, treats BKK departure time as UTC+7',()=>{
 const prefs=normalizePreferences({});
 assert.equal(nextScheduleEntry(1,prefs,10*60+14)?.title,'บินออกจาก BKK Suvarnabhumi');
 assert.equal(nextScheduleEntry(1,prefs,10*60+16)?.title,'ถึง Kansai Airport Terminal 1');
 assert.equal(nextScheduleEntry(9,prefs,17*60+25)?.title,'TG673 ออกจาก KIX Terminal 1');
});
test('app uses new booked flights without stale AirAsia codes',async()=>{
 const paths=['data/centralTravel.js','data/trip.js','data/mobility.js','data/beginnerGuide.js','data/experience.js','data/travelTools.js','app/page.js','app/components/TravelTools.js','app/components/TripTable.js'];
 for(const path of paths){
  const source=await fs.readFile(new URL('../'+path,import.meta.url),'utf8');
  assert.doesNotMatch(source,/\bXJ610\b|\bXJ611\b|\bXJ615\b/,path);
 }
 const page=await fs.readFile(new URL('../app/page.js',import.meta.url),'utf8');
 assert.match(page,/travelBookings\.flights\.inbound/);
 assert.match(page,/trip\.flights\.map/);
});
