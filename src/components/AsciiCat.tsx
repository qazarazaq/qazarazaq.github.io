import { useEffect, useRef } from "react";

type Point = { x: number; y: number; z: number; nx: number; ny: number; nz: number; part: number; cream: boolean; dark: boolean; fur: number };
const GLYPHS = ".,:;-=+*#%@";
const ORANGE = ["#634833", "#96704e", "#c09565", "#dfb98a"];
const CREAM = ["#6c7069", "#989d93", "#c2c6b7", "#e2e5d8"];
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
      for (let v = .04; v < Math.PI; v += .045) for (let u = 0; u < Math.PI * 2; u += .045) {
        const ax = Math.sin(v) * Math.cos(u), ay = Math.cos(v), az = Math.sin(v) * Math.sin(u);
        const fur = Math.sin(u * 17 + Math.sin(v * 11)) * Math.sin(v * 23);
        const fluff = dark ? 1 : 1 + .035 * fur + .015 * Math.sin(v * 37 + u * 29);
        const n = Math.hypot(ax / rx, ay / ry, az / rz);
        points.push({ x: cx + ax * rx * fluff, y: cy + ay * ry * fluff, z: cz + az * rz * fluff, nx: ax / rx / n, ny: ay / ry / n, nz: az / rz / n, part, cream, dark, fur });
      }
    };
    // Resting Persian proportions: broad face, low ears, a cream bib and a curled plume.
    // Geometry is sampled directly into glyphs; no photograph or image filter is used.
    ellipsoid(-.45, -.10, -.08, .95, .58, .56);
    ellipsoid(-.92, -.15, .02, .51, .48, .52);
    ellipsoid(.57, -.06, .35, .38, .44, .28, 0, true);
    ellipsoid(.66, .47, .25, .47, .48, .35, 1);
    ellipsoid(.35, .29, .44, .20, .24, .22, 1);
    ellipsoid(.97, .29, .44, .20, .24, .22, 1);
    ellipsoid(.54, .29, .59, .13, .115, .095, 1);
    ellipsoid(.79, .29, .59, .13, .115, .095, 1);
    ellipsoid(.66, .36, .83, .055, .038, .027, 1, false, true);
    ellipsoid(.66, .24, .83, .045, .016, .012, 1, false, true);
    for (const x of [.48, .85]) {
      ellipsoid(x, .52, .80, .087, .032, .03, 2, false, true);
      ellipsoid(x - .008, .526, .831, .013, .008, .008, 2, true);
    }
    for (const side of [-1, 1]) {
      const center = .66 + side * .32;
      // Small triangular ear with a darker inner plane, tucked into the mane.
      for (let a = 0; a <= 1; a += .018) for (let b = 0; b <= 1 - a; b += .018) {
        const c = 1 - a - b;
        const x = (center - .17) * a + (center + .16) * b + (center + side * .035) * c;
        points.push({x, y: .76 * a + .77 * b + 1.10 * c, z: .16 + .10 * (a + b), nx: 0, ny: .2, nz: .98, part: side < 0 ? 3 : 4, cream: false, dark: a > .18 && b > .18 && c > .18, fur: Math.sin(a * 29 + b * 33)});
      }
      for (let row = 0; row < 3; row++) for (let t = 0; t <= 1; t += .035) {
        points.push({x: .66 + side * (.16 + t * .42), y: .27 + (row - 1) * .045 + t * (row - 1) * .045, z: .665 - t * .05, nx: 0, ny: .1, nz: 1, part: 1, cream: true, dark: false, fur: 0});
      }
    }
    ellipsoid(.36, -.44, .54, .20, .13, .26, 6, true);
    ellipsoid(.94, -.44, .51, .18, .13, .25, 6, true);
    // A continuous curved tail lies across the foreground, with a tapered tip.
    const tail = (t: number) => ({x: -1.22 + 2.34 * t, y: -.30 - .36 * Math.sin(Math.PI * t * .85), z: .20 + .67 * Math.sin(Math.PI * t * .86)});
    for (let t = 0; t <= 1; t += .007) {
      const c = tail(t), next = tail(t + .001);
      const dx = next.x - c.x, dy = next.y - c.y, dz = next.z - c.z;
      const n = Math.hypot(dx, dz), length = Math.hypot(dx, dy, dz);
      const ux = -dz / n, uz = dx / n;
      const vx = dy * uz / length, vy = (dz * ux - dx * uz) / length, vz = -dy * ux / length;
      const radius = (.17 + .04 * Math.sin(Math.PI * t)) * (1 - .66 * t ** 5);
      for (let a = 0; a < Math.PI * 2; a += .065) {
        const nx = ux * Math.cos(a) + vx * Math.sin(a), ny = vy * Math.sin(a), nz = uz * Math.cos(a) + vz * Math.sin(a);
        const fur = Math.sin(a * 17 + t * 47);
        const r = radius * (1 + .065 * fur);
        points.push({x: c.x + nx * r, y: c.y + ny * r, z: c.z + nz * r, nx, ny, nz, part: 5, cream: false, dark: false, fur});
      }
    }

    let width = 0, height = 0, visible = false, frame = 0, last = 0, time = 0;
    let cols = 0, rows = 0, cellW = 0, cellH = 0, fontSize = 0, artW = 0, artH = 0;
    let depth = new Float32Array(0), shade = new Float32Array(0), material = new Uint8Array(0);
    const draw = (t: number) => {
      if (!width || !height) return;
      ink.clearRect(0, 0, width, height);
      depth.fill(-Infinity); material.fill(0);
      const yaw = Math.sin(t * .45) * .035;
      const ch = Math.cos(yaw), sh = Math.sin(yaw);
      const headTurn = Math.sin(t * .7) * .045;
      const ct = Math.cos(headTurn), st = Math.sin(headTurn);
      const blinkPhase = t % 6.4;
      const blink = blinkPhase > 5.9 && blinkPhase < 6.15;
      const scale = Math.min(artW / 3.25, artH / 2.2);
      for (const point of points) {
        let { x, y, z, nx, ny, nz } = point;
        if (point.part >= 1 && point.part <= 4) {
          const dx = x - .66, dz = z - .25;
          x = .66 + dx * ct + dz * st; z = .25 + dz * ct - dx * st;
          const normalX = nx * ct + nz * st;
          nz = nz * ct - nx * st; nx = normalX;
          if (point.part === 2 && blink) y = .52 + (y - .52) * .18;
          if (point.part === 3 || point.part === 4) {
            const flick = Math.max(0, Math.sin(t * 1.1 + point.part) - .92) * .4;
            x += flick * (y - .76);
          }
        } else if (point.part === 5) {
          const tip = clamp((x + 1.22) / 2.34);
          y += Math.sin(t * 1.5 - tip * 1.2) * .09 * tip ** 2;
          z += Math.sin(t * 1.5 - tip) * .06 * tip ** 2;
        } else if (point.part === 0) {
          y += Math.sin(t * 1.8) * .015;
        }
        const worldX = (x + .10) * ch - z * sh;
        const worldZ = (x + .10) * sh + z * ch;
        const screenY = y * .94 - worldZ * .342;
        const cameraDepth = y * .342 + worldZ * .94;
        const gx = Math.round(cols / 2 + worldX * scale / cellW);
        const gy = Math.round(rows / 2 - (screenY + .04) * scale / cellH);
        if (gx < 0 || gx >= cols || gy < 0 || gy >= rows) continue;
        const i = gy * cols + gx;
        if (cameraDepth < depth[i]) continue;
        depth[i] = cameraDepth;
        const normalX = nx * ch - nz * sh;
        const normalZ = nx * sh + nz * ch;
        shade[i] = clamp(.41 + (-normalX * .35 + ny * .65 + normalZ * .60) * .40 + point.fur * .07);
        material[i] = point.dark ? 3 : point.cream ? 2 : 1;
      }
      const left = (width - artW) / 2;
      const top = (height - artH) / 2;

      ink.font = `${fontSize}px ui-monospace, SFMono-Regular, Menlo, monospace`;
      ink.textAlign = "center"; ink.textBaseline = "middle";
      for (let i = 0; i < material.length; i++) {
        if (!material[i]) continue;
        const light = shade[i];
        const level = Math.min(3, Math.floor(light * 4));
        ink.fillStyle = material[i] === 3 ? "#37271f" : (material[i] === 2 ? CREAM : ORANGE)[level];
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
      artW = Math.min(width * .98, 1000, height * 1.65);
      cols = width < 350 ? 80 : 104; fontSize = artW / cols / .64;
      cellW = artW / cols; cellH = fontSize * 1.16;
      rows = Math.round(artW / 1.55 / cellH); artH = rows * cellH;
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
