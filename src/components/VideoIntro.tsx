import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface VideoIntroProps {
  onComplete: () => void;
}

/**
 * VIDEO INTRO – Plays /intro.mp4 fullscreen, responsive across all devices.
 * Auto-advances when the video ends; click or key to skip.
 */
export default function VideoIntro({ onComplete }: VideoIntroProps) {
  const [isSkipped, setIsSkipped] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleSkip = () => {
    if (isSkipped) return;
    setIsSkipped(true);
    onComplete();
  };

  /* Skip on Escape / Enter / Space */
  useEffect(() => {
    if (isSkipped) return;

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.key === 'Enter' || e.key === ' ') {
        handleSkip();
      }
    };

    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isSkipped]);

  /* Speed up playback to 1.5× */
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const setSpeed = () => { video.playbackRate = 1.5; };
    // Set immediately if already ready, otherwise wait for loadedmetadata
    if (video.readyState >= 1) setSpeed();
    else video.addEventListener('loadedmetadata', setSpeed, { once: true });
  }, []);

  /* Fallback: if the video stalls or takes too long, auto-skip after 90s */
  useEffect(() => {
    if (isSkipped) return;
    const fallback = setTimeout(handleSkip, 90000);
    return () => clearTimeout(fallback);
  }, [isSkipped]);

  if (isSkipped) return null;

  return (
    <motion.div
      onClick={handleSkip}
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-0 z-[10000] bg-black overflow-hidden flex items-center justify-center cursor-pointer select-none"
    >
      {/* Responsive fullscreen video */}
      <video
        ref={videoRef}
        src="/intro.mp4"
        autoPlay
        muted
        playsInline
        onEnded={handleSkip}
        className="intro-video"
      />

      {/* "Skip" hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.45 }}
        transition={{ delay: 1.5, duration: 0.6 }}
        className="absolute bottom-6 sm:bottom-8 md:bottom-10 text-white text-[10px] sm:text-[11px] tracking-[0.5em] font-medium uppercase pointer-events-none"
        style={{ fontFamily: "'Montserrat', sans-serif" }}
      >
        Click or press any key to skip
      </motion.div>

      {/* Subtle film-grain overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.04] cinema-grain z-[10001]" />

      <style>{`
        .intro-video {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          min-width: 100%;
          min-height: 100%;
          width: auto;
          height: auto;
          object-fit: cover;
        }

        /* On very small screens make sure the video still fills */
        @media (max-width: 480px) {
          .intro-video {
            width: 100vw;
            height: 100vh;
            object-fit: cover;
          }
        }

        /* Landscape phones / tablets */
        @media (max-aspect-ratio: 1/1) {
          .intro-video {
            width: auto;
            height: 100vh;
          }
        }

        @media (min-aspect-ratio: 1/1) {
          .intro-video {
            width: 100vw;
            height: auto;
          }
        }
      `}</style>
    </motion.div>
  );
}
