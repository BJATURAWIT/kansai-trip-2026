'use client';

import { useState } from 'react';
import { CalendarDays, Clock3, ExternalLink, MapPin, TrainFront, ArrowRight } from 'lucide-react';
import { itinerary } from '../../data/trip';
import { travelGuide, mapSearchUrl } from '../../data/mobility';

const thaiDay = { MON: 'จ.', TUE: 'อ.', WED: 'พ.', THU: 'พฤ.', FRI: 'ศ.', SAT: 'ส.', SUN: 'อา.' };

function DayTable({ day, onOpenDay }) {
  const route = travelGuide[day.day - 1];
  return (
    <section className="trip-table-day" aria-labelledby={`table-day-${day.day}`}>
      <div className="trip-table-day-heading">
        <div>
          <span className="trip-table-date">DAY {String(day.day).padStart(2,'0')} · {thaiDay[day.dow] || day.dow} {16 + day.day} พ.ย.</span>
          <h3 id={`table-day-${day.day}`}>{day.title}</h3>
          <p>{day.summary}</p>
        </div>
        <button type="button" className="trip-table-detail-button" onClick={() => onOpenDay(day.day)}>ดูแผนละเอียด <ArrowRight size={14}/></button>
      </div>
      <div className="trip-table-meta">
        <span><TrainFront size={14}/> {route?.kicker || day.location}</span>
        <span><Clock3 size={14}/> เวลาแผน · JST*</span>
      </div>
      <div className="trip-table-scroll">
        <table className="trip-schedule-table">
          <caption className="sr-only">ตารางเวลา Day {day.day} วันที่ {16 + day.day} พฤศจิกายน 2026</caption>
          <thead><tr><th scope="col">เวลา</th><th scope="col">กิจกรรม / สถานที่</th><th scope="col">การเดินทาง / รายละเอียด</th></tr></thead>
          <tbody>
            {day.schedule.map((slot, index) => (
              <tr key={`${day.day}-${index}`}>
                <td className="trip-time-cell">{slot.time}</td>
                <td className="trip-activity-cell"><strong>{slot.title}</strong></td>
                <td className="trip-detail-cell">{slot.detail}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="trip-table-footer">
        <div><strong>เส้นทางหลัก:</strong> {route?.overview || day.summary}</div>
        <div className="trip-table-day-actions">
          <a href={mapSearchUrl(day.map)} target="_blank" rel="noopener noreferrer"><MapPin size={15}/> แผนที่ <ExternalLink size={13}/></a>
        </div>
      </div>
      <p className="trip-table-stay"><strong>ที่พัก:</strong> {day.stay}</p>
      <p className="trip-table-note">{day.note}</p>
    </section>
  );
}

export default function TripTable({ onOpenDay }) {
  const [filter, setFilter] = useState('all');
  const days = filter === 'all' ? itinerary : itinerary.filter(day => String(day.day) === filter);
  const events = days.reduce((sum, day) => sum + day.schedule.length, 0);
  return (
    <section className="content-pane trip-table-page">
      <div className="trip-table-page-heading">
        <span className="kicker">YOUR ITINERARY · 17–24 NOV 2026</span>
        <h2><CalendarDays size={26}/> แผนเที่ยวแบบตาราง</h2>
        <p>ดูครบทุกวัน หรือเลือกดูเฉพาะวัน · เรียงเวลาจากแผนเที่ยวล่าสุด</p>
      </div>
      <div className="trip-table-filter" aria-label="เลือกวันที่สำหรับตารางเที่ยว" role="group">
        <button type="button" className={filter === 'all' ? 'active' : ''} aria-pressed={filter === 'all'} onClick={() => setFilter('all')}>ทั้งหมด</button>
        {itinerary.map(day => (
          <button type="button" key={day.day} className={filter === String(day.day) ? 'active' : ''} aria-pressed={filter === String(day.day)} onClick={() => setFilter(String(day.day))}>
            {16 + day.day} พ.ย.
          </button>
        ))}
      </div>
      <div className="trip-table-summary"><span>{days.length} วัน</span><span>{events} กิจกรรม</span><span>เวลาไทยระบุแยก · เวลาอื่นตามญี่ปุ่น (JST)</span></div>
      {days.map(day => <DayTable key={day.day} day={day} onOpenDay={onOpenDay}/>)}
      <p className="trip-table-disclaimer">* เวลาและเส้นทางที่ไม่ได้จองเป็นแผนประมาณการ ควรตรวจรถไฟ/ชานชาลาจริงก่อนเดินทาง โดยเฉพาะวันที่ 20 พ.ย. ที่เที่ยว Kyoto หลายจุด</p>
    </section>
  );
}
