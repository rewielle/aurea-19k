import React, { useEffect, useRef, useState, createContext, useContext } from 'react';

/* ---------- Reveal: toggles .is-in when element enters viewport (once) ---------- */
export function Reveal({ as: Tag = 'div', className = '', threshold = 0.18, rootMargin = '0px 0px -8% 0px', children, ...rest }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === 'undefined') { el.classList.add('is-in'); return; }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { el.classList.add('is-in'); io.unobserve(el); } });
    }, { threshold, rootMargin });
    io.observe(el);
    return () => io.disconnect();
  }, [threshold, rootMargin]);
  return <Tag ref={ref} className={className} {...rest}>{children}</Tag>;
}

/* ---------- Masked lines ---------- */
export function Lines({ lines, className = '' }) {
  return (
    <span className={className}>
      {lines.map((l, i) => (
        <span className="mask" key={i}><span>{l}</span></span>
      ))}
    </span>
  );
}

export const Arrow = ({ className = '' }) => (
  <svg className={`arrow ${className}`} width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M2 8h11M9 3.5 13.5 8 9 12.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const Play = () => (
  <span className="play"><svg viewBox="0 0 10 10" fill="currentColor" aria-hidden="true"><path d="M1.5 1l7.5 4-7.5 4z" /></svg></span>
);

/* ---------- Local clock (time is the material) ---------- */
export function Clock({ className = '' }) {
  const [t, setT] = useState('');
  useEffect(() => {
    const f = () => {
      const d = new Date();
      const p = (n) => String(n).padStart(2, '0');
      setT(`${p(d.getHours())}:${p(d.getMinutes())}:${p(d.getSeconds())}`);
    };
    f();
    const id = setInterval(f, 1000);
    return () => clearInterval(id);
  }, []);
  return <span className={`mono ${className}`} suppressHydrationWarning>{t}</span>;
}

export function useReducedMotion() {
  const [r, setR] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setR(mq.matches);
    const h = (e) => setR(e.matches);
    mq.addEventListener('change', h);
    return () => mq.removeEventListener('change', h);
  }, []);
  return r;
}

/* ---------- Drawer context (playbook / workshop / coaching) ---------- */
export const DrawerCtx = createContext({ open: () => {} });
export const useDrawer = () => useContext(DrawerCtx);

export const fmtTime = (min) => {
  const h = Math.floor(min / 60);
  const m = Math.round(min % 60);
  return m === 0 ? `${h}H` : `${h}H ${String(m).padStart(2, '0')}M`;
};
