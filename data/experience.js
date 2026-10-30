import {foodScheduleEvents} from './foodExperience.js';
import {detailedRouteGuide} from './detailedTransit.js';
import {travelBookings,localClock} from './centralTravel.js';
import {itinerary} from './trip.js';
import {travelGuide} from './mobility.js';
import {kyotoOptions,transportByDay,importantStops} from './travelTools.js';
import {beginnerDayGuide} from './beginnerGuide.js';

export const defaultPreferences={kyoto:'west',dayPlans:{},metroPassDays:{},airportTrain:'express'};
export const modes=[
  {id:'original',label:'Original'},
  {id:'rainy',label:'Rainy Day'},
  {id:'relaxed',label:'Relaxed Plan'}
];
export const isValidPreference=p=>p&&typeof p==='object';
export function normalizePreferences(value){
 const p=isValidPreference(value)?value:{};
 const days={};
 for(let day=1;day<=8;day++){const v=p.dayPlans?.[day];days[day]=['original','rainy','relaxed'].includes(v)?v:'original'}
 const metro={};
 for(let day=1;day<=8;day++)metro[day]=p.metroPassDays?.[day]===true;
 return {kyoto:p.kyoto==='east'?'east':'west',dayPlans:days,metroPassDays:metro,airportTrain:['express','rapit','jr'].includes(p.airportTrain)?p.airportTrain:'express'};
}
const slot=(time,title,detail,map)=>({time,title,detail,map});
const fixedTime=new Map([
 [3,[travelBookings.usj.nintendoEntry,travelBookings.usj.harryPotterEntry]],
 [6,[travelBookings.kounotori.outward.depart,travelBookings.kounotori.outward.arrive]],
 [7,[travelBookings.kounotori.return.depart]],
 [8,[localClock(travelBookings.flights.inbound.departure)]]
]);
const alternatives={
  2:{
    rainy:[
      slot('09:00–11:10','Osaka Museum of Housing and Living (indoor option)','ฝนหนักแทนปราสาทด้วยพิพิธภัณฑ์ในอาคาร','Osaka Museum of Housing and Living'),
      slot('11:10–11:55','เดินทางไป Namba','ใช้ Osaka Metro ไป Namba แล้วเดินไปร้านเทมปุระ','Osaka Metro Namba Station'),
      slot('12:00–13:00','Lunch — Tempura Makino Namba','ร้านหลัก; ถ้าคิวเกิน 15 นาทีใช้ Tendon Tenya Namba Sennichimae','Tempura Makino Namba Sennichimae Osaka'),
      slot('13:00–13:30','Dotonbori / Glico Sign','เดินชมตามฝน; ข้ามช่วงนี้ได้ถ้าฝนหนัก','Dotonbori Glico Sign Osaka'),
      slot('13:30–14:55','Shinsaibashi Shopping','ร้านค้าและทางเดินมีหลังคาบางช่วง','Shinsaibashi-suji Shopping Street Osaka'),
      slot('14:55–15:40','เดินทางไป Umeda Sky Building','Midosuji Shinsaibashi (M19) → Umeda (M16) แล้วเดินต่อ','Umeda Sky Building Osaka'),
    ],
    relaxed:[
      slot('09:00–11:10','Osaka Castle (Relaxed)','ชมปราสาทเท่าที่ไหว และออกจากปราสาทตามเวลาเพื่อให้ทันมื้อเที่ยง','Osaka Castle Main Tower Osaka'),
      slot('11:10–11:55','Osaka Castle → Namba','Morinomiya (N20) → Shinsaibashi (N15) → Namba (M20)','Osaka Metro Namba Station'),
      slot('12:00–13:00','Lunch — Tempura Makino Namba','Tendon Tenya เป็นสำรองถ้าคิวเกิน 15 นาที','Tempura Makino Namba Sennichimae Osaka'),
      slot('13:00–13:30','Dotonbori / Glico Sign','เดินเล่นริมน้ำ','Dotonbori Glico Sign Osaka'),
      slot('13:30–14:55','Shinsaibashi Shopping','เดินช้อปตามกำลัง ไม่ต้องเข้าทุกร้าน','Shinsaibashi-suji Shopping Street Osaka'),
      slot('14:55–15:40','Shinsaibashi → Umeda Sky Building','Midosuji Line มุ่งเหนือไป Umeda แล้วเดินไป Sky Building','Umeda Sky Building Osaka'),
    ]
  },
  3:{
    rainy:[
      slot('ก่อนเปิด','เข้าสวน USJ และตรวจโชว์ในร่ม','เลือกชมโชว์/เครื่องเล่นในอาคาร และตรวจเวลารอผ่านแอป','Universal Studios Japan'),
      slot('10:00','Minion Mayhem / indoor attractions','ตามคิวและสภาพอากาศจริง; ยังไม่ใช้ Express ผิดเวลา','Universal Studios Japan Minion Park'),
      slot(travelBookings.usj.nintendoEntry,'Super Nintendo World (จองเวลาแล้ว)','ต้องรักษาเวลาเข้าโซนตาม Express Pass','Super Nintendo World Osaka'),
      slot(travelBookings.usj.harryPotterEntry,'The Wizarding World of Harry Potter (จองเวลาแล้ว)','ต้องรักษาเวลาเข้าโซนตาม Express Pass','Wizarding World of Harry Potter Osaka'),
      slot('เย็น','ของฝากในร้าน / พักตามสภาพฝน','ระวังพื้นลื่นและร่มในโซนเครื่องเล่น','Universal Studios Japan')
    ],
    relaxed:[
      slot('ก่อนเปิด','USJ · เดินเข้าแบบไม่เร่ง','เช็กเวลาเปิดและคิวจริง','Universal Studios Japan'),
      slot('10:30','เลือกเพียง 1–2 เครื่องเล่น','เน้นกิน/ถ่ายรูป/พักให้เต็มที่ก่อนเวลาเข้า Nintendo','Universal Studios Japan'),
      slot('13:50','Super Nintendo World (จองเวลาแล้ว)','เข้าตาม Express Pass เหมือนเดิม','Super Nintendo World Osaka'),
      slot('16:00','The Wizarding World of Harry Potter (จองเวลาแล้ว)','เข้าตาม Express Pass เหมือนเดิม','Wizarding World of Harry Potter Osaka'),
      slot('เย็น','ชมร้านของฝากและกลับเมื่อพร้อม','ไม่เร่งเก็บทุกเครื่องเล่น','Universal Studios Japan')
    ]
  },
  5:{
    rainy:[
      slot('10:00','Namba Parks / สถานที่ในร่ม','ฝนหนักสามารถเปลี่ยนจาก Nara เป็น Osaka indoor แบบไม่ต้องจอง','Namba Parks Osaka'),
      slot('12:00','มื้อกลางวันร้านซูชิ / อาหารญี่ปุ่น','หาร้านที่นั่งในอาคารใกล้ที่พัก','Sushi Namba Naka Osaka'),
      slot('14:00','Namba City / Takashimaya','เดินห้างและของฝาก','Namba City Osaka'),
      slot('16:00','กลับโรงแรม เตรียมกระเป๋า','เช็กรถ Kounotori ที่จองไว้ในวันถัดไป','Centara Life Namba Hotel Osaka'),
    ],
    relaxed:[
      slot('09:30','Osaka-Namba → Kintetsu-Nara','ใช้ Kintetsu และ ICOCA จ่ายแยกจาก JR Pass','Kintetsu Nara Station'),
      slot('10:30','Nara Park','ชมกวางและสวนอย่างสบาย','Nara Park Japan'),
      slot('12:30','Todai-ji / มื้อกลางวัน','เลือกเที่ยวเฉพาะวัดหลัก หรือกลับก่อนก็ได้','Todai-ji Nara'),
      slot('15:00','กลับ Osaka พักผ่อน','เตรียมกระเป๋าไป Kinosaki','Centara Life Namba Hotel Osaka'),
    ]
  },
  7:{
    rainy:[
      slot('เช้า','อาหารเช้าที่ Nishimuraya และเช็กเอาต์','แจ้งรอบรถ Shuttle ที่ Reception','Nishimuraya Hotel Shogetsutei'),
      slot('13:45','พักในร้านกาแฟใกล้สถานี / รถ Shuttle','วันฝนตกหลีกเลี่ยงเดินริมคลองมาก; ควรถึงสถานีก่อนเวลา','Kinosaki Onsen Station'),
      slot(travelBookings.kounotori.return.depart,travelBookings.kounotori.return.train+' · Car '+travelBookings.kounotori.return.car+' · Seats '+travelBookings.kounotori.return.seats,'จองแล้ว Kinosaki → Osaka 15:30–18:21 ห้ามเปลี่ยนเวลา','Kinosaki Onsen Station'),
      slot('19:00','กลับ Centara','Osaka → Umeda Metro → Daikokucho','Centara Life Namba Hotel Osaka'),
    ],
    relaxed:[
      slot('เช้า','อาหารเช้าและพักผ่อนที่ Nishimuraya','พักออนเซ็นก่อนเช็กเอาต์ตามเวลาจริง','Nishimuraya Hotel Shogetsutei'),
      slot('14:20','ใช้ Shuttle ไปสถานี','เผื่อรถและคนช่วงวันหยุดญี่ปุ่น','Kinosaki Onsen Station'),
      slot('15:30','Kounotori 22 · Car 7 · Seats 8C / 8D','จองแล้ว 15:30–18:21','Kinosaki Onsen Station'),
      slot('19:00','กลับ Centara และพัก','ไม่ต้องจัดโปรแกรมกลางคืน','Centara Life Namba Hotel Osaka'),
    ]
  }
};
function buildKyoto(choice,mode){
 const option=kyotoOptions[choice==='east'?'east':'west'];
 if(mode==='original')return option.schedule;
 if(choice==='east')return mode==='relaxed'?option.schedule.filter((_,i)=>[0,1,3,4,6].includes(i)):option.schedule;
 if(mode==='relaxed')return option.schedule.filter((_,i)=>![3,6,11].includes(i)).map(x=>x.title==='Maruyama Park → Nene-no-Michi'?{...x,detail:'เดินชมตามแรงและพักก่อนชมไฟ Kodaiji'}:x);
 return [
  slot('07:00–08:45','Osaka → Arashiyama','Metro + JR ใช้พาสเฉพาะ JR','Saga-Arashiyama Station Kyoto'),
  slot('09:00–09:40','Bamboo Grove (ฝนเบา)','เดินเฉพาะจุดไม่ลื่น ถ้าฝนหนักตัดได้','Arashiyama Bamboo Grove Kyoto'),
  slot('09:45–10:30','Tenryu-ji Garden / Indoor break','ตรวจการเปิดสวนในวันที่ฝนตก','Tenryu-ji Temple Kyoto'),
  slot('10:50–11:50','Lunch — Ozuru / indoor backup','ร้านอุด้งในอาคาร ไม่เดินออกนอกเส้นทาง','Arashiyama Udon Ozuru Kyoto'),
  slot('12:00–13:15','พักร้านชา / รอรถ Hankyu','ลดเดินริมแม่น้ำและสะพานเมื่อฝนหนัก','Hankyu Arashiyama Station Kyoto'),
  slot('13:20–14:15','Hankyu → Kyoto-Kawaramachi','HK98 → Katsura HK81 → HK86 ใช้ ICOCA','Kyoto-Kawaramachi Station Kyoto'),
  slot('14:20–15:50','Gion · Covered Shops / Café','ย่นกิจกรรมกลางแจ้งตามสภาพอากาศ','Kyoto-Kawaramachi Station Kyoto'),
  slot('15:50–16:50','เดินไป Kodaiji / พักในร่ม','ตรวจสภาพอากาศและการเปิดงานจริง','Kodaiji Temple Kyoto'),
  slot('17:00–18:15','Kodaiji Night Illumination (if operating)','ชมเฉพาะเมื่อวัดเปิดและฝนไม่รุนแรง; ถ้าปิดให้เปลี่ยนเป็นมื้อเย็นก่อน','Kodaiji Temple Kyoto'),
  slot('18:15–19:30','Dinner — Gion / Kawaramachi','ร้านญี่ปุ่นในอาคาร','Gion-Shijo Station Kyoto'),
  slot('19:30–21:00','Keihan → Yodoyabashi → Daikokucho','ICOCA แยกจาก JR Pass','Centara Life Namba Hotel Osaka')
 ];
}
export function resolvedSchedule(day,prefs){
 const original=itinerary[day-1]?.schedule||[];
 const mode=prefs?.dayPlans?.[day]||'original';
 let base=day===4?buildKyoto(prefs?.kyoto,mode):(alternatives[day]?.[mode]||original);
 if(day===2){
   const late=[
    slot('15:45–16:15','Umeda Sky Building','ไปจุดชมวิวก่อนช่วงพระอาทิตย์ตก','Umeda Sky Building Osaka'),
    slot('16:20–17:20','Sunset Special Moment','ชมแสงเย็นและถ่ายภาพ','Umeda Sky Building Osaka'),
    slot('18:15–20:00','Special Dinner','STARDUST · Confirmed booking (เวลาในแผนยังไม่ยืนยันจากใบจอง); XEX WEST เป็นสำรองฉุกเฉิน','Sky Lounge STARDUST Osaka')
   ];
   base=[...base.filter(x=>!(['Umeda Sky Building','Sunset Special Moment','Special Dinner'].includes(x.title)||/^Grand Front Osaka$/i.test(x.title))),...late];
 }
 const titles=base.map(x=>x.title.toLowerCase()).join(' | ');
 const meals=foodScheduleEvents(day,prefs).filter(x=>{
  if(day===2&&(x.foodKind==='dinner'||x.foodKind==='lunch'))return false;
  if(day===4&&['lunch','dinner','coffee','snack'].includes(x.foodKind))return false;
  if(day===4&&mode==='relaxed'&&x.foodKind==='snack')return false;
  return !titles.includes(x.title.toLowerCase());
 });
 return [...base,...meals].sort((a,b)=>{
   const m=x=>{const r=String(x.time).match(/^(\d{1,2}):(\d{2})/);return r?+r[1]*60 + +r[2]:9999};
   return m(a)-m(b);
 });
}
export function resolveDay(day,prefs){
 const base=itinerary[day-1];
 if(!base)return null;
 const mode=prefs?.dayPlans?.[day]||'original';
 const opts=day===4?kyotoOptions[prefs?.kyoto==='east'?'east':'west']:null;
 return {...base,schedule:resolvedSchedule(day,prefs),
  ...(opts?{title:opts.name,subtitle:opts.label,summary:opts.summary,highlight:opts.label,
       map:prefs?.kyoto==='east'?'Fushimi Inari Taisha Kyoto':'Arashiyama Bamboo Grove Kyoto',
       note:opts.note}:{}),
  mode};
}
export function resolvedSegments(day,prefs){
 const base=transportByDay[day]||[];
 if(day===8){
   const choice=prefs?.airportTrain||'express';
   if(choice==='jr')return [
    {route:'Centara → JR Imamiya',card:'เดิน',type:'walk',note:'เดินไปสถานี JR Imamiya ก่อนใช้พาส'},
    {route:'JR Imamiya → Tennoji → Kansai Airport',card:'Kansai WIDE Pass · JR Kansai Airport Rapid',type:'jr',note:'นั่ง JR ที่อยู่ในเขตพาส ถ้าเริ่ม/รับพาสแล้วจะไม่มีค่า JR เพิ่ม'},
   ];
   return [
    {route:'Centara → Nankai Namba',card:'เดิน',type:'walk',note:'เดินถึงสถานี Nankai Namba'},
    choice==='rapit'?{route:'Nankai Namba → Kansai Airport · Rapi:t Regular Seat',type:'nankai',card:'Nankai Rapi:t Reserved Seat',note:'ค่าโดยสาร ¥970 + Express Regular Seat ¥700; ยังไม่ได้ซื้อตั๋วขากลับ'}:
     {route:'Nankai Namba → Kansai Airport · Airport Express',type:'nankai',card:'ICOCA · Nankai Airport Express',note:'¥970/คน ไม่มีค่ารถด่วนเพิ่มเติม'},
   ];
 }
 if(day!==4){
  if(day===5&&prefs?.dayPlans?.[5]==='rainy')return [
   {route:'Daikokucho → Namba',type:'metro',card:'ICOCA / Metro',note:'Metro ¥190/คน; หรือเดินฟรีได้'},
   {route:'Namba → Daikokucho',type:'metro',card:'ICOCA / Metro',note:'Metro ¥190/คน; หรือเดินกลับฟรีได้'}
  ];
  return base;
 }
 const mk=(route,type,card,note)=>({route,type,card,note});
 const west=prefs?.kyoto!=='east';
 const rainy=prefs?.dayPlans?.[4]==='rainy';
 if(west)return [
  mk('Daikokucho → Umeda','metro','ICOCA / Osaka Metro','Metro จ่ายแยก'),
  mk('JR Osaka → Kyoto → Saga-Arashiyama','jr','Kansai WIDE Pass','รวมใน JR Pass 20–24 พ.ย.'),
  mk('Arashiyama Bamboo Grove → Tenryu-ji','walk','เดิน','ค่าชมวัดแยก'),
  ...(rainy?[mk('Saga-Arashiyama → Kyoto Railway Museum','jr','Kansai WIDE Pass + เดิน','เส้นทางจริงตรวจวันเดินทาง')]:[]),
  mk('JR Saga-Arashiyama / Kyoto → JR Osaka','jr','Kansai WIDE Pass','แผนขากลับ JR; ถ้าเลือก Metro/Keihan มีค่าเพิ่ม'),
  mk('Umeda → Daikokucho','metro','ICOCA / Osaka Metro','Metro จ่ายแยก')
 ];
 return [
  mk('Daikokucho → Yodoyabashi','metro','ICOCA / Osaka Metro','Metro จ่ายแยก'),
  mk('Yodoyabashi → Fushimi-Inari','keihan','ICOCA / Keihan','JR Pass ไม่ครอบคลุม Keihan'),
  mk('Fushimi-Inari → Kiyomizu-Gojo / Kyoto National Museum','keihan','ICOCA / Keihan','จ่ายแยก'),
  mk('Gion-Shijo / Kyoto → Yodoyabashi','keihan','ICOCA / Keihan','รถไฟเอกชนจ่ายแยก'),
  mk('Yodoyabashi → Daikokucho','metro','ICOCA / Osaka Metro','Metro จ่ายแยก')
 ];
}
export function resolvedGuide(day,prefs){
  const detailed=detailedRouteGuide(day,prefs);
  if(detailed.legs.length)return detailed;
 if(day!==4&&prefs?.dayPlans?.[day]!=='rainy'&&prefs?.dayPlans?.[day]!=='relaxed')
   return travelGuide[day-1];
 const plan=resolveDay(day,prefs);
 const segments=resolvedSegments(day,prefs);
 const legs=segments.map((segment,i)=>({
  from:segment.route.split(' → ')[0],to:segment.route.split(' → ').slice(-1)[0],
  line:segment.route,mode:segment.card,how:segment.note,duration:'ตรวจเส้นทางตามเวลาจริง',
  pay:segment.card,icon:segment.type==='walk'?'walk':'train'
 }));
 return {day,kicker:plan.title,overview:segments.map(x=>x.route).join(' · '),
  leave:plan.schedule[0]?.time+' · '+plan.schedule[0]?.title,
  reminder:'แผนสำรอง/ตัวเลือกที่กำลังแสดง · ตรวจรถไฟและค่าโดยสารตามจริงก่อนเดินทาง',
  legs,confirmed:false};
}
export function resolvedBeginner(day,prefs){
 if(day!==4&&(!prefs?.dayPlans?.[day]||prefs.dayPlans[day]==='original'))return beginnerDayGuide[day];
 const plan=resolveDay(day,prefs);
 return {time:plan.schedule[0]?.time,label:plan.title,steps:plan.schedule.map(x=>[x.time+' '+x.title,x.detail,'ตามแผนที่เลือก']),note:plan.note};
}
export function resolvedStops(day,prefs){
 const slots=resolvedSchedule(day,prefs);
 const mapped=slots.map(s=>s.map).filter(Boolean);
 return mapped.length?mapped:importantStops[day]||[];
}
export function getJapanClock(date=new Date()){
 const parts=new Intl.DateTimeFormat('en-GB',{timeZone:'Asia/Tokyo',year:'numeric',
  month:'2-digit',day:'2-digit',hour:'2-digit',minute:'2-digit',second:'2-digit',
  hourCycle:'h23'}).formatToParts(date);
 const obj=Object.fromEntries(parts.filter(p=>p.type!=='literal').map(p=>[p.type,p.value]));
 return {date:obj.year+'-'+obj.month+'-'+obj.day,time:obj.hour+':'+obj.minute+':'+obj.second,
  clock:obj.hour+':'+obj.minute,minutes:Number(obj.hour)*60+Number(obj.minute)};
}
export function tripPhase(date){
 return date<'2026-11-17'?'pre':date>'2026-11-24'?'post':'during';
}
export function dayForDate(date){
 const day=itinerary.find(d=>date==='2026-11-'+String(16+d.day).padStart(2,'0'));
 return day?.day||null;
}
export function nextScheduleEntry(day,prefs,minutes){
 const date='2026-11-'+String(day+16).padStart(2,'0');
 const timed=resolvedSchedule(day,prefs).flatMap((slot,index)=>{
  const m=String(slot.time).match(/^(\d{1,2}):(\d{2})/);
  if(!m)return [];
  // The inbound flight arrives on 25 Nov and must not appear as a
  // 00:15 "next" event for the Japan-time calendar day of 24 Nov.
  if(slot.date&&slot.date!==date)return [];
  const t=Number(m[1])*60+Number(m[2]);
  const jst=t+(slot.timeZone==='Asia/Bangkok'?120:0);
  return [{slot,at:jst,index}];
 }).sort((a,b)=>a.at-b.at||a.index-b.index);
 return timed.find(item=>item.at>=minutes)?.slot||null;
}
