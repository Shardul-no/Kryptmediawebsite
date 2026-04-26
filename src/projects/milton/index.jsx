import { useEffect, useRef, useState } from 'react';
import rawStyles from './styles.css?raw';

const SEQUENCES = [
  { id: 'v1', folder: 'v1', totalFrames: 128, prefix: 'ezgif-frame-', ext: '.jpg' },
  { id: 'v2', folder: 'v2', totalFrames: 128, prefix: 'ezgif-frame-', ext: '.jpg' },
  { id: 'v3', folder: 'v3', totalFrames: 136, prefix: 'ezgif-frame-', ext: '.jpg' },
];

export default function MiltonDemo() {
  const canvasRef = useRef(null);
  const navRef = useRef(null);
  const hamburgerRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const progressFillRef = useRef(null);
  const heroTextRef = useRef(null);
  const featuresTitleRef = useRef(null);
  const compTitleRef = useRef(null);
  const endingLeftRef = useRef(null);
  const endingRightRef = useRef(null);
  
  const [isLoaded, setIsLoaded] = useState(false);
  const [loadingPercent, setLoadingPercent] = useState(0);
  const imageCacheRef = useRef({});
  const currentFrameRef = useRef({ seq: null, index: -1 });
  const rafIdRef = useRef(null);

  useEffect(() => {
    const styleEl = document.createElement('style');
    styleEl.textContent = rawStyles;
    document.head.appendChild(styleEl);
    return () => document.head.removeChild(styleEl);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const nav = navRef.current;
    const hamburger = hamburgerRef.current;
    const mobileMenu = mobileMenuRef.current;
    const progressFill = progressFillRef.current;
    const heroText = heroTextRef.current;
    const featuresTitle = featuresTitleRef.current;
    const compTitle = compTitleRef.current;
    const endingLeft = endingLeftRef.current;
    const endingRight = endingRightRef.current;

    const featureCards = [
      document.getElementById('feature-card-1'),
      document.getElementById('feature-card-2'),
      document.getElementById('feature-card-3'),
      document.getElementById('feature-card-4'),
    ];

    const compCallouts = [
      document.getElementById('comp-cap'),
      document.getElementById('comp-spout'),
      document.getElementById('comp-body'),
      document.getElementById('comp-base'),
    ];

    // Image preloading
    function framePath(seq, index) {
      const num = String(index + 1).padStart(3, '0');
      return `/projects/milton/${seq.folder}/${seq.prefix}${num}${seq.ext}`;
    }

    function preloadSequence(seq) {
      return new Promise((resolve) => {
        imageCacheRef.current[seq.id] = new Array(seq.totalFrames);
        let loaded = 0;
        for (let i = 0; i < seq.totalFrames; i++) {
          const img = new Image();
          img.src = framePath(seq, i);
          img.onload = () => {
            imageCacheRef.current[seq.id][i] = img;
            loaded++;
            setLoadingPercent(Math.round((loaded / (SEQUENCES.reduce((acc, s) => acc + s.totalFrames, 0))) * 100));
            if (loaded === seq.totalFrames) resolve();
          };
          img.onerror = () => {
            loaded++;
            setLoadingPercent(Math.round((loaded / (SEQUENCES.reduce((acc, s) => acc + s.totalFrames, 0))) * 100));
            if (loaded === seq.totalFrames) resolve();
          };
        }
      });
    }

    async function preloadAll() {
      await Promise.all(SEQUENCES.map(preloadSequence));
      setIsLoaded(true);
      drawFrame('v1', 0);
      onScroll();
    }

    // Canvas drawing
    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      if (currentFrameRef.current.seq !== null) {
        drawFrame(currentFrameRef.current.seq, currentFrameRef.current.index, true);
      }
    }

    function drawFrame(seqId, index, force = false) {
      if (!force && currentFrameRef.current.seq === seqId && currentFrameRef.current.index === index) return;
      const frames = imageCacheRef.current[seqId];
      if (!frames) return;
      const img = frames[index];
      if (!img) return;

      currentFrameRef.current.seq = seqId;
      currentFrameRef.current.index = index;

      const cw = canvas.width, ch = canvas.height;
      const iw = img.naturalWidth, ih = img.naturalHeight;
      const scale = Math.max(cw / iw, ch / ih);
      const dw = iw * scale, dh = ih * scale;
      const dx = (cw - dw) / 2, dy = (ch - dh) / 2;

      ctx.clearRect(0, 0, cw, ch);
      ctx.drawImage(img, dx, dy, dw, dh);
    }

    // Scroll logic
    function getSectionBounds() {
      return SEQUENCES.map(s => {
        const el = document.getElementById('section-' + s.id);
        return {
          id: s.id,
          top: el.offsetTop,
          height: el.offsetHeight,
          totalFrames: s.totalFrames,
        };
      });
    }

    function onScroll() {
      if (!isLoaded) return;

      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      progressFill.style.width = ((scrollY / docHeight) * 100) + '%';

      if (scrollY > 50) nav.classList.add('scrolled');
      else nav.classList.remove('scrolled');

      const sections = getSectionBounds();
      let activeSeq = null, activeFrame = 0, localProgress = 0;

      for (const sec of sections) {
        if (scrollY >= sec.top && scrollY < sec.top + sec.height) {
          localProgress = (scrollY - sec.top) / sec.height;
          activeFrame = Math.min(sec.totalFrames - 1, Math.floor(localProgress * sec.totalFrames));
          activeSeq = sec.id;
          break;
        }
      }

      if (!activeSeq && scrollY >= sections[sections.length - 1].top) {
        activeSeq = 'v3'; activeFrame = SEQUENCES[2].totalFrames - 1; localProgress = 1;
      }
      if (!activeSeq && scrollY < sections[0].top) {
        activeSeq = 'v1'; activeFrame = 0; localProgress = 0;
      }

      if (activeSeq) drawFrame(activeSeq, activeFrame);

      const navLinks = document.querySelectorAll('.nav__link');
      navLinks.forEach(link => {
        link.classList.toggle('active', link.dataset.section === activeSeq);
      });

      // V1: Hero text
      if (activeSeq === 'v1') {
        heroText.classList.toggle('fade-out', localProgress > 0.35);
      } else {
        heroText.classList.add('fade-out');
      }

      // V2: Features
      if (activeSeq === 'v2') {
        if (localProgress > 0.05) featuresTitle.classList.add('visible');
        const cardThresholds = [0.12, 0.28, 0.20, 0.36];
        featureCards.forEach((card, i) => {
          if (card && localProgress > cardThresholds[i]) card.classList.add('visible');
        });
      } else {
        featuresTitle.classList.remove('visible');
        featureCards.forEach(c => { if (c) c.classList.remove('visible'); });
      }

      // V3: Components
      if (activeSeq === 'v3') {
        if (localProgress > 0.05) compTitle.classList.add('visible');
        const compThresholds = [0.12, 0.22, 0.32, 0.42];
        compCallouts.forEach((callout, i) => {
          if (callout && localProgress > compThresholds[i]) callout.classList.add('visible');
        });

        if (localProgress > 0.62) {
          compTitle.classList.add('exit');
          compCallouts.forEach(c => { if (c) c.classList.add('exit'); });
        } else {
          compTitle.classList.remove('exit');
          compCallouts.forEach(c => { if (c) c.classList.remove('exit'); });
        }

        if (endingLeft && localProgress > 0.72) endingLeft.classList.add('visible');
        if (endingRight && localProgress > 0.80) endingRight.classList.add('visible');
      } else {
        compTitle.classList.remove('visible');
        compTitle.classList.remove('exit');
        compCallouts.forEach(c => { if (c) { c.classList.remove('visible'); c.classList.remove('exit'); } });
        if (endingLeft) endingLeft.classList.remove('visible');
        if (endingRight) endingRight.classList.remove('visible');
      }
    }

    // Mobile menu
    const handleHamburgerClick = () => {
      hamburger.classList.toggle('open');
      mobileMenu.classList.toggle('open');
      document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
    };

    const handleMobileLinkClick = () => {
      hamburger.classList.remove('open');
      mobileMenu.classList.remove('open');
      document.body.style.overflow = '';
    };

    hamburger.addEventListener('click', handleHamburgerClick);
    document.querySelectorAll('.mobile-menu__link, .mobile-menu__cta').forEach(link => {
      link.addEventListener('click', handleMobileLinkClick);
    });

    // Smooth scroll for nav links
    document.querySelectorAll('.nav__link, .mobile-menu__link').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.getElementById(link.getAttribute('href').substring(1));
        if (target) target.scrollIntoView({ behavior: 'smooth' });
      });
    });

    // Throttled scroll with rAF
    function handleScroll() {
      if (rafIdRef.current) return;
      rafIdRef.current = requestAnimationFrame(() => { onScroll(); rafIdRef.current = null; });
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', resizeCanvas);

    resizeCanvas();
    preloadAll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', resizeCanvas);
      hamburger.removeEventListener('click', handleHamburgerClick);
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    };
  }, [isLoaded]);

  return (
    <div className="milton-demo">
      {/* Loading Screen */}
      {!isLoaded && (
        <div className="loader">
          <div className="loader__logo"><span>M</span>ilton</div>
          <div className="loader__bar-bg"><div className="loader__bar" style={{ width: `${loadingPercent}%` }}></div></div>
          <div className="loader__percent">{loadingPercent}%</div>
        </div>
      )}

      {/* Navigation */}
      <nav ref={navRef} className="nav">
        <div className="nav__inner">
          <a href="#" className="nav__logo">
            <span className="nav__logo-mark">M</span>
            <span className="nav__logo-text">ilton</span>
          </a>
          <ul className="nav__links">
            <li><a href="#section-v1" className="nav__link" data-section="v1">The Bottle</a></li>
            <li><a href="#section-v2" className="nav__link" data-section="v2">Features</a></li>
            <li><a href="#section-v3" className="nav__link" data-section="v3">Components</a></li>
          </ul>
          <a href="#" className="nav__cta">Shop Now</a>
          <button ref={hamburgerRef} className="nav__hamburger" aria-label="Toggle menu">
            <span></span><span></span><span></span>
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div ref={mobileMenuRef} className="mobile-menu">
        <ul className="mobile-menu__links">
          <li><a href="#section-v1" className="mobile-menu__link" data-section="v1">The Bottle</a></li>
          <li><a href="#section-v2" className="mobile-menu__link" data-section="v2">Features</a></li>
          <li><a href="#section-v3" className="mobile-menu__link" data-section="v3">Components</a></li>
          <li><a href="#" className="mobile-menu__cta">Shop Now</a></li>
        </ul>
      </div>

      {/* Canvas */}
      <canvas ref={canvasRef} id="frame-canvas"></canvas>

      {/* Scroll Container */}
      <div className="scroll-container">
        {/* Sequence 1: Hero */}
        <section className="section section--v1" id="section-v1" data-sequence="v1">
          <div className="section__content section__content--hero">
            <div ref={heroTextRef} className="hero-text">
              <p className="hero-text__pre">Introducing</p>
              <h1 className="hero-text__title">
                <span className="hero-text__line">Milton Does</span>
                <span className="hero-text__line hero-text__line--accent">This For You</span>
              </h1>
              <p className="hero-text__sub">Scroll to explore the craft</p>
              <div className="hero-text__scroll-indicator">
                <div className="scroll-indicator__mouse">
                  <div className="scroll-indicator__wheel"></div>
                </div>
                <span className="scroll-indicator__label">Scroll Down</span>
              </div>
            </div>
          </div>
        </section>

        {/* Sequence 2: Features */}
        <section className="section section--v2" id="section-v2" data-sequence="v2">
          <div className="section__content section__content--features">
            <div ref={featuresTitleRef} className="features-title">
              <p className="features-title__label">Why Milton?</p>
              <h2 className="features-title__heading">Engineered for<br/><em>Perfection</em></h2>
            </div>

            <div className="features-col features-col--left">
              <div className="feature-card feature-card--1" id="feature-card-1">
                <div className="feature-card__icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" />
                    <path d="M8 14s1.5 2 4 2 4-2 4-2" />
                    <circle cx="9" cy="9" r="1" />
                    <circle cx="15" cy="9" r="1" />
                  </svg>
                </div>
                <h3 className="feature-card__title">24hr Temperature Lock</h3>
                <p className="feature-card__desc">Double-wall vacuum insulation keeps your drinks cold for 24 hours and hot for 12 hours — no compromise.</p>
              </div>
              <div className="feature-card feature-card--2" id="feature-card-2">
                <div className="feature-card__icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  </svg>
                </div>
                <h3 className="feature-card__title">Leak-Proof Seal</h3>
                <p className="feature-card__desc">Tested at extreme pressures. Throw it in your bag — not a single drop escapes.</p>
              </div>
            </div>

            <div className="features-col features-col--right">
              <div className="feature-card feature-card--3" id="feature-card-3">
                <div className="feature-card__icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M12 3v18M3 12h18" />
                    <circle cx="12" cy="12" r="10" />
                  </svg>
                </div>
                <h3 className="feature-card__title">Premium Steel Body</h3>
                <p className="feature-card__desc">Crafted from 18/8 food-grade stainless steel. BPA-free, toxin-free, taste-free — pure hydration.</p>
              </div>
              <div className="feature-card feature-card--4" id="feature-card-4">
                <div className="feature-card__icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
                  </svg>
                </div>
                <h3 className="feature-card__title">Eco-Conscious</h3>
                <p className="feature-card__desc">One Milton bottle replaces 1,460 plastic bottles per year. Hydrate responsibly.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Sequence 3: Components */}
        <section className="section section--v3" id="section-v3" data-sequence="v3">
          <div className="section__content section__content--components">
            <div ref={compTitleRef} className="components-title">
              <p className="components-title__label">Anatomy of Excellence</p>
              <h2 className="components-title__heading">Every Part,<br/><em>Purposeful</em></h2>
            </div>

            <div className="component-callout component-callout--cap" id="comp-cap">
              <div className="component-callout__line"></div>
              <div className="component-callout__content">
                <h4 className="component-callout__title">Smart-Lock Cap</h4>
                <p className="component-callout__desc">One-touch release with auto-seal technology. Drink effortlessly, close securely.</p>
              </div>
            </div>

            <div className="component-callout component-callout--spout" id="comp-spout">
              <div className="component-callout__line"></div>
              <div className="component-callout__content">
                <h4 className="component-callout__title">Precision Spout</h4>
                <p className="component-callout__desc">Ergonomically angled for smooth flow. No splashing, no spilling — just perfect pours.</p>
              </div>
            </div>

            <div className="component-callout component-callout--body" id="comp-body">
              <div className="component-callout__line"></div>
              <div className="component-callout__content">
                <h4 className="component-callout__title">Double-Wall Body</h4>
                <p className="component-callout__desc">Vacuum-sealed stainless steel chamber. Condensation-free exterior, always comfortable to hold.</p>
              </div>
            </div>

            <div className="component-callout component-callout--base" id="comp-base">
              <div className="component-callout__line"></div>
              <div className="component-callout__content">
                <h4 className="component-callout__title">Anti-Slip Base</h4>
                <p className="component-callout__desc">Rubberised silicone ring grips any surface. Stays put on your desk, in your car, everywhere.</p>
              </div>
            </div>

            <div ref={endingLeftRef} className="ending-text ending-text--left">
              <p className="ending-text__label">Crafted with purpose</p>
              <h2 className="ending-text__heading">Every detail<br/><em>earns its place</em></h2>
              <p className="ending-text__body">From the precision-milled cap to the silicone grip on the base — nothing is accidental. Milton is built by people who believe a water bottle should be the best thing you carry.</p>
            </div>

            <div ref={endingRightRef} className="ending-text ending-text--right">
              <p className="ending-text__eyebrow">Ready to make the switch?</p>
              <a href="#" className="ending-text__cta">
                <span>Shop Milton</span>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </a>
              <p className="ending-text__note">Free shipping · 30-day returns · 2-year warranty</p>
            </div>
          </div>
        </section>
      </div>

      {/* Progress Bar */}
      <div className="progress-bar">
        <div ref={progressFillRef} className="progress-bar__fill"></div>
      </div>
    </div>
  );
}
