/**
 * Numbered editorial process step.
 * Usage: <ProcessStep number="01" title="Share Your Vision" description="..." />
 */
export default function ProcessStep({ number, title, description, last = false }) {
  return (
    <div className={`group flex gap-8 items-start py-10 ${!last ? 'border-b border-krypt-olive/20' : ''} hover:bg-krypt-sand/20 transition-colors duration-300 px-4 rounded-xl`}>
      {/* Editorial number */}
      <span className="font-playfair text-[4.5rem] font-black text-krypt-orange/15 group-hover:text-krypt-orange/30 transition-colors duration-500 leading-none pt-1 select-none flex-shrink-0 w-24 text-right">
        {number}
      </span>

      <div className="flex-1 pt-3">
        <h3 className="font-playfair text-2xl md:text-3xl font-bold text-krypt-charcoal mb-3 leading-tight">
          {title}
        </h3>
        <p className="font-dm text-krypt-charcoal/55 leading-relaxed max-w-lg">
          {description}
        </p>
      </div>

      {/* Arrow indicator */}
      <div className="flex-shrink-0 pt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <svg className="w-5 h-5 text-krypt-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
      </div>
    </div>
  );
}
