import { Check, BarChart3, Users, Zap } from 'lucide-react';
import { Button } from './Button';

const checklistItems = [
  'Beautifully designed UI/UX experiences',
  'Scalable, enterprise-grade architecture',
  'Rapid development & deployment',
];

const stats = [
  { value: '98%', label: 'Customer Satisfaction' },
  { value: '50+', label: 'Modules' },
  { value: '500+', label: 'Active Businesses' },
];

export function ValueProposition() {
  return (
    <section className="max-md:min-h-0 min-h-[100dvh] w-full flex flex-col justify-center bg-[var(--color-bg-base)] snap-start px-[20px] md:px-[40px] py-20 md:py-12">
      <div className="max-w-[1280px] mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left - Text Content */}
          <div>
            <p className="text-[13px] uppercase tracking-[0.12em] text-[var(--color-primary)] font-semibold mb-4">
              WHY TECHLEEQ
            </p>
            <h2 className="font-['Syne'] text-[40px] md:text-[40px] font-bold leading-tight text-[var(--color-text-primary)] mb-6">
              Where your vision meets our execution.
            </h2>
            <div className="space-y-4 mb-8 text-[17px] text-[var(--color-text-secondary)] leading-relaxed">
              <p>
                We believe that powerful software shouldn't feel rigid or complex. At Techleeq, we combine creative strategy with robust engineering to build solutions that breathe life into your business operations, automate workflows, and drive revenue.
              </p>
              <p>
                From standalone internal tools to scalable customer-facing applications, our ecosystem of custom services and tailored products is built to scale alongside your ambition.
              </p>
            </div>

            {/* Checklist */}
            <ul className="space-y-4 mb-8">
              {checklistItems.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <Check size={20} className="text-[var(--color-accent-green)] mt-0.5 flex-shrink-0" />
                  <span className="text-[16px] font-medium text-[var(--color-text-primary)]">
                    {item}
                  </span>
                </li>
              ))}
            </ul>

            <Button variant="tertiary" className="group">
              Explore All Features
              <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
            </Button>
          </div>

          {/* Right - Visual */}
          <div className="relative">
            {/* Glowing Orb Background */}
            <div className="absolute inset-0 gradient-glow opacity-30 blur-3xl"></div>

            {/* Abstract Illustration Container */}
            <div className="relative bg-gradient-to-br from-[var(--color-bg-surface)] to-[var(--color-bg-elevated)] rounded-[var(--radius-2xl)] p-8 border border-[var(--color-bg-border)] shadow-card">
              {/* Dashboard Illustration */}
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 bg-[var(--color-bg-base)] rounded-lg">
                  <div className="w-12 h-12 rounded-full gradient-cta flex items-center justify-center">
                    <BarChart3 size={24} className="text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="h-3 bg-[var(--color-bg-border)] rounded w-2/3 mb-2"></div>
                    <div className="h-2 bg-[var(--color-bg-border)] rounded w-1/2"></div>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 bg-[var(--color-bg-base)] rounded-lg">
                  <div className="w-12 h-12 rounded-full bg-[var(--color-accent-teal)] flex items-center justify-center">
                    <Users size={24} className="text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="h-3 bg-[var(--color-bg-border)] rounded w-2/3 mb-2"></div>
                    <div className="h-2 bg-[var(--color-bg-border)] rounded w-1/2"></div>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 bg-[var(--color-bg-base)] rounded-lg">
                  <div className="w-12 h-12 rounded-full bg-[var(--color-accent-violet)] flex items-center justify-center">
                    <Zap size={24} className="text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="h-3 bg-[var(--color-bg-border)] rounded w-2/3 mb-2"></div>
                    <div className="h-2 bg-[var(--color-bg-border)] rounded w-1/2"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Stats */}
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className="absolute bg-[var(--color-bg-elevated)] border border-[var(--color-bg-border)] rounded-lg px-4 py-3 shadow-lg"
                style={{
                  top: `${20 + index * 25}%`,
                  right: index % 2 === 0 ? '-2rem' : 'auto',
                  left: index % 2 !== 0 ? '-2rem' : 'auto',
                }}
              >
                <div className="text-2xl font-bold gradient-text">{stat.value}</div>
                <div className="text-xs text-[var(--color-text-muted)]">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
