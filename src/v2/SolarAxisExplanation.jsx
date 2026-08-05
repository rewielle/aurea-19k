import React from 'react';

export default function SolarAxisExplanation() {
  return (
    <div className="py-16 px-8 sm:px-16 max-w-7xl mx-auto bg-grain text-[#312E2A]">
      <div className="flex items-center justify-between mb-8 border-b border-[#AD8557]/20 pb-4">
        <span className="text-[10px] tracking-[0.35em] font-mono uppercase text-[#AD8557]">
          DELIVERABLES 10 & 11 — ARCHITECTURAL RATIONALE
        </span>
        <span className="text-xs font-mono text-[#9A7552]">AUREA V2 REFINED LOCK</span>
      </div>

      <h2 className="font-display text-4xl text-[#312E2A] mb-8">
        The Proprietary Solar Axis & Elimination of "Miami Condo" Noise
      </h2>

      <div className="grid md:grid-cols-2 gap-8 text-xs sm:text-sm text-[#312E2A]/85 leading-relaxed font-light">
        <div className="p-8 rounded-2xl bg-[#F5F0E8] border border-[#AD8557]/25 space-y-4">
          <h3 className="font-display text-2xl text-[#312E2A]">
            1. The Proprietary Solar Axis System
          </h3>
          <p>
            Rather than placing a decorative golden line or arbitrary icon on top of the layout, a single continuous 1.5px solar-horizon ray originates at the low sun on the water's edge, extends across the ocean, and connects directly to the base and crossbar of the AUREA tower.
          </p>
          <p className="text-[#AD8557] font-mono text-[11px]">
            → LIGHT BECOMES ARCHITECTURE: Sunlight physically generates and reveals the building silhouette.
          </p>
        </div>

        <div className="p-8 rounded-2xl bg-[#F5F0E8] border border-[#AD8557]/25 space-y-4">
          <h3 className="font-display text-2xl text-[#312E2A]">
            2. Reduction of Urban & Commercial Noise
          </h3>
          <p>
            All resort-like visual clutter, boats, neighboring high-density city towers, and crowded beach scenery have been completely eliminated. The AUREA tower stands as a singular, isolated, timeless architectural landmark surrounded purely by calm ocean, sky, and solar light.
          </p>
          <p className="text-[#AD8557] font-mono text-[11px]">
            → SILENT LANDMARK: High architectural exclusivity without generic tropical real-estate feel.
          </p>
        </div>
      </div>
    </div>
  );
}
