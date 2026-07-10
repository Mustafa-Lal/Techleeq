import { Cookie } from 'lucide-react';

const cookieTypes = [
  {
    name: 'Strictly Necessary Cookies',
    required: true,
    desc: 'These cookies are essential for our website to function and cannot be switched off. They are usually set in response to actions you take, such as setting your privacy preferences, logging in, or filling in forms.',
    examples: ['Session management', 'CSRF protection tokens', 'Load balancer preferences'],
  },
  {
    name: 'Performance & Analytics Cookies',
    required: false,
    desc: 'These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously. We use this to improve our website performance and user experience.',
    examples: ['Page visit counts', 'Traffic source tracking', 'Error monitoring (anonymized)'],
  },
  {
    name: 'Functional Cookies',
    required: false,
    desc: 'These cookies enable enhanced functionality and personalization, such as remembering your region, language preferences, and whether you\'ve dismissed certain notifications.',
    examples: ['Language / region preference', 'Form autofill preferences', 'UI preference storage'],
  },
  {
    name: 'Marketing Cookies',
    required: false,
    desc: 'These cookies are set by our advertising partners to build a profile of your interests and serve relevant ads. We do not use them for behavioral advertising on third-party platforms without your consent.',
    examples: ['Ad campaign tracking', 'Retargeting preferences', 'Conversion tracking'],
  },
];

export function CookiePage() {
  return (
    <div className="min-h-screen">
      <section className="relative py-[80px] px-[20px] md:px-[40px] text-center overflow-hidden">
        <div className="absolute inset-0 bg-[var(--gradient-glow)] opacity-30 pointer-events-none" />
        <div className="max-w-[700px] mx-auto relative z-10">
          <div className="w-14 h-14 rounded-full bg-[rgba(10,132,255,0.12)] flex items-center justify-center mx-auto mb-5">
            <Cookie size={26} className="text-[var(--color-primary)]" />
          </div>
          <h1 className="text-[38px] md:text-[48px] text-[var(--color-text-primary)] mb-3" style={{ letterSpacing: 'var(--tracking-tight)' }}>Cookie Policy</h1>
          <p className="text-[var(--color-text-secondary)]">Last updated: January 1, 2025</p>
        </div>
      </section>

      <section className="px-[20px] md:px-[40px] pb-[100px]">
        <div className="max-w-[820px] mx-auto">
          <div className="mb-10 text-[14px] text-[var(--color-text-secondary)] leading-relaxed">
            <p className="mb-4">This Cookie Policy explains how TechLeeq Technologies Ltd uses cookies and similar tracking technologies on our website (techleeq.com). The TechLeeq desktop application does not use cookies.</p>
            <p>A cookie is a small text file that is placed on your device when you visit a website. Cookies serve various functions — from keeping you logged in, to helping us understand how you use our site so we can improve it.</p>
          </div>

          <div className="space-y-6">
            {cookieTypes.map((type) => (
              <div key={type.name} className="rounded-[var(--radius-xl)] border border-[var(--color-bg-border)] bg-[var(--color-bg-surface)] p-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-[16px] font-semibold text-[var(--color-text-primary)]">{type.name}</h3>
                  <span className={`px-3 py-1 rounded-full text-[11px] font-semibold ${type.required ? 'bg-[rgba(34,197,94,0.1)] text-[var(--color-accent-green)]' : 'bg-[rgba(10,132,255,0.1)] text-[var(--color-primary)]'}`}>
                    {type.required ? 'Always active' : 'Optional'}
                  </span>
                </div>
                <p className="text-[13px] text-[var(--color-text-secondary)] leading-relaxed mb-4">{type.desc}</p>
                <div>
                  <p className="text-[11px] uppercase tracking-wider text-[var(--color-text-muted)] font-semibold mb-2">Examples</p>
                  <ul className="space-y-1">
                    {type.examples.map((ex) => (
                      <li key={ex} className="flex items-center gap-2 text-[12px] text-[var(--color-text-muted)]">
                        <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-primary)] shrink-0" />
                        {ex}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 space-y-6 text-[14px] text-[var(--color-text-secondary)]">
            <div>
              <h2 className="text-[18px] font-semibold text-[var(--color-text-primary)] mb-2">Managing Your Preferences</h2>
              <p className="leading-relaxed">You can manage cookie preferences at any time using the cookie preference center (accessible via the footer). You can also control cookies through your browser settings — note that disabling strictly necessary cookies may affect website functionality.</p>
            </div>
            <div>
              <h2 className="text-[18px] font-semibold text-[var(--color-text-primary)] mb-2">Contact</h2>
              <p>For questions about our use of cookies, contact <a href="mailto:privacy@techleeq.com" className="text-[var(--color-primary)] hover:underline">privacy@techleeq.com</a></p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
