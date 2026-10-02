/**
 * seo.config.ts — Single source of truth for all SEO metadata.
 *
 * Consumed by:
 *   - useSEO()           → runtime per-route <head> updates (client navigation)
 *   - the prerender Vite plugin (vite.config.ts) → static per-route HTML at build
 *   - the sitemap generator (same plugin)        → dist/sitemap.xml
 *
 * Keep this file framework-free (no JSX, no browser-only APIs) so the Node-side
 * build tooling can import it directly.
 */

/**
 * Real, owned social/profile URLs (confirmed by the owner). Single source of
 * truth — used for schema `sameAs` AND the footer icons so they can never drift
 * apart. Only put genuinely-owned profiles here; fake ones hurt entity trust.
 */
export const SOCIAL = {
  linkedin: 'https://www.linkedin.com/company/techleeq',
  instagram: 'https://www.instagram.com/techleeq',
  github: 'https://github.com/techleeq',
} as const;

export const SITE = {
  name: 'Techleeq',
  /** Used to disambiguate from the similarly-spelled "TechLeez" entity. */
  alternateName: 'Techleeq',
  url: 'https://techleeq.com',
  /** Absolute URL to the default social-share / logo image. */
  defaultImage: 'https://techleeq.com/assets/logo.png',
  description:
    'Techleeq builds custom digital solutions and ready-to-scale software products for SMEs and enterprises — streamlining operations, elevating brands, and powering growth.',
  email: 'hello@techleeq.com',
  sameAs: [SOCIAL.linkedin, SOCIAL.instagram, SOCIAL.github],
} as const;

export interface RouteSEO {
  /** Route path, e.g. '/about'. '/' for home. */
  path: string;
  title: string;
  description: string;
  /** Short label used for breadcrumbs and nav context. */
  label: string;
  /** Root-relative or absolute share image; defaults to the site logo. */
  image?: string;
  changefreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority?: number;
  /** When false, the route is excluded from the sitemap (still indexable). */
  inSitemap?: boolean;
}

/**
 * Canonical metadata for every STATIC route.
 * Dynamic detail routes (/services/:id, /products/:id) are handled at runtime
 * by useSEO since their content comes from the CMS.
 */
export const ROUTE_SEO: Record<string, RouteSEO> = {
  '/': {
    path: '/',
    label: 'Home',
    title: 'Techleeq – Business Management Software for SMEs & Enterprises',
    description:
      'Techleeq builds custom software and ready-to-scale digital products that streamline your operations, elevate your brand, and power business growth.',
    changefreq: 'monthly',
    priority: 1.0,
  },
  '/about': {
    path: '/about',
    label: 'About',
    title: 'About Techleeq – Our Mission, Team & Story',
    description:
      "Learn about Techleeq's journey, our values, and the team behind our business management software platform.",
    changefreq: 'yearly',
    priority: 0.7,
  },
  '/services': {
    path: '/services',
    label: 'Services',
    title: 'Professional Services – Implementation & Support | Techleeq',
    description:
      "From discovery call to long-term success — Techleeq's services team ensures fast adoption, smooth operations, and measurable ROI for your business.",
    changefreq: 'monthly',
    priority: 0.8,
  },
  '/products': {
    path: '/products',
    label: 'Products',
    title: 'Products – Integrated Business Management Platform | Techleeq',
    description:
      'One platform for every business function. Explore Techleeq’s integrated modules that replace a stack of disconnected tools — data flows between them.',
    changefreq: 'monthly',
    priority: 0.9,
  },
  '/careers': {
    path: '/careers',
    label: 'Careers',
    title: 'Careers at Techleeq – Join Our Team',
    description:
      'Help build the future of business software. View open roles at Techleeq and make your impact.',
    changefreq: 'weekly',
    priority: 0.7,
  },
  '/contact': {
    path: '/contact',
    label: 'Contact',
    title: 'Contact Techleeq – Get In Touch With Our Team',
    description:
      'Have a question, need a demo, or want to start a project? Reach the Techleeq team — we respond within one business day.',
    changefreq: 'yearly',
    priority: 0.6,
  },
  '/apply': {
    path: '/apply',
    label: 'Apply',
    title: 'Apply for a Role at Techleeq',
    description:
      'Apply to join the Techleeq team and help build practical digital solutions for businesses.',
    changefreq: 'monthly',
    priority: 0.5,
  },
  '/privacy': {
    path: '/privacy',
    label: 'Privacy Policy',
    title: 'Privacy Policy | Techleeq',
    description:
      'Read Techleeq’s privacy policy to understand how we collect, use, and protect your personal data across our business management platform.',
    changefreq: 'yearly',
    priority: 0.4,
  },
  '/terms': {
    path: '/terms',
    label: 'Terms of Service',
    title: 'Terms of Service | Techleeq',
    description:
      'Review Techleeq’s terms of service governing the use of our software platform and services.',
    changefreq: 'yearly',
    priority: 0.4,
  },
  '/cookies': {
    path: '/cookies',
    label: 'Cookie Policy',
    title: 'Cookie Policy | Techleeq',
    description:
      'Learn how Techleeq uses cookies to improve your experience on our website.',
    changefreq: 'yearly',
    priority: 0.3,
  },
};

/** Build an absolute canonical URL for a given path. */
export function canonicalUrl(path: string): string {
  if (path === '/') return `${SITE.url}/`;
  const clean = path.startsWith('/') ? path : `/${path}`;
  return `${SITE.url}${clean}`;
}

/** Resolve a share image (root-relative or absolute) to an absolute URL. */
export function absoluteImage(image?: string): string {
  if (!image) return SITE.defaultImage;
  return image.startsWith('http') ? image : `${SITE.url}${image}`;
}

/** Organization structured data (stable across the whole site). */
export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${SITE.url}/#organization`,
    name: SITE.name,
    alternateName: SITE.alternateName,
    url: `${SITE.url}/`,
    logo: SITE.defaultImage,
    description: SITE.description,
    email: SITE.email,
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer support',
      email: SITE.email,
      availableLanguage: 'English',
    },
    sameAs: SITE.sameAs,
  };
}

/** WebSite structured data — helps Google establish the site name/entity. */
export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE.url}/#website`,
    url: `${SITE.url}/`,
    name: SITE.name,
    alternateName: SITE.alternateName,
    publisher: { '@id': `${SITE.url}/#organization` },
  };
}

/** Per-page WebPage node linked to the site's WebSite entity. */
export function webPageSchema(route: RouteSEO) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${canonicalUrl(route.path)}#webpage`,
    url: canonicalUrl(route.path),
    name: route.title,
    description: route.description,
    isPartOf: { '@id': `${SITE.url}/#website` },
    about: { '@id': `${SITE.url}/#organization` },
  };
}

/**
 * BreadcrumbList structured data from an ordered list of crumbs.
 * Each crumb: { name, path }. The last crumb is the current page.
 */
export function breadcrumbSchema(crumbs: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.name,
      item: canonicalUrl(c.path),
    })),
  };
}
