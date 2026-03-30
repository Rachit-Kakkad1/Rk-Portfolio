# JARVIS React Architecture

This document outlines the core structural concepts and rendering optimizations used throughout the portfolio.

## Viewport Culling
We deploy IntersectionObservers across all heavy WebGL and Canvas instances (like the cobe globe and Spline 3D keyboard) to pause their render loops gracefully when navigated away from, radically reducing GPU idle loads.