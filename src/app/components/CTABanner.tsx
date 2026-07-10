import { Link } from 'react-router';
import { Button } from './Button';
import { Phone, Linkedin, Instagram, Facebook } from 'lucide-react';

export function CTABanner() {
  return (
    <section className="max-md:min-h-0 min-h-[100dvh] w-full flex flex-col justify-center bg-[var(--color-bg-surface)] snap-start px-[20px] md:px-[40px] py-20 md:py-12 relative">
      {/* Animated Mesh Gradient Background */}
      <div className="absolute inset-0 gradient-glow opacity-30 animate-pulse" style={{ animationDuration: '10s' }}></div>

      {/* Radial Gradient Overlay */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(10,132,255,0.15) 0%, transparent 60%)',
        }}
      ></div>

      <div className="max-w-[900px] mx-auto text-center relative z-10">
        {/* Headline */}
        <h2 className="font-['Syne'] text-[48px] md:text-[54px] font-bold leading-tight text-[var(--color-text-primary)] mb-6">
          Ready to simplify your business?
        </h2>

        {/* Sub-headline */}
        <p className="text-[18px] md:text-[20px] text-[var(--color-text-secondary)] leading-relaxed mb-10">
          Join 500+ businesses that trust Techleeq to build and scale their digital vision.
        </p>

        {/* CTA Buttons & Socials */}
        <div className="flex flex-col items-center justify-center gap-8">
          <Link to="/contact">
            <Button variant="primary" size="xl" icon={<Phone size={20} />} iconPosition="left">
              Talk to Sales
            </Button>
          </Link>

          <div className="flex items-center gap-4 mt-2">
            {[
              { Icon: Linkedin, url: import.meta.env.VITE_LINKEDIN_URL || '#' },
              { Icon: Instagram, url: import.meta.env.VITE_INSTAGRAM_URL || '#' },
              { Icon: Facebook, url: import.meta.env.VITE_FACEBOOK_URL || '#' }
            ].map(({ Icon, url }, i) => (
              <a
                key={i}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-[48px] h-[48px] rounded-full bg-[var(--color-bg-elevated)] border border-[var(--color-bg-border)] text-[var(--color-text-secondary)] hover:bg-[var(--color-primary)] hover:text-white transition-all duration-[var(--duration-base)] flex items-center justify-center shadow-sm"
              >
                <Icon size={20} />
              </a>
            ))}
          </div>
        </div>

        {/* Trust Signal */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-8 text-[var(--color-text-muted)] text-sm">
          <div className="flex items-center gap-2">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span>Bank-level security</span>
          </div>
          <div className="flex items-center gap-2">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <polyline points="22 4 12 14.01 9 11.01" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span>No credit card required</span>
          </div>
          <div className="flex items-center gap-2">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="12" cy="7" r="4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span>24/7 support</span>
          </div>
        </div>
      </div>
    </section>
  );
}
