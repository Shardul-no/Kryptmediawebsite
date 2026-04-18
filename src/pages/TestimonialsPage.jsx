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
    document.title = 'Client Testimonials | Krypt Media LLP';
  }, []);

  return (
    <div id="testimonials" className="relative bg-gradient-to-b from-krypt-cream to-krypt-sand text-krypt-charcoal min-h-screen overflow-hidden">
      {/* Ticker above */}
      <div className="container mx-auto px-4 pt-32 pb-8">
        <SectionReveal className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-krypt-charcoal mb-4">
            Client Testimonials
          </h1>
          <p className="text-krypt-charcoal/55 text-lg max-w-xl mx-auto">
            What our clients say about us
          </p>
        </SectionReveal>
      </div>

      {/* Infinite Menu — horizontal continuous motion */}
      <div className="h-[70vh] min-h-[450px] w-full mb-12">
        <InfiniteMenu items={menuItems} scale={1} />
      </div>

      {/* Ticker below — keep the scroll velocity going after the menu */}
      <section className="relative z-10 py-6 border-y border-krypt-olive/10 bg-krypt-sand/80 mb-12">
        <ScrollVelocity
          texts={[TICKER_TEXT]}
          velocity={40}
          parallaxClassName="py-2"
          scrollerClassName="text-krypt-charcoal/55 text-lg md:text-xl font-medium tracking-wide"
        />
      </section>

      {/* Fallback quote for accessibility / when JS is minimal */}
      <div className="container mx-auto px-4 py-12 text-center">
        <blockquote className="text-xl text-krypt-charcoal/55 italic max-w-2xl mx-auto">
          &ldquo;Krypt Media LLP transformed our online presence and elevated our brand identity.&rdquo;
        </blockquote>
      </div>
    </div>
  );
}
