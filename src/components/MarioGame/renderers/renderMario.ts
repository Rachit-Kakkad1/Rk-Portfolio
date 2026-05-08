import { Mario } from '../types/game.types';
import { MARIO_COLORS, MARIO_STAND, MARIO_RUN1, MARIO_RUN2, MARIO_JUMP, MARIO_DEAD } from '../data/sprites';

const PIXEL_SIZE = 2;

export function renderMario(ctx: CanvasRenderingContext2D, mario: Mario, camX: number): void {
  // Invincibility flicker
  if (mario.invincible > 0 && Math.floor(Date.now() / 50) % 2 === 0) return;

  const renderX = Math.floor(mario.pos.x - camX);
  const renderY = Math.floor(mario.pos.y);

  let sprite = MARIO_STAND;
  if (mario.action === 'dead') sprite = MARIO_DEAD;
  else if (!mario.onGround) sprite = MARIO_JUMP;
  else if (Math.abs(m.vel.x) > 0.5) {
    sprite = Math.floor(mario.runFrame) % 2 === 0 ? MARIO_RUN1 : MARIO_RUN2;
  }

  ctx.save();
  ctx.translate(renderX + (mario.facing === -1 ? mario.size.x : 0), renderY);
  if (mario.facing === -1) {
    ctx.scale(-1, 1);
  }

  for (let row = 0; row < sprite.length; row++) {
    for (let col = 0; col < sprite[row].length; col++) {
      const colorKey = sprite[row][col];
      if (colorKey !== '.') {
        ctx.fillStyle = MARIO_COLORS[colorKey];
        ctx.fillRect(col * PIXEL_SIZE, row * PIXEL_SIZE, PIXEL_SIZE, PIXEL_SIZE);
      }
    }
  }

  ctx.restore();
}
