import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import WhatsAppButton from "../../components/WhatsAppButton";
import TerminalProcess from "../../components/TerminalProcess";
import FlowingMenu from "../../components/FlowingMenu";

const BusinessSolutions = () => {
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
      className="relative py-20 bg-krypt-cream text-krypt-charcoal overflow-hidden min-h-screen"
    >
      {/* Decorative background elements */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-20 left-20 w-64 h-64 rounded-full bg-krypt-orange/10 blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-64 h-64 rounded-full bg-krypt-orange/10 blur-3xl"></div>
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
            <h2 className="text-2xl font-bold mb-4 text-krypt-charcoal">About Our Service</h2>
            <p className="text-krypt-charcoal/55 leading-relaxed mb-6">
              Modern businesses need modern solutions. Our comprehensive business solutions help you streamline operations, make data-driven decisions, and scale efficiently. We combine technology expertise with business acumen to deliver solutions that drive real growth.
            </p>
            <p className="text-krypt-charcoal/55 leading-relaxed">
              From process automation that eliminates manual work to business intelligence dashboards that provide actionable insights, we architect solutions that fit your unique challenges. Our approach ensures smooth integration with your existing infrastructure while preparing you for future growth.
            </p>
          </motion.div>

          {/* What We Offer — flowing menu */}
          <motion.div variants={itemVariants} className="mb-16">
            <h2 className="text-2xl font-bold mb-8 text-krypt-charcoal">What We Offer</h2>
            <div className="h-[400px] rounded-2xl overflow-hidden border border-krypt-olive/10 shadow-inner">
              <FlowingMenu
                items={[
                  { text: 'Process Automation', image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=600&auto=format' },
                  { text: 'CRM Integration', image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=600&auto=format' },
                  { text: 'Data Analytics', image: 'https://images.unsplash.com/photo-1551288049-bbbda5366391?q=80&w=600&auto=format' },
                  { text: 'Cloud Solutions', image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=600&auto=format' },
                  { text: 'Custom Software', image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=600&auto=format' },
                  { text: 'Digital Transformation', image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=600&auto=format' },
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
            <h2 className="text-2xl font-bold mb-6 text-krypt-charcoal">Our Process</h2>
            <TerminalProcess className="mb-10" />
            <WhatsAppButton serviceName="business solutions" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default BusinessSolutions;
