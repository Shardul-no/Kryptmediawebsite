import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { path: '/',             name: 'Home' },
  { path: '/services',      name: 'Services' },
  { path: '/projects',      name: 'Projects' },
  { path: '/about',         name: 'About' },
  // { path: '/testimonials',  name: 'Testimonials' },
  { path: '/contact',       name: 'Contact' },
];

export default function Navbar() {
  const [isOpen,      setIsOpen]      = useState(false);
  const [scrollState, setScrollState] = useState('transparent');
  const location = useLocation();

  // Close mobile menu on route change
  useEffect(() => setIsOpen(false), [location.pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  // 3-state scroll behavior
  useEffect(() => {
    let lastScrollY = window.scrollY;
    let hasPassedFirst  = false;
    let hasPassedSecond = false;

    const handleScroll = () => {
      const y = window.scrollY;
      const dir = y > lastScrollY ? 'down' : 'up';

      if (y > 50 && !hasPassedFirst) {
        hasPassedFirst = true;
        setScrollState('hidden');
      } else if (y > 150 && !hasPassedSecond) {
        hasPassedSecond = true;
        setScrollState('solid');
      } else if (y <= 0) {
        hasPassedFirst = false;
        hasPassedSecond = false;
        setScrollState('transparent');
      } else if (dir === 'up' && y <= 100 && hasPassedFirst && !hasPassedSecond) {
        setScrollState('transparent');
        hasPassedFirst = false;
      }
      lastScrollY = y;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path) =>
    path === '/' ? location.pathname === '/' : location.pathname.startsWith(path);

  const getNavbarStyles = () => {
    switch (scrollState) {
      case 'transparent':
        return {
          background: 'rgba(28, 30, 35, 0.7)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          linkColor: (path) => isActive(path) ? 'text-krypt-orange' : 'text-white/80 hover:text-[#ED5C47]',
          hamColor: 'bg-white',
          logo: '/whitelogo.png',
        };
      case 'hidden':
        return {
          background: 'transparent',
          linkColor: () => 'text-transparent',
          hamColor: 'bg-transparent',
          logo: '/whitelogo.png',
        };
      case 'solid':
        return {
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid rgba(0, 0, 0, 0.08)',
          boxShadow: '0 4px 24px rgba(0, 0, 0, 0.06)',
          linkColor: (path) => isActive(path) ? 'text-krypt-orange' : 'text-gray-700 hover:text-[#ED5C47]',
          hamColor: 'bg-gray-900',
          logo: '/logo.png',
        };
      default:
        return {};
    }
  };

  const s = getNavbarStyles();

  return (
    <>
      {/* ── Pill navbar (desktop + mobile pill — no dropdown inside) ── */}
      <AnimatePresence mode="wait">
        <motion.nav
          key={scrollState}
          initial={{ opacity: 0, y: scrollState === 'solid' ? -20 : 0 }}
          animate={scrollState === 'hidden' ? { opacity: 0, y: -30 } : { opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
          className="fixed top-6 left-1/2 -translate-x-1/2 z-50 rounded-full"
          style={{
            background: s.background,
            backdropFilter: s.backdropFilter,
            WebkitBackdropFilter: s.WebkitBackdropFilter,
            border: s.border,
            boxShadow: s.boxShadow,
            maxWidth: '1200px',
            width: 'calc(100% - 48px)',
          }}
        >
          <div className="h-16 md:h-20 flex items-center justify-between px-6 md:px-8">
            {/* Logo */}
            <Link to="/" className="flex-shrink-0">
              <motion.img
                src={s.logo}
                alt="Krypt Media"
                className="h-14 md:h-18 w-auto transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              />
            </Link>

            {/* Desktop nav links */}
            <div className="hidden md:flex items-center gap-6 lg:gap-8">
              {navLinks.map(({ path, name }) => (
                <motion.div key={path} whileHover={{ y: -2 }} transition={{ duration: 0.2 }}>
                  <Link
                    to={path}
                    className={`font-dm text-sm font-medium transition-all duration-200 ${s.linkColor(path)}`}
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

            {/* Mobile hamburger — pill stays clean, no dropdown inside */}
            <motion.button
              onClick={() => setIsOpen((o) => !o)}
              className="md:hidden w-10 h-10 flex flex-col items-center justify-center gap-[5px]"
              aria-label="Toggle menu"
              whileTap={{ scale: 0.9 }}
              transition={{ duration: 0.2 }}
            >
              <span className={`block h-0.5 w-6 rounded-full transition-all duration-300 ${s.hamColor} ${isOpen ? 'rotate-45 translate-y-[7px]' : ''}`} />
              <span className={`block h-0.5 w-6 rounded-full transition-all duration-300 ${s.hamColor} ${isOpen ? 'opacity-0' : ''}`} />
              <span className={`block h-0.5 w-6 rounded-full transition-all duration-300 ${s.hamColor} ${isOpen ? '-rotate-45 -translate-y-[7px]' : ''}`} />
            </motion.button>
          </div>
        </motion.nav>
      </AnimatePresence>

      {/* ── Mobile menu: separate full-screen panel, z-40 (behind pill at z-50) ── */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="menu-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 z-40 bg-black/40 md:hidden"
              onClick={() => setIsOpen(false)}
            />

            {/* Menu panel — slides down from top, starts below the pill */}
            <motion.div
              key="menu-panel"
              initial={{ y: '-100%', opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: '-100%', opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.32, 0, 0.67, 0] }}
              className="fixed top-0 left-0 right-0 z-40 md:hidden bg-krypt-charcoal"
              style={{ paddingTop: 'calc(1.5rem + 4rem + 1rem)' /* top-6 + h-16 + gap */ }}
            >
              <div className="px-6 pb-8 space-y-1">
                {navLinks.map(({ path, name }, i) => (
                  <motion.div
                    key={path}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 + i * 0.06, duration: 0.25 }}
                  >
                    <Link
                      to={path}
                      className={`flex items-center justify-between py-4 font-dm font-medium text-lg border-b border-white/8 ${isActive(path) ? 'text-krypt-orange' : 'text-white/80'}`}
                    >
                      {name}
                      {isActive(path) && (
                        <span className="w-1.5 h-1.5 rounded-full bg-krypt-orange" />
                      )}
                    </Link>
                  </motion.div>
                ))}

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.38, duration: 0.25 }}
                  className="pt-6"
                >
                  <a
                    href="https://wa.me/91703922208?text=Hi!%20I%20want%20to%20start%20a%20project%20with%20Krypt%20Media"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full text-center px-6 py-4 btn-cta text-white font-dm font-semibold rounded-full text-sm"
                  >
                    Start a Project
                  </a>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
