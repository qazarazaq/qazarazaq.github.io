import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties } from "react";
import { HandDrawnMark } from "./HandDrawnMark";
import { siteContent } from "../data/site";

const navItems = [
  { label: "Work", href: "#work", id: "work" },
  { label: "About", href: "#about", id: "about" },
  { label: "Travel", href: "#travel", id: "travel" },
  { label: "Contact", href: "#contact", id: "contact" },
];

export function Navbar({ menuOpen, onMenuChange }: { menuOpen: boolean; onMenuChange: (open: boolean) => void }) {
  const navRef = useRef<HTMLElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const frameTimer = useRef<number>();
  const returnFocusFrame = useRef<number>();
  const unlockScroll = useRef<(() => void) | undefined>();
  const navigating = useRef(false);
  const [activeSection, setActiveSection] = useState("");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      setScrolled(window.scrollY > 24);
      const atBottom = window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 4;
      const anchor = Math.min(160, window.innerHeight * .25);
      let current = "";
      for (const item of navItems) {
        if ((document.getElementById(item.id)?.getBoundingClientRect().top ?? Infinity) <= anchor) current = item.id;
      }
      setActiveSection(atBottom ? "contact" : current);
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    window.addEventListener("hashchange", schedule);
    const observer = new ResizeObserver(schedule);
    observer.observe(document.body);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      window.removeEventListener("hashchange", schedule);
    };
  }, []);

  useLayoutEffect(() => {
    if (!menuOpen) return;
    const shell = document.getElementById("page-shell");
    if (!shell) return;
    window.clearTimeout(frameTimer.current);
    if (returnFocusFrame.current) cancelAnimationFrame(returnFocusFrame.current);
    shell.style.setProperty("--menu-scroll", `${window.scrollY}px`);
    shell.classList.remove("page-shell--menu-jump");
    shell.classList.add("page-shell--menu-framed");
    shell.inert = true;
    if (navRef.current) navRef.current.inert = true;
    if (!unlockScroll.current) {
      const bodyOverflow = document.body.style.overflow;
      const rootOverflow = document.documentElement.style.overflow;
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
      unlockScroll.current = () => {
        document.body.style.overflow = bodyOverflow;
        document.documentElement.style.overflow = rootOverflow;
      };
    }
    closeRef.current?.focus({ preventScroll: true });
    return () => {
      if (navRef.current) navRef.current.inert = false;
      const finish = () => {
        shell.inert = false;
        shell.classList.remove("page-shell--menu-framed");
        unlockScroll.current?.();
        unlockScroll.current = undefined;
      };
      if (navigating.current) {
        // Let a chosen section's native fragment jump happen without moving
        // the old viewport's clipped frame across the destination.
        finish();
        shell.classList.add("page-shell--menu-jump");
        frameTimer.current = window.setTimeout(() => shell.classList.remove("page-shell--menu-jump"), 50);
        navigating.current = false;
      } else {
        frameTimer.current = window.setTimeout(finish, window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 500);
        const returnTarget = window.innerWidth < 600 ? toggleRef.current : navRef.current?.querySelector<HTMLAnchorElement>("a");
        returnFocusFrame.current = requestAnimationFrame(() => returnTarget?.focus({ preventScroll: true }));
      }
    };
  }, [menuOpen]);

  useEffect(() => () => {
    window.clearTimeout(frameTimer.current);
    if (returnFocusFrame.current) cancelAnimationFrame(returnFocusFrame.current);
    const shell = document.getElementById("page-shell");
    if (shell) { shell.inert = false; shell.classList.remove("page-shell--menu-framed", "page-shell--menu-jump"); }
    unlockScroll.current?.();
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") { event.preventDefault(); onMenuChange(false); }
      if (event.key === "Tab") {
        const controls = dialogRef.current?.querySelectorAll<HTMLElement>("button,a");
        if (!controls?.length) return;
        const first = controls[0], last = controls[controls.length - 1];
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
        if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
      }
    };
    const onResize = () => { if (window.innerWidth >= 600) onMenuChange(false); else document.getElementById("page-shell")?.style.setProperty("--menu-scroll", `${window.scrollY}px`); };
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("resize", onResize);
    };
  }, [menuOpen, onMenuChange]);

  return (
    <header className={`site-header${scrolled ? " site-header--scrolled" : ""}${menuOpen ? " site-header--menu-open" : ""} site-header--dark`}>
      <svg className="glass-definitions" aria-hidden="true"><defs><filter id="nav-refraction" colorInterpolationFilters="sRGB"><feTurbulence type="fractalNoise" baseFrequency=".012 .018" numOctaves="1" seed="9" result="grain" /><feGaussianBlur in="grain" stdDeviation="1.5" result="soft-grain" /><feDisplacementMap in="SourceGraphic" in2="soft-grain" scale="7" xChannelSelector="R" yChannelSelector="G" /></filter></defs></svg>
      <nav ref={navRef} className="site-nav container" aria-label="Primary navigation">
        <a className="wordmark" href="#top" aria-label={`${siteContent.identity.shortName}, home`}>
          <span className="wordmark__icon" aria-hidden="true"><img className="wordmark__avatar" src="/assets/wildan-avatar.webp" alt="" width="64" height="64" /><HandDrawnMark /></span>
          <span>{siteContent.identity.shortName}</span>
        </a>

        <button
          ref={toggleRef}
          className="nav-toggle"
          type="button"
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          onClick={() => onMenuChange(!menuOpen)}
        >
          <span>Menu</span><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" aria-hidden="true"><path d="M12 5v14M5 12h14" /></svg>
        </button>

        <div id="primary-links" className="nav-links">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={item.href}
              aria-current={activeSection === item.id ? "location" : undefined}
            >
              {item.label}
            </a>
          ))}
        </div>
      </nav>
      <button type="button" className="mobile-menu-dismiss" aria-label="Close mobile navigation" aria-hidden="true" tabIndex={-1} onClick={() => onMenuChange(false)} />
      <div ref={dialogRef} id="mobile-menu" className={`mobile-menu${menuOpen ? " mobile-menu--open" : ""}`} role="dialog" aria-modal={menuOpen ? "true" : undefined} aria-label="Mobile navigation" aria-hidden={!menuOpen}>
        <button ref={closeRef} type="button" className="mobile-menu__close" aria-label="Close menu" tabIndex={menuOpen ? 0 : -1} onClick={() => onMenuChange(false)}><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18" /></svg></button>
        <nav aria-label="Mobile sections" className="mobile-menu__links">
          {navItems.map((item, index) => <a key={item.id} href={item.href} aria-current={activeSection === item.id ? "location" : undefined} tabIndex={menuOpen ? 0 : -1} style={{ "--menu-index": index } as CSSProperties} onClick={() => { navigating.current = true; onMenuChange(false); }}>{item.label}<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14m-6-6 6 6-6 6" /></svg></a>)}
        </nav>
      </div>
    </header>
  );
}
