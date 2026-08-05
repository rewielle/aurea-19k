import React, { useState } from 'react';
import { Waves, Sparkles } from 'lucide-react';

export default function AmenitiesSection() {
  const [activeAmenity, setActiveAmenity] = useState(0);

  const amenities = [
    {
      id: 0,
      name: "Horizon Infinity Pool",
      desc: "Heated cantilevered pool where water visually merges with the ocean horizon at sunset.",
      image: "/assets/horizon_pool.jpg"
    },
    {
      id: 1,
      name: "Wellness Pavilion & Spa",
      desc: "Hydrotherapy thermal circuit, mineral saunas, cold plunge pools and oceanfront treatment suites.",
      image: "/assets/wellness_pavilion.jpg"
    },
    {
      id: 2,
      name: "Private Ocean Dining Lounge",
      desc: "Reserved culinary pavilion for private chef dinners and sommelier wine tastings overlooking the sea.",
      image: "/assets/interior_living.jpg"
    },
    {
      id: 3,
      name: "Sommelier Wine Vault",
      desc: "Temperature-controlled private climate lockers holding rare vintages for resident collectors.",
      image: "/assets/building_night.jpg"
    },
    {
      id: 4,
      name: "Observatory Sky Terrace",
      desc: "Suspended 40th floor open-air loggia lounge featuring stargazing optical telescopes and fire hearths.",
      image: "/assets/building_golden.jpg"
    }
  ];

  return (
    <section
      id="amenities"
      className="relative py-32 sm:py-44 bg-[#FAF7F1] text-[#312E2A] bg-grain overflow-hidden border-t border-[#AD8557]/20"
    >
      <div className="max-w-7xl mx-auto px-8 sm:px-16">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <span className="text-[10px] font-mono tracking-[0.35em] uppercase text-[#AD8557] block mb-3 font-semibold">
              SECTION 06 — SANCTUARY & AMENITIES
            </span>

            {/* Upright Roman Headline */}
            <h2 className="font-display text-5xl sm:text-7xl text-[#312E2A] leading-[0.95]">
              Where water <br />
              meets the horizon.
            </h2>
          </div>

          <p className="text-sm font-mono text-[#9A7552]">SUNSET AMENITY SANCTUARY</p>
        </div>

        {/* Amenity Showcase Canvas */}
        <div className="grid lg:grid-cols-12 gap-8 items-center">
          
          <div className="lg:col-span-7 relative h-[480px] sm:h-[580px] rounded-3xl overflow-hidden shadow-2xl border border-[#AD8557]/30 bg-[#263A46]">
            <div
              className="absolute inset-0 bg-cover bg-center transition-all duration-700"
              style={{ backgroundImage: `url('${amenities[activeAmenity].image}')` }}
            />

            <div className="absolute inset-0 bg-gradient-to-t from-[#312E2A]/90 via-transparent to-transparent pointer-events-none" />

            <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-black/60 backdrop-blur-md text-[#FAF7F1] font-mono text-xs flex justify-between items-center">
              <div>
                <span className="text-[#D6A03B] font-bold block text-[10px] uppercase">AMENITY 0{activeAmenity + 1}</span>
                <span className="text-white text-base font-display">{amenities[activeAmenity].name}</span>
              </div>
              <Waves className="w-5 h-5 text-[#D6A03B]" />
            </div>
          </div>

          <div className="lg:col-span-5 space-y-3">
            {amenities.map((item, idx) => (
              <div
                key={item.id}
                onClick={() => setActiveAmenity(idx)}
                className={`p-5 rounded-2xl border transition-all cursor-pointer ${
                  activeAmenity === idx
                    ? 'bg-[#312E2A] text-[#FAF7F1] border-[#D6A03B] shadow-xl'
                    : 'bg-[#F5F0E8] border-[#AD8557]/20 text-[#312E2A] hover:bg-[#F5F0E8]/80'
                }`}
              >
                <div className="flex items-center justify-between text-[10px] font-mono mb-1">
                  <span className="text-[#D6A03B] font-bold">0{idx + 1}</span>
                  <span className="text-[#9A7552]">SANCTUARY</span>
                </div>
                <h3 className="font-display text-xl text-inherit mb-1">
                  {item.name}
                </h3>
                <p className="text-xs text-inherit/80 font-light leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
