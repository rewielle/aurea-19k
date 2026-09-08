import React from 'react';
import { Reveal, Lines } from '../ui.jsx';

/* SIGNATURE 03 — TIME RETURNS AS SPACE. Smaller text, larger margins, warmer light. */
export default function Philosophy() {
  return (
    <section id="philosophy" data-warm className="relative overflow-hidden scroll-mt-0">
      <div className="wrap min-h-[140vh] flex flex-col justify-center py-[20vh]">
        <Reveal className="grid-12">
          <div className="col-span-12 md:col-span-7 md:col-start-3">
            <p className="eyebrow fade">Why this exists</p>
            <h2 className="mt-12 font-medium tracking-[-0.035em] leading-[1]" style={{ fontSize: 'clamp(2.2rem, 4.8vw, 5rem)' }}>
              <Lines lines={['Technology should', 'give you more life.']} />
            </h2>
          </div>
        </Reveal>

        <Reveal className="grid-12 mt-[22vh]">
          <div className="col-span-10 md:col-span-4 md:col-start-3 flex flex-col gap-[3.2rem] md:gap-[4.4rem]">
            {['Not just more productivity.', 'More clarity.', 'More space.', 'More of what only you can do.'].map((l, i) => (
              <p key={l} className={`lede fade d${i + 1}`} style={{ color: 'var(--ink-2)' }}>{l}</p>
            ))}
          </div>
        </Reveal>
      </div>

      {/* Warm image sitting partially outside the grid */}
      <Reveal className="absolute right-0 bottom-[6vh] w-[62vw] md:w-[38vw] translate-x-[14%]" threshold={0.05}>
        <div className="photo aspect-[16/10] fade d2">
          <img src="/reclaim/sea-light.jpg" alt="Soft evening light over open water" loading="lazy" />
        </div>
      </Reveal>
      <p className="absolute left-[var(--gutter)] bottom-[8vh] eyebrow hidden md:block">Less busywork.<br />More possibility.</p>
    </section>
  );
}
