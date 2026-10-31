import { useId, useState, type CSSProperties } from "react";

// These reveal paths follow the owner's original drawing; the visible ink is
// always the supplied illustration, never a substitute generated portrait.
const strokes = [
  ["M342 224 Q409 78 538 104 Q681 99 760 242 Q808 324 766 479", 86, 0, .48],
  ["M327 250 Q197 282 238 461 L258 536", 72, .18, .38],
  ["M345 225 Q464 150 570 207 Q650 321 725 294 L754 528", 78, .36, .38],
  ["M246 495 Q198 490 226 602 Q234 651 273 647", 38, .65, .22],
  ["M772 486 Q814 490 788 604 Q779 640 750 647", 38, .74, .22],
  ["M268 600 Q274 735 368 811 Q512 945 665 801 Q731 740 746 587", 42, .82, .38],
  ["M282 491 L237 479 M670 479 L754 461 M449 499 Q488 478 515 496", 32, 1, .18],
  ["M448 509 C447 424 285 429 295 513 C301 610 432 620 449 527 Z", 27, 1.1, .28],
  ["M518 507 C516 427 675 411 670 502 C666 596 525 603 518 507 Z", 28, 1.18, .28],
  ["M316 444 Q365 408 419 427 M544 421 Q608 397 656 428", 42, 1.34, .2],
  ["M332 506 Q380 467 415 494 M552 495 Q602 461 645 489", 30, 1.49, .2],
  ["M379 492 L380 515 M597 488 L598 508", 47, 1.61, .12],
  ["M439 608 Q412 642 455 633 Q489 662 512 633 L536 629", 31, 1.69, .2],
  ["M391 700 Q495 695 602 688 Q566 770 453 751 Q413 740 391 700 Z M476 784 L528 777 M628 663 L640 682", 29, 1.83, .3],
] as const;

export function PortraitSwitch() {
  const [illustrated, setIllustrated] = useState(false);
  const hintId = useId();
  const maskId = useId().replace(/:/g, "");
  return <div className="portrait-block" data-depth="portrait">
    <button type="button" className="designer-about__portrait portrait-switch" data-draw={illustrated} aria-pressed={illustrated} aria-label={illustrated ? "Show my photograph" : "Show my illustrated portrait"} aria-describedby={hintId} onClick={() => setIllustrated(value => !value)}>
      <img className="portrait-switch__photo" src="/assets/wildan-portrait.png" alt="Wildan Razaq Ramadhan" width="1049" height="1058" loading="lazy" />
      <svg className="portrait-switch__drawing" viewBox="0 0 1024 1024" aria-hidden="true"><defs><mask id={maskId} maskUnits="userSpaceOnUse" x="0" y="0" width="1024" height="1024"><rect width="1024" height="1024" fill="black" />{strokes.map(([d, width, delay, duration], i) => <path key={i} d={d} fill="none" stroke="white" strokeWidth={width} strokeLinecap="round" strokeLinejoin="round" pathLength="1" className="portrait-stroke" style={{ "--draw-delay": `${delay}s`, "--draw-duration": `${duration}s` } as CSSProperties} />)}</mask></defs><rect width="1024" height="1024" fill="#f5f1e6" /><image href="/assets/wildan-avatar.webp" width="1024" height="1024" mask={`url(#${maskId})`} /></svg>
      <img className="portrait-switch__illustration" src="/assets/wildan-avatar.webp" alt="" aria-hidden="true" width="1024" height="1024" loading="lazy" />
    </button>
    <span id={hintId} className="visually-hidden">Hover, focus, or tap to switch between the photograph and illustration.</span>
  </div>;
}
