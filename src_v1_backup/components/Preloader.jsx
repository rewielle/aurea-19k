import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Preloader({ onComplete }) {
  const [step, setStep] = useState(0);

  useEffect(() => {
    // 1.5 - 1.8s sequence
    const timer1 = setTimeout(() => setStep(1), 300);
    const timer2 = setTimeout(() => setStep(2), 700);
    const timer3 = setTimeout(() => setStep(3), 1300);
    const timer4 = setTimeout(() => {
      setStep(4);
      if (onComplete) onComplete();
    }, 1800);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {step < 4 && (
        <motion.div
          exit={{ opacity: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#F4EFE5] text-[#35322E] bg-grain"
        >
          {/* Subtle Ambient Solar Glow */}
          <div className="absolute w-96 h-96 rounded-full bg-[#D9A441]/15 blur-3xl pointer-events-none -translate-y-12 animate-pulse" />

          <div className="relative flex flex-col items-center max-w-sm w-full px-8">
            {/* Sunrise Arc & Horizon Line */}
            <div className="relative w-48 h-24 overflow-hidden mb-6 flex items-end justify-center">
              {/* Rising Sun Arc */}
              <motion.div
                initial={{ y: 40, opacity: 0, scale: 0.7 }}
                animate={step >= 1 ? { y: 0, opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="w-28 h-28 rounded-full border-t-2 border-x border-[#D9A441] shadow-[0_0_30px_rgba(217,164,65,0.3)]"
              />
              {/* Fine Horizon Line */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={step >= 1 ? { scaleX: 1 } : {}}
                transition={{ duration: 0.6, ease: "easeInOut" }}
                className="absolute bottom-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#C8A776] to-transparent"
              />
            </div>

            {/* Wordmark A U R E A */}
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={step >= 2 ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="font-serif-editorial text-3xl sm:text-4xl tracking-[0.4em] text-[#35322E] uppercase font-light pl-2"
            >
              A U R E A
            </motion.h1>

            {/* Subtle Editorial Label */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={step >= 2 ? { opacity: 0.6 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-3 text-[10px] tracking-[0.3em] uppercase text-[#9A7552]"
            >
              DAWN · LIGHT · HORIZON
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
