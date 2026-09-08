import React from 'react';
import { Reveal, Lines } from '../ui.jsx';

const ITEMS = [
  ['Emails', '2h40'],
  ['Research', '3h15'],
  ['Reporting', '1h50'],
  ['Meetings', '3h00'],
  ['Admin', '2h10'],
  ['Content', '1h25'],
];

export default function Problem() {
  return (
    <section className="relative wrap pt-[12vh] md:pt-[18vh] pb-[10vh]">
      <Reveal className="grid-12">
        <div className="col-span-12 md:col-span-6">
          <p className="eyebrow fade">The problem</p>
          <h2 className="display-l mt-6">
            <Lines lines={['Your week', 'is full of work', 'you shouldn’t', 'be doing.']} />
          </h2>
          <p className="lede mt-10 max-w-[24rem] fade d3">
            High-value people spend too much time on repetitive, low-leverage work. It doesn’t have to be this way.
          </p>
        </div>

        <div className="col-span-12 md:col-span-5 md:col-start-8 mt-14 md:mt-2">
          <p className="eyebrow mb-6 fade">A typical week · hours that repeat</p>
          <ol>
            {ITEMS.map(([name, t], i) => (
              <li key={name} className={`ed-row fade d${Math.min(i + 1, 5)}`}>
                <span className="eyebrow">0{i + 1}</span>
                <span className="display-s" style={{ fontWeight: 400 }}>{name}</span>
                <span className="mono num text-[1.1rem] md:text-[1.3rem]">{t}</span>
              </li>
            ))}
          </ol>
          <p className="eyebrow mt-6 text-right fade d5">14H 20M of a 40H week. Most of it repeats.</p>
        </div>
      </Reveal>

      {/* From 40H to what matters */}
      <Reveal className="grid-12 mt-[18vh] md:mt-[26vh] items-end">
        <div className="col-span-12 md:col-span-3">
          <p className="eyebrow ink fade">From 40H</p>
          <p className="eyebrow ink fade d1">To what matters.</p>
          <div className="rule-ink mt-6 rule-grow" />
        </div>
        <div className="col-span-12 md:col-span-6 mt-8 md:mt-0">
          <div className="num text-[clamp(4.4rem,11vw,12rem)] leading-[0.88]">
            <Lines lines={['29H 40M']} />
          </div>
          <p className="eyebrow mt-5 fade d2">A lighter week.</p>
        </div>
        <div className="col-span-12 md:col-span-3 mt-10 md:mt-0 md:text-right">
          <p className="hand fade d3 inline-block" style={{ transform: 'rotate(-4deg)' }}>
            more time<br />for what<br />matters.
          </p>
        </div>
      </Reveal>
    </section>
  );
}
