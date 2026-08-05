import React from 'react';
import { ArrowRight } from 'lucide-react';
import MinimalHeader from './MinimalHeader';

export default function HeroCompositionA1({ onOpenModal }) {
  return (
    <div className="relative w-full h-screen overflow-hidden bg-[#FAF7F1] text-[#312E2A] bg-grain">
      
      {/* Minimal Header */}
      <MinimalHeader onOpenModal={onOpenModal} />

      {/* 1. Base Serene Coastal Background (Clean ocean, low sun, no city clutter) */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url('/assets/hero_sea.jpg')` }}
      />

      {/* 2. Monumental AUREA Tower positioned on the right (48% width) */}
      <div
        className="absolute inset-0 bg-cover bg-right-center pointer-events-none transition-transform duration-1000 filter drop-shadow-2xl"
        style={{ backgroundImage: `url('/assets/building_golden.jpg')` }}
      />

      {/* 3. PROPRIETARY SOLAR-HORIZON AXIS LINE */}
      {/* A single solar-horizon axis starts at the sun, travels across ocean water, and connects to the building facade */}
      <div className="absolute top-[52%] left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#D6A03B] to-transparent pointer-events-none opacity-90 shadow-[0_0_15px_#D6A03B]" />

      {/* Atmospheric Soft Vignette */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#FAF7F1]/95 via-[#FAF7F1]/40 to-transparent pointer-events-none" />

      {/* Full-bleed Editorial Content Layout */}
      <div className="relative z-10 max-w-7xl mx-auto px-8 sm:px-16 w-full h-full flex flex-col justify-between pt-36 pb-12">
        
        {/* Top Minimal Callout */}
        <div className="flex items-center justify-between border-b border-[#AD8557]/20 pb-4 font-mono text-[10px] tracking-[0.35em] uppercase text-[#AD8557]">
          <span>COMPOSITION A1 — ARCHITECTURE & SILENCE</span>
          <span>SOLAR-HORIZON AXIS ACTIVE</span>
        </div>

        {/* Left Editorial Text Column (Occupies Left 50% max width) */}
        <div className="max-w-xl my-auto space-y-6">
          <span className="text-xs font-mono tracking-[0.4em] uppercase text-[#AD8557] block">
            A DAY ABOVE THE HORIZON
          </span>

          {/* Upright Roman Display Headline — NO ITALICS */}
          <h1 className="hero-monumental-title text-[#312E2A]">
            Designed around <br />
            the horizon.
          </h1>

          {/* Supporting Copy (Max width 420px) */}
          <p className="text-base text-[#312E2A]/85 font-light leading-relaxed max-w-[420px]">
            Architecture shaped by light, sea and perspective. A living residential landmark where every level changes the way you see the world.
          </p>

          {/* Architectural Line CTA */}
          <div className="pt-4">
            <button onClick={onOpenModal} className="btn-arch-line">
              <span>Explore AUREA</span>
              <ArrowRight className="w-4 h-4 text-[#D6A03B]" />
            </button>
          </div>
        </div>

        {/* Bottom Minimal Indicator Bar */}
        <div className="flex items-end justify-between border-t border-[#AD8557]/20 pt-4 font-mono text-xs text-[#312E2A]">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-[#D6A03B] shadow-[0_0_8px_#D6A03B]" />
            <span className="text-[10px] tracking-widest text-[#AD8557] uppercase">
              1440 × 900 DESKTOP VIEWPORT
            </span>
          </div>

          <span className="text-[10px] tracking-widest uppercase text-[#312E2A]/60">
            Scroll to discover emergence
          </span>
        </div>

      </div>
    </div>
  );
}
