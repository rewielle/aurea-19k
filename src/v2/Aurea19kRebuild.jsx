import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Compass, ChevronRight, CheckCircle2, Layers, Sun } from 'lucide-react';
import PrivatePresentationModal from '../components/PrivatePresentationModal';

export default function Aurea19kRebuild() {
  const [modalOpen, setModalOpen] = useState(false);
  const videoRef = useRef(null);

  // Hero Video State
  const [heroHeadline, setHeroHeadline] = useState(false);
  const [heroSupporting, setHeroSupporting] = useState(false);
  const [heroCTA, setHeroCTA] = useState(false);

  // Exploded Architecture Toggle State (Closed / Open)
  const [explodedOpen, setExplodedOpen] = useState(true);

  // Exterior -> Interior Spatial Passage Toggle (0: Exterior, 1: Glass, 2: Interior)
  const [spatialState, setSpatialState] = useState(1);

  // Floor Perspective State (0: Level 05, 1: Level 20, 2: Level 35, 3: Aurea House)
  const [selectedLevel, setSelectedLevel] = useState(1);

  // Residences Category (0: Horizon, 1: Sky, 2: Aurea House)
  const [activeResidenceCategory, setActiveResidenceCategory] = useState(0);

  // Amenity Selection
  const [activeAmenityLabel, setActiveAmenityLabel] = useState(0);

  // Form Submission
  const [formDone, setFormDone] = useState(false);

  // Hero Video Timeline Handler
  useEffect(() => {
    const video = videoRef.current;
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

  const levelsData = [
    { id: 0, label: "LEVEL 05", title: "COASTAL ELEVATION", area: "185 m²", altitude: "24m", desc: "Closer relationship with coastline and palm canopy.", image: "/assets/view_level_20.jpg" },
    { id: 1, label: "LEVEL 20", title: "HORIZON RESIDENCE", area: "210 m²", altitude: "68m", desc: "Balanced ocean sea line, city lights and horizon.", image: "/assets/view_level_20.jpg" },
    { id: 2, label: "LEVEL 35", title: "SKY RESIDENCE", area: "295 m²", altitude: "120m", desc: "More sky, silence and uninterrupted ocean expanse.", image: "/assets/view_level_40.jpg" },
    { id: 3, label: "AUREA HOUSE", title: "PENTHOUSE ESTATE", area: "540 m²", altitude: "155m", desc: "Maximum height, private sky terrace and 360° open horizon.", image: "/assets/building_golden.jpg" },
  ];

  const currentLevelData = levelsData[selectedLevel];

  const residenceCategories = [
    {
      title: "HORIZON RESIDENCES",
      subtitle: "LEVELS 06 – 24",
      desc: "Designed around panoramic living, broad loggia terraces and an uninterrupted relationship with the sea.",
      image: "/assets/interior_living.jpg",
      specs: "210 m² – 280 m² · 3 Bedrooms · Ocean Sunrise Alignment"
    },
    {
      title: "SKY RESIDENCES",
      subtitle: "LEVELS 25 – 35",
      desc: "Greater height, absolute privacy and elevated open perspectives high above the coastline.",
      image: "/assets/view_level_40.jpg",
      specs: "295 m² – 380 m² · 4 Bedrooms · Private Wine Storage Cellar"
    },
    {
      title: "THE AUREA HOUSE",
      subtitle: "LEVELS 36 – 39",
      desc: "A singular penthouse estate with private terraces, suspended gardens and the project's highest horizon.",
      image: "/assets/building_golden.jpg",
      specs: "540 m² Estate · Private Pool · Dedicated Butler Service"
    }
  ];

  return (
    <div className="min-h-screen bg-[#F8F5EF] text-[#302E2A] selection:bg-[#C39B68] selection:text-white font-sans overflow-x-hidden">
      
      {/* ==================================================
          SCENE 01 — APPROVED SEEDANCE HERO (SUNRISE)
          ================================================== */}
      <section id="hero" className="relative w-full h-[100svh] min-h-[720px] bg-[#172A36] overflow-hidden flex flex-col justify-between">
        
        {/* Full-bleed Seedance Video (`video_aurea_hero.mp4`) */}
        <video
          ref={videoRef}
          autoPlay
          muted
          playsInline
          preload="auto"
          src="/assets/video_aurea_hero.mp4"
          className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none"
        />

        {/* Subtle Gradient Overlay */}
        <div className="absolute inset-y-0 left-0 w-full sm:w-1/2 bg-gradient-to-r from-[#172A36]/85 via-[#172A36]/35 to-transparent pointer-events-none" />

        {/* Minimal Header */}
        <header className="relative z-20 max-w-7xl mx-auto px-8 sm:px-16 w-full pt-8 flex items-center justify-between text-[#F8F5EF]">
          <div className="relative group cursor-pointer">
            <span className="font-display text-2xl sm:text-3xl tracking-[0.38em] uppercase font-light pl-1">
              A U R E A
            </span>
            <div className="absolute top-[52%] left-0 w-full h-[1.5px] bg-[#D8A13D] opacity-90" />
          </div>

          <nav className="hidden md:flex items-center gap-10 text-xs sm:text-sm font-mono tracking-[0.25em] uppercase text-[#F8F5EF]/90">
            <a href="#concept" className="hover:text-[#D8A13D] transition-colors">Architecture</a>
            <a href="#exploded" className="hover:text-[#D8A13D] transition-colors">Exploded</a>
            <a href="#perspective" className="hover:text-[#D8A13D] transition-colors">Perspective</a>
            <a href="#residences" className="hover:text-[#D8A13D] transition-colors">Residences</a>
          </nav>

          <button
            onClick={() => setModalOpen(true)}
            className="hidden sm:inline-flex items-center gap-3 text-xs sm:text-sm font-mono tracking-[0.25em] uppercase text-[#F8F5EF] border-b border-white/40 pb-1 hover:border-[#D8A13D] hover:text-[#D8A13D] transition-all"
          >
            <span>Private Presentation</span>
            <ArrowRight className="w-4 h-4 text-[#D8A13D]" />
          </button>
        </header>

        {/* Choreographed Text Overlay */}
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
            <span className="text-[#D8A13D] font-semibold">`video aurea hero.mp4`</span>
          </div>
          <span className="text-[10px] tracking-widest uppercase">SCENE 01 / 10 — SUNRISE</span>
        </div>
      </section>

      {/* ==================================================
          SCENE 02 — ARCHITECTURE SHAPED BY LIGHT (DAYLIGHT)
          ================================================== */}
      <section id="concept" className="relative min-h-[90svh] py-24 bg-[#F8F5EF] text-[#302E2A] flex flex-col justify-center border-t border-[#C39B68]/20">
        <div className="max-w-7xl mx-auto px-8 sm:px-16 w-full">
          
          {/* Eyebrow */}
          <span className="text-xs font-mono tracking-[0.4em] uppercase text-[#C39B68] block mb-4 font-semibold">
            THE CONCEPT
          </span>

          {/* Monumental Layout: Oversized Title + Monumental Façade Render */}
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-6 space-y-6">
              <h2 className="font-display text-6xl sm:text-7xl md:text-[5.5rem] leading-[0.93] tracking-[-0.03em] text-[#302E2A]">
                Architecture <br />
                shaped by <br />
                <span className="text-[#C39B68]">light.</span>
              </h2>

              <div className="w-24 h-[1.5px] bg-[#D8A13D]" />

              <p className="text-base sm:text-xl text-[#302E2A]/85 font-light leading-relaxed max-w-[420px]">
                AUREA was conceived as a dialogue between sunlight, material and horizon. Every curved loggia, pane and surface responds to the rhythm of the day.
              </p>

              <div className="pt-4 flex items-center gap-6 font-mono text-xs text-[#9A7552]">
                <span className="flex items-center gap-2">
                  <Compass className="w-4 h-4 text-[#D8A13D]" /> Atlantic Coast Headland
                </span>
                <span className="flex items-center gap-2">
                  <ChevronRight className="w-4 h-4 text-[#D8A13D]" /> 40 Residential Levels
                </span>
              </div>
            </div>

            {/* Monumental Tower Façade Close-up (65% Viewport height) */}
            <div className="lg:col-span-6 relative h-[520px] sm:h-[640px] rounded-3xl overflow-hidden shadow-2xl border border-[#C39B68]/30">
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url('/assets/building_sunrise.jpg')` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#302E2A]/70 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-6 left-6 right-6 font-mono text-xs text-[#F8F5EF] flex justify-between items-center">
                <span className="text-[#D8A13D] font-bold">MONUMENTAL LOGGIA RHYTHM</span>
                <span>06:45 AM SUNRISE</span>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ==================================================
          SCENE 03 — EXPLODED ARCHITECTURE (BRIGHT MIDDAY)
          ================================================== */}
      <section id="exploded" className="relative min-h-[100svh] py-24 bg-[#F2ECE2] text-[#302E2A] flex flex-col justify-between border-t border-[#C39B68]/20">
        <div className="max-w-7xl mx-auto px-8 sm:px-16 w-full">
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-6">
            <div>
              <span className="text-xs font-mono tracking-[0.4em] uppercase text-[#C39B68] block mb-3 font-semibold">
                SCENE 03 — SCULPTURAL EXPLODED STRUCTURE
              </span>
              <h2 className="font-display text-5xl sm:text-7xl leading-[0.94] text-[#302E2A]">
                Every level, a new perspective.
              </h2>
            </div>

            <button
              onClick={() => setExplodedOpen(!explodedOpen)}
              className="px-6 py-3 rounded-full border border-[#D8A13D] bg-[#302E2A] text-[#F8F5EF] font-mono text-xs uppercase tracking-widest flex items-center gap-3 hover:bg-[#D8A13D] hover:text-[#302E2A] transition-all"
            >
              <Layers className="w-4 h-4 text-[#D8A13D]" />
              <span>{explodedOpen ? 'Collapse Layers' : 'Separate Architectural Layers'}</span>
            </button>
          </div>

          {/* Monumental 2.5D Layer Canvas */}
          <div className="relative h-[560px] sm:h-[680px] rounded-3xl overflow-hidden shadow-2xl border border-[#C39B68]/30 bg-[#263B47] flex items-center justify-center p-8">
            <div
              className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-overlay"
              style={{ backgroundImage: `url('/assets/hero_sea.jpg')` }}
            />

            {/* Architectural Vertical Layers */}
            <div className="relative w-full max-w-2xl h-full flex flex-col justify-between py-4">
              {[
                { zone: "ROOFTOP & SKY POOL", lvl: "LEVEL 40", desc: "Infinity Sky Pool & Observatory Terrace", y: -120 },
                { zone: "THE AUREA HOUSE", lvl: "LEVEL 36–39", desc: "Four-level Penthouse Estate with Private Sky Garden", y: -60 },
                { zone: "SKY RESIDENCES", lvl: "LEVEL 25–35", desc: "Elevated Panoramic Suites & Private Wine Storage", y: 0 },
                { zone: "HORIZON RESIDENCES", lvl: "LEVEL 06–24", desc: "Panoramic 3 & 4-Bedroom Oceanfront Loggias", y: 60 },
                { zone: "WELLNESS PAVILION", lvl: "LEVEL 03–05", desc: "Thermal Spa, Hydrotherapy Pool & Fitness Sanctuary", y: 110 },
                { zone: "ARRIVAL & LOBBY", lvl: "GROUND LEVEL", desc: "Travertine Portico, 9m Ceiling Lounge & Valet", y: 150 },
              ].map((layer, idx) => (
                <div
                  key={idx}
                  className={`p-5 rounded-2xl border transition-all duration-500 ${
                    explodedOpen
                      ? 'bg-[#F8F5EF] text-[#302E2A] border-[#D8A13D] shadow-xl'
                      : 'bg-[#172A36]/90 text-[#F8F5EF] border-white/10'
                  }`}
                  style={{
                    transform: explodedOpen ? `translateY(${layer.y * 0.3}px)` : 'translateY(0px)',
                  }}
                >
                  <div className="flex items-center justify-between font-mono text-xs">
                    <span className="text-[#D8A13D] font-bold">{layer.lvl}</span>
                    <span className="text-inherit font-display text-lg">{layer.zone}</span>
                  </div>
                  <p className="text-xs text-inherit/80 font-light mt-1">{layer.desc}</p>
                </div>
              ))}
            </div>

            {/* Fine Vector Axis Line */}
            <div className="absolute top-8 bottom-8 left-12 w-[1.5px] bg-[#D8A13D]/50 pointer-events-none" />
          </div>

        </div>
      </section>

      {/* ==================================================
          SCENE 04 — THE HORIZON BEGINS INSIDE (GOLDEN HOUR)
          ================================================== */}
      <section id="spatial" className="relative min-h-[100svh] py-24 bg-[#D4C2AD]/20 text-[#302E2A] flex flex-col justify-center border-t border-[#C39B68]/20">
        <div className="max-w-7xl mx-auto px-8 sm:px-16 w-full">
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-6">
            <div>
              <span className="text-xs font-mono tracking-[0.4em] uppercase text-[#C39B68] block mb-3 font-semibold">
                SCENE 04 — SPATIAL PASSAGE
              </span>
              <h2 className="font-display text-5xl sm:text-7xl leading-[0.94] text-[#302E2A]">
                The horizon begins inside.
              </h2>
            </div>

            <div className="flex items-center gap-3 font-mono text-xs">
              {['EXTERIOR', 'GLASS FAÇADE', 'PANORAMIC SUITE'].map((st, i) => (
                <button
                  key={st}
                  onClick={() => setSpatialState(i)}
                  className={`px-4 py-2 rounded-full border transition-all ${
                    spatialState === i
                      ? 'bg-[#302E2A] text-[#F8F5EF] border-[#D8A13D]'
                      : 'bg-[#F8F5EF] border-[#C39B68]/30 text-[#302E2A]'
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>
          </div>

          {/* Continuous Spatial Passage Canvas */}
          <div className="relative h-[520px] sm:h-[640px] rounded-3xl overflow-hidden shadow-2xl border border-[#C39B68]/30 bg-[#263B47]">
            
            {/* Exterior Layer */}
            <div
              className="absolute inset-0 bg-cover bg-center transition-opacity duration-700"
              style={{
                backgroundImage: `url('/assets/balcony_glass.jpg')`,
                opacity: spatialState === 0 ? 1 : spatialState === 1 ? 0.4 : 0,
              }}
            />

            {/* Interior Layer */}
            <div
              className="absolute inset-0 bg-cover bg-center transition-opacity duration-700"
              style={{
                backgroundImage: `url('/assets/interior_living.jpg')`,
                opacity: spatialState === 2 ? 1 : spatialState === 1 ? 0.7 : 0,
              }}
            />

            <div className="absolute inset-0 bg-gradient-to-t from-[#302E2A]/85 via-transparent to-transparent pointer-events-none" />

            <div className="absolute bottom-8 left-8 right-8 p-6 rounded-2xl bg-black/65 backdrop-blur-md border border-white/20 text-[#F8F5EF] flex items-center justify-between font-mono text-xs">
              <div>
                <span className="text-[#D8A13D] font-bold block text-[10px] uppercase">SPATIAL FAÇADE PERSPECTIVE</span>
                <span className="text-white text-base font-display">
                  {spatialState === 0 ? 'Curved Loggia Balcony & Ocean Horizon' : spatialState === 1 ? 'Crossing Low-Iron Glass Façade' : 'Panoramic Living Suite Interior'}
                </span>
              </div>
              <span className="text-white/80">GOLDEN HOUR LIGHT</span>
            </div>
          </div>

        </div>
      </section>

      {/* ==================================================
          SCENE 05 — CHOOSE YOUR PERSPECTIVE (CLEAR SKY)
          ================================================== */}
      <section id="perspective" className="relative min-h-[100svh] py-24 bg-[#BCD0D8]/20 text-[#302E2A] flex flex-col justify-center border-t border-[#C39B68]/20">
        <div className="max-w-7xl mx-auto px-8 sm:px-16 w-full">
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-6">
            <div>
              <span className="text-xs font-mono tracking-[0.4em] uppercase text-[#C39B68] block mb-3 font-semibold">
                SCENE 05 — PERSPECTIVE SELECTOR
              </span>
              <h2 className="font-display text-5xl sm:text-7xl leading-[0.94] text-[#302E2A]">
                Every level changes the view.
              </h2>
            </div>
            <span className="font-mono text-xs text-[#9A7552]">CHOOSE YOUR PERSPECTIVE</span>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Level Ruler */}
            <div className="lg:col-span-4 space-y-4 font-mono text-xs">
              {levelsData.map((lvl, i) => (
                <div
                  key={lvl.id}
                  onClick={() => setSelectedLevel(i)}
                  className={`p-6 rounded-2xl border transition-all cursor-pointer ${
                    selectedLevel === i
                      ? 'bg-[#302E2A] text-[#F8F5EF] border-[#D8A13D] shadow-xl'
                      : 'bg-[#F8F5EF] border-[#C39B68]/30 text-[#302E2A]'
                  }`}
                >
                  <div className="flex items-center justify-between text-[10px] mb-1">
                    <span className="text-[#D8A13D] font-bold">{lvl.label}</span>
                    <span className="text-[#9A7552]">{lvl.altitude}</span>
                  </div>
                  <div className="font-display text-xl">{lvl.title}</div>
                  <div className="text-xs opacity-80 mt-1">{lvl.desc}</div>
                </div>
              ))}
            </div>

            {/* Level View Canvas */}
            <div className="lg:col-span-8 relative h-[480px] sm:h-[580px] rounded-3xl overflow-hidden shadow-2xl border border-[#C39B68]/30 bg-[#263B47]">
              <div
                className="absolute inset-0 bg-cover bg-center transition-all duration-700"
                style={{ backgroundImage: `url('${currentLevelData.image}')` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#302E2A]/85 via-transparent to-transparent pointer-events-none" />

              <div className="absolute bottom-8 left-8 right-8 p-6 rounded-2xl bg-black/65 backdrop-blur-md border border-white/20 text-[#F8F5EF] flex items-center justify-between font-mono text-xs">
                <div>
                  <span className="text-[#D8A13D] font-bold block text-[10px] uppercase">{currentLevelData.label} — {currentLevelData.altitude} ELEVATION</span>
                  <span className="text-white text-base font-display">{currentLevelData.title}</span>
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
          SCENE 06 — RESIDENCES (SUNSET GOLD)
          ================================================== */}
      <section id="residences" className="relative min-h-[100svh] py-24 bg-[#D8A13D]/10 text-[#302E2A] flex flex-col justify-center border-t border-[#C39B68]/20">
        <div className="max-w-7xl mx-auto px-8 sm:px-16 w-full">
          
          <div className="flex flex-wrap items-center justify-between mb-12 border-b border-[#C39B68]/20 pb-6 gap-4">
            <div className="flex flex-wrap items-center gap-4 font-mono text-xs">
              {residenceCategories.map((cat, idx) => (
                <button
                  key={cat.title}
                  onClick={() => setActiveResidenceCategory(idx)}
                  className={`px-6 py-3 rounded-full transition-all ${
                    activeResidenceCategory === idx
                      ? 'bg-[#302E2A] text-[#F8F5EF] font-bold shadow-md'
                      : 'bg-[#F8F5EF] text-[#302E2A] border border-[#C39B68]/30'
                  }`}
                >
                  {cat.title}
                </button>
              ))}
            </div>
            <span className="font-mono text-xs text-[#9A7552]">{residenceCategories[activeResidenceCategory].subtitle}</span>
          </div>

          {/* Full-width Residence Feature */}
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-5 space-y-6">
              <span className="text-xs font-mono tracking-[0.4em] uppercase text-[#C39B68] block font-semibold">
                CATEGORY 0{activeResidenceCategory + 1}
              </span>

              <h2 className="font-display text-5xl sm:text-6xl text-[#302E2A]">
                {residenceCategories[activeResidenceCategory].title}
              </h2>

              <p className="text-base sm:text-lg text-[#302E2A]/85 font-light leading-relaxed">
                {residenceCategories[activeResidenceCategory].desc}
              </p>

              <div className="p-4 rounded-xl bg-[#F8F5EF] border border-[#C39B68]/20 font-mono text-xs text-[#9A7552]">
                {residenceCategories[activeResidenceCategory].specs}
              </div>

              <div className="pt-2">
                <button onClick={() => setModalOpen(true)} className="btn-arch-cta">
                  <span>Inquire Residence</span>
                  <ArrowRight className="w-4 h-4 text-[#D8A13D]" />
                </button>
              </div>
            </div>

            <div className="lg:col-span-7 relative h-[480px] sm:h-[580px] rounded-3xl overflow-hidden shadow-2xl border border-[#C39B68]/30 bg-[#263B47]">
              <div
                className="absolute inset-0 bg-cover bg-center transition-all duration-700"
                style={{ backgroundImage: `url('${residenceCategories[activeResidenceCategory].image}')` }}
              />
            </div>

          </div>

        </div>
      </section>

      {/* ==================================================
          SCENE 07 — WHERE WATER MEETS THE HORIZON
          ================================================== */}
      <section id="amenities" className="relative min-h-[100svh] py-24 bg-[#172A36] text-[#F8F5EF] flex flex-col justify-between overflow-hidden">
        
        {/* Full-bleed Infinity Pool Render (`horizon_pool.jpg`) */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-70 pointer-events-none"
          style={{ backgroundImage: `url('/assets/horizon_pool.jpg')` }}
        />

        <div className="absolute inset-0 bg-gradient-to-t from-[#172A36] via-transparent to-[#172A36]/60 pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-8 sm:px-16 w-full pt-16">
          <span className="text-xs font-mono tracking-[0.4em] uppercase text-[#D8A13D] block mb-3 font-semibold">
            SCENE 07 — AMENITY SANCTUARY
          </span>
          <h2 className="font-display text-5xl sm:text-7xl leading-[0.94] text-[#F8F5EF]">
            Where water meets the horizon.
          </h2>
        </div>

        {/* Editorial Amenity Labels Directly Across Canvas */}
        <div className="relative z-10 max-w-7xl mx-auto px-8 sm:px-16 w-full pb-16">
          <div className="flex flex-wrap gap-4 font-mono text-xs">
            {['HORIZON INFINITY POOL', 'WELLNESS SPA PAVILION', 'PRIVATE OCEAN DINING', 'SOMMELIER WINE VAULT', 'OBSERVATORY SKY TERRACE'].map((am, i) => (
              <button
                key={am}
                onClick={() => setActiveAmenityLabel(i)}
                className={`px-5 py-3 rounded-full border transition-all ${
                  activeAmenityLabel === i
                    ? 'bg-[#D8A13D] text-[#302E2A] font-bold border-[#D8A13D]'
                    : 'bg-black/60 text-[#F8F5EF] border-white/20 hover:border-[#D8A13D]'
                }`}
              >
                {am}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ==================================================
          SCENE 08 — LIGHT REVEALS MATERIAL
          ================================================== */}
      <section id="materials" className="relative min-h-[90svh] py-24 bg-[#F2ECE2] text-[#302E2A] flex flex-col justify-center border-t border-[#C39B68]/20">
        <div className="max-w-7xl mx-auto px-8 sm:px-16 w-full">
          
          <span className="text-xs font-mono tracking-[0.4em] uppercase text-[#C39B68] block mb-3 font-semibold">
            SCENE 08 — MATERIAL GALLERY
          </span>
          <h2 className="font-display text-5xl sm:text-7xl leading-[0.94] text-[#302E2A] mb-12">
            Light reveals what material holds.
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="relative h-80 sm:h-96 rounded-3xl overflow-hidden shadow-xl border border-[#C39B68]/30">
              <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('/assets/building_golden.jpg')` }} />
              <div className="absolute bottom-4 left-4 p-3 rounded-xl bg-black/60 text-white font-mono text-xs">ROMAN TRAVERTINE & BRONZE</div>
            </div>

            <div className="relative h-80 sm:h-96 rounded-3xl overflow-hidden shadow-xl border border-[#C39B68]/30">
              <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('/assets/balcony_glass.jpg')` }} />
              <div className="absolute bottom-4 left-4 p-3 rounded-xl bg-black/60 text-white font-mono text-xs">LOW-IRON LOGGIA GLASS</div>
            </div>
          </div>

        </div>
      </section>

      {/* ==================================================
          SCENE 09 — A NEW HORIZON AWAITS (TWILIGHT & FORM)
          ================================================== */}
      <section id="presentation" className="relative min-h-[100svh] py-24 bg-[#172A36] text-[#F8F5EF] flex flex-col justify-center border-t border-[#C39B68]/30">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-40 pointer-events-none"
          style={{ backgroundImage: `url('/assets/building_night.jpg')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#172A36]/95 via-[#172A36]/80 to-[#172A36]/70 pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-8 sm:px-16 w-full">
          <div className="grid lg:grid-cols-12 gap-16 items-center">
            
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs font-mono tracking-[0.4em] uppercase text-[#D8A13D] block font-semibold">
                SCENE 09 — PRIVATE PRESENTATION
              </span>

              <h2 className="font-display text-5xl sm:text-7xl text-[#F8F5EF] leading-[0.95]">
                A new horizon <br />
                awaits.
              </h2>

              <p className="text-base sm:text-lg text-[#F8F5EF]/85 font-light leading-relaxed max-w-md">
                Discover AUREA through a private architectural presentation, floorplan review, and residence availability consultation.
              </p>

              <div className="pt-2">
                <button onClick={() => setModalOpen(true)} className="btn-arch-cta">
                  <span>Schedule Private Presentation</span>
                  <ArrowRight className="w-4 h-4 text-[#D8A13D]" />
                </button>
              </div>
            </div>

            {/* Minimal Underline Input Form (NO WHITE BOX!) */}
            <div className="lg:col-span-6 p-8 rounded-3xl bg-black/40 backdrop-blur-md border border-white/15">
              {formDone ? (
                <div className="text-center py-12 font-mono text-sm space-y-3">
                  <CheckCircle2 className="w-10 h-10 text-[#D8A13D] mx-auto" />
                  <h3 className="font-display text-2xl text-white">Presentation Scheduled</h3>
                  <p className="text-white/70">Our advisory team will reach out shortly.</p>
                </div>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setFormDone(true);
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
          SCENE 10 — CINEMATIC NIGHT FOOTER & SOLAR CYCLE CLOSURE
          ================================================== */}
      <footer className="relative min-h-[90svh] bg-[#162129] text-[#F8F5EF] py-24 flex flex-col justify-between overflow-hidden border-t border-[#C39B68]/30">
        
        <div
          className="absolute inset-0 bg-cover bg-center opacity-25 pointer-events-none"
          style={{ backgroundImage: `url('/assets/building_night.jpg')` }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-8 sm:px-16 w-full text-center space-y-6 my-auto">
          <div className="relative inline-block">
            <span className="font-display text-6xl sm:text-8xl tracking-[0.4em] uppercase font-light pl-2 text-white">
              A U R E A
            </span>
            <div className="absolute top-[52%] left-0 w-full h-[1.5px] bg-[#D8A13D] opacity-90" />
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
          <a href="#hero" className="text-[#D8A13D] hover:text-white transition-colors uppercase tracking-widest">
            RETURN TO SUNRISE ↑
          </a>
        </div>
      </footer>

      {/* Shared Inquiry Modal */}
      <PrivatePresentationModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
}
