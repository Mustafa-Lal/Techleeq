import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { Package } from 'lucide-react';
import { Button } from '../components/Button';
import { extractTextFromRichText } from '../utils';
import { useSEO } from '../hooks/useSEO';

export function ProductsPage() {
  useSEO({
    title: 'Products – Integrated Business Management Platform | Techleeq',
    description:
      'One platform, every business function. Explore Techleeq’s fully integrated modules that replace a stack of disconnected tools — data flows seamlessly between them.',
    path: '/products',
  });

  const [modules, setModules] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL || ''}/api/products?populate=*`)
      .then(res => res.json())
      .then(data => {
        const items = Array.isArray(data?.data) ? data.data : (Array.isArray(data) ? data : []);
        const fetched = items.map((item: any) => ({
          id: item.id,
          name: item.name || item.title || 'Product',
          tagline: item.tagline || '',
          color: item.color || 'var(--color-primary)',
          desc: extractTextFromRichText(item.description) || item.desc || '',
          icon: item.icon ? `${import.meta.env.VITE_API_URL || ''}${item.icon.url}` : null,
        }));
        setModules(fetched);
      })
      .catch(err => console.error('Error fetching products:', err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative py-[80px] px-[20px] md:px-[40px] text-center overflow-hidden">
        <div className="absolute inset-0 bg-[var(--gradient-glow)] opacity-40 pointer-events-none" />
        <div className="max-w-[800px] mx-auto relative z-10">
          <span className="inline-block mb-4 px-4 py-1.5 rounded-full bg-[rgba(10,132,255,0.12)] border border-[rgba(10,132,255,0.25)] text-[var(--color-primary)] text-[12px] tracking-[0.12em] uppercase font-medium">
            The Platform
          </span>
          <h1 className="text-[42px] md:text-[56px] text-[var(--color-text-primary)] mb-5" style={{ letterSpacing: 'var(--tracking-tight)', lineHeight: 'var(--leading-tight)' }}>
            One platform.<br />
            <span className="gradient-text">Every business function.</span>
          </h1>
          <p className="text-[18px] text-[var(--color-text-secondary)] mb-8">
            Six fully integrated modules that replace a stack of disconnected tools. Data flows seamlessly between them so you never duplicate work.
          </p>

        </div>
      </section>

      {/* Products Grid */}
      <section className="px-[20px] md:px-[40px] pb-[80px]">
        <div className="max-w-[1200px] mx-auto">
          {!loading && modules.length === 0 ? (
            <div className="bg-[var(--color-bg-surface)] border border-[var(--color-bg-border)] rounded-[var(--radius-xl)] p-12 text-center">
              <Package size={48} className="mx-auto text-[var(--color-text-muted)] mb-4 opacity-50" />
              <h3 className="text-[20px] font-bold text-[var(--color-text-primary)] mb-2">No Products Available</h3>
              <p className="text-[16px] text-[var(--color-text-secondary)]">We are currently updating our product lineup. Please check back later.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {modules.map(({ id, icon, name, tagline, color }) => (
                <div key={id} className="bg-[var(--color-bg-surface)] border border-[var(--color-bg-border)] rounded-[var(--radius-xl)] p-8 flex flex-col h-full hover:border-[rgba(10,132,255,0.3)] hover:shadow-sm transition-all">
                  <div className="w-12 h-12 rounded-[var(--radius-md)] flex items-center justify-center shrink-0 mb-6" style={{ background: `color-mix(in srgb, ${color} 15%, transparent)` }}>
                    {icon ? (
                      <img src={icon} alt={`${name} icon`} className="w-6 h-6 object-contain" />
                    ) : (
                      <Package size={22} style={{ color }} />
                    )}
                  </div>
                  <h3 className="text-[18px] font-bold text-[var(--color-text-primary)] mb-3">{name}</h3>
                  <p className="text-[14px] text-[var(--color-text-secondary)] leading-relaxed flex-1 mb-8">{tagline}</p>
                  <div className="grid grid-cols-2 gap-4 mt-auto">
                    <Button variant="primary" size="md" className="w-full" onClick={() => alert('Coming soon')}>
                      Buy
                    </Button>
                    <Button variant="secondary" size="md" className="w-full" onClick={() => alert('Coming soon')}>
                      Detail
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>


    </div>
  );
}
