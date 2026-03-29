import { Link } from 'react-router-dom';

const footerLinks = {
  Menu: [
    { label: 'Home',         to: '/'            },
    { label: 'Work',         to: '/projects'    },
    { label: 'Process',      to: '/about'       },
    { label: 'Pricing',      to: '/contact'     },
    { label: 'Contact',      to: '/contact'     },
  ],
  Explore: [
    { label: 'Why Velocity', to: '/about'       },
    { label: 'Services',     to: '/services'    },
    { label: 'Testimonials', to: '/testimonials'},
  ],
};

const socials = [
  {
    name: 'Instagram',
    href: 'https://instagram.com/krypt_media345',
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.791-4-4s1.791-4 4-4 4 1.791 4 4-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    ),
  },
  {
    name: 'Twitter / X',
    href: 'https://twitter.com/krypt_media345',
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.747l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    name: 'LinkedIn',
    href: 'https://linkedin.com/company/krypt-media',
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" />
      </svg>
    ),
  },
];

export default function Footer() {
  return (
    <footer className="bg-krypt-charcoal text-krypt-sand/60 pt-20 pb-10 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">

        {/* Top grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-white/8">

          {/* Brand column */}
          <div className="md:col-span-5">
            <Link to="/" className="block mb-6">
              <img src="/logo.png" alt="Krypt Media" className="h-12 w-auto brightness-0 invert opacity-80" />
            </Link>
            <p className="font-playfair italic text-krypt-sand/50 text-lg mb-6 max-w-xs leading-relaxed">
              Helping founders launch faster with high-converting digital experiences.
            </p>
            <div className="space-y-2 text-sm font-dm">
              <p>
                <a href="mailto:kryptmedia24@gmail.com" className="hover:text-krypt-orange transition-colors">
                  kryptmedia24@gmail.com
                </a>
              </p>
              <p>
                <a href="tel:+918928030419" className="hover:text-krypt-orange transition-colors">
                  +91 89280 30419
                </a>
              </p>
              <p className="text-krypt-sand/35">Mumbai, India · krypt.in</p>
            </div>

            {/* CTA */}
            <Link
              to="/contact"
              className="inline-block mt-8 px-6 py-2.5 bg-krypt-orange text-white font-dm text-sm font-medium rounded-full hover:bg-krypt-apricot transition-colors duration-300"
            >
              Start a Project
            </Link>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([section, links]) => (
            <div key={section} className="md:col-span-2">
              <h4 className="font-dm font-medium text-krypt-sand/40 text-xs tracking-[0.2em] uppercase mb-5">
                {section}
              </h4>
              <ul className="space-y-3">
                {links.map(({ label, to }) => (
                  <li key={label}>
                    <Link
                      to={to}
                      className="font-dm text-sm text-krypt-sand/60 hover:text-krypt-orange transition-colors duration-200"
                      onClick={() => window.scrollTo(0, 0)}
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Co-founders */}
          <div className="md:col-span-3">
            <h4 className="font-dm font-medium text-krypt-sand/40 text-xs tracking-[0.2em] uppercase mb-5">
              The Team
            </h4>
            <div className="space-y-4">
              {[
                { name: 'Priyanshu Naik',       role: 'Co-Founder' },
                { name: 'Taniksh Waingankar',   role: 'Co-Founder' },
                { name: 'Kartik Mistry',         role: 'CTO' },
              ].map(({ name, role }) => (
                <div key={name}>
                  <p className="font-dm text-sm text-krypt-sand/70 font-medium">{name}</p>
                  <p className="font-dm text-xs text-krypt-sand/35">{role}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-5">
          <p className="font-dm text-xs text-krypt-sand/30">
            © 2026 Krypt Media LLP. All rights reserved.
          </p>

          {/* Tagline */}
          <p className="font-cormorant italic text-krypt-orange/50 text-base tracking-wide">
            DECODE · DELIVER · DOMINATE
          </p>

          {/* Socials */}
          <div className="flex items-center gap-4">
            {socials.map(({ name, href, icon }) => (
              <a
                key={name}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                title={name}
                className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-krypt-sand/40 hover:text-krypt-orange hover:border-krypt-orange/40 transition-all duration-200"
              >
                {icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
