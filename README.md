# Wildan Razaq Ramadhan Portfolio

Premium dark-mode one-page portfolio for GitHub Pages, rebuilt with Vite, React, TypeScript, Tailwind CSS, generated portfolio key visuals, and subtle Framer Motion reveals.

## Local Development

```bash
npm install
npm run dev
```

Open the local URL shown by Vite.

## Build

```bash
npm run build
```

The production output is generated in `dist/`.

## Preview Production Build

```bash
npm run preview
```

## Deploy

This repo deploys through GitHub Actions from the `master` branch.

1. Push to `master`.
2. In GitHub, set Pages source to **GitHub Actions** if it is not already configured.
3. The workflow builds the Vite app and publishes `dist/` to GitHub Pages.

## Editing Portfolio Links

Portfolio content is data-driven in:

```text
src/data/portfolio.ts
```

Replace the placeholder Figma and Behance URLs in each project object when final case-study links are ready.

Generated portfolio cover assets live in:

```text
public/portfolio/
```

Replace the `cover` path in each project object if a future key visual changes.

## Editing Travel Albums

The KaburAja Dulu travel module is recreated from `https://qazartrip.figma.site/`.
Travel album data lives in:

```text
src/data/travel.ts
```

The airplane-window frame is stored at:

```text
public/travel/airplane-window.png
```

## Editing Social Links

Contact links live in:

```text
src/data/social.ts
```
