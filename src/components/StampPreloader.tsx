import React, { useEffect, useRef, useState, useCallback } from 'react';

interface StampIntroProps {
  onComplete: () => void;
}

export default function StampIntro({ onComplete }: StampIntroProps) {
  const videoRef   = useRef<HTMLVideoElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const doneRef    = useRef(false);
  const [fading, setFading] = useState(false);

  // Respect prefers-reduced-motion
  const prefersReduced =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const finish = useCallback(() => {
    if (doneRef.current) return;
    doneRef.current = true;
    setFading(true);
    setTimeout(onComplete, 700); // wait for fade-out transition
  }, [onComplete]);

  useEffect(() => {
    if (prefersReduced) { onComplete(); return; }

    const video = videoRef.current;
    if (!video) return;

    // Safety cap: call finish after 5.5s regardless of video state
    const fallback = setTimeout(finish, 5500);

    return () => clearTimeout(fallback);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Skip on keypress
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (['Escape', 'Enter', ' '].includes(e.key)) finish();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [finish]);

  if (prefersReduced) return null;

  return (
    <>
      <style>{`
        .si-overlay {
          position: fixed;
          inset: 0;
          z-index: 9999;
          background: #000;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          cursor: pointer;
          /* Fade-out transition */
          opacity: 1;
          transition: opacity 700ms cubic-bezier(0.4, 0, 0.2, 1);
        }
        .si-overlay.fading {
          opacity: 0;
          pointer-events: none;
        }

        /* Fullscreen cover video */
        .si-video {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
        }

        /* Very subtle vignette for cinematic feel */
        .si-vignette {
          position: absolute;
          inset: 0;
          background: radial-gradient(
            ellipse at center,
            transparent 55%,
            rgba(0, 0, 0, 0.45) 100%
          );
          pointer-events: none;
          z-index: 1;
        }

        /* Skip hint */
        .si-skip {
          position: absolute;
          bottom: clamp(16px, 4vh, 32px);
          left: 50%;
          transform: translateX(-50%);
          z-index: 2;
          font-size: 10px;
          letter-spacing: 0.4em;
          text-transform: uppercase;
          font-family: 'Inter', 'Montserrat', sans-serif;
          font-weight: 500;
          color: rgba(255, 255, 255, 0.45);
          user-select: none;
          white-space: nowrap;
          opacity: 0;
          animation: si-hint 0.6s 1.5s ease forwards;
        }
        @keyframes si-hint {
          to { opacity: 1; }
        }
      `}</style>

      <div
        ref={overlayRef}
        className={`si-overlay${fading ? ' fading' : ''}`}
        onClick={finish}
        aria-hidden="true"
      >
        <video
          ref={videoRef}
          className="si-video"
          src="/stamp.mp4"
          autoPlay
          muted
          playsInline
          onEnded={finish}
          preload="auto"
        />
        <div className="si-vignette" />
        <div className="si-skip">click or press any key to skip</div>
      </div>
    </>
  );
}
