import {travelBookings} from './centralTravel.js';
// Travel operations data. Suggested times/paths are NOT live transit reservations.
export const defaultTickets = {
  passStatus:'purchased', passStart:travelBookings.jrPass.startDate,
  outward:travelBookings.kounotori.outward,
  return:travelBookings.kounotori.return,
};
export const ticketStatus = {selected:'เลือกแล้ว · รอซื้อ',purchased:'ซื้อแล้ว · รอรับ',collected:'รับบัตรแล้ว',unverified:'ยังไม่ยืนยัน',reserved:'จองที่นั่งแล้ว'};
export const passEndDate = start => {
  if(!/^2026-\d\d-\d\d$/.test(start||''))return '';
  const n=new Date(start+'T00:00:00Z');
  if(Number.isNaN(n.getTime()))return '';
  n.setUTCDate(n.getUTCDate()+4);return n.toISOString().slice(0,10);
};
export const passCoversDay = (day,tickets) => {
  const date='2026-11-'+String(day+16).padStart(2,'0');
  return tickets?.passStatus==='collected' && date>=tickets.passStart && date<=passEndDate(tickets.passStart);
};
const mk=(route,type,card,note='',amount='')=>({route,type,card,note,amount});
export const transportByDay={
  1:[
    {...mk('KIX → Nankai Namba','nankai','Nankai Rapi:t Super Seat (Digital Ticket)','ซื้อแล้ว ¥3,180 / 2 คน รวมค่าโดยสารพื้นฐานและ Limited Express · รอเลือกขบวน/ที่นั่งหลังผ่าน ตม.'),prepaid:true,fareYenPerAdult:travelBookings.nankaiArrival.pricePerAdultYen,fareSource:travelBookings.nankaiArrival.officialInfoUrl},
    mk('Nankai Namba → Centara','walk','เดิน / แท็กซี่','เดินฟรี หรือแท็กซี่จ่ายแยก'),
  ],
  2:[
    mk('Centara → Daikokucho','walk','เดิน','สถานีอยู่ใกล้โรงแรม'),
    mk('Daikokucho → Morinomiya (Osaka Castle)','metro','ICOCA / Osaka Metro','Zone 2 · ¥240/คน (Daikokucho → Morinomiya; ไม่คิดค่าการเปลี่ยนสายแยก)'),
    mk('Osaka Castle → Nippombashi (Kuromon)','metro','ICOCA / Osaka Metro','Zone 2 · ¥240/คน (Morinomiya → Nippombashi)'),
    mk('Nippombashi → Shinsaibashi / Namba','metro','ICOCA / Osaka Metro','Zone 1 · ¥190/คน ถึง Shinsaibashi หรือเดินแทนฟรี; ถ้าไป Namba เป็นคนละปลายทาง'),
    mk('Shinsaibashi → Umeda Sky','metro','ICOCA / Osaka Metro','Zone 2 · ¥240/คน ถึง Umeda แล้วเดินต่อ Umeda Sky'),
    mk('Umeda → Daikokucho','metro','ICOCA / Osaka Metro','Zone 2 · ¥240/คน ขากลับ Daikokucho'),
  ],
  3:[
    mk('Osaka-Namba → Nishikujo','other','ICOCA · Hanshin','รถไฟ Hanshin ไม่ใช่ JR'),
    mk('Nishikujo → Universal-City','jr','ICOCA · JR ก่อนวันเริ่มพาส','JR Pass แผนเริ่ม 20 พ.ย. จึงยังไม่ครอบคลุมวันที่ 19'),
    mk('Universal-City → โรงแรม','mixed','ICOCA · JR + Hanshin/Metro','จ่ายตามระยะทางที่ใช้จริง'),
  ],
  4:[
    mk('Daikokucho → Umeda','metro','ICOCA · Osaka Metro','ไม่รวมใน Kansai WIDE'),
    mk('JR Osaka → Kyoto → Saga-Arashiyama','jr','Kansai WIDE Pass','รถไฟ JR Kyoto/Sagano ภายในเขตพาส'),
    mk('Saga-Arashiyama → Bamboo Grove / Tenryu-ji','walk','เดิน','ค่าเข้าวัด Tenryu-ji จ่ายแยก ไม่ใช่ค่าโดยสาร'),
    mk('Saga-Arashiyama → Kyoto → Inari','jr','Kansai WIDE Pass','ใช้เมื่อเลือกเที่ยวทั้งฝั่งตะวันตกและตะวันออก'),
    mk('Fushimi-Inari → Kiyomizu-Gojo','keihan','ICOCA · Keihan','Keihan ไม่รวมใน JR Pass'),
    mk('Gion-Shijo → Yodoyabashi → Daikokucho','mixed','ICOCA · Keihan + Metro','จ่ายแยกจาก JR Pass'),
  ],
  5:[
    mk('Daikokucho → Namba','metro','ICOCA · Osaka Metro','ค่าโดยสาร Metro จ่ายแยก'),
    mk('Osaka-Namba → Kintetsu-Nara','kintetsu','ICOCA · Kintetsu','เลือก Kintetsu เพราะใกล้ Nara Park กว่า JR Nara'),
    mk('Nara Park → Todai-ji → Kasuga Taisha','walk','เดิน','ค่าเข้าวัด/สวนจ่ายแยก'),
    mk('Kintetsu-Nara → Osaka-Namba','kintetsu','ICOCA · Kintetsu','JR Pass ไม่ครอบคลุม Kintetsu'),
  ],
  6:[
    mk('Centara → Daikokucho → Umeda','metro','ICOCA · Osaka Metro','Metro จ่ายแยก'),
    mk('JR Osaka → Kinosaki Onsen · '+travelBookings.kounotori.outward.train,'jr','Kansai WIDE Pass + Reserved Seat','ยืนยันแล้ว '+travelBookings.kounotori.outward.depart+'–'+travelBookings.kounotori.outward.arrive+' · Car '+travelBookings.kounotori.outward.car+' · Seats '+travelBookings.kounotori.outward.seats),
    mk('Kinosaki Station → Nishimuraya','shuttle','Check-in Shuttle Bus','รถรับส่งร่วมของเมือง ฟรีตามรอบที่กำหนด แจ้งชื่อเรียวกัง'),
  ],
  7:[
    mk('Nishimuraya → Kinosaki Onsen Station','shuttle','Shogetsutei Shuttle','รถรับส่งของโรงแรมตามเวลาที่ Reception ยืนยัน'),
    mk('Kinosaki Onsen → JR Osaka · '+travelBookings.kounotori.return.train,'jr','Kansai WIDE Pass + Reserved Seat','ยืนยันแล้ว '+travelBookings.kounotori.return.depart+'–'+travelBookings.kounotori.return.arrive+' · Car '+travelBookings.kounotori.return.car+' · Seats '+travelBookings.kounotori.return.seats),
    mk('JR Osaka → Daikokucho → Centara','metro','ICOCA · Osaka Metro','รถไฟ Metro จ่ายแยก'),
  ],
  8:[
    mk('Centara → Nankai Namba','walk','เดิน / แท็กซี่','เดินฟรี หรือแท็กซี่จ่ายแยก'),
    mk('Nankai Namba → Kansai Airport','nankai','Airport Express (ICOCA) หรือ Rapi:t','เลือก Nankai = จ่ายแยกแม้ JR Pass ยังมีผล; Rapi:t ต้องใช้ Express ticket'),
    mk('ทางเลือก: JR ไป KIX ผ่าน Tennoji','jr','Kansai WIDE Pass · JR HARUKA/Rapid','รวมในพาสถ้าออกเดินทางด้วย JR ภายในวันใช้งาน; เลือกตามความสะดวก'),
  ],
};
export function fareLabel(segment,day,tickets){
  if(segment.type==='walk')return {label:'เดินฟรี / แท็กซี่จ่ายแยก',status:'free'};
  if(segment.type==='shuttle')return {label:'รถรับส่งฟรีตามเงื่อนไข',status:'free'};
  if(segment.prepaid===true)return {label:'ซื้อแล้ว · ไม่ต้องจ่ายซ้ำ (รอเลือกที่นั่ง)',status:'included'};
  if(segment.type==='jr'){
    const date='2026-11-'+String(day+16).padStart(2,'0');
    const inDateRange=date>=tickets.passStart&&date<=passEndDate(tickets.passStart);
    if(passCoversDay(day,tickets))return {label:'รวมในพาส',status:'included'};
    if(inDateRange&&tickets.passStatus==='purchased')return {label:'รวมในพาสเมื่อรับบัตร',status:'included'};
    return {label:day<4?'จ่ายแยก (พาสยังไม่เริ่ม)':'ต้องมีพาสที่ใช้ได้ หรือจ่ายแยก',status:'extra'};
  }
  return {label:segment.type==='nankai'?'จ่ายแยก / Rapi:t เพิ่มค่า Express':segment.type==='metro'?'แตะ ICOCA = หักเงิน':'จ่ายแยก (ICOCA/ตั๋ว)',status:'extra'};
}
const spot=(time,title,detail,map)=>({time,title,detail,map});
export const kyotoOptions={
 west:{name:'Kyoto West — Arashiyama',label:'Kyoto West · Main Plan',summary:'เช้า Arashiyama → ป่าไผ่ → Tenryu-ji → สะพาน → อุด้งใกล้ทางเดิน → กลับ Osaka',
 schedule:[
 spot('06:30–07:00','ออกจาก Centara ไป Arashiyama','Osaka Metro → JR Osaka → Kyoto → Saga-Arashiyama','Saga-Arashiyama Station Kyoto'),
 spot('08:15','Arashiyama Bamboo Grove','เดินป่าไผ่ก่อนคนแน่น','Arashiyama Bamboo Grove Kyoto'),
 spot('09:00','Tenryu-ji Temple','ชมสวนเซนตามทาง','Tenryu-ji Kyoto'),
 spot('10:15','Togetsukyo Bridge','เดินชมสะพานก่อนมื้อกลางวัน','Togetsukyo Bridge Kyoto'),
 spot('11:00','Ozuru Udon · Lunch','Kitsune/Tempura udon; ถ้าคิวเกิน 10–15 นาที ไป Saganoya ที่เปิด 11:30','Arashiyama Udon Ozuru Kyoto'),
 spot('13:00–14:30','Local Snacks / Matcha / Sightseeing (Optional)','เฉพาะร้านใกล้เส้นทางและคิวสั้น ไม่เดินอ้อม','Arashiyama Kyoto'),
 spot('14:30–16:00','เดินทางกลับ Osaka','เดินกลับ JR Saga-Arashiyama → Kyoto → Osaka','Saga-Arashiyama Station Kyoto')
 ],note:'Main Plan เป็น Kyoto West เท่านั้น; ร้าน Saganoya ใกล้ JR Saga-Arashiyama เปิด 11:30'},
 east:{name:'Kyoto East — Higashiyama',label:'Kyoto East · Alternative',summary:'Fushimi Inari → Tofukuji → Kiyomizu-dera → Gion ไม่ย้อนกลับ Arashiyama',
 schedule:[
 spot('07:15','Daikokucho → Fushimi Inari','Osaka Metro + Keihan (ICOCA)','Fushimi Inari Station Kyoto'),
 spot('09:00','Fushimi Inari Taisha','เดินเสาโทริอิแดง','Fushimi Inari Taisha Kyoto'),
 spot('10:30','Tofukuji','จุดชมใบไม้แดงระหว่างทาง','Tofukuji Temple Kyoto'),
 spot('12:30','Kiyomizu-dera','เดินผ่าน Sannenzaka/Ninenzaka','Kiyomizu-dera Kyoto'),
 spot('13:45','Izuju Sushi (optional East lunch)','Kyoto style sushi; ราคาและคิวตรวจหน้างาน','Gion Izuju Sushi Kyoto'),
 spot('15:30','Saryo Tsujiri (optional)','Matcha parfait','Saryo Tsujiri Gion Honten Kyoto'),
 spot('16:30','Gion-Shijo → Osaka','Keihan + Osaka Metro','Gion Shijo Station Kyoto')
 ],note:'Kyoto East เป็นทางเลือกแยก ไม่ผสมกับ West'}
};
export const importantStops={
  1:['Don Mueang International Airport','Kansai International Airport Terminal 1','Nankai Namba Station','Centara Life Namba Hotel Osaka'],
  2:['Osaka Castle','Kuromon Ichiba Market','Shinsaibashi','Umeda Sky Building'],
  3:['Universal Studios Japan','Hollywood Dream The Ride Universal Studios Japan','Universal Studios Japan JAWS','Super Nintendo World Osaka','Wizarding World Harry Potter Osaka'],
  4:['Osaka Station','Arashiyama Bamboo Grove Kyoto','Tenryu-ji Temple Kyoto','Togetsukyo Bridge Kyoto','Gion Kyoto'],
  5:['Osaka Namba Station','Nara Park','Todai-ji Nara','Kasuga Taisha Nara'],
  6:['Centara Life Namba Hotel Osaka','Osaka Station','Kinosaki Onsen Station','Nishimuraya Hotel Shogetsutei'],
  7:['Nishimuraya Hotel Shogetsutei','Kinosaki Onsen Station','Osaka Station','Centara Life Namba Hotel Osaka'],
  8:['Centara Life Namba Hotel Osaka','Nankai Namba Station','Kansai International Airport Terminal 1']
};
