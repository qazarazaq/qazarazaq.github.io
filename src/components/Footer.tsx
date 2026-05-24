import { socialLinks } from "../data/social";
import { Reveal } from "./Reveal";

type FooterIcon = "email" | "linkedin" | "behance" | "instagram" | "github";

const footerLinks: Array<{ label: string; href: string; icon: FooterIcon }> = [
  { label: "Email", href: socialLinks.email, icon: "email" },
  { label: "LinkedIn", href: socialLinks.linkedin, icon: "linkedin" },
  { label: "Behance", href: socialLinks.behance, icon: "behance" },
  { label: "Instagram", href: socialLinks.instagram, icon: "instagram" },
  { label: "GitHub", href: socialLinks.github, icon: "github" },
];

function ContactIcon({ type }: { type: FooterIcon }) {
  if (type === "email") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M4.75 6.75h14.5v10.5H4.75z" />
        <path d="m5.25 7.25 6.75 5.5 6.75-5.5" />
      </svg>
    );
  }

  if (type === "linkedin") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M7.4 9.4v8" />
        <path d="M7.4 6.6v.05" />
        <path d="M11 17.4v-4.25c0-2.1 1.25-3.75 3.35-3.75 1.92 0 3.25 1.28 3.25 3.65v4.35" />
      </svg>
    );
  }

  if (type === "behance") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M5.2 7.2h4.1c1.65 0 2.7.9 2.7 2.25 0 1.05-.58 1.78-1.48 2.05 1.2.22 2.03 1.05 2.03 2.38 0 1.62-1.25 2.72-3.05 2.72H5.2z" />
        <path d="M5.2 11.3h4.1" />
        <path d="M15 8.2h4.2" />
        <path d="M14.55 13.1h5.25c-.12-1.62-1.08-2.7-2.55-2.7-1.62 0-2.7 1.22-2.7 3.05 0 1.92 1.12 3.12 2.88 3.12 1.05 0 1.82-.38 2.35-1.05" />
      </svg>
    );
  }

  if (type === "instagram") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <rect x="5.25" y="5.25" width="13.5" height="13.5" rx="4.1" />
        <circle cx="12" cy="12" r="3.35" />
        <path d="M16.35 7.95v.05" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M9.2 18.55c-3.1.92-3.1-1.55-4.35-1.95" />
      <path d="M14.8 21v-3.2c.04-.66-.18-1.15-.55-1.55 1.85-.2 3.8-.9 3.8-4.08 0-.9-.32-1.64-.85-2.22.08-.2.36-1.04-.08-2.18 0 0-.7-.22-2.3.84A7.8 7.8 0 0 0 12 8.24c-.96 0-1.9.13-2.82.37-1.6-1.06-2.3-.84-2.3-.84-.44 1.14-.16 1.98-.08 2.18-.53.58-.85 1.32-.85 2.22 0 3.16 1.94 3.88 3.78 4.08-.3.27-.58.78-.58 1.58V21" />
    </svg>
  );
}

export function Footer() {
  return (
    <footer id="contact" className="footer-section">
      <Reveal className="mx-auto max-w-[1180px] px-5 py-16 sm:px-8 sm:py-20 lg:px-10">
        <div className="footer-panel">
          <div>
            <p className="eyebrow text-skyline">Contact</p>
            <p className="footer-statement">
              Designing clear, useful, and polished digital experiences — from banking
              products to personal travel archives.
            </p>
          </div>

          <div className="footer-actions" aria-label="Contact links">
            {footerLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="footer-contact"
              >
                <ContactIcon type={link.icon} />
                <span>{link.label}</span>
              </a>
            ))}
          </div>
        </div>

        <div className="footer-bottom">
          <p>© 2026 Wildan Razaq Ramadhan</p>
          <a href="#top">Back to top</a>
        </div>
      </Reveal>
    </footer>
  );
}
