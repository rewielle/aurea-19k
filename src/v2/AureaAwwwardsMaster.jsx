import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { ArrowRight, Compass, ChevronRight, CheckCircle2, Layers, Sun, Eye, Waves, Volume2, VolumeX } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import PrivatePresentationModal from '../components/PrivatePresentationModal';

gsap.registerPlugin(ScrollTrigger);

// Animated Numeric Counter
function AnimatedCounter({ end, suffix = "", duration = 2.0 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10% 0px" });

  useEffect(() => {
    if (!isInView) return;
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / (duration * 1000), 1);
      const easeOutQuad = 1 - (1 - progress) * (1 - progress);
      setCount(Math.floor(easeOutQuad * end));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        setCount(end);
      }
    };
    window.requestAnimationFrame(step);
  }, [isInView, end, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
}

// Kinetic Stagger Text (Word-by-word masked reveal)
function MaskedKineticTitle({ text, className = "", delay = 0 }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-15% 0px" });
  const words = text.split(" ");

  return (
    <h2 ref={ref} className={`overflow-hidden flex flex-wrap gap-x-[0.3em] gap-y-1 ${className}`}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden pb-1">
          <motion.span
            className="inline-block"
            initial={{ y: "110%", opacity: 0 }}
            animate={isInView ? { y: "0%", opacity: 1 } : { y: "110%", opacity: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: delay + i * 0.08 }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </h2>
  );
}

export default function AureaAwwwardsMaster() {
  const [modalOpen, setModalOpen] = useState(false);
  const heroVideoRef = useRef(null);

  // Custom Gold Ring Cursor & Contextual Text
  const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 });
  const [cursorHovered, setCursorHovered] = useState(false);
  const [cursorLabel, setCursorLabel] = useState("");

  // Atmospheric Soundscape Web Audio API Toggle
  const [audioActive, setAudioActive] = useState(false);
  const audioCtxRef = useRef(null);
  const noiseNodeRef = useRef(null);

  // Hero Timed Reveal
  const [heroHeadline, setHeroHeadline] = useState(false);
  const [heroSupporting, setHeroSupporting] = useState(false);
  const [heroCTA, setHeroCTA] = useState(false);

  // AUTOMATED SCROLL PROGRESS
  const [solarProgress, setSolarProgress] = useState(0);
  const [explodedIndex, setExplodedIndex] = useState(0);
  const [spatialProgress, setSpatialProgress] = useState(0);
  const [perspectiveIndex, setPerspectiveIndex] = useState(1);
  const [materialProgress, setMaterialProgress] = useState(0);
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Container Refs
  const conceptRef = useRef(null);
  const explodedRef = useRef(null);
  const spatialRef = useRef(null);
  const perspectiveRef = useRef(null);
  const materialsRef = useRef(null);

  // Track Mouse Position
  useEffect(() => {
    const handleMouseMove = (e) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Web Audio Ocean Soundscape Synthesizer
  const toggleAtmosphericAudio = () => {
    if (audioActive) {
      if (audioCtxRef.current) {
        audioCtxRef.current.suspend();
      }
      setAudioActive(false);
    } else {
      if (!audioCtxRef.current) {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        const ctx = new AudioContext();
        audioCtxRef.current = ctx;

        // Create pink noise filter for calm ocean breeze
        const bufferSize = ctx.sampleRate * 2;
        const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const output = noiseBuffer.getChannelData(0);
        let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
        for (let i = 0; i < bufferSize; i++) {
          const white = Math.random() * 2 - 1;
          b0 = 0.99886 * b0 + white * 0.0555179;
          b1 = 0.99332 * b1 + white * 0.0750759;
          b2 = 0.96900 * b2 + white * 0.1538520;
          b3 = 0.86650 * b3 + white * 0.3104856;
          b4 = 0.55000 * b4 + white * 0.5329522;
          b5 = -0.7616 * b5 - white * 0.0168980;
          output[i] = b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362;
          output[i] *= 0.012; // Gentle low volume
          b6 = white * 0.115926;
        }

        const whiteNoise = ctx.createBufferSource();
        whiteNoise.buffer = noiseBuffer;
        whiteNoise.loop = true;

        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.value = 320;

        const gainNode = ctx.createGain();
        gainNode.gain.value = 0.15;

        whiteNoise.connect(filter);
        filter.connect(gainNode);
        gainNode.connect(ctx.destination);

        whiteNoise.start();
        noiseNodeRef.current = whiteNoise;
      } else {
        audioCtxRef.current.resume();
      }
      setAudioActive(true);
    }
  };

  // Helper for setting cursor state
  const handleCursor = (hovered, label = "") => {
    setCursorHovered(hovered);
    setCursorLabel(label);
  };

  // Hero Video Sync
  useEffect(() => {
    const video = heroVideoRef.current;
    if (!video) return;

    const onTimeUpdate = () => {
      const t = video.currentTime;
      if (t >= 1.2 && !heroHeadline) setHeroHeadline(true);
      if (t >= 3.5 && !heroSupporting) setHeroSupporting(true);
      if (t >= 7.0 && !heroCTA) setHeroCTA(true);
    };

    video.addEventListener('timeupdate', onTimeUpdate);
    return () => video.removeEventListener('timeupdate', onTimeUpdate);
  }, []);

  // GSAP Automated ScrollTrigger & Parallax Motion
  useEffect(() => {
    const ctx = gsap.context(() => {
      
      // Concept Solar Shadow Sweep
      ScrollTrigger.create({
        trigger: conceptRef.current,
        start: 'top center',
        end: 'bottom center',
        scrub: 0.5,
        onUpdate: (self) => setSolarProgress(self.progress),
      });

      // Exploded Architecture Pin & Layer Separation (Fluid)
      ScrollTrigger.create({
        trigger: explodedRef.current,
        start: 'top center',
        end: 'bottom center',
        scrub: 0.5,
        onUpdate: (self) => {
          const idx = Math.min(5, Math.floor(self.progress * 6));
          setExplodedIndex(idx);
        },
      });

      // Exterior -> Interior Spatial Crossing
      ScrollTrigger.create({
        trigger: spatialRef.current,
        start: 'top center',
        end: 'bottom center',
        scrub: 0.5,
        onUpdate: (self) => setSpatialProgress(self.progress),
      });

      // Altitude Perspective Elevator
      ScrollTrigger.create({
        trigger: perspectiveRef.current,
        start: 'top center',
        end: 'bottom center',
        scrub: 0.5,
        onUpdate: (self) => {
          const idx = Math.min(3, Math.floor(self.progress * 4));
          setPerspectiveIndex(idx);
        },
      });

      // Material Light Sweep
      ScrollTrigger.create({
        trigger: materialsRef.current,
        start: 'top center',
        end: 'bottom center',
        scrub: 0.5,
        onUpdate: (self) => setMaterialProgress(self.progress),
      });

      // Parallax Watermarks
      gsap.utils.toArray('.parallax-watermark').forEach((wm) => {
        gsap.to(wm, {
          y: -140,
          ease: 'none',
          scrollTrigger: {
            trigger: wm.parentElement,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        });
      });

    });

    return () => ctx.revert();
  }, []);

  const perspectiveData = [
    { label: "LEVEL 05", altitudeVal: 24, altitude: "24m Elevation", title: "COASTAL ELEVATION", desc: "Close proximity to ocean waterline, sea loggia and palm canopy.", image: "/assets/view_level_20.jpg" },
    { label: "LEVEL 20", altitudeVal: 68, altitude: "68m Elevation", title: "HORIZON RESIDENCE", desc: "Balanced ocean horizon line, coastline perspective and sky.", image: "/assets/aurea_view_level_20_1785870760958.jpg" },
    { label: "LEVEL 35", altitudeVal: 120, altitude: "120m Elevation", title: "SKY RESIDENCE", desc: "Elevated silence, infinite sea horizon and sky panorama.", image: "/assets/view_level_40.jpg" },
    { label: "PENTHOUSE", altitudeVal: 155, altitude: "155m Elevation", title: "AUREA HOUSE", desc: "Highest elevation, 360° open ocean exposure and private sky garden.", image: "/assets/building_golden.jpg" },
  ];

  const currentPerspective = perspectiveData[perspectiveIndex];

  return (
    <div className="min-h-screen bg-[#F8F5EF] text-[#302E2A] selection:bg-[#C39B68] selection:text-white font-sans overflow-x-hidden relative">
      
      {/* 1. TACTILE ANALOG FILM GRAIN OVERLAY (3% Opacity) */}
      <div
        className="fixed inset-0 pointer-events-none z-40 opacity-[0.035] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* 2. CUSTOM MAGNETIC GOLD RING CURSOR WITH CONTEXTUAL TEXT */}
      <motion.div
        className="fixed pointer-events-none z-50 rounded-full border border-[#D8A13D] mix-blend-difference hidden md:flex items-center justify-center text-[9px] font-mono tracking-widest text-[#D8A13D] uppercase font-bold text-center px-2"
        animate={{
          x: cursorPos.x - (cursorHovered ? 36 : 16),
          y: cursorPos.y - (cursorHovered ? 36 : 16),
          width: cursorHovered ? 72 : 32,
          height: cursorHovered ? 72 : 32,
          backgroundColor: cursorHovered ? 'rgba(216, 161, 61, 0.2)' : 'transparent',
        }}
        transition={{ type: 'spring', damping: 28, stiffness: 350, mass: 0.2 }}
      >
        {cursorHovered && cursorLabel && (
          <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            {cursorLabel}
          </motion.span>
        )}
      </motion.div>

      {/* ==================================================
          1. APPROVED HERO SECTION (Sunrise)
          ================================================== */}
      <section id="hero" className="relative w-full h-[100svh] min-h-[720px] bg-[#172A36] overflow-hidden flex flex-col justify-between">
        
        <video
          ref={heroVideoRef}
          autoPlay
          muted
          playsInline
          preload="auto"
          src="/assets/video_aurea_hero.mp4"
          className="absolute inset-0 w-full h-full object-cover object-[72%_center] pointer-events-none"
        />

        <div className="absolute inset-y-0 left-0 w-full sm:w-7/12 bg-gradient-to-r from-[#172A36]/92 via-[#172A36]/45 to-transparent pointer-events-none" />

        {/* Minimal Unclipped Header */}
        <header className="relative z-20 max-w-7xl mx-auto px-8 sm:px-16 w-full pt-10 flex items-center justify-between text-[#F8F5EF] overflow-visible">
          
          {/* Logo / Wordmark */}
          <div
            onMouseEnter={() => handleCursor(true, "AUREA")}
            onMouseLeave={() => handleCursor(false)}
            className="relative cursor-pointer overflow-visible py-2 px-1 whitespace-nowrap shrink-0"
          >
            <span className="font-display text-3xl sm:text-4xl tracking-[0.45em] uppercase font-light text-white whitespace-nowrap inline-block">
              A U R E A
            </span>
            <div className="absolute bottom-1 left-1 right-2 h-[1.5px] bg-[#D8A13D] opacity-90 pointer-events-none" />
          </div>

          <nav className="hidden md:flex items-center gap-10 text-xs sm:text-sm font-mono tracking-[0.25em] uppercase text-[#F8F5EF]/90">
            <a href="#concept" className="hover:text-[#D8A13D] transition-colors">Architecture</a>
            <a href="#exploded" className="hover:text-[#D8A13D] transition-colors">Exploded</a>
            <a href="#spatial" className="hover:text-[#D8A13D] transition-colors">Spatial</a>
            <a href="#perspective" className="hover:text-[#D8A13D] transition-colors">Perspective</a>
            <a href="#residences" className="hover:text-[#D8A13D] transition-colors">Residences</a>
          </nav>

          <div className="flex items-center gap-6">
            {/* 3. Atmospheric Audio Soundscape Toggle Button */}
            <button
              onClick={toggleAtmosphericAudio}
              onMouseEnter={() => handleCursor(true, audioActive ? "MUTE" : "AUDIO")}
              onMouseLeave={() => handleCursor(false)}
              className="flex items-center gap-2 text-xs font-mono tracking-widest text-[#F8F5EF]/80 hover:text-[#D8A13D] transition-colors"
            >
              {audioActive ? <Volume2 className="w-4 h-4 text-[#D8A13D] animate-pulse" /> : <VolumeX className="w-4 h-4 text-white/50" />}
              <span className="hidden lg:inline">{audioActive ? "SOUND ON" : "ATMOSPHERE"}</span>
            </button>

            <button
              onClick={() => setModalOpen(true)}
              onMouseEnter={() => handleCursor(true, "INQUIRE")}
              onMouseLeave={() => handleCursor(false)}
              className="hidden sm:inline-flex items-center gap-3 text-xs sm:text-sm font-mono tracking-[0.25em] uppercase text-[#F8F5EF] border-b border-white/40 pb-1 hover:border-[#D8A13D] hover:text-[#D8A13D] transition-all"
            >
              <span>Private Presentation</span>
              <ArrowRight className="w-4 h-4 text-[#D8A13D]" />
            </button>
          </div>
        </header>

        {/* Choreographed Timed Typography */}
        <div className="relative z-20 max-w-7xl mx-auto px-8 sm:px-16 w-full my-auto flex flex-col justify-center">
          <div className="max-w-xl space-y-6">
            <AnimatePresence>
              {heroHeadline && (
                <motion.div
                  initial={{ opacity: 0, y: 28, filter: 'blur(2px)', clipPath: 'inset(0 0 100% 0)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)', clipPath: 'inset(0 0 0% 0)' }}
                  transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
                >
                  <span className="text-xs font-mono tracking-[0.4em] uppercase text-[#D8A13D] block mb-3 font-semibold">
                    ARCHITECTURE SHAPED BY LIGHT
                  </span>
                  <h1 className="font-display text-5xl sm:text-7xl md:text-[6.8rem] leading-[0.92] tracking-[-0.035em] text-[#F8F5EF] font-light">
                    Designed around <br />
                    the horizon.
                  </h1>
                </motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence>
              {heroSupporting && (
                <motion.p
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7 }}
                  className="text-base sm:text-lg text-[#F8F5EF]/95 font-light leading-relaxed max-w-[420px]"
                >
                  Architecture shaped by light, sea and perspective. A living residential landmark born from the ocean horizon.
                </motion.p>
              )}
            </AnimatePresence>

            <AnimatePresence>
              {heroCTA && (
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="pt-3"
                >
                  <a
                    href="#concept"
                    onMouseEnter={() => handleCursor(true, "EXPLORE")}
                    onMouseLeave={() => handleCursor(false)}
                    className="inline-flex items-center gap-4 text-xs sm:text-sm font-mono tracking-[0.3em] uppercase text-[#F8F5EF] border-b border-[#D8A13D] pb-1 hover:text-[#D8A13D] transition-colors group"
                  >
                    <span>EXPLORE AUREA</span>
                    <ArrowRight className="w-4.5 h-4.5 text-[#D8A13D] transition-transform group-hover:translate-x-1.5" />
                  </a>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Hero Footer Status Bar */}
        <div className="relative z-20 max-w-7xl mx-auto px-8 sm:px-16 w-full pb-8 border-t border-white/15 pt-4 flex items-center justify-between font-mono text-xs text-[#F8F5EF]/80">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-[#D8A13D] shadow-[0_0_10px_#D8A13D] animate-pulse" />
            <span className="text-[#D8A13D] font-semibold">PACIFIC OCEAN FRONT · <AnimatedCounter end={40} suffix=" RESIDENTIAL LEVELS" /></span>
          </div>
          <span className="text-[10px] tracking-widest uppercase text-white/60">AUREA ARCHITECTURAL LANDMARK</span>
        </div>
      </section>

      {/* ==================================================
          2. SCENE 01: ARCHITECTURE SHAPED BY LIGHT
          ================================================== */}
      <section ref={conceptRef} id="concept" className="relative min-h-[100svh] py-24 bg-[#F8F5EF] text-[#302E2A] flex flex-col justify-center border-t border-[#C39B68]/20 overflow-hidden">
        
        {/* Parallax Watermark 01 */}
        <span className="parallax-watermark absolute right-4 top-12 font-display text-[16rem] sm:text-[24rem] leading-none text-[#C39B68]/10 pointer-events-none select-none">
          01
        </span>

        <div className="max-w-7xl mx-auto px-8 sm:px-16 w-full relative z-10">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs font-mono tracking-[0.4em] uppercase text-[#C39B68] block font-semibold">
                THE CONCEPT
              </span>

              <MaskedKineticTitle
                text="Architecture shaped by light."
                className="font-display text-6xl sm:text-7xl md:text-[5.5rem] leading-[0.93] tracking-[-0.03em] text-[#302E2A]"
              />

              <p className="text-base sm:text-xl text-[#302E2A]/85 font-light leading-relaxed max-w-[420px]">
                AUREA was conceived as a dialogue between sunlight, material and horizon. Every curved loggia balcony, glass pane and stone pier responds to the rhythm of daylight.
              </p>

              <div className="pt-2 flex items-center gap-6 font-mono text-xs text-[#9A7552]">
                <span className="flex items-center gap-2">
                  <Compass className="w-4 h-4 text-[#D8A13D]" /> Atlantic Coastal Headland
                </span>
                <span className="flex items-center gap-2">
                  <ChevronRight className="w-4 h-4 text-[#D8A13D]" /> Uninterrupted Horizon
                </span>
              </div>
            </div>

            <div
              onMouseEnter={() => handleCursor(true, "SUNLIGHT")}
              onMouseLeave={() => handleCursor(false)}
              className="lg:col-span-6 relative h-[540px] sm:h-[660px] rounded-3xl overflow-hidden shadow-2xl border border-[#C39B68]/30 bg-[#263B47]"
            >
              <div
                className="absolute inset-0 bg-cover bg-center transition-all duration-300"
                style={{
                  backgroundImage: `url('/assets/building_sunrise.jpg')`,
                  filter: `contrast(${100 + (solarProgress - 0.5) * 25}%) brightness(${90 + (solarProgress - 0.5) * 15}%)`,
                }}
              />

              <div
                className="absolute inset-0 pointer-events-none transition-all duration-200"
                style={{
                  background: `radial-gradient(circle at ${25 + solarProgress * 50}% 30%, rgba(216, 161, 61, 0.4) 0%, transparent 60%)`,
                }}
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[#302E2A]/80 via-transparent to-transparent pointer-events-none" />

              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-black/65 backdrop-blur-md text-[#F8F5EF] font-mono text-xs flex justify-between items-center">
                <span className="text-[#D8A13D] font-bold">SOLAR FAÇADE TRAJECTORY</span>
                <span>MORNING TO SUNSET LIGHT</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ==================================================
          3. SCENE 02: SCULPTURAL EXPLODED STRUCTURE
          ================================================== */}
      <section ref={explodedRef} id="exploded" className="relative min-h-[100svh] py-24 bg-[#F2ECE2] text-[#302E2A] flex flex-col justify-between border-t border-[#C39B68]/20 overflow-hidden">
        
        <span className="parallax-watermark absolute left-8 top-8 font-display text-[16rem] sm:text-[24rem] leading-none text-[#C39B68]/10 pointer-events-none select-none">
          02
        </span>

        <div className="max-w-7xl mx-auto px-8 sm:px-16 w-full relative z-10">
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-6">
            <div>
              <span className="text-xs font-mono tracking-[0.4em] uppercase text-[#C39B68] block mb-3 font-semibold">
                SCULPTURAL EXPLODED STRUCTURE
              </span>
              <MaskedKineticTitle
                text="Every level, a new perspective."
                className="font-display text-5xl sm:text-7xl leading-[0.94] text-[#302E2A]"
              />
            </div>
            <span className="font-mono text-xs text-[#D8A13D] font-bold uppercase">SCROLL TO INSPECT ARCHITECTURAL ZONES</span>
          </div>

          <div
            onMouseEnter={() => handleCursor(true, "LAYERS")}
            onMouseLeave={() => handleCursor(false)}
            className="relative h-[560px] sm:h-[680px] rounded-3xl overflow-hidden shadow-2xl border border-[#C39B68]/30 bg-[#263B47] flex items-center justify-center p-8"
          >
            <div
              className="absolute inset-0 bg-cover bg-center transition-all duration-700 opacity-90"
              style={{
                backgroundImage: `url('/assets/exploded_full.jpg')`,
                transform: `scale(${1.0 + (explodedIndex / 5) * 0.04})`,
              }}
            />

            <div className="absolute inset-0 bg-gradient-to-t from-[#302E2A]/85 via-transparent to-transparent pointer-events-none" />

            <div className="relative z-10 w-full max-w-xl h-full flex flex-col justify-between py-6">
              {[
                { zone: "ROOFTOP & SKY POOL", lvl: "LEVEL 40", desc: "Infinity Sky Pool & Observatory Terrace" },
                { zone: "THE AUREA HOUSE", lvl: "LEVEL 36–39", desc: "Four-level Penthouse Estate with Private Sky Garden" },
                { zone: "SKY RESIDENCES", lvl: "LEVEL 25–35", desc: "Elevated Panoramic Suites & Private Wine Storage" },
                { zone: "HORIZON RESIDENCES", lvl: "LEVEL 06–24", desc: "Panoramic 3 & 4-Bedroom Oceanfront Loggias" },
                { zone: "WELLNESS PAVILION", lvl: "LEVEL 03–05", desc: "Thermal Spa, Hydrotherapy Pool & Fitness Sanctuary" },
                { zone: "ARRIVAL & LOBBY", lvl: "GROUND LEVEL", desc: "Travertine Portico, 9m Ceiling Lounge & Valet" },
              ].map((layer, idx) => (
                <div
                  key={idx}
                  className={`p-4 rounded-xl border transition-all duration-500 ${
                    explodedIndex === idx
                      ? 'bg-[#F8F5EF] text-[#302E2A] border-[#D8A13D] shadow-2xl scale-105 opacity-100'
                      : 'bg-black/45 text-[#F8F5EF] border-white/10 opacity-50'
                  }`}
                >
                  <div className="flex items-center justify-between font-mono text-xs">
                    <span className="text-[#D8A13D] font-bold">{layer.lvl}</span>
                    <span className="text-inherit font-display text-base">{layer.zone}</span>
                  </div>
                </div>
              ))}
            </div>

          </div>

        </div>
      </section>

      {/* ==================================================
          4. SCENE 03: CONTINUOUS SPATIAL FAÇADE CROSSING
          ================================================== */}
      <section ref={spatialRef} id="spatial" className="relative min-h-[100svh] py-24 bg-[#D4C2AD]/20 text-[#302E2A] flex flex-col justify-center border-t border-[#C39B68]/20 overflow-hidden">
        
        <span className="parallax-watermark absolute right-8 top-12 font-display text-[16rem] sm:text-[24rem] leading-none text-[#C39B68]/10 pointer-events-none select-none">
          03
        </span>

        <div className="max-w-7xl mx-auto px-8 sm:px-16 w-full relative z-10">
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-6">
            <div>
              <span className="text-xs font-mono tracking-[0.4em] uppercase text-[#C39B68] block mb-3 font-semibold">
                SPATIAL FAÇADE PASSAGE
              </span>
              <MaskedKineticTitle
                text="The horizon begins inside."
                className="font-display text-5xl sm:text-7xl leading-[0.94] text-[#302E2A]"
              />
            </div>
            <span className="font-mono text-xs text-[#D8A13D] font-bold">SPATIAL GLASS CROSSING</span>
          </div>

          <div
            onMouseEnter={() => handleCursor(true, "INSIDE")}
            onMouseLeave={() => handleCursor(false)}
            className="relative h-[540px] sm:h-[660px] rounded-3xl overflow-hidden shadow-2xl border border-[#C39B68]/30 bg-[#263B47]"
          >
            <div
              className="absolute inset-0 bg-cover bg-center transition-all duration-300"
              style={{
                backgroundImage: `url('/assets/balcony_glass.jpg')`,
                opacity: 1 - spatialProgress,
                transform: `scale(${1.05 - spatialProgress * 0.05})`,
              }}
            />

            <div
              className="absolute inset-0 bg-cover bg-center transition-all duration-300"
              style={{
                backgroundImage: `url('/assets/interior_living.jpg')`,
                opacity: spatialProgress,
                transform: `scale(${1.0 + spatialProgress * 0.05})`,
              }}
            />

            <div className="absolute inset-0 bg-gradient-to-t from-[#302E2A]/85 via-transparent to-transparent pointer-events-none" />

            <div className="absolute bottom-8 left-8 right-8 p-6 rounded-2xl bg-black/65 backdrop-blur-md border border-white/20 text-[#F8F5EF] flex items-center justify-between font-mono text-xs">
              <div>
                <span className="text-[#D8A13D] font-bold block text-[10px] uppercase">SPATIAL FAÇADE MORPH</span>
                <span className="text-white text-base font-display">
                  {spatialProgress < 0.4 ? 'Loggia Glass Balcony' : spatialProgress > 0.7 ? 'Panoramic Ocean Suite Interior' : 'Crossing Balcony Glass Pane'}
                </span>
              </div>
              <span className="text-white/80">GOLDEN HOUR ALIGNMENT</span>
            </div>
          </div>

        </div>
      </section>

      {/* ==================================================
          5. SCENE 04: ALTITUDE ELEVATOR PERSPECTIVE
          ================================================== */}
      <section ref={perspectiveRef} id="perspective" className="relative min-h-[100svh] py-24 bg-[#BCD0D8]/20 text-[#302E2A] flex flex-col justify-center border-t border-[#C39B68]/20 overflow-hidden">
        
        <span className="parallax-watermark absolute left-8 top-8 font-display text-[16rem] sm:text-[24rem] leading-none text-[#C39B68]/10 pointer-events-none select-none">
          04
        </span>

        <div className="max-w-7xl mx-auto px-8 sm:px-16 w-full relative z-10">
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-6">
            <div>
              <span className="text-xs font-mono tracking-[0.4em] uppercase text-[#C39B68] block mb-3 font-semibold">
                ALTITUDE ELEVATOR PERSPECTIVE
              </span>
              <MaskedKineticTitle
                text="Every level changes the view."
                className="font-display text-5xl sm:text-7xl leading-[0.94] text-[#302E2A]"
              />
            </div>
            <span className="font-mono text-xs text-[#D8A13D] font-bold uppercase">PERSPECTIVE ELEVATION</span>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 items-stretch">
            
            <div className="lg:col-span-4 space-y-4 font-mono text-xs">
              {perspectiveData.map((lvl, i) => (
                <div
                  key={lvl.label}
                  className={`p-6 rounded-2xl border transition-all duration-500 ${
                    perspectiveIndex === i
                      ? 'bg-[#302E2A] text-[#F8F5EF] border-[#D8A13D] shadow-xl'
                      : 'bg-[#F8F5EF] border-[#C39B68]/30 text-[#302E2A] opacity-60'
                  }`}
                >
                  <div className="flex items-center justify-between text-[10px] mb-1">
                    <span className="text-[#D8A13D] font-bold">{lvl.label}</span>
                    <span className="text-[#9A7552]"><AnimatedCounter end={lvl.altitudeVal} suffix="m Elevation" /></span>
                  </div>
                  <div className="font-display text-xl">{lvl.title}</div>
                  <div className="text-xs opacity-80 mt-1">{lvl.desc}</div>
                </div>
              ))}
            </div>

            <div
              onMouseEnter={() => handleCursor(true, "VIEW")}
              onMouseLeave={() => handleCursor(false)}
              className="lg:col-span-8 relative h-[480px] sm:h-[580px] rounded-3xl overflow-hidden shadow-2xl border border-[#C39B68]/30 bg-[#263B47]"
            >
              <div
                className="absolute inset-0 bg-cover bg-center transition-all duration-700"
                style={{ backgroundImage: `url('${currentPerspective.image}')` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#302E2A]/85 via-transparent to-transparent pointer-events-none" />

              <div className="absolute bottom-8 left-8 right-8 p-6 rounded-2xl bg-black/65 backdrop-blur-md border border-white/20 text-[#F8F5EF] flex items-center justify-between font-mono text-xs">
                <div>
                  <span className="text-[#D8A13D] font-bold block text-[10px] uppercase">{currentPerspective.label} — <AnimatedCounter end={currentPerspective.altitudeVal} suffix="m ELEVATION" /></span>
                  <span className="text-white text-base font-display">{currentPerspective.title}</span>
                </div>
                <button onClick={() => setModalOpen(true)} className="btn-arch-cta text-xs">
                  <span>Explore Level</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#D8A13D]" />
                </button>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ==================================================
          6. SCENE 05: RESIDENCES CATEGORIES
          ================================================== */}
      <section id="residences" className="relative min-h-[100svh] py-24 bg-[#D8A13D]/10 text-[#302E2A] flex flex-col justify-center border-t border-[#C39B68]/20 overflow-hidden">
        
        <span className="parallax-watermark absolute right-8 top-8 font-display text-[16rem] sm:text-[24rem] leading-none text-[#C39B68]/10 pointer-events-none select-none">
          05
        </span>

        <div className="max-w-7xl mx-auto px-8 sm:px-16 w-full relative z-10">
          
          <div className="mb-12 border-b border-[#C39B68]/20 pb-6">
            <span className="font-mono text-xs uppercase tracking-widest text-[#C39B68] font-bold block mb-2">
              RESIDENCES CATEGORIES
            </span>
            <MaskedKineticTitle
              text="Designed around panoramic living."
              className="font-display text-5xl sm:text-6xl text-[#302E2A]"
            />
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {[
              { title: "HORIZON RESIDENCES", lvl: "LEVELS 06–24", areaVal: 210, areaSuffix: " m² – 280 m²", image: "/assets/aurea_interior_living_1785870744927.jpg" },
              { title: "SKY RESIDENCES", lvl: "LEVELS 25–35", areaVal: 295, areaSuffix: " m² – 380 m²", image: "/assets/aurea_view_level_40_1785870776956.jpg" },
              { title: "THE AUREA HOUSE", lvl: "LEVELS 36–39", areaVal: 540, areaSuffix: " m² Penthouse", image: "/assets/aurea_hero_building_golden_1785870679734.jpg" },
            ].map((res) => (
              <div
                key={res.title}
                onMouseEnter={() => handleCursor(true, "DETAILS")}
                onMouseLeave={() => handleCursor(false)}
                className="p-6 rounded-3xl bg-[#F8F5EF] border border-[#C39B68]/30 shadow-xl space-y-4 hover:border-[#D8A13D] transition-all"
              >
                <div className="relative h-64 rounded-2xl overflow-hidden">
                  <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('${res.image}')` }} />
                </div>
                <span className="text-[10px] font-mono text-[#D8A13D] block font-bold">{res.lvl}</span>
                <h3 className="font-display text-2xl text-[#302E2A]">{res.title}</h3>
                <p className="text-xs font-mono text-[#9A7552]">
                  <AnimatedCounter end={res.areaVal} suffix={res.areaSuffix} />
                </p>
                <button onClick={() => setModalOpen(true)} className="btn-arch-cta text-xs w-full justify-center">
                  <span>Inquire Residence</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#D8A13D]" />
                </button>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ==================================================
          7. SCENE 06: INFINITY WATER SANCTUARY
          ================================================== */}
      <section id="amenities" className="relative min-h-[100svh] py-24 bg-[#172A36] text-[#F8F5EF] flex flex-col justify-between overflow-hidden">
        
        <span className="parallax-watermark absolute left-8 top-12 font-display text-[16rem] sm:text-[24rem] leading-none text-white/5 pointer-events-none select-none">
          06
        </span>

        <div
          className="absolute inset-0 bg-cover bg-center opacity-70 pointer-events-none"
          style={{ backgroundImage: `url('/assets/horizon_pool.jpg')` }}
        />

        <div className="absolute inset-0 bg-gradient-to-t from-[#172A36] via-transparent to-[#172A36]/60 pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-8 sm:px-16 w-full pt-16">
          <span className="text-xs font-mono tracking-[0.4em] uppercase text-[#D8A13D] block mb-3 font-semibold">
            INFINITY WATER SANCTUARY
          </span>
          <MaskedKineticTitle
            text="Where water meets the horizon."
            className="font-display text-5xl sm:text-7xl leading-[0.94] text-[#F8F5EF]"
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-8 sm:px-16 w-full pb-16">
          <div className="grid sm:grid-cols-3 gap-4 font-mono text-xs">
            {[
              { name: 'HORIZON INFINITY POOL', desc: 'Heated ocean pool merging with sky horizon' },
              { name: 'WELLNESS SPA PAVILION', desc: 'Thermal sauna & hydrotherapy circuit' },
              { name: 'SOMMELIER WINE VAULT', desc: 'Climate-controlled private vintage lockers' },
            ].map((am) => (
              <div
                key={am.name}
                onMouseEnter={() => handleCursor(true, "SANCTUARY")}
                onMouseLeave={() => handleCursor(false)}
                className="p-5 rounded-2xl bg-black/60 backdrop-blur-md border border-white/20 hover:border-[#D8A13D] transition-all"
              >
                <span className="text-[#D8A13D] font-bold block mb-1">{am.name}</span>
                <span className="text-white/70 text-[11px] font-light">{am.desc}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================================================
          8. SCENE 07: MATERIAL SOLAR LIGHT SWEEP
          ================================================== */}
      <section ref={materialsRef} id="materials" className="relative min-h-[90svh] py-24 bg-[#F2ECE2] text-[#302E2A] flex flex-col justify-center border-t border-[#C39B68]/20 overflow-hidden">
        
        <span className="parallax-watermark absolute right-8 top-8 font-display text-[16rem] sm:text-[24rem] leading-none text-[#C39B68]/10 pointer-events-none select-none">
          07
        </span>

        <div className="max-w-7xl mx-auto px-8 sm:px-16 w-full relative z-10">
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-6">
            <div>
              <span className="text-xs font-mono tracking-[0.4em] uppercase text-[#C39B68] block mb-3 font-semibold">
                MATERIAL LIGHT SWEEP
              </span>
              <MaskedKineticTitle
                text="Light reveals what material holds."
                className="font-display text-5xl sm:text-7xl leading-[0.94] text-[#302E2A]"
              />
            </div>
            <span className="font-mono text-xs text-[#9A7552]">SOLAR LIGHT SWEEP</span>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div
              onMouseEnter={() => handleCursor(true, "STONE")}
              onMouseLeave={() => handleCursor(false)}
              className="relative h-80 sm:h-96 rounded-3xl overflow-hidden shadow-xl border border-[#C39B68]/30"
            >
              <div
                className="absolute inset-0 bg-cover bg-center transition-all duration-300"
                style={{
                  backgroundImage: `url('/assets/aurea_balcony_glass_1785870728378.jpg')`,
                  filter: `brightness(${70 + materialProgress * 50}%)`,
                }}
              />
              <div className="absolute bottom-4 left-4 p-3 rounded-xl bg-black/60 text-white font-mono text-xs">ROMAN TRAVERTINE & LOW-IRON GLASS</div>
            </div>

            <div
              onMouseEnter={() => handleCursor(true, "GLASS")}
              onMouseLeave={() => handleCursor(false)}
              className="relative h-80 sm:h-96 rounded-3xl overflow-hidden shadow-xl border border-[#C39B68]/30"
            >
              <div
                className="absolute inset-0 bg-cover bg-center transition-all duration-300"
                style={{
                  backgroundImage: `url('/assets/aurea_wellness_pavilion_1785870814453.jpg')`,
                  filter: `brightness(${70 + materialProgress * 50}%)`,
                }}
              />
              <div className="absolute bottom-4 left-4 p-3 rounded-xl bg-black/60 text-white font-mono text-xs">WELLNESS MINERAL SPA SANCTUARY</div>
            </div>
          </div>

        </div>
      </section>

      {/* ==================================================
          9. APPROVED SCENE 08: APPROVED FINAL AZUL (NIGHT & FORM)
          ================================================== */}
      <section id="presentation" className="relative min-h-[100svh] py-24 bg-[#172A36] text-[#F8F5EF] flex flex-col justify-center border-t border-[#C39B68]/30 overflow-hidden">
        
        <span className="parallax-watermark absolute left-8 top-8 font-display text-[16rem] sm:text-[24rem] leading-none text-white/5 pointer-events-none select-none">
          08
        </span>

        <div
          className="absolute inset-0 bg-cover bg-center opacity-45 pointer-events-none"
          style={{ backgroundImage: `url('/assets/building_night.jpg')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#172A36]/95 via-[#172A36]/80 to-[#172A36]/70 pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-8 sm:px-16 w-full">
          <div className="grid lg:grid-cols-12 gap-16 items-center">
            
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs font-mono tracking-[0.4em] uppercase text-[#D8A13D] block font-semibold">
                APPROVED PRIVATE PRESENTATION
              </span>

              <h2 className="font-display text-5xl sm:text-7xl text-[#F8F5EF] leading-[0.95]">
                A new horizon <br />
                awaits.
              </h2>

              <p className="text-base sm:text-lg text-[#F8F5EF]/85 font-light leading-relaxed max-w-md">
                Discover AUREA through a private architectural presentation, floorplan review, and residence availability consultation.
              </p>

              <div className="pt-2">
                <button
                  onClick={() => setModalOpen(true)}
                  onMouseEnter={() => handleCursor(true, "BOOK")}
                  onMouseLeave={() => handleCursor(false)}
                  className="btn-arch-cta"
                >
                  <span>Schedule Private Presentation</span>
                  <ArrowRight className="w-4 h-4 text-[#D8A13D]" />
                </button>
              </div>
            </div>

            {/* Minimal Form */}
            <div className="lg:col-span-6 p-8 rounded-3xl bg-black/40 backdrop-blur-md border border-white/15">
              {formSubmitted ? (
                <div className="text-center py-12 font-mono text-sm space-y-3">
                  <CheckCircle2 className="w-10 h-10 text-[#D8A13D] mx-auto" />
                  <h3 className="font-display text-2xl text-white">Presentation Scheduled</h3>
                  <p className="text-white/70">Our advisory team will reach out shortly.</p>
                </div>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setFormSubmitted(true);
                  }}
                  className="space-y-6 font-mono text-xs"
                >
                  <div>
                    <label className="block text-[10px] text-[#D8A13D] uppercase mb-1">FULL NAME</label>
                    <input
                      type="text"
                      required
                      placeholder="Enter your name"
                      className="w-full bg-transparent border-b border-white/30 py-2 text-white placeholder-white/40 focus:outline-none focus:border-[#D8A13D]"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] text-[#D8A13D] uppercase mb-1">EMAIL ADDRESS</label>
                    <input
                      type="email"
                      required
                      placeholder="name@domain.com"
                      className="w-full bg-transparent border-b border-white/30 py-2 text-white placeholder-white/40 focus:outline-none focus:border-[#D8A13D]"
                    />
                  </div>

                  <button
                    type="submit"
                    onMouseEnter={() => handleCursor(true, "SUBMIT")}
                    onMouseLeave={() => handleCursor(false)}
                    className="w-full py-4 rounded-full bg-[#D8A13D] text-[#172A36] font-bold uppercase tracking-widest hover:bg-white transition-all"
                  >
                    Request Presentation →
                  </button>
                </form>
              )}
            </div>

          </div>
        </div>
      </section>

      {/* ==================================================
          10. APPROVED SCENE 09: APPROVED FINAL NIGHT FOOTER
          ================================================== */}
      <footer className="relative min-h-[90svh] bg-[#162129] text-[#F8F5EF] py-24 flex flex-col justify-between overflow-hidden border-t border-[#C39B68]/30">
        
        <div
          className="absolute inset-0 bg-cover bg-center opacity-25 pointer-events-none"
          style={{ backgroundImage: `url('/assets/hero_sea.jpg')` }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-8 sm:px-16 w-full text-center space-y-6 my-auto">
          
          {/* Wordmark */}
          <div className="relative inline-block whitespace-nowrap">
            <span className="font-display text-6xl sm:text-8xl tracking-[0.45em] uppercase font-light text-white whitespace-nowrap inline-block">
              A U R E A
            </span>
            <div className="absolute top-[52%] left-0 w-full h-[1.5px] bg-[#D8A13D] opacity-90 pointer-events-none" />
          </div>

          <p className="text-xs sm:text-sm font-mono tracking-[0.3em] uppercase text-[#D8A13D]">
            A DAY ABOVE THE HORIZON
          </p>

          <p className="text-sm text-white/70 font-light max-w-md mx-auto">
            Architecture that celebrates the horizon. Completing the full solar cycle from sunrise to ocean night.
          </p>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-8 sm:px-16 w-full pt-12 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between font-mono text-[10px] text-white/50 gap-4">
          <span>© 2026 AUREA RESIDENCES. ATLANTIC COASTAL LANDMARK.</span>
          <a
            href="#hero"
            onMouseEnter={() => handleCursor(true, "TOP")}
            onMouseLeave={() => handleCursor(false)}
            className="text-[#D8A13D] hover:text-[#FFFFFF] transition-colors uppercase tracking-widest"
          >
            RETURN TO SUNRISE ↑
          </a>
        </div>
      </footer>

      {/* Shared Inquiry Modal */}
      <PrivatePresentationModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
}
