import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

const navLinks = [
  { path: '/services',      name: 'Services' },
  { path: '/projects',      name: 'Work' },
  { path: '/about',         name: 'About' },
  { path: '/testimonials',  name: 'Testimonials' },
];

export default function Navbar() {
  const [isOpen,   setIsOpen]   = useState(false);
  const location = useLocation();

  const isHome = location.pathname === '/';

  // Close mobile menu on route change
  useEffect(() => setIsOpen(false), [location.pathname]);

  const isActive = (path) =>
    path === '/' ? location.pathname === '/' : location.pathname.startsWith(path);

  const navBg = 'bg-[#1c1e23]';

  const linkColor = (path) => {
    if (isActive(path)) return 'text-krypt-orange';
    return 'text-white/80 hover:text-white';
  };

  const hamColor = 'bg-white';

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ${navBg}`}>
      <div className="max-w-7xl mx-auto px-6 md:px-12 h-20 flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="flex-shrink-0">
          <img src="/whitelogo.png" alt="Krypt Media" className="h-16 w-auto" />
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map(({ path, name }) => (
            <Link
              key={path}
              to={path}
              className={`font-dm text-sm font-medium transition-colors duration-200 ${linkColor(path)}`}
            >
              {name}
            </Link>
          ))}
          <Link
            to="/contact"
            className="ml-2 px-6 py-2.5 bg-krypt-orange text-white font-dm text-sm font-medium rounded-full hover:bg-krypt-apricot transition-colors duration-300 shadow-md shadow-krypt-orange/25"
          >
            Start a Project
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setIsOpen((o) => !o)}
          className="md:hidden w-10 h-10 flex flex-col items-center justify-center gap-[5px]"
          aria-label="Toggle menu"
        >
          <span className={`block h-0.5 w-6 rounded-full transition-all duration-300 ${hamColor} ${isOpen ? 'rotate-45 translate-y-[7px]' : ''}`} />
          <span className={`block h-0.5 w-6 rounded-full transition-all duration-300 ${hamColor} ${isOpen ? 'opacity-0' : ''}`} />
          <span className={`block h-0.5 w-6 rounded-full transition-all duration-300 ${hamColor} ${isOpen ? '-rotate-45 -translate-y-[7px]' : ''}`} />
        </button>
      </div>

      {/* Mobile menu */}
      <motion.div
        initial={false}
        animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.32, ease: [0.25, 0.1, 0.25, 1] }}
        className="md:hidden overflow-hidden bg-[#1c1e23] border-t border-white/10"
      >
        <div className="px-6 py-6 space-y-1">
          <Link
            to="/"
            className={`block py-3 font-dm font-medium text-base border-b border-white/10 ${isActive('/') ? 'text-krypt-orange' : 'text-white/80'}`}
          >
            Home
          </Link>
          {navLinks.map(({ path, name }) => (
            <Link
              key={path}
              to={path}
              className={`block py-3 font-dm font-medium text-base border-b border-white/10 ${isActive(path) ? 'text-krypt-orange' : 'text-white/80'}`}
            >
              {name}
            </Link>
          ))}
          <div className="pt-4">
            <Link
              to="/contact"
              className="block w-full text-center px-6 py-3.5 bg-krypt-orange text-white font-dm font-medium rounded-full text-sm"
            >
              Start a Project
            </Link>
          </div>
        </div>
      </motion.div>
    </nav>
  );
}
