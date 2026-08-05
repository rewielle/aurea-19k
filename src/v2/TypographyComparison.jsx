import React, { useState } from 'react';
import { CheckCircle2, ArrowRight } from 'lucide-react';

export default function TypographyComparison() {
  const [selectedOption, setSelectedOption] = useState(0);

  const serifOptions = [
    {
      id: 0,
      name: "Option 1: Newsreader Display Upright (Selected Winner)",
      fontFamily: "'Newsreader', serif",
      sample: "Designed around the horizon.",
      description: "Contemporary architectural editorial serif. High contrast, clean upright Roman strokes, zero fragile Didone romance or wedding calligraphic feel.",
      winner: true
    },
    {
      id: 1,
      name: "Option 2: Instrument Serif Upright",
      fontFamily: "'Instrument Serif', serif",
      sample: "Designed around the horizon.",
      description: "Sculptural high-contrast serif with upright geometric proportions. Very strong large-scale presence.",
      winner: false
    },
    {
      id: 2,
      name: "Option 3: Modern Architectural Serif (Upright Roman)",
      fontFamily: "'Newsreader', serif",
      sample: "Designed around the horizon.",
      description: "Restrained, crisp, geometric serif with zero decorative italics. Monumental line height and high legibility over sunlight backgrounds.",
      winner: false
    }
  ];

  return (
    <div className="py-16 px-8 sm:px-16 max-w-7xl mx-auto bg-[#FAF7F1] text-[#312E2A] bg-grain border-b border-[#AD8557]/20">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-10 border-b border-[#AD8557]/20 pb-4">
        <div>
          <span className="text-[10px] font-mono tracking-[0.35em] uppercase text-[#AD8557] block mb-1">
            DELIVERABLE 1 & 2 — TYPOGRAPHY SYSTEM
          </span>
          <h2 className="font-display text-3xl text-[#312E2A]">
            Upright Display Serif Comparison & Wordmark Rules
          </h2>
        </div>
        <span className="text-xs font-mono text-[#9A7552]">ZERO ITALICS IN MAIN HERO</span>
      </div>

      {/* 3 Serif Options Grid */}
      <div className="space-y-6 mb-12">
        {serifOptions.map((opt) => (
          <div
            key={opt.id}
            onClick={() => setSelectedOption(opt.id)}
            className={`p-6 rounded-2xl border transition-all cursor-pointer ${
              opt.winner
                ? 'bg-[#F5F0E8] border-[#D6A03B] shadow-md ring-1 ring-[#D6A03B]'
                : 'bg-white/40 border-[#AD8557]/20 hover:bg-[#F5F0E8]/50'
            }`}
          >
            <div className="flex items-center justify-between mb-3 font-mono text-xs">
              <span className="text-[#AD8557] font-semibold">{opt.name}</span>
              {opt.winner && (
                <span className="flex items-center gap-1 text-[#D6A03B] font-bold text-[10px] tracking-widest uppercase">
                  <CheckCircle2 className="w-3.5 h-3.5" /> SELECTED PAIRING
                </span>
              )}
            </div>

            <div
              className="text-4xl sm:text-6xl text-[#312E2A] mb-3 leading-none font-normal"
              style={{ fontFamily: opt.fontFamily }}
            >
              {opt.sample}
            </div>

            <p className="text-xs text-[#312E2A]/75 font-light max-w-2xl">
              {opt.description}
            </p>
          </div>
        ))}
      </div>

      {/* Wordmark Rules & Sans Serif Pairing */}
      <div className="grid md:grid-cols-2 gap-8 pt-8 border-t border-[#AD8557]/20">
        
        {/* Wordmark System */}
        <div className="p-8 rounded-2xl bg-[#F5F0E8] border border-[#AD8557]/25 space-y-4">
          <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-[#AD8557] block">
            DELIVERABLE 3 — CORRECTED AUREA WORDMARK
          </span>

          <div className="relative py-4 border-t border-b border-[#AD8557]/20">
            <span className="font-display text-4xl sm:text-5xl tracking-[0.4em] text-[#312E2A] uppercase font-light pl-2">
              A U R E A
            </span>
            <div className="absolute top-[52%] left-0 w-full h-[1.5px] bg-[#D6A03B] opacity-80" />
          </div>

          <ul className="text-xs text-[#312E2A]/80 font-light space-y-1.5">
            <li>• Always displayed as one complete word (never AUR / EA).</li>
            <li>• Integrated 1.5px solar-horizon line aligned with letter 'A' crossbar.</li>
            <li>• Zero split letterbreaks, zero generic real-estate monograms.</li>
          </ul>
        </div>

        {/* Sans Serif & Scale Hierarchy */}
        <div className="p-8 rounded-2xl bg-[#F5F0E8] border border-[#AD8557]/25 space-y-4">
          <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-[#AD8557] block">
            SELECTED SANS PAIRING & SCALE
          </span>

          <div className="space-y-3 font-mono text-xs">
            <div>
              <span className="text-[10px] text-[#9A7552] uppercase block">INTERFACE SANS: INSTRUMENT SANS</span>
              <span className="text-sm font-semibold text-[#312E2A]">Architecture shaped by light, sea and perspective.</span>
            </div>
            <div className="pt-2 border-t border-[#AD8557]/20 grid grid-cols-2 gap-2 text-[10px]">
              <div><span className="text-[#9A7552]">HERO TITLE:</span> 104px – 150px</div>
              <div><span className="text-[#9A7552]">HEADER WORDMARK:</span> 24px – 28px</div>
              <div><span className="text-[#9A7552]">SUPPORTING COPY:</span> 16px – 18px</div>
              <div><span className="text-[#9A7552]">INTERFACE LABELS:</span> 11px – 12px</div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
