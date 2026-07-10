import { Shield } from 'lucide-react';

const sections = [
  {
    title: '1. Information We Collect',
    content: `We collect information you provide directly to us when you create an account, download the software, or contact us. This includes your name, email address, company name, and billing information.

We also collect technical data automatically when you use our software, including: device identifiers, operating system version, application version, crash logs, and feature usage analytics. This data is anonymized and used solely to improve product quality.

We do not collect the content of documents, spreadsheets, or business data created or managed within TechLeeq. Your business data remains on your device unless you enable cloud sync, in which case it is encrypted in transit and at rest.`,
  },
  {
    title: '2. How We Use Your Information',
    content: `We use the information we collect to:
• Provide, maintain, and improve our software and services
• Process transactions and send related information including purchase confirmations
• Send technical notices, updates, and security alerts
• Respond to your comments and questions
• Send marketing communications (you may opt out at any time)
• Monitor and analyze usage patterns to improve user experience
• Detect, investigate, and prevent fraudulent transactions and other illegal activities`,
  },
  {
    title: '3. Data Storage and Security',
    content: `TechLeeq is an offline-first desktop application. By default, all your business data is stored locally on your device and is never transmitted to our servers.

If you enable cloud sync (optional), your data is encrypted using AES-256 before transmission and stored in our secure cloud infrastructure. We maintain ISO 27001 certification and conduct annual third-party penetration tests.

We retain account and billing information for 7 years as required by law. You may request deletion of your account at any time, subject to legal retention obligations.`,
  },
  {
    title: '4. Sharing of Information',
    content: `We do not sell, trade, or rent your personal information to third parties. We may share your information with:

• Service providers who assist us in operating our platform (payment processors, email service providers, hosting providers) — these parties are contractually bound to protect your data
• Law enforcement or other parties when required by law
• Business partners in the context of a merger, acquisition, or sale of assets (you will be notified in advance)

We require all third-party service providers to implement appropriate security measures and process personal data only as instructed.`,
  },
  {
    title: '5. Your Rights (GDPR / NDPR)',
    content: `Depending on your jurisdiction, you may have the right to:
• Access the personal data we hold about you
• Correct inaccurate or incomplete data
• Request deletion of your personal data ("right to be forgotten")
• Restrict or object to certain processing
• Data portability — receive your data in a machine-readable format
• Withdraw consent at any time where processing is based on consent

To exercise any of these rights, contact us at privacy@techleeq.com. We will respond within 30 days.`,
  },
  {
    title: '6. Cookies',
    content: `Our website uses cookies to improve your browsing experience. For detailed information, see our Cookie Policy. The TechLeeq desktop application does not use cookies.`,
  },
  {
    title: '7. Children\'s Privacy',
    content: `TechLeeq is not directed at children under the age of 16. We do not knowingly collect personal information from children. If you believe we have inadvertently collected such information, please contact us immediately.`,
  },
  {
    title: '8. Changes to This Policy',
    content: `We may update this Privacy Policy periodically. We will notify you of significant changes by email and by displaying a notice in the application. Your continued use of TechLeeq after the effective date of the revised policy constitutes your acceptance.`,
  },
  {
    title: '9. Contact Us',
    content: `For privacy-related inquiries, contact our Data Protection Officer:

Email: privacy@techleeq.com
Postal: 14 Adeola Odeku Street, Victoria Island, Lagos, Nigeria

For EU residents: Our EU Representative is available at eu-privacy@techleeq.com`,
  },
];

export function PrivacyPage() {
  return (
    <div className="min-h-screen">
      <section className="relative py-[80px] px-[20px] md:px-[40px] text-center overflow-hidden">
        <div className="absolute inset-0 bg-[var(--gradient-glow)] opacity-30 pointer-events-none" />
        <div className="max-w-[700px] mx-auto relative z-10">
          <div className="w-14 h-14 rounded-full bg-[rgba(10,132,255,0.12)] flex items-center justify-center mx-auto mb-5">
            <Shield size={26} className="text-[var(--color-primary)]" />
          </div>
          <h1 className="text-[38px] md:text-[48px] text-[var(--color-text-primary)] mb-3" style={{ letterSpacing: 'var(--tracking-tight)' }}>Privacy Policy</h1>
          <p className="text-[var(--color-text-secondary)]">Last updated: January 1, 2025 · Effective: January 1, 2025</p>
        </div>
      </section>

      <section className="px-[20px] md:px-[40px] pb-[100px]">
        <div className="max-w-[820px] mx-auto">
          <div className="mb-10 p-5 rounded-[var(--radius-lg)] border border-[rgba(10,132,255,0.25)] bg-[rgba(10,132,255,0.06)]">
            <p className="text-[14px] text-[var(--color-text-secondary)] leading-relaxed">
              <strong className="text-[var(--color-text-primary)]">Summary:</strong> Your business data stays on your device. We collect minimal technical data to improve the product. We never sell your information. You have full rights to access, correct, or delete your data.
            </p>
          </div>

          <div className="space-y-8">
            {sections.map((section) => (
              <div key={section.title}>
                <h2 className="text-[20px] font-semibold text-[var(--color-text-primary)] mb-3">{section.title}</h2>
                <div className="text-[14px] text-[var(--color-text-secondary)] leading-relaxed whitespace-pre-line">{section.content}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
