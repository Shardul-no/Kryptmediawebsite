import { useEffect } from 'react';
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Link } from 'react-router-dom';
import ServiceDetailHero from '../../components/ServiceDetailHero';
import WhatsAppButton from '../../components/WhatsAppButton';
import FlowingMenu from '../../components/FlowingMenu';

const applicationAreas = [
  {
    title: 'Social Media Campaigns',
    description: 'Posts, stories, carousels, ad creatives, and launch visuals built to stop the scroll and strengthen your brand recall.',
  },
  {
    title: 'Sales and Marketing Collateral',
    description: 'Brochures, pitch decks, flyers, catalogs, and presentation systems that make offers clearer and more persuasive.',
  },
  {
    title: 'Brand Identity Systems',
    description: 'Logos, color systems, typography, packaging directions, and style guides that make your business look consistent everywhere.',
  },
  {
    title: 'Event and Promotional Design',
    description: 'Standees, banners, invitations, booth graphics, merchandise, and seasonal campaign assets designed for real-world visibility.',
  },
  {
    title: 'Business Communication Design',
    description: 'Company profiles, proposal templates, internal documents, certificates, and branded stationery that elevate everyday communication.',
  },
  {
    title: 'Product and Service Launch Assets',
    description: 'Teasers, announcement creatives, explainer graphics, and promo kits created to support launches across digital and print touchpoints.',
  },
];

export default function DesignServicesPage() {
  useEffect(() => {
    document.title = 'Design Services | Krypt Media LLP';
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
        serviceName="Design Services"
        headline="Visuals That Resonate and Perform"
        subtext="From brand identity to marketing assets, we create with purpose."
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
                Great design is the foundation of effective brand communication. Our design services create visual assets that not only look stunning but also convey your message clearly and drive action from your audience.
              </p>
              <p className="text-krypt-charcoal/55 leading-relaxed max-w-2xl mx-auto">
                From print materials to digital assets, we ensure every design element aligns with your brand identity and business objectives. Our creative team combines artistic vision with strategic thinking to deliver designs that make an impact.
              </p>
            </motion.div>

            {/* What We Offer — flowing menu */}
            <motion.div variants={itemVariants} className="mb-16">
              <h2 className="text-2xl font-bold mb-8 text-krypt-charcoal text-center">What We Offer</h2>
              <div className="h-[400px] rounded-2xl overflow-hidden border border-krypt-olive/10 shadow-inner">
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

            <motion.div variants={itemVariants} className="mb-16">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold mb-4 text-krypt-charcoal">Where Design Services Are Applied</h2>
                <p className="text-krypt-charcoal/55 leading-relaxed max-w-2xl mx-auto">
                  Beyond making things look good, we shaped this section around the places design directly supports growth, visibility, and stronger day-to-day brand communication.
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
              <WhatsAppButton serviceName="design services" />
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
