import { useEffect, useState } from "react";
import { siteContent } from "../data/site";

const navItems = [
  { label: "Work", href: "#work", id: "work" },
  { label: "Travel", href: "#travel", id: "travel" },
  { label: "About", href: "#about", id: "about" },
  { label: "Contact", href: "#contact", id: "contact" },
];

export function Navbar() {
  const [activeSection, setActiveSection] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
      if (window.scrollY < 40) setActiveSection("");
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = navItems
      .map((item) => document.getElementById(item.id))
      .filter((section): section is HTMLElement => Boolean(section));

    let observer: IntersectionObserver;
    const observe = () => {
      observer?.disconnect();
      // Percentage margins resolve against width, not height.
      observer = new IntersectionObserver(entries => {
        const visible = entries.find(entry => entry.isIntersecting);
        if (visible) setActiveSection(visible.target.id);
      }, { rootMargin: `-${window.innerHeight * .15}px 0px -${window.innerHeight * .7}px 0px`, threshold: 0 });
      sections.forEach(section => observer.observe(section));
    };
    observe();
    window.addEventListener("resize", observe);
    return () => { observer.disconnect(); window.removeEventListener("resize", observe); };
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
