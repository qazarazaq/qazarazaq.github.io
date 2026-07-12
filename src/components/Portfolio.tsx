import type { PortfolioProject } from "../data/portfolio";
import { portfolioProjects } from "../data/portfolio";

function SystemMap({ project }: { project: PortfolioProject }) {
  return (
    <div className="project-map" aria-hidden="true">
      <div className="project-map__header">
        <span>System view</span>
        <span>{project.platform.join(" / ")}</span>
      </div>
      <div className="project-map__track">
        {project.systemMap.map((node, index) => (
          <div className="project-map__node" key={node}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <strong>{node}</strong>
          </div>
        ))}
      </div>
      <p>Public-safe representation. No product interface is reproduced.</p>
    </div>
  );
}

function ProjectDetails({ project }: { project: PortfolioProject }) {
  return (
    <details className="project-details">
      <summary>Read project context</summary>
      <div className="project-details__content">
        <div>
          <h4>Context</h4>
          <p>{project.domain}</p>
        </div>
        <div>
          <h4>Challenge</h4>
          <p>{project.problem}</p>
        </div>
        <div>
          <h4>Role</h4>
          <p>{project.role}</p>
        </div>
        <div>
          <h4>Responsibilities</h4>
          <ul>
            {project.responsibilities.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <div>
          <h4>Constraints</h4>
          <p className={project.approvedConstraints ? "" : "content-placeholder"}>
            {project.approvedConstraints ?? "Editable: add approved project constraints."}
          </p>
        </div>
        <div>
          <h4>Process and key decisions</h4>
          <p className="content-placeholder">
            Editable: add approved process notes and decision rationale.
          </p>
        </div>
        <div>
          <h4>States and edge cases</h4>
          <p>{project.systemMap.join(" → ")}</p>
        </div>
        <div>
          <h4>Final experience</h4>
          <p>Detailed interface material is not published on this public page.</p>
        </div>
        <div>
          <h4>Outcome or learnings</h4>
          <p className={project.approvedOutcome ? "" : "content-placeholder"}>
            {project.approvedOutcome ?? "Editable: add an approved outcome or learning."}
          </p>
        </div>
      </div>
    </details>
  );
}

function ProjectCard({ project, index }: { project: PortfolioProject; index: number }) {
  return (
    <article id={`project-${project.slug}`} className="project-card">
      <SystemMap project={project} />
      <div className="project-card__content">
        <div className="project-card__index">{String(index + 1).padStart(2, "0")}</div>
        <div className="project-card__meta">
          <span>{project.organization}</span>
          <span>{project.confidentiality}</span>
          {project.year ? <span>{project.year}</span> : null}
          {project.projectStatus ? <span>{project.projectStatus}</span> : null}
        </div>
        <h3>{project.title}</h3>
        <p className="project-card__domain">{project.domain}</p>
        <p className="project-card__problem">{project.problem}</p>
        <p className="project-card__contribution">{project.contribution}</p>

        <ul className="tag-list" aria-label={`${project.title} capabilities`}>
          {project.tags.map((tag) => (
            <li key={tag}>{tag}</li>
          ))}
        </ul>

        <ProjectDetails project={project} />

        {project.caseStudyUrl ? (
          <a className="text-link" href={project.caseStudyUrl}>
            View case study <span aria-hidden="true">↗</span>
          </a>
        ) : (
          <a className="text-link" href="#contact">
            Discuss this work <span aria-hidden="true">→</span>
          </a>
        )}
      </div>
    </article>
  );
}

export function Portfolio() {
  return (
    <section id="work" className="work section" aria-labelledby="work-title">
      <div className="container">
        <div className="section-heading section-heading--split">
          <div>
            <p className="kicker">Selected work</p>
            <h2 id="work-title">Product design for systems with real constraints.</h2>
          </div>
          <p>
            Public-safe summaries of work across digital banking, commerce, corporate
            operations, and enterprise procurement. Detailed material is shared only
            where publication is approved.
          </p>
        </div>

        <div className="project-grid">
          {portfolioProjects.map((project, index) => (
            <ProjectCard key={project.slug} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
