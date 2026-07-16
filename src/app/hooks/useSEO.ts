/**
 * useSEO — Dynamic per-page SEO meta tag injection
 *
 * Updates <title>, <meta description>, <link canonical>, Open Graph,
 * and Twitter Card tags on every route change without any extra library.
 *
 * Usage:
 *   useSEO({
 *     title: 'Page Title | Techleeq',
 *     description: 'Page-specific description.',
 *     path: '/about',          // appended to https://techleeq.com
 *     image: '/assets/og.png', // optional, defaults to logo
 *   });
 */

import { useEffect } from 'react';

const SITE_NAME = 'Techleeq';
const BASE_URL = 'https://techleeq.com';
const DEFAULT_IMAGE = `${BASE_URL}/assets/logo.png`;

interface SEOProps {
  title: string;
  description: string;
  /** URL path for canonical + og:url, e.g. '/about' */
  path?: string;
  /** Absolute or root-relative image URL for OG/Twitter */
  image?: string;
}

function setMeta(selector: string, attr: string, value: string) {
  let el = document.querySelector<HTMLMetaElement | HTMLLinkElement>(selector);
  if (!el) {
    if (selector.startsWith('link')) {
      el = document.createElement('link');
      (el as HTMLLinkElement).rel = 'canonical';
    } else {
      el = document.createElement('meta');
      const match = selector.match(/\[(?:name|property)="([^"]+)"\]/);
      if (match) {
        const isProperty = selector.includes('property=');
        (el as HTMLMetaElement).setAttribute(isProperty ? 'property' : 'name', match[1]);
      }
    }
    document.head.appendChild(el);
  }
  (el as any)[attr] = value;
}

export function useSEO({ title, description, path = '/', image }: SEOProps) {
  useEffect(() => {
    const canonicalUrl = `${BASE_URL}${path === '/' ? '/' : path.startsWith('/') ? path : '/' + path}`;
    const ogImage = image
      ? (image.startsWith('http') ? image : `${BASE_URL}${image}`)
      : DEFAULT_IMAGE;

    // <title>
    document.title = title;

    // <meta name="description">
    setMeta('meta[name="description"]', 'content', description);

    // <link rel="canonical">
    setMeta('link[rel="canonical"]', 'href', canonicalUrl);

    // Open Graph
    setMeta('meta[property="og:title"]', 'content', title);
    setMeta('meta[property="og:description"]', 'content', description);
    setMeta('meta[property="og:url"]', 'content', canonicalUrl);
    setMeta('meta[property="og:image"]', 'content', ogImage);

    // Twitter Card
    setMeta('meta[name="twitter:title"]', 'content', title);
    setMeta('meta[name="twitter:description"]', 'content', description);
    setMeta('meta[name="twitter:image"]', 'content', ogImage);
  }, [title, description, path, image]);
}
