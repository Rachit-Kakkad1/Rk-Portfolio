import { useRef, useCallback } from 'react';

export function useAudio() {
  const ctxRef = useRef<AudioContext | null>(null);
  const gainRef = useRef<GainNode | null>(null);

  const init = useCallback(() => {
    if (!ctxRef.current) {
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioContext) {
        ctxRef.current = new AudioContext();
        gainRef.current = ctxRef.current.createGain();
        gainRef.current.connect(ctxRef.current.destination);
        gainRef.current.gain.value = 0.5;
      }
    }
  }, []);

  const playTone = useCallback((freq: number, type: OscillatorType, dur: number, sweepFreq?: number) => {
    if (!ctxRef.current || !gainRef.current) return;
    
    const t = ctxRef.current.currentTime;
    const osc = ctxRef.current.createOscillator();
    const gain = ctxRef.current.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, t);
    if (sweepFreq) {
      osc.frequency.exponentialRampToValueAtTime(sweepFreq, t + dur);
    }

    gain.gain.setValueAtTime(1, t);
    gain.gain.exponentialRampToValueAtTime(0.01, t + dur);

    osc.connect(gain);
    gain.connect(gainRef.current);

    osc.start(t);
    osc.stop(t + dur);
  }, []);

  const playNoise = useCallback((dur: number) => {
    if (!ctxRef.current || !gainRef.current) return;
    
    const t = ctxRef.current.currentTime;
    const bufferSize = ctxRef.current.sampleRate * dur;
    const buffer = ctxRef.current.createBuffer(1, bufferSize, ctxRef.current.sampleRate);
    const data = buffer.getChannelData(0);
    
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noise = ctxRef.current.createBufferSource();
    noise.buffer = buffer;
    const noiseFilter = ctxRef.current.createBiquadFilter();
    noiseFilter.type = 'lowpass';
    noiseFilter.frequency.value = 1000;

    const gain = ctxRef.current.createGain();
    gain.gain.setValueAtTime(1, t);
    gain.gain.exponentialRampToValueAtTime(0.01, t + dur);

    noise.connect(noiseFilter);
    noiseFilter.connect(gain);
    gain.connect(gainRef.current);

    noise.start(t);
  }, []);

  const jump = useCallback(() => { init(); playTone(400, 'sine', 0.12, 800); }, [init, playTone]);
  const coin = useCallback(() => { init(); playTone(800, 'square', 0.09, 1200); }, [init, playTone]);
  const stomp = useCallback(() => { init(); playTone(300, 'triangle', 0.1, 80); }, [init, playTone]);
  const brickBreak = useCallback(() => { init(); playNoise(0.15); }, [init, playNoise]);
  const powerUp = useCallback(() => { init(); playTone(400, 'square', 0.5, 1000); }, [init, playTone]);
  const death = useCallback(() => { init(); playTone(400, 'square', 2, 50); }, [init, playTone]); // simplified
  const courseClear = useCallback(() => { init(); playTone(660, 'square', 1, 660); }, [init, playTone]); // simplified
  const flagSlide = useCallback(() => { init(); playTone(600, 'sine', 1.2, 200); }, [init, playTone]);

  return { jump, coin, stomp, brickBreak, powerUp, death, courseClear, flagSlide, init };
}
