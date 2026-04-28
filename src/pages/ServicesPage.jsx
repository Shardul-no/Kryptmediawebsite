import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import ScrollReveal from '../components/ScrollReveal';
import GradualBlur from '../components/GradualBlur';
import services from '../data/services.json';
import { SERVICE_SLUGS } from '../data/serviceSlugs';

// Gradient backgrounds for services without images
const SERVICE_BACKGROUNDS = [
  'from-krypt-orange/80 to-krypt-apricot/90',
  'from-violet-600/80 to-purple-500/90',
  'from-emerald-600/80 to-teal-500/90',
  'from-rose-500/80 to-pink-500/90',
];

function ServiceFlipCard({ service, index }) {
  const [isFlipped, setIsFlipped] = useState(false);
  const slug = SERVICE_SLUGS[service.title] || service.title.toLowerCase().replace(/\s+/g, '-');
  const bgGradient = SERVICE_BACKGROUNDS[index % SERVICE_BACKGROUNDS.length];

  return (
    <motion.div
      className="relative w-full aspect-[3/4] cursor-pointer perspective-1000"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        type: 'spring',
        stiffness: 90,
        damping: 18,
        delay: index * 0.12,
      }}
      viewport={{ once: true, amount: 0.2 }}
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
    >
      <motion.div
        className="relative w-full h-full preserve-3d"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: 'easeInOut' }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Front of card */}
        <div
          className="absolute inset-0 w-full h-full rounded-2xl overflow-hidden shadow-xl"
          style={{ backfaceVisibility: 'hidden' }}
        >
          {/* Background - use image if exists, otherwise gradient */}
          <div className="absolute inset-0">
            {service.image ? (
              <img
                src={service.image}
                alt={service.title}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            ) : (
              <div className={`w-full h-full bg-gradient-to-br ${bgGradient}`} />
            )}
            {/* Dark gradient overlay for text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          </div>

          {/* Title overlay at bottom */}
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <h3 className="text-xl md:text-2xl font-bold text-white leading-tight">
              {service.title}
            </h3>
            <p className="text-white/70 text-sm mt-2">Hover to explore</p>
          </div>
        </div>

        {/* Back of card */}
        <div
          className="absolute inset-0 w-full h-full rounded-2xl overflow-hidden shadow-xl bg-krypt-charcoal"
          style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
        >
          <div className="h-full flex flex-col p-6">
            {/* Header */}
            <div className="mb-4">
              <h3 className="text-lg font-bold text-white mb-2">{service.title}</h3>
              <p className="text-white/70 text-sm line-clamp-2">{service.description}</p>
            </div>

            {/* Features list - scrollable if needed */}
            <div className="flex-1 overflow-y-auto">
              <ul className="space-y-2">
                {service.features.slice(0, 6).map((feature, i) => (
                  <li key={i} className="flex items-start text-sm">
                    <span className="text-krypt-orange mr-2 flex-shrink-0">•</span>
                    <span className="text-white/80">{feature}</span>
                  </li>
                ))}
                {service.features.length > 6 && (
                  <li className="text-white/50 text-xs">
                    +{service.features.length - 6} more features
                  </li>
                )}
              </ul>
            </div>

            {/* CTA Button */}
            <Link
              to={`/services/${slug}`}
              className="mt-4 block w-full bg-krypt-orange hover:bg-krypt-apricot text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-300 text-center text-sm"
              onClick={(e) => e.stopPropagation()}
            >
              See More
            </Link>
          </div>
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
