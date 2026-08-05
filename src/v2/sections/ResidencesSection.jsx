import React, { useState } from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

export default function ResidencesSection({ onOpenModal }) {
  const [activeTab, setActiveTab] = useState(0);

  const categories = [
    {
      id: 0,
      title: "HORIZON RESIDENCES",
      tagline: "Designed around panoramic living, broad terraces and an uninterrupted relationship with the sea.",
      area: "210 m² – 280 m²",
      levels: "Levels 06 – 24",
      image: "/assets/interior_living.jpg",
      highlights: ["Wrap-around Loggia Terraces", "Direct Ocean Sunrise Alignment", "Dual Valet & Private Lift Entry"]
    },
    {
      id: 1,
      title: "SKY RESIDENCES",
      tagline: "Greater height, absolute privacy and elevated open perspectives high above the coastline.",
      area: "295 m² – 380 m²",
      levels: "Levels 25 – 35",
      image: "/assets/view_level_40.jpg",
      highlights: ["Elevated Sky Loggias", "Floor-to-ceiling 3.4m Glazing", "Private Wine Storage Cellar"]
    },
    {
      id: 2,
      title: "THE AUREA HOUSE",
      tagline: "A singular penthouse estate with private terraces, suspended gardens and the highest horizon.",
      area: "540 m² Penthouse Estate",
      levels: "Levels 36 – 39",
      image: "/assets/building_golden.jpg",
      highlights: ["Private Heated Infinity Pool", "360° Panoramic Sky Terrace", "Dedicated Butler & Concierge Service"]
    }
  ];

  const current = categories[activeTab];

  return (
    <section
      id="residences"
      className="relative py-32 sm:py-44 bg-[#EFE9DF] text-[#312E2A] bg-grain overflow-hidden border-t border-[#AD8557]/20"
    >
      <div className="max-w-7xl mx-auto px-8 sm:px-16">
        
        {/* Category Editorial Tabs */}
        <div className="flex flex-wrap items-center justify-between mb-16 border-b border-[#AD8557]/20 pb-6 gap-4">
          <div className="flex flex-wrap items-center gap-4 font-mono text-xs">
            {categories.map((cat, idx) => (
              <button
                key={cat.id}
                onClick={() => setActiveTab(idx)}
                className={`px-6 py-3 rounded-full transition-all ${
                  activeTab === idx
                    ? 'bg-[#312E2A] text-[#FAF7F1] font-bold shadow-md'
                    : 'bg-white/40 hover:bg-white/80 text-[#312E2A]'
                }`}
              >
                {cat.title}
              </button>
            ))}
          </div>
          <span className="font-mono text-xs text-[#9A7552]">{current.levels}</span>
        </div>

        {/* Editorial Feature Grid */}
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-6 space-y-6">
            <span className="text-[10px] font-mono tracking-[0.35em] uppercase text-[#AD8557] block font-semibold">
              RESIDENCE CATEGORY 0{activeTab + 1}
            </span>

            <h2 className="font-display text-4xl sm:text-6xl text-[#312E2A] leading-[0.95]">
              {current.title}
            </h2>

            <p className="text-base sm:text-lg text-[#312E2A]/85 font-light leading-relaxed">
              {current.tagline}
            </p>

            <div className="py-4 border-t border-b border-[#AD8557]/20 space-y-3 font-mono text-xs text-[#312E2A]">
              {current.highlights.map((h, i) => (
                <div key={i} className="flex items-center gap-3">
                  <CheckCircle2 className="w-4 h-4 text-[#D6A03B]" />
                  <span>{h}</span>
                </div>
              ))}
            </div>

            <div className="pt-2">
              <button onClick={onOpenModal} className="btn-arch-cta">
                <span>Inquire About {current.title}</span>
                <ArrowRight className="w-4 h-4 text-[#D6A03B]" />
              </button>
            </div>
          </div>

          <div className="lg:col-span-6 relative h-[450px] sm:h-[550px] rounded-3xl overflow-hidden shadow-2xl border border-[#AD8557]/30 bg-[#263A46]">
            <div
              className="absolute inset-0 bg-cover bg-center transition-all duration-700"
              style={{ backgroundImage: `url('${current.image}')` }}
            />
          </div>

        </div>

      </div>
    </section>
  );
}
