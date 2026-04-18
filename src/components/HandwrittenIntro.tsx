import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface HandwrittenIntroProps {
  onComplete: () => void;
}

/**
 * RESTORED GOD-LEVEL SIGNATURE INTRO
 * Features:
 * 1. Crystal Clear "Rachit" Calligraphy (Bestestest Cursive)
 * 2. Multi-color Trailing Physics (Red, Blue, White)
 * 3. Cinematic Black Aesthetic
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

    // Drawing phase: ~2.5s
    // Fade out phase: starts at 2.8s
    const timers = [
      setTimeout(() => setPhase(1), 2800),
      setTimeout(() => onComplete(), 3300),
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

  // HIGH-VISIBILITY CURSIVE PATH
  const rachitPath = "M 40,140 C 40,140 70,20 120,20 C 170,20 160,100 130,150 C 100,200 60,180 80,130 C 110,80 170,110 180,160 M 180,160 C 185,185 200,195 220,195 C 245,195 245,160 220,160 C 195,160 195,195 220,195 M 220,195 C 250,195 270,140 290,140 C 315,140 315,195 290,195 C 265,195 265,140 290,140 M 290,140 C 310,140 320,60 330,20 M 330,20 C 330,20 310,160 310,185 C 310,210 335,210 355,185 M 355,185 C 375,160 385,140 385,140 M 355,140 C 355,140 375,120 395,120 M 320,80 L 360,80 M 325,45 C 325,43 328,43 328,45 C 328,47 325,47 325,45";

  return (
    <div 
      onClick={handleSkip}
      className="fixed inset-0 z-[10000] bg-black overflow-hidden flex flex-col items-center justify-center cursor-pointer select-none"
    >
      <style>
        {`
          @keyframes drawSignature {
            0% { stroke-dashoffset: ${pathLength}; opacity: 0; }
            5% { opacity: 1; }
            100% { stroke-dashoffset: 0; opacity: 1; }
          }
          
          @keyframes penTip {
            0% { offset-distance: 0%; opacity: 0; }
            2% { opacity: 1; }
            98% { opacity: 1; }
            100% { offset-distance: 100%; opacity: 0; }
          }

          .signature-path {
            fill: none;
            stroke-width: 14px;
            stroke-linecap: round;
            stroke-linejoin: round;
            stroke-dasharray: ${pathLength};
            stroke-dashoffset: ${pathLength};
            opacity: 0;
            pointer-events: none;
          }
          
          .is-ready .signature-path {
            animation: drawSignature 2.5s cubic-bezier(0.45, 0, 0.55, 1) forwards;
          }

          .path-red {
            stroke: #ff1a1a;
            animation-delay: 0s !important;
            filter: blur(1.5px) drop-shadow(0 0 10px rgba(255, 26, 26, 0.6));
          }

          .path-blue {
            stroke: #1a75ff;
            animation-delay: 0.1s !important;
            filter: blur(1.5px) drop-shadow(0 0 10px rgba(26, 117, 255, 0.6));
          }

          .path-white {
            stroke: #ffffff;
            animation-delay: 0.2s !important;
            filter: drop-shadow(0 0 20px rgba(255, 255, 255, 0.9));
          }

          .pen-tip {
            width: 22px;
            height: 22px;
            background: white;
            border-radius: 50%;
            position: absolute;
            top: 0;
            left: 0;
            offset-path: path("${rachitPath}");
            offset-rotate: auto;
            filter: blur(2px) drop-shadow(0 0 30px white);
            box-shadow: 0 0 40px 10px rgba(255, 255, 255, 1);
            opacity: 0;
            pointer-events: none;
            z-index: 20;
          }

          .is-ready .pen-tip {
            animation: penTip 2.5s cubic-bezier(0.45, 0, 0.55, 1) 0.2s forwards;
          }
        `}
      </style>
      
      <AnimatePresence>
        {phase === 0 && (
          <motion.div 
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="relative w-full max-w-[1000px] aspect-[2.2/1] px-10 flex items-center justify-center pointer-events-none"
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

              <div className="pen-tip" />
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
