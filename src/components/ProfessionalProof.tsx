import { siteContent } from "../data/site";

export function ProfessionalProof() {
  return (
    <section className="proof section section--compact" aria-labelledby="proof-title">
      <div className="container">
        <div className="section-heading section-heading--split">
          <div>
            <p className="kicker">Professional focus</p>
            <h2 id="proof-title">Design that holds up beyond the happy path.</h2>
          </div>
          <p>
            The work is not only the final screen. It is the structure, states, rules,
            and delivery detail that make the screen reliable in a real product.
          </p>
        </div>

        <div className="proof-grid">
          {siteContent.capabilities.map((capability, index) => (
            <article key={capability.title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{capability.title}</h3>
              <p>{capability.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

