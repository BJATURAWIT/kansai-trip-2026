// Based on user-provided 'Osaka Final(1).xlsx' itinerary and transit detail tabs,
// with user airline confirmation PDF superseding the older flight times in the workbook.
// Timed sightseeing entries are planning windows, not reserved slots.
export const beginnerDayGuide = {
1:{time:'10:40 ไทย / 18:15 ญี่ปุ่น',label:'ลงเครื่องแล้วเข้าตัวเมือง',steps:[
 ['DMK Terminal 1','ถึงสนามบินประมาณ 07:40 ตามเวลาไทย (เผื่อ 3 ชั่วโมง) ไปเคาน์เตอร์ Thai AirAsia X เที่ยวบิน XJ610 โหลดกระเป๋าไม่เกิน 20 กก./คน แล้วผ่าน ตม.','เที่ยวบินยืนยัน'],
 ['KIX Terminal 1 · 18:15','ลงเครื่องตามป้าย Arrivals → Immigration → Baggage Claim → Customs เตรียมหนังสือเดินทางและเอกสารเข้าเมือง','เวลาจองยืนยัน'],
 ['Kansai-airport Station','ออก T1 ขึ้นทางเชื่อมชั้น 2 ตามป้าย Railway เลือก Nankai ไม่ใช่ JR ซื้อตั๋ว Rapi:t แบบ Reserved Seat หรือใช้ ICOCA กับ Airport Express','รถไฟจ่ายแยก JR Pass'],
 ['Nankai Namba → โรงแรม','ลง Nankai Namba เปิด Google Maps ไป Centara Life Namba; ถ้ามีกระเป๋าใหญ่แนะนำแท็กซี่ระยะสั้นจากสถานี ไม่ต้องลากกระเป๋าไกล','เส้นทางแนะนำ'],
],note:'Excel เดิมใช้เวลาเครื่องถึง 19:30 แต่ PDF ยืนยัน 18:15 เวลารถไฟหลัง ตม. ต้องเลือกหน้างาน'},
2:{time:'08:30–19:00',label:'Osaka Castle · Kuromon · Umeda',steps:[
 ['08:30 Osaka Castle','เดินจาก Centara ไป Daikokucho (Osaka Metro) นั่ง Midosuji Line มุ่ง Umeda ลง Hommachi เปลี่ยน Chuo Line ไป Morinomiya แล้วเดินเข้าปราสาท','Metro / ICOCA หรือ Enjoy Eco Card'],
 ['12:00 Kuromon Market','จากย่าน Osaka Castle ใช้ Metro มาย่าน Nippombashi แล้วเดินไป Kuromon Market สำหรับมื้อกลางวัน','Metro / เดิน'],
 ['14:00 Shinsaibashi / Namba','จาก Kuromon เดินหรือขึ้น Metro ต่อไปช้อปปิงย่าน Namba และ Shinsaibashi','เดิน / Metro'],
 ['16:30 Umeda Sky Building','ไป Umeda ด้วย Midosuji Line แล้วเดินจากสถานีไป Umeda Sky Building เผื่อเดิน 10–20 นาที; กลับ Daikokucho ด้วย Midosuji Line','เที่ยวชมช่วงเย็น แผนไม่ใช่ตั๋ว'],
],note:'แผน Final เพิ่ม Kuromon และ Umeda Sky Building; วันเดินทางหลายเที่ยวพิจารณา Enjoy Eco Card'},
3:{time:'07:15 ออกจากโรงแรม',label:'Universal Studios Japan',steps:[
 ['07:15 Centara → Osaka-Namba','เดิน/ขึ้น Metro ไปสถานี Osaka-Namba ให้ดูชื่อสถานีชัดเจนว่า Osaka-Namba สำหรับ Hanshin','ใช้ ICOCA'],
 ['Hanshin → Nishikujo','ขึ้น Hanshin Namba Line มุ่ง Nishikujo เช็กป้ายปลายทางขบวนก่อนขึ้น','เปลี่ยนที่ Nishikujo'],
 ['JR → Universal-City','ที่ Nishikujo เดินตามป้าย JR Yumesaki / Sakurajima Line ไป Universal-City แล้วเดินผ่าน CityWalk เข้าประตู USJ','ลง Universal-City ไม่ใช่ Sakurajima'],
 ['เวลาตั๋ว Express','เข้า Super Nintendo World ช่วง 13:50 และ Harry Potter 16:00 ตามรายการที่แจ้งไว้ เปิด QR ที่ซื้อจริงเพื่อยืนยันเวลาเครื่องเล่น','ช่วงจองยืนยันจากข้อมูลที่แจ้ง'],
],note:'เวลาเปิดสวนสนุก/เวลารอ/ชานชาลาอาจเปลี่ยน ตรวจใน USJ App ตอนเช้า'},
4:{time:'06:15–19:30',label:'Arashiyama Bamboo Grove · Tenryu-ji · Kyoto East',steps:[
 ['06:15 Centara → JR Osaka','เดินจากโรงแรมไป Daikokucho ขึ้น Midosuji Line ถึง Umeda แล้วตามป้าย JR Osaka','Metro / ICOCA'],
 ['JR Osaka → Kyoto → Saga-Arashiyama','ขึ้น JR Special Rapid ไป Kyoto แล้วต่อ JR Sagano Line ไป Saga-Arashiyama','JR Pass ถ้าเปิดใช้แล้ว'],
 ['08:15 ป่าไผ่อาราชิยามะ','เดินจากสถานีประมาณ 15–20 นาที ไปถ่ายรูปป่าไผ่ยามเช้าก่อนคนเยอะ','เข้าฟรี'],
 ['09:00 วัดเทนริวจิ','เดินจากป่าไผ่ไป Tenryu-ji สวนวัดเปิดตามเวลาที่กำหนด ตรวจราคาค่าเข้า','ค่าเข้าจ่ายแยก'],
 ['10:15 ไป Fushimi Inari','กลับ JR Saga-Arashiyama → Kyoto → JR Nara Line ขบวน Local ลง Inari พักทานอาหารกลางวัน','JR Pass'],
 ['12:15 Fushimi Inari','ถ่ายรูปอุโมงค์โทริอิ ไม่เดินขึ้นภูเขาลึก','เดิน'],
 ['14:15 Kiyomizu-dera','Keihan Fushimi-Inari → Kiyomizu-Gojo แล้วเดินขึ้นเนินหรือใช้แท็กซี่ ก่อนเดิน Sannenzaka/Ninenzaka','Keihan / ICOCA'],
 ['16:30 Gion → Osaka','เดินเที่ยว Gion แล้วกลับด้วย Keihan Gion-Shijo ไป Yodoyabashi ต่อ Metro ไป Daikokucho','ICOCA'],
],note:'วันนี้เที่ยวทั้ง Kyoto West และ East ค่อนข้างแน่น ถ้าเหนื่อยให้ตัดบางจุดฝั่งตะวันออก; Tofukuji เป็นทางเลือกไม่ใช่จุดหลัก'},
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
 ['10:12 Osaka → 12:51 Kinosaki','รถ JR Limited Express Kounotori 5 ยืนยันแล้ว · Car 4 Seats 9C, 9D (2 คน) · ตรวจชานชาลาจากจอจริง','Reserved Seat จองแล้ว'],
 ['12:51 Station → Nishimuraya','ออกจากประตูสถานี Kinosaki Onsen มองหาจุด Check-in Shuttle แจ้งชื่อ Nishimuraya Hotel Shogetsutei ถามรอบรถรับส่ง','ฟรีตามเงื่อนไข/เช็กกับโรงแรม'],
 ['15:00 เป็นต้นไป','ฝากกระเป๋า/เดินเล่นก่อนเช็กอิน แล้วออนเซ็นและ Kaiseki Dinner ที่จองรวมมื้อไว้แล้ว','มื้อเย็น/เช้ายืนยัน'],
],note:'โรงแรมทราบเวลาถึง 12:51 แล้ว · ที่นั่งขาไป Car 4 Seats 9C/9D · ต้องรับพาส/ตั๋วจริงก่อนเดินทาง'},
7:{time:'Kounotori 22 · 15:30–18:21',label:'Kinosaki → Osaka',steps:[
 ['เช้า Nishimuraya','ทานอาหารเช้าที่รวมในห้องพัก แช่ออนเซ็นหรือเดินเล่นถ้ามีเวลา','กิจกรรมยืดหยุ่น'],
 ['Check-out / รถ Shuttle','แจ้ง Reception ขอรอบ Shuttle ให้ถึงสถานีก่อนรถ Kounotori 22 ออก 15:30 ราว 20–30 นาที','ยืนยันรอบกับโรงแรม'],
 ['15:30 Kinosaki → 18:21 Osaka','ขึ้น Kounotori 22 ตาม Reserved Seat ที่ยืนยัน · Car 7 Seats 8C และ 8D · ตรวจชานชาลาและหมายเลขตู้จากบอร์ดสถานี','ที่นั่งยืนยันแล้ว 2 คน'],
 ['Osaka Station → Centara','เดินตามป้าย Metro Umeda ขึ้น Midosuji ลง Daikokucho แล้วเดินเข้าโรงแรม คืนสุดท้าย','ICOCA / Metro'],
 ['ค่ำ Namba / Shinsaibashi','ช้อปปิงเก็บตกตามแรงและเวลา นอนพักก่อนวันกลับ','ตามสะดวก'],
],note:'23 พ.ย. เป็นวันหยุดญี่ปุ่น · ขากลับ Kounotori 22 จองที่นั่งแล้ว ควรเผื่อเวลาที่สถานี'},
8:{time:'บิน 19:45 JST',label:'Namba → KIX → Bangkok',steps:[
 ['เช้า / เที่ยง Namba','ทาน Breakfast ที่ Centara เช็กเอาต์ตามเวลาโรงแรม ฝากกระเป๋าไว้หากออกไปเดินเล่นใกล้ ๆ','อย่าออกเที่ยวไกล'],
 ['14:30–15:00 กลับมารับกระเป๋า','ตั้งเป้าออกจากโรงแรมประมาณ 15:00 เพื่อเผื่อเวลารถไฟและสนามบิน','เวลาแนะนำที่ปรับตาม PDF'],
 ['Nankai Namba → Kansai-airport','จากโรงแรมเดินหรือแท็กซี่ไป Nankai Namba ไปฝั่ง Nankai ไม่ใช่ JR Namba ใช้ Airport Express หรือ Rapi:t แบบจองที่นั่ง','Nankai จ่ายแยกจาก JR Pass'],
 ['16:45 เป้าหมายถึง KIX T1','ออกสถานีสนามบินตามป้าย Terminal 1 Departures เช็กจอ AirAsia X XJ611 เช็กอิน โหลด 20 กก./คน ผ่าน Security และ Immigration','ควรถึงก่อนบิน ~3 ชั่วโมง'],
 ['19:45 KIX T1 → DMK T1','เที่ยวบิน XJ611 ขาออกจากญี่ปุ่นเวลา 19:45','ยืนยันจาก PDF'],
 ['00:15 วันที่ 25 พ.ย.','ถึงดอนเมือง Terminal 1 เวลาไทยหลังเที่ยงคืน เตรียมรถกลับบ้านสำหรับวันที่ 25','ยืนยันจาก PDF'],
],note:'ไฟล์ Excel ยังอ้าง XJ615 17:15; ใช้ PDF AirAsia ที่แนบล่าสุดเป็นหลัก'},
};
