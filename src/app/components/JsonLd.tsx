/**
 * JsonLd — renders a <script type="application/ld+json"> block from a JS object.
 *
 * Google reads JSON-LD injected into the DOM by client-side React, so this works
 * for CMS-driven routes that can't be prerendered. Pass a single schema object
 * or an array of them.
 */
interface JsonLdProps {
  data: Record<string, unknown> | Record<string, unknown>[];
}

export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      // Structured data is static JSON, not executable script.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
