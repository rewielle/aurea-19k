import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { AUREA_DATA } from '../data';

export default function ResidencesSection({ onOpenModal }) {
  const [activeTab, setActiveTab] = useState('horizon');

  const selectedRes = AUREA_DATA.residenceTypes.find((r) => r.id === activeTab) || AUREA_DATA.residenceTypes[0];

  return (
    <section id="residences" className="relative py-32 sm:py-44 bg-[#F7F3EC] text-[#35322E] bg-grain overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#C8A776]/25 pb-10 mb-16 gap-6">
          <div>
            <span className="text-[10px] tracking-[0.35em] uppercase text-[#9A7552] block font-mono mb-2">
              RESIDENTIAL TYPOLOGIES
            </span>
            <h2 className="font-serif-editorial text-5xl sm:text-7xl text-[#35322E] font-light">
              Designed for light. <br />
              <span className="italic text-gold-gradient font-normal">Oriented toward the sea.</span>
            </h2>
          </div>

          {/* Minimalist Typology Tabs */}
          <div className="flex flex-wrap gap-2">
            {AUREA_DATA.residenceTypes.map((res) => (
              <button
                key={res.id}
                onClick={() => setActiveTab(res.id)}
                className={`px-6 py-3 rounded-full text-xs font-mono tracking-widest uppercase transition-all duration-300 ${
                  activeTab === res.id
                    ? 'bg-[#35322E] text-[#F7F3EC] shadow-md'
                    : 'bg-transparent border border-[#C8A776]/40 text-[#35322E] hover:border-[#D9A441]'
                }`}
              >
                {res.name}
              </button>
            ))}
          </div>
        </div>

        {/* Selected Typology Full-bleed Showcase — No Box Cards! */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedRes.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="grid lg:grid-cols-12 gap-12 items-center"
          >
            {/* Render Canvas */}
            <div className="lg:col-span-8 relative h-[450px] sm:h-[560px] rounded-3xl overflow-hidden shadow-2xl group border border-[#C8A776]/30">
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-105"
                style={{ backgroundImage: `url('${selectedRes.image}')` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1E2B35]/80 via-transparent to-transparent" />

              <div className="absolute bottom-8 left-8 right-8 text-[#F7F3EC] flex items-center justify-between font-mono">
                <div>
                  <span className="text-[10px] tracking-[0.3em] uppercase text-[#D9A441] block">
                    {selectedRes.tag}
                  </span>
                  <span className="font-serif-editorial text-3xl text-[#F7F3EC]">
                    {selectedRes.name}
                  </span>
                </div>
                <div className="px-4 py-2 rounded-full border border-white/20 bg-black/40 backdrop-blur-md text-xs text-[#D9A441]">
                  {selectedRes.area}
                </div>
              </div>
            </div>

            {/* Content Specifications */}
            <div className="lg:col-span-4 flex flex-col justify-center space-y-6">
              <span className="text-[10px] tracking-[0.3em] font-mono uppercase text-[#D9A441]">
                {selectedRes.tag}
              </span>
              <h3 className="font-serif-editorial text-3xl sm:text-4xl text-[#35322E]">
                {selectedRes.tagline}
              </h3>
              <p className="text-xs sm:text-sm text-[#35322E]/80 font-light leading-relaxed border-t border-b border-[#C8A776]/20 py-4">
                {selectedRes.description}
              </p>

              <div className="space-y-2.5 font-mono text-xs text-[#35322E]">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#D9A441]" />
                  <span>Frameless curved balcony loggias</span>
                </div>
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#D9A441]" />
                  <span>Integrated travertine & oak finishes</span>
                </div>
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#D9A441]" />
                  <span>Private elevator landing</span>
                </div>
              </div>

              <button
                onClick={onOpenModal}
                className="w-full py-4 rounded-full bg-[#35322E] text-[#F7F3EC] font-semibold text-xs tracking-widest uppercase hover:bg-[#D9A441] hover:text-[#1E2B35] transition-all flex items-center justify-center gap-2 shadow-md"
              >
                <span>Request Typology Book</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  );
}
