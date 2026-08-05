import React, { useState } from 'react';
import { Compass, ChevronRight, Sun } from 'lucide-react';

export default function ConceptSection() {
  const [solarAngle, setSolarAngle] = useState(45);

  return (
    <section
      id="concept"
      className="relative py-32 sm:py-44 bg-[#F5F0E8] text-[#312E2A] bg-grain overflow-hidden border-t border-[#AD8557]/20 z-20"
    >
      <div className="max-w-7xl mx-auto px-8 sm:px-16">
        
        {/* Eyebrow & Headline */}
        <div className="grid lg:grid-cols-12 gap-12 items-center mb-20">
          <div className="lg:col-span-7 space-y-4">
            <span className="text-[10px] font-mono tracking-[0.35em] uppercase text-[#AD8557] block font-semibold">
              SECTION 01 — THE CONCEPT
            </span>

            {/* Upright Roman Headline */}
            <h2 className="font-display text-5xl sm:text-7xl text-[#312E2A] leading-[0.95]">
              Architecture <br />
              shaped by light.
            </h2>
          </div>

          <div className="lg:col-span-5 space-y-6">
            <p className="text-base sm:text-lg text-[#312E2A]/85 font-light leading-relaxed">
              AUREA was conceived as a dialogue between sunlight, material and horizon. Every surface, opening and loggia responds to the natural rhythm of the day.
            </p>

            <div className="pt-4 border-t border-[#AD8557]/20 flex items-center gap-6 text-xs font-mono text-[#9A7552]">
              <span className="flex items-center gap-2">
                <Compass className="w-4 h-4 text-[#D6A03B]" /> Atlantic Ocean Coast
              </span>
              <span className="flex items-center gap-2">
                <ChevronRight className="w-4 h-4 text-[#D6A03B]" /> 40 Residential Levels
              </span>
            </div>
          </div>
        </div>

        {/* Full-width Architectural Image Composition with Interactive Solar Trajectory */}
        <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-[#AD8557]/30 bg-[#263A46]">
          <div
            className="relative h-[480px] sm:h-[620px] bg-cover bg-center transition-all duration-700"
            style={{
              backgroundImage: `url('/assets/building_sunrise.jpg')`,
              filter: `contrast(${100 + (solarAngle - 45) * 0.2}%) brightness(${100 + (solarAngle - 45) * 0.15}%)`,
            }}
          >
            {/* Dynamic Solar Ray overlay responding to trajectory slider */}
            <div
              className="absolute inset-0 pointer-events-none transition-opacity duration-300"
              style={{
                background: `radial-gradient(circle at ${solarAngle}% 20%, rgba(214, 160, 59, 0.35) 0%, transparent 60%)`,
              }}
            />

            {/* Soft Editorial Vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#312E2A]/90 via-transparent to-transparent pointer-events-none" />

            {/* Solar Trajectory Control Bar */}
            <div className="absolute bottom-8 left-8 right-8 p-6 rounded-2xl bg-black/60 backdrop-blur-md border border-white/20 text-[#FAF7F1] flex flex-col md:flex-row md:items-center justify-between gap-4 font-mono text-xs">
              <div className="flex items-center gap-3">
                <Sun className="w-4 h-4 text-[#D6A03B] animate-spin" style={{ animationDuration: '20s' }} />
                <div>
                  <span className="text-[#D6A03B] font-bold block text-[10px] tracking-widest uppercase">SOLAR TRAJECTORY CONTROL</span>
                  <span className="text-white/80 text-[11px]">Daylight Angle: {solarAngle}° East to West</span>
                </div>
              </div>

              <div className="flex items-center gap-4 w-full md:w-64">
                <span className="text-[10px] text-white/60">06:00</span>
                <input
                  type="range"
                  min="10"
                  max="90"
                  value={solarAngle}
                  onChange={(e) => setSolarAngle(Number(e.target.value))}
                  className="w-full accent-[#D6A03B] cursor-pointer"
                />
                <span className="text-[10px] text-white/60">18:00</span>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
