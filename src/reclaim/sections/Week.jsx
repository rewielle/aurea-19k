import React, { useEffect, useMemo, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { fmtTime, useReducedMotion } from '../ui.jsx';

gsap.registerPlugin(ScrollTrigger);

/*
  THE WEEK COLLAPSES.
  40H → 36H 20M → 32H 10M → 29H 40M → +10H 20M back to you.
  Minutes per category per day (MON..FRI). Fold = the share a system can take.
*/
const CATS = {
  emails:    { label: 'Emails',    days: [40, 30, 35, 25, 30], fold: 120 / 160, stage: 0 },
  admin:     { label: 'Admin',     days: [30, 20, 35, 25, 20], fold: 100 / 130, stage: 0 },
  research:  { label: 'Research',  days: [45, 60, 30, 40, 20], fold: 150 / 195, stage: 1 },
  reporting: { label: 'Reporting', days: [25, 15, 20, 10, 40], fold: 100 / 110, stage: 1 },
  meetings:  { label: 'Meetings',  days: [60, 45, 30, 45, 0],  fold: 80 / 180,  stage: 2 },
  content:   { label: 'Content',   days: [20, 0, 25, 20, 20],  fold: 70 / 85,   stage: 2 },
};
const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
const ORDER = ['emails', 'meetings', 'core', 'research', 'core2', 'reporting', 'admin', 'content'];
const DAY_MIN = 480;

// stage windows on scroll progress
const STAGES = [[0.08, 0.30], [0.36, 0.58], [0.64, 0.82]];
const STAGE_LABELS = [
  ['01', 'Emails + admin', '−3H 40M'],
  ['02', 'Research + reporting', '−4H 10M'],
  ['03', 'Meeting notes + content', '−2H 30M'],
];
const FOLDS = Object.fromEntries(Object.entries(CATS).map(([k, c]) => {
  const total = c.days.reduce((a, b) => a + b, 0);
  const target = Math.round(total * c.fold);
  const f = c.days.map((m) => Math.round(m * c.fold));
  const diff = target - f.reduce((a, b) => a + b, 0);
  for (let i = f.length - 1; i >= 0; i--) { if (c.days[i]) { f[i] += diff; break; } }
  return [k, f];
}));
const smooth = (t) => (t <= 0 ? 0 : t >= 1 ? 1 : t * t * (3 - 2 * t));

function buildRows() {
  return DAYS.map((day, d) => {
    const taskTotal = Object.values(CATS).reduce((a, c) => a + c.days[d], 0);
    const core = DAY_MIN - taskTotal;
    const coreA = Math.round(core * 0.55), coreB = core - coreA;
    const segs = ORDER.map((k) => {
      if (k === 'core') return { key: 'core-a', cls: 'core', label: 'Your work', keep: coreA, fold: 0, stage: -1 };
      if (k === 'core2') return { key: 'core-b', cls: 'core', label: 'Your work', keep: coreB, fold: 0, stage: -1 };
      const c = CATS[k]; const m = c.days[d]; if (!m) return null;
      const f = FOLDS[k][d];
      return { key: k, cls: `task t-${k}`, label: c.label, keep: m - f, fold: f, stage: c.stage };
    }).filter(Boolean);
    return { day, segs, back: segs.reduce((a, s) => a + s.fold, 0) };
  });
}

export default function Week() {
  const rows = useMemo(buildRows, []);
  const root = useRef(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const el = root.current;
    const segMap = new Map(Array.from(el.querySelectorAll('[data-seg]')).map((n) => [n.dataset.seg, n]));
    const sysEls = el.querySelectorAll('[data-sys]');
    const backEls = el.querySelectorAll('[data-back]');
    const stageEls = el.querySelectorAll('[data-stage]');
    const totalEl = el.querySelector('[data-total]');
    const revealEl = el.querySelector('[data-reveal]');
    const boardEl = el.querySelector('[data-board]');
    const trackW = () => 100; // percent

    const apply = (p) => {
      const s = STAGES.map(([a, b]) => smooth((p - a) / (b - a)));
      let folded = 0;
      rows.forEach((row, r) => {
        let x = 0; let rowFold = 0;
        row.segs.forEach((seg, i) => {
          const f = seg.stage >= 0 ? s[seg.stage] : 0;
          const w = (seg.keep + seg.fold * (1 - f)) / DAY_MIN * trackW();
          const node = segMap.get(`${r}-${i}`);
          if (node) { node.style.left = `${x}%`; node.style.width = `${w}%`; node.style.opacity = seg.stage >= 0 && f > 0.98 && seg.keep === 0 ? '0' : '1'; }
          x += w; rowFold += seg.fold * f;
        });
        folded += rowFold;
        const sys = sysEls[r];
        const emptied = rowFold / DAY_MIN * 100;
        sys.style.left = `${x}%`; sys.style.width = `${emptied}%`; sys.style.opacity = emptied > 0.5 ? '1' : '0';
        backEls[r].style.opacity = emptied > 0.5 ? '1' : '0';
        backEls[r].textContent = `+${fmtTime(rowFold)}`;
      });
      totalEl.textContent = fmtTime(2400 - folded);
      stageEls.forEach((n, i) => {
        n.style.color = s[i] > 0.02 ? 'var(--blue)' : '';
        n.querySelector('[data-strike]').style.transform = `scaleX(${s[i]})`;
      });
      // the reveal
      const rv = smooth((p - 0.86) / 0.12);
      revealEl.style.opacity = rv;
      revealEl.style.transform = `translateY(${(1 - rv) * 24}px)`;
      boardEl.style.opacity = 1 - rv * 0.92;
    };

    if (reduced) { apply(1); return; }

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: el,
        start: 'top top',
        end: '+=380%',
        pin: el.querySelector('[data-pin]'),
        scrub: 0.6,
        onUpdate: (self) => apply(self.progress),
      });
    }, el);
    apply(0);
    return () => ctx.revert();
  }, [rows, reduced]);

  return (
    <section ref={root} className="relative" aria-label="The week collapses">
      <div data-pin className="min-h-[100svh] flex flex-col justify-center wrap py-24 md:py-0">
        <div className="grid-12 items-end">
          {/* Left: the number */}
          <div className="col-span-12 md:col-span-4 order-2 md:order-1 mt-10 md:mt-0">
            <p className="eyebrow">Signature 01 — The week collapses</p>
            <div data-total className="num text-[clamp(3.4rem,6.6vw,7.4rem)] leading-[0.9] mt-4 whitespace-nowrap">40H</div>
            <p className="eyebrow mt-3">Per week · repetitive work handled by systems</p>

            <ul className="mt-10 flex flex-col gap-3 max-w-[20rem]">
              {STAGE_LABELS.map(([n, l, delta]) => (
                <li key={n} data-stage className="relative flex items-baseline justify-between gap-4 eyebrow ink" style={{ transition: 'color .4s' }}>
                  <span className="flex gap-3"><span className="opacity-50">{n}</span>{l}</span>
                  <span className="opacity-70">{delta}</span>
                  <span data-strike className="absolute left-0 right-0 top-1/2 h-px bg-[var(--blue)] origin-left" style={{ transform: 'scaleX(0)' }} />
                </li>
              ))}
            </ul>
          </div>

          {/* Right: the material */}
          <div className="col-span-12 md:col-span-8 order-1 md:order-2 relative">
            <div data-board className="flex flex-col gap-3 md:gap-4" style={{ transition: 'opacity .2s' }}>
              <div className="flex justify-between eyebrow pb-2">
                <span>Mon — Fri · 5 × 8H</span>
                <span className="hidden sm:inline">Blue line = handled by a system</span>
              </div>
              {rows.map((row, r) => (
                <div className="week-row" key={row.day}>
                  <span className="week-day">{row.day.toUpperCase()}</span>
                  <div className="week-track">
                    {row.segs.map((seg, i) => (
                      <div key={seg.key + i} data-seg={`${r}-${i}`} className={`week-seg ${seg.cls}`}>
                        <span>{seg.label}</span>
                      </div>
                    ))}
                    <div data-sys className="week-sys" style={{ opacity: 0 }}>
                      <span className="week-tick" style={{ right: 0 }} />
                    </div>
                  </div>
                  <span data-back className="week-back">+0H</span>
                </div>
              ))}
              <div className="flex justify-between eyebrow pt-2">
                <span>0H</span><span>4H</span><span>8H</span>
              </div>
            </div>

            {/* The reveal */}
            <div data-reveal className="absolute inset-0 flex flex-col justify-center pointer-events-none" style={{ opacity: 0 }}>
              <div className="num text-[clamp(3.6rem,9.4vw,10rem)] leading-[0.9] text-[var(--blue)] whitespace-nowrap">+10H 20M</div>
              <div className="display-m mt-3">Back to you.</div>
              <p className="eyebrow mt-6">Every week. Without adding a single tool you have to manage.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
