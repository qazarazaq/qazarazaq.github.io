# Wildan Razaq Portfolio

A responsive product-design portfolio built with Vite, React, TypeScript, and plain CSS. The site is static and deploys to GitHub Pages through GitHub Actions.

## Local development

```bash
npm install
npm run dev
```

## Build and preview

```bash
npm run build
npm run preview
```

The production build is written to `dist/`.

## Content editing

- Introduction and work/education logo tiles: `src/components/Hero.tsx`
- Featured projects and supporting project copy: `src/data/portfolio.ts`
- Project previews and expandable stories: `src/components/Portfolio.tsx`
- About and contact: `src/components/About.tsx`, `src/components/Footer.tsx`
- Portfolio layout and pastel-blue accents: `src/portfolio.css`
- Travel destinations and metadata: `src/data/travel.ts`
- Social links: `src/data/social.ts`

The featured work is Livin’ Gold / ATM Emas and Livin’ Food. Kopra SCM, Livin Auto, and Sukha Donasi provide supporting examples. Do not add unpublished Belanja work, internal operations, or transaction-security case studies. Only publish verified outcomes.

Customer interface previews are real Figma exports, optimized as WebP under `public/work/`. Device artwork comes from the supplied Corpweb reference. Source Figma files are read-only. Brand SVG sources are documented in `public/logos/SOURCES.md`.

The original portrait is in `public/assets/`. The airplane-window frame and travel photographs are in `public/travel/`. The travel component, data, original stylesheet, motion hook, and all travel assets were preserved for this redesign.

## Deployment

Pushes to `master` trigger `.github/workflows/deploy.yml`. The workflow installs dependencies with Node 20, builds the Vite app, uploads `dist/`, and deploys the artifact to GitHub Pages.

GitHub Pages must use **GitHub Actions** as its publishing source.
