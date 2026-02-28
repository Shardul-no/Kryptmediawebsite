import { useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { SLUG_TO_SERVICE } from '../data/serviceSlugs';
import ServiceDetailHero from '../components/ServiceDetailHero';
import WebsiteDesign from './ServiceInfo/WebsiteDesign';
import SocialMediaMarketing from './ServiceInfo/SocialMediaMarketing';
import DesignServices from './ServiceInfo/DesignServices';

const SERVICE_COMPONENTS = {
  'Website Design & Development': WebsiteDesign,
  'Social Media Marketing': SocialMediaMarketing,
  'Design Services': DesignServices,
};

const SERVICE_HERO = {
  'Website Design & Development': {
    headline: 'Custom Digital Experiences Designed to Engage',
    subtext: 'We combine UX thinking, clean development, and strategic planning.',
  },
  'Social Media Marketing': {
    headline: 'Campaigns That Connect and Convert',
    subtext: 'Strategy, content, and community—built to grow your audience.',
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
      document.title = `${serviceTitle} | Krypt Media`;
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
    <div className="min-h-screen bg-beige-100 text-charcoal">
      <ServiceDetailHero
        serviceName={serviceTitle}
        headline={heroConfig.headline}
        subtext={heroConfig.subtext}
      />
      <ServiceComponent />
    </div>
  );
}
