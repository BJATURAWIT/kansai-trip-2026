// Navigation hints for EVERY daily travel leg, including alternatives.
// Static orientation, not live platform assignments. Never guess an unverified exit number.
const stations=[
 {re:/Daikokucho/i,enter:'Osaka Metro Daikokucho (M21 / Y16): หา Midosuji สีแดงและทิศรถจากจอสถานี',exit:'ออกประตู Metro โดยแตะ ICOCA แล้วเดินตาม Google Maps ไป Centara; ตรวจหมายเลขทางออกที่ใกล้จุดหมายบนแผนผังสถานี'},
 {re:/Umeda Station|Umeda \(M16\)|Umeda M16/i,enter:'Osaka Metro Umeda (M16): ตามป้าย Midosuji สีแดง; ถ้าต่อ JR ให้ตามป้าย JR Osaka / JR線 ทางเชื่อม Exit 8',exit:'ถ้าลง Metro Umeda แตะ ICOCA ออก; เปลี่ยน JR ต้องผ่านประตูตรวจตั๋ว JR ใหม่'},
 {re:/JR Osaka|Osaka Station/i,enter:'JR Osaka: ใช้ Central / South / Midosuji Gate ที่ใกล้ที่สุด สอด Kansai WIDE Pass (ถ้าอยู่ในวันใช้ได้) และหยิบบัตรคืน',exit:'ลง JR Osaka แล้วออก JR gate เพื่อเปลี่ยนเป็น Metro Umeda (แตะ ICOCA แยก) หรือออกทางฝั่งปลายทางตามป้าย'},
 {re:/JR Kyoto|Kyoto Station/i,enter:'JR Kyoto: ดูป้ายสายรถและชานชาลาจาก Departure Board; เปลี่ยน JR Line ภายในประตูโดยไม่ต้องสอดบัตรใหม่',exit:'ถ้าต่อ JR สายอื่นไม่ต้องออกประตู; หากเปลี่ยนเป็น Kyoto City Bus ต้องออก JR gate และไป Bus Terminal'},
 {re:/Saga-Arashiyama/i,enter:'JR Saga-Arashiyama: เข้าประตู JR ด้วย Kansai WIDE Pass และหยิบบัตรคืน แล้วขึ้น Sagano Line มุ่ง Kyoto',exit:'ออกประตู JR ด้วย Pass แล้วหยิบบัตรคืน → South Exit (南口) เดินตามป้าย Tenryu-ji / Bamboo Grove'},
 {re:/Hankyu Arashiyama/i,enter:'Hankyu Arashiyama (HK98): แตะ ICOCA เข้าประตู Hankyu (JR Pass ใช้ไม่ได้) และขึ้น Arashiyama Line มุ่ง Katsura',exit:'ออกจาก Hankyu Arashiyama ตามป้ายสะพาน Togetsukyo; ไม่ใช่ JR Saga-Arashiyama'},
 {re:/Katsura/i,enter:'Katsura (HK81): เปลี่ยน Hankyu Arashiyama Line ↔ Kyoto Line ภายในระบบ ไม่ต้องแตะ ICOCA ออก',exit:'ตรวจป้าย Kyoto-Kawaramachi หรือ Arashiyama ให้ตรงขบวน'},
 {re:/Kyoto-Kawaramachi/i,enter:'Hankyu Kyoto-Kawaramachi (HK86): ใช้ ICOCA แตะเข้า Hankyu ตรวจขบวน Kyoto Line มุ่ง Katsura/Osaka',exit:'แตะ ICOCA ออก Hankyu → ตามป้าย Shijo-dori / Shijo Bridge เพื่อไป Gion หรือร้านค้า; ตรวจหมายเลขทางออกจากแผนผังจริง'},
 {re:/Gion-Shijo/i,enter:'Keihan Gion-Shijo (KH39): แตะ ICOCA เข้าระบบ Keihan ขึ้นฝั่งมุ่ง Osaka / Yodoyabashi',exit:'ออก Keihan Gion-Shijo ด้วย ICOCA; ไป Gion/Hanamikoji ให้ตามป้าย Shijo-dori และเช็กทางออกในสถานี'},
 {re:/Yodoyabashi/i,enter:'Yodoyabashi: เช็กก่อนว่าเป็น Keihan หรือ Osaka Metro (M17); ย้ายระบบต้องออกประตูเดิมแล้วแตะ ICOCA เข้าระบบใหม่',exit:'Keihan Yodoyabashi → Osaka Metro Midosuji (M17) ตามป้าย Metro แล้วแตะ ICOCA เข้าอีกครั้ง'},
 {re:/Nankai Namba/i,enter:'Nankai Namba: มองหาป้าย Nankai Railway / Kansai Airport; ไม่ใช่ Osaka-Namba ของ Hanshin/Kintetsu',exit:'ออกประตู Nankai แล้วเดินไปทางโรงแรมด้วย Google Maps; อย่าออกไป JR Namba โดยผิดสถานี'},
 {re:/Osaka-Namba/i,enter:'Osaka-Namba: ตรวจป้าย Hanshin / Kintetsu แยกจาก Nankai Namba และ Osaka Metro Namba ก่อนแตะ ICOCA',exit:'ออกประตู Hanshin/Kintetsu ด้วย ICOCA แล้วเดินตามป้าย Osaka Metro Namba หรือทางออกถนนที่ต้องการ'},
 {re:/Namba/i,enter:'Namba: ตรวจชื่อผู้ให้บริการ (Osaka Metro / Nankai / Hanshin-Kintetsu / JR) ให้ตรงก่อนเข้า; สลับบริษัทต้องแตะออกและเข้าใหม่',exit:'แตะออกประตูของระบบที่เดินทางมา แล้วดูแผนผังทางออกของบริษัทนั้น; Namba มีหลายสถานีเชื่อมกัน'},
 {re:/Nishikujo/i,enter:'Nishikujo: Hanshin Namba Line และ JR Yumesaki Line อยู่คนละระบบ; เปลี่ยนต้องออกประตูแรกและแตะ ICOCA เข้าระบบที่สอง',exit:'ไป USJ ตามป้าย JR Yumesaki / Sakurajima Line; กลับ Namba ตามป้าย Hanshin Namba Line มุ่ง Osaka-Namba'},
 {re:/Universal-City/i,enter:'JR Universal-City: เข้า JR Yumesaki Line ที่มุ่ง Nishikujo / Osaka; ใช้ ICOCA ในวันที่ JR Pass ยังไม่เริ่ม',exit:'ลง Universal-City แล้วแตะ ICOCA ออก JR → เดินผ่าน Universal CityWalk ตามป้ายทางเข้า USJ'},
 {re:/Hommachi/i,enter:'Hommachi (M18/C16): เปลี่ยน Midosuji สีแดง ↔ Chuo สีเขียวภายในประตู Metro ไม่ต้องแตะ ICOCA ออก',exit:'ถ้าต่อรถใน Metro ให้ตามสีสายและเลขสถานี; หากออกสู่ถนนค่อยแตะ ICOCA ออก'},
 {re:/Morinomiya/i,enter:'Morinomiya: ตรวจว่าขึ้น Chuo (C19) หรือ Nagahori Tsurumi-ryokuchi (N20) และทิศทางบนป้าย',exit:'ไป Osaka Castle ให้แตะออก Metro แล้วตามป้าย Osaka Castle Park / 大阪城公園 พร้อม Google Maps ไปตัวปราสาท'},
 {re:/Shinsaibashi/i,enter:'Shinsaibashi: เปลี่ยน Midosuji (M19) ↔ Nagahori Tsurumi-ryokuchi (N15) ภายในประตู Metro',exit:'ขึ้นถนน Shinsaibashi-suji / Midosuji ตามป้ายทางออกและตรวจเลขจากแผนผังจริง'},
 {re:/Kinosaki Onsen/i,enter:'Kinosaki Onsen JR: สอด Kansai WIDE Pass ผ่านประตูและหยิบบัตรคืน ตรวจ Kounotori บนบอร์ดจริง',exit:'ลง Kinosaki Onsen ออกประตู JR แล้วไปจุด Ryokan Shuttle / Sozoro Check-in Center ตามป้าย'},
 {re:/Kansai-airport|Kansai Airport/i,enter:'Kansai-airport: ตรวจว่าขึ้น JR หรือ Nankai ตามตั๋ว; Nankai Rapi:t Digital Ticket ใช้ QR สดที่ประตูรองรับ ไม่ใช้ ICOCA จ่ายซ้ำ',exit:'เดินตามป้าย Terminal 1 / Railway หรือ International Departures ตามทิศทางเดินทาง'},
 {re:/Uji/i,enter:'JR Uji: ตรวจป้าย JR Nara Line / Kyoto / Nara และขบวนที่จอด Uji (ไม่ใช่ Keihan Uji)',exit:'ออกประตู JR และหยิบ JR Pass คืน แล้วตามป้าย Byodo-in / Byodoin Omotesando'},
 {re:/JR Nara/i,enter:'JR Nara: ใช้ JR Kansai WIDE Pass ภายในวันใช้ได้; เลือก JR Nara Line หรือ Yamatoji Line จากป้ายจริง',exit:'ลง JR Nara ออก JR gate ด้วย Pass และหยิบบัตรคืน; ไป Nara Park ตามทาง Sanjo-dori / ตัวเลือกบัสท้องถิ่น'},
 {re:/Kintetsu-Nara/i,enter:'Kintetsu-Nara: แตะ ICOCA เข้าระบบ Kintetsu ไม่ครอบคลุมโดย JR Pass',exit:'ออก Kintetsu-Nara แล้วตามป้าย Nara Park / Higashimuki; ทางออกเลขจริงดูแผนผังสถานี'},
 {re:/Tennoji/i,enter:'Tennoji: JR กับ Osaka Metro คนละประตู; หากเปลี่ยน JR ↔ Midosuji (M23) ให้สอด Pass ออก JR แล้วแตะ ICOCA เข้า Metro',exit:'ลง Tennoji แล้วตามป้ายระบบที่จะต่อ; เปลี่ยน JR และ Metro ต้องผ่านด่านตรวจตั๋วทั้งสองแห่ง'},
 {re:/Inari/i,enter:'JR Inari: JR Nara Line จาก Kyoto; ไม่ใช่สถานี Fushimi-Inari ของ Keihan',exit:'ออก JR Inari ด้วย Pass และหยิบบัตรคืน → เดินสู่ทางเข้าศาลเจ้า Fushimi Inari Taisha'},
 {re:/Tanimachi 9-chome/i,enter:'Tanimachi 9-chome (S18): ขึ้น Osaka Metro Sennichimae Line ตามทิศขบวนบนจอ',exit:'ออก Metro แล้วเลือกทางออกที่ใกล้ร้านเป้าหมายจากแผนผังจริง'},
 {re:/Nippombashi/i,enter:'Nippombashi: ตรวจว่า Osaka Metro Sakaisuji / Sennichimae หรือ Kintetsu-Nippombashi',exit:'เลือกทางออกไป Namba / Kuromon ตามป้ายและ Google Maps; ตรวจเลขทางออกในสถานี'},
 {re:/Tenjimbashisuji/i,enter:'Tenjimbashisuji 6-chome: ตรวจสาย Tanimachi (T18) กับ Sakaisuji (K11) และทิศทางก่อนขึ้น',exit:'ออกตามป้าย Osaka Museum of Housing and Living หากจะเข้าพิพิธภัณฑ์'}
];
const findStation=s=>stations.find(x=>x.re.test(String(s||'')));
const isRail=mode=>/JR|Metro|Hankyu|Hanshin|Keihan|Kintetsu|Nankai|Line|รถไฟ|Limited Express|Rapi:t|HARUKA/i.test(mode);
const isBus=mode=>/Bus|รถบัส|รถรับส่ง|Shuttle/i.test(mode);
export function addNavigationDetails(item){
 const start=findStation(item.from),end=findStation(item.to);
 const rail=isRail(item.mode),bus=isBus(item.mode);
 const walking=!rail&&!bus && item.icon==='walk';
 const intermediate=(item.steps||[]).slice(1,-1).map(s=>s.station).filter(Boolean);
 let check='';
 if(rail)check='หมายเลขชานชาลาและเที่ยวรถอาจเปลี่ยน ให้ดู Departure Board / ป้ายปลายทาง ณ สถานีจริงก่อนขึ้น; ไม่แสดงเวลารถแบบเรียลไทม์';
 else if(bus)check='ตรวจจุดจอด หมายเลขสายและรอบรถจากป้ายจริงก่อนขึ้น; รถบัส/รถรับส่งบางประเภทไม่รวมใน JR Pass';
 else if(walking)check='ใช้ Google Maps โหมดเดินประกอบ และดูป้ายทางออกหรือทางเข้าจริง; ไม่มีด่านตรวจตั๋วเมื่อเดินบนถนน';
 else check='ยืนยันทางเข้า/ออกและเงื่อนไขการเดินทางจากป้ายจริง';
 const gate=/Kansai WIDE|JR Pass/i.test(item.pay)?'ใช้บัตร JR Pass แบบกระดาษกับประตู JR แล้วหยิบบัตรคืน; Metro/รถไฟเอกชนจ่ายแยก':/ICOCA/i.test(item.pay)?'ใช้ ICOCA ผ่านประตูของผู้ให้บริการ; ถ้าเปลี่ยนบริษัทต้องแตะออกและเข้าใหม่':'ตรวจชนิดตั๋ว/QR ตามที่ระบุในขั้นตอนนี้; ไม่ใช้บัตร JR Pass กับผู้ให้บริการที่ไม่ครอบคลุม';
 return {...item,navigation:{
  board:start?.enter || (walking?'เริ่มเดินจากจุดต้นทางตามทางเท้า/ป้ายสาธารณะและ Google Maps':bus?'ตรวจจุดขึ้นรถและรอบที่จอง/ป้ายรถให้ตรงก่อนขึ้น':'ดูป้ายชื่อผู้ให้บริการและปลายทางบนจอก่อนผ่านประตู'),
  platform:rail?'ชานชาลา: ตรวจเลขจริงจากจอ/ป้ายของผู้ให้บริการ (หากมีเลขแนะนำอยู่ในขั้นตอน ให้ยึดจอจริงเป็นหลัก)':bus?'จุดขึ้นรถ: ตรวจป้าย/จุดนัดรับจริง':'เส้นทางเดิน: ตามป้ายคนเดิน/Google Maps',
  transfer:intermediate.length?'จุดระหว่างทาง: '+intermediate.join(' → ')+' · อ่านขั้นตอนแต่ละจุดด้านล่าง':walking?'ไม่มีการเปลี่ยนรถในช่วงเดินนี้':'ถ้าต้องเปลี่ยนสาย ให้ตรวจว่าภายในหรือนอกประตูตรวจตั๋วตามขั้นตอนด้านล่าง',
  exit:end?.exit || (walking?'ถึงปลายทางให้หาทางเข้าที่ระบุไว้ใน Google Maps/ป้ายจริง; เลือกทางออกสถานีจากแผนผังหากต้นทางอยู่ใต้ดิน':bus?'ลงจุดจอดที่ระบุ แล้วดูป้ายทางเข้า/จุดนัดหมาย':'ลงที่ปลายทางตามป้าย แล้วดูทางออกในแผนผังสถานีก่อนผ่านประตู'),
  ticket:walking?'เดินไม่ต้องผ่านด่านตั๋ว (ยกเว้นเข้าพื้นที่กิจกรรมที่มีค่าเข้า)':gate,
  caution:check
 }};
}
