import {travelBookings,flightNumberLabel} from './centralTravel.js';
import {addNavigationDetails} from './stationNavigation.js';

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
 at('Umeda (M16)','ลง Umeda (M16) แตะ ICOCA ออกประตู Metro แล้วตามป้าย JR Osaka (JR線); Exit 8 เป็นหนึ่งในทางเชื่อมไป JR Osaka โดยไม่ต้องเดินขึ้นไปริมถนน'),
 at('JR Osaka Station','เลือกประตูตรวจตั๋ว JR ที่ใกล้ที่สุด เช่น Central Gate (中央口), South Gate หรือ Midosuji Gate; สอด Kansai WIDE Area Pass แบบกระดาษผ่านประตูอัตโนมัติ และหยิบบัตรคืนทุกครั้ง (Metro ใช้ ICOCA แยก) จากนั้นดูเลขชานชาลาของขบวนที่ต้องขึ้นจากจอ Departure Board')],{duration:'เผื่อ 25–40 นาทีรวมเดิน'});
const osakaDaikoku=()=>leg('JR Osaka Station',DAI,'เดิน + Osaka Metro','แตะ ICOCA เข้า Umeda / ออก Daikokucho; ไม่ใช้ JR Pass กับ Metro',[
 at('JR Osaka Station','ออกจาก JR แล้วเดินตามป้าย Osaka Metro / Midosuji Line → Umeda (M16)'),
 at('Umeda (M16)','แตะ ICOCA เข้า Midosuji สีแดง เลือกขบวนมุ่งใต้ไป Nakamozu / Tennoji'),
 at('Daikokucho (M21)','ลง Daikokucho (M21) แตะออก แล้วเดินกลับโรงแรม')],{duration:'เผื่อ 25–40 นาทีรวมเดิน'});
const kyotoJR=()=>leg(OSAKA,SAGA,'JR Kyoto Line + JR Sagano Line','JR Kansai WIDE Area Pass วันที่ 20–24 พ.ย. (ต้องรับพาสก่อนใช้)',[
 at('JR Osaka · JR Kyoto Line','ใช้ JR Pass ผ่านประตู JR แล้วหยิบบัตรคืน → มองหาป้าย JR Kyoto Line (京都線) ฝั่ง Shin-Osaka / Takatsuki / Kyoto; รถปกติอยู่แถวชานชาลา 7–10 แต่ตรวจจอ ณ เวลาจริง เลือก Special Rapid (新快速) หรือ Rapid (快速) ที่จอด Kyoto; อย่าขึ้น Limited Express Kounotori เพียงเพราะอยู่ใกล้กัน'),
 at('JR Kyoto · เปลี่ยนสายภายใน JR','ลง Kyoto แล้วไม่ต้องผ่านประตูตรวจตั๋ว → เดินตามป้าย JR Sagano Line / San-in Line (嵯峨野線・山陰線) ชานชาลา 31–33 (ตรวจจออีกครั้ง) → ขึ้นขบวนมุ่ง Kameoka / Sonobe ที่ระบุว่าจอด Saga-Arashiyama (嵯峨嵐山)'),
 at('JR Saga-Arashiyama · South Exit (南口)','ลง Saga-Arashiyama ขึ้นไปโถงสถานี → สอด JR Kansai WIDE Pass ผ่านประตูตรวจตั๋วเพื่อออก และหยิบบัตรคืน → มองหา South Exit (南口) → เดินตามป้าย Tenryu-ji / Arashiyama Bamboo Grove ประมาณ 10–15 นาที')],{duration:'ประมาณ 60–80 นาทีรวมเปลี่ยนขบวน'});
const sagaOsaka=()=>leg(SAGA,OSAKA,'JR Sagano Line + JR Kyoto Line','JR Kansai WIDE Area Pass · ไม่ต้องจ่ายค่า JR ซ้ำ',[
 at('JR Saga-Arashiyama','ใช้พาสผ่านประตู JR ขึ้น Sagano Line มุ่ง Kyoto'),
 at('JR Kyoto','เปลี่ยนเป็น Special Rapid / Rapid สาย JR Kyoto Line ไป Osaka / Kobe (ยืนยันว่าขบวนจอด Osaka)'),
 at('JR Osaka','ลง Osaka แล้วเดินตามป้าย Metro Umeda หากกลับโรงแรม')],{duration:'เผื่อ 60–80 นาทีรวมรอ/เปลี่ยนรถ'});
const sunset=()=>leg('Umeda Sky Building','Sky Lounge STARDUST 39F','เดิน','ไม่ใช้ตั๋วรถไฟ · การจองร้านยืนยันแล้ว',[
 at('Umeda Sky Building','หลังชมวิว ลงจากจุดชมวิวตามป้ายทางออก/Restaurant'),
 at('Tower East ชั้น 39','ตามป้าย Sky Lounge STARDUST; แสดงหลักฐานยืนยันการจองให้พนักงาน')],{duration:'อยู่ภายในอาคารเดียวกัน',note:'เวลา 18:15 เป็นแผน ไม่ใช่เวลาการจองที่ยืนยันจากเอกสาร; ไม่เปิดเผยรายละเอียดโอกาสส่วนตัว'});
const umedaSkyMetro=()=>leg('Shinsaibashi Station (M19)','Umeda Station (M16)','Osaka Metro Midosuji','ICOCA แตะเข้า Shinsaibashi / ออก Umeda',[
 at('Shinsaibashi (M19)','ขึ้น Midosuji Line สีแดง มุ่งเหนือ Shin-Osaka / Minoh-kayano'),
 at('Umeda (M16)','ลง Umeda แล้วแตะ ICOCA ออก Metro ตามป้ายทางไป Grand Front Osaka / Umeda Sky Building')],{duration:'ประมาณ 10–15 นาทีบนรถ ไม่รวมเดิน'});
const umedaSkyWalk=()=>walk('Umeda Station (M16)','Umeda Sky Building','เดินตามป้าย Grand Front Osaka / Umeda Sky Building ไปอาคาร Tower East; ตรวจทางเดินล่าสุดใน Google Maps และเผื่อเวลาข้ามถนน','ประมาณ 12–20 นาที');
const shinsaibashiStationWalk=()=>walk('Shinsaibashi-suji Shopping Street','Shinsaibashi Station (M19)','เดินขึ้นเหนือผ่านทางเดินร้านค้าไปสถานี Osaka Metro Shinsaibashi Midosuji (M19)','ประมาณ 5–15 นาที');
const midosujiAfterDinner=()=>[
 walk('Sky Lounge STARDUST 39F','Midosuji Illumination Hanshin-mae Intersection Osaka','หลัง Dinner ลงจาก Umeda Sky Building แล้วเดินผ่านฝั่ง JR Osaka/Umeda ไปจุดเริ่มงานประดับไฟ Midosuji ใกล้ Hanshin-mae Intersection โดยใช้ทางเท้าปกติ; ใช้ Google Maps ตรวจทางข้ามถนน; Dinner จบช้าก็เลื่อนชมไฟได้','ประมาณ 15–25 นาที เดินฟรี'),
 walk('Midosuji Illumination Hanshin-mae Intersection Osaka','Yodoyabashi Station (M17)','ชมไฟจริงตามแนวถนน Midosuji ช่วง Umeda → Yodoyabashi ระหว่างทางประมาณ 25–35 นาที (ไม่จำเป็นต้องเดินครบ 4 กม.); ถ้าเหนื่อย/ฝนหนักให้กลับจาก Umeda M16 ได้เลย','ประมาณ 25–35 นาที เดินฟรี'),
 leg('Yodoyabashi Station (M17)',DAI,'Osaka Metro Midosuji Line','ICOCA ¥240/คน · ไม่ใช้ JR Kansai WIDE Pass',[
   at('Yodoyabashi (M17)','ขึ้น Osaka Metro Midosuji Line สีแดง มุ่งใต้ Nakamozu / Tennoji'),
   at('Daikokucho (M21)','ลง Daikokucho (M21) และแตะ ICOCA ออกประตู ตาม Google Maps กลับ Centara')],{duration:'ประมาณ 10–15 นาทีบนรถ ไม่รวมเดิน/รอ',note:'วันพุธ 18 พ.ย. ค่าโดยสาร Metro ขากลับ ¥240/คน เท่ากับแผนเดิมจาก Umeda; งานเปิดไฟราว 17:00–01:00 และเข้าชมฟรี'}),
 daikokuHome()
];
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
 walk(NANKAI,HOME,'เดินตาม Google Maps ไป Centara Life Namba Hotel Osaka หากกระเป๋าใหญ่/เหนื่อย ใช้แท็กซี่จากสถานีได้','เผื่อ 15–25 นาทีเดิน'),
 walk(HOME,'炭火焼き とりとりこ 大阪市浪速区敷津西2-1-16','มื้อค่ำตัวเลือกแรก Toritoriko หลังเช็กอิน · เดินจากโรงแรมประมาณ 5–12 นาที; ถ้าร้านเต็มหรือเดินทางดึกให้เลือก Kura Sushi หรือ Tsurutontan แทน','ประมาณ 5–12 นาที (optional; 21:00 เป็นเวลาเป้าหมาย)')
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
  shinsaibashiStationWalk(),umedaSkyMetro(),umedaSkyWalk(),sunset(),...midosujiAfterDinner()
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
 walk('Universal Studios Japan Main Area','Super Nintendo World','เดินตามป้ายภายใน USJ ให้ทัน Nintendo Entry 13:40–14:40 · Mario Kart 13:40–14:10 · Donkey Kong 14:10–14:40; ยึด QR จริง','ขึ้นกับคิวและทางเดินภายในสวน'),
 walk('Super Nintendo World','The Wizarding World of Harry Potter','เดินผ่านโซนในสวนตาม USJ App; Harry Potter Express ไม่มีเวลากำหนด · เล่นช่วงเย็นตามแผน','ขึ้นกับตำแหน่งและคนในสวน'),
 ...usjBack()
];
const kyotoRainyRoute=()=>[
 daikokuWalk(),daikokuUmeda(),kyotoJR(),
 walk(SAGA,'Arashiyama Bamboo Grove','ลดเวลาเดินถ้าฝนเบา; ฝนหนักให้เดินเข้าร้านอาหารในร่มโดยตรง','15–20 นาที'),
 walk('Arashiyama Bamboo Grove','Tenryu-ji Temple','ตรวจสวนเปิดและทางเดินที่ไม่ลื่น','5–10 นาที'),
 walk('Tenryu-ji Temple','Arashiyama Udon Ozuru','หาร้านอุด้งในอาคารบริเวณ Arashiyama','10–15 นาที'),
 walk('Arashiyama Udon Ozuru','Hankyu Arashiyama Station (HK98)','เดินทางตรงไปสถานี Hankyu ไม่แวะริมแม่น้ำหรือสะพาน','15–20 นาที'),
 leg('Hankyu Arashiyama Station (HK98)','Kyoto-Kawaramachi Station (HK86)','Hankyu Arashiyama + Kyoto Line','ICOCA · Hankyu ไม่รวมใน JR Pass',[
  at('Hankyu Arashiyama (HK98)','ขึ้น Arashiyama Line มุ่ง Katsura'),
  at('Katsura (HK81)','เปลี่ยนเป็น Kyoto Line มุ่ง Kyoto-Kawaramachi'),
  at('Kyoto-Kawaramachi (HK86)','ลงและเข้าถนนช้อปปิ้งมีหลังคา')],{duration:'40–55 นาที'}),
 walk('Kyoto-Kawaramachi Station','Shijo Covered Shops Kyoto','เลือกเดินใต้หลังคาและพักร้านชาเมื่อฝนหนัก','5–15 นาที'),
 walk('Shijo Covered Shops Kyoto','Kodaiji Temple Kyoto','เดินไปวัดเมื่อฝนเบาและยืนยันการเปิดงาน; ถ้าปิดให้กลับที่ Gion-Shijo','20–35 นาที'),
 walk('Kodaiji Temple Kyoto','Gion Kyomen Kyoto','มื้อเย็นในร้าน ตรวจสภาพอากาศ','15–25 นาที'),
 walk('Gion Kyomen Kyoto','Keihan Gion-Shijo Station','เดินเข้าสถานีหลังอาหาร','5–15 นาที'),
 ...eastReturn()
];
const kyotoWest=(mode)=>[
 ...(mode==='rainy'?kyotoRainyRoute():[]),

 ...(mode==='rainy'?[]:[daikokuWalk(),daikokuUmeda(),kyotoJR()]),
 ...(mode==='rainy'?[]:[walk(SAGA,'Arashiyama Bamboo Grove','เดินจาก Saga-Arashiyama ประมาณ 15–20 นาที ผ่านทาง Nonomiya Shrine','15–20 นาที'),
 walk('Arashiyama Bamboo Grove','Tenryu-ji Temple','เดินไปทางเข้าสวนวัดฝั่งเหนือ (เปิด 08:30) ค่าเข้าประมาณ ¥500','5–10 นาที'),
 walk('Tenryu-ji Temple','Arashiyama Main Street','ออกประตูหลักเข้าสู่ย่านร้านอาหารและของฝาก','5–10 นาที'),
 walk('Arashiyama Main Street','Arashiyama Udon Ozuru','รับประทานอุด้งใกล้ถนนหลัก ถ้าคิวเกิน 15 นาทีเลือกร้านสำรอง','5–10 นาที'),
 walk('Arashiyama Udon Ozuru','Togetsukyo Bridge','เดินลงใต้ไปสะพาน Togetsukyo','5–15 นาที'),
 walk('Togetsukyo Bridge','Hankyu Arashiyama Station (HK98)','ข้ามสะพานลงฝั่งใต้ เดินตามป้าย Hankyu Arashiyama; พักริมแม่น้ำได้ตามเวลา','10–15 นาที'),
 leg('Hankyu Arashiyama Station (HK98)','Kyoto-Kawaramachi Station (HK86)','Hankyu Arashiyama + Kyoto Line','ICOCA · Hankyu ไม่ครอบคลุมโดย JR Kansai WIDE Pass',[
   at('Hankyu Arashiyama (HK98)','แตะ ICOCA ขึ้น Hankyu Arashiyama Line มุ่ง Katsura'),
   at('Katsura (HK81)','เปลี่ยนขบวน Hankyu Kyoto Line มุ่ง Kyoto-Kawaramachi ตรวจป้ายปลายทาง'),
   at('Kyoto-Kawaramachi (HK86)','ลงสถานีและแตะ ICOCA ออก เดินข้าม Shijo Bridge สู่ Gion')],{duration:'เผื่อ 40–55 นาทีรวมเดิน/รอ/เปลี่ยนรถ'}),
 walk('Kyoto-Kawaramachi Station','Hanamikoji Street Gion','เดินข้ามสะพาน Shijo เข้าถนนสาธารณะ Hanamikoji; ไม่ถ่ายภาพในพื้นที่ห้าม','10–15 นาที'),
 walk('Hanamikoji Street Gion','Yasaka Shrine','เดินเลียบถนน Gion ไปศาลเจ้ายาซากะ','10–15 นาที'),
 walk('Yasaka Shrine','Maruyama Park Kyoto','เดินเข้าด้านหลังศาลเจ้าสู่สวนสาธารณะ','5–10 นาที'),
 walk('Maruyama Park Kyoto','Nene no Michi Kyoto','เดินผ่านทางเดินย่าน Higashiyama ถนนหินเก่า','10–15 นาที'),
 walk('Nene no Michi Kyoto','Kodaiji Temple Kyoto','ขึ้นทางเดินไป Kodaiji เผื่อคิวชมไฟเวลา 17:00','5–10 นาที'),
 walk('Kodaiji Temple Kyoto','Gion Kyomen Kyoto','เดินไปทานมื้อเย็นที่ Gion หากร้านปิดหรือคิวเกิน 15 นาทีใช้ร้านสำรอง','15–25 นาที'),
 walk('Gion Kyomen Kyoto','Keihan Gion-Shijo Station','หลังมื้อเย็นเดินไปสถานี Keihan Gion-Shijo (KH39)','5–15 นาที'),
 ...eastReturn()]),
];
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
  walk(HOME,'Namba Parks','Rainy Plan: เลือก Osaka indoor แทน Uji/Nara เพื่อไม่เดินกลางฝน','15–25 นาที'),
  walk('Namba Parks','Nippombashi / Yayoiken','เลือกหาร้านอาหารในอาคาร; หากฝนหนักให้ใช้ Metro ตามสภาพ','15–25 นาที'),
  walk('Nippombashi / Yayoiken','Namba City','เดินกลับ Namba City / Takashimaya ภายในย่านห้าง','10–20 นาที'),
  walk('Namba City',HOME,'กลับโรงแรม เตรียมกระเป๋า Kinosaki วันถัดไป','15–25 นาที')
 ]:[
  daikokuWalk(), daikokuUmeda(),
  leg(OSAKA,'JR Uji Station Kyoto','JR Kyoto Line + JR Nara Line','JR Kansai WIDE Area Pass · ครอบคลุม JR เท่านั้น',[
    at('JR Osaka · Central / South / Midosuji Gate','เดินจาก Metro Umeda เข้าประตู JR ที่ใกล้ที่สุด สอด Kansai WIDE Pass และรับคืน → ดูจอชานชาลา JR Kyoto Line (โดยทั่วไปแถว 7–10) ขึ้น Special Rapid / Rapid ที่จอด Kyoto'),
    at('JR Kyoto · Nara Line','เปลี่ยนภายในประตู JR ไม่ต้องแตะ/สอดบัตรอีก → ตามป้าย Nara Line (奈良線) ตรวจเลขชานชาลาและขบวนที่จอด Uji (宇治) บนจอ ไม่ขึ้นรถที่วิ่งผ่าน Uji'),
    at('JR Uji · ทางออกไป Byodo-in','ลง JR Uji (ไม่ใช่ Keihan Uji) → สอด JR Pass ผ่านประตูตรวจตั๋วแล้วหยิบบัตรคืน → ไปฝั่งทางออกสู่ Byodoin Omotesando / Byodo-in ตามป้ายทางเดินและแผนที่')],{duration:'เผื่อ 60–90 นาทีรวมรอและเปลี่ยนรถ ไม่ใช่รอบขบวนยืนยัน'}),
  walk('JR Uji Station Kyoto','Byodo-in Temple Uji Kyoto','เดินตาม Byodoin Omotesando ไปวัด Byodo-in ราว 10–15 นาที สวนเปิด 08:45 ค่าเข้า ¥700/คน','10–15 นาที'),
  walk('Byodo-in Temple Uji Kyoto','Uji Bridge Kyoto','หลังชมวัด เดินกลับถนน Omotesando แล้วไปสะพาน Uji Bridge ริมแม่น้ำ','8–12 นาที'),
  walk('Uji Bridge Kyoto','Nakamura Tokichi Honten Uji Kyoto','เดินต่อไปสาขาหลัก Nakamura Tokichi Honten ที่ Uji Ichiban 10 ใกล้ JR Uji; เปิด 10:00 ไม่รับจองคาเฟ่','8–15 นาที'),
  walk('Nakamura Tokichi Honten Uji Kyoto','JR Uji Station Kyoto','ร้านห่างจากสถานี JR Uji เพียงประมาณ 1 นาที; เผื่อรอรถไฟให้ทันออกจาก Uji ก่อนเที่ยง','1–5 นาที'),
  leg('JR Uji Station Kyoto','JR Nara Station','JR Nara Line','JR Kansai WIDE Area Pass · ไม่ใช้ Kintetsu',[
    at('JR Uji','ขึ้น JR Nara Line ขบวนไป Nara; Rapid/Miyakoji Rapid หรือ Local ที่ระบุปลายทาง Nara ตรวจเวลาบนบอร์ด'),
    at('JR Nara','ลง JR Nara Station; ไม่ใช่ Kintetsu-Nara · ทางเดินไปย่านร้านอาหารไกลกว่า Kintetsu')],{duration:'เดินทางประมาณ 30–40 นาที ขึ้นกับขบวนและรอ'}),
  walk('JR Nara Station','Kamaiki Honten Nara','เดินจาก JR Nara ตาม Sanjo-dori ไปย่าน Higashimuki Shopping Street ที่ 13-2 Higashimuki-minamimachi ใกล้ Kintetsu-Nara; ถ้าคิวยาวไป Saizeriya ในสถานี Kintetsu','18–25 นาที'),
  walk('Kamaiki Honten Nara','Nara Park Nara Japan','กินมื้อกลางวันก่อนเที่ยวสวนกวาง เดินจาก Higashimuki ไป Nara Park ตามถนน Noborioji','10–20 นาที'),
  walk('Nara Park Nara Japan','Todai-ji Great Buddha Hall Nara','เดินจากสวนกวางไป Great Buddha Hall ผ่าน Nandaimon ชมวัด ค่าเข้า ¥800/คน','15–25 นาที'),
  ...(mode==='relaxed'?[
    walk('Todai-ji Great Buddha Hall Nara','JR Nara Station','Relaxed Plan: ข้าม Kasuga Taisha เดินทางกลับ JR Nara; ถ้าเดินเหนื่อยให้ใช้ Nara City Bus ไป JR Nara (ค่าโดยสารแยกจากพาส)','35–50 นาทีเดิน หรือรถบัสตามรอบ')
  ]:[
    walk('Todai-ji Great Buddha Hall Nara','Kasuga Taisha Nara','เดินไป Kasuga Taisha ราว 20–30 นาที เป็นจุด Optional; เขตสักการะทั่วไปเปิดถึง 17:00 แต่เขตพิเศษปิด 16:00','20–30 นาที'),
    walk('Kasuga Taisha Nara','JR Nara Station','เดินกลับผ่านสวนและย่านเมืองเก่าราว 40–55 นาที หรือขึ้น Nara City Bus จากป้ายใกล้ศาลเจ้าไป JR Nara (จ่ายค่าโดยสารแยก)','40–55 นาทีเดิน / รถบัสตามรอบ')
  ]),
  leg('JR Nara Station','JR Tennoji Station','JR Yamatoji Line / Yamatoji Rapid','JR Kansai WIDE Area Pass · JR จ่ายแล้วในพาส',[
    at('JR Nara','ใช้ JR Pass ผ่านประตู ขึ้น Yamatoji Rapid / Rapid / Local ตามจอที่ไป Tennoji ผ่าน Horyuji/Oji ตรวจปลายทางจริง'),
    at('JR Tennoji','ลง Tennoji แล้วออกประตู JR ตามป้าย Osaka Metro Midosuji (M23)')],{duration:'ประมาณ 35–50 นาที ขึ้นกับขบวน'}),
  leg('Tennoji (M23)',DAI,'Osaka Metro Midosuji Line','ICOCA · Metro ไม่รวม JR Pass (ประมาณ ¥190/คน)',[
    at('Tennoji (M23)','แตะ ICOCA เข้า Metro Midosuji สีแดง ขึ้นขบวนมุ่งเหนือไป Umeda / Shin-Osaka'),
    at('Daikokucho (M21)','ลง Daikokucho (2 สถานีจาก Tennoji ผ่าน Dobutsuen-mae) แล้วแตะออก')],{duration:'ประมาณ 5–10 นาทีบนรถ'}),
  daikokuHome()
 ];
const daySix=()=>[
 daikokuWalk(),daikokuUmeda(),
 leg(OSAKA,KINO,'JR Limited Express Kounotori 5','JR Kansai WIDE Area Pass + Reserved Seat ที่จองแล้ว',[
 at('JR Osaka Station · เข้า JR','จาก Metro Umeda ใช้ Central Gate / South Gate / Midosuji Gate ที่สะดวก สอด JR Pass และหยิบบัตรคืน เตรียมตั๋ว Reserved Seat → ตรวจจอ Kounotori 5 เวลา 10:12 และเลขชานชาลาจริง (ห้ามใช้เลขชานชาลาของรถไป Kyoto แทน)'),
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
const dayNine=prefs=>{
 const choice=prefs?.airportTrain||'express';
 const common=[
  walk(HOME,'Namba Yasaka Shrine Osaka','หลังอาหารเช้าเช็กเอาต์ฝากกระเป๋า เดินไป Namba Yasaka ศาลเจ้าหัวสิงโตยักษ์','10–20 นาที'),
  walk('Namba Yasaka Shrine Osaka','Osaka Metro Namba Station (S16)','เดินกลับสถานี Namba สาย Sennichimae สีชมพู','10–20 นาที'),
  leg('Osaka Metro Namba Station (S16)','Tanimachi 9-chome Station (S18)','Osaka Metro Sennichimae Line','ICOCA ¥190/คน · JR Pass ไม่ครอบคลุม',[
   at('Namba (S16)','ขึ้น Sennichimae Line สีชมพู มุ่ง Minami-Tatsumi ผ่าน Nippombashi'),
   at('Tanimachi 9-chome (S18)','ลงสถานี S18 แตะออก แล้วเดินไป Crepe & Espresso & 9-chome')],{duration:'ประมาณ 3–5 นาทีบนรถ ไม่รวมเดิน'}),
  walk('Tanimachi 9-chome Station (S18)','Crepe & Espresso & 9-chome Osaka','เดินไปคาเฟ่ เปิดประมาณ 11:00 ตรวจวันหยุด','1–5 นาที'),
  walk('Crepe & Espresso & 9-chome Osaka','Tanimachi 9-chome Station (S18)','หลังทานเครปกลับสถานี','1–5 นาที'),
  leg('Tanimachi 9-chome Station (S18)','Osaka Metro Namba Station (S16)','Osaka Metro Sennichimae Line','ICOCA ¥190/คน · JR Pass ไม่ครอบคลุม',[
   at('Tanimachi 9-chome (S18)','ขึ้นรถมุ่ง Noda-Hanshin ผ่าน Nippombashi'),
   at('Namba (S16)','ลง Namba แตะออกและเดินไปร้านชีสเค้ก')],{duration:'ประมาณ 3–5 นาทีบนรถ ไม่รวมเดิน'}),
  walk('Osaka Metro Namba Station (S16)','Rikuro’s Cheesecake Namba Main Store Osaka','ซื้อชีสเค้กแบบ Takeaway ถ้าคิวเกิน 15 นาทีให้ข้าม','5–12 นาที'),
  walk('Rikuro’s Cheesecake Namba Main Store Osaka','Shirokitsune Namba CITY South Osaka','เลือกรับประทานมื้อกลางวันเบา ๆ ถ้ายังหิว','5–15 นาที'),
  walk('Shirokitsune Namba CITY South Osaka',HOME,'กลับ Centara รับกระเป๋าให้เสร็จก่อน 12:40 และออก Nankai Namba ประมาณ 13:00','10–20 นาที')
 ];
 if(choice==='jr')return [
 ...common,
 walk('Namba CITY / Centara',DAI,'รับกระเป๋าจากโรงแรม แล้วเดินไป Metro Daikokucho','ประมาณ 5–15 นาที'),
 leg(DAI,'JR Tennoji Station','Osaka Metro Midosuji + เดิน','Metro ใช้ ICOCA แยกจาก JR Pass',[
 at('Daikokucho (M21)','ขึ้น Midosuji สีแดงมุ่งใต้ Nakamozu / Tennoji'),
 at('Tennoji (M23)','ลงที่ Tennoji แล้วออก Metro เดินตามป้าย JR Tennoji')]),
 leg('JR Tennoji Station','Kansai-airport Station (JR)','JR HARUKA / Airport Rapid','JR Kansai WIDE Pass หมดวันที่ 24 พ.ย. · วันที่ 25 ต้องซื้อตั๋ว JR แยก',[
 at('JR Tennoji','ซื้อตั๋ว JR แยกแล้วเข้าประตู JR ตรวจชานชาลาขบวน HARUKA หรือ Kansai Airport Rapid ที่ไป KIX จริง'),
 at('Kansai-airport (JR)','ลงสถานี JR Kansai-airport เดินตามป้าย Terminal 1 Departures')],{duration:'ตรวจขบวนและรอบจริง',note:'วันที่ 25 พ.ย. JR Pass หมดอายุแล้ว · ต้องจ่ายค่ารถไฟเพิ่ม'}),
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
const dayEight=()=>[
 walk(HOME,DAI,'เดินไป Daikokucho (M21) เพื่อขึ้น Metro Midosuji','5–12 นาที'),
 leg(DAI,'JR Osaka Station','Osaka Metro Midosuji','ICOCA จ่ายแยกจาก JR Pass',[
  at('Daikokucho (M21)','ขึ้น Metro Midosuji ทิศ Shin-Osaka / Esaka / Minoh-kayano ลง Umeda (M16)'),
  at('Umeda (M16)','ออกจาก Metro แล้วเดินตามป้าย JR Osaka Station; เข้าประตู JR ด้วย Kansai WIDE Pass')],{duration:'20–30 นาทีรวมเดิน'}),
 leg('JR Osaka Station','JR Tofukuji Station (JR-D02)','JR Kyoto Line + JR Nara Line','Kansai WIDE Pass วันที่ 5 ครอบคลุมช่วง JR',[
  at('JR Osaka','ขึ้น JR Kyoto Line Special Rapid มุ่ง Kyoto / Maibara / Tsuruga ตรวจจอขบวนและชานชลาจริง'),
  at('JR Kyoto','เปลี่ยน JR Nara Line รถมุ่ง Nara ลง Tofukuji (JR-D02)'),
  at('JR Tofukuji','ออกจากฝั่ง JR แล้วตามป้าย Keihan Railway; รถไฟ Keihan ต้องจ่าย ICOCA แยก')],{duration:'ประมาณ 45–65 นาทีรวมเปลี่ยนรถ'}),
 leg('Keihan Tofukuji (KH36)','Gion-Shijo (KH39)','Keihan Main Line','ICOCA จ่ายแยกจาก Kansai WIDE Pass',[
  at('Keihan Tofukuji (KH36)','แตะ ICOCA เข้า Keihan เลือกรถทิศ Demachiyanagi / Sanjo ที่จอด Gion-Shijo'),
  at('Gion-Shijo (KH39)','ลงและแตะออก Exit 6 ไปย่าน Gion และ Hanamikoji')],{duration:'ประมาณ 10–20 นาทีรวมรอรถ'}),
 walk('Gion-Shijo (KH39)','Hanamikoji Street','เดินชมย่าน Gion และบ้านไม้เก่า','ประมาณ 5–10 นาที'),
 walk('Hanamikoji Street','Yasaka Shrine Kyoto','เดินไปศาลเจ้า Yasaka และเลือกอาหารกลางวันแถว Gion','ประมาณ 10–20 นาที'),
 walk('Yasaka Shrine Kyoto','Kiyomizu-dera Kyoto','เดินผ่าน Yasaka Pagoda → Ninenzaka → Sannenzaka; แวะร้านขนมและคาเฟ่ก่อนชม Kiyomizu Night Viewing เวลา 17:30','บ่ายถึงค่ำตามแผน'),
 leg('Gojozaka / Kiyomizu-michi','Kyoto Station','Kyoto City Bus','ICOCA จ่ายแยก; รถแน่นเลือกแท็กซี่',[
  at('Kiyomizu-dera','เดินลงไปป้าย Gojozaka / Kiyomizu-michi และตรวจรถบัสที่มุ่ง Kyoto Station'),
  at('Kyoto Station','ลงแล้วเดินไป JR Kyoto และเข้า JR Gate ด้วย Kansai WIDE Pass')],{duration:'30–60 นาทีรวมรอรถ'}),
 leg('JR Kyoto Station','JR Osaka Station','JR Kyoto Line Special Rapid','Kansai WIDE Pass วันที่ 24 พ.ย. ใช้ได้',[
  at('JR Kyoto','ตรวจป้าย Special Rapid ทิศ Osaka / Himeji'),
  at('JR Osaka','เดินต่อไป Metro Umeda (M16)')],{duration:'ประมาณ 30 นาทีบนรถ'}),
 leg('Umeda Station (M16)',DAI,'Osaka Metro Midosuji','ICOCA จ่ายแยก',[
  at('Umeda (M16)','ขึ้น Midosuji Line ทิศ Nakamozu ลง Daikokucho (M21)'),
  at('Daikokucho (M21)','ออกแล้วเดินกลับ Centara Life Namba')],{duration:'ประมาณ 12–18 นาที'})
];
const airportEnd=()=>[
 walk('Kansai-airport Station',KIX,'ตามป้าย Terminal 1 / International Departures ไปเคาน์เตอร์เช็กอินสายการบิน', 'เดินในอาคารประมาณ 5–15 นาที'),
 leg(KIX,'Suvarnabhumi Airport (BKK)','เครื่องบิน','Thai Airways TG673 · ยืนยันการจองแล้ว',[
 at('KIX Terminal 1 · 17:25 JST','เช็กอิน Thai Airways · 2 PCS โหลด (จำนวนชิ้น ไม่ใช่ KG) แล้วผ่าน Security / Immigration'),
 at('BKK Suvarnabhumi · 22:00 (25 พ.ย. ICT)','ถึงประเทศไทยวันที่ 25 พ.ย. 22:00 ตามเวลาไทย')],{duration:'ตารางบินจองแล้ว',note:'เที่ยวบิน '+flightNumberLabel(travelBookings.flights.inbound)+' · ตรวจบัตรโดยสารจริง'})
];
export function detailedRouteGuide(day,prefs={}){
 const mode=prefs.dayPlans?.[day]||'original';
 const legs=day===1?dayOne():day===2?dayTwo(mode):day===3?dayThree():day===4?(prefs.kyoto==='east'?kyotoEast(mode):kyotoWest(mode)):day===5?dayFive(mode):day===6?daySix():day===7?daySeven():day===8?dayEight():day===9?dayNine(prefs):[];
 return {day,legs:legs.map(addNavigationDetails),kicker:['','จากสนามบินเข้าที่พัก','เที่ยว Osaka Castle / Kuromon / Umeda','USJ ไป–กลับ','Kyoto West + Gion + Kodaiji Night Illumination','Nara ไป–กลับ','Osaka → Kinosaki Onsen','Kinosaki → Osaka','Kyoto East / Kiyomizu Night','Namba → KIX'][day],
 overview:legs.map(x=>x.from+' → '+x.to).join(' · '),
 leave:day===1?'ถึง KIX 15:45 แล้วเลือก Rapi:t หลังรับกระเป๋า':day===3?'ออกก่อนเปิดสวน · ตรวจเวลา USJ จริง':day===6?'Kounotori 5 ออกจาก JR Osaka 10:12':day===7?'Kounotori 22 ออกจาก Kinosaki 15:30':day===8?'ออก 09:00 · ใช้ JR Pass วันที่ 5 + ICOCA สำหรับ Metro/Keihan':day===9?'ออก Nankai Namba ประมาณ 13:00 · TG673 17:25':'ดูเวลารายวันและเผื่อการเดิน/ต่อรถ',
 reminder:'ขั้นตอนเป็นแผนใช้เดินทาง ไม่ใช่การบอกชานชาลา/รอบรถแบบ Real-time · อ่านป้ายปลายทางขบวนจริง และใช้ Google Maps ตรวจเส้นทางวันเดินทาง'};
}
