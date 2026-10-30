import {travelBookings,flightNumberLabel,localClock} from './centralTravel.js';
// Based on user-provided 'Osaka Final(1).xlsx' itinerary and transit detail tabs,
// with user airline confirmation PDF superseding the older flight times in the workbook.
// Timed sightseeing entries are planning windows, not reserved slots.
export const beginnerDayGuide = {
1:{time:'10:40 ไทย / 18:15 ญี่ปุ่น',label:'ลงเครื่องแล้วเข้าตัวเมือง',steps:[
 ['DMK Terminal 1','ถึงสนามบินประมาณ 07:40 ตามเวลาไทย (เผื่อ 3 ชั่วโมง) ไปเคาน์เตอร์ Thai AirAsia X เที่ยวบิน XJ610 โหลดกระเป๋าไม่เกิน 20 กก./คน แล้วผ่าน ตม.','เที่ยวบินยืนยัน'],
 ['KIX Terminal 1 · 18:15','ลงเครื่องตามป้าย Arrivals → Immigration → Baggage Claim → Customs เตรียมหนังสือเดินทางและเอกสารเข้าเมือง','เวลาจองยืนยัน'],
 ['หลังผ่าน ตม. / รับกระเป๋า','เปิด https://nk-digital-ticket.nankai.co.jp/ → Purchased Ticket / Ticket Wallet → เลือกวันที่ 17 พ.ย. ขบวน Rapi:t และ Super Seat ทั้ง 2 คนขบวนเดียวกัน ไม่ต้องจ่ายเพิ่ม · ต้องเลือกก่อนรถออก 5 นาที','ตั๋ว Rapi:t Super Seat ซื้อแล้ว ¥3,180 / 2 คน · ยังไม่ได้เลือกที่นั่ง'],
 ['Kansai-airport Station → Nankai Namba','ออก T1 ตามป้าย Railway ไป Nankai (ไม่ใช่ JR) → เปิด Use the Seat/QR ตั๋วจริงในมือถือ สแกนประตูเฉพาะ Digital Ticket และขึ้นตู้/ที่นั่งที่จอง · อีเมลยืนยัน/ใบเสร็จใช้แทน QR ไม่ได้','รวมค่าโดยสารพื้นฐานและค่ารถด่วนแล้ว'],
 ['Nankai Namba → โรงแรม','ลง Nankai Namba เปิด Google Maps ไป Centara Life Namba; ถ้ามีกระเป๋าใหญ่แนะนำแท็กซี่ระยะสั้นจากสถานี ไม่ต้องลากกระเป๋าไกล','เส้นทางแนะนำ'],
],note:'หลังเครื่องถึง KIX 18:15 ค่อยเลือก Rapi:t Super Seat หลังผ่าน ตม. และรับกระเป๋า · ต้องเริ่มใช้ก่อน 18 พ.ย. 02:59 JST ตามอีเมล · QR อยู่ใน Ticket Wallet ไม่ใช่อีเมล'},
2:{time:'09:00–20:00',label:'Osaka Castle · Tempura Makino Namba · Dotonbori · Umeda',steps:[
 ['09:00–11:10 Osaka Castle','Daikokucho (M21) → Midosuji ถึง Hommachi (M18) → Chuo ไป Morinomiya (C19) แล้วเดินผ่าน Osaka Castle Park ไปตัวปราสาท','Metro / ICOCA'],
 ['11:10–11:55 Castle → Namba','เดินกลับ Morinomiya (N20) ขึ้น Nagahori Tsurumi-ryokuchi มุ่ง Taisho ลง Shinsaibashi (N15) เปลี่ยน Midosuji (M19) มุ่ง Nakamozu ลง Namba (M20); เดินไปร้าน 3-3-4','ICOCA · เปลี่ยนภายในไม่แตะออก'],
 ['12:00–13:00 Tempura Makino / Tendon Tenya','Makino เป็นร้านหลัก ถ้าคิวเกิน 15 นาที เดินไปร้าน Tenya Namba Sennichimae ไม่ต้องเปลี่ยนเส้นทางช่วงบ่าย','เดิน / งบหลัก ¥1,100–1,600 ต่อคน'],
 ['13:00–13:30 Dotonbori / Glico','เดินขึ้นเหนือผ่าน Dotonbori ถ่ายรูปหน้าป้าย Glico ที่สะพาน Ebisubashi','เดินฟรี'],
 ['13:30–14:55 Shinsaibashi','เดินต่อขึ้นเหนือบน Shinsaibashi-suji Shopping Street ไปสถานี Shinsaibashi (M19)','เดินฟรี'],
 ['14:55–15:40 Umeda Sky','ขึ้น Midosuji ที่ Shinsaibashi (M19) มุ่ง Shin-Osaka ลง Umeda (M16) และเดินไป Umeda Sky Building อีกประมาณ 12–20 นาที','ICOCA + เดิน'],
 ['15:45 เป็นต้นไป','รักษาแผน Umeda Sky, Sunset และ STARDUST ที่ยืนยันการจองร้านแล้ว (เวลาจองจริงยังต้องตรวจหลักฐาน)','STARDUST Booked'],
],note:'ช่วง 11:10–11:55 รวมเดินกลับจากตัวปราสาทและเปลี่ยน Metro จึงค่อนข้างแน่น ถ้าต้องการกินเที่ยงตรง 12:00 ให้เริ่มเดินออกจากตัวปราสาทก่อน 11:10 · ไม่มี Kuromon ในแผนวันนี้'},
3:{time:'07:15 ออกจากโรงแรม',label:'Universal Studios Japan',steps:[
 ['07:15 Centara → Osaka-Namba','เดิน/ขึ้น Metro ไปสถานี Osaka-Namba ให้ดูชื่อสถานีชัดเจนว่า Osaka-Namba สำหรับ Hanshin','ใช้ ICOCA'],
 ['Hanshin → Nishikujo','ขึ้น Hanshin Namba Line มุ่ง Nishikujo เช็กป้ายปลายทางขบวนก่อนขึ้น','เปลี่ยนที่ Nishikujo'],
 ['JR → Universal-City','ที่ Nishikujo เดินตามป้าย JR Yumesaki / Sakurajima Line ไป Universal-City แล้วเดินผ่าน CityWalk เข้าประตู USJ','ลง Universal-City ไม่ใช่ Sakurajima'],
 ['เวลาตั๋ว Express','เข้า Super Nintendo World ช่วง '+travelBookings.usj.nintendoEntry+' และ Harry Potter '+travelBookings.usj.harryPotterEntry+' ตามรายการที่แจ้งไว้ เปิด QR ที่ซื้อจริงเพื่อยืนยันเวลาเครื่องเล่น','ช่วงจองยืนยันจากข้อมูลที่แจ้ง'],
],note:'เวลาเปิดสวนสนุก/เวลารอ/ชานชาลาอาจเปลี่ยน ตรวจใน USJ App ตอนเช้า'},
4:{time:'06:30–21:00',label:'Arashiyama → Gion → Kodaiji Night Illumination',steps:[
 ['06:30 Centara → Daikokucho M21','เดินไป Osaka Metro Daikokucho แล้วขึ้น Midosuji ไป Umeda M16','ICOCA / Metro จ่ายแยก'],
 ['Umeda → JR Osaka → Kyoto','เดินไป JR Osaka ขึ้น JR Kyoto Line Special Rapid ไป Kyoto ตรวจจอขบวนจริง','JR Kansai WIDE Pass'],
 ['JR Kyoto → Saga-Arashiyama','ต่อ JR Sagano Line ไป Saga-Arashiyama','JR Kansai WIDE Pass'],
 ['08:20 Bamboo Grove','เดินจาก JR Saga-Arashiyama 15–20 นาที','ฟรี'],
 ['09:10 Tenryu-ji Garden','ชมสวนใบไม้แดง เข้าทางประตูเหนือหลัง 08:30','¥500/คน'],
 ['10:50 Ozuru Udon','มื้อกลางวันอุด้ง/เทมปุระ คิวเกิน 15 นาทีเลือกร้านสำรอง','¥1,000–1,800/คน'],
 ['11:50 Togetsukyo Bridge','ชมสะพาน แล้วข้ามฝั่งใต้ไป Hankyu Arashiyama HK98','เดินฟรี'],
 ['13:20–14:15 Hankyu → Gion','Arashiyama HK98 → Katsura HK81 เปลี่ยนสาย Kyoto Line → Kyoto-Kawaramachi HK86','ICOCA ไม่รวม JR Pass'],
 ['14:15 Hanamikoji / Gion','ข้าม Shijo Bridge ไปถนน Hanamikoji เคารพพื้นที่ห้ามถ่ายภาพ','เดินฟรี'],
 ['15:10 Yasaka Shrine','เดินจาก Hanamikoji ไปศาลเจ้า','ฟรี'],
 ['15:45 Maruyama Park → Nene-no-Michi','เดินไป Kodaiji เผื่อคิวช่วงใบไม้แดง','เดินฟรี'],
 ['17:00–18:15 Kodaiji Night Illumination','ชมไฟใบไม้แดง หลังเผื่อคิวเข้าวัด','ค่าเข้า ¥800/คนโดยประมาณ'],
 ['18:15–19:30 Dinner — Gion / Kawaramachi','อาหารญี่ปุ่นง่าย ๆ ตรวจน้ำซุปไม่มีเนื้อวัว','งบ ¥800–1,800/คน'],
 ['19:30–21:00 กลับ Centara','Gion-Shijo KH39 → Keihan ไป Yodoyabashi KH01 → Metro M17 ไป Daikokucho M21','ICOCA ไม่รวม JR Pass']
],note:'Full Kyoto Day 4: Arashiyama + Gion + Kodaiji Night Illumination. เผื่อรถไฟและคิวใบไม้แดง; ดูแผน Rainy / Relaxed เมื่อจำเป็น'},
5:{time:'07:40–18:00',label:'Nara Park · Todai-ji · Kasuga Taisha',steps:[
 ['07:40 ไป Osaka-Namba','จาก Centara ไป Daikokucho แล้วใช้ Midosuji ไป Namba เดินตามป้าย Kintetsu/Hanshin Osaka-Namba ไม่ใช่ JR Namba','Metro / ICOCA'],
 ['Kintetsu-Nara','ขึ้น Kintetsu Nara Line สู่ Kintetsu-Nara (บางขบวนเป็นแบบตรง ตรวจป้ายขบวน) สถานีนี้ใกล้สวนกวางกว่า JR Nara','Kintetsu / ICOCA'],
 ['09:00 Nara Park → Todai-ji','ออกสถานี Kintetsu-Nara ไป Nara Park เดินต่อไปวัด Todai-ji','เดิน / รถบัสตามอาการเมื่อย'],
 ['13:30 Kasuga Taisha / สวน','เดินต่อ Kasuga Taisha หากมีเวลาเพิ่ม Isuien หรือ Yoshikien (ตัวเลือก)','แผนยืดหยุ่น'],
 ['16:30 กลับ Osaka','ย้อนกลับ Kintetsu-Nara ไป Osaka-Namba แล้วเดิน/Metro กลับโรงแรม แพ็กกระเป๋าสำหรับ Kinosaki','ICOCA หรือ Kintetsu pass ตามที่ซื้อ'],
],note:'ใน Excel Final เลือก Kintetsu แทน JR เพราะเดินจากสถานีไป Nara Park สะดวกกว่า'},
6:{time:'08:15–12:51 (รถไฟ)',label:'Kounotori 5 ไป Kinosaki',steps:[
 ['08:15 Check-out Centara','เตรียมกระเป๋าใบเล็กค้าง 1 คืน ถามโรงแรมก่อนว่าจะฝากกระเป๋าใหญ่ข้ามคืนได้หรือไม่','เผื่อเวลาจัดกระเป๋า'],
 ['08:30 Daikokucho → Umeda','ขึ้น Osaka Metro Midosuji มุ่ง Umeda ลง Umeda แล้วเดินตามป้าย JR Osaka Station เป็นคนละระบบกับ Metro','Metro ใช้ ICOCA ไม่รวม JR Pass'],
 ['09:00–09:50 หา Platform','เข้าช่องตั๋ว JR แสดง JR-WEST Pass ตามวิธีใช้และที่นั่ง Reserved Seat ตรวจบอร์ด Kounotori 5 車両/号車/座席 ก่อนขึ้น','ห้ามเดาชานชาลาจากแผนล่วงหน้า'],
 [travelBookings.kounotori.outward.depart+' Osaka → '+travelBookings.kounotori.outward.arrive+' Kinosaki','รถ JR Limited Express Kounotori 5 ยืนยันแล้ว · Car 4 Seats 9C, 9D (2 คน) · ตรวจชานชาลาจากจอจริง','Reserved Seat จองแล้ว'],
 ['12:51 Station → Nishimuraya','ออกจากประตูสถานี Kinosaki Onsen มองหาจุด Check-in Shuttle แจ้งชื่อ Nishimuraya Hotel Shogetsutei ถามรอบรถรับส่ง','ฟรีตามเงื่อนไข/เช็กกับโรงแรม'],
 ['15:00 เป็นต้นไป','ฝากกระเป๋า/เดินเล่นก่อนเช็กอิน แล้วออนเซ็นและ Kaiseki Dinner ที่จองรวมมื้อไว้แล้ว','มื้อเย็น/เช้ายืนยัน'],
],note:'โรงแรมทราบเวลาถึง 12:51 แล้ว · ที่นั่งขาไป Car 4 Seats 9C/9D · ต้องรับพาส/ตั๋วจริงก่อนเดินทาง'},
7:{time:'Kounotori 22 · 15:30–18:21',label:'Kinosaki → Osaka',steps:[
 ['เช้า Nishimuraya','ทานอาหารเช้าที่รวมในห้องพัก แช่ออนเซ็นหรือเดินเล่นถ้ามีเวลา','กิจกรรมยืดหยุ่น'],
 ['Check-out / รถ Shuttle','แจ้ง Reception ขอรอบ Shuttle ให้ถึงสถานีก่อนรถ Kounotori 22 ออก 15:30 ราว 20–30 นาที','ยืนยันรอบกับโรงแรม'],
 [travelBookings.kounotori.return.depart+' Kinosaki → '+travelBookings.kounotori.return.arrive+' Osaka','ขึ้น Kounotori 22 ตาม Reserved Seat ที่ยืนยัน · Car 7 Seats 8C และ 8D · ตรวจชานชาลาและหมายเลขตู้จากบอร์ดสถานี','ที่นั่งยืนยันแล้ว 2 คน'],
 ['Osaka Station → Centara','เดินตามป้าย Metro Umeda ขึ้น Midosuji ลง Daikokucho แล้วเดินเข้าโรงแรม คืนสุดท้าย','ICOCA / Metro'],
 ['ค่ำ Namba / Shinsaibashi','ช้อปปิงเก็บตกตามแรงและเวลา นอนพักก่อนวันกลับ','ตามสะดวก'],
],note:'23 พ.ย. เป็นวันหยุดญี่ปุ่น · ขากลับ Kounotori 22 จองที่นั่งแล้ว ควรเผื่อเวลาที่สถานี'},
8:{time:'บิน 19:45 JST',label:'Namba → KIX → Bangkok',steps:[
 ['เช้า / เที่ยง Namba','ทาน Breakfast ที่ Centara เช็กเอาต์ตามเวลาโรงแรม ฝากกระเป๋าไว้หากออกไปเดินเล่นใกล้ ๆ','อย่าออกเที่ยวไกล'],
 ['14:30–15:00 กลับมารับกระเป๋า','ตั้งเป้าออกจากโรงแรมประมาณ 15:00 เพื่อเผื่อเวลารถไฟและสนามบิน','เวลาแนะนำที่ปรับตาม PDF'],
 ['Nankai Namba → Kansai-airport','จากโรงแรมเดินหรือแท็กซี่ไป Nankai Namba ไปฝั่ง Nankai ไม่ใช่ JR Namba ใช้ Airport Express หรือ Rapi:t แบบจองที่นั่ง','Nankai จ่ายแยกจาก JR Pass'],
 ['16:45 เป้าหมายถึง KIX T1','ออกสถานีสนามบินตามป้าย Terminal 1 Departures เช็กจอ AirAsia X รอยืนยันหมายเลขเที่ยวบิน เช็กอิน โหลด 20 กก./คน ผ่าน Security และ Immigration','ควรถึงก่อนบิน ~3 ชั่วโมง'],
 [localClock(travelBookings.flights.inbound.departure)+' KIX T1 → DMK T1','เที่ยวบิน '+flightNumberLabel(travelBookings.flights.inbound)+' ขาออกจากญี่ปุ่นเวลา '+localClock(travelBookings.flights.inbound.departure),'เวลาจากข้อมูลล่าสุดของผู้เดินทาง'],
 [localClock(travelBookings.flights.inbound.arrival)+' วันที่ 25 พ.ย.','ถึงดอนเมือง Terminal 1 เวลาไทยหลังเที่ยงคืน เตรียมรถกลับบ้านสำหรับวันที่ 25','เวลาตามข้อมูลที่ได้รับ; ตรวจเอกสารต้นฉบับอีกครั้ง'],
],note:'ยึดข้อมูลเวลา AirAsia ล่าสุดจากผู้เดินทาง; หมายเลขเที่ยวบินขากลับยังต้องยืนยันเอกสารต้นฉบับ'},
};
