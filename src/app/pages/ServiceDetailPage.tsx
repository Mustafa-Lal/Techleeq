import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';
import { Button } from '../components/Button';
import { Link } from 'react-router';
import { NotFoundPage } from './NotFoundPage';
import { RichTextRenderer } from '../components/RichTextRenderer';
import { extractTextFromRichText } from '../utils';
import { useSEO } from '../hooks/useSEO';

export function ServiceDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [service, setService] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL || ''}/api/services?populate=*`)
      .then(res => res.json())
      .then(data => {
        const items = Array.isArray(data?.data) ? data.data : (Array.isArray(data) ? data : []);
        const fetched = items.map((item: any) => {
          const mediaUrl = item.cover_image?.url || item.image?.url || item.imageUrl || null;
          const imageUrl = mediaUrl
            ? (mediaUrl.startsWith('http') ? mediaUrl : `${import.meta.env.VITE_API_URL || ''}${mediaUrl}`)
            : '';

          let features: string[] = [];
          if (Array.isArray(item.features)) features = item.features;
          else if (item.label) {
            features = Object.values(item.label).filter((v): v is string => typeof v === 'string' && v.length > 0);
          }

          // Keep raw rich text for the renderer; also extract plain text for SEO
          const rawDescription = item.description || null;
          const plainDesc = extractTextFromRichText(rawDescription) || item.desc || '';

          return {
            id: String(item.id),
            imageUrl,
            title: item.title || item.name || 'Service',
            color: item.color || 'var(--color-primary)',
            rawDescription,
            plainDesc,
            features,
          };
        });
        const found = fetched.find((s: any) => s.id === String(id));
        setService(found ?? null);
      })
      .catch(err => console.error('Error fetching service:', err))
      .finally(() => setLoading(false));
  }, [id]);

  useSEO({
    title: service ? `${service.title} | Professional Services` : 'Service Details | Techleeq',
    description: service?.plainDesc ? service.plainDesc.substring(0, 150) : 'Learn more about our professional services.',
    path: `/services/${id}`,
  });

  if (loading) return <div className="min-h-screen py-[80px] px-[20px] md:px-[40px] text-center">Loading...</div>;

  if (!service) return <NotFoundPage />;

  return (
    <div className="min-h-screen py-[80px] px-[20px] md:px-[40px]">
      <div className="max-w-[1100px] mx-auto">

        {/* Back button — uses history.back() to preserve scroll position */}
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-[14px] font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] mb-8 transition-colors"
        >
          <ArrowLeft size={16} />
          Back to Services
        </button>

        <div className="bg-[var(--color-bg-surface)] border border-[var(--color-bg-border)] rounded-[var(--radius-2xl)] p-8 md:p-12 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl opacity-5 pointer-events-none" style={{ background: service.color }} />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start relative z-10">

            {/* LEFT: Title + Rich text description + CTA */}
            <div className="flex flex-col">
              <h1
                className="text-[32px] md:text-[40px] font-bold text-[var(--color-text-primary)] mb-6"
                style={{ letterSpacing: 'var(--tracking-tight)' }}
              >
                {service.title}
              </h1>

              {/* Styled rich-text description from Strapi */}
              <div className="rich-text text-[16px] text-[var(--color-text-secondary)] leading-relaxed mb-10">
                <RichTextRenderer content={service.rawDescription} />
              </div>

              <div className="mt-auto flex flex-col sm:flex-row items-center gap-4 pt-6 border-t border-[var(--color-bg-border)]">
                <Link to="/contact" className="w-full sm:w-auto">
                  <Button variant="primary" size="lg" className="w-full">
                    Contact Us
                  </Button>
                </Link>
              </div>
            </div>

            {/* RIGHT: Image + Key Features below it */}
            <div className="flex flex-col gap-8">
              {/* Image */}
              {service.imageUrl && (
                <div
                  className="w-full rounded-[var(--radius-xl)] overflow-hidden border border-[var(--color-bg-border)] shadow-lg flex-shrink-0"
                  style={{ height: '320px' }}
                >
                  <img
                    src={service.imageUrl}
                    alt={service.title}
                    className="w-full h-full object-cover object-top"
                  />
                </div>
              )}

              {/* Key Features */}
              {service.features && service.features.length > 0 && (
                <div>
                  <h3
                    className="text-[18px] font-bold text-[var(--color-text-primary)] mb-4"
                    style={{ letterSpacing: 'var(--tracking-tight)' }}
                  >
                    Key Features
                  </h3>
                  <div className="flex flex-col gap-3">
                    {service.features.map((feature: string, i: number) => (
                      <div
                        key={i}
                        className="flex items-start gap-3 p-3.5 rounded-[var(--radius-lg)] bg-[var(--color-bg-elevated)] border border-[var(--color-bg-border)]"
                      >
                        <CheckCircle2 size={16} className="shrink-0 mt-0.5" style={{ color: service.color }} />
                        <span className="text-[13px] text-[var(--color-text-secondary)] leading-snug">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
