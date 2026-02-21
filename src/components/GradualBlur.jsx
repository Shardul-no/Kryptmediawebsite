import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

/**
 * Wraps children and reduces blur as the section scrolls into view.
 * Use for section entrances with a premium, soft reveal.
 */
export default function GradualBlur({
  children,
  className = '',
  blurMax = 12,
  duration = 0.9,
  delay = 0,
  once = true,
  amount = 0.15,
  as: Component = motion.div,
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, amount });

  return (
    <Component
      ref={ref}
      className={className}
      initial={{ filter: `blur(${blurMax}px)`, opacity: 0.6 }}
      animate={
        isInView
          ? { filter: 'blur(0px)', opacity: 1 }
          : { filter: `blur(${blurMax}px)`, opacity: 0.6 }
      }
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
