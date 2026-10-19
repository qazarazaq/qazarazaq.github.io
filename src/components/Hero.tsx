export function Hero() {
  return (
    <section id="top" className="intro container" aria-labelledby="hero-title">
      <h1 id="hero-title">Making everyday finance<br className="desktop-break" /> easier to navigate.</h1>
      <p className="intro__description">I’m Wildan, a UI/CX designer at Bank Mandiri. I work on mobile banking, commerce, and the moments where digital journeys meet the physical world.</p>
      <div className="intro__foot">
        <p>Jakarta, Indonesia <span aria-hidden="true">·</span> Previously at Telkom Indonesia</p>
        <a href="#work">View selected work <span aria-hidden="true">↓</span></a>
      </div>
      <div className="experience-tiles" aria-label="Work experience and education">
        <figure><div className="experience-tiles__logo"><img src="/logos/mandiri.svg" alt="Bank Mandiri" width="213" height="62" /></div><figcaption><span>Current work</span><p>UI/CX design · 3+ years</p></figcaption></figure>
        <figure><div className="experience-tiles__logo"><img src="/logos/telkom.svg" alt="Telkom Indonesia" width="400" height="216" /></div><figcaption><span>Previous work</span><p>Telkom Indonesia</p></figcaption></figure>
        <figure><div className="experience-tiles__logo"><img src="/logos/binus.svg" alt="BINUS University" width="335" height="200" /></div><figcaption><span>Education</span><p>Information Systems · GPA 3.6</p></figcaption></figure>
      </div>
    </section>
  );
}
