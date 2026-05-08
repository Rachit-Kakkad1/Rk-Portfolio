import { Goomba } from '../types/game.types';
import { GOOMBA_COLORS, GOOMBA_WALK1, GOOMBA_WALK2, GOOMBA_SQUISH } from '../data/sprites';

const PIXEL_SIZE = 2;

export function renderEnemies(ctx: CanvasRenderingContext2D, goombas: Goomba[], camX: number, canvasWidth: number): void {
  ctx.save();
  ctx.translate(-camX, 0);

  for (const goomba of goombas) {
    if (!goomba.active) continue;
    
    // Culling
    if (goomba.pos.x < camX - 32 || goomba.pos.x > camX + canvasWidth + 32) continue;

    const renderX = Math.floor(goomba.pos.x);
    const renderY = Math.floor(goomba.pos.y);

    let sprite = goomba.walkFrame % 2 === 0 ? GOOMBA_WALK1 : GOOMBA_WALK2;
    if (goomba.squished) {
      sprite = GOOMBA_SQUISH;
    }

    for (let row = 0; row < sprite.length; row++) {
      for (let col = 0; col < sprite[row].length; col++) {
        const colorKey = sprite[row][col];
        if (colorKey !== '.') {
          ctx.fillStyle = GOOMBA_COLORS[colorKey];
          ctx.fillRect(renderX + col * PIXEL_SIZE, renderY + row * PIXEL_SIZE, PIXEL_SIZE, PIXEL_SIZE);
        }
      }
    }
  }

  ctx.restore();
}
