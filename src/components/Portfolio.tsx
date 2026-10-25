import { ArrowLink } from "./ArrowLink";
import { useState } from "react";
import { portfolioProjects, supportingProjects, type ProjectScreen } from "../data/portfolio";
import { ExperienceTiles } from "./ExperienceTiles";
import { DeviceImage, ScreenViewer } from "./WorkMedia";

function ProductContext({ devices }: { devices: readonly string[] }) {
  return <div className="product-context"><img src="/logos/mandiri.svg" alt="Bank Mandiri" width="213" height="62" />{devices.map(device => <img key={device} className="product-context__device" src={`/icons/device-${device}.svg`} alt={device === "phone" ? "Mobile app" : device === "atm" ? "ATM" : "Desktop"} width="18" height="18" />)}</div>;
}
function Preview({ screen, onPreview, className = "" }: { screen: ProjectScreen; onPreview: (screen: ProjectScreen) => void; className?: string }) {
  return <button type="button" data-shot-motion={screen.kind === "atm" ? "atm" : screen.width > screen.height ? "desktop" : "phone"} className={`work-visual ${className}`} aria-label={`Enlarge ${screen.title}`} onClick={() => onPreview(screen)}><DeviceImage screen={screen} /></button>;
}

export function Portfolio() {
  const [preview, setPreview] = useState<ProjectScreen | null>(null);
  const [gold, food] = portfolioProjects;
  const [kopra, ...more] = supportingProjects;
  return <div id="work" className="work">
    <section className="gold-section dark-section" data-tone="dark" aria-labelledby="gold-title">
      <div className="container">
        <ExperienceTiles className="experience-tiles--work" />
        <div id="project-livin-gold" className="project-heading" data-reveal>
          <ProductContext devices={gold.devices} />
          <p className="product-name">{gold.title}</p>
          <h2 id="gold-title">{gold.headline}</h2>
          <p className="project-intro">{gold.summary}</p>
          <ArrowLink href={gold.publicUrl} external>View public product</ArrowLink>
        </div>
        <div className="feature-grid">
          <article className="feature-card feature-card--wide feature-card--gold" data-reveal>
            <div className="feature-copy"><h3>A guide for<br />the handoff.</h3><p>In Livin’, the guide brings the scan action and the location list together. Customers can check where to go, then scan when they reach the machine.</p></div>
            <div className="feature-media" data-parallax><Preview screen={gold.screens[0]} onPreview={setPreview} /></div>
          </article>
          <article className="feature-card feature-card--atm" data-reveal>
            <div className="feature-copy"><h3>Weight and fees,<br />shown separately.</h3><p>Customers choose one gold piece at a time. Weight and printing fees have separate labels, with the selected piece and total fee kept in view while comparing brands.</p></div>
            <Preview screen={gold.screens[1]} onPreview={setPreview} className="atm-visual" />
          </article>
          <article className="feature-card feature-card--atm" data-reveal>
            <div className="feature-copy"><h3>At the machine,<br />through to pickup.</h3><p>The ATM instructions continue through to collecting the gold. For finding a machine, the directory groups locations by city, with the name, address, and map link together.</p></div>
            <Preview screen={gold.screens[2]} onPreview={setPreview} className="atm-visual" />
          </article>
        </div>
      </div>
    </section>
    <section id="project-livin-food" className="food-section content-section" data-tone="dark" aria-labelledby="food-title">
      <div className="container">
        <div className="project-heading" data-reveal><ProductContext devices={food.devices} /><p className="product-name">{food.title}</p><h2 id="food-title">{food.headline}</h2><p className="project-intro">{food.summary}</p><ArrowLink href={food.publicUrl} external>View public product</ArrowLink></div>
        <div className="feature-grid">
          <article className="feature-card feature-card--wide feature-card--food" data-reveal>
            <div className="feature-copy"><h3>Start with how<br />you want to eat.</h3><p>Dine-in and delivery start differently, but the restaurant, menu, and cart need to work together. A shared ordering structure keeps the selected dining mode in context through each step.</p></div>
            <div className="feature-media phone-pair" data-parallax><Preview screen={food.screens[0]} onPreview={setPreview} /><Preview screen={food.screens[1]} onPreview={setPreview} /></div>
          </article>
          <article className="feature-card feature-card--phone" data-reveal><div className="feature-copy"><h3>Finding the right<br />category.</h3><p>The category artwork and labels stay consistent as customers scroll. I kept “Terdekat” as a nearby shortcut alongside the broader food categories.</p></div><div className="feature-media" data-parallax><Preview screen={food.screens[0]} onPreview={setPreview} /></div></article>
          <article className="feature-card feature-card--phone" data-reveal><div className="feature-copy"><h3>A saved cart<br />can change.</h3><p>Restaurant availability can change after an order is saved. The cart shows whether a place is closing, closed, or outside the delivery area before a customer continues.</p></div><div className="feature-media" data-parallax><Preview screen={food.screens[2]} onPreview={setPreview} /></div></article>
        </div>
      </div>
    </section>
    <section id="project-kopra" className="kopra-section content-section" data-tone="dark" aria-labelledby="kopra-title">
      <div className="container">
        <div className="project-heading" data-reveal><ProductContext devices={kopra.devices} /><p className="product-name">{kopra.title}</p><h2 id="kopra-title">Keeping track of invoices<br />and their status.</h2><p className="project-intro">I worked on the invoice overview, search, and status flows in Kopra SCM. There’s a lot to fit on one screen, so I focused on the information people need while working through the list.</p></div>
        <article className="feature-card feature-card--desktop" data-reveal><div className="desktop-card-copy"><h3>{kopra.title}</h3><p>Search and status filters sit above the invoice list. The rows keep the invoice details together, while status labels help distinguish where each one stands.</p></div><Preview screen={kopra.screen} onPreview={setPreview} /></article>
        <div className="feature-grid more-work">{more.map(project => <article key={project.title} className="feature-card feature-card--phone feature-card--supporting" data-reveal><div className="feature-copy"><h3>{project.title}</h3><p>{project.description}</p></div><div className="feature-media" data-parallax><Preview screen={project.screen} onPreview={setPreview} /></div></article>)}</div>
      </div>
    </section>
    {preview && <ScreenViewer screen={preview} onClose={() => setPreview(null)} />}
  </div>;
}
