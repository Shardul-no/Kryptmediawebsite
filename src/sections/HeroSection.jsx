import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import GrainOverlay from '../components/GrainOverlay';
import SectionBadge from '../components/SectionBadge';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 32 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.75, delay, ease: [0.25, 0.1, 0.25, 1] },
});

export default function HeroSection() {
  const trustedLogos = [
    { name: 'DMX', src: '/assets/companyLogo/dmx.png' },
    { name: 'Rajhans', src: '/assets/companyLogo/rajhans.png' },
  ];

  return (
    <section className="relative min-h-screen bg-krypt-charcoal overflow-hidden flex flex-col">

      {/* ── Animated gradient blobs ── */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="animate-blob absolute rounded-full bg-krypt-orange/35 blur-[140px]"
          style={{ width: '55vw', height: '55vw', top: '-15%', left: '-10%' }} />
        <div className="animate-blob-2 absolute rounded-full bg-krypt-apricot/25 blur-[120px]"
          style={{ width: '45vw', height: '45vw', top: '30%', right: '-12%' }} />
        <div className="animate-blob-3 absolute rounded-full bg-krypt-sand/20 blur-[100px]"
          style={{ width: '35vw', height: '35vw', bottom: '-10%', left: '35%' }} />
      </div>

      {/* ── Grain texture ── */}
      <GrainOverlay opacity={0.055} />

      {/* ── Decorative oversized background text ── */}
      <div
        aria-hidden="true"
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden"
      >
        <span
          className="font-playfair font-black text-white/[0.025] leading-none whitespace-nowrap"
          style={{ fontSize: 'clamp(8rem, 22vw, 22rem)' }}
        >
          KRYPT
        </span>
      </div>

      {/* ── Main content ── */}
      <div className="relative z-10 flex-1 flex flex-col justify-center max-w-7xl mx-auto w-full px-6 md:px-12 pt-36 pb-24">

        {/* Badge */}
        <motion.div {...fadeUp(0.1)}>
          <SectionBadge label="Mumbai · Full-Stack Digital Agency · Est. 2024" dark />
        </motion.div>

        {/* Headline */}
        <motion.h1
          {...fadeUp(0.25)}
          className="font-playfair font-black text-white leading-[1.04] mb-8 max-w-4xl"
          style={{ fontSize: 'clamp(2.8rem, 7vw, 5.5rem)' }}
        >
          Build Digital<br />
          Experiences<br />
          <span className="text-krypt-orange italic">That Convert.</span>
        </motion.h1>

        {/* Sub-copy */}
        <motion.p
          {...fadeUp(0.4)}
          className="font-dm text-white/55 text-lg md:text-xl max-w-2xl mb-12 leading-relaxed"
        >
          Krypt Media designs, develops, and deploys high-performing digital products
          — websites, automations, and brand systems that turn visitors into customers
          and businesses into industry leaders.
        </motion.p>

        {/* CTAs */}
        <motion.div {...fadeUp(0.55)} className="flex flex-wrap gap-4 mb-24">
          <Link
            to="/contact"
            className="px-8 py-4 bg-krypt-orange text-white font-dm font-medium rounded-full hover:bg-krypt-apricot transition-colors duration-300 shadow-xl shadow-krypt-orange/35 text-sm md:text-base"
          >
            Get Started Now
          </Link>
          <Link
            to="/services"
            className="px-8 py-4 border border-white/20 text-white font-dm font-medium rounded-full hover:border-krypt-orange/70 hover:text-krypt-orange transition-all duration-300 text-sm md:text-base"
          >
            See Our Services →
          </Link>
        </motion.div>

        {/* Trusted-by strip */}
        <motion.div {...fadeUp(0.7)}>
          <p className="font-dm text-[10px] tracking-[0.35em] uppercase text-white/25 mb-5">
            Trusted by
          </p>
          <div className="flex items-center gap-8 flex-wrap">
            {trustedLogos.map(({ name, src }) => (
              <img
                key={name}
                src={src}
                alt={name}
                className="h-8 w-auto opacity-25 hover:opacity-55 transition-opacity duration-300 grayscale hover:grayscale-0 object-contain"
              />
            ))}
            <span className="font-dm text-white/20 text-xs italic font-cormorant">
              + 30+ growing businesses
            </span>
          </div>
        </motion.div>
      </div>

      {/* Bottom fade into next section */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, transparent, #F3E9C2)' }}
      />
    </section>
  );
}
