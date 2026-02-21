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
    document.title = 'Our Services | Krypt Media';
  }, []);

  const isMobile = useMediaQuery('(max-width: 768px)');

  return (
    <section id="services" className="relative pt-24 pb-20 bg-black overflow-hidden">
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute top-20 left-20 w-64 h-64 rounded-full bg-blue-500/20 blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-64 h-64 rounded-full bg-purple-500/20 blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <ScrollReveal containerClassName="!my-0 mb-4" textClassName="text-white">
            Our Services
          </ScrollReveal>
          <GradualBlur>
            <p className="max-w-2xl mx-auto text-lg text-gray-400">
              Comprehensive solutions tailored to elevate your digital presence
            </p>
          </GradualBlur>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const slug = SERVICE_SLUGS[service.title] || service.title.toLowerCase().replace(/\s+/g, '-');
            return (
              <motion.div
                key={service.title}
                className="bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
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
                <div className="h-48 relative overflow-hidden">
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
                  <h2 className="text-xl font-bold mb-2 text-white">
                    {service.title}
                  </h2>
                  <p className="text-gray-200 mb-4">{service.description}</p>

                  <ul className="space-y-2 mb-6">
                    {service.features.slice(0, 4).map((feature, i) => (
                      <li key={i} className="flex items-start">
                        <span className="text-green-500 mr-2">•</span>
                        <span className="text-gray-200">{feature}</span>
                      </li>
                    ))}
                    {service.features.length > 4 && (
                      <li className="text-gray-400 text-sm">
                        +{service.features.length - 4} more features
                      </li>
                    )}
                  </ul>

                  <Link
                    to={`/services/${slug}`}
                    className="block w-full bg-cyan-500/90 hover:bg-cyan-400 text-black font-semibold py-3 px-6 rounded-lg transition-colors duration-300 text-center"
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
