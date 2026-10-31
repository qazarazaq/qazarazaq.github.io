import { ArrowLink, LinkArrow } from "./ArrowLink";
import { portfolioProjects, supportingProjects } from "../data/portfolio";
import { DeviceImage } from "./WorkMedia";
import { useEffect, useRef } from "react";

export function Hero() {
  const typeRef = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const word = typeRef.current;
    if (!word) return;
    const observer = new IntersectionObserver(([entry]) => { word.dataset.running = String(entry.isIntersecting); });
    observer.observe(word);
    return () => observer.disconnect();
  }, []);
  const [gold, food] = portfolioProjects;
  return <section id="top" className="hero" aria-labelledby="hero-title">
    <div className="container hero-copy">
      <h1 id="hero-title">Designing everyday<br /><span ref={typeRef} className="finance-type"><span className="visually-hidden">finance.</span><span className="finance-type__face finance-type__face--sans" aria-hidden="true">finance.</span><span className="finance-type__face finance-type__face--serif" aria-hidden="true">finance.</span><span className="finance-type__face finance-type__face--mono" aria-hidden="true">finance.</span></span></h1>
      <p>I’m Wildan, a UI/CX designer at Bank Mandiri in Jakarta, working across mobile banking and everyday services.</p>
      <div className="hero-actions"><a className="button" href="#work">View work<LinkArrow /></a><ArrowLink href="/resume/Wildan-Razaq-Ramadhan-Resume.pdf" external>Résumé</ArrowLink></div>
    </div>
    <div className="hero-track" aria-hidden="true">
      <div className="hero-art">
        <div className="hero-shot hero-shot--workspace"><div className="hero-layer" data-hero-layer="workspace"><DeviceImage screen={supportingProjects[0].screen} /></div></div>
        <div className="hero-shot hero-shot--food"><div className="hero-layer" data-hero-layer="food"><DeviceImage screen={food.screens[1]} /></div></div>
        <div className="hero-shot hero-shot--atm"><div className="hero-layer" data-hero-layer="atm"><DeviceImage screen={gold.screens[1]} /></div></div>
        <div className="hero-shot hero-shot--gold"><div className="hero-layer" data-hero-layer="gold"><DeviceImage screen={gold.screens[0]} priority /></div></div>
      </div>
    </div>
  </section>;
}
