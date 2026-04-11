import React, { useEffect, useRef } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from '@studio-freight/lenis';
import Navigation from './components/Navigation';
import TransitionScreen from './components/TransitionScreen';
import Home from './pages/Home';
import ProjectDetail from './pages/ProjectDetail';
import Work from './pages/Work';

gsap.registerPlugin(ScrollTrigger);
ScrollTrigger.config({ ignoreMobileResize: true });

export default function App() {
  const location = useLocation();
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.4, // Slightly longer for premium feel
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
      lerp: 0.05, // Lower lerp = smoother, more viscous scroll
    });

    lenisRef.current = lenis;
    (window as any).lenis = lenis;

    // Sync ScrollTrigger with Lenis
    function update(time: number) {
      lenis.raf(time * 1000);
    }
    
    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    // Refresh ScrollTrigger on resize with a small delay to prevent glitches
    const handleResize = () => {
      ScrollTrigger.refresh();
    };
    window.addEventListener('resize', handleResize);

    return () => {
      gsap.ticker.remove(update);
      window.removeEventListener('resize', handleResize);
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    lenisRef.current?.stop();
    lenisRef.current?.start();
    lenisRef.current?.scrollTo(0, { immediate: true });
  }, [location.pathname]);

  return (
    <div className="relative">
      <TransitionScreen />
      <Navigation />
      
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/work" element={<Work />} />
          <Route path="/project/:id" element={<ProjectDetail />} />
          <Route path="/about" element={<Home />} />
          <Route path="/skills" element={<Home />} />
          <Route path="/experience" element={<Home />} />
          <Route path="/contact" element={<Home />} />
        </Routes>
      </AnimatePresence>
    </div>
  );
}
