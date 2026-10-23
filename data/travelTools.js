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
    mk('KIX → Nankai Namba','nankai','ICOCA (Airport Express) หรือ Rapi:t ticket','Nankai ไม่รวม JR Pass; Rapi:t ต้องใช้ตั๋ว Limited Express เพิ่มจากค่าโดยสารพื้นฐาน'),
    mk('Nankai Namba → Centara','walk','เดิน / แท็กซี่','เดินฟรี หรือแท็กซี่จ่ายแยก'),
  ],
  2:[
    mk('Centara → Daikokucho','walk','เดิน','สถานีอยู่ใกล้โรงแรม'),
    mk('Daikokucho → Morinomiya (Osaka Castle)','metro','ICOCA / Osaka Metro','ค่าโดยสารขึ้นกับระยะทางและการเปลี่ยนสาย','¥190–390/เที่ยว ตามระยะทาง'),
    mk('Osaka Castle → Nippombashi (Kuromon)','metro','ICOCA / Osaka Metro','เปลี่ยนสายภายใน Metro ตามเส้นทาง'),
    mk('Nippombashi → Shinsaibashi / Namba','metro','ICOCA / Osaka Metro','เลือกเดินแทนได้บางช่วง'),
    mk('Shinsaibashi → Umeda Sky','metro','ICOCA / Osaka Metro','ขึ้น Midosuji ไป Umeda จากนั้นเดินต่อ'),
    mk('Umeda → Daikokucho','metro','ICOCA / Osaka Metro','ขากลับโรงแรม'),
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
    mk('JR Osaka → Kinosaki Onsen · Kounotori 5','jr','Kansai WIDE Pass + Reserved Seat','ยืนยันแล้ว 10:12–12:51 · Car 4 · Seats 9C, 9D'),
    mk('Kinosaki Station → Nishimuraya','shuttle','Check-in Shuttle Bus','รถรับส่งร่วมของเมือง ฟรีตามรอบที่กำหนด แจ้งชื่อเรียวกัง'),
  ],
  7:[
    mk('Nishimuraya → Kinosaki Onsen Station','shuttle','Shogetsutei Shuttle','รถรับส่งของโรงแรมตามเวลาที่ Reception ยืนยัน'),
    mk('Kinosaki Onsen → JR Osaka · Kounotori 22','jr','Kansai WIDE Pass + Reserved Seat','ยืนยันแล้ว 15:30–18:21 · Car 7 · Seats 8C, 8D'),
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
  west:{
    name:'Arashiyama + Tenryu-ji',label:'Kyoto West · ธรรมชาติ / ป่าไผ่',summary:'เช้าป่าไผ่และสวนวัดเซน บ่ายเดินเมืองเกียวโตแบบไม่เร่ง',
    schedule:[
      spot('06:15','Centara → Daikokucho → JR Osaka','Metro ต่อ JR Special Rapid ไป Kyoto และ JR Sagano Line ไป Saga-Arashiyama','Saga-Arashiyama Station Kyoto'),
      spot('08:15','Arashiyama Bamboo Grove','เดินจากสถานี 15–20 นาที เพื่อถ่ายรูปป่าไผ่ก่อนคนเยอะ','Arashiyama Bamboo Grove Kyoto'),
      spot('09:00–10:00','Tenryu-ji Temple','เดินชมสวน Sogenchi และสถาปัตยกรรมวัดเซน ค่าเข้าแยก','Tenryu-ji Temple Kyoto'),
      spot('10:15–11:45','Togetsukyo Bridge + มื้อกลางวัน','เดินชมแม่น้ำและสะพานโทเก็ตสึเคียว พักทานอาหารตามสะดวก','Togetsukyo Bridge Kyoto'),
      spot('13:15–15:00','Nishiki Market / ใจกลาง Kyoto (ตัวเลือก)','JR ไป Kyoto แล้ว Metro หรือรถบัสตามสถานการณ์ เลือกเดินสบาย ๆ','Nishiki Market Kyoto'),
      spot('15:30–17:00','Gion (ตัวเลือก) → Osaka','แวะ Gion ถ้ามีแรง มิฉะนั้นเดินทางกลับ Osaka เลย','Gion Kyoto'),
    ],
    legs:['Osaka Metro → JR Osaka (ICOCA)','JR Osaka → Kyoto → Saga-Arashiyama (JR Pass)','เดินป่าไผ่ → Tenryu-ji (เดินฟรี)','กลับ Kyoto / Gion ตามที่เลือก (JR + ICOCA)'],
    note:'เหมาะเมื่ออยากเที่ยว Arashiyama + Tenryu-ji แบบไม่รีบ ไม่จำเป็นต้องข้ามไป Fushimi Inari วันนี้',
  },
  east:{
    name:'Higashiyama + Fushimi Inari',label:'Kyoto East · วัด / ถนนเมืองเก่า',summary:'โทริอิแดง วัด Kiyomizu และย่าน Gion แบบเดินสบายกว่า',
    schedule:[
      spot('07:15','Daikokucho → Yodoyabashi → Keihan','เปลี่ยน Osaka Metro ไป Keihan ที่ Yodoyabashi แล้วไปสถานี Fushimi-Inari','Fushimi Inari Station Kyoto'),
      spot('09:00–10:20','Fushimi Inari Taisha','เดินอุโมงค์เสาโทริอิแดง ไปแต่เช้าเพื่อเลี่ยงคนเยอะ','Fushimi Inari Taisha Kyoto'),
      spot('10:45–11:45','Tofukuji (จุดเสริม)','เลือกแวะชมใบไม้เปลี่ยนสี หรือไปกินกลางวันเลยเพื่อไม่เหนื่อย','Tofukuji Temple Kyoto'),
      spot('12:00–13:00','อาหารกลางวัน / เดินทางไป Higashiyama','Keihan ไป Kiyomizu-Gojo แล้วเดิน/แท็กซี่ขึ้นเนิน','Kiyomizu Gojo Station Kyoto'),
      spot('13:00–15:30','Kiyomizu-dera + Sannenzaka / Ninenzaka','เดินเมืองเก่า เก็บภาพวัดและถนนสองข้างทาง','Kiyomizu-dera Kyoto'),
      spot('16:00–17:30','Gion → Osaka','เดินย่าน Gion ต่อ Keihan กลับ Yodoyabashi และ Osaka Metro','Gion Kyoto'),
    ],
    legs:['Daikokucho → Yodoyabashi (ICOCA Metro)','Yodoyabashi → Fushimi-Inari (ICOCA Keihan)','Fushimi-Inari → Kiyomizu-Gojo (ICOCA Keihan)','Gion-Shijo → Osaka (Keihan + Metro จ่ายแยก)'],
    note:'เหมาะเมื่ออยากเก็บ Kyoto เมืองเก่ากับวัดหลายแห่ง ใบไม้เปลี่ยนสีสวย แต่มีทางเดินขึ้นเนิน',
  }
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
