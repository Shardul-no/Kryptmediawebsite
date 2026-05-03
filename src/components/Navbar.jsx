import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { path: '/',             name: 'Home' },
  { path: '/services',      name: 'Services' },
  { path: '/projects',      name: 'Projects' },
  { path: '/about',         name: 'About' },
  { path: '/testimonials',  name: 'Testimonials' },
  { path: '/contact',       name: 'Contact' },
];

export default function Navbar() {
  const [isOpen,   setIsOpen]   = useState(false);
  const [scrollState, setScrollState] = useState('transparent'); // 'transparent', 'hidden', 'solid'
  const location = useLocation();

  const isHome = location.pathname === '/';

  // Close mobile menu on route change
  useEffect(() => setIsOpen(false), [location.pathname]);

  // 3-state scroll behavior
  useEffect(() => {
    let lastScrollY = window.scrollY;
    let hasPassedFirstThreshold = false;
    let hasPassedSecondThreshold = false;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollDirection = currentScrollY > lastScrollY ? 'down' : 'up';

      // First threshold: 50px - hide transparent navbar
      if (currentScrollY > 50 && !hasPassedFirstThreshold) {
        hasPassedFirstThreshold = true;
        setScrollState('hidden');
      }
      // Second threshold: 150px - show solid navbar
      else if (currentScrollY > 150 && !hasPassedSecondThreshold) {
        hasPassedSecondThreshold = true;
        setScrollState('solid');
      }
      // Reset states when scrolling back to top
      else if (currentScrollY <= 0) {
        hasPassedFirstThreshold = false;
        hasPassedSecondThreshold = false;
        setScrollState('transparent');
      }
      // Handle scrolling up from hidden state
      else if (scrollDirection === 'up' && currentScrollY <= 100 && hasPassedFirstThreshold && !hasPassedSecondThreshold) {
        setScrollState('transparent');
        hasPassedFirstThreshold = false;
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path) =>
    path === '/' ? location.pathname === '/' : location.pathname.startsWith(path);

  // Dynamic styling based on scroll state
  const getNavbarStyles = () => {
    switch (scrollState) {
      case 'transparent':
        return {
          background: 'rgba(28, 30, 35, 0.7)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          textColor: 'text-white',
          linkColor: (path) => isActive(path) ? 'text-krypt-orange' : 'text-white/80 hover:text-pink-400',
          hamColor: 'bg-white',
          logo: '/whitelogo.png'
        };
      case 'hidden':
        return {
          background: 'transparent',
          textColor: 'text-transparent',
          linkColor: () => 'text-transparent',
          hamColor: 'bg-transparent',
          logo: '/whitelogo.png'
        };
      case 'solid':
        return {
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid rgba(0, 0, 0, 0.08)',
          boxShadow: '0 4px 24px rgba(0, 0, 0, 0.06)',
          textColor: 'text-gray-900',
          linkColor: (path) => isActive(path) ? 'text-krypt-orange' : 'text-gray-700 hover:text-pink-400',
          hamColor: 'bg-gray-900',
          logo: '/logo.png'
        };
      default:
        return {};
    }
  };

  const navbarStyles = getNavbarStyles();

  return (
    <AnimatePresence mode="wait">
      <motion.nav
        key={scrollState}
        initial={scrollState === 'hidden' ? { opacity: 0, y: -20 } : { opacity: 0, y: scrollState === 'solid' ? -20 : 0 }}
        animate={scrollState === 'hidden' ? { opacity: 0, y: -30 } : { opacity: 1, y: 0 }}
        exit={scrollState === 'hidden' ? { opacity: 0, y: -30 } : { opacity: 0, y: -20 }}
        transition={{ 
          duration: 0.4, 
          ease: [0.25, 0.1, 0.25, 1],
          opacity: { duration: 0.3 },
          y: { duration: 0.4 }
        }}
        className={`fixed top-6 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-400 rounded-full`}
        style={{
          background: navbarStyles.background,
          backdropFilter: navbarStyles.backdropFilter,
          WebkitBackdropFilter: navbarStyles.WebkitBackdropFilter,
          border: navbarStyles.border,
          boxShadow: navbarStyles.boxShadow,
          maxWidth: '1200px',
          width: 'calc(100% - 48px)'
        }}
      >
        <div className="h-16 md:h-20 flex items-center justify-between px-6 md:px-8">

        {/* Logo */}
        <Link to="/" className="flex-shrink-0">
          <motion.img 
            src={navbarStyles.logo} 
            alt="Krypt Media" 
            className="h-14 md:h-18 w-auto transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          />
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-6 lg:gap-8">
          {navLinks.map(({ path, name }) => (
            <motion.div
              key={path}
              whileHover={{ y: -2 }}
              transition={{ duration: 0.2 }}
            >
              <Link
                to={path}
                className={`font-dm text-sm font-medium transition-all duration-200 ${navbarStyles.linkColor(path)}`}
              >
                {name}
              </Link>
            </motion.div>
          ))}
          <motion.a
            href="https://wa.me/91703922208?text=Hi!%20I%20want%20to%20start%20a%20project%20with%20Krypt%20Media"
            target="_blank"
            rel="noopener noreferrer"
            className="ml-2 px-5 py-2.5 btn-cta text-white font-dm text-sm font-medium rounded-full"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.2 }}
          >
            Start a Project
          </motion.a>
        </div>

        {/* Mobile hamburger */}
        <motion.button
          onClick={() => setIsOpen((o) => !o)}
          className="md:hidden w-10 h-10 flex flex-col items-center justify-center gap-[5px]"
          aria-label="Toggle menu"
          whileTap={{ scale: 0.9 }}
          transition={{ duration: 0.2 }}
        >
          <span className={`block h-0.5 w-6 rounded-full transition-all duration-300 ${navbarStyles.hamColor} ${isOpen ? 'rotate-45 translate-y-[7px]' : ''}`} />
          <span className={`block h-0.5 w-6 rounded-full transition-all duration-300 ${navbarStyles.hamColor} ${isOpen ? 'opacity-0' : ''}`} />
          <span className={`block h-0.5 w-6 rounded-full transition-all duration-300 ${navbarStyles.hamColor} ${isOpen ? '-rotate-45 -translate-y-[7px]' : ''}`} />
        </motion.button>
        </div>

        {/* Mobile menu */}
        <motion.div
          initial={false}
          animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
          transition={{ duration: 0.32, ease: [0.25, 0.1, 0.25, 1] }}
          className="md:hidden overflow-hidden"
          style={{
            background: scrollState === 'solid' ? 'rgba(255, 255, 255, 0.95)' : 'rgba(28, 30, 35, 0.95)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid ' + (scrollState === 'solid' ? 'rgba(0, 0, 0, 0.08)' : 'rgba(255, 255, 255, 0.1)'),
            borderTop: 'none',
            marginTop: '-1px',
            borderBottomLeftRadius: '1.5rem',
            borderBottomRightRadius: '1.5rem'
          }}
        >
          <div className="px-6 py-6 space-y-1">
            {navLinks.map(({ path, name }) => (
              <Link
                key={path}
                to={path}
                className={`block py-3 font-dm font-medium text-base border-b ${scrollState === 'solid' ? 'border-gray-200' : 'border-white/10'} ${isActive(path) ? (scrollState === 'solid' ? 'text-krypt-orange' : 'text-krypt-orange') : (scrollState === 'solid' ? 'text-gray-700 hover:text-pink-400' : 'text-white/80 hover:text-pink-400')}`}
              >
                {name}
              </Link>
            ))}
            <div className="pt-4">
              <a
                href="https://wa.me/91703922208?text=Hi!%20I%20want%20to%20start%20a%20project%20with%20Krypt%20Media"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center px-6 py-3.5 btn-cta text-white font-dm font-medium rounded-full text-sm"
              >
                Start a Project
              </a>
            </div>
          </div>
        </motion.div>
      </motion.nav>
    </AnimatePresence>
  );
}
