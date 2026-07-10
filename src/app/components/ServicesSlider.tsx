import { useCallback, useEffect, useState, useRef } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeft, ChevronRight, Check, Briefcase } from 'lucide-react';
import { Button } from './Button';
import { Link } from 'react-router';
import { extractTextFromRichText } from '../utils';

export function ServicesSlider() {
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL || ''}/api/services?populate=*`)
      .then(res => res.json())
      .then(data => {
        const items = Array.isArray(data?.data) ? data.data : (Array.isArray(data) ? data : []);
        const fetched = items.map((item: any) => {
          let features: string[] = [];
          if (Array.isArray(item.features)) features = item.features;
          else if (item.label) {
            features = Object.values(item.label).filter((v): v is string => typeof v === 'string' && v.length > 0);
          }
          return {
            id: item.id,
            title: item.title || item.name || 'Service',
            features,
          };
        });
        setServices(fetched);
      })
      .catch(err => console.error('Error fetching services for home:', err))
      .finally(() => setLoading(false));
  }, []);

  // Duplicate slides enough times to ensure smooth infinite loop (minimum 7 slides)
  const slides = services.length > 0
    ? Array.from({ length: Math.ceil(7 / services.length) }, () => services).flat()
    : [];

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: 'center',
    skipSnaps: false,
    containScroll: false,
    dragFree: false,
  });

  const [selectedIndex, setSelectedIndex] = useState(0);
  const autoplayRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const isPausedRef = useRef(false);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap() % services.length);
  }, [emblaApi, services.length]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
  }, [emblaApi, onSelect]);

  const startAutoplay = useCallback(() => {
    if (autoplayRef.current) clearInterval(autoplayRef.current);
    autoplayRef.current = setInterval(() => {
      if (!isPausedRef.current && emblaApi) emblaApi.scrollNext();
    }, 2500);
  }, [emblaApi]);

  const stopAutoplay = useCallback(() => {
    isPausedRef.current = true;
  }, []);

  const resumeAutoplay = useCallback(() => {
    isPausedRef.current = false;
  }, []);

  useEffect(() => {
    if (!emblaApi || slides.length === 0) return;
    startAutoplay();
    return () => {
      if (autoplayRef.current) clearInterval(autoplayRef.current);
    };
  }, [emblaApi, slides.length, startAutoplay]);

  const scrollPrev = useCallback(() => { if (emblaApi) emblaApi.scrollPrev(); }, [emblaApi]);
  const scrollNext = useCallback(() => { if (emblaApi) emblaApi.scrollNext(); }, [emblaApi]);
  const scrollTo = useCallback((index: number) => { if (emblaApi) emblaApi.scrollTo(index); }, [emblaApi]);

  if (!loading && services.length === 0) {
    return (
      <section id="services-slider" className="min-h-[100dvh] w-full flex flex-col justify-center bg-[var(--color-bg-base)] snap-start px-[20px] md:px-[40px] py-12 md:py-[clamp(24px,4vh,48px)]">
        <div className="max-w-[1280px] mx-auto w-full text-center">
          <h2 className="font-['Syne'] text-[32px] md:text-[clamp(28px,4vh,40px)] font-bold text-[var(--color-text-primary)] mb-4">Our Services</h2>
          <div className="bg-[var(--color-bg-surface)] border border-[var(--color-bg-border)] rounded-[var(--radius-xl)] p-12 max-w-[600px] mx-auto">
            <Briefcase size={40} className="mx-auto text-[var(--color-text-muted)] mb-3 opacity-50" />
            <h3 className="text-[18px] font-bold text-[var(--color-text-primary)] mb-2">No Services Available</h3>
            <p className="text-[14px] text-[var(--color-text-secondary)]">We are currently updating our services. Please check back later.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="services-slider" className="min-h-[100dvh] w-full flex flex-col justify-center bg-[var(--color-bg-base)] snap-start px-[20px] md:px-[40px] py-12 md:py-[clamp(24px,4vh,48px)] overflow-hidden">
      <div className="max-w-[1280px] mx-auto w-full">
        {/* Section Header */}
        <div className="text-center max-w-[700px] mx-auto mb-8 md:mb-[clamp(16px,4vh,48px)]">
          <h2 className="font-['Syne'] text-[32px] md:text-[clamp(28px,4vh,40px)] font-bold leading-tight text-[var(--color-text-primary)] mb-2 md:mb-[clamp(8px,2vh,16px)]">
            Our Services
          </h2>
          <p className="text-[15px] md:text-[clamp(14px,2vh,17px)] text-[var(--color-text-secondary)] leading-relaxed">
            Tailored solutions to supercharge every layer of your business.
          </p>
        </div>

        {/* Slider Container */}
        <div
          className="relative max-w-[1100px] mx-auto py-8 md:py-[clamp(16px,3vh,48px)]"
          onMouseEnter={stopAutoplay}
          onMouseLeave={resumeAutoplay}
        >
          {/* Prev Button */}
          <button
            onClick={scrollPrev}
            className="absolute left-0 md:-left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 flex items-center justify-center rounded-full bg-[var(--color-bg-elevated)] border border-[var(--color-bg-border)] text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] hover:border-[var(--color-primary)] transition-all shadow-lg"
          >
            <ChevronLeft size={24} />
          </button>

          {/* Embla Viewport */}
          <div className="overflow-hidden px-4 pt-12 md:pt-[clamp(24px,4vh,64px)] pb-12 md:pb-[clamp(24px,4vh,48px)]" ref={emblaRef}>
            <div className="flex touch-pan-y" style={{ backfaceVisibility: 'hidden' }}>
              {slides.map((service, idx) => {
                const isActive = idx % services.length === selectedIndex;

                return (
                  <div
                    key={`${service.id}-${idx}`}
                    className="flex-[0_0_85%] sm:flex-[0_0_60%] md:flex-[0_0_350px] min-w-0 pl-4 pr-4 md:pl-8 md:pr-8 cursor-pointer"
                    onClick={() => scrollTo(idx)}
                  >
                    <div
                      className={`relative bg-[var(--color-bg-surface)] border rounded-[var(--radius-xl)] p-6 md:p-[clamp(16px,3vh,32px)] flex flex-col h-full transition-all duration-500 ease-out ${
                        isActive
                          ? 'border-[var(--color-primary)] shadow-glow-blue scale-100 md:scale-110 opacity-100 z-10'
                          : 'border-[var(--color-bg-border)] hover:border-[var(--color-text-muted)] scale-95 opacity-60 z-0'
                      }`}
                    >
                      <div className={`w-12 h-12 md:w-[clamp(40px,5vh,48px)] md:h-[clamp(40px,5vh,48px)] rounded-lg flex items-center justify-center mb-4 md:mb-[clamp(12px,2vh,24px)] transition-colors duration-500 ${isActive ? 'bg-[var(--color-primary)] text-white' : 'bg-[var(--color-bg-elevated)] text-[var(--color-text-secondary)]'}`}>
                        <Briefcase size={24} className="w-5 h-5 md:w-[clamp(20px,2.5vh,24px)] md:h-[clamp(20px,2.5vh,24px)]" />
                      </div>

                      <h3 className="font-['DM_Sans'] text-[20px] md:text-[clamp(18px,2.5vh,22px)] font-bold text-[var(--color-text-primary)] mb-4 md:mb-[clamp(8px,2vh,20px)]">
                        {service.title}
                      </h3>

                      {service.features.length > 0 && (
                        <ul className="space-y-2 md:space-y-[clamp(8px,1vh,12px)] mb-6 md:mb-[clamp(16px,3vh,32px)] flex-grow">
                          {service.features.slice(0, 4).map((feature: string) => (
                            <li key={feature} className="flex items-start gap-3">
                              <Check size={18} className={`${isActive ? 'text-[var(--color-primary)]' : 'text-[var(--color-text-muted)]'} mt-0.5 flex-shrink-0 transition-colors duration-500`} />
                              <span className="text-[13px] md:text-[clamp(12px,1.8vh,13px)] text-[var(--color-text-secondary)]">
                                {feature}
                              </span>
                            </li>
                          ))}
                        </ul>
                      )}

                      <div className="mt-auto">
                        <Link to="/services">
                          <Button variant={isActive ? 'primary' : 'secondary'} className="w-full transition-colors duration-500">
                            Learn More
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Next Button */}
          <button
            onClick={scrollNext}
            className="absolute right-0 md:-right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 flex items-center justify-center rounded-full bg-[var(--color-bg-elevated)] border border-[var(--color-bg-border)] text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] hover:border-[var(--color-primary)] transition-all shadow-lg"
          >
            <ChevronRight size={24} />
          </button>
        </div>

        {/* Indicators — show only real slides */}
        <div className="flex justify-center items-center gap-2 mt-2">
          {services.map((_, idx) => (
            <button
              key={idx}
              onClick={() => scrollTo(idx)}
              className={`h-2 rounded-full transition-all duration-300 ${
                selectedIndex === idx
                  ? 'w-8 bg-[var(--color-primary)]'
                  : 'w-2 bg-[var(--color-bg-border)] hover:bg-[var(--color-text-muted)]'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

        {/* View All */}
        <div className="mt-8 flex justify-center">
          <Link to="/services">
            <Button variant="secondary" size="lg" className="px-8 font-semibold">
              See all services
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
