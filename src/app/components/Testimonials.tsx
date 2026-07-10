import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';

const testimonials = [
  {
    quote: "TechLeeq transformed how we manage our operations. What used to take hours now takes minutes. The ROI was clear within the first month.",
    name: 'Sarah Mitchell',
    title: 'Operations Director',
    company: 'InnoTech Solutions',
    avatar: 'SM',
    rating: 5,
  },
  {
    quote: "The level of automation and integration is incredible. We've reduced manual data entry by 80% and our team can focus on what actually matters.",
    name: 'James Chen',
    title: 'CEO',
    company: 'DataFlow Systems',
    avatar: 'JC',
    rating: 5,
  },
  {
    quote: "Best business software investment we've made. The customer support is outstanding, and the platform keeps getting better with regular updates.",
    name: 'Maria Rodriguez',
    title: 'Finance Manager',
    company: 'Global Retail Corp',
    avatar: 'MR',
    rating: 5,
  },
  {
    quote: "Switching to TechLeeq was seamless. The onboarding team helped us migrate all our data, and our staff adapted to it within days, not weeks.",
    name: 'David Thompson',
    title: 'CTO',
    company: 'CloudSync Technologies',
    avatar: 'DT',
    rating: 5,
  },
];

export function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-[100px] px-[20px] md:px-[40px] gradient-card relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute inset-0 gradient-glow opacity-20"></div>

      <div className="max-w-[1280px] mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-[700px] mx-auto mb-16">
          <h2 className="font-['Syne'] text-[36px] md:text-[40px] font-bold leading-tight text-[var(--color-text-primary)] mb-4">
            Businesses that transformed with TechLeeq
          </h2>
        </div>

        {/* Testimonial Carousel */}
        <div className="relative max-w-[900px] mx-auto">
          {/* Navigation Arrows */}
          <button
            onClick={goToPrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-16 w-12 h-12 rounded-full bg-[var(--color-bg-elevated)] border border-[var(--color-bg-border)] text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] hover:border-[var(--color-primary)] transition-all hidden md:flex items-center justify-center"
            aria-label="Previous testimonial"
          >
            <ChevronLeft size={24} />
          </button>

          <button
            onClick={goToNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-16 w-12 h-12 rounded-full bg-[var(--color-bg-elevated)] border border-[var(--color-bg-border)] text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] hover:border-[var(--color-primary)] transition-all hidden md:flex items-center justify-center"
            aria-label="Next testimonial"
          >
            <ChevronRight size={24} />
          </button>

          {/* Testimonial Card */}
          <div className="bg-[var(--color-bg-base)] border border-[var(--color-bg-border)] rounded-[var(--radius-xl)] p-8 md:p-12 shadow-card">
            {/* Stars */}
            <div className="flex gap-1 mb-6">
              {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                <Star
                  key={i}
                  size={20}
                  fill="var(--color-accent-amber)"
                  className="text-[var(--color-accent-amber)]"
                />
              ))}
            </div>

            {/* Quote */}
            <blockquote className="text-[18px] md:text-[20px] text-[var(--color-text-primary)] leading-relaxed mb-8 italic">
              "{testimonials[currentIndex].quote}"
            </blockquote>

            {/* Author Info */}
            <div className="flex items-center gap-4">
              {/* Avatar */}
              <div className="w-14 h-14 rounded-full gradient-cta flex items-center justify-center text-white font-bold text-lg">
                {testimonials[currentIndex].avatar}
              </div>

              <div>
                <div className="text-[16px] font-semibold text-[var(--color-text-primary)]">
                  {testimonials[currentIndex].name}
                </div>
                <div className="text-[14px] text-[var(--color-text-muted)]">
                  {testimonials[currentIndex].title} · {testimonials[currentIndex].company}
                </div>
              </div>
            </div>
          </div>

          {/* Dot Indicators */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentIndex
                    ? 'bg-[var(--color-primary)] w-8'
                    : 'bg-[var(--color-bg-border)] hover:bg-[var(--color-text-muted)]'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
