import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence, useReducedMotion } from 'framer-motion';
import SectionBadge from '../components/SectionBadge';
import GrainOverlay from '../components/GrainOverlay';

const processSteps = [
  {
    id: 'discover',
    number: '01',
    label: 'Discovery',
    title: 'Strategic Discovery',
    description:
      'We start by understanding your market, users, and commercial goals so every next move is grounded in real opportunity. No assumptions, just solid research.',
    outcomes: [
      { metric: '2-3', label: 'Discovery sessions' },
      { metric: '360', label: 'Market view' },
    ],
  },
  {
    id: 'design',
    number: '02',
    label: 'Design',
    title: 'Experience Design',
    description:
      'We shape the flow, structure, and visual system into a refined prototype that feels intentional, persuasive, and unmistakably on brand.',
    outcomes: [
      { metric: '100%', label: 'Prototype clarity' },
      { metric: '3', label: 'Focused revision rounds' },
    ],
  },
  {
    id: 'develop',
    number: '03',
    label: 'Development',
    title: 'Engineering Excellence',
    description:
      'We build with performance, accessibility, and scale in mind so what launches feels as strong behind the scenes as it does on the surface.',
    outcomes: [
      { metric: '<2s', label: 'Load time target' },
      { metric: 'QA', label: 'Review before release' },
    ],
  },
  {
    id: 'deliver',
    number: '04',
    label: 'Delivery',
    title: 'Launch & Optimize',
    description:
      'We handle rollout, measurement, and post-launch refinement so the product keeps improving once it meets real users.',
    outcomes: [
      { metric: '24h', label: 'Support response' },
      { metric: 'Ongoing', label: 'Continuous improvement' },
    ],
  },
];

function FadeUp({ children, delay = 0, className = '' }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {children}
    </motion.div>
  );
}

function DiscoverScene({ reduceMotion }) {
  return (
    <div className="relative h-full w-full">
      {[
        'left-[16%] top-[18%]',
        'right-[18%] top-[20%]',
        'left-[18%] bottom-[22%]',
        'right-[14%] bottom-[26%]',
      ].map((position, index) => (
        <motion.div
          key={position}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{
            opacity: 1,
            scale: 1,
            y: reduceMotion ? 0 : [0, index % 2 === 0 ? -10 : 10, 0],
          }}
          transition={{
            opacity: { duration: 0.35, delay: index * 0.07 },
            scale: { duration: 0.35, delay: index * 0.07 },
            y: reduceMotion
              ? { duration: 0.2 }
              : {
                  duration: 4.4 + index * 0.35,
                  delay: index * 0.15,
                  repeat: Infinity,
                  repeatType: 'mirror',
                  ease: 'easeInOut',
                },
          }}
          className={`absolute ${position}`}
        >
          <div className="h-14 w-14 rounded-full border border-white/25 bg-white/10 shadow-[0_0_30px_rgba(255,255,255,0.08)] backdrop-blur-md md:h-20 md:w-20" />
        </motion.div>
      ))}

      {[
        'left-[28%] top-[31%] w-[24%]',
        'left-[28%] top-[59%] w-[20%]',
        'right-[28%] top-[31%] w-[20%]',
        'right-[24%] bottom-[35%] w-[18%]',
      ].map((position, index) => (
        <motion.div
          key={position}
          initial={{ opacity: 0, scaleX: 0.7 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.4, delay: 0.18 + index * 0.05 }}
          className={`absolute ${position} h-px origin-left bg-gradient-to-r from-white/0 via-white/75 to-white/0`}
        >
          <motion.div
            animate={{ x: reduceMotion ? '0%' : ['-10%', '110%'] }}
            transition={
              reduceMotion
                ? { duration: 0.2 }
                : {
                    duration: 2.4 + index * 0.2,
                    delay: index * 0.18,
                    repeat: Infinity,
                    ease: 'linear',
                  }
            }
            className="h-full w-10 bg-gradient-to-r from-transparent via-white to-transparent opacity-80"
          />
        </motion.div>
      ))}

      <motion.div
        initial={{ opacity: 0, scale: 0.88 }}
        animate={{
          opacity: 1,
          scale: 1,
          boxShadow: reduceMotion
            ? '0 0 0 rgba(237,146,29,0)'
            : [
                '0 0 0 rgba(237,146,29,0)',
                '0 0 48px rgba(237,146,29,0.35)',
                '0 0 0 rgba(237,146,29,0)',
              ],
        }}
        transition={{
          opacity: { duration: 0.35 },
          scale: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
          boxShadow: reduceMotion ? { duration: 0.2 } : { duration: 3.6, repeat: Infinity },
        }}
        className="absolute left-1/2 top-1/2 flex h-28 w-28 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/35 bg-white/12 backdrop-blur-xl md:h-36 md:w-36"
      >
        <div className="h-16 w-16 rounded-full border border-white/35 bg-white/10 md:h-20 md:w-20" />
      </motion.div>
    </div>
  );
}

function DesignScene({ reduceMotion }) {
  return (
    <div className="relative h-full w-full">
      {[0, 1, 2].map((layer) => (
        <motion.div
          key={layer}
          initial={{ opacity: 0, y: 30, rotate: layer === 0 ? -6 : layer === 2 ? 6 : 0 }}
          animate={{
            opacity: 1,
            y: reduceMotion ? 0 : [0, layer === 1 ? -6 : 6, 0],
            rotate: layer === 0 ? -10 : layer === 2 ? 8 : -1,
          }}
          transition={{
            opacity: { duration: 0.35, delay: layer * 0.08 },
            rotate: { duration: 0.45, delay: layer * 0.08 },
            y: reduceMotion
              ? { duration: 0.2 }
              : {
                  duration: 4.4 + layer * 0.35,
                  delay: layer * 0.12,
                  repeat: Infinity,
                  repeatType: 'mirror',
                  ease: 'easeInOut',
                },
          }}
          className={`absolute left-1/2 top-1/2 h-[180px] w-[220px] -translate-x-1/2 -translate-y-1/2 rounded-[28px] border border-white/20 p-5 backdrop-blur-xl md:h-[220px] md:w-[280px] ${
            layer === 1 ? 'z-20 bg-white/16' : 'z-10 bg-white/10'
          }`}
        >
          <div className="mb-4 flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-white/55" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/35" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
          </div>
          <div className="space-y-3">
            <div className="h-7 rounded-full bg-white/22" />
            <div className="grid grid-cols-2 gap-3">
              <div className="h-20 rounded-2xl bg-white/14" />
              <div className="h-20 rounded-2xl bg-white/10" />
            </div>
            <div className="h-12 rounded-2xl bg-white/10" />
          </div>
        </motion.div>
      ))}

      <motion.div
        initial={{ opacity: 0, x: 24 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4, delay: 0.24 }}
        className="absolute right-[10%] top-[14%] rounded-full border border-white/20 bg-white/12 px-4 py-2 text-[10px] uppercase tracking-[0.28em] text-white/80 backdrop-blur-md"
      >
        Approved flow
      </motion.div>
    </div>
  );
}

function DevelopScene({ reduceMotion }) {
  return (
    <div className="relative h-full w-full overflow-hidden">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="absolute inset-x-[10%] bottom-[18%] top-[18%] rounded-[32px] border border-white/15 bg-black/12 backdrop-blur-md"
      />

      {[0, 1, 2, 3].map((column) => (
        <motion.div
          key={column}
          initial={{ opacity: 0, y: 18 }}
          animate={{
            opacity: 1,
            y: 0,
            backgroundPositionY: reduceMotion ? '0%' : ['0%', '100%'],
          }}
          transition={{
            opacity: { duration: 0.3, delay: column * 0.08 },
            y: { duration: 0.35, delay: column * 0.08 },
            backgroundPositionY: reduceMotion
              ? { duration: 0.2 }
              : { duration: 4 + column * 0.6, repeat: Infinity, ease: 'linear' },
          }}
          className="absolute top-[22%] h-[56%] w-10 rounded-full border border-white/10 opacity-80 md:w-12"
          style={{
            left: `${24 + column * 16}%`,
            backgroundImage:
              'linear-gradient(to bottom, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.25) 45%, rgba(255,255,255,0.05) 100%)',
            backgroundSize: '100% 220%',
          }}
        />
      ))}

      <motion.div
        initial={{ opacity: 0, scaleX: 0.6 }}
        animate={{
          opacity: 1,
          scaleX: 1,
          x: reduceMotion ? 0 : ['-12%', '12%', '-12%'],
        }}
        transition={{
          opacity: { duration: 0.35, delay: 0.2 },
          scaleX: { duration: 0.35, delay: 0.2 },
          x: reduceMotion ? { duration: 0.2 } : { duration: 3.2, repeat: Infinity, ease: 'easeInOut' },
        }}
        className="absolute left-[18%] top-1/2 h-px w-[64%] bg-gradient-to-r from-transparent via-white/80 to-transparent"
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{
          opacity: 1,
          scale: 1,
          y: reduceMotion ? 0 : [0, -5, 0],
        }}
        transition={{
          opacity: { duration: 0.35, delay: 0.25 },
          scale: { duration: 0.35, delay: 0.25 },
          y: reduceMotion
            ? { duration: 0.2 }
            : { duration: 2.6, delay: 0.2, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' },
        }}
        className="absolute bottom-[16%] right-[14%] rounded-2xl border border-white/15 bg-white/12 px-5 py-4 font-mono text-sm text-white/80 backdrop-blur-md"
      >
        {'<ship />'}
      </motion.div>
    </div>
  );
}

function DeliverScene({ reduceMotion }) {
  return (
    <div className="relative h-full w-full">
      {[0, 1, 2].map((ring) => (
        <motion.div
          key={ring}
          initial={{ opacity: 0, scale: 0.75 }}
          animate={{
            opacity: 1,
            scale: reduceMotion ? 1 : [1, 1.06 + ring * 0.03, 1],
          }}
          transition={{
            opacity: { duration: 0.3, delay: ring * 0.08 },
            scale: reduceMotion
              ? { duration: 0.2 }
              : { duration: 3.8 + ring * 0.5, delay: ring * 0.12, repeat: Infinity, ease: 'easeInOut' },
          }}
          className="absolute left-1/2 top-1/2 rounded-full border border-white/20"
          style={{
            width: `${140 + ring * 64}px`,
            height: `${140 + ring * 64}px`,
            transform: 'translate(-50%, -50%)',
          }}
        />
      ))}

      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{
          opacity: 1,
          scale: 1,
          rotate: reduceMotion ? 0 : [0, 6, 0],
        }}
        transition={{
          opacity: { duration: 0.35, delay: 0.15 },
          scale: { duration: 0.35, delay: 0.15 },
          rotate: reduceMotion
            ? { duration: 0.2 }
            : { duration: 3.8, delay: 0.2, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' },
        }}
        className="absolute left-1/2 top-1/2 flex h-24 w-24 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-3xl border border-white/25 bg-white/14 text-xl font-dm font-medium tracking-[0.18em] text-white shadow-[0_24px_80px_rgba(0,0,0,0.12)] backdrop-blur-xl md:h-28 md:w-28"
      >
        LIVE
      </motion.div>

      {[
        { label: 'Monitoring', pos: 'left-[12%] top-[24%]' },
        { label: 'Analytics', pos: 'right-[12%] top-[28%]' },
        { label: 'Iteration', pos: 'left-[18%] bottom-[20%]' },
      ].map((item, index) => (
        <motion.div
          key={item.label}
          initial={{ opacity: 0, x: index === 1 ? 18 : -18 }}
          animate={{
            opacity: 1,
            x: 0,
            y: reduceMotion ? 0 : [0, index === 1 ? -8 : 8, 0],
          }}
          transition={{
            opacity: { duration: 0.3, delay: 0.2 + index * 0.08 },
            x: { duration: 0.35, delay: 0.2 + index * 0.08 },
            y: reduceMotion
              ? { duration: 0.2 }
              : {
                  duration: 3.4 + index * 0.4,
                  delay: 0.2,
                  repeat: Infinity,
                  repeatType: 'mirror',
                  ease: 'easeInOut',
                },
          }}
          className={`absolute ${item.pos} rounded-full border border-white/18 bg-white/12 px-4 py-2 text-xs text-white/75 backdrop-blur-md`}
        >
          {item.label}
        </motion.div>
      ))}
    </div>
  );
}

function VisualPanel({ activeStep }) {
  const reduceMotion = useReducedMotion();
  const activeData = processSteps.find((step) => step.id === activeStep) || processSteps[0];

  const visualConfig = {
    discover: {
      gradient: 'from-krypt-orange/80 via-krypt-apricot/60 to-krypt-coral/40',
      panelLabel: 'Research signal',
      accent: '#fff6e9',
    },
    design: {
      gradient: 'from-krypt-coral/70 via-krypt-orange/50 to-krypt-apricot/60',
      panelLabel: 'Prototype system',
      accent: '#fff9f0',
    },
    develop: {
      gradient: 'from-krypt-apricot/70 via-krypt-sand/60 to-krypt-orange/50',
      panelLabel: 'Build pipeline',
      accent: '#fff8ed',
    },
    deliver: {
      gradient: 'from-krypt-orange/90 via-krypt-coral/60 to-krypt-apricot/70',
      panelLabel: 'Launch control',
      accent: '#fffaf1',
    },
  };

  const config = visualConfig[activeStep] || visualConfig.discover;

  const renderScene = () => {
    const scenes = {
      discover: <DiscoverScene reduceMotion={reduceMotion} />,
      design: <DesignScene reduceMotion={reduceMotion} />,
      develop: <DevelopScene reduceMotion={reduceMotion} />,
      deliver: <DeliverScene reduceMotion={reduceMotion} />,
    };

    return scenes[activeStep] || scenes.discover;
  };

  return (
    <div className="relative w-full min-h-[400px] rounded-3xl overflow-hidden bg-krypt-charcoal md:min-h-[500px] lg:min-h-[600px]">
      <motion.div
        initial={false}
        animate={{
          opacity: 1,
          scale: reduceMotion ? 1 : [1, 1.03, 1],
        }}
        transition={{
          opacity: { duration: 0.45 },
          scale: reduceMotion ? { duration: 0.2 } : { duration: 8, repeat: Infinity, ease: 'easeInOut' },
        }}
        className={`absolute inset-0 bg-gradient-to-br ${config.gradient}`}
      />

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            x: reduceMotion ? 0 : ['-4%', '5%', '-4%'],
            y: reduceMotion ? 0 : ['0%', '-6%', '0%'],
          }}
          transition={reduceMotion ? { duration: 0.2 } : { duration: 9, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute left-[8%] top-[12%] h-56 w-56 rounded-full bg-white/12 blur-3xl md:h-72 md:w-72"
        />
        <motion.div
          animate={{
            x: reduceMotion ? 0 : ['4%', '-6%', '4%'],
            y: reduceMotion ? 0 : ['0%', '8%', '0%'],
          }}
          transition={reduceMotion ? { duration: 0.2 } : { duration: 10.5, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-[10%] right-[8%] h-44 w-44 rounded-full bg-krypt-cream/15 blur-3xl md:h-60 md:w-60"
        />
        <motion.div
          animate={{ opacity: reduceMotion ? 0.16 : [0.12, 0.28, 0.12] }}
          transition={reduceMotion ? { duration: 0.2 } : { duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute inset-x-[18%] top-[8%] h-24 rounded-full bg-white/20 blur-3xl"
        />
      </div>

      <GrainOverlay opacity={0.05} />

      <div className="relative z-10 w-full min-h-[400px] md:min-h-[500px] lg:min-h-[600px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeStep}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full min-h-[400px] md:min-h-[500px] lg:min-h-[600px]"
          >
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="absolute left-5 top-5 z-20 rounded-2xl border border-white/16 bg-white/10 px-4 py-3 text-white/80 backdrop-blur-xl md:left-7 md:top-7"
            >
              <div className="text-[10px] uppercase tracking-[0.28em] text-white/55">
                {config.panelLabel}
              </div>
              <div className="mt-2 font-playfair text-lg font-bold text-white">
                {activeData.title}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 18 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.15 }}
              className="absolute right-5 top-5 z-20 rounded-full border border-white/16 bg-white/10 px-4 py-2 text-[10px] uppercase tracking-[0.28em] text-white/80 backdrop-blur-xl md:right-7 md:top-7"
            >
              Step {activeData.number}
            </motion.div>

            <div className="absolute inset-[16%] md:inset-[14%]">
              {renderScene()}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.18 }}
              className="absolute bottom-6 left-5 right-20 z-20 rounded-2xl border border-white/14 bg-black/12 px-4 py-4 text-white/80 backdrop-blur-xl md:bottom-7 md:left-7 md:right-24"
            >
              <div className="mb-3 flex items-center gap-2">
                <span
                  className="h-2.5 w-2.5 rounded-full"
                  style={{ backgroundColor: config.accent }}
                />
                <span className="text-[10px] uppercase tracking-[0.28em] text-white/55">
                  Active focus
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
                {activeData.outcomes.map((outcome) => (
                  <div key={outcome.label} className="rounded-xl bg-white/8 px-3 py-3">
                    <div className="font-playfair text-xl font-bold text-white">{outcome.metric}</div>
                    <div className="mt-1 text-xs text-white/60">{outcome.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </AnimatePresence>

        <div className="absolute bottom-4 right-4 flex items-center gap-2 md:bottom-6 md:right-6 md:gap-3">
          {processSteps.map((step) => (
            <motion.div
              key={step.id}
              animate={{
                width: activeStep === step.id ? 24 : 6,
                backgroundColor: activeStep === step.id ? '#ED921D' : 'rgba(255,255,255,0.3)',
              }}
              transition={{ duration: 0.3 }}
              className="h-1.5 rounded-full md:h-2"
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function ProcessSection() {
  const [activeStep, setActiveStep] = useState('discover');

  return (
    <section className="relative overflow-hidden bg-krypt-sand/40 py-24 md:py-32">
      <div
        aria-hidden="true"
        className="absolute left-0 top-8 pointer-events-none select-none overflow-hidden"
      >
        <span
          className="font-playfair italic font-black leading-none text-krypt-olive/8"
          style={{ fontSize: 'clamp(5rem, 16vw, 14rem)' }}
        >
          Process
        </span>
      </div>

      <div className="relative mx-auto max-w-7xl px-6 md:px-12">
        <div className="mb-16 max-w-2xl md:mb-20">
          <FadeUp delay={0}>
            <SectionBadge label="Our Process" />
          </FadeUp>
          <FadeUp delay={0.1}>
            <h2
              className="font-playfair font-black leading-[1.08] text-krypt-charcoal"
              style={{ fontSize: 'clamp(2rem, 4.5vw, 3.5rem)' }}
            >
              Four Phases.<br />
              <span className="italic text-krypt-orange">One Flawless Delivery.</span>
            </h2>
          </FadeUp>
          <FadeUp delay={0.2}>
            <p className="mt-5 max-w-md font-dm leading-relaxed text-krypt-charcoal/55">
              A battle-tested methodology that transforms complex requirements into elegant
              digital products, on time, on budget, beyond expectations.
            </p>
          </FadeUp>
        </div>

        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-2 lg:gap-12">
          <div className="flex flex-col">
            <div className="flex flex-col gap-3">
              {processSteps.map((step, index) => {
                const isActive = activeStep === step.id;

                return (
                  <FadeUp key={step.id} delay={0.1 + index * 0.08}>
                    <button
                      onClick={() => setActiveStep(step.id)}
                      className={`group flex w-full flex-col rounded-2xl border text-left transition-all duration-300 ${
                        isActive
                          ? 'border-krypt-orange/40 bg-krypt-cream p-5 shadow-lg shadow-krypt-orange/10 md:p-6'
                          : 'border-krypt-olive/10 bg-white/40 p-4 hover:border-krypt-olive/20 hover:bg-white/60 md:p-5'
                      }`}
                      aria-selected={isActive}
                      role="tab"
                    >
                      <div className="flex items-start gap-4">
                        <span
                          className={`font-playfair text-2xl font-bold transition-colors duration-300 md:text-3xl ${
                            isActive
                              ? 'text-krypt-orange'
                              : 'text-krypt-charcoal/20 group-hover:text-krypt-charcoal/30'
                          }`}
                        >
                          {step.number}
                        </span>

                        <div className="min-w-0 flex-1">
                          <div className="mb-1 flex items-center gap-3">
                            <span
                              className={`font-dm text-xs uppercase tracking-[0.2em] transition-colors duration-300 ${
                                isActive ? 'text-krypt-orange' : 'text-krypt-charcoal/40'
                              }`}
                            >
                              {step.label}
                            </span>
                            {isActive && (
                              <motion.span
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="h-2 w-2 rounded-full bg-krypt-orange"
                              />
                            )}
                          </div>
                          <h3
                            className={`font-playfair text-lg font-bold leading-tight transition-colors duration-300 md:text-xl ${
                              isActive ? 'text-krypt-charcoal' : 'text-krypt-charcoal/70'
                            }`}
                          >
                            {step.title}
                          </h3>
                        </div>

                        <motion.div
                          animate={{ x: isActive ? 0 : -4 }}
                          transition={{ duration: 0.2 }}
                          className={`flex-shrink-0 ${
                            isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-40'
                          }`}
                        >
                          <svg
                            className="h-5 w-5 text-krypt-orange"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                          </svg>
                        </motion.div>
                      </div>

                      <AnimatePresence>
                        {isActive && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.32, ease: [0.25, 0.1, 0.25, 1] }}
                            className="overflow-hidden"
                          >
                            <div className="mt-4 border-t border-krypt-orange/20 pt-4">
                              <p className="font-dm text-sm leading-relaxed text-krypt-charcoal/70 md:text-base">
                                {step.description}
                              </p>

                              <div className="mt-4 flex flex-wrap gap-4 border-t border-krypt-olive/10 pt-4 md:gap-6">
                                {step.outcomes.map((outcome, outcomeIndex) => (
                                  <motion.div
                                    key={outcome.label}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.15 + outcomeIndex * 0.1, duration: 0.3 }}
                                  >
                                    <div className="font-playfair text-xl font-bold text-krypt-orange md:text-2xl">
                                      {outcome.metric}
                                    </div>
                                    <div className="mt-0.5 font-dm text-xs text-krypt-charcoal/50">
                                      {outcome.label}
                                    </div>
                                  </motion.div>
                                ))}
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </button>
                  </FadeUp>
                );
              })}
            </div>
          </div>

          <div className="w-full min-h-[400px] md:min-h-[500px] lg:min-h-[600px]">
            <FadeUp delay={0.2} className="h-full w-full">
              <VisualPanel activeStep={activeStep} />
            </FadeUp>
          </div>
        </div>
      </div>
    </section>
  );
}
