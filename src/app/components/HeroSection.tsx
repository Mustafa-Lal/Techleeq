import { MessageSquare, Package } from 'lucide-react';
import { Link } from 'react-router';
import { Button } from './Button';
import { motion } from 'motion/react';

/* ── Animated background graphic ─────────────────────────────────────── */
function AnimatedGraphic() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {/* Primary blue glow – top-right */}
      <motion.div
        className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(10,132,255,0.18) 0%, rgba(0,95,204,0.10) 50%, transparent 70%)',
          filter: 'blur(60px)',
        }}
        animate={{ scale: [1, 1.12, 1], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
      {/* Violet glow – bottom-left */}
      <motion.div
        className="absolute -bottom-32 -left-32 w-[500px] h-[500px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(0,95,204,0.15) 0%, transparent 70%)',
          filter: 'blur(50px)',
        }}
        animate={{ scale: [1, 1.08, 1], opacity: [0.4, 0.8, 0.4] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
      />

      {/* SVG circuit orb – right side, desktop only */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[420px] h-[420px] opacity-[0.10] hidden xl:block">
        <svg viewBox="0 0 480 480" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="240" cy="240" r="200" stroke="#0A84FF" strokeWidth="1" strokeDasharray="6 10" />
          <circle cx="240" cy="240" r="150" stroke="#005FCC" strokeWidth="0.8" strokeDasharray="4 8" />
          <circle cx="240" cy="240" r="100" stroke="#00D4C8" strokeWidth="0.6" />
          <circle cx="240" cy="240" r="50" fill="rgba(10,132,255,0.08)" stroke="#0A84FF" strokeWidth="1.5" />
          {[0, 60, 120, 180, 240, 300].map((deg, i) => {
            const rad = (deg * Math.PI) / 180;
            return <circle key={i} cx={240 + 200 * Math.cos(rad)} cy={240 + 200 * Math.sin(rad)} r="4" fill="#0A84FF" opacity="0.8" />;
          })}
          {[30, 90, 150, 210, 270, 330].map((deg, i) => {
            const rad = (deg * Math.PI) / 180;
            return <circle key={i} cx={240 + 150 * Math.cos(rad)} cy={240 + 150 * Math.sin(rad)} r="3" fill="#005FCC" opacity="0.8" />;
          })}
          <line x1="240" y1="40" x2="240" y2="90" stroke="#0A84FF" strokeWidth="0.8" opacity="0.5" />
          <line x1="240" y1="390" x2="240" y2="440" stroke="#0A84FF" strokeWidth="0.8" opacity="0.5" />
          <line x1="40" y1="240" x2="90" y2="240" stroke="#005FCC" strokeWidth="0.8" opacity="0.5" />
          <line x1="390" y1="240" x2="440" y2="240" stroke="#005FCC" strokeWidth="0.8" opacity="0.5" />
        </svg>
      </div>

      {/* Floating particles */}
      {[...Array(16)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: i % 3 === 0 ? '3px' : '2px',
            height: i % 3 === 0 ? '3px' : '2px',
            background: i % 2 === 0 ? '#0A84FF' : '#005FCC',
            left: `${(i * 6.2) % 100}%`,
            top: `${(i * 7.1 + 5) % 95}%`,
          }}
          animate={{ y: [0, -24, 0], opacity: [0.3, 0.8, 0.3] }}
          transition={{ duration: 4 + (i % 5), repeat: Infinity, ease: 'easeInOut', delay: i * 0.25 }}
        />
      ))}


    </div>
  );
}

/* ── Social Proof Ticker (embedded) ──────────────────────────────────── */
const companies = ['TechCorp', 'InnoSys', 'DataFlow', 'CloudSync', 'BizHub', 'OptiMax', 'VentureX', 'NexGen', 'ProSuite', 'SmartOps'];

function SocialProofTicker() {
  return (
    <div
      className="relative z-10 w-full border-t border-[rgba(200,213,238,0.8)]"
      style={{ backgroundColor: 'rgba(255,255,255,0.7)', backdropFilter: 'blur(8px)', flexShrink: 0 }}
    >
      <div className="max-w-[1280px] mx-auto px-5 py-3">
        <p
          className="text-center mb-2"
          style={{
            fontSize: 'clamp(9px, 1.1vw, 11px)',
            letterSpacing: '0.12em',
            color: 'var(--color-text-muted)',
            textTransform: 'uppercase',
            fontFamily: "'Geist', sans-serif",
          }}
        >
          Trusted by growing businesses across industries
        </p>
        <div className="overflow-hidden">
          <div className="flex gap-10 hero-ticker">
            {[...companies, ...companies].map((company, i) => (
              <div
                key={i}
                className="flex-shrink-0 font-bold tracking-tight"
                style={{
                  minWidth: '100px',
                  color: 'var(--color-text-primary)',
                  opacity: 0.28,
                  fontSize: 'clamp(12px, 1.3vw, 15px)',
                  fontFamily: "'Geist', sans-serif",
                }}
              >
                {company}
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes hero-scroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .hero-ticker {
          animation: hero-scroll 28s linear infinite;
        }
        .hero-ticker:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}

/* ── Hero Section ─────────────────────────────────────────────────────── */
export function HeroSection() {
  return (
    <section
      id="home"
      className="relative gradient-hero w-full"
      style={{
        /* Lock the entire section to exactly one viewport height */
        height: '100dvh',
        minHeight: '100dvh',
        maxHeight: '100dvh',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}
    >
      {/* Dot grid */}
      <div
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: 'radial-gradient(circle, var(--color-text-primary) 1px, transparent 1px)',
          backgroundSize: '36px 36px',
        }}
      />

      {/* Animated background */}
      <AnimatedGraphic />

      {/* ── Main content (grows to fill, centers content vertically) ── */}
      <div
        className="relative z-10 w-full mx-auto text-center flex flex-col items-center justify-center"
        style={{
          flex: 1,
          paddingTop: '68px', /* Just enough to clear the fixed navbar */
          paddingLeft: 'clamp(16px, 5vw, 80px)',
          paddingRight: 'clamp(16px, 5vw, 80px)',
          maxWidth: '1280px',
          gap: 'clamp(16px, 2vh, 24px)',
        }}
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: 'clamp(4px,0.6vh,7px) clamp(12px,1.5vw,18px)',
            borderRadius: '9999px',
            border: '1px solid rgba(10,132,255,0.35)',
            background: 'rgba(10,132,255,0.09)',
            color: 'var(--color-primary)',
            fontSize: 'clamp(10px, 1.1vw, 13px)',
            fontFamily: "'Geist', sans-serif",
            fontWeight: 500,
            letterSpacing: '0.06em',
            flexShrink: 0,
          }}
        >
          <span style={{ fontSize: 'clamp(11px,1.2vw,14px)' }}>✦</span>
          Trusted by 500+ Businesses
        </motion.div>

        {/* Headline line 1 */}
        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.08 }}
          style={{
            fontFamily: "'Syne', sans-serif",
            fontWeight: 800,
            lineHeight: 1.06,
            letterSpacing: '-0.02em',
            /* Scales with BOTH vw and vh so it never overflows in any direction */
            fontSize: 'clamp(28px, min(7vw, 8.5vh), 96px)',
            color: 'var(--color-text-primary)',
            margin: 0,
            flexShrink: 0,
          }}
        >
          Where Creativity
        </motion.h1>

        {/* Headline line 2 – gradient */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.14 }}
          style={{
            fontFamily: "'Syne', sans-serif",
            fontWeight: 800,
            lineHeight: 1.06,
            letterSpacing: '-0.02em',
            fontSize: 'clamp(28px, min(7vw, 8.5vh), 96px)',
            background: 'linear-gradient(90deg, #0A84FF 0%, #005FCC 100%)',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            margin: 0,
            flexShrink: 0,
          }}
        >
          Meets Technology.
        </motion.div>

        {/* Sub-headline */}
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.22 }}
          style={{
            fontFamily: "'Geist', sans-serif",
            fontSize: 'clamp(13px, min(1.5vw, 2.1vh), 19px)',
            lineHeight: 1.65,
            color: 'var(--color-text-secondary)',
            maxWidth: '640px',
            margin: 0,
            flexShrink: 0,
          }}
        >
          Techleeq builds custom digital solutions and ready-to-scale software products
          designed to streamline your operations, elevate your brand, and supercharge your growth.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.3 }}
          style={{
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 'clamp(10px, 1.2vw, 16px)',
            flexShrink: 0,
          }}
        >
          <Link to="/products">
            <Button variant="primary" size="xl" icon={<Package size={18} />} iconPosition="left">
              Explore Products
            </Button>
          </Link>
          <Link to="/contact">
            <Button variant="secondary" size="xl" icon={<MessageSquare size={18} />} iconPosition="left">
              Get Started
            </Button>
          </Link>
        </motion.div>

        {/* Trust micro-copy */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.55, delay: 0.4 }}
          style={{
            fontSize: 'clamp(10px, 1vw, 13px)',
            color: 'var(--color-text-muted)',
            fontFamily: "'Geist', sans-serif",
            margin: 0,
            flexShrink: 0,
          }}
        >
          Enterprise-grade solutions · Dedicated support · Scalable from day one
        </motion.p>
      </div>
    </section>
  );
}
