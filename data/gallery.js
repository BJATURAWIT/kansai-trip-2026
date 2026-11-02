
const localPhoto = (day, spot) => `/photos/day-${day}-${spot}.jpg`;

export const galleryByDay = {
  1:[
    {title:'Kansai International Airport',subtitle:'สนามบิน KIX ที่เดินทางมาถึง',vibe:'Arrival',why:'แลนด์มาร์กสนามบินคันไซเมื่อเดินทางมาถึงญี่ปุ่น',tags:['สนามบิน','KIX'],map:'Kansai International Airport Terminal 1',image:localPhoto(8,3)},
    {title:'Nankai Rapi:t',subtitle:'รถด่วนจาก KIX สู่ Namba',vibe:'Airport train',why:'รถด่วน Rapi:t ที่ซื้อบัตร Super Seat แล้ว',tags:['Nankai','รถไฟ'],map:'Nankai Kansai-airport Station Osaka',image:localPhoto(8,2)},
    {title:'Dotonbori & Glico Sign (Optional)',subtitle:'ย่าน Namba เมื่อยังมีแรง',vibe:'Optional night',why:'เดินเล่นเพิ่มเติมได้หลังเช็กอิน หากไม่เหนื่อยจากเที่ยวบิน',tags:['เดินเล่น','ไม่บังคับ'],map:'Dotonbori Glico Sign Osaka',image:localPhoto(1,3)}
  ],
  2:[
    {title:'Osaka Castle',subtitle:'ปราสาทโอซาก้า',vibe:'Landmark',why:'เที่ยวปราสาทและสวนในช่วงเช้า',tags:['ปราสาท','เช้า'],map:'Osaka Castle Osaka',image:localPhoto(2,1)},
    {title:'Dotonbori / Glico Sign',subtitle:'ป้ายกูลิโกะหลังมื้อเที่ยง',vibe:'Namba',why:'เดินจากร้านอาหารไปจุดถ่ายรูป Ebisubashi',tags:['Glico','คลอง'],map:'Dotonbori Glico Sign Osaka',image:localPhoto(1,1)},
    {title:'Umeda Sky Building',subtitle:'จุดชมวิวช่วงเย็น',vibe:'City view',why:'ชมทิวทัศน์เมืองโอซาก้าจาก Umeda Sky',tags:['วิวเมือง','ช่วงเย็น'],map:'Umeda Sky Building Osaka',image:localPhoto(2,3)}
  ],
  3:[
    {title:'Universal Studios Japan Globe',subtitle:'ลูกโลกทางเข้าสวนสนุก',vibe:'USJ',why:'ถ่ายรูปตรงทางเข้าก่อนเที่ยวสวนสนุก',tags:['USJ'],map:'Universal Studios Japan Osaka',image:localPhoto(3,1)},
    {title:'Super Nintendo World',subtitle:'โซน Mario และ Donkey Kong',vibe:'USJ',why:'โซนที่มีการจองเวลาเข้าไว้',tags:['Mario','Nintendo'],map:'Super Nintendo World Osaka',image:localPhoto(3,2)},
    {title:'Wizarding World of Harry Potter',subtitle:'Hogwarts Castle',vibe:'USJ',why:'ชมปราสาท Hogwarts และเครื่องเล่น Harry Potter',tags:['Harry Potter'],map:'Wizarding World of Harry Potter Osaka',image:localPhoto(3,3)}
  ],
  4:[
    {title:'Arashiyama Bamboo Grove',subtitle:'ป่าไผ่อาราชิยามะ',vibe:'Kyoto West',why:'ชมป่าไผ่ช่วงเช้า',tags:['Arashiyama'],map:'Arashiyama Bamboo Grove Kyoto',image:localPhoto(4,4)},
    {title:'Tenryu-ji Temple',subtitle:'สวน Sogenchi ของวัด',vibe:'Kyoto West',why:'สวนวัดเทนริวจิ',tags:['สวนญี่ปุ่น'],map:'Tenryu-ji Temple Kyoto',image:localPhoto(4,5)},
    {title:'Togetsukyo Bridge',subtitle:'สะพานข้ามแม่น้ำ Arashiyama',vibe:'Kyoto West',why:'สะพานโทเก็ตสึเคียวจริง',tags:['สะพาน','แม่น้ำ'],map:'Togetsukyo Bridge Kyoto',image:localPhoto(4,6)},
    {title:'Hanamikoji / Gion',subtitle:'ถนนฮานามิโคจิ',vibe:'Kyoto East',why:'ถนนจริงในย่านกิอง',tags:['Gion'],map:'Hanamikoji Street Gion Kyoto',image:localPhoto(4,7)},
    {title:'Yasaka Shrine',subtitle:'ประตูศาลเจ้ายาซากะ',vibe:'Kyoto East',why:'ชมศาลเจ้าก่อนเดินสู่โคไดจิ',tags:['ศาลเจ้า'],map:'Yasaka Shrine Kyoto',image:localPhoto(4,8)},
    {title:'Kodaiji Night Illumination',subtitle:'สวนไผ่ภายใน Kodaiji ประดับไฟ',vibe:'Night',why:'ภาพถ่ายจริงของงานเปิดไฟวัดโคไดจิ ไม่ใช่ป่าไผ่ Arashiyama',tags:['เปิดไฟ','Kodaiji'],map:'Kodaiji Temple Kyoto',image:localPhoto(4,9)}
  ],
  5:[
    {title:'Nara Park Deer',subtitle:'กวางที่สวน Nara',vibe:'Nature',why:'กวางที่สวนสาธารณะนารา',tags:['กวาง'],map:'Nara Park Nara',image:localPhoto(5,1)},
    {title:'Todai-ji',subtitle:'วัดพระใหญ่โทไดจิ',vibe:'Temple',why:'สถาปัตยกรรมของวัด Todai-ji',tags:['วัด'],map:'Todai-ji Nara',image:localPhoto(5,2)},
    {title:'Kasuga Taisha',subtitle:'โคมไฟที่ศาลเจ้าคาสุงะ',vibe:'Shrine',why:'โคมไฟหินของศาลเจ้าคาสุงะ',tags:['ศาลเจ้า'],map:'Kasuga Taisha Nara',image:localPhoto(5,3)}
  ],
  6:[
    {title:'Limited Express Kounotori',subtitle:'รถไฟ JR ไป Kinosaki',vibe:'Rail journey',why:'ภาพขบวน Kounotori จริง ไม่ใช่ Kuroshio',tags:['รถไฟ'],map:'Osaka Station',image:localPhoto(6,4)},
    {title:'Kinosaki Onsen Canal',subtitle:'คลองและถนนเมืองออนเซ็น',vibe:'Kinosaki',why:'เมืองริมคลองที่ไปพักค้างคืน',tags:['เมืองออนเซ็น'],map:'Kinosaki Onsen Japan',image:localPhoto(6,1)},
    {title:'Nishimuraya Hotel Shogetsutei',subtitle:'ภาพถ่ายจริงของโรงแรมที่พัก',vibe:'Ryokan',why:'ภาพจากโรงแรม Nishimuraya Kinosaki Onsen เผยแพร่ภายใต้ CC BY-SA 2.0 พร้อมเครดิตผู้ถ่าย',tags:['เรียวกัง','ภาพจริง'],map:'Nishimuraya Hotel Shogetsutei Kinosaki',image:localPhoto(6,5)}
  ],
  7:[
    {title:'Kinosaki Onsen by Day',subtitle:'ถนนเมืองออนเซ็นช่วงกลางวัน',vibe:'Kinosaki',why:'รูปจริงของถนนคิโนซากิในเวลากลางวัน',tags:['เมืองเก่า'],map:'Kinosaki Onsen Japan',image:localPhoto(7,4)},
    {title:'Gosho-no-yu',subtitle:'อาคารโรงอาบน้ำโกะโชะโนะยุ',vibe:'Onsen',why:'ภาพอาคารโรงอาบน้ำ Gosho-no-yu',tags:['ออนเซ็น'],map:'Gosho-no-yu Kinosaki',image:localPhoto(7,1)},
    {title:'Namba Night Street',subtitle:'เดินชมโอซาก้าคืนสุดท้าย',vibe:'Osaka',why:'บรรยากาศแสงสีเมืองโอซาก้ายามค่ำ',tags:['กลางคืน'],map:'Namba Osaka',image:localPhoto(7,3)}
  ],
  8:[
    {title:'Namba Yasaka Shrine',subtitle:'ศาลเจ้าหัวสิงโตยักษ์',vibe:'Osaka',why:'ภาพถ่ายหัวสิงโตจริงของศาลเจ้านัมบะยาซากะ',tags:['09:20','ศาลเจ้า'],map:'Namba Yasaka Shrine Osaka',image:localPhoto(8,4)},
    {title:'Crepe & Espresso & 9-chome',subtitle:'ภาพจาก Instagram ทางการของร้าน',vibe:'Dessert',why:'แสดงโพสต์จากบัญชีร้านจริงโดยตรง ผ่าน Instagram Embed ไม่คัดลอกหรือเก็บไฟล์ภาพของร้าน',tags:['11:00','เครป'],map:'Crepe & Espresso & 9-chome Osaka',image:null,photoStatus:'official-embed',embedUrl:'https://www.instagram.com/p/DK5lgVgTMDU/embed/',photoSource:'https://www.instagram.com/p/DK5lgVgTMDU/'},
    {title:'Rikuro’s Cheesecake — Namba Main Store',subtitle:'หน้าร้าน Rikuro’s Namba',vibe:'Dessert',why:'รูปถ่ายจริงของหน้าร้าน Namba Main Store',tags:['12:25','ชีสเค้ก'],map:'Rikuro’s Cheesecake Namba Main Store Osaka',image:localPhoto(8,5)},
    {title:'Nankai Namba Station',subtitle:'สถานีต้นทางไปสนามบิน KIX',vibe:'Transit',why:'ภาพชานชาลาของสถานี Nankai Namba จริง',tags:['15:00','สนามบิน'],map:'Nankai Namba Station Osaka',image:localPhoto(8,6)}
  ],
};
