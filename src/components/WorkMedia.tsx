import { useEffect, useRef, useState, type CSSProperties, type PointerEvent } from "react";
import type { ProjectScreen } from "../data/portfolio";

export function DeviceImage({ screen, priority = false, framing = "full" }: { screen: ProjectScreen; priority?: boolean; framing?: "full" | "console" }) {
  const [loadedSrc, setLoadedSrc] = useState<string | null>(null);
  const loading = priority ? "eager" : "lazy";
  if (screen.kind === "atm") return <span className={`atm-device${framing === "console" ? " atm-device--console" : ""}`}><span className="atm-device__body"><img className="atm-device__hardware" src="/work/atm-frame.webp" alt="" aria-hidden="true" width="820" height="1919" loading={loading} /><img className="atm-device__screen" src={screen.src} alt={screen.title} width={screen.width} height={screen.height} loading={loading} decoding="async" /></span></span>;
  if (screen.width > screen.height) return <span className="laptop-device"><span className="laptop-device__viewport"><img src={screen.src} alt={screen.title} width={screen.width} height={screen.height} loading={loading} decoding="async" /></span><img className="laptop-device__hardware" src="/work/macbook-frame.webp" alt="" aria-hidden="true" width="1500" height="920" loading={loading} /></span>;
  return <span className="phone-device" data-ready={loadedSrc === screen.src}><img className="phone-device__hardware" src="/work/phone-frame.webp" alt="" aria-hidden="true" width="420" height="851" loading={loading} /><img className="phone-device__screen" onLoad={() => setLoadedSrc(screen.src)} src={screen.src} alt={screen.title} width={screen.width} height={screen.height} loading={loading} decoding="async" {...(priority ? { fetchpriority: "high" } : {})} /><span className="phone-device__island" aria-hidden="true" /></span>;
}

export function ScreenViewer({ screen, onClose }: { screen: ProjectScreen; onClose: () => void }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const drag = useRef<{ x: number; y: number; left: number; top: number } | null>(null);
  const [zoomed, setZoomed] = useState(false);
  useEffect(() => {
    const dialog = dialogRef.current;
    const previousOverflow = document.body.style.overflow;
    const previousFocus = document.activeElement as HTMLElement | null;
    document.body.style.overflow = "hidden";
    dialog?.showModal(); dialog?.focus({ preventScroll: true });
    return () => { dialog?.close(); document.body.style.overflow = previousOverflow; previousFocus?.focus({ preventScroll: true }); };
  }, []);
  useEffect(() => { viewportRef.current?.scrollTo(0, 0); }, [zoomed]);
  const stopDrag = (event: PointerEvent<HTMLDivElement>) => {
    drag.current = null;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
  };
  return <dialog ref={dialogRef} className={`screen-viewer${zoomed ? " screen-viewer--zoomed" : ""}`} tabIndex={-1} aria-labelledby="viewer-title" onCancel={event => { event.preventDefault(); onClose(); }} onClick={event => { if (event.target === event.currentTarget) onClose(); }}>
    <div className="screen-viewer__header"><div><h2 id="viewer-title">{screen.title}</h2></div><div className="screen-viewer__controls"><button className="viewer-zoom" type="button" aria-pressed={zoomed} onClick={() => setZoomed(value => !value)}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" aria-hidden="true"><circle cx="10" cy="10" r="6" /><path d="m15 15 5 5M7 10h6" />{!zoomed && <path d="M10 7v6" />}</svg><span>{zoomed ? "Fit to window" : "Zoom in"}</span></button><button className="viewer-close" type="button" onClick={onClose} aria-label="Close screen preview"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18" /></svg></button></div></div>
    <div ref={viewportRef} className="screen-viewer__viewport" tabIndex={zoomed ? 0 : undefined} aria-label={zoomed ? "Zoomed screen" : undefined} onPointerDown={event => { if (zoomed && event.pointerType === "mouse" && event.button === 0) { drag.current = { x: event.clientX, y: event.clientY, left: event.currentTarget.scrollLeft, top: event.currentTarget.scrollTop }; event.currentTarget.setPointerCapture(event.pointerId); event.preventDefault(); } }} onPointerMove={event => { if (drag.current) { event.currentTarget.scrollLeft = drag.current.left + drag.current.x - event.clientX; event.currentTarget.scrollTop = drag.current.top + drag.current.y - event.clientY; } }} onPointerUp={stopDrag} onPointerCancel={stopDrag}>
      <img src={screen.src} alt={screen.title} width={screen.width} height={screen.height} draggable={false} style={{ "--zoom-width": `${screen.width > screen.height ? screen.width : screen.width * 2}px` } as CSSProperties} />
    </div>
  </dialog>;
}
