import { useMemo } from 'react';
import { Block, Goomba } from '../types/game.types';
import { GROUND_SEGMENTS, BRICKS, QUESTION_BLOCKS, PIPES, BLOCK_CONTENTS, GOOMBA_SPAWNS, TILE_SIZE } from '../data/level1-1';

export function useLevelData() {
  return useMemo(() => {
    const blocks: Block[] = [];
    const goombas: Goomba[] = [];
    let idCounter = 0;

    // Ground
    GROUND_SEGMENTS.forEach(([startX, endX]) => {
      for (let x = startX; x <= endX; x++) {
        blocks.push({
          id: `ground_${idCounter++}`, tileX: x, tileY: 13, type: 'ground',
          contains: null, hit: false, bumpOffset: 0, animFrame: 0
        });
        blocks.push({
          id: `ground_${idCounter++}`, tileX: x, tileY: 14, type: 'ground',
          contains: null, hit: false, bumpOffset: 0, animFrame: 0
        });
      }
    });

    // Bricks
    BRICKS.forEach(([x, y]) => {
      blocks.push({
        id: `brick_${idCounter++}`, tileX: x, tileY: y, type: 'brick',
        contains: null, hit: false, bumpOffset: 0, animFrame: 0
      });
    });

    // Question blocks
    QUESTION_BLOCKS.forEach(([x, y]) => {
      const key = `${x}_${y}`;
      blocks.push({
        id: `q_${idCounter++}`, tileX: x, tileY: y, type: 'question',
        contains: BLOCK_CONTENTS[key] || 'coin', hit: false, bumpOffset: 0, animFrame: 0
      });
    });

    // Pipes
    PIPES.forEach(([x, height]) => {
      for (let h = 0; h < height; h++) {
        blocks.push({
          id: `pipe_${idCounter++}`, tileX: x, tileY: 12 - h, type: 'pipe',
          contains: null, hit: false, bumpOffset: 0, animFrame: 0
        });
        blocks.push({
          id: `pipe_${idCounter++}`, tileX: x + 1, tileY: 12 - h, type: 'pipe',
          contains: null, hit: false, bumpOffset: 0, animFrame: 0
        });
      }
    });

    // Goombas
    GOOMBA_SPAWNS.forEach(x => {
      goombas.push({
        id: `goomba_${idCounter++}`,
        pos: { x: x * TILE_SIZE, y: 12 * TILE_SIZE },
        vel: { x: -0.5, y: 0 },
        size: { x: TILE_SIZE, y: TILE_SIZE },
        active: true,
        walkFrame: 0,
        squished: false,
        squishTimer: 0,
        dir: -1
      });
    });

    return { blocks, goombas };
  }, []);
}
