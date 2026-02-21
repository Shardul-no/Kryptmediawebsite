import { useEffect } from 'react';
import ScrollVelocity from '../components/ScrollVelocity';
import InfiniteMenu from '../components/InfiniteMenu';
import SectionReveal from '../components/SectionReveal';
import testimonials from '../data/testimonials.json';

const TICKER_TEXT = 'Trusted by startups, creators, and growing brands.';

const menuItems = testimonials.map((t) => ({
  image: `https://picsum.photos/400/400?random=${t.id}`,
  link: '#',
  title: t.title,
  description: t.description,
}));

export default function TestimonialsPage() {
  useEffect(() => {
    document.title = 'Client Testimonials | Krypt Media';
  }, []);

  return (
    <div id="testimonials" className="relative bg-black text-white min-h-screen overflow-hidden">
      {/* Ticker above */}
      <section className="relative z-10 py-4 border-b border-white/10">
        <ScrollVelocity
          texts={[TICKER_TEXT]}
          velocity={25}
          parallaxClassName="py-1"
          scrollerClassName="text-gray-400 text-sm md:text-base font-medium"
        />
      </section>

      <div className="container mx-auto px-4 pt-12 pb-16">
        <SectionReveal className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Client Testimonials
          </h1>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">
            What our clients say about us
          </p>
        </SectionReveal>
      </div>

      {/* Infinite Menu — horizontal continuous motion */}
      <div className="h-[70vh] min-h-[450px] w-full">
        <InfiniteMenu items={menuItems} scale={1} />
      </div>

      {/* Fallback quote for accessibility / when JS is minimal */}
      <div className="container mx-auto px-4 py-12 text-center">
        <blockquote className="text-xl text-gray-300 italic max-w-2xl mx-auto">
          &ldquo;Krypt Media transformed our online presence and elevated our brand identity.&rdquo;
        </blockquote>
      </div>
    </div>
  );
}
