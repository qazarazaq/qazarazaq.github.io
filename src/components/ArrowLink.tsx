import type { ReactNode } from "react";

export function LinkArrow({ direction = "diagonal" }: { direction?: "diagonal" | "up" }) {
  const d = direction === "up" ? "M12 19V5m-6 6 6-6 6 6" : "M5 19 19 5M6 5h13v13";
  return <span className={`arrow-flight${direction === "up" ? " arrow-flight--up" : ""}`} aria-hidden="true">{[0, 1].map(i => <svg key={i} className={i ? "arrow-flight__next" : "arrow-flight__current"} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d={d} /></svg>)}</span>;
}

export function ArrowLink({ href, children, className = "", external = false, direction }: { href: string; children: ReactNode; className?: string; external?: boolean; direction?: "diagonal" | "up" }) {
  return <a className={`text-link ${className}`} href={href} target={external ? "_blank" : undefined} rel={external ? "noreferrer" : undefined}>{children}<LinkArrow direction={direction} /></a>;
}
