import { motion } from 'framer-motion';

export default function SplitText({
  text = '',
  className = '',
  staggerDelay = 0.06,
  initialDelay = 0,
}) {
  const words = text.split(' ');

  return (
    <>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden">
          <motion.span
            className={`inline-block ${className}`}
            initial={{ y: '110%', opacity: 0 }}
            animate={{ y: '0%', opacity: 1 }}
            transition={{
              duration: 0.65,
              delay: initialDelay + i * staggerDelay,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {word}
          </motion.span>
          {i < words.length - 1 && '\u00A0'}
        </span>
      ))}
    </>
  );
}
