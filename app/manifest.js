export default function manifest() {
  return {
    name: 'Kansai, With You — Japan Trip 2026',
    short_name: 'Kansai 2026',
    description: 'Our Kansai 2026 itinerary and tickets',
    start_url: '/',
    scope: '/',
    display: 'standalone',
    background_color: '#f8faf7',
    theme_color: '#153e35',
    icons: [
      {src:'/icon',sizes:'512x512',type:'image/png',purpose:'any'},
      {src:'/apple-icon',sizes:'180x180',type:'image/png',purpose:'any'}
    ]
  };
}
