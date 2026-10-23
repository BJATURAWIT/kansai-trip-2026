import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const contentType = 'image/png';
export const size = { width: 180, height: 180 };

export default function AppleIcon() {
  return new ImageResponse(
    <div style={{
      width:'100%',height:'100%',display:'flex',flexDirection:'column',
      alignItems:'center',justifyContent:'center',background:'#153e35',
      color:'#fffaf0',borderRadius:0
    }}>
      <div style={{fontSize:104,lineHeight:1,fontWeight:700,letterSpacing:0}}>日</div>
      <div style={{fontSize:16,letterSpacing:3,fontWeight:700,marginTop:1}}>KANSAI</div>
    </div>,size
  );
}
