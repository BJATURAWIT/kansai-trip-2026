'use client';
import { useEffect,useState } from 'react';
import { Ticket,TrainFront,MapPin,Clock3,CheckCircle2,Navigation,ArrowRight } from 'lucide-react';
import {itinerary} from '../../data/trip';
import {transportByDay,defaultTickets,passEndDate,fareLabel,kyotoOptions,importantStops} from '../../data/travelTools';
import {mapSearchUrl,mapDirectionsUrl} from '../../data/mobility';

const labelDay=n=>`${n+16} พ.ย.`;
export function PassGuide({tickets,compact=false}){
 const [dayFilter,setDayFilter]=useState('all');
 const rows=Object.entries(transportByDay).flatMap(([day,legs])=>legs.map((leg,i)=>({...leg,day:Number(day),key:day+'-'+i}))).filter(row=>dayFilter==='all'||row.day===Number(dayFilter));
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
export function TodayMode({tickets,onOpenDay}){
 const [day,setDay]=useState(1),[now,setNow]=useState('');
 useEffect(()=>{const j=new Date().toLocaleString('sv-SE',{timeZone:'Asia/Tokyo',hour12:false});const date=j.slice(0,10);const found=itinerary.find(d=>'2026-11-'+String(d.day+16).padStart(2,'0')===date);setDay(found?.day||1);setNow(j.slice(11,16))},[]);
 const current=itinerary[day-1],stops=importantStops[day]||[];
 const minute=hhmm(now),next=current.schedule.find(s=>hhmm(s.time)!==null&&(minute===null||hhmm(s.time)>=minute))||current.schedule[0];
 return <section className="tool-pane"><header className="tool-head"><span>YOUR TRAVEL COMPANION · JAPAN TIME</span><h2><Navigation/> Today Mode</h2><p>เปิดดูว่าต้องไปไหนต่อ โดยเลือกวันท่องเที่ยวได้ตลอดเวลา ไม่ใช่ระบบติดตามตำแหน่งจริง</p></header>
 <div className="tool-day-picker">{itinerary.map(d=><button className={day===d.day?'active':''} onClick={()=>setDay(d.day)} key={d.day}>{labelDay(d.day)}</button>)}</div>
 <article className="today-now"><span>DAY {day} · {current.location}</span><h3>{current.title}</h3><p>{current.summary}</p><div className="today-next"><Clock3 size={22}/><div><small>{day===itinerary.find(d=>'2026-11-'+String(d.day+16).padStart(2,'0')===new Date().toLocaleString('sv-SE',{timeZone:'Asia/Tokyo'}).slice(0,10))?.day?'รายการถัดไปตามเวลาประมาณ':'รายการแรกของวันที่เลือก'}</small><strong>{next.time} · {next.title}</strong><p>{next.detail}</p></div></div><button className="today-link" onClick={()=>onOpenDay(day)}>เปิดรายละเอียดวันนี้ <ArrowRight size={17}/></button></article>
 <h3 className="tool-subtitle">ลำดับสถานที่ / นำทาง</h3><div className="today-stops">{stops.map((name,i)=><div className="today-stop" key={name+i}><span>{i+1}</span><div><strong>{name}</strong>{i>0&&<a href={mapDirectionsUrl(stops[i-1],name)} target="_blank" rel="noopener noreferrer"><MapPin size={15}/> นำทางจากจุดก่อนหน้า</a>}</div></div>)}</div>
 <p className="tool-footnote">เวลาทั้งหมดเป็นแผน ไม่ใช่สถานะรถไฟ Real-time ตรวจแอป JR / Google Maps และตั๋วก่อนขึ้นรถ</p></section>;
}
export function KyotoSwitcher(){const [choice,setChoice]=useState('west');const o=kyotoOptions[choice];return <section className="tool-card kyoto-choice"><h3>20 พ.ย. · เลือก Kyoto ได้ 2 แบบ</h3><div className="tool-day-picker">{Object.entries(kyotoOptions).map(([id,x])=><button key={id} className={choice===id?'active':''} onClick={()=>setChoice(id)}>{x.name}</button>)}</div><p><strong>{o.label}</strong> · {o.summary}</p><div className="kyoto-list">{o.schedule.map((s,i)=><div key={i}><time>{s.time}</time><div><strong>{s.title}</strong><p>{s.detail}</p><a href={mapSearchUrl(s.map)} target="_blank" rel="noopener noreferrer"><MapPin size={14}/> Maps</a></div></div>)}</div><p>{o.note}</p></section>}
