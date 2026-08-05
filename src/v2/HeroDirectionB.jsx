import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Eye, Layers } from 'lucide-react';
import MinimalHeader from './MinimalHeader';

export default function HeroDirectionB({ onOpenModal }) {
  const [frameIndex, setFrameIndex] = useState(1); // 0: Balcony Glass, 1: Living Suite
  const [showStoryboard, setShowStoryboard] = useState(false);

  const frames = [
    {
      id: 0,
      label: 'FRAME 01 — BALCONY FAÇADE',
      desc: 'Curved balcony glass, reflected ocean sunset, suspended above sea.',
      image: '/assets/balcony_glass.jpg',
    },
    {
      id: 1,
      label: 'FRAME 02 — PANORAMIC LIVING SUITE',
      desc: 'Seamless camera entrance into living room, travertine walls, floor-to-ceiling glass aligned to ocean horizon.',
      image: '/assets/interior_living.jpg',
    },
  ];

  const currentFrame = frames[frameIndex];

  return (
    <div className="relative w-full h-screen overflow-hidden bg-[#263A46] text-[#FAF7F1] bg-grain">
      
      {/* Minimal Header */}
      <MinimalHeader onOpenModal={onOpenModal} darkTheme={true} />

      {/* Background Canvas Layer */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentFrame.id}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('${currentFrame.image}')` }}
        />
      </AnimatePresence>

      {/* Golden Sunset Ray Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#263A46] via-transparent to-[#263A46]/40 pointer-events-none" />

      {/* Full-bleed Content Layout */}
      <div className="relative z-10 max-w-7xl mx-auto px-8 sm:px-16 w-full h-full flex flex-col justify-between pt-36 pb-12">
        
        {/* Top Direction Indicator */}
        <div className="flex items-center justify-between border-b border-white/20 pb-4 font-mono text-[10px] tracking-[0.3em] uppercase text-[#D6A03B]">
          <span>HERO DIRECTION B — ENTER THE HORIZON</span>
          <span>CURRENT: {currentFrame.label}</span>
        </div>

        {/* Center Content */}
        <div className="max-w-3xl my-auto space-y-6">
          <span className="text-xs font-mono tracking-[0.4em] uppercase text-[#D6A03B] block">
            CONTINUOUS SPATIAL PASSAGE
          </span>

          <h1 className="hero-monumental-title text-[#FAF7F1]">
            The horizon <br />
            <span className="italic font-normal text-[#D6A03B]">begins inside.</span>
          </h1>

          <p className="text-base sm:text-lg text-[#FAF7F1]/85 font-light leading-relaxed max-w-xl">
            A living architecture created around light, privacy and perspective. Frameless glass walls open seamlessly onto the endless Pacific sea.
          </p>

          <div className="pt-4 flex items-center gap-8">
            <button
              onClick={onOpenModal}
              className="inline-flex items-center gap-4 text-xs font-mono tracking-[0.3em] uppercase text-[#FAF7F1] border-b border-[#D6A03B] pb-1 hover:text-[#D6A03B] transition-colors"
            >
              <span>Enter AUREA</span>
              <ArrowRight className="w-4 h-4 text-[#D6A03B]" />
            </button>
          </div>
        </div>

        {/* Bottom Interactive Frame Switcher & Storyboard Trigger */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between border-t border-white/20 pt-4 gap-4 font-mono text-xs text-[#FAF7F1]">
          
          {/* Frame State Controls */}
          <div className="flex items-center gap-3">
            <span className="text-[10px] text-[#D6A03B] uppercase tracking-widest">STATE:</span>
            {frames.map((f, i) => (
              <button
                key={f.id}
                onClick={() => setFrameIndex(i)}
                className={`px-3 py-1 rounded-full text-[10px] tracking-wider transition-all ${
                  frameIndex === i
                    ? 'bg-[#D6A03B] text-[#1E2B35] font-bold'
                    : 'bg-black/40 border border-white/30 text-[#FAF7F1] hover:border-[#D6A03B]'
                }`}
              >
                {i === 0 ? '01 EXTERIOR GLASS' : '02 INTERIOR SUITE'}
              </button>
            ))}
          </div>

          {/* Motion Storyboard Button */}
          <button
            onClick={() => setShowStoryboard(!showStoryboard)}
            className="flex items-center gap-2 text-[10px] tracking-widest uppercase text-[#D6A03B] hover:text-white transition-colors"
          >
            <Layers className="w-3.5 h-3.5" />
            <span>{showStoryboard ? 'Hide Storyboard' : 'View Motion Storyboard (6 Frames)'}</span>
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
            className="absolute inset-x-8 bottom-24 z-50 p-6 rounded-3xl bg-[#263A46]/95 backdrop-blur-xl border border-white/20 shadow-2xl space-y-4 text-[#FAF7F1]"
          >
            <div className="flex items-center justify-between border-b border-white/15 pb-3 font-mono text-xs">
              <span className="text-[#D6A03B] uppercase tracking-widest font-bold">
                MOTION STORYBOARD — DIRECTION B (6 SINGLE-SHOT FRAMES)
              </span>
              <button onClick={() => setShowStoryboard(false)} className="text-xs uppercase text-[#FAF7F1] hover:text-[#D6A03B]">
                Close
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-[10px] font-mono text-[#FAF7F1]">
              {[
                'Frame 01: Exterior balcony edge & sea sunset',
                'Frame 02: Camera slowly zooms toward curved glass',
                'Frame 03: Sun glare sweeps across glass pane',
                'Frame 04: Refraction drops, glass becomes transparent',
                'Frame 05: Camera crosses threshold into living room',
                'Frame 06: Settles inside living suite, horizon aligned',
              ].map((step, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-black/40 border border-white/15 space-y-1">
                  <span className="text-[#D6A03B] font-bold block">{idx + 1}.</span>
                  <p className="leading-tight text-[#FAF7F1]/80">{step}</p>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
