import React from 'react';
import { Reveal, Lines } from '../ui.jsx';

/* PROOF — nothing invented. What you build. What you leave with. What changes. */
const ROWS = [
  ['Less admin', 'Scheduling, filing and follow-ups stop landing on you.'],
  ['Faster research', 'A question in the morning. A brief by lunch. Without you reading forty tabs.'],
  ['Clearer workflows', 'Every repeating task has a place, an owner and a system.'],
  ['More time', 'Hours that come back every week, not once.'],
];

export default function Changes() {
  return (
    <section className="wrap pt-[10vh] pb-[16vh]">
      <Reveal className="grid-12">
        <div className="col-span-12 md:col-span-4">
          <p className="eyebrow fade">What changes</p>
          <h2 className="display-m mt-6"><Lines lines={['What you', 'leave with.']} /></h2>
          <p className="body mt-6 max-w-[18rem] fade d2">No logos. No invented numbers. Only what you will actually build.</p>
        </div>
        <div className="col-span-12 md:col-span-8 mt-12 md:mt-0">
          {ROWS.map(([t, d], i) => (
            <div key={t} className={`group grid grid-cols-1 md:grid-cols-[1fr_1fr] gap-2 md:gap-8 py-7 border-t fade d${i + 1}`} style={{ borderColor: 'var(--line)' }}>
              <h3 className="display-m transition-transform duration-700 group-hover:translate-x-2" style={{ transitionTimingFunction: 'var(--ease)' }}>{t}</h3>
              <p className="body md:pt-3 max-w-[22rem]">{d}</p>
            </div>
          ))}
          <div className="rule" />
        </div>
      </Reveal>
    </section>
  );
}
