import { PortraitSwitch } from "./PortraitSwitch";
import { ArrowLink } from "./ArrowLink";
import { socialLinks } from "../data/social";

export function About() {
  return <section id="about" className="designer-about content-section" data-tone="dark" aria-labelledby="about-title">
    <div className="container"><h2 id="about-title" data-reveal>About</h2><div className="designer-about__grid" data-reveal>
      <PortraitSwitch />
      <div className="designer-about__copy"><p>I’m Wildan Razaq Ramadhan, a UI/CX designer based in Jakarta. At Bank Mandiri, I work on how people navigate banking and everyday services.</p><p>I enjoy the detail between a journey and a finished interface: organizing information, comparing interaction choices, and making the next step clear.</p><ArrowLink href={socialLinks.linkedin} external>View my LinkedIn</ArrowLink></div>
    </div></div>
  </section>;
}
