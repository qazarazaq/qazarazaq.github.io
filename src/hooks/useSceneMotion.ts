import { useEffect, useState } from "react";

// Only visible scenes are measured, in one frame-scheduled loop.
// Content remains in normal document flow without motion support.
export function useSceneMotion() {
  const [systemReduced, setSystemReduced] = useState(() => window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  const [userReduced, setUserReduced] = useState(() => {
    try { return localStorage.getItem("portfolio-reduced-motion") === "true"; } catch { return false; }
  });
  const reduced = systemReduced || userReduced;
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setSystemReduced(media.matches);
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);
  useEffect(() => {
    document.documentElement.dataset.reducedMotion = String(reduced);
  }, [reduced]);
  useEffect(() => {
    const media = window.matchMedia("(min-width: 900px) and (min-height: 760px) and (prefers-reduced-motion: no-preference)");
    let cleanup = () => {};
    const configure = () => {
      cleanup();
      if (!media.matches || reduced) return;
      const scenes = Array.from(document.querySelectorAll<HTMLElement>(".motion-scene"));
      const visible = new Set<HTMLElement>();
      let frame = 0;
      const render = () => {
        frame = 0;
        const height = window.innerHeight;
        const updates = Array.from(visible).map(element => {
          const rect = element.getBoundingClientRect();
          return { element, progress: Math.min(1, Math.max(0, (height - rect.top) / (height + rect.height))) };
        });
        updates.forEach(({ element, progress }) => element.style.setProperty("--scene", progress.toFixed(4)));
      };
      const schedule = () => { if (!frame) frame = requestAnimationFrame(render); };
      const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => entry.isIntersecting ? visible.add(entry.target as HTMLElement) : visible.delete(entry.target as HTMLElement));
        schedule();
      }, { rootMargin: "100px" });
      scenes.forEach(scene => observer.observe(scene));
      window.addEventListener("scroll", schedule, { passive: true });
      window.addEventListener("resize", schedule);
      cleanup = () => {
        observer.disconnect();
        window.removeEventListener("scroll", schedule);
        window.removeEventListener("resize", schedule);
        cancelAnimationFrame(frame);
        scenes.forEach(scene => scene.style.removeProperty("--scene"));
      };
    };
    configure();
    media.addEventListener("change", configure);
    return () => { cleanup(); media.removeEventListener("change", configure); };
  }, [reduced]);
  return {
    reduced,
    systemReduced,
    toggle: () => {
      const next = !userReduced;
      setUserReduced(next);
      try { localStorage.setItem("portfolio-reduced-motion", String(next)); } catch { /* Keep the session-only preference. */ }
    },
  };
}
