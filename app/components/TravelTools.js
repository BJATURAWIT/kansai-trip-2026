'use client';
import {fareSummary} from '../../data/transportPricing';
import { useEffect,useState } from 'react';
import { Ticket,TrainFront,MapPin,Clock3,CheckCircle2,Navigation,ArrowRight } from 'lucide-react';
import {itinerary} from '../../data/trip';
import {travelBookings} from '../../data/centralTravel';
import {transportByDay,defaultTickets,passEndDate,fareLabel,kyotoOptions,importantStops} from '../../data/travelTools';
import {mapSearchUrl,mapDirectionsUrl} from '../../data/mobility';
import {getJapanClock,tripPhase,dayForDate,nextScheduleEntry,resolveDay,resolvedStops,resolvedSegments} from '../../data/experience';

const labelDay=n=>`${n+16} พ.ย.`;
export function PassGuide({tickets,prefs,onChange}){
 const [filter,setFilter]=useState('all');
 const days=itinerary.map(d=>{
  const routes=resolvedSegments(d.day,prefs);
  const priced=fareSummary(d.day,routes,tickets,{metroPass:prefs?.metroPassDays?.[d.day]===true});
  return {...priced,day:d.day};
 });
 const visible=filter==='all'?days:days.filter(d=>String(d.day)===filter);
 const grand=days.reduce((a,x)=>a+x.twoPeopleYen,0);
 const unknown=days.reduce((a,x)=>a+x.unresolved,0);
 return <section className="tool-pane"><header className="tool-head"><span>TRANSPORT CALCULATOR · 2 ADULTS</span><h2><TrainFront/> ค่าเดินทางและบัตรโดยสาร</h2><p>รายการรถไฟที่เลือกตามแผน Kyoto และสนามบินจริง · ไม่คิดเงิน JR ที่อยู่ในพาสและตั๋ว Rapi:t ขาเข้าที่จ่ายแล้วซ้ำ</p></header>
 <div className="pass-alert"><strong>Kansai WIDE Pass ¥24,000 / 2 คน จ่ายแล้ว · 20–24 พ.ย.</strong><span>คำนวณค่าโดยสารเพิ่มจากพาส และแสดงค่า Metro Day Pass ให้เปรียบเทียบ · ตัวเลือกวันกลับเป็นเส้นทางใดเส้นทางหนึ่งเท่านั้น</span></div>
 <div className="tool-card"><h3>ค่าเดินทางเพิ่มเติมตามแผนที่เลือก · 2 คน</h3><strong style={{fontSize:28}}>¥{grand.toLocaleString('en-US')}{unknown?' + รายการที่ยังเลือกเส้นทางไม่ได้':''}</strong><p>รายการที่ยังระบุราคาตายตัวไม่ได้: {unknown} รายการ · ค่าเดิน/รถรับส่งฟรีไม่เพิ่มยอด</p><p>ไม่รวม JR Pass และ Rapi:t ขาเข้าที่จ่ายแล้ว · ไม่รวมแท็กซี่และค่าเข้าชมสถานที่</p></div>
 <div className="tool-card"><h3>24 พ.ย. · เลือกเส้นทางกลับสนามบิน</h3><div className="tool-day-picker">{[['express','Nankai Airport Express · ¥970/คน'],['rapit','Nankai Rapi:t · ¥1,670/คน'],['jr','JR ผ่าน Imamiya · รวมในพาส']].map(([key,label])=><button key={key} className={(prefs?.airportTrain||'express')===key?'active':''} onClick={()=>onChange?.({airportTrain:key})}>{label}</button>)}</div><p>เลือกเพียงเส้นทางเดียว · JR ต้องรับ Kansai WIDE Pass จริงและขึ้นขบวนในเครือข่าย JR ที่ครอบคลุม ส่วน Nankai ต้องจ่ายแยก</p></div>
 <div className="tool-day-picker"><button className={filter==='all'?'active':''} onClick={()=>setFilter('all')}>ทุกวัน</button>{itinerary.map(d=><button key={d.day} className={filter===String(d.day)?'active':''} onClick={()=>setFilter(String(d.day))}>{d.day+16} พ.ย.</button>)}</div>
 {visible.map(d=><article className="tool-card" key={d.day}>
 <h3>{d.day+16} พ.ย. · ค่าเดินทางเพิ่ม ¥{d.twoPeopleYen.toLocaleString('en-US')} / 2 คน</h3>
 <div className="fare-table-wrap"><table className="fare-table"><thead><tr><th>ช่วงเดินทาง</th><th>บัตร</th><th>ราคาสำหรับ 2 คน</th></tr></thead><tbody>
 {d.rows.map((r,i)=><tr key={i}><td><strong>{r.route}</strong><p>{r.note}</p></td><td>{r.card}</td><td><span className={'fare-pill '+r.state.status}>{r.state.label}</span><p>{r.status==='prepaid'?'จ่ายแล้ว ¥'+r.paidYen.toLocaleString('en-US')+' ไม่คิดซ้ำ':r.status==='covered'?'รวมใน JR Pass':r.status==='free'?'ฟรี / เดิน':r.yen===null?'ขึ้นกับเส้นทางที่ยังไม่ระบุ':'¥'+(r.yen*2).toLocaleString('en-US')}</p>{r.source&&<a href={r.source} target="_blank" rel="noopener noreferrer">ตรวจแหล่งราคา</a>}</td></tr>)}
 </tbody></table></div>
 {d.metro.metroLegs>0&&<p className="tool-footnote">Osaka Metro: {d.metro.known?'ICOCA ¥'+d.metro.regularYenForTwo.toLocaleString('en-US')+' / 2 คน เทียบ Day Pass ¥'+d.metro.dayPassYenForTwo.toLocaleString('en-US')+' / 2 คน · '+(d.metro.recommendation==='day-pass'?'Day Pass คุ้มกว่า':'ICOCA คุ้มกว่า'):'ยังต้องระบุช่วง Metro ให้ชัดเจน'} · วันหยุดราคาพาส ¥620/คน วันธรรมดา ¥820/คน</p>}
 </article>)}
 <p className="tool-footnote">ค่าแท็กซี่ขึ้นกับมิเตอร์ ระยะทางและสภาพจราจรจึงไม่มีราคาเหมาจ่าย · เมื่อเลือกเดินไม่เสียค่าโดยสาร · ข้อมูลที่ยังไม่ระบุสถานีชัดเจนจะไม่แต่งตัวเลขขึ้นเอง</p>
 </section>;
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
   <article className="tool-card ticket-confirmed-card">
     <div className="ticket-card-heading"><div><span className="kicker">17 NOV · NANKAI DIGITAL TICKET</span><h3>Rapi:t Super Seat · Kansai Airport → Namba</h3></div><span className="ticket-status">ซื้อแล้ว · รอเลือกที่นั่ง</span></div>
     <div className="ticket-facts"><div><small>ผู้โดยสาร</small><strong>{travelBookings.nankaiArrival.travelers} ผู้ใหญ่</strong></div><div><small>จ่ายแล้ว</small><strong>¥{travelBookings.nankaiArrival.totalPaidYen.toLocaleString('en-US')}</strong></div><div><small>ค่าโดยสาร</small><strong>รวม Base Fare + Limited Express</strong></div><div><small>กำหนดเริ่มใช้</small><strong>ก่อน 18 พ.ย. 02:59 JST</strong></div></div>
     <p className="ticket-proof">ยังไม่ได้เลือกขบวนและที่นั่ง หลังผ่าน ตม. และรับกระเป๋า ให้เปิด Purchased Ticket → เลือกวัน 17 พ.ย. ขบวนและ Super Seat ของทั้งสองคน เลือกก่อนเวลาออกอย่างน้อย 5 นาที แล้วเปิด QR จริงที่ประตู Nankai · อีเมลไม่ใช่ตั๋ว</p>
     <a href={travelBookings.nankaiArrival.walletUrl} target="_blank" rel="noopener noreferrer" className="today-link">เปิด Nankai Ticket Wallet <ArrowRight size={16}/></a>
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