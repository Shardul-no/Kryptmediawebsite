import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import SectionBadge from '../components/SectionBadge';
import TestimonialCard from '../components/TestimonialCard';
import GrainOverlay from '../components/GrainOverlay';

const testimonials = [
  {
    name: 'Rahul Mehta',
    role: 'Founder',
    company: 'TechNova Solutions',
    initial: 'R',
    quote:
      'Krypt completely changed the way I look at landing pages. Our conversions went from 1.2% to 6.8% in 6 weeks after launch. The team thinks about strategy first — not just design.',
  },
  {
    name: 'Priya Sharma',
    role: 'CEO',
    company: 'Luminary Brands',
    initial: 'P',
    quote:
      'I was skeptical about outsourcing design — I\'d been burned before. But Krypt delivered something so polished and so on-brand that I genuinely couldn\'t believe the turnaround speed.',
  },
  {
    name: 'Jason Fernandes',
    role: 'Head of Growth',
    company: 'ScaleUp.io',
    initial: 'J',
    quote:
      'The AI automation workflows they built saved us 40+ hours a month and removed three manual handoffs that were slowing down our sales pipeline. Worth every rupee.',
  },
];

function FadeUp({ children, delay = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });
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

export default function TestimonialsSection() {
  return (
    <section className="relative py-28 md:py-36 overflow-hidden">
      {/* Warm-tinted background */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 70% 60% at 15% 30%, rgba(237,146,29,0.12) 0%, transparent 60%), radial-gradient(ellipse 50% 50% at 85% 70%, rgba(242,169,102,0.08) 0%, transparent 55%), #F3E9C2',
        }}
      />
      <GrainOverlay opacity={0.035} />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="text-center mb-16">
          <FadeUp delay={0}>
            <div className="flex justify-center">
              <SectionBadge label="Testimonials" />
            </div>
          </FadeUp>
          <FadeUp delay={0.1}>
            <h2
              className="font-playfair font-black text-krypt-charcoal leading-[1.08]"
              style={{ fontSize: 'clamp(2rem, 4.5vw, 3.5rem)' }}
            >
              What Founders<br />
              <span className="italic text-krypt-orange">Are Saying</span>
            </h2>
          </FadeUp>
          <FadeUp delay={0.2}>
            <p className="font-dm text-krypt-charcoal/50 mt-4 max-w-md mx-auto text-base">
              Startups trust Krypt because we don&rsquo;t just design pages — we help
              founders turn clarity into conversions and wins with impact.
            </p>
          </FadeUp>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <FadeUp key={t.name} delay={0.1 + i * 0.12}>
              <TestimonialCard {...t} />
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}
