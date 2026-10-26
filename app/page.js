'use client';
import {travelBookings,flightNumberLabel,localClock} from '../data/centralTravel';

import { useEffect, useMemo, useRef, useState } from 'react';
import {
  ArrowLeft, ArrowRight, ArrowUpRight, BedDouble, CalendarCheck2, Check, CheckCircle2,
  ChevronDown, ChevronRight, Circle, Clock3, ExternalLink, Footprints, Home as HomeIcon,
  Info, ListChecks, Luggage, MapPin, Navigation, Plane, RefreshCw, ShieldCheck,
  Sparkles, Ticket, TrainFront, Bus, X,
} from 'lucide-react';
import { trip, itinerary, checklist, resources } from '../data/trip';
import { travelGuide, mapDirectionsUrl, mapSearchUrl } from '../data/mobility';
import { beginnerDayGuide } from '../data/beginnerGuide';
import { dayPhotos, tripImageCredits } from '../data/dayPhotos';
import { galleryByDay } from '../data/gallery';
import TripTable from './components/TripTable';
import {normalizePreferences,resolveDay,resolvedGuide,resolvedBeginner} from '../data/experience';
import {restaurantGuide} from '../data/restaurantGuide';
import {foodStopsForDay,foodVenues,foodName} from '../data/foodExperience';
import {PassGuide,TicketPanel,TodayMode,KyotoSwitcher} from './components/TravelTools';
import {defaultTickets} from '../data/travelTools';

const STORAGE_KEY = 'kansai-2026-checklist-v1';
const initialChecklist = Object.fromEntries(checklist.map(item => [item.id, item.done]));
const dateOptions = { timeZone: 'Asia/Tokyo', year: 'numeric', month: '2-digit', day: '2-digit' };
const japanToday = () => new Intl.DateTimeFormat('en-CA', dateOptions).format(new Date());
const dateForDay = day => `2026-11-${String(day + 16).padStart(2, '0')}`;
const shortDate = value => new Date(`${value}T12:00:00+09:00`).toLocaleDateString('th-TH', { day: 'numeric', month: 'short', timeZone: 'Asia/Tokyo' });
const getTodayDay = () => itinerary.find(x => dateForDay(x.day) === japanToday())?.day || (japanToday() > '2026-11-24' ? 8 : 1);
const tabItems = [
  { id: 'today', text: 'Today', icon: Navigation },
  { id: 'plan', text: 'รายวัน', icon: HomeIcon },
  { id: 'table', text: 'ตาราง', icon: CalendarCheck2 },
  { id: 'costs', text: 'ค่าเดินทาง', icon: TrainFront },
  { id: 'checklist', text: 'Checklist', icon: ListChecks },
  { id: 'bookings', text: 'ตั๋ว', icon: Ticket },
  { id: 'dining', text: 'ร้านอาหาร', icon: BedDouble },
  { id: 'help', text: 'ข้อมูล', icon: Info },
];

function LinkOut({ href, children, className = '' }) {
  return <a className={className} href={href} target="_blank" rel="noopener noreferrer">{children}<ArrowUpRight size={16}/></a>;
}
function Tag({ children, color = 'neutral' }) { return <span className={`tag tag-${color}`}>{children}</span>; }
function Heading({ label, title, caption }) {
  return <div className="pane-heading"><span className="kicker">{label}</span><h2>{title}</h2>{caption && <p>{caption}</p>}</div>;
}
function RouteIcon({ type }) {
  return type === 'walk' ? <Footprints size={19}/> : type === 'bus' ? <Bus size={19}/> : type === 'plane' ? <Plane size={19}/> : <TrainFront size={19}/>;
}

function FoodDining({day,prefs}){
 const stops=foodStopsForDay(day,prefs);
 const schedule=resolveDay(day,prefs).schedule;
 if(!stops.length)return null;
 return <section className="food-section"><div className="section-title"><div><span className="kicker">FOOD EXPERIENCE</span><h3>Food & Dining</h3><p>เลือกตามเส้นทางจริง · ผู้เดินทางไม่ทานเนื้อวัว (ไม่ใช่แพ้อาหาร)</p></div></div>
 <div className="food-list">{stops.map((stop,i)=>{
   const v=stop.id?foodVenues[stop.id]:null;
   const timeValue=x=>{const m=String(x).match(/^(\d{1,2}):(\d{2})/);return m?Number(m[1])*60+Number(m[2]):-1};
   const prior=schedule.filter(x=>x.map&&x.map!==v?.map&&timeValue(x.time)>=0&&timeValue(x.time)<=timeValue(stop.time)).at(-1);
   return <article className="food-item" key={stop.id||'flex-'+i}>
     <div className="food-item-top"><span>{stop.time}</span><span>{stop.role==='primary'?'Primary':stop.role==='backup'?'Backup':'Optional'}</span><span>{v?.status==='verified'?'Verified':'Unverified'}</span></div>
     <h4>{v?.name||foodName(stop)}</h4>
     {v?.image?.src&&<div className="food-thumb"><img src={v.image.src} alt={v.image.caption} loading="lazy" onError={event=>{event.currentTarget.style.display='none'}}/><small>{v.image.caption} · <a href={v.image.source} target="_blank" rel="noopener noreferrer">{v.image.license} · {v.image.credit}</a></small></div>}
     <p>{v?.type||stop.kind} · {stop.note}</p>{v?.review&&<p><strong>ข้อดี / ข้อควรทราบ:</strong> {v.review}</p>}
     {v&&<><p><strong>เมนู:</strong> {v.menu}</p><p><strong>ราคา/คน:</strong> {v.priceYen?'¥'+v.priceYen.toLocaleString('en-US'):'ยังไม่ยืนยัน'} · {v.priceNote}</p><p><strong>เวลาเปิด:</strong> {v.hours} · {v.closures}</p><p><strong>จากจุดก่อนหน้า:</strong> {v.from}</p><p><strong>Dietary Note · No Beef:</strong> {v.diet}</p>{v.window&&<p><strong>เงื่อนไขโต๊ะ:</strong> {v.window}</p>}{v.special&&<span className="food-booking">Not Booked</span>}{!v.special&&<span className="food-booking">Walk-in · ถ้ารอเกิน 10–15 นาที ใช้ร้านสำรอง</span>}</>}
     <div className="food-actions">{v?.map&&<a href={mapSearchUrl(v.map)} target="_blank" rel="noopener noreferrer">Google Maps</a>}{v?.map&&prior?.map&&<a href={mapDirectionsUrl(prior.map,v.map,'walking')} target="_blank" rel="noopener noreferrer">Walking Directions</a>}{v?.site&&<a href={v.site} target="_blank" rel="noopener noreferrer">Official Website</a>}{v?.booking&&<a href={v.booking} target="_blank" rel="noopener noreferrer">Booking Link</a>}{v?.menuSource&&<a href={v.menuSource} target="_blank" rel="noopener noreferrer">Menu / Price</a>}{v?.reviewSource&&<a href={v.reviewSource} target="_blank" rel="noopener noreferrer">Review / Source</a>}</div>
   </article>;
 })}</div></section>;
}

function DayPlan({ day, prefs }) {
  const guide = resolvedGuide(day.day,prefs);
  const gallery = galleryByDay[day.day] || [];
  const [showAll, setShowAll] = useState(false);
  const [expanded, setExpanded] = useState({});
  useEffect(() => { setExpanded({}); setShowAll(false); }, [day.day]);
  return <>
    <section className="today-head"><div className="today-head-image"><img key={day.day} src={dayPhotos[day.day].src} alt={dayPhotos[day.day].alt} loading={day.day === 1 ? 'eager' : 'lazy'} decoding="async" style={{objectPosition: dayPhotos[day.day].position}} onError={event => { event.currentTarget.onerror = null; event.currentTarget.src = '/photos/placeholder.svg'; }}/><span className="photo-caption">{dayPhotos[day.day].caption}</span></div><div className="today-head-content">
      <div className="today-badges"><span>DAY {String(day.day).padStart(2, '0')} · {day.dow} {day.date}</span><Tag color={day.type === 'confirmed' ? 'light' : 'soft'}>{day.type === 'confirmed' ? 'มีรายการจองแล้ว' : 'แผนยืดหยุ่น'}</Tag></div>
      <h2>{day.title}</h2><p>{day.subtitle}</p><span className="today-location"><MapPin size={14}/> {day.location}</span>
    </div></section>

    <div className="headline-note"><Clock3 size={18}/><div><strong>ควรออกเดินทางเมื่อไร?</strong><p>{guide.leave}</p></div><LinkOut href={mapSearchUrl(day.map)} className="icon-link">แผนที่</LinkOut></div>

    <section className="beginner-guide"><div className="section-title"><div><span className="kicker">FIRST TIME IN JAPAN</span><h3>มือใหม่เดินตามนี้</h3><p className="guide-subtitle">{resolvedBeginner(day.day,prefs).label} · {resolvedBeginner(day.day,prefs).time}</p></div></div>
      <div className="beginner-steps">{resolvedBeginner(day.day,prefs).steps.map(([name,how,pay],idx)=><details className="beginner-step" key={name} open={idx===0}>
        <summary><span className="beginner-number">{idx+1}</span><span className="beginner-step-heading"><strong>{name}</strong><small>{pay}</small></span><ChevronDown size={16}/></summary>
        <div className="beginner-step-detail">{how}</div>
      </details>)}</div>
      <div className="beginner-note"><Info size={17}/><span>{resolvedBeginner(day.day,prefs).note}</span></div>
    </section>
    <section className="travel-card"><div className="card-title"><div className="round-icon"><Navigation size={19}/></div><div><span className="kicker">STEP-BY-STEP ROUTE</span><h3>เดินทางอย่างไร</h3></div></div>
      <div className="route-overview">{guide.overview}</div>
      <div className="route-legs">{guide.legs.map((leg, index) => <div className="route-leg" key={`${day.day}-${index}`}>
        <span className="route-axis"><span className="route-icon"><RouteIcon type={leg.icon}/></span>{index < guide.legs.length - 1 && <span className="route-line"/>}</span>
        <div className="leg-main"><div className="leg-journey"><span className="leg-count">STEP {String(index + 1).padStart(2,'0')}</span><span className="leg-duration">{leg.duration}</span></div>
          <h4>{leg.line}</h4><p className="leg-mode">{leg.mode} · {leg.pay}</p>
          <button type="button" className="leg-toggle" aria-expanded={!!expanded[index]} onClick={() => setExpanded(old => ({ ...old, [index]: !old[index] }))}>{expanded[index] ? 'ซ่อนคำแนะนำ' : 'ดูวิธีขึ้น / จุดเปลี่ยนรถ'} <ChevronDown size={15} className={expanded[index] ? 'rotated' : ''}/></button>
          {expanded[index] && <div className="leg-detail"><p>{leg.how}</p><div className="leg-stations"><span>จาก <strong>{leg.from}</strong></span><span>ไป <strong>{leg.to}</strong></span></div></div>}
          <LinkOut className="map-button" href={mapDirectionsUrl(leg.from, leg.to, leg.icon === 'walk' ? 'walking' : leg.icon === 'plane' ? 'driving' : 'transit')}><Navigation size={15}/> นำทาง Google Maps</LinkOut>
        </div>
      </div>)}</div>
      <div className="route-note"><Info size={17}/><span>{guide.reminder}</span></div>
    </section>

    <section className="schedule-card"><div className="section-title"><div><span className="kicker">THE DAY'S FLOW</span><h3>ตารางเวลาและกิจกรรม</h3></div><Tag color="neutral">เวลาญี่ปุ่น JST</Tag></div>
      <div className="day-timeline">{day.schedule.map((slot,index) => <div className="time-entry" key={index}><div className="time-value">{slot.time}</div><div className="time-marker"/><div className="time-desc"><strong>{slot.title}</strong><p>{slot.detail}</p></div></div>)}</div>
      <div className="schedule-foot"><Sparkles size={17}/><p>{day.note}</p></div>
    </section>

<FoodDining day={day.day} prefs={prefs}/>
<section className="gallery-card"><div className="section-title"><div><span className="kicker">TODAY'S GALLERY</span><h3>วันนี้จะเจออะไรบ้าง</h3><p className="gallery-copy">รวมจุดไฮไลต์ จุดกระแส และมุมถ่ายรูปสวยของวันนั้น ๆ สำหรับเปิดดูจากมือถือระหว่างเที่ยว</p></div><Tag color="soft">{gallery.length} จุดแนะนำ</Tag></div>
  <div className="gallery-grid">{gallery.map((spot, index) => <article className="gallery-spot" key={`${day.day}-${index}`}>
    <div className="gallery-thumb"><img src={spot.image} alt={`${spot.title} — ${spot.subtitle}`} loading="lazy" onError={event => { event.currentTarget.onerror = null; event.currentTarget.src = '/photos/placeholder.svg'; }} /></div>
    <div className="gallery-body">
      <div className="gallery-topline"><span className="gallery-index">SPOT {String(index + 1).padStart(2, '0')}</span><span className="gallery-vibe">{spot.vibe}</span></div>
      <h4>{spot.title}</h4>
      <p className="gallery-subtitle">{spot.subtitle}</p>
      <p className="gallery-why">{spot.why}</p>
      <div className="gallery-tags">{spot.tags.map(tag => <span key={tag}>{tag}</span>)}</div>
      <LinkOut className="map-button" href={mapSearchUrl(spot.map)}><MapPin size={15}/> เปิดตำแหน่งใน Google Maps</LinkOut>
    </div>
  </article>)}</div>
</section>
    <section className="stay-card"><div className="stay-icon"><BedDouble size={19}/></div><div><span className="kicker">TONIGHT'S STAY</span><h3>{day.stay}</h3></div>{day.day !== 8 && <a aria-label="นำทางไปโรงแรม" href={mapSearchUrl(day.day === 6 ? 'Nishimuraya Hotel Shogetsutei' : 'Centara Life Namba Hotel Osaka')} target="_blank" rel="noopener noreferrer"><MapPin size={18}/></a>}</section>
    <p className="accuracy-note"><ShieldCheck size={16}/> เวลารถไฟที่ไม่ได้จองและช่วงเดินทางเป็นแผน/ค่าประมาณ ตรวจเส้นทาง รถไฟรอบจริง และชานชาลาจาก Google Maps หรือ JR-WEST ก่อนออกเดินทาง</p>
  </>;
}

function ChecklistPanel({ checked, setChecked, syncStatus }) {
  const [filter, setFilter] = useState('todo');
  const completed = checklist.filter(x => checked[x.id]).length;
  const pending = checklist.length - completed;
  const shown = checklist.filter(x => filter === 'all' || (filter === 'todo' ? !checked[x.id] : checked[x.id])).sort((a, b) => a.due.localeCompare(b.due));
  const groups = [...new Set(shown.map(x => x.group))];
  const progress = Math.round(completed / checklist.length * 100);
  return <section className="content-pane"><Heading label="READY TO GO" title="Checklist ก่อนเดินทาง" caption="บันทึกสถานะออนไลน์ ซิงก์ข้ามอุปกรณ์"/>
    <p role="status" style={{fontSize:13,color:syncStatus==="error"?"#b42318":"#39765c"}}>{syncStatus==="saving"?"กำลังบันทึกออนไลน์…":syncStatus==="saved"?"✓ บันทึกแล้ว":syncStatus==="error"?"⚠ บันทึกออนไลน์ไม่สำเร็จ":"กำลังโหลดข้อมูล…"}</p>
    <div className="progress-card"><div className="progress-copy"><strong>{progress}%</strong><div><span>เตรียมพร้อมแล้ว</span><small>{completed} เสร็จแล้ว · {pending} ยังต้องทำ</small></div></div><div className="progress-track"><span style={{ width:`${progress}%` }}/></div></div>
    <div className="filters"><button className={filter === 'todo' ? 'selected' : ''} onClick={() => setFilter('todo')}>ยังไม่ทำ ({pending})</button><button className={filter === 'done' ? 'selected' : ''} onClick={() => setFilter('done')}>เสร็จแล้ว</button><button className={filter === 'all' ? 'selected' : ''} onClick={() => setFilter('all')}>ทั้งหมด</button></div>
    {groups.length ? groups.map(group => <div className="check-group" key={group}><div className="check-group-name"><span>{group}</span><span>{shown.filter(x => x.group === group).length}</span></div>{shown.filter(x => x.group === group).map(item => <label className={`check-item ${checked[item.id] ? 'done' : ''}`} key={item.id}>
      <input type="checkbox" checked={!!checked[item.id]} onChange={() => setChecked(old => ({ ...old, [item.id]: !old[item.id] }))}/><span className="square-check">{checked[item.id] && <Check size={16}/>}</span>
      <span className="check-info"><strong>{item.title}</strong><small>{item.detail}</small><span className="check-due">{checked[item.id] ? 'เรียบร้อยแล้ว' : `ควรเสร็จภายใน ${shortDate(item.due)}`}</span></span>
    </label>)}</div>) : <div className="empty-state"><CheckCircle2 size={32}/><p>ไม่มีรายการในหมวดนี้</p></div>}
    <button className="reset-link" onClick={() => { if (window.confirm('คืนสถานะ Checklist เป็นข้อมูลเริ่มต้นหรือไม่?')) setChecked(initialChecklist); }}><RefreshCw size={15}/> คืนค่า Checklist เริ่มต้น</button>
  </section>;
}

function BookingsPanel() {
  return <section className="content-pane"><Heading label="YOUR RESERVATIONS" title="ตั๋วและโรงแรม" caption="รวมข้อมูลที่ยืนยันแล้ว และรายการที่ยังรอซื้อ/จอง"/>
    <div className="flight-board"><span className="kicker">FLIGHT INFORMATION · 2 TRAVELERS</span>{trip.flights.map(f => <div className="flight-row" key={f.id}><div><strong>{f.route}</strong><span>{f.date} 2026 · {f.time} · Terminal 1 ทั้งขาออกและขาเข้า</span></div><Tag color="light">{f.code||'รอยืนยัน'}</Tag></div>)}</div>
    <div className="section-title bookings-heading"><div><span className="kicker">CONFIRMED STAYS</span><h3>ที่พักทั้งหมด 7 คืน</h3></div></div>
    {trip.hotels.map((hotel,index) => <div className="booking-row" key={hotel.id}><div className="booking-count">0{index+1}</div><div className="booking-body"><Tag color="green">ยืนยันการจองแล้ว</Tag><h3>{hotel.name}</h3><p>{hotel.date}</p><small>{hotel.plan} · {hotel.area}</small><LinkOut href={mapSearchUrl(hotel.map)} className="subtle-link">ดูที่ตั้งโรงแรม</LinkOut></div></div>)}
    <div className="ticket-card"><Ticket size={24}/><div><Tag color="green">จ่ายแล้ว</Tag><h3>Universal Studios Japan · 19 พ.ย.</h3><p>Studio Pass + Express Pass · 2 คน</p><p>Nintendo {travelBookings.usj.nintendoEntry} · Harry Potter {travelBookings.usj.harryPotterEntry} (ตรวจจาก QR อีกครั้ง)</p></div></div>
    <div className="pass-card"><div><span className="kicker">NANKAI DIGITAL TICKET · 17 NOV</span><h3>Rapi:t Super Seat — Kansai Airport → Nankai Namba</h3><p>ซื้อแล้ว {travelBookings.nankaiArrival.travelers} คน รวม ¥{travelBookings.nankaiArrival.totalPaidYen.toLocaleString('en-US')} · รวมค่าโดยสารพื้นฐาน + Limited Express</p><p><strong>ยังไม่เลือกขบวนและที่นั่ง</strong> · หลังผ่าน ตม. รับกระเป๋า ให้เปิด Ticket Wallet เลือกขบวนและ Super Seat ของทั้ง 2 คน ก่อนรถออกอย่างน้อย 5 นาที</p><p>ต้องเริ่มใช้ก่อน 18 พ.ย. 02:59 JST · อีเมลยืนยันไม่ใช่ QR ตั๋วจริง</p></div><Tag color="green">ซื้อแล้ว · รอเลือกที่นั่ง</Tag><LinkOut href={travelBookings.nankaiArrival.walletUrl} className="action-link">เปิด Purchased Ticket / เลือกที่นั่ง</LinkOut></div>
    <div className="pass-card"><div><span className="kicker">JR-WEST RAIL PASS</span><h3>Kansai WIDE Area Pass · 5 วัน</h3><p>ซื้อแล้ว 2 คน รวม ¥24,000 · ใช้ 20–24 พ.ย. · ต้องไปรับบัตร/ตั๋วที่จองก่อนขึ้นรถ</p></div><Tag color="green">ซื้อแล้ว · รอรับ</Tag><LinkOut href="https://www.westjr.co.jp/travel-information/en/tickets-passes/jrwest-rail-pass/kansai_wide/" className="action-link">รายละเอียด / ซื้อ JR Pass</LinkOut></div>
    <div className="pass-card"><div><span className="kicker">LIMITED EXPRESS SEATS</span><h3>{travelBookings.kounotori.outward.train} และ {travelBookings.kounotori.return.train} · จองทั้งสองขาแล้ว</h3><p>22 พ.ย. Osaka {travelBookings.kounotori.outward.depart} → Kinosaki {travelBookings.kounotori.outward.arrive} · Car {travelBookings.kounotori.outward.car} · Seats {travelBookings.kounotori.outward.seats}</p><p>23 พ.ย. Kinosaki {travelBookings.kounotori.return.depart} → Osaka {travelBookings.kounotori.return.arrive} · Car {travelBookings.kounotori.return.car} · Seats {travelBookings.kounotori.return.seats}</p></div><Tag color="green">Reserved Seat ยืนยันแล้ว</Tag><LinkOut href="https://www.westjr.co.jp/global/en/ticket/pass/reservation_form/index.php?p=kansai-widepass" className="action-link">จอง JR-WEST</LinkOut></div>
    <div className="info-card"><Info size={20}/><p>Nishimuraya ยืนยัน Dinner + Breakfast และได้รับแจ้งว่าแขกทั้งสองไม่ทานเนื้อวัว (ไม่ใช่การแพ้) ทานซาชิมิได้ และจะถึง Kinosaki 12:51</p></div>
  </section>;
}

function HelpPanel() {
  return <section className="content-pane"><Heading label="IN YOUR POCKET" title="ข้อมูลสำคัญระหว่างเที่ยว" caption="ลิงก์ฉุกเฉินและสิ่งที่ควรจำก่อนออกเดินทาง"/>
    <div className="help-feature"><MapPin size={21}/><div><strong>ที่พักหลัก · Centara Life Namba Hotel Osaka</strong><p>3-4-21 Shikitsuhigashi, Naniwa, Osaka · ใกล้ Daikokucho / Imamiyaebisu</p><LinkOut className="subtle-link" href={mapSearchUrl('Centara Life Namba Hotel Osaka')}>นำทางไปโรงแรม</LinkOut></div></div>
    <div className="help-feature"><TrainFront size={21}/><div><strong>การเดินทาง Kinosaki</strong><p>22 พ.ย. {travelBookings.kounotori.outward.train} {travelBookings.kounotori.outward.depart}–{travelBookings.kounotori.outward.arrive} · Car {travelBookings.kounotori.outward.car} Seats {travelBookings.kounotori.outward.seats} · 23 พ.ย. {travelBookings.kounotori.return.train} {travelBookings.kounotori.return.depart}–{travelBookings.kounotori.return.arrive} · Car {travelBookings.kounotori.return.car} Seats {travelBookings.kounotori.return.seats} · รับพาส/ตั๋วก่อนขึ้นรถ</p><LinkOut className="subtle-link" href="https://www.nishimuraya.ne.jp/shogetsu/en/access/">วิธีรับส่ง Nishimuraya</LinkOut></div></div>
    <div className="help-feature"><Luggage size={21}/><div><strong>ก่อนค้าง Kinosaki 1 คืน</strong><p>ขออนุญาต Centara ฝากกระเป๋าใหญ่ข้ามคืน 22–23 พ.ย. แล้วถือกระเป๋าใบเล็กไปเรียวกัง</p></div></div>
    <div className="help-feature"><Plane size={21}/><div><strong>เที่ยวบินขากลับ 24 พ.ย.</strong><p>{flightNumberLabel(travelBookings.flights.inbound)} · KIX Terminal 1 วันที่ 24 พ.ย. {localClock(travelBookings.flights.inbound.departure)} (ญี่ปุ่น) → DMK Terminal 1 วันที่ 25 พ.ย. {localClock(travelBookings.flights.inbound.arrival)} (ไทย) · เป้าหมายถึง KIX ประมาณ 16:45</p></div></div>
    <div className="help-feature"><Ticket size={21}/><div><strong>USJ วันที่ 19 พ.ย.</strong><p>ตั๋วซื้อแล้ว · Nintendo {travelBookings.usj.nintendoEntry} และ Harry Potter {travelBookings.usj.harryPotterEntry} ตามข้อมูลที่แจ้ง • QR จริงเป็นหลัก</p></div></div>
    <div className="quick-links">{resources.map(link => <LinkOut className="resource-link" key={link.name} href={link.url}><span><strong>{link.name}</strong><small>{link.desc}</small></span></LinkOut>)}<LinkOut className="resource-link" href="https://www.usj.co.jp/web/en/us/access/train"><span><strong>USJ Access</strong><small>เส้นทางรถไฟไป Universal City</small></span></LinkOut></div>
    <div className="info-card"><ShieldCheck size={20}/><p>แนะนำเก็บ Passport, QR, Booking Confirmation และประกันไว้ในโทรศัพท์แบบ Offline แยกจากเว็บไซต์นี้ เนื่องจากรหัส 6 หลักเป็นการป้องกันขั้นพื้นฐาน ไม่เหมาะกับเอกสารลับ</p></div>
  </section>;
}

export default function Home() {
  const [activeTab, setActiveTab] = useState('today');
  const [prefs,setPrefs] = useState(normalizePreferences());
  useEffect(()=>{try{setPrefs(normalizePreferences(JSON.parse(localStorage.getItem('kansai-2026-itinerary-options')||'{}')))}catch{}},[]);
  const updatePrefs=patch=>setPrefs(old=>{const next=normalizePreferences({...old,...patch,dayPlans:{...old.dayPlans,...(patch.dayPlans||{})}});try{localStorage.setItem('kansai-2026-itinerary-options',JSON.stringify(next))}catch{}return next});

  const [currentDay, setCurrentDay] = useState(1);
  const [checked, setChecked] = useState(initialChecklist);
  const [syncStatus,setSyncStatus] = useState('loading');
  const checkedRef = useRef(initialChecklist);
  const queue = useRef(Promise.resolve());
  const saveChecked = state => {
    setSyncStatus('saving');
    queue.current = queue.current.catch(()=>{}).then(async()=>{
      const response = await fetch('/api/checklist',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({checked:state}),cache:'no-store'});
      if(!response.ok)throw Error('save failed');
      setSyncStatus('saved');
    }).catch(()=>setSyncStatus('error'));
  };
  const changeChecked = value => {
    const next = typeof value === 'function' ? value(checkedRef.current) : value;
    checkedRef.current=next;setChecked(next);
    try{localStorage.setItem(STORAGE_KEY,JSON.stringify(next));}catch{}
    saveChecked(next);
  };
  const [goDaysOpen,setGoDaysOpen] = useState(false);
  useEffect(()=>{
    setCurrentDay(getTodayDay());
    let cached={};
    try{const value=JSON.parse(localStorage.getItem(STORAGE_KEY)||'null');if(value&&typeof value==='object'&&!Array.isArray(value))cached=value;}catch{}
    let cancelled=false;
    (async()=>{
      try{
        const response=await fetch('/api/checklist',{cache:'no-store'});
        if(!response.ok)throw Error('load failed');
        const remote=await response.json();if(cancelled)return;
        const next={...initialChecklist,...(remote.exists?remote.checked:cached)};
        // One-time migration for the booking tasks already confirmed by JR-WEST.
        let bookingMigration=false;
        try{
          if(localStorage.getItem('kansai-2026-booked-rail-checklist-v1')!=='done'){
            for(const id of ['pass-buy','seat-go','seat-back']){
              if(next[id]!==true){next[id]=true;bookingMigration=true;}
            }
            localStorage.setItem('kansai-2026-booked-rail-checklist-v1','done');
          }
        }catch{}
        checkedRef.current=next;setChecked(next);
        try{localStorage.setItem(STORAGE_KEY,JSON.stringify(next));}catch{}
        if(!remote.exists||bookingMigration)saveChecked(next);else setSyncStatus('saved');
      }catch{
        if(cancelled)return;
        const next={...initialChecklist,...cached};
        checkedRef.current=next;setChecked(next);setSyncStatus('error');
      }
    })();
    return()=>{cancelled=true};
  },[]);
  const tickets = {...defaultTickets,passStatus:checked['pass-pickup'] ? 'collected' : 'purchased'};
  const day = resolveDay(currentDay,prefs);
  const pending = checklist.filter(x => !checked[x.id]).length;
  const nextTasks = useMemo(() => checklist.filter(x => !checked[x.id]).sort((a,b) => a.due.localeCompare(b.due)).slice(0,2), [checked]);
  const selectTab = id => { setActiveTab(id); window.scrollTo({ top:0, behavior:'smooth' }); };
  return <main className="travel-shell"><div className="travel-content">
    <header className="mobile-header"><div className="header-logo"><span className="header-mark">日</span><div><strong>KANSAI <i>2026</i></strong><small>OUR JAPAN TRAVEL GUIDE</small></div></div><div className="header-date"><CalendarCheck2 size={16}/> 17—24 NOV</div></header>
    {activeTab === 'today' && <TodayMode tickets={tickets} prefs={prefs} onOpenDay={n=>{setCurrentDay(n);selectTab('plan')}}/>}
    {activeTab === 'plan' && <>
      <div className="welcome"><div><span className="kicker">YOUR TRAVEL COMPANION</span><h1>ไปไหนวันนี้?<span> 🇯🇵</span></h1><p>8 วัน 7 คืน · Osaka / Kyoto / Kinosaki</p></div><button onClick={() => setCurrentDay(getTodayDay())} className="today-pill"><CalendarCheck2 size={15}/> ไปวันที่ปัจจุบัน</button></div>
      <div className="day-strip" role="group" aria-label="เลือกวันที่เที่ยว">{itinerary.map(x => <button type="button" key={x.day} aria-pressed={currentDay === x.day} className={`day-chip ${currentDay===x.day?'active':''}`} onClick={() => setCurrentDay(x.day)}><small>{x.dow}</small><strong>{16+x.day}</strong><span>NOV</span></button>)}</div>
      <div className="tool-day-picker" aria-label="เลือกแผนสำรอง">{[['original','Original'],['rainy','Rainy Day'],['relaxed','Relaxed Plan']].map(([id,label])=><button key={id} className={(prefs.dayPlans[currentDay]||'original')===id?'active':''} onClick={()=>updatePrefs({dayPlans:{[currentDay]:id}})}>{label}</button>)}</div>
      {day.day === 4 && <KyotoSwitcher prefs={prefs} onChange={updatePrefs}/>}
      <DayPlan day={day} prefs={prefs}/>
      <div className="day-pagination"><button disabled={currentDay===1} onClick={() => setCurrentDay(x=>Math.max(1,x-1))}><ArrowLeft size={16}/> ก่อนหน้า</button><span>{currentDay} / 8</span><button disabled={currentDay===8} onClick={() => setCurrentDay(x=>Math.min(8,x+1))}>วันถัดไป <ArrowRight size={16}/></button></div>
    </>}
    {activeTab === 'table' && <TripTable prefs={prefs} onOpenDay={day => { setCurrentDay(day); selectTab('plan'); }}/>}
    {activeTab === 'costs' && <PassGuide tickets={tickets} prefs={prefs} onChange={updatePrefs}/>}
    {activeTab === 'checklist' && <ChecklistPanel checked={checked} setChecked={changeChecked} syncStatus={syncStatus}/>}
    {activeTab === 'bookings' && <><TicketPanel tickets={tickets} onOpenChecklist={()=>selectTab('checklist')}/><BookingsPanel/></>}
    {activeTab === 'dining' && <section className="content-pane"><Heading label="FOOD & DINING" title="Food Experiences" caption="เลือกตามวันและแผน Kyoto/Backup · สถานะร้านไม่ใช่การยืนยันจอง"/>{itinerary.map(d=><div key={d.day}><h3>{d.day+16} พ.ย. · {d.day===4?(prefs.kyoto==='east'?'Kyoto East':'Kyoto West'):d.location}</h3><FoodDining day={d.day} prefs={prefs}/></div>)}</section>}
    {activeTab === 'help' && <HelpPanel/>}
    <div className="site-foot">Kansai, With You · 2026 <span>✦</span> Made for the journey</div>
  </div>
  <nav className="bottom-nav" aria-label="เมนูหลัก">{tabItems.map(({id,text,icon:Icon}) => <button type="button" key={id} className={activeTab===id?'active':''} aria-current={activeTab===id ? 'page':undefined} onClick={() => selectTab(id)}><Icon size={21} strokeWidth={activeTab===id?2.5:1.75}/><span>{text}</span>{id==='checklist'&&pending>0&&<i>{pending}</i>}</button>)}</nav>
  </main>;
}
