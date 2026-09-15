import React, { useRef } from 'react';
import gsap from 'gsap';

/** Magnetic wrapper: element leans toward the cursor within `radius` px. */
export default function Magnetic({ children, strength = 0.35, radius = 90, className = '' }) {
  const ref = useRef(null);
  const onMove = (e) => {
    const el = ref.current;
    if (!el || window.matchMedia('(hover: none)').matches) return;
    const r = el.getBoundingClientRect();
    const dx = e.clientX - (r.left + r.width / 2);
    const dy = e.clientY - (r.top + r.height / 2);
    const d = Math.hypot(dx, dy);
    if (d > radius + Math.max(r.width, r.height)) return;
    gsap.to(el, { x: dx * strength, y: dy * strength, duration: 0.6, ease: 'power3.out' });
  };
  const onLeave = () => gsap.to(ref.current, { x: 0, y: 0, duration: 0.9, ease: 'elastic.out(1, 0.5)' });
  return (
    <div ref={ref} className={className} onMouseMove={onMove} onMouseLeave={onLeave} style={{ display: 'inline-block' }}>
      {children}
    </div>
  );
}
