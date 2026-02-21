import React from 'react';
import { Link } from 'react-router-dom';
import footerData from '../data/footer.json';

const isInternalLink = (url) => url.startsWith('/');

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center mb-4">
              <img 
                src={footerData.companyInfo.logo} 
                alt={footerData.companyInfo.name}
                className="h-8 w-8 mr-3"
              />
              <h3 className="text-xl font-bold">{footerData.companyInfo.name}</h3>
            </div>
            <p className="text-gray-300 mb-4 text-sm">
              {footerData.companyInfo.description}
            </p>
            <div className="space-y-2">
              <p className="text-sm text-gray-300">
                📧 {footerData.contactInfo.email}
              </p>
              <p className="text-sm text-gray-300">
                📞 {footerData.contactInfo.phone}
              </p>
              <p className="text-sm text-gray-300">
                📍 {footerData.contactInfo.address}
              </p>
            </div>
          </div>

          {/* Quick Links */}
          {footerData.quickLinks.map((section, index) => (
            <div key={index}>
              <h4 className="text-lg font-semibold mb-4">{section.title}</h4>
              <ul className="space-y-2">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    {isInternalLink(link.url) ? (
                      <Link
                        to={link.url}
                        className="text-gray-300 hover:text-white transition-colors duration-200 text-sm"
                      >
                        {link.name}
                      </Link>
                    ) : (
                      <a
                        href={link.url}
                        className="text-gray-300 hover:text-white transition-colors duration-200 text-sm"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {link.name}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Social Media */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
            <div className="flex space-x-4">
              {footerData.socialMedia.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-white transition-colors duration-200 text-2xl"
                  title={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-300 text-sm mb-4 md:mb-0">
              {footerData.copyright}
            </p>
            <div className="flex space-x-6">
              <a 
                href="#" 
                className="text-gray-300 hover:text-white transition-colors duration-200 text-sm"
              >
                {footerData.privacyPolicy}
              </a>
              <a 
                href="#" 
                className="text-gray-300 hover:text-white transition-colors duration-200 text-sm"
              >
                {footerData.termsOfService}
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
