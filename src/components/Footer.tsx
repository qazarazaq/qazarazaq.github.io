import { siteContent } from "../data/site";
import { socialLinks } from "../data/social";

const contactLinks = [
  { label: "LinkedIn", href: socialLinks.linkedin },
  { label: "Behance", href: socialLinks.behance },
  { label: "Instagram", href: socialLinks.instagram },
  { label: "GitHub", href: socialLinks.github },
];

export function Footer({ motion }: { motion: { reduced: boolean; systemReduced: boolean; toggle: () => void } }) {
  return (
    <footer id="contact" className="contact-section" aria-labelledby="contact-title">
      <div className="container contact-section__grid">
        <div>
          <p className="kicker">Contact</p>
          <h2 id="contact-title">{siteContent.contact.title}</h2>
          <p>{siteContent.contact.description}</p>
          <a className="button button--light" href={socialLinks.email}>
            Email Wildan
          </a>
        </div>

        <nav className="contact-links" aria-label="Professional profiles">
          {contactLinks.map((link) => (
            <a key={link.label} href={link.href} target="_blank" rel="noreferrer">
              <span>{link.label}</span>
              <span aria-hidden="true">↗</span>
            </a>
          ))}
        </nav>
      </div>

      <div className="container footer-line">
        <div className="footer-wordmark" aria-label={siteContent.identity.shortName}>
          {siteContent.identity.monogram}
        </div>
        <p>© 2026 {siteContent.identity.name}</p>
        <button className="motion-toggle" type="button" aria-pressed={motion.reduced} onClick={motion.toggle} disabled={motion.systemReduced}>{motion.systemReduced ? "Reduced motion (system)" : "Reduce motion"}</button>
        <a href="#top">Back to top</a>
      </div>
    </footer>
  );
}
