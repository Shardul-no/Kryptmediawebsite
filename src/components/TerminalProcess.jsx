import { motion } from 'framer-motion';

const DEFAULT_STEPS = [
  'Discover',
  'Strategize',
  'Design',
  'Develop',
  'Launch',
  'Optimize',
];

export default function TerminalProcess({ steps = DEFAULT_STEPS, className = '' }) {
  return (
    <div
      className={`rounded-xl border border-teal-500/20 bg-charcoal p-6 md:p-8 font-mono text-sm md:text-base ${className}`}
      style={{ boxShadow: 'inset 0 0 60px rgba(13,148,136,0.1)' }}
    >
      <div className="flex items-center gap-2 mb-6 text-charcoal-muted">
        <span className="w-3 h-3 rounded-full bg-red-400/80" />
        <span className="w-3 h-3 rounded-full bg-yellow-400/80" />
        <span className="w-3 h-3 rounded-full bg-teal-400/80" />
        <span className="ml-2 text-beige-300">process</span>
      </div>
      <div className="space-y-2">
        {steps.map((step, i) => (
          <motion.div
            key={step}
            className="flex items-center gap-2 text-beige-300"
            initial={{ opacity: 0, x: -12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: i * 0.08, duration: 0.4 }}
          >
            <span className="text-teal-400">&gt;</span>
            <span className="text-beige-100">{step}</span>
            <span
              className="inline-block w-2 h-4 bg-teal-400 ml-1 animate-pulse"
              style={{ animationDuration: '1.2s' }}
              aria-hidden
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
