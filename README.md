# Kansai, With You — Japan 2026

เว็บแผนเที่ยวโอซาก้า เกียวโต คิโนซากิ และ Checklist สำหรับทริป 17–24 พฤศจิกายน 2026 (2 คน)

## Tech stack
- JavaScript / React / Next.js App Router (`app/`)
- CSS (responsive, mobile-first)
- `localStorage` เก็บการติ๊ก Checklist (แยกตามเบราว์เซอร์ ไม่ซิงก์ข้ามอุปกรณ์)
- ไม่มีฐานข้อมูล / API / environment variables / บริการที่ต้องเสียเงิน

## Run locally
```bash
npm install
npm run verify
npm run dev
```
เปิด http://localhost:3000

## Deploy to Vercel via GitHub
1. สร้าง repository **ใหม่** บน GitHub เช่น `kansai-trip-2026` และอัปโหลด **ไฟล์และโฟลเดอร์ทั้งหมดในโปรเจกต์นี้ไปไว้ที่ root ของ repository** (อย่าเอาโฟลเดอร์ `kansai-trip-web` ไปซ้อนผิดระดับ)
2. เปิด Vercel → Add New → Project → Import Git Repository
3. เลือก `kansai-trip-2026` ตั้งค่า Framework Preset = Next.js, Root Directory = `./`
4. Build Command = `npm run build` (หรือ Default), Output Directory = Default (อย่าตั้งเป็น `out`)
5. กด Deploy; เมื่อ Push ไป `main` จะ deploy ใหม่อัตโนมัติ
6. ถ้าเพื่อนเปิดไม่ได้เพราะ Vercel Authentication ให้ตรวจ Settings → Deployment Protection และใช้ production URL (`*.vercel.app`) ของโปรเจกต์ ตรวจสิทธิ์การเผยแพร่ก่อนปิดการป้องกัน

## Edit trip data
- `data/trip.js` — โรงแรม เที่ยวบิน แผน 8 วัน Checklist รายละเอียด เวลา และลิงก์
- `app/page.js` — UI และ interaction
- `app/globals.css` — ธีม สี layout และ responsive
- `app/layout.js` — metadata

## Important notes
- JR-WEST Kansai WIDE Area Pass ซื้อแล้ว 2 คน ใช้ 20–24 พ.ย. 2026; Reserved Seat Kounotori 5 และ Kounotori 22 จองแล้ว
- เส้นทางและเวลารถไฟต้องเช็กตาม timetable ล่าสุดก่อนเดินทาง
- Checklist ยืนยันเสร็จเฉพาะรายการที่ผู้ใช้เคยบอกว่าเสร็จจริง
- การเดินทางบางวันยังเป็น 'ร่างแผน' ไม่ใช่การจอง
- รูปประกอบโหลดจากเว็บไซต์ภายนอก (Amnet, Keihan และ Time Out) อาจไม่แสดงถ้าเจ้าของเว็บไซต์บล็อก hotlink; UI มีสีพื้น fallback
- หลีกเลี่ยงการโพสต์เลข Passport, QR code ตั๋ว, confirmation number, และข้อมูลส่วนบุคคลลงเว็บไซต์ที่เป็น public
- ไม่มี shared state / server-side sync; ต้องเพิ่มฐานข้อมูล (เช่น Supabase) ถ้าต้องการติ๊ก Checklist แล้วสะท้อนอีกอุปกรณ์

## Resources
- JR West: https://www.westjr.co.jp/travel-information/en/tickets-passes/jrwest-rail-pass/kansai_wide/
- USJ: https://www.usj.co.jp/web/en/us/enjoy/app
- Visit Japan Web: https://www.vjw.digital.go.jp/

## Travel data consistency (23 Oct 2026)

`data/centralTravel.js` is the public-safe authoritative source for flights, hotels, USJ, JR Pass, and Kounotori reservations. The return flight number is **unverified**, so do not infer a code from an old itinerary. Verified-by-user departure KIX 24 Nov 2026 19:45 JST; arrival DMK 25 Nov 2026 00:15 ICT. Confirm the number from the original AirAsia e-ticket before adding it.

`npm run verify` audits booking facts, timezone logic, daily itinerary, and stale flight markers. The production `prebuild` runs these regression tests before the image/download and Next.js build stages.
