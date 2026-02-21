import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

export default function AnimateOnScroll({ children }) {
  const [ref, inView] = useInView({
    triggerOnce: true, // Only trigger once
    threshold: 0.1,   // 10% of element visibility
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}