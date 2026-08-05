import React, { useState } from 'react';
import { Sun, Sparkles } from 'lucide-react';

export default function LightGallerySection() {
  const [lightPos, setLightPos] = useState(50); // Light sweep position (0 to 100%)

  const galleryImages = [
    { id: 0, title: "Travertine Façade Pier", image: "/assets/building_golden.jpg" },
    { id: 1, title: "Curved Loggia Balcony", image: "/assets/balcony_glass.jpg" },
    { id: 2, title: "Panoramic Ocean Living Suite", image: "/assets/interior_living.jpg" },
    { id: 3, title: "Sunset Infinity Horizon Pool", image: "/assets/horizon_pool.jpg" }
  ];

  return (
    <section
      id="gallery"
      className="relative py-32 sm:py-44 bg-[#EFE9DF] text-[#312E2A] bg-grain overflow-hidden border-t border-[#AD8557]/20"
    >
      <div className="max-w-7xl mx-auto px-8 sm:px-16">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <span className="text-[10px] font-mono tracking-[0.35em] uppercase text-[#AD8557] block mb-3 font-semibold">
              SECTION 07 — LIGHT-REVEALED GALLERY
            </span>

            {/* Upright Roman Headline */}
            <h2 className="font-display text-5xl sm:text-7xl text-[#312E2A] leading-[0.95]">
              Light reveals <br />
              what material holds.
            </h2>
          </div>

          <p className="text-sm font-mono text-[#9A7552]">INTERACTIVE SOLAR LIGHT SWEEP</p>
        </div>

        {/* Light Sweep Control Bar */}
        <div className="mb-10 p-6 rounded-2xl bg-[#FAF7F1] border border-[#AD8557]/25 flex flex-col md:flex-row md:items-center justify-between gap-4 font-mono text-xs">
          <div className="flex items-center gap-3">
            <Sun className="w-5 h-5 text-[#D6A03B]" />
            <span className="text-[#312E2A] font-bold">SLIDE TO SWEEP SUNLIGHT ACROSS MATERIALS:</span>
          </div>

          <div className="flex items-center gap-4 w-full md:w-96">
            <span className="text-[10px] text-[#9A7552]">PEARL MIST</span>
            <input
              type="range"
              min="0"
              max="100"
              value={lightPos}
              onChange={(e) => setLightPos(Number(e.target.value))}
              className="w-full accent-[#D6A03B] cursor-pointer"
            />
            <span className="text-[10px] text-[#9A7552]">FULL LIGHT</span>
          </div>
        </div>

        {/* 4 Gallery Imagery Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {galleryImages.map((img) => (
            <div
              key={img.id}
              className="relative h-80 sm:h-96 rounded-3xl overflow-hidden shadow-xl border border-[#AD8557]/30 bg-[#263A46] group"
            >
              <div
                className="absolute inset-0 bg-cover bg-center transition-all duration-500"
                style={{
                  backgroundImage: `url('${img.image}')`,
                  filter: `brightness(${80 + (lightPos * 0.4)}%) contrast(${90 + (lightPos * 0.3)}%)`,
                }}
              />

              {/* Light Sweep Overlay Band */}
              <div
                className="absolute inset-0 pointer-events-none transition-all duration-300"
                style={{
                  background: `linear-gradient(${120}deg, transparent ${lightPos - 25}%, rgba(214, 160, 59, 0.4) ${lightPos}%, transparent ${lightPos + 25}%)`,
                }}
              />

              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-black/60 backdrop-blur-md text-[#FAF7F1] font-mono text-xs flex justify-between items-center">
                <span>{img.title}</span>
                <Sparkles className="w-4 h-4 text-[#D6A03B]" />
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
