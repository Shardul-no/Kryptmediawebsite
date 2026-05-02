import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import './App.css';
import MainLayout        from './layouts/MainLayout';
import ProjectLayout     from './components/ProjectLayout';
import HomePage          from './pages/HomePage';
import ServicesPage      from './pages/ServicesPage';
import WebsiteDesignPage from './pages/services/WebsiteDesignPage';
import AIAgentsPage      from './pages/services/AIAgentsPage';
import BusinessSolutionsPage from './pages/services/BusinessSolutionsPage';
import DesignServicesPage from './pages/services/DesignServicesPage';
import ProjectsPage      from './pages/ProjectsPage';
import ProjectDetailPage from './pages/ProjectDetailPage';
import AboutPage         from './pages/AboutPage';
import TestimonialsPage  from './pages/TestimonialsPage';
import ContactPageRoute  from './pages/ContactPageRoute';

function App() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="no-scrollbar">
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
    </div>
  );
}

export default App;
