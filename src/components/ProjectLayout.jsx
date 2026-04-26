import { Link } from 'react-router-dom';

export default function ProjectLayout({ children, title, darkBg = false }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className={`min-h-screen ${darkBg ? 'bg-black' : 'bg-krypt-cream'} text-krypt-charcoal`}>
      {/* Back Navigation - Small and barely visible */}
      <div className="fixed top-4 left-4 z-[9999]">
        <Link
          to="/projects"
          onClick={scrollToTop}
          className={`inline-flex items-center gap-1 transition-colors text-sm ${darkBg ? 'text-white/40 hover:text-white/70' : 'text-krypt-orange/40 hover:text-krypt-orange/60'}`}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back
        </Link>
      </div>

      {/* Demo Content - Full width without container constraints */}
      <main className="w-full">
        {children}
      </main>
    </div>
  );
}
