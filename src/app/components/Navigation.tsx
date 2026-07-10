import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { Button } from './Button';
import { useTheme } from '../contexts/ThemeContext';
import logoUrl from '../../../assets/logo.png';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Products', href: '/products' },
  { label: 'Careers', href: '/careers' },
  { label: 'Contact', href: '/contact' },
];

export function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();

  const isActive = (href: string) =>
    href === '/' ? location.pathname === '/' : location.pathname.startsWith(href);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-[1000] backdrop-blur-nav border-b border-[var(--color-bg-border)]
        h-[60px] md:h-[68px]
        px-[20px] md:px-[28px] lg:px-[40px]"
        style={{ backgroundColor: 'var(--color-bg-base)' }}>
        <div className="max-w-[1440px] mx-auto h-full flex items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 transition-all duration-[var(--duration-fast)] hover:brightness-110 z-[1001] shrink-0"
          >
            <img src={logoUrl} alt="Techleeq Logo" style={{ height: '36px', width: 'auto', maxWidth: '80px', display: 'block', objectFit: 'contain' }} />
            <div className="flex items-center tracking-tight">
              <span className="font-['Syne'] font-bold text-[20px] md:text-[24px] text-[var(--color-text-primary)]">Tech&nbsp;</span>
              <span className="font-['Syne'] font-bold text-[20px] md:text-[24px] text-[var(--color-primary)]">leeq</span>
            </div>
          </Link>

          {/* Desktop/Tablet nav links (hidden on mobile) */}
          <div className="hidden lg:flex items-center gap-[20px] xl:gap-[32px]">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.href}
                className={`font-['Geist'] font-medium text-[13px] xl:text-[14px] tracking-[var(--tracking-wide)] transition-all duration-[var(--duration-base)] relative group ${isActive(link.href) ? 'text-[var(--color-text-primary)]' : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'
                  }`}
              >
                {link.label}
                <span className={`absolute bottom-[-4px] left-0 h-[2px] bg-[var(--color-primary)] transition-all duration-[var(--duration-base)] ${isActive(link.href) ? 'w-full' : 'w-0 group-hover:w-full'}`} />
              </Link>
            ))}
          </div>

          {/* CTA Buttons & Theme Toggle (desktop/tablet) */}
          <div className="hidden lg:flex items-center gap-4">
            <button
              onClick={toggleTheme}
              className="w-[36px] h-[36px] rounded-full flex items-center justify-center text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-elevated)] hover:text-[var(--color-primary)] transition-all"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
            </button>
            <Link to="/products">
              <Button variant="primary" size="sm" className="text-[13px] xl:text-[14px] px-[12px] xl:px-[14px] py-[6px] xl:py-[8px]">Get Started</Button>
            </Link>
          </div>

          {/* Tablet: show Get Started button + theme + hamburger */}
          <div className="hidden md:flex lg:hidden items-center gap-3">
            <button
              onClick={toggleTheme}
              className="w-[36px] h-[36px] rounded-full flex items-center justify-center text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-elevated)] hover:text-[var(--color-primary)] transition-all"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
            </button>
            <Link to="/products">
              <Button variant="primary" size="sm" className="text-[13px] px-[14px] py-[8px]">Get Started</Button>
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="touch-target flex items-center justify-center text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile: theme + hamburger */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={toggleTheme}
              className="w-[36px] h-[36px] rounded-full flex items-center justify-center text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-elevated)] hover:text-[var(--color-primary)] transition-all"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="touch-target flex items-center justify-center text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors z-[1001]"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile/Tablet Full-Screen Overlay Menu */}
      {mobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 z-[999] backdrop-blur-nav animate-[slideDown_300ms_ease-out]"
          style={{
            backgroundColor: 'var(--color-bg-base)',
            animation: 'slideDown 300ms ease-out',
            paddingTop: '68px',
          }}
        >
          <div className="flex flex-col h-full">
            {/* Nav Links */}
            <div className="flex-1 flex flex-col">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`h-[56px] px-[20px] flex items-center font-['Geist'] font-medium text-[18px] border-b border-[var(--color-bg-border)] transition-all ${isActive(link.href)
                      ? 'text-[var(--color-primary)] bg-[rgba(10,132,255,0.08)]'
                      : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-bg-surface)]'
                    }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* CTA Buttons at bottom */}
            <div className="flex flex-col gap-4 p-[20px] border-t border-[var(--color-bg-border)]">
              <Link to="/products" onClick={() => setMobileMenuOpen(false)}>
                <Button variant="primary" size="md" className="w-full h-[52px]">Get Started</Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
