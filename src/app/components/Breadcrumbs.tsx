import { Link } from 'react-router';
import { ChevronRight } from 'lucide-react';
import { JsonLd } from './JsonLd';
import { breadcrumbSchema } from '../seo.config';

export interface Crumb {
  name: string;
  /** Route path, e.g. '/services'. The last crumb (current page) still needs its path for schema. */
  path: string;
}

interface BreadcrumbsProps {
  items: Crumb[];
  className?: string;
}

/**
 * Accessible breadcrumb trail + matching BreadcrumbList structured data.
 * The last item is rendered as the current page (not a link).
 */
export function Breadcrumbs({ items, className = '' }: BreadcrumbsProps) {
  if (items.length === 0) return null;

  return (
    <>
      <JsonLd data={breadcrumbSchema(items)} />
      <nav
        aria-label="Breadcrumb"
        className={`text-[13px] text-[var(--color-text-secondary)] ${className}`}
      >
        <ol className="flex flex-wrap items-center gap-1.5">
          {items.map((item, i) => {
            const isLast = i === items.length - 1;
            return (
              <li key={item.path} className="flex items-center gap-1.5">
                {isLast ? (
                  <span aria-current="page" className="text-[var(--color-text-primary)] font-medium">
                    {item.name}
                  </span>
                ) : (
                  <>
                    <Link
                      to={item.path}
                      className="hover:text-[var(--color-text-primary)] transition-colors"
                    >
                      {item.name}
                    </Link>
                    <ChevronRight size={14} className="opacity-50 shrink-0" aria-hidden="true" />
                  </>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
