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
- Portfolio layout, all-dark charcoal palette and pastel-blue accents: `src/portfolio.css`
- Travel destinations and metadata: `src/data/travel.ts`
- Social links: `src/data/social.ts`

The featured work is Livin’ Gold / ATM Emas and Livin’ Food. Kopra SCM, Livin Auto, and Sukha Donasi provide supporting examples. Do not add unpublished Belanja work, internal operations, or transaction-security case studies. Only publish verified outcomes.

Customer interface previews are real Figma exports, optimized as WebP under `public/work/`. Device artwork comes from the supplied Corpweb reference. Source Figma files are read-only. Brand SVG sources are documented in `public/logos/SOURCES.md` and `public/icons/SOURCES.md`. Asset provenance is in `public/work/SOURCES.md`.

The original portrait is in `public/assets/`. The airplane-window frame and travel photographs are in `public/travel/`. Travel photo files, destination metadata, album links, and the airplane-window artwork are preserved. The gallery uses a shared positional transition so a side photo moves into the center. Site controls and text selection share the pastel-blue accent. Plus Jakarta Sans is self-hosted as a compact variable WOFF2 with its SIL Open Font License. The supplied illustrated avatar has matching square WebP, PNG and ICO derivatives for the navigation and app/browser icons.

## Deployment

Pushes to `master` trigger `.github/workflows/deploy.yml`. The workflow installs dependencies with Node 20, builds the Vite app, uploads `dist/`, and deploys the artifact to GitHub Pages.

GitHub Pages must use **GitHub Actions** as its publishing source.

## Presentation conventions

Typography uses self-hosted Plus Jakarta Sans and the measured type scale: hero 65px/700 (56px on the narrowest phones), section headings 56px/700 on desktop and 32px/700 on mobile, and wide feature titles 32px/600 with supporting titles at 28px/600. The page uses a 1000px content grid, charcoal sections and surfaces, a pastel-blue scene dock, generous spacing, and native scrolling. Card visuals move within clipped containers. System reduced-motion preferences are respected without a separate toggle.

The hero transitions between the existing Gold, Food, and masked Kopra assets. Screen previews use scroll-linked translation, small tilts, and a maximum 2.4% scale increase; mobile motion is reduced. Original Figma exports are unchanged. Three monochrome work/education tiles reveal their brand-color symbols and inverse wordmarks on hover. The original portrait photograph remains intact. Its About button smoothly blends the original photo into the existing avatar on hover, keyboard focus, or tap, with reversible transitions and no intermediate drawing. The header avatar changes into a hand-drawn SVG WR mark as the page scrolls. Secondary links share the album link’s blue text and animated SVG arrow. Travel images, destination data, album links, and gallery behavior remain intact. ATM screens are rounded and frameless. The Kopra viewer preserves a readable desktop canvas on narrow screens through horizontal panning. Record values are masked in its public asset. Screen dialogs use a centered SVG close control, native focus containment, Escape/backdrop dismissal, and focus restoration. The mobile menu also closes on Escape, an outside pointer, or navigation.

Case-study copy draws on the owner’s earlier Gold pricing, single-piece selection, city-directory and Food category-state discussions. New-flow explorations and unverified research or performance claims are excluded.

The contact background combines a fine, fading grid with a detailed canvas ASCII animation of Kiko, the owner’s mostly orange-and-white cat. A compact, reference-based cutout loads only near the footer and is sampled once into coloured characters, preserving his fluffy coat, face, white bib, and curled resting pose. Cached glyphs provide restrained breathing, head, and tail motion without video. The loop pauses offscreen or in a hidden tab and holds a static pose under reduced motion. The centered contact foreground remains interactive.
