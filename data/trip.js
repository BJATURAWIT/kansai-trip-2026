import {travelBookings,tripFlightList,japanRailInfo,flightNumberLabel,localClock} from './centralTravel.js';
export const trip = {
  title: 'Kansai, With You',
  dates: '17—24 NOVEMBER 2026',
  startDate: '2026-11-17',
  endDate: '2026-11-24',
  travelers: 2,
  days: 8,
  nights: 7,
  flights: tripFlightList(),
  hotels: travelBookings.hotels,
  japanRail: japanRailInfo(),
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
    highlight: 'XJ610 · KIX '+localClock(travelBookings.flights.outbound.arrival), map: 'Centara Life Namba Hotel Osaka',
    schedule: [
      { time: localClock(travelBookings.flights.outbound.departure), date:'2026-11-17',timeZone:'Asia/Bangkok', title: 'บินออกจาก DMK Terminal 1', detail: 'เที่ยวบิน '+flightNumberLabel(travelBookings.flights.outbound)+' (เวลาไทย)' },
      { time: localClock(travelBookings.flights.outbound.arrival), date:'2026-11-17',timeZone:'Asia/Tokyo', title: 'ถึง Kansai Airport Terminal 1', detail: 'ผ่านตรวจคนเข้าเมืองและรับกระเป๋า (เวลาญี่ปุ่น)' },
      { time: 'หลังผ่าน ตม.', title: 'เลือกที่นั่ง Nankai Rapi:t Super Seat', detail: 'ตั๋ว 2 คนชำระแล้ว ¥'+travelBookings.nankaiArrival.totalPaidYen.toLocaleString('en-US')+' · เปิด Purchased Ticket ที่ Nankai Digital Ticket เลือกวัน/ขบวน/ที่นั่งหลังรับกระเป๋า ต้องก่อนรถออกอย่างน้อย 5 นาที; ยังไม่ได้เลือกที่นั่ง' },
      { time: 'ช่วงค่ำ', title: 'Rapi:t Super Seat → Nankai Namba', detail: 'เปิด QR ตั๋วจริงบนมือถือที่ช่องประตู Nankai สำหรับ Digital Ticket แล้วขึ้นขบวน/ตู้/ที่นั่งที่เลือก ไม่ต้องจ่ายค่าโดยสารซ้ำ; รถจริงยังไม่ได้เลือก' },
      { time: 'ดึก', title: 'Check-in + พักผ่อน', detail: 'Centara Life Namba Hotel Osaka' },
    ], note: 'ซื้อตั๋ว Nankai Rapi:t Super Seat ไป Namba แล้ว 2 คน ¥3,180 แต่ต้องเลือกขบวนและที่นั่งผ่าน Ticket Wallet หลังผ่าน ตม. · อีเมลยืนยันไม่ใช่ QR ตั๋วจริง · ตรวจรถเที่ยวสุดท้าย',
  },
  {
    day: 2, date: '18 NOV', dow: 'WED', location: 'OSAKA', title: 'A Day in Osaka', subtitle: 'สำรวจเมือง ของกิน และแสงนีออน', image: 'osaka', type: 'draft',
    summary: 'Osaka Castle • Shinsaibashi • Dotonbori', stay: 'Centara Life Namba · คืนที่ 2',
    highlight: 'เดินเล่น / ของกิน', map: 'Dotonbori Osaka',
    schedule: [
      { time: '09:00', title: 'Osaka Castle Park', detail: 'จาก Daikokucho เปลี่ยนสายที่ Hommachi ไป Morinomiya ใช้เวลารวมเดินประมาณ 30–40 นาที' },
      { time: '11:45', title: 'Kuromon Market / Lunch', detail: 'เลือกอาหารทะเล/ซูชิในตลาดตามคิวและร้านที่เปิดจริง' },
      { time: '13:00', title: 'Shinsaibashi / Namba', detail: 'เดินเล่น ช้อปปิง แล้วเดินทางไป Umeda' },
      { time: '15:45–16:15', title: 'Umeda Sky Building', detail: 'เช็กคิว Sky Building และเตรียมขึ้นจุดชมวิว' },
      { time: '16:20–17:20', title: 'Sunset Special Moment', detail: 'ชมพระอาทิตย์ตกประมาณ 16:52 JST และถ่ายภาพ' },
      { time: '18:15–20:00', title: 'Special Dinner', detail: 'STARDUST 39F · Confirmed booking (เวลานัดจริงรอยืนยันจากอีเมล) · XEX WEST เป็นสำรองฉุกเฉิน · ไม่ทานเนื้อวัว' },
    ], note: 'ร่างแผน · ปรับเปลี่ยนได้ตามสภาพอากาศและพลังงาน',
  },
  {
    day: 3, date: '19 NOV', dow: 'THU', location: 'USJ', title: 'A Little Bit of Magic', subtitle: 'หนึ่งวันเต็มที่ Universal Studios Japan', image: 'osaka', type: 'confirmed',
    summary: 'Studio Pass + Express Pass ซื้อเรียบร้อย · Nintendo '+travelBookings.usj.nintendoEntry+' · Harry Potter '+travelBookings.usj.harryPotterEntry, stay: 'Centara Life Namba · คืนที่ 3',
    highlight: 'USJ · 19 NOV', map: 'Universal Studios Japan',
    schedule: [
      { time: 'ก่อนเปิด', title: 'ออกจากโรงแรมและไปถึง USJ', detail: 'ตรวจเวลาเปิดสวนสนุกจริงในแอปก่อนวันเดินทาง' },
      { time: '10:00', title: 'USJ ก่อนเวลา Nintendo', detail: 'เลือก Hollywood Dream / JAWS / Minions ตามคิวจริง แล้วพักกินก่อน 13:50; อย่าใช้ Express สำหรับเครื่องเล่นผิดช่วงเวลา' },
      { time: travelBookings.usj.nintendoEntry, title: 'Super Nintendo World', detail: 'ช่วงเวลาที่ได้จากการซื้อ Express · ตรวจ QR และรายการเครื่องเล่นอีกครั้ง' },
      { time: travelBookings.usj.harryPotterEntry, title: 'The Wizarding World of Harry Potter', detail: 'ช่วงเวลาตาม Express Pass · ตรวจรายละเอียดบนตั๋ว' },
      { time: 'เย็น', title: 'ของฝาก + โซนอื่นตามเวลา', detail: 'พัก กิน และเก็บบรรยากาศก่อนกลับ' },
    ], note: 'เวลาโซนยึดตามข้อมูลที่แจ้งไว้ แต่เวลาของแต่ละเครื่องเล่นต้องตรวจ QR อีกครั้ง',
  },
  {
    day: 4, date: '20 NOV', dow: 'FRI', location: 'KYOTO', title: 'Arashiyama & Kyoto', subtitle: 'ป่าไผ่ วัดเซน และเกียวโตย่านเก่า', image: 'kyoto', type: 'draft',
    summary: 'Arashiyama Bamboo Grove • Tenryu-ji • Fushimi Inari • Kiyomizu-dera • Gion', stay: 'Centara Life Namba · คืนที่ 4', highlight: 'Kyoto West + East · วันเดินเยอะ', map: 'Arashiyama Bamboo Grove Kyoto',
    schedule: [
      { time: '06:15', title: 'ออกจากโรงแรมไป JR Osaka', detail: 'Osaka Metro Daikokucho → Umeda → เดินไป JR Osaka; ตรวจรถจริงและเผื่อเวลาต่อขบวน' },
      { time: '08:15', title: 'Arashiyama Bamboo Grove (ป่าไผ่อาราชิยามะ)', detail: 'JR Osaka → Kyoto → Sagano Line ลง Saga-Arashiyama แล้วเดินประมาณ 15–20 นาทีถึงป่าไผ่' },
      { time: '09:00–10:00', title: 'Tenryu-ji Temple (วัดเทนริวจิ)', detail: 'อยู่ติดกับทางป่าไผ่ เข้าชมสวนญี่ปุ่น (ปกติเปิด 08:30) ตรวจเวลาและค่าเข้าล่าสุด' },
      { time: '10:15–12:15', title: 'เดินทางไป Fushimi Inari + มื้อกลางวัน', detail: 'เดินกลับ JR Saga-Arashiyama → Kyoto → ขบวน Local สาย JR Nara ลง Inari' },
      { time: '12:15–13:15', title: 'Fushimi Inari Taisha', detail: 'เดินชมเสาโทริอิช่วงต้น ไม่ขึ้นภูเขาลึกเพื่อเก็บแรงไว้เที่ยวต่อ' },
      { time: '14:15–16:00', title: 'Kiyomizu-dera + Sannenzaka / Ninenzaka', detail: 'Keihan Fushimi-Inari → Kiyomizu-Gojo และเดินขึ้นเนิน หรือใช้แท็กซี่ช่วยประหยัดแรง' },
      { time: '16:30', title: 'เดิน Gion → กลับ Osaka', detail: 'เดินย่าน Gion ก่อนใช้ Keihan + Metro กลับโรงแรม; Tofukuji เป็นตัวเลือกเฉพาะถ้ามีเวลา' },
    ], note: 'วันเกียวโตแน่นและเดินค่อนข้างมาก ถ้าใช้เวลากับป่าไผ่/วัดนานให้ตัดจุดฝั่งตะวันออกบางแห่ง ไม่ต้องฝืนทำครบทุกแห่ง',
  },
  {
    day: 5, date: '21 NOV', dow: 'SAT', location: 'NARA / OSAKA', title: 'Slow Days, Good Days', subtitle: 'เที่ยวสบาย ๆ ก่อนเปลี่ยนเมือง', image: 'kyoto', type: 'draft',
    summary: 'ตัวเลือก Nara Park • Todai-ji • กลับมาเก็บของที่ Osaka', stay: 'Centara Life Namba · คืนที่ 5',
    highlight: 'Free & easy', map: 'Nara Park Japan',
    schedule: [
      { time: '07:40', title: 'ออกจาก Centara ไป Nara', detail: 'Daikokucho → Namba → Osaka-Namba (Kintetsu) → Kintetsu-Nara' },
      { time: '09:00', title: 'Nara Park + Todai-ji', detail: 'เดินดูสวนกวางและพระใหญ่ วางแผนถึงช่วง 13:00' },
      { time: '13:30', title: 'Kasuga Taisha + สวน (ตามเวลา)', detail: 'ศาลเจ้าคาสุงะ และตัวเลือก Isuien / Yoshikien' },
      { time: '16:30', title: 'Kintetsu-Nara กลับ Osaka', detail: 'กลับ Osaka-Namba และโรงแรมช่วงประมาณ 18:00 เตรียมกระเป๋า Kinosaki' },
    ], note: 'ตัวเลือกเสริม ไม่ใช่การจองที่ยืนยันแล้ว',
  },
  {
    day: 6, date: '22 NOV', dow: 'SUN', location: 'KINOSAKI', title: 'Time to Slow Down', subtitle: 'หมู่บ้านออนเซ็นและเรียวกังที่รอคอย', image: 'kinosaki', type: 'confirmed',
    summary: travelBookings.kounotori.outward.train+' จองแล้ว · '+travelBookings.kounotori.outward.depart+'–'+travelBookings.kounotori.outward.arrive+' · Car '+travelBookings.kounotori.outward.car+' · Seats '+travelBookings.kounotori.outward.seats+' → Nishimuraya', stay: 'Nishimuraya Shogetsutei · 1 คืน',
    highlight: travelBookings.kounotori.outward.train+' · '+travelBookings.kounotori.outward.arrive, map: 'Kinosaki Onsen Station',
    schedule: [
      { time: '08:15', title: 'ออกจากโรงแรมไปสถานี Osaka', detail: 'เผื่อเวลาขนสัมภาระและหาชานชาลา' },
      { time: travelBookings.kounotori.outward.depart, title: 'Limited Express '+travelBookings.kounotori.outward.train+' · Car '+travelBookings.kounotori.outward.car, detail: 'Reserved Seat ยืนยันแล้วสำหรับ 2 คน · Seats '+travelBookings.kounotori.outward.seats+' · Osaka '+travelBookings.kounotori.outward.depart+' → Kinosaki '+travelBookings.kounotori.outward.arrive+'; ตรวจชานชาลาจริง' },
      { time: travelBookings.kounotori.outward.arrive, title: 'ถึง Kinosaki Onsen', detail: 'ได้แจ้งเวลาไปยังเรียวกังแล้ว' },
      { time: '13:00–15:00', title: 'Kinosaki Station → Shuttle → Nishimuraya', detail: 'หลังลง Kounotori 5 เวลา 12:51 ถามเจ้าหน้าที่ Sozoro Check-in Center / รถ Shuttle ไป Nishimuraya Hotel Shogetsutei; โทรโรงแรมหากไม่พบจุดขึ้นรถ ฝากกระเป๋าแล้วเดินชมคลอง' },
      { time: 'เย็น', title: 'Kaiseki Dinner', detail: 'รวมในห้องพัก · แจ้งแล้วว่าไม่ทานเนื้อวัว ไม่ใช่อาการแพ้' },
    ], note: 'จอง Kounotori 5 Car 4 Seats 9C/9D แล้ว · ต้องรับพาสและตั๋วที่นั่งตามขั้นตอน JR-WEST ก่อนขึ้นรถ',
  },
  {
    day: 7, date: '23 NOV', dow: 'MON', location: 'OSAKA', title: 'One More Osaka Night', subtitle: 'อำลา Kinosaki กลับมาพักนัมบะ', image: 'kinosaki', type: 'confirmed',
    summary: travelBookings.kounotori.return.train+' จองแล้ว · '+travelBookings.kounotori.return.depart+'–'+travelBookings.kounotori.return.arrive+' · Car '+travelBookings.kounotori.return.car+' · Seats '+travelBookings.kounotori.return.seats+' → Osaka', stay: 'Centara Life Namba · คืนที่ 7',
    highlight: travelBookings.kounotori.return.train+' · '+travelBookings.kounotori.return.depart+'–'+travelBookings.kounotori.return.arrive+' · ที่นั่งยืนยันแล้ว', map: 'Centara Life Namba Hotel Osaka',
    schedule: [
      { time: 'เช้า', title: 'อาหารเช้า + เดินเล่น Kinosaki', detail: 'อาหารเช้าในเรียวกัง ตรวจเวลาเช็กเอาต์และรถ Shuttle ที่ Reception' },
      { time: '14:30 (แนะนำ)', title: 'รถรับส่งไปสถานี Kinosaki-Onsen', detail: 'แจ้ง Reception ให้จัด Shuttle ตามเวลารถจองจริง Kounotori 22 เวลา 15:30 · เผื่อถึงสถานีล่วงหน้า 20–30 นาที (วันหยุดญี่ปุ่น)' },
      { time: travelBookings.kounotori.return.depart, title: travelBookings.kounotori.return.train+' · Car '+travelBookings.kounotori.return.car+' · Seats '+travelBookings.kounotori.return.seats, detail: 'Reserved Seat ยืนยันแล้วสำหรับ 2 คน · Kinosaki '+travelBookings.kounotori.return.depart+' → Osaka '+travelBookings.kounotori.return.arrive+' · ตรวจชานชาลาจริง' },
      { time: '19:00 (โดยประมาณ)', title: 'กลับ Centara / Check-in', detail: 'หลัง Kounotori 22 ถึง Osaka 18:21 เดินไป Metro Umeda → Daikokucho → โรงแรม; เผื่อเวลาเดินและหาทางออก' },
      { time: 'เย็น', title: 'Namba / Shinsaibashi', detail: 'ชอปปิงและพักผ่อนคืนสุดท้ายที่ Osaka' },
    ], note: 'จอง Kounotori 22 Car 7 Seats 8C/8D แล้ว · 23 พ.ย. เป็นวันหยุดญี่ปุ่น เผื่อเวลารถรับส่งและสถานี',
  },
  {
    day: 8, date: '24 NOV', dow: 'TUE', location: 'DEPARTURE', title: 'Until Next Time, Japan', subtitle: 'วันสุดท้าย เก็บความทรงจำก่อนกลับบ้าน', image: 'osaka', type: 'confirmed',
    summary: 'Check-out → Kansai Airport → '+flightNumberLabel(travelBookings.flights.inbound)+' '+localClock(travelBookings.flights.inbound.departure), stay: 'กลับประเทศไทย',
    highlight: flightNumberLabel(travelBookings.flights.inbound)+' · '+localClock(travelBookings.flights.inbound.departure), map: 'Kansai International Airport',
    schedule: [
      { time: 'เช้า', title: 'อาหารเช้าที่ Centara', detail: 'รวมในคืนวันที่ 23–24 พ.ย.' },
      { time: '15:00 (แนะนำ)', title: 'ออกจากโรงแรมไป KIX', detail: 'เผื่อเวลาไป Nankai Namba ซื้อตั๋ว นั่งรถ และหาทางไป Terminal 1; เช็กตารางรถจริงก่อนออก' },
      { time: '16:45 (เป้าหมาย)', title: 'ถึง KIX Terminal 1', detail: 'เผื่อเวลาเช็กอินระหว่างประเทศ 3 ชั่วโมง' },
      { time: localClock(travelBookings.flights.inbound.departure), date:'2026-11-24',timeZone:'Asia/Tokyo', title: 'บินออก KIX Terminal 1', detail: flightNumberLabel(travelBookings.flights.inbound)+' · เวลาญี่ปุ่น' },
      { time: localClock(travelBookings.flights.inbound.arrival)+' (25 พ.ย.)', date:'2026-11-25',timeZone:'Asia/Bangkok', title: 'ถึง DMK Terminal 1', detail: 'เวลาประเทศไทย · เดินทางถึงหลังเที่ยงคืน' },
    ], note: 'เช็กเวลาเช็กอิน ปิดเคาน์เตอร์ และกระเป๋ากับสายการบินก่อนเดินทาง',
  },
];

export const checklist = [
  { id: 'flight', group: 'การจอง', title: 'จองเที่ยวบินไป–กลับ '+flightNumberLabel(travelBookings.flights.outbound)+' / '+flightNumberLabel(travelBookings.flights.inbound), due: '2026-10-01', done: true, detail: '17 พ.ย. DMK '+localClock(travelBookings.flights.outbound.departure)+' → KIX '+localClock(travelBookings.flights.outbound.arrival)+' · 24 พ.ย. KIX '+localClock(travelBookings.flights.inbound.departure)+' → DMK 25 พ.ย. '+localClock(travelBookings.flights.inbound.arrival) },
  { id: 'hotels', group: 'การจอง', title: 'ยืนยัน Centara ทั้งสองช่วงและ Nishimuraya', due: '2026-10-01', done: true, detail: 'ครบ 7 คืน' },
  { id: 'usj-ticket', group: 'การจอง', title: 'ซื้อ USJ Studio Pass + Express Pass (2 คน)', due: '2026-10-01', done: true, detail: 'ใช้ 19 พ.ย. 2026' },
  { id: 'passport', group: 'เอกสาร', title: 'ตรวจอายุหนังสือเดินทาง', due: '2026-10-01', done: true, detail: 'ตรวจเรียบร้อยแล้ว' },
  { id: 'meal', group: 'ที่พัก', title: 'เช็ก Nishimuraya ว่ารวม Dinner + Breakfast', due: '2026-10-01', done: true, detail: 'โรงแรมยืนยันว่ารวมทั้งสองมื้อ' },
  { id: 'diet', group: 'ที่พัก', title: 'แจ้งอาหารและเวลาเข้าพักที่ Nishimuraya', due: '2026-10-01', done: true, detail: 'ไม่ทานเนื้อวัว (ไม่แพ้) · sashimi ได้ · ถึง 12:51' },
  { id: 'pass-decided', group: 'รถไฟ', title: 'ตัดสินใจประเภท JR Pass', due: '2026-10-09', done: true, detail: 'เลือกและซื้อ Kansai WIDE Area Pass 5 วันแล้ว' },
  { id: 'pass-buy', group: 'รถไฟ', title: 'ซื้อ JR-WEST Kansai WIDE Area Pass 5 วัน (2 คน)', due: '2026-10-22', done: true, detail: 'ซื้อสำเร็จ ¥'+travelBookings.jrPass.totalPriceYen.toLocaleString('en-US')+' · ใช้ 20–24 พ.ย. 2026 · ยังต้องรับพาส/ตั๋วก่อนเดินทาง' },
  { id: 'seat-go', group: 'รถไฟ', title: 'จองที่นั่ง Kounotori 5 ไป Kinosaki (22 พ.ย.)', due: '2026-10-22', done: true, detail: 'Osaka '+travelBookings.kounotori.outward.depart+' → Kinosaki '+travelBookings.kounotori.outward.arrive+' · Car '+travelBookings.kounotori.outward.car+' · '+travelBookings.kounotori.outward.seats },
  { id: 'seat-back', group: 'รถไฟ', title: 'จองที่นั่ง Kounotori 22 กลับ Osaka (23 พ.ย.)', due: '2026-10-23', done: true, detail: 'Kinosaki '+travelBookings.kounotori.return.depart+' → Osaka '+travelBookings.kounotori.return.arrive+' · Car '+travelBookings.kounotori.return.car+' · '+travelBookings.kounotori.return.seats },
  { id: 'rapit-buy', group: 'รถไฟ', title: 'ซื้อ Nankai Rapi:t Digital Ticket Super Seat ขาเข้า Osaka (2 คน)', due: '2026-10-23', done: true, detail: 'จ่ายแล้ว ¥'+travelBookings.nankaiArrival.totalPaidYen.toLocaleString('en-US')+' · รวมค่าโดยสารพื้นฐาน + Limited Express · ใช้ KIX → Nankai Namba วันที่ 17 พ.ย.' },
  { id: 'rapit-select-seat', group: 'รถไฟ', title: 'หลังผ่าน ตม. เลือกวัน/ขบวน/ที่นั่ง Rapi:t ทั้ง 2 คน', due: '2026-11-17', done: false, detail: 'เปิด Purchased Ticket ใน Nankai Digital Ticket → เลือกขบวนและ Super Seat ของทั้ง 2 คนขบวนเดียวกัน · เลือกก่อนรถออกอย่างน้อย 5 นาที · ต้องเริ่มใช้ก่อน 18 พ.ย. 02:59 JST' },
  { id: 'rapit-show-qr', group: 'รถไฟ', title: 'เปิด QR Rapi:t Digital Ticket ที่ประตูรถไฟ Nankai', due: '2026-11-17', done: false, detail: 'ใช้งาน QR ที่แสดงในมือถือผ่าน Nankai Ticket Wallet · อีเมลยืนยันการซื้อ/ใบเสร็จไม่ใช่ตั๋ว' },
  { id: 'pass-pickup', group: 'รถไฟ', title: 'รับ JR Pass และตั๋ว Reserved Seat ทั้งสองขา', due: '2026-11-20', done: false, detail: 'รับบัตรตามขั้นตอน JR-WEST ภายในวันเริ่มใช้งาน 20 พ.ย.; ตรวจ Passport/บัตรเครดิตที่ใช้ซื้อและเอกสารรับบัตรตามข้อกำหนด' },
  { id: 'hotel-luggage', group: 'ที่พัก', title: 'เช็กการฝากกระเป๋าที่ Centara ช่วงไป Kinosaki', due: '2026-11-05', done: false, detail: 'ถามเงื่อนไขฝากข้ามคืน 22–23 พ.ย.' },
  { id: 'icoca', group: 'รถไฟ', title: 'เตรียม ICOCA สำหรับรถไฟ/รถประจำทางที่ Pass ไม่ครอบคลุม', due: '2026-11-10', done: false, detail: 'ดูการใช้งาน ICOCA บนมือถือหรือซื้อบัตรเมื่อถึงญี่ปุ่น' },
  { id: 'usj-app', group: 'กิจกรรม', title: 'ลงแอป USJ และเตรียม QR ของตั๋ว', due: '2026-11-10', done: false, detail: 'ตรวจรอบ Nintendo '+travelBookings.usj.nintendoEntry+' และ Harry Potter '+travelBookings.usj.harryPotterEntry+' บนตั๋วจริง' },
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
