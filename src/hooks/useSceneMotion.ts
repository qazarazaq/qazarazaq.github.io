import { useEffect } from "react";

const clamp = (n: number) => Math.max(0, Math.min(1, n));
const smooth = (a: number, b: number, p: number) => { const t = clamp((p - a) / (b - a)); return t * t * (3 - 2 * t); };

export function useSceneMotion() {
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const header = document.querySelector<HTMLElement>(".site-header");
    const hero = document.querySelector<HTMLElement>(".hero");
    const scene = document.getElementById("hero-scenes");
    const layers = Array.from(document.querySelectorAll<HTMLElement>("[data-hero-layer]"));
    const sceneButtons = Array.from(document.querySelectorAll<HTMLElement>("[data-scene-target]"));
    const targets = Array.from(document.querySelectorAll<HTMLElement>("[data-parallax], [data-shot-motion], [data-depth]"));
    const anchors = new Map(targets.map(el => [el, el.closest<HTMLElement>(".feature-card, .designer-about__grid") || el]));
    const visible = new Set<HTMLElement>();
    let frame = 0;
    const render = () => {
      frame = 0;
      if (!hero || !scene) return;
      const h = window.innerHeight;
      const y = window.scrollY;
      const box = scene.getBoundingClientRect();
      const heroBottom = hero.getBoundingClientRect().bottom;
      const p = clamp(-box.top / Math.max(1, box.height - h + 120));
      const phase = p < .31 ? 0 : p < .67 ? 1 : 2;
      // Read geometry before writing styles, and measure stable cards rather than moving images.
      const measurements = Array.from(visible).map(element => {
        const rect = anchors.get(element)!.getBoundingClientRect();
        return { element, progress: smooth(.12, .88, clamp((h - rect.top) / (h + rect.height))) };
      });
      header?.style.setProperty("--brand-progress", String(media.matches ? Number(y > 120) : smooth(32, 180, y)));
      hero.dataset.phase = String(phase);
      hero.dataset.dock = String(heroBottom > h - 20 && !document.querySelector("dialog[open]"));
      const weights = [1 - smooth(.23, .37, p), smooth(.23, .37, p) * (1 - smooth(.59, .73, p)), smooth(.59, .73, p)];
      layers.forEach((layer, i) => {
        const opacity = media.matches ? Number(phase === i) : weights[i];
        layer.style.setProperty("--opacity", opacity.toFixed(3));
        layer.style.setProperty("--enter", `${media.matches ? 0 : (1 - weights[i]) * 42}px`);
        layer.style.setProperty("--hero-lift", `${media.matches ? 0 : (p - i * .34) * -32}px`);
        layer.setAttribute("aria-hidden", String(phase !== i));
      });
      sceneButtons.forEach(button => button.setAttribute("aria-pressed", String(Number(button.dataset.sceneTarget) === phase)));
      measurements.forEach(({ element, progress }) => {
        const center = progress - .5;
        const factor = media.matches ? 0 : window.innerWidth < 600 ? .55 : 1;
        if (element.hasAttribute("data-parallax")) element.style.setProperty("--parallax", `${center * -76 * factor}px`);
        if (element.dataset.depth) element.style.setProperty("--depth-y", `${(element.dataset.depth === "intro" ? -Math.min(28, y * .04) : center * -28) * factor}px`);
        if (element.dataset.shotMotion) {
          const kind = element.dataset.shotMotion;
          const pair = element.parentElement?.classList.contains("phone-pair");
          const back = pair && element === element.parentElement?.lastElementChild;
          const distance = kind === "desktop" ? 18 : kind === "atm" ? 26 : pair ? (back ? 42 : -42) : 16;
          element.style.setProperty("--shot-y", `${center * distance * factor}px`);
          element.style.setProperty("--shot-turn", `${center * (pair ? (back ? -5 : 5) : kind === "phone" ? 2 : 0) * factor}deg`);
          element.style.setProperty("--shot-scale", String(1 + progress * (kind === "atm" ? .024 : .014) * factor));
        }
      });
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(render); };
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => { const el = entry.target as HTMLElement; entry.isIntersecting ? visible.add(el) : visible.delete(el); el.classList.toggle("motion-active", entry.isIntersecting && !media.matches); });
      schedule();
    }, { rootMargin: "150px" });
    targets.forEach(el => observer.observe(el));
    const reveal = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add("is-visible"); reveal.unobserve(entry.target); } }), { threshold: .01, rootMargin: "120px" });
    document.querySelectorAll<HTMLElement>("[data-reveal]").forEach(el => { if (el.getBoundingClientRect().top > window.innerHeight - 20) el.classList.add("will-reveal"); reveal.observe(el); });
    const updatePreference = () => { document.documentElement.dataset.reducedMotion = String(media.matches); schedule(); };
    updatePreference();
    render();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    media.addEventListener("change", updatePreference);
    return () => { observer.disconnect(); reveal.disconnect(); cancelAnimationFrame(frame); window.removeEventListener("scroll", schedule); window.removeEventListener("resize", schedule); media.removeEventListener("change", updatePreference); header?.style.removeProperty("--brand-progress"); };
  }, []);
}
