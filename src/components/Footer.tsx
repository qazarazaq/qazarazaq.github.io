import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { LinkArrow } from "./ArrowLink";
import { socialLinks } from "../data/social";
const AsciiCat = lazy(() => import("./AsciiCat").then(module => ({ default: module.AsciiCat })));
const links = [{ icon: "linkedin-in", label: "LinkedIn", href: socialLinks.linkedin }, { icon: "behance", label: "Behance", href: socialLinks.behance }, { icon: "instagram", label: "Instagram", href: socialLinks.instagram }, { icon: "github", label: "GitHub", href: socialLinks.github }];
export function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const [showCat, setShowCat] = useState(false);
  useEffect(() => {
    if (!footerRef.current) return;
    const observer = new IntersectionObserver(entries => { if (entries[0].isIntersecting) { setShowCat(true); observer.disconnect(); } }, { rootMargin: "300px" });
    observer.observe(footerRef.current); return () => observer.disconnect();
  }, []);
  return <footer ref={footerRef} id="contact" className="contact-section" aria-labelledby="contact-title"><div className="container contact-layout"><div className="contact-content"><h2 id="contact-title">Let’s talk<br />product design.</h2><a className="button" href={socialLinks.email}>qazarazaq@gmail.com<LinkArrow /></a><nav className="contact-links" aria-label="Professional profiles">{links.map(link => <a key={link.label} href={link.href} target="_blank" rel="noreferrer" aria-label={link.label} title={link.label}><img src={`/icons/${link.icon}.svg`} width="23" height="23" alt="" /></a>)}</nav></div></div><div className="contact-cat-stage" aria-hidden="true">{showCat && <Suspense fallback={null}><AsciiCat /></Suspense>}</div></footer>;
}
