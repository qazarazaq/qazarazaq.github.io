import { archiveItems } from "../data/archive";

export function Archive() {
  return (
    <section className="archive section section--compact" aria-labelledby="archive-title">
      <div className="container">
        <div className="section-heading section-heading--split">
          <div>
            <p className="kicker">Earlier work</p>
            <h2 id="archive-title">Explorations from the archive.</h2>
          </div>
          <p>
            Student-era interface, illustration, and photography work retained as
            context, separate from the professional portfolio above.
          </p>
        </div>

        <div className="archive-grid">
          {archiveItems.map((item) => (
            <a key={item.title} className="archive-item" href={item.href} target="_blank" rel="noreferrer">
              <span className="archive-item__image">
                <img src={item.image} alt={item.alt} loading="lazy" />
              </span>
              <span className="archive-item__meta">
                <span>{item.category}</span>
                <span>{item.year}</span>
              </span>
              <strong>{item.title}</strong>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
