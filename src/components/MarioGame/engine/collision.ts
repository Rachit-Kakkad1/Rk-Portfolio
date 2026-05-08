import { Mario, Block } from '../types/game.types';
import { TILE_SIZE } from '../data/level1-1';

export function checkCollision(
  mario: Mario,
  blocks: Block[],
  onBlockHit: (block: Block) => void,
  canvasHeight: number
): void {
  mario.onGround = false;

  // Pit detection
  if (mario.pos.y > canvasHeight + 64) {
    mario.action = 'dead';
    mario.vel.x = 0;
    mario.vel.y = 0;
    return;
  }

  // Broad phase: only check nearby blocks
  const nearbyBlocks = blocks.filter(b => 
    Math.abs(b.tileX * TILE_SIZE - mario.pos.x) < TILE_SIZE * 3 &&
    Math.abs(b.tileY * TILE_SIZE - mario.pos.y) < TILE_SIZE * 3
  );

  // Vertical collision
  mario.pos.y += mario.vel.y;
  for (const block of nearbyBlocks) {
    const bx = block.tileX * TILE_SIZE;
    const by = block.tileY * TILE_SIZE;
    
    // Check overlap
    if (mario.pos.x < bx + TILE_SIZE && mario.pos.x + mario.size.x > bx &&
        mario.pos.y < by + TILE_SIZE && mario.pos.y + mario.size.y > by) {
      
      // Falling (landing on block)
      if (mario.vel.y > 0) {
        mario.pos.y = by - mario.size.y;
        mario.vel.y = 0;
        mario.onGround = true;
      }
      // Jumping (hitting head)
      else if (mario.vel.y < 0) {
        mario.pos.y = by + TILE_SIZE;
        mario.vel.y = 0;
        if (!block.hit) {
          onBlockHit(block);
        }
      }
    }
  }

  // Horizontal collision
  mario.pos.x += mario.vel.x;
  for (const block of nearbyBlocks) {
    const bx = block.tileX * TILE_SIZE;
    const by = block.tileY * TILE_SIZE;
    
    // Check overlap
    if (mario.pos.x < bx + TILE_SIZE && mario.pos.x + mario.size.x > bx &&
        mario.pos.y < by + TILE_SIZE && mario.pos.y + mario.size.y > by) {
      
      // Moving right
      if (mario.vel.x > 0) {
        mario.pos.x = bx - mario.size.x;
        mario.vel.x = 0;
      }
      // Moving left
      else if (mario.vel.x < 0) {
        mario.pos.x = bx + TILE_SIZE;
        mario.vel.x = 0;
      }
    }
  }
}
