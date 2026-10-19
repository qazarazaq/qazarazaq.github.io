import { useEffect, useRef, useState } from "react";
import { portfolioProjects, supportingProjects, type PortfolioProject, type ProjectScreen } from "../data/portfolio";

function ProductContext({ devices, medium }: { devices: readonly string[]; medium: string }) {
  return <div className="product-context" aria-label={`Bank Mandiri, ${medium}`}>
    <img className="product-context__brand" src="/logos/mandiri.svg" alt="Bank Mandiri" width="213" height="62" />
    <span className="product-context__devices">{devices.map(device => <img key={device} src={`/icons/device-${device}.svg`} width="20" height="20" alt={device === "phone" ? "Mobile app" : device === "laptop" ? "Desktop" : "ATM"} />)}</span>
  </div>;
}

function DeviceImage({ screen }: { screen: ProjectScreen }) {
  const [loadedSrc, setLoadedSrc] = useState<string | null>(null);
  if (screen.kind === "atm") return <img src={screen.src} alt={screen.title} width={screen.width} height={screen.height} loading="lazy" decoding="async" />;
  if (screen.width > screen.height) {
    return <img src={screen.src} alt={screen.title} width={screen.width} height={screen.height} loading="lazy" decoding="async" />;
  }
  return <span className="phone-device" data-ready={loadedSrc === screen.src}><img className="phone-device__hardware" src="/work/phone-frame.webp" alt="" aria-hidden="true" width="420" height="851" loading="lazy" /><img className="phone-device__screen" onLoad={() => setLoadedSrc(screen.src)} src={screen.src} alt={screen.title} width={screen.width} height={screen.height} loading="lazy" decoding="async" /><span className="phone-device__island" aria-hidden="true" /></span>;
}

function ScreenViewer({ screen, onClose }: { screen: ProjectScreen; onClose: () => void }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const dialog = dialogRef.current;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialog?.showModal();
    dialog?.focus({ preventScroll: true });
    return () => { dialog?.close(); document.body.style.overflow = previousOverflow; };
  }, []);
  return (
    <dialog ref={dialogRef} className={`screen-viewer${screen.width > screen.height ? " screen-viewer--desktop" : ""}`} tabIndex={-1} aria-labelledby="viewer-title" onCancel={onClose} onClick={event => { if (event.target === event.currentTarget) onClose(); }}>
      <div className="screen-viewer__header"><div><h2 id="viewer-title">{screen.title}</h2><p>{screen.caption}</p></div><button type="button" onClick={onClose} aria-label="Close screen preview"><span aria-hidden="true">×</span></button></div>
      <div className="screen-viewer__image"><img src={screen.src} alt={screen.title} width={screen.width} height={screen.height} /></div>
    </dialog>
  );
}

function ScreenGallery({ project, onPreview }: { project: PortfolioProject; onPreview: (screen: ProjectScreen) => void }) {
  const galleryRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const screens = project.screens.slice(0, 3);
  const select = (index: number, focus = false) => {
    const next = Math.max(0, Math.min(screens.length - 1, index));
    const card = galleryRef.current?.children[next] as HTMLElement | undefined;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches || document.documentElement.dataset.reducedMotion === "true";
    card?.scrollIntoView({ block: "nearest", inline: "center", behavior: reduced ? "instant" : "smooth" });
    if (focus) card?.querySelector("button")?.focus({ preventScroll: true });
  };
  return <div className="project-gallery">
    <div ref={galleryRef} className="screen-gallery" role="region" aria-label={`${project.title} interface previews`} tabIndex={0}
      onKeyDown={event => {
        if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
          event.preventDefault();
          select(activeIndex + (event.key === "ArrowLeft" ? -1 : 1), true);
        }
      }}
      onScroll={() => {
        const gallery = galleryRef.current;
        if (!gallery) return;
        const bounds = gallery.getBoundingClientRect();
        const center = bounds.left + bounds.width / 2;
        let nearest = 0;
        let distance = Infinity;
        Array.from(gallery.children).forEach((card, index) => {
          const box = card.getBoundingClientRect();
          const delta = Math.abs(box.left + box.width / 2 - center);
          if (delta < distance) { nearest = index; distance = delta; }
        });
        setActiveIndex(nearest);
      }}>
      {screens.map(screen => <figure key={screen.src}>
        <button type="button" className={`screen-preview ${screen.kind === "atm" ? "screen-preview--atm" : ""}`} onClick={() => onPreview(screen)} aria-label={`Enlarge ${screen.title}`}>
          <DeviceImage screen={screen} />
        </button>
        <figcaption>{screen.title}</figcaption>
      </figure>)}
    </div>
    <div className="screen-gallery-controls" aria-label={`${project.title} preview navigation`}>
      <button type="button" onClick={() => select(activeIndex - 1)} disabled={activeIndex === 0} aria-label={`Previous ${project.title} screen`}><span aria-hidden="true">←</span></button>
      <button type="button" onClick={() => select(activeIndex + 1)} disabled={activeIndex === screens.length - 1} aria-label={`Next ${project.title} screen`}><span aria-hidden="true">→</span></button>
    </div>
  </div>;
}

function Project({ project }: { project: PortfolioProject }) {
  const [preview, setPreview] = useState<ProjectScreen | null>(null);
  return (
    <article id={`project-${project.slug}`} className={`case-project case-project--${project.slug}`}>
      <div className="case-project__intro">
        <div className="case-project__copy">
          <ProductContext devices={project.devices} medium={project.medium} />
          <h3>{project.title}</h3>
          <p className="case-project__headline">{project.headline}</p>
          <p className="case-project__summary">{project.summary}</p>
          <a className="quiet-link" href={project.publicUrl} target="_blank" rel="noreferrer">View public product <span aria-hidden="true">↗</span></a>
        </div>
        <ScreenGallery project={project} onPreview={setPreview} />
      </div>
      <div className="case-project__notes">
        <div><h4>The challenge</h4><p>{project.problem}</p></div>
      </div>
      <details className="case-details">
        <summary>Explore the journey &amp; design decisions <span aria-hidden="true">+</span></summary>
        <div className="case-details__body">
          <h4>The customer journey</h4>
          <ol className="customer-journey">{project.flow.map(step => <li key={step}>{step}</li>)}</ol>
          <div className="decision-list">{project.decisions.map((decision, index) => <div key={decision.title} className="design-decision"><img src={`/icons/decision-${project.slug}-${index}.svg`} alt="" aria-hidden="true" width="24" height="24" /><div><h4>{decision.title}</h4><p>{decision.description}</p></div></div>)}</div>

        </div>
      </details>
      {preview ? <ScreenViewer screen={preview} onClose={() => setPreview(null)} /> : null}
    </article>
  );
}

type SupportingProjectData = (typeof supportingProjects)[number];

function SupportingOverview({ project }: { project: SupportingProjectData }) {
  return <div className="supporting-work__overview">
    <ProductContext devices={project.devices} medium={project.medium} />
    <h3>{project.title}</h3>
    <p className="supporting-work__subtitle">{project.medium}</p>
    <p className="supporting-work__description">{project.description}</p>
  </div>;
}

function SupportingProject({ project, onPreview }: { project: SupportingProjectData; onPreview: (screen: ProjectScreen) => void }) {
  const desktop = project.screen.width > project.screen.height;
  return <article className={desktop ? "supporting-work__scm" : undefined}>
    {desktop ? <SupportingOverview project={project} /> : null}
    <button type="button" className={`supporting-preview ${desktop ? "supporting-preview--desktop" : ""}`} onClick={() => onPreview(project.screen)} aria-label={`Enlarge ${project.screen.title}`}>
      <DeviceImage screen={project.screen} />
    </button>
    {desktop ? null : <SupportingOverview project={project} />}
  </article>;
}

export function Portfolio() {
  const [preview, setPreview] = useState<ProjectScreen | null>(null);
  return (
    <section id="work" className="selected-work container" aria-labelledby="work-title">
      <div className="section-label"><h2 id="work-title">Selected work</h2></div>
      {portfolioProjects.map(project => <Project key={project.slug} project={project} />)}
      <div className="supporting-work">
        <h2>More of my work</h2>
        <div className="supporting-work__grid">
          {supportingProjects.map(project => <SupportingProject key={project.title} project={project} onPreview={setPreview} />)}
        </div>
      </div>
      {preview ? <ScreenViewer screen={preview} onClose={() => setPreview(null)} /> : null}
    </section>
  );
}
