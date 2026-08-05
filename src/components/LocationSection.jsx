import React from 'react';
import { MapPin, Compass, Navigation, Anchor } from 'lucide-react';

export default function LocationSection() {
  const points = [
    { label: "Private Yacht Marina", distance: "05 MIN", icon: Anchor },
    { label: "Executive Heliport", distance: "10 MIN", icon: Navigation },
    { label: "Ocean Promenade", distance: "02 MIN", icon: MapPin },
    { label: "International Airport", distance: "25 MIN", icon: Compass },
  ];

  return (
    <section className="relative py-28 sm:py-36 bg-[#F7F3EC] text-[#35322E] bg-grain overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        
        {/* Section Header */}
        <div className="grid lg:grid-cols-12 gap-12 items-center mb-16">
          <div className="lg:col-span-6">
            <span className="text-[10px] tracking-[0.35em] uppercase text-[#9A7552] block font-medium mb-3">
              COASTAL PENINSULA
            </span>
            <h2 className="font-serif-editorial text-4xl sm:text-6xl text-[#35322E] leading-tight">
              Connected to what matters. <br />
              <span className="italic text-gold-gradient font-normal">Separated from the ordinary.</span>
            </h2>
          </div>

          <div className="lg:col-span-6">
            <p className="text-sm sm:text-base text-[#35322E]/80 font-light leading-relaxed">
              Situated on an untouched ocean peninsula, AUREA enjoys absolute coastal seclusion while maintaining effortless proximity to key transportation hubs and cultural sanctuaries.
            </p>
          </div>
        </div>

        {/* Minimalist Topographic Map & Proximity Grid */}
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Topographic Map Canvas Box */}
          <div className="lg:col-span-8 relative h-[420px] rounded-3xl border border-[#C8A776]/30 bg-[#F4EFE5] p-8 shadow-inner overflow-hidden flex items-center justify-center">
            {/* Topographic Lines Background SVG */}
            <svg className="absolute inset-0 w-full h-full opacity-25 stroke-[#C8A776]" viewBox="0 0 800 400" fill="none">
              <path d="M 0 100 Q 200 80 400 160 T 800 120" strokeWidth="1" />
              <path d="M 0 160 Q 250 140 450 240 T 800 200" strokeWidth="1" />
              <path d="M 0 220 Q 300 200 500 300 T 800 280" strokeWidth="1" fill="rgba(200, 167, 118, 0.05)" />
              <path d="M 0 280 Q 350 260 550 360 T 800 340" strokeWidth="1" />
            </svg>

            {/* AUREA Pin Mark */}
            <div className="relative z-10 flex flex-col items-center gap-3">
              <div className="relative flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-[#D9A441]/20 animate-ping absolute" />
                <div className="w-12 h-12 rounded-full bg-[#35322E] text-[#D9A441] border border-[#D9A441] flex items-center justify-center shadow-2xl">
                  <MapPin className="w-6 h-6" />
                </div>
              </div>
              <span className="font-serif-editorial text-2xl font-semibold tracking-widest text-[#35322E] uppercase">
                A U R E A
              </span>
              <span className="text-[10px] tracking-[0.3em] font-mono text-[#9A7552] uppercase">
                PACIFIC PENINSULA POINT
              </span>
            </div>
          </div>

          {/* Right Proximity Highlights */}
          <div className="lg:col-span-4 space-y-4">
            {points.map((pt, i) => {
              const IconComp = pt.icon;
              return (
                <div
                  key={pt.label}
                  className="p-6 rounded-2xl border border-[#C8A776]/30 bg-[#F4EFE5] flex items-center justify-between shadow-sm hover:border-[#D9A441] transition-all"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-[#D9A441]/10 border border-[#D9A441]/30 flex items-center justify-center text-[#D9A441]">
                      <IconComp className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-semibold text-[#35322E]">
                      {pt.label}
                    </span>
                  </div>

                  <span className="font-mono text-xs font-bold text-[#D9A441]">
                    {pt.distance}
                  </span>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
