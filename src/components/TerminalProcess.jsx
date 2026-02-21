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
      className={`rounded-xl border border-white/10 bg-black/80 p-6 md:p-8 font-mono text-sm md:text-base ${className}`}
      style={{ boxShadow: 'inset 0 0 60px rgba(0,255,255,0.03)' }}
    >
      <div className="flex items-center gap-2 mb-6 text-gray-500">
        <span className="w-3 h-3 rounded-full bg-red-500/80" />
        <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
        <span className="w-3 h-3 rounded-full bg-green-500/80" />
        <span className="ml-2 text-gray-400">process</span>
      </div>
      <div className="space-y-2">
        {steps.map((step, i) => (
          <motion.div
            key={step}
            className="flex items-center gap-2 text-gray-300"
            initial={{ opacity: 0, x: -12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: i * 0.08, duration: 0.4 }}
          >
            <span className="text-cyan-400/90">&gt;</span>
            <span className="text-white">{step}</span>
            <span
              className="inline-block w-2 h-4 bg-cyan-400/90 ml-1 animate-pulse"
              style={{ animationDuration: '1.2s' }}
              aria-hidden
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
