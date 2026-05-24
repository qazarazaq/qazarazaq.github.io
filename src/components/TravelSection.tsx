import { useCallback, useEffect, useMemo, useState } from "react";
import { travelItems } from "../data/travel";

type TravelMode = "desktop" | "tablet" | "mobile";

type SlideStyle = {
  left: number;
  width: number;
  height: number;
  scale: number;
  opacity: number;
  blur: number;
  zIndex: number;
  textOpacity: number;
  titleSize: number;
  yearSize: number;
};

const desktopLayout: Record<number, SlideStyle> = {
  "-2": { left: 10.2, width: 8.8, height: 52, scale: 0.82, opacity: 0.2, blur: 1.6, zIndex: 1, textOpacity: 0.14, titleSize: 32, yearSize: 12 },
  "-1": { left: 28, width: 13.8, height: 68, scale: 0.92, opacity: 0.88, blur: 0.2, zIndex: 2, textOpacity: 0.62, titleSize: 42, yearSize: 15 },
  0: { left: 50, width: 17.2, height: 86, scale: 1, opacity: 1, blur: 0, zIndex: 5, textOpacity: 1, titleSize: 54, yearSize: 17 },
  1: { left: 72, width: 13.8, height: 68, scale: 0.92, opacity: 0.88, blur: 0.2, zIndex: 2, textOpacity: 0.62, titleSize: 42, yearSize: 15 },
  2: { left: 89.8, width: 8.8, height: 52, scale: 0.82, opacity: 0.2, blur: 1.6, zIndex: 1, textOpacity: 0.14, titleSize: 32, yearSize: 12 },
};

const tabletLayout: Record<number, SlideStyle> = {
  "-2": { left: 8.5, width: 9.5, height: 50, scale: 0.82, opacity: 0.18, blur: 1.5, zIndex: 1, textOpacity: 0.14, titleSize: 24, yearSize: 11 },
  "-1": { left: 25.5, width: 15, height: 66, scale: 0.92, opacity: 0.86, blur: 0.2, zIndex: 2, textOpacity: 0.62, titleSize: 32, yearSize: 13 },
  0: { left: 50, width: 22, height: 84, scale: 1, opacity: 1, blur: 0, zIndex: 5, textOpacity: 1, titleSize: 40, yearSize: 15 },
  1: { left: 74.5, width: 15, height: 66, scale: 0.92, opacity: 0.86, blur: 0.2, zIndex: 2, textOpacity: 0.62, titleSize: 32, yearSize: 13 },
  2: { left: 91.5, width: 9.5, height: 50, scale: 0.82, opacity: 0.18, blur: 1.5, zIndex: 1, textOpacity: 0.14, titleSize: 24, yearSize: 11 },
};

const mobileLayout: Record<number, SlideStyle> = {
  "-2": { left: 2.5, width: 8.5, height: 44, scale: 0.84, opacity: 0.2, blur: 1.4, zIndex: 1, textOpacity: 0.14, titleSize: 18, yearSize: 10 },
  "-1": { left: 15.5, width: 13.5, height: 58, scale: 0.9, opacity: 0.86, blur: 0.2, zIndex: 2, textOpacity: 0.62, titleSize: 22, yearSize: 11 },
  0: { left: 50, width: 52, height: 82, scale: 1, opacity: 1, blur: 0, zIndex: 5, textOpacity: 1, titleSize: 30, yearSize: 12 },
  1: { left: 84.5, width: 13.5, height: 58, scale: 0.9, opacity: 0.86, blur: 0.2, zIndex: 2, textOpacity: 0.62, titleSize: 22, yearSize: 11 },
  2: { left: 97.5, width: 8.5, height: 44, scale: 0.84, opacity: 0.2, blur: 1.4, zIndex: 1, textOpacity: 0.14, titleSize: 18, yearSize: 10 },
};

const layouts: Record<TravelMode, Record<number, SlideStyle>> = {
  desktop: desktopLayout,
  tablet: tabletLayout,
  mobile: mobileLayout,
};

function getMode(): TravelMode {
  if (typeof window === "undefined") return "desktop";
  if (window.innerWidth < 768) return "mobile";
  if (window.innerWidth < 1100) return "tablet";
  return "desktop";
}

function wrapIndex(value: number, length: number) {
  return ((value % length) + length) % length;
}

function getOffset(index: number, activeIndex: number, length: number) {
  let offset = index - activeIndex;
  if (offset > length / 2) offset -= length;
  if (offset < -length / 2) offset += length;
  return offset;
}

function PlaneIcon({ active }: { active: boolean }) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 33 33"
      fill="none"
      aria-hidden="true"
      className={active ? "travel-plane travel-plane--active" : "travel-plane"}
    >
      <path
        d="M29.8826 8.511C27.1461 5.01073 22.2399 3.97132 18.3082 5.98779C16.6494 6.83853 14.9958 7.70559 13.3455 8.57096C12.5262 9.00053 11.7077 9.42971 10.8899 9.85624C10.1575 10.2381 9.83419 10.3079 9.61054 10.2736C9.39249 10.2403 9.10911 10.0824 8.54089 9.48863C8.25563 9.19054 8.00601 8.86072 7.71483 8.56779C7.39318 8.2442 6.94012 7.86561 6.35558 7.76444C6.08625 7.71782 5.83574 7.74325 5.5882 7.7954C4.92653 7.93482 4.20833 8.12945 3.58706 8.39935C2.66003 8.80209 2.15588 9.61809 2.33213 10.6183C2.39215 10.9589 2.51378 11.3642 2.65402 11.8314L3.10605 13.3378C3.44533 14.4685 3.71971 15.3829 4.03429 16.0729C4.36179 16.7912 4.77196 17.3578 5.43415 17.7051C6.09414 18.0511 6.79829 18.071 7.58567 17.9415C8.34526 17.8164 9.27438 17.5348 10.4278 17.1851L13.648 16.2091C13.7434 16.1802 13.8357 16.2623 13.8179 16.3604L13.46 18.3362C13.2813 19.3225 14.2164 20.1017 15.1447 19.8203L18.1329 18.9145C18.969 18.661 19.6751 18.0914 20.0943 17.3276C20.1012 17.3149 20.1078 17.302 20.1139 17.2889L21.6488 14.0021C21.7248 13.8395 21.8652 13.7183 22.0338 13.6672L28.8519 11.6006C30.0946 11.2213 30.7708 9.66572 29.8858 8.51512L29.8826 8.511Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2.16233 27.6079C2.13942 26.8719 2.71751 26.2566 3.45354 26.2337L24.7765 25.57C25.5126 25.5471 26.1278 26.1252 26.1507 26.8612C26.1736 27.5972 25.5955 28.2125 24.8595 28.2354L3.5365 28.8991C2.80048 28.922 2.18524 28.3439 2.16233 27.6079Z"
        fill="currentColor"
      />
    </svg>
  );
}

function TravelMark() {
  return (
    <div className="travel-mark" aria-label="KaburAja Dulu">
      <span className="travel-mark__base">KaburAja</span>
      <span className="travel-mark__editorial">Dulu</span>
      <span className="travel-mark__star">*</span>
    </div>
  );
}

function TravelCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [mode, setMode] = useState<TravelMode>(() => getMode());
  const [isButtonActive, setIsButtonActive] = useState(false);
  const activeItem = travelItems[activeIndex];

  const move = useCallback((direction: number) => {
    setActiveIndex((current) => wrapIndex(current + direction, travelItems.length));
  }, []);

  useEffect(() => {
    const onResize = () => setMode(getMode());
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (target?.tagName === "INPUT" || target?.tagName === "TEXTAREA" || target?.isContentEditable) {
        return;
      }
      if (event.key === "ArrowRight") {
        event.preventDefault();
        move(1);
      }
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        move(-1);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [move]);

  const layout = layouts[mode];
  const height = mode === "mobile" ? 420 : 460;
  const imageRailHeight = Math.round(height * 0.78);
  const textRailHeight = height - imageRailHeight;

  const slides = useMemo(
    () =>
      travelItems
        .map((item, index) => ({
          item,
          index,
          offset: getOffset(index, activeIndex, travelItems.length),
        }))
        .filter(({ offset }) => Math.abs(offset) <= 2),
    [activeIndex],
  );

  return (
    <div className="travel-carousel" style={{ height }}>
      <div className="travel-carousel__images" style={{ height: imageRailHeight }}>
        {slides.map(({ item, index, offset }) => {
          const slide = layout[offset];
          const isActive = offset === 0;

          return (
            <button
              key={item.title}
              type="button"
              className={isActive ? "travel-slide travel-slide--active" : "travel-slide"}
              aria-label={`Show ${item.title}`}
              onClick={() => {
                if (!isActive) setActiveIndex(index);
              }}
              style={{
                left: `${slide.left}%`,
                width: `${slide.width}%`,
                height: `${slide.height}%`,
                opacity: slide.opacity,
                filter: `blur(${slide.blur}px)`,
                transform: `translate(-50%, -50%) scale(${slide.scale})`,
                zIndex: slide.zIndex,
              }}
            >
              <span className="travel-slide__image">
                <img
                  src={item.image}
                  alt={`${item.title} travel photo album cover`}
                  draggable={false}
                  loading={isActive ? "eager" : "lazy"}
                />
              </span>
            </button>
          );
        })}

        <button
          type="button"
          className="travel-arrow travel-arrow--left"
          aria-label="Previous travel album"
          onClick={() => move(-1)}
        >
          <span aria-hidden="true">‹</span>
        </button>
        <button
          type="button"
          className="travel-arrow travel-arrow--right"
          aria-label="Next travel album"
          onClick={() => move(1)}
        >
          <span aria-hidden="true">›</span>
        </button>
      </div>

      <div className="travel-carousel__labels" style={{ height: textRailHeight }}>
        {slides.map(({ item, offset }) => {
          const slide = layout[offset];
          const isActive = offset === 0;

          return (
            <div
              key={`label-${item.title}`}
              className={isActive ? "travel-label travel-label--active" : "travel-label"}
              style={{
                left: `${slide.left}%`,
                opacity: slide.textOpacity,
                zIndex: slide.zIndex,
              }}
            >
              <p style={{ fontSize: slide.titleSize }}>{item.title}</p>
              <span style={{ fontSize: slide.yearSize }}>{item.year}</span>
            </div>
          );
        })}

        <a
          className={isButtonActive ? "travel-reminisce travel-reminisce--active" : "travel-reminisce"}
          href={activeItem.href}
          target="_blank"
          rel="noreferrer"
          aria-label={`Open ${activeItem.title} album`}
          onMouseEnter={() => setIsButtonActive(true)}
          onMouseLeave={() => setIsButtonActive(false)}
          onFocus={() => setIsButtonActive(true)}
          onBlur={() => setIsButtonActive(false)}
        >
          <span>Reminisce</span>
          <PlaneIcon active={isButtonActive} />
        </a>
      </div>
    </div>
  );
}

function TravelModule() {
  return (
    <div className="travel-module" aria-label="KaburAja Dulu travel photo dump module">
      <div className="travel-module__inner">
        <div className="travel-module__header">
          <TravelMark />
          <p>Travel Photo Dump</p>
        </div>
        <img
          src="/travel/airplane-window.png"
          alt=""
          aria-hidden="true"
          className="travel-window"
        />
        <TravelCarousel />
      </div>
    </div>
  );
}

export function TravelSection() {
  return (
    <section id="travel" className="bg-[#060503]">
      <TravelModule />
    </section>
  );
}
