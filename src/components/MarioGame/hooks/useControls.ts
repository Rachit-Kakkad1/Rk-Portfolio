import { useEffect, useRef } from 'react';

export const KEYS = {
  LEFT: false,
  RIGHT: false,
  UP: false,
  DOWN: false,
  RUN: false,
  PAUSE: false,
  START: false,
};

export function useControls() {
  const keysRef = useRef(KEYS);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Prevent default scrolling for game keys
      if (['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Space', 'ShiftLeft', 'ShiftRight', 'KeyA', 'KeyD', 'KeyW', 'KeyS', 'KeyZ', 'Escape', 'Enter'].includes(e.code)) {
        e.preventDefault();
      }

      switch (e.code) {
        case 'ArrowLeft': case 'KeyA': keysRef.current.LEFT = true; break;
        case 'ArrowRight': case 'KeyD': keysRef.current.RIGHT = true; break;
        case 'ArrowUp': case 'KeyW': case 'Space': keysRef.current.UP = true; break;
        case 'ArrowDown': case 'KeyS': keysRef.current.DOWN = true; break;
        case 'ShiftLeft': case 'ShiftRight': case 'KeyZ': keysRef.current.RUN = true; break;
        case 'Escape': case 'KeyP': keysRef.current.PAUSE = true; break;
        case 'Enter': keysRef.current.START = true; break;
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      switch (e.code) {
        case 'ArrowLeft': case 'KeyA': keysRef.current.LEFT = false; break;
        case 'ArrowRight': case 'KeyD': keysRef.current.RIGHT = false; break;
        case 'ArrowUp': case 'KeyW': case 'Space': keysRef.current.UP = false; break;
        case 'ArrowDown': case 'KeyS': keysRef.current.DOWN = false; break;
        case 'ShiftLeft': case 'ShiftRight': case 'KeyZ': keysRef.current.RUN = false; break;
        case 'Escape': case 'KeyP': keysRef.current.PAUSE = false; break;
        case 'Enter': keysRef.current.START = false; break;
      }
    };

    window.addEventListener('keydown', handleKeyDown, { passive: false });
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  return keysRef;
}
