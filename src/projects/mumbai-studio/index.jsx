import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useInView } from 'react-intersection-observer';
import { FaMicrophone, FaMusic, FaWaveSquare, FaCompactDisc, FaVolumeUp, FaPlay, FaPause, FaClock, FaEnvelope, FaPhone, FaBars, FaTimes } from 'react-icons/fa';
import { HiOutlineSparkles } from 'react-icons/hi';

// Fonts are already loaded in index.css

gsap.registerPlugin(ScrollTrigger);

// Import assets
import hero from './assets/hero-studio-mumbai.png';
import studioSession from './assets/studio-recording-session.png';
import mixingConsole from './assets/mixing-console-closeup.png';
import vocalBooth from './assets/vocal-booth-neon.png';
import artistSilhouette from './assets/artist-silhouette-recording.png';
import mumbaiNight from './assets/mumbai-night-studio.png';
import textureOverlay from './assets/studio-texture-overlay.png';

export default function MumbaiStudio() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [recordingTime, setRecordingTime] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const heroRef = useRef(null);
  const parallaxRef = useRef(null);
  const textureRef = useRef(null);
  const cardsRef = useRef([]);
  const textRevealRef = useRef([]);
  const mouseTrackRef = useRef(null);
  const verticalTextRef = useRef(null);
  const quoteRef = useRef([]);
  const navbarRef = useRef(null);
  
  // Mouse tracking effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Smooth scroll to section
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Scroll to top
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Recording timer
  useEffect(() => {
    let interval;
    if (isRecording) {
      interval = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
    } else {
      setRecordingTime(0);
    }
    return () => clearInterval(interval);
  }, [isRecording]);

  // GSAP Animations
  useEffect(() => {
    // Hero parallax
    gsap.to(heroRef.current, {
      yPercent: -50,
      ease: "none",
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true
      }
    });

    // Parallax background
    gsap.to(parallaxRef.current, {
      yPercent: -30,
      ease: "none",
      scrollTrigger: {
        trigger: parallaxRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true
      }
    });

    // Cards animation
    cardsRef.current.forEach((card, index) => {
      gsap.fromTo(card, 
        { opacity: 0, y: 50 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.8,
          delay: index * 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: card,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );
    });

    // Quote animations
    quoteRef.current.forEach((quote, index) => {
      gsap.fromTo(quote,
        { opacity: 0, scale: 0.95 },
        {
          opacity: 1,
          scale: 1,
          duration: 1.2,
          delay: index * 0.3,
          ease: "power2.out",
          scrollTrigger: {
            trigger: quote,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );
    });

    // Vertical text animation
    if (verticalTextRef.current) {
      gsap.fromTo(verticalTextRef.current,
        { opacity: 0, x: -50 },
        {
          opacity: 1,
          x: 0,
          duration: 1.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: verticalTextRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }

    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Navbar Component
  const Navbar = () => (
    <>
      {/* Desktop Navbar */}
      <nav 
        ref={navbarRef}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-black/80 backdrop-blur-xl border-b border-white/10 py-3' 
            : 'bg-transparent py-6'
        }`}
      >
        <div className="container mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo - Left */}
            <div className="flex items-center gap-2">
              <button
                onClick={scrollToTop}
                className="text-white text-2xl lg:text-3xl font-black tracking-wider hover:text-red-400 transition-colors"
                style={{ fontFamily: 'Playfair Display, serif' }}
              >
                MIDNIGHT SOUND
              </button>
            </div>

            {/* Navigation - Center (Desktop) */}
            <div className="hidden lg:flex items-center gap-8">
              {['Studio', 'Services', 'Artists', 'Book', 'Contact'].map((item, index) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className="text-white/90 text-sm font-medium tracking-wider hover:text-red-400 transition-colors relative group"
                  style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                >
                  {item}
                  <span className="absolute bottom-0 left-0 w-0 h-px bg-red-400 transition-all duration-300 group-hover:w-full" />
                </button>
              ))}
            </div>

            {/* CTA Button - Right */}
            <div className="flex items-center gap-4">
              {/* Live Studio Indicator */}
              <div className="hidden md:flex items-center gap-2 text-white/60 text-xs tracking-wider">
                <div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" />
                <span>Mumbai • Live Studio</span>
              </div>
              
              {/* Book Session Button */}
              <button 
                onClick={() => scrollToSection('book')}
                className="hidden md:block bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-full text-sm font-medium tracking-wide transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-red-600/50"
              >
                Book Session
              </button>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden text-white/90 hover:text-white transition-colors"
              >
                {isMobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-black lg:hidden">
          <div className="flex flex-col items-center justify-center h-full px-6">
            {/* Mobile Logo */}
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                scrollToTop();
              }}
              className="text-white text-4xl font-black tracking-wider mb-16 hover:text-red-400 transition-colors"
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              MIDNIGHT SOUND
            </button>

            {/* Mobile Navigation Links */}
            <nav className="flex flex-col items-center gap-8">
              {['Studio', 'Services', 'Artists', 'Book Session', 'Contact'].map((item, index) => (
                <button
                  key={item}
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    scrollToSection(item.toLowerCase().replace(' ', '-'));
                  }}
                  className="text-white text-2xl lg:text-3xl font-light tracking-wider hover:text-red-400 transition-all duration-300 transform hover:scale-110"
                  style={{ 
                    fontFamily: 'Space Grotesk, sans-serif',
                    animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`
                  }}
                >
                  {item}
                </button>
              ))}
            </nav>

            {/* Mobile Live Indicator */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex items-center gap-2 text-white/60 text-sm tracking-wider">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
              <span>Mumbai • Live Studio</span>
            </div>
          </div>
        </div>
      )}
    </>
  );

  return (
    <div className="relative bg-black text-white overflow-hidden" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
      {/* Back Navigation */}
      <div className="fixed top-4 left-4 z-[60]">
        <Link
          to="/projects"
          onClick={(e) => {
            e.preventDefault();
            console.log('Back button clicked');
            window.location.href = '/projects';
          }}
          className="inline-flex items-center gap-1 text-white/40 hover:text-white/60 transition-colors text-sm bg-black/50 backdrop-blur-sm px-3 py-2 rounded-full border border-white/10"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Projects
        </Link>
      </div>
      
      {/* Navbar */}
      <Navbar />
      
      {/* Background Texture Overlay */}
      <div 
        ref={textureRef}
        className="fixed inset-0 opacity-10 pointer-events-none z-10"
        style={{
          backgroundImage: `url(${textureOverlay})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'repeat'
        }}
      />

      {/* Floating Music Player */}
      <div className="fixed bottom-8 right-8 z-50 bg-black/80 backdrop-blur-xl border border-red-900/30 rounded-2xl p-6 w-80 shadow-2xl">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="w-16 h-16 bg-gradient-to-br from-red-600 to-red-900 rounded-lg flex items-center justify-center">
              <FaMusic className="text-white text-xl" />
            </div>
            {isPlaying && (
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-600 rounded-full animate-pulse" />
            )}
          </div>
          <div className="flex-1">
            <p className="text-xs text-red-400 uppercase tracking-wider mb-1">Now Playing</p>
            <p className="text-sm font-semibold text-white mb-1">Midnight Atmosphere</p>
            <p className="text-xs text-gray-400">Midnight Sound Studio</p>
          </div>
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center hover:bg-red-700 transition-colors"
          >
            {isPlaying ? <FaPause className="text-white" /> : <FaPlay className="text-white ml-1" />}
          </button>
        </div>
        <div className="mt-4">
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-400">0:00</span>
            <div className="flex-1 h-1 bg-gray-700 rounded-full overflow-hidden">
              <div className="h-full w-1/3 bg-gradient-to-r from-red-600 to-red-400 rounded-full" />
            </div>
            <span className="text-xs text-gray-400">3:24</span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div 
          ref={heroRef}
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url(${hero})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/80" />
        </div>
        
        <div className="relative z-20 text-center px-6 max-w-6xl mx-auto">
          <div className="mb-8">
            <p 
              ref={el => textRevealRef.current[0] = el}
              className="text-red-400 text-sm uppercase tracking-[0.3em] mb-6 font-light"
              style={{ fontFamily: 'Space Grotesk, sans-serif', letterSpacing: '0.3em' }}
            >
              THE SOUND OF MUMBAI
            </p>
            <h1 
              ref={el => textRevealRef.current[1] = el}
              className="text-6xl md:text-8xl lg:text-9xl font-black mb-8 leading-none"
              style={{ fontFamily: 'Playfair Display, serif', fontWeight: 900 }}
            >
              <span className="block">Midnight</span>
              <span className="block text-red-600">Sound Studio</span>
            </h1>
            <p 
              ref={el => textRevealRef.current[2] = el}
              className="text-xl md:text-2xl lg:text-3xl text-gray-200 mb-12 font-light tracking-wide"
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              Where Artists Become Icons
            </p>
          </div>
          
          <div 
            ref={el => textRevealRef.current[3] = el}
            className="flex flex-col items-center gap-4"
          >
            <p className="text-sm text-gray-400 uppercase tracking-widest">Scroll to Explore</p>
            <div className="animate-bounce">
              <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* Editorial Text Block 1 */}
      <section className="relative py-16 px-6 md:px-12 lg:px-20">
        <div className="max-w-4xl mx-auto text-center">
          <p 
            ref={el => quoteRef.current[0] = el}
            className="text-2xl md:text-3xl lg:text-4xl text-gray-300 leading-relaxed mb-8 italic"
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            "The night hums softly outside.
            <br />Inside the studio, a single note becomes a universe."
          </p>
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-red-600 to-transparent mx-auto" />
        </div>
      </section>

      {/* Recording Session Section */}
      <section id="studio" className="relative py-20 px-6 md:px-12 lg:px-20">
        <div className="max-w-7xl mx-auto">
          {/* Section Label */}
          <div className="mb-12 text-center">
            <p className="text-red-400 text-sm uppercase tracking-widest mb-2">Studio Session 01</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div 
              ref={el => cardsRef.current[0] = el}
              className="group relative overflow-hidden rounded-2xl shadow-2xl"
            >
              <img 
                src={studioSession} 
                alt="Recording Session"
                className="w-full h-auto transform transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-red-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute bottom-4 left-4">
                <p className="text-white text-xs uppercase tracking-widest">Live Recording</p>
              </div>
            </div>
            
            <div ref={el => cardsRef.current[1] = el} className="space-y-8">
              <h2 
                className="text-4xl md:text-5xl lg:text-6xl font-black leading-none"
                style={{ fontFamily: 'Playfair Display, serif' }}
              >
                RECORDED IN
                <span className="block text-red-600">SHADOWS.</span>
              </h2>
              
              <div className="space-y-6">
                <p className="text-lg text-gray-300 leading-relaxed">
                  Step into our world-class recording environment where every note matters. 
                  Our studio combines cutting-edge technology with the soul of Mumbai's vibrant music scene.
                </p>
                <p className="text-lg text-gray-300 leading-relaxed">
                  From intimate vocal recordings to full orchestra sessions, we provide the perfect 
                  acoustic environment for your artistic vision to flourish.
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-6 pt-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-red-600/20 rounded-lg flex items-center justify-center">
                    <FaMicrophone className="text-red-600 text-xl" />
                  </div>
                  <div>
                    <p className="text-white font-semibold">Professional Mics</p>
                    <p className="text-gray-400 text-sm">Industry standard</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-red-600/20 rounded-lg flex items-center justify-center">
                    <FaVolumeUp className="text-red-600 text-xl" />
                  </div>
                  <div>
                    <p className="text-white font-semibold">Premium Acoustics</p>
                    <p className="text-gray-400 text-sm">Perfect sound</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Equipment Showcase */}
      <section className="relative py-20 px-6 md:px-12 lg:px-20 bg-gradient-to-b from-black to-gray-900">
        {/* Vertical Typography */}
        <div 
          ref={verticalTextRef}
          className="absolute left-6 md:left-12 top-1/2 -translate-y-1/2 text-red-600 text-2xl md:text-3xl font-black writing-mode-vertical hidden lg:block"
          style={{ 
            fontFamily: 'Playfair Display, serif',
            writingMode: 'vertical-rl',
            textOrientation: 'mixed'
          }}
        >
          ANALOG EQUIPMENT
        </div>
        
        <div className="max-w-7xl mx-auto text-center">
          <div className="mb-16">
            <p className="text-red-400 text-sm uppercase tracking-widest mb-4">Mastered in Light</p>
            <h2 
              ref={el => textRevealRef.current[4] = el}
              className="text-4xl md:text-5xl lg:text-6xl font-black leading-none mb-8"
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              STATE OF THE ART
              <span className="block text-red-600">EQUIPMENT</span>
            </h2>
          </div>
          
          <div 
            ref={el => cardsRef.current[2] = el}
            className="relative mb-20 overflow-hidden rounded-2xl shadow-2xl"
          >
            <img 
              src={mixingConsole} 
              alt="Mixing Console"
              className="w-full h-auto"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <p className="text-white text-xs uppercase tracking-widest mb-2">Analog Mixing Console</p>
              <p className="text-gray-300 text-sm">72-channel SSL Duality</p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: FaCompactDisc, title: "Analog Mixing", desc: "Vintage warmth", label: "Analog Equipment" },
              { icon: FaMusic, title: "Digital Production", desc: "Modern precision", label: "Digital Suite" },
              { icon: FaWaveSquare, title: "Mastering", desc: "Perfect polish", label: "Mastering Room" },
              { icon: FaVolumeUp, title: "Dolby Atmos", desc: "3D audio", label: "Immersive Sound" }
            ].map((item, index) => (
              <div 
                key={index}
                ref={el => cardsRef.current[3 + index] = el}
                className="group relative bg-gray-800/50 backdrop-blur-sm border border-red-900/20 rounded-2xl p-8 hover:bg-red-900/20 transition-all duration-300 hover:scale-105"
              >
                <div className="absolute top-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <p className="text-red-400 text-xs uppercase tracking-widest">{item.label}</p>
                </div>
                <item.icon className="text-red-600 text-3xl mb-6 mx-auto" />
                <h3 className="text-lg font-semibold text-white mb-3">{item.title}</h3>
                <p className="text-sm text-gray-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Editorial Text Block 2 */}
      <section className="relative py-16 px-6 md:px-12 lg:px-20">
        <div className="max-w-4xl mx-auto text-center">
          <p 
            ref={el => quoteRef.current[1] = el}
            className="text-2xl md:text-3xl lg:text-4xl text-gray-300 leading-relaxed mb-8 italic"
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            "Mumbai never sleeps.
            <br />Neither do the sounds waiting to be recorded."
          </p>
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-red-600 to-transparent mx-auto" />
        </div>
      </section>

      {/* Vocal Booth Section */}
      <section 
        ref={mouseTrackRef}
        className="relative py-20 px-6 md:px-12 lg:px-20"
      >
        <div className="max-w-7xl mx-auto">
          {/* Section Label */}
          <div className="mb-12 text-center">
            <p className="text-red-400 text-sm uppercase tracking-widest mb-2">Vocal Room</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div 
              ref={el => cardsRef.current[7] = el}
              className="relative overflow-hidden rounded-2xl shadow-2xl"
              style={{
                transform: `translate(${mousePos.x * 0.02}px, ${mousePos.y * 0.02}px)`
              }}
            >
              <img 
                src={vocalBooth} 
                alt="Vocal Booth"
                className="w-full h-auto"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-red-900/40 to-transparent" />
              
              {/* Floating UI Elements */}
              <div className="absolute top-1/4 left-1/4 bg-black/80 backdrop-blur-xl rounded-xl p-6 border border-red-600/50 shadow-2xl">
                <FaMicrophone className="text-red-600 text-3xl mb-3" />
                <p className="text-sm text-white font-semibold">Neumann U87</p>
                <p className="text-xs text-gray-400">Premium Condenser</p>
              </div>
              
              <div className="absolute bottom-1/4 right-1/4 bg-black/80 backdrop-blur-xl rounded-xl p-6 border border-red-600/50 shadow-2xl">
                <div className="text-center">
                  <p className="text-red-600 font-mono text-2xl mb-3">{formatTime(recordingTime)}</p>
                  <button
                    onClick={() => setIsRecording(!isRecording)}
                    className={`px-6 py-3 rounded-full text-sm font-semibold transition-all ${
                      isRecording 
                        ? 'bg-red-600 text-white animate-pulse shadow-lg shadow-red-600/50' 
                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    }`}
                  >
                    {isRecording ? 'Recording' : 'Start Session'}
                  </button>
                </div>
              </div>
              
              {/* Enhanced Waveform Animation */}
              <div className="absolute bottom-8 left-8 right-8 flex items-center gap-1">
                {[...Array(20)].map((_, i) => (
                  <div
                    key={i}
                    className="wave-bar flex-1 bg-gradient-to-t from-red-600 to-red-400 rounded-full"
                    style={{
                      '--wave-height': `${Math.random() * 40 + 15}px`,
                      '--wave-duration': `${1 + Math.random() * 0.5}s`,
                      '--wave-delay': `${i * 0.1}s`
                    }}
                  />
                ))}
              </div>
            </div>
            
            <div ref={el => cardsRef.current[8] = el} className="space-y-8">
              <h2 
                className="text-4xl md:text-5xl lg:text-6xl font-black leading-none"
                style={{ fontFamily: 'Playfair Display, serif' }}
              >
                VOCAL
                <span className="block text-red-600">EXCELLENCE</span>
              </h2>
              
              <div className="space-y-6">
                <p className="text-lg text-gray-300 leading-relaxed">
                  Our vocal booth is engineered for perfection. With soundproofing that rivals 
                  the world's best studios, we capture every nuance of your performance.
                </p>
                <p className="text-lg text-gray-300 leading-relaxed">
                  The neon-lit atmosphere inspires creativity while our professional engineers 
                  ensure your vocals shine with pristine clarity.
                </p>
              </div>
              
              <div className="bg-red-600/10 border border-red-600/20 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <HiOutlineSparkles className="text-red-600 text-2xl" />
                  <p className="text-white font-semibold">Midnight Recording</p>
                </div>
                <p className="text-gray-300 text-sm">Book after hours for that magical late-night creative energy.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Artist Story Section */}
      <section id="artists" className="relative py-20 px-6 md:px-12 lg:px-20">
        <div 
          ref={parallaxRef}
          className="relative h-96 md:h-[600px] overflow-hidden rounded-2xl shadow-2xl"
        >
          <img 
            src={artistSilhouette} 
            alt="Artist Recording"
            className="w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
          
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center max-w-5xl px-6">
              <h2 
                ref={el => textRevealRef.current[5] = el}
                className="text-5xl md:text-7xl lg:text-8xl font-black leading-tight mb-12"
                style={{ fontFamily: 'Playfair Display, serif' }}
              >
                EVERY TRACK
                <span className="block text-red-600">HAS A STORY</span>
              </h2>
              <p 
                ref={el => textRevealRef.current[6] = el}
                className="text-xl md:text-2xl lg:text-3xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
                style={{ fontFamily: 'Space Grotesk, sans-serif' }}
              >
                From silence to symphony.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="relative py-20 px-6 md:px-12 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-red-400 text-sm uppercase tracking-widest mb-4">Studio Services</p>
            <h2 
              className="text-4xl md:text-5xl lg:text-6xl font-black leading-none mb-8"
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              WHAT WE
              <span className="block text-red-600">OFFER</span>
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Recording",
                desc: "Full-scale multi-track recording with vintage analog warmth and digital precision.",
                features: ["24-track recording", "Live sessions", "Overdubs"]
              },
              {
                title: "Mixing",
                desc: "Artistic mixing that brings your vision to life with clarity and impact.",
                features: ["Analog mixing", "Digital editing", "Stem mastering"]
              },
              {
                title: "Mastering",
                desc: "Final polish for commercial release across all platforms and formats.",
                features: ["Loudness optimization", "Format conversion", "Quality control"]
              },
              {
                title: "Music Production",
                desc: "Complete production services from concept to final mastered track.",
                features: ["Beat making", "Arrangement", "Sound design"]
              },
              {
                title: "Podcast Recording",
                desc: "Professional podcast setup with remote recording capabilities.",
                features: ["Multi-host setup", "Remote guests", "Post-production"]
              },
              {
                title: "Voice Over",
                desc: "Commercial voice-over recording with broadcast-quality results.",
                features: ["Commercial VO", "Audiobooks", "Character voices"]
              }
            ].map((service, index) => (
              <div 
                key={index}
                ref={el => cardsRef.current[9 + index] = el}
                className="group bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-8 hover:bg-red-900/20 hover:border-red-900/30 transition-all duration-300 hover:scale-105"
              >
                <h3 className="text-xl font-bold text-white mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
                  {service.title}
                </h3>
                <p className="text-gray-300 mb-6 leading-relaxed">{service.desc}</p>
                <ul className="space-y-2">
                  {service.features.map((feature, i) => (
                    <li key={i} className="text-sm text-gray-400 flex items-center gap-2">
                      <div className="w-1 h-1 bg-red-600 rounded-full" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mumbai Atmosphere Section */}
      <section className="relative py-20 px-6 md:px-12 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <div className="relative h-64 md:h-96 overflow-hidden rounded-2xl shadow-2xl">
            <img 
              src={mumbaiNight} 
              alt="Mumbai Night Studio"
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/40 to-black/80" />
            
            <div className="absolute bottom-8 left-8 right-8">
              <div className="flex items-center gap-3 text-white mb-4">
                <div className="w-2 h-2 bg-red-600 rounded-full animate-pulse" />
                <span className="text-sm font-medium uppercase tracking-widest">Mumbai, India</span>
              </div>
              <h3 
                className="text-3xl md:text-4xl font-black leading-none mb-4"
                style={{ fontFamily: 'Playfair Display, serif' }}
              >
                The Heart of
                <span className="block text-red-600">Bollywood Sound</span>
              </h3>
              <p className="text-gray-300 text-sm max-w-md">
                Located in the creative pulse of Mumbai, where legends are made and sound comes alive.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Artist CTA Section */}
      <section id="book" className="relative py-20 px-6 md:px-12 lg:px-20">
        <div className="max-w-4xl mx-auto text-center">
          <div 
            ref={el => quoteRef.current[2] = el}
            className="mb-12"
          >
            <p className="text-2xl md:text-3xl lg:text-4xl text-gray-300 leading-relaxed italic mb-8"
               style={{ fontFamily: 'Playfair Display, serif' }}
            >
              "Behind every track is a moment —
              <br />a breath before the beat drops."
            </p>
            <div className="w-24 h-px bg-gradient-to-r from-transparent via-red-600 to-transparent mx-auto" />
          </div>
          
          <div className="bg-gradient-to-br from-red-900/20 to-red-600/10 backdrop-blur-sm border border-red-900/30 rounded-3xl p-12">
            <h2 
              className="text-3xl md:text-4xl lg:text-5xl font-black leading-none mb-6"
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              Ready to Record
              <span className="block text-red-600">Your Next Track?</span>
            </h2>
            <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
              Professional sound.
              <br className="hidden sm:block" />
              Midnight creativity.
            </p>
            <button className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-red-600/50">
              Book Studio Session
            </button>
          </div>
        </div>
      </section>

      {/* Contact / Location Section */}
      <section id="contact" className="relative py-20 px-6 md:px-12 lg:px-20 border-t border-gray-800">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 
                className="text-2xl md:text-3xl font-black leading-none mb-6"
                style={{ fontFamily: 'Playfair Display, serif' }}
              >
                Located in the
                <span className="block text-red-600">Heart of Mumbai</span>
              </h3>
              <p className="text-gray-300 leading-relaxed mb-8">
                Our studio sits in the creative pulse of Mumbai, where artists, producers, and storytellers bring their sound to life.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <FaClock className="text-red-600 text-xl" />
                  <div>
                    <p className="text-white font-semibold">Studio Hours</p>
                    <p className="text-gray-400 text-sm">Mon-Sat: 10AM - 2AM | Sun: 12PM - 10PM</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <FaEnvelope className="text-red-600 text-xl" />
                  <div>
                    <p className="text-white font-semibold">Booking Email</p>
                    <p className="text-gray-400 text-sm">studio@midnightsound.in</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <FaPhone className="text-red-600 text-xl" />
                  <div>
                    <p className="text-white font-semibold">Phone</p>
                    <p className="text-gray-400 text-sm">+91 22 1234 5678</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-8">
              <h4 
                className="text-xl font-bold text-white mb-6"
                style={{ fontFamily: 'Playfair Display, serif' }}
              >
                Studio Features
              </h4>
              <div className="grid grid-cols-2 gap-4">
                {[
                  "72-Channel SSL Console",
                  "Live Room Capacity: 30",
                  "Vocal Booth",
                  "Lounge Area",
                  "Equipment Rental",
                  "Engineer Available"
                ].map((feature, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-red-600 rounded-full" />
                    <span className="text-gray-300 text-sm">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
