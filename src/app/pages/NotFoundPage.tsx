import { Link } from 'react-router';
import { Home, ArrowLeft, Search } from 'lucide-react';
import { Button } from '../components/Button';

const quickLinks = [
  { label: 'Homepage', to: '/' },
  { label: 'Pricing', to: '/pricing' },
  { label: 'Download', to: '/download' },
  { label: 'About Us', to: '/about' },
  { label: 'Contact', to: '/contact' },
];

export function NotFoundPage() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-[20px]">
      <div className="max-w-[560px] text-center">
        <div className="relative mb-8">
          <p className="font-['Syne'] font-bold text-[120px] md:text-[160px] text-transparent" style={{ WebkitTextStroke: '2px rgba(10, 132, 255, 0.2)', lineHeight: 1 }}>
            404
          </p>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-[rgba(10,132,255,0.1)] border border-[rgba(10,132,255,0.25)] flex items-center justify-center">
              <Search size={26} className="text-[var(--color-primary)]" />
            </div>
          </div>
        </div>

        <h1 className="text-[28px] font-bold text-[var(--color-text-primary)] mb-3">Page not found</h1>
        <p className="text-[var(--color-text-secondary)] mb-8">
          The page you're looking for doesn't exist, has been moved, or is temporarily unavailable.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
          <Link to="/">
            <Button variant="primary" size="md" className="flex items-center gap-2">
              <Home size={16} />
              Back to Home
            </Button>
          </Link>
          <button onClick={() => window.history.back()}>
            <Button variant="secondary" size="md" className="flex items-center gap-2">
              <ArrowLeft size={16} />
              Go Back
            </Button>
          </button>
        </div>

        <div className="border-t border-[var(--color-bg-border)] pt-8">
          <p className="text-[13px] text-[var(--color-text-muted)] mb-4">Quick links</p>
          <div className="flex flex-wrap justify-center gap-3">
            {quickLinks.map((link) => (
              <Link
                key={link.label}
                to={link.to}
                className="px-4 py-2 rounded-full text-[13px] border border-[var(--color-bg-border)] bg-[var(--color-bg-surface)] text-[var(--color-text-secondary)] hover:border-[var(--color-primary)] hover:text-[var(--color-text-primary)] transition-all"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
