import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Play, Sun, Sparkles } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function CinematicSolarHero({ onOpenModal }) {
  const containerRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [autoplayStage, setAutoplayStage] = useState(0);

  useEffect(() => {
    // GSAP ScrollTrigger pinning & scroll scrubbing for cinematic camera progression
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top top',
        end: '+=250%',
        pin: true,
        scrub: 0.8,
        onUpdate: (self) => {
          setScrollProgress(self.progress);
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Autoplay intro timer for first 3 seconds to establish atmosphere
  useEffect(() => {
    const timer1 = setTimeout(() => setAutoplayStage(1), 600);
    const timer2 = setTimeout(() => setAutoplayStage(2), 1600);
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  // Calculate multi-pass layer opacity based on scrollProgress (0.0 to 1.0)
  // Stage 1 (0.00 - 0.15): Calm Ocean & Solar Horizon Axis (LIGHT)
  // Stage 2 (0.15 - 0.35): Light Silhouette & Core Beam (SILHOUETTE)
  // Stage 3 (0.35 - 0.55): Structural Lines in Mist (LINES)
  // Stage 4 (0.55 - 0.75): Translucent Glass & Floor Volumes (VOLUME)
  // Stage 5 (0.75 - 1.00): Full Materialization (MONUMENTAL AUREA)

  const seaOpacity = 1 - scrollProgress * 0.15;
  const axisOpacity = Math.min(1, scrollProgress * 3);
  const lineOpacity = scrollProgress > 0.15 ? Math.min(1, (scrollProgress - 0.15) * 4) : 0;
  const sunriseOpacity = scrollProgress > 0.35 ? Math.min(1, (scrollProgress - 0.35) * 3) : 0;
  const buildingOpacity = scrollProgress > 0.65 ? Math.min(1, (scrollProgress - 0.65) * 3.3) : 0;

  // Slow camera movement zoom & rise
  const cameraScale = 1.05 - scrollProgress * 0.05;
  const cameraY = (1 - scrollProgress) * 25;

  // Determine stage narrative badge
  let phaseLabel = '01 — OCEAN & SOLAR AXIS';
  let phaseDesc = 'Sunlight on calm water forming the origin axis.';
  if (scrollProgress > 0.15 && scrollProgress <= 0.35) {
    phaseLabel = '02 — LIGHT SILHOUETTE';
    phaseDesc = 'The sun reflection begins to outline architectural mass.';
  } else if (scrollProgress > 0.35 && scrollProgress <= 0.55) {
    phaseLabel = '03 — STRUCTURAL LINES';
    phaseDesc = 'Glowing wireframe lines rise out of the solar beam.';
  } else if (scrollProgress > 0.55 && scrollProgress <= 0.75) {
    phaseLabel = '04 — TRANSLUCENT VOLUME';
    phaseDesc = 'Curved balconies & floor plates gain glass depth.';
  } else if (scrollProgress > 0.75) {
    phaseLabel = '05 — MONUMENTAL AUREA';
    phaseDesc = 'Travertine, champagne bronze & glass fully revealed by sunlight.';
  }

  return (
    <section
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden bg-[#FAF7F1] text-[#312E2A] bg-grain flex flex-col justify-between"
    >
      {/* 1. Base Layer: Calm Ocean & Low Sunrise */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 ease-out"
        style={{
          backgroundImage: `url('/assets/hero_sea.jpg')`,
          opacity: seaOpacity,
          transform: `scale(${cameraScale})`,
        }}
      />

      {/* 2. PROPRIETARY SOLAR-HORIZON AXIS (The central origin beam of light) */}
      <div
        className="absolute top-[52%] left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-[#D6A03B] to-transparent pointer-events-none transition-opacity duration-500 shadow-[0_0_25px_#D6A03B]"
        style={{ opacity: Math.max(0.4, axisOpacity) }}
      />
      <div
        className="absolute top-[48%] right-[22%] w-72 h-72 rounded-full bg-[#D6A03B]/20 blur-3xl pointer-events-none transition-opacity duration-700 animate-pulse"
        style={{ opacity: Math.max(0.3, axisOpacity) }}
      />

      {/* 3. Structural Wireframe Lines Layer */}
      <div
        className="absolute inset-0 bg-cover bg-right-center pointer-events-none mix-blend-multiply transition-opacity duration-500"
        style={{
          backgroundImage: `url('/assets/hero_lines.jpg')`,
          opacity: lineOpacity * (1 - buildingOpacity * 0.8),
          transform: `scale(${cameraScale}) translateY(${cameraY}px)`,
        }}
      />

      {/* 4. Translucent Sunrise Volume Layer */}
      <div
        className="absolute inset-0 bg-cover bg-right-center pointer-events-none transition-opacity duration-500"
        style={{
          backgroundImage: `url('/assets/building_sunrise.jpg')`,
          opacity: sunriseOpacity * (1 - buildingOpacity),
          transform: `scale(${cameraScale}) translateY(${cameraY * 0.6}px)`,
        }}
      />

      {/* 5. Final Monumental Tower Materialization Layer */}
      <div
        className="absolute inset-0 bg-cover bg-right-center pointer-events-none filter drop-shadow-2xl transition-opacity duration-500"
        style={{
          backgroundImage: `url('/assets/building_golden.jpg')`,
          opacity: buildingOpacity,
          transform: `scale(${cameraScale}) translateY(${cameraY * 0.3}px)`,
        }}
      />

      {/* Atmospheric Soft Lighting Gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#FAF7F1]/95 via-[#FAF7F1]/30 to-transparent pointer-events-none" />

      {/* ULTRA-MINIMALIST FILM HEADER (Zero Clutter!) */}
      <div className="relative z-20 max-w-7xl mx-auto px-8 sm:px-16 w-full pt-8 flex items-center justify-between">
        {/* Minimal Wordmark with Horizon Crossbar */}
        <div className="relative group cursor-pointer">
          <span className="font-display text-2xl sm:text-3xl tracking-[0.38em] uppercase font-light text-[#312E2A] pl-1">
            A U R E A
          </span>
          <div className="absolute top-[52%] left-0 w-full h-[1.5px] bg-[#D6A03B] opacity-80" />
        </div>

        {/* Single Restrained Navigation Link */}
        <button
          onClick={onOpenModal}
          className="inline-flex items-center gap-3 text-xs font-mono tracking-[0.3em] uppercase text-[#312E2A] border-b border-[#312E2A]/30 pb-1 hover:border-[#D6A03B] hover:text-[#D6A03B] transition-colors"
        >
          <span>Private Presentation</span>
          <ArrowRight className="w-3.5 h-3.5 text-[#D6A03B]" />
        </button>
      </div>

      {/* CENTER EDITORIAL TEXT (Appears cleanly as building materializes) */}
      <div className="relative z-20 max-w-7xl mx-auto px-8 sm:px-16 w-full my-auto flex flex-col justify-center">
        <div
          className="max-w-xl space-y-6 transition-all duration-700"
          style={{
            opacity: scrollProgress < 0.2 ? 0.8 : Math.min(1, (scrollProgress - 0.2) * 2),
            transform: `translateY(${(1 - Math.min(1, scrollProgress * 1.5)) * 20}px)`,
          }}
        >
          <span className="text-xs font-mono tracking-[0.4em] uppercase text-[#AD8557] block">
            ARCHITECTURE SHAPED BY LIGHT
          </span>

          {/* Upright Roman Headline — ZERO ITALICS */}
          <h1 className="hero-monumental-title text-[#312E2A]">
            Designed around <br />
            the horizon.
          </h1>

          <p className="text-sm sm:text-base text-[#312E2A]/85 font-light leading-relaxed max-w-[420px]">
            A living residential landmark by the sea. Where sunlight physically reveals every curved loggia and ocean perspective.
          </p>

          <div className="pt-2">
            <button onClick={onOpenModal} className="btn-arch-line">
              <span>Explore AUREA</span>
              <ArrowRight className="w-4 h-4 text-[#D6A03B]" />
            </button>
          </div>
        </div>
      </div>

      {/* BOTTOM MINIMALIST CINEMATIC STATUS BAR */}
      <div className="relative z-20 max-w-7xl mx-auto px-8 sm:px-16 w-full pb-8 border-t border-[#AD8557]/20 pt-4 flex flex-col sm:flex-row sm:items-center justify-between text-xs font-mono text-[#312E2A] gap-2">
        
        {/* Phase Indicator */}
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-[#D6A03B] shadow-[0_0_10px_#D6A03B] animate-pulse" />
          <span className="text-[#D6A03B] font-bold">{phaseLabel}</span>
          <span className="hidden md:inline text-[10px] text-[#9A7552]">
            — {phaseDesc}
          </span>
        </div>

        {/* Scroll Progress Gauge */}
        <div className="flex items-center gap-3 text-[10px] tracking-widest uppercase text-[#312E2A]/70">
          <span>CINEMATIC REVEAL: {Math.round(scrollProgress * 100)}%</span>
          <span className="w-16 h-[2px] bg-[#AD8557]/30 overflow-hidden relative rounded-full">
            <span
              className="absolute left-0 top-0 bottom-0 bg-[#D6A03B]"
              style={{ width: `${scrollProgress * 100}%` }}
            />
          </span>
        </div>

      </div>
    </section>
  );
}
