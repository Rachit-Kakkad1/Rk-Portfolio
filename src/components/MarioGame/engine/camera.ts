import { Mario } from '../types/game.types';

export function updateCamera(camX: number, mario: Mario, canvasWidth: number): number {
  // Center Mario on screen roughly, but don't let camera go left of 0
  const targetCamX = Math.max(0, mario.pos.x - canvasWidth / 2 + mario.size.x / 2);
  
  // Smooth scroll or hard clamp based on NES style (NES usually doesn't let you scroll left)
  // For standard Mario, we prevent scrolling backwards.
  if (targetCamX > camX) {
    return targetCamX;
  }
  return camX;
}
