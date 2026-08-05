import React, { useState } from 'react';
import { Eye, ArrowRight, Sun } from 'lucide-react';

export default function ExteriorInteriorSection() {
  const [passageProgress, setPassageProgress] = useState(0); // 0 (Exterior) to 100 (Interior)

  // 0 = Full Exterior Balcony, 100 = Full Interior Living Suite
  const exteriorOpacity = Math.max(0, 1 - passageProgress / 70);
  const interiorOpacity = Math.min(1, passageProgress / 50);

  return (
    <section
      id="exterior-interior"
      className="relative py-32 sm:py-44 bg-[#EFE9DF] text-[#312E2A] bg-grain overflow-hidden border-t border-[#AD8557]/20"
    >
      <div className="max-w-7xl mx-auto px-8 sm:px-16">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <span className="text-[10px] font-mono tracking-[0.35em] uppercase text-[#AD8557] block mb-3 font-semibold">
              UAU MOMENT 03 — EXTERIOR TO INTERIOR
            </span>

            {/* Upright Roman Headline */}
            <h2 className="font-display text-5xl sm:text-7xl text-[#312E2A] leading-[0.95]">
              The horizon <br />
              begins inside.
            </h2>
          </div>

          <p className="text-sm text-[#312E2A]/85 font-light max-w-md leading-relaxed">
            Every residence was positioned to preserve privacy, natural light and an uninterrupted relationship with the sea.
          </p>
        </div>

        {/* Continuous Spatial Passage Canvas */}
        <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-[#AD8557]/30 bg-[#263A46] h-[520px] sm:h-[650px]">
          
          {/* Layer 1: Exterior Balcony Glass */}
          <div
            className="absolute inset-0 bg-cover bg-center transition-opacity duration-500"
            style={{
              backgroundImage: `url('/assets/balcony_glass.jpg')`,
              opacity: exteriorOpacity,
              transform: `scale(${1.05 - (passageProgress / 100) * 0.05})`,
            }}
          />

          {/* Layer 2: Panoramic Oceanfront Interior Suite */}
          <div
            className="absolute inset-0 bg-cover bg-center transition-opacity duration-500"
            style={{
              backgroundImage: `url('/assets/interior_living.jpg')`,
              opacity: interiorOpacity,
              transform: `scale(${1.0 + (passageProgress / 100) * 0.05})`,
            }}
          />

          {/* Soft Editorial Vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#312E2A]/85 via-transparent to-transparent pointer-events-none" />

          {/* Interactive Passage Slider Bar */}
          <div className="absolute bottom-8 left-8 right-8 p-6 rounded-2xl bg-black/60 backdrop-blur-md border border-white/20 text-[#FAF7F1] flex flex-col md:flex-row md:items-center justify-between gap-4 font-mono text-xs">
            <div className="flex items-center gap-3">
              <Eye className="w-5 h-5 text-[#D6A03B]" />
              <div>
                <span className="text-[#D6A03B] font-bold block text-[10px] tracking-widest uppercase">
                  SPATIAL FAÇADE PASSAGE
                </span>
                <span className="text-white/90 text-sm font-display">
                  {passageProgress < 40 ? 'Exterior Loggia Balcony' : passageProgress > 70 ? 'Panoramic Ocean Suite Interior' : 'Crossing Balcony Glass Façade'}
                </span>
              </div>
            </div>

            {/* Interactive Slider */}
            <div className="flex items-center gap-4 w-full md:w-80">
              <span className="text-[10px] text-white/60 uppercase">EXTERIOR</span>
              <input
                type="range"
                min="0"
                max="100"
                value={passageProgress}
                onChange={(e) => setPassageProgress(Number(e.target.value))}
                className="w-full accent-[#D6A03B] cursor-pointer"
              />
              <span className="text-[10px] text-white/60 uppercase">INTERIOR</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
