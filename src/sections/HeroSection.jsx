import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import GrainOverlay from '../components/GrainOverlay';
import SectionBadge from '../components/SectionBadge';
import Aurora from '../components/Aurora';
import SplitText from '../components/SplitText';
import CycleText from '../components/CycleText';
import BlurText from '../components/BlurText';

export default function HeroSection() {
  return (
    <section className="relative min-h-screen bg-krypt-charcoal overflow-hidden flex flex-col">

      {/* ── Aurora background ── */}
      <Aurora
        colorStops={['#ED921D', '#ED5C47', '#F2A966', '#EBCB9F']}
        blend={0.45}
        amplitude={0.9}
        speed={0.3}
        className="absolute inset-0 w-full h-full"
      />

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
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <SectionBadge label="Mumbai · Full-Stack Digital Agency · Est. 2024" dark />
        </motion.div>

        {/* Headline */}
        <h1
          className="font-playfair font-black text-white leading-[1.1] mb-8 max-w-4xl mt-6"
          style={{ fontSize: 'clamp(2.8rem, 7vw, 5.5rem)' }}
        >
          <span className="block">
            <SplitText text="Build Digital" initialDelay={0.25} staggerDelay={0.07} />
          </span>
          <span className="block">
            <CycleText
              words={["Websites", "Mobile Apps", "Brand Systems", "Automations"]}
              className="text-krypt-orange italic"
              interval={2600}
            />
          </span>
          <span className="block">
            <SplitText text="That Convert." initialDelay={0.44} staggerDelay={0.07} className="text-krypt-orange italic" />
          </span>
        </h1>

        {/* Sub-copy */}
        <div className="font-dm text-white/55 text-lg md:text-xl max-w-2xl mb-12 leading-relaxed">
          <BlurText
            text="Krypt Media designs, develops, and deploys high-performing digital products. From websites to automations and brand systems, we turn visitors into customers and help businesses become industry leaders."
            animateBy="words"
            direction="bottom"
            delay={60}
            stepDuration={0.3}
          />
        </div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.55, ease: [0.25, 0.1, 0.25, 1] }}
          className="flex flex-wrap gap-4 mb-24"
        >
          <Link
            to="/contact"
            className="px-8 py-4 btn-cta text-white font-dm font-medium rounded-full text-sm md:text-base"
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
