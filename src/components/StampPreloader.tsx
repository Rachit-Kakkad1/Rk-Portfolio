import React, { useEffect, useRef, useState, useCallback } from 'react';

interface StampIntroProps {
  onComplete: () => void;
}

export default function StampIntro({ onComplete }: StampIntroProps) {
  const videoRef   = useRef<HTMLVideoElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const doneRef    = useRef(false);
  const [fading, setFading] = useState(false);

  const prefersReduced =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const finish = useCallback(() => {
    if (doneRef.current) return;
    doneRef.current = true;
    setFading(true);
    setTimeout(onComplete, 700);
  }, [onComplete]);

  useEffect(() => {
    if (prefersReduced) { onComplete(); return; }
    const fallback = setTimeout(finish, 5500);
    return () => clearTimeout(fallback);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

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
          width: 100vw;
          height: 100dvh;
          height: 100vh;
          z-index: 9999;
          /* Match the stamp video's natural light background */
          background: #E6E7E7;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          cursor: pointer;
          opacity: 1;
          transition: opacity 700ms cubic-bezier(0.4, 0, 0.2, 1);
        }
        .si-overlay.fading {
          opacity: 0;
          pointer-events: none;
        }

        /* Video: fully visible, never cropped, white gaps blend with bg */
        .si-video {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 100%;
          height: 100%;
          object-fit: contain;
          object-position: center center;
          background: transparent;
        }

        /* Skip hint */
        .si-skip {
          position: absolute;
          bottom: max(clamp(16px, 4vh, 32px), env(safe-area-inset-bottom, 16px));
          left: 50%;
          transform: translateX(-50%);
          z-index: 2;
          font-size: clamp(8px, 1.5vw, 11px);
          letter-spacing: 0.4em;
          text-transform: uppercase;
          font-family: 'Inter', 'Montserrat', sans-serif;
          font-weight: 500;
          color: rgba(0, 0, 0, 0.35);
          user-select: none;
          white-space: nowrap;
          opacity: 0;
          animation: si-hint 0.6s 1.5s ease forwards;
        }
        @media (max-height: 380px) {
          .si-skip { display: none; }
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
        <div className="si-skip">click or press any key to skip</div>
      </div>
    </>
  );
}
