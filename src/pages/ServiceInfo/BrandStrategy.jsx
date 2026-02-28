import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import WhatsAppButton from "../../components/WhatsAppButton";

const BrandStrategy = () => {
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

  // Image gallery data
  const galleryImages = [
    {
      src: "/assets/serviceInfo/brandStratergy/1.jpg",
      alt: "Brand Strategy Case Study 1",
      title: "Market Research & Analysis"
    },
    {
      src: "/assets/serviceInfo/brandStratergy/2.jpg",
      alt: "Brand Strategy Case Study 2",
      title: "Brand Positioning & Identity"
    }
  ];

  return (
    <section
      ref={sectionRef}
      className="relative py-20 bg-beige-100 text-charcoal overflow-hidden min-h-screen"
    >
      {/* Decorative background elements */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-20 left-20 w-64 h-64 rounded-full bg-teal-500/10 blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-64 h-64 rounded-full bg-teal-500/10 blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-charcoal">
            Brand Strategy
          </h1>
          <p className="max-w-3xl mx-auto text-lg text-charcoal-muted">
            Comprehensive brand development to establish a strong market position
          </p>
        </motion.div>

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
              A strong brand is more than just a logo – it's the foundation of your business identity and the key to building lasting customer relationships. Our brand strategy services help you define, develop, and communicate your unique value proposition in a crowded marketplace.
            </p>
            <p className="text-charcoal-muted leading-relaxed">
              We work closely with you to understand your business goals, target audience, and competitive landscape. Through strategic analysis and creative thinking, we develop comprehensive brand strategies that position you for success and create meaningful connections with your customers.
            </p>
          </motion.div>

          {/* Features grid */}
          <motion.div variants={itemVariants} className="mb-12">
            <h2 className="text-2xl font-bold mb-6 text-charcoal">What We Offer</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg border border-teal-500/10 shadow-sm">
                <h3 className="text-xl font-semibold mb-3 text-charcoal">Market Research</h3>
                <p className="text-charcoal-muted">Comprehensive analysis of your industry, competitors, and target audience.</p>
              </div>
              <div className="bg-white p-6 rounded-lg border border-teal-500/10 shadow-sm">
                <h3 className="text-xl font-semibold mb-3 text-charcoal">Brand Positioning</h3>
                <p className="text-charcoal-muted">Strategic positioning that differentiates you from competitors.</p>
              </div>
              <div className="bg-white p-6 rounded-lg border border-teal-500/10 shadow-sm">
                <h3 className="text-xl font-semibold mb-3 text-charcoal">Value Proposition</h3>
                <p className="text-charcoal-muted">Clear articulation of your unique value and benefits.</p>
              </div>
              <div className="bg-white p-6 rounded-lg border border-teal-500/10 shadow-sm">
                <h3 className="text-xl font-semibold mb-3 text-charcoal">Brand Voice & Personality</h3>
                <p className="text-charcoal-muted">Consistent brand communication that resonates with your audience.</p>
              </div>
            </div>
          </motion.div>

          {/* Image Gallery */}
          <motion.div variants={itemVariants} className="mb-12">
            <h2 className="text-2xl font-bold mb-6 text-charcoal">Our Case Studies</h2>
            <div className="columns-1 md:columns-2 gap-6 space-y-6">
              {galleryImages.map((image, index) => (
                <motion.div
                  key={index}
                  className="group relative overflow-hidden rounded-lg bg-white border border-teal-500/10 break-inside-avoid mb-6"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-auto object-contain transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-teal-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <h3 className="text-white font-semibold text-lg">{image.title}</h3>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Process section */}
          <motion.div variants={itemVariants}>
            <h2 className="text-2xl font-bold mb-6 text-charcoal">Our Process</h2>
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="bg-teal-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-4 mt-1">1</div>
                <div>
                  <h3 className="text-lg font-semibold text-charcoal mb-2">Discovery & Analysis</h3>
                  <p className="text-charcoal-muted">We conduct thorough research to understand your business, market, and opportunities.</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-teal-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-4 mt-1">2</div>
                <div>
                  <h3 className="text-lg font-semibold text-charcoal mb-2">Strategy Development</h3>
                  <p className="text-charcoal-muted">We develop comprehensive brand strategies based on our research findings.</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-teal-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-4 mt-1">3</div>
                <div>
                  <h3 className="text-lg font-semibold text-charcoal mb-2">Implementation Planning</h3>
                  <p className="text-charcoal-muted">We create detailed implementation plans to execute your brand strategy.</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-teal-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-4 mt-1">4</div>
                <div>
                  <h3 className="text-lg font-semibold text-charcoal mb-2">Ongoing Support</h3>
                  <p className="text-charcoal-muted">We provide continuous support to ensure your brand strategy evolves with your business.</p>
                </div>
              </div>
            </div>
            <br></br>
            <br></br>
            <br></br>
            <WhatsAppButton serviceName="brand strategy" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default BrandStrategy;
