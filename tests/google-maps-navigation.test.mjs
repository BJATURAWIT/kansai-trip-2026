import test from 'node:test';
import assert from 'node:assert/strict';
import {mapPlaceQuery,mapDirectionsUrl,mapSearchUrl} from '../data/mobility.js';
import {detailedRouteGuide} from '../data/detailedTransit.js';
import {foodVenues} from '../data/foodExperience.js';
import {itinerary} from '../data/trip.js';
import {normalizePreferences,resolvedSchedule} from '../data/experience.js';

const parsed=url=>new URL(url);
test('problem screenshot Shinsaibashi M19 to Umeda Sky always points at Osaka Japan',()=>{
 const url=parsed(mapDirectionsUrl('Shinsaibashi Station (M19)','Umeda Sky Building','transit'));
 assert.equal(url.searchParams.get('travelmode'),'transit');
 assert.match(url.searchParams.get('origin'),/Shinsaibashi Station.*Osaka, Japan/);
 assert.match(url.searchParams.get('destination'),/Umeda Sky Building.*Osaka, Japan/);
 assert.doesNotMatch(url.searchParams.get('origin'),/\(M19\)/);
});
test('route endpoints in all eight days and alternate itineraries are geocoded with a country',()=>{
 for(let day=1;day<=8;day++)for(const kyoto of ['west','east'])for(const mode of ['original','rainy','relaxed']){
  for(const airportTrain of ['express','rapit','jr']){
   const p=normalizePreferences({kyoto,airportTrain,dayPlans:{[day]:mode}});
   for(const leg of detailedRouteGuide(day,p).legs){
    const u=parsed(mapDirectionsUrl(leg.from,leg.to,leg.mapMode));
    for(const role of ['origin','destination']){
     const query=u.searchParams.get(role);
     assert.ok(/(Japan|Thailand)$/.test(query),day+' '+mode+' '+role+': '+query);
     assert.doesNotMatch(query,/\([MCYKT]\d{1,2}\)/,query);
    }
   }
  }
 }
});
test('Gallery, daily map pins and dining all resolve in Japan',()=>{
 for(const day of itinerary)assert.match(parsed(mapSearchUrl(day.map)).searchParams.get('query'),/Japan$/);
 for(const venue of Object.values(foodVenues))if(venue.map)assert.match(parsed(mapSearchUrl(venue.map)).searchParams.get('query'),/Japan$/);
 for(const kyoto of ['west','east'])for(let day=1;day<=8;day++){
  const p=normalizePreferences({kyoto});
  for(const slot of resolvedSchedule(day,p))if(slot.map)assert.match(parsed(mapSearchUrl(slot.map)).searchParams.get('query'),/Japan$/);
 }
});
test('walk to Osaka Castle Main Tower from Morinomiya and remain in Osaka',()=>{
 const u=parsed(mapDirectionsUrl('Morinomiya Station (C19)','Osaka Castle Main Tower','walking'));
 assert.equal(u.searchParams.get('travelmode'),'walking');
 assert.match(u.searchParams.get('origin'),/Morinomiya Station.*Osaka, Japan/);
 assert.match(u.searchParams.get('destination'),/Osaka Castle Main Tower.*Osaka, Japan/);
});
