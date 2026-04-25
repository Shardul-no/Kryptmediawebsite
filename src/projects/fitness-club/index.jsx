import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import heroAthlete from './images/hero-athlete.jpg';
import storyVideoThumb from './images/story-video-thumb.jpg';
import featuresBg from './images/features-bg.jpg';
import classStrength from './images/class-strength.jpg';
import classHiit from './images/class-hiit.jpg';
import classFunctional from './images/class-functional.jpg';
import ctaBg from './images/cta-bg.jpg';

gsap.registerPlugin(ScrollTrigger);

const NAV_LINKS = ['Home', 'About', 'Contact Us', 'Blog'];

const FEATURES = [
  {
    icon: '⊕',
    name: 'Various Exercises',
    desc: 'Train with 200+ structured workout programs across strength, HIIT, yoga, and cardio. Every fitness goal, covered.',
  },
  {
    icon: '≡',
    name: 'Friendly Environment',
    desc: "A gym culture built on support and accountability — not intimidation. Coaches who know your name.",
  },
  {
    icon: '⊞',
    name: 'Full Fitness Equipment',
    desc: 'State-of-the-art machines, free weights, functional rigs, and recovery tools maintained to the highest standard.',
  },
  {
    icon: '⊙',
    name: 'Expert Coaching',
    desc: 'Certified trainers with a combined 80+ years of experience. One-on-one and group sessions available.',
  },
  {
    icon: '◎',
    name: 'Flexible Scheduling',
    desc: "Open 5AM–11PM, 365 days a year. Morning grind or late-night lift — we're here when you are.",
  },
  {
    icon: '⊡',
    name: 'Nutrition Support',
    desc: 'In-house nutrition consultation, meal planning resources, and supplement guidance to fuel your training.',
  },
];

const CLASSES = [
  { img: classStrength, name: 'STRENGTH & POWER', schedule: 'Mon / Wed / Fri — 6:00 AM', coach: 'Coach: Marcus Webb' },
  { img: classHiit,     name: 'HIIT BURN',         schedule: 'Tue / Thu / Sat — 7:30 AM', coach: 'Coach: Sarah Okonkwo' },
  { img: classFunctional, name: 'FUNCTIONAL FIT',  schedule: 'Daily — 12:00 PM',           coach: 'Coach: Diego Torres' },
];

const STATS = [
  { val: 12000, suffix: '+', label: 'Members Trained' },
  { val: 200,   suffix: '+', label: 'Programs' },
  { val: 80,    suffix: '+', label: 'Expert Coaches' },
  { val: 15,    suffix: '+', label: 'Years in Business' },
];

const TESTIMONIALS = [
  {
    quote: "This gym changed everything for me. Lost 18kg in 5 months with the coaching and HIIT programs. I've never felt stronger or more confident in my life.",
    name: 'Rahul Mehta',
    since: 'Member since 2022',
  },
  {
    quote: 'The trainers here are on another level. They push you hard but they actually care about your form and progress. Best investment I\'ve made.',
    name: 'Priya Sharma',
    since: 'Member since 2021',
  },
  {
    quote: 'I was intimidated walking in on day one. By week two, this gym felt like home. The community here is genuinely supportive and the facilities are world-class.',
    name: 'Arjun Kapoor',
    since: 'Member since 2023',
  },
];

const bebas  = "'Bebas Neue', sans-serif";
const barlow = "'Barlow', sans-serif";
const barlowC = "'Barlow Condensed', sans-serif";
const red    = '#CC0000';
const grey   = '#D4D4D4';

function EyebrowLabel({ children, center = false }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: center ? 'center' : 'flex-start', gap: 12, marginBottom: 16 }}>
      <div style={{ width: 30, height: 2, background: red, flexShrink: 0 }} />
      <span style={{ fontFamily: barlowC, fontSize: 13, letterSpacing: 6, color: red, textTransform: 'uppercase', whiteSpace: 'nowrap' }}>
        {children}
      </span>
      {center && <div style={{ width: 30, height: 2, background: red, flexShrink: 0 }} />}
    </div>
  );
}

export default function FitnessClub() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  /* ── refs ── */
  const navRef          = useRef(null);
  const heroHeadlineRef = useRef(null);
  const heroSubRef      = useRef(null);
  const heroImageRef    = useRef(null);
  const heroGhostRef    = useRef(null);
  const heroLabelWrap   = useRef(null);   // outer wrapper handles position
  const heroLabelInner  = useRef(null);   // GSAP animates this

  const storyLeftRef    = useRef(null);
  const storyRightRef   = useRef(null);
  const featuresTitleRef = useRef(null);
  const featureCardsRef = useRef([]);

  const classCardsRef   = useRef([]);

  const statSectionRef  = useRef(null);
  const statDisplayRefs = useRef([]);   // direct DOM for counter updates
  const statDividerRefs = useRef([]);

  const testiCardsRef   = useRef([]);
  const quoteMarkRefs   = useRef([]);

  const ctaBgRef        = useRef(null);
  const ctaHeadRef      = useRef(null);
  const ctaBtnRefs      = useRef([]);

  const footerColRefs   = useRef([]);

  /* ── scroll state for nav ── */
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 80);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* ── fonts ── */
  useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href =
      'https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow:wght@300;400;500&family=Barlow+Condensed:wght@400;600&display=swap';
    document.head.appendChild(link);
    return () => { if (document.head.contains(link)) document.head.removeChild(link); };
  }, []);

  /* ── hero load animations ── */
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Nav slides down
      gsap.fromTo(navRef.current,
        { y: -30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' }
      );
      // Headline block fades up
      gsap.fromTo(heroHeadlineRef.current,
        { y: 80, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'expo.out', delay: 0.2 }
      );
      // Sub line clips from left
      gsap.fromTo(heroSubRef.current,
        { clipPath: 'inset(0 100% 0 0)' },
        { clipPath: 'inset(0 0% 0 0)', duration: 0.9, ease: 'power3.out', delay: 0.8 }
      );
      // Athlete image scale in
      gsap.fromTo(heroImageRef.current,
        { scale: 1.1, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1.2, ease: 'power3.out', delay: 0.1 }
      );
      // Ghost type fades to near-invisible
      gsap.fromTo(heroGhostRef.current,
        { opacity: 0 },
        { opacity: 0.06, duration: 2, ease: 'none' }
      );
      // Rotated label slides in
      gsap.fromTo(heroLabelInner.current,
        { x: -20, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.8, ease: 'power2.out', delay: 1 }
      );
    });
    return () => ctx.revert();
  }, []);

  /* ── scroll animations ── */
  useEffect(() => {
    const ctx = gsap.context(() => {
      const st = { start: 'top 75%', toggleActions: 'play none none reverse' };

      // Story
      gsap.fromTo(storyLeftRef.current,
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, ease: 'power2.out', scrollTrigger: { trigger: storyLeftRef.current, ...st } }
      );
      gsap.fromTo(storyRightRef.current,
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, ease: 'power2.out', delay: 0.2, scrollTrigger: { trigger: storyRightRef.current, ...st } }
      );

      // Features title clip
      gsap.fromTo(featuresTitleRef.current,
        { clipPath: 'inset(0 100% 0 0)' },
        { clipPath: 'inset(0 0% 0 0)', duration: 1, ease: 'power3.out', scrollTrigger: { trigger: featuresTitleRef.current, ...st } }
      );

      // Feature cards stagger
      const fCards = featureCardsRef.current.filter(Boolean);
      if (fCards.length) {
        gsap.fromTo(fCards,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, ease: 'power2.out', stagger: 0.1, scrollTrigger: { trigger: fCards[0], ...st } }
        );
      }

      // Class cards slide from right
      const cCards = classCardsRef.current.filter(Boolean);
      if (cCards.length) {
        gsap.fromTo(cCards,
          { x: 80, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.8, ease: 'power2.out', stagger: 0.15, scrollTrigger: { trigger: cCards[0], ...st } }
        );
      }

      // Stat dividers scale
      const divs = statDividerRefs.current.filter(Boolean);
      if (divs.length) {
        gsap.fromTo(divs,
          { scaleY: 0 },
          { scaleY: 1, duration: 0.6, ease: 'power2.inOut', stagger: 0.1, scrollTrigger: { trigger: statSectionRef.current, ...st } }
        );
      }

      // Stat counters — direct DOM writes, no re-render
      STATS.forEach((stat, i) => {
        const proxy = { val: 0 };
        ScrollTrigger.create({
          trigger: statSectionRef.current,
          start: 'top 75%',
          once: true,
          onEnter: () => {
            gsap.to(proxy, {
              val: stat.val,
              duration: 2,
              ease: 'power1.out',
              onUpdate() {
                const el = statDisplayRefs.current[i];
                if (el) el.textContent = Math.round(proxy.val).toLocaleString() + stat.suffix;
              },
            });
          },
        });
      });

      // Testimonials
      const tCards = testiCardsRef.current.filter(Boolean);
      if (tCards.length) {
        gsap.fromTo(tCards,
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out', stagger: 0.2, scrollTrigger: { trigger: tCards[0], ...st } }
        );
      }
      const qMarks = quoteMarkRefs.current.filter(Boolean);
      if (qMarks.length) {
        gsap.fromTo(qMarks,
          { scale: 0, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.6, ease: 'back.out(1.7)', stagger: 0.2, scrollTrigger: { trigger: qMarks[0], ...st } }
        );
      }

      // CTA parallax bg
      gsap.fromTo(ctaBgRef.current,
        { scale: 1.05 },
        { scale: 1, ease: 'none', scrollTrigger: { trigger: ctaBgRef.current, start: 'top bottom', end: 'bottom top', scrub: true } }
      );
      // CTA headline
      gsap.fromTo(ctaHeadRef.current,
        { y: 80, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'expo.out', scrollTrigger: { trigger: ctaHeadRef.current, ...st } }
      );
      // CTA buttons
      const btns = ctaBtnRefs.current.filter(Boolean);
      if (btns.length) {
        gsap.fromTo(btns,
          { scale: 0.85, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.6, ease: 'power2.out', stagger: 0.15, delay: 0.5, scrollTrigger: { trigger: ctaHeadRef.current, ...st } }
        );
      }

      // Footer cols
      const fCols = footerColRefs.current.filter(Boolean);
      if (fCols.length) {
        gsap.fromTo(fCols,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, ease: 'power2.out', stagger: 0.1, scrollTrigger: { trigger: fCols[0], ...st } }
        );
      }
    });
    return () => ctx.revert();
  }, []);

  /* ── helpers ── */
  const hoverLink = { onMouseEnter: e => (e.target.style.color = red), onMouseLeave: e => (e.target.style.color = grey) };
  const hoverNavLink = { onMouseEnter: e => (e.target.style.color = red), onMouseLeave: e => (e.target.style.color = '#fff') };

  /* ────────────────────────── RENDER ────────────────────────── */
  return (
    <div style={{ background: '#0A0A0A', color: '#fff', fontFamily: barlow, overflowX: 'hidden', minHeight: '100vh' }}>

      {/* ══ NAV ══ */}
      <nav
        ref={navRef}
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
          transition: 'background 0.3s, box-shadow 0.3s, padding 0.3s',
          background: isScrolled ? 'rgba(0,0,0,0.95)' : 'transparent',
          backdropFilter: isScrolled ? 'blur(10px)' : 'none',
          boxShadow: isScrolled ? '0 2px 24px rgba(0,0,0,0.6)' : 'none',
          padding: isScrolled ? '12px 0' : '20px 0',
        }}
      >
        <div className="max-w-[1400px] mx-auto px-6 lg:px-8 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2.5">
            <div style={{ width: 28, height: 28, background: red, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <span style={{ fontFamily: bebas, fontSize: 14, color: '#fff', lineHeight: 1 }}>F</span>
            </div>
            <span style={{ fontFamily: bebas, fontSize: 20, letterSpacing: 3, color: '#fff' }}>FITNESS CLUB</span>
          </div>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map(link => (
              <a key={link} href="#"
                style={{ fontFamily: barlow, fontSize: 14, fontWeight: 400, color: '#fff', textDecoration: 'none', letterSpacing: 1, transition: 'color 0.2s' }}
                {...hoverNavLink}
              >{link}</a>
            ))}
          </div>

          {/* Hamburger */}
          <button
            className="md:hidden flex flex-col justify-center gap-[5px] p-1"
            style={{ background: 'none', border: 'none', cursor: 'pointer' }}
            onClick={() => setMobileOpen(v => !v)}
            aria-label="Toggle menu"
          >
            {[0, 1, 2].map(i => (
              <span key={i} style={{
                display: 'block', width: 24, height: 2, background: '#fff', borderRadius: 1,
                transition: 'transform 0.3s, opacity 0.3s',
                transform: mobileOpen
                  ? i === 0 ? 'rotate(45deg) translate(5px, 5px)'
                  : i === 2 ? 'rotate(-45deg) translate(5px, -5px)'
                  : 'scaleX(0)'
                  : 'none',
                opacity: mobileOpen && i === 1 ? 0 : 1,
              }} />
            ))}
          </button>
        </div>

        {/* Mobile overlay */}
        {mobileOpen && (
          <div
            className="md:hidden flex flex-col gap-6 px-6 py-8"
            style={{ background: 'rgba(0,0,0,0.97)' }}
          >
            {NAV_LINKS.map(link => (
              <a key={link} href="#"
                onClick={() => setMobileOpen(false)}
                style={{ fontFamily: bebas, fontSize: 32, letterSpacing: 3, color: '#fff', textDecoration: 'none', transition: 'color 0.2s' }}
                {...hoverNavLink}
              >{link}</a>
            ))}
          </div>
        )}
      </nav>

      {/* ══ HERO ══ */}
      <section style={{ position: 'relative', height: '100vh', background: '#0A0A0A', display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
        {/* Ghost "GYM" */}
        <div ref={heroGhostRef} style={{
          position: 'absolute', zIndex: 0, pointerEvents: 'none', userSelect: 'none',
          fontFamily: bebas, fontSize: 'clamp(160px, 28vw, 320px)', color: '#1a1a1a',
          top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
          whiteSpace: 'nowrap', opacity: 0, lineHeight: 1,
        }}>GYM</div>

        {/* Rotated label — wrapper holds position, inner is GSAP target */}
        <div ref={heroLabelWrap} className="hidden lg:block"
          style={{ position: 'absolute', left: 24, top: '50%', transform: 'translateY(-50%)', zIndex: 10 }}>
          <div ref={heroLabelInner} style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)', fontFamily: barlowC, fontSize: 11, letterSpacing: 8, color: grey, textTransform: 'uppercase', opacity: 0 }}>
            THE MIND IS PRIMARY
          </div>
        </div>

        {/* Content */}
        <div className="relative flex flex-col md:flex-row items-center justify-between w-full max-w-[1400px] mx-auto px-8 md:px-20 gap-10"
          style={{ zIndex: 10 }}>
          {/* Left text */}
          <div className="flex-1 md:basis-[55%]">
            <div ref={heroHeadlineRef} style={{ opacity: 0 }}>
              <h1 style={{ fontFamily: bebas, fontSize: 'clamp(72px, 11vw, 140px)', color: red, lineHeight: 0.9, letterSpacing: 2 }}>
                FITNESS<br />CLUB
              </h1>
            </div>
            <div ref={heroSubRef} style={{ marginTop: 24, clipPath: 'inset(0 100% 0 0)' }}>
              <p style={{ fontFamily: bebas, fontSize: 'clamp(16px, 2.2vw, 36px)', color: '#fff', letterSpacing: 4 }}>
                WAKE UP. IT'S TIME TO CHANGE
              </p>
            </div>
          </div>

          {/* Right circle image */}
          <div className="flex-shrink-0 flex justify-center md:basis-[40%]">
            <div ref={heroImageRef} style={{
              width: 'clamp(220px, 32vw, 480px)', height: 'clamp(220px, 32vw, 480px)',
              borderRadius: '50%', overflow: 'hidden', opacity: 0,
            }}>
              <img src={heroAthlete} alt="Fitness athlete" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }} loading="eager" />
            </div>
          </div>
        </div>

        {/* Dark overlay */}
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.55)', zIndex: 5, pointerEvents: 'none' }} />
      </section>

      {/* ══ OUR STORY / WHO WE ARE ══ */}
      <section style={{ background: '#111111', padding: '100px 0' }}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 max-w-[1400px] mx-auto px-6 lg:px-12 items-center">
          {/* Left */}
          <div ref={storyLeftRef} style={{ opacity: 0 }}>
            <EyebrowLabel>Gym Overview</EyebrowLabel>
            <h2 style={{ fontFamily: bebas, fontSize: 'clamp(36px, 5vw, 64px)', color: red, marginBottom: 32 }}>OUR STORY</h2>

            {/* Video thumbnail */}
            <div
              style={{ position: 'relative', overflow: 'hidden', cursor: 'pointer', lineHeight: 0 }}
              onMouseEnter={e => { const t = e.currentTarget.querySelector('[data-tint]'); if (t) t.style.opacity = '0.72'; }}
              onMouseLeave={e => { const t = e.currentTarget.querySelector('[data-tint]'); if (t) t.style.opacity = '0.55'; }}
            >
              <img src={storyVideoThumb} alt="Gym story" style={{ width: '100%', display: 'block' }} loading="lazy" />
              <div data-tint style={{ position: 'absolute', inset: 0, background: 'rgba(180,0,0,0.55)', transition: 'opacity 0.3s', zIndex: 5 }} />
              <div style={{
                position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', zIndex: 10,
                width: 64, height: 64, borderRadius: '50%', border: '3px solid #fff',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <div style={{ width: 0, height: 0, borderTop: '11px solid transparent', borderBottom: '11px solid transparent', borderLeft: '18px solid #fff', marginLeft: 4 }} />
              </div>
            </div>
          </div>

          {/* Right */}
          <div ref={storyRightRef} style={{ opacity: 0 }}>
            <EyebrowLabel>About Us</EyebrowLabel>
            <h2 style={{ fontFamily: bebas, fontSize: 'clamp(36px, 5vw, 64px)', color: red, marginBottom: 28 }}>WHO WE ARE</h2>

            <p style={{ fontFamily: barlow, fontWeight: 300, fontSize: 16, lineHeight: 1.7, color: grey, marginBottom: 18 }}>
              We believe fitness is more than a physical pursuit — it's a commitment to becoming the strongest version of yourself. Founded by athletes, designed for warriors.
            </p>
            <p style={{ fontFamily: barlow, fontWeight: 300, fontSize: 16, lineHeight: 1.7, color: grey, marginBottom: 18 }}>
              Since 2010, our gym has trained over 12,000 members across strength, cardio, HIIT, and functional fitness disciplines. Every machine, every coach, every program is engineered for results.
            </p>
            <p style={{ fontFamily: barlow, fontWeight: 300, fontSize: 16, lineHeight: 1.7, color: grey, marginBottom: 18 }}>
              We don't believe in shortcuts. We believe in showing up, putting in the work, and leaving everything on the floor. That's the Fitness Club way.
            </p>
            <p style={{ fontFamily: barlow, fontWeight: 300, fontSize: 16, lineHeight: 1.7, color: grey, marginBottom: 36 }}>
              Join a community built on discipline, accountability, and the relentless pursuit of personal bests.
            </p>

            <button
              style={{ background: red, color: '#fff', padding: '14px 32px', fontFamily: barlowC, fontSize: 13, letterSpacing: 3, textTransform: 'uppercase', border: `1px solid ${red}`, cursor: 'pointer', transition: 'all 0.2s' }}
              onMouseEnter={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = red; }}
              onMouseLeave={e => { e.currentTarget.style.background = red; e.currentTarget.style.color = '#fff'; }}
            >READ MORE</button>
          </div>
        </div>
      </section>

      {/* ══ WHY CHOOSE US ══ */}
      <section style={{ position: 'relative', padding: '100px 0', overflow: 'hidden' }}>
        {/* BG */}
        <div style={{ position: 'absolute', inset: 0, zIndex: 1 }}>
          <img src={featuresBg} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.3 }} loading="lazy" />
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(10,10,10,0.7)' }} />
        </div>

        <div className="relative max-w-[1400px] mx-auto px-6 lg:px-12" style={{ zIndex: 10 }}>
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: 72 }}>
            <EyebrowLabel center>Awesome Features</EyebrowLabel>
            <div ref={featuresTitleRef} style={{ overflow: 'hidden' }}>
              <h2 style={{ fontFamily: bebas, fontSize: 'clamp(40px, 6vw, 72px)', color: red, letterSpacing: 4 }}>WHY CHOOSE US</h2>
            </div>
          </div>

          {/* Row 1 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 mb-12">
            {FEATURES.slice(0, 3).map((f, i) => (
              <div key={i} ref={el => featureCardsRef.current[i] = el} style={{ textAlign: 'center', opacity: 0 }}>
                <div
                  style={{ fontSize: 40, color: '#fff', marginBottom: 16, display: 'inline-block', transition: 'color 0.3s', cursor: 'default' }}
                  onMouseEnter={e => (e.currentTarget.style.color = red)}
                  onMouseLeave={e => (e.currentTarget.style.color = '#fff')}
                >{f.icon}</div>
                <h3 style={{ fontFamily: barlowC, fontSize: 16, letterSpacing: 3, textTransform: 'uppercase', color: '#fff', marginBottom: 12 }}>{f.name}</h3>
                <p style={{ fontFamily: barlow, fontWeight: 300, fontSize: 14, lineHeight: 1.7, color: grey }}>{f.desc}</p>
              </div>
            ))}
          </div>

          {/* Divider between rows */}
          <div style={{ borderTop: `1px solid ${red}`, width: 60, margin: '0 auto 48px' }} />

          {/* Row 2 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {FEATURES.slice(3).map((f, i) => (
              <div key={i} ref={el => featureCardsRef.current[3 + i] = el} style={{ textAlign: 'center', opacity: 0 }}>
                <div
                  style={{ fontSize: 40, color: '#fff', marginBottom: 16, display: 'inline-block', transition: 'color 0.3s', cursor: 'default' }}
                  onMouseEnter={e => (e.currentTarget.style.color = red)}
                  onMouseLeave={e => (e.currentTarget.style.color = '#fff')}
                >{f.icon}</div>
                <h3 style={{ fontFamily: barlowC, fontSize: 16, letterSpacing: 3, textTransform: 'uppercase', color: '#fff', marginBottom: 12 }}>{f.name}</h3>
                <p style={{ fontFamily: barlow, fontWeight: 300, fontSize: 14, lineHeight: 1.7, color: grey }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ CLASSES ══ */}
      <section style={{ background: '#111111', padding: '100px 0' }}>
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div style={{ marginBottom: 56 }}>
            <EyebrowLabel>Our Programs</EyebrowLabel>
            <h2 style={{ fontFamily: bebas, fontSize: 'clamp(40px, 6vw, 72px)', color: red, letterSpacing: 2 }}>CLASSES WE OFFER</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {CLASSES.map((cls, i) => (
              <div
                key={i}
                ref={el => classCardsRef.current[i] = el}
                style={{ position: 'relative', overflow: 'hidden', cursor: 'pointer', opacity: 0 }}
                onMouseEnter={e => {
                  gsap.to(e.currentTarget.querySelector('img'), { scale: 1.08, duration: 0.5 });
                  gsap.to(e.currentTarget, { scale: 1.03, duration: 0.3 });
                  gsap.to(e.currentTarget.querySelector('[data-overlay-text]'), { y: 0, duration: 0.4 });
                }}
                onMouseLeave={e => {
                  gsap.to(e.currentTarget.querySelector('img'), { scale: 1, duration: 0.5 });
                  gsap.to(e.currentTarget, { scale: 1, duration: 0.3 });
                  gsap.to(e.currentTarget.querySelector('[data-overlay-text]'), { y: 20, duration: 0.4 });
                }}
              >
                <img src={cls.img} alt={cls.name} style={{ width: '100%', height: 480, objectFit: 'cover', display: 'block' }} loading="lazy" />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, transparent 60%)', zIndex: 5 }} />
                <div data-overlay-text style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '28px 24px', zIndex: 10, transform: 'translateY(20px)', transition: 'transform 0.4s ease' }}>
                  <span style={{ display: 'inline-block', background: red, fontFamily: barlowC, fontSize: 11, letterSpacing: 2, padding: '4px 10px', marginBottom: 12, textTransform: 'uppercase' }}>
                    {cls.schedule}
                  </span>
                  <h3 style={{ fontFamily: bebas, fontSize: 28, color: '#fff', letterSpacing: 2, marginBottom: 6, display: 'block' }}>{cls.name}</h3>
                  <p style={{ fontFamily: barlow, fontWeight: 300, fontSize: 13, color: grey }}>{cls.coach}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ STATS ══ */}
      <section ref={statSectionRef} style={{ background: '#0A0A0A', padding: '80px 0' }}>
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 flex flex-wrap justify-center items-center">
          {STATS.map((stat, i) => (
            <div key={stat.label} className="flex items-center">
              <div style={{ textAlign: 'center', padding: '0 40px' }}>
                <div ref={el => statDisplayRefs.current[i] = el}
                  style={{ fontFamily: bebas, fontSize: 'clamp(48px, 6vw, 72px)', color: red, lineHeight: 1 }}>
                  0{stat.suffix}
                </div>
                <div style={{ fontFamily: barlow, fontWeight: 300, fontSize: 14, color: grey, marginTop: 8, letterSpacing: 1 }}>{stat.label}</div>
              </div>
              {i < STATS.length - 1 && (
                <div ref={el => statDividerRefs.current[i] = el}
                  style={{ width: 1, height: 60, background: red, flexShrink: 0, transformOrigin: 'center' }} />
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ══ TESTIMONIALS ══ */}
      <section style={{ background: '#0D0D0D', padding: '100px 0' }}>
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div style={{ textAlign: 'center', marginBottom: 72 }}>
            <EyebrowLabel center>What They Say</EyebrowLabel>
            <h2 style={{ fontFamily: bebas, fontSize: 'clamp(40px, 6vw, 72px)', color: '#fff', letterSpacing: 4 }}>MEMBER RESULTS</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((t, i) => (
              <div key={i} ref={el => testiCardsRef.current[i] = el}
                style={{ background: '#111111', padding: 40, opacity: 0, position: 'relative' }}>
                <div ref={el => quoteMarkRefs.current[i] = el}
                  style={{ fontFamily: bebas, fontSize: 80, color: red, lineHeight: 0.7, marginBottom: 24, display: 'block', opacity: 0 }}>
                  "
                </div>
                <p style={{ fontFamily: barlow, fontWeight: 300, fontSize: 16, lineHeight: 1.7, color: grey, fontStyle: 'italic', marginBottom: 28 }}>
                  {t.quote}
                </p>
                <div>
                  <div style={{ fontFamily: barlowC, fontWeight: 600, fontSize: 14, letterSpacing: 2, color: '#fff', textTransform: 'uppercase', marginBottom: 4 }}>
                    — {t.name}
                  </div>
                  <div style={{ fontFamily: barlow, fontWeight: 300, fontSize: 12, color: grey, marginBottom: 8 }}>{t.since}</div>
                  <div style={{ color: red, fontSize: 16, letterSpacing: 2 }}>★★★★★</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ CTA ══ */}
      <section style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
        <div ref={ctaBgRef} style={{ position: 'absolute', inset: 0, zIndex: 1 }}>
          <img src={ctaBg} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} loading="lazy" />
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.75)' }} />
        </div>

        <div className="relative max-w-[900px] mx-auto px-6 lg:px-12 text-center" style={{ zIndex: 10 }}>
          <EyebrowLabel center>Ready to Transform?</EyebrowLabel>

          <div ref={ctaHeadRef} style={{ opacity: 0 }}>
            <h2 style={{ fontFamily: bebas, fontSize: 'clamp(48px, 9vw, 96px)', color: '#fff', lineHeight: 0.95, marginBottom: 28, letterSpacing: 2 }}>
              START YOUR<br />JOURNEY TODAY
            </h2>
          </div>

          <p style={{ fontFamily: barlow, fontWeight: 300, fontSize: 18, color: grey, lineHeight: 1.7, marginBottom: 48 }}>
            Stop waiting for the perfect moment.<br />The perfect moment is now.
          </p>

          <div className="flex flex-wrap gap-4 justify-center">
            <button
              ref={el => ctaBtnRefs.current[0] = el}
              style={{ background: red, color: '#fff', padding: '16px 36px', fontFamily: barlowC, fontSize: 13, letterSpacing: 3, textTransform: 'uppercase', border: `1px solid ${red}`, cursor: 'pointer', transition: 'all 0.2s', opacity: 0 }}
              onMouseEnter={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = red; }}
              onMouseLeave={e => { e.currentTarget.style.background = red; e.currentTarget.style.color = '#fff'; }}
            >JOIN NOW — FREE TRIAL</button>

            <button
              ref={el => ctaBtnRefs.current[1] = el}
              style={{ background: 'transparent', color: '#fff', padding: '16px 36px', fontFamily: barlowC, fontSize: 13, letterSpacing: 3, textTransform: 'uppercase', border: '1px solid #fff', cursor: 'pointer', transition: 'all 0.2s', opacity: 0 }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = red; e.currentTarget.style.color = red; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = '#fff'; e.currentTarget.style.color = '#fff'; }}
            >GET A TOUR</button>
          </div>
        </div>
      </section>

      {/* ══ FOOTER ══ */}
      <footer style={{ background: '#0A0A0A', paddingTop: 80, borderTop: '1px solid #1a1a1a' }}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 max-w-[1400px] mx-auto px-6 lg:px-12 mb-16">

          {/* Brand */}
          <div ref={el => footerColRefs.current[0] = el} style={{ opacity: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
              <div style={{ width: 28, height: 28, background: red, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <span style={{ fontFamily: bebas, fontSize: 14, color: '#fff' }}>F</span>
              </div>
              <span style={{ fontFamily: bebas, fontSize: 20, letterSpacing: 3, color: '#fff' }}>FITNESS CLUB</span>
            </div>
            <p style={{ fontFamily: barlow, fontWeight: 300, fontSize: 14, lineHeight: 1.7, color: grey, marginBottom: 24 }}>
              Forging strength, discipline, and community since 2010.
            </p>
            <div className="flex gap-3">
              {['FB', 'IG', 'TW', 'YT'].map(s => (
                <a key={s} href="#"
                  style={{ width: 36, height: 36, border: '1px solid #333', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: barlowC, fontSize: 11, color: grey, textDecoration: 'none', transition: 'all 0.2s' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = red; e.currentTarget.style.color = red; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = '#333'; e.currentTarget.style.color = grey; }}
                >{s}</a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div ref={el => footerColRefs.current[1] = el} style={{ opacity: 0 }}>
            <h4 style={{ fontFamily: barlowC, fontSize: 13, letterSpacing: 4, color: '#fff', textTransform: 'uppercase', marginBottom: 24 }}>Quick Links</h4>
            {['Home', 'About', 'Classes', 'Trainers', 'Contact'].map(link => (
              <div key={link} style={{ marginBottom: 12 }}>
                <a href="#" style={{ fontFamily: barlow, fontWeight: 300, fontSize: 14, color: grey, textDecoration: 'none', transition: 'color 0.2s' }} {...hoverLink}>{link}</a>
              </div>
            ))}
          </div>

          {/* Classes */}
          <div ref={el => footerColRefs.current[2] = el} style={{ opacity: 0 }}>
            <h4 style={{ fontFamily: barlowC, fontSize: 13, letterSpacing: 4, color: '#fff', textTransform: 'uppercase', marginBottom: 24 }}>Classes</h4>
            {['Strength & Power', 'HIIT Burn', 'Functional Fit', 'Yoga Flow', 'Boxing'].map(c => (
              <div key={c} style={{ marginBottom: 12 }}>
                <a href="#" style={{ fontFamily: barlow, fontWeight: 300, fontSize: 14, color: grey, textDecoration: 'none', transition: 'color 0.2s' }} {...hoverLink}>{c}</a>
              </div>
            ))}
          </div>

          {/* Contact */}
          <div ref={el => footerColRefs.current[3] = el} style={{ opacity: 0 }}>
            <h4 style={{ fontFamily: barlowC, fontSize: 13, letterSpacing: 4, color: '#fff', textTransform: 'uppercase', marginBottom: 24 }}>Contact</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <p style={{ fontFamily: barlow, fontWeight: 300, fontSize: 14, color: grey }}>📍 123 Gym Street, Andheri, Mumbai</p>
              <p style={{ fontFamily: barlow, fontWeight: 300, fontSize: 14, color: grey }}>📞 +91 98765 43210</p>
              <p style={{ fontFamily: barlow, fontWeight: 300, fontSize: 14, color: grey }}>✉ hello@fitnessclub.in</p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex items-center justify-between max-w-[1400px] mx-auto px-6 lg:px-12 py-6" style={{ borderTop: '1px solid #1a1a1a' }}>
          <p style={{ fontFamily: barlow, fontWeight: 300, fontSize: 13, color: grey }}>
            © 2025 Fitness Club. All Rights Reserved.
          </p>
          <div style={{ width: 40, height: 1, background: red }} />
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            style={{ fontFamily: barlowC, fontSize: 13, letterSpacing: 2, color: red, background: 'none', border: 'none', cursor: 'pointer', textTransform: 'uppercase' }}
          >↑ Back to Top</button>
        </div>
      </footer>

    </div>
  );
}
