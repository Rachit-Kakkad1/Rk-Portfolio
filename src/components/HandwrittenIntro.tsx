import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface HandwrittenIntroProps {
  onComplete: () => void;
}

/**
 * REFINED SIGNATURE INTRO - "RACHIT" EDITION
 * Features:
 * 1. Pixel-Perfect "Rachit" Calligraphy
 * 2. High-Frequency Stroke Physics
 * 3. Cinematic Exponential Easing
 */
export default function HandwrittenIntro({ onComplete }: HandwrittenIntroProps) {
  const [isSkipped, setIsSkipped] = useState(false);
  const pathRef = useRef<SVGPathElement>(null);
  const [pathLength, setPathLength] = useState(0);
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    if (pathRef.current) {
      setPathLength(pathRef.current.getTotalLength());
    }
  }, []);

  useEffect(() => {
    if (isSkipped) return;

    const timers = [
      setTimeout(() => setPhase(1), 3000),
      setTimeout(() => onComplete(), 3800),
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

  // REFINED "Rachit" CALIGRAPHY PATH
  const rachitPath = "M 40,140 C 40,140 70,20 120,20 C 170,20 160,100 130,150 C 100,200 60,180 80,130 C 110,80 170,110 180,160 M 180,160 C 185,185 200,195 220,195 C 245,195 245,160 220,160 C 195,160 195,195 220,195 M 220,195 C 250,195 270,140 290,140 C 315,140 315,195 290,195 C 265,195 265,140 290,140 M 290,140 C 310,140 320,60 330,20 M 330,20 C 330,20 310,160 310,185 C 310,210 335,210 355,185 M 355,185 C 375,160 385,140 385,140 M 355,140 C 355,140 375,120 395,120 M 320,80 L 360,80 M 325,45 C 325,43 328,43 328,45 C 328,47 325,47 325,45";

  return (
    <div 
      onClick={handleSkip}
      className="fixed inset-0 z-[10000] bg-black overflow-hidden flex flex-col items-center justify-center cursor-pointer select-none"
    >
      <style>
        {`
          @keyframes drawSignature {
            0% { stroke-dashoffset: ${pathLength}; opacity: 0; filter: blur(10px); }
            10% { opacity: 1; filter: blur(0px); }
            100% { stroke-dashoffset: 0; opacity: 1; }
          }
          
          @keyframes glowPulse {
            0%, 100% { opacity: 0.8; filter: drop-shadow(0 0 20px rgba(255,255,255,0.4)); }
            50% { opacity: 1; filter: drop-shadow(0 0 40px rgba(255,255,255,0.8)); }
          }

          .signature-path {
            fill: none;
            stroke-width: 12px;
            stroke-linecap: round;
            stroke-linejoin: round;
            stroke-dasharray: ${pathLength};
            stroke-dashoffset: ${pathLength};
            opacity: 0;
            pointer-events: none;
          }
          
          .is-ready .signature-path {
            animation: drawSignature 3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          }

          .path-red {
            stroke: #ff1a1a;
            animation-delay: 0s !important;
            filter: blur(1.5px) opacity(0.3);
          }

          .path-blue {
            stroke: #1a75ff;
            animation-delay: 0.1s !important;
            filter: blur(1.5px) opacity(0.3);
          }

          .path-white {
            stroke: #ffffff;
            stroke-width: 6px;
            filter: drop-shadow(0 0 20px rgba(255, 255, 255, 0.9));
            animation-delay: 0.2s !important;
          }

          .is-ready .path-white {
             animation: drawSignature 3s cubic-bezier(0.16, 1, 0.3, 1) forwards, glowPulse 2s ease-in-out infinite 3s;
          }
        `}
      </style>
      
      <AnimatePresence>
        {phase === 0 && (
          <motion.div 
            initial={{ opacity: 1, scale: 0.9 }}
            exit={{ opacity: 0, scale: 1.1, filter: "blur(20px)" }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-[900px] aspect-[2.2/1] px-10 flex items-center justify-center pointer-events-none"
          >
            <div className={`relative w-full h-full ${pathLength > 0 ? 'is-ready' : ''}`}>
              <svg 
                viewBox="0 0 500 250" 
                className="w-full h-full overflow-visible"
              >
                <path className="signature-path path-red" d={rachitPath} />
                <path className="signature-path path-blue" d={rachitPath} />
                <path ref={pathRef} className="signature-path path-white" d={rachitPath} />
              </svg>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ delay: 3.8 }}
        className="absolute bottom-10 text-white text-[11px] tracking-[0.6em] font-medium uppercase"
        style={{ fontFamily: "'Montserrat', sans-serif" }}
      >
        Click to enter
      </motion.div>

      <div className="absolute inset-0 pointer-events-none opacity-[0.05] cinema-grain z-[10001]" />
    </div>
  );
}
