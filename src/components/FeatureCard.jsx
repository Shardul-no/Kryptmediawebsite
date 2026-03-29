/**
 * Pill-bordered feature card with label, icon, title, description.
 */
export default function FeatureCard({ icon, label, title, description }) {
  return (
    <div className="group relative bg-white/50 border border-krypt-olive/25 rounded-2xl p-8 hover:-translate-y-1.5 transition-all duration-300 hover:shadow-2xl hover:shadow-krypt-orange/10 hover:border-krypt-orange/30">
      {/* Pill label */}
      <span className="inline-block px-3 py-1 rounded-full border border-krypt-orange/30 text-krypt-orange text-[10px] tracking-[0.2em] uppercase font-dm mb-5 bg-krypt-orange/6">
        {label}
      </span>

      {/* Icon */}
      {icon && (
        <div className="w-10 h-10 rounded-xl bg-krypt-orange/10 flex items-center justify-center text-krypt-orange mb-5 group-hover:bg-krypt-orange group-hover:text-white transition-all duration-300">
          {icon}
        </div>
      )}

      <h3 className="font-playfair text-xl font-bold text-krypt-charcoal mb-3 leading-snug">
        {title}
      </h3>
      <p className="font-dm text-sm text-krypt-charcoal/60 leading-relaxed">
        {description}
      </p>

      {/* Subtle corner accent */}
      <div className="absolute bottom-0 right-0 w-16 h-16 rounded-br-2xl overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="absolute bottom-0 right-0 w-8 h-8 bg-krypt-orange/15 rounded-tl-full" />
      </div>
    </div>
  );
}
