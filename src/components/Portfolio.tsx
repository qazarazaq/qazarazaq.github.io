import { useEffect, useRef, useState } from "react";
import {
  motion,
  type MotionValue,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import type { PortfolioProject } from "../data/portfolio";
import { portfolioProjects } from "../data/portfolio";
import { Reveal } from "./Reveal";

const stackOffsets = [
  { x: 310, y: 150, rotate: -4, scale: 0.95 },
  { x: -310, y: 160, rotate: 3, scale: 0.94 },
  { x: 300, y: -170, rotate: 2, scale: 0.93 },
  { x: -300, y: -160, rotate: -3, scale: 0.92 },
];

function useDesktopMotion() {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(min-width: 900px)");
    const update = () => setIsDesktop(query.matches);

    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  return isDesktop;
}

function PortfolioCard({
  project,
  index,
  progress,
  animateDolly,
}: {
  project: PortfolioProject;
  index: number;
  progress: MotionValue<number>;
  animateDolly: boolean;
}) {
  const offset = stackOffsets[index] ?? stackOffsets[0];
  const x = useTransform(progress, [0, 1], [offset.x, 0]);
  const y = useTransform(progress, [0, 1], [offset.y, 0]);
  const rotate = useTransform(progress, [0, 1], [offset.rotate, 0]);
  const scale = useTransform(progress, [0, 1], [offset.scale, 1]);
  const opacity = useTransform(progress, [0, 0.22, 1], [index === 0 ? 1 : 0.5, 1, 1]);

  return (
    <motion.article
      className={`portfolio-card portfolio-card--${project.accent}`}
      style={
        animateDolly
          ? {
              x,
              y,
              rotate,
              scale,
              opacity,
              zIndex: portfolioProjects.length - index,
            }
          : undefined
      }
    >
      <div className="portfolio-media">
        <img
          src={project.cover}
          alt={`${project.title} generated portfolio key visual`}
          loading={index < 2 ? "eager" : "lazy"}
        />
      </div>

      <div className="portfolio-card__body">
        <div className="portfolio-card__meta">
          <span>{project.category}</span>
          <span>{project.company}</span>
        </div>
        <h3>{project.title}</h3>
        <p className="portfolio-card__role">{project.role}</p>

        <div className="portfolio-card__copy">
          <p>
            <span>Problem: </span>
            {project.problem}
          </p>
          <p>
            <span>Contribution: </span>
            {project.contribution}
          </p>
        </div>

        <div className="portfolio-card__tags">
          {project.tags.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>

        <div className="portfolio-card__actions">
          {project.links.map((link) => (
            <a
              key={`${project.slug}-${link.label}`}
              href={link.href}
              target="_blank"
              rel="noreferrer"
              aria-label={`${link.label} for ${project.title}`}
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </motion.article>
  );
}

export function Portfolio() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const reducedMotion = useReducedMotion();
  const isDesktop = useDesktopMotion();
  const animateDolly = isDesktop && !reducedMotion;
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 88%", "start 24%"],
  });

  return (
    <section id="work" ref={sectionRef} className="portfolio-section">
      <div className="mx-auto max-w-[1180px] px-5 py-20 sm:px-8 sm:py-28 lg:px-10 lg:py-32">
        <Reveal className="portfolio-section__intro">
          <p className="eyebrow text-skyline">Selected Portfolio</p>
          <h2>Product work for banking-grade complexity.</h2>
          <p>
            Four selected snapshots across financing, donation commerce, corporate
            banking, and enterprise procurement. Each card uses a generated key visual
            built from the project reference screens.
          </p>
        </Reveal>

        <div className={animateDolly ? "portfolio-grid portfolio-grid--dolly" : "portfolio-grid"}>
          {portfolioProjects.map((project, index) => (
            <PortfolioCard
              key={project.slug}
              project={project}
              index={index}
              progress={scrollYProgress}
              animateDolly={animateDolly}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
