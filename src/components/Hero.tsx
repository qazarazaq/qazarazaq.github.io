import { portfolioProjects, supportingProjects } from "../data/portfolio";
import { DeviceImage } from "./WorkMedia";

const scenes = [
  { title: "Livin’ Gold / ATM Emas", detail: "A mobile journey that continues at the ATM.", screen: portfolioProjects[0].screens[0], notes: ["Choose a gold piece", "Understand the printing fee", "Collect at the ATM"] },
  { title: "Livin’ Food", detail: "Discovery, dining modes, and the order ahead.", screen: portfolioProjects[1].screens[0], notes: ["Find a restaurant", "Choose how to dine", "Continue the right cart"] },
  { title: "Kopra SCM", detail: "Invoice overview, search, and status in one workspace.", screen: supportingProjects[0].screen, notes: ["Search invoices", "Filter by status", "Keep the details together"] },
];

export function Hero() {
  const goToScene = (index: number) => {
    const scene = document.getElementById("hero-scenes");
    if (!scene) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const target = scene.getBoundingClientRect().top + window.scrollY + [0, .48, .8][index] * (scene.offsetHeight - window.innerHeight + 120);
    window.scrollTo({ top: target, behavior: reduced ? "instant" : "smooth" });
  };
  return <section id="top" className="hero" data-phase="0" data-dock="true" aria-labelledby="hero-title">
    <div className="hero-copy container">
      <h1 id="hero-title">Designing everyday finance.</h1>
      <p>I’m Wildan, a UI/CX designer at Bank Mandiri. I work on mobile banking, commerce, and the moments where digital journeys meet the physical world.</p>
    </div>
    <div id="hero-scenes" className="hero-scenes">
      <div className="hero-stage">
        {scenes.map((scene, i) => <div key={scene.title} className={`hero-scene hero-scene--${i}`} aria-hidden={i > 0 ? "true" : undefined} data-hero-layer={i}>
          <div className="hero-scene__label"><strong>{scene.title}</strong><span>{scene.detail}</span></div>
          <div className={`hero-scene__device${i === 2 ? " hero-scene__device--desktop" : ""}`}><DeviceImage screen={scene.screen} /></div>
          <div className="hero-notes">{scene.notes.map((note, n) => <div key={note} className={`hero-note hero-note--${n}`}><img src={`/icons/device-${i === 2 ? "laptop" : i === 0 && n === 2 ? "atm" : "phone"}.svg`} alt="" width="24" height="24" /><span>{note}</span></div>)}</div>
        </div>)}
      </div>
    </div>
    <nav className="scene-dock" aria-label="Explore selected work">
      {["Gold", "Food", "Kopra"].map((label, i) => <button key={label} type="button" data-scene-target={i} aria-pressed={i === 0} onClick={() => goToScene(i)}><img src={`/icons/device-${i === 2 ? "laptop" : i === 0 ? "atm" : "phone"}.svg`} alt="" width="16" height="16" />{label}</button>)}
      <a href="#contact">Contact <span aria-hidden="true">↗</span></a>
    </nav>
  </section>;
}
