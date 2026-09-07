import { siteContent } from "../data/site";
import { portfolioProjects } from "../data/portfolio";

export function Hero() {
  return (
    <section id="top" className="hero motion-scene" aria-labelledby="hero-title">
      <div className="container hero__copy">
        <p className="hero__identity">{siteContent.identity.name}<span>{siteContent.identity.role}</span></p>
        <h1 id="hero-title">Designing clear<br />digital products.<br /><span>For complex everyday systems.</span></h1>
        <p className="hero__intro">{siteContent.identity.introduction}</p>
        <div className="hero__actions">
          <a className="button button--primary" href="#work">Explore the work <span aria-hidden="true">↘</span></a>
          <a className="button button--text" href="#about">Meet the designer <span aria-hidden="true">↗</span></a>
        </div>
        <dl className="hero__employment" aria-label="Professional experience">
          {siteContent.employment.map((item) => <div key={item.label}><dt>{item.label}</dt><dd>{item.value}</dd></div>)}
        </dl>
      </div>
      <div className="hero__work container" aria-label="Selected projects">
        {portfolioProjects.map((project, index) => (
          <a href={`#project-${project.slug}`} className={`hero-object hero-object--${index}`} key={project.slug}>
            <span className="hero-object__meta">0{index + 1} / {project.platform[0]}</span>
            <strong>{project.title}</strong>
            <span className="hero-object__flow">{project.systemMap[0]}<i />{project.systemMap[3]}</span>
            <span className="hero-object__company">{project.organization}<span aria-hidden="true">↗</span></span>
          </a>
        ))}
      </div>
      <div className="container hero__foot"><span>Product thinking. Interface craft.</span><a href="#work">Selected work <span aria-hidden="true">↓</span></a></div>
    </section>
  );
}
