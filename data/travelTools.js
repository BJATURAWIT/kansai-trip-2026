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
    mk('Centara → Daikokucho','walk','เดิน','เดินจากโรงแรมไปสถานี Daikokucho'),
    mk('Daikokucho → Morinomiya (Osaka Castle)','metro','ICOCA / Osaka Metro','Midosuji → Chuo เปลี่ยนที่ Hommachi · ค่าโดยสารตามป้าย/แอปจริง'),
    mk('Osaka Castle → Morinomiya (N20)','walk','เดิน','เดินจากปราสาทกลับสถานี Morinomiya ราว 15–25 นาที'),
    mk('Morinomiya (N20) → Shinsaibashi (N15) → Namba (M20)','metro','ICOCA / Osaka Metro','Nagahori Tsurumi-ryokuchi → Midosuji; เปลี่ยนภายใน Shinsaibashi ไม่คิดค่าแยก'),
    mk('Namba → Tempura Makino / Tendon Tenya','walk','เดิน','เดินจาก Namba สู่ร้านหลักหรือสำรอง'),
    mk('Namba → Dotonbori → Shinsaibashi','walk','เดิน','ผ่าน Glico Sign แล้วเดินขึ้นเหนือบนถนน Shinsaibashi-suji'),
    mk('Shinsaibashi (M19) → Umeda (M16)','metro','ICOCA / Osaka Metro','ขึ้น Midosuji มุ่งเหนือ แล้วเดินไป Umeda Sky Building'),
    mk('Umeda → Daikokucho','metro','ICOCA / Osaka Metro','Midosuji กลับ Daikokucho จ่ายตามระยะจริง'),
  ],
  3:[
    mk('Osaka-Namba → Nishikujo','other','ICOCA · Hanshin','รถไฟ Hanshin ไม่ใช่ JR'),
    mk('Nishikujo → Universal-City','jr','ICOCA · JR ก่อนวันเริ่มพาส','JR Pass แผนเริ่ม 20 พ.ย. จึงยังไม่ครอบคลุมวันที่ 19'),
    mk('Universal-City → Nishikujo','jr','ICOCA · JR Yumesaki','JR Pass ยังไม่เริ่ม · ¥180/คน'),
    mk('Nishikujo → Osaka-Namba','other','ICOCA · Hanshin','Hanshin ¥220/คน'),
    mk('Osaka-Namba → Centara','walk','เดิน','เดินกลับ Centara ฟรี'),
  ],
  4:[
    mk('Daikokucho → Umeda','metro','ICOCA · Osaka Metro','ไม่รวมใน Kansai WIDE'),
    mk('JR Osaka → Kyoto → Saga-Arashiyama','jr','Kansai WIDE Pass','JR Kyoto/Sagano ครอบคลุมเมื่อรับพาสแล้ว'),
    mk('Saga-Arashiyama → Bamboo Grove → Tenryu-ji → Ozuru → Togetsukyo','walk','เดิน','ค่าเข้า Tenryu-ji ¥500/คน จ่ายแยก'),
    mk('Hankyu Arashiyama → Katsura → Kyoto-Kawaramachi','hankyu','ICOCA · Hankyu','JR Pass ไม่ครอบคลุม Hankyu'),
    mk('Hanamikoji → Yasaka → Kodaiji → Gion-Shijo','walk','เดิน','Kodaiji ¥800/คน จ่ายแยก'),
    mk('Gion-Shijo → Yodoyabashi','keihan','ICOCA · Keihan','JR Pass ไม่ครอบคลุม Keihan'),
    mk('Yodoyabashi → Daikokucho','metro','ICOCA · Osaka Metro','จ่ายแยกจาก Keihan'),
  ],
  5:[
    mk('Daikokucho → Namba','metro','ICOCA · Osaka Metro','ค่าโดยสาร Metro จ่ายแยก'),
    mk('Osaka-Namba → Kintetsu-Nara','kintetsu','ICOCA · Kintetsu','เลือก Kintetsu เพราะใกล้ Nara Park กว่า JR Nara'),
    mk('Nara Park → Todai-ji → Kasuga Taisha','walk','เดิน','ค่าเข้าวัด/สวนจ่ายแยก'),
    mk('Kintetsu-Nara → Osaka-Namba','kintetsu','ICOCA · Kintetsu','JR Pass ไม่ครอบคลุม Kintetsu'),
    mk('Namba → Daikokucho','metro','ICOCA · Osaka Metro','กลับโรงแรมด้วย Midosuji Line ¥190/คน'),
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
 west:{name:'Kyoto West + Gion Night',label:'Kyoto West → Gion · Main Plan',summary:'Arashiyama ตอนเช้า → Gion บ่าย → Kodaiji Night Illumination 17:00 → กลับ Osaka ประมาณ 21:00',
 schedule:[
 spot('06:30–08:20','Centara → Saga-Arashiyama','Daikokucho M21 → Umeda M16 → JR Osaka → Kyoto → Saga-Arashiyama; JR Pass ครอบคลุมเฉพาะ JR','Saga-Arashiyama Station Kyoto'),
 spot('08:20–09:05','Arashiyama Bamboo Grove','เดินชมป่าไผ่ยามเช้า เข้าฟรี','Arashiyama Bamboo Grove Kyoto'),
 spot('09:10–10:10','Tenryu-ji Temple & Garden','สวนญี่ปุ่น ¥500/คน ตรวจทางเข้าฝั่งเหนือและเวลาเปิด','Tenryu-ji Temple Kyoto'),
 spot('10:10–10:50','Arashiyama Main Street / Shopping','ของฝากและขนมท้องถิ่น แวะเฉพาะคิวสั้น','Arashiyama Main Street Kyoto'),
 spot('10:50–11:50','Lunch — Ozuru Udon','อุด้ง/เทมปุระ งบ ¥1,000–1,800/คน คิวเกิน 15 นาทีเปลี่ยนร้านสำรอง','Arashiyama Udon Ozuru Kyoto'),
 spot('11:50–12:40','Togetsukyo Bridge','เดินชมวิวภูเขาและสะพาน','Togetsukyo Bridge Kyoto'),
 spot('12:40–13:20','Riverside Walk / Café','เดินข้ามสะพานฝั่งใต้ไป Hankyu Arashiyama HK98','Arashiyama Nakanoshima Park Kyoto'),
 spot('13:20–14:15','Arashiyama → Kyoto-Kawaramachi','Hankyu HK98 → Katsura HK81 เปลี่ยน Kyoto Line → Kawaramachi HK86 (จ่าย ICOCA)','Kyoto-Kawaramachi Station Kyoto'),
 spot('14:15–15:10','Hanamikoji Street / Gion','ชมถนนเกียวโตดั้งเดิม เคารพพื้นที่ห้ามถ่ายภาพ','Hanamikoji Street Gion Kyoto'),
 spot('15:10–15:45','Yasaka Shrine','ศาลเจ้ายาซากะ เข้าฟรี','Yasaka Shrine Kyoto'),
 spot('15:45–16:40','Maruyama Park → Nene-no-Michi','เดินผ่านสวนและถนนหินเก่า','Nene no Michi Kyoto'),
 spot('16:40–17:00','Kodaiji Entrance / Queue','เผื่อคิวงานใบไม้แดง','Kodaiji Temple Kyoto'),
 spot('17:00–18:15','Kodaiji Night Illumination','งานเปิดไฟฤดูใบไม้แดง 17:00 · ค่าเข้า ¥800/คนโดยประมาณ','Kodaiji Temple Kyoto'),
 spot('18:15–19:30','Dinner — Gion / Kawaramachi','เลือกอาหารญี่ปุ่นง่าย ๆ งบ ¥800–1,800/คน และร้านสำรองใกล้สถานี','Gion Shijo Kyoto'),
 spot('19:30–21:00','Gion-Shijo → Centara Osaka','Keihan KH39 → Yodoyabashi KH01 → Metro M17 → Daikokucho M21 แล้วเดินกลับโรงแรม','Centara Life Namba Hotel Osaka')
 ],note:'Day 4 รวม Kyoto West ตอนเช้า และ Gion/Kodaiji ตอนค่ำ · กลับโรงแรมราว 21:00; East-only เป็นแผนสำรองแยก'},
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
  2:['Osaka Castle','Tempura Makino Namba Sennichimae','Dotonbori Glico Sign','Shinsaibashi','Umeda Sky Building'],
  3:['Universal Studios Japan','Hollywood Dream The Ride Universal Studios Japan','Universal Studios Japan JAWS','Super Nintendo World Osaka','Wizarding World Harry Potter Osaka'],
  4:['Osaka Station','Arashiyama Bamboo Grove Kyoto','Tenryu-ji Temple Kyoto','Togetsukyo Bridge Kyoto','Hanamikoji Street Kyoto','Yasaka Shrine Kyoto','Kodaiji Temple Kyoto'],
  5:['Osaka Namba Station','Nara Park','Todai-ji Nara','Kasuga Taisha Nara'],
  6:['Centara Life Namba Hotel Osaka','Osaka Station','Kinosaki Onsen Station','Nishimuraya Hotel Shogetsutei'],
  7:['Nishimuraya Hotel Shogetsutei','Kinosaki Onsen Station','Osaka Station','Centara Life Namba Hotel Osaka'],
  8:['Centara Life Namba Hotel Osaka','Nankai Namba Station','Kansai International Airport Terminal 1']
};
