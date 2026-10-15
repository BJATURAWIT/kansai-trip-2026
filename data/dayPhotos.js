// One verified place-specific photo per travel day. Wikimedia Commons images are CC0.
// `filename` is the intended descriptive asset name, while `src` currently points
// to the Commons-hosted original/thumbnail; no image binaries are committed.
const commons = file => ({
  src: `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(file.replaceAll(' ', '_'))}?width=1280`,
  source: `https://commons.wikimedia.org/wiki/File:${encodeURIComponent(file.replaceAll(' ', '_'))}`,
});

export const dayPhotos = {
  1: {
    ...commons('Osaka Dotonbori yoru 02.jpg'),
    filename: 'day-01-osaka-dotonbori.jpg',
    alt: 'คลองโดทงโบริในโอซาก้ายามค่ำคืน พร้อมป้ายไฟนีออนและแสงสะท้อนบนผิวน้ำ',
    caption: 'OSAKA · Dotonbori by night',
    author: 'Sakai Yayoi',
    license: 'CC0 1.0',
    position: 'center 52%',
  },
  2: {
    ...commons('20190121 Osaka Castle-1.jpg'),
    filename: 'day-02-osaka-castle.jpg',
    alt: 'ปราสาทโอซาก้า อาคารสีขาวหลังคาสีเขียวเด่นเหนือสวนและกำแพงหิน',
    caption: 'OSAKA · Osaka Castle',
    author: 'Balon Greyjoy',
    license: 'CC0 1.0',
    position: 'center 51%',
  },
  3: {
    ...commons('USJ Entrance 2026.jpg'),
    filename: 'day-03-universal-studios-japan.jpg',
    alt: 'ทางเข้า Universal Studios Japan เมืองโอซาก้า สถานที่เที่ยวหลักวันที่ 19 พฤศจิกายน',
    caption: 'USJ · Universal Studios Japan',
    author: 'Sakai Yayoi',
    license: 'CC0 1.0',
    position: 'center 54%',
  },
  4: {
    ...commons('Fushimi Inari Taisha- Part I - FushimiInari228.jpg'),
    filename: 'day-04-kyoto-fushimi-inari.jpg',
    alt: 'ทางเดินผ่านเสาโทริอิสีแดงเรียงกันในศาลเจ้าฟุชิมิอินาริ เกียวโต',
    caption: 'KYOTO · Fushimi Inari',
    author: 'lumoplank',
    license: 'CC0 1.0',
    position: 'center 53%',
  },
  5: {
    ...commons('Deer in Nara Park (Unsplash).jpg'),
    filename: 'day-05-nara-park-deer.jpg',
    alt: 'กวางในสวนสาธารณะนารา ประเทศญี่ปุ่น บรรยากาศวันเที่ยว Nara Park',
    caption: 'NARA · Nara Park',
    author: 'Unsplash contributor',
    license: 'CC0 1.0',
    position: 'center 56%',
  },
  6: {
    ...commons('Kinosaki onsen Kita-yanagi street.jpg'),
    filename: 'day-06-kinosaki-canal.jpg',
    alt: 'คลองและถนนคิตะยานางิในเมืองคิโนซากิออนเซ็น ต้นหลิวและบ้านญี่ปุ่นริมทางน้ำ',
    caption: 'KINOSAKI · Kita-yanagi street',
    author: 'Drivephotographer',
    license: 'CC0 1.0',
    position: 'center 54%',
  },
  7: {
    ...commons('Kinosaki-Onsen Gosho-no-yu.jpg'),
    filename: 'day-07-kinosaki-onsen.jpg',
    alt: 'อาคารโรงอาบน้ำโกะโชะโนะยุที่คิโนซากิออนเซ็น สถานที่แช่ออนเซ็นแบบญี่ปุ่น',
    caption: 'KINOSAKI · Gosho-no-yu',
    author: 'MaedaAkihiko',
    license: 'CC0 1.0',
    position: 'center 53%',
  },
  8: {
    ...commons('KIX airport.jpg'),
    filename: 'day-08-kansai-airport.jpg',
    alt: 'ภาพสนามบินนานาชาติคันไซในญี่ปุ่น สำหรับวันเดินทางกลับประเทศไทย',
    caption: 'KIX · Kansai International Airport',
    author: 'Wikimedia Commons / Pixabay contributor',
    license: 'CC0 1.0',
    position: 'center 50%',
  },
};

export const tripImageCredits = Object.values(dayPhotos).map(({filename, caption, author, license, source}) => ({
  filename, caption, author, license, source,
}));
