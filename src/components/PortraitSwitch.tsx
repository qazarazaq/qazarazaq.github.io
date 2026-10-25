import { useId, useState } from "react";

export function PortraitSwitch() {
  const [illustrated, setIllustrated] = useState(false);
  const [hovered, setHovered] = useState(false);
  const hintId = useId();
  return <div className="portrait-block" data-depth="portrait">
    <button type="button" className="designer-about__portrait portrait-switch" data-draw={hovered || illustrated} onPointerEnter={event => { if (event.pointerType === "mouse") setHovered(true); }} onPointerLeave={() => setHovered(false)} aria-pressed={illustrated} aria-label={illustrated ? "Show my photograph" : "Show my illustrated portrait"} aria-describedby={hintId} onClick={() => setIllustrated(value => !value)}>
      <img className="portrait-switch__photo" src="/assets/wildan-portrait.png" alt="Wildan Razaq Ramadhan" width="1049" height="1058" loading="lazy" />
      <img className="portrait-switch__illustration" src="/assets/wildan-avatar.webp" alt="" aria-hidden="true" width="1024" height="1024" loading="lazy" />
    </button>
    <span id={hintId} className="visually-hidden">Hover, focus, or tap to switch between the photograph and illustration.</span>
  </div>;
}
