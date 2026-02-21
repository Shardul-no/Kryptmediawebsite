import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

/**
 * Reusable section entrance: children animate in (opacity + y) when in view.
 * Use for layout blocks; use ScrollReveal for headline text only.
 */
export default function SectionReveal({
  children,
  className = '',
  delay = 0,
  duration = 0.7,
  y = 32,
  once = true,
  amount = 0.12,
  as: Component = motion.div,
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, amount });

  return (
    <Component
      ref={ref}
      className={className}
      initial={{ opacity: 0, y }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y }}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.1, 0.25, 1],
      }}
    >
      {children}
    </Component>
  );
}
