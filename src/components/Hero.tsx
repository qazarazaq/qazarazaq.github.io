import { ArrowLink } from "./ArrowLink";
import { portfolioProjects, supportingProjects } from "../data/portfolio";
import { DeviceImage } from "./WorkMedia";

const scenes = [
  { title: "Livin’ Gold / ATM Emas", detail: "The Livin’ app and the screens at the gold ATM.", screen: portfolioProjects[0].screens[0], notes: ["Choose a gold piece", "Check the printing fee", "Pick up at the ATM"] },
  { title: "Livin’ Food", detail: "Finding a meal, choosing an order, and paying for it.", screen: portfolioProjects[1].screens[0], notes: ["Find a restaurant", "Choose how to dine", "Check a saved cart"] },
  { title: "Kopra SCM", detail: "An invoice overview with search and status close by.", screen: supportingProjects[0].screen, notes: ["Search invoices", "Filter by status", "Keep the details together"] },
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
    <div className="hero-copy container" data-depth="intro">
      <h1 id="hero-title">Designing everyday finance.</h1>
      <p>I’m Wildan, a UI/CX designer at Bank Mandiri in Jakarta. Most of my work sits in banking and everyday services, from ordering food to picking up physical gold.</p>
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
      {["Gold", "Food", "Kopra"].map((label, i) => <button key={label} type="button" data-scene-target={i} aria-pressed={i === 0} onClick={() => goToScene(i)}><img src={i === 0 ? "/icons/gold.svg" : `/icons/device-${i === 2 ? "laptop" : "phone"}.svg`} alt="" width="16" height="16" />{label}</button>)}
      <ArrowLink href="#contact">Contact</ArrowLink>
    </nav>
  </section>;
}
