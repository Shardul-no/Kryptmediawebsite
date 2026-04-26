document.addEventListener("DOMContentLoaded", () => {
    gsap.registerPlugin(ScrollTrigger);

    if (typeof Lenis !== "undefined") {
        const lenis = new Lenis({
            duration: 1.2,
            smoothWheel: true,
            wheelMultiplier: 0.9,
            touchMultiplier: 1.2,
            normalizeWheel: true
        });

        lenis.on("scroll", ScrollTrigger.update);
        gsap.ticker.add((time) => {
            lenis.raf(time * 1000);
        });
        gsap.ticker.lagSmoothing(0);
    }

    const CURVE_FUNCTIONS = {
        linear: (p) => p,
        bezier: (p) => p * p * (3 - 2 * p),
        "ease-in": (p) => p * p,
        "ease-out": (p) => 1 - Math.pow(1 - p, 2),
        "ease-in-out": (p) => (p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2)
    };

    const getGradientDirection = (position) => ({
        top: "to top",
        bottom: "to bottom",
        left: "to left",
        right: "to right"
    }[position] || "to bottom");

    const initGradualBlur = () => {
        const blurElements = document.querySelectorAll("[data-gradual-blur]");

        blurElements.forEach((element) => {
            if (element.dataset.gbReady === "true") return;
            element.classList.add("gradual-blur");

            const position = element.dataset.position || "bottom";
            const strength = Number.parseFloat(element.dataset.strength || "2");
            const height = element.dataset.height || "6rem";
            const width = element.dataset.width || "";
            const divCount = Math.max(1, Number.parseInt(element.dataset.divCount || "6", 10));
            const zIndex = Number.parseInt(element.dataset.zIndex || "8", 10);
            const opacity = Number.parseFloat(element.dataset.opacity || "1");
            const curve = element.dataset.curve || "linear";
            const target = element.dataset.target || "parent";
            const exponential = element.dataset.exponential === "true";

            const parent = element.parentElement;
            if (target !== "page" && parent && getComputedStyle(parent).position === "static") {
                parent.style.position = "relative";
            }

            const isVertical = position === "top" || position === "bottom";
            element.style.position = target === "page" ? "fixed" : "absolute";
            element.style.pointerEvents = "none";
            element.style.isolation = "isolate";
            element.style.zIndex = String(target === "page" ? zIndex + 100 : zIndex);
            element.style.left = "0";
            element.style.right = "0";

            if (isVertical) {
                element.style.height = height;
                element.style.width = width || "100%";
                element.style[position] = "0";
            } else {
                element.style.width = width || height;
                element.style.height = "100%";
                element.style.top = "0";
                element.style.bottom = "0";
                element.style[position] = "0";
            }

            const inner = document.createElement("div");
            inner.className = "gradual-blur-inner";

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

                const layer = document.createElement("div");
                layer.style.position = "absolute";
                layer.style.inset = "0";
                layer.style.opacity = String(opacity);
                layer.style.maskImage = `linear-gradient(${direction}, ${gradient})`;
                layer.style.webkitMaskImage = `linear-gradient(${direction}, ${gradient})`;
                layer.style.backdropFilter = `blur(${blurValue.toFixed(3)}rem)`;
                layer.style.webkitBackdropFilter = `blur(${blurValue.toFixed(3)}rem)`;
                inner.appendChild(layer);
            }

            element.appendChild(inner);
            element.dataset.gbReady = "true";
        });
    };

    initGradualBlur();

    const heroTitle = document.querySelector('.hero-title');
    const heroImagesContainer = document.querySelector('.hero-images-container');
    const navHome = document.querySelector('.nav-home');
    const headerInner = document.querySelector('.header-inner');
    const navLinks = document.querySelector('.nav-links');

    if (heroTitle && heroImagesContainer && headerInner && navLinks) {
        // Create matchMedia instance for conditional responsive animations
        let mm = gsap.matchMedia();

        // Target Desktop Only (769px and above)
        mm.add("(min-width: 769px)", () => {
            // Keep centering separate from animated x/y values to avoid transform conflicts.
            gsap.set(heroTitle, { xPercent: -50, x: 0, y: 0, scale: 1, transformOrigin: "center center" });
            gsap.set(navLinks, { x: 0 });
            
            // Revert changes when media query unmatches (going to mobile)
            return () => {
                gsap.set(heroTitle, { clearProps: "all" });
                gsap.set(navLinks, { clearProps: "all" });
                gsap.set(heroImagesContainer, { clearProps: "all" });
            };
        });

        const calculateTransforms = () => {
            gsap.set(heroTitle, { x: 0, y: 0, scale: 1, transformOrigin: "center center" });
            const titleRect = heroTitle.getBoundingClientRect();
            const headerRect = headerInner.getBoundingClientRect();
            const navHomeRect = navHome ? navHome.getBoundingClientRect() : null;

            const targetHeight = navHomeRect ? navHomeRect.height : headerRect.height * 0.32;
            const scale = targetHeight / titleRect.height;

            const titleCenterX = titleRect.left + titleRect.width / 2;
            const titleCenterY = titleRect.top + titleRect.height / 2;

            // Anchor title to the left edge of the header.
            const leftPadding = 8;
            const targetLeft = headerRect.left + leftPadding;
            const targetCenterX = targetLeft + (titleRect.width * scale) / 2;
            const targetCenterY = headerRect.top + headerRect.height / 2;

            const deltaX = targetCenterX - titleCenterX;
            const deltaY = targetCenterY - titleCenterY;

            return { x: deltaX, y: deltaY, scale };
        };

        const getNavShift = () => Math.min(window.innerWidth * 0.16, 220);

        // Target Desktop Only
        mm.add("(min-width: 769px)", () => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: document.body,
                    start: "top top", // Trigger immediately
                    end: "500px top", // Spread hero animation over more scroll distance for a slower feel
                    scrub: 1.2, // Add smooth catch-up so motion feels less abrupt
                    invalidateOnRefresh: true
                }
            });

            tl.to(heroImagesContainer, {
                y: () => -window.innerHeight * 0.4,
                ease: "none",
                duration: 1
            });

            tl.to(heroTitle, {
                x: () => calculateTransforms().x,
                y: () => calculateTransforms().y,
                scale: () => calculateTransforms().scale,
                ease: "none",
                duration: 1.5
            }, ">");

            tl.to(navLinks, {
                x: () => getNavShift(),
                ease: "none",
                duration: 1.5
            }, "<");
        });
    }

    /* --- Feature Parallax Section --- */
    const featureImg = document.querySelector('.feature-image-wrapper img');
    if (featureImg) {
        // Initialize image larger than its container to prevent clipping during movement
        gsap.set(featureImg, { scale: 1.2, transformOrigin: "center center" });

        gsap.to(featureImg, {
            yPercent: 20, // Move down smoothly to give parallax effect
            ease: "none",
            scrollTrigger: {
                trigger: ".feature-section",
                start: "top bottom", // Trigger when the top of the section hits the bottom of the viewport
                end: "bottom top", // End when the bottom of the section leaves the top of the viewport
                scrub: true
            }
        });
    }

    /* --- Marquee Carousels --- */
    const carousels = gsap.utils.toArray('.carousel-row');

    carousels.forEach((row, i) => {
        const tracks = row.querySelectorAll('.carousel-track');
        const direction = i % 2 === 0 ? -1 : 1; // Even rows (0, 2) slide left, odd (1) slide right
        
        // Initial setup for the loop
        if (direction === 1) {
            gsap.set(tracks, { xPercent: -100 });
        }

        // Base continuous animation (very slow)
        gsap.to(tracks, {
            xPercent: direction === -1 ? -100 : 0,
            ease: "none",
            duration: 50, // Slower base continuous speed
            repeat: -1
        });

        // Fast scrub animation directly tied to scroll
        // This is overlaid conceptually. We move the entire row container based on scroll.
        gsap.to(row, {
            x: direction === -1 ? "-=100vw" : "+=100vw", // Move row container opposite direction (slower now)
            ease: "none",
            scrollTrigger: {
                trigger: ".carousels-section",
                start: "top bottom", // Start when section enters screen
                end: "bottom top",   // End when it leaves
                scrub: 1             // Smooth 1 second catch up
            }
        });
    });

    /* --- Testimonials Parallax Section --- */
    const testimonialBgImg = document.querySelector('.testimonials-bg img');
    if (testimonialBgImg) {
        // Initialize image larger than its container to prevent clipping during movement
        gsap.set(testimonialBgImg, { scale: 1.2, transformOrigin: "center center" });

        gsap.to(testimonialBgImg, {
            yPercent: 20, // Move down smoothly to give parallax effect
            ease: "none",
            scrollTrigger: {
                trigger: ".testimonials-section",
                start: "top bottom", // Trigger when the top of the section hits the bottom of the viewport
                end: "bottom top",   // End when the bottom of the section leaves the top of the viewport
                scrub: true
            }
        });
    }

    /* --- Custom Blend Cursor --- */
    const cursor = document.querySelector('.custom-cursor');
    if (cursor) {
        // Use GSAP quickTo for highly performant mouse tracking
        let xTo = gsap.quickTo(cursor, "x", {duration: 0.1, ease: "power3", immediateRender: true});
        let yTo = gsap.quickTo(cursor, "y", {duration: 0.1, ease: "power3", immediateRender: true});

        window.addEventListener("mousemove", (e) => {
            xTo(e.clientX);
            yTo(e.clientY);
        });

        // Add hover effect for interactable elements
        const interactables = document.querySelectorAll('a, button, .carousel-row img, .service-card');
        interactables.forEach(el => {
            el.addEventListener('mouseenter', () => cursor.classList.add('hovering'));
            el.addEventListener('mouseleave', () => cursor.classList.remove('hovering'));
        });
    }

    window.addEventListener('resize', () => ScrollTrigger.refresh());
});
