import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import rawStyles from './styles.css?raw';

gsap.registerPlugin(ScrollTrigger);
ScrollTrigger.config({ ignoreMobileResize: true });

export default function VideohutDemo() {
  const trackRef = useRef(null);
  const portfolioTrackRef = useRef(null);
  const cursorRef = useRef(null);
  const hoverImgRef = useRef(null);

  useEffect(() => {
    const styleEl = document.createElement('style');
    styleEl.textContent = rawStyles;
    document.head.appendChild(styleEl);
    return () => document.head.removeChild(styleEl);
  }, []);

  useEffect(() => {
    // Video playback optimization
    const videos = Array.from(document.querySelectorAll("video"));
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    videos.forEach((video) => {
      video.muted = true;
      video.playsInline = true;
      video.setAttribute("playsinline", "");
      video.preload = "metadata";
      video.disablePictureInPicture = true;
    });

    if (prefersReducedMotion) {
      videos.forEach((video) => video.pause());
    } else if ("IntersectionObserver" in window) {
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            const video = entry.target;
            if (entry.isIntersecting) {
              if (video.preload !== "auto") video.preload = "auto";
              const playPromise = video.play();
              if (playPromise && typeof playPromise.catch === "function") {
                playPromise.catch(() => {});
              }
            } else {
              video.pause();
              video.preload = "none";
            }
          });
        },
        {
          root: null,
          rootMargin: "200px 0px",
          threshold: 0.15
        }
      );
      videos.forEach((video) => io.observe(video));
    }

    // Set initial states
    gsap.set(".flowing-cards-perspective", { opacity: 0, scale: 0.85 });
    gsap.set(".header-left .menu-btn", { opacity: 0, x: -20 });
    gsap.set(".header-right", { opacity: 0, x: 20 });

    // Animate on load
    const tl = gsap.timeline({ defaults: { ease: "power3.out", duration: 1.5 } });
    tl.to(".flowing-cards-perspective", { opacity: 1, scale: 1 })
      .to(".header-left .menu-btn", { opacity: 1, x: 0, duration: 1 }, "-=0.8")
      .to(".header-right", { opacity: 1, x: 0, duration: 1 }, "-=1.0");

    // Side Menu Logic
    const menuBtn = document.querySelector('.menu-btn');
    const closeBtn = document.querySelector('.close-menu-btn');
    const sideMenu = document.querySelector('.side-menu');
    const sideMenuInner = document.querySelector('.side-menu-inner');
    const navItems = document.querySelectorAll('.side-nav-item');

    if (menuBtn && closeBtn && sideMenu) {
      let menuOpen = false;
      let menuTl = gsap.timeline({ paused: true, defaults: { ease: "power4.inOut" } });

      menuTl.to(sideMenu, { autoAlpha: 1, duration: 0.3 })
            .to(sideMenuInner, { x: "100%", duration: 0.6 }, "<0.1")
            .from(navItems, { autoAlpha: 0, x: -30, stagger: 0.05, duration: 0.5 }, "-=0.3");

      menuBtn.addEventListener('click', () => {
        if (!menuOpen) {
          menuTl.play();
          menuOpen = true;
        }
      });

      closeBtn.addEventListener('click', () => {
        if (menuOpen) {
          menuTl.reverse();
          menuOpen = false;
        }
      });
    }

    // Flowing cards infinite track animation
    const track = trackRef.current;
    if (track) {
      gsap.to(track, {
        x: '-=50%',
        ease: 'none',
        duration: 12,
        repeat: -1,
        force3D: true
      });
    }

    // Hero Pin & Fold Sequence
    ScrollTrigger.create({
      trigger: ".hero-wrapper",
      start: "top top",
      endTrigger: ".showreel-section",
      end: "top top",
      pin: true,
      pinSpacing: false
    });

    gsap.to(".hero-inner", {
      scrollTrigger: {
        trigger: ".showreel-section",
        start: "top bottom",
        end: "top top",
        scrub: true
      },
      scale: 0.8,
      y: "10%",
      opacity: 0,
      transformOrigin: "center center",
      ease: "none",
      force3D: true
    });

    // Showreel Section Pin
    ScrollTrigger.create({
      trigger: ".showreel-section",
      start: "top top",
      end: "+=120%",
      pin: true
    });

    // Showreel Text Parallax
    gsap.fromTo(".showreel-text",
      { y: 150, scale: 1.4 },
      {
        y: 0,
        scale: 0.7,
        scrollTrigger: {
          trigger: ".showreel-section",
          start: "top 90%",
          end: "top top",
          scrub: 1.6
        },
        ease: "power3.out"
      }
    );

    gsap.to(".showreel-text", {
      scale: 0.4,
      y: 120,
      scrollTrigger: {
        trigger: ".showreel-section",
        start: "top top",
        end: "+=120%",
        scrub: 1.2,
      },
      ease: "power2.inOut",
      immediateRender: false
    });

    // Showreel Video Zoom Phase 1
    gsap.fromTo(".video-wrapper",
      {
        y: 200,
        width: "40vw",
        height: "25vh",
        top: "35vh",
        borderRadius: "50px"
      },
      {
        y: 0,
        width: "60vw",
        height: "48vh",
        borderRadius: "40px",
        top: "25vh",
        scrollTrigger: {
          trigger: ".showreel-section",
          start: "top 90%",
          end: "top top",
          scrub: 0.8,
        },
        ease: "power2.inOut"
      }
    );

    // Showreel Video Zoom Phase 2
    gsap.to(".video-wrapper",
      {
        width: "92vw",
        height: "82vh",
        top: "10vh",
        borderRadius: "32px",
        scrollTrigger: {
          trigger: ".showreel-section",
          start: "top top",
          end: "+=120%",
          scrub: 1.1,
        },
        ease: "power3.inOut",
        immediateRender: false
      }
    );

    // Video Cover Zoom
    gsap.set(".video-cover", { transformOrigin: "center center" });
    gsap.to(".video-cover", {
      scrollTrigger: {
        trigger: ".brands-section",
        start: "top bottom",
        end: "top top",
        scrub: 1.5
      },
      scale: 1.15,
      ease: "power1.out"
    });

    // Portfolio Horizontal Scroll
    const portfolioSection = document.querySelector('.portfolio-section');
    const portfolioTrack = portfolioTrackRef.current;

    if (portfolioSection && portfolioTrack) {
      function getScrollAmount() {
        let trackWidth = portfolioTrack.scrollWidth;
        return -(trackWidth - window.innerWidth + 100);
      }

      const tween = gsap.to(portfolioTrack, {
        x: getScrollAmount,
        ease: "none"
      });

      ScrollTrigger.create({
        trigger: ".portfolio-section",
        start: "top top",
        end: () => `+=${getScrollAmount() * -1}`,
        pin: true,
        animation: tween,
        scrub: 1,
        invalidateOnRefresh: true
      });
    }

    // Custom Cursor Logic
    const cursor = cursorRef.current;
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    portfolioItems.forEach(item => {
      item.addEventListener('mouseenter', () => {
        gsap.to(cursor, { scale: 1, opacity: 1, duration: 0.3, ease: 'back.out(1.7)' });
      });

      item.addEventListener('mouseleave', () => {
        gsap.to(cursor, { scale: 0, opacity: 0, duration: 0.3, ease: 'power2.in' });
        cursor.classList.remove('active');
      });
    });

    // Services Hover Image Reveal
    const serviceCards = document.querySelectorAll('.service-card');
    const hoverImg = hoverImgRef.current;

    if (cursor) {
      gsap.set(cursor, { xPercent: -50, yPercent: -50 });
    }
    if (hoverImg) {
      gsap.set(hoverImg, { xPercent: -50, yPercent: -50 });
    }

    const cursorX = cursor ? gsap.quickTo(cursor, "x", { duration: 0.15, ease: "power2.out" }) : null;
    const cursorY = cursor ? gsap.quickTo(cursor, "y", { duration: 0.15, ease: "power2.out" }) : null;
    const hoverX = hoverImg ? gsap.quickTo(hoverImg, "x", { duration: 0.35, ease: "power3.out" }) : null;
    const hoverY = hoverImg ? gsap.quickTo(hoverImg, "y", { duration: 0.35, ease: "power3.out" }) : null;

    document.addEventListener('mousemove', (e) => {
      if (cursorX && cursorY) {
        cursorX(e.clientX);
        cursorY(e.clientY);
      }
      if (hoverX && hoverY) {
        hoverX(e.clientX);
        hoverY(e.clientY);
      }
    });

    serviceCards.forEach(card => {
      card.addEventListener('mouseenter', (e) => {
        const imgSrc = card.getAttribute('data-image');
        hoverImg.style.backgroundImage = `url(${imgSrc})`;
        gsap.to(hoverImg, {
          opacity: 1,
          scale: 1,
          rotation: Math.random() * 10 - 5,
          duration: 0.4,
          ease: "power2.out"
        });
      });

      card.addEventListener('mouseleave', () => {
        gsap.to(hoverImg, {
          opacity: 0,
          scale: 0.8,
          rotation: 0,
          duration: 0.3,
          ease: "power2.in"
        });
      });
    });

    // Industries Hover Image Setup
    const industryCards = document.querySelectorAll('.industry-card');
    industryCards.forEach(card => {
      const bgImg = card.getAttribute('data-bg');
      if (bgImg) {
        card.style.setProperty('--bg-src', `url("${bgImg}")`);
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      gsap.killTweensOf([document.body, document.documentElement]);
      document.body.style.removeProperty('padding-bottom');
      document.body.style.removeProperty('overflow');
      document.documentElement.style.removeProperty('overflow');
    };
  }, []);

  return (
    <div className="videohut-demo">
      {/* Hero Section */}
      <section className="hero-wrapper" id="home">
        <div className="hero-inner">
          {/* Top Left Menu Button */}
          <div className="header-left">
            <button className="menu-btn">
              <span className="menu-text">MENU</span>
            </button>
          </div>

          {/* Top Right Title */}
          <div className="header-right">
            <h1 className="pixel-title">PIXEL<br/>VISION</h1>
            <p className="pixel-subtitle">Capturing every moment you want</p>
          </div>

          {/* Side Menu Overlay */}
          <div className="side-menu">
            <div className="side-menu-inner">
              <button className="close-menu-btn">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
              <nav className="side-nav-links">
                <a href="#home" className="side-nav-item">Home</a>
                <a href="#projects" className="side-nav-item">Projects</a>
                <a href="#showreel" className="side-nav-item">Showreel</a>
                <a href="#services" className="side-nav-item">Services</a>
                <a href="#about" className="side-nav-item">About</a>
                <a href="#contact" className="side-nav-item">Contact</a>
              </nav>
            </div>
          </div>

          <div className="background-wrapper">
            <div className="bg-overlay"></div>
          </div>

          <section className="hero">
            <div className="flowing-cards-perspective">
              <div className="flowing-cards-rotation">
                <div className="flowing-cards-track" ref={trackRef}>
                  {/* Group 1 */}
                  <div className="card-group">
                    <div className="flowing-card"><video src="/projects/videohut/reels/Video-110.mp4" autoPlay loop muted playsInline preload="metadata"></video></div>
                    <div className="flowing-card"><video src="/projects/videohut/reels/Video-292.mp4" autoPlay loop muted playsInline preload="metadata"></video></div>
                    <div className="flowing-card"><video src="/projects/videohut/reels/Video-41.mp4" autoPlay loop muted playsInline preload="metadata"></video></div>
                    <div className="flowing-card"><video src="/projects/videohut/reels/Video-626.mp4" autoPlay loop muted playsInline preload="metadata"></video></div>
                    <div className="flowing-card"><video src="/projects/videohut/reels/Video-686.mp4" autoPlay loop muted playsInline preload="metadata"></video></div>
                  </div>
                  {/* Group 2 (Duplicate for infinite scroll) */}
                  <div className="card-group">
                    <div className="flowing-card"><video src="/projects/videohut/reels/Video-110.mp4" autoPlay loop muted playsInline preload="metadata"></video></div>
                    <div className="flowing-card"><video src="/projects/videohut/reels/Video-292.mp4" autoPlay loop muted playsInline preload="metadata"></video></div>
                    <div className="flowing-card"><video src="/projects/videohut/reels/Video-41.mp4" autoPlay loop muted playsInline preload="metadata"></video></div>
                    <div className="flowing-card"><video src="/projects/videohut/reels/Video-626.mp4" autoPlay loop muted playsInline preload="metadata"></video></div>
                    <div className="flowing-card"><video src="/projects/videohut/reels/Video-686.mp4" autoPlay loop muted playsInline preload="metadata"></video></div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </section>

      {/* Showreel Section */}
      <section className="showreel-section" id="showreel">
        <div className="showreel-container">
          <h2 className="showreel-text">SHOWREEL</h2>
          <div className="video-wrapper">
            <div className="video-inner">
              <video src="/projects/videohut/showreel/t3oWwHTiHPdqvISgXglF9dJecA.mp4" className="video-cover" autoPlay loop muted playsInline preload="metadata"></video>
            </div>
          </div>
        </div>
      </section>

      {/* Brands Marquee Section */}
      <section className="brands-section">
        <div className="brands-container">
          <h3 className="brands-title">Standing Tall with Our Esteemed Brand Partners</h3>
          <div className="brands-marquee-wrapper">
            <div className="brands-marquee-track">
              {/* Original logos */}
              <div className="brand-logo"><img src="https://cdn.iconscout.com/icon/free/png-256/free-logoipsum-3094851-2550130.png" alt="Logoipsum"/></div>
              <div className="brand-logo"><img src="https://cdn.iconscout.com/icon/free/png-256/free-logoipsum-3094852-2550129.png" alt="Logoipsum"/></div>
              <div className="brand-logo"><img src="https://cdn.iconscout.com/icon/free/png-256/free-logoipsum-3094853-2550128.png" alt="Logoipsum"/></div>
              <div className="brand-logo"><img src="https://cdn.iconscout.com/icon/free/png-256/free-logoipsum-3094854-2550127.png" alt="Logoipsum"/></div>
              <div className="brand-logo"><img src="https://cdn.iconscout.com/icon/free/png-256/free-logoipsum-3094855-2550126.png" alt="Logoipsum"/></div>
              {/* Duplicated logos for infinite scroll */}
              <div className="brand-logo"><img src="https://cdn.iconscout.com/icon/free/png-256/free-logoipsum-3094851-2550130.png" alt="Logoipsum"/></div>
              <div className="brand-logo"><img src="https://cdn.iconscout.com/icon/free/png-256/free-logoipsum-3094852-2550129.png" alt="Logoipsum"/></div>
              <div className="brand-logo"><img src="https://cdn.iconscout.com/icon/free/png-256/free-logoipsum-3094853-2550128.png" alt="Logoipsum"/></div>
              <div className="brand-logo"><img src="https://cdn.iconscout.com/icon/free/png-256/free-logoipsum-3094854-2550127.png" alt="Logoipsum"/></div>
              <div className="brand-logo"><img src="https://cdn.iconscout.com/icon/free/png-256/free-logoipsum-3094855-2550126.png" alt="Logoipsum"/></div>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section className="portfolio-section" id="projects">
        <div className="portfolio-header">
          <h2 className="portfolio-title">Our Handpicked Featured Portfolio</h2>
          <a href="#" className="portfolio-btn">See All Projects</a>
        </div>

        <div className="portfolio-horizontal-wrapper">
          <div className="portfolio-track" ref={portfolioTrackRef}>
            {/* Project 1 */}
            <div className="portfolio-item">
              <img src="https://images.unsplash.com/photo-1614729939124-032f0b56c9ce?q=80&w=1200&auto=format&fit=crop" alt="GreenWaves" className="portfolio-img"/>
              <div className="portfolio-info">
                <h3 className="portfolio-name">GreenWaves</h3>
                <p className="portfolio-sub">Eco-Warriors</p>
              </div>
            </div>
            {/* Project 2 */}
            <div className="portfolio-item">
              <img src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1200&auto=format&fit=crop" alt="Mystic Horizon" className="portfolio-img"/>
              <div className="portfolio-info">
                <h3 className="portfolio-name">Mystic Horizon</h3>
                <p className="portfolio-sub">ModeElite</p>
              </div>
            </div>
            {/* Project 3 */}
            <div className="portfolio-item">
              <img src="https://images.unsplash.com/photo-1535016120720-40c746a6580c?q=80&w=1200&auto=format&fit=crop" alt="Neon Dream" className="portfolio-img"/>
              <div className="portfolio-info">
                <h3 className="portfolio-name">Neon Dream</h3>
                <p className="portfolio-sub">CyberCorp</p>
              </div>
            </div>
            {/* Project 4 */}
            <div className="portfolio-item">
              <img src="https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=1200&auto=format&fit=crop" alt="Urban Flow" className="portfolio-img"/>
              <div className="portfolio-info">
                <h3 className="portfolio-name">Urban Flow</h3>
                <p className="portfolio-sub">StreetStyle</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Custom Cursor for Video Hover */}
      <div className="custom-cursor" ref={cursorRef}>
        <span className="cursor-text">WATCH<br/>FULL VIDEO</span>
      </div>

      {/* Services Section */}
      <section className="services-section" id="services">
        {/* Vertical grid lines background */}
        <div className="grid-lines">
          <div className="line"></div>
          <div className="line"></div>
          <div className="line"></div>
          <div className="line"></div>
          <div className="line"></div>
        </div>

        <div className="services-container">
          {/* Left Sticky Title */}
          <div className="services-left">
            <h2 className="services-title">From Concept To Completion:<br/>We've Got You Covered!</h2>
          </div>

          {/* Right Scrolling Cards */}
          <div className="services-right">
            <div className="service-card" data-image="https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?q=80&w=800&auto=format&fit=crop">
              <h3 className="service-name">Pre-Production</h3>
              <p className="service-desc">Pre-production serves as the pivotal phase in any creative endeavor, encompassing planning, idea refinement, budgeting, schedule creation, and the meticulous organization of logistical details.</p>
              <a href="#" className="service-link"><span>LEARN MORE</span> <span className="arrow-circle"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg></span></a>
            </div>

            <div className="service-card" data-image="https://images.unsplash.com/photo-1590608821422-4820a3240ea8?q=80&w=800&auto=format&fit=crop">
              <h3 className="service-name">Production</h3>
              <p className="service-desc">Production represents the dynamic phase of a creative project, where the plans from pre-production spring to life, with cameras rolling, actors delivering their performances, and the realization of the creative vision.</p>
              <a href="#" className="service-link"><span>LEARN MORE</span> <span className="arrow-circle"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg></span></a>
            </div>

            <div className="service-card" data-image="https://images.unsplash.com/photo-1536240478700-b869070f9279?q=80&w=800&auto=format&fit=crop">
              <h3 className="service-name">Post-Production</h3>
              <p className="service-desc">Post-production emerges as the pivotal phase in creative projects, wherein raw content undergoes a transformation into its refined, polished state where editing, sound design, visual effects, and essential adjustments to breathe life into the project.</p>
              <a href="#" className="service-link"><span>LEARN MORE</span> <span className="arrow-circle"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg></span></a>
            </div>
          </div>
        </div>

        {/* Floating hover image container */}
        <div className="hover-reveal-img" ref={hoverImgRef}></div>
      </section>

      {/* Industries Section */}
      <section className="industries-section" id="industries">
        <h2 className="industries-title">We're Video Pros in Many Industries!</h2>

        <div className="industries-grid">
          {/* Card 1 */}
          <div className="industry-card card-wide" data-bg="https://images.unsplash.com/photo-1542204165-65bf26472b9b?q=80&w=1600&auto=format&fit=crop">
            <div className="card-content">
              <h3 className="industry-name">Corporate <span className="highlight">Videos</span></h3>
              <p className="industry-desc">Deliver your corporate message with clarity and impact. We specialize in producing high-quality corporate videos that enhance your brand image and communicate your values effectively.</p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="industry-card card-square" data-bg="https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?q=80&w=800&auto=format&fit=crop">
            <div className="card-content">
              <h3 className="industry-name">Documentaries</h3>
              <p className="industry-desc">Tell compelling real-world stories with our cinematic documentary production services.</p>
            </div>
          </div>

          {/* Card 3 */}
          <div className="industry-card card-tall" data-bg="https://images.unsplash.com/photo-1601042879364-f3947d3f9c16?q=80&w=800&auto=format&fit=crop">
            <div className="card-content">
              <h3 className="industry-name">Shorts & Reels</h3>
              <p className="industry-desc">Engage your audience quickly with high-impact, short-form content designed for social media virality.</p>
            </div>
          </div>

          {/* Card 4 */}
          <div className="industry-card card-square" data-bg="https://images.unsplash.com/photo-1440404653325-ab127d49abc1?q=80&w=800&auto=format&fit=crop">
            <div className="card-content">
              <h3 className="industry-name">Entertainment and<br/>Narrative Films</h3>
              <p className="industry-desc">From script to screen, we bring fictional worlds and compelling narratives to life.</p>
            </div>
          </div>

          {/* Card 5 */}
          <div className="industry-card card-wide" data-bg="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=1600&auto=format&fit=crop">
            <div className="card-content">
              <h3 className="industry-name"><span className="highlight">Commercials</span> <span className="highlight">and</span> <span className="highlight">Advertisements</span></h3>
              <p className="industry-desc">Make a memorable impression. Our short, attention-grabbing videos showcase your products, services, or brand identity effectively.</p>
            </div>
          </div>

          {/* Card 6 */}
          <div className="industry-card card-wide" data-bg="https://images.unsplash.com/photo-1540039155732-6159f1223e7f?q=80&w=1600&auto=format&fit=crop">
            <div className="card-content">
              <h3 className="industry-name">Event and Live Streaming</h3>
              <p className="industry-desc">Capture the energy of your live events and reach a global audience with our professional streaming and recording services.</p>
            </div>
          </div>

          {/* Card 7 */}
          <div className="industry-card card-wide" data-bg="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1600&auto=format&fit=crop">
            <div className="card-content">
              <h3 className="industry-name">Animation and VFX <span className="highlight">(Visual Effects)</span></h3>
              <p className="industry-desc">Elevate your visuals with stunning animations and seamless visual effects that defy reality.</p>
            </div>
          </div>
        </div>
      </section>

      {/* About Agency Section */}
      <section className="about-agency-section" id="about">
        {/* Vertical grid lines background */}
        <div className="grid-lines">
          <div className="line"></div>
          <div className="line"></div>
          <div className="line"></div>
          <div className="line"></div>
          <div className="line"></div>
        </div>

        <div className="about-container">
          {/* Left Side Title & Button */}
          <div className="about-left">
            <h2 className="about-heading">About Our Agency</h2>

            <a href="#" className="about-button">
              <div className="button-bg"></div>
              <span className="button-text">Know More About Us</span>
            </a>
          </div>

          {/* Right Side Content & Stats */}
          <div className="about-right">
            <div className="about-text-content">
              <h3 className="about-subheadline">
                <span className="text-dim">Established in 2015, we have dedicated ourselves to</span> crafting captivating visual narratives <span className="text-dim">defined by creativity, innovation, and an unwavering commitment to</span> excellence in video production.
              </h3>
              <p className="about-paragraph">
                Our mission is clear: to transform ideas into compelling visual stories. We believe that every project is an opportunity to create something extraordinary. Whether it's a corporate video, a commercial, an event coverage, or an animation, we approach each endeavor with creativity, enthusiasm, and a commitment to exceeding our clients' expectations.
              </p>
            </div>

            <div className="about-stats-grid">
              {/* Stat 1 */}
              <div className="stat-item">
                <div className="stat-bg-number">15<span className="plus">+</span></div>
                <h4 className="stat-title">YEARS OF EXPERIENCE</h4>
              </div>

              {/* Stat 2 */}
              <div className="stat-item">
                <div className="stat-bg-number">200<span className="plus">+</span></div>
                <h4 className="stat-title">REPEATED CLIENTS</h4>
              </div>

              {/* Stat 3 */}
              <div className="stat-item">
                <div className="stat-bg-number">478<span className="plus">+</span></div>
                <h4 className="stat-title">COMPLETED PROJECTS</h4>
              </div>

              {/* Stat 4 */}
              <div className="stat-item">
                <div className="stat-bg-number">350<span className="plus">+</span></div>
                <h4 className="stat-title">HAPPY CLIENTS</h4>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section" id="testimonials">
        {/* Full-screen background image */}
        <div className="testimonials-bg"></div>
        <div className="testimonials-bg-overlay"></div>

        <div className="testimonials-container">
          <div className="testimonials-header">
            <h2 className="testimonials-title">Our Client Chronicles:<br/>Stories that Make Us Smile!</h2>
          </div>

          <div className="testimonials-track-wrapper">
            {/* Navigation Buttons */}
            <button className="test-nav prev">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M15 18l-6-6 6-6"/></svg>
            </button>
            <button className="test-nav next">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
            </button>

            <div className="testimonials-track">
              {/* Testimonial 1 */}
              <div className="testimonial-card">
                <div className="test-logo">
                  <img src="https://cdn.iconscout.com/icon/free/png-256/free-logoipsum-3094851-2550130.png" alt="Logoipsum Logo"/>
                </div>
                <p className="test-quote">We are thrilled with our new corporate videos. The team was incredibly calm, patient, and fostered a pleasant atmosphere. Everything came together seamlessly! We wholeheartedly endorse and would recommend them anytime.</p>
                <div className="test-bottom">
                  <svg className="quote-icon" width="40" height="40" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg"><path d="M10 11h-4a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2zm0 8h-4a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2zm10-8h-4a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2zm0 8h-4a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2z"/></svg>
                  <div className="test-author">
                    <h4>SARAH ADAMS</h4>
                    <span>Chief Marketing Officer, HorizonTech Solutions</span>
                  </div>
                </div>
              </div>

              {/* Testimonial 2 */}
              <div className="testimonial-card">
                <div className="test-logo">
                  <img src="https://cdn.iconscout.com/icon/free/png-256/free-logoipsum-3094852-2550129.png" alt="Logoipsum Logo"/>
                </div>
                <p className="test-quote">Our experience with StoryStream Studios was nothing short of exceptional. The team's relentless dedication and creative vision resulted in captivating and delightful videos that wildly exceeded our goals and vision for the campaign.</p>
                <div className="test-bottom">
                  <svg className="quote-icon" width="40" height="40" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg"><path d="M10 11h-4a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2zm0 8h-4a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2zm10-8h-4a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2zm0 8h-4a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2z"/></svg>
                  <div className="test-author">
                    <h4>MICHAEL LEE</h4>
                    <span>Director of Sales, EchoStream</span>
                  </div>
                </div>
              </div>

              {/* Testimonial 3 */}
              <div className="testimonial-card">
                <div className="test-logo">
                  <img src="https://cdn.iconscout.com/icon/free/png-256/free-logoipsum-3094853-2550128.png" alt="Logoipsum Logo"/>
                </div>
                <p className="test-quote">The final cut was an absolute masterclass in storytelling. We appreciated how open they were to feedback while confidently steering the artistic direction. Easily the quickest and most professional production partner we've used in years.</p>
                <div className="test-bottom">
                  <svg className="quote-icon" width="40" height="40" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg"><path d="M10 11h-4a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2zm0 8h-4a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2zm10-8h-4a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2zm0 8h-4a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2z"/></svg>
                  <div className="test-author">
                    <h4>JESSICA CHEN</h4>
                    <span>VP of Brand Strategy, Aura Inc.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Blogs Section */}
      <section className="blogs-section" id="blogs">
        <div className="blogs-container">
          <h2 className="blogs-title">Dive into our blogs</h2>

          <a href="#" className="about-button blogs-btn">
            <div className="button-bg"></div>
            <span className="button-text">Read All Blogs</span>
          </a>

          <div className="blogs-grid">
            {/* Blog Card 1 */}
            <div className="blog-card">
              <div className="blog-img-wrapper">
                <img src="https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?q=80&w=800&auto=format&fit=crop" alt="News Image" className="blog-img"/>
              </div>
              <div className="blog-content">
                <div className="blog-category">NEWS</div>
                <h3 className="blog-post-title">StoryStream's Video Production Career Opportunities and Upcoming Event</h3>
                <div className="blog-meta">
                  <span className="blog-author">Michael Carter</span>
                  <span className="blog-dot">•</span>
                  <span className="blog-date">Aug 29, 2023</span>
                </div>
              </div>
            </div>

            {/* Blog Card 2 */}
            <div className="blog-card">
              <div className="blog-img-wrapper">
                <img src="https://images.unsplash.com/photo-1449844908441-8829872d2607?q=80&w=800&auto=format&fit=crop" alt="Tips Image" className="blog-img"/>
              </div>
              <div className="blog-content">
                <div className="blog-category">TIPS & TRICKS</div>
                <h3 className="blog-post-title">Mastering the Art of Storytelling: The Power of Narrative in Video Production</h3>
                <div className="blog-meta">
                  <span className="blog-author">Michael Carter</span>
                  <span className="blog-dot">•</span>
                  <span className="blog-date">Oct 17, 2023</span>
                </div>
              </div>
            </div>

            {/* Blog Card 3 */}
            <div className="blog-card">
              <div className="blog-img-wrapper">
                <img src="https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=800&auto=format&fit=crop" alt="Stories Image" className="blog-img"/>
              </div>
              <div className="blog-content">
                <div className="blog-category">STORIES</div>
                <h3 className="blog-post-title">Lights, Camera, Action! Behind the Scenes of a Video Production</h3>
                <div className="blog-meta">
                  <span className="blog-author">John Davis</span>
                  <span className="blog-dot">•</span>
                  <span className="blog-date">Oct 16, 2023</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Infinite Marquee Section */}
      <section className="marquee-section">
        <div className="marquee-container">
          <div className="marquee-track">
            {/* Group 1 */}
            <div className="marquee-group">
              <div className="marquee-item" data-hover-img="https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?q=80&w=800&auto=format&fit=crop">
                <span>Filming</span>
                <div className="hover-img-wrapper"><img src="https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?q=80&w=800&auto=format&fit=crop" alt="Filming"/></div>
              </div>
              <div className="marquee-separator"></div>

              <div className="marquee-item" data-hover-img="https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=800&auto=format&fit=crop">
                <span>Scriptwriting</span>
                <div className="hover-img-wrapper"><img src="https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=800&auto=format&fit=crop" alt="Scriptwriting"/></div>
              </div>
              <div className="marquee-separator"></div>

              <div className="marquee-item" data-hover-img="https://images.unsplash.com/photo-1449844908441-8829872d2607?q=80&w=800&auto=format&fit=crop">
                <span>Sound Design</span>
                <div className="hover-img-wrapper"><img src="https://images.unsplash.com/photo-1449844908441-8829872d2607?q=80&w=800&auto=format&fit=crop" alt="Sound Design"/></div>
              </div>
              <div className="marquee-separator"></div>

              <div className="marquee-item" data-hover-img="https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=800&auto=format&fit=crop">
                <span>Color Grading</span>
                <div className="hover-img-wrapper"><img src="https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=800&auto=format&fit=crop" alt="Color Grading"/></div>
              </div>
              <div className="marquee-separator"></div>

              <div className="marquee-item" data-hover-img="https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?q=80&w=800&auto=format&fit=crop">
                <span>Motion Graphics</span>
                <div className="hover-img-wrapper"><img src="https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?q=80&w=800&auto=format&fit=crop" alt="Motion Graphics"/></div>
              </div>
              <div className="marquee-separator"></div>

              <div className="marquee-item" data-hover-img="https://images.unsplash.com/photo-1506485338023-6ce5f36692df?q=80&w=800&auto=format&fit=crop">
                <span>VFX</span>
                <div className="hover-img-wrapper"><img src="https://images.unsplash.com/photo-1506485338023-6ce5f36692df?q=80&w=800&auto=format&fit=crop" alt="VFX"/></div>
              </div>
              <div className="marquee-separator"></div>
            </div>

            {/* Group 2 (Exact Duplicate for seamless loop) */}
            <div className="marquee-group">
              <div className="marquee-item" data-hover-img="https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?q=80&w=800&auto=format&fit=crop">
                <span>Filming</span>
                <div className="hover-img-wrapper"><img src="https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?q=80&w=800&auto=format&fit=crop" alt="Filming"/></div>
              </div>
              <div className="marquee-separator"></div>

              <div className="marquee-item" data-hover-img="https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=800&auto=format&fit=crop">
                <span>Scriptwriting</span>
                <div className="hover-img-wrapper"><img src="https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=800&auto=format&fit=crop" alt="Scriptwriting"/></div>
              </div>
              <div className="marquee-separator"></div>

              <div className="marquee-item" data-hover-img="https://images.unsplash.com/photo-1449844908441-8829872d2607?q=80&w=800&auto=format&fit=crop">
                <span>Sound Design</span>
                <div className="hover-img-wrapper"><img src="https://images.unsplash.com/photo-1449844908441-8829872d2607?q=80&w=800&auto=format&fit=crop" alt="Sound Design"/></div>
              </div>
              <div className="marquee-separator"></div>

              <div className="marquee-item" data-hover-img="https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=800&auto=format&fit=crop">
                <span>Color Grading</span>
                <div className="hover-img-wrapper"><img src="https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=800&auto=format&fit=crop" alt="Color Grading"/></div>
              </div>
              <div className="marquee-separator"></div>

              <div className="marquee-item" data-hover-img="https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?q=80&w=800&auto=format&fit=crop">
                <span>Motion Graphics</span>
                <div className="hover-img-wrapper"><img src="https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?q=80&w=800&auto=format&fit=crop" alt="Motion Graphics"/></div>
              </div>
              <div className="marquee-separator"></div>

              <div className="marquee-item" data-hover-img="https://images.unsplash.com/photo-1506485338023-6ce5f36692df?q=80&w=800&auto=format&fit=crop">
                <span>VFX</span>
                <div className="hover-img-wrapper"><img src="https://images.unsplash.com/photo-1506485338023-6ce5f36692df?q=80&w=800&auto=format&fit=crop" alt="VFX"/></div>
              </div>
              <div className="marquee-separator"></div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
