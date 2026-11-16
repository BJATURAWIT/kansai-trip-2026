/** Public-safe booking source. Updated from passenger's Thai Airways itinerary on 16 Nov 2026.
 * The PDF confirms flight dates/times, aircraft, booking status and baggage PIECE counts.
 * Do not infer checked-baggage weight from "1 PC / 2 PCS"; do not expose PNR/passenger IDs.
 * All airport timestamps use the local timezone shown in each endpoint.
 */
export const travelBookings = Object.freeze({
  trip: {startDate:'2026-11-17',endDate:'2026-11-25',travelers:2,days:9,nights:8},
  flights: {
    outbound: {
      id:'outbound', number:'TG672', numberEvidence:'Thai Airways confirmed itinerary 16 Nov 2026',airline:'Thai Airways',aircraft:'Boeing 777-300ER',cabin:'Economy (W)',checkedBaggagePieces:1,checkedBaggageWeightKg:null,
      departure:{airport:'BKK',terminal:'',local:'2026-11-17T08:15:00+07:00',timeZone:'Asia/Bangkok'},
      arrival:{airport:'KIX',terminal:'T1',local:'2026-11-17T15:45:00+09:00',timeZone:'Asia/Tokyo'},
      status:'booked',
    },
    inbound: {
      id:'inbound',number:'TG673',numberEvidence:'Thai Airways confirmed itinerary 16 Nov 2026',airline:'Thai Airways',aircraft:'Boeing 777-300ER',cabin:'Economy (S)',checkedBaggagePieces:2,checkedBaggageWeightKg:null,
      departure:{airport:'KIX',terminal:'T1',local:'2026-11-25T17:25:00+09:00',timeZone:'Asia/Tokyo'},
      arrival:{airport:'BKK',terminal:'',local:'2026-11-25T22:00:00+07:00',timeZone:'Asia/Bangkok'},
      status:'confirmed',
    },
  },
  hotels:[
    {id:'centara1',name:'Centara Life Namba Hotel Osaka',date:'17–22 พ.ย. · 5 คืน',plan:'Room only',area:'Osaka / Namba',map:'Centara Life Namba Hotel Osaka',booked:true},
    {id:'nishimuraya',name:'Nishimuraya Hotel Shogetsutei',date:'22–23 พ.ย. · 1 คืน',plan:'Dinner + Breakfast',area:'Kinosaki Onsen',map:'Nishimuraya Hotel Shogetsutei',booked:true},
    {id:'centara2',name:'Centara Life Namba Hotel Osaka',date:'23–24 พ.ย. · 1 คืน',plan:'Breakfast included',area:'Osaka / Namba',map:'Centara Life Namba Hotel Osaka',booked:true},
    {id:'centaraExtra',name:'Centara Life Namba Hotel Osaka',date:'24–25 พ.ย. · เพิ่ม 1 คืน (รอหลักฐานยืนยัน)',plan:'Breakfast offered · รอยืนยันจากโรงแรม',area:'Osaka / Namba',map:'Centara Life Namba Hotel Osaka',booked:false},
  ],
  // Only public-safe fields. Reservation email, confirmation IDs and private notes stay offline.
  restaurants:{
    stardust:{
      id:'stardust',name:'Sky Lounge STARDUST',date:'2026-11-18',
      partySize:2,location:'Umeda Sky Building Tower East 39F',
      status:'confirmed',publicLabel:'Special Dinner',
      reservationTimeLocal:null,plannedDinnerStartLocal:'18:15',plannedDinnerEndLocal:'20:00',
      courseName:null,windowSeatConfirmed:null,beefSubstitutionConfirmed:null
    }
  },
  nankaiArrival:{
    product:'Rapi:t Digital Ticket',seatClass:'Super Seat',direction:'Kansai Airport → Nankai Namba',date:'2026-11-17',
    travelers:2,pricePerAdultYen:1590,totalPaidYen:3180,purchased:true,seatSelectionConfirmed:false,
    status:'purchased_pending_seat_selection',includesBaseFare:true,includesLimitedExpress:true,
    firstUseDeadlineLocal:'2026-11-18T02:59:00+09:00',validAfterFirstUse:'only_on_first_use_date',
    walletUrl:'https://nk-digital-ticket.nankai.co.jp/',
    officialInfoUrl:'https://www.nankai.co.jp/en_railway/ticket/rapit/',
    selectByMinutesBeforeDeparture:5,maxTrainChanges:2,
    remark:'Select boarding date, train and Super Seat for both people AFTER immigration and baggage claim. The purchase email is NOT a ticket; use live smartphone QR at designated gates.'
  },
  jrPass:{name:'JR-WEST Kansai WIDE Area Pass',durationDays:5,startDate:'2026-11-20',endDate:'2026-11-24',travelers:2,pricePerAdultYen:12000,totalPriceYen:24000,status:'purchased_pending_collection'},
  usj:{
    date:'2026-11-19',travelers:2,studioPassPurchased:true,expressPassPurchased:true,
    nintendoEntry:'13:40–14:40',
    marioKartExpress:'13:40–14:10',
    donkeyKongExpress:'14:10–14:40',
    jawsEntry:'ไม่กำหนดเวลา (Choice A)',
    harryPotterEntry:'ไม่กำหนดเวลา (Choice B)'
  },
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
    date:f.id==='outbound'?'17 พ.ย.':'25 พ.ย.',
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
