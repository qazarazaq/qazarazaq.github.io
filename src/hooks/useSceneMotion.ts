import { useEffect } from "react";

const clamp = (n: number) => Math.max(0, Math.min(1, n));
const smooth = (a: number, b: number, p: number) => { const t = clamp((p - a) / (b - a)); return t * t * (3 - 2 * t); };

export function useSceneMotion() {
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const hero = document.querySelector<HTMLElement>(".hero");
    const scene = document.getElementById("hero-scenes");
    const layers = Array.from(document.querySelectorAll<HTMLElement>("[data-hero-layer]"));
    const sceneButtons = Array.from(document.querySelectorAll<HTMLElement>("[data-scene-target]"));
    const visuals = Array.from(document.querySelectorAll<HTMLElement>("[data-parallax]"));
    const visible = new Set<HTMLElement>();
    let frame = 0;
    const render = () => {
      frame = 0;
      if (!hero || !scene) return;
      const box = scene.getBoundingClientRect();
      const h = window.innerHeight;
      const p = clamp(-box.top / Math.max(1, box.height - h + 120));
      const phase = p < .31 ? 0 : p < .67 ? 1 : 2;
      hero.dataset.phase = String(phase);
      hero.dataset.dock = String(hero.getBoundingClientRect().bottom > h - 20 && !document.querySelector("dialog[open]"));
      const blend = smooth(.08, .78, p);
      hero.style.setProperty("--warm", String(Math.sin(blend * Math.PI) * .7));
      hero.style.setProperty("--night", String(smooth(.53, .85, p)));
      const weights = [1 - smooth(.23, .37, p), smooth(.23, .37, p) * (1 - smooth(.59, .73, p)), smooth(.59, .73, p)];
      layers.forEach((layer, i) => {
        const opacity = media.matches ? (phase === i ? 1 : 0) : weights[i];
        layer.style.setProperty("--opacity", opacity.toFixed(3));
        layer.style.setProperty("--enter", `${media.matches ? 0 : (1 - weights[i]) * 42}px`);
        layer.setAttribute("aria-hidden", String(phase !== i));
      });
      sceneButtons.forEach(button => button.setAttribute("aria-pressed", String(Number(button.dataset.sceneTarget) === phase)));
      visible.forEach(element => { const r = element.getBoundingClientRect(); const progress = clamp((h - r.top) / (h + r.height)); element.style.setProperty("--parallax", `${media.matches ? 0 : (progress - .5) * -60}px`); });
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(render); };
    const observer = new IntersectionObserver(entries => { entries.forEach(entry => { const el = entry.target as HTMLElement; entry.isIntersecting ? visible.add(el) : visible.delete(el); }); schedule(); }, { rootMargin: "150px" });
    visuals.forEach(el => observer.observe(el));
    const reveal = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add("is-visible"); reveal.unobserve(entry.target); } }), { threshold: .06 });
    document.querySelectorAll<HTMLElement>("[data-reveal]").forEach(el => { if (el.getBoundingClientRect().top > hSafe()) el.classList.add("will-reveal"); reveal.observe(el); });
    function hSafe() { return window.innerHeight - 20; }
    const updatePreference = () => { document.documentElement.dataset.reducedMotion = String(media.matches); schedule(); };
    updatePreference();
    render();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    media.addEventListener("change", updatePreference);
    return () => { observer.disconnect(); reveal.disconnect(); cancelAnimationFrame(frame); window.removeEventListener("scroll", schedule); window.removeEventListener("resize", schedule); media.removeEventListener("change", updatePreference); };
  }, []);
}
