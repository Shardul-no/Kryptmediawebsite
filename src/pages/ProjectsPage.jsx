import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import projectsData from '../data/projects.json';
import CircularGallery from '../components/CircularGallery';
import ScrollReveal from '../components/ScrollReveal';
import GradualBlur from '../components/GradualBlur';

const galleryItems = projectsData.map((p) => ({ 
  image: p.image, 
  text: p.title 
}));

export default function ProjectsPage() {
  useEffect(() => {
    document.title = 'Our Projects | Krypt Media';
    // Scroll to top when page loads
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div id="projects" className="relative bg-beige-100 text-charcoal min-h-screen pt-24 pb-20 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <ScrollReveal containerClassName="!my-0" textClassName="text-charcoal">
          Projects
        </ScrollReveal>
        <GradualBlur delay={0.15}>
          <p className="text-charcoal-muted text-lg mt-4 max-w-2xl">
            Interactive demos of our recent work. Click any project to experience it live.
          </p>
        </GradualBlur>
      </div>

      {/* Circular Gallery — scroll/drag to browse */}
      <div className="h-[70vh] min-h-[400px] w-full">
        <CircularGallery
          items={galleryItems}
          bend={3}
          textColor="#1a202c"
          scrollSpeed={2}
          scrollEase={0.06}
        />
      </div>

      {/* Project links — open case study */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="flex flex-wrap justify-center gap-6">
          {projectsData.map((project) => (
            <Link
              key={project.slug}
              to={`/projects/${project.slug}`}
              className="group flex flex-col items-center rounded-xl border border-teal-500/10 bg-white px-8 py-6 hover:border-teal-500/30 transition-all duration-300 shadow-sm hover:shadow-md hover:scale-105"
            >
              <span className="text-teal-600/80 text-sm font-medium">{project.tag}</span>
              <span className="text-xl font-semibold text-charcoal mt-1 group-hover:text-teal-600 transition-colors">
                {project.title}
              </span>
              <p className="text-charcoal-muted text-sm mt-2 text-center max-w-xs">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-1 mt-3 justify-center">
                {project.technologies.map((tech, index) => (
                  <span 
                    key={index}
                    className="text-xs bg-teal-100 text-teal-700 px-2 py-1 rounded"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <span className="text-teal-600 text-sm mt-3 font-medium">
                {project.hasDemo ? '🚀 Try Demo →' : '📋 View Details →'}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
