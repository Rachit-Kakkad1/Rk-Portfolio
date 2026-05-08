import React, { useRef, useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameState } from './hooks/useGameState';
import { useGameLoop } from './hooks/useGameLoop';
import { renderBackground } from './renderers/renderBackground';
import { renderTiles } from './renderers/renderTiles';
import { renderMario } from './renderers/renderMario';
import { renderEnemies } from './renderers/renderEnemies';

const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 450;

function HudCell({ label, value, warn, coin, align = 'center' }: { label: string, value: string, warn?: boolean, coin?: boolean, align?: 'start' | 'center' | 'end' }) {
  return (
    <div className={`flex flex-col items-${align}`}>
      <div className={`mb-1 font-bold ${warn ? 'text-[#ff0000]' : 'text-white'}`}>{label}</div>
      <div className="flex items-center gap-2">
        {coin && (
          <div className="w-3 h-4 bg-yellow-400 border-2 border-black" />
        )}
        <div className={`text-xl ${warn ? 'text-[#ff0000]' : 'text-white'}`}>{value}</div>
      </div>
    </div>
  );
}

export function MarioGame({ onExit, onStatUnlocked, fullScreen = true }: { onExit?: () => void, onStatUnlocked?: (label: string, value: string) => void, fullScreen?: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const gameStateRef = useGameState();
  
  // React state for HUD/Overlays
  const [hud, setHud] = useState({ score: 0, coins: 0, world: '1-1', time: 400, lives: 3, phase: 'title' as string });
  const [notification, setNotification] = useState<{ label: string, value: string } | null>(null);

  const forceUpdateHUD = useCallback(() => {
    const state = gameStateRef.current;
    setHud({
      score: state.score,
      coins: state.coins,
      world: '1-1',
      time: state.time,
      lives: state.lives,
      phase: state.phase
    });
  }, [gameStateRef]);

  const handleStatUnlocked = useCallback((label: string, value: string) => {
    setNotification({ label, value });
    onStatUnlocked?.(label, value);
    setTimeout(() => setNotification(null), 3000);
  }, [onStatUnlocked]);

  useGameLoop(gameStateRef, canvasRef, forceUpdateHUD, handleStatUnlocked);

  // Resize observer to fill screen while maintaining aspect ratio
  useEffect(() => {
    const handleResize = () => {
      const container = containerRef.current;
      const canvas = canvasRef.current;
      if (container && canvas) {
        const { width, height } = container.getBoundingClientRect();
        
        const scale = Math.min(width / CANVAS_WIDTH, height / CANVAS_HEIGHT);
        
        canvas.style.width = `${CANVAS_WIDTH * scale}px`;
        canvas.style.height = `${CANVAS_HEIGHT * scale}px`;
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();
    // Extra trigger for initial load/render
    setTimeout(handleResize, 100);
    return () => window.removeEventListener('resize', handleResize);
  }, [fullScreen]);

  // Main Render Loop for Canvas
  useEffect(() => {
    let req: number;
    const render = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const state = gameStateRef.current;

      ctx.imageSmoothingEnabled = false;

      renderBackground(ctx, CANVAS_WIDTH, CANVAS_HEIGHT, state.camX);
      renderTiles(ctx, state.blocks, state.camX, CANVAS_WIDTH, CANVAS_HEIGHT);
      renderEnemies(ctx, state.goombas, state.camX, CANVAS_WIDTH);
      if (state.phase !== 'title') {
        renderMario(ctx, state.mario, state.camX);
      }

      req = requestAnimationFrame(render);
    };
    req = requestAnimationFrame(render);
    return () => cancelAnimationFrame(req);
  }, [gameStateRef]);

  const showTouch = typeof window !== 'undefined' && (window.innerWidth < 768 || 'ontouchstart' in window);

  return (
    <div className={`fixed inset-0 z-[500] bg-black flex items-center justify-center overflow-hidden`}>
      <div 
        ref={containerRef}
        className="relative w-full h-full flex items-center justify-center"
        style={{ fontFamily: "'Press Start 2P', monospace" }}
        onContextMenu={(e) => e.preventDefault()}
      >
        {/* Canvas Wrapper */}
        <div className="relative">
          <canvas
            ref={canvasRef}
            width={CANVAS_WIDTH}
            height={CANVAS_HEIGHT}
            className="block shadow-[0_0_100px_rgba(0,0,0,0.5)]"
          />

          {/* Absolute HUD Overlays - Positioned to avoid navbar overlap */}
          <div className="absolute top-10 left-10 right-10 pointer-events-none flex justify-between items-start select-none z-10">
            {/* Left Side: MARIO (Score) and COINS */}
            <div className="flex flex-col gap-2">
              <div className="flex flex-col items-start mb-4">
                <span className="text-white text-[12px] mb-2 font-bold tracking-widest">MARIO</span>
                <span className="text-white text-2xl font-bold">{hud.score.toString().padStart(6, '0')}</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-3 h-5 bg-yellow-400 border-2 border-black animate-pulse" />
                <span className="text-white text-xl font-bold">×{hud.coins.toString().padStart(2, '0')}</span>
              </div>
            </div>

            {/* Right Side: WORLD and TIME */}
            <div className="flex flex-col gap-2 items-end">
              <div className="flex flex-col items-end mb-4">
                <span className="text-white text-[12px] mb-2 font-bold tracking-widest">WORLD</span>
                <span className="text-white text-2xl font-bold">{hud.world}</span>
              </div>
              <div className="flex flex-col items-end">
                <span className="text-white text-[12px] mb-2 font-bold tracking-widest">TIME</span>
                <span className={`text-2xl font-bold ${hud.time < 100 ? 'text-[#ff0000]' : 'text-white'}`}>
                  {hud.time.toString().padStart(3, '0')}
                </span>
              </div>
            </div>
          </div>

          <AnimatePresence>
            {notification && (
              <motion.div 
                initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -50 }}
                className="absolute top-40 left-1/2 -translate-x-1/2 z-[110] bg-black border-4 border-white p-6 text-center text-white shadow-2xl"
              >
                <div className="text-yellow-400 text-sm font-bold mb-2 uppercase">Item Get!</div>
                <div className="text-3xl font-black mb-1">{notification.value}</div>
                <div className="text-sm opacity-50 uppercase">{notification.label}</div>
              </motion.div>
            )}

            {hud.phase === 'title' && (
              <motion.div 
                className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 z-20"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              >
                <div className="mb-12">
                   <h1 className="text-red-600 text-4xl md:text-7xl mb-4 tracking-tighter text-center italic" style={{ textShadow: '6px 6px 0 #fff' }}>
                    SUPER
                  </h1>
                  <h1 className="text-white text-5xl md:text-8xl tracking-widest text-center" style={{ textShadow: '6px 6px 0 #e52222' }}>
                    RACHIT
                  </h1>
                </div>
                <motion.div 
                  className="text-white text-xl md:text-2xl mt-8"
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  PRESS ENTER TO START
                </motion.div>
                
                <div className="absolute bottom-12 flex gap-12 text-[10px] text-white/40">
                  <span>© 2026 RACHIT KAKKAD</span>
                  <span>ALL RIGHTS RESERVED</span>
                </div>
              </motion.div>
            )}

            {hud.phase === 'levelclear' && (
              <motion.div 
                className="absolute inset-0 flex items-center justify-center pointer-events-none z-20"
                initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
              >
                <div className="text-white text-4xl md:text-6xl text-center" style={{ textShadow: '4px 4px 0 #000' }}>
                  COURSE CLEAR!
                </div>
              </motion.div>
            )}

            {hud.phase === 'gameover' && (
              <motion.div 
                className="absolute inset-0 flex items-center justify-center bg-black pointer-events-none z-30"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              >
                <div className="text-white text-4xl md:text-6xl">GAME OVER</div>
              </motion.div>
            )}
          </AnimatePresence>

          {showTouch && (
             <div className="absolute bottom-8 left-8 right-8 flex justify-between items-end opacity-60 z-40 pointer-events-none">
               <div className="w-48 h-48 relative pointer-events-auto">
                 {/* Better D-Pad Visualization */}
                 <div className="absolute inset-x-[38%] top-0 bottom-[38%] bg-[#333] border-2 border-black rounded" />
                 <div className="absolute inset-y-[38%] left-0 right-[38%] bg-[#333] border-2 border-black rounded" />
                 <div className="absolute inset-x-[38%] bottom-0 top-[38%] bg-[#333] border-2 border-black rounded" />
                 <div className="absolute inset-y-[38%] right-0 left-[38%] bg-[#333] border-2 border-black rounded" />
               </div>
               <div className="flex gap-8 pointer-events-auto">
                 <div className="flex flex-col items-center gap-2">
                    <div className="w-20 h-20 rounded-full bg-orange-600 border-4 border-orange-800 shadow-xl active:scale-90 transition-transform" />
                    <span className="text-white text-[10px]">B</span>
                 </div>
                 <div className="flex flex-col items-center gap-2">
                    <div className="w-20 h-20 rounded-full bg-red-600 border-4 border-red-800 shadow-xl active:scale-90 transition-transform" />
                    <span className="text-white text-[10px]">A</span>
                 </div>
               </div>
             </div>
          )}
        </div>

        {/* Exit Button - Isolated from Canvas */}
        <div className="absolute bottom-6 right-6 z-[60]">
          <button 
            onClick={onExit}
            className="px-8 py-3 bg-white text-black font-bold text-xs hover:bg-red-600 hover:text-white transition-all transform hover:scale-110 border-4 border-black shadow-[4px_4px_0_#333]"
          >
            EXIT GAME
          </button>
        </div>
      </div>
    </div>
  );
}
