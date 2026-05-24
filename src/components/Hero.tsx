import { Reveal } from "./Reveal";
import { socialLinks } from "../data/social";

const portraitSrc = "/assets/wildan-portrait.jpeg";

const focusAreas = ["Mobile banking", "Fintech", "Commerce", "Design systems"];
const tools = ["Figma", "Miro", "Jira", "Prototyping", "AI-assisted workflow"];

function BrandBadge({
  label,
  context,
  variant,
}: {
  label: string;
  context: string;
  variant: "mandiri" | "telkom";
}) {
  return (
    <div className={`brand-badge brand-badge--${variant}`}>
      <span className="brand-badge__mark">{label}</span>
      <span className="brand-badge__context">{context}</span>
    </div>
  );
}

function PillList({ items }: { items: string[] }) {
  return (
    <div className="hero-pill-list">
      {items.map((item) => (
        <span key={item}>{item}</span>
      ))}
    </div>
  );
}

export function Hero() {
  return (
    <section
      id="about"
      className="hero-dashboard relative isolate overflow-hidden px-5 pb-12 pt-24 text-white sm:px-8 sm:pt-28 lg:min-h-[100svh] lg:px-10 lg:pb-14"
      aria-labelledby="hero-title"
    >
      <div className="hero-dashboard__ambient" aria-hidden="true" />

      <div className="mx-auto grid max-w-[1180px] gap-6 lg:grid-cols-12 lg:items-stretch">
        <Reveal className="hero-copy-panel lg:col-span-7">
          <p className="eyebrow text-skyline">Product Designer / Bank Mandiri</p>
          <h1
            id="hero-title"
            className="mt-5 max-w-4xl text-[clamp(2.55rem,5vw,5.15rem)] font-extrabold leading-[0.95] tracking-normal text-white"
          >
            Wildan Razaq Ramadhan
          </h1>
          <p className="mt-6 max-w-3xl text-xl font-semibold leading-tight text-white sm:text-2xl lg:text-[2rem]">
            Product Designer for digital banking, commerce, and operational systems.
          </p>
          <p className="mt-5 max-w-2xl text-[0.98rem] leading-7 text-white/[0.68] sm:text-base">
            Currently designing product experiences at Bank Mandiri, with previous
            experience at Telkom Indonesia. I work across UX strategy, UI systems,
            interaction design, and high-fidelity product execution for financial and
            digital service products.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a className="btn btn-primary" href="#work">
              View Portfolio
            </a>
            <a className="btn btn-secondary" href="#travel">
              Explore Travel
            </a>
            <a
              className="btn btn-link"
              href={socialLinks.linkedin}
              target="_blank"
              rel="noreferrer"
            >
              LinkedIn
            </a>
          </div>
        </Reveal>

        <Reveal delay={0.08} className="lg:col-span-5">
          <figure className="hero-identity-card">
            <div className="hero-identity-card__status">Available for select opportunities</div>
            <div className="hero-identity-card__image">
              {/* Replace public/assets/wildan-portrait.jpeg with a newer editorial portrait when available. */}
              <img src={portraitSrc} alt="Portrait of Wildan Razaq Ramadhan" />
            </div>
            <figcaption className="hero-identity-card__meta">
              <span>Jakarta-based product designer</span>
              <strong>Banking, commerce, systems</strong>
            </figcaption>
            <div className="hero-identity-card__overlay" aria-hidden="true">
              <span>Open to work</span>
              <p>Recruiters, collaborators, and graduate opportunities</p>
            </div>
          </figure>
        </Reveal>

        <Reveal delay={0.14} className="lg:col-span-12">
          <div className="hero-module-grid">
            <div className="hero-module hero-module--worked">
              <p>Worked with</p>
              <div className="hero-brand-row">
                <BrandBadge label="mandiri" context="Current" variant="mandiri" />
                <BrandBadge label="Telkom Indonesia" context="Previous" variant="telkom" />
              </div>
            </div>
            <div className="hero-module">
              <p>Focus</p>
              <PillList items={focusAreas} />
            </div>
            <div className="hero-module">
              <p>Tools</p>
              <PillList items={tools} />
            </div>
            <div className="hero-module hero-module--strength">
              <p>Strength</p>
              <strong>Translating complex banking flows into clear user experiences</strong>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
