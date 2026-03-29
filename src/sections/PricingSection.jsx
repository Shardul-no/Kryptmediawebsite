import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import SectionBadge from '../components/SectionBadge';
import PricingCard from '../components/PricingCard';

const plans = [
  {
    tier: 'Starter',
    price: '₹25,000',
    subtitle: 'For early-stage founders',
    features: [
      'Single-page landing site',
      'Mobile-first responsive design',
      'Basic on-page SEO setup',
      'Contact form integration',
      '1 round of revisions',
      '7-day delivery',
    ],
    highlighted: false,
    ctaText: 'Choose Starter',
  },
  {
    tier: 'Pro',
    price: '₹55,000',
    subtitle: 'Most popular for growing brands',
    features: [
      'Up to 6-page custom website',
      'Brand identity integration',
      'CMS / blog setup',
      'Advanced SEO & analytics',
      'WhatsApp / CRM integration',
      '3 rounds of revisions',
      '14-day delivery',
    ],
    highlighted: true,
    ctaText: 'Choose Pro',
  },
  {
    tier: 'Elite',
    price: '₹1,20,000',
    subtitle: 'For scaling enterprises',
    features: [
      'Full custom web application',
      'AI automation workflows',
      'LMS or CRM integration',
      'Priority support & SLA',
      'Performance optimisation',
      'Unlimited revisions',
      'Dedicated project manager',
    ],
    highlighted: false,
    ctaText: 'Choose Elite',
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

export default function PricingSection() {
  return (
    <section className="relative bg-krypt-cream py-28 md:py-36 overflow-hidden">
      {/* Decorative circle */}
      <div
        aria-hidden="true"
        className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full bg-krypt-orange/5 pointer-events-none"
      />

      <div className="relative max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="text-center mb-16">
          <FadeUp delay={0}>
            <div className="flex justify-center">
              <SectionBadge label="Pricing" />
            </div>
          </FadeUp>
          <FadeUp delay={0.1}>
            <h2
              className="font-playfair font-black text-krypt-charcoal leading-[1.08]"
              style={{ fontSize: 'clamp(2rem, 4.5vw, 3.5rem)' }}
            >
              Straightforward pricing<br />
              <span className="italic text-krypt-orange">that fits your stage.</span>
            </h2>
          </FadeUp>
          <FadeUp delay={0.2}>
            <p className="font-dm text-krypt-charcoal/50 mt-4 max-w-md mx-auto">
              Whether you&rsquo;re launching your first idea or scaling your tenth —
              Krypt has a plan built around your pace.
            </p>
          </FadeUp>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start md:items-stretch">
          {plans.map((plan, i) => (
            <FadeUp key={plan.tier} delay={0.1 + i * 0.12}>
              <PricingCard {...plan} />
            </FadeUp>
          ))}
        </div>

        {/* Footnote */}
        <FadeUp delay={0.5}>
          <p className="text-center font-dm text-xs text-krypt-charcoal/35 mt-10">
            All prices are one-time project fees. Maintenance retainers available separately.
            Need something custom?{' '}
            <a href="mailto:kryptmedia24@gmail.com" className="text-krypt-orange hover:underline">
              Talk to us.
            </a>
          </p>
        </FadeUp>
      </div>
    </section>
  );
}
