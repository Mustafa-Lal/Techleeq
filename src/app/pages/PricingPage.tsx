import { useState } from 'react';
import { Link } from 'react-router';
import { Check, X, ChevronDown, ChevronUp, Shield, Zap, Building2, Star } from 'lucide-react';
import { Button } from '../components/Button';

const plans = [
  {
    name: 'Free Trial',
    price: { monthly: 0, annual: 0 },
    description: '14 days full-featured access. No credit card required.',
    badge: null,
    color: 'var(--color-text-muted)',
    cta: 'Start Free Trial',
    ctaVariant: 'secondary' as const,
    features: [
      'Up to 3 users',
      'Core business management tools',
      'Basic reporting & analytics',
      '5 GB storage',
      'Email support',
      'Offline desktop access',
      null,
      null,
      null,
    ],
  },
  {
    name: 'Starter',
    price: { monthly: 49, annual: 39 },
    description: 'Perfect for small teams ready to streamline operations.',
    badge: null,
    color: 'var(--color-accent-teal)',
    cta: 'Get Started',
    ctaVariant: 'secondary' as const,
    features: [
      'Up to 10 users',
      'All core tools + CRM module',
      'Standard reporting',
      '50 GB storage',
      'Priority email support',
      'Offline desktop access',
      'API integrations (5)',
      null,
      null,
    ],
  },
  {
    name: 'Professional',
    price: { monthly: 149, annual: 119 },
    description: 'Advanced tools for growing businesses that demand more.',
    badge: 'Most Popular',
    color: 'var(--color-primary)',
    cta: 'Start Free Trial',
    ctaVariant: 'primary' as const,
    features: [
      'Up to 50 users',
      'All modules included',
      'Advanced analytics & custom reports',
      '500 GB storage',
      'Live chat + email support',
      'Offline desktop access',
      'API integrations (unlimited)',
      'Custom workflows & automation',
      'Priority onboarding',
    ],
  },
  {
    name: 'Enterprise',
    price: { monthly: null, annual: null },
    description: 'Custom pricing for large organizations with complex needs.',
    badge: null,
    color: 'var(--color-accent-violet)',
    cta: 'Contact Sales',
    ctaVariant: 'secondary' as const,
    features: [
      'Unlimited users',
      'All modules + custom builds',
      'Executive dashboards & BI export',
      'Unlimited storage',
      'Dedicated account manager',
      'Offline + air-gapped deployment',
      'API integrations (unlimited)',
      'Custom workflows & automation',
      'White-label options',
    ],
  },
];

const featureRows = [
  { category: 'Core Features', features: [
    { name: 'Inventory Management', starter: true, professional: true, enterprise: true },
    { name: 'CRM Module', starter: true, professional: true, enterprise: true },
    { name: 'Finance & Accounting', starter: false, professional: true, enterprise: true },
    { name: 'HR & Payroll', starter: false, professional: true, enterprise: true },
    { name: 'Project Management', starter: true, professional: true, enterprise: true },
    { name: 'Point of Sale (POS)', starter: false, professional: true, enterprise: true },
  ]},
  { category: 'Analytics & Reporting', features: [
    { name: 'Pre-built dashboards', starter: true, professional: true, enterprise: true },
    { name: 'Custom report builder', starter: false, professional: true, enterprise: true },
    { name: 'BI export (CSV, Excel)', starter: false, professional: true, enterprise: true },
    { name: 'Executive dashboards', starter: false, professional: false, enterprise: true },
  ]},
  { category: 'Security & Compliance', features: [
    { name: 'Role-based access control', starter: true, professional: true, enterprise: true },
    { name: 'Two-factor authentication', starter: true, professional: true, enterprise: true },
    { name: 'Audit logs', starter: false, professional: true, enterprise: true },
    { name: 'GDPR / SOC 2 compliance', starter: false, professional: true, enterprise: true },
    { name: 'SSO / SAML integration', starter: false, professional: false, enterprise: true },
  ]},
];

const faqs = [
  {
    q: 'What happens after the 14-day trial ends?',
    a: 'Your data is safely stored for 30 days. You can pick a plan at any time to continue — no data is lost. No credit card is required for the trial.',
  },
  {
    q: 'Can I switch plans later?',
    a: 'Yes. Upgrades take effect immediately and you\'re billed the prorated difference. Downgrades take effect at the next billing cycle.',
  },
  {
    q: 'Is this software installed locally or cloud-based?',
    a: 'TechLeeq is a downloadable desktop application with cloud sync. It works offline and syncs when connected, giving you the best of both worlds.',
  },
  {
    q: 'Do you offer discounts for nonprofits or startups?',
    a: 'Yes — contact our sales team. We offer 40% off for registered nonprofits and special startup pricing for companies under 2 years old.',
  },
  {
    q: 'How does the referral program work?',
    a: 'Share your unique referral code and earn 3 months free for every paying customer you bring in. Referred users also get 20% off their first year.',
  },
  {
    q: 'What payment methods do you accept?',
    a: 'We accept all major credit cards, PayPal, bank transfer (for annual enterprise plans), and purchase orders for qualified businesses.',
  },
];

export function PricingPage() {
  const [annual, setAnnual] = useState(true);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative py-[80px] px-[20px] md:px-[40px] text-center overflow-hidden">
        <div className="absolute inset-0 bg-[var(--gradient-glow)] opacity-40 pointer-events-none" />
        <div className="max-w-[800px] mx-auto relative z-10">
          <span className="inline-block mb-4 px-4 py-1.5 rounded-full bg-[rgba(10,132,255,0.12)] border border-[rgba(10,132,255,0.25)] text-[var(--color-primary)] text-[12px] tracking-[0.12em] uppercase font-medium">
            Simple, Transparent Pricing
          </span>
          <h1 className="text-[42px] md:text-[56px] text-[var(--color-text-primary)] mb-5" style={{ letterSpacing: 'var(--tracking-tight)', lineHeight: 'var(--leading-tight)' }}>
            Choose the plan that<br />
            <span className="gradient-text">fits your business</span>
          </h1>
          <p className="text-[18px] text-[var(--color-text-secondary)] mb-8">
            Start free, scale as you grow. All plans include offline access and enterprise-grade security.
          </p>

          {/* Billing toggle */}
          <div className="inline-flex items-center gap-3 bg-[var(--color-bg-surface)] border border-[var(--color-bg-border)] rounded-full p-1">
            <button
              onClick={() => setAnnual(false)}
              className={`px-5 py-2 rounded-full text-[14px] font-medium transition-all ${!annual ? 'bg-[var(--color-bg-elevated)] text-[var(--color-text-primary)]' : 'text-[var(--color-text-secondary)]'}`}
            >
              Monthly
            </button>
            <button
              onClick={() => setAnnual(true)}
              className={`px-5 py-2 rounded-full text-[14px] font-medium transition-all flex items-center gap-2 ${annual ? 'bg-[var(--color-bg-elevated)] text-[var(--color-text-primary)]' : 'text-[var(--color-text-secondary)]'}`}
            >
              Annual
              <span className="px-2 py-0.5 rounded-full bg-[rgba(34,197,94,0.15)] text-[var(--color-accent-green)] text-[11px] font-semibold">Save 20%</span>
            </button>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="px-[20px] md:px-[40px] pb-[80px]">
        <div className="max-w-[1280px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-[var(--radius-xl)] border p-8 flex flex-col transition-all duration-300 ${
                plan.badge
                  ? 'border-[var(--color-primary)] bg-[var(--color-bg-elevated)] shadow-card'
                  : 'border-[var(--color-bg-border)] bg-[var(--color-bg-surface)] hover:border-[rgba(10,132,255,0.4)]'
              }`}
              style={plan.badge ? { boxShadow: 'var(--shadow-glow-blue)' } : {}}
            >
              {plan.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-[var(--color-primary)] text-white text-[11px] font-semibold tracking-wide whitespace-nowrap">
                  {plan.badge}
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-[18px] font-semibold mb-1" style={{ color: plan.color }}>{plan.name}</h3>
                <p className="text-[13px] text-[var(--color-text-muted)] mb-4">{plan.description}</p>
                <div className="flex items-baseline gap-1">
                  {plan.price.monthly === null ? (
                    <span className="text-[32px] font-bold text-[var(--color-text-primary)]">Custom</span>
                  ) : plan.price.monthly === 0 ? (
                    <span className="text-[32px] font-bold text-[var(--color-text-primary)]">Free</span>
                  ) : (
                    <>
                      <span className="text-[32px] font-bold text-[var(--color-text-primary)]">
                        ${annual ? plan.price.annual : plan.price.monthly}
                      </span>
                      <span className="text-[var(--color-text-muted)] text-[14px]">/mo</span>
                    </>
                  )}
                </div>
                {plan.price.monthly !== null && plan.price.monthly > 0 && annual && (
                  <p className="text-[12px] text-[var(--color-accent-green)] mt-1">
                    Billed ${(plan.price.annual! * 12)} annually
                  </p>
                )}
              </div>

              <ul className="space-y-3 mb-8 flex-1">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    {feature ? (
                      <>
                        <Check size={15} className="text-[var(--color-accent-green)] mt-0.5 shrink-0" />
                        <span className="text-[13px] text-[var(--color-text-secondary)]">{feature}</span>
                      </>
                    ) : (
                      <>
                        <X size={15} className="text-[var(--color-text-muted)] mt-0.5 shrink-0 opacity-40" />
                        <span className="text-[13px] text-[var(--color-text-muted)] opacity-40">Not included</span>
                      </>
                    )}
                  </li>
                ))}
              </ul>

              <Link to={plan.name === 'Enterprise' ? '/contact' : '/download'}>
                <Button variant={plan.ctaVariant} size="md" className="w-full">{plan.cta}</Button>
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Feature comparison table */}
      <section className="px-[20px] md:px-[40px] pb-[80px]">
        <div className="max-w-[1100px] mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-[32px] md:text-[40px] text-[var(--color-text-primary)] mb-3" style={{ letterSpacing: 'var(--tracking-tight)' }}>Compare all features</h2>
            <p className="text-[var(--color-text-secondary)]">See exactly what's included in each plan.</p>
          </div>

          <div className="rounded-[var(--radius-xl)] border border-[var(--color-bg-border)] overflow-hidden">
            {/* Table header */}
            <div className="grid grid-cols-4 bg-[var(--color-bg-elevated)] border-b border-[var(--color-bg-border)]">
              <div className="p-5" />
              {['Starter', 'Professional', 'Enterprise'].map((h) => (
                <div key={h} className="p-5 text-center">
                  <p className={`text-[13px] font-semibold ${h === 'Professional' ? 'text-[var(--color-primary)]' : 'text-[var(--color-text-primary)]'}`}>{h}</p>
                </div>
              ))}
            </div>

            {featureRows.map((cat) => (
              <div key={cat.category}>
                <div className="px-5 py-3 bg-[rgba(10,132,255,0.06)] border-b border-[var(--color-bg-border)]">
                  <p className="text-[11px] uppercase tracking-[0.12em] text-[var(--color-text-muted)] font-semibold">{cat.category}</p>
                </div>
                {cat.features.map((row, i) => (
                  <div key={i} className="grid grid-cols-4 border-b border-[var(--color-bg-border)] last:border-b-0 hover:bg-[rgba(255,255,255,0.02)]">
                    <div className="px-5 py-4 text-[13px] text-[var(--color-text-secondary)]">{row.name}</div>
                    {[row.starter, row.professional, row.enterprise].map((val, j) => (
                      <div key={j} className="px-5 py-4 flex justify-center">
                        {val ? (
                          <Check size={16} className="text-[var(--color-accent-green)]" />
                        ) : (
                          <X size={16} className="text-[var(--color-text-muted)] opacity-30" />
                        )}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust badges */}
      <section className="px-[20px] md:px-[40px] pb-[80px]">
        <div className="max-w-[900px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: Shield, title: '30-Day Money-Back Guarantee', desc: 'Not satisfied? Get a full refund within 30 days, no questions asked.' },
              { icon: Zap, title: 'Cancel Anytime', desc: 'No lock-ins. Downgrade or cancel from your account settings at any time.' },
              { icon: Star, title: 'Free Migration Assistance', desc: 'Our team helps you migrate data from your existing system for free.' },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="rounded-[var(--radius-lg)] border border-[var(--color-bg-border)] bg-[var(--color-bg-surface)] p-6 text-center">
                <div className="w-12 h-12 rounded-full bg-[rgba(10,132,255,0.12)] flex items-center justify-center mx-auto mb-4">
                  <Icon size={22} className="text-[var(--color-primary)]" />
                </div>
                <h4 className="text-[15px] font-semibold text-[var(--color-text-primary)] mb-2">{title}</h4>
                <p className="text-[13px] text-[var(--color-text-secondary)]">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-[20px] md:px-[40px] pb-[80px]">
        <div className="max-w-[800px] mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-[32px] md:text-[40px] text-[var(--color-text-primary)] mb-3" style={{ letterSpacing: 'var(--tracking-tight)' }}>Frequently asked questions</h2>
          </div>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div key={i} className="rounded-[var(--radius-lg)] border border-[var(--color-bg-border)] bg-[var(--color-bg-surface)] overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between px-6 py-5 text-left transition-colors hover:bg-[var(--color-bg-elevated)]"
                >
                  <span className="text-[15px] font-medium text-[var(--color-text-primary)]">{faq.q}</span>
                  {openFaq === i ? (
                    <ChevronUp size={18} className="text-[var(--color-text-muted)] shrink-0" />
                  ) : (
                    <ChevronDown size={18} className="text-[var(--color-text-muted)] shrink-0" />
                  )}
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-5 text-[14px] text-[var(--color-text-secondary)] leading-relaxed border-t border-[var(--color-bg-border)] pt-4">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-[20px] md:px-[40px] pb-[100px]">
        <div className="max-w-[700px] mx-auto rounded-[var(--radius-2xl)] border border-[rgba(10,132,255,0.3)] p-12 text-center" style={{ background: 'linear-gradient(135deg, rgba(10,132,255,0.08) 0%, rgba(124,92,252,0.08) 100%)' }}>
          <Building2 size={40} className="text-[var(--color-primary)] mx-auto mb-5" />
          <h2 className="text-[30px] text-[var(--color-text-primary)] mb-3" style={{ letterSpacing: 'var(--tracking-tight)' }}>Need a custom plan?</h2>
          <p className="text-[var(--color-text-secondary)] mb-6">Talk to our sales team about volume licensing, custom modules, and dedicated support.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact">
              <Button variant="primary" size="lg">Contact Sales</Button>
            </Link>
            <Link to="/download">
              <Button variant="secondary" size="lg">Try Free First</Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
