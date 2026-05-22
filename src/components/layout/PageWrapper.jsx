import React, { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

const contentVariants = {
  hidden: {
    opacity: 0,
    y: 12,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: [0.16, 1, 0.3, 1],
      delay: 0.04,
    },
  },
};

const curtainVariants = {
  cover: { opacity: 1 },
  reveal: { opacity: 0, transition: { duration: 0.15 } },
};

export function PageWrapper({ children, className }) {
  const reduceMotion = useReducedMotion();
  const [curtainPhase, setCurtainPhase] = useState(reduceMotion ? 'reveal' : 'cover');

  useEffect(() => {
    if (reduceMotion) {
      return undefined;
    }

    const timer = window.setTimeout(() => {
      setCurtainPhase('reveal');
    }, 380);

    return () => window.clearTimeout(timer);
  }, [reduceMotion]);

  return (
    <motion.div className={className}>
      {!reduceMotion && (
        <motion.div
          aria-hidden="true"
          initial="cover"
          animate={curtainPhase}
          variants={curtainVariants}
          className="pointer-events-none fixed inset-0 z-40 overflow-hidden"
        >
          <motion.div
            initial={{ x: '-52%' }}
            animate={{ x: '-102%' }}
            transition={{ duration: 0.82, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-y-0 left-1/2 w-1/2 bg-[linear-gradient(90deg,rgba(255,255,255,0.08)_0%,rgba(0,0,0,0.98)_18%,rgba(0,0,0,0.98)_100%)]"
          />
          <motion.div
            initial={{ x: '-48%' }}
            animate={{ x: '102%' }}
            transition={{ duration: 0.82, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-y-0 left-1/2 w-1/2 bg-[linear-gradient(270deg,rgba(255,255,255,0.08)_0%,rgba(0,0,0,0.98)_18%,rgba(0,0,0,0.98)_100%)]"
          />
          <motion.div
            initial={{ scaleY: 1, opacity: 0.9 }}
            animate={{ scaleY: 0, opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
            className="absolute inset-x-0 top-1/2 h-px origin-center bg-gradient-to-r from-transparent via-white/60 to-transparent shadow-[0_0_28px_rgba(255,255,255,0.55)]"
          />
        </motion.div>
      )}

      <motion.div
        variants={contentVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10"
      >
        {children}
      </motion.div>
    </motion.div>
  );
}
