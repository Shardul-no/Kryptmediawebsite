import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import GrainOverlay from '../components/GrainOverlay';

function FadeUp({ children, delay = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
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

export default function CTASection() {
  return (
    <section className="relative overflow-hidden py-28 md:py-40 bg-krypt-charcoal">
      {/* Gradient blobs */}
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="animate-blob absolute rounded-full blur-[130px]"
          style={{
            width: '60vw',
            height: '60vw',
            background: 'rgba(237,146,29,0.4)',
            top: '-20%',
            left: '-10%',
          }}
        />
        <div
          className="animate-blob-2 absolute rounded-full blur-[100px]"
          style={{
            width: '40vw',
            height: '40vw',
            background: 'rgba(242,169,102,0.3)',
            bottom: '-15%',
            right: '-5%',
          }}
        />
      </div>

      <GrainOverlay opacity={0.06} />

      {/* Decorative background word */}
      <div
        aria-hidden="true"
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden"
      >
        <span
          className="font-playfair font-black text-white/[0.02] leading-none whitespace-nowrap"
          style={{ fontSize: 'clamp(8rem, 25vw, 28rem)' }}
        >
          DECODE
        </span>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-12 text-center">
        <FadeUp delay={0}>
          <span className="inline-block font-dm text-[10px] tracking-[0.35em] uppercase text-krypt-orange mb-6">
            Ready When You Are
          </span>
        </FadeUp>

        <FadeUp delay={0.1}>
          <h2
            className="font-playfair font-black text-white leading-[1.08] mb-8"
            style={{ fontSize: 'clamp(2.2rem, 5.5vw, 4.5rem)' }}
          >
            Ready to launch something<br />
            <span className="italic text-krypt-orange">that actually works?</span>
          </h2>
        </FadeUp>

        <FadeUp delay={0.2}>
          <p className="font-dm text-white/50 text-lg mb-12 max-w-2xl mx-auto leading-relaxed">
            Let Krypt design the digital presence your business deserves — clean,
            strategic, and built to grow.
          </p>
        </FadeUp>

        <FadeUp delay={0.3}>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              to="/contact"
              className="px-9 py-4 bg-krypt-orange text-white font-dm font-medium rounded-full hover:bg-krypt-apricot transition-colors duration-300 shadow-2xl shadow-krypt-orange/40 text-base"
            >
              Get Started Now
            </Link>
            <a
              href="https://wa.me/918928030419"
              target="_blank"
              rel="noopener noreferrer"
              className="px-9 py-4 border border-white/20 text-white font-dm font-medium rounded-full hover:border-krypt-orange/60 hover:text-krypt-orange transition-all duration-300 text-base"
            >
              WhatsApp Us →
            </a>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
