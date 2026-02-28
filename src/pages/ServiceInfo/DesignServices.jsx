import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import WhatsAppButton from "../../components/WhatsAppButton";
import TerminalProcess from "../../components/TerminalProcess";
import FlowingMenu from "../../components/FlowingMenu";

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
          className="max-w-4xl mx-auto"
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          {/* Main description */}
          <motion.div variants={itemVariants} className="mb-12">
            <h2 className="text-2xl font-bold mb-4 text-charcoal">About Our Service</h2>
            <p className="text-charcoal-muted leading-relaxed mb-6">
              Great design is the foundation of effective brand communication. Our design services create visual assets that not only look stunning but also convey your message clearly and drive action from your audience.
            </p>
            <p className="text-charcoal-muted leading-relaxed">
              From print materials to digital assets, we ensure every design element aligns with your brand identity and business objectives. Our creative team combines artistic vision with strategic thinking to deliver designs that make an impact.
            </p>
          </motion.div>

          {/* What We Offer — flowing menu */}
          <motion.div variants={itemVariants} className="mb-16">
            <h2 className="text-2xl font-bold mb-8 text-charcoal">What We Offer</h2>
            <div className="h-[400px] rounded-2xl overflow-hidden border border-teal-500/10 shadow-inner">
              <FlowingMenu
                items={[
                  { text: 'Brand Identity', image: 'https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=600&auto=format' },
                  { text: 'Print Design', image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=600&auto=format' },
                  { text: 'Digital Assets', image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=600&auto=format' },
                  { text: 'Promotional Materials', image: 'https://images.unsplash.com/photo-1509343256512-d77a5cb3791b?q=80&w=600&auto=format' },
                  { text: 'Event Design', image: 'https://images.unsplash.com/photo-1505373630562-4029295d83e2?q=80&w=600&auto=format' },
                  { text: 'Style Guides', image: 'https://images.unsplash.com/photo-1586717791821-3f44a563dc4c?q=80&w=600&auto=format' },
                ]}
                bgColor="transparent"
                textColor="#333"
                marqueeBgColor="#0d9488"
                marqueeTextColor="#fff"
                borderColor="rgba(13, 148, 136, 0.1)"
              />
            </div>
          </motion.div>

          {/* Process — terminal style */}
          <motion.div variants={itemVariants}>
            <h2 className="text-2xl font-bold mb-6 text-charcoal">Our Process</h2>
            <TerminalProcess className="mb-10" />
            <WhatsAppButton serviceName="design services" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default DesignServices;
