import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import CircularGallery from '../components/CircularGallery';
import ScrollReveal from '../components/ScrollReveal';
import GradualBlur from '../components/GradualBlur';

const PROJECTS = [
  {
    slug: 'dmx',
    title: 'DMX Website',
    image: 'https://images.unsplash.com/photo-1590004953392-5aba2e72269a?ixlib=rb-1.2.1&auto=format&fit=crop&h=600&w=800&q=80',
    tag: 'UI/UX & Development',
  },
  {
    slug: 'ecommerce',
    title: 'E-commerce Platform',
    image: 'https://images.unsplash.com/photo-1590004845575-cc18b13d1d0a?ixlib=rb-1.2.1&auto=format&fit=crop&h=600&w=800&q=80',
    tag: 'E-commerce',
  },
];

const galleryItems = PROJECTS.map((p) => ({ image: p.image, text: p.title }));

export default function ProjectsPage() {
  useEffect(() => {
    document.title = 'Our Projects | Krypt Media';
  }, []);

  return (
    <div id="projects" className="relative bg-beige-100 text-charcoal min-h-screen pt-24 pb-20 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <ScrollReveal containerClassName="!my-0" textClassName="text-charcoal">
          Projects
        </ScrollReveal>
        <GradualBlur delay={0.15}>
          <p className="text-charcoal-muted text-lg mt-4 max-w-2xl">
            A glimpse into some of our recent work. Scroll or drag the gallery, then open a case study below.
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
          {PROJECTS.map((project) => (
            <Link
              key={project.slug}
              to={`/projects/${project.slug}`}
              className="group flex flex-col items-center rounded-xl border border-teal-500/10 bg-white px-8 py-6 hover:border-teal-500/30 transition-shadow duration-300 shadow-sm hover:shadow-md"
            >
              <span className="text-teal-600/80 text-sm font-medium">{project.tag}</span>
              <span className="text-xl font-semibold text-charcoal mt-1 group-hover:text-teal-600 transition-colors">
                {project.title}
              </span>
              <span className="text-charcoal-muted text-sm mt-2">View case study →</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
