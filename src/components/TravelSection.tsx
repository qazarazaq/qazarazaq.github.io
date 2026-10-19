import { useRef, useState } from "react";
import type { CSSProperties, PointerEvent as ReactPointerEvent } from "react";
import { travelItems } from "../data/travel";

export function TravelSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [drag, setDrag] = useState(0);
  const gesture = useRef({ startX: 0, active: false, moved: false });
  const activeItem = travelItems[activeIndex];
  const select = (index: number) => setActiveIndex(Math.max(0, Math.min(travelItems.length - 1, index)));
  const endDrag = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!gesture.current.active) return;
    const delta = event.clientX - gesture.current.startX;
    gesture.current.active = false;
    if (event.type !== "pointercancel" && Math.abs(delta) > 40) select(activeIndex + (delta < 0 ? 1 : -1));
    setDrag(0);
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
  };

  return (
    <section id="travel" className="travel-section section" aria-labelledby="travel-title">
      <div className="container travel-intro">
        <h2 id="travel-title">Travel</h2>
        <p>Photographs from Japan and Singapore.</p>
      </div>
      <div
        className={`travel-experience travel-carousel${drag ? " travel-carousel--dragging" : ""}`}
        role="region"
        aria-roledescription="carousel"
        aria-label="Travel photographs. Use left and right arrow keys to navigate."
        tabIndex={0}
        onKeyDown={event => {
          if (event.key === "ArrowLeft" || event.key === "ArrowRight") { event.preventDefault(); select(activeIndex + (event.key === "ArrowLeft" ? -1 : 1)); }
          if (event.key === "Home" || event.key === "End") { event.preventDefault(); select(event.key === "Home" ? 0 : travelItems.length - 1); }
        }}
        onPointerDown={event => {
          if (event.button !== 0) return;
          gesture.current = { startX: event.clientX, active: true, moved: false };
        }}
        onPointerMove={event => {
          if (!gesture.current.active) return;
          const delta = event.clientX - gesture.current.startX;
          if (Math.abs(delta) > 8) {
            gesture.current.moved = true;
            event.currentTarget.setPointerCapture(event.pointerId);
            setDrag(delta * .7);
          }
        }}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onClickCapture={event => { if (gesture.current.moved) { event.stopPropagation(); gesture.current.moved = false; } }}
      >
        {travelItems.map((item, index) => {
          const offset = index - activeIndex;
          return <button
            type="button"
            key={item.id}
            className={`travel-photo${offset === 0 ? " travel-photo--active" : ""}`}
            style={{ "--offset": offset, "--drag": `${drag}px`, "--scale": offset === 0 ? 1 : .72, "--rotation": `${Math.sign(offset) * 8}deg`, opacity: Math.abs(offset) > 1 ? 0 : offset === 0 ? 1 : .55 } as CSSProperties}
            aria-label={`View ${item.location}, ${item.year}`}
            aria-current={offset === 0 ? "true" : undefined}
            tabIndex={Math.abs(offset) > 1 ? -1 : 0}
            onClick={() => select(index)}
          >
            <img src={item.image} alt={item.alt} width={item.width} height={item.height} draggable={false} decoding="async" style={{ objectPosition: item.imagePosition }} />
          </button>;
        })}
        <div className="travel-window-shell" aria-hidden="true">
          <img className="airplane-window-frame" src="/travel/airplane-window.png" alt="" width="536" height="760" />
        </div>
      </div>

      <div className="container travel-destinations" aria-label="Choose a destination">
        {travelItems.map((item, index) => <button type="button" key={item.id} aria-pressed={index === activeIndex} onClick={() => select(index)}>{item.location}</button>)}
      </div>

      <div className="container travel-details">
        <div className="travel-details__copy" aria-live="polite" aria-atomic="true">
          <span>
            {activeItem.country} / {activeItem.year}
          </span>
          <h3>{activeItem.location}</h3>
          {activeItem.caption && <p>{activeItem.caption}</p>}
        </div>

        <div className="travel-details__controls">
          <div className="travel-progress" aria-label={`Destination ${activeIndex + 1} of ${travelItems.length}`}>
            <span>{String(activeIndex + 1).padStart(2, "0")}</span>
            <i aria-hidden="true"><b style={{ width: `${((activeIndex + 1) / travelItems.length) * 100}%` }} /></i>
            <span>{String(travelItems.length).padStart(2, "0")}</span>
          </div>

          <div className="travel-buttons">
            <button
              type="button"
              onClick={() => select(activeIndex - 1)}
              disabled={activeIndex === 0}
              aria-label="Previous destination"
            >
              <span aria-hidden="true">←</span>
            </button>
            <button
              type="button"
              onClick={() => select(activeIndex + 1)}
              disabled={activeIndex === travelItems.length - 1}
              aria-label="Next destination"
            >
              <span aria-hidden="true">→</span>
            </button>
          </div>

          <a className="text-link text-link--light" href={activeItem.href} target="_blank" rel="noreferrer">
            Open full album <span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>
    </section>
  );
}
