import { siteContent } from "../data/site";

export function Approach() {
  return (
    <section id="approach" className="approach section" aria-labelledby="approach-title">
      <div className="container">
        <div className="section-heading section-heading--split">
          <div>
            <p className="kicker">Approach</p>
            <h2 id="approach-title">Make the complexity visible, then design through it.</h2>
          </div>
          <p>
            The sequence adapts to the product. It is a working structure for keeping
            decisions connected to users, constraints, and implementation.
          </p>
        </div>

        <ol className="approach-list">
          {siteContent.approach.map((step, index) => (
            <li key={step.title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <div>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

