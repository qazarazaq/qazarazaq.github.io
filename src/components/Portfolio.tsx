import { useState } from "react";
import { ArrowLink, LinkArrow } from "./ArrowLink";
import { portfolioProjects, supportingProjects, type ProjectScreen } from "../data/portfolio";
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
    <section id="project-livin-gold" className="project-section gold-section" aria-labelledby="gold-title">
      <div className="container">
        <div className="project-heading" data-reveal>
          <div><ProductContext devices={gold.devices} /><p className="product-name">{gold.title}</p><h2 id="gold-title">From Livin’ to<br />physical gold.</h2></div>
          <div className="project-heading__detail"><p>I designed the mobile and ATM interfaces for physical gold pickup: the guide, denomination selection, printing fees, and pickup instructions.</p><ArrowLink href={gold.publicUrl} external>See the live product</ArrowLink></div>
        </div>
        <div className="gold-evidence" data-reveal>
          {gold.screens.map((screen, i) => <figure key={screen.src}><div className="gold-evidence__screen"><Preview screen={screen} onPreview={setPreview} className={i ? "atm-visual" : ""} /></div><figcaption>{["Guide and scan action in Livin’", "Gold weight and printing fee at the ATM", "Instructions through to collection"][i]}</figcaption></figure>)}
        </div>
        <div className="decision-grid" data-reveal>
          <article><h3>Grams and rupiah,<br />kept separate.</h3><p>Customers choose one piece from one brand. Gold weight and the printing fee have different labels, with the selected piece and total fee kept in view while comparing options.</p><p className="decision-detail">The customer can compare the selected piece and its fee without switching views.</p></article>
          <article><h3>A handoff with<br />a next step.</h3><p>“Scan QR di ATM” is the main action in the mobile guide. ATM locations stay one step away as a secondary link; finding a machine and starting a pickup have different priorities.</p><p className="decision-detail">The final ATM screen asks the customer to collect the gold before leaving.</p></article>
        </div>
      </div>
    </section>
    <section id="project-livin-food" className="project-section food-section" aria-labelledby="food-title">
      <div className="container">
        <div className="project-heading" data-reveal><div><ProductContext devices={food.devices} /><p className="product-name">{food.title}</p><h2 id="food-title">An order starts<br />before the menu.</h2></div><div className="project-heading__detail"><p>My work on Livin’ Food covered restaurant discovery, categories, menu selection, and cart states, connecting dine-in and delivery orders with payment.</p><ArrowLink href={food.publicUrl} external>See the live product</ArrowLink></div></div>
        <div className="food-ordering" data-reveal>
          <div className="food-ordering__copy"><h3>Keep the dining<br />mode in context.</h3><p>Delivery, pick-up, and dine-in begin in the same discovery area. The selected mode stays visible as customers move into a restaurant and its menu.</p><p>Categories use consistent artwork and labels across scroll states. “Terdekat” remains a nearby shortcut alongside the broader food categories.</p></div>
          <div className="food-ordering__screens">{food.screens.slice(0, 2).map((screen, i) => <figure key={screen.src}><Preview screen={screen} onPreview={setPreview} /><figcaption>{i ? "Restaurant and menu" : "Dining modes and discovery"}</figcaption></figure>)}</div>
        </div>
        <div className="cart-story" data-reveal>
          <div className="cart-story__visual"><Preview screen={food.screens[2]} onPreview={setPreview} /></div>
          <div className="cart-story__copy"><h3>A saved cart<br />isn’t always ready.</h3><p>A restaurant may close or fall outside the delivery area after an order is saved. Those states belong beside the cart, where a customer decides whether to continue.</p><div className="cart-states"><div><strong>Available</strong><p>Available carts stay visually active.</p></div><div><strong>Closing soon</strong><p>The ordering deadline stays beside the saved order.</p></div><div><strong>Closed or out of range</strong><p>Muted carts explain whether the restaurant is closed or too far away.</p></div></div></div>
        </div>
      </div>
    </section>
    <section id="project-kopra" className="project-section kopra-section" aria-labelledby="kopra-title">
      <div className="container">
        <div className="project-heading" data-reveal><div><ProductContext devices={kopra.devices} /><p className="product-name">{kopra.title}</p><h2 id="kopra-title">Find the invoice.<br />Read its status.</h2></div><div className="project-heading__detail"><p>I worked on the invoice overview, search, and status flows in Kopra SCM. The challenge was fitting a dense set of records into a workspace people could work through.</p><button type="button" className="text-link" onClick={() => setPreview(kopra.screen)}>View the full workspace<LinkArrow /></button></div></div>
        <figure className="kopra-evidence" data-reveal><button type="button" className="work-visual kopra-evidence__crop" aria-label="Enlarge Kopra SCM invoice overview & status" onClick={() => setPreview(kopra.screen)}><img src={kopra.screen.src} alt="Kopra SCM search, status filters, and invoice column hierarchy" width="1154" height="844" loading="lazy" /></button><figcaption>Search, status filters, and invoice details share the same workspace.</figcaption></figure>
        <div className="kopra-decisions" data-reveal><article><h3>Find the record.</h3><p>An invoice number or a buyer name can be the starting point. The same search accepts either; status filters narrow the list in place.</p></article><article><h3>Read the status.</h3><p>Pending approval and pending bank approval remain distinct, rather than sharing a generic “pending” label. Rejected records have their own status.</p></article><article><h3>Keep the context.</h3><p>Status sits in the first column, alongside the invoice number, buyer, amount, and dates. The list keeps the record and its status together.</p></article></div>
      </div>
    </section>
    <section className="more-work-section" aria-labelledby="more-work-title"><div className="container"><div className="section-heading" data-reveal><h2 id="more-work-title">More work</h2><p>Other journeys I’ve worked on inside Livin’.</p></div><div className="more-work-grid">{more.map(project => <article key={project.title} className="supporting-project" data-reveal><div className="supporting-project__media"><Preview screen={project.screen} onPreview={setPreview} /></div><div><h3>{project.title}</h3><p>{project.title === "Livin Auto" ? "Vehicle discovery, credit simulation, and reusable interface states for the financing application." : "The donation journey, from campaign context and amount selection through to review and payment."}</p></div></article>)}</div></div></section>
    {preview && <ScreenViewer screen={preview} onClose={() => setPreview(null)} />}
  </div>;
}
