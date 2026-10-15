export const trip = {
  title: 'Kansai, With You',
  dates: '17—24 NOVEMBER 2026',
  startDate: '2026-11-17',
  endDate: '2026-11-24',
  travelers: 2,
  days: 8,
  nights: 7,
  flights: [
    { code: 'XJ610', route: 'DMK T1 → KIX T1', date: '17 พ.ย.', time: '10:40 – 18:15', label: 'ขาไป' },
    { code: 'XJ611', route: 'KIX T1 → DMK T1', date: '24–25 พ.ย.', time: '19:45 – 00:15 (+1 วัน)', label: 'ขากลับ' },
  ],
  hotels: [
    { id: 'centara1', name: 'Centara Life Namba Hotel Osaka', date: '17–22 พ.ย. · 5 คืน', plan: 'Room only', area: 'Osaka / Namba', map: 'Centara Life Namba Hotel Osaka', booked: true },
    { id: 'nishimuraya', name: 'Nishimuraya Hotel Shogetsutei', date: '22–23 พ.ย. · 1 คืน', plan: 'Dinner + Breakfast', area: 'Kinosaki Onsen', map: 'Nishimuraya Hotel Shogetsutei', booked: true },
    { id: 'centara2', name: 'Centara Life Namba Hotel Osaka', date: '23–24 พ.ย. · 1 คืน', plan: 'Breakfast included', area: 'Osaka / Namba', map: 'Centara Life Namba Hotel Osaka', booked: true },
  ],
  japanRail: { pass: 'JR-WEST Kansai WIDE Area Pass', duration: '5 วัน', start: '20 พ.ย.', end: '24 พ.ย.', price: '¥12,000 / คน', state: 'เลือกแล้ว · ยังไม่ได้ซื้อ' },
};

export const images = {
  hero: 'https://a-us.storyblok.com/f/1018357/1920x1277/d37c3f5205/3141175_m.jpg',
  osaka: 'https://a-us.storyblok.com/f/1018357/1920x1277/d37c3f5205/3141175_m.jpg',
  kyoto: 'https://www.keihan.co.jp/uji-fushimi/assets/img/fushimi/img_spot03_01_a.jpg',
  kinosaki: 'https://media.timeout.com/images/106065006/750/562/image.jpg',
};

export const itinerary = [
  {
    day: 1, date: '17 NOV', dow: 'TUE', location: 'OSAKA', title: 'Touchdown in Osaka', subtitle: 'สวัสดีคันไซ ถึงญี่ปุ่นแล้ว', image: 'osaka', type: 'confirmed',
    summary: 'เดินทางจากดอนเมืองถึงคันไซ แล้วเข้าที่พักย่านนัมบะ', stay: 'Centara Life Namba · คืนที่ 1',
    highlight: 'XJ610 · KIX 18:15', map: 'Centara Life Namba Hotel Osaka',
    schedule: [
      { time: '10:40', title: 'บินออกจาก DMK Terminal 1', detail: 'เที่ยวบิน XJ610 (เวลาไทย)' },
      { time: '18:15', title: 'ถึง Kansai Airport Terminal 1', detail: 'ผ่านตรวจคนเข้าเมืองและรับกระเป๋า (เวลาญี่ปุ่น)' },
      { time: 'ค่ำ', title: 'เดินทางไปโรงแรม', detail: 'เช็กตัวเลือก Nankai / JR ตามเวลาและสัมภาระ' },
      { time: 'ดึก', title: 'Check-in + พักผ่อน', detail: 'Centara Life Namba Hotel Osaka' },
    ], note: 'เช็กเวลารถไฟเที่ยวสุดท้ายตามเวลาที่ออกจากสนามบินจริง',
  },
  {
    day: 2, date: '18 NOV', dow: 'WED', location: 'OSAKA', title: 'A Day in Osaka', subtitle: 'สำรวจเมือง ของกิน และแสงนีออน', image: 'osaka', type: 'draft',
    summary: 'Osaka Castle • Shinsaibashi • Dotonbori', stay: 'Centara Life Namba · คืนที่ 2',
    highlight: 'เดินเล่น / ของกิน', map: 'Dotonbori Osaka',
    schedule: [
      { time: '09:00', title: 'Osaka Castle Park', detail: 'เดินชมปราสาทและสวน ถ่ายรูปช่วงเช้า' },
      { time: '12:30', title: 'มื้อกลางวันในเมือง', detail: 'เลือกเมนูที่ไม่มีเนื้อวัวตามความชอบ' },
      { time: '15:00', title: 'Shinsaibashi', detail: 'ชอปปิง ร้านอาหาร คาเฟ่' },
      { time: '18:00', title: 'Dotonbori', detail: 'Glico Sign, ของกิน และคลองยามค่ำ' },
    ], note: 'ร่างแผน · ปรับเปลี่ยนได้ตามสภาพอากาศและพลังงาน',
  },
  {
    day: 3, date: '19 NOV', dow: 'THU', location: 'USJ', title: 'A Little Bit of Magic', subtitle: 'หนึ่งวันเต็มที่ Universal Studios Japan', image: 'osaka', type: 'confirmed',
    summary: 'Studio Pass + Express Pass ซื้อเรียบร้อย · Nintendo 13:50 · Harry Potter 16:00', stay: 'Centara Life Namba · คืนที่ 3',
    highlight: 'USJ · 19 NOV', map: 'Universal Studios Japan',
    schedule: [
      { time: 'ก่อนเปิด', title: 'ออกจากโรงแรมและไปถึง USJ', detail: 'ตรวจเวลาเปิดสวนสนุกจริงในแอปก่อนวันเดินทาง' },
      { time: '10:00', title: 'เล่นโซนที่ยังไม่มีเวลาจอง', detail: 'เครื่องเล่นและโชว์ทั่วไปตามเวลารอจริง (ยังไม่มี Express เวลา 10:00)' },
      { time: '13:50', title: 'Super Nintendo World', detail: 'ช่วงเวลาที่ได้จากการซื้อ Express · ตรวจ QR และรายการเครื่องเล่นอีกครั้ง' },
      { time: '16:00', title: 'The Wizarding World of Harry Potter', detail: 'ช่วงเวลาตาม Express Pass · ตรวจรายละเอียดบนตั๋ว' },
      { time: 'เย็น', title: 'ของฝาก + โซนอื่นตามเวลา', detail: 'พัก กิน และเก็บบรรยากาศก่อนกลับ' },
    ], note: 'เวลาโซนยึดตามข้อมูลที่แจ้งไว้ แต่เวลาของแต่ละเครื่องเล่นต้องตรวจ QR อีกครั้ง',
  },
  {
    day: 4, date: '20 NOV', dow: 'FRI', location: 'KYOTO', title: 'The Kyoto Chapter', subtitle: 'ศาลเจ้า เมืองเก่า และถนนสายโรแมนติก', image: 'kyoto', type: 'draft',
    summary: 'Fushimi Inari • Kiyomizu-dera • Higashiyama', stay: 'Centara Life Namba · คืนที่ 4',
    highlight: 'JR Pass วันที่ 1 (แผน)', map: 'Fushimi Inari Taisha Kyoto',
    schedule: [
      { time: '08:00', title: 'ไป Kyoto', detail: 'เช็กเส้นทาง JR ที่เข้าเงื่อนไข Pass ตามสถานีต้นทาง' },
      { time: '09:30', title: 'Fushimi Inari Taisha', detail: 'ทางเดินเสาโทริอิสีแดง' },
      { time: '13:00', title: 'Higashiyama / Kiyomizu-dera', detail: 'ย่านบ้านไม้และวัดบนเนินเขา' },
      { time: '18:00', title: 'กลับ Osaka', detail: 'ใช้ ICOCA เพิ่มเมื่อโดยสารรถไฟเอกชนหรือรถประจำทาง' },
    ], note: 'ร่างแผน · 20–24 พ.ย. เป็นช่วงใช้งาน Pass ที่วางไว้ ยังไม่ได้ซื้อ',
  },
  {
    day: 5, date: '21 NOV', dow: 'SAT', location: 'NARA / OSAKA', title: 'Slow Days, Good Days', subtitle: 'เที่ยวสบาย ๆ ก่อนเปลี่ยนเมือง', image: 'kyoto', type: 'draft',
    summary: 'ตัวเลือก Nara Park • Todai-ji • กลับมาเก็บของที่ Osaka', stay: 'Centara Life Namba · คืนที่ 5',
    highlight: 'Free & easy', map: 'Nara Park Japan',
    schedule: [
      { time: '09:00', title: 'ตัวเลือก: Nara Park', detail: 'เดินเล่นสวนกวางและย่านเก่า' },
      { time: '12:00', title: 'Todai-ji + มื้อกลางวัน', detail: 'หรือปรับเป็นวันชอปปิงใน Osaka ได้' },
      { time: '17:00', title: 'กลับโรงแรม', detail: 'จัดกระเป๋าสำหรับพัก Kinosaki 1 คืน' },
      { time: 'ค่ำ', title: 'พักผ่อน', detail: 'เตรียมออกเดินทางเช้าวันถัดไป' },
    ], note: 'ตัวเลือกเสริม ไม่ใช่การจองที่ยืนยันแล้ว',
  },
  {
    day: 6, date: '22 NOV', dow: 'SUN', location: 'KINOSAKI', title: 'Time to Slow Down', subtitle: 'หมู่บ้านออนเซ็นและเรียวกังที่รอคอย', image: 'kinosaki', type: 'confirmed',
    summary: 'Kounotori 5 (แผน) → 12:51 Kinosaki → Nishimuraya + Kaiseki', stay: 'Nishimuraya Shogetsutei · 1 คืน',
    highlight: 'Kounotori 5 · 12:51', map: 'Kinosaki Onsen Station',
    schedule: [
      { time: '08:15', title: 'ออกจากโรงแรมไปสถานี Osaka', detail: 'เผื่อเวลาขนสัมภาระและหาชานชาลา' },
      { time: '10:12', title: 'Limited Express Kounotori 5', detail: 'แผนออกจาก JR Osaka · ต้องจอง Reserved Seat และยืนยันตารางจริง' },
      { time: '12:51', title: 'ถึง Kinosaki Onsen', detail: 'ได้แจ้งเวลาไปยังเรียวกังแล้ว' },
      { time: 'บ่าย', title: 'เดินเล่นคลอง + แช่ออนเซ็น', detail: 'เช็กขั้นตอนรับส่ง/ฝากกระเป๋ากับโรงแรม' },
      { time: 'เย็น', title: 'Kaiseki Dinner', detail: 'รวมในห้องพัก · แจ้งแล้วว่าไม่ทานเนื้อวัว ไม่ใช่อาการแพ้' },
    ], note: 'โรงแรมยืนยันมื้อเย็นและเช้าแล้ว · เวลารถไฟและการจองที่นั่งยังต้องตรวจ',
  },
  {
    day: 7, date: '23 NOV', dow: 'MON', location: 'OSAKA', title: 'One More Osaka Night', subtitle: 'อำลา Kinosaki กลับมาพักนัมบะ', image: 'kinosaki', type: 'draft',
    summary: 'อาหารเช้าเรียวกัง → รถไฟกลับ Osaka → ของฝาก', stay: 'Centara Life Namba · คืนที่ 7',
    highlight: 'กลับ Osaka · Reserved Seat ยังไม่จอง', map: 'Centara Life Namba Hotel Osaka',
    schedule: [
      { time: 'เช้า', title: 'Breakfast ที่ Nishimuraya', detail: 'รวมอยู่ใน Meal Plan' },
      { time: 'สาย', title: 'เดินเล่น Kinosaki ก่อนเช็กเอาต์', detail: 'เผื่อเวลารับสัมภาระ' },
      { time: 'บ่าย', title: 'Limited Express กลับ Osaka', detail: 'ยังไม่ได้ยืนยันขบวนและเวลาขากลับ' },
      { time: 'เย็น', title: 'Check-in Centara + ชอปปิง', detail: 'คืนนี้รวมอาหารเช้าของวันถัดไป' },
    ], note: 'ต้องจองรถไฟขากลับต่างหาก',
  },
  {
    day: 8, date: '24 NOV', dow: 'TUE', location: 'DEPARTURE', title: 'Until Next Time, Japan', subtitle: 'วันสุดท้าย เก็บความทรงจำก่อนกลับบ้าน', image: 'osaka', type: 'confirmed',
    summary: 'Check-out → Kansai Airport → XJ615 17:15', stay: 'กลับประเทศไทย',
    highlight: 'XJ615 · 17:15', map: 'Kansai International Airport',
    schedule: [
      { time: 'เช้า', title: 'อาหารเช้าที่ Centara', detail: 'รวมในคืนวันที่ 23–24 พ.ย.' },
      { time: '15:00 (แนะนำ)', title: 'ออกจากโรงแรมไป KIX', detail: 'เผื่อเวลาไป Nankai Namba ซื้อตั๋ว นั่งรถ และหาทางไป Terminal 1; เช็กตารางรถจริงก่อนออก' },
      { time: '16:45 (เป้าหมาย)', title: 'ถึง KIX Terminal 1', detail: 'เผื่อเวลาเช็กอินระหว่างประเทศ 3 ชั่วโมง' },
      { time: '17:15', title: 'บินออก KIX', detail: 'XJ615 · เวลาญี่ปุ่น' },
      { time: '00:15 (25 พ.ย.)', title: 'ถึง DMK Terminal 1', detail: 'เวลาประเทศไทย · เดินทางถึงหลังเที่ยงคืน' },
    ], note: 'เช็กเวลาเช็กอิน ปิดเคาน์เตอร์ และกระเป๋ากับสายการบินก่อนเดินทาง',
  },
];

export const checklist = [
  { id: 'flight', group: 'การจอง', title: 'จองเที่ยวบินไป–กลับ XJ610 / XJ615', due: '2026-10-01', done: true, detail: '17 พ.ย. DMK 10:40 → KIX 18:15 · 24 พ.ย. KIX 19:45 → DMK 25 พ.ย. 00:15' },
  { id: 'hotels', group: 'การจอง', title: 'ยืนยัน Centara ทั้งสองช่วงและ Nishimuraya', due: '2026-10-01', done: true, detail: 'ครบ 7 คืน' },
  { id: 'usj-ticket', group: 'การจอง', title: 'ซื้อ USJ Studio Pass + Express Pass (2 คน)', due: '2026-10-01', done: true, detail: 'ใช้ 19 พ.ย. 2026' },
  { id: 'passport', group: 'เอกสาร', title: 'ตรวจอายุหนังสือเดินทาง', due: '2026-10-01', done: true, detail: 'ตรวจเรียบร้อยแล้ว' },
  { id: 'meal', group: 'ที่พัก', title: 'เช็ก Nishimuraya ว่ารวม Dinner + Breakfast', due: '2026-10-01', done: true, detail: 'โรงแรมยืนยันว่ารวมทั้งสองมื้อ' },
  { id: 'diet', group: 'ที่พัก', title: 'แจ้งอาหารและเวลาเข้าพักที่ Nishimuraya', due: '2026-10-01', done: true, detail: 'ไม่ทานเนื้อวัว (ไม่แพ้) · sashimi ได้ · ถึง 12:51' },
  { id: 'pass-decided', group: 'รถไฟ', title: 'ตัดสินใจประเภท JR Pass', due: '2026-10-09', done: true, detail: 'เลือก Kansai WIDE Area Pass 5 วันแล้ว ยังไม่ใช่การซื้อ' },
  { id: 'pass-buy', group: 'รถไฟ', title: 'ซื้อ JR-WEST Kansai WIDE Area Pass 5 วัน (2 คน)', due: '2026-10-22', done: false, detail: 'วางแผนเริ่มใช้ 20–24 พ.ย. · ตรวจวันเริ่มใช้งานขณะสั่งซื้อ' },
  { id: 'seat-go', group: 'รถไฟ', title: 'จองที่นั่ง Kounotori 5 ไป Kinosaki (22 พ.ย.)', due: '2026-10-22', done: false, detail: 'ช่องทาง JR West เปิดจองตามเงื่อนไข 1 เดือนก่อนเวลา 10:00 JST; แผนถึง 12:51' },
  { id: 'seat-back', group: 'รถไฟ', title: 'จองที่นั่งรถไฟกลับ Osaka (23 พ.ย.)', due: '2026-10-23', done: false, detail: 'เลือกเที่ยวกลับแล้วจองที่นั่ง Reserved Seat' },
  { id: 'hotel-luggage', group: 'ที่พัก', title: 'เช็กการฝากกระเป๋าที่ Centara ช่วงไป Kinosaki', due: '2026-11-05', done: false, detail: 'ถามเงื่อนไขฝากข้ามคืน 22–23 พ.ย.' },
  { id: 'icoca', group: 'รถไฟ', title: 'เตรียม ICOCA สำหรับรถไฟ/รถประจำทางที่ Pass ไม่ครอบคลุม', due: '2026-11-10', done: false, detail: 'ดูการใช้งาน ICOCA บนมือถือหรือซื้อบัตรเมื่อถึงญี่ปุ่น' },
  { id: 'usj-app', group: 'กิจกรรม', title: 'ลงแอป USJ และเตรียม QR ของตั๋ว', due: '2026-11-10', done: false, detail: 'ตรวจรอบ Nintendo 13:50 และ Harry Potter 16:00 บนตั๋วจริง' },
  { id: 'esim', group: 'อินเทอร์เน็ต', title: 'ซื้อ eSIM / เตรียมอินเทอร์เน็ตในญี่ปุ่น', due: '2026-11-10', done: false, detail: 'ตรวจโทรศัพท์รองรับ eSIM และทดสอบขั้นตอนติดตั้ง' },
  { id: 'insurance', group: 'เอกสาร', title: 'ซื้อประกันการเดินทางสำหรับ 2 คน', due: '2026-11-10', done: false, detail: 'ยืนยันความคุ้มครองครบวันที่ 17–24 พ.ย.' },
  { id: 'v-japan', group: 'เอกสาร', title: 'กรอก Visit Japan Web', due: '2026-11-12', done: false, detail: 'เตรียมข้อมูลเที่ยวบินและที่พัก' },
  { id: 'cash', group: 'การเงิน', title: 'เตรียมเงินเยนจากงบเงินสด 12,000 บาท (2 คน)', due: '2026-11-12', done: false, detail: 'ทยอยเตรียมแบงก์ย่อยและตรวจเรตจริง ไม่ต้องเพิ่มเงินสดเกินงบที่วางไว้' },
  { id: 'backups', group: 'เอกสาร', title: 'บันทึก QR / Confirmation / Passport สำรองแบบ Offline', due: '2026-11-14', done: false, detail: 'แนะนำเก็บในเครื่อง ไม่ควรเผยข้อมูลส่วนตัวบนเว็บสาธารณะ' },
  { id: 'plan-confirm', group: 'แผนเที่ยว', title: 'สรุปแผนเที่ยวและการเดินทางแต่ละวัน', due: '2026-11-14', done: false, detail: 'วัน 18, 20, 21 และ 23 พ.ย. ยังเป็นร่างแผน' },
  { id: 'packing', group: 'สัมภาระ', title: 'จัดกระเป๋า เสื้อกันหนาว Adapter และของใช้', due: '2026-11-15', done: false, detail: 'ตรวจน้ำหนักกระเป๋าขึ้นเครื่อง/โหลดตามตั๋ว' },
  { id: 'weather', group: 'ก่อนออกเดินทาง', title: 'เช็กพยากรณ์อากาศ + เวลาเปิด USJ / สถานที่เที่ยว', due: '2026-11-16', done: false, detail: 'ตรวจอีกครั้งใกล้วันเดินทาง' },
  { id: 'checkin', group: 'ก่อนออกเดินทาง', title: 'เช็กอินเที่ยวบินและตรวจเอกสารวันเดินทาง', due: '2026-11-16', done: false, detail: 'เช็กเวลาเปิดเช็กอินออนไลน์ของสายการบินก่อน' },
];

export const resources = [
  { name: 'JR-WEST Kansai WIDE Area Pass', desc: 'เงื่อนไขและซื้อ Pass', url: 'https://www.westjr.co.jp/travel-information/en/tickets-passes/jrwest-rail-pass/kansai_wide/' },
  { name: 'JR-WEST Online Reservation', desc: 'จองที่นั่ง / รับบัตร', url: 'https://www.westjr.co.jp/global/en/ticket/pass/reservation_form/index.php?p=kansai-widepass' },
  { name: 'Universal Studios Japan', desc: 'ตรวจตั๋ว แอป และเวลา', url: 'https://www.usj.co.jp/web/en/us/enjoy/app' },
  { name: 'Visit Japan Web', desc: 'ข้อมูลเดินทางเข้าญี่ปุ่น', url: 'https://www.vjw.digital.go.jp/' },
];
