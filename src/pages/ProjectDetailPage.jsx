import { useEffect, useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import projectsData from '../data/projects.json';
import ProjectLayout from '../components/ProjectLayout';

// Dynamic import for project demos
const projectModules = {
  dmx: () => import('../projects/dmx/index.jsx'),
  ecommerce: () => import('../projects/ecommerce/index.jsx'),
  'mumbai-studio': () => import('../projects/mumbai-studio/index.jsx'),
  'gyro-3d': () => import('../projects/gyro-3d/index.jsx'),
  'fitness-club': () => import('../projects/fitness-club/index.jsx'),
  videohut: () => import('../projects/videohut/index.jsx'),
  milton: () => import('../projects/milton/index.jsx'),
  sienna: () => import('../projects/sienna/index.jsx'),
};

export default function ProjectDetailPage() {
  const { projectSlug } = useParams();
  const [ProjectDemo, setProjectDemo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const project = projectsData.find(p => p.slug === projectSlug);

  useEffect(() => {
    if (!project) {
      setError('Project not found');
      setLoading(false);
      return;
    }

    // Set page title
    document.title = `${project.title} | Krypt Media`;

    // Load the project demo
    if (project.hasDemo && projectModules[projectSlug]) {
      projectModules[projectSlug]()
        .then(module => {
          setProjectDemo(() => module.default);
          setLoading(false);
        })
        .catch(err => {
          console.error('Failed to load project:', err);
          setError('Failed to load project demo');
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [projectSlug, project]);

  if (error || !project) {
    return <Navigate to="/projects" replace />;
  }

  const darkBgSlugs = ['videohut', 'sienna', 'milton'];
  const isDark = darkBgSlugs.includes(projectSlug);

  if (loading) {
    return (
      <ProjectLayout title={project.title} darkBg={isDark}>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-krypt-orange mx-auto mb-4"></div>
            <p className="text-krypt-charcoal/55">Loading project demo...</p>
          </div>
        </div>
      </ProjectLayout>
    );
  }

  if (!project.hasDemo) {
    return (
      <ProjectLayout title={project.title} darkBg={isDark}>
        <div className="text-center py-20">
          <h2 className="text-3xl font-bold mb-4">{project.title}</h2>
          <p className="text-krypt-charcoal/55 mb-8">{project.description}</p>
          <div className="bg-white rounded-xl p-8 border border-krypt-olive/10">
            <p className="text-krypt-charcoal/55">Demo coming soon!</p>
          </div>
        </div>
      </ProjectLayout>
    );
  }

  return (
    <ProjectLayout title={project.title} darkBg={isDark}>
      {ProjectDemo ? <ProjectDemo /> : (
        <div className="text-center py-20">
          <p className="text-slate-500">Demo not available</p>
        </div>
      )}
    </ProjectLayout>
  );
}
