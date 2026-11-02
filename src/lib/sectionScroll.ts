let cancelCurrent = () => {};
export const cancelSectionScroll = () => cancelCurrent();

/** A bounded, interruptible glide; URL fragments remain shareable. */
export function scrollToSection(id: string) {
  cancelCurrent();
  const target=document.getElementById(id);
  if(!target)return;
  const offset=parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop)||108;
  const start=scrollY;
  const end=Math.max(0,Math.min(document.documentElement.scrollHeight-innerHeight,target.getBoundingClientRect().top+start-offset));
  const url=new URL(location.href);url.hash=id;
  history.replaceState({...history.state,portfolioY:start},'',location.href);
  if(url.href!==location.href)history.pushState({portfolioY:end},'',url);
  const focus=()=>{
    const heading=target.querySelector<HTMLElement>('h1,h2')??target;
    heading.tabIndex=-1;heading.focus({preventScroll:true});
  };
  if(matchMedia('(prefers-reduced-motion: reduce)').matches){scrollTo({top:end,behavior:'instant'});focus();return;}
  const duration=Math.min(1300,Math.max(650,Math.abs(end-start)*.09));
  const started=performance.now();let frame=0;
  const stop=()=>{cancelAnimationFrame(frame);removeEventListener('wheel',stop);removeEventListener('touchstart',stop);removeEventListener('pointerdown',stop);removeEventListener('keydown',onKey);removeEventListener('resize',stop);cancelCurrent=()=>{};};
  const onKey=(event:KeyboardEvent)=>{if(['ArrowUp','ArrowDown','PageUp','PageDown','Home','End',' ','Tab','Escape'].includes(event.key))stop();};
  cancelCurrent=stop;
  addEventListener('wheel',stop,{passive:true});addEventListener('touchstart',stop,{passive:true});addEventListener('pointerdown',stop,{passive:true});addEventListener('keydown',onKey);addEventListener('resize',stop);
  const render=(now:number)=>{
    const t=Math.min(1,(now-started)/duration);
    const eased=t<.5?4*t*t*t:1-Math.pow(-2*t+2,3)/2;
    scrollTo({top:start+(end-start)*eased,behavior:'instant'});
    if(t<1)frame=requestAnimationFrame(render);
    else{stop();focus();}
  };
  frame=requestAnimationFrame(render);
}
