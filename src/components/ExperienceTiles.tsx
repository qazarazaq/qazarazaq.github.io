export function ExperienceTiles({ className }: { className: string }) {
  return (
    <div className={`experience-tiles ${className}`} aria-label="Work experience and education">
      <figure>
        <div className="experience-tiles__logo"><img src="/logos/mandiri.svg" alt="Bank Mandiri" width="213" height="62" /></div>
        <figcaption><span>Current work</span><p>UX Designer</p></figcaption>
      </figure>
      <figure>
        <div className="experience-tiles__logo"><img src="/logos/telkom.svg" alt="Telkom Indonesia" width="400" height="216" /></div>
        <figcaption><span>Previous work</span><p>UI Intern → UI Designer</p></figcaption>
      </figure>
      <figure>
        <div className="experience-tiles__logo"><img src="/logos/binus.svg" alt="BINUS University" width="335" height="200" /></div>
        <figcaption><span>Education</span><p>Information Systems</p></figcaption>
      </figure>
    </div>
  );
}
