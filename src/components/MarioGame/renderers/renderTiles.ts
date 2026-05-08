import { Block } from '../types/game.types';
import { TILE_SIZE } from '../data/level1-1';
import { NES } from '../data/sprites';

export function renderTiles(ctx: CanvasRenderingContext2D, blocks: Block[], camX: number, canvasWidth: number, canvasHeight: number): void {
  ctx.save();
  ctx.translate(-camX, 0);

  for (const block of blocks) {
    const x = block.tileX * TILE_SIZE;
    const y = block.tileY * TILE_SIZE + block.bumpOffset;

    // Culling
    if (x < camX - TILE_SIZE || x > camX + canvasWidth) continue;

    switch (block.type) {
      case 'ground':
        ctx.fillStyle = NES.GROUND;
        ctx.fillRect(x, y, TILE_SIZE, TILE_SIZE);
        ctx.fillStyle = NES.GROUND_TOP;
        ctx.fillRect(x, y, TILE_SIZE, 2); // Top highlight
        // Add some "cracks" for more detail
        ctx.fillStyle = 'rgba(0,0,0,0.1)';
        ctx.fillRect(x + 4, y + 6, 2, 2);
        ctx.fillRect(x + 10, y + 12, 2, 2);
        break;
      
      case 'brick':
        ctx.fillStyle = NES.BRICK;
        ctx.fillRect(x, y, TILE_SIZE, TILE_SIZE);
        // lines for brick - more authentic pattern
        ctx.fillStyle = '#000';
        ctx.fillRect(x, y, TILE_SIZE, 1);
        ctx.fillRect(x, y + 7, TILE_SIZE, 1);
        ctx.fillRect(x, y + 15, TILE_SIZE, 1);
        ctx.fillRect(x + 7, y, 1, 8);
        ctx.fillRect(x + 3, y + 8, 1, 8);
        ctx.fillRect(x + 12, y + 8, 1, 8);
        // highlights
        ctx.fillStyle = NES.BRICK_LIGHT;
        ctx.fillRect(x + 1, y + 1, 6, 1);
        ctx.fillRect(x + 8, y + 1, 7, 1);
        break;

      case 'question':
        ctx.fillStyle = NES.Q_BLOCK;
        ctx.fillRect(x, y, TILE_SIZE, TILE_SIZE);
        // Question mark pattern
        const isLight = (Math.floor(Date.now() / 250) % 2 === 0);
        ctx.fillStyle = isLight ? NES.Q_GOLD : NES.Q_DARK;
        // Draw a simple 8-bit question mark
        ctx.fillRect(x + 5, y + 3, 6, 2);
        ctx.fillRect(x + 9, y + 5, 2, 2);
        ctx.fillRect(x + 7, y + 7, 2, 2);
        ctx.fillRect(x + 7, y + 11, 2, 2);
        // corner dots
        ctx.fillStyle = '#000';
        ctx.fillRect(x + 1, y + 1, 1, 1);
        ctx.fillRect(x + TILE_SIZE - 2, y + 1, 1, 1);
        ctx.fillRect(x + 1, y + TILE_SIZE - 2, 1, 1);
        ctx.fillRect(x + TILE_SIZE - 2, y + TILE_SIZE - 2, 1, 1);
        break;

      case 'used':
        ctx.fillStyle = NES.USED_BLOCK;
        ctx.fillRect(x, y, TILE_SIZE, TILE_SIZE);
        ctx.fillStyle = 'rgba(0,0,0,0.4)';
        ctx.fillRect(x + 2, y + 2, 2, 2);
        ctx.fillRect(x + TILE_SIZE - 4, y + 2, 2, 2);
        ctx.fillRect(x + 2, y + TILE_SIZE - 4, 2, 2);
        ctx.fillRect(x + TILE_SIZE - 4, y + TILE_SIZE - 4, 2, 2);
        break;

      case 'pipe':
        ctx.fillStyle = NES.PIPE_DARK;
        ctx.fillRect(x, y, TILE_SIZE, TILE_SIZE);
        ctx.fillStyle = NES.PIPE;
        ctx.fillRect(x + 2, y, TILE_SIZE - 4, TILE_SIZE);
        ctx.fillStyle = NES.PIPE_LIGHT;
        ctx.fillRect(x + 4, y, 4, TILE_SIZE); 
        ctx.fillStyle = '#000';
        // vertical lines
        ctx.fillRect(x, y, 1, TILE_SIZE);
        ctx.fillRect(x + TILE_SIZE - 1, y, 1, TILE_SIZE);
        break;
    }
  }

  ctx.restore();
}
