import { ArrowLink, LinkArrow } from "./ArrowLink";
import { portfolioProjects, supportingProjects } from "../data/portfolio";
import { DeviceImage } from "./WorkMedia";

export function Hero() {
  const [gold] = portfolioProjects;
  return <section id="top" className="hero" aria-labelledby="hero-title">
    <div className="container hero-layout">
      <div className="hero-copy">
        <h1 id="hero-title"><span>Designing</span>{" "}<span>everyday</span>{" "}<span className="hero-word">finance.</span></h1>
        <p>I’m Wildan, a UI/CX designer at Bank Mandiri in Jakarta, working across mobile banking and everyday services.</p>
        <div className="hero-actions"><a className="button" href="#work">View work<LinkArrow /></a><ArrowLink href="/resume/Wildan-Razaq-Ramadhan-Resume.pdf" external>Résumé</ArrowLink></div>
      </div>
      <div className="hero-art" aria-hidden="true">
        <div className="hero-shot hero-shot--workspace"><div className="hero-layer" data-hero-layer="workspace"><DeviceImage screen={supportingProjects[0].screen} /></div></div>
        <div className="hero-shot hero-shot--atm"><div className="hero-layer" data-hero-layer="atm"><DeviceImage screen={gold.screens[1]} /></div></div>
        <div className="hero-shot hero-shot--gold"><div className="hero-layer" data-hero-layer="gold"><DeviceImage screen={gold.screens[0]} priority /></div></div>
      </div>
    </div>
  </section>;
}
