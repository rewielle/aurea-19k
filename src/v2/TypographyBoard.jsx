import React from 'react';
import { ArrowRight, Compass } from 'lucide-react';

export default function TypographyBoard() {
  return (
    <div className="py-20 px-6 sm:px-12 max-w-7xl mx-auto border-b border-[#AD8557]/20 bg-grain">
      
      {/* Board Header */}
      <div className="flex items-center justify-between mb-12 border-b border-[#AD8557]/20 pb-6">
        <div>
          <span className="text-[10px] tracking-[0.35em] font-mono uppercase text-[#AD8557] block mb-1">
            DELIVERABLE A — VISUAL LOCK
          </span>
          <h2 className="font-display text-4xl text-[#312E2A]">
            Typography & Wordmark System
          </h2>
        </div>
        <span className="text-xs font-mono text-[#9A7552]">AUREA V2 FOUNDATION</span>
      </div>

      <div className="grid lg:grid-cols-12 gap-12 items-start">
        
        {/* 1. Custom Wordmark System */}
        <div className="lg:col-span-12 p-10 rounded-3xl bg-[#F5F0E8] border border-[#AD8557]/25 shadow-sm space-y-6">
          <span className="text-[10px] tracking-[0.3em] font-mono uppercase text-[#AD8557] block">
            01 / PROPRIETARY WORDMARK GESTURE (HORIZON CROSSBAR)
          </span>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-8 py-6 border-t border-b border-[#AD8557]/20">
            {/* Wordmark Option */}
            <div className="relative inline-block">
              <span className="font-display text-5xl sm:text-7xl tracking-[0.4em] text-[#312E2A] uppercase font-light pl-2">
                A U R E A
              </span>
              {/* Thin Horizon Line Gesture aligned with first 'A' crossbar */}
              <div className="absolute top-[52%] left-0 w-full h-[1.5px] bg-[#D6A03B] opacity-80" />
            </div>

            <div className="max-w-md text-xs text-[#312E2A]/80 font-light leading-relaxed">
              <p>
                <strong>Horizontal Horizon Gesture</strong>: A refined, continuous 1.5px solar gold line aligns with the crossbar of the wordmark, grounding the brand in the horizon without splitting letters.
              </p>
            </div>
          </div>
        </div>

        {/* 2. Display Typography */}
        <div className="lg:col-span-6 space-y-6 p-8 rounded-3xl bg-[#FAF7F1] border border-[#AD8557]/20">
          <span className="text-[10px] tracking-[0.3em] font-mono uppercase text-[#AD8557] block">
            02 / DISPLAY TYPOGRAPHY — NEWSREADER (EDITORIAL SERIF)
          </span>

          <div className="space-y-4">
            <h1 className="hero-monumental-title text-[#312E2A]">
              Designed around <br />
              <span className="italic font-normal text-[#AD8557]">the horizon.</span>
            </h1>
            <p className="text-xs text-[#9A7552] font-mono">
              Display Scale: clamp(4.25rem, 8.5vw, 9.5rem) · 110px – 152px
            </p>
          </div>
        </div>

        {/* 3. Interface Typography & Button Directions */}
        <div className="lg:col-span-6 space-y-6 p-8 rounded-3xl bg-[#FAF7F1] border border-[#AD8557]/20">
          <span className="text-[10px] tracking-[0.3em] font-mono uppercase text-[#AD8557] block">
            03 / INTERFACE TYPOGRAPHY — INSTRUMENT SANS
          </span>

          <div className="space-y-6">
            <div>
              <span className="text-[10px] tracking-[0.3em] font-mono uppercase text-[#9A7552] block mb-2">
                SECTION TITLE SCALE (68px – 112px)
              </span>
              <h2 className="font-display text-4xl sm:text-5xl text-[#312E2A]">
                Architecture shaped by light.
              </h2>
            </div>

            <div>
              <span className="text-[10px] tracking-[0.3em] font-mono uppercase text-[#9A7552] block mb-2">
                BODY TEXT (16px – 19px)
              </span>
              <p className="text-base text-[#312E2A]/85 font-light leading-relaxed max-w-md">
                AUREA is a landmark oceanfront architecture shaped by sunlight, continuous water views and endless perspective.
              </p>
            </div>

            {/* Button Direction Options */}
            <div className="pt-4 border-t border-[#AD8557]/20 space-y-4">
              <span className="text-[10px] tracking-[0.3em] font-mono uppercase text-[#AD8557] block">
                BUTTON STYLING OPTIONS
              </span>

              <div className="flex flex-wrap gap-4 items-center">
                {/* Option A */}
                <button className="btn-arch-line">
                  <span>Explore AUREA</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                {/* Option B */}
                <button className="btn-arch-cta">
                  <span>Private Presentation</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                {/* Option C */}
                <button className="px-6 py-3 border border-[#312E2A] text-[#312E2A] text-xs font-mono tracking-widest uppercase hover:border-[#D6A03B] hover:text-[#D6A03B] transition-colors">
                  View Residence 20A
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
