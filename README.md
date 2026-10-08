# Pratyush Singh — Portfolio

A dark, minimal portfolio (pure black, hairline borders, one indigo accent) built around a **sticky project showcase**. Conventional to navigate, deliberately not conventional to look at.

**Stack:** React 18 · Vite · Framer Motion.

## Highlights

- **Sunset aurora** — three large blurred colour fields drift slowly behind the page in orange, rose and violet, lit further by a soft glow that follows the cursor.
- **Sticky project showcase** — each project's summary card pins to the viewport while its detailed points scroll past, so the reader always knows which project they're inside. WorkNest's card carries its deployed architecture (Vercel → AWS EC2 → Neon); Wardrobe AI's carries a sample score breakdown.
- **Spotlight cards** — education, skills and certification cards catch a warm highlight under the pointer, written via CSS custom properties (one style write per move, no re-renders).
- **Deploy console** — the hero types out the real WorkNest deployment, line by line.
- **Sunrise loader** — a warm sun rises over a horizon line as the counter climbs, then the whole curtain lifts.
- Kinetic masked headline with an **Instrument Serif** italic accent in gradient, count-up stats, animated nav pill, scroll progress bar, and an infinite tech marquee.
- Responsive down to mobile (the showcase unstacks to a single column), and `prefers-reduced-motion` respected throughout.

## Run

```bash
npm install
npm run dev
```

Opens at http://localhost:5181.

## Build & deploy

```bash
npm run build
```

Deploy the `dist/` folder to Vercel / Netlify / GitHub Pages.

## Edit content

Everything lives in [`src/data.js`](src/data.js) — profile, stats, projects (with their points and metrics), skills, certifications, achievements, education, the hero console lines and the project visuals.

The résumé is served from `public/Pratyush_Singh_Resume.pdf`.
