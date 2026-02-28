import Waves from './Waves';
import BlurText from './BlurText';
import GradualBlur from './GradualBlur';
import SectionReveal from './SectionReveal';
import ContactForm from './ContactForm';

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

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 lg:mb-20">
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-charcoal mb-6 tracking-tight">
            <BlurText
              text="Let's Build Something Bold"
              className="text-charcoal"
              delay={80}
              stepDuration={0.4}
              animateBy="words"
            />
          </h1>
          <GradualBlur delay={0.15}>
            <p className="text-lg md:text-xl text-charcoal/60 max-w-2xl mx-auto">
              Have a project in mind? Or just want to say hello?
              Fill out the form below and we'll get back to you shortly.
            </p>
          </GradualBlur>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Left Column: Contact Info */}
          <div className="space-y-10 order-2 lg:order-1">
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-charcoal px-2">Reach out directly</h3>
              <div className="flex flex-col sm:flex-row gap-4">
                <SectionReveal delay={0.1}>
                  <a
                    href="https://wa.me/9930183457?text=Hello%2C%20I%27d%20like%20to%20discuss%20a%20project"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-3 bg-emerald-500 hover:bg-emerald-400 text-white font-bold py-4 px-8 rounded-2xl transition-all shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30 active:scale-95"
                  >
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
                      alt="WhatsApp"
                      className="w-6 h-6 invert brightness-0"
                    />
                    WhatsApp Chat
                  </a>
                </SectionReveal>
                <SectionReveal delay={0.2}>
                  <a
                    href="mailto:info@kryptmedia.in"
                    className="flex items-center justify-center gap-3 border-2 border-charcoal/10 hover:border-charcoal/30 text-charcoal font-bold py-4 px-8 rounded-2xl transition-all active:scale-95"
                  >
                    Email Us
                  </a>
                </SectionReveal>
              </div>
            </div>

            <div className="space-y-4">
              <SectionReveal delay={0.15}>
                <div className="group flex items-center gap-6 p-6 rounded-2xl bg-white border border-teal-500/5 shadow-sm hover:shadow-md hover:border-teal-500/20 transition-all">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-teal-500/10 text-teal-600 text-2xl group-hover:scale-110 transition-transform">
                    📍
                  </div>
                  <div>
                    <h4 className="text-sm font-bold uppercase tracking-wider text-charcoal/40 mb-1">Our Studio</h4>
                    <p className="text-xl font-semibold text-charcoal">Andheri West, Mumbai</p>
                  </div>
                </div>
              </SectionReveal>
              <SectionReveal delay={0.2}>
                <div className="group flex items-center gap-6 p-6 rounded-2xl bg-white border border-teal-500/5 shadow-sm hover:shadow-md hover:border-teal-500/20 transition-all">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-teal-500/10 text-teal-600 text-2xl group-hover:scale-110 transition-transform">
                    📞
                  </div>
                  <div>
                    <h4 className="text-sm font-bold uppercase tracking-wider text-charcoal/40 mb-1">Talk to us</h4>
                    <p className="text-xl font-semibold text-charcoal">9930183457</p>
                  </div>
                </div>
              </SectionReveal>
              <SectionReveal delay={0.25}>
                <div className="group flex items-center gap-6 p-6 rounded-2xl bg-white border border-teal-500/5 shadow-sm hover:shadow-md hover:border-teal-500/20 transition-all">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-teal-500/10 text-teal-600 text-2xl group-hover:scale-110 transition-transform">
                    ✉️
                  </div>
                  <div>
                    <h4 className="text-sm font-bold uppercase tracking-wider text-charcoal/40 mb-1">General Inquiry</h4>
                    <p className="text-xl font-semibold text-charcoal">info@kryptmedia.in</p>
                  </div>
                </div>
              </SectionReveal>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="order-1 lg:order-2">
            <SectionReveal delay={0.3}>
              <div className="bg-white/40 backdrop-blur-xl border border-white p-2 rounded-[2.5rem] shadow-2xl shadow-charcoal/5">
                <div className="bg-white rounded-[2rem] p-8 md:p-10">
                  <h3 className="text-2xl font-bold text-charcoal mb-8">Send us a message</h3>
                  <ContactForm />
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
