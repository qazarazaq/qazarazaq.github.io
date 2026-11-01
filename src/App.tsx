import { useEffect, useState } from "react";
import { About } from "./components/About";
import { Footer } from "./components/Footer";
import { Hero } from "./components/Hero";
import { Navbar } from "./components/Navbar";
import { Portfolio } from "./components/Portfolio";
import { TravelSection } from "./components/TravelSection";
import { useSceneMotion } from "./hooks/useSceneMotion";
import { DuoHero } from "./components/DuoHero";

const heroPreview = new URLSearchParams(window.location.search).get("hero");

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  useSceneMotion();
  useEffect(() => {
    // React mounts after the browser's initial fragment lookup.
    let target: string;
    try { target = decodeURIComponent(window.location.hash.slice(1)); } catch { return; }
    if (!target) return;
    const frame = requestAnimationFrame(() => document.getElementById(target)?.scrollIntoView());
    return () => cancelAnimationFrame(frame);
  }, []);
  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <Navbar menuOpen={menuOpen} onMenuChange={setMenuOpen} />
      <div id="page-shell" className="page-shell" data-menu-open={menuOpen}>
      <main id="main-content">
        {heroPreview === "duo" ? <DuoHero /> : <Hero mobileParallax={heroPreview === "parallax"} />}
        <Portfolio />
        <About />
        <TravelSection />
      </main>
      <Footer />
      </div>
      {(heroPreview === "duo" || heroPreview === "parallax") && <nav className="hero-review" aria-label="Hero preview comparison"><a href="?hero=duo#top" aria-current={heroPreview === "duo" ? "page" : undefined}>Fold preview</a><a href="?hero=parallax#top" aria-current={heroPreview === "parallax" ? "page" : undefined}>Parallax fallback</a></nav>}
    </>
  );
}

export default App;
