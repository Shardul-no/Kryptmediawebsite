import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useMediaQuery } from '../hooks/useMediaQuery';

/**
 * Full-screen overlay shown only on mobile (< 768px).
 * Blocks the page until the user explicitly continues.
 */
export default function MobileBanner() {
  const isMobile = useMediaQuery('(max-width: 767px)');
  const [dismissed, setDismissed] = useState(false);

  if (!isMobile || dismissed) return null;

  return (
    <AnimatePresence>
      <motion.div
        key="mobile-overlay"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { duration: 0.5, ease: 'easeInOut' } }}
        className="fixed inset-0 z-[200] bg-krypt-charcoal flex flex-col items-center justify-between px-8 py-14 overflow-hidden"
      >
        {/* Ambient glow */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute top-[-15%] left-1/2 -translate-x-1/2 w-[70vw] h-[70vw] rounded-full bg-krypt-orange/10 blur-[80px]" />
          <div className="absolute bottom-0 right-0 w-[50vw] h-[50vw] rounded-full bg-krypt-coral/8 blur-[60px]" />
        </div>

        {/* Logo */}
        <div className="relative z-10">
          <img src="/whitelogo.png" alt="Krypt Media" className="h-10 w-auto mx-auto" />
        </div>

        {/* Centre content */}
        <div className="relative z-10 flex flex-col items-center text-center gap-6">
          {/* Monitor icon */}
          <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-8 h-8 text-krypt-orange"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <rect x="2" y="3" width="20" height="14" rx="2" />
              <path strokeLinecap="round" d="M8 21h8M12 17v4" />
            </svg>
          </div>

          <div className="space-y-3">
            <h1 className="font-playfair text-white text-3xl font-bold leading-tight">
              Best on{' '}
              <span className="text-krypt-orange italic">Desktop</span>
            </h1>
            <p className="font-dm text-white/50 text-sm leading-relaxed max-w-[260px] mx-auto">
              This site is crafted with immersive animations and interactions
              that shine on a larger screen.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="relative z-10 w-full flex flex-col items-center gap-3">
          <button
            onClick={() => setDismissed(true)}
            className="w-full max-w-xs py-4 rounded-full btn-cta text-white font-dm font-semibold text-sm tracking-wide"
          >
            Continue on mobile anyway
          </button>
          <p className="font-dm text-white/25 text-xs">
            Some features may appear limited
          </p>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
