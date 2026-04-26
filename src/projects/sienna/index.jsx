import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import rawStyles from './styles.css?raw';

gsap.registerPlugin(ScrollTrigger);

export default function SiennaDemo() {
  const cursorRef = useRef(null);
  const heroTitleRef = useRef(null);
  const heroImagesContainerRef = useRef(null);
  const headerInnerRef = useRef(null);
  const navLinksRef = useRef(null);
  const navHomeRef = useRef(null);

  useEffect(() => {
    const styleEl = document.createElement('style');
    styleEl.textContent = rawStyles;
    document.head.appendChild(styleEl);
    return () => document.head.removeChild(styleEl);
  }, []);

  useEffect(() => {
    // Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.2,
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.2,
      normalizeWheel: true
    });

    lenis.on('scroll', ScrollTrigger.update);
    const ticker = (time) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(ticker);
    gsap.ticker.lagSmoothing(0);

    // Gradual blur effect
    const CURVE_FUNCTIONS = {
      linear: (p) => p,
      bezier: (p) => p * p * (3 - 2 * p),
      'ease-in': (p) => p * p,
      'ease-out': (p) => 1 - Math.pow(1 - p, 2),
      'ease-in-out': (p) => (p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2)
    };

    const getGradientDirection = (position) => ({
      top: 'to top',
      bottom: 'to bottom',
      left: 'to left',
      right: 'to right'
    }[position] || 'to bottom');

    const initGradualBlur = () => {
      const blurElements = document.querySelectorAll('[data-gradual-blur]');

      blurElements.forEach((element) => {
        if (element.dataset.gbReady === 'true') return;
        element.classList.add('gradual-blur');

        const position = element.dataset.position || 'bottom';
        const strength = parseFloat(element.dataset.strength || '2');
        const height = element.dataset.height || '6rem';
        const width = element.dataset.width || '';
        const divCount = Math.max(1, parseInt(element.dataset.divCount || '6', 10));
        const zIndex = parseInt(element.dataset.zIndex || '8', 10);
        const opacity = parseFloat(element.dataset.opacity || '1');
        const curve = element.dataset.curve || 'linear';
        const target = element.dataset.target || 'parent';
        const exponential = element.dataset.exponential === 'true';

        const parent = element.parentElement;
        if (target !== 'page' && parent && getComputedStyle(parent).position === 'static') {
          parent.style.position = 'relative';
        }

        const isVertical = position === 'top' || position === 'bottom';
        element.style.position = target === 'page' ? 'fixed' : 'absolute';
        element.style.pointerEvents = 'none';
        element.style.isolation = 'isolate';
        element.style.zIndex = String(target === 'page' ? zIndex + 100 : zIndex);
        element.style.left = '0';
        element.style.right = '0';

        if (isVertical) {
          element.style.height = height;
          element.style.width = width || '100%';
          element.style[position] = '0';
        } else {
          element.style.width = width || height;
          element.style.height = '100%';
          element.style.top = '0';
          element.style.bottom = '0';
          element.style[position] = '0';
        }

        const inner = document.createElement('div');
        inner.className = 'gradual-blur-inner';

        const increment = 100 / divCount;
        const curveFunc = CURVE_FUNCTIONS[curve] || CURVE_FUNCTIONS.linear;
        const direction = getGradientDirection(position);

        for (let i = 1; i <= divCount; i++) {
          let progress = i / divCount;
          progress = curveFunc(progress);

          const blurValue = exponential
            ? Math.pow(2, progress * 4) * 0.0625 * strength
            : 0.0625 * (progress * divCount + 1) * strength;

          const p1 = Math.round((increment * i - increment) * 10) / 10;
          const p2 = Math.round(increment * i * 10) / 10;
          const p3 = Math.round((increment * i + increment) * 10) / 10;
          const p4 = Math.round((increment * i + increment * 2) * 10) / 10;

          let gradient = `transparent ${p1}%, black ${p2}%`;
          if (p3 <= 100) gradient += `, black ${p3}%`;
          if (p4 <= 100) gradient += `, transparent ${p4}%`;

          const layer = document.createElement('div');
          layer.style.position = 'absolute';
          layer.style.inset = '0';
          layer.style.opacity = String(opacity);
          layer.style.maskImage = `linear-gradient(${direction}, ${gradient})`;
          layer.style.webkitMaskImage = `linear-gradient(${direction}, ${gradient})`;
          layer.style.backdropFilter = `blur(${blurValue.toFixed(3)}rem)`;
          layer.style.webkitBackdropFilter = `blur(${blurValue.toFixed(3)}rem)`;
          inner.appendChild(layer);
        }

        element.appendChild(inner);
        element.dataset.gbReady = 'true';
      });
    };

    initGradualBlur();

    // Hero animations
    const heroTitle = heroTitleRef.current;
    const heroImagesContainer = heroImagesContainerRef.current;
    const headerInner = headerInnerRef.current;
    const navLinks = navLinksRef.current;
    const navHome = navHomeRef.current;

    if (heroTitle && heroImagesContainer && headerInner && navLinks) {
      let mm = gsap.matchMedia();

      mm.add('(min-width: 769px)', () => {
        gsap.set(heroTitle, { xPercent: -50, x: 0, y: 0, scale: 1, transformOrigin: 'center center' });
        gsap.set(navLinks, { x: 0 });

        return () => {
          gsap.set(heroTitle, { clearProps: 'all' });
          gsap.set(navLinks, { clearProps: 'all' });
          gsap.set(heroImagesContainer, { clearProps: 'all' });
        };
      });

      const calculateTransforms = () => {
        gsap.set(heroTitle, { x: 0, y: 0, scale: 1, transformOrigin: 'center center' });
        const titleRect = heroTitle.getBoundingClientRect();
        const headerRect = headerInner.getBoundingClientRect();
        const navHomeRect = navHome ? navHome.getBoundingClientRect() : null;

        const targetHeight = navHomeRect ? navHomeRect.height : headerRect.height * 0.32;
        const scale = targetHeight / titleRect.height;

        const titleCenterX = titleRect.left + titleRect.width / 2;
        const titleCenterY = titleRect.top + titleRect.height / 2;

        const leftPadding = 8;
        const targetLeft = headerRect.left + leftPadding;
        const targetCenterX = targetLeft + (titleRect.width * scale) / 2;
        const targetCenterY = headerRect.top + headerRect.height / 2;

        const deltaX = targetCenterX - titleCenterX;
        const deltaY = targetCenterY - titleCenterY;

        return { x: deltaX, y: deltaY, scale };
      };

      const getNavShift = () => Math.min(window.innerWidth * 0.16, 220);

      mm.add('(min-width: 769px)', () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: document.body,
            start: 'top top',
            end: '500px top',
            scrub: 1.2,
            invalidateOnRefresh: true
          }
        });

        tl.to(heroImagesContainer, {
          y: () => -window.innerHeight * 0.4,
          ease: 'none',
          duration: 1
        });

        tl.to(heroTitle, {
          x: () => calculateTransforms().x,
          y: () => calculateTransforms().y,
          scale: () => calculateTransforms().scale,
          ease: 'none',
          duration: 1.5
        }, '>');

        tl.to(navLinks, {
          x: () => getNavShift(),
          ease: 'none',
          duration: 1.5
        }, '<');
      });
    }

    // Feature parallax
    const featureImg = document.querySelector('.feature-image-wrapper img');
    if (featureImg) {
      gsap.set(featureImg, { scale: 1.2, transformOrigin: 'center center' });

      gsap.to(featureImg, {
        yPercent: 20,
        ease: 'none',
        scrollTrigger: {
          trigger: '.feature-section',
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
        }
      });
    }

    // Marquee carousels
    const carousels = gsap.utils.toArray('.carousel-row');

    carousels.forEach((row, i) => {
      const tracks = row.querySelectorAll('.carousel-track');
      const direction = i % 2 === 0 ? -1 : 1;

      if (direction === 1) {
        gsap.set(tracks, { xPercent: -100 });
      }

      gsap.to(tracks, {
        xPercent: direction === -1 ? -100 : 0,
        ease: 'none',
        duration: 50,
        repeat: -1
      });

      gsap.to(row, {
        x: direction === -1 ? '-=100vw' : '+=100vw',
        ease: 'none',
        scrollTrigger: {
          trigger: '.carousels-section',
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1
        }
      });
    });

    // Testimonials parallax
    const testimonialBgImg = document.querySelector('.testimonials-bg img');
    if (testimonialBgImg) {
      gsap.set(testimonialBgImg, { scale: 1.2, transformOrigin: 'center center' });

      gsap.to(testimonialBgImg, {
        yPercent: 20,
        ease: 'none',
        scrollTrigger: {
          trigger: '.testimonials-section',
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
        }
      });
    }

    // Custom cursor
    const cursor = cursorRef.current;
    if (cursor) {
      let xTo = gsap.quickTo(cursor, 'x', { duration: 0.1, ease: 'power3', immediateRender: true });
      let yTo = gsap.quickTo(cursor, 'y', { duration: 0.1, ease: 'power3', immediateRender: true });

      const handleMouseMove = (e) => {
        xTo(e.clientX);
        yTo(e.clientY);
      };

      window.addEventListener('mousemove', handleMouseMove);

      const interactables = document.querySelectorAll('a, button, .carousel-row img, .service-card');
      interactables.forEach(el => {
        el.addEventListener('mouseenter', () => cursor.classList.add('hovering'));
        el.addEventListener('mouseleave', () => cursor.classList.remove('hovering'));
      });

      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        gsap.ticker.remove(ticker);
        lenis.destroy();
        ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        gsap.killTweensOf([document.body, document.documentElement]);
        document.body.style.removeProperty('padding-bottom');
        document.body.style.removeProperty('overflow');
        document.documentElement.style.removeProperty('overflow');
      };
    }

    const handleResize = () => ScrollTrigger.refresh();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      gsap.ticker.remove(ticker);
      lenis.destroy();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      gsap.killTweensOf([document.body, document.documentElement]);
      document.body.style.removeProperty('padding-bottom');
      document.body.style.removeProperty('overflow');
      document.documentElement.style.removeProperty('overflow');
    };
  }, []);

  return (
    <div className="sienna-demo">
      {/* Custom Blend Cursor */}
      <div ref={cursorRef} className="custom-cursor"></div>

      {/* Header */}
      <header className="header">
        <div ref={headerInnerRef} className="header-inner">
          <div className="logo-placeholder">SIENNA</div>
          <nav ref={navLinksRef} className="nav-links">
            <a href="#" ref={navHomeRef} className="nav-home">HOME</a>
            <a href="#">ABOUT</a>
            <a href="#">GALLERY</a>
            <a href="#">ARTICLES</a>
            <a href="#">ENQUIRE</a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <h1 ref={heroTitleRef} className="hero-title">SIENNA</h1>
        <div ref={heroImagesContainerRef} className="hero-images-container">
          <div className="hero-image img-1">
            <img src="https://images.unsplash.com/photo-1542359649-31e03cd4d909?q=80&w=1000&auto=format&fit=crop" alt="Fashion 1" />
          </div>
          <div className="hero-image img-2">
            <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1000&auto=format&fit=crop" alt="Fashion 2" />
          </div>
          <div className="hero-image img-3">
            <img src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=1000&auto=format&fit=crop" alt="Fashion 3" />
          </div>
        </div>
        <div
          data-gradual-blur
          data-position="bottom"
          data-height="8rem"
          data-strength="2.4"
          data-div-count="10"
          data-curve="bezier"
          data-z-index="16"
        ></div>
      </section>

      {/* Intro Section */}
      <section className="intro-section">
        <div className="intro-left">
          <div className="scroll-arrow">&#8595;</div>
          <h2>LONDON-BASED<br/>CREATOR OF STRIKING<br/>VISUALS & TIMELESS<br/>STORIES. <span className="dot"></span></h2>
        </div>
        <div className="intro-right">
          <div className="status-badge">
            <span className="status-dot"></span> AVAILABLE FOR WORK
          </div>
          <p>
            BASED IN THE HEART OF LONDON, I AM PASSIONATE<br/>
            PHOTOGRAPHER AND VISUAL STORYTELLER, CRAFTING<br/>
            CAPTIVATING IMAGES THAT BLEND ARTISTRY WITH<br/>
            AUTHENTICITY. FROM ICONIC CITYSCAPES TO INTIMATE<br/>
            PORTRAITS, OUR WORK IS A REFLECTION OF BOLD<br/>
            CREATIVITY AND ATTENTION TO DETAIL. WITH A FLAIR FOR<br/>
            CAPTURING MOMENTS THAT SPEAK VOLUMES.
          </p>
          <p>
            I TRANSFORM EVERYDAY SCENES INTO TIMELESS<br/>
            MASTERPIECES. WHETHER IT'S FOR BRANDS, EDITORIALS, OR<br/>
            PERSONAL PROJECTS, I AIM TO DELIVER VISUALS THAT LEAVE<br/>
            A LASTING IMPRESSION.
          </p>
          <a href="#" className="contact-link"><span className="arrow-right">&#9654;</span> LET'S TALK</a>
        </div>
      </section>

      {/* Feature Section */}
      <section className="feature-section">
        <div className="feature-image-wrapper">
          <img src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop" alt="Feature Portrait" />
        </div>
        <div className="feature-text-overlay">
          <p>
            MY PASSION IS TO CRAFT CAPTIVATING VISUALS<br/>
            THAT TELL AUTHENTIC STORIES, PRESERVING<br/>
            LIFE'S MOST PRECIOUS MOMENTS THROUGH THE<br/>
            LENS OF MY CAMERA.
          </p>
          <p>
            STEP INTO MY WORLD, WHERE EVERY FRAME IS A<br/>
            MASTERPIECE, AND YOUR UNIQUE JOURNEY<br/>
            BECOMES THE HEART OF MY ART.
          </p>
          <a href="#" className="about-link">ABOUT ME</a>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="gallery-section">
        <div className="gallery-header">
          <span className="gallery-subtitle">/ GALLERY</span>
          <h2 className="gallery-title">WHERE EVERY<br/>FRAME TELLS A<br/>STORY</h2>
        </div>

        <div className="gallery-grid">
          <div className="gallery-card card-left">
            <div className="card-image-wrapper">
              <img src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1000&auto=format&fit=crop" alt="Disco Portrait" />
            </div>
            <div className="card-info">
              <div className="card-meta">
                <span className="card-category">/ PORTRAITS</span>
                <span className="card-date">FEB 7, 2025</span>
              </div>
              <h3 className="card-heading">LUMINOUS NIGHTS: A DISCO-<br/>INSPIRED PORTRAIT</h3>
            </div>
          </div>

          <div className="gallery-card card-right">
            <div className="card-image-wrapper">
              <img src="https://images.unsplash.com/photo-1445053023192-8d45cb66099d?q=80&w=1000&auto=format&fit=crop" alt="Nature Portrait" />
            </div>
            <div className="card-info">
              <div className="card-meta">
                <span className="card-category">/ LIFESTYLE</span>
                <span className="card-date">FEB 5, 2025</span>
              </div>
              <h3 className="card-heading">EMBRACING THE WILD:<br/>A STUDY OF NATURE</h3>
            </div>
          </div>
        </div>

        <div className="gallery-centered">
          <div className="gallery-card card-center">
            <div className="card-image-wrapper">
              <img src="https://images.unsplash.com/photo-1542385151-efd9000785a0?q=80&w=1000&auto=format&fit=crop" alt="Water Portrait" />
            </div>
            <div className="card-info">
              <div className="card-meta">
                <span className="card-category">/ PORTRAITS</span>
                <span className="card-date">NOV 25, 2022</span>
              </div>
              <h3 className="card-heading">ETHEREAL TIDES: PORTRAIT OF<br/>GRACE BY THE SEA</h3>
            </div>
          </div>
        </div>

        <div className="gallery-grid gallery-grid-offset">
          <div className="gallery-card card-tall">
            <div className="card-image-wrapper">
              <img src="https://images.unsplash.com/photo-1500462918059-b1a0cb512f1d?q=80&w=1000&auto=format&fit=crop" alt="Blue Portrait" />
            </div>
            <div className="card-info">
              <div className="card-meta">
                <span className="card-category">/ PORTRAITS</span>
                <span className="card-date">JUL 7, 2025</span>
              </div>
              <h3 className="card-heading">BLUE GLOW: STUDIO PORTRAIT<br/>SERIES</h3>
            </div>
          </div>

          <div className="gallery-card card-short offset-down">
            <div className="card-image-wrapper">
              <img src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000&auto=format&fit=crop" alt="Abstract Landscape" />
            </div>
            <div className="card-info">
              <div className="card-meta">
                <span className="card-category">/ CYBERPUNK PHOTOGRAPHY</span>
                <span className="card-date">NOV 18, 2021</span>
              </div>
              <h3 className="card-heading">NEON EDGE: FUTURISTIC<br/>CYBERPUNK</h3>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="services-section">
        <div className="services-header">
          <span className="services-subtitle">/ SERVICES</span>
          <h2 className="services-title">HOW I BRING YOUR<br/>VISION TO LIFE?</h2>
        </div>

        <div className="services-grid">
          <div className="service-card">
            <span className="service-number">/ 01</span>
            <div className="service-photos">
              <img className="photo-left" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=600&auto=format&fit=crop" alt="Portrait Left" />
              <img className="photo-right" src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=600&auto=format&fit=crop" alt="Portrait Right" />
            </div>
            <h3 className="service-heading">PORTRAITS</h3>
          </div>

          <div className="service-card">
            <span className="service-number">/ 02</span>
            <div className="service-photos">
              <img className="photo-left" src="https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=600&auto=format&fit=crop" alt="Event Left" />
              <img className="photo-right" src="https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=600&auto=format&fit=crop" alt="Event Right" />
            </div>
            <h3 className="service-heading">EVENTS & WEDDING</h3>
          </div>

          <div className="service-card">
            <span className="service-number">/ 03</span>
            <div className="service-photos">
              <img className="photo-left" src="https://images.unsplash.com/photo-1493666438817-866a91353ca9?q=80&w=600&auto=format&fit=crop" alt="Commercial Left" />
              <img className="photo-right" src="https://images.unsplash.com/photo-1518177303023-e665ba482386?q=80&w=600&auto=format&fit=crop" alt="Commercial Right" />
            </div>
            <h3 className="service-heading">COMMERCIAL & BRANDING</h3>
          </div>

          <div className="service-card">
            <span className="service-number">/ 04</span>
            <div className="service-photos">
              <img className="photo-left" src="https://images.unsplash.com/photo-1518331169874-8b63e8a5b3a8?q=80&w=600&auto=format&fit=crop" alt="Fashion Left" />
              <img className="photo-right" src="https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?q=80&w=600&auto=format&fit=crop" alt="Fashion Right" />
            </div>
            <h3 className="service-heading">FASHION & EDITORIAL</h3>
          </div>

          <div className="service-card">
            <span className="service-number">/ 05</span>
            <div className="service-photos">
              <img className="photo-left" src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=600&auto=format&fit=crop" alt="Travel Left" />
              <img className="photo-right" src="https://images.unsplash.com/photo-1542224566-6e85f2e6772f?q=80&w=600&auto=format&fit=crop" alt="Travel Right" />
            </div>
            <h3 className="service-heading">TRAVEL & LANDSCAPE</h3>
          </div>

          <div className="service-card">
            <span className="service-number">/ 06</span>
            <div className="service-photos">
              <img className="photo-left" src="https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=600&auto=format&fit=crop" alt="Product Left" />
              <img className="photo-right" src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=600&auto=format&fit=crop" alt="Product Right" />
            </div>
            <h3 className="service-heading">PRODUCT & FOOD</h3>
          </div>
        </div>
      </section>

      {/* Carousels Section */}
      <section className="carousels-section">
        <div className="carousels-overlay">
          <h2>EXPLORE MORE<br/>MASTERPIECES IN<br/>THE GALLERY</h2>
          <a href="#" className="browse-link"><span className="arrow-right">&#9654;</span> BROWSE GALLERY</a>
        </div>

        <div className="carousel-row" id="carousel-1">
          <div className="carousel-track">
            <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop" alt="Gallery Image" />
            <img src="https://images.unsplash.com/photo-1510832198440-a52376950479?q=80&w=400&auto=format&fit=crop" alt="Gallery Image" />
            <img src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=400&auto=format&fit=crop" alt="Gallery Image" />
            <img src="https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=400&auto=format&fit=crop" alt="Gallery Image" />
            <img src="https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?q=80&w=400&auto=format&fit=crop" alt="Gallery Image" />
            <img src="https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?q=80&w=400&auto=format&fit=crop" alt="Gallery Image" />
          </div>
          <div className="carousel-track">
            <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop" alt="Gallery Image" />
            <img src="https://images.unsplash.com/photo-1510832198440-a52376950479?q=80&w=400&auto=format&fit=crop" alt="Gallery Image" />
            <img src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=400&auto=format&fit=crop" alt="Gallery Image" />
            <img src="https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=400&auto=format&fit=crop" alt="Gallery Image" />
            <img src="https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?q=80&w=400&auto=format&fit=crop" alt="Gallery Image" />
            <img src="https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?q=80&w=400&auto=format&fit=crop" alt="Gallery Image" />
          </div>
        </div>

        <div className="carousel-row" id="carousel-2">
          <div className="carousel-track">
            <img src="https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=400&auto=format&fit=crop" alt="Gallery Image" />
            <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400&auto=format&fit=crop" alt="Gallery Image" />
            <img src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=400&auto=format&fit=crop" alt="Gallery Image" />
            <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400&auto=format&fit=crop" alt="Gallery Image" />
            <img src="https://images.unsplash.com/photo-1526401485004-46910ecc8e51?q=80&w=400&auto=format&fit=crop" alt="Gallery Image" />
            <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=400&auto=format&fit=crop" alt="Gallery Image" />
          </div>
          <div className="carousel-track">
            <img src="https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=400&auto=format&fit=crop" alt="Gallery Image" />
            <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400&auto=format&fit=crop" alt="Gallery Image" />
            <img src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=400&auto=format&fit=crop" alt="Gallery Image" />
            <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400&auto=format&fit=crop" alt="Gallery Image" />
            <img src="https://images.unsplash.com/photo-1526401485004-46910ecc8e51?q=80&w=400&auto=format&fit=crop" alt="Gallery Image" />
            <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=400&auto=format&fit=crop" alt="Gallery Image" />
          </div>
        </div>

        <div className="carousel-row" id="carousel-3">
          <div className="carousel-track">
            <img src="https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=400&auto=format&fit=crop" alt="Gallery Image" />
            <img src="https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=400&auto=format&fit=crop" alt="Gallery Image" />
            <img src="https://images.unsplash.com/photo-1500462918059-b1a0cb512f1d?q=80&w=400&auto=format&fit=crop" alt="Gallery Image" />
            <img src="https://images.unsplash.com/photo-1493666438817-866a91353ca9?q=80&w=400&auto=format&fit=crop" alt="Gallery Image" />
            <img src="https://images.unsplash.com/photo-1518177303023-e665ba482386?q=80&w=400&auto=format&fit=crop" alt="Gallery Image" />
            <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop" alt="Gallery Image" />
          </div>
          <div className="carousel-track">
            <img src="https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=400&auto=format&fit=crop" alt="Gallery Image" />
            <img src="https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=400&auto=format&fit=crop" alt="Gallery Image" />
            <img src="https://images.unsplash.com/photo-1500462918059-b1a0cb512f1d?q=80&w=400&auto=format&fit=crop" alt="Gallery Image" />
            <img src="https://images.unsplash.com/photo-1493666438817-866a91353ca9?q=80&w=400&auto=format&fit=crop" alt="Gallery Image" />
            <img src="https://images.unsplash.com/photo-1518177303023-e665ba482386?q=80&w=400&auto=format&fit=crop" alt="Gallery Image" />
            <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop" alt="Gallery Image" />
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section">
        <div className="testimonials-bg">
          <img src="https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?q=80&w=2000&auto=format&fit=crop" alt="Testimonials Background" />
        </div>

        <div className="testimonial-card">
          <p className="testimonial-quote">
            SIENNA'S WORK IS TRULY REMARKABLE. SHE CAPTURED THE MOST CANDID AND EMOTIONAL MOMENTS DURING OUR WEDDING, MAKING US RELIVE THE MAGIC EVERY TIME WE LOOK AT THE PHOTOS. HER TALENT, PROFESSIONALISM, AND PASSION SHINE THROUGH IN EVERY FRAME!
          </p>
          <div className="testimonial-author">
            <h4>MICHAEL & ANNA K</h4>
            <span>NEWLYWEDS</span>
          </div>
          <div className="testimonial-nav">
            <button className="nav-btn prev-btn"><span className="arrow-icon">&#8249;</span></button>
            <button className="nav-btn next-btn"><span className="arrow-icon">&#8250;</span></button>
          </div>
        </div>
      </section>

      {/* Articles Section */}
      <section className="articles-section">
        <div className="articles-header">
          <span className="articles-subtitle">/ ARTICLES</span>
          <h2 className="articles-title">FOCUS & INSPIRE:<br/>STORIES BEYOND<br/>THE FRAME</h2>
          <a href="#" className="browse-link"><span className="arrow-right">&#9654;</span> MORE ARTICLES</a>
        </div>

        <div className="articles-grid">
          <div className="article-card article-card-tall">
            <div className="article-img-wrapper">
              <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop" alt="The Art of Light" />
            </div>
            <div className="article-meta">
              <span className="article-category">/ STORYTELLING</span>
              <span className="article-date">FEB 3, 2025</span>
            </div>
            <h3 className="article-title">THE ART OF LIGHT</h3>
          </div>

          <div className="article-card">
            <div className="article-img-wrapper">
              <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=800&auto=format&fit=crop" alt="From Vision to Reality" />
            </div>
            <div className="article-meta">
              <span className="article-category">/ CREATIVITY</span>
              <span className="article-date">OCT 17, 2024</span>
            </div>
            <h3 className="article-title">FROM VISION TO REALITY</h3>
          </div>

          <div className="article-card">
            <div className="article-img-wrapper">
              <img src="https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=800&auto=format&fit=crop" alt="The Beauty of Minimal" />
            </div>
            <div className="article-meta">
              <span className="article-category">/ PLANNING</span>
              <span className="article-date">MAY 20, 2024</span>
            </div>
            <h3 className="article-title">THE BEAUTY OF MINIMAL</h3>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="footer-section">
        <div className="footer-bg">
          <img src="https://images.unsplash.com/photo-1512403754473-27835f7b9984?q=80&w=2000&auto=format&fit=crop" alt="Footer Background" />
        </div>
        <div
          data-gradual-blur
          data-position="top"
          data-height="9rem"
          data-strength="2"
          data-div-count="8"
          data-curve="ease-out"
          data-z-index="3"
          data-opacity="0.9"
        ></div>
        <div className="footer-content">
          <div className="footer-top">
            <div className="footer-text">
              EVERY MOMENT HOLDS<br/>A STORY WAITING TO BE<br/>CAPTURED
            </div>
            <div className="footer-nav">
              <a href="#">HOME</a>
              <a href="#">ABOUT</a>
              <a href="#">GALLERY</a>
              <a href="#">ARTICLES</a>
              <a href="#">CONTACT</a>
            </div>
          </div>

          <hr className="footer-divider" />

          <div className="footer-middle">
            <div className="footer-copy">
              &copy; 2025. SIENNA ALL RIGHTS RESERVED.
            </div>
            <div className="footer-socials">
              <a href="#">LINKEDIN</a>
              <a href="#">TWITTER</a>
              <a href="#">INSTAGRAM</a>
            </div>
          </div>

          <div className="footer-bottom">
            <h1>SIENNA</h1>
          </div>
        </div>
      </footer>

      {/* Global Page-Level Bottom Gradual Blur Overlay */}
      <div data-gradual-blur="true" data-position="bottom" data-height="10vh" data-target="page" data-z-index="1000" data-strength="1" data-div-count="16" data-curve="bezier" data-exponential="true"></div>
    </div>
  );
}
