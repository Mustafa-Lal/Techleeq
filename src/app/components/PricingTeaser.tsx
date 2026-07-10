import { Check } from 'lucide-react';
import { Link } from 'react-router';
import { Button } from './Button';

const plans = [
  {
    name: 'Free Trial',
    price: '$0',
    period: '14 days',
    description: 'Perfect for testing the platform',
    features: [
      'Core modules',
      '1 user',
      'Limited storage',
      'Community support',
      'Basic analytics',
    ],
    cta: 'Start Free Trial',
    variant: 'secondary' as const,
    popular: false,
  },
  {
    name: 'Professional',
    price: '$49',
    period: 'per user/month',
    description: 'For growing teams',
    features: [
      'All modules',
      'Up to 20 users',
      'Priority support',
      'Cloud sync',
      'Advanced analytics',
      'Custom integrations',
      'API access',
    ],
    cta: 'Get Started',
    variant: 'primary' as const,
    popular: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: 'pricing',
    description: 'For large organizations',
    features: [
      'Unlimited users',
      'Custom modules',
      'SLA guarantee',
      'Dedicated account manager',
      'On-premise deployment',
      'Advanced security',
      'Custom training',
    ],
    cta: 'Contact Sales',
    variant: 'secondary' as const,
    popular: false,
  },
];

export function PricingTeaser() {
  return (
    <section id="pricing" className="py-[100px] px-[20px] md:px-[40px] bg-[var(--color-bg-surface)]">
      <div className="max-w-[1280px] mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-[700px] mx-auto mb-16">
          <h2 className="font-['Syne'] text-[36px] md:text-[40px] font-bold leading-tight text-[var(--color-text-primary)] mb-4">
            Simple, transparent pricing
          </h2>
          <p className="text-[17px] text-[var(--color-text-secondary)] leading-relaxed">
            Start free. Scale as you grow.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative bg-[var(--color-bg-base)] border rounded-[var(--radius-xl)] p-8 ${
                plan.popular
                  ? 'border-[var(--color-accent-violet)] shadow-glow-violet scale-105 md:scale-110'
                  : 'border-[var(--color-bg-border)]'
              } transition-all duration-300 hover:-translate-y-1`}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="px-4 py-1 bg-[var(--color-accent-violet)] text-white text-xs font-semibold rounded-full">
                    ⭐ POPULAR
                  </span>
                </div>
              )}

              {/* Plan Name */}
              <h3 className="font-['DM_Sans'] text-[20px] font-bold text-[var(--color-text-primary)] mb-2">
                {plan.name}
              </h3>

              {/* Description */}
              <p className="text-[13px] text-[var(--color-text-muted)] mb-6">
                {plan.description}
              </p>

              {/* Price */}
              <div className="mb-6">
                <span className="font-['Syne'] text-[48px] font-bold text-[var(--color-text-primary)]">
                  {plan.price}
                </span>
                <span className="text-[16px] text-[var(--color-text-muted)] ml-2">
                  /{plan.period}
                </span>
              </div>

              {/* CTA Button */}
              <Link to="/download" className="block mb-6">
                <Button variant={plan.variant} size="lg" className="w-full">
                  {plan.cta}
                </Button>
              </Link>

              {/* Features List */}
              <ul className="space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <Check size={20} className="text-[var(--color-accent-green)] mt-0.5 flex-shrink-0" />
                    <span className="text-[14px] text-[var(--color-text-secondary)]">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Referral Note */}
        <div className="bg-[rgba(245,166,35,0.06)] border border-[rgba(245,166,35,0.3)] rounded-[var(--radius-lg)] p-6 max-w-[800px] mx-auto">
          <p className="text-[14px] text-[var(--color-text-secondary)] text-center">
            <span className="text-[var(--color-accent-amber)] font-semibold">Have a referral code?</span>
            {' '}Apply it at checkout for exclusive discounts from our sales partners.
          </p>
        </div>
      </div>
    </section>
  );
}
