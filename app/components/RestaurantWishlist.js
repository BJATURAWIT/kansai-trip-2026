'use client';
import {useMemo,useState} from 'react';
import {ArrowUpRight,Clock3,MapPin,Search,UtensilsCrossed,CalendarDays,Camera,AlertTriangle} from 'lucide-react';
import {restaurantWishlist} from '../../data/restaurantWishlist';

const dateLabel={1:'17 พ.ย.',2:'18 พ.ย.',3:'19 พ.ย.',4:'20 พ.ย.',5:'21 พ.ย.',6:'22 พ.ย.',7:'23 พ.ย.',8:'24 พ.ย.'};
const filters=[{id:'all',title:'ทั้งหมด'},{id:1,title:'17 พ.ย.'},{id:2,title:'18 พ.ย.'},{id:4,title:'20 พ.ย.'},{id:7,title:'23 พ.ย.'},{id:8,title:'24 พ.ย.'}];
const defaultPhotos={
 sushi:'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=900&auto=format&fit=crop&q=78',
 noodle:'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=900&auto=format&fit=crop&q=78',
 dessert:'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=900&auto=format&fit=crop&q=78',
 coffee:'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=900&auto=format&fit=crop&q=78',
 food:'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=900&auto=format&fit=crop&q=78'
};
const fallbackFor=venue=>/กาแฟ|Coffee/i.test(venue.category)?defaultPhotos.coffee:/ชูครีม|สโคน|ขนม|มิลเฟย/i.test(venue.category)?defaultPhotos.dessert:/ราเมง/i.test(venue.category)?defaultPhotos.noodle:/ซูชิ|ปลา|แซลมอน/i.test(venue.category)?defaultPhotos.sushi:defaultPhotos.food;
const mapUrl=place=>'https://www.google.com/maps/search/?api=1&query='+encodeURIComponent(place);
const imageSearchUrl=venue=>'https://www.google.com/search?tbm=isch&q='+encodeURIComponent(venue.name+' '+venue.place);

function VenuePhoto({venue}){
 const [photoState,setPhotoState]=useState({id:venue.id,stage:0});
 const stage=photoState.id===venue.id?photoState.stage:0;
 const photoSrc=stage===0?venue.image:stage===1?fallbackFor(venue):null;
 const isSample=stage>0||venue.photoKind==='sample';
 return <a className="wishlist-photo" href={imageSearchUrl(venue)} target="_blank" rel="noopener noreferrer" aria-label={"ดูรูปเพิ่มเติมของร้าน "+venue.name+" ใน Google Images"} title="คลิกดูรูปเพิ่มเติมใน Google Images">
   {photoSrc?<img src={photoSrc} alt={isSample?'ภาพตัวอย่างประเภท '+venue.category:'ภาพประกอบ '+venue.name} loading="lazy" decoding="async" referrerPolicy="no-referrer" onError={()=>setPhotoState({id:venue.id,stage:Math.min(2,stage+1)})}/>:<div className="wishlist-photo-unavailable">ไม่สามารถแสดงรูปจากแหล่งภายนอกได้ — เปิดดูรูปจากแหล่งที่มาด้านล่าง</div>}
   <span className="wishlist-photo-label"><Camera size={13}/>{isSample?'ภาพตัวอย่างประเภทอาหาร':'ภาพจากแหล่งรีวิว / ร้าน'} · กดดูรูปเพิ่มเติม</span>
 </a>;
}

export default function RestaurantWishlist(){
 const [day,setDay]=useState('all');
 const [search,setSearch]=useState('');
 const visible=useMemo(()=>restaurantWishlist.filter(v=>(day==='all'||v.days.includes(Number(day)))&&(!search||[v.name,v.category,v.area,v.menu].join(' ').toLowerCase().includes(search.toLowerCase()))).sort((a,b)=>day==='all'?a.name.localeCompare(b.name):Number(b.bestDay===Number(day))-Number(a.bestDay===Number(day))),[day,search]);
 return <section className="wishlist-section" id="restaurant-wishlist">
   <div className="wishlist-header">
     <span className="kicker">SAVED FOOD SPOTS · 17 LOCATIONS</span>
     <h3>ร้านอาหารที่อยากไป <span>🍜</span></h3>
     <p>รวมร้านใน Wishlist ทั้ง 17 แห่ง พร้อมรูปประกอบ สถานที่ เมนู และวันที่แนะนำตามแผนจริง · เป็น <strong>ทางเลือกเพิ่มเติม</strong> ไม่เปลี่ยนตารางเที่ยวและร้านที่จองแล้ว</p>
   </div>
   <div className="wishlist-controls">
     <label className="wishlist-search"><Search size={17}/><input value={search} onChange={e=>setSearch(e.target.value)} placeholder="ค้นหาร้าน เมนู หรือย่าน..." aria-label="ค้นหาร้านอาหาร"/></label>
     <div className="wishlist-filter" role="group" aria-label="กรองร้านตามวันที่">{filters.map(f=><button type="button" key={f.id} aria-pressed={day===f.id} className={day===f.id?'is-active':''} onClick={()=>setDay(f.id)}>{f.title}</button>)}</div>
   </div>
   <div className="wishlist-day-note"><CalendarDays size={16}/>{day==='all'?<>แนะนำ Day 2 (Namba–Shinsaibashi), Day 7 (Umeda หลังรถไฟถึง 18:21) และ Day 8 เฉพาะร้านที่ไม่เสี่ยงต่อการไปสนามบิน</>:<>วันที่ {dateLabel[day]} · แสดง {visible.length} ร้านที่พอจัดลงวันนั้นได้ (ไม่ใช่ทั้งหมดที่ต้องไป)</>}</div>
   <div className="wishlist-grid">
     {visible.map(v=><article className="wishlist-card" key={v.id}>
       <VenuePhoto venue={v}/>
       <div className="wishlist-card-body">
         <div className="wishlist-chips"><span>{v.area}</span><span className="wishlist-kind">{v.category}</span>{v.status==='avoid'&&<span className="wishlist-warning-chip">ไม่เหมาะ</span>}{v.status==='detour'&&<span className="wishlist-neutral-chip">ต้องเผื่อเวลา</span>}</div>
         <h4>{v.name}</h4>
         <p className="wishlist-address"><MapPin size={14}/>{v.address}</p>
         <div className="wishlist-best"><span>วันที่แนะนำ</span><strong>Day {v.bestDay} · {dateLabel[v.bestDay]}</strong><p><Clock3 size={15}/>{v.time}</p></div>
         <p className="wishlist-description">{v.reason}</p>
         <p className="wishlist-detail"><UtensilsCrossed size={15}/><span><strong>เมนู:</strong> {v.menu}</span></p>
         <p className="wishlist-detail"><Clock3 size={15}/><span><strong>เวลาร้าน:</strong> {v.hours}</span></p>
         {v.warning&&<p className="wishlist-caution"><AlertTriangle size={15}/><span>{v.warning}</span></p>}
         <div className="wishlist-actions"><a href={imageSearchUrl(v)} target="_blank" rel="noopener noreferrer" aria-label={"ดูรูป "+v.name+" ใน Google Images"}><Camera size={15}/> ดูรูปใน Google Images <ArrowUpRight size={13}/></a><a href={mapUrl(v.place)} target="_blank" rel="noopener noreferrer"><MapPin size={15}/> Google Maps <ArrowUpRight size={13}/></a>{(v.source||v.photo)&&<a href={v.source||v.photo} target="_blank" rel="noopener noreferrer">ร้าน / แหล่งข้อมูล <ArrowUpRight size={13}/></a>}</div>
         {v.photo&&<a className="wishlist-photo-credit" href={v.photo} target="_blank" rel="noopener noreferrer">เครดิตรูป: เปิดดูต้นทาง <ArrowUpRight size={11}/></a>}
         {v.photoKind==='sample'&&<small className="wishlist-sample-disclaimer">รูปเป็นภาพตัวอย่างชนิดอาหาร ไม่ใช่ภาพของร้าน</small>}
       </div>
     </article>)}
   </div>
   {visible.length===0&&<p className="wishlist-empty">ไม่พบร้านที่ตรงกับคำค้น ลองลบคำค้นหรือเลือก “ทั้งหมด”</p>}
   <p className="wishlist-footnote">หมายเหตุ: เวลาเปิดร้านและการเข้าคิวอาจเปลี่ยนแปลงได้ กดภาพหรือปุ่ม Google Images เพื่อดูรูปค้นหาตามชื่อร้านและพื้นที่ รูปจากเว็บไซต์ภายนอกมีลิงก์เครดิตกำกับ หากโหลดไม่ได้จะแสดงภาพตัวอย่างอาหารแทนโดยไม่ระบุว่าเป็นรูปจากร้านจริง • ทั้งสองคนไม่ทานเนื้อวัว (ไม่ใช่อาหารแพ้)</p>
 </section>;
}
