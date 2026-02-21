import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import WhatsAppButton from "../../components/WhatsAppButton";
import TerminalProcess from "../../components/TerminalProcess";

const SocialMediaMarketing = () => {
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
      src: "/assets/serviceInfo/socialMediaMarketing/1.jpg",
      alt: "Social Media Marketing Campaign 1",
      title: "Brand Awareness Campaign"
    },
    {
      src: "/assets/serviceInfo/socialMediaMarketing/2.png",
      alt: "Social Media Marketing Campaign 2",
      title: "Engagement Strategy"
    },
    {
      src: "/assets/serviceInfo/socialMediaMarketing/3.jpg",
      alt: "Social Media Marketing Campaign 3",
      title: "Content Creation"
    },
    {
      src: "/assets/serviceInfo/socialMediaMarketing/4.jpg",
      alt: "Social Media Marketing Campaign 4",
      title: "Community Building"
    },
    {
      src: "/assets/serviceInfo/socialMediaMarketing/5.jpg",
      alt: "Social Media Marketing Campaign 5",
      title: "Performance Analytics"
    }
  ];

  return (
    <section 
      ref={sectionRef}
      className="relative py-20 bg-black overflow-hidden min-h-screen"
    >
      {/* Decorative background elements */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute top-20 left-20 w-64 h-64 rounded-full bg-pink-500/20 blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-64 h-64 rounded-full bg-blue-500/20 blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Content */}
        <motion.div
          className="max-w-6xl mx-auto"
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          {/* Main description */}
          <motion.div variants={itemVariants} className="mb-12">
            <h2 className="text-2xl font-bold mb-4 text-white">About Our Service</h2>
            <p className="text-gray-300 leading-relaxed mb-6">
              In today's digital age, social media is the heartbeat of brand communication. Our comprehensive social media marketing services help businesses build meaningful connections with their audience, increase brand awareness, and drive measurable results across all major platforms.
            </p>
            <p className="text-gray-300 leading-relaxed">
              We don't just post content – we create strategic campaigns that resonate with your target audience, build community engagement, and convert followers into loyal customers. Our data-driven approach ensures every post contributes to your business goals.
            </p>
          </motion.div>

          {/* What We Offer — staggered list */}
          <motion.div variants={itemVariants} className="mb-12">
            <h2 className="text-2xl font-bold mb-6 text-white">What We Offer</h2>
            <ul className="space-y-3">
              {[
                'Content Strategy & Planning',
                'Creative Content Creation',
                'Community Management',
                'Paid Advertising',
                'Analytics & Reporting',
                'Platform Management',
              ].map((item, i) => (
                <motion.li
                  key={item}
                  className="flex items-center gap-3 py-2 border-b border-white/5 last:border-0"
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ delay: i * 0.08, duration: 0.45 }}
                >
                  <span className="text-pink-400/80 text-lg">→</span>
                  <span className="text-gray-200">{item}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Image Gallery */}
          <motion.div variants={itemVariants} className="mb-12">
            <h2 className="text-2xl font-bold mb-6 text-white">Our Work Gallery</h2>
            <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
              {galleryImages.map((image, index) => (
                <motion.div
                  key={index}
                  className="group relative overflow-hidden rounded-lg bg-gray-800 break-inside-avoid mb-6"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <img 
                    src={image.src} 
                    alt={image.alt} 
                    className="w-full h-auto object-contain transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <h3 className="text-white font-semibold text-lg">{image.title}</h3>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Process — terminal style */}
          <motion.div variants={itemVariants}>
            <h2 className="text-2xl font-bold mb-6 text-white">Our Process</h2>
            <TerminalProcess className="mb-10" />
            <WhatsAppButton serviceName="social media marketing" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default SocialMediaMarketing;
