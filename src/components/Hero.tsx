import { siteContent } from "../data/site";

export function Hero() {
  return (
    <section id="top" className="hero section" aria-labelledby="hero-title">
      <div className="container hero__grid">
        <div className="hero__copy">
          <p className="kicker">{siteContent.identity.role}</p>
          <h1 id="hero-title">{siteContent.identity.headline}</h1>
          <p className="hero__intro">{siteContent.identity.introduction}</p>
          <p className="hero__detail">{siteContent.identity.detail}</p>

          <div className="hero__actions">
            <a className="button button--primary" href="#work">
              View selected work
            </a>
            <a className="button button--text" href="#approach">
              About my approach
            </a>
          </div>

          <dl className="hero__employment" aria-label="Professional experience">
            {siteContent.employment.map((item) => (
              <div key={item.label}>
                <dt>{item.label}</dt>
                <dd>{item.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="hero-system" aria-label="From product complexity to interface clarity">
          <div className="hero-system__header">
            <span>Product system</span>
            <span>01</span>
          </div>
          <div className="hero-system__body">
            <p>Complexity</p>
            <ol>
              <li><span>Requirements</span><i /></li>
              <li><span>User journeys</span><i /></li>
              <li><span>States &amp; edge cases</span><i /></li>
              <li><span>Implementation detail</span><i /></li>
            </ol>
            <div className="hero-system__result">
              <span>Structured into</span>
              <strong>Clear, scalable product experiences</strong>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
