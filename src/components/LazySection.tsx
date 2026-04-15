import React, { useState, useEffect, useRef } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { initScrollReveal } from '../scroll';

interface LazySectionProps {
  children: React.ReactNode;
  id?: string;
  className?: string;
  threshold?: number;
}

export default function LazySection({ children, id, className, threshold = 0 }: LazySectionProps) {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const hasRefreshed = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold, rootMargin: '800px' }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [threshold]);

  // After lazy content mounts, refresh ScrollTrigger so it recalculates
  // all positions with the new document height. This prevents scroll jumps.
  // Also initialize any new scroll-reveal elements that just mounted.
  useEffect(() => {
    if (isVisible && !hasRefreshed.current) {
      hasRefreshed.current = true;
      // Wait for the DOM to finish painting the new content
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          // Process any new data-scroll-reveal elements in this section
          initScrollReveal();
          // Recalculate all ScrollTrigger positions with new document height
          ScrollTrigger.refresh(false);
        });
      });
    }
  }, [isVisible]);

  return (
    <div ref={sectionRef} id={id} className={className}>
      {isVisible ? children : null}
    </div>
  );
}
