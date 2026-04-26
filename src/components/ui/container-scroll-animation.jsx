import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export const ContainerScroll = ({ titleComponent, children }) => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef });

  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const scaleDimensions = isMobile ? [0.7, 0.9] : [1.05, 1];

  const rotate = useTransform(scrollYProgress, [0, 1], [20, 0]);
  const scale  = useTransform(scrollYProgress, [0, 1], scaleDimensions);
  const translate = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <div
      ref={containerRef}
      className="h-[80rem] flex items-center justify-center relative p-20"
    >
      <div className="py-40 w-full relative" style={{ perspective: '1000px' }}>
        <Header translate={translate} titleComponent={titleComponent} />
        <Card rotate={rotate} scale={scale} translate={translate}>
          {children}
        </Card>
      </div>
    </div>
  );
};

const Header = ({ translate, titleComponent }) => (
  <motion.div
    style={{ translateY: translate }}
    className="max-w-5xl mx-auto text-center mb-4"
  >
    {titleComponent}
  </motion.div>
);

const Card = ({ rotate, scale, translate, children }) => (
  <motion.div
    style={{
      rotateX: rotate,
      scale,
      translateY: translate,
      boxShadow:
        '0 0 #0000004d, 0 9px 20px #0000004a, 0 37px 37px #00000042, 0 84px 50px #00000026, 0 149px 60px #0000000a, 0 233px 65px #00000003',
    }}
    className="max-w-5xl -mt-12 mx-auto h-[30rem] md:h-[40rem] w-full border-4 border-[#6C6C6C] p-2 md:p-6 bg-[#222222] rounded-[30px] shadow-2xl"
  >
    <div className="h-full w-full overflow-hidden rounded-2xl bg-zinc-900">
      {children}
    </div>
  </motion.div>
);
