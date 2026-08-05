import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sun, Sparkles, Eye } from 'lucide-react';

export default function LightRevealedGallery() {
  const [activeRevealed, setActiveRevealed] = useState(null);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });

  const galleryItems = [
    {
      id: 1,
      title: "Travertine & Ocean Light",
      subtitle: "Material Texture",
      image: "/assets/interior_living.jpg",
    },
    {
      id: 2,
      title: "Curved Balcony Terraces",
      subtitle: "Façade Geometry",
      image: "/assets/balcony_glass.jpg",
    },
    {
      id: 3,
      title: "Infinity Surface Reflection",
      subtitle: "Water & Sky",
      image: "/assets/horizon_pool.jpg",
    },
    {
      id: 4,
      title: "Thermic Spa Sanctuary",
      subtitle: "Wellness Architecture",
      image: "/assets/wellness_pavilion.jpg",
    },
  ];

  const handleMouseMove = (e, id) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePos({ x, y });
    setActiveRevealed(id);
  };

  return (
    <section className="relative py-28 sm:py-36 bg-[#F4EFE5] text-[#35322E] bg-grain overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-[10px] tracking-[0.35em] uppercase text-[#9A7552] block font-medium mb-2">
            INTERACTIVE LIGHT GALLERY
          </span>
          <h2 className="font-serif-editorial text-4xl sm:text-6xl text-[#35322E] leading-tight">
            Light reveals <span className="italic text-gold-gradient">architecture.</span>
          </h2>
          <p className="text-xs sm:text-sm text-[#35322E]/80 mt-3 font-light">
            Hover over any architectural canvas to sweep a beam of sunlight over the mineral textures & reflective surfaces.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid sm:grid-cols-2 gap-8">
          {galleryItems.map((item) => {
            const isHovered = activeRevealed === item.id;
            return (
              <div
                key={item.id}
                onMouseMove={(e) => handleMouseMove(e, item.id)}
                onMouseLeave={() => setActiveRevealed(null)}
                className="group relative h-[360px] sm:h-[440px] rounded-3xl overflow-hidden border border-[#C8A776]/30 bg-[#F7F3EC] shadow-lg cursor-crosshair transition-all duration-500"
              >
                {/* 1. Base Pearlescent Image Layer (Soft low contrast) */}
                <div
                  className="absolute inset-0 bg-cover bg-center transition-all duration-700 filter brightness-95 contrast-90 sepia-[0.1]"
                  style={{ backgroundImage: `url('${item.image}')` }}
                />

                {/* 2. Solar Light Beam Spotlight Overlay (Active on hover cursor position) */}
                <div
                  className="absolute inset-0 pointer-events-none transition-opacity duration-300"
                  style={{
                    opacity: isHovered ? 1 : 0,
                    background: `radial-gradient(circle 220px at ${mousePos.x}% ${mousePos.y}%, rgba(217, 164, 65, 0.45), transparent 70%)`,
                  }}
                />

                {/* 3. High Contrast Specular Reveal Mask */}
                <div
                  className="absolute inset-0 bg-cover bg-center transition-opacity duration-300 pointer-events-none filter brightness-110 contrast-125 saturate-125"
                  style={{
                    backgroundImage: `url('${item.image}')`,
                    opacity: isHovered ? 0.9 : 0,
                    clipPath: isHovered
                      ? `circle(180px at ${mousePos.x}% ${mousePos.y}%)`
                      : `circle(0px at 50% 50%)`,
                  }}
                />

                {/* Info Overlay */}
                <div className="absolute bottom-6 left-6 right-6 p-6 rounded-2xl bg-[#F4EFE5]/90 backdrop-blur-md border border-[#C8A776]/30 flex items-center justify-between transition-all duration-300 group-hover:bg-[#F7F3EC]">
                  <div>
                    <span className="text-[9px] tracking-[0.25em] font-mono uppercase text-[#9A7552] block mb-1">
                      {item.subtitle}
                    </span>
                    <h3 className="font-serif-editorial text-2xl text-[#35322E]">
                      {item.title}
                    </h3>
                  </div>

                  <div className="w-10 h-10 rounded-full border border-[#D9A441]/40 flex items-center justify-center text-[#D9A441] bg-[#D9A441]/10">
                    <Sun className={`w-5 h-5 transition-transform duration-500 ${isHovered ? 'rotate-90 scale-110' : ''}`} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
