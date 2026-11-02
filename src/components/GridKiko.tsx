import { useEffect, useRef } from 'react';

const clamp=(n:number,a:number,b:number)=>Math.max(a,Math.min(b,n));
const ellipse=(x:number,y:number,cx:number,cy:number,rx:number,ry:number)=>(Math.hypot((x-cx)/rx,(y-cy)/ry)-1)*Math.min(rx,ry);
const capsule=(x:number,y:number,ax:number,ay:number,bx:number,by:number,r:number)=>{
  const dx=bx-ax,dy=by-ay,t=clamp(((x-ax)*dx+(y-ay)*dy)/(dx*dx+dy*dy||1),0,1);
  return Math.hypot(x-ax-dx*t,y-ay-dy*t)-r;
};
function triangle(x:number,y:number,side:number){
  const points=[[.48,.24*side],[.60,.59*side],[.98,.34*side]];
  let positive=false,negative=false,min=Infinity;
  for(let i=0;i<3;i++){
    const a=points[i],b=points[(i+1)%3],cross=(b[0]-a[0])*(y-a[1])-(b[1]-a[1])*(x-a[0]);
    positive ||= cross>0;negative ||=cross<0;
    min=Math.min(min,capsule(x,y,a[0],a[1],b[0],b[1],0));
  }
  return positive&&negative?min:-min;
}

/** Analytic cat contours sampled onto the footer's fixed screen-space lattice. */
export function GridKiko(){
  const canvasRef=useRef<HTMLCanvasElement>(null);
  useEffect(()=>{
    const canvas=canvasRef.current,ink=canvas?.getContext('2d');
    if(!canvas||!ink)return;
    const footer=canvas.closest('footer')!;
    const preference=matchMedia('(prefers-reduced-motion: reduce)');
    let width=0,height=0,cell=8,scale=100,visible=false,frame=0,last=0,time=0,draws=0;
    let x=0,y=0,angle=0,speed=0,gait=0,waypoint=1,interestUntil=0,pointerX=0,pointerY=0,initialized=false;
    const waypoints=[[.24,.20],[.76,.20],[.82,.76],[.27,.83],[.15,.42]];
    let textBox={left:0,right:0,top:0,bottom:0};
    const move=(dt:number)=>{
      if(preference.matches)return;
      time+=dt;
      const following=time<interestUntil;
      const point=waypoints[waypoint%waypoints.length];
      let tx=following?pointerX:point[0]*width,ty=following?pointerY:point[1]*height;
      const ex=(Math.abs(Math.cos(angle))*2.05+Math.abs(Math.sin(angle))*.78)*scale+12;
      const ey=(Math.abs(Math.sin(angle))*2.05+Math.abs(Math.cos(angle))*.78)*scale+12;
      tx=clamp(tx,Math.min(ex,width/2),Math.max(width-ex,width/2));
      ty=clamp(ty,Math.min(ey,height/2),Math.max(height-ey,height/2));
      const dx=tx-x,dy=ty-y,distance=Math.hypot(dx,dy);
      const standOff=following?70:8;
      const requested=Math.min(following?58:40,Math.max(0,distance-standOff)*1.1);
      speed+=(requested-speed)*Math.min(1,dt*3);
      if(distance>2&&speed>1){
        const desired=Math.atan2(dy,dx),turn=Math.atan2(Math.sin(desired-angle),Math.cos(desired-angle));
        angle+=clamp(turn,-dt*1.2,dt*1.2);
        const alignment=Math.max(.18,Math.cos(turn));
        const step=Math.min(distance,speed*dt*alignment);
        x+=Math.cos(angle)*step;y+=Math.sin(angle)*step;gait+=step/(scale*.20);
      }
      const marginX=(Math.abs(Math.cos(angle))*2.05+Math.abs(Math.sin(angle))*.78)*scale+8;
      const marginY=(Math.abs(Math.sin(angle))*2.05+Math.abs(Math.cos(angle))*.78)*scale+8;
      x=clamp(x,Math.min(marginX,width/2),Math.max(width-marginX,width/2));
      y=clamp(y,Math.min(marginY,height/2),Math.max(height-marginY,height/2));
      if(!following&&distance<Math.max(20,scale*.35))waypoint++;
      canvas.dataset.state=following?'following':'wandering';
    };
    const draw=()=>{
      if(!width||!height)return;
      ink.clearRect(0,0,width,height);
      const cos=Math.cos(angle),sin=Math.sin(angle);
      const tail:{x:number;y:number;r:number}[]=[];
      for(let i=0;i<=14;i++){
        const u=i/14;
        tail.push({x:-1.10-1.00*u,y:Math.sin(u*2.8+Math.sin(time*.75)*.3)*.45*u,r:.23-.09*u});
      }
      const radius=scale*2.2;
      const startCol=Math.max(0,Math.floor((x-radius)/cell)),endCol=Math.min(Math.ceil(width/cell),Math.ceil((x+radius)/cell));
      const startRow=Math.max(0,Math.floor((y-radius)/cell)),endRow=Math.min(Math.ceil(height/cell),Math.ceil((y+radius)/cell));
      ink.font=`${Math.max(5,cell*.79)}px ui-monospace,SFMono-Regular,Menlo,monospace`;
      ink.textAlign='center';ink.textBaseline='middle';
      let minX=width,minY=height,maxX=0,maxY=0;
      for(let row=startRow;row<endRow;row++)for(let col=startCol;col<endCol;col++){
        const px=(col+.5)*cell,py=(row+.5)*cell;
        // The shape turns beneath the grid. Neither cells nor glyphs rotate.
        const lx=((px-x)*cos+(py-y)*sin)/scale-.28;
        const ly=(-(px-x)*sin+(py-y)*cos)/scale;
        let d=Infinity,part='',cream=false;
        const put=(value:number,kind:string,white=false)=>{if(value<0){d=value;part=kind;cream=white;}};
        let tailD=Infinity;for(const t of tail)tailD=Math.min(tailD,Math.hypot(lx-t.x,ly-t.y)-t.r);
        put(tailD,'tail');
        for(const side of [-1,1])for(const front of [false,true]){
          const hip=front?.43:-.77,phase=gait+(front!==(side>0)?Math.PI:0);
          const stride=Math.sin(phase)*.13*(speed>2?1:0),reach=.51+Math.cos(phase)*.045*(speed>2?1:0);
          put(capsule(lx,ly,hip,.28*side,hip+stride,reach*side,.11),'leg');
          put(ellipse(lx,ly,hip+stride+.04,reach*side,.15,.105),'paw',true);
        }
        const fur=.012*Math.sin(lx*39+ly*27)+.010*Math.cos(lx*21-ly*41);
        put(Math.min(ellipse(lx,ly,-.35,0,.79,.52),ellipse(lx,ly,-.83,0,.46,.49),ellipse(lx,ly,.34,0,.45,.37))+fur,'body');
        if(part==='body'&&lx>.30&&lx<.65&&Math.abs(ly)<.29)cream=true;
        put(triangle(lx,ly,1),'ear');put(triangle(lx,ly,-1),'ear');
        put(ellipse(lx,ly,.88,0,.48,.46)+fur*.7,'head');
        if(part==='head'&&lx>.99&&Math.abs(ly)<.21)cream=true;
        if(!part)continue;
        const edge=clamp(-d*scale/(cell*.8),.22,1);
        const texture=Math.sin(lx*14+Math.sin(ly*11)*.6);
        const stripe=(part==='body'||part==='tail')&&texture>.65;
        const highlight=clamp((-.2-ly)*.6+.56,0,1);
        let color=cream?(highlight>.55?'#e6dcc5':'#c2b79f'):stripe?'#9c632e':highlight>.62?'#d59a55':highlight>.34?'#b77d3d':'#80552e';
        let glyph=cream?(col%3===0?'+':':'):stripe?'x':(col+row)%4===0?'#':(col*3+row)%3===0?':':'+';
        if(part==='ear'&&Math.abs(ly)>.39){color='#a87d65';glyph=':';}
        const eye=Math.min(Math.hypot(lx-1.07,ly-.235),Math.hypot(lx-1.07,ly+.235));
        let feature=false;
        if(part==='head'&&eye<.065){color='#232015';glyph='o';feature=true;}
        if(part==='head'&&lx>1.29&&Math.abs(ly)<.055){color='#6a493c';glyph='v';feature=true;}
        const textDistance=Math.max(textBox.left-px,px-textBox.right,textBox.top-py,py-textBox.bottom,0);
        // A softer silhouette behind the copy preserves contrast, as in the pond.
        const legibility=.24+.76*clamp(textDistance/52,0,1);
        ink.globalAlpha=edge*legibility;
        ink.fillStyle=color;ink.fillRect(col*cell+.6,row*cell+.6,cell-1.2,cell-1.2);
        ink.globalAlpha=edge*legibility*(feature?1:.72);
        ink.fillStyle=feature?'#efdbb5':'#30271e';ink.fillText(glyph,px,py+.3);
        minX=Math.min(minX,col*cell);minY=Math.min(minY,row*cell);maxX=Math.max(maxX,(col+1)*cell);maxY=Math.max(maxY,(row+1)*cell);
      }
      // Sparse ASCII whiskers retain a cat's face at this grid resolution.
      for(const side of [-1,1])for(let i=0;i<3;i++){
        const wx=1.18-i*.07,wy=side*(.39+i*.055);
        const px=x+((wx+.28)*cos-wy*sin)*scale,py=y+((wx+.28)*sin+wy*cos)*scale;
        if(px<cell||px>width-cell||py<cell||py>height-cell)continue;
        ink.globalAlpha=.65;ink.fillStyle='#c9bd9d';ink.fillText(i===1?'-':side>0?'\\':'/',(Math.floor(px/cell)+.5)*cell,(Math.floor(py/cell)+.5)*cell);
      }
      ink.globalAlpha=1;
      canvas.dataset.frame=String(++draws);canvas.dataset.cell=String(cell);
      canvas.dataset.x=x.toFixed(1);canvas.dataset.y=y.toFixed(1);canvas.dataset.angle=angle.toFixed(3);
      canvas.dataset.bounds=[minX,minY,maxX,maxY].map(Math.round).join(',');
    };
    const tick=(now:number)=>{
      frame=0;if(!visible||document.hidden||preference.matches)return;
      if(now-last>=1000/24){move(Math.min(.08,(now-last)/1000));last=now;draw();}
      frame=requestAnimationFrame(tick);
    };
    const sync=()=>{cancelAnimationFrame(frame);frame=0;last=performance.now();if(preference.matches)canvas.dataset.state='static';if(visible&&!document.hidden)draw();if(visible&&!document.hidden&&!preference.matches)frame=requestAnimationFrame(tick);};
    const resize=new ResizeObserver(entries=>{
      const previousWidth=width||entries[0].contentRect.width,previousHeight=height||entries[0].contentRect.height;
      width=entries[0].contentRect.width;height=entries[0].contentRect.height;
      cell=(parseFloat(getComputedStyle(footer,'::before').backgroundSize)||32)/4;
      scale=Math.min(width<600?width*.72:width*.39,width<600?285:460)/4.1;
      const ratio=Math.min(devicePixelRatio||1,2);canvas.width=Math.round(width*ratio);canvas.height=Math.round(height*ratio);ink.setTransform(ratio,0,0,ratio,0,0);
      if(!initialized){x=width<600?width*.50:width*.28;y=height*(width<600?.15:.19);angle=.02;initialized=true;}
      else{x=x/previousWidth*width;y=y/previousHeight*height;}
      const r=footer.getBoundingClientRect(),c=footer.querySelector('.contact-content')!.getBoundingClientRect();
      textBox={left:c.left-r.left-12,right:c.right-r.left+12,top:c.top-r.top-12,bottom:c.bottom-r.top+12};sync();
    });resize.observe(canvas);
    const intersection=new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;sync();},{rootMargin:'60px'});intersection.observe(canvas);
    const pointer=(event:PointerEvent)=>{
      if(preference.matches||(event.target as Element).closest('a,button,.contact-content'))return;
      const r=footer.getBoundingClientRect();pointerX=event.clientX-r.left;pointerY=event.clientY-r.top;interestUntil=time+(event.pointerType==='mouse'?4:2.5);
    };
    const leave=()=>{interestUntil=0;};
    footer.addEventListener('pointermove',pointer,{passive:true});footer.addEventListener('pointerdown',pointer,{passive:true});footer.addEventListener('pointerleave',leave);
    preference.addEventListener('change',sync);document.addEventListener('visibilitychange',sync);
    return()=>{cancelAnimationFrame(frame);resize.disconnect();intersection.disconnect();footer.removeEventListener('pointermove',pointer);footer.removeEventListener('pointerdown',pointer);footer.removeEventListener('pointerleave',leave);preference.removeEventListener('change',sync);document.removeEventListener('visibilitychange',sync);};
  },[]);
  return <canvas ref={canvasRef} className="contact-cat grid-kiko" aria-hidden="true"/>;
}
