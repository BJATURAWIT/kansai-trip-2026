import { safeNext } from '../../lib/access';
export const metadata = { title: 'Enter your key · Kansai Trip 2026', robots: { index: false, follow: false } };
export default async function UnlockPage({ searchParams }) {
  const params = await searchParams;
  const hasError = params?.error === '1';
  return <main className="gate-page">
    <div className="gate-visual" aria-hidden="true"><span className="gate-japanese">旅</span><span>OSAKA · KYOTO · KINOSAKI</span></div>
    <section className="gate-card">
      <div className="gate-sign">日本 • 2026</div>
      <p className="eyebrow">PRIVATE TRAVEL GUIDE</p>
      <h1>Our Kansai<br/><em>journey.</em></h1>
      <p className="gate-copy">แผนเที่ยวญี่ปุ่น 17–24 พ.ย. 2026<br/>กรอกรหัส 6 หลักเพื่อเข้าสู่เว็บไซต์</p>
      <form action="/api/unlock" method="post" className="gate-form">
        <input type="hidden" name="next" value={safeNext(params?.next)} />
        <input type="text" name="website" tabIndex={-1} autoComplete="off" className="honeypot" aria-hidden="true" />
        <label htmlFor="code">ACCESS KEY</label>
        <input id="code" type="password" name="code" placeholder="••••••" inputMode="numeric" pattern="[0-9]{6}" maxLength={6} minLength={6} autoComplete="off" required autoFocus aria-invalid={hasError} aria-describedby={hasError ? 'gate-error' : undefined}/>
        {hasError && <p role="alert" id="gate-error" className="gate-error">รหัสไม่ถูกต้อง กรุณาลองอีกครั้ง</p>}
        <button type="submit">เปิดคู่มือเที่ยว <span>→</span></button>
      </form>
      <p className="gate-footnote">บันทึกการเข้าสู่ระบบบนอุปกรณ์นี้เป็นเวลา 30 วัน · เว็บไซต์ใช้ cookie แบบ HttpOnly / Secure</p>
    </section>
  </main>;
}
