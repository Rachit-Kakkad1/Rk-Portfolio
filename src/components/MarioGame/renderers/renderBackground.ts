import { CLOUDS, HILLS, BUSHES, TILE_SIZE } from '../data/level1-1';
import { NES } from '../data/sprites';

export function renderBackground(ctx: CanvasRenderingContext2D, canvasWidth: number, canvasHeight: number, camX: number): void {
  // Sky
  ctx.fillStyle = NES.SKY;
  ctx.fillRect(0, 0, canvasWidth, canvasHeight);

  // Background parallax factor
  const bgCamX = camX * 0.4;

  ctx.save();
  ctx.translate(-bgCamX % (200 * TILE_SIZE), 0); // loop background or just draw enough

  // Draw Hills
  for (const hill of HILLS) {
    const x = hill.x * TILE_SIZE;
    const y = canvasHeight - 2 * TILE_SIZE; // Ground is 2 tiles high
    
    ctx.fillStyle = NES.HILL;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.quadraticCurveTo(x + (hill.w * TILE_SIZE) / 2, y - hill.peakY * TILE_SIZE, x + hill.w * TILE_SIZE, y);
    ctx.fill();

    // Hill dots (light green)
    ctx.fillStyle = NES.HILL_LIGHT;
    ctx.beginPath();
    ctx.arc(x + (hill.w * TILE_SIZE) / 2, y - (hill.peakY * TILE_SIZE) / 2, 4, 0, Math.PI * 2);
    ctx.fill();
  }

  // Draw Clouds
  for (const cloud of CLOUDS) {
    const x = cloud.x * TILE_SIZE;
    const y = cloud.y * TILE_SIZE;
    ctx.fillStyle = NES.CLOUD;
    
    // Simple 3 overlapping circles cloud
    ctx.beginPath();
    ctx.arc(x, y, 16, 0, Math.PI * 2);
    ctx.arc(x + 16, y - 8, 20, 0, Math.PI * 2);
    ctx.arc(x + 32, y, 16, 0, Math.PI * 2);
    ctx.fill();
  }

  // Draw Bushes
  for (const bushX of BUSHES) {
    const x = bushX * TILE_SIZE;
    const y = canvasHeight - 2 * TILE_SIZE;
    
    ctx.fillStyle = NES.BUSH;
    ctx.beginPath();
    ctx.arc(x, y, 12, 0, Math.PI * 2);
    ctx.arc(x + 16, y - 6, 16, 0, Math.PI * 2);
    ctx.arc(x + 32, y, 12, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = NES.BUSH_DARK;
    ctx.beginPath();
    ctx.arc(x + 16, y, 10, 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.restore();
}
