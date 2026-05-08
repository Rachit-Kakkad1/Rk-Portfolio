export function renderHUD(ctx: CanvasRenderingContext2D, canvasWidth: number, score: number, coins: number, time: number, lives: number): void {
  // HUD is usually rendered as DOM elements in React overlay for easier styling,
  // but if drawn on canvas:
  // Not strictly required since HUD is specified as a React component.
  // The prompt says "HUD COMPONENT (inside MarioGame.tsx, above canvas)"
  // So this file might just export a no-op or we don't need to draw HUD on canvas.
  // We'll leave it empty to use React instead.
}
