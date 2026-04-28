import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import WhatsAppButton from "../../components/WhatsAppButton";
import TerminalProcess from "../../components/TerminalProcess";
import FlowingMenu from "../../components/FlowingMenu";

const AIAgents = () => {
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
              AI-powered agents are transforming how businesses operate. Our intelligent agent solutions automate repetitive tasks, enhance customer interactions, and provide 24/7 availability—allowing your team to focus on strategic work while AI handles the routine.
            </p>
            <p className="text-krypt-charcoal/55 leading-relaxed">
              From custom chatbots that handle customer inquiries to workflow automation agents that streamline operations, we build AI solutions tailored to your specific business needs. Our agents integrate seamlessly with your existing systems and scale as your business grows.
            </p>
          </motion.div>

          {/* What We Offer — flowing menu */}
          <motion.div variants={itemVariants} className="mb-16">
            <h2 className="text-2xl font-bold mb-8 text-krypt-charcoal">What We Offer</h2>
            <div className="h-[400px] rounded-2xl overflow-hidden border border-krypt-olive/10 shadow-inner">
              <FlowingMenu
                items={[
                  { text: 'AI Chatbots', image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=600&auto=format' },
                  { text: 'Virtual Assistants', image: 'https://images.unsplash.com/photo-1531746790731-6c087fecd65a?q=80&w=600&auto=format' },
                  { text: 'Workflow Automation', image: 'https://images.unsplash.com/photo-1551288049-bbbda5366391?q=80&w=600&auto=format' },
                  { text: 'Customer Support AI', image: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?q=80&w=600&auto=format' },
                  { text: 'NLP Solutions', image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=600&auto=format' },
                  { text: 'AI Integration', image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=600&auto=format' },
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
            <WhatsAppButton serviceName="AI agents" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default AIAgents;
