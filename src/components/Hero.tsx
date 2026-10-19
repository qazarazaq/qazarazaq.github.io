import { ExperienceTiles } from "./ExperienceTiles";

export function Hero() {
  return (
    <section id="top" className="intro container" aria-labelledby="hero-title">
      <h1 id="hero-title">Making everyday finance<br className="desktop-break" /> easier to navigate.</h1>
      <p className="intro__description">I’m Wildan, a UI/CX designer at Bank Mandiri. I work on mobile banking, commerce, and the moments where digital journeys meet the physical world.</p>
      <div className="intro__foot">
        <p>Jakarta, Indonesia</p>
        <a href="#work">View selected work <span aria-hidden="true">↓</span></a>
      </div>
      <ExperienceTiles className="experience-tiles--hero" />
    </section>
  );
}
