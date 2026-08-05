import React, { useState } from 'react';
import { Compass, Layers } from 'lucide-react';
import { AUREA_DATA } from '../data';

export default function ArchitecturalConcept({ onSelectPhase }) {
  const [selectedMaterial, setSelectedMaterial] = useState(0);
  const [activeSolarIndex, setActiveSolarIndex] = useState(2); // Golden Hour default

  return (
    <section id="architecture" className="relative py-32 sm:py-44 bg-[#F7F3EC] text-[#35322E] bg-grain overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        
        {/* Full-width Editorial Header */}
        <div className="grid lg:grid-cols-12 gap-12 items-end pb-20 border-b border-[#C8A776]/25">
          <div className="lg:col-span-8">
            <span className="text-[10px] tracking-[0.35em] uppercase text-[#9A7552] mb-4 block font-mono">
              THE CONCEPT
            </span>
            <h2 className="font-serif-editorial text-5xl sm:text-7xl text-[#35322E] leading-[0.95] font-light">
              Architecture shaped <br />
              <span className="italic text-gold-gradient font-normal">by sunlight & horizon.</span>
            </h2>
          </div>

          <div className="lg:col-span-4">
            <p className="text-sm sm:text-base text-[#35322E]/80 font-light leading-relaxed mb-6">
              AUREA is a dialogue between architecture, sunlight and horizon. Every surface, opening and residence responds to the rhythm of the ocean day.
            </p>
            <div className="flex items-center gap-6 text-xs text-[#9A7552] font-mono">
              <span className="flex items-center gap-2">
                <Compass className="w-4 h-4 text-[#D9A441]" /> Pacific Orient
              </span>
              <span className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-[#D9A441]" /> Mineral Facade
              </span>
            </div>
          </div>
        </div>

        {/* Solar Trajectory Progression Arc */}
        <div className="py-20">
          <div className="flex items-center justify-between mb-12">
            <span className="text-[10px] tracking-[0.3em] font-mono uppercase text-[#9A7552]">
              THE DAILY ATMOSPHERIC CYCLE
            </span>
            <span className="text-xs text-[#35322E] font-serif-editorial italic">
              Select sun position to experience the lighting transition
            </span>
          </div>

          {/* Interactive Arc line */}
          <div className="relative w-full max-w-5xl mx-auto py-8">
            <div className="relative w-full h-28 flex items-center justify-center">
              <svg className="w-full h-full" viewBox="0 0 600 120" fill="none">
                <path
                  d="M 20 110 Q 300 -20 580 110"
                  stroke="#C8A776"
                  strokeWidth="1.5"
                  strokeDasharray="4 4"
                  opacity="0.6"
                />
              </svg>

              {/* Sun Nodes on Arc */}
              <div className="absolute inset-0 flex items-end justify-between px-4 sm:px-12 pb-2">
                {AUREA_DATA.solarPhases.map((phase, idx) => (
                  <button
                    key={phase.id}
                    onClick={() => {
                      setActiveSolarIndex(idx);
                      if (onSelectPhase) onSelectPhase(phase);
                    }}
                    className={`group flex flex-col items-center gap-2 transition-all duration-300 ${
                      activeSolarIndex === idx ? 'scale-110' : 'opacity-60 hover:opacity-100'
                    }`}
                  >
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                        activeSolarIndex === idx
                          ? 'bg-[#D9A441] text-[#1E2B35] shadow-[0_0_25px_#D9A441]'
                          : 'bg-[#F4EFE5] border border-[#C8A776] text-[#35322E]'
                      }`}
                    >
                      <div className="w-2.5 h-2.5 rounded-full bg-current" />
                    </div>
                    <span className="text-[10px] tracking-widest uppercase font-mono font-semibold text-[#35322E]">
                      {phase.name}
                    </span>
                    <span className="text-[9px] font-mono text-[#9A7552]">{phase.time}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Tactile Material Palette Section — No Card Containers! */}
        <div className="pt-16 border-t border-[#C8A776]/20">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-4">
              <span className="text-[10px] tracking-[0.3em] font-mono uppercase text-[#9A7552] block mb-2">
                MATERIAL LANGUAGE
              </span>
              <h3 className="font-serif-editorial text-3xl sm:text-4xl text-[#35322E]">
                Crafted from stone, glass & bronze.
              </h3>
              <p className="text-xs sm:text-sm text-[#35322E]/80 mt-3 font-light leading-relaxed">
                Selected natural minerals absorb and reflect solar angles throughout the coastal day.
              </p>
            </div>

            {/* Material Swatches */}
            <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-5 gap-6">
              {AUREA_DATA.materials.map((mat, idx) => (
                <button
                  key={mat.name}
                  onClick={() => setSelectedMaterial(idx)}
                  className={`text-left space-y-3 transition-all duration-300 ${
                    selectedMaterial === idx ? 'opacity-100 scale-105' : 'opacity-60 hover:opacity-100'
                  }`}
                >
                  <div
                    className="w-full h-28 rounded-2xl border border-[#C8A776]/30 shadow-md"
                    style={{ backgroundColor: mat.color }}
                  />
                  <div>
                    <span className="block text-xs font-semibold text-[#35322E]">
                      {mat.name}
                    </span>
                    <span className="block text-[10px] text-[#9A7552] font-light leading-tight">
                      {mat.description}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
