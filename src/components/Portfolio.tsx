import { useEffect, useRef, useState } from "react";
import { portfolioProjects, supportingProjects, type PortfolioProject, type ProjectScreen } from "../data/portfolio";

function ProductContext({ devices, medium }: { devices: readonly string[]; medium: string }) {
  return <div className="product-context" aria-label={`Bank Mandiri, ${medium}`}>
    <img className="product-context__brand" src="/logos/mandiri.svg" alt="Bank Mandiri" width="213" height="62" />
    <span className="product-context__devices">{devices.map(device => <img key={device} src={`/icons/device-${device}.svg`} width="20" height="20" alt={device === "phone" ? "Mobile app" : device === "laptop" ? "Desktop" : "ATM"} />)}</span>
  </div>;
}

function DeviceImage({ screen }: { screen: ProjectScreen }) {
  if (screen.kind === "atm") return <img src={screen.src} alt={screen.title} width={screen.width} height={screen.height} loading="lazy" decoding="async" />;
  if (screen.width > screen.height) {
    return <img src={screen.src} alt={screen.title} width={screen.width} height={screen.height} loading="lazy" decoding="async" />;
  }
  return <span className="phone-device"><img className="phone-device__hardware" src="/work/phone-frame.webp" alt="" aria-hidden="true" width="420" height="851" loading="lazy" /><img className="phone-device__screen" src={screen.src} alt={screen.title} width={screen.width} height={screen.height} loading="lazy" decoding="async" /><span className="phone-device__island" aria-hidden="true" /></span>;
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
    <dialog ref={dialogRef} className="screen-viewer" tabIndex={-1} aria-labelledby="viewer-title" onCancel={onClose} onClick={event => { if (event.target === event.currentTarget) onClose(); }}>
      <div className="screen-viewer__header"><div><h2 id="viewer-title">{screen.title}</h2><p>{screen.caption}</p></div><button type="button" onClick={onClose} aria-label="Close screen preview"><span aria-hidden="true">×</span></button></div>
      <div className="screen-viewer__image"><img src={screen.src} alt={screen.title} width={screen.width} height={screen.height} /></div>
    </dialog>
  );
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
        <div className="screen-gallery" aria-label={`${project.title} interface previews`}>
          {project.screens.slice(0, 3).map(screen => (
            <figure key={screen.src}>
              <button type="button" className={`screen-preview ${screen.kind === "atm" ? "screen-preview--atm" : ""}`} onClick={() => setPreview(screen)} aria-label={`Enlarge ${screen.title}`}>
                <DeviceImage screen={screen} />
              </button>
              <figcaption>{screen.title}</figcaption>
            </figure>
          ))}
        </div>
      </div>
      <div className="case-project__notes">
        <div><h4>The problem</h4><p>{project.problem}</p></div>
        <div><h4>Design focus</h4><p>{project.decisions[0].description}</p></div>
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

export function Portfolio() {
  const [preview, setPreview] = useState<ProjectScreen | null>(null);
  return (
    <section id="work" className="selected-work container" aria-labelledby="work-title">
      <div className="section-label"><h2 id="work-title">Selected work</h2></div>
      {portfolioProjects.map(project => <Project key={project.slug} project={project} />)}
      <div className="supporting-work"><h2>More of my work</h2><div className="supporting-work__grid">{supportingProjects.map(project => <article key={project.title} className={project.title === "Kopra SCM" ? "supporting-work__scm" : undefined}><button type="button" className={`supporting-preview ${project.title === "Kopra SCM" ? "supporting-preview--desktop" : ""}`} onClick={() => setPreview(project.screen)} aria-label={`Enlarge ${project.screen.title}`}><DeviceImage screen={project.screen} /></button><div className="supporting-work__overview"><ProductContext devices={project.devices} medium={project.medium} /><h3>{project.title}</h3><p className="supporting-work__subtitle">{project.medium}</p><p className="supporting-work__description">{project.description}</p></div></article>)}</div></div>
      {preview ? <ScreenViewer screen={preview} onClose={() => setPreview(null)} /> : null}
    </section>
  );
}
