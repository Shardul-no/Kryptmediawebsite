import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * Animated accordion FAQ item.
 */
export default function FAQItem({ question, answer }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-krypt-olive/20 last:border-none">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-6 text-left group"
      >
        <span className={`font-dm font-medium text-base md:text-lg pr-6 transition-colors duration-200 ${open ? 'text-krypt-orange' : 'text-krypt-charcoal group-hover:text-krypt-orange'}`}>
          {question}
        </span>
        <span
          className={`flex-shrink-0 w-9 h-9 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
            open
              ? 'bg-krypt-orange border-krypt-orange rotate-45'
              : 'border-krypt-olive/40 group-hover:border-krypt-orange/60'
          }`}
        >
          <svg
            className={`w-3.5 h-3.5 transition-colors duration-200 ${open ? 'text-white' : 'text-krypt-charcoal/50'}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
        </span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.32, ease: [0.25, 0.1, 0.25, 1] }}
            className="overflow-hidden"
          >
            <p className="pb-7 font-dm text-krypt-charcoal/60 leading-relaxed text-sm md:text-base max-w-3xl">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
