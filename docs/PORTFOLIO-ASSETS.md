# Portfolio media and interaction sources

The product screens remain exports of the owner's work. Figma was read and exported only; no source designs, components, copy, or export settings were edited. Only the owner-approved live work is included. No unpublished product documents are bundled with this site.

## Additional shots

- Misi: completed mission, reward level and claim action. Top Challenge is excluded.
- Virtual Account: provider lookup. Entered account numbers are covered in the flattened public asset.
- Passport onboarding: document preparation. No identity document, personal record or captured face is shown.
- Sukha — Maroon 5: the published ticketing entry screen.
- GEALILEO: the shipped Mitra procurement list. Procurement titles, dates, identifiers, people and record count are covered in the flattened public asset. The applicant dashboard is not published.

Original full-size unmasked review exports are not included in the repository. Existing Kopra masking is preserved. The website does not add measured results or claim ownership beyond the known work.

## Device frames

- MacBook Pro frame: Monkr, copyright Blaine Miller, MIT; full license and source links in `public/work/DEVICE-FRAMES-LICENSE.txt`.
- ATM casing: generated hardware illustration based on the owner-supplied public machine photograph, https://www.instagram.com/p/DfCXdPAO4Qa/ . The reference was used for the navy cabinet, gold ornament, control column and dispensing slots. The generated asset contains a blank display; each original UI export is layered separately with `object-fit: contain`. UI pixels are not generated or repainted. The project view crops the cabinet to the console for legibility; the hero uses the full machine.
- Hardware-generation brief: a front-facing transparent cutout of the navy-and-gold Mandiri gold ATM, matching the supplied physical reference, with an empty black portrait display and no generated product UI. Optimize the resulting casing to WebP. Composite the real interface separately.
- Phone frames and original product exports retained from the existing portfolio.

## Footer cats

The dimensional cats use Quaternius's CC0 Animated Animals Vol. 2 cat model, downloaded from the Hydeco Games mirror and converted from FBX to GLB. The geometry is consolidated into three material groups. See `public/cats/LICENSE.txt` for attribution and source information.

The renderer uses the supplied Kiko photograph as a visual reference for an orange coat and cream chest, plus cobby proportions, small facial features and whiskers. It is a stylized character, not a generated photo or a photo filter. Skeleton animation controls the walk; each cat follows its own path, with gentle pointer interest away from contact links. The renderer loads near the footer, caps pixel density and frame rate, and pauses offscreen or while the page is hidden. Reduced-motion and unavailable-WebGL states use a transparent image exported from the same rendered scene.

## Typography and portrait

Plus Jakarta Sans remains the main typeface. The word “finance.” alone cycles through Jakarta, an OFL Instrument Serif italic subset, and the platform monospace font, without moving the heading or changing its accessible wording. Font licenses are included under `public/fonts/`.

The portrait animation reveals the owner's original illustration through paths aligned to its ink. The actual photo and illustration files are unchanged. Hover, keyboard focus and tap are supported; reduced motion switches directly.

## Reverting this release

The preceding production version is preserved at tag `portfolio-before-dimensional-footer-2026-10-31`, commit `26793dacb878527d11c786b1c48d995bfbc6d80e`.

On GitHub, open this release's merged pull request and choose **Revert**. Create the resulting pull request and merge it into `master`; GitHub Pages rebuilds automatically. This keeps both versions in history. If newer changes have since landed, use a targeted restore rather than resetting or force-pushing the branch.
