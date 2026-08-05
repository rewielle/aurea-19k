import React from 'react';
import { Film, Info } from 'lucide-react';

export default function ReferenceVideoPlayer() {
  return (
    <div className="py-16 px-8 sm:px-16 max-w-7xl mx-auto bg-[#FAF7F1] text-[#312E2A] bg-grain min-h-[80vh]">
      <div className="flex items-center justify-between mb-8 border-b border-[#AD8557]/20 pb-4">
        <div>
          <span className="text-[10px] font-mono tracking-[0.35em] uppercase text-[#AD8557] block mb-1">
            REFERENCE INSPIRATION VIDEO
          </span>
          <h2 className="font-display text-3xl text-[#312E2A]">
            `inspo aurea hero.mp4` (From Downloads)
          </h2>
        </div>
        <span className="text-xs font-mono text-[#9A7552]">CINEMATIC NATURAL FORCE REFERENCE</span>
      </div>

      <div className="grid lg:grid-cols-12 gap-8 items-start">
        {/* Video Player */}
        <div className="lg:col-span-8 rounded-3xl overflow-hidden shadow-2xl border border-[#AD8557]/30 bg-[#263A46]">
          <video
            controls
            autoPlay
            muted
            loop
            src="/assets/inspo_hero.mp4"
            className="w-full h-auto max-h-[520px] object-cover"
          />
        </div>

        {/* Video Analysis Notes */}
        <div className="lg:col-span-4 p-8 rounded-3xl bg-[#F5F0E8] border border-[#AD8557]/25 space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono text-[#AD8557] font-bold">
            <Film className="w-4 h-4" />
            <span>REFERENCE ANALYSIS</span>
          </div>

          <h3 className="font-display text-2xl text-[#312E2A]">
            Translating the Reference into AUREA
          </h3>

          <ul className="text-xs text-[#312E2A]/85 font-light leading-relaxed space-y-3 border-t border-[#AD8557]/20 pt-4">
            <li>
              <strong>Waterfall → Sun & Ocean Axis</strong>: In the reference video, the waterfall is the generating natural force. In AUREA, the sun low on the ocean horizon and its specular axis on the sea becomes the physical source revealing the tower.
            </li>
            <li>
              <strong>Atmospheric Reveal</strong>: The building is born out of mist and solar light rather than appearing static.
            </li>
            <li>
              <strong>Minimalist Luxury Restraint</strong>: High scale, restrained text, zero dashboard cards or UI clutter.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
