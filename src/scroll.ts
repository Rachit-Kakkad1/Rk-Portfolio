/**
 * scroll.ts — Scroll Enhancement Module
 *
 * Provides scroll-based text reveal animations with:
 * - Fade + slide-in effects triggered on viewport entry
 * - Staggered animations for grouped elements
 * - Configurable speed, easing, and direction via data attributes
 * - Performance-optimized using GSAP ScrollTrigger (batching + rAF)
 * - Respects prefers-reduced-motion
 * - Works with the existing Lenis smooth scroll instance
 *
 * Usage:
 *   Add `data-scroll-reveal` to any element for default fade-up.
 *   Optional data attributes:
 *     data-scroll-reveal="fade-up" | "fade-down" | "fade-left" | "fade-right" | "fade-scale" | "clip-up"
 *     data-scroll-delay="0.1"      — extra delay in seconds
 *     data-scroll-duration="0.6"   — animation duration override
 *     data-scroll-stagger="0.08"   — stagger child elements (applied to parent)
 *     data-scroll-retrigger         — re-triggers animation on re-scroll
 *     data-scroll-offset="80"      — viewport trigger offset in px
 */

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// ─── CONFIGURABLE DEFAULTS ───────────────────────────────────────────────────
// Animation speed is 50% faster than "standard" (0.8s baseline → 0.53s)
export const SCROLL_CONFIG = {
  /** Base animation duration in seconds (50% faster than 0.8s standard) */
  baseDuration: 0.53,
  /** Default easing — smooth exponential ease-out */
  baseEase: 'power3.out' as string,
  /** Default translate distance in px */
  translateDistance: 60,
  /** Default stagger interval in seconds */
  staggerInterval: 0.08,
  /** Default viewport trigger start (CSS-style) */
  triggerStart: 'top 85%',
  /** Whether animations should only play once by default */
  once: true,
};

// ─── ANIMATION PRESETS ───────────────────────────────────────────────────────
type RevealPreset = 'fade-up' | 'fade-down' | 'fade-left' | 'fade-right' | 'fade-scale' | 'clip-up';

function getInitialState(preset: RevealPreset, distance: number) {
  switch (preset) {
    case 'fade-up':
      return { opacity: 0, y: distance };
    case 'fade-down':
      return { opacity: 0, y: -distance };
    case 'fade-left':
      return { opacity: 0, x: distance };
    case 'fade-right':
      return { opacity: 0, x: -distance };
    case 'fade-scale':
      return { opacity: 0, scale: 0.85 };
    case 'clip-up':
      return { opacity: 0, y: distance * 0.5, clipPath: 'inset(100% 0% 0% 0%)' };
    default:
      return { opacity: 0, y: distance };
  }
}

function getAnimatedState(preset: RevealPreset) {
  const base: gsap.TweenVars = { opacity: 1, y: 0, x: 0 };
  switch (preset) {
    case 'fade-scale':
      return { ...base, scale: 1 };
    case 'clip-up':
      return { ...base, clipPath: 'inset(0% 0% 0% 0%)' };
    default:
      return base;
  }
}

// ─── CORE INITIALIZATION ─────────────────────────────────────────────────────
// This can be called multiple times (e.g. after lazy sections mount).
// Each element is only processed once, tracked via a data attribute.

export function initScrollReveal() {
  // Respect user accessibility preferences
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) {
    // Immediately show all reveal elements with no animation
    document.querySelectorAll('[data-scroll-reveal]').forEach((el) => {
      (el as HTMLElement).style.opacity = '1';
    });
    return;
  }

  const elements = document.querySelectorAll<HTMLElement>('[data-scroll-reveal]:not([data-scroll-processed])');
  if (elements.length === 0) return;

  elements.forEach((el) => {
    // Mark element as processed to prevent double-initialization
    el.setAttribute('data-scroll-processed', 'true');

    const preset = (el.dataset.scrollReveal || 'fade-up') as RevealPreset;
    const delay = parseFloat(el.dataset.scrollDelay || '0');
    const duration = parseFloat(el.dataset.scrollDuration || String(SCROLL_CONFIG.baseDuration));
    const stagger = parseFloat(el.dataset.scrollStagger || '0');
    const retrigger = el.hasAttribute('data-scroll-retrigger');
    const offset = el.dataset.scrollOffset ? `top ${100 - parseInt(el.dataset.scrollOffset)}%` : SCROLL_CONFIG.triggerStart;
    const ease = SCROLL_CONFIG.baseEase;
    const distance = SCROLL_CONFIG.translateDistance;

    const initialProps = getInitialState(preset, distance);

    // If stagger is set, animate direct children instead
    if (stagger > 0) {
      const children = el.children;
      if (children.length > 0) {
        gsap.set(children, initialProps);

        ScrollTrigger.create({
          trigger: el,
          start: offset,
          once: !retrigger,
          onEnter: () => {
            gsap.to(children, {
              ...getAnimatedState(preset),
              duration,
              delay,
              stagger: stagger || SCROLL_CONFIG.staggerInterval,
              ease,
              overwrite: 'auto',
            });
          },
          ...(retrigger
            ? {
                onLeaveBack: () => {
                  gsap.set(children, initialProps);
                },
              }
            : {}),
        });
      }
    } else {
      // Single element reveal
      gsap.set(el, initialProps);

      ScrollTrigger.create({
        trigger: el,
        start: offset,
        once: !retrigger,
        onEnter: () => {
          gsap.to(el, {
            ...getAnimatedState(preset),
            duration,
            delay,
            ease,
            overwrite: 'auto',
          });
        },
        ...(retrigger
          ? {
              onLeaveBack: () => {
                gsap.set(el, initialProps);
              },
            }
          : {}),
      });
    }
  });
}

// ─── CLEANUP ─────────────────────────────────────────────────────────────────
export function destroyScrollReveal() {
  // Kill all ScrollTrigger instances we created
  ScrollTrigger.getAll().forEach((st) => {
    const trigger = st.vars.trigger as HTMLElement | undefined;
    if (trigger?.hasAttribute?.('data-scroll-reveal')) {
      st.kill();
    }
  });
  // Clear processed markers so elements can be re-initialized
  document.querySelectorAll('[data-scroll-processed]').forEach((el) => {
    el.removeAttribute('data-scroll-processed');
  });
}

export default initScrollReveal;
