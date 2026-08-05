import React from 'react';
import { ArrowRight, Menu } from 'lucide-react';

export default function MobileHero({ onOpenModal }) {
  return (
    <div className="relative w-full h-[844px] max-w-[390px] mx-auto overflow-hidden bg-[#FAF7F1] text-[#312E2A] bg-grain rounded-3xl border-4 border-[#312E2A]/20 shadow-2xl flex flex-col justify-between p-6">
      
      {/* Background Tower Render */}
      <div
        className="absolute inset-0 bg-cover bg-center pointer-events-none"
        style={{ backgroundImage: `url('/assets/building_golden.jpg')` }}
      />

      {/* Gradient Overlay for Text Legibility */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#FAF7F1]/90 via-[#FAF7F1]/40 to-[#312E2A]/90 pointer-events-none" />

      {/* Header */}
      <div className="relative z-10 flex items-center justify-between border-b border-[#AD8557]/30 pb-3">
        <div className="relative">
          <span className="font-display text-xl tracking-[0.3em] uppercase font-light pl-1">
            A U R E A
          </span>
          <div className="absolute top-[52%] left-0 w-full h-[1px] bg-[#D6A03B]" />
        </div>

        <button onClick={onOpenModal} className="p-2 text-[#312E2A]">
          <Menu className="w-5 h-5" />
        </button>
      </div>

      {/* Center Monumental Mobile Title */}
      <div className="relative z-10 my-auto space-y-3 pt-12">
        <span className="text-[10px] font-mono tracking-[0.35em] uppercase text-[#AD8557] block">
          A DAY ABOVE THE HORIZON
        </span>

        <h1 className="hero-mobile-title text-[#312E2A]">
          Designed around <br />
          <span className="italic font-normal text-[#AD8557]">the horizon.</span>
        </h1>

        <p className="text-xs text-[#312E2A]/85 font-light leading-relaxed max-w-xs">
          A living architecture shaped by light, sea and perspective.
        </p>
      </div>

      {/* Bottom Single CTA */}
      <div className="relative z-10 space-y-3 border-t border-white/20 pt-4">
        <button
          onClick={onOpenModal}
          className="w-full py-4 rounded-full bg-[#312E2A] text-[#FAF7F1] font-mono text-xs tracking-widest uppercase flex items-center justify-center gap-2 shadow-lg"
        >
          <span>Explore AUREA</span>
          <ArrowRight className="w-4 h-4 text-[#D6A03B]" />
        </button>

        <span className="block text-center text-[9px] font-mono tracking-widest uppercase text-white/70">
          390 × 844 MOBILE VIEWPORT REF
        </span>
      </div>
    </div>
  );
}
