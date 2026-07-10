import { FileText } from 'lucide-react';

const sections = [
  {
    title: '1. Acceptance of Terms',
    content: `By downloading, installing, or using TechLeeq ("the Software"), you agree to be bound by these Terms of Service. If you are using the Software on behalf of an organization, you represent that you have the authority to bind that organization to these terms.`,
  },
  {
    title: '2. License Grant',
    content: `Subject to your compliance with these Terms, TechLeeq grants you a limited, non-exclusive, non-transferable, revocable license to install and use the Software on devices owned or controlled by you, solely for your internal business purposes.

You may not:
• Reverse engineer, decompile, or disassemble the Software
• Modify, adapt, or create derivative works
• Sublicense, sell, resell, transfer, or assign the Software
• Use the Software to provide services to third parties (unless you hold a valid reseller agreement)
• Remove or alter any proprietary notices`,
  },
  {
    title: '3. Subscription and Payment',
    content: `Paid plans are billed in advance on a monthly or annual basis. All fees are non-refundable except as described in our 30-Day Money-Back Guarantee.

The 30-Day Money-Back Guarantee applies to first-time subscribers only. To request a refund, contact billing@techleeq.com within 30 days of your first payment.

Prices may change with 30 days' notice. Continued use after a price change constitutes acceptance.`,
  },
  {
    title: '4. Free Trial',
    content: `TechLeeq offers a 14-day free trial of the Professional plan. No credit card is required for the trial. At the end of the trial period, the Software reverts to read-only mode unless you subscribe. Your data is retained for 30 days post-trial.`,
  },
  {
    title: '5. Your Data',
    content: `You retain all rights to the data you create and manage with TechLeeq. We do not claim ownership of your business data.

For cloud sync users: you grant TechLeeq a limited license to store and process your data solely to provide the sync service. Upon account termination, cloud-stored data is deleted within 30 days.`,
  },
  {
    title: '6. Acceptable Use',
    content: `You agree not to use the Software for any unlawful purpose or in any way that could damage, disable, or impair the Software or its servers. Prohibited uses include but are not limited to fraud, money laundering, and violation of any applicable export control laws.`,
  },
  {
    title: '7. Intellectual Property',
    content: `The Software, including all code, design, graphics, and documentation, is the exclusive property of TechLeeq Technologies Ltd and is protected by intellectual property laws. The TechLeeq name and logo are registered trademarks.`,
  },
  {
    title: '8. Limitation of Liability',
    content: `TO THE MAXIMUM EXTENT PERMITTED BY LAW, TECHLEEQ SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES ARISING FROM YOUR USE OF THE SOFTWARE. TECHLEEQ'S TOTAL LIABILITY SHALL NOT EXCEED THE FEES PAID IN THE 12 MONTHS PRECEDING THE CLAIM.`,
  },
  {
    title: '9. Governing Law',
    content: `These Terms are governed by the laws of the Federal Republic of Nigeria. Any disputes shall be resolved by arbitration in Lagos, Nigeria, under the rules of the Lagos Court of Arbitration, except that either party may seek injunctive relief in any court of competent jurisdiction.`,
  },
  {
    title: '10. Changes to Terms',
    content: `We may modify these Terms at any time. We will notify you of material changes via email and in-app notification with at least 14 days' notice. Continued use after the effective date constitutes acceptance.`,
  },
];

export function TermsPage() {
  return (
    <div className="min-h-screen">
      <section className="relative py-[80px] px-[20px] md:px-[40px] text-center overflow-hidden">
        <div className="absolute inset-0 bg-[var(--gradient-glow)] opacity-30 pointer-events-none" />
        <div className="max-w-[700px] mx-auto relative z-10">
          <div className="w-14 h-14 rounded-full bg-[rgba(10,132,255,0.12)] flex items-center justify-center mx-auto mb-5">
            <FileText size={26} className="text-[var(--color-primary)]" />
          </div>
          <h1 className="text-[38px] md:text-[48px] text-[var(--color-text-primary)] mb-3" style={{ letterSpacing: 'var(--tracking-tight)' }}>Terms of Service</h1>
          <p className="text-[var(--color-text-secondary)]">Last updated: January 1, 2025 · Effective: January 1, 2025</p>
        </div>
      </section>

      <section className="px-[20px] md:px-[40px] pb-[100px]">
        <div className="max-w-[820px] mx-auto space-y-8">
          {sections.map((section) => (
            <div key={section.title}>
              <h2 className="text-[20px] font-semibold text-[var(--color-text-primary)] mb-3">{section.title}</h2>
              <div className="text-[14px] text-[var(--color-text-secondary)] leading-relaxed whitespace-pre-line">{section.content}</div>
            </div>
          ))}
          <div className="pt-4 border-t border-[var(--color-bg-border)]">
            <p className="text-[13px] text-[var(--color-text-muted)]">Questions? Contact us at <a href="mailto:legal@techleeq.com" className="text-[var(--color-primary)] hover:underline">legal@techleeq.com</a></p>
          </div>
        </div>
      </section>
    </div>
  );
}
