import { useEffect } from 'react';
import { motion } from 'framer-motion';
import BlurText from '../components/BlurText';
import ScrollReveal from '../components/ScrollReveal';
import GradualBlur from '../components/GradualBlur';
import SectionReveal from '../components/SectionReveal';
import Lanyard from '../components/Lanyard';

const VALUES = [
  { name: 'Innovation', desc: 'We push boundaries and explore new ways to solve problems.' },
  { name: 'Precision', desc: 'Every detail is considered, from strategy to delivery.' },
  { name: 'Collaboration', desc: 'We work as an extension of your team.' },
  { name: 'Performance', desc: 'Results that scale and metrics that matter.' },
];

export default function AboutPage() {
  useEffect(() => {
    document.title = 'About Us | Krypt Media LLP';
  }, []);

  return (
    <section id="about" className="relative bg-tan-100 text-charcoal overflow-hidden">
      {/* Hero — premium dark with subtle gradient (Lanyard optional when assets available) */}
      <div className="relative min-h-[85vh] flex flex-col items-center justify-center pt-24 pb-16 overflow-hidden">
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-tan-100/30 via-tan-50 to-tan-100" />
        <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(99,32,36,0.08),transparent)]" />
        <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
          <h1 className="display-large text-charcoal mb-8">
            <BlurText
              text="Defining the Future of "
              className="inline text-charcoal"
              delay={70}
              stepDuration={0.4}
              animateBy="words"
            />
            <span className="italic-serif text-caput-mortuum block sm:inline">Digital Identity</span>
          </h1>
          <GradualBlur delay={0.2}>
            <p className="text-xl text-slate-500 font-sans font-light leading-relaxed max-w-2xl mx-auto italic-serif opacity-90">
              Krypt Media LLP is a creative digital agency focused on building <span className="text-charcoal font-medium not-italic">impactful brand ecosystems</span>.
              We blend avant-garde strategy, design, and technology.
            </p>
          </GradualBlur>
        </div>
      </div>

      {/* Values — Scroll Reveal */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-24 border-t border-coffee/10">
        <ScrollReveal containerClassName="!my-0 mb-4" textClassName="text-charcoal">
          What We Stand For
        </ScrollReveal>
        <GradualBlur delay={0.1}>
          <p className="text-slate-500 text-lg max-w-2xl mb-14">
            Our values guide how we work with every client and project.
          </p>
        </GradualBlur>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {VALUES.map((value, i) => (
            <SectionReveal key={value.name} delay={i * 0.1}>
              <div className="p-6 rounded-xl border border-coffee/10 bg-charcoal/[0.02] hover:border-coffee/20 transition-colors duration-300">
                <h3 className="text-xl font-semibold text-charcoal mb-2">{value.name}</h3>
                <p className="text-slate-500 text-sm">{value.desc}</p>
              </div>
            </SectionReveal>
          ))}
        </div>
      </div>

      {/* Interactive Lanyards Section */}
      <div className="container mx-auto px-4 pt-12 pb-48 border-t border-coffee/10">
        <ScrollReveal containerClassName="!my-0 mb-0" textClassName="text-charcoal">
          Our Founders
        </ScrollReveal>
        <GradualBlur delay={0.1}>
          <p className="text-slate-500 text-lg max-w-2xl mb-0">
            Interactive lanyard cards representing our leadership team.
          </p>
        </GradualBlur>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Priyanshu's Lanyard */}
          <div className="relative aspect-[3/4] md:aspect-auto h-[35rem] md:h-[40rem]">
            <Lanyard
              position={[0, 0, 30]}
              gravity={[0, -40, 0]}
              fov={20}
              transparent={true}
              teamMember="priyanshu"
            />
            <div className="absolute -bottom-32 left-0 right-0 text-center">
              <h3 className="text-xl font-semibold text-charcoal drop-shadow-lg">Priyanshu Naik</h3>
              <p className="text-caput-mortuum drop-shadow-lg">Co-Founder</p>
            </div>
          </div>

          {/* Taniksh's Lanyard */}
          <div className="relative aspect-[3/4] md:aspect-auto h-[35rem] md:h-[40rem]">
            <Lanyard
              position={[0, 0, 30]}
              gravity={[0, -40, 0]}
              fov={20}
              transparent={true}
              teamMember="tanishk"
            />
            <div className="absolute -bottom-32 left-0 right-0 text-center">
              <h3 className="text-xl font-semibold text-charcoal drop-shadow-lg">Taniksh Waingankar</h3>
              <p className="text-caput-mortuum drop-shadow-lg">Co-Founder</p>
            </div>
          </div>

          {/* Kartik's Lanyard */}
          <div className="relative aspect-[3/4] md:aspect-auto h-[35rem] md:h-[40rem]">
            <Lanyard
              position={[0, 0, 30]}
              gravity={[0, -40, 0]}
              fov={20}
              transparent={true}
              teamMember="kartik"
            />
            <div className="absolute -bottom-32 left-0 right-0 text-center">
              <h3 className="text-xl font-semibold text-charcoal drop-shadow-lg">Kartik Mistry</h3>
              <p className="text-caput-mortuum drop-shadow-lg">Co-Founder</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
