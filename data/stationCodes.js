// Passenger-facing station identifiers. These are fixed station codes, not platform numbers.
// Match specific operators before generic station names; attractions are intentionally excluded.
const stationCodes = [
  [/\bJR Saga-Arashiyama\b|\bSaga-Arashiyama(?: Station)?\b/i, 'JR-E08'],
  [/\bJR Kyoto\b|\bKyoto Station\b/i, 'JR-A31 / JR-E01 / JR-D01'],
  [/\bJR Osaka\b|\bOsaka Station\b/i, 'JR-A47'],
  [/\bDaikokucho\b/i, 'M21 / Y16'],
  [/\bUmeda(?: Station)?\b/i, 'M16'],
  [/\bHommachi\b/i, 'M18 / C16 / Y13'],
  [/\bMorinomiya\b/i, 'C19 / N20'],
  [/\bShinsaibashi\b/i, 'M19 / N15'],
  [/\bTennoji\b/i, 'M23'],
  [/\bTanimachi 9-chome\b/i, 'T25 / S18'],
  [/\bNippombashi\b/i, 'K17 / S17'],
  [/\bTenjimbashisuji 6-chome\b/i, 'T18 / K11'],
  [/\bYodoyabashi\b/i, 'M17'],
  [/\bNankai Namba\b/i, 'NK01'],
  [/\bOsaka-Namba\b/i, 'HS41'],
  [/\bNamba(?: Station)?\b/i, 'M20 / Y15 / S16'],
  [/\bNishikujo\b/i, 'HS45 / JR-P14'],
  [/\bUniversal-City\b/i, 'JR-P16'],
  [/\bHankyu Arashiyama\b/i, 'HK98'],
  [/\bKatsura\b/i, 'HK81'],
  [/\bKyoto-Kawaramachi\b/i, 'HK86'],
  [/\bGion-Shijo\b/i, 'KH39'],
  [/\bKansai-airport\b|\bKansai Airport\b|\bKansai International Airport\b/i, 'NK32 / JR-S47'],
  [/\bJR Uji\b|\bUji Station\b/i, 'JR-D09'],
  [/\bJR Inari\b/i, 'JR-D03'],
  [/\bJR Nara\b/i, 'JR-D21'],
  [/\bKintetsu-Nara\b/i, 'A28'],
];
export function stationCodeFor(label) {
  const text=String(label||'');
  return stationCodes.find(([pattern])=>pattern.test(text))?.[1] || '';
}
export function withStationCode(label) {
  const text=String(label||'');
  const codes=stationCodeFor(text);
  if(!codes)return text;
  // A printed line/station code already present should not be appended twice.
  const parts=codes.split(' / ');
  if(parts.some(code=>new RegExp('(^|[^A-Za-z0-9])'+code+'([^A-Za-z0-9]|$)','i').test(text)))return text;
  return text+' ('+codes+')';
}
