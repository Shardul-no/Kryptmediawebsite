import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import SectionBadge from '../components/SectionBadge';
import ProcessStep from '../components/ProcessStep';

const steps = [
  {
    number: '01',
    title: 'Share Your Vision',
    description:
      'We start with a deep-dive discovery session — your goals, your audience, your competitive landscape. You tell us the "what" and the "why", and we architect the "how".',
  },
  {
    number: '02',
    title: 'We Design & Build It',
    description:
      'You get a strategic wireframe, then a pixel-perfect prototype, then production-ready code. Every iteration is collaborative, fast, and informed by conversion data.',
  },
  {
    number: '03',
    title: 'Ready to Launch',
    description:
      'We deploy, test, and optimise for performance. After launch, you get a full handover with documentation so you\'re never dependent on us for the basics.',
  },
];

function FadeUp({ children, delay = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {children}
    </motion.div>
  );
}

export default function ProcessSection() {
  return (
    <section className="relative bg-krypt-sand/40 py-28 md:py-36 overflow-hidden">
      {/* Decorative large italic text */}
      <div
        aria-hidden="true"
        className="absolute top-12 left-0 pointer-events-none select-none overflow-hidden"
      >
        <span
          className="font-playfair italic font-black text-krypt-olive/10 leading-none"
          style={{ fontSize: 'clamp(6rem, 18vw, 18rem)' }}
        >
          Process
        </span>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="max-w-2xl mb-20">
          <FadeUp delay={0}>
            <SectionBadge label="Process" />
          </FadeUp>
          <FadeUp delay={0.1}>
            <h2
              className="font-playfair font-black text-krypt-charcoal leading-[1.08]"
              style={{ fontSize: 'clamp(2rem, 4.5vw, 3.5rem)' }}
            >
              The Process —<br />
              <span className="italic text-krypt-orange">Fast. Clear. Done.</span>
            </h2>
          </FadeUp>
          <FadeUp delay={0.2}>
            <p className="font-dm text-krypt-charcoal/55 mt-5 max-w-md leading-relaxed">
              No endless revisions. No flaky handoffs. Just a process that works and
              delivers fast.
            </p>
          </FadeUp>
        </div>

        {/* Steps */}
        <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-stretch">
          {steps.map((step, i) => (
            <FadeUp key={step.number} delay={0.1 + i * 0.12}>
              <ProcessStep {...step} last={i === steps.length - 1} />
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}
