import { ExperienceTiles } from "./ExperienceTiles";

export function About() {
  return (
    <section id="about" className="designer-about container" aria-labelledby="about-title">
      <h2 id="about-title">About</h2>
      <img className="designer-about__portrait" src="/assets/wildan-portrait.png" alt="Wildan Razaq Ramadhan" width="1049" height="1058" loading="lazy" />
      <div className="designer-about__copy">
        <p>I’m Wildan Razaq Ramadhan, a UI/CX designer based in Jakarta. At Bank Mandiri, I work on how people navigate banking and everyday services.</p>
        <p>I enjoy the detail between a journey and a finished interface: organizing information, comparing interaction choices, and making the next step clear.</p>
        <p className="designer-about__education">Bachelor’s degree in Information Systems, BINUS University.</p>
      </div>
      <ExperienceTiles className="experience-tiles--about" />
    </section>
  );
}
