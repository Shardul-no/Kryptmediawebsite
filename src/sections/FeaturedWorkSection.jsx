import { useRef, useEffect, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/* ─────────────────────────────────────────────
   PROJECTS
───────────────────────────────────────────── */
const projects = [
  {
    id: 1,
    title: 'DMX RGIT',
    tag: 'UI/UX & Development',
    mediaType: 'video',
    media: '/herohorizontal/From KlickPin CF Redo media website design _ Interactive web design Webpage design Web design examples.mp4',
    url: 'https://www.dmxrgit.com',
    cursor: 'view',
  },
  {
    id: 2,
    title: 'Rajhans Travels',
    tag: 'Travel & Tourism',
    mediaType: 'video',
    media: '/herohorizontal/d84c51e6a87f5549ea177e87e3771ad9.mp4',
    url: 'https://rajhanstravels.com/',
    cursor: 'view',
  },
  {
    id: 3,
    title: 'Midnight Sound Studio',
    tag: 'Interactive Experience',
    mediaType: 'video',
    media: '/herohorizontal/46d06c94bfc3fd977a1cf86cbc56f81c_720w.mp4',
    isDemo: true,
    url: null,
    cursor: 'demo',
  },
  {
    id: 4,
    title: 'Siena Film Foundation',
    tag: 'Brand & Film',
    mediaType: 'video',
    media: '/herohorizontal/From KlickPin CF Introducing the Siena Film Foundation—where bold storytelling meets cinematic innovation If you… [Video] _ Interactive web design Portfolio website design Webpage design.mp4',
    url: null,
    cursor: 'coming',
  },
  {
    id: 5,
    title: 'Motion & Identity',
    tag: 'Creative Direction',
    mediaType: 'video',
    media: '/herohorizontal/From KlickPin CF Pin von たなか auf inspiration _ Web design Kommunikationsdesign WebdesignDaniel Oliveira avatar link.mp4',
    url: null,
    cursor: 'coming',
  },
];

/* ─────────────────────────────────────────────
   CURSOR CONFIG
───────────────────────────────────────────── */
const CURSOR = {
  idle:   { size: 14,  bg: 'rgba(237,146,29,0.55)', text: null,              textColor: 'transparent' },
  view:   { size: 110, bg: '#ED921D',                text: 'View\nProject',   textColor: '#15171C'     },
  demo:   { size: 110, bg: '#ABAD8C',                text: 'Demo\nOnly',      textColor: '#15171C'     },
  coming: { size: 110, bg: 'rgba(255,255,255,0.18)', text: 'Coming\nSoon',    textColor: '#ffffff'     },
};

/* ─────────────────────────────────────────────
   BLOB CURSOR COMPONENT
───────────────────────────────────────────── */
function BlobCursor({ cursorType, visible }) {
  const outerRef = useRef(null);

  /* GSAP quickTo — smooth magnetic following */
  useEffect(() => {
    const el = outerRef.current;
    if (!el) return;
    const xTo = gsap.quickTo(el, 'x', { duration: 0.45, ease: 'power3' });
    const yTo = gsap.quickTo(el, 'y', { duration: 0.45, ease: 'power3' });
    const move = (e) => { xTo(e.clientX); yTo(e.clientY); };
    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, []);

  const cfg = CURSOR[cursorType] ?? CURSOR.idle;

  return (
    /* Outer: GSAP moves this to (mouseX, mouseY) */
    <div
      ref={outerRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 9999,
        pointerEvents: 'none',
        willChange: 'transform',
        opacity: visible ? 1 : 0,
        transition: 'opacity 0.3s ease',
      }}
    >
      {/* Inner: centres the circle on the cursor point */}
      <div
        style={{
          transform: 'translate(-50%, -50%)',
          width: `${cfg.size}px`,
          height: `${cfg.size}px`,
          borderRadius: '50%',
          background: cfg.bg,
          backdropFilter: cursorType === 'coming' ? 'blur(10px)' : 'none',
          border: cursorType === 'coming' ? '1px solid rgba(255,255,255,0.25)' : 'none',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          /* Morph transition */
          transition:
            'width 0.45s cubic-bezier(0.34,1.56,0.64,1), ' +
            'height 0.45s cubic-bezier(0.34,1.56,0.64,1), ' +
            'background 0.35s ease, ' +
            'border-radius 0.35s ease, ' +
            'backdrop-filter 0.35s ease',
        }}
      >
        {cfg.text && (
          <span
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 600,
              fontSize: '13px',
              color: cfg.textColor,
              textAlign: 'center',
              lineHeight: 1.35,
              whiteSpace: 'pre-line',
              opacity: cursorType !== 'idle' ? 1 : 0,
              transition: 'opacity 0.2s ease 0.15s',
              userSelect: 'none',
            }}
          >
            {cfg.text}
          </span>
        )}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   CARD
───────────────────────────────────────────── */
function Card({ project, onEnter, onLeave }) {
  const handleClick = () => {
    if (project.url) window.open(project.url, '_blank', 'noopener');
  };

  return (
    <div
      className="relative flex-shrink-0 overflow-hidden rounded-2xl group"
      style={{
        width: 'clamp(520px, 58vw, 900px)',
        aspectRatio: '16 / 9',
        cursor: 'none',
      }}
      onMouseEnter={() => onEnter(project.cursor)}
      onMouseLeave={onLeave}
      onClick={handleClick}
    >
      {/* ── Media ── */}
      <div className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-[1.04] will-change-transform">
        {project.mediaType === 'video' ? (
          <video
            src={project.media}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          />
        ) : (
          <img
            src={project.media}
            alt={project.title}
            loading="lazy"
            className="w-full h-full object-cover"
          />
        )}
      </div>

      {/* ── Gradient vignette ── */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent pointer-events-none" />

      {/* ── Hover dark wash ── */}
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-400 pointer-events-none" />

      {/* ── Bottom label ── */}
      <div className="absolute bottom-0 left-0 right-0 px-7 py-6 flex items-end justify-between pointer-events-none">
        <div>
          <p className="font-dm text-white/50 text-[11px] tracking-[0.22em] uppercase mb-1.5">
            {project.tag}
          </p>
          <h3
            className="font-playfair font-bold text-white leading-tight"
            style={{ fontSize: 'clamp(1rem, 1.6vw, 1.45rem)' }}
          >
            {project.title}
          </h3>
        </div>

        {/* Arrow circle */}
        {project.url && (
          <div className="flex-shrink-0 w-9 h-9 rounded-full border border-white/25 flex items-center justify-center opacity-0 group-hover:opacity-100 translate-x-1 translate-y-1 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-300">
            <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7v10" />
            </svg>
          </div>
        )}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   MAIN SECTION
───────────────────────────────────────────── */
export default function FeaturedWorkSection() {
  const sectionRef    = useRef(null);
  const trackRef      = useRef(null);
  const [isMobile,    setIsMobile]    = useState(() => window.matchMedia('(max-width: 767px)').matches);
  const [cursorType,  setCursorType]  = useState('idle');
  const [cursorOn,    setCursorOn]    = useState(false); // only show inside section

  /* ── Mobile detection ── */
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)');
    const h = (e) => setIsMobile(e.matches);
    mq.addEventListener('change', h);
    return () => mq.removeEventListener('change', h);
  }, []);

  /* ── GSAP horizontal scroll ── */
  useEffect(() => {
    if (isMobile) return;

    const section = sectionRef.current;
    const track   = trackRef.current;
    if (!section || !track) return;

    /* distance = how far track must travel so last card's CENTER
       aligns with the viewport's center before scroll releases */
    const getDistance = () => {
      const lastCard = track.lastElementChild;
      const cardWidth = lastCard ? lastCard.offsetWidth : 0;
      return track.scrollWidth - window.innerWidth / 2 - cardWidth / 2;
    };

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          pin: true,
          scrub: 1.4,
          anticipatePin: 1,
          start: 'top top',
          end: () => `+=${getDistance()}`,
          invalidateOnRefresh: true,
        },
      });
      tl.to(track, { x: () => -getDistance(), ease: 'none' });
    }, section);

    return () => ctx.revert();
  }, [isMobile]);

  const handleCardEnter = useCallback((type) => setCursorType(type), []);
  const handleCardLeave = useCallback(() => setCursorType('idle'), []);

  /* ── Unified section with mobile/desktop layouts ── */
  return (
    <>
      {/* Blob cursor — rendered outside section so fixed pos works cleanly */}
      {!isMobile && <BlobCursor cursorType={cursorType} visible={cursorOn} />}

      <section
        ref={sectionRef}
        className="bg-krypt-cream overflow-hidden"
        style={{
          height: isMobile ? 'auto' : '100vh',
          cursor: isMobile ? 'auto' : (cursorOn ? 'none' : 'auto')
        }}
        onMouseEnter={() => !isMobile && setCursorOn(true)}
        onMouseLeave={() => { setCursorOn(false); setCursorType('idle'); }}
      >
        {isMobile ? (
          /* ── Mobile: native horizontal swipe scroll ── */
          <div className="pt-20 pb-10">
            <div className="px-5 mb-6 flex items-end justify-between">
              <h2 className="font-playfair font-bold text-krypt-charcoal text-3xl">
                Featured works
              </h2>
              <span className="font-dm text-krypt-charcoal/35 text-xs tracking-[0.18em] uppercase">
                Swipe
              </span>
            </div>
            <div
              className="flex gap-4 no-scrollbar"
              style={{
                overflowX: 'auto',
                overflowY: 'hidden',
                WebkitOverflowScrolling: 'touch',
                scrollSnapType: 'x mandatory',
                paddingLeft: '20px',
                paddingRight: '20px',
                paddingBottom: '12px',
              }}
            >
              {projects.map((p) => (
                <div
                  key={p.id}
                  className="relative rounded-2xl overflow-hidden flex-shrink-0"
                  style={{
                    width: '80vw',
                    aspectRatio: '16/9',
                    scrollSnapAlign: 'start',
                  }}
                  onClick={() => p.url && window.open(p.url, '_blank', 'noopener')}
                >
                  <video src={p.media} autoPlay loop muted playsInline className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 p-5">
                    <p className="font-dm text-white/50 text-[10px] tracking-widest uppercase mb-1">{p.tag}</p>
                    <h3 className="font-playfair font-bold text-white text-lg">{p.title}</h3>
                  </div>
                  {p.url && (
                    <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-krypt-orange flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7v10" />
                      </svg>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ) : (
          /* ── Desktop: pinned horizontal scroll ── */
          <div className="flex flex-col h-full pt-20">

            {/* ── Heading ── */}
            <div className="flex-shrink-0 px-10 md:px-16 pt-10 pb-8 flex items-end justify-between">
              <h2
                className="font-playfair font-bold text-krypt-charcoal"
                style={{ fontSize: 'clamp(1.8rem, 3vw, 2.75rem)' }}
              >
                Featured works
              </h2>
              <span className="font-dm text-krypt-charcoal/35 text-sm hidden md:block">
                {projects.length} projects
              </span>
            </div>

            {/* ── Card track — vertically centred ── */}
            <div className="flex-1 flex items-center overflow-visible">
              <div
                ref={trackRef}
                className="flex gap-5 will-change-transform"
                /*
                  pl only — no right padding so last card's right edge
                  lands exactly at viewport right when fully scrolled.
                */
                style={{ width: 'max-content', paddingLeft: 'clamp(40px, 4vw, 64px)' }}
              >
                {projects.map((project) => (
                  <Card
                    key={project.id}
                    project={project}
                    onEnter={handleCardEnter}
                    onLeave={handleCardLeave}
                  />
                ))}
              </div>
            </div>

            {/* ── Scroll hint ── */}
            <div className="flex-shrink-0 px-10 md:px-16 pb-8 flex items-center gap-3">
              <div className="w-5 h-px bg-krypt-charcoal/20" />
              <span className="font-dm text-krypt-charcoal/30 text-xs tracking-[0.18em] uppercase">
                Scroll to explore
              </span>
            </div>

          </div>
        )}
      </section>
    </>
  );
}
