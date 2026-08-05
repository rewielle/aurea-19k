import React, { useState } from 'react';
import { Sun, Layers, ArrowRight } from 'lucide-react';

export default function SolarAxisStoryboard() {
  const [activeFrame, setActiveFrame] = useState(0);

  const storyboardFrames = [
    {
      id: 0,
      title: "FRAME 01 — HORIZON SILENCE",
      desc: "Calm ocean horizon, low sun near waterline, pearl mist. Complete absence of architecture. Large visual silence.",
      image: "/assets/hero_sea.jpg"
    },
    {
      id: 1,
      title: "FRAME 02 — SOLAR AXIS",
      desc: "Sunlight reflection extends across the ocean water, forming the proprietary solar axis aligned with the future building location.",
      image: "/assets/hero_sea.jpg"
    },
    {
      id: 2,
      title: "FRAME 03 — STRUCTURE",
      desc: "Thin architectural wireframe lines rise directly out of the light beam. Initial vertical core and balcony curves appear.",
      image: "/assets/hero_lines.jpg"
    },
    {
      id: 3,
      title: "FRAME 04 — VOLUME",
      desc: "Façade volumes gain depth. Low-iron glass panes and floor slabs become translucent inside the morning mist.",
      image: "/assets/hero_lines.jpg"
    },
    {
      id: 4,
      title: "FRAME 05 — MATERIAL",
      desc: "Travertine stone piers, champagne bronze railings, and glass balconies gain full physical opacity and realistic reflections.",
      image: "/assets/building_golden.jpg"
    },
    {
      id: 5,
      title: "FRAME 06 — MONUMENTAL AUREA",
      desc: "Atmosphere clears. The complete AUREA tower stands as a monumental landmark. Sunlight travels across the façade.",
      image: "/assets/building_golden.jpg"
    }
  ];

  const current = storyboardFrames[activeFrame];

  return (
    <div className="py-16 px-8 sm:px-16 max-w-7xl mx-auto bg-[#FAF7F1] text-[#312E2A] bg-grain border-b border-[#AD8557]/20">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-8 border-b border-[#AD8557]/20 pb-4">
        <div>
          <span className="text-[10px] font-mono tracking-[0.35em] uppercase text-[#AD8557] block mb-1">
            DELIVERABLE 9 — MOTION STORYBOARD
          </span>
          <h2 className="font-display text-3xl text-[#312E2A]">
            6-Frame Solar Axis Building Emergence
          </h2>
        </div>
        <span className="text-xs font-mono text-[#9A7552]">LIGHT BECOMES ARCHITECTURE</span>
      </div>

      {/* Frame Preview Canvas */}
      <div className="grid lg:grid-cols-12 gap-8 items-center mb-8">
        <div className="lg:col-span-8 relative h-[380px] sm:h-[450px] rounded-3xl overflow-hidden shadow-2xl border border-[#AD8557]/30 bg-[#263A46]">
          <div
            className="absolute inset-0 bg-cover bg-center transition-all duration-700"
            style={{ backgroundImage: `url('${current.image}')` }}
          />

          {/* Solar Horizon Axis Line */}
          {activeFrame >= 1 && (
            <div className="absolute top-[52%] left-0 right-0 h-[2px] bg-[#D6A03B] shadow-[0_0_15px_#D6A03B] pointer-events-none" />
          )}

          <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-black/60 backdrop-blur-md text-[#FAF7F1] font-mono text-xs flex justify-between items-center">
            <span className="text-[#D6A03B] font-bold">{current.title}</span>
            <span>FRAME 0{activeFrame + 1} / 06</span>
          </div>
        </div>

        {/* Frame Description Drawer */}
        <div className="lg:col-span-4 space-y-4 p-8 rounded-3xl bg-[#F5F0E8] border border-[#AD8557]/25">
          <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-[#AD8557] block">
            STAGE NARRATIVE
          </span>
          <h3 className="font-display text-2xl text-[#312E2A]">
            {current.title}
          </h3>
          <p className="text-xs text-[#312E2A]/85 font-light leading-relaxed border-t border-b border-[#AD8557]/20 py-4">
            {current.desc}
          </p>

          <div className="flex items-center gap-2 pt-2">
            <button
              disabled={activeFrame === 0}
              onClick={() => setActiveFrame(activeFrame - 1)}
              className="px-4 py-2 rounded-full border border-[#AD8557]/30 text-xs font-mono disabled:opacity-30"
            >
              Previous
            </button>
            <button
              disabled={activeFrame === 5}
              onClick={() => setActiveFrame(activeFrame + 1)}
              className="px-4 py-2 rounded-full bg-[#312E2A] text-[#FAF7F1] text-xs font-mono disabled:opacity-30 flex items-center gap-1"
            >
              <span>Next Frame</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Frame Timeline Selector */}
      <div className="grid grid-cols-2 sm:grid-cols-6 gap-3 pt-4 border-t border-[#AD8557]/20">
        {storyboardFrames.map((f, i) => (
          <button
            key={f.id}
            onClick={() => setActiveFrame(i)}
            className={`p-3 rounded-xl border text-left font-mono transition-all ${
              activeFrame === i
                ? 'bg-[#312E2A] text-[#FAF7F1] border-[#D6A03B] shadow-md'
                : 'bg-[#F5F0E8] border-[#AD8557]/20 text-[#312E2A] hover:border-[#D6A03B]'
            }`}
          >
            <span className="text-[10px] text-[#D6A03B] block font-bold">FRAME 0{i + 1}</span>
            <span className="text-[9px] truncate block leading-tight">{f.title.split(' — ')[1]}</span>
          </button>
        ))}
      </div>

    </div>
  );
}
