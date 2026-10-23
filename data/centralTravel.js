/**
 * Canonical, public-safe booking data for Kansai Trip 2026.
 * Do not add airline booking IDs, passenger data, receipt IDs, payment info.
 * All timestamps use the LOCAL TIME ZONE OF THE STATED AIRPORT (ISO with offset).
 * Flight details last communicated by traveler on 2026-10-23:
 * 17 Nov DMK 10:40 -> KIX 18:15; 24 Nov KIX 19:45 -> DMK 00:15 25 Nov.
 * The RETURN FLIGHT NUMBER remains UNVERIFIED; do not infer a number.
 */
export const travelBookings = Object.freeze({
  trip: {startDate:'2026-11-17',endDate:'2026-11-24',travelers:2,days:8,nights:7},
  flights: {
    outbound: {
      id:'outbound', number:'XJ610', numberEvidence:'previously confirmed booking',
      departure:{airport:'DMK',terminal:'T1',local:'2026-11-17T10:40:00+07:00',timeZone:'Asia/Bangkok'},
      arrival:{airport:'KIX',terminal:'T1',local:'2026-11-17T18:15:00+09:00',timeZone:'Asia/Tokyo'},
      status:'booked',
    },
    inbound: {
      id:'inbound',number:null,numberEvidence:'original AirAsia document required',
      departure:{airport:'KIX',terminal:'T1',local:'2026-11-24T19:45:00+09:00',timeZone:'Asia/Tokyo'},
      arrival:{airport:'DMK',terminal:'T1',local:'2026-11-25T00:15:00+07:00',timeZone:'Asia/Bangkok'},
      status:'booked; flight number unverified',
    },
  },
  hotels:[
    {id:'centara1',name:'Centara Life Namba Hotel Osaka',date:'17–22 พ.ย. · 5 คืน',plan:'Room only',area:'Osaka / Namba',map:'Centara Life Namba Hotel Osaka',booked:true},
    {id:'nishimuraya',name:'Nishimuraya Hotel Shogetsutei',date:'22–23 พ.ย. · 1 คืน',plan:'Dinner + Breakfast',area:'Kinosaki Onsen',map:'Nishimuraya Hotel Shogetsutei',booked:true},
    {id:'centara2',name:'Centara Life Namba Hotel Osaka',date:'23–24 พ.ย. · 1 คืน',plan:'Breakfast included',area:'Osaka / Namba',map:'Centara Life Namba Hotel Osaka',booked:true},
  ],
  jrPass:{name:'JR-WEST Kansai WIDE Area Pass',durationDays:5,startDate:'2026-11-20',endDate:'2026-11-24',travelers:2,pricePerAdultYen:12000,totalPriceYen:24000,status:'purchased_pending_collection'},
  usj:{date:'2026-11-19',travelers:2,studioPassPurchased:true,expressPassPurchased:true,nintendoEntry:'13:50',harryPotterEntry:'16:00'},
  kounotori:{
    outward:{id:'outward',date:'2026-11-22',status:'reserved',train:'Kounotori 5',from:'Osaka',to:'Kinosaki Onsen',depart:'10:12',arrive:'12:51',car:'4',seats:'9C / 9D',class:'Ordinary Reserved Seat',smoking:'Non-smoking'},
    return:{id:'return',date:'2026-11-23',status:'reserved',train:'Kounotori 22',from:'Kinosaki Onsen',to:'Osaka',depart:'15:30',arrive:'18:21',car:'7',seats:'8C / 8D',class:'Ordinary Reserved Seat',smoking:'Non-smoking'},
  },
});

export const localDate = point=>point.local.slice(0,10);
export const localClock = point=>point.local.slice(11,16);
export const flightNumberLabel = flight=>flight.number||'รอยืนยันหมายเลขเที่ยวบิน';
export const flightRouteLabel = flight=>flight.departure.airport+' '+flight.departure.terminal+' → '+flight.arrival.airport+' '+flight.arrival.terminal;
export const flightTimeLabel = flight=>localClock(flight.departure)+' – '+localClock(flight.arrival)+(localDate(flight.arrival)!==localDate(flight.departure)?' (+1 วัน)':'');
export function tripFlightList(){
  return [travelBookings.flights.outbound,travelBookings.flights.inbound].map(f=>({
    id:f.id,code:f.number,numberVerified:!!f.number,
    route:flightRouteLabel(f),
    date:f.id==='outbound'?'17 พ.ย.':'24–25 พ.ย.',
    time:flightTimeLabel(f),label:f.id==='outbound'?'ขาไป':'ขากลับ',
    departure:f.departure,arrival:f.arrival,
  }));
}
export function japanRailInfo(){
 const p=travelBookings.jrPass;
 return {pass:p.name,duration:p.durationDays+' วัน',start:'20 พ.ย.',end:'24 พ.ย.',
   price:'¥'+p.pricePerAdultYen.toLocaleString('en-US')+' / คน · รวม ¥'+p.totalPriceYen.toLocaleString('en-US')+' ('+p.travelers+' คน)',
   state:'ซื้อแล้ว · รอรับบัตรก่อน/ภายใน 20 พ.ย.'};
}
export function flightDurationMinutes(flight){
 return (Date.parse(flight.arrival.local)-Date.parse(flight.departure.local))/60000;
}
