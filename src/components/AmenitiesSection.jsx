import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Waves, Shield, Wine, Sun } from 'lucide-react';
import { AUREA_DATA } from '../data';

export default function AmenitiesSection() {
  return (
    <section id="experience" className="relative py-28 sm:py-36 bg-[#263743] text-[#F7F3EC] bg-grain overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <span className="text-[10px] tracking-[0.35em] uppercase text-[#D9A441] block font-mono mb-3">
            AMENITIES & LIFESTYLE
          </span>
          <h2 className="font-serif-editorial text-4xl sm:text-6xl text-[#F7F3EC] leading-tight mb-4">
            Where water meets <br />
            <span className="italic text-gold-gradient font-normal">the ocean horizon.</span>
          </h2>
          <p className="text-sm sm:text-base text-[#A7B6BC] font-light leading-relaxed">
            Spaces crafted for a life above the ocean. Where architecture, wellness and natural coastal tranquility converge seamlessly.
          </p>
        </div>

        {/* Hero Amenity — Horizon Pool Showcase */}
        <div className="relative mb-16 rounded-3xl overflow-hidden border border-white/15 shadow-2xl h-[450px] sm:h-[550px] group">
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-105"
            style={{ backgroundImage: `url('/assets/horizon_pool.jpg')` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1E2B35]/90 via-[#1E2B35]/20 to-transparent" />

          <div className="absolute bottom-10 left-10 right-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="max-w-xl">
              <div className="flex items-center gap-2 text-xs text-[#D9A441] font-mono tracking-widest uppercase mb-2">
                <Waves className="w-4 h-4" />
                <span>ROOFTOP AMENITY CROWN</span>
              </div>
              <h3 className="font-serif-editorial text-3xl sm:text-5xl text-[#F7F3EC] mb-2">
                The Horizon Infinity Pool
              </h3>
              <p className="text-xs sm:text-sm text-[#A7B6BC] font-light leading-relaxed">
                An elevated cantilevered edge pool designed so that the water surface visually merges into the vast ocean horizon.
              </p>
            </div>

            <div className="px-6 py-3 rounded-full border border-white/20 bg-black/40 backdrop-blur-md text-xs font-mono text-[#D9A441]">
              LEVEL 40 ROOFTOP
            </div>
          </div>
        </div>

        {/* Secondary Amenities Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {AUREA_DATA.amenities.slice(1).map((amenity, idx) => (
            <motion.div
              key={amenity.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15 }}
              className="group p-6 rounded-3xl border border-white/10 bg-[#35322E]/40 backdrop-blur-md flex flex-col justify-between h-[380px] hover:border-[#D9A441]/50 transition-all duration-300"
            >
              <div
                className="w-full h-44 rounded-2xl bg-cover bg-center mb-6 overflow-hidden transition-transform duration-500 group-hover:scale-102"
                style={{ backgroundImage: `url('${amenity.image}')` }}
              />

              <div>
                <span className="text-[9px] tracking-[0.25em] font-mono uppercase text-[#D9A441] block mb-1">
                  {amenity.subtitle}
                </span>
                <h4 className="font-serif-editorial text-2xl text-[#F7F3EC] mb-2">
                  {amenity.title}
                </h4>
                <p className="text-xs text-[#A7B6BC] font-light leading-relaxed">
                  {amenity.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
