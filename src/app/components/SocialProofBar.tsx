export function SocialProofBar() {
  const companies = [
    'TechCorp', 'InnoSys', 'DataFlow', 'CloudSync', 'BizHub',
    'OptiMax', 'VentureX', 'NexGen', 'ProSuite', 'SmartOps'
  ];

  return (
    <section className="py-12 md:py-16 px-[20px] md:px-[40px] bg-[var(--color-bg-surface)] border-y border-[var(--color-bg-border)] snap-start w-full">
      <div className="max-w-[1280px] mx-auto w-full">
        <p className="text-[13px] uppercase tracking-[0.12em] text-[var(--color-text-muted)] text-center mb-8">
          Trusted by growing businesses across industries
        </p>

        {/* Logo Ticker */}
        <div className="relative overflow-hidden">
          <div className="flex gap-12 animate-scroll">
            {[...companies, ...companies].map((company, index) => (
              <div
                key={index}
                className="flex-shrink-0 text-[var(--color-text-primary)] opacity-30 hover:opacity-50 transition-opacity text-xl font-bold tracking-tight"
                style={{ minWidth: '120px' }}
              >
                {company}
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-scroll {
          animation: scroll 30s linear infinite;
        }
        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}
