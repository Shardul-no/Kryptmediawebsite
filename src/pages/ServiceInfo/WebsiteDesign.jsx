import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import WhatsAppButton from '../../components/WhatsAppButton';
import TerminalProcess from '../../components/TerminalProcess';

const WebsiteDesign = () => {
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
      className="relative py-20 bg-black overflow-hidden"
    >
      {/* Decorative background elements */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute top-20 left-20 w-64 h-64 rounded-full bg-blue-500/20 blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-64 h-64 rounded-full bg-purple-500/20 blur-3xl"></div>
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
              We specialize in creating stunning, high-performance websites that not only look great but also drive real business results. Our team combines cutting-edge design principles with robust development practices to deliver websites that stand out in today's competitive digital landscape.
            </p>
            <p className="text-gray-300 leading-relaxed">
              From initial concept to final deployment, we handle every aspect of your website project with meticulous attention to detail. Whether you need a simple landing page or a complex e-commerce platform, we have the expertise to bring your vision to life.
            </p>
          </motion.div>

          {/* What We Offer — staggered list */}
          <motion.div variants={itemVariants} className="mb-12">
            <h2 className="text-2xl font-bold mb-6 text-white">What We Offer</h2>
            <ul className="space-y-3">
              {[
                'UI/UX Design',
                'Custom Development',
                'CMS Integration',
                'Performance Optimization',
                'SEO Structure',
                'Ongoing Maintenance',
              ].map((item, i) => (
                <motion.li
                  key={item}
                  className="flex items-center gap-3 py-2 border-b border-white/5 last:border-0"
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ delay: i * 0.08, duration: 0.45 }}
                >
                  <span className="text-cyan-400/80 text-lg">→</span>
                  <span className="text-gray-200">{item}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Images with external links */}
          <motion.div variants={itemVariants} className="mb-12">
            <h2 className="text-2xl font-bold mb-6 text-white">Our Work</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="text-center">
                <img 
                  src="/assets/serviceInfo/websiteDesign/aramesh.png" 
                  alt="Website Design Example" 
                  className="w-full h-64 object-cover rounded-lg mb-4"
                />
                <a 
                  href="https://aramesh.in/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-300"
                >
                  Visit Website
                </a>
              </div>
              <div className="text-center">
                <img 
                  src="/assets/serviceInfo/websiteDesign/gift.png" 
                  alt="Website Design Example" 
                  className="w-full h-64 object-cover rounded-lg mb-4"
                />
                <a 
                  href="https://customizedgift.co.in/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-300"
                >
                  Visit Website
                </a>
              </div>
              <div className="text-center">
                <img 
                  src="/assets/serviceInfo/websiteDesign/lifestyle.png" 
                  alt="Website Design Example" 
                  className="w-full h-64 object-cover rounded-lg mb-4"
                />
                <a 
                  href="https://goboujeelifestyle.com/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-300"
                >
                  Visit Website
                </a>
              </div>
            </div>
          </motion.div>

          {/* Process — terminal style */}
          <motion.div variants={itemVariants}>
            <h2 className="text-2xl font-bold mb-6 text-white">Our Process</h2>
            <TerminalProcess className="mb-10" />
            <WhatsAppButton serviceName="website design" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default WebsiteDesign;
