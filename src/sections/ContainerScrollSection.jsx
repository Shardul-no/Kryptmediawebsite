import { ContainerScroll } from '@/components/ui/container-scroll-animation';

export default function ContainerScrollSection() {
  return (
    <div className="flex flex-col overflow-hidden bg-krypt-cream">
      <ContainerScroll
        titleComponent={
          <div className="text-center">
            <p className="font-dm text-krypt-orange text-[10px] tracking-[0.3em] uppercase mb-3">
              Digital Experiences
            </p>
            <h2
              className="font-playfair font-black text-krypt-charcoal"
              style={{ fontSize: 'clamp(2rem, 5vw, 3.8rem)' }}
            >
              Websites That{' '}
              <span className="text-krypt-orange italic">Stand Out</span>
            </h2>
            <p className="font-dm text-krypt-charcoal/50 mt-3 text-base md:text-lg">
              Every pixel deliberate. Every interaction considered.
            </p>
          </div>
        }
      >
        <video
          src="/herohorizontal/From KlickPin CF Redo media website design _ Interactive web design Webpage design Web design examples.mp4"
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover object-left-top rounded-2xl"
        />
      </ContainerScroll>
    </div>
  );
}
