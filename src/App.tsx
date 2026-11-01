import { useEffect, useState } from "react";
import { About } from "./components/About";
import { Footer } from "./components/Footer";
import { Hero } from "./components/Hero";
import { Navbar } from "./components/Navbar";
import { Portfolio } from "./components/Portfolio";
import { TravelSection } from "./components/TravelSection";
import { useSceneMotion } from "./hooks/useSceneMotion";

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
        <Hero />
        <Portfolio />
        <About />
        <TravelSection />
      </main>
      <Footer />
      </div>
    </>
  );
}

export default App;
