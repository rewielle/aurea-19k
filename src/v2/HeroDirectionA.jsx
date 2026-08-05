import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Play, Layers } from 'lucide-react';
import MinimalHeader from './MinimalHeader';

export default function HeroDirectionA({ onOpenModal }) {
  const [frameIndex, setFrameIndex] = useState(2); // 0: Sea, 1: Lines, 2: Monumental Tower
  const [showStoryboard, setShowStoryboard] = useState(false);

  const frames = [
    {
      id: 0,
      label: 'FRAME 01 — DAWN SEA',
      desc: 'Calm ocean horizon, low sun near waterline, pearl mist, architectural absence.',
      image: '/assets/hero_sea.jpg',
    },
    {
      id: 1,
      label: 'FRAME 02 — SUN LINES',
      desc: 'Translucent architectural wireframe core emerging inside morning solar light.',
      image: '/assets/hero_lines.jpg',
    },
    {
      id: 2,
      label: 'FRAME 03 — MONUMENTAL TOWER',
      desc: 'AUREA tower fully materialized occupying 45% of desktop composition with curved glass reflections.',
      image: '/assets/building_golden.jpg',
    },
  ];

  const currentFrame = frames[frameIndex];

  return (
    <div className="relative w-full h-screen overflow-hidden bg-[#FAF7F1] text-[#312E2A] bg-grain">
      
      {/* Minimal Header */}
      <MinimalHeader onOpenModal={onOpenModal} />

      {/* Background Canvas Layer */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentFrame.id}
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('${currentFrame.image}')` }}
        />
      </AnimatePresence>

      {/* Solar Flare Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#FAF7F1] via-transparent to-[#FAF7F1]/30 pointer-events-none" />

      {/* Full-bleed Content Layout */}
      <div className="relative z-10 max-w-7xl mx-auto px-8 sm:px-16 w-full h-full flex flex-col justify-between pt-36 pb-12">
        
        {/* Top Direction Indicator */}
        <div className="flex items-center justify-between border-b border-[#AD8557]/20 pb-4 font-mono text-[10px] tracking-[0.3em] uppercase text-[#AD8557]">
          <span>HERO DIRECTION A — BORN FROM LIGHT</span>
          <span>CURRENT: {currentFrame.label}</span>
        </div>

        {/* Center Monumental Content */}
        <div className="max-w-3xl my-auto space-y-6">
          <span className="text-xs font-mono tracking-[0.4em] uppercase text-[#AD8557] block">
            A DAY ABOVE THE HORIZON
          </span>

          <h1 className="hero-monumental-title text-[#312E2A]">
            Designed around <br />
            <span className="italic font-normal text-[#AD8557]">the horizon.</span>
          </h1>

          <p className="text-base sm:text-lg text-[#312E2A]/85 font-light leading-relaxed max-w-xl">
            Architecture shaped by light, sea and perspective. A living residential landmark where every level changes the way you see the world.
          </p>

          <div className="pt-4 flex items-center gap-8">
            <button onClick={onOpenModal} className="btn-arch-line">
              <span>Explore AUREA</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Bottom Interactive Frame Switcher & Storyboard Trigger */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between border-t border-[#AD8557]/20 pt-4 gap-4 font-mono text-xs text-[#312E2A]">
          
          {/* Frame State Controls */}
          <div className="flex items-center gap-3">
            <span className="text-[10px] text-[#AD8557] uppercase tracking-widest">STATE:</span>
            {frames.map((f, i) => (
              <button
                key={f.id}
                onClick={() => setFrameIndex(i)}
                className={`px-3 py-1 rounded-full text-[10px] tracking-wider transition-all ${
                  frameIndex === i
                    ? 'bg-[#312E2A] text-[#FAF7F1] font-bold'
                    : 'bg-[#F5F0E8] border border-[#AD8557]/30 text-[#312E2A] hover:border-[#D6A03B]'
                }`}
              >
                {i === 0 ? '01 SUN/SEA' : i === 1 ? '02 LINES' : '03 TOWER'}
              </button>
            ))}
          </div>

          {/* Motion Storyboard Button */}
          <button
            onClick={() => setShowStoryboard(!showStoryboard)}
            className="flex items-center gap-2 text-[10px] tracking-widest uppercase text-[#AD8557] hover:text-[#312E2A] transition-colors"
          >
            <Layers className="w-3.5 h-3.5" />
            <span>{showStoryboard ? 'Hide Storyboard' : 'View Motion Storyboard (8 Frames)'}</span>
          </button>
        </div>
      </div>

      {/* Storyboard Modal Overlay */}
      <AnimatePresence>
        {showStoryboard && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="absolute inset-x-8 bottom-24 z-50 p-6 rounded-3xl bg-[#FAF7F1]/95 backdrop-blur-xl border border-[#AD8557]/30 shadow-2xl space-y-4"
          >
            <div className="flex items-center justify-between border-b border-[#AD8557]/20 pb-3 font-mono text-xs">
              <span className="text-[#AD8557] uppercase tracking-widest font-bold">
                MOTION STORYBOARD — DIRECTION A (8 SCROLL FRAMES)
              </span>
              <button onClick={() => setShowStoryboard(false)} className="text-xs uppercase text-[#312E2A] hover:text-[#AD8557]">
                Close
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-[10px] font-mono text-[#312E2A]">
              {[
                'Frame 01: Pure sun, ocean & atmosphere',
                'Frame 02: Vertical solar reflection',
                'Frame 03: Structural lines inside mist',
                'Frame 04: Translucent balcony curves',
                'Frame 05: Travertine & bronze materialize',
                'Frame 06: AUREA tower fully formed',
                'Frame 07: Sunlight travels across glass',
                'Frame 08: Title recedes, tower dominates',
              ].map((step, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-[#F5F0E8] border border-[#AD8557]/20 space-y-1">
                  <span className="text-[#D6A03B] font-bold block">{idx + 1}.</span>
                  <p className="leading-tight text-[#312E2A]/80">{step}</p>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
