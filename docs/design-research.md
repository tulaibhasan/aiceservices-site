# Design research for the AICE Services revamp

These are study notes on the reference sites in `../reference-sites`. We used them to learn structure, motion and layout ideas only. **No code, text, images, fonts, logos or branding from these sites is used in the AICE site.** Everything in `src/` was written fresh for AICE.

Reference folders found: `ocimadebybuzzworthy` (Outsource Consultants), `structureengineering`, `weevolveit-com`, `secure-the-unknown-cyera-com`, `mecha-xyz-webflow-io`, `subduxion-com`, `genomines-com`, `anduril-com`, `planhat-com` (Frontier).

- **Missing:** `konk-electrical`. There's no folder for it, so the four-tool scroll journey is based on the plan's description ("one continuous scroll through four trades") rather than on its code.
- **Nearly empty:** `secure-the-unknown-cyera-com`. Its capture only shows "Your browser is not supported", so the key-security demo is based on the idea (a small interactive explainer), not on its build.

---

## 1. Outsource Consultants (main style anchor)

**What we saw:** a Nuxt build that uses Lenis smooth scroll. It has a WebGL/canvas pointer trail and a dither/halftone filter over a single-colour (ultramarine on warm paper) photo of a building facade. Thin 1px vertical rules split the page into a visible column grid. All labels are set in a small uppercase mono face (like annotations on a drawing). Section counters in the corners read like a drawing's sheet number ("OCI.2"). The services list is an accordion with + / × markers. A loader emits a "loader:animation-complete" event that unlocks scrolling.

**Used for AICE:**
- **Duotone, halftone look:** an original SVG infrastructure line drawing (pipes, manholes, a treatment plant in plan view) sits under a CSS dot-screen mask, in one accent colour. No photos are copied.
- **Visible column rules:** fixed 1px lines in the background, one per column of the 12-column grid.
- **Mono annotation labels:** each section has a label like `[ 02 / TOOLS ]` and a sheet code in the corner.
- **Top bar:** a thin mono bar with the logo block on the left, quick links, and a small square **MENU** button that opens a full-screen index overlay.
- **Crosshair loader:** a "blueprint" crosshair draws in, coordinates count up, then the overlay slides away. It's CSS and React only, plays once per browser session, and is skipped for reduced motion.

## 2. Structure Consulting Engineers

**What we saw:** plain CSS split into one file per section (`section-*.css`, `animations.css`, `loader.css`). Full-bleed photography with a large headline on top. Outlined mono "chip" filters (PUBLIC ART / RESIDENTIAL / COMMERCIAL). Small boxed buttons with an arrow cell ("VIEW ALL | →"). A scrolling ticker line.

**Used for AICE:**
- **Ticker:** a pure CSS `@keyframes` marquee (two copies of the track, `translateX(-50%)`). It pauses on hover and goes static for reduced motion.
- **Outlined mono chips:** used on the service and tool cards (e.g. `WATER SUPPLY`, `FIDIC`, `PPRA`).
- **Split-cell button:** a label and an arrow in two bordered cells, used for secondary links.

## 3. WeEvolveIT

**What we saw:** Next.js 14 with Tailwind 3, a charcoal theme, a particle globe on canvas, a mono headline face, and a numbered method ("The 5 method": Discover · Diagnose · Design · Deliver · Evolve). Clear page-per-service structure that works well for SEO.

**Used for AICE:**
- **Charcoal sections:** dark "ink" sections alternate with light "paper" ones.
- **Numbered method:** used as the 4-step process.
- **SEO structure:** one H1, an H2 per section, semantic `<section>`s with ids, real text FAQ, and JSON-LD.
- **Not used:** the particle globe, which costs too much performance for this audience.

## 4. Konk Electrical (studied on the live site; there is no code folder for it)

**What we saw:** a WordPress/jQuery site with no WebGL. The famous scroll is pure CSS 3D:
- A tall section holds a `position: sticky` stage with `perspective: ~1150px`.
- Inside it, a `transform-style: preserve-3d` "world" div gets `translate3d(0, 0, Zpx)`, and Z grows with scroll progress, so the camera dollies forward.
- Image "planes" (`<figure>`s) sit on alternating left and right walls at increasing depths, each rotated about 25 to 35° on the Y axis toward the centre, which makes a corridor.
- Each trade's name ("ELECTRICAL", "AUTOMATION", "DATA & NETWORKING") hangs in the middle as a station you fly through.
- A small detail block sits bottom-left.
- The background is near-black with a warm radial glow and a gold accent.

**Used for AICE:** the four-tool journey, which we rewrote from scratch in React with motion.
- `useScroll`, smoothed with `useSpring`, drives one `translate3d` on the world. That's a single composited transform per frame.
- Three plates per tool line the walls: the tool's schematic, a spec sheet (input, output, chips) and a drawing sheet.
- The tool name is the station title.
- A readable detail card (bottom-left) and a station index (bottom-right, clickable) keep everything usable and accessible. Full tool text is also in the DOM for screen readers and SEO.
- Phones and reduced-motion users get stacked panels instead.

## 5. Cyera "Secure the Unknown" (capture empty)

**Idea used:** a small interactive explainer instead of a wall of text. The **"Your key never leaves your browser"** demo works like this:
- The visitor types a pretend key, which is never stored or sent.
- An animated diagram shows the request going **Browser → Google Gemini** directly.
- The **AICE servers** node stays dark and crossed out.
- A toggle shows where the key is kept (`localStorage`, this device only).

## 6. MECHA

**What we saw:** a Webflow site with a restrained serif-and-grotesk scale, lots of white space, isometric line drawings of facilities, small metric tables (label left, value right, hairline rows), and a single accent-colour CTA block.

**Used for AICE:**
- **Custom automation section:** a large, calm headline, an isometric-style line drawing made in SVG, and a hairline "spec table" of what we build. The table lists deliverable / typical stack / output.

## 7. Subduxion

**What we saw:** Framer, a large statement headline next to a short paragraph, dark cards with an ASCII/halftone texture, and pill "Read more →" buttons. There's a news list with tags aligned right and a gradient footer.

**Used for AICE:**
- **Contact flow:** a big statement on the left ("Tell us about the project"), the form on the right, and direct details plus the 4-step process under it.
- **Automation CTA:** one strong primary button.

## 8. Genomines

**What we saw:** Astro, GSAP with CustomEase, and a full-screen organic flow-line WebGL hero in one green tone. There's a small card with an image in the hero corner, and a highlighted text "marker" on key words.

**Used for AICE:**
- **Hero background:** a **lightweight SVG contour/flow field**, generated once in JS with no WebGL. It drifts slowly via a CSS transform and freezes for reduced motion, which suggests water and network lines at almost no cost.
- **Highlight marker:** accent-coloured highlights on key words in headings.

## 9. Anduril

**What we saw:** a custom build with Lenis, big full-bleed media tiles with a small label in the bottom-left corner and an arrow in the bottom-right, and a strict type system. The footer is a sitemap in clean columns.

**Used for AICE:**
- **Founder/About:** a two-column story. The portrait is in duotone with corner crop marks, next to the vision and the founder's note.
- **Compliance strip:** each standard is a tile with a code in the corner ("STD-01") and a short description, laid out like a spec sheet.
- **Footer:** clean sitemap columns.

## 10. Frontier by Planhat

**What we saw:** a cream background, topographic contour lines over aerial imagery, a light grid, a lime accent and text set on bars.

**Used for AICE:**
- **Contour lines:** a subtle background pattern (SVG) in the hero, the contact section and the footer, a fit for terrain, water networks and cities.
- **Grid:** a faint blueprint grid on light sections.

---

## How the references merge

- **Outsource Consultants:** blueprint grid, mono annotation labels, crosshair loader, MENU overlay, halftone line art.
- **Konk:** 3D scroll corridor, warm glow on charcoal.
- **Structure:** amber ticker, outlined chips, split-cell buttons.
- **WeEvolveIT:** charcoal and paper rhythm, numbered method.
- **Genomines and Planhat:** contour and flow lines, text-on-bar highlight (`.hl`).
- **Mecha:** serif accent words, isometric line drawing, hairline spec table.
- **Anduril:** spec-sheet standards tiles, duotone founder portrait with crop marks, sitemap footer.
- **Subduxion:** statement plus form contact flow.
- **Cyera:** interactive key-security explainer.

## Resulting system

| Token | Value | Use |
|---|---|---|
| Paper | `#EFEBE3` | Light sections |
| Ink (charcoal) | `#0E0D0B` | Dark sections, text |
| Accent ("survey amber") | `#E3A13B` fills; `#E8AD4F` text on dark; `#8A5200` text on paper | Single strong accent (warmth from Konk and Genomines, hi-vis construction feel) |
| Display font | Inter Tight 500/600 | Headlines |
| Accent serif | Instrument Serif italic | Key words in headings (a nod to Mecha's editorial serif) |
| Body font | Inter 400/500 | Text |
| Mono | IBM Plex Mono 400/500 | Labels, annotations, chips |

**Motion:**
- Loader (once per session)
- Konk-style 3D corridor through the four tools
- Reveal on scroll (motion `whileInView`)
- Ticker (CSS)
- Four-tool scroll journey (`useScroll`)
- Hover states
- The key demo

`prefers-reduced-motion` turns off all of the above, except the instant state changes the key demo needs to work.

**Imagery:** all illustrations are original SVGs drawn in code: the pipe network, plant plan, contour field and isometric facility. We used no third-party photos, so there's no licence to track. When real project photography is available, it can drop into the same duotone treatment (`.duotone` class).

---

## Design audit and declutter (v3)

**Decisions:**
- **Theme:** kept survey amber on charcoal and paper. It's distinctive, warm and suits an engineering-plus-AI studio better than any single reference.
- **Removed:**
  - The loading screen, which only delayed visitors.
  - The live chatbot widget, which kept hitting API errors.
  - The API-key demo.
  - The 10-tile standards grid (now one line).
  - The separate process section (now three steps inside Contact).
  - Long tool and FAQ copy (cut to 5 questions).
  - The large founder portrait, vision quote and founder's note.
- **Restructured:**
  - The homepage is now: hero → ticker → services corridor → AI assistant showcase → work → about → FAQ → contact.
  - The four free tools moved from the homepage to one Work card and the footer. Their pages and URLs still work.
- **Added services:** custom websites (built in hours on a minimal budget) and AI video editing, next to engineering consultancy and AI assistants.
- **Work section:** Free My TV (freemytv.io), SyncKutub (public releases), AICE Video Studio (in development) and the engineering AI tools.

**Original motion (not taken from any reference):**
- **Plotter drawing:** the hero's network drawing is "plotted" left to right on load, with a pen head sweeping across. It's a CSS `scaleX` clip and plays once.
- **Drafting crosshair:** on desktop, a crosshair with live X/Y coordinates follows the pointer across the hero. It runs only with a fine pointer, and is off for reduced motion.
- **Assistant showcase:** a scripted text conversation with typing indicators. A voice mode adds an animated equaliser waveform and live captions. It makes no API calls, so it cannot fail.
