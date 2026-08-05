import React from 'react';
import { ArrowRight } from 'lucide-react';
import MinimalHeader from './MinimalHeader';

export default function HeroCompositionA2({ onOpenModal }) {
  return (
    <div className="relative w-full h-screen overflow-hidden bg-[#FAF7F1] text-[#312E2A] bg-grain">
      
      {/* Minimal Header */}
      <MinimalHeader onOpenModal={onOpenModal} />

      {/* Layer 1: Atmospheric Ocean Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url('/assets/hero_sea.jpg')` }}
      />

      {/* Layer 2: Monumental Wordmark Extending Across Canvas */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
        <span className="font-display text-[14vw] sm:text-[18vw] tracking-[0.25em] text-[#312E2A]/15 uppercase font-light leading-none pl-[0.25em]">
          AUREA
        </span>
      </div>

      {/* Layer 3: Proprietary Solar-Horizon Axis Line */}
      <div className="absolute top-[52%] left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#D6A03B] to-transparent pointer-events-none opacity-90 shadow-[0_0_15px_#D6A03B]" />

      {/* Layer 4: Monumental AUREA Tower */}
      <div
        className="absolute inset-0 bg-cover bg-right-center pointer-events-none filter drop-shadow-2xl opacity-95"
        style={{ backgroundImage: `url('/assets/building_golden.jpg')` }}
      />

      {/* Vignette Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#FAF7F1]/90 via-[#FAF7F1]/30 to-transparent pointer-events-none" />

      {/* Layer 5: Foreground Interface */}
      <div className="relative z-10 max-w-7xl mx-auto px-8 sm:px-16 w-full h-full flex flex-col justify-between pt-36 pb-12">
        
        {/* Top Minimal Callout */}
        <div className="flex items-center justify-between border-b border-[#AD8557]/20 pb-4 font-mono text-[10px] tracking-[0.35em] uppercase text-[#AD8557]">
          <span>COMPOSITION A2 — MONUMENTAL WORDMARK</span>
          <span>SPATIAL TYPOGRAPHIC LAYERING</span>
        </div>

        {/* Restrained Headline Column */}
        <div className="max-w-md my-auto space-y-6">
          <span className="text-xs font-mono tracking-[0.4em] uppercase text-[#AD8557] block">
            CONCEPTUAL OCEANFRONT RESIDENCES
          </span>

          {/* Upright Roman Headline — NO ITALICS */}
          <h1 className="font-display text-5xl sm:text-7xl text-[#312E2A] leading-[0.95] font-light">
            Designed around <br />
            the horizon.
          </h1>

          <p className="text-sm text-[#312E2A]/85 font-light leading-relaxed max-w-sm">
            Architecture shaped by sunlight, water reflection and elevated perspective.
          </p>

          <div className="pt-2">
            <button onClick={onOpenModal} className="btn-arch-line">
              <span>Explore AUREA</span>
              <ArrowRight className="w-4 h-4 text-[#D6A03B]" />
            </button>
          </div>
        </div>

        {/* Bottom Status Bar */}
        <div className="flex items-end justify-between border-t border-[#AD8557]/20 pt-4 font-mono text-xs text-[#312E2A]">
          <span className="text-[10px] tracking-widest text-[#AD8557] uppercase">
            1440 × 900 EXPERIMENTAL EDITORIAL
          </span>
          <span className="text-[10px] tracking-widest uppercase text-[#312E2A]/60">
            Layer 02: Monumental Brand · Layer 04: Tower Landmark
          </span>
        </div>

      </div>
    </div>
  );
}
