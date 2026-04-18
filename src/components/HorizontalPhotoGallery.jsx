import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const HorizontalPhotoGallery = ({ items = [] }) => {
  const [sectionRef, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 15,
      },
    },
  };

  return (
    <section
      ref={sectionRef}
      className="relative py-0 bg-krypt-cream overflow-hidden"
    >
      <motion.div
        className="space-y-0"
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        variants={containerVariants}
      >
        {items.map((item, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            className="group relative h-32 sm:h-40 md:h-48 lg:h-56 overflow-hidden w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]"
          >
            {/* Background image */}
            <motion.img
              src={item.image}
              alt={item.label}
              className="w-full h-full object-cover"
              initial={{ scale: 1 }}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.5 }}
              loading="lazy"
            />

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/30 to-transparent group-hover:from-black/60 group-hover:via-black/40 transition-all duration-300" />

            {/* Text label on left */}
            <div className="absolute inset-0 flex items-center pl-8 sm:pl-12 md:pl-16 lg:pl-20">
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2 + index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                className="relative z-10"
              >
                <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-wide uppercase">
                  {item.label}
                </h3>
                {item.subtitle && (
                  <p className="text-xs sm:text-sm md:text-base text-white/70 mt-2 font-light tracking-widest uppercase">
                    {item.subtitle}
                  </p>
                )}
              </motion.div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default HorizontalPhotoGallery;
