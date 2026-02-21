import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import WhatsAppButton from "../../components/WhatsAppButton";

const ContentWriting = () => {
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
      src: "/assets/serviceInfo/contentWriting/1.png",
      alt: "Content Writing Example 1",
      title: "Technical Documentation"
    },
    {
      src: "/assets/serviceInfo/contentWriting/2.png",
      alt: "Content Writing Example 2",
      title: "Marketing Copy"
    },
    {
      src: "/assets/serviceInfo/contentWriting/3.png",
      alt: "Content Writing Example 3",
      title: "Blog Content"
    }
  ];

  return (
    <section 
      ref={sectionRef}
      className="relative py-20 bg-black overflow-hidden min-h-screen"
    >
      {/* Decorative background elements */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute top-20 left-20 w-64 h-64 rounded-full bg-green-500/20 blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-64 h-64 rounded-full bg-teal-500/20 blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            Content Writing
          </h1>
          <p className="max-w-3xl mx-auto text-lg text-gray-400">
            Strategic content creation across formats to engage your target audience
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
            <h2 className="text-2xl font-bold mb-4 text-white">About Our Service</h2>
            <p className="text-gray-300 leading-relaxed mb-6">
              Content is king in the digital world, and quality writing is what separates successful brands from the rest. Our content writing services create compelling, engaging, and SEO-optimized content that resonates with your audience and drives results.
            </p>
            <p className="text-gray-300 leading-relaxed">
              From technical documentation to creative marketing copy, our experienced writers understand how to craft content that not only informs but also inspires action. We ensure every piece of content aligns with your brand voice and business objectives.
            </p>
          </motion.div>

          {/* Features grid */}
          <motion.div variants={itemVariants} className="mb-12">
            <h2 className="text-2xl font-bold mb-6 text-white">What We Offer</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gray-800 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-3 text-white">Technical Writing</h3>
                <p className="text-gray-300">Clear, concise technical documentation and user guides.</p>
              </div>
              <div className="bg-gray-800 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-3 text-white">Marketing Copy</h3>
                <p className="text-gray-300">Compelling copy that drives conversions and brand awareness.</p>
              </div>
              <div className="bg-gray-800 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-3 text-white">Professional Writing</h3>
                <p className="text-gray-300">Resumes, cover letters, and professional documents.</p>
              </div>
              <div className="bg-gray-800 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-3 text-white">Blog & SEO Content</h3>
                <p className="text-gray-300">Engaging blog posts optimized for search engines.</p>
              </div>
            </div>
          </motion.div>

          {/* Image Gallery */}
          <motion.div variants={itemVariants} className="mb-12">
            <h2 className="text-2xl font-bold mb-6 text-white">Our Writing Samples</h2>
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

          {/* Process section */}
          <motion.div variants={itemVariants}>
            <h2 className="text-2xl font-bold mb-6 text-white">Our Process</h2>
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-4 mt-1">1</div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Research & Planning</h3>
                  <p className="text-gray-300">We research your topic, audience, and industry to create a content strategy.</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-4 mt-1">2</div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Content Creation</h3>
                  <p className="text-gray-300">Our writers craft engaging, well-researched content tailored to your needs.</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-4 mt-1">3</div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Review & Revision</h3>
                  <p className="text-gray-300">We review and revise content based on your feedback and requirements.</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-4 mt-1">4</div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Final Delivery</h3>
                  <p className="text-gray-300">We deliver polished, ready-to-publish content in your preferred format.</p>
                </div>
              </div>
            </div>
            <br></br>
            <br></br>
            <br></br>
            <WhatsAppButton serviceName="content writing" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContentWriting;
