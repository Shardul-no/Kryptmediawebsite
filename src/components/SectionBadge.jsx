/**
 * Small uppercase pill label above section headings.
 * Usage: <SectionBadge label="WHY US" />
 */
export default function SectionBadge({ label, dark = false }) {
  return (
    <span
      className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs tracking-[0.22em] uppercase mb-6 border font-dm font-medium ${
        dark
          ? 'border-krypt-orange/40 text-krypt-orange bg-krypt-orange/10'
          : 'border-krypt-orange/50 text-krypt-orange bg-krypt-orange/8'
      }`}
    >
      <span className="w-1 h-1 rounded-full bg-krypt-orange inline-block" />
      {label}
    </span>
  );
}
