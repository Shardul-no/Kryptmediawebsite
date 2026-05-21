import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import ScrollReveal from '../components/ScrollReveal';
import GradualBlur from '../components/GradualBlur';
import services from '../data/services.json';
import { useMediaQuery } from '../hooks/useMediaQuery';

// Service paths for independent pages
const SERVICE_PATHS = {
  'Website Design & Development': '/services/website-design',
  'AI Agents': '/services/ai-agents',
  'Business Solutions': '/services/business-solutions',
  'Design Services': '/services/design-services',
};

// Gradient backgrounds for services without images
const SERVICE_BACKGROUNDS = [
  'from-krypt-orange/80 to-krypt-apricot/90',
  'from-violet-600/80 to-purple-500/90',
  'from-emerald-600/80 to-teal-500/90',
  'from-rose-500/80 to-pink-500/90',
];

function ServiceFlipCard({ service, index }) {
  const [isFlipped, setIsFlipped] = useState(false);
  const isMobile = useMediaQuery('(max-width: 767px)');
  const navigate = useNavigate();
  const path = SERVICE_PATHS[service.title] || '/services';
  const bgGradient = SERVICE_BACKGROUNDS[index % SERVICE_BACKGROUNDS.length];

  const handleClick = () => {
    if (!isMobile) {
      navigate(path);
    } else {
      setIsFlipped((f) => !f);
    }
  };

  /* ── Desktop: classic 3D CSS flip ── */
  if (!isMobile) {
    return (
      <motion.div
        className="relative w-full aspect-[3/4] cursor-pointer perspective-1000"
        style={{ isolation: 'isolate' }}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 90, damping: 18, delay: index * 0.25 }}
        viewport={{ once: true, amount: 0.2 }}
        onMouseEnter={() => setIsFlipped(true)}
        onMouseLeave={() => setIsFlipped(false)}
        onClick={handleClick}
      >
        <motion.div
          className="relative w-full h-full preserve-3d"
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* Front */}
          <div className="absolute inset-0 rounded-2xl overflow-hidden shadow-xl" style={{ backfaceVisibility: 'hidden' }}>
            <div className="absolute inset-0">
              {service.image ? (
                <img src={service.image} alt={service.title} className="w-full h-full object-cover" loading="lazy" />
              ) : (
                <div className={`w-full h-full bg-gradient-to-br ${bgGradient}`} />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <h3 className="text-xl md:text-2xl font-bold text-white leading-tight">{service.title}</h3>
              <p className="text-white/70 text-sm mt-2">Hover to explore</p>
            </div>
          </div>
          {/* Back */}
          <div className="absolute inset-0 rounded-2xl overflow-hidden shadow-xl bg-krypt-charcoal" style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}>
            <div className="h-full flex flex-col p-6">
              <div className="mb-4">
                <h3 className="text-lg font-bold text-white mb-2">{service.title}</h3>
                <p className="text-white/70 text-sm line-clamp-2">{service.description}</p>
              </div>
              <div className="flex-1 overflow-y-auto">
                <ul className="space-y-2">
                  {service.features.slice(0, 6).map((feature, i) => (
                    <li key={i} className="flex items-start text-sm">
                      <span className="text-krypt-orange mr-2 flex-shrink-0">•</span>
                      <span className="text-white/80">{feature}</span>
                    </li>
                  ))}
                  {service.features.length > 6 && (
                    <li className="text-white/50 text-xs">+{service.features.length - 6} more features</li>
                  )}
                </ul>
              </div>
              <div className="mt-4 w-full btn-cta text-white font-semibold py-3 px-4 rounded-lg text-center text-sm">See More</div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    );
  }

  /* ── Mobile: opacity crossfade — no 3D, no overlap, no compositing blur ── */
  return (
    <motion.div
      className="relative w-full aspect-[3/4] cursor-pointer rounded-2xl overflow-hidden shadow-xl"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true, amount: 0.2 }}
      onClick={handleClick}
    >
      {/* Front face */}
      <motion.div
        className="absolute inset-0"
        animate={{ opacity: isFlipped ? 0 : 1 }}
        transition={{ duration: 0.3 }}
      >
        {service.image ? (
          <img src={service.image} alt={service.title} className="w-full h-full object-cover" loading="lazy" />
        ) : (
          <div className={`w-full h-full bg-gradient-to-br ${bgGradient}`} />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-5">
          <h3 className="text-lg font-bold text-white leading-tight">{service.title}</h3>
          {/* Animated tap hint */}
          <div className="flex items-center gap-1.5 mt-2">
            <motion.div
              animate={{ scale: [1, 1.25, 1] }}
              transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5 text-krypt-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11" />
              </svg>
            </motion.div>
            <p className="text-white/60 text-xs font-dm">Tap to explore</p>
          </div>
        </div>
      </motion.div>

      {/* Back face */}
      <motion.div
        className="absolute inset-0 bg-krypt-charcoal"
        animate={{ opacity: isFlipped ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        style={{ pointerEvents: isFlipped ? 'auto' : 'none' }}
      >
        <div className="h-full flex flex-col p-5">
          <div className="mb-3">
            <h3 className="text-base font-bold text-white mb-1">{service.title}</h3>
            <p className="text-white/60 text-xs line-clamp-2">{service.description}</p>
          </div>
          <div className="flex-1 overflow-y-auto">
            <ul className="space-y-2">
              {service.features.slice(0, 6).map((feature, i) => (
                <li key={i} className="flex items-start text-xs">
                  <span className="text-krypt-orange mr-2 flex-shrink-0">•</span>
                  <span className="text-white/80">{feature}</span>
                </li>
              ))}
              {service.features.length > 6 && (
                <li className="text-white/40 text-xs">+{service.features.length - 6} more</li>
              )}
            </ul>
          </div>
          <Link
            to={path}
            onClick={(e) => e.stopPropagation()}
            className="mt-3 block w-full btn-cta text-white font-semibold py-3 px-4 rounded-lg text-center text-sm"
          >
            See More
          </Link>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function ServicesPage() {
  useEffect(() => {
    document.title = 'Our Services | Krypt Media LLP';
  }, []);

  return (
    <section id="services" className="relative pt-16 sm:pt-20 md:pt-24 pb-32 md:pb-48 bg-krypt-cream overflow-hidden min-h-screen">
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute top-20 left-20 w-32 h-32 md:w-48 md:h-48 lg:w-64 lg:h-64 rounded-full bg-krypt-orange/10 blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-32 h-32 md:w-48 md:h-48 lg:w-64 lg:h-64 rounded-full bg-krypt-orange/10 blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 mt-8 lg:mt-0">
          <ScrollReveal containerClassName="!my-0 mb-6" textClassName="display-large text-krypt-charcoal">
            Our Services
          </ScrollReveal>
          <GradualBlur>
            <p className="max-w-2xl mx-auto text-xl text-krypt-charcoal/55 italic-serif opacity-80">
              Bespoke digital solutions <span className="not-italic font-sans text-krypt-orange font-medium">tailored</span> to scale your vision.
            </p>
          </GradualBlur>
        </div>

        {/* 4 cards in a row - responsive */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {services.map((service, index) => (
            <ServiceFlipCard key={service.title} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
