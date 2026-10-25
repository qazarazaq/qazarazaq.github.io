import { useEffect, useRef } from "react";

type FurSample = { x: number; y: number; depth: number; head: number; tail: number; glyph: number; color: number; alpha: number };
const CHARACTERS = " .,:;i+tfLCG08@";
const COLORS = ["#3c291e", "#573b26", "#755033", "#936641", "#b17f50", "#c99865", "#dbb486", "#ead0a9", "#f3e2c5", "#45433d", "#68665c", "#898779", "#aaa797", "#c6c3b3", "#e1dfd1", "#f3f1e8"];
const clamp = (n: number) => Math.min(1, Math.max(0, n));

// A photo-derived character field preserves Kiko's fur, face and resting pose.
export function AsciiCat() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;
    const image = new Image();
    image.decoding = "async";
    const source = document.createElement("canvas");
    const sourceInk = source.getContext("2d", { willReadFrequently: true });
    const atlas = document.createElement("canvas");
    const atlasInk = atlas.getContext("2d");
    if (!sourceInk || !atlasInk) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let width = 0, height = 0, ratio = 1, visible = false, requested = false, ready = false, disposed = false;
    let frame = 0, last = 0, time = 0, columns = 0, rows = 0, artW = 0, artH = 0, cellW = 0, cellH = 0, tileW = 0, tileH = 0;
    let samples: FurSample[] = [];

    const prepare = () => {
      if (!ready || !width || !height) return;
      const aspect = image.naturalWidth / image.naturalHeight;
      columns = width < 600 ? 156 : 224;
      artW = Math.min(width * .96, 1100, height * .76 * aspect);
      artH = artW / aspect;
      cellW = artW / columns;
      const fontSize = cellW / .60;
      cellH = fontSize * 1.12;
      rows = Math.round(artH / cellH);
      source.width = columns; source.height = rows;
      sourceInk.clearRect(0, 0, columns, rows);
      sourceInk.drawImage(image, 0, 0, columns, rows);
      const pixels = sourceInk.getImageData(0, 0, columns, rows).data;
      samples = [];
      for (let y = 0; y < rows; y++) for (let x = 0; x < columns; x++) {
        const i = (y * columns + x) * 4, a = pixels[i + 3] / 255;
        if (a < .16) continue;
        const r = pixels[i], g = pixels[i + 1], b = pixels[i + 2];
        const light = (.2126 * r + .7152 * g + .0722 * b) / 255;
        const value = clamp((light - .07) / .82);
        const neutral = r - b < 59;
        const color = neutral ? 9 + Math.round(value * 6) : Math.round(value * 8);
        const u = (x + .5) / columns - .5, v = (y + .5) / rows - .5;
        const head = Math.exp(-(((u - .25) / .23) ** 2 + ((v + .18) / .32) ** 2));
        const tail = clamp((v - .18) / .25) * (1 - head);
        const body = Math.exp(-(((u + .10) / .43) ** 2 + (v / .48) ** 2));
        samples.push({ x: u, y: v, head, tail, depth: .06 * body + .07 * head, glyph: Math.max(1, Math.round(Math.pow(value, .8) * (CHARACTERS.length - 1))), color, alpha: a });
      }
      // Cache every coloured glyph once; frames draw from this small atlas.
      tileW = Math.ceil((cellW + 2) * ratio);
      tileH = Math.ceil((cellH + 2) * ratio);
      atlas.width = tileW * CHARACTERS.length;
      atlas.height = tileH * COLORS.length;
      atlasInk.font = `${fontSize * ratio}px ui-monospace, SFMono-Regular, Menlo, monospace`;
      atlasInk.textAlign = "center"; atlasInk.textBaseline = "middle";
      COLORS.forEach((color, row) => {
        atlasInk.fillStyle = color;
        Array.from(CHARACTERS).forEach((char, col) => atlasInk.fillText(char, col * tileW + tileW / 2, row * tileH + tileH / 2));
      });
      canvas.dataset.detail = String(samples.length);
    };

    const draw = (t: number) => {
      if (!ready || !samples.length) return;
      context.clearRect(0, 0, width, height);
      const centerX = width * .5;
      const centerY = height * (width < 600 ? .70 : .62);
      const breath = Math.sin(t * 1.65) * .009;
      const yaw = Math.sin(t * .52) * .045;
      const cos = Math.cos(yaw), sin = Math.sin(yaw);
      const tailSway = Math.sin(t * .94) * .010;
      const headX = Math.sin(t * .65) * .003;
      const headY = Math.sin(t * .90) * .002;
      const dw = tileW / ratio, dh = tileH / ratio;
      for (const sample of samples) {
        const x = sample.x * cos + sample.depth * sin + sample.head * headX + sample.tail * tailSway;
        const y = sample.y + (sample.y - .16) * breath * (1 - sample.head * .6) + sample.head * headY + sample.tail * Math.cos(t * .94) * .002;
        context.globalAlpha = sample.alpha;
        context.drawImage(atlas, sample.glyph * tileW, sample.color * tileH, tileW, tileH, centerX + x * artW - dw / 2, centerY + y * artH - dh / 2, dw, dh);
      }
      context.globalAlpha = 1;
    };
    const tick = (now: number) => {
      frame = 0;
      if (!visible || document.hidden || reduced.matches || !ready) return;
      if (now - last >= 1000 / 18) { time += Math.min(.12, (now - last) / 1000); last = now; draw(time); }
      frame = requestAnimationFrame(tick);
    };
    const sync = () => {
      cancelAnimationFrame(frame); frame = 0; last = performance.now();
      if (width && height) draw(time);
      if (visible && !document.hidden && !reduced.matches && ready) frame = requestAnimationFrame(tick);
    };
    const resize = new ResizeObserver(entries => {
      const box = entries[0].contentRect; width = box.width; height = box.height;
      ratio = Math.min(2, window.devicePixelRatio || 1);
      canvas.width = Math.round(width * ratio); canvas.height = Math.round(height * ratio);
      context.setTransform(ratio, 0, 0, ratio, 0, 0); prepare(); sync();
    });
    image.onload = () => { if (disposed) return; ready = true; canvas.dataset.loaded = "true"; prepare(); sync(); };
    image.onerror = () => { if (!disposed) canvas.dataset.loaded = "error"; };
    resize.observe(canvas);
    const observer = new IntersectionObserver(entries => {
      visible = entries[0].isIntersecting;
      if (visible && !requested) { requested = true; image.src = "/assets/kiko-ascii-source.webp"; }
      sync();
    }, { rootMargin: "200px" });
    observer.observe(canvas);
    reduced.addEventListener("change", sync); document.addEventListener("visibilitychange", sync);
    return () => { disposed = true; cancelAnimationFrame(frame); resize.disconnect(); observer.disconnect(); image.onload = null; image.onerror = null; reduced.removeEventListener("change", sync); document.removeEventListener("visibilitychange", sync); };
  }, []);
  return <canvas ref={canvasRef} className="contact-cat" aria-hidden="true" />;
}
