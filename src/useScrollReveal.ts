/**
 * useScrollReveal — React hook wrapper for the scroll reveal system.
 *
 * Call this in your top-level App component after the main content
 * has mounted. It initializes scroll-based text reveal animations
 * for all elements with `data-scroll-reveal` attributes.
 */

import { useEffect } from 'react';
import { initScrollReveal, destroyScrollReveal } from './scroll';

export function useScrollReveal(deps: React.DependencyList = []) {
  useEffect(() => {
    // Wait a tick for DOM to be fully painted (critical after transitions)
    const raf = requestAnimationFrame(() => {
      initScrollReveal();
    });

    return () => {
      cancelAnimationFrame(raf);
      destroyScrollReveal();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}

export default useScrollReveal;
