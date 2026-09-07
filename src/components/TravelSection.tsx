import { useCallback, useEffect, useRef, useState } from "react";
import type { PointerEvent as ReactPointerEvent } from "react";
import { travelItems } from "../data/travel";

export function TravelSection() {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const itemRefs = useRef<Array<HTMLElement | null>>([]);
  const frameRef = useRef<number | null>(null);
  const dragRef = useRef({ active: false, startX: 0, scrollLeft: 0 });
  const activeIndexRef = useRef(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const activeItem = travelItems[activeIndex];

  const updateActiveItem = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;

    const center = track.scrollLeft + track.clientWidth / 2;
    let closestIndex = 0;
    let closestDistance = Number.POSITIVE_INFINITY;

    itemRefs.current.forEach((item, index) => {
      if (!item) return;
      const itemCenter = item.offsetLeft + item.offsetWidth / 2;
      const distance = Math.abs(center - itemCenter);
      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = index;
      }
    });

    activeIndexRef.current = closestIndex;
    setActiveIndex((current) => (current === closestIndex ? current : closestIndex));
  }, []);

  const onScroll = useCallback(() => {
    if (frameRef.current !== null) return;
    frameRef.current = window.requestAnimationFrame(() => {
      updateActiveItem();
      frameRef.current = null;
    });
  }, [updateActiveItem]);

  useEffect(() => {
    updateActiveItem();
    const observer = new ResizeObserver(() => {
      const track = trackRef.current;
      if (!track) return;
      track.scrollTo({ left: track.clientWidth * activeIndexRef.current, behavior: "instant" });
    });
    if (trackRef.current) observer.observe(trackRef.current);
    return () => {
      observer.disconnect();
      if (frameRef.current !== null) window.cancelAnimationFrame(frameRef.current);
    };
  }, [updateActiveItem]);

  const scrollToIndex = useCallback((index: number) => {
    const track = trackRef.current;
    const item = itemRefs.current[index];
    if (!track || !item) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches || document.documentElement.dataset.reducedMotion === "true";
    const left = item.offsetLeft - (track.clientWidth - item.offsetWidth) / 2;
    track.scrollTo({ left, behavior: reduceMotion ? "auto" : "smooth" });
  }, []);

  const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowRight" && activeIndex < travelItems.length - 1) {
      event.preventDefault();
      scrollToIndex(activeIndex + 1);
    }
    if (event.key === "ArrowLeft" && activeIndex > 0) {
      event.preventDefault();
      scrollToIndex(activeIndex - 1);
    }
    if (event.key === "Home") {
      event.preventDefault();
      scrollToIndex(0);
    }
    if (event.key === "End") {
      event.preventDefault();
      scrollToIndex(travelItems.length - 1);
    }
  };

  const onPointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== "mouse" || event.button !== 0) return;
    const track = trackRef.current;
    if (!track) return;

    dragRef.current = {
      active: true,
      startX: event.clientX,
      scrollLeft: track.scrollLeft,
    };
    setIsDragging(true);
    track.setPointerCapture(event.pointerId);
  };

  const onPointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    const track = trackRef.current;
    if (!track || !dragRef.current.active) return;
    track.scrollLeft = dragRef.current.scrollLeft - (event.clientX - dragRef.current.startX);
  };

  const endDrag = (event: ReactPointerEvent<HTMLDivElement>) => {
    const track = trackRef.current;
    if (!track || !dragRef.current.active) return;
    dragRef.current.active = false;
    setIsDragging(false);
    if (track.hasPointerCapture(event.pointerId)) track.releasePointerCapture(event.pointerId);
  };

  return (
    <section id="travel" className="travel-section section motion-scene" aria-labelledby="travel-title">
      <div className="container travel-intro">
        <div>
          <p className="kicker">Outside the interface / Travel Photo Dump</p>
          <h2 id="travel-title">KaburAja Dulu*</h2>
        </div>
        <p>
          A personal photography archive of streets, transport, architecture, signs,
          and everyday details collected away from product work.
        </p>
      </div>

      <div className="travel-experience">
        <div className="travel-echo travel-echo--left" aria-hidden="true"><img src={travelItems[(activeIndex + travelItems.length - 1) % travelItems.length].image} alt="" loading="lazy" /></div>
        <div className="travel-echo travel-echo--right" aria-hidden="true"><img src={travelItems[(activeIndex + 1) % travelItems.length].image} alt="" loading="lazy" /></div>
        <div className="travel-window-shell">
          <div className="travel-window-opening">
            <div
              ref={trackRef}
              className={isDragging ? "travel-album-track travel-album-track--dragging" : "travel-album-track"}
              role="region"
              aria-label="Travel destinations. Use left and right arrow keys to navigate."
              tabIndex={0}
              onScroll={onScroll}
              onKeyDown={onKeyDown}
              onPointerDown={onPointerDown}
              onPointerMove={onPointerMove}
              onPointerUp={endDrag}
              onPointerCancel={endDrag}
            >
              {travelItems.map((item, index) => (
                <figure
                  key={item.id}
                  ref={(element) => {
                    itemRefs.current[index] = element;
                  }}
                  className="travel-album"
                  aria-label={`${item.location}, ${item.country}, ${item.year}`}
                >
                  <img
                    src={item.image}
                    alt={item.alt}
                    width={item.width}
                    height={item.height}
                    loading="lazy"
                    decoding="async"
                    draggable={false}
                    style={{ objectPosition: item.imagePosition }}
                  />
                  <figcaption className="visually-hidden">
                    {item.location}, {item.country}, {item.year}
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>

          <img
            className="airplane-window-frame"
            src="/travel/airplane-window.png"
            alt=""
            aria-hidden="true"
            width="536"
            height="760"
          />
        </div>
      </div>

      <div className="container travel-destinations" aria-label="Choose a destination">
        {travelItems.map((item, index) => <button type="button" key={item.id} aria-pressed={index === activeIndex} onClick={() => scrollToIndex(index)}>{item.location}</button>)}
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
              onClick={() => scrollToIndex(activeIndex - 1)}
              disabled={activeIndex === 0}
              aria-label="Previous destination"
            >
              <span aria-hidden="true">←</span>
            </button>
            <button
              type="button"
              onClick={() => scrollToIndex(activeIndex + 1)}
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
