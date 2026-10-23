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
    day: 2, kicker: 'เที่ยวใน Osaka', leave: 'แผนออกจากโรงแรม ~08:15', confirmed: false,
    overview: 'Daikokucho → Morinomiya (Osaka Castle) → Shinsaibashi → Dotonbori',
    reminder: 'วันนี้ยังไม่เปิดใช้ JR Pass • ใช้ ICOCA / บัตร Osaka Metro • จุดแวะเป็นร่างแผน',
    legs: [
      { from: centara, to: 'Daikokucho Station, Osaka', mode: 'เดิน', line: 'สถานี Daikokucho', how: 'เดินไป Osaka Metro สถานี Daikokucho (Midosuji / Yotsubashi)', duration: 'ประมาณ 5–10 นาที', pay: 'ฟรี', icon: 'walk' },
      { from: 'Daikokucho Station, Osaka', to: 'Morinomiya Station, Osaka', mode: 'Osaka Metro', line: 'Midosuji → Chuo (เปลี่ยนที่ Hommachi)', how: 'ขึ้น Midosuji มุ่งหน้า Umeda ลง Hommachi แล้วต่อ Chuo ไป Morinomiya เดินเข้าพื้นที่ Osaka Castle', duration: 'เผื่อราว 30–45 นาทีรวมเดิน', pay: 'ICOCA', icon: 'train' },
      { from: 'Osaka Castle Park, Osaka', to: 'Shinsaibashi Station, Osaka', mode: 'Osaka Metro', line: 'กลับสู่ย่าน Shinsaibashi', how: 'เลือกสถานี Morinomiya / Tanimachi 4-chome ที่ใกล้จุดออกแล้วใช้ Google Maps หาเที่ยวที่เหมาะที่สุด', duration: 'ขึ้นกับจุดที่เดินออกจากสวน', pay: 'ICOCA', icon: 'train' },
      { from: 'Shinsaibashi-suji Shopping Street, Osaka', to: 'Dotonbori, Osaka', mode: 'เดิน', line: 'ผ่าน Shinsaibashi ไปป้าย Glico', how: 'เดินเล่นถนนช้อปปิงมุ่งลงใต้ ผ่าน Ebisubashi แล้วถึง Dotonbori', duration: 'ประมาณ 15–25 นาที (ไม่รวมช้อป)', pay: 'ฟรี', icon: 'walk' },
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

export const mapDirectionsUrl = (from, to, mode = 'transit') => `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(from)}&destination=${encodeURIComponent(to)}&travelmode=${mode}`;
export const mapSearchUrl = place => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place)}`;
