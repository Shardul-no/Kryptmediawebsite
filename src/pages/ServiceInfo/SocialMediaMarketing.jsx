import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import WhatsAppButton from "../../components/WhatsAppButton";
import TerminalProcess from "../../components/TerminalProcess";
import FlowingMenu from "../../components/FlowingMenu";

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
      className="relative py-20 bg-beige-100 text-charcoal overflow-hidden min-h-screen"
    >
      {/* Decorative background elements */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-20 left-20 w-64 h-64 rounded-full bg-teal-500/10 blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-64 h-64 rounded-full bg-teal-500/10 blur-3xl"></div>
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
            <h2 className="text-2xl font-bold mb-4 text-charcoal">About Our Service</h2>
            <p className="text-charcoal-muted leading-relaxed mb-6">
              In today's digital age, social media is the heartbeat of brand communication. Our comprehensive social media marketing services help businesses build meaningful connections with their audience, increase brand awareness, and drive measurable results across all major platforms.
            </p>
            <p className="text-charcoal-muted leading-relaxed">
              We don't just post content – we create strategic campaigns that resonate with your target audience, build community engagement, and convert followers into loyal customers. Our data-driven approach ensures every post contributes to your business goals.
            </p>
          </motion.div>

          {/* What We Offer — flowing menu */}
          <motion.div variants={itemVariants} className="mb-16">
            <h2 className="text-2xl font-bold mb-8 text-charcoal">What We Offer</h2>
            <div className="h-[400px] rounded-2xl overflow-hidden border border-teal-500/10 shadow-inner">
              <FlowingMenu
                items={[
                  { text: 'Content Strategy', image: 'https://images.unsplash.com/photo-1512486130939-2c4f79935e4f?q=80&w=600&auto=format' },
                  { text: 'Creative Creation', image: 'https://images.unsplash.com/photo-1542744094-24638eff58bb?q=80&w=600&auto=format' },
                  { text: 'Community Management', image: 'https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?q=80&w=600&auto=format' },
                  { text: 'Paid Advertising', image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=600&auto=format' },
                  { text: 'Analytics & Reporting', image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=600&auto=format' },
                  { text: 'Platform Management', image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=600&auto=format' },
                ]}
                bgColor="transparent"
                textColor="#333"
                marqueeBgColor="#0d9488"
                marqueeTextColor="#fff"
                borderColor="rgba(13, 148, 136, 0.1)"
              />
            </div>
          </motion.div>

          {/* Image Gallery */}
          <motion.div variants={itemVariants} className="mb-12">
            <h2 className="text-2xl font-bold mb-6 text-charcoal">Our Work Gallery</h2>
            <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
              {galleryImages.map((image, index) => (
                <motion.div
                  key={index}
                  className="group relative overflow-hidden rounded-lg bg-white border border-teal-500/10 shadow-sm break-inside-avoid mb-6"
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

          {/* Process — terminal style */}
          <motion.div variants={itemVariants}>
            <h2 className="text-2xl font-bold mb-6 text-charcoal">Our Process</h2>
            <TerminalProcess className="mb-10" />
            <WhatsAppButton serviceName="social media marketing" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default SocialMediaMarketing;
