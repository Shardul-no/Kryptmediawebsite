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
    document.title = 'Our Projects | Krypt Media LLP';
    // Scroll to top when page loads
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div id="projects" className="relative bg-tan-100 text-charcoal min-h-[100dvh] pt-16 sm:pt-20 md:pt-24 pb-20 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-12 mt-8 lg:mt-0">
        <ScrollReveal containerClassName="!my-0" textClassName="text-charcoal">
          Projects
        </ScrollReveal>
        <GradualBlur delay={0.15}>
          <p className="text-slate-500 text-lg mt-4 max-w-2xl">
            Interactive demos of our recent work. Click any project to experience it live.
          </p>
        </GradualBlur>
      </div>

      {/* Project links — open case study */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="flex flex-wrap justify-center gap-6">
          {projectsData.map((project) => (
            project.url ? (
              <a
                key={project.slug}
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col items-center rounded-xl border border-coffee/10 bg-white px-8 py-6 hover:border-coffee/30 transition-all duration-300 shadow-sm hover:shadow-md hover:scale-105"
              >
                <span className="text-caput-mortuum/80 text-sm font-medium">{project.tag}</span>
                <span className="text-xl font-semibold text-charcoal mt-1 group-hover:text-caput-mortuum transition-colors">
                  {project.title}
                </span>
                <p className="text-slate-500 text-sm mt-2 text-center max-w-xs">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-1 mt-3 justify-center">
                  {project.technologies.map((tech, index) => (
                    <span
                      key={index}
                      className="text-xs bg-tan-100 text-caput-mortuum px-2 py-1 rounded"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <span className="text-caput-mortuum text-sm mt-3 font-medium">
                  🔗 Visit Website →
                </span>
              </a>
            ) : (
              <Link
                key={project.slug}
                to={`/projects/${project.slug}`}
                className="group flex flex-col items-center rounded-xl border border-coffee/10 bg-white px-8 py-6 hover:border-coffee/30 transition-all duration-300 shadow-sm hover:shadow-md hover:scale-105"
              >
                <span className="text-caput-mortuum/80 text-sm font-medium">{project.tag}</span>
                <span className="text-xl font-semibold text-charcoal mt-1 group-hover:text-caput-mortuum transition-colors">
                  {project.title}
                </span>
                <p className="text-slate-500 text-sm mt-2 text-center max-w-xs">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-1 mt-3 justify-center">
                  {project.technologies.map((tech, index) => (
                    <span
                      key={index}
                      className="text-xs bg-tan-100 text-caput-mortuum px-2 py-1 rounded"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <span className="text-caput-mortuum text-sm mt-3 font-medium">
                  {project.hasDemo ? '🚀 Try Demo →' : '📋 View Details →'}
                </span>
              </Link>
            )
          ))}
        </div>
      </div>

      {/* Circular Gallery — scroll/drag to browse */}
      <div className="h-[50vh] sm:h-[60vh] md:h-[70vh] min-h-[300px] sm:min-h-[400px] w-full">
        <CircularGallery
          items={galleryItems}
          bend={3}
          textColor="#1a202c"
          scrollSpeed={2}
          scrollEase={0.06}
        />
      </div>
    </div>
  );
}
