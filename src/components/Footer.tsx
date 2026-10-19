import { siteContent } from "../data/site";
import { socialLinks } from "../data/social";

const contactLinks = [
  { icon: "linkedin-in", label: "LinkedIn", href: socialLinks.linkedin },
  { icon: "behance", label: "Behance", href: socialLinks.behance },
  { icon: "instagram", label: "Instagram", href: socialLinks.instagram },
  { icon: "github", label: "GitHub", href: socialLinks.github },
];

export function Footer() {
  return (
    <footer id="contact" className="contact-section" aria-labelledby="contact-title">
      <div className="container contact-section__grid">
        <div>
          <p className="kicker">Contact</p>
          <h2 id="contact-title">Let’s talk product design.</h2>
          <p>For product design opportunities and conversations about the work.</p>
          <a className="button button--light" href={socialLinks.email}>
            qazarazaq@gmail.com <span aria-hidden="true">↗</span>
          </a>
        </div>

        <nav className="contact-links" aria-label="Professional profiles">
          {contactLinks.map((link) => (
            <a key={link.label} href={link.href} target="_blank" rel="noreferrer" aria-label={link.label} title={link.label}>
              <img src={`/icons/${link.icon}.svg`} width="24" height="24" alt="" aria-hidden="true" />
            </a>
          ))}
        </nav>
      </div>

      <div className="container footer-line">
        <div className="footer-wordmark" aria-label={siteContent.identity.shortName}>
          {siteContent.identity.monogram}
        </div>
        <a href="#top">Back to top</a>
      </div>
    </footer>
  );
}
