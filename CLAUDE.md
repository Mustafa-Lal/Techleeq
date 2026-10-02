# CLAUDE.md

Guidance for Claude Code (and future sessions) when working in this repo.

## What this is

**TechLeeq UI/UX System** — a marketing/corporate website built as a single-page
React app. It originated as a Figma "Make" export
(https://www.figma.com/design/uO12vFSLkR5ck1uTrWEkUF/Design-TechLeeq-UI-UX-System)
and is deployed as static assets on **Cloudflare** (Wrangler, SPA routing).

## Stack

- **React 18** + **TypeScript**, bundled with **Vite 6**
- **react-router 7** (`createBrowserRouter`) for client-side routing
- **Tailwind CSS v4** (via `@tailwindcss/vite`) — configured in CSS, no `tailwind.config.js`
- **Radix UI** primitives + **shadcn**-style components in `src/app/components/ui/` (~48 components)
- **MUI** (`@mui/material`), **lucide-react** / MUI icons, **recharts**, **motion**, **sonner**, **embla/slick** carousels
- Deploy: **Cloudflare** via `wrangler.jsonc` (serves `./dist`, SPA fallback)

## Commands

```bash
npm i          # install deps
npm run dev    # Vite dev server
npm run build  # production build -> dist/
npm run start  # serve the built dist/ locally (npx serve -s dist)
```

There is no test runner, linter, or typecheck script configured.

## Layout

```
src/
  main.tsx                 # entry: mounts <App/> inside <ThemeProvider>
  app/
    App.tsx                # RouterProvider only
    routes.ts              # ALL routes live here (single source of truth)
    utils.ts               # shared helpers (cn, etc.)
    components/
      Layout.tsx           # shell: Navigation + <Outlet/> + Footer
      Navigation.tsx, Footer.tsx, HeroSection.tsx, ... # page sections
      ui/                  # shadcn/Radix primitives (button, dialog, ...)
      figma/               # ImageWithFallback helper
    contexts/ThemeContext.tsx   # light/dark theme provider
    hooks/useSEO.ts             # per-page SEO/meta
    pages/                 # one file per route (HomePage, ServicesPage, ...)
  imports/                 # raw Figma-exported content/text
  styles/                  # index.css, globals.css, theme.css, tailwind.css, fonts.css
  assets/                  # images (resolved from `figma:asset/...` imports)
```

## Routing

Routes are defined centrally in [routes.ts](src/app/routes.ts) under a single
`Layout` parent. Current routes: `/`, `/about`, `/services`, `/services/:id`,
`/products`, `/products/:id`, `/careers`, `/contact`, `/privacy`, `/terms`,
`/cookies`, `/apply`, and a `*` NotFound. **To add a page:** create it in
`src/app/pages/` and register it in `routes.ts`.

## Conventions & gotchas

- **Import alias:** `@` -> `src` (e.g. `@/app/components/ui/button`).
- **Figma assets:** imports starting with `figma:asset/<file>` resolve to
  `src/assets/<file>` via a custom plugin in [vite.config.ts](vite.config.ts).
  Don't rename that plugin or the `src/assets` convention.
- The React and Tailwind Vite plugins must both stay in `vite.config.ts` even if
  Tailwind looks unused (required by the Figma Make setup).
- `assetsInclude` handles raw `.svg`/`.csv` imports — do not add `.css/.ts/.tsx` there.
- Styling is Tailwind v4 (config-in-CSS) plus the theme CSS files in `src/styles/`.
  `default_shadcn_theme.css` at the repo root is a reference theme.
- **Prefer existing `ui/` primitives** over adding new component libraries.
- `dist/` and `dist.zip` are build output — don't hand-edit them.

## SEO system

SEO is centralized and partly build-generated — **don't hand-edit per-page meta**.

- **Single source of truth:** [seo.config.ts](src/app/seo.config.ts) holds `SITE`
  (name, url, socials/`sameAs`, logo) and `ROUTE_SEO` (title/description/
  changefreq/priority per static route), plus schema builders
  (`organizationSchema`, `websiteSchema`, `webPageSchema`, `breadcrumbSchema`).
- **Runtime:** static pages call `useSEO(ROUTE_SEO['/path'])`
  ([useSEO.ts](src/app/hooks/useSEO.ts)) to update `<head>` on client navigation.
  CMS-driven detail pages (`/services/:id`, `/products/:id`) build their SEO from
  fetched data at runtime.
- **Build-time prerendering:** the `seo-prerender` plugin in
  [vite.config.ts](vite.config.ts) runs after bundling and emits a dedicated
  `dist/<route>/index.html` per static route with correct title/description/
  canonical/OG/JSON-LD in the **raw HTML** (crawlers don't wait for JS). It also
  regenerates `dist/sitemap.xml` from `ROUTE_SEO`. **To add/rename a static
  route's SEO, edit `ROUTE_SEO` only** — pages, sitemap, and prerender all follow.
- **Base `<head>`:** [index.html](index.html) carries the site-wide Organization
  + WebSite JSON-LD and the homepage defaults (also used in dev).
- **Breadcrumbs:** [Breadcrumbs.tsx](src/app/components/Breadcrumbs.tsx) renders a
  visible trail + `BreadcrumbList` schema (via
  [JsonLd.tsx](src/app/components/JsonLd.tsx)) on detail pages.
- **Off-code tasks (not in repo):** Google Search Console (submit sitemap,
  request indexing), verify the real `sameAs` profile URLs, and keep the brand
  spelled "Techleeq" everywhere to disambiguate from "TechLeez".

## Git

Branch `master`. The git author on this machine is `Mustafa9221`; the project
owner is Hamza. Commit only when asked.
