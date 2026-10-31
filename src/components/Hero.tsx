import { useState } from "react";
import { ArrowLink, LinkArrow } from "./ArrowLink";
import { portfolioProjects, supportingProjects } from "../data/portfolio";
import { DeviceImage } from "./WorkMedia";

const projects = [
  { title: "Livin’ Gold / ATM Emas", detail: "From the app to physical gold", href: "#project-livin-gold" },
  { title: "Livin’ Food", detail: "Discovery, ordering, and saved carts", href: "#project-livin-food" },
  { title: "Kopra SCM", detail: "Invoices, search, and status", href: "#project-kopra" },
];

export function Hero() {
  const [active, setActive] = useState(0);
  return <section id="top" className="hero" aria-labelledby="hero-title">
    <div className="container hero-layout">
      <div className="hero-copy">
        <h1 id="hero-title">Designing<br />everyday finance.</h1>
        <p>I’m Wildan, a UI/CX designer at Bank Mandiri in Jakarta. I work on the details that connect a banking journey to its finished interface.</p>
        <div className="hero-actions"><a className="button" href="#work">View work<LinkArrow /></a><ArrowLink href="/resume/Wildan-Razaq-Ramadhan-Resume.pdf" external>Résumé</ArrowLink></div>
        <nav className="project-index" aria-label="Selected projects">{projects.map((project, index) => <a key={project.href} href={project.href} data-active={active === index} onPointerEnter={() => setActive(index)} onFocus={() => setActive(index)}><span><strong>{project.title}</strong><span>{project.detail}</span></span><LinkArrow /></a>)}</nav>
      </div>
      <div className="hero-art" aria-hidden="true" data-depth="hero">
        <div className="hero-art__layer hero-art__layer--gold" data-active={active === 0}><div className="hero-art__phone"><DeviceImage screen={portfolioProjects[0].screens[0]} priority /></div><div className="hero-art__atm"><DeviceImage screen={portfolioProjects[0].screens[1]} /></div></div>
        <div className="hero-art__layer hero-art__layer--food" data-active={active === 1}><div className="hero-art__phone"><DeviceImage screen={portfolioProjects[1].screens[1]} /></div><div className="hero-art__food-cart"><DeviceImage screen={portfolioProjects[1].screens[2]} /></div></div>
        <div className="hero-art__layer hero-art__layer--kopra" data-active={active === 2}><img src={supportingProjects[0].screen.src} alt="" width="1154" height="844" loading="lazy" /></div>
      </div>
    </div>
  </section>;
}
