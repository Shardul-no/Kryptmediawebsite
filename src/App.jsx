import { useEffect, lazy, Suspense } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import './App.css';
import MainLayout        from './layouts/MainLayout';
import ProjectLayout     from './components/ProjectLayout';
import HomePage          from './pages/HomePage';

// Lazy-loaded pages — defers Three.js / heavy animation bundles until first visit
const ServicesPage           = lazy(() => import('./pages/ServicesPage'));
const WebsiteDesignPage      = lazy(() => import('./pages/services/WebsiteDesignPage'));
const AIAgentsPage           = lazy(() => import('./pages/services/AIAgentsPage'));
const BusinessSolutionsPage  = lazy(() => import('./pages/services/BusinessSolutionsPage'));
const DesignServicesPage     = lazy(() => import('./pages/services/DesignServicesPage'));
const ProjectsPage           = lazy(() => import('./pages/ProjectsPage'));
const ProjectDetailPage      = lazy(() => import('./pages/ProjectDetailPage'));
const AboutPage              = lazy(() => import('./pages/AboutPage'));
const TestimonialsPage       = lazy(() => import('./pages/TestimonialsPage'));
const ContactPageRoute       = lazy(() => import('./pages/ContactPageRoute'));

function App() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="no-scrollbar">
      <Suspense fallback={<div className="min-h-screen bg-krypt-cream" />}>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<HomePage />} />
            <Route path="services" element={<ServicesPage />} />
            <Route path="services/website-design" element={<WebsiteDesignPage />} />
            <Route path="services/ai-agents" element={<AIAgentsPage />} />
            <Route path="services/business-solutions" element={<BusinessSolutionsPage />} />
            <Route path="services/design-services" element={<DesignServicesPage />} />
            <Route path="projects" element={<ProjectsPage />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="testimonials" element={<TestimonialsPage />} />
            <Route path="contact" element={<ContactPageRoute />} />
          </Route>
          {/* Project demos bypass MainLayout — no shared navbar/footer */}
          <Route path="projects/:projectSlug" element={<ProjectDetailPage />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
