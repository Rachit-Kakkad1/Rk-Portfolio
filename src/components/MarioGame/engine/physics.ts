import { Mario } from '../types/game.types';

export const GRAVITY        = 0.5;
export const MAX_FALL_SPEED = 8;
export const WALK_SPEED     = 2;
export const RUN_SPEED      = 3.8;
export const JUMP_FORCE     = -10.5;
export const FRICTION_GROUND= 0.85;
export const FRICTION_AIR   = 0.95;

// Apply per frame
export function applyPhysics(mario: Mario, dt: number): void {
  mario.vel.y = Math.min(mario.vel.y + GRAVITY, MAX_FALL_SPEED);
  mario.pos.x += mario.vel.x;
  mario.pos.y += mario.vel.y;
  if (mario.onGround) {
    mario.vel.x *= FRICTION_GROUND;
  } else {
    mario.vel.x *= FRICTION_AIR;
  }
}
