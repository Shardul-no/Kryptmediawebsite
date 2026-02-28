import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

const navItems = [
  { path: '/', name: 'Home' },
  { path: '/services', name: 'Services' },
  { path: '/projects', name: 'Projects' },
  { path: '/about', name: 'About' },
  { path: '/testimonials', name: 'Testimonials' },
  { path: '/contact', name: 'Contact' },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="bg-beige-100/80 backdrop-blur-md shadow-sm fixed w-full z-50 top-0 left-0 transition-all duration-500 border-b border-teal-500/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <motion.div
            whileHover={{ scale: 1.05 }}
          >
            <Link to="/">
              <img
                src="/logo.avif"
                alt="Krypt Media Logo"
                className="h-20 w-auto transition-transform duration-300"
              />
            </Link>
          </motion.div>

          <div className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <motion.div key={item.path} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                <Link
                  to={item.path}
                  className={`text-lg font-semibold transition-all duration-300 ${isActive(item.path)
                    ? 'text-teal-600 scale-110'
                    : 'text-charcoal hover:text-teal-500 hover:scale-105'
                    }`}
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="md:hidden">
            <motion.button
              onClick={toggleMenu}
              className="focus:outline-none"
              aria-label="Toggle menu"
              whileTap={{ scale: 0.9 }}
            >
              <div className="w-8 h-8 relative flex items-center justify-center">
                <span
                  className={`block absolute h-0.5 w-6 bg-charcoal transform transition duration-300 ease-in-out ${isOpen ? 'rotate-45 translate-y-0' : '-translate-y-2'
                    }`}
                ></span>
                <span
                  className={`block absolute h-0.5 w-6 bg-charcoal transition-all duration-300 ease-in-out ${isOpen ? 'opacity-0' : 'opacity-100'
                    }`}
                ></span>
                <span
                  className={`block absolute h-0.5 w-6 bg-charcoal transform transition duration-300 ease-in-out ${isOpen ? '-rotate-45 translate-y-0' : 'translate-y-2'
                    }`}
                ></span>
              </div>
            </motion.button>
          </div>
        </div>
      </div>

      <motion.div
        className="md:hidden bg-beige-200 shadow-lg overflow-hidden border-t border-charcoal/10"
        initial={false}
        animate={{
          height: isOpen ? 'auto' : 0,
          opacity: isOpen ? 1 : 0,
        }}
        transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <motion.div
          className="px-6 py-5 space-y-1"
          variants={{
            open: { transition: { staggerChildren: 0.06, delayChildren: 0.08 } },
            closed: { transition: { staggerChildren: 0.04, staggerDirection: -1 } },
          }}
          initial="closed"
          animate={isOpen ? 'open' : 'closed'}
        >
          {navItems.map((item, i) => (
            <motion.div
              key={item.path}
              variants={{
                open: { opacity: 1, x: 0 },
                closed: { opacity: 0, x: 16 },
              }}
              transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <Link
                to={item.path}
                className={`block py-3 text-lg font-medium transition-colors ${isActive(item.path)
                  ? 'text-teal-600 pl-4 border-l-4 border-teal-600'
                  : 'text-charcoal hover:text-teal-600'
                  }`}
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </nav>
  );
};

export default Navbar;
