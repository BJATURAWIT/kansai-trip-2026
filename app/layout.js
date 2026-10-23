import './globals.css';

export const metadata = {
  title: 'Kansai, With You — Japan Trip 2026',
  description: 'แผนเที่ยวโอซาก้า เกียวโต คิโนซากิ ออนเซ็น และ Checklist วันที่ 17–24 พฤศจิกายน 2026',
  applicationName: 'Kansai Trip 2026',
  appleWebApp: { capable: true, title: 'Kansai 2026', statusBarStyle: 'default' },
  icons: {
    icon: [{ url: '/icon', sizes: '512x512', type: 'image/png' }],
    apple: [{ url: '/apple-icon', sizes: '180x180', type: 'image/png' }],
  },
  manifest: '/manifest.webmanifest',
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }) {
  return <html lang="th"><body>{children}</body></html>;
}
