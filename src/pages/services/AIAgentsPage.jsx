import { useEffect } from 'react';
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Link } from 'react-router-dom';
import ServiceDetailHero from '../../components/ServiceDetailHero';
import WhatsAppButton from '../../components/WhatsAppButton';
import FlowingMenu from '../../components/FlowingMenu';

const applicationAreas = [
  {
    title: 'General Business Assistant',
    description: 'Handle FAQs, route inquiries, qualify prospects, and keep conversations moving without making your team chase every first-touch message.',
  },
  {
    title: 'Follow-Ups and Reminders',
    description: 'Send smart follow-ups for leads, proposals, unpaid invoices, appointments, and abandoned enquiries so opportunities do not go cold.',
  },
  {
    title: 'Automatic Calls and Voice Workflows',
    description: 'Run AI-powered calling flows for appointment confirmations, re-engagement campaigns, post-service check-ins, and inbound call handling.',
  },
  {
    title: 'Sales Qualification',
    description: 'Ask the right questions, capture budgets and requirements, and pass sales-ready leads to your team with clean context.',
  },
  {
    title: 'Customer Support Automation',
    description: 'Resolve repetitive support questions, collect issue details, and escalate only the conversations that need a human touch.',
  },
  {
    title: 'Internal Workflow Agents',
    description: 'Assist with task updates, SOP lookups, report generation, CRM logging, and routine team operations across your existing tools.',
  },
];

export default function AIAgentsPage() {
  useEffect(() => {
    document.title = 'AI Agents | Krypt Media LLP';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

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
    <div className="min-h-screen bg-krypt-cream">
      <ServiceDetailHero
        serviceName="AI Agents"
        headline="Intelligent Agents That Transform Your Business"
        subtext="AI-powered automation and conversations that work 24/7 for you."
      />

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
            <motion.div variants={itemVariants} className="mb-12 text-center">
              <h2 className="text-2xl font-bold mb-4 text-krypt-charcoal">About Our Service</h2>
              <p className="text-krypt-charcoal/55 leading-relaxed mb-6 max-w-2xl mx-auto">
                AI-powered agents are transforming how businesses operate. Our intelligent agent solutions automate repetitive tasks, enhance customer interactions, and provide 24/7 availability—allowing your team to focus on strategic work while AI handles the routine.
              </p>
              <p className="text-krypt-charcoal/55 leading-relaxed max-w-2xl mx-auto">
                From custom chatbots that handle customer inquiries to workflow automation agents that streamline operations, we build AI solutions tailored to your specific business needs. Our agents integrate seamlessly with your existing systems and scale as your business grows.
              </p>
            </motion.div>

            {/* What We Offer — flowing menu */}
            <motion.div variants={itemVariants} className="mb-16">
              <h2 className="text-2xl font-bold mb-8 text-krypt-charcoal text-center">What We Offer</h2>
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

            <motion.div variants={itemVariants} className="mb-16">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold mb-4 text-krypt-charcoal">Where AI Agents Can Be Applied</h2>
                <p className="text-krypt-charcoal/55 leading-relaxed max-w-2xl mx-auto">
                  We took some liberty here and mapped AI agents to the real business use cases teams ask for most often, from general operations to follow-ups and automated calling.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {applicationAreas.map((area) => (
                  <div
                    key={area.title}
                    className="rounded-2xl border border-krypt-olive/15 bg-white/60 backdrop-blur-sm p-6 shadow-sm"
                  >
                    <h3 className="text-lg font-semibold text-krypt-charcoal mb-3">{area.title}</h3>
                    <p className="text-krypt-charcoal/60 leading-relaxed">{area.description}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* CTA Section */}
            <motion.div variants={itemVariants} className="space-y-6">
              <WhatsAppButton serviceName="AI agents" />
              <div className="flex justify-center">
                <Link
                  to="/services"
                  className="inline-flex items-center gap-2 px-6 py-3 border border-krypt-charcoal/20 text-krypt-charcoal font-medium rounded-full hover:border-krypt-orange hover:text-krypt-orange transition-all duration-300"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  Back to Services
                </Link>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
