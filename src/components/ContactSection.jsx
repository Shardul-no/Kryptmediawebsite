import Waves from './Waves';
import BlurText from './BlurText';
import ScrollReveal from './ScrollReveal';
import GradualBlur from './GradualBlur';
import SectionReveal from './SectionReveal';

const ContactSection = () => {
  return (
    <section className="relative min-h-screen overflow-hidden bg-beige-100 text-charcoal pt-24 pb-20 lg:pt-32 lg:pb-28">
      {/* Subtle waves background */}
      <div className="absolute inset-0 z-0 opacity-[0.2]">
        <Waves
          lineColor="rgba(13,148,136,0.3)"
          waveAmpX={12}
          waveAmpY={6}
          xGap={20}
          yGap={36}
        />
      </div>
      <div className="absolute inset-0 bg-beige-100/30 z-[1]" />

      <div className="relative z-10 flex justify-center items-center px-4">
        <div className="w-full max-w-[570px]">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-charcoal mb-4">
              <BlurText
                text="Let's Build Something Bold"
                className="text-charcoal"
                delay={80}
                stepDuration={0.4}
                animateBy="words"
              />
            </h1>
            <GradualBlur delay={0.15}>
              <p className="text-lg text-charcoal-muted">
                Have a project in mind? Let's make it happen.
              </p>
            </GradualBlur>
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
            <SectionReveal delay={0.1}>
              <a
                href="https://wa.me/9930183457?text=Hello%2C%20I%27d%20like%20to%20discuss%20a%20project"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-white font-semibold py-3 px-6 rounded-full transition-colors"
              >
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
                  alt="WhatsApp"
                  className="w-6 h-6"
                />
                Chat on WhatsApp
              </a>
            </SectionReveal>
            <SectionReveal delay={0.2}>
              <a
                href="mailto:info@kryptmedia.in"
                className="inline-flex items-center justify-center gap-2 border border-teal-600/20 hover:border-teal-600/50 text-teal-600 font-medium py-3 px-6 rounded-full transition-colors"
              >
                Email Us
              </a>
            </SectionReveal>
          </div>

          <div className="space-y-8">
            <SectionReveal delay={0.15}>
              <div className="flex items-start gap-4 p-4 rounded-xl bg-white border border-teal-500/10 shadow-sm">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-teal-500/10 text-teal-600 text-xl">
                  📍
                </div>
                <div>
                  <h4 className="mb-1 text-lg font-semibold text-charcoal">Location</h4>
                  <p className="text-charcoal-muted">Andheri West, Mumbai</p>
                </div>
              </div>
            </SectionReveal>
            <SectionReveal delay={0.2}>
              <div className="flex items-start gap-4 p-4 rounded-xl bg-white border border-teal-500/10 shadow-sm">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-teal-500/10 text-teal-600 text-xl">
                  📞
                </div>
                <div>
                  <h4 className="mb-1 text-lg font-semibold text-charcoal">Phone</h4>
                  <p className="text-charcoal-muted">9930183457</p>
                </div>
              </div>
            </SectionReveal>
            <SectionReveal delay={0.25}>
              <div className="flex items-start gap-4 p-4 rounded-xl bg-white border border-teal-500/10 shadow-sm">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-teal-500/10 text-teal-600 text-xl">
                  ✉️
                </div>
                <div>
                  <h4 className="mb-1 text-lg font-semibold text-charcoal">Email</h4>
                  <p className="text-charcoal-muted">info@kryptmedia.in</p>
                </div>
              </div>
            </SectionReveal>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
