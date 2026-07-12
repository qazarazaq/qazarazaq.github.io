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

- Profile, capabilities, approach, about, and contact copy: `src/data/site.ts`
- Selected professional work: `src/data/portfolio.ts`
- Travel destinations and photography metadata: `src/data/travel.ts`
- Earlier work: `src/data/archive.ts`
- Social links: `src/data/social.ts`

Professional project dates, outcomes, links, and project-specific constraints are intentionally left empty until approved content is available. Add them only in `src/data/portfolio.ts`.

The airplane-window frame and travel photographs live in `public/travel/`. Earlier-work images live in `public/archive/`.

## Deployment

Pushes to `master` trigger `.github/workflows/deploy.yml`. The workflow installs dependencies with Node 20, builds the Vite app, uploads `dist/`, and deploys the artifact to GitHub Pages.

GitHub Pages must use **GitHub Actions** as its publishing source.
