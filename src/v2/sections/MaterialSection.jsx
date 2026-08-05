import React, { useState } from 'react';
import { Layers, Sparkles } from 'lucide-react';

export default function MaterialSection() {
  const [activeMat, setActiveMat] = useState(0);

  const materials = [
    {
      id: 0,
      name: "Roman Travertine",
      type: "FACADE & GROUND PIERS",
      desc: "Warm mineral limestone with linear vein-cut texture. Absorbs morning solar light and radiates warmth into loggia spaces.",
      image: "/assets/building_golden.jpg"
    },
    {
      id: 1,
      name: "Champagne Bronze",
      type: "LOGGIA & RAILING RHYTHM",
      desc: "Anodized champagne bronze extrusions framing balcony edges and reflecting ocean sunrise highlights.",
      image: "/assets/balcony_glass.jpg"
    },
    {
      id: 2,
      name: "Low-Iron Architectural Glass",
      type: "FULL-HEIGHT LOGGIA PANES",
      desc: "Ultra-clear acoustic double-glazed panes with minimal reflection distortion for uninterrupted horizon vistas.",
      image: "/assets/interior_living.jpg"
    },
    {
      id: 3,
      name: "Bleached Pale Oak",
      type: "INTERIOR SUITE FLOORING",
      desc: "Wide-plank European pale oak flooring bringing soft organic warmth to interior living and dining suites.",
      image: "/assets/interior_living.jpg"
    }
  ];

  return (
    <section
      id="materials"
      className="relative py-32 sm:py-44 bg-[#EFE9DF] text-[#312E2A] bg-grain overflow-hidden border-t border-[#AD8557]/20"
    >
      <div className="max-w-7xl mx-auto px-8 sm:px-16">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <span className="text-[10px] font-mono tracking-[0.35em] uppercase text-[#AD8557] block mb-3 font-semibold">
              SECTION 02 — MATERIAL LANGUAGE
            </span>

            {/* Upright Roman Headline */}
            <h2 className="font-display text-5xl sm:text-7xl text-[#312E2A] leading-[0.95]">
              Light gives <br />
              material its character.
            </h2>
          </div>

          <p className="text-sm text-[#312E2A]/75 font-light max-w-sm">
            Selected mineral stone, champagne bronze and clear glass interacting with ocean light throughout the day.
          </p>
        </div>

        {/* Full-width Material Showcase Canvas */}
        <div className="grid lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Active Material Preview */}
          <div className="lg:col-span-8 relative h-[450px] sm:h-[550px] rounded-3xl overflow-hidden shadow-2xl border border-[#AD8557]/30 bg-[#263A46]">
            <div
              className="absolute inset-0 bg-cover bg-center transition-all duration-700 filter drop-shadow-xl"
              style={{ backgroundImage: `url('${materials[activeMat].image}')` }}
            />

            <div className="absolute inset-0 bg-gradient-to-t from-[#312E2A]/90 via-transparent to-transparent pointer-events-none" />

            <div className="absolute bottom-8 left-8 right-8 p-6 rounded-2xl bg-black/60 backdrop-blur-md border border-white/20 text-[#FAF7F1] flex justify-between items-center font-mono text-xs">
              <div>
                <span className="text-[#D6A03B] font-bold block text-[10px] tracking-widest uppercase">
                  {materials[activeMat].type}
                </span>
                <span className="text-lg font-display text-white font-normal">
                  {materials[activeMat].name}
                </span>
              </div>
              <Sparkles className="w-5 h-5 text-[#D6A03B]" />
            </div>
          </div>

          {/* Right Material Selection Drawer */}
          <div className="lg:col-span-4 space-y-4">
            {materials.map((mat, idx) => (
              <div
                key={mat.id}
                onClick={() => setActiveMat(idx)}
                className={`p-6 rounded-2xl border transition-all cursor-pointer ${
                  activeMat === idx
                    ? 'bg-[#F5F0E8] border-[#D6A03B] shadow-md ring-1 ring-[#D6A03B]'
                    : 'bg-white/40 border-[#AD8557]/20 hover:bg-[#F5F0E8]/50'
                }`}
              >
                <div className="flex items-center justify-between mb-2 font-mono text-[10px]">
                  <span className="text-[#AD8557] font-semibold">{mat.type}</span>
                  <span className="text-[#9A7552]">0{idx + 1}</span>
                </div>

                <h3 className="font-display text-2xl text-[#312E2A] mb-2">
                  {mat.name}
                </h3>

                <p className="text-xs text-[#312E2A]/80 font-light leading-relaxed">
                  {mat.desc}
                </p>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
