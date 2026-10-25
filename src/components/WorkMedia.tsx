import { useEffect, useRef, useState } from "react";
import type { ProjectScreen } from "../data/portfolio";

export function DeviceImage({ screen }: { screen: ProjectScreen }) {
  const [loadedSrc, setLoadedSrc] = useState<string | null>(null);
  if (screen.kind === "atm") return <img src={screen.src} alt={screen.title} width={screen.width} height={screen.height} loading="lazy" decoding="async" />;
  if (screen.width > screen.height) {
    return <img src={screen.src} alt={screen.title} width={screen.width} height={screen.height} loading="lazy" decoding="async" />;
  }
  return <span className="phone-device" data-ready={loadedSrc === screen.src}><img className="phone-device__hardware" src="/work/phone-frame.webp" alt="" aria-hidden="true" width="420" height="851" loading="lazy" /><img className="phone-device__screen" onLoad={() => setLoadedSrc(screen.src)} src={screen.src} alt={screen.title} width={screen.width} height={screen.height} loading="lazy" decoding="async" /><span className="phone-device__island" aria-hidden="true" /></span>;
}

export function ScreenViewer({ screen, onClose }: { screen: ProjectScreen; onClose: () => void }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const dialog = dialogRef.current;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialog?.showModal();
    dialog?.focus({ preventScroll: true });
    return () => { dialog?.close(); document.body.style.overflow = previousOverflow; };
  }, []);
  return (
    <dialog ref={dialogRef} className={`screen-viewer${screen.width > screen.height ? " screen-viewer--desktop" : ""}`} tabIndex={-1} aria-labelledby="viewer-title" onCancel={onClose} onClick={event => { if (event.target === event.currentTarget) onClose(); }}>
      <div className="screen-viewer__header"><div><h2 id="viewer-title">{screen.title}</h2><p>{screen.caption}</p></div><button type="button" onClick={onClose} aria-label="Close screen preview"><span aria-hidden="true">×</span></button></div>
      <div className="screen-viewer__image"><img src={screen.src} alt={screen.title} width={screen.width} height={screen.height} /></div>
    </dialog>
  );
}

