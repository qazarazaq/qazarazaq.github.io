import { useState } from "react";
import { portfolioProjects, supportingProjects, type ProjectScreen } from "../data/portfolio";
import { ExperienceTiles } from "./ExperienceTiles";
import { DeviceImage, ScreenViewer } from "./WorkMedia";

function ProductContext({ devices }: { devices: readonly string[] }) {
  return <div className="product-context"><img src="/logos/mandiri.svg" alt="Bank Mandiri" width="213" height="62" />{devices.map(device => <img key={device} className="product-context__device" src={`/icons/device-${device}.svg`} alt={device === "phone" ? "Mobile app" : device === "atm" ? "ATM" : "Desktop"} width="18" height="18" />)}</div>;
}
function Preview({ screen, onPreview, className = "" }: { screen: ProjectScreen; onPreview: (screen: ProjectScreen) => void; className?: string }) {
  return <button type="button" className={`work-visual ${className}`} aria-label={`Enlarge ${screen.title}`} onClick={() => onPreview(screen)}><DeviceImage screen={screen} /></button>;
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
          <a className="quiet-link" href={gold.publicUrl} target="_blank" rel="noreferrer">View public product <span aria-hidden="true">↗</span></a>
        </div>
        <div className="feature-grid">
          <article className="feature-card feature-card--wide feature-card--gold" data-reveal>
            <div className="feature-copy"><h3>From Livin’<br />to the ATM.</h3><p>The pickup guide puts “Scan QR di ATM” first, with a separate link to locations. A direct next step when the journey moves from a phone to a machine.</p></div>
            <div className="feature-media" data-parallax><Preview screen={gold.screens[0]} onPreview={setPreview} /></div>
          </article>
          <article className="feature-card feature-card--atm" data-reveal>
            <div className="feature-copy"><h3>One piece.<br />One clear total.</h3><p>Gold weight and printing fees use different units. Separate labels and a shared summary keep the selected piece and fee visible while comparing brands.</p></div>
            <Preview screen={gold.screens[1]} onPreview={setPreview} className="atm-visual" />
          </article>
          <article className="feature-card feature-card--atm" data-reveal>
            <div className="feature-copy"><h3>Make collection<br />clear.</h3><p>Instructions carry the journey through to collecting the physical gold. City-grouped locations keep the name, address, and map action together.</p></div>
            <Preview screen={gold.screens[2]} onPreview={setPreview} className="atm-visual" />
          </article>
        </div>
      </div>
    </section>
    <section id="project-livin-food" className="food-section light-section" data-tone="light" aria-labelledby="food-title">
      <div className="container">
        <div className="project-heading" data-reveal><ProductContext devices={food.devices} /><p className="product-name">{food.title}</p><h2 id="food-title">{food.headline}</h2><p className="project-intro">{food.summary}</p><a className="quiet-link" href={food.publicUrl} target="_blank" rel="noreferrer">View public product <span aria-hidden="true">↗</span></a></div>
        <div className="feature-grid">
          <article className="feature-card feature-card--wide feature-card--food" data-reveal>
            <div className="feature-copy"><h3>A familiar path.<br />Different dining modes.</h3><p>Dine-in and delivery have their own entry points. The shared ordering structure connects restaurants, menus, and the cart without changing how each step works.</p></div>
            <div className="feature-media phone-pair" data-parallax><Preview screen={food.screens[0]} onPreview={setPreview} /><Preview screen={food.screens[1]} onPreview={setPreview} /></div>
          </article>
          <article className="feature-card feature-card--phone" data-reveal><div className="feature-copy"><h3>Categories that<br />stay familiar.</h3><p>The same category artwork and labels carry through scroll states. “Terdekat” stays a nearby shortcut as the category set grows.</p></div><div className="feature-media" data-parallax><Preview screen={food.screens[0]} onPreview={setPreview} /></div></article>
          <article className="feature-card feature-card--phone" data-reveal><div className="feature-copy"><h3>Know which cart<br />can continue.</h3><p>Available, closing, closed, or outside the delivery area: each state sits beside the saved order, where a customer decides what to do next.</p></div><div className="feature-media" data-parallax><Preview screen={food.screens[2]} onPreview={setPreview} /></div></article>
        </div>
      </div>
    </section>
    <section id="project-kopra" className="kopra-section light-section" data-tone="light" aria-labelledby="kopra-title">
      <div className="container">
        <div className="project-heading" data-reveal><ProductContext devices={kopra.devices} /><p className="product-name">{kopra.title}</p><h2 id="kopra-title">Invoice overview,<br />with the detail in reach.</h2><p className="project-intro">I worked on invoice overview, search, and status flows for customer-facing wholesale banking. The workspace brings dense invoice data into a consistent view.</p></div>
        <article className="feature-card feature-card--desktop" data-reveal><div className="desktop-card-copy"><h3>{kopra.title}</h3><p>Status filters, search, and a shared table keep invoice details together. Row labels distinguish where each invoice stands.</p></div><Preview screen={kopra.screen} onPreview={setPreview} /><p className="privacy-note">Names and financial values are masked for this portfolio.</p></article>
        <div className="feature-grid more-work">{more.map(project => <article key={project.title} className="feature-card feature-card--phone feature-card--supporting" data-reveal><div className="feature-copy"><h3>{project.title}</h3><p>{project.description}</p></div><div className="feature-media" data-parallax><Preview screen={project.screen} onPreview={setPreview} /></div></article>)}</div>
      </div>
    </section>
    {preview && <ScreenViewer screen={preview} onClose={() => setPreview(null)} />}
  </div>;
}
