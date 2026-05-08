import { Particle } from '../types/game.types';

const MAX_PARTICLES = 64;

export function updateParticles(particles: Particle[], dt: number): void {
  for (let i = particles.length - 1; i >= 0; i--) {
    const p = particles[i];
    if (!p.active) continue;
    
    p.life -= dt;
    if (p.life <= 0) {
      p.active = false;
      continue;
    }

    p.pos.x += p.vel.x;
    p.pos.y += p.vel.y;
    
    // Apply gravity to brick and stomp particles
    if (p.type === 'brick' || p.type === 'stomp') {
      p.vel.y += 0.5; // gravity
    }
  }
}

export function spawnParticle(
  particles: Particle[],
  type: Particle['type'],
  x: number,
  y: number,
  vx: number,
  vy: number,
  color: string,
  life: number
): void {
  let p = particles.find(p => !p.active);
  if (!p) {
    if (particles.length >= MAX_PARTICLES) return;
    p = { pos: { x: 0, y: 0 }, vel: { x: 0, y: 0 }, life: 0, maxLife: 0, color: '', size: 2, type: 'sparkle', active: false };
    particles.push(p);
  }

  p.pos.x = x;
  p.pos.y = y;
  p.vel.x = vx;
  p.vel.y = vy;
  p.color = color;
  p.life = life;
  p.maxLife = life;
  p.type = type;
  p.active = true;
  p.size = type === 'firework' ? 4 : 2;
}
