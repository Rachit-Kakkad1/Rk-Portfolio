import { useRef } from 'react';
import { GameState, Mario } from '../types/game.types';

export function useGameState() {
  const gameState = useRef<GameState>({
    phase: 'title',
    score: 0,
    coins: 0,
    lives: 3,
    time: 400,
    timeAccum: 0,
    camX: 0,
    mario: createInitialMario(),
    goombas: [],
    blocks: [],
    particles: [],
    flagProgress: 0,
    statsUnlocked: {}
  });

  return gameState;
}

function createInitialMario(): Mario {
  return {
    id: 'mario',
    pos: { x: 32, y: 160 },
    vel: { x: 0, y: 0 },
    size: { x: 16, y: 16 },
    active: true,
    state: 'small',
    action: 'stand',
    facing: 1,
    onGround: false,
    runFrame: 0,
    invincible: 0
  };
}

export { createInitialMario };
