import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import WhatsAppButton from '../../components/WhatsAppButton';
import TerminalProcess from '../../components/TerminalProcess';
import FlowingMenu from '../../components/FlowingMenu';

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
      className="relative py-20 bg-beige-100 overflow-hidden"
    >
      {/* Decorative background elements */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-20 left-20 w-64 h-64 rounded-full bg-teal-500/10 blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-64 h-64 rounded-full bg-teal-500/10 blur-3xl"></div>
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
            <h2 className="text-2xl font-bold mb-4 text-charcoal">About Our Service</h2>
            <p className="text-charcoal-muted leading-relaxed mb-6">
              We specialize in creating stunning, high-performance websites that not only look great but also drive real business results. Our team combines cutting-edge design principles with robust development practices to deliver websites that stand out in today's competitive digital landscape.
            </p>
            <p className="text-charcoal-muted leading-relaxed">
              From initial concept to final deployment, we handle every aspect of your website project with meticulous attention to detail. Whether you need a simple landing page or a complex e-commerce platform, we have the expertise to bring your vision to life.
            </p>
          </motion.div>

          {/* What We Offer — flowing menu */}
          <motion.div variants={itemVariants} className="mb-16">
            <h2 className="text-2xl font-bold mb-8 text-charcoal">What We Offer</h2>
            <div className="h-[400px] rounded-2xl overflow-hidden border border-teal-500/10 shadow-inner">
              <FlowingMenu
                items={[
                  { text: 'UI/UX Design', image: 'https://images.unsplash.com/photo-1586717791821-3f44a563dc4c?q=80&w=600&auto=format' },
                  { text: 'Custom Development', image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=600&auto=format' },
                  { text: 'CMS Integration', image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=600&auto=format' },
                  { text: 'Performance Optimization', image: 'https://images.unsplash.com/photo-1551288049-bbbda5366391?q=80&w=600&auto=format' },
                  { text: 'SEO Structure', image: 'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?q=80&w=600&auto=format' },
                  { text: 'Ongoing Maintenance', image: 'https://images.unsplash.com/photo-1454165833767-13143895a004?q=80&w=600&auto=format' },
                ]}
                bgColor="transparent"
                textColor="#333"
                marqueeBgColor="#0d9488"
                marqueeTextColor="#fff"
                borderColor="rgba(13, 148, 136, 0.1)"
              />
            </div>
          </motion.div>

          {/* Images with external links */}
          <motion.div variants={itemVariants} className="mb-12">
            <h2 className="text-2xl font-bold mb-6 text-charcoal">Our Work</h2>
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
                  className="inline-block bg-teal-600 hover:bg-teal-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-300"
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
                  className="inline-block bg-teal-600 hover:bg-teal-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-300"
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
                  className="inline-block bg-teal-600 hover:bg-teal-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-300"
                >
                  Visit Website
                </a>
              </div>
            </div>
          </motion.div>

          {/* Process — terminal style */}
          <motion.div variants={itemVariants}>
            <h2 className="text-2xl font-bold mb-6 text-charcoal">Our Process</h2>
            <TerminalProcess className="mb-10" />
            <WhatsAppButton serviceName="website design" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default WebsiteDesign;
