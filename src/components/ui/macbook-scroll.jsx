import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export const MacbookScroll = ({ src, title, badge, showGradient }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  const scaleX = useTransform(scrollYProgress, [0, 0.3], [1.2, isMobile ? 1 : 1.5]);
  const scaleY = useTransform(scrollYProgress, [0, 0.3], [0.6, isMobile ? 1 : 1.5]);
  const translate = useTransform(scrollYProgress, [0, 1], [0, 1500]);
  const rotate = useTransform(scrollYProgress, [0.1, 0.12, 0.3], [-28, -28, 0]);
  const textTranslate = useTransform(scrollYProgress, [0, 0.3], [0, 100]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  const isVideo = src && /\.(mp4|webm|ogg)$/i.test(src);

  return (
    <div
      ref={ref}
      className="min-h-[200vh] flex flex-col items-center py-10 md:py-40 justify-start flex-shrink-0 [perspective:800px] transform md:scale-100 scale-[0.35] sm:scale-50"
    >
      {title && (
        <motion.div
          style={{ translateY: textTranslate, opacity: textOpacity }}
          className="text-white text-3xl font-bold mb-20 text-center font-playfair"
        >
          {title}
        </motion.div>
      )}

      <Lid
        src={src}
        isVideo={isVideo}
        scaleX={scaleX}
        scaleY={scaleY}
        rotate={rotate}
        translate={translate}
        badge={badge}
        showGradient={showGradient}
      />

      {/* Base */}
      <div className="h-[22rem] w-[32rem] bg-[#272729] rounded-2xl overflow-hidden relative -z-10">
        {/* Top edge above keyboard */}
        <div className="h-10 w-full bg-[#050505] flex items-end">
          <div className="h-[3px] w-full bg-[#1a1a1a]" />
        </div>
        {/* Keyboard area */}
        <div
          className="flex relative flex-col items-center justify-end gap-1 h-full pb-8"
          style={{ boxShadow: '0px 0px 5px 5px #1d1d1d inset' }}
        >
          <Row1 />
          <Row2 />
          <Row3 />
          <Row4 />
          <Row5 />
          <KbdMisc />
          <Trackpad />
          <Notch />
        </div>
      </div>
    </div>
  );
};

const Lid = ({ scaleX, scaleY, rotate, translate, src, isVideo, badge, showGradient }) => {
  return (
    <div className="relative [perspective:800px]">
      <div
        style={{
          transform: 'perspective(800px) rotateX(-25deg) translateZ(0px)',
          transformOrigin: 'bottom',
          transformStyle: 'preserve-3d',
        }}
        className="h-[12rem] w-[32rem] bg-[#010101] rounded-2xl p-2 relative"
      >
        <div
          style={{ boxShadow: '0px 2px 0px 2px var(--neutral-900) inset' }}
          className="absolute inset-0 bg-[#010101] rounded-2xl"
        />
        {/* Camera dot */}
        <div className="absolute top-2 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-[#1a1a1a] z-10 flex items-center justify-center">
          <div className="w-[3px] h-[3px] rounded-full bg-[#333]" />
        </div>

        {/* Screen content */}
        <div className="relative overflow-hidden rounded-xl w-full h-full bg-black">
          {src ? (
            isVideo ? (
              <video
                src={src}
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-cover object-left-top"
              />
            ) : (
              <img
                src={src}
                alt="screen"
                className="w-full h-full object-cover object-left-top"
              />
            )
          ) : (
            /* Blank screen — subtle dark gradient */
            <div className="w-full h-full bg-gradient-to-br from-[#0a0a0a] to-[#1a1a1a]" />
          )}
          {showGradient && (
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          )}
          {badge && (
            <div className="absolute top-4 right-4 z-20">{badge}</div>
          )}
        </div>
      </div>

      {/* Animated lid overlay */}
      <motion.div
        style={{ scaleX, scaleY, rotate, translateY: translate }}
        className="absolute inset-0 bg-[#010101] rounded-2xl backface-hidden origin-[bottom_center]"
        transformTemplate={({ scaleX, scaleY, rotate, translateY }) =>
          `perspective(800px) translateZ(0) rotateX(${rotate}) scaleX(${scaleX}) scaleY(${scaleY}) translateY(${translateY})`
        }
      />
    </div>
  );
};

/* ── Keyboard rows ── */
const Row1 = () => (
  <div className="flex gap-[2px]">
    {['esc', 'F1','F2','F3','F4','F5','F6','F7','F8','F9','F10','F11','F12'].map(k => (
      <Key key={k} className={k === 'esc' ? 'w-[2.5rem]' : 'w-[2.1rem]'}>{k}</Key>
    ))}
  </div>
);
const Row2 = () => (
  <div className="flex gap-[2px]">
    {['`','1','2','3','4','5','6','7','8','9','0','-','='].map(k => (
      <Key key={k} className="w-[2.1rem]">{k}</Key>
    ))}
    <Key className="w-[3.4rem]">delete</Key>
  </div>
);
const Row3 = () => (
  <div className="flex gap-[2px]">
    <Key className="w-[2.8rem]">tab</Key>
    {['q','w','e','r','t','y','u','i','o','p','[',']','\\'].map(k => (
      <Key key={k} className="w-[2.1rem]">{k}</Key>
    ))}
  </div>
);
const Row4 = () => (
  <div className="flex gap-[2px]">
    <Key className="w-[3.2rem]">caps</Key>
    {['a','s','d','f','g','h','j','k','l',';',"'"].map(k => (
      <Key key={k} className="w-[2.1rem]">{k}</Key>
    ))}
    <Key className="w-[3.8rem]">return</Key>
  </div>
);
const Row5 = () => (
  <div className="flex gap-[2px]">
    <Key className="w-[4.6rem]">shift</Key>
    {['z','x','c','v','b','n','m',',','.','/',].map(k => (
      <Key key={k} className="w-[2.1rem]">{k}</Key>
    ))}
    <Key className="w-[4.6rem]">shift</Key>
  </div>
);
const KbdMisc = () => (
  <div className="flex gap-[2px]">
    {['fn','ctrl','opt'].map(k => <Key key={k} className="w-[2.5rem]">{k}</Key>)}
    <Key className="w-[3rem]">cmd</Key>
    <Key className="w-[11rem]">{''}</Key>
    <Key className="w-[3rem]">cmd</Key>
    {['opt','←','↑↓','→'].map(k => <Key key={k} className="w-[2.1rem]">{k}</Key>)}
  </div>
);
const Trackpad = () => (
  <div className="w-[7rem] h-[4.5rem] rounded-xl bg-[#1d1d1f] border border-white/[0.05] mt-1" />
);
const Notch = () => (
  <div className="w-[4rem] h-[0.6rem] bg-[#050505] rounded-b-full mx-auto" />
);

const Key = ({ children, className = '' }) => (
  <div
    className={`h-[2.1rem] rounded-[3px] flex items-center justify-center
      bg-gradient-to-b from-[#2e2e30] to-[#252527]
      border border-white/[0.05] shadow-[0_1px_0_rgba(0,0,0,0.6)]
      text-white/25 text-[9px] font-dm select-none ${className}`}
  >
    {children}
  </div>
);
