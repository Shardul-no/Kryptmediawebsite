import { useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { SLUG_TO_SERVICE } from '../data/serviceSlugs';
import ServiceDetailHero from '../components/ServiceDetailHero';
import WebsiteDesign from './ServiceInfo/WebsiteDesign';
import AIAgents from './ServiceInfo/AIAgents';
import BusinessSolutions from './ServiceInfo/BusinessSolutions';
import DesignServices from './ServiceInfo/DesignServices';

const SERVICE_COMPONENTS = {
  'Website Design & Development': WebsiteDesign,
  'AI Agents': AIAgents,
  'Business Solutions': BusinessSolutions,
  'Design Services': DesignServices,
};

const SERVICE_HERO = {
  'Website Design & Development': {
    headline: 'Custom Digital Experiences Designed to Engage',
    subtext: 'We combine UX thinking, clean development, and strategic planning.',
  },
  'AI Agents': {
    headline: 'Intelligent Agents That Transform Your Business',
    subtext: 'AI-powered automation and conversations that work 24/7 for you.',
  },
  'Business Solutions': {
    headline: 'Digital Solutions That Drive Growth',
    subtext: 'Streamline operations and scale your business with custom technology.',
  },
  'Design Services': {
    headline: 'Visuals That Resonate and Perform',
    subtext: 'From brand identity to marketing assets, we create with purpose.',
  },
};

export default function ServiceDetailPage() {
  const { serviceSlug } = useParams();
  const serviceTitle = SLUG_TO_SERVICE[serviceSlug];

  useEffect(() => {
    if (serviceTitle) {
      document.title = `${serviceTitle} | Krypt Media LLP`;
    }
  }, [serviceTitle]);

  if (!serviceTitle || !SERVICE_COMPONENTS[serviceTitle]) {
    return <Navigate to="/services" replace />;
  }

  const ServiceComponent = SERVICE_COMPONENTS[serviceTitle];
  const heroConfig = SERVICE_HERO[serviceTitle] || {
    headline: `${serviceTitle}`,
    subtext: 'Tailored solutions for your goals.',
  };

  return (
    <div className="min-h-[100dvh] bg-krypt-cream text-krypt-charcoal">
      <ServiceDetailHero
        serviceName={serviceTitle}
        headline={heroConfig.headline}
        subtext={heroConfig.subtext}
      />
      <ServiceComponent />
    </div>
  );
}
