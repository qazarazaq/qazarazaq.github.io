import { ArrowLink, LinkArrow } from "./ArrowLink";
import { portfolioProjects } from "../data/portfolio";
import { DeviceImage } from "./WorkMedia";

export function Hero() {
  const [gold, food] = portfolioProjects;
  return <section id="top" className="hero" aria-labelledby="hero-title">
    <div className="container hero-layout">
      <div className="hero-copy">
        <h1 id="hero-title"><span>Designing</span>{" "}<span>everyday</span>{" "}<span className="hero-word">finance.</span></h1>
        <p>I’m Wildan, a UI/CX designer at Bank Mandiri in Jakarta, working across mobile banking and everyday services.</p>
        <div className="hero-actions"><a className="button" href="#work">View work<LinkArrow /></a><ArrowLink href="/resume/Wildan-Razaq-Ramadhan-Resume.pdf" external>Résumé</ArrowLink></div>
      </div>
      <div className="hero-art" aria-hidden="true" data-depth="hero">
        <div className="hero-shot hero-shot--atm"><DeviceImage screen={gold.screens[1]} /></div>
        <div className="hero-shot hero-shot--food"><DeviceImage screen={food.screens[1]} /></div>
        <div className="hero-shot hero-shot--gold"><DeviceImage screen={gold.screens[0]} priority /></div>
      </div>
    </div>
  </section>;
}
