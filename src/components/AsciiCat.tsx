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
      for (let v = .09; v < Math.PI; v += .075) for (let u = 0; u < Math.PI * 2; u += .075) {
        const nx = Math.sin(v) * Math.cos(u), ny = Math.cos(v), nz = Math.sin(v) * Math.sin(u);
        const fur = Math.sin(u * 17 + Math.sin(v * 11)) * Math.sin(v * 23);
        const fluff = dark ? 1 : 1 + .025 * fur + .012 * Math.sin(v * 37 + u * 29);
        points.push({ x: cx + nx * rx * fluff, y: cy + ny * ry * fluff, z: cz + nz * rz * fluff, nx, ny, nz, part, cream, dark, fur });
      }
    };
    // Kiko from above: a broad fluffy back, compact head, small ears and bushy tail.
    // Natural proportions keep the silhouette distinct from the former side-on character.
    ellipsoid(.22, .02, 0, .99, .40, .57);
    ellipsoid(-.44, .06, 0, .64, .41, .49);
    ellipsoid(-.80, .08, 0, .31, .30, .33, 1);
    ellipsoid(-1.10, .10, 0, .39, .31, .36, 1);
    // Only a sliver of the white bib is visible from this camera angle.
    ellipsoid(-.86, -.07, .27, .18, .23, .13, 1, true);
    ellipsoid(-1.40, .01, 0, .16, .14, .21, 1);
    ellipsoid(-1.53, .06, 0, .045, .06, .065, 1, false, true);
    ellipsoid(-1.29, .27, -.22, .045, .035, .055, 1, false, true);
    ellipsoid(-1.29, .27, .22, .045, .035, .055, 1, false, true);
    // Triangular, furred ear surfaces remain distinct in the overhead silhouette.
    for (const side of [-1, 1]) for (let u = 0; u <= 1; u += .025) for (let v = 0; v <= 1 - u; v += .025) {
      const w = 1 - u - v;
      points.push({ x: -.95 * u - .77 * v - 1.09 * w, y: .28 * u + .30 * v + .48 * w, z: side * (.17 * u + .38 * v + .55 * w), nx: -.1, ny: .9, nz: side * .3, part: 1, cream: false, dark: false, fur: Math.sin(u * 31 + v * 23) });
    }
    const legs = [{ x: -.62, z: -.36 }, { x: .65, z: -.36 }, { x: -.62, z: .36 }, { x: .65, z: .36 }];
    legs.forEach((leg, i) => {
      const front = i % 2 === 0;
      const side = Math.sign(leg.z);
      ellipsoid(leg.x - (front ? .09 : -.07), -.25, leg.z + side * .08, .22, .23, .16, i + 2);
      ellipsoid(leg.x - (front ? .25 : -.12), -.39, leg.z + side * .20, .19, .11, .15, i + 2, true);
    });
    for (let s = 0; s <= 1; s += .012) for (let a = 0; a < Math.PI * 2; a += .10) {
      const radius = .23 * Math.sqrt(Math.max(0, Math.sin(Math.PI * (.18 + s * .82))));
      points.push({ x: 1.02 + s * 1.12, y: -.02 + Math.cos(a) * radius, z: Math.sin(s * Math.PI) * .32 + Math.sin(a) * radius, nx: .1, ny: Math.cos(a), nz: Math.sin(a), part: 6, cream: false, dark: false, fur: Math.sin(a * 13 + s * 23) });
    }
    for (const side of [-1, 1]) for (let row = 0; row < 3; row++) for (let s = 0; s < 1; s += .08) {
      points.push({ x: -1.37 + (row - 1) * .07 + s * .12, y: .03, z: side * (.18 + s * .27), nx: 0, ny: 1, nz: side * .3, part: 1, cream: true, dark: false, fur: 0 });
    }

    let width = 0, height = 0, visible = false, frame = 0, last = 0, time = 0;
    let cols = 0, rows = 0, cellW = 0, cellH = 0, fontSize = 0, artW = 0, artH = 0;
    let depth = new Float32Array(0), shade = new Float32Array(0), material = new Uint8Array(0);
    const draw = (t: number) => {
      if (!width || !height) return;
      ink.clearRect(0, 0, width, height);
      depth.fill(-Infinity); material.fill(0);
      const gait = t * 2.7;
      const bob = Math.sin(gait * 2) * .018;
      const heading = .42 + Math.sin(t * .50) * .12;
      const ch = Math.cos(heading), sh = Math.sin(heading);
      const headTurn = Math.sin(t * .9) * .09;
      const ct = Math.cos(headTurn), st = Math.sin(headTurn);
      // A near-overhead camera shows the back and paw placement, with a little depth.
      const cameraSin = .92, cameraCos = .392;
      const scale = artW / 4.7;
      const strides = [Math.PI, 0, 0, Math.PI].map(phase => Math.sin(gait + phase));
      for (const point of points) {
        let { x, y, z, nx, ny, nz } = point;
        if (point.part === 1) {
          const dx = x + .82;
          x = -.82 + dx * ct + z * st; z = z * ct - dx * st;
          const normalX = nx * ct + nz * st;
          nz = nz * ct - nx * st; nx = normalX;
        } else if (point.part >= 2 && point.part <= 5) {
          const index = point.part - 2;
          const stride = strides[index];
          x += stride * .19;
          y += Math.max(0, stride) * .065;
          z += Math.sign(legs[index].z) * Math.cos(gait) * .025;
        } else if (point.part === 6) {
          const tip = clamp((x - 1.02) / 1.12);
          z += Math.sin(t * 1.65 - tip * 1.1) * .32 * tip;
          y += Math.sin(t * 1.65 - tip) * .055 * tip;
        } else {
          z += Math.sin(gait - x * 1.8) * .018;
        }
        const worldX = (x - .25) * ch - z * sh;
        const worldZ = (x - .25) * sh + z * ch;
        const screenY = (y + bob) * cameraCos - worldZ * cameraSin;
        const cameraDepth = (y + bob) * cameraSin + worldZ * cameraCos;
        const gx = Math.round(cols / 2 + worldX * scale / cellW);
        const gy = Math.round(rows / 2 - screenY * scale / cellH);
        if (gx < 0 || gx >= cols || gy < 0 || gy >= rows) continue;
        const i = gy * cols + gx;
        if (cameraDepth < depth[i]) continue;
        depth[i] = cameraDepth;
        const normalX = nx * ch - nz * sh;
        const normalZ = nx * sh + nz * ch;
        const light = clamp(.31 + (-normalX * .38 + ny * .85 + normalZ * .22) * .55 + point.fur * .055);
        shade[i] = light;
        material[i] = point.dark ? 3 : point.cream ? 2 : 1;
      }
      const left = (width - artW) / 2 + Math.sin(t * .43) * Math.min(22, width * .035);
      const top = height * (.50) - artH / 2;

      ink.font = `${fontSize}px ui-monospace, SFMono-Regular, Menlo, monospace`;
      ink.textAlign = "center"; ink.textBaseline = "middle";
      for (let i = 0; i < material.length; i++) {
        if (!material[i]) continue;
        const light = shade[i];
        const level = Math.min(3, Math.floor(light * 4));
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
      cols = width < 480 ? 64 : 104; fontSize = artW / cols / .64;
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
