import { HeroSection } from '../components/HeroSection';
import { SocialProofBar } from '../components/SocialProofBar';
import { ValueProposition } from '../components/ValueProposition';
import { FeaturesGrid } from '../components/FeaturesGrid';
import { HowItWorks } from '../components/HowItWorks';
import { CTABanner } from '../components/CTABanner';
import { ServicesSlider } from '../components/ServicesSlider';

export function HomePage() {
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
