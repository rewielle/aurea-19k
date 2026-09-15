import React, { useEffect, useMemo, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Img from '../components/Img';
import { IMG, TILES } from '../data';
import { lerp, seg, easeInOut, easeOut, easeIn, mulberry32 } from '../lib/math';

gsap.registerPlugin(ScrollTrigger);

const TYPED = 'A story about Luna, her golden retriever, and the day they moved to a new home.';
const ORBIT_END = 0.46; // share of the pinned scroll given to the orbit; the rest is the transformation

/**
 * 02 + 03 — THE SIGNATURE SCROLL MOMENT and CHAT → STORY, in ONE pinned stage.
 * Ring → rotation → break-up → horizontal timeline → stack → book → page → canvas
 * → photo → illustration → scene → text → spread. No reset in between.
 */
export default function StoryScene({ reduced }) {
  const root = useRef(null);
  const stage = useRef(null);
  const tilesRef = useRef([]);
  const [isMobile, setIsMobile] = useState(() => window.matchMedia('(max-width: 900px)').matches);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 900px)');
    const on = () => setIsMobile(mq.matches);
    on(); mq.addEventListener('change', on);
    return () => mq.removeEventListener('change', on);
  }, []);

  const tiles = useMemo(() => (isMobile ? TILES.filter((_, i) => i % 2 === 0) : TILES), [isMobile]);

  // Per-tile seeded choreography parameters
  const params = useMemo(() => {
    const rnd = mulberry32(19);
    return tiles.map((t, i) => ({
      w: isMobile ? 58 + rnd() * 26 : 76 + rnd() * 40,
      ar: t.ar,
      sx: (rnd() - 0.5) * 1.5, // scatter x in vw fractions
      sy: (rnd() - 0.5) * 1.1,
      sr: (rnd() - 0.5) * 70,
      ss: 0.7 + rnd() * 0.9,
      t0: (rnd() - 0.5) * 0.1, // timing offset
      behind: rnd() < 0.35,
      hero: i === 7, // the one card that crosses close to camera
    }));
  }, [tiles, isMobile]);

  useEffect(() => {
    const el = root.current;
    const N = tiles.length;
    const center = el.querySelector('.orbit__center');
    const book = el.querySelector('.orbit__book');
    const caption = el.querySelector('.orbit__caption');
    const tBook = el.querySelector('.trans__book');
    const tCover = el.querySelector('.trans__book .book');
    const tPage = el.querySelector('.trans__page');
    const tComposer = el.querySelector('.trans__composer');
    const tTyped = el.querySelector('.trans__typed');
    const tChip = el.querySelector('.trans__chip');
    const tCanvas = el.querySelector('.trans__canvas');
    const lIllus = el.querySelector('.layer--illus');
    const lEnv = el.querySelector('.layer--env');
    const lGrain = el.querySelector('.layer--grain');
    const lPhoto = el.querySelector('.layer--photo');
    const tCopy = el.querySelector('.trans__copy');
    const tPaper = el.querySelector('.trans__paper');
    const tSpine = el.querySelector('.trans__spineline');
    const tLine = el.querySelector('.trans__line');
    const steps = Array.from(el.querySelectorAll('.trans__stepper span'));
    const veil = el.querySelector('.scene__veil');

    const setStep = (k) => steps.forEach((s, i) => s.classList.toggle('is-on', i === k));

    const render = (P) => {
      const vw = window.innerWidth, vh = window.innerHeight;
      const S = Math.min(vw, vh);
      const R = isMobile ? S * 0.44 : Math.min(S * 0.42, vw * 0.3);
      const bookW = isMobile ? 160 : 220;
      const bookH = bookW * 4 / 3;

      /* ───────── ORBIT (p ∈ 0..1 of first share) ───────── */
      const p = seg(P, 0, ORBIT_END);
      const rot = -p * 2.4; // radians of ring rotation across the whole scene (slow)
      const lineSpacing = isMobile ? 70 : 104;
      let focusIdx = -1, focusBest = -1;

      tilesRef.current.forEach((node, i) => {
        if (!node) return;
        const q = params[i];
        const baseA = (i / N) * Math.PI * 2 - Math.PI / 2;

        // — ring state
        const a = baseA + rot * (p < 0.15 ? 0 : easeOut(seg(p, 0.15, 0.6)));
        const depth = (Math.sin(a) + 1) / 2; // 0 top (far) → 1 bottom (near)
        const ringX = Math.cos(a) * R;
        const ringY = Math.sin(a) * R * 0.86;
        const ringRot = (a * 180) / Math.PI + 90;
        const ringS = lerp(0.86, 1.14, depth) * (p > 0.15 ? lerp(1, 1.06, easeInOut(seg(p, 0.15, 0.3))) : 1);
        const ringW = q.w, ringH = q.w / q.ar;

        // — scatter state (30–60)
        const scX = q.sx * vw, scY = q.sy * vh, scR = q.sr, scS = q.hero ? 2.4 : q.ss;
        // — line state (60–88)
        const lineIdx = i - (N - 1) / 2;
        const spacing = lerp(lineSpacing, isMobile ? 10 : 14, easeInOut(seg(p, 0.76, 0.9)));
        const lineX = lineIdx * spacing, lineY = 0;
        const lineW = bookW * 0.62, lineH = bookH * 0.62;
        // — stack state (88–100)
        const stackX = (i - N / 2) * 0.9, stackY = (i - N / 2) * -0.5;

        let x, y, r, s, w, h, op = 1, blur = 0, z = 10;
        const tOff = q.t0;
        if (p < 0.3 + tOff) {
          x = ringX; y = ringY; r = ringRot; s = ringS; w = ringW; h = ringH; z = 10 + Math.round(depth * 10);
          const fadeIn = easeOut(seg(p, 0, 0.08 + (i / N) * 0.06));
          op = fadeIn; s *= lerp(0.6, 1, fadeIn);
          if (p > 0.12 && depth > focusBest) { focusBest = depth; focusIdx = i; }
        } else if (p < 0.6 + tOff) {
          const t = easeInOut(seg(p, 0.3 + tOff, 0.6 + tOff));
          x = lerp(ringX, scX, t); y = lerp(ringY, scY, t); r = lerp(ringRot, scR, t);
          s = lerp(ringS, scS, Math.sin(t * Math.PI) * 0.9 + t * 0.1);
          w = ringW; h = ringH;
          z = q.behind ? 1 : q.hero ? 40 : 12;
          blur = q.hero ? Math.sin(t * Math.PI) * 6 : q.behind ? Math.sin(t * Math.PI) * 2 : 0;
          op = q.behind ? lerp(1, 0.55, Math.sin(t * Math.PI)) : 1;
        } else if (p < 0.88) {
          const t = easeInOut(seg(p, 0.6 + tOff, 0.78 + tOff * 0.5));
          x = lerp(scX, lineX, t); y = lerp(scY, lineY, t); r = lerp(scR, 0, t);
          s = lerp(q.hero ? 1.6 : q.ss, 1, t);
          w = lerp(ringW, lineW, t); h = lerp(ringH, lineH, t);
          z = 10 + i; blur = 0; op = 1;
        } else {
          const t = easeInOut(seg(p, 0.88, 1));
          x = lerp(lineX, stackX, t); y = lerp(lineY, stackY, t); r = lerp(0, (i % 3 - 1) * 0.6, t);
          s = 1; w = lerp(lineW, bookW, t); h = lerp(lineH, bookH, t);
          z = 10 + i; op = i < N - 3 ? lerp(1, 0.0, easeIn(seg(p, 0.96, 1))) : 1;
        }
        node.style.width = `${w}px`;
        node.style.height = `${h}px`;
        node.style.zIndex = z;
        node.style.opacity = op;
        node.style.filter = blur > 0.2 ? `blur(${blur.toFixed(1)}px)` : 'none';
        node.style.transform = `translate(-50%,-50%) translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0) rotate(${r.toFixed(2)}deg) scale(${s.toFixed(3)})`;
        node.style.borderRadius = p > 0.88 ? '6px 10px 10px 6px' : '10px';
      });
      tilesRef.current.forEach((n, i) => n && n.classList.toggle('is-focus', i === focusIdx && p > 0.12 && p < 0.32));

      // Center text: still, then yields to the stack.
      const textOp = 1 - easeInOut(seg(p, 0.8, 0.9));
      center.style.opacity = textOp;
      center.style.transform = `translateY(${(-24 * (1 - textOp)).toFixed(1)}px)`;

      // The stack acquires a cover and thickness → book.
      const bookOp = easeInOut(seg(p, 0.94, 1));
      book.style.opacity = bookOp;
      book.style.width = `${bookW}px`;
      book.style.transform = `translate(-50%,-50%) rotate(${lerp(-0.6, 0, bookOp).toFixed(2)}deg)`;
      caption.style.opacity = easeInOut(seg(p, 0.97, 1)) * (1 - easeInOut(seg(P, ORBIT_END + 0.02, ORBIT_END + 0.06)));

      /* ───────── TRANSFORMATION (q ∈ 0..1 of the remaining share) ───────── */
      const q = seg(P, ORBIT_END, 1);
      const orbitDone = P >= ORBIT_END;
      el.querySelector('.orbit__field').style.opacity = orbitDone ? 0 : 1;
      book.style.opacity = orbitDone ? 0 : bookOp;
      tBook.style.opacity = orbitDone ? 1 - easeInOut(seg(q, 0.16, 0.24)) : 0;
      tBook.style.width = `${bookW}px`;

      // 0–0.10: cover opens; 0.06–0.20: a page lifts and grows into a canvas
      const open = easeInOut(seg(q, 0, 0.1));
      tCover.style.transform = `perspective(1200px) rotateY(${(-open * 150).toFixed(1)}deg)`;
      tCover.style.transformOrigin = 'left center';
      tBook.style.transform = `translate(-50%,-50%) translateX(${(open * -bookW * 0.3).toFixed(1)}px)`;
      const lift = easeInOut(seg(q, 0.06, 0.2));
      const composerW = Math.min(vw * 0.64, 820), composerH = 190;
      tPage.style.opacity = lift > 0 ? 1 - easeInOut(seg(q, 0.2, 0.26)) : 0;
      tPage.style.width = `${lerp(bookW, isMobile ? vw - 40 : composerW, lift)}px`;
      tPage.style.height = `${lerp(bookH, composerH, lift)}px`;
      tPage.style.transform = `translate(-50%,-50%) translateY(${lerp(0, -30, lift).toFixed(1)}px) rotate(${lerp(-2, 0, lift)}deg)`;
      tPage.style.borderRadius = `${lerp(6, 26, lift)}px`;

      // 0.18–0.28: composer returns; 0.24–0.34 typing; 0.32–0.38 photo chip
      const cIn = easeInOut(seg(q, 0.18, 0.26));
      const cOut = easeInOut(seg(q, 0.4, 0.46));
      tComposer.style.opacity = cIn * (1 - cOut);
      tComposer.style.transform = `translate(-50%,-50%) translateY(${lerp(-30, 0, cIn) - cOut * 20}px) scale(${lerp(1, 0.96, cOut)})`;
      const chars = Math.round(easeOut(seg(q, 0.24, 0.34)) * TYPED.length);
      tTyped.textContent = TYPED.slice(0, chars);
      tChip.style.opacity = easeInOut(seg(q, 0.33, 0.37));
      tChip.style.transform = `translateY(${lerp(8, 0, easeInOut(seg(q, 0.33, 0.37)))}px)`;
      setStep(q < 0.44 ? 0 : q < 0.56 ? 1 : q < 0.68 ? 2 : q < 0.84 ? 3 : 4);

      // 0.40–0.56: photo detaches from the chip and grows to almost the viewport
      const grow = easeInOut(seg(q, 0.4, 0.56));
      const cw = lerp(34, isMobile ? vw : vw, grow), ch = lerp(34, vh, grow);
      tCanvas.style.opacity = q > 0.4 ? 1 : 0;
      tCanvas.style.width = `${cw}px`;
      tCanvas.style.height = `${ch}px`;
      tCanvas.style.borderRadius = `${lerp(8, 0, grow)}px`;
      const shrink = easeInOut(seg(q, 0.84, 0.96)); // final: becomes a printed spread
      const spreadW = isMobile ? vw * 0.9 : Math.min(vw * 0.62, 940);
      const spreadH = spreadW * 5 / 8;
      if (shrink > 0) {
        tCanvas.style.width = `${lerp(vw, spreadW, shrink)}px`;
        tCanvas.style.height = `${lerp(vh, spreadH, shrink)}px`;
        tCanvas.style.borderRadius = `${lerp(0, 6, shrink)}px`;
      }
      tCanvas.style.transform = `translate(-50%,-50%) translate3d(${lerp(-composerW / 2 + 52, 0, grow)}px, ${lerp(composerH / 2 - 60, 0, grow)}px, 0)`;

      // 0.52–0.62: photo → illustration; 0.60–0.70: the environment appears around the character
      const paint = easeInOut(seg(q, 0.52, 0.62));
      lIllus.style.opacity = paint;
      lGrain.style.opacity = paint * 0.9;
      const env = easeInOut(seg(q, 0.6, 0.7));
      lEnv.style.opacity = env;
      const charScale = lerp(1, isMobile ? 0.62 : 0.56, env);
      const charX = lerp(0, isMobile ? 0 : -cw * 0.22, env), charY = lerp(0, isMobile ? -ch * 0.16 : ch * 0.12, env);
      [lIllus, lPhoto, lGrain].forEach((L) => {
        L.style.transform = `translate3d(${charX.toFixed(1)}px, ${charY.toFixed(1)}px, 0) scale(${charScale.toFixed(3)})`;
        L.style.borderRadius = `${env * 14}px`;
        L.style.overflow = 'hidden';
      });
      lPhoto.style.opacity = 1 - paint * 0.15;

      // 0.68–0.76: editorial story copy; 0.74–0.82: paper boundaries + spine → spread
      const copy = easeInOut(seg(q, 0.68, 0.76));
      tCopy.style.opacity = copy;
      tCopy.style.transform = `translateY(${lerp(20, 0, copy)}px)`;
      tPaper.style.opacity = easeInOut(seg(q, 0.74, 0.82));
      tSpine.style.opacity = easeInOut(seg(q, 0.78, 0.84)) * (1 - shrink * 0.4);
      tLine.style.opacity = easeInOut(seg(q, 0.9, 0.97));
      tLine.style.transform = `translateX(-50%) translateY(${lerp(14, 0, easeInOut(seg(q, 0.9, 0.97)))}px)`;

      // 0.96–1: the ivory stage becomes night — the next chapter arrives without a cut.
      veil.style.opacity = easeInOut(seg(q, 0.965, 1));
    };

    if (reduced) {
      // Reduced motion: staged, static composition (ring + book + spread) without pinning.
      render(0.12);
      el.querySelector('.orbit__stage').style.height = 'auto';
      return;
    }

    const st = ScrollTrigger.create({
      trigger: root.current,
      start: 'top top',
      end: () => `+=${isMobile ? 520 : 680}%`,
      pin: stage.current,
      scrub: 0.6,
      anticipatePin: 1,
      onUpdate: (self) => render(self.progress),
      onRefresh: (self) => render(self.progress),
      invalidateOnRefresh: true,
    });
    render(0);
    ScrollTrigger.refresh();
    return () => st.kill();
  }, [tiles, params, isMobile, reduced]);

  return (
    <section ref={root} className="orbit" id="stories" data-nav="light" aria-label="Who is your story for">
      <div ref={stage} className="orbit__stage">
        {/* ── ORBIT ── */}
        <div className="orbit__center">
          <div>
            <h2 className="display orbit__title">Who is your story for?</h2>
            <div className="orbit__micro">For every person who matters</div>
          </div>
        </div>
        <div className="orbit__field" aria-hidden="true">
          {tiles.map((t, i) => (
            <div key={t.key + i} className="tile" ref={(n) => (tilesRef.current[i] = n)}>
              <Img src={IMG[t.key]} alt="" />
              <span className="tile__label">{t.label}</span>
            </div>
          ))}
        </div>
        <div className="orbit__book" aria-hidden="true">
          <div className="book">
            <div className="book__cover"><Img src={IMG.cover_a} alt="" /></div>
            <div className="book__spine" />
            <div className="book__title"><small>A Storytime book</small>Every one of them,<br />in one story.</div>
            <div className="book__pages" />
          </div>
        </div>
        <div className="orbit__caption" aria-hidden="true">The whole orbit was becoming a story</div>

        {/* ── TRANSFORMATION ── */}
        <div className="trans__stepper" aria-hidden="true">
          <span className="is-on">Photo</span><span>Character</span><span>Scene</span><span>Page</span><span>Book</span>
        </div>
        <div className="trans__book" aria-hidden="true" style={{ opacity: 0 }}>
          <div className="book">
            <div className="book__cover"><Img src={IMG.cover_a} alt="" /></div>
            <div className="book__spine" />
            <div className="book__title"><small>A Storytime book</small>Every one of them,<br />in one story.</div>
          </div>
        </div>
        <div className="trans__page" aria-hidden="true" />
        <div className="trans__composer" aria-hidden="true">
          <div className="composer">
            <div className="composer__field trans__typed" style={{ minHeight: 96 }} />
            <div className="trans__chip composer__photo" style={{ opacity: 0 }}>
              <Img src={IMG.luna_photo} alt="" /><span>luna-and-me.jpg</span>
            </div>
            <div className="composer__bar">
              <span className="composer__tool"><span className="plus">+</span><span className="label">Add a person</span></span>
              <span className="composer__spacer" />
              <span className="btn btn--navy">Create story</span>
            </div>
          </div>
        </div>
        <div className="trans__canvas" aria-hidden="true">
          <div className="layer layer--env"><Img src={IMG.luna_env} alt="" /></div>
          <div className="layer layer--photo"><Img src={IMG.luna_photo} alt="" /></div>
          <div className="layer layer--illus"><Img src={IMG.luna_photo} alt="" /></div>
          <div className="layer layer--grain" />
          <div className="trans__copy">
            <p>The boxes were still closed when Luna decided the new house needed exploring first — and that the lighthouse across the bay needed a name.</p>
            <small>Chapter one · The day we moved</small>
          </div>
          <div className="trans__paper" />
          <div className="trans__spineline" />
        </div>
        <div className="trans__line display" aria-hidden="true">From an idea to a story made just for them.</div>
        <div className="scene__veil" aria-hidden="true" style={{ position: 'absolute', inset: 0, background: 'var(--navy)', opacity: 0, zIndex: 20, pointerEvents: 'none' }} />
      </div>
      <p className="sr-only">Storytime creates stories for children, partners, parents, grandparents, friends, pets, birthdays and special occasions. Add a photo and an idea; Storytime turns it into an illustrated book.</p>
    </section>
  );
}
