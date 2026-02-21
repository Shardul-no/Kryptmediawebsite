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
    document.title = 'About Us | Krypt Media';
  }, []);

  return (
    <section id="about" className="relative bg-black text-white overflow-hidden">
      {/* Hero — premium dark with subtle gradient (Lanyard optional when assets available) */}
      <div className="relative min-h-[85vh] flex flex-col items-center justify-center pt-24 pb-16 overflow-hidden">
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-cyan-950/20 via-black to-black" />
        <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(34,211,238,0.08),transparent)]" />
        <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            <BlurText
              text="We Build Brands Through Strategy and Innovation"
              className="text-white"
              delay={70}
              stepDuration={0.4}
              animateBy="words"
            />
          </h1>
          <GradualBlur delay={0.2}>
            <p className="text-lg text-gray-300">
              Krypt Media is a creative digital agency focused on building impactful brand ecosystems.
              We blend strategy, design, and technology to craft digital products that perform.
            </p>
          </GradualBlur>
        </div>
      </div>

      {/* Values — Scroll Reveal */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-24 border-t border-white/5">
        <ScrollReveal containerClassName="!my-0 mb-4" textClassName="text-white">
          What We Stand For
        </ScrollReveal>
        <GradualBlur delay={0.1}>
          <p className="text-gray-400 text-lg max-w-2xl mb-14">
            Our values guide how we work with every client and project.
          </p>
        </GradualBlur>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {VALUES.map((value, i) => (
            <SectionReveal key={value.name} delay={i * 0.1}>
              <div className="p-6 rounded-xl border border-white/10 bg-white/[0.02] hover:border-cyan-500/20 transition-colors duration-300">
                <h3 className="text-xl font-semibold text-white mb-2">{value.name}</h3>
                <p className="text-gray-400 text-sm">{value.desc}</p>
              </div>
            </SectionReveal>
          ))}
        </div>
      </div>

      {/* Interactive Lanyards Section */}
      <div className="container mx-auto px-4 py-24 border-t border-white/5">
        <ScrollReveal containerClassName="!my-0 mb-4" textClassName="text-white">
          Our Founders
        </ScrollReveal>
        <GradualBlur delay={0.1}>
          <p className="text-gray-400 text-lg max-w-2xl mb-14">
            Interactive lanyard cards representing our leadership team.
          </p>
        </GradualBlur>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Priyanshu's Lanyard */}
          <div className="h-96 lg:h-[32rem]">
            <Lanyard 
              position={[0, 0, 30]} 
              gravity={[0, -40, 0]} 
              fov={20} 
              transparent={true}
              lanyardTexture="/assets/lanyard-priyanshu.png"
            />
            <div className="text-center mt-4">
              <h3 className="text-xl font-semibold text-white">Priyanshu Naik</h3>
              <p className="text-cyan-400/90">Co-Founder</p>
            </div>
          </div>
          
          {/* Taniksh's Lanyard */}
          <div className="h-96 lg:h-[32rem]">
            <Lanyard 
              position={[0, 0, 30]} 
              gravity={[0, -40, 0]} 
              fov={20} 
              transparent={true}
              lanyardTexture="/assets/lanyard-taniksh.png"
            />
            <div className="text-center mt-4">
              <h3 className="text-xl font-semibold text-white">Taniksh Waingankar</h3>
              <p className="text-cyan-400/90">Co-Founder</p>
            </div>
          </div>
          
          {/* Kartik's Lanyard */}
          <div className="h-96 lg:h-[32rem]">
            <Lanyard 
              position={[0, 0, 30]} 
              gravity={[0, -40, 0]} 
              fov={20} 
              transparent={true}
              lanyardTexture="/assets/lanyard-kartik.png"
            />
            <div className="text-center mt-4">
              <h3 className="text-xl font-semibold text-white">Kartik Mistry</h3>
              <p className="text-cyan-400/90">Co-Founder</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
