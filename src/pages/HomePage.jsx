import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Waves from '../components/Waves';
import RotatingText from '../components/RotatingText';
import BlurText from '../components/BlurText';
import ScrollVelocity from '../components/ScrollVelocity';
import ScrollReveal from '../components/ScrollReveal';
import GradualBlur from '../components/GradualBlur';
import SectionReveal from '../components/SectionReveal';
import ServiceModel from '../components/ServiceModel';
import { SERVICE_SLUGS } from '../data/serviceSlugs';
import services from '../data/services.json';

const SERVICE_MODELS = {
  'Website Design & Development': '/3d/textured_model_0.glb',
  'Social Media Marketing': '/3d/textured_model_0.glb', // Fallback for the broken model
  'Design Services': '/3d/a_contemporary_3d_icon_representing_creative_desig_glb.glb',
};

const ROTATING_ITEMS = ['Websites.', 'Brands.', 'Campaigns.', 'Growth Systems.'];
const STRIP_ITEMS = 'Web Design — Development — Branding — Social Media — Strategy — UI/UX';

const SERVICE_COPY = {
  'Website Design & Development':
    'We build scalable, performance-driven websites tailored to business goals.',
  'Social Media Marketing':
    'We design campaigns that connect, engage, and convert audiences.',
  'Design Services':
    'From brand identity to marketing assets, we create visuals that resonate.',
};

const HIGHLIGHTED_PROJECTS = [
  {
    title: 'DMX Website',
    slug: 'dmx',
    image: 'https://images.unsplash.com/photo-1590004953392-5aba2e72269a?ixlib=rb-1.2.1&auto=format&fit=crop&h=500&w=800&q=80',
    tag: 'UI/UX & Development',
  },
  {
    title: 'E-commerce Platform',
    slug: 'ecommerce',
    image: 'https://images.unsplash.com/photo-1590004845575-cc18b13d1d0a?ixlib=rb-1.2.1&auto=format&fit=crop&h=500&w=800&q=80',
    tag: 'E-commerce',
  },
  {
    title: 'More Work',
    slug: null,
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-1.2.1&auto=format&fit=crop&h=500&w=800&q=80',
    tag: 'Branding & Web',
  },
];

export default function HomePage() {
  useEffect(() => {
    document.title = 'Krypt Media | Digital Experiences That Move Brands Forward';
    // Scroll to top when page loads
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="relative bg-beige-100 text-charcoal overflow-hidden">
      {/* ——— HERO ——— */}
      <section id="hero" className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden">
        <Waves
          lineColor="rgba(13,148,136,0.2)"
          backgroundColor="transparent"
          waveAmpX={20}
          waveAmpY={10}
          xGap={14}
          yGap={28}
          className="z-0"
        />
        <div className="absolute inset-0 bg-beige-100/30 z-[1]" />

        <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 pt-20 pb-16">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold max-w-5xl mb-6 leading-tight">
            <BlurText
              text="We Build Digital Experiences That Move Brands Forward"
              className="text-charcoal"
              delay={80}
              stepDuration={0.4}
              animateBy="words"
            />
          </h1>

          <motion.div
            initial={{ opacity: 0, filter: 'blur(10px)', y: 20 }}
            animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="min-h-[1.2em] flex items-center justify-center mb-6"
          >
            <RotatingText
              texts={ROTATING_ITEMS}
              rotationInterval={2200}
              mainClassName="text-2xl sm:text-3xl md:text-4xl text-teal-600 font-semibold"
              elementLevelClassName="inline-block"
              staggerDuration={0.02}
              initial={{ opacity: 0, filter: 'blur(10px)', y: 15 }}
              animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
              exit={{ opacity: 0, filter: 'blur(10px)', y: -15 }}
              transition={{ type: 'spring', damping: 30, stiffness: 250 }}
              animatePresenceInitial={true}
            />
          </motion.div>

          <p className="max-w-2xl text-lg mb-10">
            <BlurText
              text="Krypt Media crafts immersive digital solutions blending strategy, design, and technology."
              className="text-charcoal-muted"
              delay={60}
              stepDuration={0.35}
            />
          </p>

          <motion.div
            initial={{ opacity: 0, filter: 'blur(8px)', y: 12 }}
            animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
            transition={{ delay: 1.2, duration: 0.6 }}
          >
            <Link
              to="/projects"
              className="inline-block px-8 py-3.5 rounded-full bg-teal-600 text-white font-semibold hover:bg-teal-700 transition-colors duration-300 shadow-lg shadow-teal-500/20"
            >
              View Our Work
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ——— HORIZONTAL STRIP (Scroll Velocity) ——— */}
      <section className="relative z-10 py-6 border-y border-teal-500/10 bg-beige-200/80">
        <ScrollVelocity
          texts={[STRIP_ITEMS]}
          velocity={40}
          parallaxClassName="py-2"
          scrollerClassName="text-charcoal-muted text-lg md:text-xl font-medium tracking-wide"
        />
      </section>

      {/* ——— SERVICES OVERVIEW ——— */}
      <section id="services-overview" className="relative py-24 md:py-32 bg-beige-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16 md:mb-20">
            <ScrollReveal
              containerClassName="!my-0"
              textClassName="text-charcoal"
            >
              Our Services
            </ScrollReveal>
            <GradualBlur delay={0.2} className="max-w-2xl mt-4">
              <p className="text-charcoal-muted text-lg">
                Three pillars of what we do—interactive, focused, and built for impact.
              </p>
            </GradualBlur>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-12">
            {services.slice(0, 3).map((service, index) => {
              const slug = SERVICE_SLUGS[service.title] || service.title.toLowerCase().replace(/\s+/g, '-');
              const copy = SERVICE_COPY[service.title] || service.description;
              const modelUrl = SERVICE_MODELS[service.title] || '/3d/textured_model_0.glb';
              const redirectUrl = `/services/${slug}`;

              return (
                <SectionReveal key={service.title} delay={index * 0.12} className="flex flex-col items-center">
                  <div className="w-full max-w-[320px] mx-auto mb-6">
                    <ServiceModel modelUrl={modelUrl} redirectUrl={redirectUrl} />
                  </div>
                  <h3 className="text-xl font-semibold text-charcoal mb-2 text-center">{service.title}</h3>
                  <p className="text-charcoal-muted text-center text-sm mb-6 max-w-xs">{copy}</p>
                  <Link
                    to={`/services/${slug}`}
                    className="text-teal-600 hover:text-teal-500 text-sm font-medium transition-colors"
                  >
                    Learn more →
                  </Link>
                </SectionReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ——— SELECTED WORK PREVIEW ——— */}
      <section id="selected-work" className="relative py-24 md:py-32 bg-beige-100 border-t border-teal-500/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-14">
            <ScrollReveal containerClassName="!my-0" textClassName="text-charcoal">
              Selected Work
            </ScrollReveal>
            <GradualBlur delay={0.15}>
              <p className="text-charcoal-muted text-lg mt-4 max-w-2xl">
                A glimpse into recent projects—each opens a full case study.
              </p>
            </GradualBlur>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 md:gap-10">
            {HIGHLIGHTED_PROJECTS.map((project, index) => (
              <SectionReveal key={project.slug || project.title} delay={index * 0.1}>
                <Link
                  to={project.slug ? `/projects/${project.slug}` : '/projects'}
                  className="group block rounded-xl overflow-hidden border border-teal-500/10 hover:border-teal-500/30 transition-colors duration-300 bg-beige-50"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-teal-900/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <div className="p-5 bg-charcoal/[0.02]">
                    <span className="text-teal-600/80 text-sm font-medium">{project.tag}</span>
                    <h3 className="text-xl font-semibold text-charcoal mt-1 group-hover:text-teal-600 transition-colors">
                      {project.title}
                    </h3>
                    <span className="text-charcoal-muted text-sm mt-2 inline-block">View case study →</span>
                  </div>
                </Link>
              </SectionReveal>
            ))}
          </div>

          <SectionReveal delay={0.3} className="text-center mt-12">
            <Link
              to="/projects"
              className="inline-block px-6 py-2.5 rounded-full border border-teal-600/20 text-teal-600 font-medium hover:border-teal-600/50 hover:bg-teal-50 transition-all duration-300"
            >
              View all projects
            </Link>
          </SectionReveal>
        </div>
      </section>
    </div>
  );
}
