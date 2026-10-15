import './globals.css';

export const metadata = {
  title: 'Kansai, With You — Japan Trip 2026',
  description: 'แผนเที่ยวโอซาก้า เกียวโต คิโนซากิ ออนเซ็น และ Checklist วันที่ 17–24 พฤศจิกายน 2026',
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }) {
  return <html lang="th"><body>{children}</body></html>;
}
