import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Sun, Sparkles } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection({ onExplore }) {
  const containerRef = useRef(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top top',
        end: '+=200%',
        pin: true,
        scrub: 0.8,
        onUpdate: (self) => {
          setProgress(self.progress);
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Compute multi-pass emergence layers based on scroll progress (0 to 1)
  // 0.0 - 0.2: Pure Ocean & Sun Light (01 — LIGHT)
  // 0.2 - 0.5: Wireframe Architectural Lines inside mist (02 — FORM)
  // 0.5 - 1.0: Full Building Materialization (03 — AUREA)
  const lineOpacity = progress > 0.15 ? Math.min(1, (progress - 0.15) * 4) : 0;
  const buildingOpacity = progress > 0.35 ? Math.min(1, (progress - 0.35) * 2.2) : 0;
  const seaOpacity = 1 - progress * 0.2;
  const buildingScale = 1.08 - progress * 0.08; // smooth monumental zoom
  const buildingY = (1 - progress) * 30; // rising from landscape

  // Stage state label calculation
  let stageLabel = '01 — LIGHT';
  let stageDesc = 'The first element of architecture.';
  if (progress > 0.35 && progress <= 0.7) {
    stageLabel = '02 — FORM';
    stageDesc = 'The horizon begins to take shape.';
  } else if (progress > 0.7) {
    stageLabel = '03 — AUREA';
    stageDesc = 'A living architecture by the sea.';
  }

  return (
    <section
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden bg-[#F4EFE5] text-[#35322E] flex items-center justify-center"
    >
      {/* Pass 1: Ocean & Sunrise Base Layer */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out"
        style={{
          backgroundImage: `url('/assets/hero_sea.jpg')`,
          opacity: seaOpacity,
        }}
      />

      {/* Pass 2: Architectural Wireframe / Lines inside mist */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-opacity duration-500 pointer-events-none mix-blend-multiply"
        style={{
          backgroundImage: `url('/assets/hero_lines.jpg')`,
          opacity: lineOpacity * (1 - buildingOpacity * 0.7),
          transform: `scale(${buildingScale}) translateY(${buildingY}px)`,
        }}
      />

      {/* Pass 3: Fully Materialized AUREA Tower */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-all duration-300 pointer-events-none"
        style={{
          backgroundImage: `url('/assets/building_golden.jpg')`,
          opacity: buildingOpacity,
          transform: `scale(${buildingScale}) translateY(${buildingY * 0.5}px)`,
        }}
      />

      {/* Dynamic Solar Glow Shimmer overlay */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-700"
        style={{
          background: `radial-gradient(circle at 60% 45%, rgba(217, 164, 65, ${0.2 + progress * 0.25}), transparent 70%)`,
        }}
      />

      {/* Full-bleed Editorial Overlay Content (No Boxed Containers!) */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 w-full h-full flex flex-col justify-between pt-32 pb-12">
        {/* Top Minimal Callouts */}
        <div className="flex items-center justify-between border-b border-[#C8A776]/20 pb-4">
          <div className="flex items-center gap-3">
            <span className="w-8 h-[1px] bg-[#D9A441]" />
            <span className="text-[10px] tracking-[0.35em] uppercase text-[#35322E] font-mono">
              PACIFIC COAST · 2026
            </span>
          </div>

          <div className="flex items-center gap-3 font-mono text-[10px] tracking-[0.25em] text-[#D9A441] uppercase">
            <Sun className="w-3.5 h-3.5 animate-spin-slow text-[#D9A441]" />
            <span>{stageLabel}</span>
          </div>
        </div>

        {/* Center Monumental Headline */}
        <div className="max-w-3xl my-auto transition-opacity duration-500"
          style={{ opacity: Math.max(0.2, 1 - progress * 1.1) }}
        >
          <span className="text-xs tracking-[0.4em] uppercase text-[#9A7552] block mb-3 font-mono">
            ARCHITECTURE SHAPED BY LIGHT
          </span>

          <h1 className="font-serif-editorial text-6xl sm:text-8xl md:text-9xl leading-[0.9] text-[#35322E] font-light mb-6">
            Designed around <br />
            <span className="italic font-normal text-gold-gradient">the horizon.</span>
          </h1>

          <p className="text-sm sm:text-lg text-[#35322E]/80 max-w-xl font-light leading-relaxed mb-8">
            A living architecture shaped by light, sea and perspective. Every level changes the way you see the world.
          </p>
        </div>

        {/* Bottom Minimal Progress Indicator */}
        <div className="flex items-end justify-between border-t border-[#C8A776]/20 pt-4">
          <div className="flex items-center gap-4 text-xs font-mono text-[#9A7552]">
            <span className="text-[#D9A441]">{stageLabel}</span>
            <span className="hidden sm:inline text-[10px] tracking-widest text-[#35322E]/70">
              — {stageDesc}
            </span>
          </div>

          <button
            onClick={onExplore}
            className="flex items-center gap-3 text-xs tracking-[0.25em] uppercase text-[#35322E] hover:text-[#D9A441] transition-colors"
          >
            <span>Scroll to discover</span>
            <ArrowDown className="w-4 h-4 text-[#D9A441] animate-bounce" />
          </button>
        </div>
      </div>
    </section>
  );
}
