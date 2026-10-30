import {travelBookings,flightNumberLabel} from './centralTravel.js';

// Human-readable routing instructions, not live train schedules.
// Platforms, actual departures and possible service disruptions must be checked on travel day.
// Each leg has its own payment instructions and step-by-step station / transfer directions.
// Trip mode, Kyoto East/West and airport return choices are resolved in one place.
const HOME='Centara Life Namba Hotel Osaka';
const OSAKA='JR Osaka Station';
const DAI='Daikokucho Station (M21 / Y16)';
const KYOTO='JR Kyoto Station';
const SAGA='JR Saga-Arashiyama Station';
const KINO='JR Kinosaki Onsen Station';
const RYOKAN='Nishimuraya Hotel Shogetsutei';
const KIX='Kansai Airport Terminal 1';
const NANKAI='Nankai Namba Station';

const at=(station,detail,extra={})=>({station,detail,...extra});
const leg=(from,to,mode,pay,steps,options={})=>({
 from,to,mode,pay,steps,icon:mode==='เดิน'?'walk':mode==='รถรับส่ง'?'bus':mode==='เครื่องบิน'?'plane':'train',
 line:from+' → '+to,duration:options.duration||'ตรวจเวลาจริง',how:options.note||'ดูป้ายสถานีและข้อมูลรถรอบจริงก่อนเดินทาง',
 note:options.note||'',mapMode:mode==='เดิน'?'walking':'transit',...options
});
const walk=(from,to,desc,duration='เดินตามแผนที่')=>leg(from,to,'เดิน','ไม่ต้องใช้บัตร · ฟรี',[
 at(from,desc),at(to,'ถึงปลายทางแล้ว ตรวจทางเข้า/เวลาเปิดตามแผนที่')],{duration});
const daikokuWalk=()=>walk(HOME,DAI,'ออกจาก Centara เดินตาม Google Maps ไป Osaka Metro Daikokucho (อย่าเข้า Nankai Namba)', 'ประมาณ 5–10 นาที');
const daikokuHome=()=>walk(DAI,HOME,'ออกจากประตู Metro แล้วเดินกลับ Centara ตาม Google Maps','ประมาณ 5–10 นาที');
const daikokuUmeda=()=>leg(DAI,'JR Osaka Station','Osaka Metro + เดิน','ICOCA แตะเข้า Daikokucho / ออก Umeda; JR Pass ไม่ครอบคลุม Metro',[
 at('Daikokucho (M21)','แตะ ICOCA เข้า Osaka Metro สาย Midosuji สีแดง เลือกรถมุ่งเหนือไป Minoh-kayano / Shin-Osaka (ผ่าน Namba)'),
 at('Umeda (M16)','ลงที่ Umeda (M16) แล้วแตะ ICOCA ออกประตู Metro'),
 at('JR Osaka Station','เดินตามป้าย JR Osaka (JR線); เป็นคนละสถานีกับ Osaka Metro Umeda ตรวจชานชาลาขบวน JR ที่จะขึ้นจากจอ')],{duration:'เผื่อ 25–40 นาทีรวมเดิน'});
const osakaDaikoku=()=>leg('JR Osaka Station',DAI,'เดิน + Osaka Metro','แตะ ICOCA เข้า Umeda / ออก Daikokucho; ไม่ใช้ JR Pass กับ Metro',[
 at('JR Osaka Station','ออกจาก JR แล้วเดินตามป้าย Osaka Metro / Midosuji Line → Umeda (M16)'),
 at('Umeda (M16)','แตะ ICOCA เข้า Midosuji สีแดง เลือกขบวนมุ่งใต้ไป Nakamozu / Tennoji'),
 at('Daikokucho (M21)','ลง Daikokucho (M21) แตะออก แล้วเดินกลับโรงแรม')],{duration:'เผื่อ 25–40 นาทีรวมเดิน'});
const kyotoJR=()=>leg(OSAKA,SAGA,'JR Kyoto Line + JR Sagano Line','JR Kansai WIDE Area Pass วันที่ 20–24 พ.ย. (ต้องรับพาสก่อนใช้)',[
 at('JR Osaka','ผ่านประตู JR ด้วยพาสที่รับแล้ว ขึ้น Special Rapid / Rapid ไป Kyoto ตรวจรถที่จอด Kyoto และชานชาลาจริง'),
 at('JR Kyoto','ลง Kyoto แล้วเปลี่ยนเป็น JR Sagano Line / San-in Line มุ่ง Sonobe / Kameoka (ดูป้าย Saga-Arashiyama) โดยไม่ออกจากประตู JR'),
 at('JR Saga-Arashiyama','ลง Saga-Arashiyama ตรวจป้ายทางออกหลัก เตรียมเดินไปป่าไผ่')],{duration:'ประมาณ 60–80 นาทีรวมเปลี่ยนขบวน'});
const sagaOsaka=()=>leg(SAGA,OSAKA,'JR Sagano Line + JR Kyoto Line','JR Kansai WIDE Area Pass · ไม่ต้องจ่ายค่า JR ซ้ำ',[
 at('JR Saga-Arashiyama','ใช้พาสผ่านประตู JR ขึ้น Sagano Line มุ่ง Kyoto'),
 at('JR Kyoto','เปลี่ยนเป็น Special Rapid / Rapid สาย JR Kyoto Line ไป Osaka / Kobe (ยืนยันว่าขบวนจอด Osaka)'),
 at('JR Osaka','ลง Osaka แล้วเดินตามป้าย Metro Umeda หากกลับโรงแรม')],{duration:'เผื่อ 60–80 นาทีรวมรอ/เปลี่ยนรถ'});
const sunset=()=>leg('Umeda Sky Building','Sky Lounge STARDUST 39F','เดิน','ไม่ใช้ตั๋วรถไฟ · การจองร้านยืนยันแล้ว',[
 at('Umeda Sky Building','หลังชมวิว ลงจากจุดชมวิวตามป้ายทางออก/Restaurant'),
 at('Tower East ชั้น 39','ตามป้าย Sky Lounge STARDUST; แสดงหลักฐานยืนยันการจองให้พนักงาน')],{duration:'อยู่ภายในอาคารเดียวกัน',note:'เวลา 18:15 เป็นแผน ไม่ใช่เวลาการจองที่ยืนยันจากเอกสาร; ไม่เปิดเผยรายละเอียดโอกาสส่วนตัว'});
const umedaSky=()=>leg('Shinsaibashi Station (M19)','Umeda Sky Building','Osaka Metro + เดิน','ICOCA แตะเข้า Shinsaibashi / ออก Umeda',[
 at('Shinsaibashi (M19)','แตะ ICOCA เข้า Midosuji สีแดง ขึ้นรถมุ่งเหนือ Shin-Osaka / Minoh-kayano'),
 at('Umeda (M16)','ลง Umeda แล้วแตะออก Metro เดินตามป้าย Grand Front Osaka / Umeda Sky Building'),
 at('Umeda Sky Building','เดินต่อประมาณ 10–20 นาทีตาม Google Maps ไปอาคารจุดชมวิว เผื่อเวลาเข้าคิว')],{duration:'เผื่อ 30–45 นาทีรวมเดิน'});
const skyReturn=()=>leg('Umeda Sky Building',DAI,'เดิน + Osaka Metro','ICOCA แตะเข้า Umeda / ออก Daikokucho',[
 at('Umeda Sky Building','เดินกลับ Osaka Metro Umeda (M16) ไม่ใช่ JR Osaka'),
 at('Umeda (M16)','ขึ้น Midosuji สีแดง มุ่งใต้ Nakamozu / Tennoji'),
 at('Daikokucho (M21)','ลง Daikokucho แตะออก แล้วเดินกลับโรงแรม')],{duration:'เผื่อ 30–45 นาที'});
const usjOut=()=>[
 daikokuWalk(),
 leg(DAI,'Osaka-Namba Station (Hanshin / Kintetsu)','Osaka Metro + เดินเชื่อมสถานี','ICOCA แตะเข้า Daikokucho / ออก Namba; เตรียมแตะเข้า Hanshin อีกครั้ง',[
 at('Daikokucho (M21)','ขึ้น Midosuji สีแดง มุ่งเหนือ ไป Namba 1 สถานี'),
 at('Namba (M20)','ลงแล้วแตะออก Osaka Metro เดินตามป้าย Hanshin / Kintetsu Osaka-Namba (ไม่ใช่ Nankai Namba หรือ JR Namba)'),
 at('Osaka-Namba','ถึงประตูรถไฟเอกชน เตรียมแตะ ICOCA เข้า Hanshin')]),
 leg('Osaka-Namba Station','Nishikujo Station','Hanshin Namba Line','ICOCA · ค่า Hanshin จ่ายแยกจาก JR Pass',[
 at('Osaka-Namba','แตะ ICOCA เข้า Hanshin Namba Line เลือกรถมุ่ง Nishikujo / Amagasaki'),
 at('Nishikujo','ลง Nishikujo แตะออกจาก Hanshin และเดินตามป้าย JR (ทางเข้าคนละระบบ)')],{duration:'ประมาณ 10–15 นาทีบนรถ'}),
 leg('Nishikujo Station (JR)','Universal-City Station','JR Yumesaki / Sakurajima Line','ICOCA · 19 พ.ย. JR Pass ยังไม่เริ่มใช้',[
 at('JR Nishikujo','แตะ ICOCA เข้า JR ตามป้าย Yumesaki Line / Sakurajima Line มุ่ง Sakurajima'),
 at('Universal-City','ลง Universal-City (ไม่ลง Sakurajima) แตะออก JR')],{duration:'ประมาณ 5 นาทีบนรถ'}),
 walk('Universal-City Station','Universal Studios Japan','เดินผ่าน Universal CityWalk ตามทางไป Main Gate; เตรียม QR Studio Pass','ประมาณ 5–10 นาที')
];
const usjBack=()=>[
 walk('Universal Studios Japan','Universal-City Station','ออกจากสวน เดินย้อนผ่าน Universal CityWalk ตามป้ายสถานี','ประมาณ 5–10 นาที'),
 leg('Universal-City Station','Nishikujo Station (JR)','JR Yumesaki Line','ICOCA · JR Pass ยังไม่เริ่มในวันที่ 19',[
 at('Universal-City','แตะ ICOCA เข้า JR ขึ้นรถมุ่ง Nishikujo / Osaka'),
 at('Nishikujo (JR)','ลงที่ Nishikujo แล้วออกจาก JR ตามป้าย Hanshin Railway')]),
 leg('Nishikujo Station (Hanshin)','Osaka-Namba Station','Hanshin Namba Line','ICOCA · แตะเข้า Hanshin และออก Osaka-Namba',[
 at('Hanshin Nishikujo','ตามป้าย Hanshin Namba Line มุ่ง Osaka-Namba'),
 at('Osaka-Namba','ลง Osaka-Namba แตะออก และเดินตามป้าย Osaka Metro Namba M20')]),
 leg('Namba (M20)',DAI,'Osaka Metro Midosuji','ICOCA แตะเข้า Namba / ออก Daikokucho',[
 at('Namba (M20)','ขึ้น Midosuji สีแดง มุ่งใต้ Nakamozu / Tennoji'),
 at('Daikokucho (M21)','ลง 1 สถานี แล้วแตะออก')]),
 daikokuHome()
];
const dayOne=()=>[
 leg('KIX Terminal 1', 'Kansai-airport Station (Nankai)','เดิน','ยังไม่ต้องแตะรถไฟ / ฟรี',[
 at('KIX Terminal 1','ผ่านตรวจคนเข้าเมือง รับกระเป๋า และศุลกากรให้เสร็จก่อน'),
 at('Railway Station / Nankai','เดินตามป้าย Railway / Kansai-airport Station แล้วเลือกฝั่ง Nankai ไม่ใช่ JR')],{duration:'ขึ้นกับขั้นตอน ตม./กระเป๋า'}),
 leg('Kansai-airport Station (Nankai)',NANKAI,'Nankai Rapi:t Super Seat','ซื้อตั๋ว Digital แล้ว 2 คน ¥3,180 รวมค่าโดยสาร+Limited Express; ไม่ใช้ ICOCA จ่ายซ้ำ',[
 at('Nankai Ticket Wallet','หลังผ่าน ตม. เปิด Purchased Ticket เลือกวันที่ 17 พ.ย. ขบวนและ Super Seat ทั้ง 2 คนให้ตรงกันก่อนรถออกอย่างน้อย 5 นาที'),
 at('Kansai-airport (Nankai)','ใช้ QR สดของ Digital Ticket ผ่านประตูที่รองรับ; ดูป้ายชานชาลา หมายเลขตู้ และที่นั่งที่เลือก'),
 at('Nankai Namba','ลงที่ Nankai Namba ไม่ใช่ JR Namba หรือ Osaka-Namba แล้วออกจากประตูรถไฟ')],{duration:'ประมาณ 35–45 นาทีบนรถตามขบวน',note:'ยังไม่ได้เลือกขบวน/ที่นั่งไว้; ตั๋วที่ซื้อคือ Rapi:t Super Seat สองคน'}),
 walk(NANKAI,HOME,'เดินตาม Google Maps ไป Centara Life Namba Hotel Osaka หากกระเป๋าใหญ่/เหนื่อย ใช้แท็กซี่จากสถานีได้','เผื่อ 15–25 นาทีเดิน')
];
const dayTwo=(mode)=>{
 const castle=[
  daikokuWalk(),
  leg(DAI,'Morinomiya Station (C19)','Osaka Metro Midosuji + Chuo','ICOCA แตะเข้า Daikokucho และออก Morinomiya (ไม่แตะออกที่ Hommachi)',[
   at('Daikokucho (M21)','ขึ้น Midosuji Line สีแดง มุ่งเหนือ Shin-Osaka / Minoh-kayano'),
   at('Hommachi (M18 / C16)','เปลี่ยนเป็น Chuo Line สีเขียว โดยเดินภายในสถานี ไม่แตะออก'),
   at('Hommachi (C16)','ขึ้น Chuo Line มุ่ง Nagata / Gakken-Nara-Tomigaoka'),
   at('Morinomiya (C19)','ลง Morinomiya แตะ ICOCA ออก เดินเข้าทาง Osaka Castle Park',{walkTo:'Osaka Castle Main Tower',walkFrom:'Morinomiya Station (C19)'})],{duration:'ประมาณ 20–25 นาทีรถไฟ + เดินไปปราสาท'}),
  walk('Morinomiya Station (C19)','Osaka Castle Main Tower','เดินเข้าสวนไปตัวปราสาทตาม Google Maps','ประมาณ 15–25 นาที')
 ];
 const midday=[
  walk('Osaka Castle Main Tower','Morinomiya Station (N20)','ออกจากปราสาทราว 11:10 เดินกลับไป Morinomiya เพื่อใช้สาย Nagahori Tsurumi-ryokuchi สีเขียวอ่อน (N20)','ประมาณ 15–25 นาที'),
  leg('Morinomiya Station (N20)','Namba Station (M20)','Osaka Metro Nagahori Tsurumi-ryokuchi + Midosuji','ICOCA แตะเข้า Morinomiya และออก Namba; เปลี่ยนสายโดยไม่ออกจากประตูตรวจตั๋ว',[
   at('Morinomiya (N20)','ขึ้น Nagahori Tsurumi-ryokuchi Line สีเขียวอ่อน มุ่ง Taisho'),
   at('Shinsaibashi (N15)','ลง Shinsaibashi เปลี่ยนไป Midosuji Line สีแดง (M19) ภายในสถานี'),
   at('Shinsaibashi (M19)','ขึ้น Midosuji Line มุ่งใต้ Nakamozu / Tennoji'),
   at('Namba (M20)','ลง 1 สถานี แตะ ICOCA ออก แล้วเดินไปร้าน Tempura Makino')],{duration:'ประมาณ 15–25 นาทีบน Metro รวมเปลี่ยนสาย'}),
  walk('Namba Station (M20)','Tempura Makino Namba Sennichimae','เดินไป Namba 3-3-4 อาคาร Namba Nichidai ชั้น 1 ร้าน Tempura Makino; ตรวจทางออกจาก Google Maps','ประมาณ 3–7 นาที'),
  walk('Tempura Makino Namba Sennichimae','Dotonbori Glico Sign','หลังมื้อเที่ยงเดินขึ้นเหนือจาก Namba ผ่าน Dotonbori ไปป้าย Glico บริเวณสะพาน Ebisubashi','ประมาณ 10–15 นาที'),
  walk('Dotonbori Glico Sign','Shinsaibashi-suji Shopping Street','จาก Glico / Ebisubashi เดินต่อขึ้นเหนือบนถนน Shinsaibashi-suji; ไม่ต้องขึ้นรถไฟ','ประมาณ 5–15 นาที'),
  umedaSky(),sunset(),skyReturn(),daikokuHome()
 ];
 if(mode==='rainy')return [
  daikokuWalk(),
  leg(DAI,'Osaka Museum of Housing and Living','Osaka Metro Midosuji + Tanimachi','ICOCA แตะเข้าและออกตามป้าย Metro',[
   at('Daikokucho (M21)','ขึ้น Midosuji ไป Umeda'),
   at('Umeda (M16)','เดินตามป้าย Higashi-Umeda (T20) เพื่อเปลี่ยนเป็น Tanimachi Line'),
   at('Tenjimbashisuji 6-chome (T18)','ลงแล้วเดินเข้าพิพิธภัณฑ์')]),
  leg('Tenjimbashisuji 6-chome Station (K11)','Nippombashi Station (K17)','Osaka Metro Sakaisuji','ICOCA; เปลี่ยนเป็นทางใต้ Tengachaya',[
   at('Tenjimbashisuji 6-chome (K11)','ขึ้น Sakaisuji Line มุ่ง Tengachaya'),
   at('Nippombashi (K17)','ลงแล้วเดินหรือเปลี่ยน Metro เพื่อไปยัง Namba')]),
  walk('Nippombashi Station (K17)','Tempura Makino Namba Sennichimae','เดินไปย่าน Namba Sennichimae ร้าน Tempura Makino; หากฝนหนักตรวจเส้นทางใน Google Maps','ประมาณ 15–25 นาที'),
  ...midday.slice(3)
 ];
 if(mode==='relaxed')return [...castle,...midday];
 return [...castle,...midday];
};
const dayThree=()=>[
 ...usjOut(),
 walk('Universal Studios Japan Main Area','Super Nintendo World','เดินตามป้ายและแผนที่ภายใน USJ ให้ทันช่วง Express ที่จอง 13:50; ยึด QR จริง','ขึ้นกับคิวและทางเดินภายในสวน'),
 walk('Super Nintendo World','The Wizarding World of Harry Potter','เดินผ่านโซนในสวนตาม USJ App; รักษาเวลา Express Harry Potter 16:00','ขึ้นกับตำแหน่งและคนในสวน'),
 ...usjBack()
];
const kyotoWest=(mode)=>{
 const route=[daikokuWalk(),daikokuUmeda(),kyotoJR(),
 walk(SAGA,'Arashiyama Bamboo Grove','ออกสถานี Saga-Arashiyama และเดินตามแผนที่ไปป่าไผ่ สวนทางกับแถวคนได้ช่วงเช้า','ประมาณ 15–20 นาที'),
 walk('Arashiyama Bamboo Grove','Tenryu-ji Temple','ออกจากป่าไผ่ตามทางเข้าสวนวัด Tenryu-ji และเตรียมค่าเข้าวัด','ประมาณ 5–10 นาที')];
 if(mode==='rainy')route.push(
 walk('Tenryu-ji Temple','Saganoya near Saga-Arashiyama','เดินกลับฝั่ง JR Saga-Arashiyama เพื่อลองมื้อกลางวันในร้าน (เปิดตามวันจริง)','ประมาณ 10–20 นาที'),
 leg(SAGA,'Kyoto Railway Museum','JR Sagano Line + เดิน','JR Kansai WIDE Area Pass ครอบคลุม JR; ค่าเข้าพิพิธภัณฑ์จ่ายแยก',[
 at('JR Saga-Arashiyama','ขึ้น Sagano Line มุ่ง Kyoto ลง Umekoji-Kyotonishi'),
 at('Umekoji-Kyotonishi','แตะ/แสดง JR Pass ออก แล้วเดินตามป้าย Kyoto Railway Museum')]),
 leg('Kyoto Railway Museum',OSAKA,'เดิน + JR Sagano + JR Kyoto','JR Kansai WIDE Area Pass',[
 at('Kyoto Railway Museum','เดินกลับ Umekoji-Kyotonishi Station'),
 at('Umekoji-Kyotonishi','ขึ้น JR Sagano Line มุ่ง Kyoto'),
 at('JR Kyoto','เปลี่ยน JR Kyoto Line Special Rapid / Rapid ไป Osaka')])
 );
 else route.push(
 walk('Tenryu-ji Temple','Togetsukyo Bridge','เดินไปสะพาน Togetsukyo ชมภูเขาและแม่น้ำ','ประมาณ 10–15 นาที'),
 walk('Togetsukyo Bridge','Ozuru Udon Arashiyama','เดินเข้าย่านร้านอุด้ง Ozuru; ถ้าคิวเกิน 10–15 นาทีใช้ Saganoya ใกล้ทางกลับ JR','ประมาณ 5–15 นาที'),
 walk('Ozuru Udon Arashiyama',SAGA,'ออกจากร้านไปทาง JR Saga-Arashiyama หากเลือกแวะคาเฟ่/ขนมให้ทำเฉพาะเมื่อคิวสั้น','ประมาณ 15–25 นาที'),
 sagaOsaka()
 );
 route.push(osakaDaikoku(),daikokuHome());return route;
};
const kyotoEast=(mode)=>{
 const origin=[
 daikokuWalk(),
 leg(DAI,'Keihan Yodoyabashi Station','Osaka Metro Midosuji + เดิน','ICOCA ใช้ Metro; Keihan เป็นอีกบริษัทต้องแตะเข้าใหม่',[
 at('Daikokucho (M21)','ขึ้น Osaka Metro Midosuji สีแดง มุ่งเหนือ Shin-Osaka / Minoh-kayano'),
 at('Yodoyabashi (M17)','ลงและแตะออก เดินตามป้าย Keihan Railway / Yodoyabashi')]),
 leg('Keihan Yodoyabashi','Keihan Fushimi-Inari Station','Keihan Main Line','ICOCA · Keihan ไม่รวม JR Kansai WIDE Pass',[
 at('Yodoyabashi (Keihan)','แตะ ICOCA เข้า Keihan เลือกรถไปทาง Kyoto / Demachiyanagi'),
 at('Keihan Main Line','รถด่วนบางประเภทไม่จอด Fushimi-Inari; อาจต้องเปลี่ยนเป็น Local / Sub-Express เช่นที่ Tambabashi ตรวจป้ายจอดของขบวนจริง'),
 at('Fushimi-Inari (Keihan)','ลงสถานี Fushimi-Inari แตะออก แล้วเดินไปศาลเจ้าฟุชิมิอินาริ')]),
 walk('Keihan Fushimi-Inari','Fushimi Inari Taisha','เดินตามป้ายศาลเจ้าไปเสาโทริอิ ฝนตกอย่าเดินขึ้นเขาลึก','ประมาณ 5–10 นาที')
 ];
 if(mode==='rainy')return [
 ...origin,
 leg('Fushimi-Inari (Keihan)','Kyoto National Museum','Keihan Main Line + เดิน','ICOCA · Keihan จ่ายแยก',[
 at('Fushimi-Inari (Keihan)','ขึ้นขบวน Local / Sub-Express มุ่งเหนือ Demachiyanagi และลง Shichijo'),
 at('Shichijo (Keihan)','แตะออก แล้วเดินตามป้าย Kyoto National Museum / Google Maps')]),
 leg('Kyoto National Museum','Nishiki Market','เดิน + Keihan (เลือกตามฝน)','เดินฟรี หรือ ICOCA หากขึ้น Keihan',[
 at('Kyoto National Museum','เดินไป Keihan Shichijo ถ้าฝนหนัก ใช้รถไฟขึ้นเหนือไป Gion-Shijo'),
 at('Gion-Shijo','เดินเข้าสู่ย่าน Shijo / Nishiki Market และเลือกร้านอาหารในอาคาร')]),
 leg('Nishiki Market','Keihan Gion-Shijo','เดิน','ฟรี',[
 at('Nishiki Market','เดินกลับ Keihan Gion-Shijo Station ตาม Google Maps'),
 at('Gion-Shijo','เตรียมขึ้น Keihan ไป Osaka')]),
 ...eastReturn()
 ];
 return [
 ...origin,
 leg('Fushimi Inari Taisha','Tofuku-ji Temple','เดิน + Keihan','ICOCA สำหรับ Keihan; เดินเข้าวัดไม่ต้องใช้บัตร',[
 at('Fushimi Inari','เดินกลับสถานี Keihan Fushimi-Inari'),
 at('Fushimi-Inari (Keihan)','ขึ้น Keihan มุ่งเหนือ Demachiyanagi ลง Tofukuji (ตรวจขบวนที่จอด)'),
 at('Tofukuji Station','แตะออก เดินตามป้าย Tofuku-ji Temple')]),
 leg('Tofuku-ji Temple','Kiyomizu-dera','Keihan + เดินขึ้นเนิน','ICOCA เฉพาะ Keihan · ค่าเข้าวัดแยก',[
 at('Tofukuji','เดินกลับ Keihan Tofukuji ขึ้นรถมุ่งเหนือไป Kiyomizu-Gojo'),
 at('Kiyomizu-Gojo','ลงแล้วเดินขึ้นเขาไป Kiyomizu-dera ผ่านตรอก Higashiyama; เผื่อเวลาทางชันและคนเยอะ')],{duration:'เผื่อ 35–60 นาทีรวมเดิน'}),
 walk('Kiyomizu-dera','Gion Izuju Sushi','เดินลง Sannenzaka / Ninenzaka ต่อไปย่าน Yasaka / Gion; แผนมื้ออาหารเป็นตัวเลือก ไม่รับประกันคิว','ประมาณ 25–40 นาที'),
 walk('Gion Izuju Sushi','Saryo Tsujiri Gion','เดินตามย่าน Gion / Shijo-dori ไปคาเฟ่มัทฉะ ถ้าคิวยาวข้ามได้','ประมาณ 5–10 นาที'),
 walk('Saryo Tsujiri Gion','Keihan Gion-Shijo Station','เดินตามป้าย Keihan Railway ที่ Gion-Shijo','ประมาณ 5–10 นาที'),
 ...eastReturn()
 ];
};
const eastReturn=()=>[
 leg('Keihan Gion-Shijo Station','Osaka Metro Yodoyabashi Station','Keihan + เดิน','ICOCA จ่าย Keihan แยกจาก Metro',[
 at('Gion-Shijo (Keihan)','ขึ้น Keihan มุ่ง Osaka / Yodoyabashi เลือกขบวนที่จอด Yodoyabashi ตรวจประเภทขบวน'),
 at('Yodoyabashi (Keihan)','ลง แตะออก แล้วเดินตามป้าย Osaka Metro Midosuji M17')],{duration:'เผื่อ 50–70 นาที'}),
 leg('Yodoyabashi (M17)',DAI,'Osaka Metro Midosuji','ICOCA แตะเข้า Yodoyabashi / ออก Daikokucho',[
 at('Yodoyabashi (M17)','ขึ้น Midosuji สีแดงมุ่งใต้ Nakamozu / Tennoji'),
 at('Daikokucho (M21)','ลงและแตะออก')]),
 daikokuHome()
];
const naraOut=()=>[
 daikokuWalk(),
 leg(DAI,'Osaka-Namba Station (Kintetsu)','Osaka Metro Midosuji + เดิน','ICOCA ใช้ Metro; เปลี่ยนบริษัทต้องแตะเข้า Kintetsu อีกครั้ง',[
 at('Daikokucho (M21)','ขึ้น Midosuji สีแดงมุ่งเหนือ ไป Namba 1 สถานี'),
 at('Namba (M20)','ลงแล้วแตะออก เดินตามป้าย Kintetsu / Hanshin Osaka-Namba (ไม่ใช่ JR Namba หรือ Nankai Namba)')]),
 leg('Osaka-Namba Station (Kintetsu)','Kintetsu-Nara Station','Kintetsu Nara Line','ICOCA · Kintetsu ไม่รวม JR Kansai WIDE Pass',[
 at('Osaka-Namba','แตะเข้า Kintetsu เลือกขบวน Rapid Express / Express ที่ป้ายระบุปลายทาง Kintetsu-Nara; บางเที่ยวจอดทุกสถานีไม่เท่ากัน'),
 at('Kintetsu-Nara','ลง Kintetsu-Nara (ไม่ใช่ JR Nara) แล้วแตะออก ใกล้ Nara Park กว่า JR Nara')],{duration:'ประมาณ 40–50 นาทีตามขบวน'}),
 walk('Kintetsu-Nara Station','Nara Park','เดินตามถนน Noborioji ไปสวนกวาง แวะร้านอาหารย่านสถานีได้ก่อนเข้าสวน','ประมาณ 10–15 นาที'),
 walk('Nara Park','Todai-ji Temple','เดินผ่านสวนไปวัด Todai-ji ตามป้าย Great Buddha Hall','ประมาณ 15–25 นาที')
];
const naraBack=()=>[
 walk('Nara Park / Kintetsu-Nara Area','Kintetsu-Nara Station','เดินย้อนผ่านย่านร้านค้าใกล้สถานี แวะ Nakatanidou ได้หากอยู่ในเส้นทางและคิวสั้น','ประมาณ 10–20 นาที'),
 leg('Kintetsu-Nara Station','Osaka-Namba Station','Kintetsu Nara Line','ICOCA · Kintetsu จ่ายแยกจาก JR Pass',[
 at('Kintetsu-Nara','แตะ ICOCA เข้า Kintetsu ขึ้น Rapid Express / Express มุ่ง Osaka-Namba'),
 at('Osaka-Namba','ลงและแตะออก เดินตามป้าย Osaka Metro Namba M20')]),
 leg('Namba (M20)',DAI,'Osaka Metro Midosuji','ICOCA แตะเข้า Namba / ออก Daikokucho',[
 at('Namba (M20)','ขึ้น Midosuji สีแดงมุ่งใต้ Nakamozu / Tennoji'),
 at('Daikokucho (M21)','ลงอีก 1 สถานี แตะออก')]),
 daikokuHome()
];
const dayFive=mode=>mode==='rainy'?[
 walk(HOME,'Namba Parks','เดินไป Namba Parks / Namba City เลือกทางเดินในอาคารเมื่อมีฝน','ประมาณ 15–25 นาที'),
 walk('Namba Parks','Nippombashi / Yayoiken','เดินหรือใช้ Metro ตามสภาพฝน เพื่อรับประทานอาหารร้านในอาคาร','เผื่อ 15–25 นาที'),
 walk('Nippombashi / Yayoiken','Namba City','เดินกลับย่าน Namba City / Takashimaya','ประมาณ 10–20 นาที'),
 walk('Namba City',HOME,'กลับโรงแรม เตรียมกระเป๋าไป Kinosaki วันถัดไป','ประมาณ 15–25 นาที')
 ]:[
 ...naraOut(),
 ...(mode==='relaxed'?[]:[walk('Todai-ji Temple','Kasuga Taisha','เดินใน Nara Park ต่อไปศาลเจ้า Kasuga ตามความเหนื่อย หากไม่ไหวสามารถข้ามได้','ประมาณ 20–30 นาที'),
 walk('Kasuga Taisha','Nara Park / Kintetsu-Nara Area','กลับทางย่านสวนและร้านอาหารไปทาง Kintetsu-Nara','ประมาณ 25–40 นาที')]),
 ...naraBack()
 ];
const daySix=()=>[
 daikokuWalk(),daikokuUmeda(),
 leg(OSAKA,KINO,'JR Limited Express Kounotori 5','JR Kansai WIDE Area Pass + Reserved Seat ที่จองแล้ว',[
 at('JR Osaka Station','ใช้ JR Pass และตั๋วที่นั่งที่รับแล้ว เข้าประตู JR ตรวจบอร์ดขบวน Kounotori 5 และชานชาลา'),
 at('Kounotori 5 · 10:12','ขึ้นตู้ 4 (Car 4) ที่นั่ง 9C และ 9D ชั้น Ordinary Reserved Seat; ห้ามเปลี่ยนขบวนโดยพลการ'),
 at('Kinosaki Onsen · 12:51','ลงรถและออกสถานี Kinosaki Onsen')],{duration:'2 ชม. 39 นาที',note:'กำหนดเวลาและที่นั่งยืนยันแล้ว'}),
 leg(KINO,RYOKAN,'รถรับส่ง','ใช้รถ Check-in Shuttle ตามเงื่อนไขโรงแรม · สอบถามเจ้าหน้าที่',[
 at('Kinosaki Onsen Station','หลังลงรถ เดินไป Sozoro Check-in Center / จุด Check-in Shuttle แล้วแจ้ง Nishimuraya Hotel Shogetsutei'),
 at('Check-in Shuttle','สอบถามรอบจริงและจุดส่ง; หากไม่พบรถให้โทรโรงแรม อย่าเดาว่ารถวิ่งตลอดเวลา'),
 at('Nishimuraya Shogetsutei','ฝากกระเป๋า/เช็กอินแล้วไปกิจกรรมที่จองตามเวลา')],{duration:'ตามรอบรถ Shuttle'})
];
const daySeven=()=>[
 leg(RYOKAN,'Kinosaki Onsen Town','รถรับส่ง / เดิน','Shuttle ตามเงื่อนไขโรงแรม; เดินฟรี',[
 at('Reception Nishimuraya','เช็กเอาต์และถามรอบ Shuttle หรือฝากกระเป๋า ตรวจว่ารถแวะบริเวณสถานีหรือไม่'),
 at('Kinosaki Town','เดินเที่ยวคลองและรับประทานอาหารกลางวัน ถ้ากระเป๋าหนักให้ฝากก่อน')],{duration:'ขึ้นอยู่กับรอบ Shuttle'}),
 walk('Kinosaki Onsen Town / Masuya Soba',KINO,'กินกลางวันให้เสร็จแล้วเดินไปสถานี หลีกเลี่ยงร้านที่ต้องรอนาน ควรถึงสถานีก่อนเวลาออก 20–30 นาที','เผื่อเวลาเดิน 10–20 นาที'),
 leg(KINO,OSAKA,'JR Limited Express Kounotori 22','JR Kansai WIDE Area Pass + Reserved Seat จองแล้ว',[
 at('Kinosaki Onsen Station','ใช้ JR Pass/ตั๋วที่นั่งเข้าสถานี ตรวจชานชาลา Kounotori 22'),
 at('Kounotori 22 · 15:30','ขึ้น Car 7 Seats 8C และ 8D ตามที่จอง'),
 at('JR Osaka · 18:21','ลง Osaka และเดินตามป้าย Metro Umeda')],{duration:'2 ชม. 51 นาที',note:'รถจองเวลาตายตัว; 23 พ.ย. เป็นวันหยุดญี่ปุ่น'}),
 osakaDaikoku(),daikokuHome(),
 walk(HOME,'Namba Dining Area / Kura Sushi','ถ้ามีแรง ออกไปกินมื้อเย็นแถบ Namba; ใช้ Google Maps ตรวจสาขาและคิว ไม่ต้องเดินทางหากเหนื่อย','ตามร้านที่เลือก'),
 walk('Namba Dining Area',HOME,'เดินกลับ Centara เพื่อพักคืนสุดท้าย','ตามร้านที่เลือก')
];
const dayEight=prefs=>{
 const choice=prefs?.airportTrain||'express';
 const common=[walk(HOME,'Namba CITY / Shirokitsune','หลังเช็กเอาต์หรือฝากกระเป๋า เลือกมื้อกลางวันใน Namba CITY แล้วกลับรับสัมภาระให้เรียบร้อย','ตามจุดที่เลือก')];
 if(choice==='jr')return [
 ...common,
 walk('Namba CITY / Centara',DAI,'รับกระเป๋าจากโรงแรม แล้วเดินไป Metro Daikokucho','ประมาณ 5–15 นาที'),
 leg(DAI,'JR Tennoji Station','Osaka Metro Midosuji + เดิน','Metro ใช้ ICOCA แยกจาก JR Pass',[
 at('Daikokucho (M21)','ขึ้น Midosuji สีแดงมุ่งใต้ Nakamozu / Tennoji'),
 at('Tennoji (M23)','ลงที่ Tennoji แล้วออก Metro เดินตามป้าย JR Tennoji')]),
 leg('JR Tennoji Station','Kansai-airport Station (JR)','JR HARUKA / Airport Rapid','JR Kansai WIDE Area Pass ครอบคลุม JR ที่อยู่ในเงื่อนไข; ตรวจเงื่อนไข Reserved Seat ของ HARUKA',[
 at('JR Tennoji','ใช้ JR Pass เข้าประตู JR ตรวจชานชาลาขบวน HARUKA หรือ Kansai Airport Rapid ที่ไป KIX จริง'),
 at('Kansai-airport (JR)','ลงสถานี JR Kansai-airport เดินตามป้าย Terminal 1 Departures')],{duration:'ตรวจขบวนและรอบจริง',note:'ใช้ตัวเลือก JR เฉพาะเมื่อพาสถูกรับและยังใช้ได้วันที่ 24 พ.ย.'}),
 ...airportEnd()
 ];
 return [
 ...common,
 walk('Namba CITY / Centara',NANKAI,'รับสัมภาระให้ครบ เดินไป Nankai Namba (ไม่ใช่ Osaka-Namba / JR Namba)','เผื่อ 15–25 นาทีเดิน'),
 leg(NANKAI,'Kansai-airport Station (Nankai)',choice==='rapit'?'Nankai Rapi:t Limited Express':'Nankai Airport Express',choice==='rapit'?'ต้องซื้อตั๋ว Rapi:t ขากลับใหม่ (ไม่ใช่ตั๋วขาเข้า)':'ICOCA แตะเข้า Nankai Namba / ออก Kansai-airport',[
 at('Nankai Namba','ตรวจรถไป Kansai-airport (KIX) จากป้ายจริง อย่าขึ้นรถไป Wakayama หรือเส้นทางอื่น'),
 at(choice==='rapit'?'Rapi:t Limited Express':'Airport Express',choice==='rapit'?'ซื้อ/เลือกขบวนและที่นั่ง Rapi:t สำหรับขากลับก่อนขึ้น':'ขึ้น Airport Express ที่จอด Kansai-airport ตรวจ Destination บนหน้ารถ'),
 at('Kansai-airport (Nankai)','ลงสถานีและเดินตามป้าย Terminal 1 Departures')],{duration:'Rapi:t ประมาณ 35–45 นาที / Airport Express ประมาณ 45–50 นาที'}),
 ...airportEnd()
 ];
};
const airportEnd=()=>[
 walk('Kansai-airport Station',KIX,'ตามป้าย Terminal 1 / International Departures ไปเคาน์เตอร์เช็กอินสายการบิน', 'เดินในอาคารประมาณ 5–15 นาที'),
 leg(KIX,'Don Mueang Airport Terminal 1','เครื่องบิน','ตั๋วเครื่องบินจองแล้ว · ห้ามเดาหมายเลขเที่ยวบินขากลับ',[
 at('KIX Terminal 1 · 19:45 JST','เช็กอิน/โหลดกระเป๋า 20 กก.ต่อคนตามตั๋วจริง แล้วผ่าน Security / Immigration'),
 at('DMK Terminal 1 · 00:15 (25 พ.ย. ICT)','ถึงประเทศไทยวันที่ 25 พ.ย. หลังเที่ยงคืน (เวลาไทย)')],{duration:'ตารางบินจองแล้ว',note:'เที่ยวบิน '+flightNumberLabel(travelBookings.flights.inbound)+' · ตรวจบัตรโดยสารจริง'})
];
export function detailedRouteGuide(day,prefs={}){
 const mode=prefs.dayPlans?.[day]||'original';
 const legs=day===1?dayOne():day===2?dayTwo(mode):day===3?dayThree():day===4?(prefs.kyoto==='east'?kyotoEast(mode):kyotoWest(mode)):day===5?dayFive(mode):day===6?daySix():day===7?daySeven():day===8?dayEight(prefs):[];
 return {day,legs,kicker:['','จากสนามบินเข้าที่พัก','เที่ยว Osaka Castle / Kuromon / Umeda','USJ ไป–กลับ','Kyoto แบบเลือก West / East','Nara ไป–กลับ','Osaka → Kinosaki Onsen','Kinosaki → Osaka','Namba → KIX'][day],
 overview:legs.map(x=>x.from+' → '+x.to).join(' · '),
 leave:day===1?'ถึง KIX 18:15 แล้วเลือก Rapi:t หลังรับกระเป๋า':day===3?'ออกก่อนเปิดสวน · ตรวจเวลา USJ จริง':day===6?'Kounotori 5 ออกจาก JR Osaka 10:12':day===7?'Kounotori 22 ออกจาก Kinosaki 15:30':day===8?'ออกจากโรงแรมราว 15:00 · เที่ยวบิน 19:45':'ดูเวลารายวันและเผื่อการเดิน/ต่อรถ',
 reminder:'ขั้นตอนเป็นแผนใช้เดินทาง ไม่ใช่การบอกชานชาลา/รอบรถแบบ Real-time · อ่านป้ายปลายทางขบวนจริง และใช้ Google Maps ตรวจเส้นทางวันเดินทาง'};
}
