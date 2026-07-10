import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { MapPin, Clock, Briefcase, ChevronDown, ChevronUp, ArrowRight, Users } from 'lucide-react';
import { Button } from '../components/Button';
import { RichTextRenderer } from '../components/RichTextRenderer';
export function CareersPage() {
  const [jobs, setJobs] = useState<any[]>([]);
  const [activeDept, setActiveDept] = useState('All');
  const [expandedJob, setExpandedJob] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL || ''}/api/open-positions?populate=*`)
      .then(res => res.json())
      .then(data => {
        const items = Array.isArray(data?.data) ? data.data : (Array.isArray(data) ? data : []);
        const fetched = items.map((item: any) => ({
          id: item.id,
          title: item.tittle || item.title || item.name || 'Position',
          dept: item.department || item.dept || 'General',
          location: item.location || 'Remote',
          type: item.employment_type || item.type || 'Full-time',
          level: item.level || 'Mid',
          desc: item.description || item.desc || '',
        }));
        setJobs(fetched);
      })
      .catch(err => console.error('Error fetching jobs:', err))
      .finally(() => setLoading(false));
  }, []);

  const departments = ['All', ...Array.from(new Set(jobs.map((j) => j.dept)))];
  const filtered = activeDept === 'All' ? jobs : jobs.filter((j) => j.dept === activeDept);

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative py-[80px] px-[20px] md:px-[40px] text-center overflow-hidden">
        <div className="absolute inset-0 bg-[var(--gradient-glow)] opacity-40 pointer-events-none" />
        <div className="max-w-[800px] mx-auto relative z-10">
          <span className="inline-block mb-4 px-4 py-1.5 rounded-full bg-[rgba(10,132,255,0.12)] border border-[rgba(10,132,255,0.25)] text-[var(--color-primary)] text-[12px] tracking-[0.12em] uppercase font-medium">
            We're Hiring
          </span>
          <h1 className="text-[42px] md:text-[56px] text-[var(--color-text-primary)] mb-5" style={{ letterSpacing: 'var(--tracking-tight)', lineHeight: 'var(--leading-tight)' }}>
            Help build the future of<br />
            <span className="gradient-text">African enterprise software</span>
          </h1>
          <p className="text-[18px] text-[var(--color-text-secondary)]">
            We're a team of 80+ people across 12 countries, building software that powers real businesses. Come make an impact.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="px-[20px] md:px-[40px] pb-[60px]">
        <div className="max-w-[800px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-5">
          {[
            { v: '80+', l: 'Team members' },
            { v: '12', l: 'Countries' },
            { v: '4.7★', l: 'Glassdoor rating' },
            { v: '92%', l: 'Retention rate' },
          ].map((s) => (
            <div key={s.l} className="rounded-[var(--radius-lg)] border border-[var(--color-bg-border)] bg-[var(--color-bg-surface)] p-5 text-center">
              <p className="text-[28px] font-bold text-[var(--color-primary)]" style={{ fontFamily: 'Syne' }}>{s.v}</p>
              <p className="text-[12px] text-[var(--color-text-muted)] mt-1">{s.l}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Open roles */}
      <section className="px-[20px] md:px-[40px] pb-[100px]">
        <div className="max-w-[1000px] mx-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
            <h2 className="text-[28px] font-bold text-[var(--color-text-primary)]" style={{ letterSpacing: 'var(--tracking-tight)' }}>Open roles <span className="text-[var(--color-primary)]">({filtered.length})</span></h2>
            <div className="flex flex-wrap gap-2">
              {departments.map((d) => (
                <button
                  key={d}
                  onClick={() => setActiveDept(d)}
                  className={`px-4 py-1.5 rounded-full text-[12px] font-medium transition-all ${
                    activeDept === d
                      ? 'bg-[var(--color-primary)] text-white'
                      : 'bg-[var(--color-bg-surface)] border border-[var(--color-bg-border)] text-[var(--color-text-secondary)] hover:border-[var(--color-primary)] hover:text-[var(--color-text-primary)]'
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>

          {!loading && jobs.length === 0 ? (
            <div className="bg-[var(--color-bg-surface)] border border-[var(--color-bg-border)] rounded-[var(--radius-xl)] p-12 text-center">
              <Users size={48} className="mx-auto text-[var(--color-text-muted)] mb-4 opacity-50" />
              <h3 className="text-[20px] font-bold text-[var(--color-text-primary)] mb-2">No Open Positions</h3>
              <p className="text-[16px] text-[var(--color-text-secondary)]">We don't have any open roles right now, but we are always looking for great talent. Check back soon!</p>
            </div>
          ) : (
            <div className="space-y-3">
              {filtered.length === 0 ? (
                <div className="text-center py-16">
                  <p className="text-[var(--color-text-muted)]">No open roles in this department right now.</p>
                  <p className="text-[13px] text-[var(--color-text-muted)] mt-2">Send us your CV and we'll keep it on file.</p>
                  <div className="mt-4">
                    <Link to="/apply?job=Speculative"><Button variant="secondary" size="md">Send Speculative Application</Button></Link>
                  </div>
                </div>
              ) : (
                filtered.map((job) => (
                  <div key={job.id} className="rounded-[var(--radius-lg)] border border-[var(--color-bg-border)] bg-[var(--color-bg-surface)] overflow-hidden hover:border-[rgba(10,132,255,0.3)] transition-all">
                    <button
                      onClick={() => setExpandedJob(expandedJob === job.id ? null : job.id)}
                      className="w-full flex flex-col md:flex-row md:items-center gap-3 md:gap-6 px-6 py-5 text-left"
                    >
                      <div className="flex-1">
                        <h4 className="text-[16px] font-semibold text-[var(--color-text-primary)]">{job.title}</h4>
                        <div className="flex flex-wrap items-center gap-3 mt-1.5">
                          <span className="flex items-center gap-1.5 text-[12px] text-[var(--color-text-muted)]">
                            <MapPin size={12} />{job.location}
                          </span>
                          <span className="flex items-center gap-1.5 text-[12px] text-[var(--color-text-muted)]">
                            <Clock size={12} />{job.type}
                          </span>
                          <span className="flex items-center gap-1.5 text-[12px] text-[var(--color-text-muted)]">
                            <Briefcase size={12} />{job.level}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 shrink-0">
                        <span className="px-3 py-1 rounded-full bg-[rgba(10,132,255,0.1)] text-[var(--color-primary)] text-[11px] font-medium">{job.dept}</span>
                        {expandedJob === job.id ? <ChevronUp size={16} className="text-[var(--color-text-muted)]" /> : <ChevronDown size={16} className="text-[var(--color-text-muted)]" />}
                      </div>
                    </button>
                    {expandedJob === job.id && (
                      <div className="px-6 pb-6 border-t border-[var(--color-bg-border)] pt-4">
                        <div className="text-[14px] text-[var(--color-text-secondary)] leading-relaxed mb-4">
                          <RichTextRenderer content={job.desc} />
                        </div>
                        <Link to={`/apply?job=${encodeURIComponent(job.title)}`}>
                          <Button variant="primary" size="sm">Apply Now <ArrowRight size={14} /></Button>
                        </Link>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          )}

          <div className="mt-12 p-8 rounded-[var(--radius-xl)] border border-[var(--color-bg-border)] bg-[var(--color-bg-surface)] text-center">
            <p className="text-[15px] text-[var(--color-text-secondary)] mb-2">Don't see the right role?</p>
            <p className="text-[13px] text-[var(--color-text-muted)] mb-5">We hire for attitude and aptitude. Send us your story.</p>
            <Link to="/apply?job=Speculative"><Button variant="secondary" size="md">Send Speculative Application</Button></Link>
          </div>
        </div>
      </section>
    </div>
  );
}
