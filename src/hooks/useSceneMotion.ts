import { useEffect } from "react";

const clamp = (n: number) => Math.max(0, Math.min(1, n));
const smooth = (a: number, b: number, value: number) => { const t = clamp((value - a) / (b - a)); return t * t * (3 - 2 * t); };

export function useSceneMotion() {
  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const hero = document.getElementById("top");
    const heroArt = hero?.querySelector<HTMLElement>(".hero-art");
    const heroTrack = hero?.querySelector<HTMLElement>(".hero-track");
    const header = document.querySelector<HTMLElement>(".site-header");
    const targets = Array.from(document.querySelectorAll<HTMLElement>("[data-shot-motion], [data-depth]"));
    const anchors = new Map(targets.map(el => [el, el.closest<HTMLElement>("figure, .cart-story__visual, .supporting-project__media, .designer-about__grid") || el]));
    const visible = new Set<HTMLElement>();
    let frame = 0, pointerX = 0, pointerY = 0, targetX = 0, targetY = 0;
    const render = () => {
      frame = 0;
      const h = window.innerHeight;
      if (hero && heroArt) {
        // Measure the untransformed section so moving layers never feed back into progress.
        const rect = heroTrack!.getBoundingClientRect();
        const active = rect.bottom > 0 && rect.top < h;
        const mobile = window.innerWidth < 600;
        const progress = preference.matches || mobile ? 0 : clamp((100 - rect.top) / Math.max(1, heroTrack!.offsetHeight - heroArt.offsetHeight));
        const strength = preference.matches || mobile ? 0 : 1;
        heroArt.style.setProperty("--hero-open", String(smooth(0, .7, progress)));
        heroArt.style.setProperty("--hero-reveal", String(smooth(.3, .9, progress)));
        heroArt.style.setProperty("--hero-atm-fade", String(smooth(0, .28, progress)));
        pointerX += (targetX - pointerX) * .13;
        pointerY += (targetY - pointerY) * .13;
        heroArt.style.setProperty("--hero-pointer-x", String(pointerX * strength));
        heroArt.style.setProperty("--hero-pointer-y", String(pointerY * strength));
        if (active && !preference.matches && (Math.abs(targetX-pointerX)>.001 || Math.abs(targetY-pointerY)>.001)) frame = requestAnimationFrame(render);
      }
      const measurements = Array.from(visible).map(element => {
        const rect = anchors.get(element)!.getBoundingClientRect();
        return { element, progress: smooth(.1, .9, (h - rect.top) / (h + rect.height)) };
      });
      header?.style.setProperty("--brand-progress", String(preference.matches ? Number(scrollY > 120) : smooth(32, 180, scrollY)));
      const strength = preference.matches ? 0 : window.innerWidth < 600 ? .45 : 1;
      for (const { element, progress } of measurements) {
        const center = progress - .5;
        if (element.dataset.depth) element.style.setProperty("--depth-y", `${center * (element.dataset.depth === "hero" ? -36 : -20) * strength}px`);
        if (element.dataset.shotMotion) element.style.setProperty("--shot-y", `${center * 18 * strength}px`);
      }
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(render); };
    const pointerMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse" || preference.matches || !hero) return;
      const rect = hero.getBoundingClientRect();
      targetX = clamp((event.clientX-rect.left)/rect.width)*2-1;
      targetY = clamp((event.clientY-rect.top)/rect.height)*2-1;
      schedule();
    };
    const pointerLeave = () => { targetX=0; targetY=0; schedule(); };
    hero?.addEventListener("pointermove", pointerMove, { passive: true });
    hero?.addEventListener("pointerleave", pointerLeave);
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) { const el = entry.target as HTMLElement; entry.isIntersecting ? visible.add(el) : visible.delete(el); }
      schedule();
    }, { rootMargin: "100px" });
    targets.forEach(el => observer.observe(el));
    const reveal = new IntersectionObserver(entries => {
      for (const entry of entries) if (entry.isIntersecting) { entry.target.classList.add("is-visible"); reveal.unobserve(entry.target); }
    }, { threshold: .03, rootMargin: "60px" });
    document.querySelectorAll<HTMLElement>("[data-reveal]").forEach(el => { if (el.getBoundingClientRect().top > hSafe()) el.classList.add("will-reveal"); reveal.observe(el); });
    function hSafe() { return window.innerHeight - 20; }
    render();
    window.addEventListener("scroll", schedule, { passive: true }); window.addEventListener("resize", schedule); preference.addEventListener("change", schedule);
    return () => { hero?.removeEventListener("pointermove",pointerMove); hero?.removeEventListener("pointerleave",pointerLeave); observer.disconnect(); reveal.disconnect(); cancelAnimationFrame(frame); window.removeEventListener("scroll", schedule); window.removeEventListener("resize", schedule); preference.removeEventListener("change", schedule); header?.style.removeProperty("--brand-progress"); };
  }, []);
}
