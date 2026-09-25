import { useState } from 'react';
import { useSearchParams } from 'react-router';
import { Briefcase, CheckCircle2, Send, Calendar, Globe, User, Phone, Mail, Award, AlignLeft, Linkedin } from 'lucide-react';
import { Button } from '../components/Button';
import { useSEO } from '../hooks/useSEO';

export function ApplyPage() {
  const [searchParams] = useSearchParams();
  const jobTitle = searchParams.get('job') || 'General Application';

  useSEO({
    title: 'Apply for a Role at Techleeq',
    description: 'Apply to join the Techleeq team and help build practical digital solutions for businesses.',
    path: '/apply',
  });

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    experience: '',
    dob: '',
    gender: '',
    nationality: '',
    linkedinUrl: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const scriptUrl = import.meta.env.VITE_POSITION_SCRIPT_URL;

    try {
      if (scriptUrl) {
        await fetch(scriptUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            fullName: form.name,
            email: form.email,
            phone: form.phone,
            totalExperience: form.experience,
            dateOfBirth: form.dob,
            gender: form.gender,
            nationality: form.nationality,
            linkedin: form.linkedinUrl,
            coverLetter: form.message
          }),
          mode: 'no-cors',
        });
      }
      setSubmitted(true);
    } catch (err) {
      setError('Something went wrong. Please try again or email us directly.');
    } finally {
      setLoading(false);
    }
  };

  const update = (field: string, value: string) => setForm((prev) => ({ ...prev, [field]: value }));

  return (
    <div className="min-h-screen pb-[80px]">
      {/* Hero */}
      <section className="relative pt-[60px] pb-[40px] px-[20px] md:px-[40px] text-center overflow-hidden">
        <div className="absolute inset-0 bg-[var(--gradient-glow)] opacity-30 pointer-events-none" />
        <div className="max-w-[700px] mx-auto relative z-10">
          <span className="inline-block mb-4 px-4 py-1.5 rounded-full bg-[rgba(10,132,255,0.12)] border border-[rgba(10,132,255,0.25)] text-[var(--color-primary)] text-[12px] tracking-[0.12em] uppercase font-medium">
            Join Our Team
          </span>
          <h1 className="text-[32px] md:text-[42px] text-[var(--color-text-primary)] mb-4 font-bold" style={{ letterSpacing: 'var(--tracking-tight)' }}>
            Application for<br />
            <span className="gradient-text">{jobTitle}</span>
          </h1>
          <p className="text-[16px] text-[var(--color-text-secondary)]">
            Fill out the form below and our recruitment team will get back to you.
          </p>
        </div>
      </section>

      {/* Form Section */}
      <section className="px-[20px] md:px-[40px]">
        <div className="max-w-[700px] mx-auto rounded-[var(--radius-2xl)] border border-[var(--color-bg-border)] bg-[var(--color-bg-surface)] p-8 md:p-10 shadow-sm">
          {submitted ? (
            <div className="flex flex-col items-center justify-center text-center py-10 gap-4">
              <div className="w-16 h-16 rounded-full bg-[rgba(34,197,94,0.1)] flex items-center justify-center">
                <CheckCircle2 size={36} className="text-[var(--color-accent-green)]" />
              </div>
              <h3 className="text-[22px] font-semibold text-[var(--color-text-primary)]">Application Submitted!</h3>
              <p className="text-[var(--color-text-secondary)]">
                Thank you for applying to Techleeq. We'll review your application and contact you at <strong>{form.email}</strong> if your profile matches our requirements.
              </p>
              <Button onClick={() => { setSubmitted(false); setForm({ name: '', email: '', phone: '', experience: '', dob: '', gender: '', nationality: '', linkedinUrl: '', message: '' }); }} variant="secondary" className="mt-4">
                Submit another application
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-[var(--radius-md)] text-[14px]">
                  {error}
                </div>
              )}

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[12px] text-[var(--color-text-muted)] mb-1.5 font-medium uppercase tracking-wider">Full Name *</label>
                  <div className="relative">
                    <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]" />
                    <input
                      required
                      value={form.name}
                      onChange={(e) => update('name', e.target.value)}
                      placeholder="Jane Doe"
                      className="w-full h-[44px] pl-10 pr-4 bg-[var(--color-bg-elevated)] border border-[var(--color-bg-border)] rounded-[var(--radius-md)] text-[14px] text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary-glow)] transition-all"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-[12px] text-[var(--color-text-muted)] mb-1.5 font-medium uppercase tracking-wider">Email Address *</label>
                  <div className="relative">
                    <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]" />
                    <input
                      required
                      type="email"
                      value={form.email}
                      onChange={(e) => update('email', e.target.value)}
                      placeholder="jane@example.com"
                      className="w-full h-[44px] pl-10 pr-4 bg-[var(--color-bg-elevated)] border border-[var(--color-bg-border)] rounded-[var(--radius-md)] text-[14px] text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary-glow)] transition-all"
                    />
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[12px] text-[var(--color-text-muted)] mb-1.5 font-medium uppercase tracking-wider">Phone Number *</label>
                  <div className="relative">
                    <Phone size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]" />
                    <input
                      required
                      type="tel"
                      value={form.phone}
                      onChange={(e) => update('phone', e.target.value)}
                      placeholder="+1 234 567 8900"
                      className="w-full h-[44px] pl-10 pr-4 bg-[var(--color-bg-elevated)] border border-[var(--color-bg-border)] rounded-[var(--radius-md)] text-[14px] text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary-glow)] transition-all"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-[12px] text-[var(--color-text-muted)] mb-1.5 font-medium uppercase tracking-wider">Total Experience *</label>
                  <div className="relative">
                    <Award size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]" />
                    <input
                      required
                      value={form.experience}
                      onChange={(e) => update('experience', e.target.value)}
                      placeholder="e.g. 3 years"
                      className="w-full h-[44px] pl-10 pr-4 bg-[var(--color-bg-elevated)] border border-[var(--color-bg-border)] rounded-[var(--radius-md)] text-[14px] text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary-glow)] transition-all"
                    />
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-[12px] text-[var(--color-text-muted)] mb-1.5 font-medium uppercase tracking-wider">Date of Birth *</label>
                  <div className="relative">
                    <Calendar size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]" />
                    <input
                      required
                      type="date"
                      value={form.dob}
                      onChange={(e) => update('dob', e.target.value)}
                      className="w-full h-[44px] pl-10 pr-4 bg-[var(--color-bg-elevated)] border border-[var(--color-bg-border)] rounded-[var(--radius-md)] text-[14px] text-[var(--color-text-primary)] focus:outline-none focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary-glow)] transition-all"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-[12px] text-[var(--color-text-muted)] mb-1.5 font-medium uppercase tracking-wider">Gender</label>
                  <select
                    value={form.gender}
                    onChange={(e) => update('gender', e.target.value)}
                    className="w-full h-[44px] px-4 bg-[var(--color-bg-elevated)] border border-[var(--color-bg-border)] rounded-[var(--radius-md)] text-[14px] text-[var(--color-text-primary)] focus:outline-none focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary-glow)] transition-all"
                  >
                    <option value="" disabled>Select...</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Prefer not to say">Prefer not to say</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[12px] text-[var(--color-text-muted)] mb-1.5 font-medium uppercase tracking-wider">Nationality</label>
                  <div className="relative">
                    <Globe size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]" />
                    <input
                      value={form.nationality}
                      onChange={(e) => update('nationality', e.target.value)}
                      placeholder="e.g. Nigerian"
                      className="w-full h-[44px] pl-10 pr-4 bg-[var(--color-bg-elevated)] border border-[var(--color-bg-border)] rounded-[var(--radius-md)] text-[14px] text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary-glow)] transition-all"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-[12px] text-[var(--color-text-muted)] mb-1.5 font-medium uppercase tracking-wider">LinkedIn Profile URL</label>
                <div className="relative">
                  <Linkedin size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]" />
                  <input
                    type="url"
                    value={form.linkedinUrl}
                    onChange={(e) => update('linkedinUrl', e.target.value)}
                    placeholder="https://linkedin.com/in/your-profile"
                    className="w-full h-[44px] pl-10 pr-4 bg-[var(--color-bg-elevated)] border border-[var(--color-bg-border)] rounded-[var(--radius-md)] text-[14px] text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary-glow)] transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[12px] text-[var(--color-text-muted)] mb-1.5 font-medium uppercase tracking-wider">Cover Letter / Message *</label>
                <div className="relative">
                  <AlignLeft size={16} className="absolute left-3 top-3 text-[var(--color-text-muted)]" />
                  <textarea
                    required
                    value={form.message}
                    onChange={(e) => update('message', e.target.value)}
                    placeholder="Tell us why you are a great fit for this role, or provide a link to your resume/portfolio..."
                    rows={6}
                    className="w-full pl-10 pr-4 py-3 bg-[var(--color-bg-elevated)] border border-[var(--color-bg-border)] rounded-[var(--radius-md)] text-[14px] text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary-glow)] transition-all resize-none"
                  />
                </div>
              </div>

              <Button type="submit" variant="primary" size="lg" disabled={loading} className="w-full flex items-center justify-center gap-2 mt-2">
                {loading ? 'Submitting Application…' : <><Briefcase size={16} /> Submit Application</>}
              </Button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}
