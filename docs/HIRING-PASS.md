# Hiring portfolio release - 31 October 2026

## Source and design contract

Keep the existing charcoal / pastel blue / Plus Jakarta Sans system and actual exported product screens, portrait, avatar, company logos and travel assets. No Figma mutations, invented projects, results, testimonials, or product screens. Image generation is omitted because the owner's real assets are the visual authority for this editorial refinement.

- Opening: finite, compact introduction, a real product composition, prominent Work and resume access. No scroll-gated preview sequence, floating note cards or numeric project labels.
- Main work: Gold / ATM Emas, Livin' Food, Kopra SCM. Distinct layouts with readable uncropped evidence, short constraints and decisions, and accurately scoped ownership. Gold/Food public product links establish availability without fabricated metrics.
- Food: discovery and menu shown once in the project; saved-cart availability gets a dedicated explanation.
- Kopra: preserve all masking; focus the preview on search/status and offer an optional full workspace view. Never recreate confidential records.
- Supporting work: Livin Auto and Sukha Donasi in their own section.
- About: preserve the owner's exact two paragraphs and portrait interaction. Compact work/education tiles, no dates or GPA in the tiles. LinkedIn and resume access.
- Travel: preserve photos, destination metadata, album links, airplane window geometry and carousel behavior.
- Contact: uniform grid, small isolated ASCII Kiko away from email and social controls.
- Viewer: fit-to-window by default, explicit reversible zoom/pan, centered SVG close, keyboard/focus behavior.
- Motion: restrained real-screen movement, subtle reveals, arrow interaction and portrait blend. No scroll trapping; reduced motion respected.

## Resume source

Employment dates/titles, education and tools are based on the owner's public LinkedIn profile, retrieved 31 October 2026: https://id.linkedin.com/in/wildanrazaq . Project scope is based on the owner's supplied portfolio discussions. Public search retrieved the profile content; the direct browser reached LinkedIn's sign-in wall. Freelance work, high school, GPA and unsupported metrics are omitted. The old "fresh graduate" profile headline is not reused. The PDF uses standard Arial for reliable text extraction; the website retains Plus Jakarta Sans.

- Bank Mandiri: User Experience Designer, January 2023 - present.
- Telkom Indonesia: User Interface Designer, February 2022 - December 2022.
- Telkom Indonesia: User Interface Designer Intern, March 2021 - February 2022.
- BINUS University: Bachelor's degree, Information Systems, 2018 - 2022.
- Profile-listed tools: Figma, Miro, Jira.

## Rollback

The exact preceding website is preserved by tag `portfolio-pre-hiring-2026-10-31` and branch `archive/portfolio-pre-hiring-2026-10-31`, both pointing to `8cc23c34ba0424af7e89b7e5b03fd0e124b13050`.

This release is delivered through one squash-merged pull request. To undo it on GitHub: open the merged release pull request, select Revert, create the revert pull request, and merge it into master. The existing Pages workflow redeploys automatically. This adds a reversal commit and retains both versions in history. Do not reset or force-push master.

If later changes have been made, ask for a targeted restore so those changes are preserved. A local alternative immediately after release is `git revert RELEASE_COMMIT` followed by `git push origin master`.

## Final verification record

- The first project begins at approximately 751px on a 1440x1000 desktop viewport and 725px on a 390x844 mobile viewport, rather than the preceding roughly 3063px / 2852px opening.
- Seven responsive widths checked: 320, 390, 599, 768, 1024, 1440, 1920. Additional hero checks at 810px.
- All nine unique screen previews tested for initial fit, explicit zoom/fit, centered SVG close, Escape dismissal and restored focus.
- Work CTA, direct section URLs, mobile menu, Contact highlight, exact About copy, portrait hover/tap, travel keyboard/next/album and touch swipe checked.
- Gold mobile native swipe, shared screen-caption baseline and compact company-logo alignment checked separately.
- Kiko is isolated from contact controls; animation and reduced motion checked. The ASCII module is loaded only near the footer.
- Original work exports, redacted Kopra asset, portrait/avatar, travel photo files and travel metadata are unchanged. Travel source changes are limited to SVG arrow icons; carousel gesture logic is retained.
- Resume verified as one selectable-text A4 page, with exact names/dates/tools, clickable contact links, and no freelance/GPA/high-school section. Its rendered page was visually inspected.
- Visual comparison used the owner's existing site and source assets plus this release design contract, rather than generated product imagery. Palette, font, hierarchy, media cropping, captions, responsive spacing and controls were inspected in browser screenshots. IAB was used for direct visual inspection; bundled Playwright was used for repeatable multi-viewport and touch checks because the Browser plugin was not available.

## Hero and Kiko refinement

The follow-up release removes the redundant project index, opens with a permanent composition of the real Gold guide, ATM selection and Food menu, and retains the composition on mobile. The ATM export has no hardware frame. The opening has a short staggered arrival and restrained scroll movement, disabled under reduced motion.

Kiko uses a newly modeled resting pose rather than the former overhead walking silhouette: a broad Persian face, small ears, sleepy eyes, whiskers, cream bib/paws and a curved bushy tail. Breathing, head movement, blinking, ear flicks and a tail swish animate the character grid. The renderer samples native geometry; no photograph filter or new raster asset is involved.

Initial React fragment navigation is restored after mount, so direct About/Travel/Contact links land at their sections. The prior hiring release is saved under `portfolio-hiring-v1-2026-10-31` at `a8535eaacd3642fefebb552981749d3959a527e9`. Reverting the follow-up PR restores that release without removing the resume or case-study changes. The original pre-hiring tag remains available independently.

## Layered hero and walking Kiko follow-up

The flow under test is: initial page -> hero entrance and scroll/pointer input -> independently moving real product layers, with a stable layout and normal section navigation; Contact -> walking Kiko -> four-leg stride without clipping or obstructing contact actions.

The two owner-supplied dashboard/profile Figma references were read as inspiration only. They suggested strong grouping, soft containers and contrast. Their screens, people and records are not used in the website. No Figma mutations were made. The public hero uses only the existing approved Gold guide, frameless ATM selection, and already-masked Kopra export. The charcoal/blue/Jakarta system is preserved.

Reference mismatch decisions: keep the portfolio dark rather than copying the light personal-data reference; retain the user's own content, typography and product names; use the existing approved screenshots rather than any reference-file screen or data. The hero composition is staged on entry and separates into three independent planes during normal scrolling. Pointer movement is damped and small, touch uses scroll only, and reduced motion disables the transformations. Progress is measured from the untransformed section to avoid positional feedback.

Kiko is rebuilt as an articulated side-on walking character. Short legs, a broad short-muzzled head, small ears, fluffy body, raised plume, cream bib and paws follow the supplied orange-and-white cat reference. The opposite diagonal legs swing while planted paws stay low. Procedural contour/fur shading generates the ASCII glyphs directly; no photograph, raster filter, model download, dependency or new public asset is added. The footer module remains lazy-loaded and pauses offscreen or when the tab is hidden.

The preceding live version is preserved under tag `portfolio-before-walking-kiko-2026-10-31` at `77f3511bb64b88fd809e8f9632ecbc1dc07c7c99`. This follow-up is separately reversible through its squash-merged PR.

QA uses IAB for direct visual review and bundled Chromium/Playwright for repeatable seven-width checks because the Browser plugin/skill is unavailable. No browser dependencies are installed.

Final follow-up QA: production build passed; seven widths (320, 390, 599, 768, 1024, 1440, 1920); independent scroll transforms, pointer settling and return-to-top stability; reduced motion; walking cycle bounds and offscreen pause; unobstructed contact controls; preview zoom/fit/Escape; mobile Contact navigation and direct Contact loading; resume response. No application warnings/errors or missing assets were observed. Chromium emits a diagnostic only when the QA script repeatedly reads canvas pixels for its clipping checks; that test-generated readback message is excluded from application-console findings.
