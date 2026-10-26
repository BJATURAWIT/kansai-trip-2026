// Station-pair fare evidence for Osaka Metro. Amounts in JPY per adult, per single ride.
// Matches shortest-route distance fare bands published by Osaka Metro (2026).
// The provider's fare table: https://subway-tr.osakametro.co.jp/en/guide/fare/fare/price.php
// Pairs confirmed against station-to-station fares listed in route references.
export const osakaMetroFareTable=Object.freeze({
 'Daikokucho → Morinomiya (Osaka Castle)':{yen:240,zone:2,kmBand:'3–7 km',origin:'Daikokucho',destination:'Morinomiya',source:'https://global.yometro.com/route-from-daikokucho-osaka-to-morinomiya-osaka'},
 'Osaka Castle → Nippombashi (Kuromon)':{yen:240,zone:2,kmBand:'3–7 km',origin:'Morinomiya',destination:'Nippombashi',source:'https://global.yometro.com/route-from-morinomiya-osaka-to-nippombashi-osaka'},
 'Nippombashi → Shinsaibashi / Namba':{yen:190,zone:1,kmBand:'0–3 km',origin:'Nippombashi',destination:'Shinsaibashi',source:'https://global.yometro.com/route-from-nippombashi-osaka-to-shinsaibashi-osaka',optionalWalk:true},
 'Shinsaibashi → Umeda Sky':{yen:240,zone:2,kmBand:'3–7 km',origin:'Shinsaibashi',destination:'Umeda',source:'https://global.yometro.com/route-from-shinsaibashi-osaka-to-umeda-osaka'},
 'Umeda → Daikokucho':{yen:240,zone:2,kmBand:'3–7 km',origin:'Umeda',destination:'Daikokucho',source:'https://global.yometro.com/route-from-umeda-osaka-to-daikokucho-osaka'},
 'Daikokucho → Umeda':{yen:240,origin:'Daikokucho',destination:'Umeda',source:'https://ekitan.com/transit/fare/sf-5590/st-4960'},
 'Centara → Daikokucho → Umeda':{yen:240,origin:'Daikokucho',destination:'Umeda',source:'https://ekitan.com/transit/fare/sf-5590/st-4960'},
 'JR Osaka → Daikokucho → Centara':{yen:240,origin:'Umeda',destination:'Daikokucho',source:'https://ekitan.com/transit/fare/sf-4960/st-5590'},
 'Daikokucho → Yodoyabashi':{yen:240,origin:'Daikokucho',destination:'Yodoyabashi',source:'https://ekitan.com/transit/fare/sf-5590/st-6143'},
 'Yodoyabashi → Daikokucho':{yen:240,origin:'Yodoyabashi',destination:'Daikokucho',source:'https://ekitan.com/transit/fare/sf-5590/st-6143'},
 'Daikokucho → Namba':{yen:190,origin:'Daikokucho',destination:'Namba',source:'https://ekitan.com/transit/fare/sf-5590/st-5727'},
 'Namba → Daikokucho':{yen:190,origin:'Namba',destination:'Daikokucho',source:'https://ekitan.com/transit/fare/sf-5727/st-5590'},
});
export const osakaMetroFareSource='https://subway-tr.osakametro.co.jp/en/guide/fare/fare/price.php';
export const metroFareForSegment=segment=>segment?.type==='metro'?osakaMetroFareTable[segment.route]||null:null;
export const metroDayPassYen=day=>[5,6,7].includes(day)?620:820;
export function metroChoiceForDay(day,segments,walkShortSegment=false){
 const metro=segments.filter(x=>x.type==='metro');
 const known=metro.map(metroFareForSegment);
 const missing=known.filter(x=>!x).length;
 if(!metro.length||missing)return {day,metroLegs:metro.length,missing,known:false,dayPassYen:metroDayPassYen(day)};
 const selected=known.filter(x=>!(walkShortSegment&&x.optionalWalk));
 const regularYen=selected.reduce((sum,x)=>sum+x.yen,0);
 const dayPassYen=metroDayPassYen(day);
 return {day,metroLegs:metro.length,missing:0,known:true,walkShortSegment,
   regularYen,dayPassYen,regularYenForTwo:regularYen*2,dayPassYenForTwo:dayPassYen*2,
   savingForTwo:Math.max(0,(regularYen-dayPassYen)*2),
   recommendation:regularYen>dayPassYen?'day-pass':'icoca'};
}
