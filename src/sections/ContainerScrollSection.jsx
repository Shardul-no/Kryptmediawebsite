import { ContainerScroll } from '@/components/ui/container-scroll-animation';
import { useMediaQuery } from '@/hooks/useMediaQuery';

export default function ContainerScrollSection() {
  const isMobile = useMediaQuery('(max-width: 767px)');

  return (
    <div className="flex flex-col overflow-hidden bg-krypt-cream">
      <ContainerScroll
        titleComponent={
          <div className="text-center">
            <p className="font-dm text-krypt-orange text-[11px] sm:text-[12px] tracking-[0.3em] uppercase mb-3">
              Digital Experiences
            </p>
            <h2
              className="font-playfair font-black text-krypt-charcoal"
              style={{ fontSize: 'clamp(1.6rem, 5vw, 3.8rem)' }}
            >
              Websites That{' '}
              <span className="text-krypt-orange italic">Stand Out</span>
            </h2>
            <p className="font-dm text-krypt-charcoal/50 mt-2 text-sm md:text-lg">
              Every pixel deliberate. Every interaction considered.
            </p>
          </div>
        }
      >
        <video
          src="/herohorizontal/ipad.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload={isMobile ? 'metadata' : 'none'}
          className="w-full h-full object-cover object-[center_50%] rounded-2xl"
        />
      </ContainerScroll>
    </div>
  );
}
