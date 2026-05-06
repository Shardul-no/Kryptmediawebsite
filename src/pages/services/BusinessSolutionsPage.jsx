import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from "react-intersection-observer";
import { Link } from 'react-router-dom';
import ServiceDetailHero from '../../components/ServiceDetailHero';
import WhatsAppButton from '../../components/WhatsAppButton';
import FlowingMenu from '../../components/FlowingMenu';

// Business Solutions showcase projects
const showcaseProjects = [
  {
    id: 1,
    title: 'Safezy - EHS Management Platform',
    description: 'Safezy is a comprehensive Environment, Health & Safety (EHS) management platform designed to streamline workplace safety operations digitally. The platform helps organizations manage incidents, safety observations, toolbox talks, compliance checklists, PPE tracking, and near-miss reporting through a centralized dashboard. Built for operational efficiency, Safezy improves safety compliance, reporting accuracy, and team accountability across industrial and corporate environments.\n\nKey Features:\n• Incident & Near-Miss Reporting\n• EHS Checklist Management\n• Toolbox Talks & Safety Training\n• PPE Tracking & Compliance\n• Real-Time Dashboard & Reports\n• User-Friendly Admin Panel',
    screenshots: [
      {
        id: 1,
        src: '/buisnessSolution/safezy.jpeg',
        caption: 'Main EHS dashboard with incident reporting and safety metrics',
      },
    ],
  },
  {
    id: 2,
    title: 'My AI Guru - Learning Management System',
    description: 'A scalable and interactive Learning Management System developed to simplify online training, course management, and employee/student learning experiences. The platform enables organizations to create, manage, and deliver digital learning programs with features like course enrollment, progress tracking, assessments, certifications, and role-based access management.\n\nKey Features:\n• Course & Module Management\n• User Progress Tracking\n• Online Assessments & Certifications\n• Role-Based Access Control\n• Interactive Learning Dashboard\n• Mobile-Friendly Interface',
    screenshots: [
      {
        id: 2,
        src: '/buisnessSolution/ai guru 1.jpeg',
        caption: 'Course management interface with enrollment tracking',
      },
      {
        id: 3,
        src: '/buisnessSolution/ai guru 2.jpeg',
        caption: 'Interactive learning dashboard with progress analytics',
      },
    ],
  },
];

// Lightbox Component
function Lightbox({ screenshots, currentIndex, isOpen, onClose, onNext, onPrev }) {
  const currentScreenshot = screenshots[currentIndex];

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose, onNext, onPrev]);

  if (!isOpen || !currentScreenshot) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-krypt-charcoal/95 backdrop-blur-sm overflow-auto p-4"
          onClick={onClose}
        >
          <button
            onClick={onClose}
            className="absolute top-6 right-6 z-10 p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
            aria-label="Close lightbox"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <button
            onClick={(e) => { e.stopPropagation(); onPrev(); }}
            className="absolute left-4 md:left-8 z-10 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
            aria-label="Previous image"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={(e) => { e.stopPropagation(); onNext(); }}
            className="absolute right-4 md:right-8 z-10 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
            aria-label="Next image"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>

          <motion.div
            key={currentScreenshot.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            className="relative max-w-[90vw] max-h-[80vh] w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-video w-full overflow-hidden rounded-lg">
              <img
                src={currentScreenshot.src}
                alt={currentScreenshot.caption}
                className="w-full h-full object-contain"
              />
            </div>
            <div className="mt-4 text-center">
              <p className="text-white/80 font-dm text-sm md:text-base">
                {currentScreenshot.caption}
              </p>
              <p className="text-white/50 text-xs mt-2">
                {currentIndex + 1} / {screenshots.length}
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Screenshot Gallery Component
function ScreenshotGallery({ screenshots }) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openLightbox = (index) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => setLightboxOpen(false);

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % screenshots.length);
  }, [screenshots.length]);

  const goToPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + screenshots.length) % screenshots.length);
  }, [screenshots.length]);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {screenshots.map((screenshot, index) => (
          <motion.button
            key={screenshot.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            onClick={() => openLightbox(index)}
            className="group relative aspect-video rounded-lg overflow-hidden bg-krypt-charcoal/5 hover:shadow-xl transition-all duration-300"
          >
            <img
              src={screenshot.src}
              alt={screenshot.caption}
              className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-krypt-charcoal/0 group-hover:bg-krypt-charcoal/40 transition-colors duration-300 flex items-center justify-center">
              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center">
                  <svg className="w-5 h-5 text-krypt-charcoal" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                  </svg>
                </div>
              </div>
            </div>
          </motion.button>
        ))}
      </div>

      <Lightbox
        screenshots={screenshots}
        currentIndex={currentIndex}
        isOpen={lightboxOpen}
        onClose={closeLightbox}
        onNext={goToNext}
        onPrev={goToPrev}
      />
    </>
  );
}

export default function BusinessSolutionsPage() {
  useEffect(() => {
    document.title = 'Business Solutions | Krypt Media LLP';
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
        serviceName="Business Solutions"
        headline="Digital Solutions That Drive Growth"
        subtext="Streamline operations and scale your business with custom technology."
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
                Modern businesses need modern solutions. Our comprehensive business solutions help you streamline operations, make data-driven decisions, and scale efficiently. We combine technology expertise with business acumen to deliver solutions that drive real growth.
              </p>
              <p className="text-krypt-charcoal/55 leading-relaxed max-w-2xl mx-auto">
                From process automation that eliminates manual work to business intelligence dashboards that provide actionable insights, we architect solutions that fit your unique challenges. Our approach ensures smooth integration with your existing infrastructure while preparing you for future growth.
              </p>
            </motion.div>

            {/* What We Offer — flowing menu */}
            <motion.div variants={itemVariants} className="mb-16">
              <h2 className="text-2xl font-bold mb-8 text-krypt-charcoal text-center">What We Offer</h2>
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

            {/* Showcase Gallery */}
            <motion.div variants={itemVariants} className="mb-16">
              <h2 className="text-2xl font-bold mb-4 text-krypt-charcoal text-center">Our Work</h2>
              <p className="text-krypt-charcoal/55 text-center mb-8 max-w-2xl mx-auto">
                Explore our portfolio of custom business solutions. Click any screenshot to view in full size.
              </p>
              
              {showcaseProjects.map((project, index) => (
                <div key={project.id} className="mb-12 last:mb-0">
                  <div className="mb-6">
                    <h3 className="font-playfair font-bold text-xl text-krypt-charcoal mb-2">
                      {project.title}
                    </h3>
                    <div className="font-dm text-krypt-charcoal/60 whitespace-pre-wrap">
                      {project.description.split('\n\n').map((paragraph, index) => (
                        <p key={index} className={index > 0 ? 'mt-4' : ''}>
                          {paragraph.split('\n').map((line, lineIndex) => (
                            <span key={lineIndex}>
                              {lineIndex > 0 && <br />}
                              {line.startsWith('•') ? (
                                <span className="block ml-4">• {line.slice(1).trim()}</span>
                              ) : (
                                line
                              )}
                            </span>
                          ))}
                        </p>
                      ))}
                    </div>
                  </div>
                  <ScreenshotGallery screenshots={project.screenshots} />
                </div>
              ))}
            </motion.div>

            {/* CTA Section */}
            <motion.div variants={itemVariants} className="space-y-6">
              <WhatsAppButton serviceName="business solutions" />
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
