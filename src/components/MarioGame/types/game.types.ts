export type GamePhase = 'title' | 'playing' | 'paused' | 'dying' | 'dead' | 'levelclear' | 'gameover';

export interface Vec2 {
  x: number;
  y: number;
}

export interface Entity {
  id: string;
  pos: Vec2;
  vel: Vec2;
  size: Vec2;
  active: boolean;
}

export interface Mario extends Entity {
  state: 'small' | 'super' | 'fire';
  action: 'stand' | 'walk' | 'run' | 'jump' | 'duck' | 'dead';
  facing: 1 | -1;
  onGround: boolean;
  runFrame: number;
  invincible: number;
}

export interface Goomba extends Entity {
  walkFrame: number;
  squished: boolean;
  squishTimer: number;
  dir: 1 | -1;
}

export interface Block {
  id: string;
  tileX: number;
  tileY: number;
  type: 'brick' | 'question' | 'used' | 'ground' | 'pipe';
  contains: 'coin' | 'mushroom' | 'star' | null;
  hit: boolean;
  bumpOffset: number;
  animFrame: number;
}

export interface Particle {
  pos: Vec2;
  vel: Vec2;
  life: number;
  maxLife: number;
  color: string;
  size: number;
  type: 'coin' | 'brick' | 'stomp' | 'firework' | 'sparkle';
  active: boolean;
}

export interface GameState {
  phase: GamePhase;
  score: number;
  coins: number;
  lives: number;
  time: number;
  timeAccum: number;
  camX: number;
  mario: Mario;
  goombas: Goomba[];
  blocks: Block[];
  particles: Particle[];
  flagProgress: number;
  statsUnlocked: Record<string, string>;
}
