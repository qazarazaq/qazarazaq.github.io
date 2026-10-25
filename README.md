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

- Introduction: `src/components/Hero.tsx`; work/education tiles: `src/components/ExperienceTiles.tsx`
- Featured projects and supporting project copy: `src/data/portfolio.ts`
- Project feature cards: `src/components/Portfolio.tsx`; device previews and viewer: `src/components/WorkMedia.tsx`
- About and contact: `src/components/About.tsx`, `src/components/Footer.tsx`
- Portfolio layout and Flighty-derived palette: `src/portfolio.css`
- Travel destinations and metadata: `src/data/travel.ts`
- Social links: `src/data/social.ts`

The featured work is Livin’ Gold / ATM Emas and Livin’ Food. Kopra SCM, Livin Auto, and Sukha Donasi provide supporting examples. Do not add unpublished Belanja work, internal operations, or transaction-security case studies. Only publish verified outcomes.

Customer interface previews are real Figma exports, optimized as WebP under `public/work/`. Device artwork comes from the supplied Corpweb reference. Source Figma files are read-only. Brand SVG sources are documented in `public/logos/SOURCES.md` and `public/icons/SOURCES.md`. Asset provenance is in `public/work/SOURCES.md`.

The original portrait is in `public/assets/`. The airplane-window frame and travel photographs are in `public/travel/`. Travel photo files, destination metadata, album links, and the airplane-window artwork are preserved. The gallery uses a shared positional transition so a side photo moves into the center. Site controls and text selection use the yellow accent from the reference. No new raster assets or font downloads are needed for this redesign.

## Deployment

Pushes to `master` trigger `.github/workflows/deploy.yml`. The workflow installs dependencies with Node 20, builds the Vite app, uploads `dist/`, and deploys the artifact to GitHub Pages.

GitHub Pages must use **GitHub Actions** as its publishing source.

## Presentation conventions

Typography uses Flighty’s system font stack and measured sizes: hero 65px/700, section headings 56px/700 on desktop and 32px/700 on mobile, and wide feature titles 32px/600 with supporting titles at 28px/600. The page uses a 1000px content grid, white and near-black sections, a yellow scene dock, generous spacing, and native scrolling. Card visuals move within clipped containers. System reduced-motion preferences are respected without a separate toggle.

The hero transitions between the existing Gold, Food, and masked Kopra assets. Three monochrome work/education tiles reveal their original logo colors on hover. The photo and all travel assets and behavior remain intact. ATM screens are rounded and frameless. The Kopra viewer preserves a readable desktop canvas on narrow screens through horizontal panning. Record values are masked in its public asset.

Case-study copy draws on the owner’s earlier Gold pricing, single-piece selection, city-directory and Food category-state discussions. New-flow explorations and unverified research or performance claims are excluded.
