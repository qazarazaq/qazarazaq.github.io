import { useId, useState } from "react";

const strokes = [
  "M212 398c-37-71-24-136 22-181 5-58 56-93 111-104 73-60 171-37 250 0 110 19 184 86 196 183 22 30 26 74 13 114",
  "M223 413c-36-12-44 17-36 57l17 65c7 25 20 36 35 30m558-151c33-13 44 17 35 56l-17 64c-7 27-21 37-38 29",
  "M242 434c-9 113 14 241 88 322 62 74 132 129 184 131 56-2 136-63 188-131 59-78 84-207 74-320",
  "M266 426c29-23 81-28 134-12m206-1c49-18 99-10 131 12",
  "M238 475c10-41 77-54 140-36 53 16 67 66 38 104-27 40-99 43-143 18-28-17-41-52-35-86Zm320-1c11-41 76-52 137-35 54 16 68 64 40 104-27 39-99 43-143 17-29-17-40-51-34-86Zm-129 3c38-21 82-21 123 0",
  "M294 478c22-14 45-12 66 3m245-2c23-15 46-12 67 1M309 479l2 17m315-17 2 16",
  "M499 484c-8 36-14 71-18 108 17 9 39 14 62 9",
  "M385 693c49-12 104-13 157-18 33-2 63-6 89-10-13 47-52 78-100 88-52 11-103-10-146-60Zm99 88c24 8 48 8 69-1",
];

export function PortraitSwitch() {
  const [illustrated, setIllustrated] = useState(false);
  const [hovered, setHovered] = useState(false);
  const hintId = useId();
  return <div className="portrait-block" data-depth="portrait">
    <button type="button" className="designer-about__portrait portrait-switch" data-draw={hovered || illustrated} onPointerEnter={event => { if (event.pointerType === "mouse") setHovered(true); }} onPointerLeave={() => setHovered(false)} aria-pressed={illustrated} aria-label={illustrated ? "Show my photograph" : "Draw my illustrated portrait"} aria-describedby={hintId} onClick={() => setIllustrated(value => !value)}>
      <img className="portrait-switch__photo" src="/assets/wildan-portrait.png" alt="Wildan Razaq Ramadhan" width="1049" height="1058" loading="lazy" />
      <svg className="portrait-switch__drawing" viewBox="0 0 1024 1024" aria-hidden="true" focusable="false"><g fill="none" stroke="#943c2d" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round">{strokes.map((d, i) => <path key={d} pathLength="1" d={d} style={{ animationDelay: `${i * 85}ms` }} />)}</g></svg>
      <img className="portrait-switch__illustration" src="/assets/wildan-avatar.webp" alt="" aria-hidden="true" width="1024" height="1024" loading="lazy" />
    </button>
    <span id={hintId} className="visually-hidden">Hover, focus, or tap to switch between the photograph and illustration.</span>
  </div>;
}
