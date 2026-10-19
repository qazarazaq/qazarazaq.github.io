export function About() {
  return (
    <section id="about" className="designer-about container" aria-labelledby="about-title">
      <h2 id="about-title">About</h2>
      <img className="designer-about__portrait" src="/assets/wildan-portrait.jpeg" alt="Wildan Razaq Ramadhan" width="1049" height="973" loading="lazy" />
      <div className="designer-about__copy">
        <p>I’m Wildan Razaq Ramadhan, a UI/CX designer based in Jakarta. For over three years at Bank Mandiri, I’ve worked on how people navigate banking and everyday services.</p>
        <p>I enjoy the detail between a journey and a finished interface: organizing information, comparing interaction choices, and making the next step clear.</p>
        <p className="designer-about__education">Bachelor’s degree in Information Systems, BINUS University.</p>
      </div>
    </section>
  );
}
