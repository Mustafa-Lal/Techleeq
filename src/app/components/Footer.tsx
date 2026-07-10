import { useState } from 'react';
import { Linkedin, Instagram, Facebook, ChevronDown, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router';
import { Button } from './Button';

const companyLinks = [
  { label: 'About Us', to: '/about' },
  { label: 'Careers', to: '/careers' },
];
const productLinks = [
  { label: 'Products', to: '/products' },
];
const supportLinks = [
  { label: 'Help Center', to: '#' },
  { label: 'Contact Us', to: '/contact' },
  { label: 'Privacy Policy', to: '/privacy' },
];

function FooterAccordion({ title, links }: { title: string; links: typeof companyLinks }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-[var(--color-bg-border)]">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between py-4 text-left touch-target"
      >
        <h4 className="text-[12px] uppercase tracking-[0.12em] text-[var(--color-text-muted)] font-semibold">{title}</h4>
        <ChevronDown
          size={18}
          className={`text-[var(--color-text-muted)] transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>
      {isOpen && (
        <ul className="space-y-3 pb-4 animate-[slideDown_200ms_ease-out]">
          {links.map((link) => (
            <li key={link.label}>
              <Link to={link.to} className="text-[14px] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors duration-200">
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export function Footer() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus('loading');

    const scriptUrl = import.meta.env.VITE_SUBSCRIBE_SCRIPT_URL;

    try {
      await fetch(scriptUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email,
          workEmail: email, // in case it reuses the contact logic
          subscriber: { email: email },
          data: { email: email },
          name: 'Newsletter Subscriber',
          companyName: 'N/A',
          reason: 'Newsletter Subscription',
          message: 'Subscribe me to the newsletter',
          action: 'subscribe',
          type: 'subscribe',
          submitted_at: new Date().toISOString(),
        }),
        mode: 'no-cors',
      });
      setStatus('success');
      setEmail('');
      setTimeout(() => setStatus('idle'), 5000);
    } catch (err) {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  return (
    <footer className="bg-[var(--color-bg-base)] border-t border-[var(--color-bg-border)] snap-start
      pt-[28px] md:pt-[36px] lg:pt-[44px]
      pb-[20px] md:pb-[24px]
      px-[20px] md:px-[40px]">
      <div className="max-w-[1280px] mx-auto">
        {/* Desktop & Tablet Grid (768px+) */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-[1fr_1fr_1fr_1fr_1.4fr] gap-8 lg:gap-10 mb-6">
          {/* Brand Column */}
          <div className="md:col-span-2 lg:col-span-1">
            <Link to="/" className="flex items-center mb-4">
              <span className="font-['Syne'] font-bold text-[24px] text-[var(--color-text-primary)]">Tech</span>
              <span className="font-['Syne'] font-bold text-[24px] text-[var(--color-primary)]">leeq</span>
            </Link>
            <p className="text-[14px] text-[var(--color-text-muted)] mb-6 leading-relaxed">
              Custom digital solutions where creativity meets technology.
            </p>
            <div className="flex items-center gap-3">
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
                  className="w-[36px] h-[36px] rounded-full bg-[var(--color-bg-elevated)] text-[var(--color-text-secondary)] hover:bg-[var(--color-primary)] hover:text-white transition-all duration-[var(--duration-base)] flex items-center justify-center"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="text-[12px] uppercase tracking-[0.12em] text-[var(--color-text-muted)] font-semibold mb-4">Company</h4>
            <ul className="space-y-3">
              {companyLinks.map((link) => (
                <li key={link.label}>
                  <Link to={link.to} className="text-[14px] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors duration-200">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Product Links */}
          <div>
            <h4 className="text-[12px] uppercase tracking-[0.12em] text-[var(--color-text-muted)] font-semibold mb-4">Product</h4>
            <ul className="space-y-3">
              {productLinks.map((link) => (
                <li key={link.label}>
                  <Link to={link.to} className="text-[14px] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors duration-200">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h4 className="text-[12px] uppercase tracking-[0.12em] text-[var(--color-text-muted)] font-semibold mb-4">Support</h4>
            <ul className="space-y-3">
              {supportLinks.map((link) => (
                <li key={link.label}>
                  <Link to={link.to} className="text-[14px] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors duration-200">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Stay in the Loop — tablet: spans full width below, desktop: 5th column */}
          <div className="md:col-span-2 lg:col-span-1">
            <h4 className="text-[12px] uppercase tracking-[0.12em] text-[var(--color-text-muted)] font-semibold mb-4">Stay in the Loop</h4>
            <p className="text-[13px] text-[var(--color-text-muted)] mb-4 leading-relaxed">Product updates, tips, and industry insights.</p>
            <form onSubmit={handleSubscribe} className="flex lg:flex-col gap-2">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email"
                disabled={status === 'loading' || status === 'success'}
                className="flex-1 lg:flex-none h-[44px] px-4 bg-[var(--color-bg-elevated)] border border-[var(--color-bg-border)] rounded-[var(--radius-md)] text-[14px] text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary-glow)] transition-all disabled:opacity-50"
              />
              <Button type="submit" variant="primary" size="sm" disabled={status === 'loading' || status === 'success'} className="lg:w-full whitespace-nowrap">
                {status === 'loading' ? 'Subscribing...' : status === 'success' ? <span className="flex items-center gap-2"><CheckCircle2 size={16} /> Subscribed!</span> : 'Subscribe'}
              </Button>
            </form>
            {status === 'error' && <p className="text-red-500 text-[12px] mt-2">Failed to subscribe. Please try again.</p>}
          </div>
        </div>

        {/* Mobile Layout (< 768px) */}
        <div className="md:hidden">
          {/* Brand */}
          <div className="mb-8">
            <Link to="/" className="flex items-center mb-4">
              <span className="font-['Syne'] font-bold text-[24px] text-[var(--color-text-primary)]">Tech</span>
              <span className="font-['Syne'] font-bold text-[24px] text-[var(--color-primary)]">leeq</span>
            </Link>
            <p className="text-[14px] text-[var(--color-text-muted)] mb-6 leading-relaxed">
              Custom digital solutions where creativity meets technology.
            </p>
            <div className="flex items-center gap-3">
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
                  className="w-[40px] h-[40px] rounded-full bg-[var(--color-bg-elevated)] text-[var(--color-text-secondary)] hover:bg-[var(--color-primary)] hover:text-white transition-all duration-[var(--duration-base)] flex items-center justify-center touch-target"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Accordion Sections */}
          <div className="mb-8">
            <FooterAccordion title="Company" links={companyLinks} />
            <FooterAccordion title="Product" links={productLinks} />
            <FooterAccordion title="Support" links={supportLinks} />
          </div>

          {/* Newsletter */}
          <div className="mb-8">
            <h4 className="text-[16px] font-semibold text-[var(--color-text-primary)] mb-2">Stay in the loop</h4>
            <p className="text-[13px] text-[var(--color-text-muted)] mb-4">Product updates, tips, and industry insights.</p>
            <form onSubmit={handleSubscribe} className="flex flex-col gap-2">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email"
                disabled={status === 'loading' || status === 'success'}
                className="h-[52px] px-4 bg-[var(--color-bg-elevated)] border border-[var(--color-bg-border)] rounded-[var(--radius-md)] text-[16px] text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary-glow)] transition-all disabled:opacity-50"
              />
              <Button type="submit" variant="primary" size="md" disabled={status === 'loading' || status === 'success'} className="w-full h-[52px]">
                {status === 'loading' ? 'Subscribing...' : status === 'success' ? <span className="flex items-center gap-2 justify-center"><CheckCircle2 size={16} /> Subscribed!</span> : 'Subscribe'}
              </Button>
            </form>
            {status === 'error' && <p className="text-red-500 text-[12px] mt-2">Failed to subscribe. Please try again.</p>}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[var(--color-bg-border)] flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[13px] text-[var(--color-text-muted)] text-center md:text-left">© 2026 Techleeq. All rights reserved.</p>
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6">
            <Link to="/privacy" className="text-[13px] text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="text-[13px] text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors">Terms of Service</Link>
            <Link to="/cookies" className="text-[13px] text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
