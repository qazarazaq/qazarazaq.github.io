import { type CSSProperties, useEffect, useRef } from "react";
import { HeroCopy } from "./Hero";
import "../duo-preview.css";

const clamp = (value: number) => Math.max(0, Math.min(1, value));
const ease = (value: number) => value * value * (3 - 2 * value);
const between = (a: number, b: number, value: number) => ease(clamp((value-a)/(b-a)));

// Positions leave the display clear, including on narrow touch screens.
const bubbles = [
  ["bubbles/travel.webp", 28, 3, 48, -12, 23, 4],
  ["bubbles/education.webp", 8, 16, 44, 9, 0, 30],
  ["bubbles/home.webp", 82, 9, 46, -8, 80, 4],
  ["bubbles/utilities.webp", 5, 46, 36, 12, 0, 54],
  ["bubbles/bills.webp", 96, 37, 42, -8, 100, 36],
  ["bubbles/food-lifestyle.webp", 13, 72, 44, -12, 0, 78],
  ["bubbles/transfer.webp", 94, 69, 40, 10, 100, 67],
  ["bubbles/savings-top-up.webp", 27, 94, 46, 7, 24, 98],
  ["bubbles/e-money.webp", 9, 93, 38, -8, 4, 98],
  ["bubbles/location.webp", 90, 94, 36, 8, 98, 98],
  ["bubbles/future-plans.webp", 65, 97, 38, -6, 79, 98],
  ["emoji/distorted-face.svg", 48, 1, 38, 12, 42, 1],
  ["emoji/bowing-man.svg", 67, 2, 40, -9, 61, 3],
  ["emoji/ok-hand.svg", 97, 13, 36, 12, 98, 12],
  ["emoji/cat.svg", 46, 98, 42, -9, 52, 99],
  ["emoji/robot.svg", 4, 2, 36, -10, 4, 2],
] as const;

function ProductBubbles() {
  return <div className="duo-bubbles" aria-hidden="true">{bubbles.map(([asset,x,y,size,rotation,mobileX,mobileY],index) =>
    <span className="duo-bubble" key={asset} style={{
      "--bubble-x":`${x}%`, "--bubble-y":`${y}%`, "--bubble-size":`${size}px`,
      "--launch-x":`${(50-x)/100}`, "--launch-y":`${(65-y)/100}`,
      "--mobile-x":`${mobileX}%`, "--mobile-y":`${mobileY}%`,
      "--mobile-launch-x":`${(50-mobileX)/100}`, "--mobile-launch-y":`${(65-mobileY)/100}`,
      "--bubble-rotation":`${rotation}deg`, "--bubble-delay":`${index*12}ms`,
    } as CSSProperties}><img src={`/work/duo/${asset}`} alt="" width="64" height="64" decoding="async" /></span>
  )}</div>;
}

function InnerDisplay() {
  return <div className="duo-composite"><div className="duo-screen"><img src="/work/livin-duo-preview.webp" alt="" width="1426" height="1003" loading="eager" decoding="async" /></div><img className="duo-hardware" src="/work/iphone-duo-open-frame.webp" alt="" width="1547" height="1124" /></div>;
}

/** Scroll-driven device reveal; the exported product screens stay unchanged. */
export function DuoHero() {
  const section = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const sceneHost = useRef<HTMLDivElement>(null);
  const sceneRender = useRef<((progress: number) => void) | null>(null);
  useEffect(() => {
    const preference = matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    const render = () => {
      frame = 0;
      if (!track.current || !stage.current || !section.current) return;
      const start = section.current.offsetTop + 72;
      const distance = Math.max(420, track.current.offsetHeight - stage.current.offsetHeight);
      const progress = preference.matches ? 1 : ease(clamp((scrollY - start) / distance));
      stage.current.style.setProperty("--duo-open", String(progress));
      stage.current.style.setProperty("--duo-fixed-opacity", String(clamp(progress * 16)));
      stage.current.style.setProperty("--duo-fold", `${180 - progress * 180}deg`);
      stage.current.style.setProperty("--duo-center", `${-25 * (1 - progress)}%`);
      // The cover defocuses as it turns away. The fixed inner half stays sharp;
      // the angled inner half resolves late in the opening, as in the reference.
      stage.current.style.setProperty("--duo-cover-blur", `${between(.03,.26,progress)*10}px`);
      stage.current.style.setProperty("--duo-inner-blur", `${(1-between(.48,.98,progress))*10}px`);
      stage.current.style.setProperty("--duo-right-light", String(.28 + between(.35,.78,progress)*.72));
      stage.current.style.setProperty("--duo-left-light", String(.5 + between(.48,.98,progress)*.5));
      stage.current.style.setProperty("--duo-shade", String((1-between(.5,1,progress))*.3));
      stage.current.dataset.unified = String(progress > .999);
      stage.current.dataset.progress = progress.toFixed(3);
      if (!preference.matches && progress > .999) stage.current.dataset.burst = "true";
      else if (progress < .94 || preference.matches) stage.current.dataset.burst = "false";
      const rect=stage.current.getBoundingClientRect();
      if(rect.bottom>0&&rect.top<innerHeight)sceneRender.current?.(progress);
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(render); };
    render();
    addEventListener("scroll", schedule, { passive: true });
    addEventListener("resize", schedule);
    preference.addEventListener("change", schedule);
    return () => {
      cancelAnimationFrame(frame);
      removeEventListener("scroll", schedule);
      removeEventListener("resize", schedule);
      preference.removeEventListener("change", schedule);
    };
  }, []);
  useEffect(() => {
    let cancelled=false;
    let dispose: (()=>void) | undefined;
    const host=sceneHost.current;
    if(!host)return;
    if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;
    import('./DuoScene').then(module=>module.createDuoScene(host)).then(scene=>{
      if(cancelled){scene.dispose();return;}
      dispose=scene.dispose;sceneRender.current=scene.render;
      scene.render(Number(stage.current?.dataset.progress||0));
    }).catch(()=>{if(!cancelled){host.dataset.ready='false';if(stage.current)stage.current.dataset.glFailed='true';}});
    return()=>{cancelled=true;sceneRender.current=null;dispose?.();};
  },[]);
  return <section ref={section} id="top" className="hero duo-hero" aria-labelledby="hero-title">
    <HeroCopy />
    <div ref={track} className="duo-track">
      <div ref={stage} className="duo-stage" data-progress="0">
        <ProductBubbles />
        <div className="duo-perspective" role="img" aria-label="Livin’ concept exploration. A folded product overview opens into the wider layout as you scroll.">
          <div ref={sceneHost} className="duo-3d" aria-hidden="true" />
          <div className="duo-device" aria-hidden="true">
            <div className="duo-leaf duo-leaf--right"><div className="duo-face duo-face--right"><InnerDisplay /></div></div>
            <div className="duo-leaf duo-leaf--left">
              <div className="duo-face duo-face--left"><InnerDisplay /></div>
              <div className="duo-face duo-face--cover"><div className="duo-cover-screen"><img src="/work/livin-mobile-preview.webp" alt="" width="698" height="1018" loading="eager" decoding="async" /></div><img className="duo-hardware" src="/work/iphone-duo-closed-frame.webp" alt="" width="786" height="1095" /></div>
            </div>
            <div className="duo-unified"><InnerDisplay /></div>
          </div>
        </div>
      </div>
    </div>
  </section>;
}
