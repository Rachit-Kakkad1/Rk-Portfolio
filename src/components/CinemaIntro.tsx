import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface CinemaIntroProps {
  onComplete: () => void;
}

export default function CinemaIntro({ onComplete }: CinemaIntroProps) {
  const [phase, setPhase] = useState(0);
  const [isSkipped, setIsSkipped] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isSkipped) return;

    // phase 0: Start (Black)
    // phase 1: A PORTFOLIO BY
    // phase 2: RACHIT KAKKAD (Main Title)
    // phase 3: FULL STACK DEVELOPER (Subtitle)
    // phase 4: DIVIDER LINE & ROLES
    // phase 5: FLARE SWEEP
    // phase 6: FINAL FADE OUT

    const timers = [
      setTimeout(() => setPhase(1), 60),   // A Portfolio BY
      setTimeout(() => setPhase(2), 160),  // RACHIT KAKKAD
      setTimeout(() => setPhase(3), 280),  // Subtitle
      setTimeout(() => setPhase(4), 420),  // Divider + Roles
      setTimeout(() => setPhase(5), 560),  // Flare
      setTimeout(() => {
        setPhase(6);
        setTimeout(onComplete, 120); // Final transition delay
      }, 760),
    ];

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.key === 'Enter' || e.key === ' ') {
        handleSkip();
      }
    };

    window.addEventListener('keydown', handleKey);
    return () => {
      timers.forEach(clearTimeout);
      window.removeEventListener('keydown', handleKey);
    };
  }, [onComplete, isSkipped]);

  const handleSkip = () => {
    setIsSkipped(true);
    onComplete();
  };

  if (isSkipped) return null;

  return (
    <div 
      ref={containerRef}
      onClick={handleSkip}
      className="fixed inset-0 z-[10000] bg-black overflow-hidden flex items-center justify-center cursor-pointer select-none"
      style={{ perspective: '1000px' }}
    >
      {/* 2-Layer Film Grain */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.04] z-10 cinema-grain" />
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] z-10 cinema-grain-fast" />
      
      {/* Vignette */}
      <div className="absolute inset-0 pointer-events-none z-20 shadow-[inset_0_0_150px_rgba(0,0,0,0.9)]" />

      {/* Letterbox Bars */}
      <motion.div 
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 0.5, ease: "circOut" }}
        className="absolute top-0 left-0 w-full h-[12vh] bg-black z-30 origin-top"
      />
      <motion.div 
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 0.5, ease: "circOut" }}
        className="absolute bottom-0 left-0 w-full h-[12vh] bg-black z-30 origin-bottom"
      />

      <AnimatePresence mode="wait">
        {phase >= 1 && phase < 6 && (
          <motion.div 
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="relative flex flex-col items-center justify-center px-6 w-full max-w-[90vw]"
          >
            {/* Phase 1: Small Intro Text */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: phase >= 1 ? 1 : 0, y: phase >= 1 ? 0 : 10 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="text-white/40 text-[clamp(10px,1.5vw,16px)] font-bold tracking-[0.4em] uppercase mb-4 md:mb-8"
            >
              A PORTFOLIO BY
            </motion.p>

            {/* Phase 2: Main Title - Interlaced Sliced Reveal */}
            <div className="relative group overflow-visible">
              {/* Binary Flicker (Briefly before text) */}
              {phase === 1 && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 1, 0, 1, 0] }}
                  transition={{ duration: 0.12, repeat: 1 }}
                  className="absolute inset-0 flex items-center justify-center text-amber-500/40 font-mono text-[clamp(20px,5vw,80px)] tracking-[1em]"
                >
                  01101011 10010110
                </motion.div>
              )}

              <div className="relative flex flex-col items-center">
                {/* We create multiple horizontal slices of the same text */}
                {[...Array(6)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ 
                      opacity: 0, 
                      x: i % 2 === 0 ? -100 : 100,
                      filter: 'blur(10px)'
                    }}
                    animate={{ 
                      opacity: phase >= 2 ? 1 : 0, 
                      x: phase >= 2 ? 0 : (i % 2 === 0 ? -100 : 100),
                      filter: phase >= 2 ? 'blur(0px)' : 'blur(10px)',
                      letterSpacing: phase >= 2 ? '0.05em' : '0.1em'
                    }}
                    transition={{ 
                      duration: 0.35,
                      ease: [0.16, 1, 0.3, 1],
                      delay: i * 0.015,
                      letterSpacing: { duration: 1.2, ease: "linear" }
                    }}
                    className="overflow-hidden h-[clamp(15px,3vw,50px)] leading-none text-center"
                    style={{ 
                      // Using clip-path to show only a horizontal slice of the text
                      // This ensures it works seamlessly with responsive clamp sizes
                      height: 'clamp(8px, 1.8vw, 28px)', // Controlled slice height
                    }}
                  >
                    <h1 className="text-white text-[clamp(40px,10vw,160px)] font-bold tracking-tighter leading-none cinema-text-glow pointer-events-none"
                      style={{ 
                        marginTop: `-${i * 1.7}vw`, // Precisely offset each slice's text position
                        // On small screens, the vw units need adjustment
                      }}
                    >
                      RACHIT KAKKAD
                    </h1>
                  </motion.div>
                ))}
              </div>

              {/* Phase 5: Lens Flare Sweep */}
              {phase >= 5 && (
                <motion.div 
                  initial={{ x: '-150%', skewX: -20, opacity: 0 }}
                  animate={{ x: '150%', skewX: -20, opacity: [0, 0.6, 0] }}
                  transition={{ duration: 0.25, ease: "easeInOut" }}
                  className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[50%] bg-gradient-to-r from-transparent via-white/30 to-transparent z-20 blur-2xl pointer-events-none"
                />
              )}
            </div>

            {/* Phase 3: Subtitle */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: phase >= 3 ? 1 : 0, y: phase >= 3 ? 0 : 20 }}
              transition={{ duration: 0.28, delay: 0.04, ease: "easeOut" }}
              className="mt-4 md:mt-8 space-y-4 text-center"
            >
              <p className="text-white/60 text-[clamp(14px,2.5vw,28px)] font-medium tracking-[0.2em] uppercase">
                Full Stack Developer & AI Engineer
              </p>

              {/* Phase 4: Divider & Roles */}
              <div className="flex flex-col items-center gap-6 pt-4">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: phase >= 4 ? '100%' : 0 }}
                  transition={{ duration: 0.25, ease: "easeInOut" }}
                  className="h-[1px] bg-gradient-to-r from-transparent via-amber-500/50 to-transparent w-full max-w-[400px]"
                />
                
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: phase >= 4 ? 0.3 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="text-white text-[clamp(8px,1vw,12px)] tracking-[0.6em] font-medium uppercase"
                >
                  ENGINEERED BY RACHIT • DESIGNED FOR IMPACT
                </motion.p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Skip Hint */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.2 }}
        whileHover={{ opacity: 0.8 }}
        className="absolute bottom-8 right-8 text-white text-[10px] tracking-[0.3em] font-medium uppercase z-50 transition-opacity"
      >
        Press ESC to skip
      </motion.div>

      {/* Final Fade to White Overlay */}
      {phase === 6 && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
          className="absolute inset-0 bg-[#9a9a9a] z-[1001]"
        />
      )}
    </div>
  );
}
