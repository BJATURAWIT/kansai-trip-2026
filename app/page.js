'use client';

import { useEffect, useMemo, useState } from 'react';
import {
  ArrowRight, ArrowUpRight, BedDouble, CalendarDays, Check,
  CheckCircle2, ChevronRight, Circle, Clock3, ExternalLink,
  FileCheck2, Heart, Luggage, MapPin, Menu, Plane, RotateCcw,
  ShieldCheck, Sparkles, Ticket, TrainFront, X,
} from 'lucide-react';
import { trip, images, itinerary, checklist, resources } from '../data/trip';

const STORAGE_KEY = 'kansai-2026-checklist-v1';
const initialState = Object.fromEntries(checklist.map(task => [task.id, task.done]));

function openMap(query) {
  window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`, '_blank', 'noopener,noreferrer');
}

const formatDate = value => new Date(value + 'T12:00:00+07:00').toLocaleDateString('th-TH', { day: 'numeric', month: 'short' });
const daysUntil = value => Math.ceil((new Date(value + 'T00:00:00+07:00').getTime() - Date.now()) / 86400000);

function Picture({ name, className = '', alt = '' }) {
  const [failed, setFailed] = useState(false);
  return <div className={`picture picture-${name} ${className}`}>
    {!failed && <img loading={name === 'hero' ? 'eager' : 'lazy'} src={images[name] || images.osaka} alt={alt} onError={() => setFailed(true)} />}
    {failed && <div className="picture-fallback">JAPAN · 2026</div>}
  </div>;
}

function SectionHeading({ index, eyebrow, title, lead, inverted = false }) {
  return <div className={`section-heading ${inverted ? 'inverted' : ''}`}>
    <div className="heading-left"><span className="chapter-index">{index}</span><div><p className="eyebrow">{eyebrow}</p><h2>{title}</h2></div></div>
    {lead && <p className="heading-lead">{lead}</p>}
  </div>;
}

function Modal({ day, onClose }) {
  useEffect(() => {
    if (!day) return;
    const handler = e => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    document.body.style.overflow = 'hidden';
    return () => { window.removeEventListener('keydown', handler); document.body.style.overflow = ''; };
  }, [day, onClose]);
  if (!day) return null;
  return <div className="modal-backdrop" onMouseDown={e => { if (e.target === e.currentTarget) onClose(); }} role="presentation">
    <section className="modal" role="dialog" aria-modal="true" aria-label={`รายละเอียดวันที่ ${day.day}`}>
      <div className="modal-photo"><Picture name={day.image} alt={day.location} /><button className="modal-close" aria-label="ปิดรายละเอียด" onClick={onClose}><X size={20}/></button><div className="modal-photo-title"><span>{day.date} · {day.location}</span><h2>{day.title}</h2></div></div>
      <div className="modal-content">
        <div className="modal-overline"><span>DAY {String(day.day).padStart(2, '0')}</span><span className={`status-tag ${day.type === 'confirmed' ? 'confirmed' : ''}`}>{day.type === 'confirmed' ? 'มีรายการที่ยืนยันแล้ว' : 'ร่างแผน · เปลี่ยนได้'}</span></div>
        <h3>{day.subtitle}</h3>
        <div className="timeline">{day.schedule.map((event, i) => <div className="timeline-row" key={i}><span className="timeline-time">{event.time}</span><span className="timeline-dot"/><div><strong>{event.title}</strong><p>{event.detail}</p></div></div>)}</div>
        <p className="modal-note"><Sparkles size={16}/>{day.note}</p>
        <div className="modal-footer"><span><BedDouble size={16}/> {day.stay}</span><button onClick={() => openMap(day.map)}>เปิด Google Maps <ArrowUpRight size={16}/></button></div>
      </div>
    </section>
  </div>;
}

export default function Home() {
  const [activeDay, setActiveDay] = useState(null);
  const [checked, setChecked] = useState(initialState);
  const [filter, setFilter] = useState('todo');
  const [ready, setReady] = useState(false);
  const [showAllGroups, setShowAllGroups] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  useEffect(() => {
    try { const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null'); if (stored && typeof stored === 'object') setChecked({ ...initialState, ...stored }); } catch { /* ignore corrupted browser storage */ }
    setReady(true);
  }, []);
  useEffect(() => { if (ready) try { localStorage.setItem(STORAGE_KEY, JSON.stringify(checked)); } catch { /* storage unavailable */ } }, [checked, ready]);

  const completed = checklist.filter(x => checked[x.id]).length;
  const pending = checklist.length - completed;
  const progress = Math.round(completed / checklist.length * 100);
  const countdown = daysUntil('2026-11-17');
  const nextTasks = checklist.filter(x => !checked[x.id]).sort((a, b) => a.due.localeCompare(b.due)).slice(0, 3);
  const filtered = checklist.filter(x => filter === 'all' || (filter === 'done' ? checked[x.id] : !checked[x.id]));
  const groups = [...new Set(filtered.map(x => x.group))];
  const changeStatus = id => setChecked(x => ({ ...x, [id]: !x[id] }));
  const visibleGroups = showAllGroups ? groups : groups.slice(0, 9);
  const menus = [['#overview','ภาพรวม'],['#journey','แผน 8 วัน'],['#transport','การเดินทาง'],['#bookings','การจอง'],['#checklist','Checklist']];

  return <main>
    <header className="topbar"><div className="container topbar-inner">
      <a href="#home" className="brand"><span className="brand-mark">日</span><span>KANSAI<span className="brand-dot">.</span><small>TRAVEL NOTES · 2026</small></span></a>
      <nav className={`nav ${mobileMenu ? 'nav-open' : ''}`}>{menus.map(([href,text])=><a key={href} href={href} onClick={() => setMobileMenu(false)}>{text}</a>)}</nav>
      <a className="topbar-cta" href="#checklist">MY CHECKLIST <ArrowUpRight size={15}/></a>
      <button className="mobile-nav-toggle" onClick={()=>setMobileMenu(!mobileMenu)} aria-label="เปิดเมนู">{mobileMenu ? <X size={24}/> : <Menu size={24}/>}</button>
    </div></header>

    <section className="hero" id="home">
      <Picture name="hero" className="hero-bg" alt="บรรยากาศย่านโดทงโบริ เมืองโอซาก้า" />
      <div className="hero-shade"/>
      <div className="container hero-inner">
        <div className="hero-content"><div className="eyebrow hero-topline"><span className="tiny-line"/> OUR LITTLE JAPAN ESCAPE · 2026</div>
          <h1>Lost in <em>Japan.</em><br/><span>Found in moments.</span></h1>
          <p>8 วันของโอซาก้า เกียวโต คิโนซากิ และเรื่องราวที่เราจะเก็บกลับมา</p>
          <div className="hero-actions"><a href="#journey" className="button primary">EXPLORE OUR JOURNEY <ArrowRight size={18}/></a><a href="#checklist" className="button outline">ดู Checklist <ChevronRight size={18}/></a></div>
        </div>
        <div className="hero-bottom"><span>OSAKA · KYOTO · KINOSAKI</span><span>17 — 24 NOV, 2026 <span className="star">✳</span> TWO TRAVELERS</span></div>
      </div>
      <div className="hero-stamp"><span>日本</span><small>AUTUMN<br/>GETAWAY</small></div>
    </section>

    <section className="statbar" id="overview"><div className="container stat-grid">
      <div className="stat"><CalendarDays size={20}/><div><strong>17–24 NOV</strong><span>2026 · 8 DAYS / 7 NIGHTS</span></div></div>
      <div className="stat"><Plane size={20}/><div><strong>DMK ↔ KIX</strong><span>THAI AIRASIA X · 2 PEOPLE</span></div></div>
      <div className="stat"><TrainFront size={20}/><div><strong>OSAKA / KYOTO / KINOSAKI</strong><span>3 HIGHLIGHT DESTINATIONS</span></div></div>
      <div className="stat countdown"><span className="stat-number">{countdown > 0 ? countdown : countdown === 0 ? 'GO!' : '✓'}</span><div><strong>{countdown > 0 ? 'DAYS TO GO' : countdown === 0 ? 'TRAVEL DAY!' : 'TRIP DATE PASSED'}</strong><span>{countdown > 0 ? 'UNTIL THE ADVENTURE BEGINS' : '17 NOVEMBER 2026'}</span></div></div>
    </div></section>

    <section className="section intro-section"><div className="container intro-grid"><div className="intro-text"><p className="eyebrow"><span className="coral-dot"/> THE STORY BEGINS</p><h2>Not just a trip.<br/><em>A collection of memories.</em></h2><p>คืนแสงสีที่โอซาก้า เช้าตรู่ในเกียวโต และวันที่ปล่อยใจให้ช้าลงที่คิโนซากิ ทุกอย่างถูกรวบรวมไว้ที่นี่ ตั้งแต่รายละเอียดการเดินทางไปจนถึง Checklist ก่อนออกบิน</p><div className="intro-tags"><span>♧ CITY WALKS</span><span>♨ ONSEN</span><span>✦ THEME PARK</span></div></div><div className="intro-image"><Picture name="kinosaki" alt="คลองในเมืองคิโนซากิ ออนเซ็น" /><div className="intro-image-tag">A SLOWER KIND OF MAGIC <span>♥</span></div></div></div></section>

    <section className="section journey-section" id="journey"><div className="container">
      <SectionHeading index="01" eyebrow="THE JOURNEY" title="Eight days, endless stories." lead="กดที่การ์ดแต่ละวันเพื่อดูตารางเที่ยว เวลาเดินทาง และแผนที่ เราแยกรายการที่ยืนยันแล้วกับร่างแผนไว้ให้"/>
      <div className="journey-grid">{itinerary.map(day=><button key={day.day} className="day-card" onClick={()=>setActiveDay(day)} aria-label={`ดูรายละเอียดวัน ${day.day}: ${day.title}`}>
        <div className="day-image"><Picture name={day.image} alt={day.location} /><div className="day-image-top"><span>DAY {String(day.day).padStart(2,'0')}</span><span>{day.dow} · {day.date}</span></div><span className="day-image-location"><MapPin size={12}/>{day.location}</span></div>
        <div className="day-body"><span className={`day-label ${day.type === 'confirmed' ? 'confirmed' : ''}`}>{day.type === 'confirmed' ? 'BOOKING / FLIGHT INFO' : 'FLEXIBLE PLAN'}</span><h3>{day.title}</h3><p>{day.summary}</p><div className="day-bottom"><span>{day.highlight}</span><span className="circle-arrow"><ArrowUpRight size={17}/></span></div></div>
      </button>)}</div>
      <div className="journey-note"><Sparkles size={19}/><span><b>หมายเหตุ:</b> วันที่ 18, 20, 21 และ 23 พ.ย. เป็นร่างแผนที่ปรับเปลี่ยนได้ ส่วนเวลา USJ และรถไฟควรตรวจจากตั๋ว/ตารางล่าสุดก่อนวันเดินทาง</span></div>
    </div></section>

    <section className="section transport-section" id="transport"><div className="container">
      <SectionHeading index="02" eyebrow="GETTING AROUND" title="Every journey needs a little planning." lead="JR Pass ที่เลือกไว้ใช้ติดต่อกัน 5 วัน โดยเน้นเส้นทางไปคิโนซากิ และใช้ ICOCA สำหรับการเดินทางที่ไม่ครอบคลุม" inverted/>
      <div className="transport-layout"><div className="rail-card"><div className="rail-top"><span className="rail-badge">YOUR RAIL PLAN</span><TrainFront size={26}/></div><h3>Kansai WIDE<br/>Area Pass</h3><p>JR-WEST · 5 CONSECUTIVE DAYS</p><div className="rail-days">{['20','21','22','23','24'].map((x,i)=><div key={x}><b>{x}</b><span>NOV</span><small>DAY {i+1}</small></div>)}</div><div className="rail-price"><div><small>REFERENCE PRICE</small><strong>¥12,000 <span>/ person</span></strong></div><span>ยังไม่ได้ซื้อ</span></div><a href="https://www.westjr.co.jp/travel-information/en/tickets-passes/jrwest-rail-pass/kansai_wide/" target="_blank" rel="noreferrer">รายละเอียดจาก JR-WEST <ArrowUpRight size={17}/></a></div>
      <div className="transport-steps">
        <div className="transport-step"><div className="step-number">01</div><div><span>BEFORE 22 OCT</span><h4>ซื้อ Kansai WIDE Pass</h4><p>เลือกวันเริ่มใช้ 20 พ.ย. จำนวน 2 คน ตรวจชื่อและเงื่อนไขการรับบัตร</p></div><span className="step-pill pending">ต้องทำ</span></div>
        <div className="transport-step"><div className="step-number">02</div><div><span>22 OCT · SEAT BOOKING</span><h4>จอง Kounotori 5 · ขาไป</h4><p>22 พ.ย. Osaka → Kinosaki Onsen วางแผนถึง 12:51 น. (JST) · สำรองที่นั่งก่อนเดินทาง</p></div><span className="step-pill pending">ต้องทำ</span></div>
        <div className="transport-step"><div className="step-number">03</div><div><span>23 OCT · SEAT BOOKING</span><h4>จอง Limited Express · ขากลับ</h4><p>23 พ.ย. Kinosaki → Osaka เลือกเวลาที่ต้องการก่อนจอง</p></div><span className="step-pill pending">ต้องทำ</span></div>
        <div className="transport-step"><div className="step-number">04</div><div><span>LOCAL RIDES</span><h4>ICOCA + รถไฟอื่น ๆ</h4><p>เตรียมสำหรับ Osaka Metro, รถไฟเอกชน และเส้นทางที่ JR Pass ไม่ครอบคลุม</p></div><span className="step-pill neutral">เตรียมไว้</span></div>
      </div></div>
      <p className="rail-disclaimer">ช่วงวัน 20–24 พ.ย. เป็นแผนการใช้ Pass ไม่ใช่บัตรที่ออกแล้ว · ราคาอ้างอิงจาก JR-WEST และอาจเปลี่ยนได้ · Pass ไม่ครอบคลุมรถไฟทุกบริษัท <a href="https://www.westjr.co.jp/travel-information/en/tickets-passes/jrwest-rail-pass/kansai_wide/" target="_blank" rel="noreferrer">ดูเงื่อนไขทางการ <ArrowUpRight size={13}/></a></p>
    </div></section>

    <section className="section bookings-section" id="bookings"><div className="container"><SectionHeading index="03" eyebrow="ALL SET TO STAY" title="The places we'll call home." lead="โรงแรม 3 ช่วง รวม 7 คืน ยืนยันการจองแล้ว พร้อมรายละเอียดมื้ออาหารที่ทราบ"/>
      <div className="booking-grid">{trip.hotels.map((hotel,index)=><div key={hotel.id} className="booking-card"><div className="booking-card-top"><div className="booking-symbol"><BedDouble size={23}/></div><span><CheckCircle2 size={14}/> จองแล้ว</span></div><p className="booking-caption">STAY {String(index+1).padStart(2,'0')} · {hotel.area}</p><h3>{hotel.name}</h3><p className="booking-date"><CalendarDays size={16}/>{hotel.date}</p><div className="booking-bottom"><span>{hotel.plan}</span><button title="เปิด Google Maps" onClick={()=>openMap(hotel.map)}><MapPin size={15}/> แผนที่</button></div></div>)}</div>
      <div className="booking-extras"><div><Ticket size={22}/><div><strong>USJ · 19 NOV</strong><span>Studio Pass + Express Pass 2 คน · จ่ายแล้ว</span></div></div><div><Heart size={22}/><div><strong>Nishimuraya meal preference</strong><span>แจ้งแล้ว: ไม่ทานเนื้อวัว (ไม่แพ้) · Sashimi ได้ · รวม Dinner & Breakfast</span></div></div></div>
    </div></section>

    <section className="section checklist-section" id="checklist"><div className="container"><SectionHeading index="04" eyebrow="READY, SET, JAPAN" title="A little prep, a lot of peace of mind." lead="Checklist อิงจากสิ่งที่คุยกันล่าสุด กดติ๊กเมื่อทำเสร็จ สถานะจะเก็บไว้ในเบราว์เซอร์เครื่องนี้" inverted/>
      <div className="check-dashboard"><div className="check-progress"><div className="progress-title"><div><span>YOUR PREPARATION</span><strong>{progress}% <small>COMPLETE</small></strong></div><CheckCircle2 size={30}/></div><div className="progress-track"><div style={{width:`${progress}%`}}/></div><div className="progress-counters"><span><CheckCircle2 size={15}/>{completed} เสร็จแล้ว</span><span><Circle size={15}/>{pending} ยังต้องทำ</span></div></div>
      <div className="next-up"><div className="next-up-title"><Clock3 size={18}/> UP NEXT <span>เรียงตามกำหนด</span></div>{nextTasks.length ? nextTasks.map(x=><div className="next-task" key={x.id}><div><strong>{x.title}</strong><small>{x.detail}</small></div><span className={daysUntil(x.due)<0?'due-past':''}>{daysUntil(x.due)<0 ? 'เลยกำหนด' : daysUntil(x.due)===0 ? 'วันนี้' : `อีก ${daysUntil(x.due)} วัน`}</span></div>):<div className="next-empty">ทำครบแล้ว! พร้อมออกเดินทาง 🎉</div>}</div></div>
      <div className="checklist-panel"><div className="checklist-toolbar"><div><h3>Before we fly <span>{checklist.length} tasks</span></h3><p>ข้อมูลล่าสุดจากแผนเตรียมเดินทาง · จัดกลุ่มตามประเภทงาน</p></div><div className="toolbar-right"><div className="filter-group"><button className={filter==='todo'?'active':''} onClick={()=>setFilter('todo')}>ยังไม่เสร็จ ({pending})</button><button className={filter==='all'?'active':''} onClick={()=>setFilter('all')}>ทั้งหมด</button><button className={filter==='done'?'active':''} onClick={()=>setFilter('done')}>เสร็จแล้ว</button></div><button className="reset-button" onClick={()=>{ if (window.confirm('คืนค่า Checklist ตามข้อมูลเริ่มต้นใช่ไหม?')) setChecked(initialState); }} title="คืนค่าเริ่มต้น"><RotateCcw size={17}/></button></div></div>
        {filtered.length ? visibleGroups.map(group=><div key={group} className="task-group"><div className="task-group-title"><span>{group}</span><span>{filtered.filter(x=>x.group===group).length} ITEMS</span></div>
          {filtered.filter(x=>x.group===group).map(task=><label className={`task-item ${checked[task.id]?'is-done':''}`} key={task.id}>
            <input type="checkbox" checked={!!checked[task.id]} onChange={()=>changeStatus(task.id)}/><span className="check-box">{checked[task.id] && <Check size={14}/>}</span>
            <span className="task-copy"><strong>{task.title}</strong><small>{task.detail}</small></span>
            <span className={`task-due ${!checked[task.id]&&daysUntil(task.due)<0?'past':''}`}>{checked[task.id]?'DONE':formatDate(task.due)}</span>
          </label>)}</div>):<div className="empty-filter">ไม่มีรายการในหมวดนี้ 🎉</div>}
        {groups.length>9 && <button className="show-more" onClick={()=>setShowAllGroups(x=>!x)}>{showAllGroups?'แสดงน้อยลง':'แสดงหมวดเพิ่มเติม'} <ChevronRight size={16}/></button>}
        <p className="storage-note"><ShieldCheck size={16}/> สถานะการติ๊กบันทึกบนอุปกรณ์และเบราว์เซอร์นี้เท่านั้น ยังไม่ซิงก์ระหว่างโทรศัพท์และคอมพิวเตอร์ ไม่ควรใส่เลข Passport หรือรหัสจองที่เป็นความลับบนเว็บไซต์สาธารณะ</p>
      </div>
    </div></section>

    <section className="section quick-section"><div className="container"><SectionHeading index="05" eyebrow="QUICK ACCESS" title="Useful links for the road." lead="ลิงก์ทางการที่ควรเปิดได้ง่ายก่อนออกเดินทาง"/>
      <div className="links-grid">{resources.map(link=><a key={link.name} href={link.url} target="_blank" rel="noreferrer" className="resource-card"><div><p>{link.desc}</p><h3>{link.name}</h3></div><span><ArrowUpRight size={20}/></span></a>)}</div>
    </div></section>

    <footer className="footer"><div className="container footer-inner"><div><span className="footer-japan">旅の思い出</span><h2>See you in Japan.</h2><p>17 — 24 NOVEMBER 2026 · A TRIP MADE OF MOMENTS.</p></div><div className="footer-right"><a href="#home">BACK TO TOP ↑</a><p>ภาพประกอบ: Travel with Amnet, Keihan Railway และ Time Out<br/>ใช้เพื่อการวางแผนท่องเที่ยวส่วนบุคคล</p></div></div></footer>
    <Modal day={activeDay} onClose={()=>setActiveDay(null)}/>
  </main>;
}
