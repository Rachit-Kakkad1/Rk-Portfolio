import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import SEO from '../components/SEO';

export default function GitHubStats() {
  const navigate = useNavigate();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [unlockedStats, setUnlockedStats] = useState<any[]>([]);
  const [notification, setNotification] = useState<any>(null);
  const [showVictory, setShowVictory] = useState(false);
  const [score, setScore] = useState(0);

  const handleReturn = () => {
    window.dispatchEvent(new CustomEvent('trigger-transition', { 
      detail: { name: 'Returning Home', target: 'home' } 
    }));
    setTimeout(() => navigate('/'), 400);
  };

  const gameRef = useRef({
    player: { x: 100, y: 0, w: 40, h: 40, vx: 0, vy: 0, isGrounded: false, isJumping: false, jumpFrames: 0 },
    keys: { left: false, right: false, up: false, down: false },
    camera: { x: 0 },
    goalReached: false,
    groundSegments: [
      { x: 0, w: 1200 },
      { x: 1350, w: 800 },
      { x: 2300, w: 2000 },
    ],
    pipes: [
      { x: 1150, yOff: 120, w: 100, h: 120, url: 'https://github.com/Rachit-Kakkad1', label: 'GITHUB PROFILE\n(PRESS DOWN)' },
      { x: 2150, yOff: 160, w: 100, h: 160, url: 'https://github.com/Rachit-Kakkad1?tab=repositories', label: 'GITHUB REPOS\n(PRESS DOWN)' }
    ],
    platforms: [
      { x: 400, yOff: 160, w: 160, h: 40 },
      { x: 800, yOff: 240, w: 160, h: 40 },
      { x: 1500, yOff: 160, w: 160, h: 40 },
      { x: 1900, yOff: 260, w: 160, h: 40 },
      { x: 2500, yOff: 160, w: 160, h: 40 },
      { x: 2900, yOff: 260, w: 160, h: 40 },
    ],
    blocks: [
      { type: 'brick', x: 440, yOff: 280, w: 40, h: 40, hit: false, yAnim: 0 },
      { type: 'stat', id: 'repos', x: 480, yOff: 280, w: 40, h: 40, label: 'Repositories', value: '45+', hit: false, yAnim: 0 },
      { type: 'brick', x: 520, yOff: 280, w: 40, h: 40, hit: false, yAnim: 0 },

      { type: 'brick', x: 840, yOff: 380, w: 40, h: 40, hit: false, yAnim: 0 },
      { type: 'stat', id: 'commits', x: 880, yOff: 380, w: 40, h: 40, label: 'Commits', value: '1.2k+', hit: false, yAnim: 0 },
      { type: 'brick', x: 920, yOff: 380, w: 40, h: 40, hit: false, yAnim: 0 },

      { type: 'stat', id: 'stars', x: 1560, yOff: 300, w: 40, h: 40, label: 'Stars', value: '250+', hit: false, yAnim: 0 },
      { type: 'brick', x: 1600, yOff: 300, w: 40, h: 40, hit: false, yAnim: 0 },

      { type: 'brick', x: 1940, yOff: 400, w: 40, h: 40, hit: false, yAnim: 0 },
      { type: 'stat', id: 'prs', x: 1980, yOff: 400, w: 40, h: 40, label: 'Pull Requests', value: '18', hit: false, yAnim: 0 },

      { type: 'stat', id: 'rank', x: 2560, yOff: 300, w: 40, h: 40, label: 'Global Rank', value: 'Elite', hit: false, yAnim: 0 },
    ],
    floatingTexts: [] as any[],
    frameId: 0
  });

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (gameRef.current.goalReached) return;
      if (['ArrowLeft', 'a', 'A'].includes(e.key)) gameRef.current.keys.left = true;
      if (['ArrowRight', 'd', 'D'].includes(e.key)) gameRef.current.keys.right = true;
      if (['ArrowUp', 'w', 'W', ' ', 'Spacebar'].includes(e.key)) gameRef.current.keys.up = true;
      if (['ArrowDown', 's', 'S'].includes(e.key)) gameRef.current.keys.down = true;
    };
    const handleKeyUp = (e: KeyboardEvent) => {
      if (['ArrowLeft', 'a', 'A'].includes(e.key)) gameRef.current.keys.left = false;
      if (['ArrowRight', 'd', 'D'].includes(e.key)) gameRef.current.keys.right = false;
      if (['ArrowUp', 'w', 'W', ' ', 'Spacebar'].includes(e.key)) gameRef.current.keys.up = false;
      if (['ArrowDown', 's', 'S'].includes(e.key)) gameRef.current.keys.down = false;
    };
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  const update = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const state = gameRef.current;
    const { player, keys, platforms, blocks, groundSegments, pipes } = state;

    // Physics
    if (!state.goalReached) {
      if (keys.left) player.vx -= 1.5;
      if (keys.right) player.vx += 1.5;
    } else {
      player.vx *= 0.85; // Slowdown
    }
    
    player.vx *= 0.82; 
    player.vy += 0.8; 
    player.x += player.vx;
    player.y += player.vy;

    player.isGrounded = false;
    if (player.x < 0) { player.x = 0; player.vx = 0; }

    const groundY = canvas.height - 80;

    // Ground Collisions
    groundSegments.forEach(g => {
       if (player.x + player.w > g.x && player.x < g.x + g.w) {
          if (player.y + player.h > groundY && player.vy > 0 && player.y + player.h - player.vy <= groundY + 15) {
             player.y = groundY - player.h;
             player.vy = 0;
             player.isGrounded = true;
          }
       }
    });

    // Platform Collisions
    platforms.forEach(p => {
      const py = groundY - p.yOff;
      // Top collision only for platforms
      if (player.x + player.w > p.x && player.x < p.x + p.w &&
          player.y + player.h > py && player.y + player.h - player.vy <= py + 15) {
          player.y = py - player.h;
          player.vy = 0;
          player.isGrounded = true;
      }
    });

    // Pipe Collisions
    pipes.forEach(p => {
      const py = groundY - p.yOff;
      // Top collision
      if (player.x + player.w > p.x && player.x < p.x + p.w &&
          player.y + player.h > py && player.y + player.h - player.vy <= py + 15) {
          player.y = py - player.h;
          player.vy = 0;
          player.isGrounded = true;
          
          // Enter pipe
          if (keys.down && !state.goalReached) {
             window.open(p.url, '_blank');
             keys.down = false; // Prevent rapid multiple opens
          }
      }
      // Side collisions
      else if (player.x < p.x + p.w && player.x + player.w > p.x &&
               player.y < py + p.h && player.y + player.h > py) {
        if (player.vx > 0) player.x = p.x - player.w;
        else if (player.vx < 0) player.x = p.x + p.w;
        player.vx = 0;
      }
    });

    // Jump Logic
    if (keys.up && player.isGrounded && !state.goalReached) {
      player.vy = -16; 
      player.isGrounded = false;
      player.isJumping = true;
      player.jumpFrames = 0;
    } else if (keys.up && player.isJumping && player.jumpFrames < 12 && !state.goalReached) {
        player.vy -= 0.8; 
        player.jumpFrames++;
    }

    // Block Collisions (Solid blocks)
    blocks.forEach((b) => {
      const by = groundY - b.yOff + b.yAnim;
      if (player.x < b.x + b.w && player.x + player.w > b.x &&
          player.y < by + b.h && player.y + player.h > by) {
        
        // Hit from bottom
        if (player.vy < 0 && player.y - player.vy >= by + b.h - 5) {
          player.y = by + b.h;
          player.vy = 0;
          if (!b.hit) {
            b.hit = true;
            if (b.type === 'stat') {
               setScore(s => s + 1000);
               setNotification({ label: b.label, value: b.value });
               setUnlockedStats(prev => [...prev, { label: b.label, value: b.value }]);
               // Add floating text score
               state.floatingTexts.push({ x: b.x + 10, y: by - 20, text: '1000', life: 1 });
            }
            b.yAnim = -15;
            setTimeout(() => { b.yAnim = 0; }, 100);
          }
        } 
        // Top collision
        else if (player.vy > 0 && player.y + player.h - player.vy <= by + 15) {
          player.y = by - player.h;
          player.vy = 0;
          player.isGrounded = true;
        }
        // Side collision
        else {
          if (player.vx > 0) player.x = b.x - player.w;
          else if (player.vx < 0) player.x = b.x + b.w;
          player.vx = 0;
        }
      }
    });

    // Pit Death
    if (player.y > canvas.height + 200) {
       player.x = 100;
       player.y = 0;
       player.vx = 0; player.vy = 0;
       state.camera.x = 0;
    }

    // Goal Logic
    const goalX = 3600;
    if (player.x > goalX && !state.goalReached) {
      state.goalReached = true;
      state.keys = { left: false, right: false, up: false, down: false };
      setScore(s => s + 5000);
      setShowVictory(true);
    }

    // Camera
    state.camera.x += ((player.x - canvas.width / 2 + player.w / 2) - state.camera.x) * 0.1;
    if (state.camera.x < 0) state.camera.x = 0;

    // --- DRAWING ---
    // Background - Classic Overworld Blue
    ctx.fillStyle = '#5c94fc';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.save();
    ctx.translate(-state.camera.x, 0);

    // Draw Clouds & Hills (Parallax)
    ctx.fillStyle = '#fff';
    ctx.fillRect(200 - state.camera.x * -0.5, 100, 100, 30);
    ctx.fillRect(220 - state.camera.x * -0.5, 80, 60, 30);
    
    ctx.fillRect(800 - state.camera.x * -0.5, 150, 140, 40);
    ctx.fillRect(830 - state.camera.x * -0.5, 120, 80, 40);

    // WIN Flagpole
    ctx.fillStyle = '#f8b800'; // Gold ball
    ctx.beginPath(); ctx.arc(goalX + 8, groundY - 350, 10, 0, Math.PI*2); ctx.fill();
    ctx.fillStyle = '#e8e8e8'; // Pole
    ctx.fillRect(goalX + 4, groundY - 340, 8, 340);
    ctx.fillStyle = '#00a800'; // Flag
    ctx.fillRect(goalX + 12, groundY - 330, 60, 40);

    // Ground
    state.groundSegments.forEach(g => {
       ctx.fillStyle = '#c84c0c'; // Classic Mario Brown
       ctx.fillRect(g.x, groundY, g.w, 80);
       // Ground brick pattern
       ctx.strokeStyle = '#000';
       ctx.lineWidth = 2;
       for(let i = g.x; i < g.x + g.w; i += 40) {
           ctx.strokeRect(i, groundY, 40, 40);
           ctx.strokeRect(i, groundY + 40, 40, 40);
           ctx.strokeRect(i - 20, groundY + 40, 40, 40); // Offset second row
       }
       ctx.fillStyle = '#00a800'; // Grass top
       ctx.fillRect(g.x, groundY, g.w, 8);
    });

    // Platforms (Pipe style or just green blocks)
    platforms.forEach(p => {
      const py = groundY - p.yOff;
      ctx.fillStyle = '#00a800';
      ctx.fillRect(p.x, py, p.w, p.h);
      ctx.strokeStyle = '#000';
      ctx.lineWidth = 3;
      ctx.strokeRect(p.x, py, p.w, p.h);
      // Highlight
      ctx.fillStyle = '#80d010';
      ctx.fillRect(p.x + 4, py + 4, 10, p.h - 8);
    });

    // Pipes
    state.pipes.forEach(p => {
      const py = groundY - p.yOff;
      
      // Pipe body
      ctx.fillStyle = '#00a800';
      ctx.fillRect(p.x + 4, py + 20, p.w - 8, p.h - 20);
      ctx.strokeStyle = '#000';
      ctx.lineWidth = 3;
      ctx.strokeRect(p.x + 4, py + 20, p.w - 8, p.h - 20);
      
      // Pipe top
      ctx.fillStyle = '#00a800';
      ctx.fillRect(p.x, py, p.w, 20);
      ctx.strokeRect(p.x, py, p.w, 20);
      
      // Highlight
      ctx.fillStyle = '#80d010';
      ctx.fillRect(p.x + 12, py + 4, 10, p.h - 8);

      // Label (Hint)
      ctx.fillStyle = '#fff';
      ctx.font = '900 14px monospace';
      ctx.textAlign = 'center';
      // Drop shadow for text readability
      ctx.shadowColor = '#000';
      ctx.shadowBlur = 4;
      const lines = p.label.split('\n');
      lines.forEach((l: string, i: number) => {
        ctx.fillText(l, p.x + p.w/2, py - 45 + (i * 20));
      });
      ctx.shadowBlur = 0;
    });

    // Blocks
    blocks.forEach(b => {
      const by = groundY - b.yOff + b.yAnim;
      if (b.type === 'stat') {
        ctx.fillStyle = b.hit ? '#854d0e' : '#f8b800'; // Empty vs ? Block
        ctx.fillRect(b.x, by, b.w, b.h);
        ctx.strokeStyle = '#000';
        ctx.lineWidth = 2;
        ctx.strokeRect(b.x, by, b.w, b.h);
        
        if (!b.hit) {
          ctx.fillStyle = '#000';
          ctx.font = '900 24px monospace';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText('?', b.x + b.w/2, by + b.h/2 + 2);
          
          // Corner rivets
          ctx.fillStyle = '#c84c0c';
          ctx.fillRect(b.x+3, by+3, 4, 4);
          ctx.fillRect(b.x+b.w-7, by+3, 4, 4);
          ctx.fillRect(b.x+3, by+b.h-7, 4, 4);
          ctx.fillRect(b.x+b.w-7, by+b.h-7, 4, 4);
        }
      } else {
        ctx.fillStyle = '#c84c0c'; // Brick
        ctx.fillRect(b.x, by, b.w, b.h);
        ctx.strokeStyle = '#000';
        ctx.lineWidth = 2;
        ctx.strokeRect(b.x, by, b.w, b.h);
        
        // Brick pattern
        ctx.beginPath();
        ctx.moveTo(b.x, by + b.h/2); ctx.lineTo(b.x + b.w, by + b.h/2);
        ctx.moveTo(b.x + b.w/2, by); ctx.lineTo(b.x + b.w/2, by + b.h/2);
        ctx.moveTo(b.x + b.w/4, by + b.h/2); ctx.lineTo(b.x + b.w/4, by + b.h);
        ctx.moveTo(b.x + b.w*0.75, by + b.h/2); ctx.lineTo(b.x + b.w*0.75, by + b.h);
        ctx.stroke();
      }
    });

    // Floating Texts
    state.floatingTexts.forEach((ft, i) => {
        ft.y -= 1;
        ft.life -= 0.02;
        ctx.globalAlpha = Math.max(0, ft.life);
        ctx.fillStyle = '#fff';
        ctx.font = '900 20px monospace';
        ctx.fillText(ft.text, ft.x, ft.y);
        if (ft.life <= 0) state.floatingTexts.splice(i, 1);
    });
    ctx.globalAlpha = 1;

    // Draw Player (8-bit Classic Style)
    ctx.save();
    ctx.translate(player.x + player.w/2, player.y + player.h); 
    const facingRight = player.vx >= -0.1;
    ctx.scale(facingRight ? 1 : -1, 1);

    // Simple 8-bit rendering
    ctx.fillStyle = '#e82008'; // Hat
    ctx.fillRect(-10, -40, 24, 10);
    ctx.fillRect(-10, -30, 30, 4); 

    ctx.fillStyle = '#f8b800'; // Face
    ctx.fillRect(-10, -26, 22, 14);
    
    ctx.fillStyle = '#000'; // Eye/Mustache
    ctx.fillRect(4, -24, 4, 4); // Eye
    ctx.fillRect(8, -18, 10, 4); // Mustache

    ctx.fillStyle = '#e82008'; // Shirt
    ctx.fillRect(-12, -12, 24, 12);
    
    ctx.fillStyle = '#0058f8'; // Overalls
    ctx.fillRect(-8, -12, 16, 12);
    ctx.fillRect(-4, -20, 8, 8); // Straps

    ctx.fillStyle = '#c84c0c'; // Boots
    ctx.fillRect(-16, 0, 12, 6); 
    ctx.fillRect(4, 0, 12, 6); 

    ctx.restore();
    ctx.restore();

    state.frameId = requestAnimationFrame(update);
  };

  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    gameRef.current.frameId = requestAnimationFrame(update);
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(gameRef.current.frameId);
    };
  }, []);

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => setNotification(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  return (
    <main className="fixed inset-0 bg-[#5c94fc] overflow-hidden select-none touch-none font-mono">
      <SEO title="Super Rachit Bros" />

      {/* CLASSIC MARIO HUD */}
      <div className="fixed top-20 md:top-24 left-0 w-full z-[80] px-6 md:px-12 flex justify-between items-start pointer-events-none text-white text-xl md:text-3xl" style={{ textShadow: '4px 4px 0 #000' }}>
        <div className="flex flex-col items-center">
          <span className="font-black tracking-widest">RACHIT</span>
          <span className="tracking-widest">{String(score).padStart(6, '0')}</span>
        </div>
        <div className="hidden md:flex flex-col items-center">
          <span className="font-black tracking-widest">WORLD</span>
          <span className="tracking-widest">1-1</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="font-black tracking-widest">STATS</span>
          <span className="text-[#f8b800] tracking-widest">x{String(unlockedStats.length).padStart(2, '0')}</span>
        </div>
        <div className="flex flex-col items-center pointer-events-auto cursor-pointer hover:text-red-400 active:scale-95 transition-all" onClick={handleReturn}>
          <span className="font-black tracking-widest text-[#e82008]">EXIT</span>
          <span className="tracking-widest">LEVEL</span>
        </div>
      </div>

      <canvas ref={canvasRef} className="absolute inset-0 z-0 block w-full h-full" />

      {/* RETRO NOTIFICATION (Right Side) */}
      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            className="fixed top-48 right-8 md:right-12 z-[110] bg-black border-4 border-white p-6 text-white min-w-[250px]"
            style={{ boxShadow: '8px 8px 0 #000' }}
          >
            <div className="text-sm text-[#f8b800] mb-2 font-black tracking-widest uppercase">Stat Unlocked!</div>
            <div className="text-4xl font-black tracking-tighter mb-1">{notification.value}</div>
            <div className="text-sm uppercase tracking-widest text-white/70">{notification.label}</div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* VICTORY OVERLAY - RETRO STYLE */}
      <AnimatePresence>
        {showVictory && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-[200] bg-black/80 backdrop-blur-sm flex flex-col items-center justify-center p-8 text-center pointer-events-auto"
          >
            <motion.div
              initial={{ scale: 0.8, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              className="bg-black border-4 border-white p-12 shadow-[16px_16px_0_#000] max-w-4xl w-full"
            >
              <h1 className="text-5xl md:text-7xl font-black text-white tracking-widest uppercase mb-12 text-center" style={{ textShadow: '4px 4px 0 #e82008' }}>
                COURSE CLEAR!
              </h1>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12 text-left">
                {unlockedStats.map((s, i) => (
                  <div key={i} className="space-y-2">
                    <div className="text-xs font-black uppercase text-[#f8b800] tracking-widest">{s.label}</div>
                    <div className="text-3xl font-black text-white tracking-widest">{s.value}</div>
                  </div>
                ))}
              </div>

              <div className="text-3xl font-black text-white mb-12">
                FINAL SCORE: <span className="text-[#f8b800]">{score}</span>
              </div>

              <div className="flex flex-col md:flex-row items-center justify-center gap-8">
                <button 
                  onClick={() => {
                     gameRef.current.player = { x: 100, y: 0, w: 40, h: 40, vx: 0, vy: 0, isGrounded: false, isJumping: false, jumpFrames: 0 };
                     gameRef.current.goalReached = false;
                     gameRef.current.camera.x = 0;
                     gameRef.current.blocks.forEach(b => b.hit = false);
                     setUnlockedStats([]);
                     setScore(0);
                     setShowVictory(false);
                  }}
                  className="px-12 py-4 bg-white text-black font-black text-xl uppercase tracking-widest hover:bg-[#f8b800] active:scale-95 transition-all border-4 border-white hover:border-[#f8b800]"
                >
                  RESTART
                </button>
                <button 
                  onClick={handleReturn}
                  className="px-12 py-4 bg-[#e82008] text-white font-black text-xl uppercase tracking-widest hover:bg-[#c84c0c] active:scale-95 transition-all border-4 border-[#e82008] hover:border-[#c84c0c]"
                >
                  RETURN HOME
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* MOBILE CONTROLS */}
      <div className="md:hidden fixed bottom-10 left-6 right-6 z-[90] flex justify-between pointer-events-none">
         <div className="flex gap-4 pointer-events-auto opacity-80">
            <button onPointerDown={() => { if(!showVictory) gameRef.current.keys.left = true }} onPointerUp={() => gameRef.current.keys.left = false} className="w-14 h-14 sm:w-16 sm:h-16 bg-black border-4 border-white text-white text-2xl font-black shadow-[4px_4px_0_#000]">←</button>
            <button onPointerDown={() => { if(!showVictory) gameRef.current.keys.right = true }} onPointerUp={() => gameRef.current.keys.right = false} className="w-14 h-14 sm:w-16 sm:h-16 bg-black border-4 border-white text-white text-2xl font-black shadow-[4px_4px_0_#000]">→</button>
         </div>
         <div className="flex gap-4 pointer-events-auto opacity-80">
            <button onPointerDown={() => { if(!showVictory) gameRef.current.keys.down = true }} onPointerUp={() => gameRef.current.keys.down = false} className="w-14 h-14 sm:w-16 sm:h-16 bg-black border-4 border-white text-white text-2xl font-black shadow-[4px_4px_0_#000]">↓</button>
            <button onPointerDown={() => { if(!showVictory) gameRef.current.keys.up = true }} onPointerUp={() => gameRef.current.keys.up = false} className="w-14 h-14 sm:w-16 sm:h-16 bg-[#e82008] border-4 border-white text-white text-2xl font-black shadow-[4px_4px_0_#000]">↑</button>
         </div>
      </div>
    </main>
  );
}