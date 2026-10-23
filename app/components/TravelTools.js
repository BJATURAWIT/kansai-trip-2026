'use client';
import { useEffect,useState } from 'react';
import { Ticket,TrainFront,MapPin,Clock3,CheckCircle2,Navigation,ArrowRight } from 'lucide-react';
import {itinerary} from '../../data/trip';
import {transportByDay,defaultTickets,passEndDate,fareLabel,kyotoOptions,importantStops} from '../../data/travelTools';
import {mapSearchUrl,mapDirectionsUrl} from '../../data/mobility';
import {getJapanClock,tripPhase,dayForDate,nextScheduleEntry,resolveDay,resolvedStops,resolvedSegments} from '../../data/experience';

const labelDay=n=>`${n+16} พ.ย.`;
export function PassGuide({tickets,prefs}){
 const [dayFilter,setDayFilter]=useState('all');
 const rows=itinerary.flatMap(d=>resolvedSegments(d.day,prefs).map((leg,i)=>({...leg,day:d.day,key:d.day+'-'+i}))).filter(row=>dayFilter==='all'||row.day===Number(dayFilter));
 return <section className="tool-pane"><header className="tool-head"><span>TRANSPORT COST & PASS GUIDE</span><h2><TrainFront/> ค่าเดินทางและบัตรโดยสาร</h2><p>แสดงว่าช่วงใดรวมใน JR Pass และช่วงใดต้องจ่ายเพิ่ม · ICOCA เป็นบัตรเติมเงิน ไม่ใช่พาสเหมาจ่าย</p></header>
 <div className="pass-alert"><strong>JR-WEST Kansai WIDE Area Pass · {tickets.passStart?.slice(8)}–{passEndDate(tickets.passStart)?.slice(8)} พ.ย.</strong><span>สถานะ: {tickets.passStatus==='collected'?'รับบัตรแล้ว':tickets.passStatus==='purchased'?'ซื้อแล้ว รอรับ':'เลือกแล้ว ยังไม่ยืนยันการซื้อ'} · ใช้ได้เมื่อรับบัตร เปิดใช้ และอยู่ในช่วงวันตามพาส</span></div>
 <div className="tool-day-picker"><button onClick={()=>setDayFilter('all')} className={dayFilter==='all'?'active':''}>ทุกวัน</button>{itinerary.map(d=><button key={d.day} onClick={()=>setDayFilter(String(d.day))} className={dayFilter===String(d.day)?'active':''}>{labelDay(d.day)}</button>)}</div>
 <div className="fare-table-wrap"><table className="fare-table"><thead><tr><th>วัน / เส้นทาง</th><th>บัตรที่ใช้</th><th>ค่าใช้จ่าย</th></tr></thead><tbody>{rows.map(row=>{const fare=fareLabel(row,row.day,tickets);return <tr key={row.key}><td><small>DAY {row.day} · {labelDay(row.day)}</small><strong>{row.route}</strong><p>{row.note}</p></td><td>{row.card}</td><td><span className={'fare-pill '+fare.status}>{fare.label}</span>{row.amount&&<p>{row.amount}</p>}</td></tr>})}</tbody></table></div>
 <p className="tool-footnote">* ค่าใช้จ่ายเป็นประเภทการชำระ ไม่ใช่ยอดรวมจริง ตรวจราคาและเวลาจากผู้ให้บริการอีกครั้ง ห้ามใช้ ICOCA แทน Reserved Seat Ticket ของ Kounotori</p></section>
}
export function TicketPanel({tickets,onOpenChecklist}){
 const collected = tickets.passStatus === 'collected';
 const trains = [
   {day:'อาทิตย์ 22 พ.ย. 2026',title:'Osaka → Kinosaki-Onsen',...defaultTickets.outward},
   {day:'จันทร์ 23 พ.ย. 2026 · วันหยุดญี่ปุ่น',title:'Kinosaki-Onsen → Osaka',...defaultTickets.return},
 ];
 return <section className="tool-pane"><header className="tool-head"><span>MY TICKETS & PASSES</span><h2><Ticket/> บัตรโดยสารและการจอง</h2><p>ข้อมูลที่ยืนยันกับ JR-WEST แล้ว แสดงสำหรับดูระหว่างเดินทาง ไม่ต้องกรอกหรือกดบันทึกซ้ำ</p></header>
   <article className="tool-card ticket-confirmed-card">
     <div className="ticket-card-heading"><div><span className="kicker">CONFIRMED PURCHASE</span><h3>JR Kansai WIDE Area Pass · 5 วัน</h3></div><span className="ticket-status">{collected?'รับบัตรแล้ว':'ซื้อแล้ว · รอรับบัตร'}</span></div>
     <div className="ticket-facts">
       <div><small>เริ่มใช้</small><strong>20 พ.ย. 2026</strong></div>
       <div><small>วันสุดท้าย</small><strong>{passEndDate(defaultTickets.passStart).split('-').reverse().join('/')} </strong></div>
       <div><small>จำนวน</small><strong>2 ผู้ใหญ่</strong></div>
       <div><small>ยอดชำระแล้ว</small><strong>¥24,000</strong></div>
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