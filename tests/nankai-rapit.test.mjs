import test from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs/promises';
import {travelBookings} from '../data/centralTravel.js';
import {itinerary,checklist} from '../data/trip.js';
import {travelGuide} from '../data/mobility.js';
import {beginnerDayGuide} from '../data/beginnerGuide.js';
import {transportByDay,fareLabel,defaultTickets} from '../data/travelTools.js';
import {resolveDay,normalizePreferences} from '../data/experience.js';
test('Nankai purchase is canonical and contains no personal ticket identifiers',async()=>{
 const x=travelBookings.nankaiArrival;
 assert.equal(x.totalPaidYen,3180);assert.equal(x.travelers,2);assert.equal(x.pricePerAdultYen,1590);
 assert.equal(x.purchased,true);assert.equal(x.seatSelectionConfirmed,false);
 assert.equal(x.firstUseDeadlineLocal,'2026-11-18T02:59:00+09:00');
 assert.equal(x.includesBaseFare,true);assert.equal(x.includesLimitedExpress,true);
 assert.equal(x.walletUrl,'https://nk-digital-ticket.nankai.co.jp/');
 for(const p of ['data/centralTravel.js','data/trip.js','app/page.js','app/components/TravelTools.js']){
  assert.doesNotMatch(await fs.readFile(new URL('../'+p,import.meta.url),'utf8'),/S023-577-937|0761/);
 }
});
test('Booking, itinerary, Today and beginner guide show pending seat selection',()=>{
 assert.ok(itinerary[0].schedule.some(x=>/Rapi:t Super Seat/.test(x.title)&&/เลือก/.test(x.title)));
 assert.ok(resolveDay(1,normalizePreferences({})).schedule.some(x=>/เลือกที่นั่ง/.test(x.title)));
 assert.match(travelGuide[0].legs[0].how,/Purchased Ticket/);
 assert.match(beginnerDayGuide[1].steps.map(x=>x.join(' ')).join(' '),/Purchased Ticket/);
 assert.equal(checklist.find(x=>x.id==='rapit-buy')?.done,true);
 assert.equal(checklist.find(x=>x.id==='rapit-select-seat')?.done,false);
 assert.equal(checklist.find(x=>x.id==='rapit-show-qr')?.done,false);
});
test('prepaid Nankai fare must not be charged a second time',()=>{
 const leg=transportByDay[1][0];
 assert.equal(leg.prepaid,true);assert.equal(leg.fareYenPerAdult*2,3180);
 assert.equal(fareLabel(leg,1,defaultTickets).status,'included');
 assert.match(fareLabel(leg,1,defaultTickets).label,/ไม่ต้องจ่ายซ้ำ/);
});
