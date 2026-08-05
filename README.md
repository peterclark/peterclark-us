# peterclark.us

Personal résumé site for Peter Clark — a single-page React app, deployed on Netlify.

Replaces the previous Gatsby 2 site at [peterclark/peterclark](https://github.com/peterclark/peterclark).

## Stack

| | |
| --- | --- |
| Build | Vite 8 |
| UI | React 19 + TypeScript |
| Styling | Tailwind CSS 4 |
| Components | shadcn/ui (new-york), Radix primitives |
| Icons | lucide-react |
| Fonts | Geist / Geist Mono, self-hosted via Fontsource |
| Hosting | Netlify |

## Commands

```
npm install
npm run dev       # dev server at http://localhost:5173
npm run build     # typecheck + production build to dist/
npm run preview   # serve the built bundle
npm run lint      # oxlint
```

## Editing the content

Everything that appears on the page lives in [`src/data/resume.ts`](src/data/resume.ts) —
profile, roles, clients, skills, education, certifications. No JSX changes needed to
update the résumé itself.

A few notes on how that data behaves:

- `PROFILE.since` drives the "27 years" arithmetic. It is computed against the current
  year at render, so it never goes stale.
- A role with `end: "present"` is styled as the current position.
- `lead` marks the headline technologies in any `stack` or skill group — they render as
  filled badges, the rest as outline.
- Client logos are imported from `src/assets/logos` and flattened to monochrome by
  `LogoMark`, which inverts them in dark mode. Hover restores the original colors.

## Design

Light and dark themes are defined as CSS custom properties in
[`src/index.css`](src/index.css) and consumed through Tailwind's `@theme inline`.
The theme follows the OS preference by default and can be toggled; the choice
persists to `localStorage`, and an inline script in `index.html` applies it before
first paint to avoid a flash.

The page also carries a print stylesheet — "Download résumé" calls `window.print()`,
which drops the navigation and chrome and lays the content out as ink on paper.

## Adding shadcn components

`components.json` is configured, so new primitives can be pulled in directly:

```
npx shadcn@latest add <component>
```

## Deployment

Netlify builds from `netlify.toml`: `npm run build` publishing `dist/`. Connect the
repository in the Netlify dashboard and point the `peterclark.us` domain at the site.
