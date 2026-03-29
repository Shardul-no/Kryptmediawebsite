import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import SectionBadge from '../components/SectionBadge';
import FeatureCard from '../components/FeatureCard';

const features = [
  {
    label: 'Implementation',
    title: 'End-to-End Execution',
    description:
      'From discovery to deployment, we own the entire build cycle. No handoffs, no gaps — just a single accountable team that ships.',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    label: 'High-Converting',
    title: 'Design That Sells',
    description:
      'Clean strategy before style. We apply user-flow thinking, scroll psychology, and layout science to build pages that convert, not just impress.',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
  {
    label: 'Maximum ROI',
    title: '120%+ Avg. Return',
    description:
      'Every decision is data-informed. We build for results — so your marketing spend compounds instead of evaporating in the noise.',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
  },
  {
    label: 'Clear Steps & Trust',
    title: 'Radical Transparency',
    description:
      'Weekly updates, shared roadmaps, zero surprise invoices. You always know where things stand and why decisions get made.',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
];

function FadeUp({ children, delay = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 36 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {children}
    </motion.div>
  );
}

export default function WhyUsSection() {
  return (
    <section className="relative bg-krypt-cream py-28 md:py-36 overflow-hidden">
      {/* Subtle decorative circle */}
      <div
        aria-hidden="true"
        className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-krypt-orange/5 pointer-events-none"
      />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <FadeUp delay={0}>
          <SectionBadge label="Why Us" />
        </FadeUp>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <FadeUp delay={0.1}>
            <h2
              className="font-playfair font-black text-krypt-charcoal leading-[1.08] max-w-xl"
              style={{ fontSize: 'clamp(2rem, 4.5vw, 3.5rem)' }}
            >
              Why Clients<br />
              <span className="italic text-krypt-orange">Stick With Us</span>
            </h2>
          </FadeUp>

          <FadeUp delay={0.2}>
            <p className="font-dm text-krypt-charcoal/55 max-w-sm text-base leading-relaxed md:text-right">
              We combine clarity, trust, and high-performing design to deliver
              results that actually move the needle.
            </p>
          </FadeUp>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {features.map((feat, i) => (
            <FadeUp key={feat.label} delay={0.1 + i * 0.1}>
              <FeatureCard {...feat} />
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}
