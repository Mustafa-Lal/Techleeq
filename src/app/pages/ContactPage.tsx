import { useState } from 'react';
import { Mail, Phone, MapPin, Clock, MessageSquare, Headphones, Users, CheckCircle2, Send } from 'lucide-react';
import { Button } from '../components/Button';

const contactReasons = [
  'General inquiry',
  'Sales / pricing question',
  'Technical support',
  'Partnership opportunity',
  'Press / media',
  'Careers',
  'Other',
];

const offices = [
  { city: 'Lagos (HQ)', address: '14 Adeola Odeku Street, Victoria Island, Lagos, Nigeria', phone: '+234 800 TECHLEEQ', hours: 'Mon–Fri 8am–6pm WAT' },
  { city: 'Nairobi', address: 'The Prism, Upper Hill, Nairobi, Kenya', phone: '+254 700 TECHLEEQ', hours: 'Mon–Fri 8am–6pm EAT' },
  { city: 'Accra', address: 'Ridge Tower, Ridge, Accra, Ghana', phone: '+233 302 TECHLEEQ', hours: 'Mon–Fri 8am–6pm GMT' },
];

export function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', company: '', reason: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const scriptUrl = import.meta.env.VITE_CONTACT_SCRIPT_URL;

    try {
      const res = await fetch(scriptUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          workEmail: form.email,
          companyName: form.company,
          reason: form.reason,
          message: form.message,
          submitted_at: new Date().toISOString(),
        }),
        mode: 'no-cors', // Google Apps Script requires no-cors
      });
      // no-cors gives opaque response — treat any completion as success
      setSubmitted(true);
    } catch (err) {
      setError('Something went wrong. Please try again or email us directly.');
    } finally {
      setLoading(false);
    }
  };

  const update = (field: string, value: string) => setForm((prev) => ({ ...prev, [field]: value }));

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative py-[80px] px-[20px] md:px-[40px] text-center overflow-hidden">
        <div className="absolute inset-0 bg-[var(--gradient-glow)] opacity-40 pointer-events-none" />
        <div className="max-w-[700px] mx-auto relative z-10">
          <span className="inline-block mb-4 px-4 py-1.5 rounded-full bg-[rgba(10,132,255,0.12)] border border-[rgba(10,132,255,0.25)] text-[var(--color-primary)] text-[12px] tracking-[0.12em] uppercase font-medium">
            Get in Touch
          </span>
          <h1 className="text-[42px] md:text-[52px] text-[var(--color-text-primary)] mb-4" style={{ letterSpacing: 'var(--tracking-tight)', lineHeight: 'var(--leading-tight)' }}>
            We'd love to hear<br />
            <span className="gradient-text">from you</span>
          </h1>
          <p className="text-[18px] text-[var(--color-text-secondary)]">
            Whether you have a question, need a demo, or just want to say hello — our team responds within one business day.
          </p>
        </div>
      </section>


      {/* Main contact section */}
      <section className="px-[20px] md:px-[40px] pb-[80px]">
        <div className="max-w-[1100px] mx-auto grid md:grid-cols-[1fr_420px] gap-10">
          {/* Form */}
          <div className="rounded-[var(--radius-2xl)] border border-[var(--color-bg-border)] bg-[var(--color-bg-surface)] p-8 md:p-10">
            {submitted ? (
              <div className="flex flex-col items-center justify-center h-full text-center py-10 gap-4">
                <div className="w-16 h-16 rounded-full bg-[rgba(34,197,94,0.1)] flex items-center justify-center">
                  <CheckCircle2 size={36} className="text-[var(--color-accent-green)]" />
                </div>
                <h3 className="text-[22px] font-semibold text-[var(--color-text-primary)]">Message sent!</h3>
                <p className="text-[var(--color-text-secondary)] max-w-[380px]">
                  Thanks for reaching out, {form.name.split(' ')[0] || 'there'}. Our team will get back to you at <strong>{form.email}</strong> within one business day.
                </p>
                <button onClick={() => { setSubmitted(false); setForm({ name: '', email: '', company: '', reason: '', message: '' }); }} className="mt-2 text-[13px] text-[var(--color-primary)] hover:underline">
                  Send another message
                </button>
              </div>
            ) : (
              <>
                <h2 className="text-[22px] font-bold text-[var(--color-text-primary)] mb-6">Send us a message</h2>
                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-[var(--radius-md)] mb-6 text-[14px]">
                    {error}
                  </div>
                )}
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                  <div className="grid md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-[12px] text-[var(--color-text-muted)] mb-1.5 font-medium uppercase tracking-wider">Full name *</label>
                      <input
                        required
                        value={form.name}
                        onChange={(e) => update('name', e.target.value)}
                        placeholder="Emeka Okafor"
                        className="w-full h-[44px] px-4 bg-[var(--color-bg-elevated)] border border-[var(--color-bg-border)] rounded-[var(--radius-md)] text-[14px] text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary-glow)] transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-[12px] text-[var(--color-text-muted)] mb-1.5 font-medium uppercase tracking-wider">Work email *</label>
                      <input
                        required
                        type="email"
                        value={form.email}
                        onChange={(e) => update('email', e.target.value)}
                        placeholder="emeka@company.com"
                        className="w-full h-[44px] px-4 bg-[var(--color-bg-elevated)] border border-[var(--color-bg-border)] rounded-[var(--radius-md)] text-[14px] text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary-glow)] transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[12px] text-[var(--color-text-muted)] mb-1.5 font-medium uppercase tracking-wider">Company name</label>
                    <input
                      value={form.company}
                      onChange={(e) => update('company', e.target.value)}
                      placeholder="Acme Industries Ltd"
                      className="w-full h-[44px] px-4 bg-[var(--color-bg-elevated)] border border-[var(--color-bg-border)] rounded-[var(--radius-md)] text-[14px] text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary-glow)] transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-[12px] text-[var(--color-text-muted)] mb-1.5 font-medium uppercase tracking-wider">Reason for contact *</label>
                    <select
                      required
                      value={form.reason}
                      onChange={(e) => update('reason', e.target.value)}
                      className="w-full h-[44px] px-4 bg-[var(--color-bg-elevated)] border border-[var(--color-bg-border)] rounded-[var(--radius-md)] text-[14px] text-[var(--color-text-primary)] focus:outline-none focus:border-[var(--color-primary)] transition-all appearance-none cursor-pointer"
                    >
                      <option value="" disabled>Select a reason…</option>
                      {contactReasons.map((r) => <option key={r} value={r}>{r}</option>)}
                    </select>
                  </div>

                  <div>
                    <label className="block text-[12px] text-[var(--color-text-muted)] mb-1.5 font-medium uppercase tracking-wider">Message *</label>
                    <textarea
                      required
                      value={form.message}
                      onChange={(e) => update('message', e.target.value)}
                      placeholder="Tell us what you're looking for, or describe your issue in detail…"
                      rows={5}
                      className="w-full px-4 py-3 bg-[var(--color-bg-elevated)] border border-[var(--color-bg-border)] rounded-[var(--radius-md)] text-[14px] text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary-glow)] transition-all resize-none"
                    />
                  </div>

                  <Button type="submit" variant="primary" size="lg" disabled={loading} className="w-full flex items-center justify-center gap-2">
                    {loading ? 'Sending…' : <><Send size={16} /> Send Message</>}
                  </Button>

                  <p className="text-[11px] text-[var(--color-text-muted)] text-center">
                    By submitting, you agree to our <a href="/privacy" className="text-[var(--color-primary)] hover:underline">Privacy Policy</a>.
                  </p>
                </form>
              </>
            )}
          </div>

          {/* Sidebar info */}
          <div className="flex flex-col gap-6">

            {/* Offices */}
            {offices.map((office) => (
              <div key={office.city} className="p-6 rounded-[var(--radius-xl)] border border-[var(--color-bg-border)] bg-[var(--color-bg-surface)]">
                <h4 className="text-[15px] font-semibold text-[var(--color-text-primary)] mb-3">{office.city}</h4>
                <div className="space-y-2.5">
                  <div className="flex items-start gap-2.5">
                    <MapPin size={14} className="text-[var(--color-text-muted)] shrink-0 mt-0.5" />
                    <span className="text-[12px] text-[var(--color-text-secondary)]">{office.address}</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Phone size={14} className="text-[var(--color-text-muted)] shrink-0" />
                    <span className="text-[12px] text-[var(--color-text-secondary)]">{office.phone}</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Clock size={14} className="text-[var(--color-text-muted)] shrink-0" />
                    <span className="text-[12px] text-[var(--color-text-secondary)]">{office.hours}</span>
                  </div>
                </div>
              </div>
            ))}

            {/* Email direct */}
            <div className="p-5 rounded-[var(--radius-lg)] border border-[var(--color-bg-border)] bg-[var(--color-bg-elevated)] flex items-center gap-3">
              <Mail size={18} className="text-[var(--color-primary)] shrink-0" />
              <div>
                <p className="text-[12px] text-[var(--color-text-muted)]">Direct email</p>
                <a href="mailto:hello@techleeq.com" className="text-[13px] text-[var(--color-primary)] hover:underline">hello@techleeq.com</a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
