import { useSEO } from '../hooks/useSEO';
import { HeroSection } from '../components/HeroSection';
import { SocialProofBar } from '../components/SocialProofBar';
import { ValueProposition } from '../components/ValueProposition';
import { FeaturesGrid } from '../components/FeaturesGrid';
import { HowItWorks } from '../components/HowItWorks';
import { CTABanner } from '../components/CTABanner';
import { ServicesSlider } from '../components/ServicesSlider';

export function HomePage() {
  useSEO({
    title: 'Techleeq – Business Management Software for SMEs & Enterprises',
    description:
      'Techleeq builds custom digital solutions and ready-to-scale software products designed to streamline your operations, elevate your brand, and supercharge your growth.',
    path: '/',
  });

  return (
    <>
      <HeroSection />
      <SocialProofBar />
      <ValueProposition />
      <FeaturesGrid />
      <ServicesSlider />
      <HowItWorks />
      <CTABanner />
    </>
  );
}

