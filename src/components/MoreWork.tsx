import { useEffect, useRef, useState } from "react";
import { moreWorkProjects } from "../data/portfolio";
import { DeviceImage } from "./WorkMedia";
import { projectSlug } from "../data/caseStudies";
import { ProjectLink } from "../navigation/PageNavigation";

export function MoreWork() {
  const railRef = useRef<HTMLDivElement>(null);
  const [bounds, setBounds] = useState({ start: true, end: false });
  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;
    const update = () => {
      const start = rail.scrollLeft < 4, end = rail.scrollLeft + rail.clientWidth >= rail.scrollWidth - 4;
      setBounds(current => current.start === start && current.end === end ? current : { start, end });
    };
    rail.addEventListener("scroll", update, { passive: true });
    const observer = new ResizeObserver(update);
    observer.observe(rail);
    update();
    return () => { rail.removeEventListener("scroll", update); observer.disconnect(); };
  }, []);
  const move = (direction: number) => {
    const rail = railRef.current;
    if (!rail) return;
    const card = rail.querySelector("article");
    const step = (card?.getBoundingClientRect().width ?? 390) + parseFloat(getComputedStyle(rail).gap);
    rail.scrollBy({ left: direction * step, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
  };
  return <section className="more-work-section" aria-labelledby="more-work-title">
    <div className="container section-heading more-work-heading"><h2 id="more-work-title">More work</h2><div className="more-work-controls"><button type="button" aria-label="Previous projects" disabled={bounds.start} onClick={() => move(-1)}><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M19 12H5m6-6-6 6 6 6" /></svg></button><button type="button" aria-label="Next projects" disabled={bounds.end} onClick={() => move(1)}><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14m-6-6 6 6-6 6" /></svg></button></div></div>
    <div ref={railRef} className="more-work-rail" role="region" aria-roledescription="carousel" aria-label="More projects" tabIndex={0} onKeyDown={event => { if (event.target === event.currentTarget && (event.key === "ArrowLeft" || event.key === "ArrowRight")) { event.preventDefault(); move(event.key === "ArrowLeft" ? -1 : 1); } }}>
      {moreWorkProjects.map(project => <article key={project.title} className="supporting-project"><div className={`supporting-project__media${project.screen.width > project.screen.height ? " supporting-project__media--desktop" : ""}`}><ProjectLink slug={projectSlug(project.title)} className="work-visual" aria-label={`View ${project.title} project`}><DeviceImage screen={project.screen} /></ProjectLink></div><h3><ProjectLink slug={projectSlug(project.title)}>{project.title}</ProjectLink></h3><p>{project.description}</p></article>)}
    </div>
  </section>;
}
