// Verified station-specific fare evidence (single adult, JPY). Last reviewed 26 Oct 2026.
// Each value refers to an explicitly chosen route, not a vague mixed-company journey.
import {metroFareForSegment,metroChoiceForDay,metroDayPassYen} from './osakaMetroFares.js';
import {fareLabel} from './travelTools.js';
const options={
 'Osaka-Namba → Nishikujo':{yen:220,source:'https://hanshin.co.jp/global/en/timetable_gare/',operator:'Hanshin'},
 'Nishikujo → Osaka-Namba':{yen:220,source:'https://ekitan.com/transit/fare/sf-5213/st-5747',operator:'Hanshin'},
 'Nishikujo → Universal-City':{yen:180,source:'https://transit.yahoo.co.jp/search/result/西九条-ユニバーサルシティ',operator:'JR West'},
 'Universal-City → Nishikujo':{yen:180,source:'https://transit.yahoo.co.jp/search/result/西九条-ユニバーサルシティ',operator:'JR West'},
 'Osaka-Namba → Kintetsu-Nara':{yen:680,source:'https://eki.kintetsu.co.jp/english/N3?date=20260423&ep=0&pn=3&rp=0&sf=5212-Kintetsu-Nara+%5BA28%5D&sr=0&st=5213-Osaka-Namba+%5BA01%5D&time=1300&tp=0',operator:'Kintetsu'},
 'Kintetsu-Nara → Osaka-Namba':{yen:680,source:'https://eki.kintetsu.co.jp/english/N3?date=20260423&ep=0&pn=3&rp=0&sf=5212-Kintetsu-Nara+%5BA28%5D&sr=0&st=5213-Osaka-Namba+%5BA01%5D&time=1300&tp=0',operator:'Kintetsu'},
 'Hankyu Arashiyama → Kyoto-Kawaramachi':{yen:240,source:'https://www.hankyu.co.jp/station/fare.html',operator:'Hankyu',note:'ตรวจค่าโดยสารจริงบนเส้นทาง HK98–HK86'},
 'Gion-Shijo → Yodoyabashi':{yen:490,source:'https://ekitan.com/rail-company/592/fare/sf-5378/st-6143',operator:'Keihan'},
 'Yodoyabashi → Fushimi-Inari':{yen:480,source:'https://ekitan.com/transit/fare/sf-6143/st-5921',operator:'Keihan'},
 'Fushimi-Inari → Kiyomizu-Gojo / Kyoto National Museum':{yen:240,source:'https://ekitan.com/transit/fare/sf-5921/st-5301',operator:'Keihan',note:'ราคาปลายทางสถานี Kiyomizu-Gojo; เดินต่อพิพิธภัณฑ์'},
 'Gion-Shijo / Kyoto → Yodoyabashi':{yen:490,source:'https://ekitan.com/rail-company/592/fare/sf-5378/st-6143',operator:'Keihan',note:'สถานีขึ้น Gion-Shijo เท่านั้น'},
 'Nankai Namba → Kansai Airport · Airport Express':{yen:970,source:'https://www.nankai.co.jp/traffic/kix/kix_dia.html',operator:'Nankai'},
 'Nankai Namba → Kansai Airport · Rapi:t Regular Seat':{yen:1670,source:'https://www.nankai.co.jp/en_railway/traffic/express/rapit.html',operator:'Nankai',note:'ค่าโดยสาร ¥970 + ค่ารถด่วน Regular ¥700'},
};
export const verifiedSegmentPrices=Object.freeze(options);
export const pricedSegment=segment=>{
 const metro=metroFareForSegment(segment);
 return metro?{yen:metro.yen,source:metro.source,operator:'Osaka Metro'}:options[segment.route]||null;
};
export function resolveFare(day,segment,tickets){
 const state=fareLabel(segment,day,tickets);
 const prepaid=segment.prepaid===true,walk=segment.type==='walk',shuttle=segment.type==='shuttle';
 const jrCovered=segment.type==='jr'&&state.status==='included';
 if(prepaid)return {...segment,state,status:'prepaid',yen:0,source:segment.fareSource||null,paidYen:(segment.fareYenPerAdult||0)*2};
 if(walk||shuttle)return {...segment,state,status:'free',yen:0,source:null};
 if(jrCovered)return {...segment,state,status:'covered',yen:0,source:'https://www.westjr.co.jp/global/en/ticket/pass/kansai_wide/',note:segment.note};
 const priced=pricedSegment(segment);
 if(!priced) return {...segment,state,status:'unresolved',yen:null,source:null};
 return {...segment,state,status:'additional',yen:priced.yen,source:priced.source,operator:priced.operator,priceNote:priced.note};
}
export function fareSummary(day,segments,tickets,{metroPass=false}={}){
 const rows=segments.map(s=>resolveFare(day,s,tickets));
 const unknown=rows.filter(x=>x.yen===null);
 const railYen=rows.filter(x=>x.type!=='metro').reduce((a,x)=>a+(x.yen||0),0);
 const metro=metroChoiceForDay(day,segments);
 const metroRegularYen=rows.filter(x=>x.type==='metro').reduce((a,x)=>a+(x.yen||0),0);
 // A Metro day pass replaces ALL separately paid Metro rides on selected days.
 const effectiveMetroYen=metroPass&&metro.metroLegs?metroDayPassYen(day):metroRegularYen;
 return {day,rows,unresolved:unknown.length,metro,metroPassApplied:metroPass&&metro.metroLegs>0,
   twoPeopleYen:(railYen+effectiveMetroYen)*2,
   perPersonYen:railYen+effectiveMetroYen,
   complete:unknown.length===0};
}
