import CurvedLoop from './CurvedLoop';
import BlurText from './BlurText';

export default function ServiceDetailHero({
  serviceName,
  headline = 'Custom Digital Experiences Designed to Engage',
  subtext = 'We combine UX thinking, clean development, and strategic planning.',
}) {
  return (
    <section className="relative min-h-[60vh] flex flex-col items-center justify-center overflow-hidden pt-24 pb-16 bg-krypt-cream">
      {/* Curved loop as background — repeating service name */}
      <div className="absolute inset-0 z-0 opacity-30 pointer-events-none">
        <CurvedLoop
          marqueeText={`${serviceName} · `}
          speed={1.2}
          curveAmount={180}
          interactive={false}
          className="fill-krypt-orange"
        />
      </div>

      <div className="absolute inset-0 bg-krypt-cream/20 z-[1]" />

      <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-krypt-charcoal mb-6">
          <BlurText
            text={headline}
            className="text-krypt-charcoal"
            delay={70}
            stepDuration={0.4}
            animateBy="words"
          />
        </h1>
        <p className="text-lg text-krypt-charcoal/55">
          <BlurText
            text={subtext}
            className="text-krypt-charcoal/55"
            delay={50}
            stepDuration={0.35}
          />
        </p>
      </div>
    </section>
  );
}
