import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const EASE = [0.16, 1, 0.3, 1];

export default function Preloader({ onDone }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const t = setTimeout(() => {
      setVisible(false);
      onDone?.();
    }, reduce ? 200 : 1900);
    return () => clearTimeout(t);
  }, [onDone]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="loader"
          className="fixed inset-0 z-[90] flex items-center justify-center bg-[var(--ink)]"
          exit={{ clipPath: 'inset(0 0 100% 0)' }}
          transition={{ duration: 1.1, ease: [0.76, 0, 0.24, 1] }}
          style={{ clipPath: 'inset(0 0 0 0)' }}
          aria-hidden="true"
        >
          <div className="relative flex flex-col items-center">
            {/* Horizon line */}
            <motion.div
              className="h-px w-[42vw] max-w-[320px] bg-[var(--gold)] origin-center"
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 0.9 }}
              transition={{ duration: 1.2, ease: EASE, delay: 0.15 }}
            />
            {/* Wordmark rising from the horizon */}
            <div className="overflow-hidden mt-5">
              <motion.div
                className="wordmark text-[var(--off)] text-[1.05rem] sm:text-[1.3rem] tracking-[0.18em]"
                initial={{ y: '110%' }}
                animate={{ y: '0%' }}
                transition={{ duration: 1, ease: EASE, delay: 0.55 }}
              >
                Eder Noronha
              </motion.div>
            </div>
            <div className="overflow-hidden mt-2">
              <motion.div
                className="label text-[0.58rem] tracking-[0.5em]"
                initial={{ y: '110%', opacity: 0 }}
                animate={{ y: '0%', opacity: 1 }}
                transition={{ duration: 0.9, ease: EASE, delay: 0.85 }}
              >
                Do mar ao palco
              </motion.div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
