import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Compass, Eye, FileText, ArrowRight, Sun } from 'lucide-react';
import { AUREA_DATA } from '../data';

export default function FloorSelectorSection({ onOpenModal }) {
  const [selectedIdx, setSelectedIdx] = useState(2); // Level 20 default
  const [showPlan, setShowPlan] = useState(false);

  const current = AUREA_DATA.floors[selectedIdx] || AUREA_DATA.floors[2];

  return (
    <section id="floor-selector" className="relative w-full h-screen bg-[#1E2B35] text-[#F7F3EC] bg-grain overflow-hidden flex flex-col justify-between py-10">
      
      {/* Full-bleed Full Viewport Background Perspective Canvas */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`${selectedIdx}-${showPlan}`}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.6 }}
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('${showPlan ? current.plan : current.image}')`,
          }}
        />
      </AnimatePresence>

      {/* Atmospheric Dark Gradient Vignette for Readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#1E2B35]/90 via-[#1E2B35]/30 to-[#1E2B35]/60 pointer-events-none" />

      {/* Top Header Controls */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 w-full flex items-center justify-between">
        <div>
          <span className="text-[10px] tracking-[0.35em] uppercase text-[#D9A441] block font-mono mb-1">
            UAU MOMENT 04 — ALTITUDE PERSPECTIVE
          </span>
          <h2 className="font-serif-editorial text-4xl sm:text-6xl text-[#F7F3EC]">
            Every level changes <span className="italic text-gold-gradient">the view.</span>
          </h2>
        </div>

        {/* Blueprint Toggle Button */}
        <button
          onClick={() => setShowPlan(!showPlan)}
          className="px-5 py-2.5 rounded-full border border-white/20 bg-black/40 backdrop-blur-md text-xs font-mono tracking-widest text-[#F7F3EC] hover:border-[#D9A441] transition-colors flex items-center gap-2"
        >
          <FileText className="w-4 h-4 text-[#D9A441]" />
          <span>{showPlan ? 'Perspective View' : 'Floor Plan Blueprint'}</span>
        </button>
      </div>

      {/* Center Grid: Left Elevator Ruler & Right Integrated Residence Specs */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 w-full grid lg:grid-cols-12 gap-8 items-center">
        
        {/* Left Vertical Elevator Ruler */}
        <div className="lg:col-span-4 border-l-2 border-white/20 pl-6 space-y-3">
          <span className="text-[10px] tracking-[0.3em] uppercase text-[#D9A441] font-mono block mb-2">
            CHOOSE ALTITUDE LEVEL
          </span>

          {AUREA_DATA.floors.map((fl, idx) => {
            const isSelected = selectedIdx === idx;
            return (
              <button
                key={fl.level}
                onClick={() => setSelectedIdx(idx)}
                className={`group w-full text-left flex items-center justify-between p-3 rounded-2xl transition-all duration-300 ${
                  isSelected
                    ? 'bg-black/60 border border-[#D9A441] backdrop-blur-md text-[#F7F3EC] scale-102 translate-x-2'
                    : 'hover:bg-black/30 opacity-70 hover:opacity-100'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-3 h-3 rounded-full transition-all ${
                      isSelected ? 'bg-[#D9A441] shadow-[0_0_12px_#D9A441]' : 'bg-white/40'
                    }`}
                  />
                  <div>
                    <span className="block font-mono text-sm font-bold text-[#F7F3EC]">
                      LEVEL {fl.level < 10 ? `0${fl.level}` : fl.level}
                    </span>
                    <span className="block text-[10px] text-[#A7B6BC] uppercase tracking-wider font-mono">
                      {fl.elevation}
                    </span>
                  </div>
                </div>

                <Eye className={`w-4 h-4 transition-all ${isSelected ? 'text-[#D9A441]' : 'opacity-0 group-hover:opacity-100'}`} />
              </button>
            );
          })}
        </div>

        {/* Right Integrated Residence Specs Callout (Direct on Canvas, No White Cards!) */}
        <div className="lg:col-span-8 flex justify-end">
          <div className="max-w-md p-8 rounded-3xl border border-white/20 bg-black/60 backdrop-blur-xl text-[#F7F3EC] shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-white/15 pb-4">
              <div>
                <span className="text-[10px] tracking-[0.3em] font-mono uppercase text-[#D9A441] block">
                  LEVEL {current.level} VANTAGE
                </span>
                <h3 className="font-serif-editorial text-3xl text-[#F7F3EC]">
                  {current.type}
                </h3>
              </div>
              <Compass className="w-6 h-6 text-[#D9A441]" />
            </div>

            <p className="text-xs text-[#A7B6BC] font-light leading-relaxed">
              {current.view}
            </p>

            <div className="grid grid-cols-2 gap-4 border-t border-b border-white/15 py-4 font-mono text-xs">
              <div>
                <span className="text-[10px] text-[#A7B6BC] block uppercase">BEDROOMS</span>
                <span className="text-sm font-semibold text-[#F7F3EC]">{current.bedrooms} Suites</span>
              </div>
              <div>
                <span className="text-[10px] text-[#A7B6BC] block uppercase">INTERIOR SF</span>
                <span className="text-sm font-semibold text-[#F7F3EC]">{current.interiorSF}</span>
              </div>
              <div>
                <span className="text-[10px] text-[#A7B6BC] block uppercase">TERRACE LOGGIA</span>
                <span className="text-sm font-semibold text-[#F7F3EC]">{current.exteriorSF}</span>
              </div>
              <div>
                <span className="text-[10px] text-[#A7B6BC] block uppercase">TOTAL AREA</span>
                <span className="text-sm font-semibold text-[#D9A441]">{current.totalSF}</span>
              </div>
            </div>

            <button
              onClick={onOpenModal}
              className="w-full py-4 rounded-full bg-[#D9A441] text-[#1E2B35] font-semibold text-xs tracking-widest uppercase hover:bg-[#C8A776] transition-all flex items-center justify-center gap-2 shadow-lg"
            >
              <span>Explore This Residence</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>

      {/* Bottom Status Bar */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 w-full border-t border-white/15 pt-4 flex items-center justify-between text-xs font-mono text-[#A7B6BC]">
        <span>04 / 04 — ALTITUDE VANTAGE CONTROL</span>
        <span className="text-[#D9A441] uppercase tracking-widest">
          {current.elevation}
        </span>
      </div>
    </section>
  );
}
