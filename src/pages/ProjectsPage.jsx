import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import projectsData from '../data/projects.json';
import ScrollReveal from '../components/ScrollReveal';
import GradualBlur from '../components/GradualBlur';

export default function ProjectsPage() {
  useEffect(() => {
    document.title = 'Our Projects | Krypt Media LLP';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div id="projects" className="relative bg-krypt-cream text-krypt-charcoal min-h-[100dvh] pt-16 sm:pt-20 md:pt-24 pb-20 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-12 mt-8 lg:mt-0">
        <ScrollReveal containerClassName="!my-0" textClassName="text-krypt-charcoal">
          Projects
        </ScrollReveal>
        <GradualBlur delay={0.15}>
          <p className="text-krypt-charcoal/55 text-lg mt-4 max-w-2xl">
            Interactive demos of our recent work. Click any project to experience it live.
          </p>
        </GradualBlur>
      </div>

      {/* Project Grid — 3 columns with 16:9 cards */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {projectsData.map((project, index) => (
            <motion.div
              key={project.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                type: 'spring',
                stiffness: 90,
                damping: 18,
                delay: index * 0.1,
              }}
              viewport={{ once: true, amount: 0.2 }}
            >
              {project.url ? (
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block relative aspect-video rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500"
                >
                  {/* Hero Image */}
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  {/* Text at Bottom */}
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <span className="text-krypt-orange/90 text-xs font-medium uppercase tracking-wider">
                      {project.tag}
                    </span>
                    <h3 className="text-xl font-bold text-white mt-1 group-hover:text-krypt-apricot transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-white/70 text-sm mt-2 line-clamp-2">
                      {project.description}
                    </p>
                  </div>
                </a>
              ) : (
                <Link
                  to={`/projects/${project.slug}`}
                  className="group block relative aspect-video rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500"
                >
                  {/* Hero Image */}
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  {/* Text at Bottom */}
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <span className="text-krypt-orange/90 text-xs font-medium uppercase tracking-wider">
                      {project.tag}
                    </span>
                    <h3 className="text-xl font-bold text-white mt-1 group-hover:text-krypt-apricot transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-white/70 text-sm mt-2 line-clamp-2">
                      {project.description}
                    </p>
                  </div>
                </Link>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
