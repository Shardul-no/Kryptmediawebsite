import { useEffect } from 'react';
import { motion } from 'framer-motion';
import BlurText from '../components/BlurText';
import ScrollReveal from '../components/ScrollReveal';
import GradualBlur from '../components/GradualBlur';
import SectionReveal from '../components/SectionReveal';
import Lanyard from '../components/Lanyard';
import { useMediaQuery } from '../hooks/useMediaQuery';

const teamMembers = [
  { key: 'priyanshu', name: 'Priyanshu Naik',     role: 'CFO', img: '/assets/team/mobile/priyanshu.jpg' },
  { key: 'tanishk',   name: 'Taniksh Waingankar', role: 'CEO', img: '/assets/team/mobile/tanishk.jpg'   },
  { key: 'kartik',    name: 'Kartik Mistry',       role: 'CTO', img: '/assets/team/mobile/kartik.jpg'    },
];

/** Luxury portrait card — used in the mobile horizontal carousel */
function TeamCard({ member, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
      className="relative flex-shrink-0 rounded-2xl overflow-hidden bg-krypt-charcoal shadow-2xl"
      style={{ width: '72vw', aspectRatio: '3 / 4' }}
    >
      {/* Full-bleed portrait photo */}
      <img
        src={member.img}
        alt={member.name}
        className="absolute inset-0 w-full h-full object-cover object-top"
        loading="lazy"
      />

      {/* Dark gradient — heavier at bottom for text legibility */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

      {/* Thin orange accent at top */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-krypt-orange/80 to-transparent" />

      {/* Info block pinned bottom-left */}
      <div className="absolute bottom-0 left-0 right-0 px-5 pb-6">
        <span className="inline-block px-2.5 py-0.5 rounded-full border border-krypt-orange/50 text-krypt-orange font-dm text-[10px] tracking-[0.22em] uppercase mb-2.5">
          {member.role}
        </span>
        <h3 className="font-playfair font-bold text-white text-xl leading-tight">
          {member.name}
        </h3>
        <div className="mt-2.5 w-8 h-px bg-krypt-orange/60" />
      </div>
    </motion.div>
  );
}

export default function AboutPage() {
  const isMobile = useMediaQuery('(max-width: 767px)');

  useEffect(() => {
    document.title = 'About Us | Krypt Media LLP';
  }, []);

  return (
    <section id="about" className="relative bg-krypt-cream text-krypt-charcoal overflow-hidden">

      {/* ─── HERO ─────────────────────────────────────────── */}
      <div className={`
        relative flex flex-col items-center justify-center overflow-hidden
        ${isMobile ? 'min-h-[55vh] pt-24 pb-10' : 'min-h-[70vh] sm:min-h-[80vh] md:min-h-[85vh] pt-24 pb-16'}
      `}>
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-krypt-cream/30 via-krypt-cream to-krypt-cream" />
        <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(237,146,29,0.08),transparent)]" />

        <div className="relative z-10 text-center px-5 max-w-3xl mx-auto">
          <h1 className={`font-playfair font-black text-krypt-charcoal leading-[1.1] mb-5 ${isMobile ? 'text-[2.4rem]' : 'display-large mb-8'}`}>
            {isMobile ? (
              /* Clean static heading on mobile — no BlurText jank */
              <>
                <motion.span
                  className="block"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                >
                  Defining the
                </motion.span>
                <motion.span
                  className="block italic text-krypt-orange"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.22 }}
                >
                  Future of Digital
                </motion.span>
              </>
            ) : (
              <>
                <BlurText
                  text="Defining the Future of "
                  className="inline text-krypt-charcoal"
                  delay={70}
                  stepDuration={0.4}
                  animateBy="words"
                />
                <span className="italic-serif text-krypt-orange block sm:inline">Digital Identity</span>
              </>
            )}
          </h1>

          <GradualBlur delay={isMobile ? 0.3 : 0.2} amount={0.1}>
            <p className={`text-krypt-charcoal/55 font-light leading-relaxed max-w-2xl mx-auto italic-serif ${isMobile ? 'text-base' : 'text-xl opacity-90'}`}>
              Krypt Media LLP is a creative digital agency focused on building{' '}
              <span className="text-krypt-charcoal font-medium not-italic">impactful brand ecosystems</span>.
              {!isMobile && ' We blend avant-garde strategy, design, and technology.'}
            </p>
          </GradualBlur>
        </div>
      </div>

      {/* ─── FOUNDERS ─────────────────────────────────────── */}
      <div className={`border-t border-krypt-olive/10 ${isMobile ? 'pt-10 pb-12' : 'container mx-auto px-4 pt-12 pb-48'}`}>

        {/* Section label */}
        {isMobile ? (
          <div className="px-5 mb-6">
            <motion.p
              className="font-dm text-krypt-orange text-[11px] tracking-[0.24em] uppercase mb-1"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              The Team
            </motion.p>
            <motion.h2
              className="font-playfair font-bold text-krypt-charcoal text-3xl"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Our Founders
            </motion.h2>
          </div>
        ) : (
          <>
            <ScrollReveal containerClassName="!my-0 mb-0" textClassName="text-krypt-charcoal">
              Our Founders
            </ScrollReveal>
            <GradualBlur delay={0.1}>
              <p className="text-krypt-charcoal/55 text-lg max-w-2xl mb-0">
                Interactive lanyard cards representing our leadership team.
              </p>
            </GradualBlur>
          </>
        )}

        {/* Mobile: horizontal swipe carousel */}
        {isMobile && (
          <div
            className="flex gap-4 no-scrollbar"
            style={{
              overflowX: 'auto',
              WebkitOverflowScrolling: 'touch',
              scrollSnapType: 'x mandatory',
              paddingLeft: '20px',
              paddingRight: '20px',
              paddingBottom: '8px',
            }}
          >
            {teamMembers.map((member, i) => (
              <div key={member.key} style={{ scrollSnapAlign: 'center' }}>
                <TeamCard member={member} index={i} />
              </div>
            ))}
          </div>
        )}

        {/* Desktop: full Three.js Lanyard experience */}
        {!isMobile && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="relative aspect-[3/4] md:aspect-auto h-[35rem] md:h-[40rem]">
              <Lanyard position={[0, 0, 30]} gravity={[0, -40, 0]} fov={20} transparent={true} teamMember="priyanshu" />
              <div className="absolute -bottom-32 left-0 right-0 text-center">
                <h3 className="text-xl font-semibold text-krypt-charcoal drop-shadow-lg">Priyanshu Naik</h3>
                <p className="text-krypt-orange drop-shadow-lg">CFO</p>
              </div>
            </div>
            <div className="relative aspect-[3/4] md:aspect-auto h-[35rem] md:h-[40rem]">
              <Lanyard position={[0, 0, 30]} gravity={[0, -40, 0]} fov={20} transparent={true} teamMember="tanishk" />
              <div className="absolute -bottom-32 left-0 right-0 text-center">
                <h3 className="text-xl font-semibold text-krypt-charcoal drop-shadow-lg">Taniksh Waingankar</h3>
                <p className="text-krypt-orange drop-shadow-lg">CEO</p>
              </div>
            </div>
            <div className="relative aspect-[3/4] md:aspect-auto h-[35rem] md:h-[40rem]">
              <Lanyard position={[0, 0, 30]} gravity={[0, -40, 0]} fov={20} transparent={true} teamMember="kartik" />
              <div className="absolute -bottom-32 left-0 right-0 text-center">
                <h3 className="text-xl font-semibold text-krypt-charcoal drop-shadow-lg">Kartik Mistry</h3>
                <p className="text-krypt-orange drop-shadow-lg">CTO</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ─── OUR STORY ────────────────────────────────────── */}
      <div className={`border-t border-krypt-olive/10 ${isMobile ? 'px-5 py-12' : 'container mx-auto px-4 sm:px-6 lg:px-8 py-24'}`}>

        {/* Heading */}
        {isMobile ? (
          <div className="mb-6">
            <motion.p
              className="font-dm text-krypt-orange text-[11px] tracking-[0.24em] uppercase mb-1"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Background
            </motion.p>
            <motion.h2
              className="font-playfair font-bold text-krypt-charcoal text-3xl"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Our Story
            </motion.h2>
          </div>
        ) : (
          <ScrollReveal containerClassName="!my-0 mb-4" textClassName="text-krypt-charcoal">
            Our Story
          </ScrollReveal>
        )}

        {/* Paragraphs — each wrapped in its own GradualBlur so mobile triggers correctly */}
        <div className={`text-krypt-charcoal/55 max-w-4xl mb-10 ${isMobile ? 'text-base space-y-4' : 'text-lg space-y-6'}`}>
          {[
            "Consider the landscape of virtually any industry, and you will notice the same recurring pattern — companies that have been putting in their time and developing a legitimate product or service with legitimate customers and high-quality standards. However, as soon as people search for those businesses on the internet, all of that effort and quality vanish into thin air. Instead, they encounter a stagnant web presence, or sometimes even nothing at all.",
            "This discrepancy is not an accident; it is a result.",
            "For decades, having a robust digital presence required either spending vast amounts of money on agency-based solutions far above what any developing business can afford or relying on template-based sites similar to dozens, if not hundreds of others. Neither strategy provided a solution to the actual problem at hand, leaving businesses visible to their regular customers but entirely absent from everywhere else.",
            "This is the challenge that inspired Krypt Media.",
            "At Krypt Media, we pride ourselves on being lean, agile, and efficient. This approach allows us to be flexible and fast while providing unparalleled customer support, as there is no bureaucracy between you and the company's decision-makers. In essence, you work directly with our team when you decide to cooperate with us.",
            "Strategy, design, development, and automation are all part of what we do. Not as standalone services transferred from one department to another, but as an integrated process focused on achieving a singular objective: presenting your brand digitally in the same way it presents itself in the physical world.",
            "We're in the early stages of our career – there's no pretending otherwise. What that actually means for us is that every project we accept receives our undivided focus and expertise. We're not defending a reputation based on quantity. We're establishing one, one project at a time, one client at a time, and we approach it with integrity.",
          ].map((text, i) => (
            <GradualBlur key={i} delay={0} blurMax={6} duration={0.7} amount={0.05}>
              <p>{text}</p>
            </GradualBlur>
          ))}
          <GradualBlur delay={0} blurMax={6} duration={0.7} amount={0.05}>
            <p className="text-krypt-charcoal font-medium">
              If your brand's digital representation isn't matching up to the reputation of the business you've established, then this is no longer a matter of design. It's a matter of strategy. And that's precisely why we created Krypt.
            </p>
          </GradualBlur>
        </div>
      </div>

    </section>
  );
}
