import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Eye, Sun, ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ExteriorToInterior() {
  const containerRef = useRef(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top top',
        end: '+=160%',
        pin: true,
        scrub: 0.8,
        onUpdate: (self) => {
          setProgress(self.progress);
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Compute camera passage through balcony glass
  // 0.0 - 0.5: Exterior balcony glass close-up, high reflection
  // 0.5 - 1.0: Camera enters interior room, glass reflection fades out, room opens
  const exteriorOpacity = Math.max(0, 1 - progress * 1.8);
  const interiorOpacity = Math.min(1, progress * 1.6);
  const exteriorScale = 1 + progress * 0.4; // smooth zoom toward glass
  const interiorScale = 1.12 - progress * 0.12; // smooth arrival inside

  return (
    <section
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden bg-[#263743] text-[#F7F3EC] flex items-center justify-center"
    >
      {/* Layer 1: Exterior Balcony Glass Frame */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-all duration-300 pointer-events-none"
        style={{
          backgroundImage: `url('/assets/balcony_glass.jpg')`,
          opacity: exteriorOpacity,
          transform: `scale(${exteriorScale})`,
        }}
      />

      {/* Layer 2: Sun Flare & Glass Refraction Shimmer */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-500"
        style={{
          opacity: exteriorOpacity * 0.9,
          background: `radial-gradient(ellipse at ${50 + progress * 30}% 40%, rgba(217, 164, 65, 0.45), transparent 60%)`,
        }}
      />

      {/* Layer 3: Interior Living Room Frame */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-all duration-300 pointer-events-none"
        style={{
          backgroundImage: `url('/assets/interior_living.jpg')`,
          opacity: interiorOpacity,
          transform: `scale(${interiorScale})`,
        }}
      />

      {/* Layer 4: Warm Golden Sunlight Shifting Across Interior */}
      <div
        className="absolute inset-0 pointer-events-none mix-blend-soft-light transition-opacity duration-500"
        style={{
          opacity: interiorOpacity * 0.7,
          background: `linear-gradient(115deg, rgba(217, 164, 65, 0.5) 0%, transparent 75%)`,
        }}
      />

      {/* Direct Full-bleed Content Overlay (No Card Containers!) */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 w-full h-full flex flex-col justify-between pt-28 pb-12">
        {/* Top Indicator */}
        <div className="flex items-center justify-between border-b border-white/20 pb-4">
          <div className="flex items-center gap-3">
            <span className="w-8 h-[1px] bg-[#D9A441]" />
            <span className="text-[10px] tracking-[0.35em] uppercase text-[#D9A441] font-mono">
              UAU MOMENT 03 — GLASS TRAVERSAL
            </span>
          </div>

          <div className="flex items-center gap-2 font-mono text-xs text-[#F7F3EC]">
            <Eye className="w-4 h-4 text-[#D9A441]" />
            <span className="uppercase tracking-widest text-[10px]">
              {progress < 0.5 ? 'Approaching Façade' : 'Inside Residence 20A'}
            </span>
          </div>
        </div>

        {/* Center Editorial Headline */}
        <div className="max-w-2xl">
          <span className="text-xs tracking-[0.4em] uppercase text-[#D9A441] block mb-3 font-mono">
            CONTINUOUS SPATIAL CAMERA
          </span>
          <h2 className="font-serif-editorial text-6xl sm:text-8xl text-[#F7F3EC] leading-[0.95] mb-6">
            The horizon <br />
            <span className="italic text-gold-gradient font-normal">begins inside.</span>
          </h2>
          <p className="text-sm sm:text-base text-[#F7F3EC]/85 font-light leading-relaxed max-w-lg mb-6">
            Every residence was positioned to preserve light, privacy and an uninterrupted relationship with the continuous sea horizon.
          </p>
        </div>

        {/* Bottom Status Gauge */}
        <div className="flex items-end justify-between border-t border-white/20 pt-4 text-xs font-mono text-[#A7B6BC]">
          <span>03 / 04 — CONTINUOUS CAMERA PASSAGE</span>
          <span className="text-[#D9A441]">
            GLASS THRESHOLD: {Math.round(progress * 100)}%
          </span>
        </div>
      </div>
    </section>
  );
}
