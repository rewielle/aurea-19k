import React, { useState } from 'react';
import { ArrowRight, Menu } from 'lucide-react';

export default function MobileHeroV2({ onOpenModal }) {
  const [viewportMode, setViewportMode] = useState('390'); // '390' or '430'

  const width = viewportMode === '390' ? '390px' : '430px';
  const height = viewportMode === '390' ? '844px' : '932px';

  return (
    <div className="py-12 px-4 flex flex-col items-center bg-[#FAF7F1] bg-grain min-h-screen">
      
      {/* Viewport Selector Switcher */}
      <div className="flex items-center gap-3 mb-8 font-mono text-xs">
        <span className="text-[#AD8557] uppercase tracking-widest text-[10px]">MOBILE VIEWPORT:</span>
        <button
          onClick={() => setViewportMode('390')}
          className={`px-4 py-1.5 rounded-full text-xs transition-all ${
            viewportMode === '390' ? 'bg-[#312E2A] text-[#FAF7F1] font-bold' : 'bg-[#F5F0E8] text-[#312E2A]'
          }`}
        >
          390 × 844 (iPhone 14/15)
        </button>
        <button
          onClick={() => setViewportMode('430')}
          className={`px-4 py-1.5 rounded-full text-xs transition-all ${
            viewportMode === '430' ? 'bg-[#312E2A] text-[#FAF7F1] font-bold' : 'bg-[#F5F0E8] text-[#312E2A]'
          }`}
        >
          430 × 932 (iPhone Pro Max)
        </button>
      </div>

      {/* Mobile Device Viewport Canvas */}
      <div
        className="relative overflow-hidden bg-[#FAF7F1] text-[#312E2A] rounded-3xl border-4 border-[#312E2A]/30 shadow-2xl flex flex-col justify-between p-6 transition-all duration-300"
        style={{ width, height }}
      >
        {/* Background Tower Render */}
        <div
          className="absolute inset-0 bg-cover bg-center pointer-events-none"
          style={{ backgroundImage: `url('/assets/building_golden.jpg')` }}
        />

        {/* Solar Horizon Axis Line */}
        <div className="absolute top-[52%] left-0 right-0 h-[1.5px] bg-[#D6A03B] opacity-80 pointer-events-none shadow-[0_0_10px_#D6A03B]" />

        {/* Atmospheric Gradient Vignette for Text Contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#FAF7F1]/90 via-[#FAF7F1]/30 to-[#312E2A]/90 pointer-events-none" />

        {/* Top Minimal Header */}
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

        {/* Center Headline (No Text Overlap on Building) */}
        <div className="relative z-10 my-auto space-y-3 pt-8">
          <span className="text-[10px] font-mono tracking-[0.35em] uppercase text-[#AD8557] block">
            A DAY ABOVE THE HORIZON
          </span>

          {/* Upright Roman Headline — NO ITALICS (58px to 74px) */}
          <h1 className="font-display text-5xl sm:text-6xl text-[#312E2A] leading-[0.95] font-light">
            Designed around <br />
            the horizon.
          </h1>

          <p className="text-xs text-[#312E2A]/85 font-light leading-relaxed max-w-xs">
            Architecture shaped by light, sea and perspective.
          </p>
        </div>

        {/* Bottom Single CTA */}
        <div className="relative z-10 space-y-3 border-t border-white/20 pt-4">
          <button
            onClick={onOpenModal}
            className="w-full py-4 rounded-full bg-[#312E2A] text-[#FAF7F1] font-mono text-xs tracking-widest uppercase flex items-center justify-center gap-2 shadow-lg hover:bg-[#D6A03B] hover:text-[#1E2B35] transition-all"
          >
            <span>Explore AUREA</span>
            <ArrowRight className="w-4 h-4 text-[#D6A03B]" />
          </button>

          <span className="block text-center text-[9px] font-mono tracking-widest uppercase text-white/70">
            DEDICATED MOBILE ART DIRECTION ({viewportMode} VIEWPORT)
          </span>
        </div>
      </div>

    </div>
  );
}
