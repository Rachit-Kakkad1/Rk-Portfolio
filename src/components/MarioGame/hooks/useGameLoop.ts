import { useEffect, useRef } from 'react';
import { GameState } from '../types/game.types';
import { useControls } from './useControls';
import { useLevelData } from './useLevelData';
import { useAudio } from './useAudio';
import { applyPhysics, WALK_SPEED, RUN_SPEED, JUMP_FORCE } from '../engine/physics';
import { checkCollision } from '../engine/collision';
import { updateCamera } from '../engine/camera';
import { updateParticles } from '../engine/particles';
import { createInitialMario } from './useGameState';
import { TILE_SIZE, FLAG_POLE_X, STAT_LABELS } from '../data/level1-1';

export function useGameLoop(
  gameStateRef: React.MutableRefObject<GameState>,
  canvasRef: React.RefObject<HTMLCanvasElement>,
  forceUpdateHUD: () => void,
  onStatUnlocked?: (label: string, value: string) => void
) {
  const keys = useControls();
  const { blocks: initialBlocks, goombas: initialGoombas } = useLevelData();
  const audio = useAudio();
  const reqRef = useRef<number>();
  const lastTimeRef = useRef<number>(0);
  const phaseTimerRef = useRef<number>(0);
  
  // HUD Update interval
  const hudUpdateTimerRef = useRef<number>(0);

  useEffect(() => {
    // Initialize level data on mount
    gameStateRef.current.blocks = JSON.parse(JSON.stringify(initialBlocks));
    gameStateRef.current.goombas = JSON.parse(JSON.stringify(initialGoombas));

    const loop = (time: number) => {
      if (document.hidden) {
        reqRef.current = requestAnimationFrame(loop);
        lastTimeRef.current = time;
        return;
      }

      if (!lastTimeRef.current) lastTimeRef.current = time;
      const dtMs = time - lastTimeRef.current;
      const dt = dtMs / (1000 / 60); // Normalize to 60fps
      lastTimeRef.current = time;

      const state = gameStateRef.current;

      // Update Phase Logic
      if (state.phase === 'title') {
        if (keys.current.START) {
          audio.init();
          state.phase = 'playing';
          state.time = 400;
          state.score = 0;
          state.coins = 0;
          state.mario = createInitialMario();
          state.blocks = JSON.parse(JSON.stringify(initialBlocks));
          state.goombas = JSON.parse(JSON.stringify(initialGoombas));
          state.camX = 0;
        }
      } else if (state.phase === 'playing') {
        // Time logic
        state.timeAccum += dtMs;
        if (state.timeAccum >= 1000) {
          state.timeAccum -= 1000;
          state.time -= 1;
          if (state.time <= 0) {
            state.phase = 'dying';
            state.mario.action = 'dead';
            state.mario.vel.y = -6;
            audio.death();
          }
        }

        const m = state.mario;

        // Input
        if (keys.current.RIGHT && !keys.current.LEFT) {
          m.vel.x += 0.2;
          m.facing = 1;
          m.action = 'walk';
        } else if (keys.current.LEFT && !keys.current.RIGHT) {
          m.vel.x -= 0.2;
          m.facing = -1;
          m.action = 'walk';
        } else {
          m.action = m.onGround ? 'stand' : 'jump';
        }

        const speedLimit = keys.current.RUN ? RUN_SPEED : WALK_SPEED;
        if (m.vel.x > speedLimit) m.vel.x = speedLimit;
        if (m.vel.x < -speedLimit) m.vel.x = -speedLimit;

        if (keys.current.UP && m.onGround) {
          m.vel.y = JUMP_FORCE;
          m.onGround = false;
          audio.jump();
        }

        applyPhysics(m, dt);
        
        // Prevent going left of screen
        if (m.pos.x < state.camX) {
          m.pos.x = state.camX;
          m.vel.x = Math.max(0, m.vel.x);
        }

        checkCollision(m, state.blocks, (block) => {
          if (block.type === 'question') {
            block.type = 'used';
            block.hit = true;
            if (block.contains === 'coin') {
              state.coins++;
              state.score += 200;
              audio.coin();
            } else if (block.contains === 'stat') {
              const stat = STAT_LABELS[`${block.tileX}_${block.tileY}`];
              if (stat) {
                state.score += 1000;
                onStatUnlocked?.(stat.label, stat.value);
                audio.powerUp();
              }
            } else {
              audio.powerUp();
            }
          } else if (block.type === 'brick') {
            block.hit = true;
            audio.brickBreak();
          }
        }, 450);

        if (m.onGround && Math.abs(m.vel.x) > 0.1) {
          m.runFrame += 0.2 * dt;
        }

        // Camera
        state.camX = updateCamera(state.camX, m, 800);

        // Enemy Logic
        state.goombas.forEach(g => {
          if (!g.active) return;
          if (g.pos.x < state.camX - 100 || g.pos.x > state.camX + 900) return;
          
          if (!g.squished) {
            g.vel.x = g.dir * 0.5;
            g.vel.y += 0.5;
            g.pos.x += g.vel.x;
            g.pos.y += g.vel.y;

            // Simple ground collision
            const groundY = 13 * TILE_SIZE; // Simplified ground height
            if (g.pos.y + g.size.y > groundY) {
              g.pos.y = groundY - g.size.y;
              g.vel.y = 0;
            }
            g.walkFrame += 0.1 * dt;

            // Mario collision
            if (m.invincible <= 0) {
              if (m.pos.x < g.pos.x + g.size.x && m.pos.x + m.size.x > g.pos.x &&
                  m.pos.y < g.pos.y + g.size.y && m.pos.y + m.size.y > g.pos.y) {
                if (m.vel.y > 0 && m.pos.y < g.pos.y) {
                  g.squished = true;
                  g.squishTimer = 30;
                  m.vel.y = -5; // Bounce
                  state.score += 100;
                  audio.stomp();
                } else {
                  state.phase = 'dying';
                  m.action = 'dead';
                  m.vel.y = -6;
                  m.vel.x = 0;
                  audio.death();
                  phaseTimerRef.current = 150; // frames
                }
              }
            }
          } else {
            g.squishTimer -= dt;
            if (g.squishTimer <= 0) g.active = false;
          }
        });

        // Flag pole logic
        if (m.pos.x > FLAG_POLE_X * TILE_SIZE && m.pos.y > 2 * TILE_SIZE) {
          state.phase = 'levelclear';
          m.vel.x = 0;
          m.vel.y = 3;
          m.pos.x = FLAG_POLE_X * TILE_SIZE;
          state.flagProgress = m.pos.y;
          audio.flagSlide();
          phaseTimerRef.current = 300;
        }

        if (m.action === 'dead') {
           state.phase = 'dying';
           phaseTimerRef.current = 150;
        }

      } else if (state.phase === 'dying') {
        const m = state.mario;
        m.pos.y += m.vel.y;
        m.vel.y += 0.5;
        phaseTimerRef.current -= dt;
        if (phaseTimerRef.current <= 0) {
          state.lives -= 1;
          if (state.lives <= 0) {
            state.phase = 'gameover';
            phaseTimerRef.current = 240;
          } else {
            state.phase = 'dead';
          }
        }
      } else if (state.phase === 'dead') {
        state.phase = 'playing';
        state.mario = createInitialMario();
        state.camX = 0;
        state.time = 400;
        state.blocks = JSON.parse(JSON.stringify(initialBlocks));
        state.goombas = JSON.parse(JSON.stringify(initialGoombas));
      } else if (state.phase === 'levelclear') {
        const m = state.mario;
        if (m.pos.y < 13 * TILE_SIZE) {
          m.pos.y += m.vel.y;
        } else {
          m.vel.y = 0;
          m.pos.y = 13 * TILE_SIZE;
          m.vel.x = 1.5;
          m.pos.x += m.vel.x;
          m.action = 'walk';
          m.runFrame += 0.2 * dt;
        }
        phaseTimerRef.current -= dt;
        if (phaseTimerRef.current <= 0) {
          state.phase = 'title';
        }
      } else if (state.phase === 'gameover') {
        phaseTimerRef.current -= dt;
        if (phaseTimerRef.current <= 0) {
          state.phase = 'title';
          state.lives = 3;
        }
      }

      updateParticles(state.particles, dt);

      // Throttled HUD update
      if (time - hudUpdateTimerRef.current > 500) {
        hudUpdateTimerRef.current = time;
        forceUpdateHUD();
      }

      reqRef.current = requestAnimationFrame(loop);
    };

    reqRef.current = requestAnimationFrame(loop);
    return () => {
      if (reqRef.current) cancelAnimationFrame(reqRef.current);
    };
  }, [initialBlocks, initialGoombas, audio, keys, forceUpdateHUD, gameStateRef]);
}
