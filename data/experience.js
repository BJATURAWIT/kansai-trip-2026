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
 return {kyoto:p.kyoto==='east'?'east':'west',dayPlans:days,metroPassDays:metro,airportTrain:p.airportTrain==='rapit'?'rapit':'express'};
}
const slot=(time,title,detail,map)=>({time,title,detail,map});
const fixedTime=new Map([
 [3,['13:50','16:00']],
 [6,['10:12','12:51']],
 [7,['15:30']],
 [8,[localClock(travelBookings.flights.inbound.departure)]]
]);
const alternatives={
  2:{
    rainy:[
      slot('09:30','Osaka Museum of Housing and Living (ในอาคาร)','พิพิธภัณฑ์บ้านเรือนโอซาก้า เหมาะวันฝนตก ตรวจเวลา/ค่าเข้าก่อน','Osaka Museum of Housing and Living'),
      slot('12:00','Kuromon / Nippombashi มื้อกลางวัน','เลือกอาหารทะเลและร้านซูชิที่มีที่นั่งในอาคาร','Kuromon Market Osaka'),
      slot('14:00','Namba Parks / Namba City','ห้างและร้านค้าภายในอาคาร เน้นพักเดินสบาย','Namba Parks Osaka'),
      slot('16:30','Grand Front Osaka / Umeda','นั่ง Metro ไป Umeda เดินเล่นในห้างแทนจุดชมวิวกลางแจ้ง','Grand Front Osaka'),
    ],
    relaxed:[
      slot('10:00','Kuromon Market และอาหารกลางวัน','ออกช้ากว่าแผนปกติ เลือกร้านซูชิที่นั่งสบาย','Kuromon Market Osaka'),
      slot('13:00','Shinsaibashi / Dotonbori','เดินถ่ายรูป กินขนม จัดเวลาอย่างสบาย','Dotonbori Osaka'),
      slot('16:00','Umeda Sky Building (ถ้าอยากไป)','ชมพระอาทิตย์ตกตามสภาพอากาศ หรือกลับพักโรงแรม','Umeda Sky Building Osaka')
    ]
  },
  3:{
    rainy:[
      slot('ก่อนเปิด','เข้าสวน USJ และตรวจโชว์ในร่ม','เลือกชมโชว์/เครื่องเล่นในอาคาร และตรวจเวลารอผ่านแอป','Universal Studios Japan'),
      slot('10:00','Minion Mayhem / indoor attractions','ตามคิวและสภาพอากาศจริง; ยังไม่ใช้ Express ผิดเวลา','Universal Studios Japan Minion Park'),
      slot('13:50','Super Nintendo World (จองเวลาแล้ว)','ต้องรักษาเวลาเข้าโซนตาม Express Pass','Super Nintendo World Osaka'),
      slot('16:00','The Wizarding World of Harry Potter (จองเวลาแล้ว)','ต้องรักษาเวลาเข้าโซนตาม Express Pass','Wizarding World of Harry Potter Osaka'),
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
      slot('15:30','Kounotori 22 · Car 7 · Seats 8C / 8D','จองแล้ว Kinosaki → Osaka 15:30–18:21 ห้ามเปลี่ยนเวลา','Kinosaki Onsen Station'),
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
 if(mode==='relaxed')return choice==='west'?
  option.schedule.filter((_,i)=>[0,1,2,3].includes(i)).concat(slot('14:00–16:00','กลับ Osaka หรือเดินย่าน Arashiyama ต่อ','คงวันที่ 20 พ.ย. เป็นวันพักผ่อนหลังเที่ยววัด','Saga-Arashiyama Station Kyoto')):
  option.schedule.filter((_,i)=>[0,1,3,4].includes(i)).concat(slot('16:00','Gion หรือกลับ Osaka','เลือกได้ตามความเหนื่อย','Gion Kyoto'));
 return choice==='west'?
 [
  slot('07:00','Osaka → Saga-Arashiyama','JR Osaka → Kyoto → JR Sagano Line; เช็กฝนก่อนออก','Saga-Arashiyama Station Kyoto'),
  slot('09:00','Arashiyama Bamboo Grove (เดินสั้นเมื่อฝนเบา)','หลีกเลี่ยงทางลื่นและฝนหนัก','Arashiyama Bamboo Grove Kyoto'),
  slot('09:40','Tenryu-ji โซนที่เปิดให้ชม','ตรวจส่วนในอาคารที่เปิด/ค่าเข้าจริง','Tenryu-ji Temple Kyoto'),
  slot('12:00','อาหารกลางวันในร่ม','พักกินใกล้สถานี JR Saga-Arashiyama','Saga-Arashiyama Station Kyoto'),
  slot('14:00','Kyoto Railway Museum (ถ้าฝนหนัก)','สลับเป็นพิพิธภัณฑ์ในอาคาร ตรวจเวลาเปิด/บัตรก่อน','Kyoto Railway Museum'),
  slot('16:30','กลับ Osaka','เดินทางกลับผ่าน Kyoto Station','Kyoto Station'),
 ]:[
  slot('08:00','Keihan → Fushimi-Inari','Metro + Keihan ใช้ ICOCA ค่าโดยสารจ่ายแยก','Fushimi Inari Station Kyoto'),
  slot('09:00','Fushimi Inari (เดินสั้นช่วงฝนเบา)','อย่าขึ้นเขาในวันที่ลื่น','Fushimi Inari Taisha Kyoto'),
  slot('11:00','Kyoto National Museum','ย้ายไปชมพิพิธภัณฑ์ในร่มแทนเดิน Kiyomizu กลางฝน','Kyoto National Museum'),
  slot('13:00','ร้านอาหารและถนนใต้หลังคา','เลือก Nishiki Market หรือร้านในย่านใจกลาง Kyoto','Nishiki Market Kyoto'),
  slot('16:00','กลับ Osaka','Keihan / Metro ตามเส้นทางที่สะดวก','Yodoyabashi Station Osaka')
 ];
}
export function resolvedSchedule(day,prefs){
 const original=itinerary[day-1]?.schedule||[];
 const mode=prefs?.dayPlans?.[day]||'original';
 if(day===4)return buildKyoto(prefs?.kyoto,mode);
 return alternatives[day]?.[mode]||original;
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
 if(day!==4){
  if(day===5&&prefs?.dayPlans?.[5]==='rainy')return [
   {route:'Centara → Namba / Nippombashi (Osaka Metro ถ้าเลือกนั่ง)',type:'metro',card:'ICOCA / Metro',note:'ใช้ภายใน Osaka; ไม่ไป Kintetsu-Nara'},
   {route:'Namba / Nippombashi → Centara',type:'metro',card:'ICOCA / Metro',note:'เดินฟรีหรือ Metro จ่ายแยก'}
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
