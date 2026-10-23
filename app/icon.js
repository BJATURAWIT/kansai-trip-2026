import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const contentType = 'image/png';
export const size = { width: 512, height: 512 };

export default function AppleIcon() {
  return new ImageResponse(
    <div style={{
      width:'100%',height:'100%',display:'flex',flexDirection:'column',
      alignItems:'center',justifyContent:'center',background:'#153e35',
      color:'#fffaf0',borderRadius:0
    }}>
      <div style={{fontSize:295,lineHeight:1,fontWeight:700,letterSpacing:0}}>日</div>
      <div style={{fontSize:43,letterSpacing:8,fontWeight:700,marginTop:1}}>KANSAI</div>
    </div>,size
  );
}
