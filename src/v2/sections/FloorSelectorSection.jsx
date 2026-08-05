import React, { useState } from 'react';
import { ArrowRight, Compass, Maximize2 } from 'lucide-react';

export default function FloorSelectorSection({ onOpenModal }) {
  const [selectedFloor, setSelectedFloor] = useState(1); // 0: Low, 1: Mid, 2: High, 3: Aurea House

  const floors = [
    {
      id: 0,
      title: "LOW LEVEL — LEVEL 10",
      type: "COASTAL SUITE",
      area: "185 m²",
      beds: "3 Bedrooms",
      view: "Coastline & Palm Canopy View",
      image: "/assets/view_level_20.jpg",
      altitude: "32m Elevation"
    },
    {
      id: 1,
      title: "MID LEVEL — LEVEL 20",
      type: "HORIZON RESIDENCE",
      area: "210 m²",
      beds: "3 Bedrooms + Loggia",
      view: "Panoramic Ocean Horizon View",
      image: "/assets/view_level_20.jpg",
      altitude: "68m Elevation"
    },
    {
      id: 2,
      title: "HIGH LEVEL — LEVEL 35",
      type: "SKY RESIDENCE",
      area: "295 m²",
      beds: "4 Bedrooms + Private Pool",
      view: "Uninterrupted Open Sea & Sky",
      image: "/assets/view_level_40.jpg",
      altitude: "120m Elevation"
    },
    {
      id: 3,
      title: "PENTHOUSE — AUREA HOUSE",
      type: "ESTATE RESIDENCE",
      area: "540 m²",
      beds: "5 Bedrooms + Sky Garden",
      view: "360° Highest Ocean Horizon",
      image: "/assets/building_golden.jpg",
      altitude: "155m Elevation"
    }
  ];

  const current = floors[selectedFloor];

  return (
    <section
      id="floor-selector"
      className="relative py-32 sm:py-44 bg-[#FAF7F1] text-[#312E2A] bg-grain overflow-hidden border-t border-[#AD8557]/20"
    >
      <div className="max-w-7xl mx-auto px-8 sm:px-16">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <span className="text-[10px] font-mono tracking-[0.35em] uppercase text-[#AD8557] block mb-3 font-semibold">
              UAU MOMENT 04 — PERSPECTIVE FLOOR SELECTOR
            </span>

            {/* Upright Roman Headline */}
            <h2 className="font-display text-5xl sm:text-7xl text-[#312E2A] leading-[0.95]">
              Every level <br />
              changes the view.
            </h2>
          </div>

          <p className="text-sm font-mono text-[#9A7552]">CHOOSE YOUR PERSPECTIVE</p>
        </div>

        {/* Commercial Interaction Stage */}
        <div className="grid lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Vertical Level Selector Ruler */}
          <div className="lg:col-span-3 space-y-3 font-mono text-xs">
            {floors.map((fl, idx) => (
              <div
                key={fl.id}
                onClick={() => setSelectedFloor(idx)}
                className={`p-5 rounded-2xl border transition-all cursor-pointer ${
                  selectedFloor === idx
                    ? 'bg-[#312E2A] text-[#FAF7F1] border-[#D6A03B] shadow-xl ring-1 ring-[#D6A03B]'
                    : 'bg-[#F5F0E8] border-[#AD8557]/20 text-[#312E2A] hover:bg-[#F5F0E8]/80'
                }`}
              >
                <div className="flex items-center justify-between text-[10px] mb-1">
                  <span className="text-[#D6A03B] font-bold">{fl.altitude}</span>
                  <span className="text-[#9A7552]">0{idx + 1}</span>
                </div>
                <div className="font-display text-lg tracking-wide text-inherit">
                  {fl.title.split(' — ')[1]}
                </div>
                <div className="text-[10px] text-inherit/70 truncate">{fl.type}</div>
              </div>
            ))}
          </div>

          {/* Center Perspective View Canvas */}
          <div className="lg:col-span-6 relative h-[480px] sm:h-[560px] rounded-3xl overflow-hidden shadow-2xl border border-[#AD8557]/30 bg-[#263A46]">
            <div
              className="absolute inset-0 bg-cover bg-center transition-all duration-700"
              style={{ backgroundImage: `url('${current.image}')` }}
            />

            <div className="absolute inset-0 bg-gradient-to-t from-[#312E2A]/90 via-transparent to-transparent pointer-events-none" />

            <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-black/60 backdrop-blur-md text-[#FAF7F1] font-mono text-xs flex justify-between items-center">
              <div>
                <span className="text-[#D6A03B] font-bold block text-[10px] uppercase">{current.title}</span>
                <span className="text-white text-sm font-display">{current.view}</span>
              </div>
              <Compass className="w-5 h-5 text-[#D6A03B]" />
            </div>
          </div>

          {/* Right Residence Information & Floorplan Drawer */}
          <div className="lg:col-span-3 space-y-6 p-6 rounded-3xl bg-[#F5F0E8] border border-[#AD8557]/25 flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-[#AD8557] block mb-2 font-semibold">
                RESIDENCE SPECIFICATIONS
              </span>
              <h3 className="font-display text-2xl text-[#312E2A] mb-4">
                {current.type}
              </h3>

              <div className="space-y-3 font-mono text-xs text-[#312E2A]/85 border-t border-b border-[#AD8557]/20 py-4">
                <div className="flex justify-between">
                  <span className="text-[#9A7552]">TOTAL AREA:</span>
                  <span className="font-semibold">{current.area}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#9A7552]">LAYOUT:</span>
                  <span className="font-semibold">{current.beds}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#9A7552]">ELEVATION:</span>
                  <span className="font-semibold">{current.altitude}</span>
                </div>
              </div>

              {/* Floorplan Render */}
              <div className="mt-4 rounded-xl overflow-hidden border border-[#AD8557]/20 bg-white/60 p-2">
                <img src="/assets/floorplan.jpg" alt="Floorplan" className="w-full h-32 object-contain" />
              </div>
            </div>

            <button onClick={onOpenModal} className="w-full btn-arch-cta justify-center">
              <span>Explore this residence</span>
              <ArrowRight className="w-4 h-4 text-[#D6A03B]" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
}
