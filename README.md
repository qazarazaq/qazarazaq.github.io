# Wildan Razaq Portfolio

A responsive UI/CX design portfolio built with React, TypeScript, Vite, and plain CSS. The static site deploys to GitHub Pages from `master`.

## Development

```bash
npm ci
npm run dev
npm run build
```

The build is written to `dist/`. No new runtime dependencies are required for the hiring portfolio release.

## Editing content

- Opening and layered actual-screen composition: `src/components/Hero.tsx`.
- Project narratives and evidence layout: `src/components/Portfolio.tsx`.
- Screen assets, product names, and public product URLs: `src/data/portfolio.ts`.
- About and work/education tiles: `src/components/About.tsx` and `ExperienceTiles.tsx`.
- Contact and the roaming ASCII Kiko: `src/components/Footer.tsx` and `AsciiCat.tsx`.
- Social links: `src/data/social.ts`.
- Design tokens: `src/index.css`; layout and components: `src/portfolio.css`.
- Preserved airplane-window gallery styling: `src/travel.css`; destination metadata: `src/data/travel.ts`.

Gold / ATM Emas, Livin' Food, and Kopra SCM are the main projects. Livin Auto and Sukha Donasi are grouped separately as more work. Keep all product names, verified ownership, and the owner's exact About copy intact. Do not publish internal operations, transaction-security work, or unpublished Belanja designs. Do not invent outcomes, metrics, or research.

## Assets and privacy

All product screens are the owner's actual read-only Figma exports, optimized as WebP. No source Figma file is edited. ATM screens remain rounded and frameless; phone artwork is from the supplied Corpweb reference. Kopra identifiers, names, financial values, and dates remain masked in the original public asset. See `public/work/SOURCES.md` for provenance.

Travel photos, destination metadata, album links, the airplane-window artwork and carousel gesture logic are retained. The owner's original portrait and illustrated avatar are also preserved. Brand logos reveal their original colors on hover. The self-hosted Plus Jakarta Sans font includes its SIL license.

## Resume

The downloadable, single-page PDF is `public/resume/Wildan-Razaq-Ramadhan-Resume.pdf`. Its editable source is `content/resume.html`. It uses the owner's LinkedIn employment and education dates plus verified project scope, without freelance work, high school, GPA or invented results. Standard Arial is used in the PDF for reliable text extraction; the site uses Plus Jakarta Sans.

Open the HTML in a browser to edit or print it. To regenerate with Playwright installed, use `node scripts/build-resume.mjs`; `PLAYWRIGHT_MODULE` can point to a bundled Playwright installation. Recheck the one-page layout, text extraction and links after editing. The committed PDF is copied into production, so generating it is not a deployment dependency.

## Interaction and accessibility

The Work CTA jumps directly to the projects; direct section URLs also resolve after the React application mounts. The centred hero opens with the actual Gold, Food and frameless ATM screens. One 360px pinned scroll reveal spreads the phones and brings the masked Kopra workspace into view. Work and Resume remain available before the sequence. Mobile and reduced motion use a compact unpinned composition. Other screens retain subtle translations and reveals; native page scrolling is never intercepted. Screen dialogs fit the entire interface by default, offer explicit zoom/pan, close with a centered SVG or Escape, contain keyboard focus, and restore focus to their trigger. Section navigation, the mobile menu, portrait hover/tap, and travel keyboard/touch controls work without a motion toggle. System reduced-motion preferences are respected.

Kiko is a separately loaded walking orange-and-white Persian cat built from animated contours on a character grid. She roams around the full footer on a steady curved route, turns to follow her direction, and passes behind the protected central contact content. The canvas cannot intercept clicks. Reduced motion keeps her still; the loop pauses offscreen and in a hidden tab. No cat photo or video is loaded. Her route geometry is in `src/lib/catPath.ts`.

## Deployment and rollback

Pushes to `master` trigger `.github/workflows/deploy.yml`, which builds with Node 20 and deploys to GitHub Pages. Pages must use GitHub Actions as its publishing source. There is no Vercel deployment.

The pre-release website is saved under tag `portfolio-pre-hiring-2026-10-31` and branch `archive/portfolio-pre-hiring-2026-10-31`, both at `8cc23c34ba0424af7e89b7e5b03fd0e124b13050`.

The hiring release and hero/Kiko refinement use separate squash-merged pull requests. The intermediate hiring version is also saved as `portfolio-hiring-v1-2026-10-31` (`a8535eaacd3642fefebb552981749d3959a527e9`). Reverting only the refinement keeps the resume and hiring-focused case studies. On GitHub, open that merged pull request, choose **Revert**, and merge the generated revert pull request. Pages redeploys the previous version and both versions remain in history. See `docs/HIRING-PASS.md` for source details and the release design contract. Do not reset or force-push `master`.
