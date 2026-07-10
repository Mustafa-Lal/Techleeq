import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { BookOpen, CheckCircle2 } from 'lucide-react';
import { Button } from '../components/Button';
import { extractTextFromRichText } from '../utils';

const processSteps = [
  { step: '01', title: 'Discovery call', desc: 'We map your current workflows, pain points, and goals in a 60-minute session.' },
  { step: '02', title: 'Solution design', desc: 'Our team crafts a custom implementation plan with timeline, milestones, and cost breakdown.' },
  { step: '03', title: 'Phased rollout', desc: 'We deploy module by module to minimize disruption, with dedicated support at every phase.' },
  { step: '04', title: 'Ongoing success', desc: 'Quarterly business reviews, proactive health checks, and a named CSM to grow with you.' },
];

export function ServicesPage() {
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL || ''}/api/services?populate=*`)
      .then(res => res.json())
      .then(data => {
        const items = Array.isArray(data?.data) ? data.data : (Array.isArray(data) ? data : []);
        const fetched = items.map((item: any) => {
          // Image URL: could be a nested media object or a direct URL string
          const mediaUrl = item.cover_image?.url || item.image?.url || item.imageUrl || null;
          const imageUrl = mediaUrl
            ? (mediaUrl.startsWith('http') ? mediaUrl : `${import.meta.env.VITE_API_URL || ''}${mediaUrl}`)
            : '';
          
          // Features: could be a JSON array or a label object
          let features: string[] = [];
          if (Array.isArray(item.features)) features = item.features;
          else if (item.label) {
            features = Object.values(item.label).filter((v): v is string => typeof v === 'string' && v.length > 0);
          }

          return {
            id: item.id,
            imageUrl,
            title: item.title || item.name || 'Service',
            color: item.color || 'var(--color-primary)',
            desc: extractTextFromRichText(item.description) || item.desc || '',
            features,
          };
        });
        setServices(fetched);
      })
      .catch(err => console.error('Error fetching services:', err))
      .finally(() => setLoading(false));
  }, []);
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative py-[80px] px-[20px] md:px-[40px] text-center overflow-hidden">
        <div className="absolute inset-0 bg-[var(--gradient-glow)] opacity-40 pointer-events-none" />
        <div className="max-w-[800px] mx-auto relative z-10">
          <span className="inline-block mb-4 px-4 py-1.5 rounded-full bg-[rgba(10,132,255,0.12)] border border-[rgba(10,132,255,0.25)] text-[var(--color-primary)] text-[12px] tracking-[0.12em] uppercase font-medium">
            Professional Services
          </span>
          <h1 className="text-[42px] md:text-[56px] text-[var(--color-text-primary)] mb-5" style={{ letterSpacing: 'var(--tracking-tight)', lineHeight: 'var(--leading-tight)' }}>
            We're with you from<br />
            <span className="gradient-text">day one to long-term</span>
          </h1>
          <p className="text-[18px] text-[var(--color-text-secondary)]">
            Software is only half the story. Our services team ensures you get maximum value — fast adoption, smooth operations, and measurable ROI.
          </p>
        </div>
      </section>

      {/* Services grid */}
      <section className="px-[20px] md:px-[40px] pb-[80px]">
        <div className="max-w-[1280px] mx-auto">
          {!loading && services.length === 0 ? (
            <div className="bg-[var(--color-bg-surface)] border border-[var(--color-bg-border)] rounded-[var(--radius-xl)] p-12 text-center max-w-[800px] mx-auto">
              <BookOpen size={48} className="mx-auto text-[var(--color-text-muted)] mb-4 opacity-50" />
              <h3 className="text-[20px] font-bold text-[var(--color-text-primary)] mb-2">No Services Available</h3>
              <p className="text-[16px] text-[var(--color-text-secondary)]">We are currently updating our professional services. Please check back later.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map(({ imageUrl, title, color, desc, features }) => (
                <div key={title} className="group rounded-[var(--radius-xl)] bg-[var(--color-bg-surface)] border border-[var(--color-bg-border)] hover:border-[rgba(10,132,255,0.3)] transition-all flex flex-col overflow-hidden">
                  {/* Image – full-width, clips cleanly via parent overflow-hidden */}
                  {imageUrl && (
                    <div className="w-full relative flex-shrink-0" style={{ height: '240px' }}>
                      <img src={imageUrl} alt={title} className="w-full h-full object-cover" />
                      {/* Deep bottom fade — blends image seamlessly into card content */}
                      <div
                        className="absolute bottom-0 left-0 right-0"
                        style={{
                          height: '55%',
                          background: 'linear-gradient(to top, var(--color-bg-surface) 0%, transparent 100%)',
                        }}
                      />
                    </div>
                  )}
                  {/* Content */}
                  <div className="p-6 md:p-8 flex flex-col flex-1">
                    <h3 className="text-[18px] font-semibold text-[var(--color-text-primary)] mb-3">{title}</h3>
                    <p className="text-[14px] text-[var(--color-text-secondary)] leading-relaxed mb-5">{desc}</p>
                    <ul className="space-y-2 flex-1">
                      {features?.map((f: any) => (
                        <li key={f} className="flex items-start gap-2.5">
                          <CheckCircle2 size={14} className="shrink-0 mt-0.5" style={{ color }} />
                          <span className="text-[13px] text-[var(--color-text-secondary)]">{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Process */}
      <section className="px-[20px] md:px-[40px] pb-[80px]">
        <div className="max-w-[1100px] mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-[32px] md:text-[40px] text-[var(--color-text-primary)] mb-3" style={{ letterSpacing: 'var(--tracking-tight)' }}>How we work with you</h2>
            <p className="text-[var(--color-text-secondary)]">A structured process built around your timeline and goals.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-0">
            {processSteps.map((step, i) => (
              <div key={step.step} className="relative flex flex-col items-center text-center px-6">
                <div className="w-14 h-14 rounded-full bg-[rgba(10,132,255,0.12)] border border-[rgba(10,132,255,0.25)] flex items-center justify-center mb-4 z-10">
                  <span className="font-['Syne'] font-bold text-[var(--color-primary)] text-[14px]">{step.step}</span>
                </div>
                <h4 className="text-[15px] font-semibold text-[var(--color-text-primary)] mb-2">{step.title}</h4>
                <p className="text-[13px] text-[var(--color-text-secondary)]">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-[20px] md:px-[40px] pb-[100px]">
        <div className="max-w-[700px] mx-auto rounded-[var(--radius-2xl)] border border-[rgba(10,132,255,0.3)] p-12 text-center" style={{ background: 'linear-gradient(135deg, rgba(10,132,255,0.08) 0%, rgba(124,92,252,0.08) 100%)' }}>
          <h2 className="text-[28px] text-[var(--color-text-primary)] mb-3" style={{ letterSpacing: 'var(--tracking-tight)' }}>Ready to get started?</h2>
          <p className="text-[var(--color-text-secondary)] mb-6">Schedule a free discovery call with our implementation team.</p>
          <Link to="/contact">
            <Button variant="primary" size="lg">Book a Discovery Call</Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
