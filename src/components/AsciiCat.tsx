import { useEffect, useRef } from "react";
import { catRoamPose } from "../lib/catPath";

const clamp = (n: number, low = 0, high = 1) => Math.max(low, Math.min(high, n));
const ellipse = (x: number, y: number, cx: number, cy: number, rx: number, ry: number) => (Math.hypot((x - cx) / rx, (y - cy) / ry) - 1) * Math.min(rx, ry);
const capsule = (x: number, y: number, ax: number, ay: number, bx: number, by: number, r: number) => {
  const dx = bx - ax, dy = by - ay;
  const t = clamp(((x - ax) * dx + (y - ay) * dy) / (dx * dx + dy * dy || 1));
  return Math.hypot(x - ax - dx * t, y - ay - dy * t) - r;
};
type Leg = { hip: number; kneeX: number; kneeY: number; footX: number; footY: number; far: boolean };

// Kiko is drawn as articulated contours on a character grid, never a filtered photo.
export function AsciiCat() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current, ink = canvas?.getContext("2d");
    if (!canvas || !ink) return;
    const sprite = document.createElement("canvas");
    const paint = sprite.getContext("2d");
    if (!paint) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let width = 0, height = 0, visible = false, frame = 0, last = 0, time = 0;
    const draw = (t: number) => {
      if (!width || !height) return;
      ink.clearRect(0, 0, width, height);
      const pose = catRoamPose(t, width, height, reduced.matches);
      const w = pose.artWidth, h = pose.artHeight;
      const cols = w < 230 ? 88 : 112;
      const cell = Math.min(w * .97 / cols, h * 1.54 / cols);
      const cellH = cell * 1.72, rows = Math.round(h * .94 / cellH);
      const scale = Math.min(cols * cell / 4.35, rows * cellH / 2.65);
      const left = (w - cols * cell) / 2, top = (h - rows * cellH) / 2;
      paint.clearRect(0, 0, w, h);
      const gait = t * (40 * Math.PI / (.48 * scale)), bob = Math.cos(gait * 2) * .018;
      const drift = Math.sin(gait * .5) * .025;
      const legs: Leg[] = [0, 1, 2, 3].map(i => {
        const far = i < 2, front = i % 2 === 1;
        const hip = front ? .61 : -.79;
        // The opposite diagonal pair advances together; planted feet stay low.
        const phase = gait + (front !== far ? Math.PI : 0);
        const stride = Math.sin(phase) * .24;
        const lift = Math.max(0, Math.cos(phase)) * .16;
        return { hip, kneeX: hip + stride * .46 - (front ? -.02 : .12), kneeY: -.43 + lift * .27,
          footX: hip + stride + (far ? -.09 : .06), footY: -.82 + lift + (far ? .07 : 0), far };
      });
      const farLegs = legs.slice(0, 2), nearLegs = legs.slice(2);
      const headX = .91 + Math.sin(gait + .25) * .016;
      const headY = .38 + bob;
      const tail: { x: number; y: number; r: number }[] = [];
      for (let i = 0; i <= 12; i++) {
        const u = i / 12;
        tail.push({ x: -1.06 - .88 * Math.sin(u * 1.34), y: .03 + .87 * u + Math.sin(t * 1.1 - u) * .085 * u,
          r: .15 + .035 * Math.sin(u * Math.PI) - .10 * u ** 5 });
      }
      paint.font = `${cell * 1.63}px ui-monospace, SFMono-Regular, Menlo, monospace`;
      paint.textAlign = "center"; paint.textBaseline = "middle";
      for (let row = 0; row < rows; row++) for (let col = 0; col < cols; col++) {
        const x = (col - cols / 2) * cell / scale - drift;
        const y = (rows / 2 - row) * cellH / scale;
        let distance = Infinity, shape = "", cream = false, far = false;
        const put = (d: number, kind: string, white = false, behind = false) => {
          if (d < 0) { distance = d; shape = kind; cream = white; far = behind; }
        };
        let tailD = Infinity;
        for (const c of tail) tailD = Math.min(tailD, Math.hypot(x - c.x, y - c.y) - c.r);
        put(tailD + .014 * Math.sin(x * 47 + y * 37), "tail");
        const legShape = (leg: Leg) => {
          const d = Math.min(capsule(x,y,leg.hip,-.12+bob,leg.kneeX,leg.kneeY,.125),capsule(x,y,leg.kneeX,leg.kneeY,leg.footX,leg.footY+.09,.083));
          put(d, "leg", false, leg.far);
          put(ellipse(x,y,leg.footX+.055,leg.footY,.16,.075), "paw", true, leg.far);
        };
        for (const leg of farLegs) legShape(leg);
        const fur = .014 * Math.sin(x * 48 + y * 21) + .009 * Math.cos(y * 58 - x * 13);
        const body = Math.min(ellipse(x,y,-.30,.05+bob,.91,.50),ellipse(x,y,-.83,-.03+bob,.47,.44),ellipse(x,y,.40,.09+bob,.39,.46));
        put(body + fur, "body");
        for (const leg of nearLegs) legShape(leg);
        put(ellipse(x,y,.70,-.08+bob,.25,.37) + fur, "bib", true);
        // The head is round and short-faced. Small ears sit inside a long-haired ruff.
        for (const side of [-1, 1]) {
          const ex = headX + side * .245, ey = headY + .33;
          const ear = Math.max(Math.abs(x-ex) - (.145 - clamp((y-ey)/.18)*.105), ey-y, y-(ey+.18));
          put(ear + fur * .4, "ear");
          if (Math.abs(x-ex) < .035 && y > ey+.08 && y < ey+.19) put(-.01,"ear-inner");
        }
        const head = ellipse(x,y,headX,headY,.46,.38);
        put(head + fur * 1.5, "head");
        put(ellipse(x,y,headX-.29,headY-.10,.21,.24) + fur, "head");
        put(ellipse(x,y,headX+.29,headY-.10,.21,.24) + fur, "head");
        put(ellipse(x,y,headX,headY-.17,.22,.11), "muzzle");
        if (!shape) continue;
        const surface = clamp(-distance / .24);
        const grain = Math.sin(x * 39 + y * 11) * Math.cos(y * 34 - x * 8);
        const stripe = Math.sin(x * 17 + Math.sin(y * 12) * 1.4);
        let light = clamp(.37 + surface * .32 + (y + .5) * .10 + grain * .09);
        if (shape === "body" && stripe > .70) light -= .12;
        if (far) light *= .65;
        if (cream && !far) light = Math.max(.69, light);
        let char = ".,:;=+*#%@"[Math.floor(clamp(light) * 9)];
        let color = cream ? ["#73776c","#a3a799","#d2d4c4","#eeecd9"][Math.floor(clamp(light) * 3.99)] : ["#765139","#a67a50","#c59a66","#e1bd87"][Math.floor(clamp(light) * 3.99)];
        if (shape === "ear-inner") { char = ":"; color = "#ac785a"; }
        if (shape === "head" || shape === "muzzle") {
          const fx = (x-headX)/.40, fy = (y-headY)/.36;
          // Narrow sleepy eyes, a small flat nose, and the forehead tabby markings.
          if (Math.abs(Math.abs(fx)-.43)<.16 && Math.abs(fy-.10)<.09) { char = "-"; color = "#3a2b22"; }
          if (Math.abs(fx)<.11 && Math.abs(fy+.30)<.10) { char = "v"; color = "#664237"; }
          if (Math.abs(fx)<.065 && fy<-.42 && fy>-.60) { char = ":"; color = "#644838"; }
          if (fy>.45 && fy<.82 && Math.abs(fx)<.54 && Math.sin(fx*17+fy*2)>.67) color = "#9b6b43";
        }
        paint.fillStyle = color;
        paint.fillText(char,left+(col+.5)*cell,top+(row+.5)*cellH);
      }
      // Sparse whiskers are characters too; they follow the head bob without a line overlay.
      paint.fillStyle = "#e0cfac";
      for (const side of [-1,1]) for (let line=0;line<3;line++) for (let i=0;i<4;i++) {
        const x=headX+side*(.22+i*.085), y=headY-.12+(line-1)*(.035+i*.018);
        const gx=cols/2+(x+drift)*scale/cell, gy=rows/2-y*scale/cellH;
        paint.fillText(i%2 ? "." : "-",left+(gx+.5)*cell,top+(gy+.5)*cellH);
      }
      ink.save();
      ink.translate(pose.x, pose.y);
      ink.rotate(pose.tilt);
      ink.scale(pose.facing * pose.turn, 1);
      ink.drawImage(sprite, -w / 2, -h / 2, w, h);
      ink.restore();
    };
    const tick = (now: number) => {
      frame = 0;
      if (!visible || document.hidden || reduced.matches) return;
      if (now-last>=1000/20) { time += Math.min(.12,(now-last)/1000); last=now; draw(time); }
      frame=requestAnimationFrame(tick);
    };
    const sync = () => { cancelAnimationFrame(frame); frame=0; last=performance.now(); draw(time); if (visible&&!document.hidden&&!reduced.matches) frame=requestAnimationFrame(tick); };
    const resize = new ResizeObserver(entries => {
      const box=entries[0].contentRect; width=box.width; height=box.height;
      const ratio=Math.min(2,window.devicePixelRatio||1); canvas.width=Math.round(width*ratio); canvas.height=Math.round(height*ratio); ink.setTransform(ratio,0,0,ratio,0,0);
      const pose=catRoamPose(time,width,height,reduced.matches);
      sprite.width=Math.ceil(pose.artWidth*ratio); sprite.height=Math.ceil(pose.artHeight*ratio);
      paint.setTransform(ratio,0,0,ratio,0,0); sync();
    });
    resize.observe(canvas);
    const observer=new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;sync();},{rootMargin:"80px"}); observer.observe(canvas);
    reduced.addEventListener("change",sync); document.addEventListener("visibilitychange",sync);
    return()=>{cancelAnimationFrame(frame);resize.disconnect();observer.disconnect();reduced.removeEventListener("change",sync);document.removeEventListener("visibilitychange",sync);};
  }, []);
  return <canvas ref={canvasRef} className="contact-cat" aria-hidden="true" />;
}
