import { useEffect, useRef } from "react";

type Point = { x: number; y: number; z: number; nx: number; ny: number; nz: number; part: number; cream: boolean; dark: boolean };
const GLYPHS = ".:-=+*#%@";
const ORANGE = ["#775034", "#ba8658", "#ddb17f"];
const CREAM = ["#83857e", "#bbc1b8", "#e2e5d8"];
const clamp = (n: number) => Math.max(0, Math.min(1, n));

// A small articulated model is shaded onto a character grid, rather than filtering a photo.
export function AsciiCat() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const ink = canvas?.getContext("2d");
    if (!canvas || !ink) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const points: Point[] = [];
    const ellipsoid = (cx: number, cy: number, cz: number, rx: number, ry: number, rz: number, part = 0, cream = false, dark = false) => {
      for (let v = .09; v < Math.PI; v += .075) for (let u = 0; u < Math.PI * 2; u += .075) {
        const nx = Math.sin(v) * Math.cos(u), ny = Math.cos(v), nz = Math.sin(v) * Math.sin(u);
        const fluff = dark ? 1 : 1 + .018 * Math.sin(u * 11 + v * 17);
        points.push({ x: cx + nx * rx * fluff, y: cy + ny * ry * fluff, z: cz + nz * rz * fluff, nx, ny, nz, part, cream, dark });
      }
    };
    // Rounded body, broad Persian face, white bib, muzzle and paws are Kiko's main cues.
    ellipsoid(.06, .08, 0, 1.03, .52, .43);
    ellipsoid(-.65, .05, .19, .34, .46, .33, 0, true);
    ellipsoid(-.91, .70, .04, .49, .47, .38, 1);
    ellipsoid(-.91, .47, .34, .30, .19, .16, 1, true);
    ellipsoid(-.91, .59, .48, .075, .055, .045, 1, false, true);
    ellipsoid(-1.10, .78, .375, .063, .035, .04, 1, false, true);
    ellipsoid(-.73, .78, .375, .063, .035, .04, 1, false, true);
    // Small furred ears, with their tips kept distinct from the rounded head.
    for (const x of [-1.24, -.59]) for (let h = 0; h < 1; h += .045) for (let a = 0; a < Math.PI * 2; a += .10) {
      points.push({ x: x + Math.cos(a) * .18 * (1 - h), y: 1.02 + h * .30, z: .015 + Math.sin(a) * .16 * (1 - h), nx: Math.cos(a), ny: .4, nz: Math.sin(a), part: 1, cream: false, dark: false });
    }
    const legs = [{ x: -.66, z: -.26 }, { x: .67, z: -.26 }, { x: -.66, z: .27 }, { x: .67, z: .27 }];
    legs.forEach((leg, i) => {
      ellipsoid(leg.x, -.50, leg.z, .16, .39, .15, i + 2);
      ellipsoid(leg.x - .07, -.85, leg.z + .015, .23, .12, .19, i + 2, true);
    });
    // A bushy curved tail, animated separately from the body.
    for (let s = 0; s <= 1; s += .02) for (let a = 0; a < Math.PI * 2; a += .10) {
      const radius = .15 * Math.sin(Math.PI * (.15 + s * .8));
      points.push({ x: 1.00 + Math.sin(s * 2.1) * .68 + Math.cos(a) * radius, y: .15 + s * 1.1 + Math.sin(a) * radius, z: -.05, nx: Math.cos(a), ny: .25, nz: Math.sin(a), part: 6, cream: false, dark: false });
    }
    // Whiskers are sparse characters, not strokes drawn over the ASCII.
    for (const side of [-1, 1]) for (let row = 0; row < 3; row++) for (let s = 0; s < 1; s += .1) points.push({ x: -.91 + side * (.20 + s * .31), y: .53 + (row - 1) * .045 + (row - 1) * s * .06, z: .51, nx: 0, ny: .4, nz: 1, part: 1, cream: true, dark: false });

    let width = 0, height = 0, visible = false, frame = 0, last = 0, time = 0;
    let cols = 0, rows = 0, cellW = 0, cellH = 0, fontSize = 0, artW = 0, artH = 0;
    let depth = new Float32Array(0), shade = new Float32Array(0), material = new Uint8Array(0);
    const draw = (t: number) => {
      if (!width || !height) return;
      ink.clearRect(0, 0, width, height);
      depth.fill(-Infinity); material.fill(0);
      const gait = t * 2.7;
      const bob = Math.sin(gait * 2) * .025;
      const turn = -.12 + Math.sin(t * .63) * .14;
      const cy = Math.cos(turn), sy = Math.sin(turn);
      const tilt = Math.sin(t * 1.1) * .065;
      const ct = Math.cos(tilt), st = Math.sin(tilt);
      const scale = artW / 4.6;
      const strides = [Math.PI, 0, 0, Math.PI].map(phase => {
        const angle = Math.sin(gait + phase) * .32;
        return { c: Math.cos(angle), s: Math.sin(angle) };
      });
      for (const point of points) {
        let { x, y, z, nx, ny, nz } = point;
        if (point.part === 1) {
          const dx = x + .91, dy = y - .70;
          x = -.91 + dx * ct - dy * st; y = .70 + dx * st + dy * ct;
        } else if (point.part >= 2 && point.part <= 5) {
          const leg = legs[point.part - 2];
          const stride = strides[point.part - 2];
          const dx = x - leg.x, dy = y + .18;
          x = leg.x + dx * stride.c - dy * stride.s;
          y = -.18 + dx * stride.s + dy * stride.c;
        } else if (point.part === 6) {
          const tip = clamp((y - .15) / 1.1);
          z += Math.sin(t * 1.8 - tip * 1.4) * .40 * tip;
          x += Math.sin(t * 1.8 - tip) * .13 * tip;
        }
        const px = x * cy + z * sy, pz = z * cy - x * sy;
        const gx = Math.round(cols / 2 + px * scale / cellW);
        const gy = Math.round(rows / 2 - (y + bob - .23) * scale / cellH);
        if (gx < 0 || gx >= cols || gy < 0 || gy >= rows) continue;
        const i = gy * cols + gx;
        if (pz < depth[i]) continue;
        depth[i] = pz;
        const light = clamp(.34 + (-nx * .35 + ny * .55 + nz * .8) * .55);
        shade[i] = light;
        material[i] = point.dark ? 3 : point.cream ? 2 : 1;
      }
      const left = (width - artW) / 2 + Math.sin(t * .45) * Math.min(18, width * .025);
      const top = height * (width < 600 ? .70 : .61) - artH / 2;
      ink.font = `${fontSize}px ui-monospace, SFMono-Regular, Menlo, monospace`;
      ink.textAlign = "center"; ink.textBaseline = "middle";
      for (let i = 0; i < material.length; i++) {
        if (!material[i]) continue;
        const light = shade[i];
        const level = Math.min(2, Math.floor(light * 3));
        ink.fillStyle = material[i] === 3 ? "#47352b" : (material[i] === 2 ? CREAM : ORANGE)[level];
        const char = material[i] === 3 ? "@" : GLYPHS[Math.min(GLYPHS.length - 1, Math.floor(light * GLYPHS.length))];
        ink.fillText(char, left + (i % cols + .5) * cellW, top + (Math.floor(i / cols) + .5) * cellH);
      }
    };
    const tick = (now: number) => {
      frame = 0;
      if (!visible || document.hidden || reduced.matches) return;
      if (now - last >= 1000 / 20) { time += Math.min(.12, (now - last) / 1000); last = now; draw(time); }
      frame = requestAnimationFrame(tick);
    };
    const sync = () => {
      cancelAnimationFrame(frame); frame = 0; last = performance.now(); draw(time);
      if (visible && !document.hidden && !reduced.matches) frame = requestAnimationFrame(tick);
    };
    const resize = new ResizeObserver(entries => {
      const box = entries[0].contentRect; width = box.width; height = box.height;
      const ratio = Math.min(2, window.devicePixelRatio || 1);
      canvas.width = Math.round(width * ratio); canvas.height = Math.round(height * ratio);
      ink.setTransform(ratio, 0, 0, ratio, 0, 0);
      artW = Math.min(width * .96, 1000, height * 1.35);
      cols = width < 600 ? 76 : 112; fontSize = artW / cols / .64;
      cellW = artW / cols; cellH = fontSize * 1.16;
      rows = Math.round(artW / 1.65 / cellH); artH = rows * cellH;
      depth = new Float32Array(cols * rows); shade = new Float32Array(cols * rows); material = new Uint8Array(cols * rows);
      sync();
    });
    resize.observe(canvas);
    const observer = new IntersectionObserver(entries => { visible = entries[0].isIntersecting; sync(); }, { rootMargin: "80px" });
    observer.observe(canvas);
    reduced.addEventListener("change", sync); document.addEventListener("visibilitychange", sync);
    return () => { cancelAnimationFrame(frame); resize.disconnect(); observer.disconnect(); reduced.removeEventListener("change", sync); document.removeEventListener("visibilitychange", sync); };
  }, []);
  return <canvas ref={canvasRef} className="contact-cat" aria-hidden="true" />;
}
