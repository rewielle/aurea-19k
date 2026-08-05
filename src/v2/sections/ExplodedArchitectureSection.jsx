import React, { useState } from 'react';
import { Layers, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function ExplodedArchitectureSection() {
  const [activeZone, setActiveZone] = useState(2); // Default to Horizon Residences
  const [isExploded, setIsExploded] = useState(true);

  const zones = [
    {
      id: 0,
      name: "ROOFTOP & OBSERVED SKY",
      level: "LEVEL 40",
      height: "155m Elevation",
      desc: "Suspended infinity sky pool, telescope loggia, and private observatory terrace with 360° open horizon perspectives.",
      offsetY: -140
    },
    {
      id: 1,
      name: "THE AUREA HOUSE",
      level: "LEVEL 36 – 39",
      height: "140m Elevation",
      desc: "Four-level penthouse estate with double-height loggia gardens, private pool, and uncompromised sky exclusivity.",
      offsetY: -80
    },
    {
      id: 2,
      name: "SKY RESIDENCES",
      level: "LEVEL 25 – 35",
      height: "100m Elevation",
      desc: "Elevated panoramic suites featuring wrap-around loggia terraces, champagne bronze window framing, and quiet sea privacy.",
      offsetY: -20
    },
    {
      id: 3,
      name: "HORIZON RESIDENCES",
      level: "LEVEL 06 – 24",
      height: "35m Elevation",
      desc: "Panoramic 3 & 4-bedroom oceanfront residences directly aligned with the sea horizon line.",
      offsetY: 40
    },
    {
      id: 4,
      name: "WELLNESS PAVILION",
      level: "LEVEL 03 – 05",
      height: "15m Elevation",
      desc: "Hydrotherapy spa, mineral sauna, heated indoor thermal pool, and state-of-the-art oceanfront fitness sanctuary.",
      offsetY: 90
    },
    {
      id: 5,
      name: "ARRIVAL & LOBBY",
      level: "GROUND LEVEL",
      height: "0m Sea Level",
      desc: "Travertine portico, 9-meter ceiling lobby lounge, private valet, and serene reflection water courtyard.",
      offsetY: 140
    }
  ];

  return (
    <section
      id="exploded"
      className="relative py-32 sm:py-44 bg-[#FAF7F1] text-[#312E2A] bg-grain overflow-hidden border-t border-[#AD8557]/20"
    >
      <div className="max-w-7xl mx-auto px-8 sm:px-16">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <span className="text-[10px] font-mono tracking-[0.35em] uppercase text-[#AD8557] block mb-3 font-semibold">
              UAU MOMENT 02 — EXPLODED ARCHITECTURE
            </span>

            {/* Upright Roman Headline */}
            <h2 className="font-display text-5xl sm:text-7xl text-[#312E2A] leading-[0.95]">
              Every level, <br />
              a new perspective.
            </h2>
          </div>

          <div className="flex items-center gap-4 font-mono text-xs">
            <button
              onClick={() => setIsExploded(!isExploded)}
              className={`px-5 py-2.5 rounded-full border transition-all flex items-center gap-2 ${
                isExploded
                  ? 'bg-[#312E2A] text-[#FAF7F1] border-[#D6A03B] shadow-lg'
                  : 'bg-[#F5F0E8] border-[#AD8557]/30 text-[#312E2A]'
              }`}
            >
              <Layers className="w-4 h-4 text-[#D6A03B]" />
              <span>{isExploded ? 'Collapsed View' : 'Explode Architecture'}</span>
            </button>
          </div>
        </div>

        {/* 2.5D Exploded Architectural Model Canvas */}
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          {/* 2.5D Layer Separation Stage */}
          <div className="lg:col-span-7 relative h-[520px] sm:h-[640px] rounded-3xl overflow-hidden shadow-2xl border border-[#AD8557]/30 bg-[#263A46] flex items-center justify-center p-8">
            <div
              className="absolute inset-0 bg-cover bg-center opacity-40 mix-blend-overlay"
              style={{ backgroundImage: `url('/assets/hero_sea.jpg')` }}
            />

            {/* Render 2.5D Exploded Layers */}
            <div className="relative w-full max-w-md h-full flex flex-col justify-between py-6">
              {zones.map((zone, idx) => (
                <div
                  key={zone.id}
                  onClick={() => setActiveZone(idx)}
                  className={`relative p-4 rounded-xl border transition-all duration-500 cursor-pointer ${
                    activeZone === idx
                      ? 'bg-[#F5F0E8] text-[#312E2A] border-[#D6A03B] shadow-2xl scale-105 z-20'
                      : 'bg-[#1E2B35]/80 text-[#FAF7F1] border-white/10 hover:border-[#D6A03B]/50'
                  }`}
                  style={{
                    transform: isExploded
                      ? `translateY(${zone.offsetY * 0.4}px)`
                      : 'translateY(0px)',
                  }}
                >
                  <div className="flex items-center justify-between font-mono text-[10px]">
                    <span className="text-[#D6A03B] font-bold">{zone.level}</span>
                    <span className="text-[#9A7552]">{zone.height}</span>
                  </div>
                  <h4 className="font-display text-lg text-inherit tracking-wide">
                    {zone.name}
                  </h4>
                </div>
              ))}
            </div>

            {/* Connecting Architectural Axis Line */}
            <div className="absolute top-8 bottom-8 left-12 w-[1.5px] bg-[#D6A03B]/40 pointer-events-none" />
          </div>

          {/* Right Selected Zone Detailed Inspector */}
          <div className="lg:col-span-5 space-y-6 p-8 rounded-3xl bg-[#F5F0E8] border border-[#AD8557]/25 shadow-lg">
            <div className="flex items-center justify-between border-b border-[#AD8557]/20 pb-4 font-mono text-xs">
              <span className="text-[#AD8557] font-bold">{zones[activeZone].level}</span>
              <span className="text-[#9A7552]">{zones[activeZone].height}</span>
            </div>

            <h3 className="font-display text-3xl sm:text-4xl text-[#312E2A]">
              {zones[activeZone].name}
            </h3>

            <p className="text-sm text-[#312E2A]/85 font-light leading-relaxed">
              {zones[activeZone].desc}
            </p>

            <div className="pt-4 border-t border-[#AD8557]/20 space-y-2 font-mono text-xs text-[#312E2A]">
              <div className="flex items-center gap-2 text-[11px]">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#D6A03B]" />
                <span>Full-height low-iron loggia glass windows</span>
              </div>
              <div className="flex items-center gap-2 text-[11px]">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#D6A03B]" />
                <span>Uninterrupted Atlantic Ocean line of sight</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
