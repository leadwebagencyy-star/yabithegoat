import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export function Preloader() {
  const [visible, setVisible] = useState(() => {
    if (typeof window !== 'undefined') {
      return !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }
    return false;
  });

  useEffect(() => {
    if (!visible) return;
    const timer = window.setTimeout(() => {
      setVisible(false);
    }, 900);
    return () => window.clearTimeout(timer);
  }, [visible]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="yabi-preloader"
          initial={{ opacity: 1, y: 0 }}
          exit={{ y: '-100%', opacity: 0.98 }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          onClick={() => setVisible(false)}
          className="fixed inset-0 z-50 flex flex-col justify-between bg-[#050505] px-6 py-8 md:px-12 cursor-pointer select-none"
          aria-hidden="true"
        >
          <div className="flex items-center justify-between text-xs text-[#A1A1AA]">
            <span className="font-mono tabular-nums">YABI®</span>
            <span>Click to enter</span>
          </div>

          <div className="overflow-hidden">
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: '0%' }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              className="font-display text-6xl font-extrabold tracking-tight text-[#F4F2EE] sm:text-8xl md:text-[9rem] leading-none"
            >
              YABI<span className="text-[#FF1E2D]">.</span>
            </motion.div>
          </div>

          <div className="flex items-center justify-between border-t border-white/10 pt-4 text-xs text-[#A1A1AA]">
            <span>Independent Sound · Nepal</span>
            <span className="font-mono tabular-nums">Direction 01</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
