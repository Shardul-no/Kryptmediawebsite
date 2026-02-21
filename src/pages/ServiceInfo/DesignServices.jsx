import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import WhatsAppButton from "../../components/WhatsAppButton";
import TerminalProcess from "../../components/TerminalProcess";

const DesignServices = () => {
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
        delayChildren: 0.3,
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        mass: 0.5
      }
    }
  };

  return (
    <section 
      ref={sectionRef}
      className="relative py-20 bg-black overflow-hidden min-h-screen"
    >
      {/* Decorative background elements */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute top-20 left-20 w-64 h-64 rounded-full bg-purple-500/20 blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-64 h-64 rounded-full bg-pink-500/20 blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Content */}
        <motion.div
          className="max-w-4xl mx-auto"
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          {/* Main description */}
          <motion.div variants={itemVariants} className="mb-12">
            <h2 className="text-2xl font-bold mb-4 text-white">About Our Service</h2>
            <p className="text-gray-300 leading-relaxed mb-6">
              Great design is the foundation of effective brand communication. Our design services create visual assets that not only look stunning but also convey your message clearly and drive action from your audience.
            </p>
            <p className="text-gray-300 leading-relaxed">
              From print materials to digital assets, we ensure every design element aligns with your brand identity and business objectives. Our creative team combines artistic vision with strategic thinking to deliver designs that make an impact.
            </p>
          </motion.div>

          {/* What We Offer — staggered list */}
          <motion.div variants={itemVariants} className="mb-12">
            <h2 className="text-2xl font-bold mb-6 text-white">What We Offer</h2>
            <ul className="space-y-3">
              {[
                'Brand Identity',
                'Print Design',
                'Digital Assets',
                'Promotional Materials',
                'Event Design',
                'Style Guides & Moodboards',
              ].map((item, i) => (
                <motion.li
                  key={item}
                  className="flex items-center gap-3 py-2 border-b border-white/5 last:border-0"
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ delay: i * 0.08, duration: 0.45 }}
                >
                  <span className="text-purple-400/80 text-lg">→</span>
                  <span className="text-gray-200">{item}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Process — terminal style */}
          <motion.div variants={itemVariants}>
            <h2 className="text-2xl font-bold mb-6 text-white">Our Process</h2>
            <TerminalProcess className="mb-10" />
            <WhatsAppButton serviceName="design services" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default DesignServices;
