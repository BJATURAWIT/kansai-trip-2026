import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import {travelBookings,flightDurationMinutes,flightNumberLabel,tripFlightList,localClock,localDate} from '../data/centralTravel.js';
import {trip,itinerary,checklist} from '../data/trip.js';
import {travelGuide} from '../data/mobility.js';
import {beginnerDayGuide} from '../data/beginnerGuide.js';
import {defaultTickets} from '../data/travelTools.js';
import {normalizePreferences,resolveDay,nextScheduleEntry} from '../data/experience.js';

test('airline timestamp values follow the user-provided latest booking times',()=>{
 const {outbound,inbound}=travelBookings.flights;
 assert.deepEqual([outbound.departure.local,outbound.arrival.local],['2026-11-17T10:40:00+07:00','2026-11-17T18:15:00+09:00']);
 assert.deepEqual([inbound.departure.local,inbound.arrival.local],['2026-11-24T19:45:00+09:00','2026-11-25T00:15:00+07:00']);
 assert.equal(outbound.number,'XJ610');
 assert.equal(inbound.number,null,'Do not infer flight number before checking source AirAsia e-ticket');
 assert.match(flightNumberLabel(inbound),/รอยืนยัน/);
 assert.equal(flightDurationMinutes(outbound),335);
 assert.equal(flightDurationMinutes(inbound),390);
 assert.equal(localDate(inbound.arrival),'2026-11-25');
 assert.equal(localClock(inbound.arrival),'00:15');
 assert.equal(outbound.departure.timeZone,'Asia/Bangkok');
 assert.equal(inbound.departure.timeZone,'Asia/Tokyo');
});

test('canonical bookings power flights hotels pass USJ and JR train details',()=>{
 assert.deepEqual(trip.flights,tripFlightList());
 assert.deepEqual(trip.hotels,travelBookings.hotels);
 assert.equal(defaultTickets.passStart,travelBookings.jrPass.startDate);
 assert.deepEqual(defaultTickets.outward,travelBookings.kounotori.outward);
 assert.deepEqual(defaultTickets.return,travelBookings.kounotori.return);
 assert.equal(travelBookings.usj.nintendoEntry,'13:50');
 assert.equal(travelBookings.usj.harryPotterEntry,'16:00');
 assert.equal(itinerary[2].schedule.find(s=>s.title==='Super Nintendo World')?.time,travelBookings.usj.nintendoEntry);
 assert.equal(itinerary[2].schedule.find(s=>s.title==='The Wizarding World of Harry Potter')?.time,travelBookings.usj.harryPotterEntry);
 assert.equal(itinerary[5].schedule.find(s=>s.title.includes('Limited Express Kounotori'))?.time,travelBookings.kounotori.outward.depart);
 assert.equal(itinerary[6].schedule.find(s=>s.title.includes('Kounotori 22'))?.time,travelBookings.kounotori.return.depart);
 assert.equal(checklist.find(s=>s.id==='flight')?.title.includes(flightNumberLabel(travelBookings.flights.inbound)),true);
});

test('all travel views give the same local arrival time and do not announce an invented return flight',()=>{
 const flightLine=travelGuide[7].legs.at(-1).line;
 assert.match(flightLine,/19:45.*00:15/);
 assert.ok(flightLine.includes(flightNumberLabel(travelBookings.flights.inbound)));
 assert.equal(beginnerDayGuide[8].steps.some(step=>step[0].includes('19:45')),true);
 assert.equal(beginnerDayGuide[8].steps.some(step=>step[0].includes('00:15')),true);
 assert.equal(itinerary[7].schedule.find(s=>s.title==='บินออก KIX Terminal 1')?.time,'19:45');
 assert.equal(itinerary[7].schedule.find(s=>s.title==='ถึง DMK Terminal 1')?.date,'2026-11-25');
 assert.equal(trip.flights[1].numberVerified,false);
});

test('Today mode converts Thai departure to Japan time and excludes arrival on next calendar date',()=>{
 const prefs=normalizePreferences({});
 assert.equal(nextScheduleEntry(1,prefs,12*60+39)?.title,'บินออกจาก DMK Terminal 1');
 assert.equal(nextScheduleEntry(1,prefs,12*60+40)?.title,'บินออกจาก DMK Terminal 1');
 assert.equal(nextScheduleEntry(1,prefs,12*60+41)?.title,'ถึง Kansai Airport Terminal 1');
 assert.equal(nextScheduleEntry(8,prefs,19*60+46),null);
 assert.equal(nextScheduleEntry(8,prefs,19*60+45)?.title,'บินออก KIX Terminal 1');
 assert.equal(resolveDay(8,prefs).schedule.find(s=>s.title==='ถึง DMK Terminal 1')?.date,'2026-11-25');
});

test('stale flight codes and stale departure/arrival values cannot reenter application data and views',async()=>{
 const paths=['data/trip.js','data/mobility.js','data/beginnerGuide.js','data/experience.js',
 'data/travelTools.js','app/page.js','app/components/TravelTools.js','app/components/TripTable.js'];
 for(const path of paths){
  const source=await fs.readFile(new URL('../'+path,import.meta.url),'utf8');
  assert.doesNotMatch(source,/\bXJ611\b|\bXJ615\b|17:15|21:45/,path+' has stale flight details');
 }
 const page=await fs.readFile(new URL('../app/page.js',import.meta.url),'utf8');
 assert.match(page,/travelBookings\.flights\.inbound/,'Help reads canonical return flight');
 assert.match(page,/trip\.flights\.map/,'Booking renders canonical flight list');
 const table=await fs.readFile(new URL('../app/components/TripTable.js',import.meta.url),'utf8');
 assert.match(table,/resolveDay\(day\.day,prefs\)/,'Table derives canonical itinerary');
});
