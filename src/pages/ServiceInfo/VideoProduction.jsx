import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import WhatsAppButton from "../../components/WhatsAppButton";

const VideoProduction = () => {
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
      className="relative py-20 bg-black overflow-hidden"
    >
      {/* Decorative background elements */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute top-20 left-20 w-64 h-64 rounded-full bg-red-500/20 blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-64 h-64 rounded-full bg-orange-500/20 blur-3xl"></div>
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
            Video Production
          </h1>
          <p className="max-w-3xl mx-auto text-lg text-gray-400">
            Captivating visual storytelling across various formats to showcase your brand
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
              Video is the most engaging form of content in today's digital landscape. Our professional video production services help businesses tell their stories, showcase their products, and connect with their audience through compelling visual narratives.
            </p>
            <p className="text-gray-300 leading-relaxed">
              From concept development to final delivery, we handle every aspect of video production with cinematic quality and attention to detail. Whether you need product videos, brand stories, or social media content, we create videos that capture attention and drive engagement.
            </p>
          </motion.div>

          {/* Features grid */}
          <motion.div variants={itemVariants} className="mb-12">
            <h2 className="text-2xl font-bold mb-6 text-white">What We Offer</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gray-800 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-3 text-white">Product Photoshoots</h3>
                <p className="text-gray-300">Professional product photography that showcases your offerings in the best light.</p>
              </div>
              <div className="bg-gray-800 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-3 text-white">Explanatory Videos</h3>
                <p className="text-gray-300">Clear, engaging videos that explain complex concepts and processes.</p>
              </div>
              <div className="bg-gray-800 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-3 text-white">Animated Videos</h3>
                <p className="text-gray-300">Creative animations that bring your ideas to life with visual appeal.</p>
              </div>
              <div className="bg-gray-800 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-3 text-white">Social Media Content</h3>
                <p className="text-gray-300">Short-form videos optimized for platforms like Instagram, TikTok, and YouTube.</p>
              </div>
            </div>
          </motion.div>

          {/* Embedded content */}
          <motion.div variants={itemVariants} className="mb-12">
            <h2 className="text-2xl font-bold mb-6 text-white">Our Work</h2>
            
            {/* Horizontal scroll for reels */}
            <div className="flex space-x-6 overflow-x-auto pb-4 snap-x">
              {[
                "DMlADvbtjP3",
                "DJbYg07Jn4y",
                "DL4x9NaSSC2"
              ].map((id, i) => (
                <div 
                  key={i} 
                  className="snap-start min-w-[280px] bg-gray-900 rounded-2xl shadow-lg p-4"
                >
                  <iframe
                    src={`https://www.instagram.com/reel/${id}/embed`}
                    className="w-full h-[360px] rounded-xl border-0"
                    title={`Instagram Reel ${i + 1}`}
                    allowFullScreen
                  ></iframe>
                  <p className="text-xs text-gray-400 mt-2">
                    Click to view full reel on Instagram
                  </p>
                </div>
              ))}

              {/* Google Drive video in same row */}
              <div className="snap-start min-w-[320px] bg-gray-900 rounded-2xl shadow-lg p-4">
                <iframe
                  src="https://drive.google.com/file/d/1QDMobi-2LFAW5UIte60S19Xl6wq-IMZq/preview"
                  className="w-full h-[360px] rounded-xl border-0"
                  title="Google Drive Video"
                  allowFullScreen
                ></iframe>
                <p className="text-xs text-gray-400 mt-2">
                  Click to view full video on Google Drive
                </p>
              </div>
            </div>
          </motion.div>

          {/* Process section */}
          <motion.div variants={itemVariants}>
            <h2 className="text-2xl font-bold mb-6 text-white">Our Process</h2>
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-4 mt-1">1</div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Pre-Production</h3>
                  <p className="text-gray-300">We develop concepts, write scripts, and plan every detail of your video project.</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-4 mt-1">2</div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Production</h3>
                  <p className="text-gray-300">Our professional crew captures high-quality footage with state-of-the-art equipment.</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-4 mt-1">3</div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Post-Production</h3>
                  <p className="text-gray-300">We edit, add effects, and polish your video to perfection.</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-4 mt-1">4</div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Delivery</h3>
                  <p className="text-gray-300">We deliver your final video in multiple formats optimized for different platforms.</p>
                </div>
              </div>
            </div>
            <br></br>
            <br></br>
            <br></br>
            <WhatsAppButton serviceName="video production" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default VideoProduction;
