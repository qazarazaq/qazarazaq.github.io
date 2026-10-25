import { useEffect, useRef } from "react";

// Kiko is drawn in memory and rendered as characters. No video or image asset is loaded.
export function AsciiCat() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;
    const source = document.createElement("canvas");
    source.width = 256;
    source.height = 144;
    const ink = source.getContext("2d", { willReadFrequently: true });
    if (!ink) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let width = 0, height = 0, visible = false, frame = 0, last = 0, time = 0;
    const orange = "#b87843", white = "#c7c7bd";
    const ellipse = (x: number, y: number, rx: number, ry: number, color: string) => {
      ink.fillStyle = color;
      ink.beginPath(); ink.ellipse(x, y, rx, ry, 0, 0, Math.PI * 2); ink.fill();
    };
    const leg = (x: number, phase: number, color: string) => {
      const stride = Math.sin(phase) * 7;
      ink.strokeStyle = color; ink.lineWidth = 12; ink.lineCap = "round";
      ink.beginPath(); ink.moveTo(x, 82); ink.quadraticCurveTo(x - stride * .5, 103, x + stride, 121 - Math.max(0, Math.cos(phase)) * 5); ink.stroke();
      ellipse(x + stride - 3, 123 - Math.max(0, Math.cos(phase)) * 5, 10, 5, white);
    };
    const draw = (t: number) => {
      const gait = t * 2.7, bob = Math.sin(gait * 2) * 1.2;
      ink.clearRect(0, 0, 256, 144);
      ink.save(); ink.translate(0, bob);
      // Far legs, curled tail, body, and the white chest and paws.
      leg(124, gait + Math.PI, "#8d542f"); leg(178, gait, "#8d542f");
      ink.strokeStyle = orange; ink.lineWidth = 12; ink.lineCap = "round";
      ink.beginPath(); ink.moveTo(191, 70); ink.bezierCurveTo(233, 70, 248 + Math.sin(t) * 3, 18, 221 + Math.sin(t * 1.5) * 6, 20); ink.stroke();
      ellipse(150, 73, 55, 30, orange); ellipse(105, 76, 22, 29, white);
      leg(108, gait, orange); leg(163, gait + Math.PI, orange);
      ellipse(88, 43, 25, 24, orange);
      ink.fillStyle = orange;
      ink.beginPath(); ink.moveTo(65, 33); ink.lineTo(65, 7); ink.lineTo(83, 23); ink.moveTo(94, 22); ink.lineTo(111, 10); ink.lineTo(110, 40); ink.fill();
      ellipse(78, 54, 16, 10, white);
      // Small facial openings keep the silhouette readable at ASCII resolution.
      ellipse(76, 38, 2.5, 3, "#34271c"); ellipse(96, 38, 2.5, 3, "#34271c");
      ellipse(75, 51, 3, 2, "#654128");
      ink.strokeStyle = "#754b2d"; ink.lineWidth = 2;
      ink.beginPath(); ink.moveTo(134, 49); ink.lineTo(130, 61); ink.moveTo(148, 46); ink.lineTo(146, 58); ink.moveTo(165, 48); ink.lineTo(161, 61); ink.stroke();
      ink.restore();
      const pixels = ink.getImageData(0, 0, 256, 144).data;
      const cols = width < 600 ? 88 : 124, rows = Math.round(cols / 3.1);
      const fontSize = Math.min(14, (width - 24) / (cols * .62), height * .76 / (rows * 1.18));
      const cellW = fontSize * .62, cellH = fontSize * 1.18;
      const left = (width - cols * cellW) / 2 - width * .10 + Math.sin(t * .32) * Math.min(28, width * .035);
      const top = height * .62 - rows * cellH / 2;
      context.clearRect(0, 0, width, height);
      context.font = `${fontSize}px ui-monospace, SFMono-Regular, Menlo, monospace`;
      context.textBaseline = "top";
      const chars = ".:-=+*#%@";
      for (let y = 0; y < rows; y++) for (let x = 0; x < cols; x++) {
        const sx = Math.min(255, Math.floor((x + .5) / cols * 256)), sy = Math.min(143, Math.floor((y + .5) / rows * 144));
        const i = (sy * 256 + sx) * 4;
        if (pixels[i + 3] < 80) continue;
        const light = (pixels[i] + pixels[i + 1] + pixels[i + 2]) / 765;
        const density = Math.min(chars.length - 1, Math.max(0, Math.floor(light * 6 + (x * 3 + y * 7) % 3)));
        context.fillStyle = pixels[i + 2] > 140 ? "#adb9c3" : pixels[i] < 100 ? "#795236" : "#b47a49";
        context.fillText(chars[density], left + x * cellW, top + y * cellH);
      }
    };
    const tick = (now: number) => {
      frame = 0;
      if (!visible || document.hidden || reduced.matches) return;
      if (now - last >= 1000 / 14) { time += Math.min(.12, (now - last) / 1000); last = now; draw(time); }
      frame = requestAnimationFrame(tick);
    };
    const sync = () => {
      cancelAnimationFrame(frame); frame = 0; last = performance.now();
      if (width && height) draw(time);
      if (visible && !document.hidden && !reduced.matches) frame = requestAnimationFrame(tick);
    };
    const resize = new ResizeObserver(entries => {
      const box = entries[0].contentRect; width = box.width; height = box.height;
      const ratio = Math.min(2, window.devicePixelRatio || 1);
      canvas.width = Math.round(width * ratio); canvas.height = Math.round(height * ratio);
      context.setTransform(ratio, 0, 0, ratio, 0, 0); sync();
    });
    resize.observe(canvas);
    const observer = new IntersectionObserver(entries => { visible = entries[0].isIntersecting; sync(); }, { rootMargin: "80px" });
    observer.observe(canvas);
    reduced.addEventListener("change", sync); document.addEventListener("visibilitychange", sync);
    return () => { cancelAnimationFrame(frame); resize.disconnect(); observer.disconnect(); reduced.removeEventListener("change", sync); document.removeEventListener("visibilitychange", sync); };
  }, []);
  return <canvas ref={canvasRef} className="contact-cat" aria-hidden="true" />;
}
