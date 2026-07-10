import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router';
import { Download, Monitor, Apple, Layers, CheckCircle2, Gift, Copy, Check, Shield, Zap, HardDrive, Wifi } from 'lucide-react';
import { Button } from '../components/Button';

const platforms = [
  { id: 'windows', label: 'Windows', icon: Monitor, version: 'Windows 10/11 (64-bit)', size: '187 MB', format: '.exe installer' },
  { id: 'mac', label: 'macOS', icon: Apple, version: 'macOS 12 Monterey or later', size: '203 MB', format: '.dmg package' },
  { id: 'linux', label: 'Linux', icon: Layers, version: 'Ubuntu 20.04+ / Debian 11+', size: '165 MB', format: '.AppImage / .deb' },
];

const steps = [
  { num: '01', title: 'Download the installer', desc: 'Choose your platform and click the download button below.' },
  { num: '02', title: 'Run the installer', desc: 'Open the downloaded file and follow the on-screen setup instructions.' },
  { num: '03', title: 'Enter your referral code', desc: 'If you have a referral code, enter it during signup to unlock your bonus.' },
  { num: '04', title: 'Start your free trial', desc: '14 days of full Professional access — no credit card needed.' },
];

function generateReferralCode(base = '') {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  const suffix = Array.from({ length: 6 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
  return base ? `${base.slice(0, 3).toUpperCase()}-${suffix}` : `TL-${suffix}`;
}

export function DownloadPage() {
  const [searchParams] = useSearchParams();
  const [selectedPlatform, setSelectedPlatform] = useState('windows');
  const [referralCode, setReferralCode] = useState('');
  const [referralInput, setReferralInput] = useState('');
  const [referralValid, setReferralValid] = useState<boolean | null>(null);
  const [copied, setCopied] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [downloaded, setDownloaded] = useState(false);
  const [userReferralCode] = useState(() => generateReferralCode('ME'));

  useEffect(() => {
    const ref = searchParams.get('ref');
    if (ref) {
      setReferralInput(ref.toUpperCase());
      setReferralValid(true);
    }
  }, [searchParams]);

  const validateReferral = () => {
    const code = referralInput.trim().toUpperCase();
    if (code.length >= 5) {
      setReferralCode(code);
      setReferralValid(true);
    } else {
      setReferralValid(false);
    }
  };

  const handleDownload = () => {
    setDownloading(true);
    setTimeout(() => {
      setDownloading(false);
      setDownloaded(true);
    }, 2000);
  };

  const copyReferral = () => {
    navigator.clipboard.writeText(`https://techleeq.com/download?ref=${userReferralCode}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const platform = platforms.find((p) => p.id === selectedPlatform)!;

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative py-[80px] px-[20px] md:px-[40px] text-center overflow-hidden">
        <div className="absolute inset-0 bg-[var(--gradient-glow)] opacity-40 pointer-events-none" />
        <div className="max-w-[700px] mx-auto relative z-10">
          <span className="inline-block mb-4 px-4 py-1.5 rounded-full bg-[rgba(10,132,255,0.12)] border border-[rgba(10,132,255,0.25)] text-[var(--color-primary)] text-[12px] tracking-[0.12em] uppercase font-medium">
            Free 14-Day Trial
          </span>
          <h1 className="text-[42px] md:text-[56px] text-[var(--color-text-primary)] mb-5" style={{ letterSpacing: 'var(--tracking-tight)', lineHeight: 'var(--leading-tight)' }}>
            Download TechLeeq<br />
            <span className="gradient-text">Start for free today</span>
          </h1>
          <p className="text-[18px] text-[var(--color-text-secondary)]">
            Full Professional access for 14 days. No credit card. No commitments. Offline-first desktop application.
          </p>
        </div>
      </section>

      {/* Main download card */}
      <section className="px-[20px] md:px-[40px] pb-[80px]">
        <div className="max-w-[900px] mx-auto">
          <div className="rounded-[var(--radius-2xl)] border border-[var(--color-bg-border)] bg-[var(--color-bg-surface)] overflow-hidden shadow-card">

            {/* Platform selector */}
            <div className="border-b border-[var(--color-bg-border)] p-8">
              <p className="text-[13px] uppercase tracking-[0.12em] text-[var(--color-text-muted)] font-semibold mb-4">Choose your platform</p>
              <div className="grid grid-cols-3 gap-3">
                {platforms.map((p) => {
                  const Icon = p.icon;
                  return (
                    <button
                      key={p.id}
                      onClick={() => setSelectedPlatform(p.id)}
                      className={`relative flex flex-col items-center gap-3 p-5 rounded-[var(--radius-lg)] border transition-all ${
                        selectedPlatform === p.id
                          ? 'border-[var(--color-primary)] bg-[rgba(10,132,255,0.08)]'
                          : 'border-[var(--color-bg-border)] hover:border-[rgba(10,132,255,0.4)] hover:bg-[var(--color-bg-elevated)]'
                      }`}
                    >
                      <Icon size={28} className={selectedPlatform === p.id ? 'text-[var(--color-primary)]' : 'text-[var(--color-text-secondary)]'} />
                      <span className={`text-[14px] font-semibold ${selectedPlatform === p.id ? 'text-[var(--color-primary)]' : 'text-[var(--color-text-primary)]'}`}>{p.label}</span>
                      <span className="text-[11px] text-[var(--color-text-muted)]">{p.version}</span>
                    </button>
                  );
                })}
              </div>
            </div>


            {/* Download button area */}
            <div className="p-8">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[24px] font-bold text-[var(--color-text-primary)]">TechLeeq v4.2.1</span>
                    <span className="px-2 py-0.5 rounded-full bg-[rgba(34,197,94,0.15)] text-[var(--color-accent-green)] text-[11px] font-semibold">Latest</span>
                  </div>
                  <p className="text-[13px] text-[var(--color-text-secondary)]">{platform.version} · {platform.size} · {platform.format}</p>
                </div>

                {downloaded ? (
                  <div className="flex items-center gap-3 px-8 py-4 rounded-[var(--radius-lg)] bg-[rgba(34,197,94,0.1)] border border-[rgba(34,197,94,0.3)]">
                    <CheckCircle2 size={22} className="text-[var(--color-accent-green)]" />
                    <span className="text-[15px] font-semibold text-[var(--color-accent-green)]">Download started!</span>
                  </div>
                ) : (
                  <button
                    onClick={handleDownload}
                    disabled={downloading}
                    className="flex items-center gap-3 px-8 py-4 rounded-[var(--radius-lg)] font-semibold text-white transition-all disabled:opacity-70"
                    style={{ background: 'var(--gradient-cta)', boxShadow: downloading ? 'none' : 'var(--shadow-glow-blue)' }}
                  >
                    <Download size={20} className={downloading ? 'animate-bounce' : ''} />
                    {downloading ? 'Preparing download…' : `Download for ${platform.label}`}
                  </button>
                )}
              </div>

              {downloaded && (
                <div className="mt-6 p-4 rounded-[var(--radius-lg)] bg-[var(--color-bg-elevated)] border border-[var(--color-bg-border)]">
                  <p className="text-[13px] text-[var(--color-text-secondary)] mb-3">Next steps after installation:</p>
                  <ol className="space-y-1.5">
                    {['Open the installer and follow setup', 'Create your account or log in', 'Enter your referral code when prompted', 'Your 14-day trial starts immediately'].map((s, i) => (
                      <li key={i} className="flex items-center gap-2 text-[13px] text-[var(--color-text-secondary)]">
                        <span className="w-5 h-5 rounded-full bg-[var(--color-primary)] text-white text-[10px] font-bold flex items-center justify-center shrink-0">{i + 1}</span>
                        {s}
                      </li>
                    ))}
                  </ol>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* How it works steps */}
      <section className="px-[20px] md:px-[40px] pb-[80px]">
        <div className="max-w-[900px] mx-auto">
          <h2 className="text-[30px] text-[var(--color-text-primary)] mb-8 text-center" style={{ letterSpacing: 'var(--tracking-tight)' }}>Getting started in 4 steps</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {steps.map((step) => (
              <div key={step.num} className="flex gap-4 p-6 rounded-[var(--radius-lg)] bg-[var(--color-bg-surface)] border border-[var(--color-bg-border)]">
                <span className="font-['Syne'] text-[28px] font-bold text-[rgba(10,132,255,0.25)] shrink-0 leading-none">{step.num}</span>
                <div>
                  <h4 className="text-[15px] font-semibold text-[var(--color-text-primary)] mb-1">{step.title}</h4>
                  <p className="text-[13px] text-[var(--color-text-secondary)]">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Security assurances */}
      <section className="px-[20px] md:px-[40px] pb-[80px]">
        <div className="max-w-[900px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: Shield, label: 'Code-signed installer' },
            { icon: Zap, label: 'No background processes' },
            { icon: HardDrive, label: 'Local data by default' },
            { icon: Wifi, label: 'Works fully offline' },
          ].map(({ icon: Icon, label }) => (
            <div key={label} className="flex flex-col items-center gap-3 p-5 rounded-[var(--radius-lg)] bg-[var(--color-bg-surface)] border border-[var(--color-bg-border)] text-center">
              <Icon size={22} className="text-[var(--color-primary)]" />
              <span className="text-[12px] text-[var(--color-text-secondary)]">{label}</span>
            </div>
          ))}
        </div>
      </section>


    </div>
  );
}
