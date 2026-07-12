import { siteContent } from "../data/site";

export function About() {
  return (
    <section id="about" className="about section" aria-labelledby="about-title">
      <div className="container about__grid">
        <div className="about__portrait">
          <img
            src="/assets/wildan-portrait.jpeg"
            alt="Portrait of Wildan Razaq Ramadhan"
            width="1049"
            height="973"
            loading="lazy"
          />
        </div>

        <div className="about__copy">
          <p className="kicker">About</p>
          <h2 id="about-title">{siteContent.about.title}</h2>
          {siteContent.about.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          {siteContent.about.resumeUrl ? (
            <a className="text-link" href={siteContent.about.resumeUrl} target="_blank" rel="noreferrer">
              View résumé <span aria-hidden="true">↗</span>
            </a>
          ) : null}
        </div>
      </div>
    </section>
  );
}

