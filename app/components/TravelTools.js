'use client';
import { useEffect,useState } from 'react';
import { Ticket,TrainFront,MapPin,Clock3,CheckCircle2,Navigation,ArrowRight } from 'lucide-react';
import {itinerary} from '../../data/trip';
import {travelBookings} from '../../data/centralTravel';
import {transportByDay,defaultTickets,passEndDate,fareLabel,kyotoOptions,importantStops} from '../../data/travelTools';
import {mapSearchUrl,mapDirectionsUrl} from '../../data/mobility';
import {getJapanClock,tripPhase,dayForDate,nextScheduleEntry,resolveDay,resolvedStops,resolvedSegments} from '../../data/experience';

const labelDay=n=>`${n+16} พ.ย.`;
export function PassGuide({tickets,prefs}){
 const [filter,setFilter]=useState('all');
 const dayPassPrice=day=>[5,6,7].includes(day)?620:820;
 const knownPrice=segment=>{
   if(segment.type==='kintetsu'&&segment.route.includes('Kintetsu-Nara'))return {fare:680,source:'https://www.kintetsu.co.jp/foreign/english/aoniyoshi/'};
   return {fare:null,source:null};
 };
 const all=itinerary.flatMap(d=>resolvedSegments(d.day,prefs).map((leg,i)=>{
   const state=fareLabel(leg,d.day,tickets),verified=knownPrice(leg);
   const waived=leg.type==='jr'&&(state.status==='included');
   const free=leg.type==='walk'||leg.type==='shuttle';
   const fare=waived||free?0:verified.fare;
   return {...leg,day:d.day,id:d.day+'-'+i,state,fare,source:verified.source,waived,free};
 }));
 const grouped=itinerary.map(d=>{
   const list=all.filter(x=>x.day===d.day);
   const known=list.reduce((sum,x)=>sum+(x.fare??0),0);
   const missing=list.filter(x=>x.fare===null).length;
   const eligibleMetro=list.filter(x=>x.type==='metro').length;
   const pass=dayPassPrice(d.day);
   return {day:d.day,known:known*2,missing,eligibleMetro,pass,saved:prefs.metroPassDays?.[d.day]===true};
 });
 const visible=filter==='all'?all:all.filter(x=>String(x.day)===filter);
 const total=grouped.reduce((sum,x)=>sum+x.known,0);
 const unknown=grouped.reduce((sum,x)=>sum+x.missing,0);
 return <section className="tool-pane"><header className="tool-head"><span>TRANSPORT CALCULATOR · 2 ADULTS</span><h2><TrainFront/> ค่าเดินทางและบัตรโดยสาร</h2><p>ใช้เฉพาะราคาที่ตรวจยืนยันได้ · ราคาที่ไม่ทราบจะไม่ถูกนำมาบวกเป็นศูนย์แบบหลอกว่าเป็นยอดรวมจริง</p></header>
 <div className="pass-alert"><strong>{travelBookings.jrPass.name} · {travelBookings.jrPass.startDate} ถึง {travelBookings.jrPass.endDate} · ซื้อแล้ว ¥{travelBookings.jrPass.totalPriceYen.toLocaleString('en-US')} สำหรับ {travelBookings.jrPass.travelers} คน</strong><span>แสดงค่า JR ที่อยู่ในช่วงพาสว่า “รวมเมื่อรับพาส” จนกว่าจะยืนยันรับบัตรที่ Checklist · ค่า Metro, Nankai และ Kintetsu จ่ายเพิ่ม</span></div>
 <div className="tool-card"><h3>ค่าโดยสารเพิ่มเติมที่ตรวจยืนยันได้ (2 คน)</h3><strong style={{fontSize:28}}>¥{total.toLocaleString('en-US')} + ส่วนที่ยังไม่ทราบ</strong><p>มี {unknown} ช่วงที่ยังไม่สามารถระบุราคาปลายทางจริงได้ · ไม่ใช่ยอดรวมทั้งทริป</p><p>JR Pass ¥24,000 จ่ายแล้ว แสดงแยกจากค่าเดินทางเพิ่มเติม</p></div>
 <div className="tool-day-picker"><button className={filter==='all'?'active':''} onClick={()=>setFilter('all')}>ทุกวัน</button>{itinerary.map(d=><button key={d.day} className={filter===String(d.day)?'active':''} onClick={()=>setFilter(String(d.day))}>{d.day+16} พ.ย.</button>)}</div>
 <div className="fare-table-wrap"><table className="fare-table"><thead><tr><th>เส้นทาง</th><th>บัตร</th><th>ค่าโดยสาร · 2 คน</th></tr></thead><tbody>{visible.map(x=><tr key={x.id}><td><small>{x.day+16} พ.ย.</small><strong>{x.route}</strong><p>{x.note}</p></td><td>{x.card}</td><td><span className={'fare-pill '+x.state.status}>{x.state.label}</span><p>{x.fare===null?'ยังไม่ตรวจราคา':x.waived?'รวมใน Pass (ต้องรับบัตรก่อน)':x.free?'ฟรีเมื่อเดิน/ใช้ Shuttle':'¥'+(x.fare*2).toLocaleString('en-US')}</p>{x.source&&<a href={x.source} target="_blank" rel="noopener noreferrer">แหล่งราคา</a>}</td></tr>)}</tbody></table></div>
 <h3 className="tool-subtitle">สรุปรายวัน / Osaka Metro Day Pass</h3>
 {grouped.map(x=><div key={x.day} className="tool-card" style={{display:'flex',justifyContent:'space-between',alignItems:'start',gap:12}}><div><strong>{x.day+16} พ.ย. · ตรวจยืนยันแล้ว ¥{x.known.toLocaleString('en-US')} / 2 คน</strong><p>ไม่ทราบราคาอีก {x.missing} ช่วง</p><p>Osaka Metro Day Pass: ¥{x.pass.toLocaleString('en-US')}/คน (2 คน ¥{(x.pass*2).toLocaleString('en-US')})</p><p>Metro ที่คาดว่าจะใช้ {x.eligibleMetro} ช่วง · ควรเปรียบเทียบกับค่าโดยสารจริงก่อนซื้อ</p></div></div>)}
 <p className="tool-footnote">ราคา Kintetsu Osaka-Namba–Kintetsu-Nara ¥680 ต่อเที่ยวต่อคน อ้างอิงข้อมูลค่าโดยสารที่ค้นได้ · Day Pass ราคาเป็นบัตร Osaka Metro เท่านั้น ไม่รวม JR/Keihan/Kintetsu/Nankai · ราคารถไฟ/เส้นทางอื่นยังรอหลักฐาน ไม่ใช้ค่าประมาณ</p></section>;
}
export function TicketPanel({tickets,onOpenChecklist}){
 const collected = tickets.passStatus === 'collected';
 const trains = [
   {day:'อาทิตย์ 22 พ.ย. 2026',title:'Osaka → Kinosaki-Onsen',...travelBookings.kounotori.outward},
   {day:'จันทร์ 23 พ.ย. 2026 · วันหยุดญี่ปุ่น',title:'Kinosaki-Onsen → Osaka',...travelBookings.kounotori.return},
 ];
 return <section className="tool-pane"><header className="tool-head"><span>MY TICKETS & PASSES</span><h2><Ticket/> บัตรโดยสารและการจอง</h2><p>ข้อมูลที่ยืนยันกับ JR-WEST แล้ว แสดงสำหรับดูระหว่างเดินทาง ไม่ต้องกรอกหรือกดบันทึกซ้ำ</p></header>
   <article className="tool-card ticket-confirmed-card">
     <div className="ticket-card-heading"><div><span className="kicker">CONFIRMED PURCHASE</span><h3>JR Kansai WIDE Area Pass · 5 วัน</h3></div><span className="ticket-status">{collected?'รับบัตรแล้ว':'ซื้อแล้ว · รอรับบัตร'}</span></div>
     <div className="ticket-facts">
       <div><small>เริ่มใช้</small><strong>{travelBookings.jrPass.startDate}</strong></div>
       <div><small>วันสุดท้าย</small><strong>{travelBookings.jrPass.endDate}</strong></div>
       <div><small>จำนวน</small><strong>{travelBookings.jrPass.travelers} ผู้ใหญ่</strong></div>
       <div><small>ยอดชำระแล้ว</small><strong>¥{travelBookings.jrPass.totalPriceYen.toLocaleString('en-US')}</strong></div>
     </div>
     <p className="ticket-proof">{collected?'Checklist ระบุว่ารับตั๋วแล้ว · ตรวจวันที่และเงื่อนไขบนบัตรจริงอีกครั้ง':'ยังต้องไปรับ JR Pass และตั๋ว Reserved Seat จริงตามขั้นตอน JR-WEST ภายในวันที่ 20 พ.ย.'}</p>
   </article>
   {trains.map(train=><article className="tool-card ticket-confirmed-card" key={train.day}>
     <div className="ticket-card-heading"><div><span className="kicker">{train.day}</span><h3>{train.title}</h3></div><span className="ticket-status">Reserved Seat จองแล้ว</span></div>
     <p className="ticket-train-name"><TrainFront size={17}/> Limited Express {train.train}</p>
     <div className="ticket-journey"><div><strong>{train.depart}</strong><span>{train.from}</span></div><ArrowRight size={21}/><div><strong>{train.arrive}</strong><span>{train.to}</span></div></div>
     <div className="ticket-seat-details"><div><small>ตู้โดยสาร</small><strong>Car {train.car}</strong></div><div><small>ที่นั่ง 2 คน</small><strong>{train.seats}</strong></div><div><small>ประเภท</small><strong>Ordinary · Non-smoking</strong></div></div>
   </article>)}
   <div className="ticket-info-note"><CheckCircle2 size={19}/><div><strong>การจองยืนยันแล้ว ไม่ต้อง Save อีก</strong><p>เช็กสถานะการรับบัตรได้ที่ Checklist และเก็บ Reservation No., Receipt ID กับหลักฐานชำระเงินในอีเมลส่วนตัว ไม่เผยแพร่ไว้ในเว็บ</p><button type="button" onClick={onOpenChecklist}>ไปที่ Checklist <ArrowRight size={15}/></button></div></div>
 </section>;
}
const hhmm=t=>{const m=String(t).match(/^(\d{1,2}):(\d{2})/);return m?Number(m[1])*60+Number(m[2]):null};
export function TodayMode({tickets,prefs,onOpenDay}){
 const [clock,setClock]=useState(null);
 const [selected,setSelected]=useState(null);
 useEffect(()=>{const tick=()=>setClock(getJapanClock());tick();const id=setInterval(tick,1000);return()=>clearInterval(id)},[]);
 const phase=tripPhase(clock?.date||'2026-10-23'),actual=dayForDate(clock?.date);
 const day=selected||actual||1;
 const current=resolveDay(day,prefs),stops=resolvedStops(day,prefs);
 const upcoming=nextScheduleEntry(day,prefs,actual===day?(clock?.minutes??0):0);
 return <section className="tool-pane">
 <header className="tool-head"><span>JAPAN TIME · ASIA/TOKYO</span><h2><Navigation/> Today Mode</h2><p>เวลาญี่ปุ่นอัปเดตทุกวินาที · แสดงกิจกรรมถัดไปจากแผนที่เลือก</p></header>
 <div className="jst-clock"><span>ญี่ปุ่น · JST</span><strong>{clock?.time||'--:--:--'}</strong><small>{clock?.date||'กำลังโหลดเวลา'}</small></div>
 {phase==='pre'&&<div className="pass-alert"><strong>Pre-Trip Mode · ก่อนออกเดินทาง 17 พ.ย.</strong><span>ตรวจ Passport, ตั๋วเครื่องบิน และ Checklist เตรียมเดินทางให้ครบ</span></div>}
 {phase==='post'&&<div className="pass-alert"><strong>Post-Trip Mode · จบทริปแล้ว</strong><span>เก็บภาพและบันทึกความทรงจำ · ตารางยังเปิดย้อนดูได้ครบ</span></div>}
 <div className="tool-day-picker">{itinerary.map(d=><button key={d.day} className={day===d.day?'active':''} onClick={()=>setSelected(d.day)}>{d.day+16} พ.ย.</button>)}</div>
 <article className="today-now"><span>DAY {day} · {current.location}</span><h3>{current.title}</h3><p>{current.summary}</p><div className="today-next"><Clock3 size={22}/><div><small>{actual===day?'รายการถัดไปตามเวลาญี่ปุ่น':'แผนวันที่เลือก'}</small><strong>{upcoming?upcoming.time+' · '+upcoming.title:'สิ้นสุดรายการที่มีเวลาระบุแล้ว'}</strong><p>{upcoming?.detail||'เปิดตารางรายวันเพื่อดูรายละเอียดเพิ่มเติม'}</p></div></div><button className="today-link" onClick={()=>onOpenDay(day)}>เปิดรายละเอียดวันนี้ <ArrowRight size={17}/></button></article>
 <h3 className="tool-subtitle">จุดที่ต้องไป / Google Maps</h3><div className="today-stops">{stops.map((name,i)=><div className="today-stop" key={i}><span>{i+1}</span><div><strong>{name}</strong>{i>0&&<a href={mapDirectionsUrl(stops[i-1],name)} target="_blank" rel="noopener noreferrer"><MapPin size={15}/> นำทางจากจุดก่อนหน้า</a>}</div></div>)}</div>
 <p className="tool-footnote">อิงกิจกรรมในแผน ไม่ใช่ GPS หรือข้อมูลรถไฟ Live · เวลา USJ / Kounotori ที่จองไว้ไม่เปลี่ยน</p></section>
}
export function KyotoSwitcher({prefs,onChange}){return <section className="tool-card kyoto-choice"><h3>20 พ.ย. · เลือกแผน Kyoto</h3><div className="tool-day-picker">{Object.entries(kyotoOptions).map(([id,o])=><button key={id} className={prefs.kyoto===id?'active':''} onClick={()=>onChange({kyoto:id})}>{o.name}</button>)}</div><p>เลือกครั้งเดียว จะเปลี่ยนหน้า Today, ตาราง, รายวัน และค่าเดินทางพร้อมกัน และจำตัวเลือกหลัง Refresh</p></section>}