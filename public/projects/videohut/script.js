document.addEventListener("DOMContentLoaded", () => {
    // Initial fade in for the hero text
    gsap.registerPlugin(ScrollTrigger);
    ScrollTrigger.config({ ignoreMobileResize: true });

    // --- Video playback optimization ---
    const videos = Array.from(document.querySelectorAll("video"));
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    videos.forEach((video) => {
        video.muted = true; // ensure autoplay eligibility
        video.playsInline = true;
        video.setAttribute("playsinline", "");
        video.preload = "metadata";
        video.disablePictureInPicture = true;
    });

    if (prefersReducedMotion) {
        videos.forEach((video) => {
            video.pause();
        });
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
                        // Reduce decoding work for offscreen videos
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
    
    if(menuBtn && closeBtn && sideMenu) {
        let menuOpen = false;
        let menuTl = gsap.timeline({ paused: true, defaults: { ease: "power4.inOut" } });
        
        menuTl.to(sideMenu, { autoAlpha: 1, duration: 0.3 })
              .to(sideMenuInner, { x: "100%", duration: 0.6 }, "<0.1")
              .from(navItems, { autoAlpha: 0, x: -30, stagger: 0.05, duration: 0.5 }, "-=0.3");

        menuBtn.addEventListener('click', () => {
            if(!menuOpen) {
                menuTl.play();
                menuOpen = true;
            }
        });

        closeBtn.addEventListener('click', () => {
            if(menuOpen) {
                menuTl.reverse();
                menuOpen = false;
            }
        });
    }
      
    // Flowing cards infinite track animation
    const track = document.querySelector('.flowing-cards-track');
    window.addEventListener('load', () => {
        gsap.to(track, {
            x: '-=50%', // Move left by 50% of track
            ease: 'none',
            duration: 12, // Much faster constant speed
            repeat: -1,
            force3D: true // Enforce GPU
        });
    });

      
    // --- 1. Hero Pin & Fold Sequence ---
    // Pin the hero wrapper so next section scrolls OVER it.
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
            start: "top bottom", // Starts when showreel enters
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

    // --- Create a dedicated PIN trigger for Showreel Section ---
    // This prevents conflict between animating properties and pinning
    ScrollTrigger.create({
        trigger: ".showreel-section",
        start: "top top",
        end: "+=120%", 
        pin: true
    });

    // --- 2. SHOWREEL Text Parallax Rising + Size Reduction during Video Zoom ---
    gsap.fromTo(".showreel-text", 
        { 
            y: 150, 
            scale: 1.4
        },
        {
            y: 0,
            scale: 0.7,
            scrollTrigger: {
                trigger: ".showreel-section",
                start: "top 90%", // Start a touch earlier
                end: "top top",   // text locks when section reaches top
                scrub: 1.6
            },
            ease: "power3.out"
        }
    );

    // --- 4b. SHOWREEL Text Zoom-Out during Video Zoom (parallax behind video) ---
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

    // --- 3. Phase 1: Showreel Video Slow Initial Zoom ---
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
                start: "top 90%", // Arrives a bit earlier with text
                end: "top top", // Phase 1 complete when section hits top
                scrub: 0.8, // Faster arrival on scroll
            },
            ease: "power2.inOut"
        }
    );

    // --- 4. Phase 2: Showreel Video Zoom to Fit (Seamless continuation) ---
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

    // --- 3b. Smooth Zoom-In After Showreel ---
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

    // --- 4. Portfolio Horizontal Scroll ---
    const portfolioSection = document.querySelector('.portfolio-section');
    const portfolioTrack = document.querySelector('.portfolio-track');
    
    // Calculate total scroll distance based on track width vs viewport
    function getScrollAmount() {
        let trackWidth = portfolioTrack.scrollWidth;
        return -(trackWidth - window.innerWidth + 100); // 100px padding adjustment
    }

    const tween = gsap.to(portfolioTrack, {
        x: getScrollAmount,
        ease: "none"
    });

    ScrollTrigger.create({
        trigger: ".portfolio-section", // Pin the entire section so header stays visible
        start: "top top",
        end: () => `+=${getScrollAmount() * -1}`, // Scroll distance equals the pixel width of movement
        pin: true,
        animation: tween,
        scrub: 1,
        invalidateOnRefresh: true
    });

    // --- 5. Custom Cursor Logic ---
    const cursor = document.querySelector('.custom-cursor');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    // Show custom cursor only when hovering portfolio items
    portfolioItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            gsap.to(cursor, { scale: 1, opacity: 1, duration: 0.3, ease: 'back.out(1.7)' });
        });
        
        item.addEventListener('mouseleave', () => {
            gsap.to(cursor, { scale: 0, opacity: 0, duration: 0.3, ease: 'power2.in' });
            cursor.classList.remove('active'); // fallback 
        });
    });

    // --- 6. Services Hover Image Reveal ---
    const serviceCards = document.querySelectorAll('.service-card');
    const hoverImg = document.querySelector('.hover-reveal-img');

    if (cursor) {
        gsap.set(cursor, { xPercent: -50, yPercent: -50 });
    }
    if (hoverImg) {
        gsap.set(hoverImg, { xPercent: -50, yPercent: -50 });
    }

    // Smooth position setters using GSAP QuickTo for performance
    const cursorX = cursor ? gsap.quickTo(cursor, "x", { duration: 0.15, ease: "power2.out" }) : null;
    const cursorY = cursor ? gsap.quickTo(cursor, "y", { duration: 0.15, ease: "power2.out" }) : null;
    const hoverX = hoverImg ? gsap.quickTo(hoverImg, "x", { duration: 0.35, ease: "power3.out" }) : null;
    const hoverY = hoverImg ? gsap.quickTo(hoverImg, "y", { duration: 0.35, ease: "power3.out" }) : null;

    // Single mousemove handler to reduce jank
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
            // Update the background image dynamically
            hoverImg.style.backgroundImage = `url(${imgSrc})`;
            // Fade in and scale up slightly
            gsap.to(hoverImg, {
                opacity: 1,
                scale: 1,
                rotation: Math.random() * 10 - 5, // Slight random rotation (-5 to 5 blocks) for organic feel
                duration: 0.4,
                ease: "power2.out"
            });
        });
        
        card.addEventListener('mouseleave', () => {
            // Fade out and scale down slightly
            gsap.to(hoverImg, {
                opacity: 0,
                scale: 0.8,
                rotation: 0,
                duration: 0.3,
                ease: "power2.in"
            });
        });
    });

    // --- 7. Industries Hover Image Setup ---
    const industryCards = document.querySelectorAll('.industry-card');
    industryCards.forEach(card => {
        const bgImg = card.getAttribute('data-bg');
        if (bgImg) {
            // Apply the image as a CSS variable for the ::before pseudo-element
            card.style.setProperty('--bg-src', `url("${bgImg}")`);
        }
    });
});
