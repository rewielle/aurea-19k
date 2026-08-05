import React from 'react';

export default function VisualRationale() {
  return (
    <div className="py-20 px-6 sm:px-12 max-w-7xl mx-auto bg-grain text-[#312E2A]">
      <div className="flex items-center justify-between mb-8 border-b border-[#AD8557]/20 pb-4">
        <span className="text-[10px] tracking-[0.35em] font-mono uppercase text-[#AD8557]">
          DELIVERABLE F — VISUAL RATIONALE
        </span>
        <span className="text-xs font-mono text-[#9A7552]">AUREA V2 ARCHITECTURAL LOCK</span>
      </div>

      <h2 className="font-display text-4xl sm:text-5xl text-[#312E2A] mb-8">
        Why the V2 Foundation reaches Awwwards & High-End Studio Level
      </h2>

      <div className="grid md:grid-cols-2 gap-8 text-xs sm:text-sm text-[#312E2A]/85 leading-relaxed font-light">
        <div className="p-6 rounded-2xl bg-[#F5F0E8] border border-[#AD8557]/20 space-y-3">
          <h3 className="font-display text-xl text-[#312E2A] font-medium">
            1. Contemporary Editorial Typography (Newsreader)
          </h3>
          <p>
            Replaced generic Didone/Garamond serifs with <em>Newsreader</em> — a high-contrast, sculptural contemporary display serif designed specifically for large-scale editorial publishing. The title scales monumentally up to 152px (`clamp(4.25rem, 8.5vw, 9.5rem)`), creating an immediate architectural presence rather than a wedding invitation feel.
          </p>
        </div>

        <div className="p-[#AD8557]/10 p-6 rounded-2xl bg-[#F5F0E8] border border-[#AD8557]/20 space-y-3">
          <h3 className="font-display text-xl text-[#312E2A] font-medium">
            2. Proprietary Horizontal Horizon Wordmark
          </h3>
          <p>
            The AUREA mark is strictly preserved as one single word. A custom 1.5px solar gold line aligns cleanly with the crossbar of the letter "A", subtly grounding the brand in the horizon without splitting letters or relying on cliché real estate monograms.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-[#F5F0E8] border border-[#AD8557]/20 space-y-3">
          <h3 className="font-display text-xl text-[#312E2A] font-medium">
            3. Monumental Building & Horizon Scale
          </h3>
          <p>
            The approved curved tower occupies 45% of the desktop composition, ensuring that the architectural geometry (curved balconies, glass reflections, travertine base) is immediately legible. Sunlight acts as the primary construction force in Hero A, while Hero B delivers a continuous spatial entrance through balcony glass.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-[#F5F0E8] border border-[#AD8557]/20 space-y-3">
          <h3 className="font-display text-xl text-[#312E2A] font-medium">
            4. Elimination of Card-based Clutter
          </h3>
          <p>
            Removed all pills, floating widgets, time badges, and boxed dashboards from the hero and navigation. The header now consists purely of the wordmark, minimal navigation links, and a discreet line-button CTA, letting the atmosphere and architecture speak.
          </p>
        </div>
      </div>
    </div>
  );
}
