import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const EASE = [0.16, 1, 0.3, 1];

/** Masked line-by-line reveal for display titles. `lines` = array of strings. */
export function Lines({ lines, className = '', lineClass = '', delay = 0, as: Tag = 'h2', once = true, amount = 0.4 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once, amount });
  return (
    <Tag ref={ref} className={className}>
      {lines.map((line, i) => (
        <span key={i} className={`block overflow-hidden pt-[0.14em] -mt-[0.14em] ${lineClass}`}>
          <motion.span
            className="block will-change-transform"
            initial={{ y: '112%' }}
            animate={inView ? { y: '0%' } : { y: '112%' }}
            transition={{ duration: 1.1, ease: EASE, delay: delay + i * 0.09 }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}

/** Fade + rise for paragraphs, labels and blocks. */
export function Fade({ children, className = '', delay = 0, y = 24, once = true, amount = 0.3, duration = 1 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once, amount });
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y }}
      transition={{ duration, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}

/** Horizontal hairline that draws itself in. */
export function Rule({ className = '', delay = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  return (
    <motion.div
      ref={ref}
      className={`h-px bg-[var(--off-10)] origin-left ${className}`}
      initial={{ scaleX: 0 }}
      animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
      transition={{ duration: 1.4, ease: EASE, delay }}
    />
  );
}
