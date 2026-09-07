import { useState } from "react";
import type { CSSProperties } from "react";
import { portfolioProjects, type PortfolioProject } from "../data/portfolio";

function ProjectVisual({ project, index }: { project: PortfolioProject; index: number }) {
  const [selected, setSelected] = useState(0);
  return (
    <div className={`project-visual project-visual--${index}`}>
      <div className="project-visual__top"><span>{project.platform.join(" / ")}</span><span>Journey map / 0{index + 1}</span></div>
      <div className="journey-composition">
        <span className="journey-composition__word" aria-hidden="true">{project.systemMap[selected]}</span>
        <div className="journey-nodes" aria-label={`${project.title} journey stages`}>
          {project.systemMap.map((stage, stageIndex) => (
            <button key={stage} type="button" className="journey-node" aria-pressed={selected === stageIndex} onClick={() => setSelected(stageIndex)} style={{ "--node": stageIndex } as CSSProperties}>
              <span className="journey-node__number">0{stageIndex + 1}</span>
              <strong>{stage}</strong>
              <span className="journey-node__line" aria-hidden="true"><i /><i /><i /></span>
              <span className="journey-node__marker" aria-hidden="true">{selected === stageIndex ? "●" : "○"}</span>
            </button>
          ))}
        </div>
      </div>
      <div className="project-visual__bottom"><span>Public-safe journey diagram</span><span>0{selected + 1} / 04</span></div>
    </div>
  );
}

function ProjectDetails({ project }: { project: PortfolioProject }) {
  return (
    <details className="project-details">
      <summary>Role &amp; responsibilities</summary>
      <div className="project-details__content">
        <p>{project.role}</p>
        <ul>{project.responsibilities.map((item) => <li key={item}>{item}</li>)}</ul>
        {project.approvedConstraints && <p>{project.approvedConstraints}</p>}
        {project.approvedOutcome && <p>{project.approvedOutcome}</p>}
        {project.impact && <p>{project.impact}</p>}
      </div>
    </details>
  );
}

export function Portfolio() {
  return (
    <section id="work" className="work" aria-labelledby="work-title">
      <div className="container work-heading">
        <p className="kicker">Selected work / 01—04</p>
        <h2 id="work-title">Complex underneath.<br /><span>Clear on the surface.</span></h2>
        <p>Product design across digital banking, commerce, corporate operations, and enterprise procurement.</p>
        <nav className="work-index" aria-label="Project index">{portfolioProjects.map((project, index) => <a key={project.slug} href={`#project-${project.slug}`}><span>0{index + 1}</span>{project.title}<span aria-hidden="true">↘</span></a>)}</nav>
      </div>
      {portfolioProjects.map((project, index) => (
        <article id={`project-${project.slug}`} key={project.slug} className={`project-chapter project-chapter--${index} motion-scene`}>
          <div className="container project-chapter__grid">
            <div className="project-story">
              <div className="project-story__heading">
                <p className="kicker"><span>0{index + 1}</span> {project.organization}</p>
                <h3>{project.title}</h3>
                <p className="project-domain">{project.domain}</p>
              </div>
              <div className="project-story__body">
                <div className="story-block"><h4>The challenge</h4><p>{project.problem}</p></div>
                <div className="story-block"><h4>My contribution</h4><p>{project.contribution}</p></div>
                <ul className="tag-list" aria-label={`${project.title} focus`}>{project.tags.map(tag => <li key={tag}>{tag}</li>)}</ul>
                <ProjectDetails project={project} />
                {(project.year || project.projectStatus) && <p className="project-extra">{[project.year, project.projectStatus].filter(Boolean).join(" / ")}</p>}
                <a className="text-link" href={project.caseStudyUrl ?? "#contact"} {...(project.caseStudyUrl ? { target: "_blank", rel: "noreferrer" } : {})}>{project.caseStudyUrl ? "View case study" : "Discuss this work"}<span aria-hidden="true">↗</span></a>
              </div>
            </div>
            <div className="project-stage"><ProjectVisual project={project} index={index} /></div>
          </div>
        </article>
      ))}
      <p className="container work-note">Public-safe summaries. Detailed interface material is shared only where publication is approved.</p>
    </section>
  );
}
