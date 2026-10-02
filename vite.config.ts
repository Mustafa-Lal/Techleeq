import { defineConfig } from 'vite'
import path from 'path'
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import {
  ROUTE_SEO,
  canonicalUrl,
  absoluteImage,
  webPageSchema,
  breadcrumbSchema,
  type RouteSEO,
} from './src/app/seo.config'


function figmaAssetResolver() {
  return {
    name: 'figma-asset-resolver',
    resolveId(id) {
      if (id.startsWith('figma:asset/')) {
        const filename = id.replace('figma:asset/', '')
        return path.resolve(__dirname, 'src/assets', filename)
      }
    },
  }
}

/* ── SEO prerendering ──────────────────────────────────────────────────────
 * This app is a client-rendered SPA, so without this every route would serve
 * the homepage's <head>. For each STATIC route we emit a dedicated
 * dist/<route>/index.html whose title/description/canonical/OG/JSON-LD are
 * correct in the raw HTML (before any JS runs) — which is what crawlers index.
 * Also (re)generates sitemap.xml from the same source of truth.
 * Dynamic CMS routes (/services/:id, /products/:id) stay client-rendered.
 */
function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function replaceTag(html: string, regex: RegExp, replacement: string): string {
  return regex.test(html) ? html.replace(regex, replacement) : html
}

function renderRouteHtml(baseHtml: string, route: RouteSEO): string {
  const url = canonicalUrl(route.path)
  const image = escapeHtml(absoluteImage(route.image))
  const title = escapeHtml(route.title)
  const desc = escapeHtml(route.description)

  let html = baseHtml
  html = replaceTag(html, /<title>[\s\S]*?<\/title>/, `<title>${title}</title>`)
  html = replaceTag(html, /(<meta name="description" content=")[\s\S]*?(")/, `$1${desc}$2`)
  html = replaceTag(html, /(<link rel="canonical" href=")[\s\S]*?(")/, `$1${url}$2`)
  html = replaceTag(html, /(<meta property="og:title" content=")[\s\S]*?(")/, `$1${title}$2`)
  html = replaceTag(html, /(<meta property="og:description" content=")[\s\S]*?(")/, `$1${desc}$2`)
  html = replaceTag(html, /(<meta property="og:url" content=")[\s\S]*?(")/, `$1${url}$2`)
  html = replaceTag(html, /(<meta property="og:image" content=")[\s\S]*?(")/, `$1${image}$2`)
  html = replaceTag(html, /(<meta name="twitter:title" content=")[\s\S]*?(")/, `$1${title}$2`)
  html = replaceTag(html, /(<meta name="twitter:description" content=")[\s\S]*?(")/, `$1${desc}$2`)
  html = replaceTag(html, /(<meta name="twitter:image" content=")[\s\S]*?(")/, `$1${image}$2`)

  // Per-page structured data: WebPage + (for non-home) BreadcrumbList.
  const schema: Record<string, unknown>[] = [webPageSchema(route)]
  if (route.path !== '/') {
    schema.push(
      breadcrumbSchema([
        { name: 'Home', path: '/' },
        { name: route.label, path: route.path },
      ]),
    )
  }
  const ld = schema
    .map((s) => `<script type="application/ld+json">${JSON.stringify(s)}</script>`)
    .join('\n      ')
  html = html.replace('</head>', `      ${ld}\n    </head>`)

  return html
}

function renderSitemap(): string {
  const today = new Date().toISOString().slice(0, 10)
  const urls = Object.values(ROUTE_SEO)
    .filter((r) => r.inSitemap !== false)
    .map((r) =>
      [
        '  <url>',
        `    <loc>${canonicalUrl(r.path)}</loc>`,
        `    <lastmod>${today}</lastmod>`,
        `    <changefreq>${r.changefreq ?? 'monthly'}</changefreq>`,
        `    <priority>${(r.priority ?? 0.5).toFixed(1)}</priority>`,
        '  </url>',
      ].join('\n'),
    )
    .join('\n')
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`
}

function seoPrerender() {
  let outDir = 'dist'
  return {
    name: 'seo-prerender',
    apply: 'build' as const,
    configResolved(config) {
      outDir = config.build.outDir
    },
    closeBundle() {
      const root = path.resolve(__dirname, outDir)
      const baseHtml = readFileSync(path.join(root, 'index.html'), 'utf-8')

      for (const route of Object.values(ROUTE_SEO)) {
        const html = renderRouteHtml(baseHtml, route)
        if (route.path === '/') {
          writeFileSync(path.join(root, 'index.html'), html)
        } else {
          const dir = path.join(root, route.path.replace(/^\//, ''))
          mkdirSync(dir, { recursive: true })
          writeFileSync(path.join(dir, 'index.html'), html)
        }
      }

      writeFileSync(path.join(root, 'sitemap.xml'), renderSitemap())

      const count = Object.keys(ROUTE_SEO).length
      console.log(`\n[seo-prerender] wrote ${count} prerendered route(s) + sitemap.xml`)
    },
  }
}

export default defineConfig({
  plugins: [
    figmaAssetResolver(),
    // The React and Tailwind plugins are both required for Make, even if
    // Tailwind is not being actively used – do not remove them
    react(),
    tailwindcss(),
    seoPrerender(),
  ],
  resolve: {
    alias: {
      // Alias @ to the src directory
      '@': path.resolve(__dirname, './src'),
    },
  },

  // File types to support raw imports. Never add .css, .tsx, or .ts files to this.
  assetsInclude: ['**/*.svg', '**/*.csv'],
})
