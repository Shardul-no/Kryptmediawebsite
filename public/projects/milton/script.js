/* ═══════════════════════════════════════════════════════
   MILTON — SCROLLYTELLING ENGINE
   Frame-by-frame playback driven by scroll position
   ═══════════════════════════════════════════════════════ */

(function () {
    'use strict';

    // ── Configuration ──────────────────────────────────
    const SEQUENCES = [
        { id: 'v1', folder: 'v1', totalFrames: 128, prefix: 'ezgif-frame-', ext: '.jpg' },
        { id: 'v2', folder: 'v2', totalFrames: 128, prefix: 'ezgif-frame-', ext: '.jpg' },
        { id: 'v3', folder: 'v3', totalFrames: 136, prefix: 'ezgif-frame-', ext: '.jpg' },
    ];

    // ── DOM refs ───────────────────────────────────────
    const canvas       = document.getElementById('frame-canvas');
    const ctx          = canvas.getContext('2d');
    const nav          = document.getElementById('main-nav');
    const navLinks     = document.querySelectorAll('.nav__link');
    const hamburger    = document.getElementById('nav-hamburger');
    const mobileMenu   = document.getElementById('mobile-menu');
    const mobileLinks  = document.querySelectorAll('.mobile-menu__link, .mobile-menu__cta');
    const progressFill = document.getElementById('progress-fill');

    // Overlay elements
    const heroText      = document.getElementById('hero-text');
    const featuresTitle = document.getElementById('features-title');
    const featureCards  = [
        document.getElementById('feature-card-1'),
        document.getElementById('feature-card-2'),
        document.getElementById('feature-card-3'),
        document.getElementById('feature-card-4'),
    ];
    const compTitle    = document.getElementById('components-title');
    const compCallouts = [
        document.getElementById('comp-cap'),
        document.getElementById('comp-spout'),
        document.getElementById('comp-body'),
        document.getElementById('comp-base'),
    ];
    const endingLeft  = document.getElementById('ending-left');
    const endingRight = document.getElementById('ending-right');

    // ── State ──────────────────────────────────────────
    const imageCache = {};
    let totalLoaded  = 0;
    let totalToLoad  = 0;
    let isLoaded     = false;
    let currentFrame = { seq: null, index: -1 };
    let rafId        = null;

    // ── Loading Screen ─────────────────────────────────
    function createLoader() {
        const loader = document.createElement('div');
        loader.className = 'loader';
        loader.id = 'loader';
        loader.innerHTML = `
            <div class="loader__logo"><span>M</span>ilton</div>
            <div class="loader__bar-bg"><div class="loader__bar" id="loader-bar"></div></div>
            <div class="loader__percent" id="loader-percent">0%</div>
        `;
        document.body.appendChild(loader);
    }

    function updateLoader() {
        const pct   = Math.round((totalLoaded / totalToLoad) * 100);
        const bar   = document.getElementById('loader-bar');
        const pctEl = document.getElementById('loader-percent');
        if (bar)   bar.style.width = pct + '%';
        if (pctEl) pctEl.textContent = pct + '%';
    }

    function hideLoader() {
        const loader = document.getElementById('loader');
        if (loader) {
            loader.classList.add('hidden');
            setTimeout(() => loader.remove(), 700);
        }
    }

    // ── Image Preloading ───────────────────────────────
    function framePath(seq, index) {
        const num = String(index + 1).padStart(3, '0');
        return `${seq.folder}/${seq.prefix}${num}${seq.ext}`;
    }

    function preloadSequence(seq) {
        return new Promise((resolve) => {
            imageCache[seq.id] = new Array(seq.totalFrames);
            let loaded = 0;
            for (let i = 0; i < seq.totalFrames; i++) {
                const img = new Image();
                img.src = framePath(seq, i);
                img.onload = () => {
                    imageCache[seq.id][i] = img;
                    loaded++; totalLoaded++;
                    updateLoader();
                    if (loaded === seq.totalFrames) resolve();
                };
                img.onerror = () => {
                    loaded++; totalLoaded++;
                    updateLoader();
                    if (loaded === seq.totalFrames) resolve();
                };
            }
        });
    }

    async function preloadAll() {
        totalToLoad = SEQUENCES.reduce((acc, s) => acc + s.totalFrames, 0);
        createLoader();
        await Promise.all(SEQUENCES.map(preloadSequence));
        isLoaded = true;
        hideLoader();
        drawFrame('v1', 0);
        onScroll();
    }

    // ── Canvas Drawing ─────────────────────────────────
    function resizeCanvas() {
        canvas.width  = window.innerWidth;
        canvas.height = window.innerHeight;
        if (currentFrame.seq !== null) {
            drawFrame(currentFrame.seq, currentFrame.index, true);
        }
    }

    function drawFrame(seqId, index, force = false) {
        if (!force && currentFrame.seq === seqId && currentFrame.index === index) return;
        const frames = imageCache[seqId];
        if (!frames) return;
        const img = frames[index];
        if (!img) return;

        currentFrame.seq   = seqId;
        currentFrame.index = index;

        const cw = canvas.width,  ch = canvas.height;
        const iw = img.naturalWidth, ih = img.naturalHeight;
        const scale = Math.max(cw / iw, ch / ih);
        const dw = iw * scale, dh = ih * scale;
        const dx = (cw - dw) / 2, dy = (ch - dh) / 2;

        ctx.clearRect(0, 0, cw, ch);
        ctx.drawImage(img, dx, dy, dw, dh);
    }

    // ── Scroll Logic ───────────────────────────────────
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

        const scrollY   = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        progressFill.style.width = ((scrollY / docHeight) * 100) + '%';

        if (scrollY > 50) nav.classList.add('scrolled');
        else              nav.classList.remove('scrolled');

        const sections = getSectionBounds();
        let activeSeq = null, activeFrame = 0, localProgress = 0;

        for (const sec of sections) {
            if (scrollY >= sec.top && scrollY < sec.top + sec.height) {
                localProgress = (scrollY - sec.top) / sec.height;
                activeFrame   = Math.min(sec.totalFrames - 1, Math.floor(localProgress * sec.totalFrames));
                activeSeq     = sec.id;
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

        navLinks.forEach(link => {
            link.classList.toggle('active', link.dataset.section === activeSeq);
        });

        // ── V1: Hero text ──────────────────────────────
        if (activeSeq === 'v1') {
            heroText.classList.toggle('fade-out', localProgress > 0.35);
        } else {
            heroText.classList.add('fade-out');
        }

        // ── V2: Features ───────────────────────────────
        if (activeSeq === 'v2') {
            if (localProgress > 0.05) featuresTitle.classList.add('visible');
            const cardThresholds = [0.12, 0.28, 0.20, 0.36];
            featureCards.forEach((card, i) => {
                if (localProgress > cardThresholds[i]) card.classList.add('visible');
            });
        } else {
            featuresTitle.classList.remove('visible');
            featureCards.forEach(c => c.classList.remove('visible'));
        }

        // ── V3: Components (two-phase) ─────────────────
        if (activeSeq === 'v3') {

            // Phase 1 — title + callouts fade in
            if (localProgress > 0.05) compTitle.classList.add('visible');

            const compThresholds = [0.12, 0.22, 0.32, 0.42];
            compCallouts.forEach((callout, i) => {
                if (localProgress > compThresholds[i]) callout.classList.add('visible');
            });

            // Phase 2 — callouts exit, ending texts enter
            if (localProgress > 0.62) {
                compTitle.classList.add('exit');
                compCallouts.forEach(c => c.classList.add('exit'));
            } else {
                compTitle.classList.remove('exit');
                compCallouts.forEach(c => c.classList.remove('exit'));
            }

            if (endingLeft  && localProgress > 0.72) endingLeft.classList.add('visible');
            if (endingRight && localProgress > 0.80) endingRight.classList.add('visible');

        } else {
            compTitle.classList.remove('visible');
            compTitle.classList.remove('exit');
            compCallouts.forEach(c => { c.classList.remove('visible'); c.classList.remove('exit'); });
            if (endingLeft)  endingLeft.classList.remove('visible');
            if (endingRight) endingRight.classList.remove('visible');
        }
    }

    // ── Mobile Menu ────────────────────────────────────
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('open');
        mobileMenu.classList.toggle('open');
        document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
    });

    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('open');
            mobileMenu.classList.remove('open');
            document.body.style.overflow = '';
        });
    });

    // ── Smooth scroll for nav links ────────────────────
    document.querySelectorAll('.nav__link, .mobile-menu__link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.getElementById(link.getAttribute('href').substring(1));
            if (target) target.scrollIntoView({ behavior: 'smooth' });
        });
    });

    // ── Throttled scroll with rAF ──────────────────────
    function handleScroll() {
        if (rafId) return;
        rafId = requestAnimationFrame(() => { onScroll(); rafId = null; });
    }

    // ── Init ───────────────────────────────────────────
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', resizeCanvas);

    resizeCanvas();
    preloadAll();

})();
