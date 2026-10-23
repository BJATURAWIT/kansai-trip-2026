'use client';
import { useEffect,useMemo,useState } from 'react';
import { CalendarDays,Ticket,TrainFront,MapPin,Clock3,CheckCircle2,Save,Navigation,ArrowRight } from 'lucide-react';
import {itinerary} from '../../data/trip';
import {transportByDay,defaultTickets,passEndDate,fareLabel,kyotoOptions,importantStops} from '../../data/travelTools';
import {mapSearchUrl,mapDirectionsUrl} from '../../data/mobility';

const key='kansai2026-ticket-details';
const migrationKey='kansai2026-confirmed-kinosaki-booking-v1';
function load(){
 if(typeof window==='undefined')return defaultTickets;
 try{
  const old=JSON.parse(localStorage.getItem(key)||'{}')||{};
  if(localStorage.getItem(migrationKey)!=='done'){
   // Upgrade older saved "not booked" states, but preserve an already collected pass.
   const next={...defaultTickets,...old,passStatus:old.passStatus==='collected'?'collected':'purchased',
     passStart:'2026-11-20',outward:{...defaultTickets.outward},return:{...defaultTickets.return}};
   localStorage.setItem(key,JSON.stringify(next));
   localStorage.setItem(migrationKey,'done');
   return next;
  }
  return {...defaultTickets,...old,outward:{...defaultTickets.outward,...(old.outward||{})},
     return:{...defaultTickets.return,...(old.return||{})}};
 }catch{return defaultTickets}
}
export function useTicketData(){
 const [tickets,setTickets]=useState(defaultTickets);
 useEffect(()=>{setTickets(load())},[]);
 const update=(patch)=>setTickets(prev=>{const next={...prev,...patch};try{localStorage.setItem(key,JSON.stringify(next))}catch{}return next});
 return [tickets,update];
}
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
const Input=({label,value,onChange,placeholder=''})=><label className="ticket-field"><span>{label}</span><input value={value||''} onChange={e=>onChange(e.target.value)} placeholder={placeholder}/></label>;
export function TicketPanel({tickets,update}){
 const [draft,setDraft]=useState(tickets),[saved,setSaved]=useState(false);
 useEffect(()=>{setDraft(tickets)},[tickets]);
 const setField=(field,value)=>{setDraft(s=>({...s,[field]:value}));setSaved(false)};
 const train=(dir,field,value)=>{setDraft(s=>({...s,[dir]:{...s[dir],[field]:value}}));setSaved(false)};
 const save=()=>{update(draft);setSaved(true)};
 return <section className="tool-pane"><header className="tool-head"><span>MY TICKETS & PASSES</span><h2><Ticket/> บัตรโดยสารและการจอง</h2><p>กรอกเลขขบวน ตู้และที่นั่งตามเอกสารจริง ข้อมูลขบวนและที่นั่งทั้งสองขาเติมจากการยืนยันจริงแล้ว ส่วนเลข Reservation / Receipt ID และข้อมูลบัตรเครดิตควรเก็บในอีเมล ไม่แสดงบนเว็บ</p></header>
 <article className="tool-card"><h3>JR Kansai WIDE Area Pass (5 วัน)</h3><p><strong>จอง/ชำระแล้ว 2 คน · ¥24,000 (¥12,000 ต่อคน)</strong> · วันที่ 20–24 พ.ย. 2026 · ยังไม่ยืนยันว่ารับบัตรจริงแล้ว</p><div className="ticket-grid"><label className="ticket-field"><span>สถานะพาส</span><select value={draft.passStatus} onChange={e=>setField('passStatus',e.target.value)}><option value="selected">เลือกแล้ว · รอซื้อ</option><option value="purchased">ซื้อแล้ว · รอรับบัตร</option><option value="collected">รับบัตรและเปิดใช้แล้ว</option></select></label><label className="ticket-field"><span>วันเริ่มใช้</span><input type="date" value={draft.passStart} onChange={e=>setField('passStart',e.target.value)}/></label></div><p>วันหมดอายุ (รวมวันแรก 5 วัน): <strong>{passEndDate(draft.passStart)||'ยังไม่ระบุ'}</strong></p><p>หมายเหตุ: หากเลือก “รับบัตรแล้ว” จะใช้ในการคำนวณความครอบคลุมรถไฟ JR เท่านั้น กรุณายึดวันที่พิมพ์บนพาสจริง</p></article>
 {['outward','return'].map(dir=><article className="tool-card" key={dir}><h3>{dir==='outward'?'22 พ.ย. · Osaka → Kinosaki':'23 พ.ย. · Kinosaki → Osaka (วันหยุดญี่ปุ่น)'}</h3><div className="ticket-grid"><label className="ticket-field"><span>การจอง</span><select value={draft[dir]?.status||'unverified'} onChange={e=>train(dir,'status',e.target.value)}><option value="unverified">ยังไม่ได้ยืนยันจากใบจอง</option><option value="reserved">จองที่นั่งแล้ว</option></select></label><Input label="ขบวนรถไฟ" value={draft[dir]?.train} onChange={v=>train(dir,'train',v)} placeholder="เช่น Kounotori 5"/><Input label="เวลาออก (JST)" value={draft[dir]?.depart} onChange={v=>train(dir,'depart',v)} placeholder="HH:MM"/><Input label="เวลาถึง (JST)" value={draft[dir]?.arrive} onChange={v=>train(dir,'arrive',v)} placeholder="HH:MM"/><Input label="ตู้โดยสาร (Car)" value={draft[dir]?.car} onChange={v=>train(dir,'car',v)} placeholder="ดูบน Reserved Seat Ticket"/><Input label="เลขที่นั่ง 2 คน" value={draft[dir]?.seats} onChange={v=>train(dir,'seats',v)} placeholder="เช่น 10A / 10B"/></div><p>จอง Ordinary Reserved Seat / Non-smoking สำหรับ 2 คนแล้ว · ตรวจตั๋วกระดาษ/อีเมลก่อนเดินทาง และขึ้นตู้ให้ตรงเลข Car · วันที่ 23 พ.ย. เผื่อคนหนาแน่นเป็นพิเศษ</p></article>)}
 <button className="tool-save" onClick={save}><Save size={17}/> บันทึกข้อมูลบัตรบนอุปกรณ์นี้</button>{saved&&<p className="ticket-saved"><CheckCircle2 size={15}/> บันทึกแล้วบน Browser นี้ · ไม่ซิงก์ข้ามอุปกรณ์ (ต่างจาก Checklist)</p>}
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
