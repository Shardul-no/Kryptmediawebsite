import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

// Partner data - easy to update with additional logos later
const partners = [
  {
    name: 'My AI Guru',
    logo: '/assets/companyLogo/my ai guru.png',
  },
  {
    name: 'RTT',
    logo: '/assets/companyLogo/rtt.jpg',
  },
  {
    name: 'Safezy',
    logo: '/assets/companyLogo/safezy logo.png',
  },
];

function FadeUp({ children, delay = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });
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

function PartnerLogo({ partner, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      className="group flex items-center justify-center"
    >
      <div className="relative w-24 h-16 md:w-32 md:h-20 overflow-hidden rounded-lg bg-krypt-cream/50 p-2 transition-all duration-500 group-hover:bg-white group-hover:shadow-lg">
        <img
          src={partner.logo}
          alt={partner.name}
          className="w-full h-full object-contain filter grayscale opacity-50 transition-all duration-500 group-hover:grayscale-0 group-hover:opacity-100"
          loading="lazy"
        />
      </div>
    </motion.div>
  );
}

export default function PartnersSection() {
  return (
    <section className="relative py-16 md:py-20 bg-krypt-cream overflow-hidden">
      {/* Subtle background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-px bg-gradient-to-r from-transparent via-krypt-charcoal/5 to-transparent" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="text-center mb-10 md:mb-12">
          <FadeUp delay={0}>
            <span className="inline-block font-dm text-[10px] tracking-[0.35em] uppercase text-krypt-orange mb-4">
              Trusted By
            </span>
          </FadeUp>
          <FadeUp delay={0.1}>
            <h2 className="font-playfair font-bold text-krypt-charcoal text-xl md:text-2xl">
              Our Partners
            </h2>
          </FadeUp>
        </div>

        {/* Partner logos grid */}
        <FadeUp delay={0.2}>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12 lg:gap-16">
            {partners.map((partner, index) => (
              <PartnerLogo key={partner.name} partner={partner} index={index} />
            ))}
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
