import { useEffect, useState } from "react";
import { siteContent } from "../data/site";

const navItems = [
  { label: "Work", href: "#work", id: "work" },
  { label: "About", href: "#about", id: "about" },
  { label: "Travel", href: "#travel", id: "travel" },
  { label: "Contact", href: "#contact", id: "contact" },
];

export function Navbar() {
  const [activeSection, setActiveSection] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
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

  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  return (
    <header className={scrolled ? "site-header site-header--scrolled" : "site-header"}>
      <nav className="site-nav container" aria-label="Primary navigation">
        <a className="wordmark" href="#top" aria-label={`${siteContent.identity.shortName}, home`}>
          <span aria-hidden="true">{siteContent.identity.monogram}</span>
          <span>{siteContent.identity.shortName}</span>
        </a>

        <button
          className="nav-toggle"
          type="button"
          aria-expanded={menuOpen}
          aria-controls="primary-links"
          onClick={() => setMenuOpen((current) => !current)}
        >
          <span>{menuOpen ? "Close" : "Menu"}</span>
        </button>

        <div id="primary-links" className={menuOpen ? "nav-links nav-links--open" : "nav-links"}>
          {navItems.map((item) => (
            <a
              key={item.id}
              href={item.href}
              aria-current={activeSection === item.id ? "location" : undefined}
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
            </a>
          ))}
        </div>
      </nav>
    </header>
  );
}
