/**
 * Horizontal auto-scrolling marquee strip.
 * Used between sections for brand rhythm.
 */
export default function MarqueeTicker({
  text = 'DECODE · DELIVER · DOMINATE · EST. 2024 · KRYPT MEDIA ·',
  dark = false,
}) {
  // Duplicate enough to create seamless loop (CSS animates -50%)
  const items = Array.from({ length: 12 }, () => text);

  return (
    <div
      className={`overflow-hidden py-4 ${
        dark ? 'bg-krypt-charcoal' : 'bg-krypt-orange'
      }`}
    >
      <div className="animate-marquee whitespace-nowrap flex will-change-transform">
        {items.map((item, i) => (
          <span
            key={i}
            className={`mx-10 text-xs tracking-[0.3em] uppercase font-dm flex-shrink-0 ${
              dark ? 'text-krypt-orange' : 'text-white'
            }`}
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
