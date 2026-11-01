import { useEffect, useRef } from "react";
import { HeroCopy } from "./Hero";
import "../duo-preview.css";

const clamp = (value: number) => Math.max(0, Math.min(1, value));
const ease = (value: number) => value * value * (3 - 2 * value);

/** Isolated review version. The published hero remains the default. */
export function DuoHero() {
  const section = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const preference = matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    const render = () => {
      frame = 0;
      if (!track.current || !stage.current || !section.current) return;
      const start = section.current.offsetTop + 72;
      const distance = Math.max(420, track.current.offsetHeight - stage.current.offsetHeight);
      const progress = preference.matches ? 1 : ease(clamp((scrollY - start) / distance));
      const moving = Math.sin(progress * Math.PI);
      stage.current.style.setProperty("--duo-open", String(progress));
      stage.current.style.setProperty("--duo-left-opacity", String(clamp(progress * 12)));
      stage.current.style.setProperty("--duo-fold", `${-180 + progress * 180}deg`);
      stage.current.style.setProperty("--duo-center", `${25 * (1 - progress)}%`);
      stage.current.style.setProperty("--duo-tilt", `${(1 - progress) * -5}deg`);
      stage.current.style.setProperty("--duo-blur", `${moving * 3.5}px`);
      stage.current.style.setProperty("--duo-shade", `${moving * .3}`);
      stage.current.dataset.progress = progress.toFixed(3);
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
  return <section ref={section} id="top" className="hero duo-hero" aria-labelledby="hero-title">
    <HeroCopy />
    <div ref={track} className="duo-track">
      <div ref={stage} className="duo-stage" data-progress="0">
        <div className="duo-perspective" role="img" aria-label="Livin’ concept exploration. A folded mobile screen opens into the wider Duo investment overview as you scroll.">
          <div className="duo-device" aria-hidden="true">
            <div className="duo-leaf duo-leaf--left"><div className="duo-face duo-face--left"><div className="duo-screen"><img src="/work/livin-duo-preview.webp" alt="" width="1427" height="1004" loading="eager" decoding="async" /></div></div><div className="duo-spine" /></div>
            <div className="duo-leaf duo-leaf--right">
              <div className="duo-face duo-face--right"><div className="duo-screen"><img src="/work/livin-duo-preview.webp" alt="" width="1427" height="1004" /></div></div>
              <div className="duo-face duo-face--cover"><div className="duo-cover-screen"><img src="/work/livin-mobile-preview.webp" alt="" width="563" height="1191" loading="eager" decoding="async" /><span className="duo-camera" /></div></div>
            </div>
          </div>
        </div>
        <p className="duo-caption">Livin’ · Foldable exploration</p>
      </div>
    </div>
  </section>;
}
