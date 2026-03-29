import { Link } from 'react-router-dom';

/**
 * Pricing tier card with pill-bordered outline design.
 * Usage: <PricingCard tier="Pro" price="₹55,000" features={[...]} highlighted />
 */
export default function PricingCard({ tier, price, subtitle, features = [], highlighted = false, ctaText = 'Get Started' }) {
  return (
    <div
      className={`relative rounded-3xl p-8 border-2 flex flex-col transition-all duration-300 hover:-translate-y-2 ${
        highlighted
          ? 'bg-krypt-charcoal border-krypt-orange shadow-2xl shadow-krypt-orange/25 scale-[1.03]'
          : 'bg-krypt-cream/70 border-krypt-olive/30 hover:border-krypt-orange/50 hover:shadow-xl hover:shadow-krypt-orange/10'
      }`}
    >
      {/* Popular badge */}
      {highlighted && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2">
          <span className="bg-krypt-orange text-white text-[10px] font-dm tracking-[0.25em] uppercase px-5 py-1.5 rounded-full shadow-lg shadow-krypt-orange/40">
            Most Popular
          </span>
        </div>
      )}

      {/* Header */}
      <div className="mb-8">
        <h3 className={`font-playfair text-2xl font-bold mb-1 ${highlighted ? 'text-white' : 'text-krypt-charcoal'}`}>
          {tier}
        </h3>
        {subtitle && (
          <p className={`font-dm text-sm mb-5 ${highlighted ? 'text-white/50' : 'text-krypt-charcoal/45'}`}>
            {subtitle}
          </p>
        )}
        <div className="flex items-end gap-2 mt-4">
          <span className={`font-playfair text-4xl font-black ${highlighted ? 'text-krypt-orange' : 'text-krypt-charcoal'}`}>
            {price}
          </span>
        </div>
      </div>

      {/* Features */}
      <ul className="space-y-3 flex-1 mb-8">
        {features.map((f, i) => (
          <li key={i} className="flex items-start gap-3">
            <span className="text-krypt-orange font-bold mt-0.5 flex-shrink-0 text-base leading-none">+</span>
            <span className={`font-dm text-sm leading-relaxed ${highlighted ? 'text-white/75' : 'text-krypt-charcoal/65'}`}>
              {f}
            </span>
          </li>
        ))}
      </ul>

      {/* CTA */}
      <Link
        to="/contact"
        className={`block w-full py-3.5 rounded-full font-dm font-medium text-sm tracking-wide text-center transition-all duration-300 ${
          highlighted
            ? 'bg-krypt-orange text-white hover:bg-krypt-apricot shadow-lg shadow-krypt-orange/30'
            : 'border-2 border-krypt-orange/40 text-krypt-orange hover:bg-krypt-orange hover:text-white hover:border-krypt-orange'
        }`}
      >
        {ctaText}
      </Link>
    </div>
  );
}
