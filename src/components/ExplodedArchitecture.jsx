import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Layers, Compass, ArrowUpRight } from 'lucide-react';
import { AUREA_DATA } from '../data';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ExplodedArchitecture() {
  const containerRef = useRef(null);
  const [explosionGap, setExplosionGap] = useState(45);
  const [activeLayerId, setActiveLayerId] = useState('horizon');

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top top',
        end: '+=150%',
        pin: true,
        scrub: 0.8,
        onUpdate: (self) => {
          // Smooth gap progression: starts 0, expands to 70%, then closes back as user finishes section
          const p = self.progress;
          let gap = 0;
          if (p < 0.7) {
            gap = (p / 0.7) * 75;
          } else {
            gap = (1 - (p - 0.7) / 0.3) * 75;
          }
          setExplosionGap(Math.round(gap));
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const activeLayer = AUREA_DATA.explodedLayers.find((l) => l.id === activeLayerId) || AUREA_DATA.explodedLayers[2];

  return (
    <section
      ref={containerRef}
      className="relative w-full h-screen bg-[#F4EFE5] text-[#35322E] flex flex-col justify-between bg-grain overflow-hidden py-10"
    >
      {/* Background Architectural Canvas - NO BOXED CARDS! */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div
          className="w-full h-full max-w-4xl bg-contain bg-center bg-no-repeat transition-transform duration-700 filter drop-shadow-2xl"
          style={{ backgroundImage: `url('/assets/exploded_full.jpg')` }}
        />
      </div>

      {/* Top Section Header */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 w-full flex items-center justify-between">
        <div>
          <span className="text-[10px] tracking-[0.35em] uppercase text-[#9A7552] block font-mono mb-1">
            UAU MOMENT 02 — EXPLODED ARCHITECTURE
          </span>
          <h2 className="font-serif-editorial text-4xl sm:text-6xl text-[#35322E]">
            Every level, <span className="italic text-gold-gradient">a new perspective.</span>
          </h2>
        </div>

        {/* Minimalist Range Controller */}
        <div className="hidden sm:flex items-center gap-3 font-mono text-xs text-[#9A7552]">
          <Layers className="w-4 h-4 text-[#D9A441]" />
          <span>LAYER SEPARATION:</span>
          <span className="text-[#D9A441] font-bold w-8">{explosionGap}%</span>
        </div>
      </div>

      {/* Center Interactive Architectural Hotspot Nodes with Thin Connector Lines */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 w-full h-[55vh] flex items-center justify-between">
        
        {/* Left Side Layer Labels with Connector Lines */}
        <div className="flex flex-col justify-around h-full space-y-4">
          {AUREA_DATA.explodedLayers.map((layer, idx) => {
            const isSelected = activeLayerId === layer.id;
            const offsetY = (idx - 2) * (explosionGap * 0.5);

            return (
              <motion.div
                key={layer.id}
                animate={{ y: offsetY }}
                transition={{ type: 'spring', stiffness: 120, damping: 20 }}
                className="flex items-center gap-4 group cursor-pointer"
                onClick={() => setActiveLayerId(layer.id)}
              >
                <div
                  className={`w-3 h-3 rounded-full border transition-all ${
                    isSelected
                      ? 'bg-[#D9A441] border-[#D9A441] shadow-[0_0_12px_#D9A441] scale-125'
                      : 'bg-[#F4EFE5] border-[#C8A776] group-hover:bg-[#C8A776]'
                  }`}
                />
                
                {/* Thin Connector Line */}
                <div className={`h-[1px] transition-all ${isSelected ? 'w-16 bg-[#D9A441]' : 'w-8 bg-[#C8A776]/40 group-hover:w-12'}`} />

                <div>
                  <span className="block font-mono text-[10px] tracking-widest text-[#9A7552] uppercase">
                    {layer.level}
                  </span>
                  <span className={`font-serif-editorial text-lg sm:text-xl transition-colors ${isSelected ? 'text-[#35322E] font-medium' : 'text-[#35322E]/60 group-hover:text-[#35322E]'}`}>
                    {layer.title}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Right Active Spatial Specs Overlay (No Heavy Box Cards!) */}
        <div className="hidden lg:block max-w-xs text-right space-y-4">
          <span className="text-[10px] tracking-[0.3em] font-mono uppercase text-[#D9A441] block">
            {activeLayer.level}
          </span>
          <h3 className="font-serif-editorial text-3xl text-[#35322E]">
            {activeLayer.title}
          </h3>
          <p className="text-xs text-[#35322E]/80 font-light leading-relaxed border-t border-[#C8A776]/30 pt-3">
            {activeLayer.description}
          </p>
          <div className="space-y-1.5 pt-2">
            {activeLayer.specs.map((spec, i) => (
              <span key={i} className="block text-[10px] tracking-wider uppercase text-[#9A7552] font-mono">
                • {spec}
              </span>
            ))}
          </div>
        </div>

      </div>

      {/* Bottom Minimal Indicator Bar */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 w-full border-t border-[#C8A776]/20 pt-4 flex items-center justify-between text-xs font-mono text-[#9A7552]">
        <span>02 / 04 — SCULPTURAL STAGING</span>
        <span className="uppercase text-[10px] tracking-widest text-[#35322E]">
          {explosionGap > 50 ? 'Layers Separated' : 'Reconstructing Architecture'}
        </span>
      </div>
    </section>
  );
}
