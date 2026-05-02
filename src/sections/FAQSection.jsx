import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import SectionBadge from '../components/SectionBadge';
import FAQItem from '../components/FAQItem';

const faqs = [
  {
    question: 'How long does it take to deliver my website?',
    answer:
      'Depending on the plan you choose, we typically deliver within 7 to 21 business days. Starter projects are done in 7 days, Pro in 14 days, and Elite in 21 to 30 days depending on complexity. Every project gets a detailed timeline at kickoff so there are no surprises.',
  },
  {
    question: 'What if I don\'t like the initial design?',
    answer:
      'Every plan includes revision rounds, and we don\'t move to development until you\'ve signed off on the design. Our discovery process is thorough enough that misalignments are rare. But when they happen, we fix them without fuss.',
  },
  {
    question: 'Can I request changes after delivery?',
    answer:
      'Yes. We offer post-launch support retainers for ongoing changes, or you can purchase one-off revision hours at a flat rate. For significant feature additions, we\'ll scope and quote separately.',
  },
  {
    question: 'Do you help with copywriting too?',
    answer:
      'We can. For Pro and Elite plans, we offer basic copy review and strategic guidance on messaging. For full copywriting from scratch, we have a content partner we work with closely. Just ask during onboarding.',
  },
  {
    question: 'Is development included in the pricing?',
    answer:
      'Yes. All our plans include both design and development. We don\'t hand off design files to your dev team. We build it, test it, and deploy it ourselves so there\'s one team accountable for the entire output.',
  },
  {
    question: 'Do you work with clients outside Mumbai?',
    answer:
      'Absolutely. The majority of our clients are remote, spread across India, the UAE, and the UK. We work async-first with structured weekly check-ins and use tools like Notion, Figma, and Loom to stay aligned regardless of timezone.',
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

export default function FAQSection() {
  return (
    <section className="relative bg-krypt-sand/30 py-28 md:py-36 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">

          {/* Sticky header column */}
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-32">
              <FadeUp delay={0}>
                <SectionBadge label="FAQs" />
              </FadeUp>
              <FadeUp delay={0.1}>
                <h2
                  className="font-playfair font-black text-krypt-charcoal leading-[1.1] mb-5"
                  style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}
                >
                  Questions?<br />
                  <span className="italic text-krypt-orange">We&rsquo;ve got answers.</span>
                </h2>
              </FadeUp>
              <FadeUp delay={0.2}>
                <p className="font-dm text-krypt-charcoal/55 text-sm leading-relaxed mb-8">
                  We&rsquo;ve answered the most common ones below. If you still need
                  help, just reach out — we&rsquo;re here for it.
                </p>
                <a
                  href="mailto:kryptmedia24@gmail.com"
                  className="inline-flex items-center gap-2 font-dm text-sm text-krypt-orange font-medium hover:underline"
                >
                  Ask us directly →
                </a>
              </FadeUp>
            </div>
          </div>

          {/* FAQ accordion */}
          <div className="lg:col-span-8">
            <FadeUp delay={0.15}>
              <div className="bg-krypt-cream/60 rounded-3xl px-6 md:px-10 border border-krypt-olive/20">
                {faqs.map((faq, i) => (
                  <FAQItem key={i} {...faq} />
                ))}
              </div>
            </FadeUp>
          </div>
        </div>
      </div>
    </section>
  );
}
