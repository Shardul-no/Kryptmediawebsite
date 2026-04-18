import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useMediaQuery } from '../hooks/useMediaQuery';
import ScrollReveal from '../components/ScrollReveal';
import GradualBlur from '../components/GradualBlur';
import services from '../data/services.json';
import { SERVICE_SLUGS } from '../data/serviceSlugs';

export default function ServicesPage() {
  useEffect(() => {
    document.title = 'Our Services | Krypt Media LLP';
  }, []);

  const isMobile = useMediaQuery('(max-width: 768px)');

  return (
    <section id="services" className="relative pt-16 sm:pt-20 md:pt-24 pb-20 bg-krypt-cream overflow-hidden">
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const slug = SERVICE_SLUGS[service.title] || service.title.toLowerCase().replace(/\s+/g, '-');
            return (
              <motion.div
                key={service.title}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 border border-krypt-olive/5 hover:border-krypt-olive/20"
                initial={{
                  opacity: 0,
                  x: isMobile ? (index % 2 === 0 ? -80 : 80) : 0,
                  y: isMobile ? 0 : 40,
                  scale: isMobile ? 1 : 0.95,
                }}
                whileInView={{
                  opacity: 1,
                  x: 0,
                  y: 0,
                  scale: 1,
                }}
                transition={{
                  type: 'spring',
                  stiffness: 90,
                  damping: 18,
                  delay: index * 0.12,
                }}
                viewport={{ once: true, amount: 0.2 }}
              >
                <div className="h-auto min-h-[160px] sm:min-h-[192px] relative overflow-hidden">
                  <motion.img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover"
                    initial={{ scale: 1 }}
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.4 }}
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                </div>

                <div className="p-6">
                  {service.icon && <div className="text-4xl mb-3">{service.icon}</div>}
                  <h2 className="text-xl font-bold mb-2 text-krypt-charcoal">
                    {service.title}
                  </h2>
                  <p className="text-krypt-charcoal/55 mb-4">{service.description}</p>

                  <ul className="space-y-2 mb-6">
                    {service.features.slice(0, 4).map((feature, i) => (
                      <li key={i} className="flex items-start">
                        <span className="text-krypt-orange mr-2">•</span>
                        <span className="text-krypt-charcoal/55">{feature}</span>
                      </li>
                    ))}
                    {service.features.length > 4 && (
                      <li className="text-krypt-charcoal/55 text-sm">
                        +{service.features.length - 4} more features
                      </li>
                    )}
                  </ul>

                  <Link
                    to={`/services/${slug}`}
                    className="block w-full bg-krypt-orange hover:bg-krypt-apricot text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-300 text-center"
                  >
                    See More
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
