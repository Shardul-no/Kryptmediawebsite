/**
 * Numbered editorial process step.
 * Usage: <ProcessStep number="01" title="Share Your Vision" description="..." />
 */
export default function ProcessStep({ number, title, description, last = false }) {
  return (
    <div className="relative flex-1">
      {/* Box */}
      <div className="border border-krypt-olive/20 rounded-2xl bg-krypt-cream/60 backdrop-blur-sm p-6 md:p-8 h-full hover:bg-krypt-sand/20 transition-colors duration-300">
        {/* Number */}
        <span className="font-playfair text-[3rem] md:text-[4rem] font-black text-krypt-orange/20 leading-none select-none block mb-4">
          {number}
        </span>

        {/* Content */}
        <h3 className="font-playfair text-xl md:text-2xl font-bold text-krypt-charcoal mb-3 leading-tight">
          {title}
        </h3>
        <p className="font-dm text-krypt-charcoal/55 leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
}
