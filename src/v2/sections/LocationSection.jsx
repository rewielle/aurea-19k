import React from 'react';
import { Compass, MapPin, Navigation } from 'lucide-react';

export default function LocationSection() {
  return (
    <section
      id="location"
      className="relative py-32 sm:py-44 bg-[#FAF7F1] text-[#312E2A] bg-grain overflow-hidden border-t border-[#AD8557]/20"
    >
      <div className="max-w-7xl mx-auto px-8 sm:px-16">
        
        {/* Header */}
        <div className="grid lg:grid-cols-12 gap-12 items-center mb-16">
          <div className="lg:col-span-7">
            <span className="text-[10px] font-mono tracking-[0.35em] uppercase text-[#AD8557] block mb-3 font-semibold">
              SECTION 08 — LOCATION & TOPOGRAPHY
            </span>

            {/* Upright Roman Headline */}
            <h2 className="font-display text-5xl sm:text-7xl text-[#312E2A] leading-[0.95]">
              Connected to what matters. <br />
              Separated from the ordinary.
            </h2>
          </div>

          <div className="lg:col-span-5 space-y-4">
            <p className="text-base sm:text-lg text-[#312E2A]/85 font-light leading-relaxed">
              Situated on a prime coastal headland along the Atlantic Ocean. Positioned to ensure unobstructed horizon views and direct private beach access.
            </p>
            <div className="font-mono text-xs text-[#9A7552]">
              COASTAL COORDINATES: 25.7617° N, 80.1918° W · ATLANTIC OCEAN FRONT
            </div>
          </div>
        </div>

        {/* Minimal Topographic Line Map & Aerial Imagery Canvas */}
        <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-[#AD8557]/30 bg-[#263A46] h-[480px] sm:h-[580px]">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url('/assets/hero_sea.jpg')` }}
          />

          {/* Topographic Contour Lines Overlay */}
          <div className="absolute inset-0 bg-[radial-gradient(#D6A03B_1px,transparent_1px)] [background-size:24px_24px] opacity-20 pointer-events-none" />

          {/* Location Pin Card */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-6 rounded-2xl bg-black/75 backdrop-blur-md border border-[#D6A03B]/60 text-[#FAF7F1] flex items-center gap-4 shadow-2xl">
            <div className="p-3 rounded-full bg-[#D6A03B]/20 text-[#D6A03B]">
              <MapPin className="w-6 h-6" />
            </div>
            <div>
              <span className="font-display text-2xl text-white block">AUREA RESIDENCES</span>
              <span className="font-mono text-xs text-[#D6A03B]">ATLANTIC OCEAN COASTAL HEADLAND</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
