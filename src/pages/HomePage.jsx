import { useEffect } from 'react';
import HeroSection        from '../sections/HeroSection';
import MarqueeTicker      from '../components/MarqueeTicker';
import FeaturedWorkSection from '../sections/FeaturedWorkSection';
import ContainerScrollSection from '../sections/ContainerScrollSection';
import ProcessSection     from '../sections/ProcessSection';
import SplitSection       from '../sections/SplitSection';
import TestimonialsSection from '../sections/TestimonialsSection';
import FAQSection         from '../sections/FAQSection';
import CTASection         from '../sections/CTASection';

export default function HomePage() {
  useEffect(() => {
    document.title = 'Krypt Media — Decode · Deliver · Dominate';
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  return (
    <div className="overflow-x-hidden">
      {/* 1. Hero */}
      <HeroSection />

      {/* 2. Marquee strip */}
      <MarqueeTicker />

      {/* 3. Featured Work */}
      <FeaturedWorkSection />

      {/* 4. Marquee (dark variant) */}
      <MarqueeTicker dark text="WEB DEVELOPMENT · UI/UX DESIGN · AI AGENTS · BRAND STRATEGY · AUTOMATION · TECH CONSULTING ·" />

      {/* 5. Container scroll */}
      <ContainerScrollSection />

      {/* 6. Process */}
      <ProcessSection />

      {/* 7. Split sections */}
      <SplitSection />

      {/* 9. Testimonials */}
      <TestimonialsSection />


      {/* 11. FAQ */}
      <FAQSection />

      {/* 12. CTA banner */}
      <CTASection />
    </div>
  );
}
