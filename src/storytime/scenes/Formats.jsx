import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Img from '../components/Img';
import Magnetic from '../components/Magnetic';
import { Arrow } from '../components/icons';
import { IMG, FORMATS } from '../data';

gsap.registerPlugin(ScrollTrigger);

/**
 * 04 — BEAUTIFUL STORIES IN EVERY FORM. One physical composition that evolves.
 * Dominant interaction: the format switcher re-stages the objects.
 */
const STATES = {
  digital: { cover: { x: -40, z: -80, ry: -18, s: 0.94, o: 0.7 }, open: { x: -60, z: -120, s: 0.9, o: 0.75 }, tablet: { x: -20, z: 40, s: 1.04, o: 1 }, phone: { x: -30, y: -30, z: 160, s: 1.16, o: 1 } },
  printed: { cover: { x: 60, z: 140, ry: -10, s: 1.14, o: 1 }, open: { x: 0, z: 40, s: 1.04, o: 1 }, tablet: { x: 60, z: -100, s: 0.9, o: 0.6 }, phone: { x: 60, y: 10, z: -120, s: 0.9, o: 0.55 } },
  audio: { cover: { x: -20, z: -120, ry: -18, s: 0.9, o: 0.6 }, open: { x: -40, z: -160, s: 0.86, o: 0.55 }, tablet: { x: 20, z: -60, s: 0.94, o: 0.7 }, phone: { x: -120, y: -60, z: 260, s: 1.42, o: 1 } },
  share: { cover: { x: 0, z: 0, ry: -14, s: 1, o: 1 }, open: { x: 0, z: 0, s: 1, o: 1 }, tablet: { x: 0, z: 0, s: 1, o: 1 }, phone: { x: 0, y: 0, z: 60, s: 1.05, o: 1 } },
};

export default function Formats({ reduced }) {
  const root = useRef(null);
  const [fmt, setFmt] = useState('printed');

  useEffect(() => {
    const s = STATES[fmt];
    const ctx = gsap.context(() => {
      const d = reduced ? 0.2 : 1.2;
      gsap.to('.obj--cover', { x: s.cover.x, z: s.cover.z, rotateY: s.cover.ry, scale: s.cover.s, opacity: s.cover.o, duration: d, ease: 'power3.inOut' });
      gsap.to('.obj--open', { x: s.open.x, z: s.open.z, scale: s.open.s, opacity: s.open.o, duration: d, ease: 'power3.inOut' });
      gsap.to('.obj--tablet', { x: s.tablet.x, z: s.tablet.z, scale: s.tablet.s, opacity: s.tablet.o, duration: d, ease: 'power3.inOut' });
      gsap.to('.obj--phone', { x: s.phone.x, y: s.phone.y ?? 0, z: s.phone.z, scale: s.phone.s, opacity: s.phone.o, duration: d, ease: 'power3.inOut' });
      gsap.to('.device__audio', { opacity: fmt === 'audio' ? 1 : 0, duration: 0.6, ease: 'power2.out' });
    }, root);
    return () => ctx.revert();
  }, [fmt, reduced]);

  useEffect(() => {
    if (reduced) return;
    const ctx = gsap.context(() => {
      gsap.from('.formats__copy > *', { y: 30, opacity: 0, stagger: 0.1, duration: 1.4, ease: 'power3.out', scrollTrigger: { trigger: root.current, start: 'top 60%' } });
      gsap.from('.obj', { y: 80, opacity: 0, stagger: 0.08, duration: 1.6, ease: 'power3.out', scrollTrigger: { trigger: root.current, start: 'top 60%' } });
      gsap.to('.formats__scene', { y: -60, ease: 'none', scrollTrigger: { trigger: root.current, start: 'top bottom', end: 'bottom top', scrub: true } });
      // Scrolling through the section also walks the formats
      const ids = FORMATS.map((f) => f.id);
      ScrollTrigger.create({
        trigger: root.current, start: 'top 20%', end: 'bottom 80%',
        onUpdate: (self) => setFmt(ids[Math.min(ids.length - 1, Math.floor(self.progress * ids.length))]),
      });
    }, root);
    return () => ctx.revert();
  }, [reduced]);

  return (
    <section ref={root} className="formats" id="gifts" data-nav="dark" aria-label="Beautiful stories in every form">
      <div className="formats__stage">
        <div className="formats__bg" aria-hidden="true"><Img src={IMG.bedside} alt="" /></div>

        <div className="formats__copy">
          <div className="eyebrow">Stories that last</div>
          <h2 className="display formats__title">Beautiful stories<br />in every form.</h2>
          <p className="lead formats__lead">Read it tonight on a phone. Print it as a hardcover. Listen to it on the road. The same story, wherever they are.</p>
          <div style={{ marginTop: 28 }}>
            <Magnetic><a href="#pricing" className="btn btn--ivory">Explore formats <Arrow /></a></Magnetic>
          </div>
        </div>

        <div className="formats__switch" role="tablist" aria-label="Formats">
          {FORMATS.map((f) => (
            <button key={f.id} role="tab" aria-selected={fmt === f.id} className={fmt === f.id ? 'is-on' : ''} onMouseEnter={() => setFmt(f.id)} onClick={() => setFmt(f.id)}>
              {f.label}
            </button>
          ))}
        </div>

        <div className="formats__scene" aria-hidden="true">
          <div className="obj obj--shadow" />
          <div className="obj obj--cover">
            <div className="book">
              <div className="book__cover"><Img src={IMG.cover_a} alt="" /></div>
              <div className="book__spine" />
              <div className="book__title"><small>Storytime</small>Luna and the<br />Star Who Followed Her</div>
              <div className="book__pages" />
            </div>
          </div>
          <div className="obj obj--open">
            <div className="spread">
              <div className="spread__page"><Img src={IMG.spread_a} alt="" /></div>
              <div className="spread__page spread__page--text">
                Together, they discovered that the bravest journeys often lead to the most beautiful places.
                <span className="pg">14</span>
              </div>
            </div>
          </div>
          <div className="obj obj--tablet">
            <div className="device device--tablet">
              <div className="device__screen">
                <Img src={IMG.luna_env} alt="" />
                <div className="device__ui"><b>Luna and the Star Who Followed Her</b><small>Chapter three · Read</small></div>
              </div>
            </div>
          </div>
          <div className="obj obj--phone">
            <div className="device">
              <div className="device__screen">
                <Img src={IMG.luna_photo} alt="" />
                <div className="device__ui"><b>Luna and the Star</b><small>Now reading</small></div>
                <div className="device__audio">
                  <div className="bars"><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /></div>
                  <div className="play" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
