import { useState, useEffect } from 'react';
import { Package } from 'lucide-react';
import { Button } from './Button';
import { Link } from 'react-router';
import { extractTextFromRichText } from '../utils';

export function FeaturesGrid() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL || ''}/api/products?populate=*`)
      .then(res => res.json())
      .then(data => {
        const items = Array.isArray(data?.data) ? data.data : (Array.isArray(data) ? data : []);
        const fetched = items.map((item: any) => ({
          id: item.id,
          name: item.name || item.title || 'Product',
          tagline: item.tagline || extractTextFromRichText(item.description) || item.desc || '',
          color: item.color || 'var(--color-primary)',
          icon: item.icon ? `${import.meta.env.VITE_API_URL || ''}${item.icon.url}` : null,
        }));
        setProducts(fetched);
      })
      .catch(err => console.error('Error fetching products for home:', err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section id="features" className="min-h-[100dvh] w-full flex flex-col justify-center bg-[var(--color-bg-surface)] snap-start px-[20px] md:px-[40px] py-12 md:py-[clamp(24px,4vh,48px)]">
      <div className="max-w-[1280px] mx-auto w-full">
        {/* Section Header */}
        <div className="text-center max-w-[700px] mx-auto mb-8 md:mb-[clamp(16px,4vh,48px)]">
          <p className="text-[13px] uppercase tracking-[0.12em] text-[var(--color-primary)] font-semibold mb-2 md:mb-[clamp(8px,2vh,16px)]">
            OUR PRODUCTS
          </p>
          <h2 className="font-['Syne'] text-[32px] md:text-[clamp(28px,4vh,40px)] font-bold leading-tight text-[var(--color-text-primary)] mb-2 md:mb-[clamp(8px,2vh,16px)]">
            Our Products
          </h2>
          <p className="text-[15px] md:text-[clamp(14px,2vh,17px)] text-[var(--color-text-secondary)] leading-relaxed">
            Built for how your business actually works, packaged into one powerful platform.
          </p>
        </div>

        {/* Products Grid */}
        {!loading && products.length === 0 ? (
          <div className="bg-[var(--color-bg-base)] border border-[var(--color-bg-border)] rounded-[var(--radius-xl)] p-12 text-center max-w-[600px] mx-auto">
            <Package size={40} className="mx-auto text-[var(--color-text-muted)] mb-3 opacity-50" />
            <h3 className="text-[18px] font-bold text-[var(--color-text-primary)] mb-2">No Products Available</h3>
            <p className="text-[14px] text-[var(--color-text-secondary)]">We are currently updating our product lineup. Please check back later.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-[clamp(12px,2vh,24px)]">
            {products.map((product) => (
              <div
                key={product.id}
                className="group bg-[var(--color-bg-base)] border border-[var(--color-bg-border)] rounded-[var(--radius-xl)] p-5 md:p-[clamp(16px,2.5vh,28px)] shadow-card hover:border-[rgba(10,132,255,0.4)] hover:-translate-y-1 hover:shadow-glow-blue transition-all duration-[var(--duration-base)] flex flex-col h-full"
              >
                {/* Icon Container */}
                <div className="w-[40px] h-[40px] md:w-[clamp(32px,5vh,48px)] md:h-[clamp(32px,5vh,48px)] rounded-[var(--radius-lg)] bg-[var(--color-bg-elevated)] flex items-center justify-center mb-3 md:mb-[clamp(8px,1.5vh,16px)] group-hover:bg-[var(--color-primary-glow)] transition-colors">
                  {product.icon ? (
                    <img src={product.icon} alt={`${product.name} icon`} className="w-6 h-6 object-contain" />
                  ) : (
                    <Package size={20} className="text-[var(--color-primary)]" />
                  )}
                </div>

                {/* Title */}
                <h3 className="font-['DM_Sans'] text-[16px] md:text-[clamp(15px,2vh,18px)] font-semibold text-[var(--color-text-primary)] mb-2 md:mb-[clamp(4px,1vh,12px)]">
                  {product.name}
                </h3>

                {/* Description */}
                <p className="text-[13px] md:text-[clamp(12px,1.8vh,14px)] text-[var(--color-text-muted)] leading-[1.5] mb-3 md:mb-[clamp(8px,1.5vh,16px)] flex-1">
                  {product.tagline}
                </p>

                {/* Action Buttons */}
                <div className="flex items-center gap-2 md:gap-[clamp(8px,1vh,12px)] mt-auto pt-3 md:pt-[clamp(8px,1.5vh,16px)]">
                  <Link to="/contact" className="w-full">
                    <Button variant="primary" size="sm" className="w-full">
                      Contact Sales
                    </Button>
                  </Link>
                  <Link to={`/products/${product.id}`} className="w-full">
                    <Button variant="secondary" size="sm" className="w-full">
                      Detail
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* View All Button */}
        <div className="mt-8 md:mt-[clamp(16px,4vh,48px)] flex justify-center">
          <Link to="/products">
            <Button variant="secondary" size="lg" className="px-8 font-semibold">
              See all products
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
