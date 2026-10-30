import {travelBookings,flightNumberLabel,localClock} from './centralTravel.js';
// Planning routes, not live transit data. Station platforms and train schedules must be checked on the travel date.
export const hotelAddress = 'Centara Life Namba Hotel Osaka, 3-4-21 Shikitsuhigashi, Naniwa Ward, Osaka';
const jrOsaka = 'Osaka Station, Osaka Japan';
const kinosaki = 'Kinosaki Onsen Station, Hyogo Japan';
const centara = hotelAddress;

export const travelGuide = [
  {
    day: 1, kicker: 'สนามบิน → โรงแรม', leave: 'KIX ถึง 18:15 น. (JST) · ผ่าน ตม./รับกระเป๋าแล้วค่อยเดินไปสถานี Nankai', confirmed: false,
    overview: 'Rapi:t Super Seat (ซื้อแล้ว · รอเลือกขบวน/ที่นั่ง) → Nankai Namba → โรงแรม',
    reminder: 'Nankai Rapi:t Super Seat ชำระแล้ว ¥3,180 / 2 คน · รวมค่าโดยสารและค่ารถด่วน · ต้องเลือกขบวนและที่นั่งในมือถือหลังผ่าน ตม. ก่อนรถออกอย่างน้อย 5 นาที',
    legs: [
      { from: 'Kansai International Airport (KIX)', to: 'Nankai Namba Station, Osaka', mode: 'Nankai Rapi:t · Super Seat', line: 'Kansai-airport → Nankai Namba · เลือกขบวนหลัง ตม.', how: 'หลัง ตม./รับกระเป๋า/ศุลกากร เปิด Nankai Digital Ticket → Purchased Ticket / Wallet → เลือกวัน ขบวน และ Super Seat ทั้ง 2 คนให้ตรงกัน ก่อนรถออก ≥5 นาที; เปิด QR สดบนโทรศัพท์เพื่อผ่านประตู Nankai Digital Ticket (อีเมลยืนยันไม่ใช่ตั๋ว) แล้วขึ้นตู้ที่จอง · ไม่ต้องซื้อค่าโดยสารซ้ำ', duration: 'ตามขบวน Rapi:t ที่เลือกจริง (ยังไม่กำหนด)', pay: 'ชำระแล้ว ¥3,180 สำหรับ 2 คน · รวมค่าโดยสารปกติ + Limited Express', icon: 'train' },
      { from: 'Nankai Namba Station, Osaka', to: centara, mode: 'เดิน / แท็กซี่', line: 'ไป Centara Life Namba', how: 'ลง Nankai Namba (ไม่ใช่ JR Namba หรือ Osaka-Namba) เปิด Google Maps เดินไป Centara Life Namba ย่าน Shikitsuhigashi ถ้ากระเป๋าใหญ่ให้ใช้แท็กซี่จากจุดรับรถใกล้สถานี', duration: 'ระยะเดินขึ้นอยู่กับทางออก', pay: 'เดินฟรี', icon: 'walk' },
    ],
  },
  {
    day: 2, kicker: 'เที่ยว Osaka Castle → Namba', leave: 'ออกจากโรงแรมให้ถึง Osaka Castle 09:00 น.', confirmed: false,
    overview: 'Osaka Castle → Tempura Makino Namba → Dotonbori → Shinsaibashi → Umeda Sky Building',
    reminder: 'ใช้ ICOCA สำหรับ Osaka Metro · วันพุธ 18 พ.ย. · เที่ยงที่ Makino ถ้าคิวเกิน 15 นาทีเปลี่ยน Tenya · STARDUST จองร้านยืนยันแล้ว',
    legs: [
      {from:'Centara Life Namba Hotel Osaka',to:'Morinomiya Station, Osaka',mode:'Osaka Metro',line:'Daikokucho (M21) → Hommachi (M18/C16) → Morinomiya (C19)',how:'Midosuji ขึ้นเหนือ เปลี่ยน Chuo ที่ Hommachi แล้วลง Morinomiya; เดินผ่าน Osaka Castle Park',duration:'ประมาณ 20–25 นาทีบน Metro + เดินไปปราสาท',pay:'ICOCA',icon:'train'},
      {from:'Osaka Castle Main Tower, Osaka',to:'Morinomiya Station (N20)',mode:'เดิน',line:'Osaka Castle → Morinomiya (N20)',how:'เดินกลับจากปราสาทเพื่อขึ้น Nagahori Tsurumi-ryokuchi Line',duration:'15–25 นาที',pay:'ฟรี',icon:'walk'},
      {from:'Morinomiya Station (N20)',to:'Namba Station (M20)',mode:'Osaka Metro',line:'Morinomiya (N20) → Shinsaibashi (N15) → Namba (M20)',how:'ขึ้น Nagahori Tsurumi-ryokuchi มุ่ง Taisho เปลี่ยน Midosuji มุ่งใต้ที่ Shinsaibashi (M19) และลง Namba',duration:'ประมาณ 15–25 นาทีรวมเปลี่ยน',pay:'ICOCA',icon:'train'},
      {from:'Namba Station (M20)',to:'Tempura Makino Namba Sennichimae',mode:'เดิน',line:'Namba → Tempura Makino Namba',how:'เดินไป Namba 3-3-4; Tenya Namba 3-1-33 เป็นร้านสำรอง',duration:'3–7 นาที',pay:'ฟรี',icon:'walk'},
      {from:'Tempura Makino Namba Sennichimae',to:'Dotonbori Glico Sign',mode:'เดิน',line:'Makino → Dotonbori Glico',how:'เดินขึ้นเหนือผ่าน Dotonbori ไป Ebisubashi',duration:'10–15 นาที',pay:'ฟรี',icon:'walk'},
      {from:'Dotonbori Glico Sign',to:'Shinsaibashi-suji Shopping Street',mode:'เดิน',line:'Glico → Shinsaibashi',how:'เดินขึ้นเหนือบน Shinsaibashi-suji',duration:'5–15 นาที',pay:'ฟรี',icon:'walk'},
      {from:'Shinsaibashi Station (M19)',to:'Umeda Station (M16)',mode:'Osaka Metro',line:'Shinsaibashi (M19) → Umeda (M16)',how:'Midosuji Line มุ่ง Shin-Osaka ลง Umeda แล้วเดินไป Umeda Sky Building',duration:'10–15 นาทีบนรถ + เดิน 12–20 นาที',pay:'ICOCA',icon:'train'},
    ],
  },
  {
    day: 3, kicker: 'ไป Universal Studios Japan', leave: 'แนะนำออกก่อนเวลาเปิดสวนสนุก', confirmed: false,
    overview: 'Osaka-Namba → Nishikujo → Universal City → เดินเข้า USJ',
    reminder: 'ซื้อตั๋ว Studio + Express แล้ว • เวลา Nintendo '+travelBookings.usj.nintendoEntry+' / Harry Potter '+travelBookings.usj.harryPotterEntry+' ตามที่แจ้ง • ให้ยึด QR เป็นหลัก',
    legs: [
      { from: centara, to: 'Osaka-Namba Station, Osaka', mode: 'เดิน / Metro', line: 'ไปสถานี Osaka-Namba', how: 'จากโรงแรมเดินไป Osaka-Namba หรือใช้ Osaka Metro ผ่าน Namba ตามความสะดวก', duration: 'เผื่อประมาณ 20–30 นาที', pay: 'ICOCA ถ้าขึ้นรถ', icon: 'walk' },
      { from: 'Osaka-Namba Station, Osaka', to: 'Nishikujo Station, Osaka', mode: 'Hanshin Railway', line: 'Hanshin Namba Line', how: 'ขึ้นขบวนฝั่ง Nishikujo / Amagasaki ตรวจป้ายปลายทาง', duration: 'ประมาณ 10–15 นาที', pay: 'ICOCA', icon: 'train' },
      { from: 'Nishikujo Station, Osaka', to: 'Universal-City Station, Osaka', mode: 'JR Yumesaki Line', line: 'รถไฟไป Sakurajima', how: 'เปลี่ยนขึ้น JR Sakurajima/Yumesaki Line ลง Universal-City (ระวังไม่ลง Sakurajima)', duration: 'ประมาณ 5 นาที', pay: 'ICOCA', icon: 'train' },
      { from: 'Universal-City Station, Osaka', to: 'Universal Studios Japan, Osaka', mode: 'เดิน', line: 'Universal CityWalk → Gate', how: 'เดินตามทาง Universal CityWalk ไปหน้าประตู USJ', duration: 'ประมาณ 5–10 นาที', pay: 'ฟรี', icon: 'walk' },
    ],
  },
  {
    day: 4, kicker: 'Arashiyama → Kyoto East', leave: 'แนะนำออกจากโรงแรมราว 06:15 น. เพื่อไปป่าไผ่ช่วงเช้า (เวลาแผน)', confirmed: false,
    overview: 'Daikokucho → JR Osaka → Kyoto → Saga-Arashiyama → Bamboo Grove → Tenryu-ji → Fushimi Inari → Kiyomizu-dera → Gion → Osaka',
    reminder: 'วันเที่ยวเดินมาก • JR Pass ที่เลือกครอบคลุมรถ JR ตามเงื่อนไข แต่ Metro / Keihan / รถบัสจ่ายแยก • ตรวจเวลาเที่ยวจริง',
    legs: [
      { from: centara, to: jrOsaka, mode: 'Osaka Metro', line: 'Daikokucho → Umeda → JR Osaka', how: 'ใช้ Midosuji Line จาก Daikokucho ไป Umeda เดินตามป้าย JR Osaka ซึ่งอยู่คนละระบบกัน', duration: 'ประมาณ 30–40 นาที', pay: 'ICOCA / Metro', icon: 'train' },
      { from: jrOsaka, to: 'Saga-Arashiyama Station, Kyoto', mode: 'JR Kyoto + JR Sagano Line', line: 'JR Osaka → Kyoto → Saga-Arashiyama', how: 'ขึ้น JR Special Rapid จาก Osaka ไป Kyoto แล้วเปลี่ยนขบวน Sagano Line (San-in Line) ไปลง Saga-Arashiyama ดูหมายเลขชานชาลาตามจอจริง', duration: 'เผื่อ 60–80 นาทีรวมเปลี่ยนรถ', pay: 'JR Pass เมื่อเปิดใช้แล้ว', icon: 'train' },
      { from: 'Saga-Arashiyama Station, Kyoto', to: 'Arashiyama Bamboo Grove, Kyoto', mode: 'เดิน', line: 'สถานี → ป่าไผ่อาราชิยามะ', how: 'เดินตาม Google Maps ราว 15–20 นาที เข้าอุโมงค์ป่าไผ่ช่วงเช้าก่อนคนหนาแน่น', duration: '15–20 นาที', pay: 'ฟรี', icon: 'walk' },
      { from: 'Arashiyama Bamboo Grove, Kyoto', to: 'Tenryu-ji Temple, Kyoto', mode: 'เดิน', line: 'ป่าไผ่ → วัด Tenryu-ji', how: 'ทางเข้าสวนวัดอยู่ใกล้ป่าไผ่ เดินไปไม่ไกล ตรวจเวลาเปิดและค่าเข้าหน้างาน', duration: 'ประมาณ 5–10 นาที', pay: 'ค่าเข้าวัดแยก', icon: 'walk' },
      { from: 'Tenryu-ji Temple, Kyoto', to: 'Fushimi Inari Taisha, Kyoto', mode: 'เดิน + JR', line: 'Saga-Arashiyama → Kyoto → Inari', how: 'เดินกลับสถานี Saga-Arashiyama ขึ้น Sagano Line ไป Kyoto แล้วเปลี่ยน JR Nara Line ขบวน Local ลง Inari', duration: 'เผื่อ 60–80 นาทีรวมเดิน', pay: 'JR Pass เมื่อเปิดใช้แล้ว', icon: 'train' },
      { from: 'Fushimi Inari Taisha, Kyoto', to: 'Kiyomizu-dera, Kyoto', mode: 'Keihan + เดิน', line: 'Fushimi-Inari → Kiyomizu-Gojo', how: 'เดินไป Keihan Fushimi-Inari ขึ้นรถขึ้นเหนือไป Kiyomizu-Gojo แล้วเดินขึ้นเนิน/แท็กซี่ไป Kiyomizu-dera', duration: 'ประมาณ 45–65 นาที', pay: 'ICOCA / Keihan ไม่รวม JR Pass', icon: 'train' },
      { from: 'Kiyomizu-dera, Kyoto', to: 'Gion, Kyoto', mode: 'เดิน', line: 'Kiyomizu → Sannenzaka / Ninenzaka → Gion', how: 'เดินลงตามเส้นถนนเมืองเก่าผ่าน Sannenzaka/Ninenzaka ไป Gion เผื่อเวลาถ่ายรูปและคนเยอะ', duration: 'ประมาณ 30–45 นาที ไม่รวมเที่ยว', pay: 'ฟรี', icon: 'walk' },
      { from: 'Gion, Kyoto', to: centara, mode: 'Keihan + Osaka Metro', line: 'Gion-Shijo → Yodoyabashi → Daikokucho', how: 'เดินไป Keihan Gion-Shijo ขึ้นรถมุ่ง Osaka ไป Yodoyabashi ต่อ Osaka Metro กลับ Daikokucho', duration: 'เผื่อ 80–100 นาที', pay: 'ICOCA / Keihan + Metro', icon: 'train' },
    ],
  },
  {
    day: 5, kicker: 'Nara Day Trip (ตัวเลือก)', leave: 'แผนออก ~08:30', confirmed: false,
    overview: 'Namba / JR Namba → Nara Park → Todai-ji → กลับโรงแรม',
    reminder: 'วันนี้เป็นวันยืดหยุ่น หากเหนื่อยเปลี่ยนเป็น Osaka free day ได้ • ขาไป Nara เลือก JR เพื่อใช้ Pass',
    legs: [
      { from: centara, to: 'JR Namba Station, Osaka', mode: 'เดิน / Metro', line: 'ไป JR Namba (ต่างจาก Nankai Namba)', how: 'ใช้แผนที่เลือกทางไป JR Namba หากเดินไกลอาจขึ้น Metro หรือเริ่มจาก JR Imamiya แทน', duration: 'เผื่อเวลาเดินทางไปสถานี', pay: 'ขึ้นกับเส้นทาง', icon: 'walk' },
      { from: 'JR Namba Station, Osaka', to: 'JR Nara Station, Nara Japan', mode: 'JR Yamatoji Line', line: 'มุ่งหน้า JR Nara (อาจเปลี่ยนขบวนที่ Imamiya)', how: 'ตรวจเที่ยว JR ที่ไป Nara อาจต้องเปลี่ยนขบวนที่ Imamiya หรือ Tennoji', duration: 'เผื่อประมาณ 60–75 นาที', pay: 'JR Pass', icon: 'train' },
      { from: 'JR Nara Station, Nara Japan', to: 'Nara Park, Nara', mode: 'เดิน / Bus', line: 'ผ่านย่านเมืองเก่า', how: 'จาก JR Nara เดินเข้า Nara Park หรือขึ้นรถบัสท้องถิ่น; ต่อไป Todai-ji ได้', duration: 'เดินราว 25–35 นาที', pay: 'เดินฟรี / รถบัสจ่ายแยก', icon: 'walk' },
      { from: 'Todai-ji, Nara', to: centara, mode: 'JR + Metro / เดิน', line: 'กลับ Osaka เตรียมกระเป๋า', how: 'กลับ JR Nara ไป JR Namba/Osaka แล้วกลับโรงแรม จัดกระเป๋าสำหรับค้าง Kinosaki 1 คืน', duration: 'เผื่อ 1–1.5 ชม.', pay: 'JR Pass + ICOCA ตามเส้นทาง', icon: 'train' },
    ],
  },
  {
    day: 6, kicker: 'วันสำคัญ · Kinosaki', leave: '08:15 ออกจากโรงแรม (แผน)', confirmed: false,
    overview: 'Centara → Daikokucho → JR Osaka → Kounotori 5 → Kinosaki Onsen → Shuttle → Ryokan',
    reminder: 'Kounotori 5 จองแล้ว · Osaka 10:12 → Kinosaki 12:51 · Car 4 Seats 9C/9D · รับพาสและตั๋ว Reserved Seat ก่อนขึ้นรถ',
    legs: [
      { from: centara, to: 'Daikokucho Station, Osaka', mode: 'เดิน', line: 'ออกจาก Centara ~08:15', how: 'ฝากกระเป๋าใหญ่กับ Centara ก่อนออก หากโรงแรมยืนยันรับฝากข้ามคืน แล้วนำกระเป๋าใบเล็กติดตัว', duration: 'ประมาณ 5–10 นาที', pay: 'ฟรี', icon: 'walk' },
      { from: 'Daikokucho Station, Osaka', to: jrOsaka, mode: 'Osaka Metro', line: 'Daikokucho → Umeda → JR Osaka', how: 'ขึ้น Midosuji ไป Umeda แล้วเดินตามป้าย JR Osaka; เผื่อเวลาสถานีใหญ่และหาชานชาลา', duration: 'เผื่อ 35–45 นาทีรวมเดิน', pay: 'ICOCA (Metro ไม่รวมใน JR Pass)', icon: 'train' },
      { from: jrOsaka, to: kinosaki, mode: 'JR Limited Express', line: travelBookings.kounotori.outward.train+' · '+travelBookings.kounotori.outward.depart+' → '+travelBookings.kounotori.outward.arrive, how: 'จองที่นั่งแล้ว · Ordinary Non-smoking Car 4 · Seats 9C และ 9D · ตรวจชานชาลาจากจอสถานีวันจริง', duration: '2 ชม. 39 นาที', pay: 'JR Kansai WIDE Pass + Reserved Seat', icon: 'train', fixed: true },
      { from: kinosaki, to: 'Nishimuraya Hotel Shogetsutei, Kinosaki', mode: 'ฟรี Shuttle', line: 'Check-in Shuttle Bus', how: 'ออกมาหน้าสถานี แจ้งเจ้าหน้าที่ว่าพัก Nishimuraya Hotel Shogetsutei มีรถรับส่งของสมาคมเรียวกังตั้งแต่ 12:51–18:00 ตามเงื่อนไข', duration: 'รอรถตามรอบ', pay: 'ฟรี (ตามเงื่อนไข)', icon: 'bus' },
    ],
  },
  {
    day: 7, kicker: 'Kinosaki → Osaka · Kounotori 22', leave: 'จองรถ Kounotori 22 ออก 15:30; ควรถึงสถานีราว 15:00 (ยืนยันรอบ Shuttle กับโรงแรม)', confirmed: true,
    overview: 'Breakfast → Ryokan shuttle → Kinosaki Station → JR Limited Express → Osaka → Centara',
    reminder: 'Reserved Seat ยืนยันแล้ว · Kounotori 22 15:30–18:21 · Car 7 Seats 8C/8D · ตรวจ Shuttle และเผื่อคนเยอะวันหยุด',
    legs: [
      { from: 'Nishimuraya Hotel Shogetsutei, Kinosaki', to: kinosaki, mode: 'Shuttle', line: 'Shuttle ไปสถานีให้ทัน 15:30', how: 'แจ้งเจ้าหน้าที่รับรอบ Shuttle ไปสถานีล่วงหน้า รถมีตามรอบและอาจไม่วิ่งถ้าไม่มีผู้โดยสาร', duration: 'ขึ้นกับรอบรถ', pay: 'สอบถามโรงแรม', icon: 'bus' },
      { from: kinosaki, to: jrOsaka, mode: 'JR Limited Express', line: travelBookings.kounotori.return.train+' · '+travelBookings.kounotori.return.depart+' → '+travelBookings.kounotori.return.arrive, how: 'Reserved Seat จองแล้ว · Ordinary Non-smoking Car 7 Seats 8C และ 8D · ควรมาถึงสถานีก่อนเวลาออก 20–30 นาที', duration: '2 ชม. 51 นาที', pay: 'JR Kansai WIDE Pass + Reserved Seat (เมื่อรับบัตรแล้ว)', icon: 'train' },
      { from: jrOsaka, to: centara, mode: 'Osaka Metro', line: 'Umeda → Daikokucho → โรงแรม', how: 'ลง JR Osaka เดินไป Metro Umeda นั่ง Midosuji ลง Daikokucho แล้วเดินกลับ Centara เพื่อเช็กอินคืนสุดท้าย', duration: 'เผื่อ 35–45 นาที', pay: 'ICOCA', icon: 'train' },
    ],
  },
  {
    day: 8, kicker: 'กลับประเทศไทย', leave: 'เที่ยวบิน 19:45 น. · ตั้งเป้าถึง KIX T1 ประมาณ 16:45 น. และออกจากโรงแรมราว 15:00 น. (เวลาแนะนำ)', confirmed: false,
    overview: 'Centara → Nankai Namba → KIX → '+flightNumberLabel(travelBookings.flights.inbound)+' '+localClock(travelBookings.flights.inbound.departure)+' → DMK '+localClock(travelBookings.flights.inbound.arrival)+' (25 พ.ย.)',
    reminder: 'เที่ยวบิน '+flightNumberLabel(travelBookings.flights.inbound)+' '+localClock(travelBookings.flights.inbound.departure)+' น. (JST) • เป้าหมายถึงสนามบิน 16:45 น. • ถึงประเทศไทย '+localClock(travelBookings.flights.inbound.arrival)+' ของวันที่ 25 พ.ย. • เวลารถไฟเป็นแผน ไม่ใช่ตั๋วที่จองแล้ว',
    legs: [
      { from: centara, to: 'Nankai Namba Station, Osaka', mode: 'เดิน / แท็กซี่', line: 'Check-out → Nankai Namba', how: 'รับสัมภาระครบก่อนออก เดินไป Nankai Namba (ไม่ใช่ JR Namba) หรือเลือกแท็กซี่หากกระเป๋าหนัก', duration: 'เผื่อ 20–30 นาที', pay: 'เดินฟรี / แท็กซี่แยก', icon: 'walk' },
      { from: 'Nankai Namba Station, Osaka', to: 'Kansai International Airport (KIX)', mode: 'Nankai Railway', line: 'Airport Express / Rapi:t', how: 'ตามป้าย Nankai Railway (ไม่ใช่ JR Namba หรือ Osaka-Namba) แตะ ICOCA เพื่อใช้ Airport Express ไป Kansai-airport หรือซื้อตั๋ว Rapi:t แบบมีที่นั่ง ลงสุดสายและตามป้าย Terminal 1 Departures', duration: 'ประมาณ 40–50 นาที', pay: 'จ่ายแยก (Nankai ไม่รวม JR Pass)', icon: 'train' },
      { from: 'Kansai International Airport (KIX)', to: 'Don Mueang International Airport, Bangkok', mode: 'เที่ยวบิน', line: flightNumberLabel(travelBookings.flights.inbound)+' · '+localClock(travelBookings.flights.inbound.departure)+' → '+localClock(travelBookings.flights.inbound.arrival)+' (25 พ.ย.)', how: 'เข้า KIX Terminal 1 Departures แล้วดูจอเที่ยวบิน รอยืนยันหมายเลขเที่ยวบิน หาหมายเลขเคาน์เตอร์ Thai AirAsia X โหลดกระเป๋าได้คนละ 20 กก. ผ่าน Security และ Immigration ตรวจ Gate และเวลา Boarding บนจออีกครั้ง ถึง DMK Terminal 1 เวลา 00:15 วันที่ 25 พ.ย.', duration: 'ยึดตามเอกสารสายการบิน', pay: 'จองแล้ว', icon: 'plane', fixed: true },
    ],
  },
];

// Locations used in the itinerary are display labels, not always valid Google Maps queries.
// Map URLs must use unambiguous real-world place names and the country, never line codes,
// variants such as "Station (M19)", or vague names without a city.
const MAP_PLACE_ALIASES = Object.freeze({
  'Shinsaibashi Station (M19)':'Shinsaibashi Station, Chuo Ward, Osaka, Japan',
  'Shinsaibashi Station':'Shinsaibashi Station, Chuo Ward, Osaka, Japan',
  'Umeda Sky Building':'Umeda Sky Building, 1 Chome-1-88 Oyodonaka, Kita Ward, Osaka, Japan',
  'Sky Lounge STARDUST 39F':'Sky Lounge Stardust, Umeda Sky Building 39F, Osaka, Japan',
  'Sky Lounge STARDUST Osaka':'Sky Lounge Stardust, Umeda Sky Building 39F, Osaka, Japan',
  'Centara Life Namba Hotel Osaka':'Centara Life Namba Hotel Osaka, 3 Chome-4-21 Shikitsuhigashi, Naniwa Ward, Osaka, Japan',
  'Daikokucho Station (M21 / Y16)':'Daikokucho Station, Naniwa Ward, Osaka, Japan',
  'Daikokucho Station (M21)':'Daikokucho Station, Naniwa Ward, Osaka, Japan',
  'Daikokucho Station':'Daikokucho Station, Naniwa Ward, Osaka, Japan',
  'Morinomiya Station (N20)':'Morinomiya Station, Chuo Ward, Osaka, Japan',
  'Tempura Makino Namba Sennichimae':'Tempura Makino Namba Sennichimae, 3 Chome-3-4 Namba, Chuo Ward, Osaka, Japan',
  'Tempura Makino Namba Sennichimae Osaka':'Tempura Makino Namba Sennichimae, 3 Chome-3-4 Namba, Chuo Ward, Osaka, Japan',
  'Tendon Tenya Namba Sennichimae':'Tendon Tenya Namba Sennichimae, 3 Chome-1-33 Namba, Chuo Ward, Osaka, Japan',
  'Tendon Tenya Namba Sennichimae Osaka':'Tendon Tenya Namba Sennichimae, 3 Chome-1-33 Namba, Chuo Ward, Osaka, Japan',
  'Namba Station (M20)':'Osaka Metro Namba Station, Chuo Ward, Osaka, Japan',
  'Dotonbori Glico Sign':'Glico Running Man Sign, Ebisubashi, Dotonbori, Chuo Ward, Osaka, Japan',
  'Dotonbori Glico Sign Osaka':'Glico Running Man Sign, Ebisubashi, Dotonbori, Chuo Ward, Osaka, Japan',
  'Shinsaibashi-suji Shopping Street':'Shinsaibashi-suji Shopping Street, Chuo Ward, Osaka, Japan',
  'Shinsaibashi-suji Shopping Street Osaka':'Shinsaibashi-suji Shopping Street, Chuo Ward, Osaka, Japan',
  'Morinomiya Station (C19)':'Morinomiya Station, Chuo Ward, Osaka, Japan',
  'Morinomiya Station':'Morinomiya Station, Chuo Ward, Osaka, Japan',
  'Osaka Castle Main Tower':'Osaka Castle Main Tower, Chuo Ward, Osaka, Japan',
  'Osaka Castle Park':'Osaka Castle Park, Chuo Ward, Osaka, Japan',
  'Nippombashi Station (K17)':'Nippombashi Station, Chuo Ward, Osaka, Japan',
  'Nippombashi Station':'Nippombashi Station, Chuo Ward, Osaka, Japan',
  'Namba (M20)':'Osaka Metro Namba Station, Chuo Ward, Osaka, Japan',
  'Namba Station (M20)':'Osaka Metro Namba Station, Chuo Ward, Osaka, Japan',
  'Umeda (M16)':'Osaka Metro Umeda Station, Kita Ward, Osaka, Japan',
  'Umeda Station (M16)':'Osaka Metro Umeda Station, Kita Ward, Osaka, Japan',
  'JR Osaka Station':'Osaka Station (JR), Kita Ward, Osaka, Japan',
  'Osaka-Namba Station':'Osaka-Namba Station (Hanshin/Kintetsu), Chuo Ward, Osaka, Japan',
  'Osaka-Namba Station (Hanshin / Kintetsu)':'Osaka-Namba Station (Hanshin/Kintetsu), Chuo Ward, Osaka, Japan',
  'Osaka-Namba Station (Kintetsu)':'Osaka-Namba Station (Kintetsu/Hanshin), Chuo Ward, Osaka, Japan',
  'Nankai Namba Station':'Nankai Namba Station, Naniwa Ward, Osaka, Japan',
  'JR Namba Station':'JR Namba Station, Naniwa Ward, Osaka, Japan',
  'Nishikujo Station':'Nishikujo Station, Konohana Ward, Osaka, Japan',
  'Nishikujo Station (JR)':'JR Nishikujo Station, Konohana Ward, Osaka, Japan',
  'Nishikujo Station (Hanshin)':'Hanshin Nishikujo Station, Konohana Ward, Osaka, Japan',
  'Universal-City Station':'Universal-City Station, Konohana Ward, Osaka, Japan',
  'Universal Studios Japan Main Area':'Universal Studios Japan, Konohana Ward, Osaka, Japan',
  'Universal Studios Japan':'Universal Studios Japan, Konohana Ward, Osaka, Japan',
  'Super Nintendo World':'Super Nintendo World, Universal Studios Japan, Osaka, Japan',
  'The Wizarding World of Harry Potter':'The Wizarding World of Harry Potter, Universal Studios Japan, Osaka, Japan',
  'JR Kyoto Station':'Kyoto Station, Shimogyo Ward, Kyoto, Japan',
  'JR Saga-Arashiyama Station':'Saga-Arashiyama Station, Ukyo Ward, Kyoto, Japan',
  'Saga-Arashiyama Station':'Saga-Arashiyama Station, Ukyo Ward, Kyoto, Japan',
  'Saganoya near Saga-Arashiyama':'Saganoya restaurant, Saga-Arashiyama, Kyoto, Japan',
  'Ozuru Udon Arashiyama':'Arashiyama Udon Ozuru, Ukyo Ward, Kyoto, Japan',
  'Nishiki Market':'Nishiki Market, Nakagyo Ward, Kyoto, Japan',
  'Gion Izuju Sushi':'Izuju Sushi, Gion, Higashiyama Ward, Kyoto, Japan',
  'Saryo Tsujiri Gion':'Saryo Tsujiri Gion Honten, Kyoto, Japan',
  'Keihan Fushimi-Inari':'Fushimi-Inari Station, Keihan Railway, Kyoto, Japan',
  'Keihan Fushimi-Inari Station':'Fushimi-Inari Station, Keihan Railway, Kyoto, Japan',
  'Fushimi-Inari (Keihan)':'Fushimi-Inari Station, Keihan Railway, Kyoto, Japan',
  'Keihan Yodoyabashi':'Keihan Yodoyabashi Station, Chuo Ward, Osaka, Japan',
  'Keihan Gion-Shijo':'Gion-Shijo Station, Keihan Railway, Kyoto, Japan',
  'Keihan Gion-Shijo Station':'Gion-Shijo Station, Keihan Railway, Kyoto, Japan',
  'Osaka Metro Yodoyabashi Station':'Yodoyabashi Station (Osaka Metro), Osaka, Japan',
  'Tofuku-ji Temple':'Tofuku-ji Temple, Higashiyama Ward, Kyoto, Japan',
  'Kiyomizu-dera':'Kiyomizu-dera Temple, Higashiyama Ward, Kyoto, Japan',
  'JR Tennoji Station':'Tennoji Station (JR), Tennoji Ward, Osaka, Japan',
  'Nara Park / Kintetsu-Nara Area':'Nara Park, Nara, Japan',
  'Kintetsu-Nara Station':'Kintetsu Nara Station, Nara, Japan',
  'Nippombashi / Yayoiken':'Yayoiken Nipponbashi, Osaka, Japan',
  'Namba Dining Area / Kura Sushi':'Kura Sushi Namba Parks South, Osaka, Japan',
  'Namba Dining Area':'Namba Parks South, Osaka, Japan',
  'Namba CITY / Shirokitsune':'Shirokitsune Namba CITY, Osaka, Japan',
  'Namba CITY / Centara':'Namba City, Naniwa Ward, Osaka, Japan',
  'Namba Parks':'Namba Parks, Naniwa Ward, Osaka, Japan',
  'Namba City':'Namba CITY, Naniwa Ward, Osaka, Japan',
  'Dotonbori / Shinsaibashi':'Dotonbori, Chuo Ward, Osaka, Japan',
  'Kuromon Market':'Kuromon Ichiba Market, Chuo Ward, Osaka, Japan',
  'Kuromon Ichiba Market':'Kuromon Ichiba Market, Chuo Ward, Osaka, Japan',
  'Tenjimbashisuji 6-chome (K11)':'Tenjimbashisuji 6-chome Station, Kita Ward, Osaka, Japan',
  'Kansai-airport Station (Nankai)':'Nankai Kansai-airport Station, Kansai International Airport, Osaka, Japan',
  'Kansai-airport Station (JR)':'JR Kansai-airport Station, Kansai International Airport, Osaka, Japan',
  'Kansai-airport Station':'Kansai-airport Station, Kansai International Airport, Osaka, Japan',
  'KIX Terminal 1':'Kansai International Airport Terminal 1, Osaka, Japan',
  'Kansai Airport Terminal 1':'Kansai International Airport Terminal 1, Osaka, Japan',
  'Don Mueang Airport Terminal 1':'Don Mueang International Airport Terminal 1, Bangkok, Thailand',
  'JR Kinosaki Onsen Station':'Kinosaki Onsen Station, Toyooka, Hyogo, Japan',
  'Kinosaki Onsen Town':'Kinosaki Onsen, Toyooka, Hyogo, Japan',
  'Kinosaki Onsen Town / Masuya Soba':'Tajima Soba Masuya, Kinosaki Onsen, Toyooka, Hyogo, Japan',
  'Nishimuraya Hotel Shogetsutei':'Nishimuraya Hotel Shogetsutei, Kinosaki Onsen, Toyooka, Hyogo, Japan',
});

export function mapPlaceQuery(place) {
  const input=String(place??'').trim();
  if (!input) return 'Osaka, Japan';
  if (/^-?\d{1,3}\.\d+,\s*-?\d{1,3}\.\d+$/.test(input)) return input;
  if (MAP_PLACE_ALIASES[input]) return MAP_PLACE_ALIASES[input];
  // Line/platform codes are for travelers, not for Google Maps geocoding.
  let cleaned=input.replace(/\s*\([^)]*\)/g,'').trim();
  // Slash-combined attractions or station choices are not real addresses.
  if (cleaned.includes(' / ')) cleaned=cleaned.split(' / ')[0].trim();
  if (/\b(Thailand|Bangkok|Don Mueang|DMK)\b/i.test(cleaned))
    return /\bThailand\b/i.test(cleaned)?cleaned:cleaned+', Bangkok, Thailand';
  if (/\bJapan\b/i.test(cleaned)) return cleaned;
  const locale=/\b(Kinosaki|Toyooka|Hyogo|Tajima|Nishimuraya)\b/i.test(cleaned)
    ? 'Toyooka, Hyogo, Japan'
    : /\b(Nara|Todai-ji|Kasuga)\b/i.test(cleaned)
      ? 'Nara, Japan'
      : /\b(Kyoto|Arashiyama|Saga-|Tenryu|Togetsukyo|Fushimi|Gion|Kiyomizu|Tofuku|Nishiki|Shichijo)\b/i.test(cleaned)
        ? 'Kyoto, Japan' : 'Osaka, Japan';
  // Avoid duplicating the city if the readable label already includes it.
  return cleaned+', '+locale;
}

export function mapDirectionsUrl(from, to, mode='transit') {
  const origin=mapPlaceQuery(from),destination=mapPlaceQuery(to);
  const valid=['driving','walking','bicycling','transit'].includes(mode)?mode:'transit';
  return 'https://www.google.com/maps/dir/?api=1&origin='+encodeURIComponent(origin)
    +'&destination='+encodeURIComponent(destination)+'&travelmode='+valid;
}
export const mapSearchUrl=place=>
  'https://www.google.com/maps/search/?api=1&query='+encodeURIComponent(mapPlaceQuery(place));

