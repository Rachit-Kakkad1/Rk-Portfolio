# JARVIS React Architecture

This document outlines the core structural concepts and rendering optimizations used throughout the portfolio.

## Viewport Culling
We deploy IntersectionObservers across all heavy WebGL and Canvas instances (like the cobe globe and Spline 3D keyboard) to pause their render loops gracefully when navigated away from, radically reducing GPU idle loads.

## Hardware Acceleration
We enforce `translateZ(0)` and `will-change: transform` via the `.gpu-accel` utility class on massively repainting nodes—notably the bottom GSAP marquee and transparent typography sections—giving the browser's compositor thread explicit VRAM control.

## Render Loops
Continuous GSAP tickers are heavily clamped. For instance, the ScrollTrigger calculating scroll velocity uses mathematically smoothed values to prevent infinite layout recalculations during rapid wheel inputs.

## Media Assets
All critical hero and gallery elements mandate optimized PNG processing. High-resolution elements load progressively behind framer-motion opacity tweens to construct a seamless visual queue.

## Navigation Analytics
The global layout uses requestAnimationFrame to throttle the `window.scrollY` event listeners controlling the sticky Nav visibility, thereby dropping unnecessary sub-frame event executions.

## Kinetic UI
The flip cards employ native perspective transforms spanning over 2000px depth. The layers avoid `backdrop-filter` overlapping where mathematically possible to prevent WebKit rendering crashes on iOS.