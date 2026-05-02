import { useEffect } from 'react';
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Link } from 'react-router-dom';
import ServiceDetailHero from '../../components/ServiceDetailHero';
import WhatsAppButton from '../../components/WhatsAppButton';
import FlowingMenu from '../../components/FlowingMenu';

export default function WebsiteDesignPage() {
  useEffect(() => {
    document.title = 'Website Design & Development | Krypt Media LLP';
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
        serviceName="Website Design & Development"
        headline="Custom Digital Experiences Designed to Engage"
        subtext="We combine UX thinking, clean development, and strategic planning."
      />

      <section
        ref={sectionRef}
        className="relative py-12 md:py-16 lg:py-20 bg-krypt-cream overflow-hidden"
      >
        {/* Decorative background elements */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-20 left-20 w-32 h-32 md:w-48 md:h-48 lg:w-64 lg:h-64 rounded-full bg-krypt-orange/10 blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-32 h-32 md:w-48 md:h-48 lg:w-64 lg:h-64 rounded-full bg-krypt-orange/10 blur-3xl"></div>
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
                We specialize in creating stunning, high-performance websites that not only look great but also drive real business results. Our team combines cutting-edge design principles with robust development practices to deliver websites that stand out in today's competitive digital landscape.
              </p>
              <p className="text-krypt-charcoal/55 leading-relaxed max-w-2xl mx-auto">
                From initial concept to final deployment, we handle every aspect of your website project with meticulous attention to detail. Whether you need a simple landing page or a complex e-commerce platform, we have the expertise to bring your vision to life.
              </p>
            </motion.div>

            {/* What We Offer — flowing menu */}
            <motion.div variants={itemVariants} className="mb-16">
              <h2 className="text-2xl font-bold mb-8 text-krypt-charcoal text-center">What We Offer</h2>
              <div className="h-[220px] sm:h-[300px] md:h-[400px] rounded-2xl overflow-hidden border border-krypt-olive/10 shadow-inner">
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
              <h2 className="text-2xl font-bold mb-6 text-krypt-charcoal text-center">Our Work</h2>
              <div className="grid md:grid-cols-2 gap-8">
                {/* Original Websites */}
                <div className="text-center">
                  <img
                    src="/assets/serviceInfo/websiteDesign/aramesh.png"
                    alt="Aramesh Website"
                    className="w-full h-40 sm:h-52 md:h-64 object-cover rounded-lg mb-4"
                  />
                  <h3 className="text-lg font-semibold text-krypt-charcoal mb-2">Aramesh Wellness</h3>
                  <p className="text-sm text-krypt-charcoal/60 mb-4 px-2">A serene wellness platform offering therapy and mental health services with a calming user experience.</p>
                  <a
                    href="https://aramesh.in/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block btn-cta text-white font-semibold py-3 px-6 rounded-lg"
                  >
                    Visit Website
                  </a>
                </div>
                <div className="text-center">
                  <img
                    src="/assets/serviceInfo/websiteDesign/gift.png"
                    alt="Customized Gift Website"
                    className="w-full h-40 sm:h-52 md:h-64 object-cover rounded-lg mb-4"
                  />
                  <h3 className="text-lg font-semibold text-krypt-charcoal mb-2">Customized Gift</h3>
                  <p className="text-sm text-krypt-charcoal/60 mb-4 px-2">An e-commerce platform for personalized gifts with custom design tools and seamless checkout.</p>
                  <a
                    href="https://customizedgift.co.in/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block btn-cta text-white font-semibold py-3 px-6 rounded-lg"
                  >
                    Visit Website
                  </a>
                </div>
                <div className="text-center">
                  <img
                    src="/assets/serviceInfo/websiteDesign/lifestyle.png"
                    alt="Goboujee Lifestyle Website"
                    className="w-full h-40 sm:h-52 md:h-64 object-cover rounded-lg mb-4"
                  />
                  <h3 className="text-lg font-semibold text-krypt-charcoal mb-2">Goboujee Lifestyle</h3>
                  <p className="text-sm text-krypt-charcoal/60 mb-4 px-2">Premium lifestyle brand website showcasing luxury products with elegant visual design.</p>
                  <a
                    href="https://goboujeelifestyle.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block btn-cta text-white font-semibold py-3 px-6 rounded-lg"
                  >
                    Visit Website
                  </a>
                </div>

                {/* Projects from Projects Page */}
                <div className="text-center">
                  <img
                    src="/projects/thumbnail/rajhans.png"
                    alt="Rajhans Tours and Travels"
                    className="w-full h-40 sm:h-52 md:h-64 object-cover rounded-lg mb-4"
                  />
                  <h3 className="text-lg font-semibold text-krypt-charcoal mb-2">Rajhans Travels</h3>
                  <p className="text-sm text-krypt-charcoal/60 mb-4 px-2">Travel booking platform with destination guides, package listings, and online reservation system.</p>
                  <a
                    href="https://rajhanstravels.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block btn-cta text-white font-semibold py-3 px-6 rounded-lg"
                  >
                    Visit Website
                  </a>
                </div>
                <div className="text-center">
                  <img
                    src="/projects/thumbnail/darks3k.png"
                    alt="Immersive Dark Edition"
                    className="w-full h-40 sm:h-52 md:h-64 object-cover rounded-lg mb-4"
                  />
                  <h3 className="text-lg font-semibold text-krypt-charcoal mb-2">Immersive Dark Edition</h3>
                  <p className="text-sm text-krypt-charcoal/60 mb-4 px-2">Cinematic dark-themed portfolio showcasing advanced animations and visual effects.</p>
                  <a
                    href="https://the-immersive-dark-edition.vercel.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block btn-cta text-white font-semibold py-3 px-6 rounded-lg"
                  >
                    Visit Website
                  </a>
                </div>
                <div className="text-center">
                  <img
                    src="/projects/thumbnail/dmx.png"
                    alt="DMX RGIT"
                    className="w-full h-40 sm:h-52 md:h-64 object-cover rounded-lg mb-4"
                  />
                  <h3 className="text-lg font-semibold text-krypt-charcoal mb-2">DMX RGIT</h3>
                  <p className="text-sm text-krypt-charcoal/60 mb-4 px-2">College technical fest website with event registration, scheduling, and dynamic content management.</p>
                  <a
                    href="https://www.dmxrgit.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block btn-cta text-white font-semibold py-3 px-6 rounded-lg"
                  >
                    Visit Website
                  </a>
                </div>
                <div className="text-center">
                  <img
                    src="/projects/thumbnail/agrotourism.png"
                    alt="Agrotourism"
                    className="w-full h-40 sm:h-52 md:h-64 object-cover rounded-lg mb-4"
                  />
                  <h3 className="text-lg font-semibold text-krypt-charcoal mb-2">Agrotourism Experience</h3>
                  <p className="text-sm text-krypt-charcoal/60 mb-4 px-2">Farm tourism platform connecting visitors with authentic agricultural experiences and rural stays.</p>
                  <a
                    href="https://agrotourism-liart.vercel.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block btn-cta text-white font-semibold py-3 px-6 rounded-lg"
                  >
                    Visit Website
                  </a>
                </div>

                {/* Additional User Provided Links */}
                <div className="text-center">
                  <img
                    src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=600&auto=format"
                    alt="The Learning Revolution"
                    className="w-full h-40 sm:h-52 md:h-64 object-cover rounded-lg mb-4"
                  />
                  <h3 className="text-lg font-semibold text-krypt-charcoal mb-2">The Learning Revolution</h3>
                  <p className="text-sm text-krypt-charcoal/60 mb-4 px-2">Educational platform promoting innovative learning methods with interactive course showcases.</p>
                  <a
                    href="https://the-learning-revolution.vercel.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block btn-cta text-white font-semibold py-3 px-6 rounded-lg"
                  >
                    Visit Website
                  </a>
                </div>
                <div className="text-center">
                  <img
                    src="https://images.unsplash.com/photo-1558655146-9f40138edfeb?q=80&w=600&auto=format"
                    alt="RB Nu"
                    className="w-full h-40 sm:h-52 md:h-64 object-cover rounded-lg mb-4"
                  />
                  <h3 className="text-lg font-semibold text-krypt-charcoal mb-2">RB Nu</h3>
                  <p className="text-sm text-krypt-charcoal/60 mb-4 px-2">Modern brand showcase with minimalist design aesthetics and smooth user interactions.</p>
                  <a
                    href="https://rb-nu.vercel.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block btn-cta text-white font-semibold py-3 px-6 rounded-lg"
                  >
                    Visit Website
                  </a>
                </div>
                <div className="text-center">
                  <img
                    src="https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=600&auto=format"
                    alt="The Scroll Film"
                    className="w-full h-40 sm:h-52 md:h-64 object-cover rounded-lg mb-4"
                  />
                  <h3 className="text-lg font-semibold text-krypt-charcoal mb-2">The Scroll Film</h3>
                  <p className="text-sm text-krypt-charcoal/60 mb-4 px-2">Film production portfolio featuring scroll-based storytelling and video integration.</p>
                  <a
                    href="https://the-scroll-film.vercel.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block btn-cta text-white font-semibold py-3 px-6 rounded-lg"
                  >
                    Visit Website
                  </a>
                </div>
                <div className="text-center">
                  <img
                    src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=600&auto=format"
                    alt="Krypt Media GSAP Animation"
                    className="w-full h-40 sm:h-52 md:h-64 object-cover rounded-lg mb-4"
                  />
                  <h3 className="text-lg font-semibold text-krypt-charcoal mb-2">Krypt Media Animation</h3>
                  <p className="text-sm text-krypt-charcoal/60 mb-4 px-2">Advanced GSAP animation showcase demonstrating cutting-edge web motion design capabilities.</p>
                  <a
                    href="https://kryptmediagsapanimation.vercel.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block btn-cta text-white font-semibold py-3 px-6 rounded-lg"
                  >
                    Visit Website
                  </a>
                </div>
              </div>
            </motion.div>

            {/* CTA Section */}
            <motion.div variants={itemVariants} className="space-y-6">
              <WhatsAppButton serviceName="website design" />
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
