import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import GrainOverlay from '../components/GrainOverlay';

function FadeUp({ children, delay = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* ── Visual panel: warm gradient with grain ── */
function GradientPanel({ children }) {
  return (
    <div className="relative rounded-3xl overflow-hidden aspect-[4/3] bg-krypt-charcoal">
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 80% 70% at 30% 40%, rgba(237,146,29,0.75) 0%, transparent 65%), radial-gradient(ellipse 60% 60% at 75% 70%, rgba(242,169,102,0.5) 0%, transparent 55%)',
        }}
      />
      <GrainOverlay opacity={0.06} />
      <div className="relative z-10 w-full h-full flex items-center justify-center p-10">
        {children}
      </div>
    </div>
  );
}

export default function SplitSection() {
  return (
    <section className="bg-krypt-cream py-8 md:py-12 overflow-hidden">

      {/* ── Block 1: text left, visual right ── */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-20 md:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Text */}
          <div>
            <FadeUp delay={0}>
              <span className="font-dm text-[10px] tracking-[0.3em] uppercase text-krypt-orange mb-5 block">
                Our Philosophy
              </span>
            </FadeUp>
            <FadeUp delay={0.1}>
              <h2
                className="font-playfair font-black text-krypt-charcoal leading-[1.1] mb-6"
                style={{ fontSize: 'clamp(2rem, 4vw, 3.25rem)' }}
              >
                Don&rsquo;t settle for<br />
                <span className="italic text-krypt-orange">template-looking</span><br />
                pages.
              </h2>
            </FadeUp>
            <FadeUp delay={0.2}>
              <p className="font-dm text-krypt-charcoal/60 leading-relaxed mb-8 max-w-md">
                We design every page from scratch to match your brand, your offer, and
                your goals. So it doesn&rsquo;t just look good — it works. Generic templates
                convert at 1–2%. Custom strategy converts at 5–8%.
              </p>
            </FadeUp>
            <FadeUp delay={0.3}>
              <div className="flex flex-col gap-3 mb-10">
                {[
                  'Fully custom design, zero off-the-shelf clutter',
                  'Conversion-optimised layouts backed by data',
                  'Unique visual identity that stands out in any feed',
                ].map((point) => (
                  <div key={point} className="flex items-start gap-3">
                    <span className="text-krypt-orange font-bold mt-0.5">+</span>
                    <span className="font-dm text-sm text-krypt-charcoal/65">{point}</span>
                  </div>
                ))}
              </div>
            </FadeUp>
            <FadeUp delay={0.4}>
              <Link
                to="/contact"
                className="inline-block px-7 py-3.5 bg-krypt-charcoal text-krypt-cream font-dm font-medium text-sm rounded-full hover:bg-krypt-orange transition-colors duration-300"
              >
                Start Your Project
              </Link>
            </FadeUp>
          </div>

          {/* Visual */}
          <FadeUp delay={0.2}>
            <GradientPanel>
              <div className="text-center">
                <div className="font-playfair font-black text-white/80 leading-none mb-3" style={{ fontSize: 'clamp(4rem, 10vw, 8rem)' }}>
                  5–8%
                </div>
                <p className="font-dm text-white/50 text-sm tracking-wide">Avg. conversion rate on custom designs</p>
                <div className="mt-8 flex gap-2 justify-center">
                  <div className="h-1.5 w-8 rounded-full bg-krypt-orange" />
                  <div className="h-1.5 w-16 rounded-full bg-krypt-apricot" />
                  <div className="h-1.5 w-12 rounded-full bg-krypt-sand/60" />
                </div>
              </div>
            </GradientPanel>
          </FadeUp>
        </div>
      </div>

      {/* Divider */}
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="border-t border-krypt-olive/20" />
      </div>

      {/* ── Block 2: visual left, text right ── */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-20 md:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Visual (comes first on mobile, second on desktop) */}
          <FadeUp delay={0.15}>
            <div className="order-2 lg:order-1">
              <GradientPanel>
                <div className="space-y-4 w-full max-w-xs">
                  {['Strategy', 'Design', 'Development', 'Automation'].map((item, i) => (
                    <div
                      key={item}
                      className="flex items-center gap-4 bg-white/10 rounded-xl px-5 py-3"
                      style={{ opacity: 1 - i * 0.15 }}
                    >
                      <span className="font-playfair font-bold text-krypt-orange text-lg">{String(i + 1).padStart(2, '0')}</span>
                      <span className="font-dm text-white font-medium">{item}</span>
                    </div>
                  ))}
                </div>
              </GradientPanel>
            </div>
          </FadeUp>

          {/* Text */}
          <div className="order-1 lg:order-2">
            <FadeUp delay={0}>
              <span className="font-dm text-[10px] tracking-[0.3em] uppercase text-krypt-orange mb-5 block">
                Our Mindset
              </span>
            </FadeUp>
            <FadeUp delay={0.1}>
              <h2
                className="font-playfair font-black text-krypt-charcoal leading-[1.1] mb-6"
                style={{ fontSize: 'clamp(2rem, 4vw, 3.25rem)' }}
              >
                We think deeply<br />
                <span className="italic text-krypt-orange">before we design.</span>
              </h2>
            </FadeUp>
            <FadeUp delay={0.2}>
              <p className="font-dm text-krypt-charcoal/60 leading-relaxed mb-8 max-w-md">
                Strategy comes first — always. We use user-flow thinking, positioning
                frameworks, and layout psychology to build interfaces that perform. Every
                pixel earns its place.
              </p>
            </FadeUp>
            <FadeUp delay={0.3}>
              <div className="flex flex-col gap-3 mb-10">
                {[
                  'Research-first approach on every project',
                  'Positioning strategy before any visual decisions',
                  'Psychology-backed UX that guides users to act',
                ].map((point) => (
                  <div key={point} className="flex items-start gap-3">
                    <span className="text-krypt-orange font-bold mt-0.5">+</span>
                    <span className="font-dm text-sm text-krypt-charcoal/65">{point}</span>
                  </div>
                ))}
              </div>
            </FadeUp>
            <FadeUp delay={0.4}>
              <Link
                to="/services"
                className="inline-block px-7 py-3.5 border-2 border-krypt-orange/40 text-krypt-orange font-dm font-medium text-sm rounded-full hover:bg-krypt-orange hover:text-white transition-all duration-300"
              >
                Explore Our Services
              </Link>
            </FadeUp>
          </div>
        </div>
      </div>
    </section>
  );
}
