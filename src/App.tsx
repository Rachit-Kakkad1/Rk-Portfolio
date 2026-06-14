import React, { lazy, Suspense, useEffect, useRef } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from '@studio-freight/lenis';
import Navigation from './components/Navigation';
import TransitionScreen from './components/TransitionScreen';

const Home = lazy(() => import('./pages/Home'));
const ProjectDetail = lazy(() => import('./pages/ProjectDetail'));
const Work = lazy(() => import('./pages/Work'));
const GitHubStats = lazy(() => import('./pages/GitHubStats'));
const LeetCodeStats = lazy(() => import('./pages/LeetCodeStats'));
const YouTubeVideos = lazy(() => import('./pages/YouTubeVideos'));
const AllCertificates = lazy(() => import('./pages/AllCertificates'));

gsap.registerPlugin(ScrollTrigger);
ScrollTrigger.config({ ignoreMobileResize: true });

export default function App() {
  const location = useLocation();
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const lowDeviceMemory = ((navigator as any).deviceMemory ?? 8) <= 4;
    const lowCpuThreads = (navigator.hardwareConcurrency ?? 8) <= 4;
    const isLowPowerDevice = window.innerWidth < 1024 || lowDeviceMemory || lowCpuThreads;

    if (prefersReducedMotion) {
      (window as any).lenis = null;
      return;
    }

    const lenis = new Lenis({
      duration: isLowPowerDevice ? 1.4 : 3.0,
      easing: (t) => 1 - Math.pow(1 - t, 5),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      syncTouch: true,
      wheelMultiplier: isLowPowerDevice ? 0.8 : 1.0,
      touchMultiplier: isLowPowerDevice ? 1.2 : 1.8,
      lerp: isLowPowerDevice ? 0.06 : 0.035,
    });

    lenisRef.current = lenis;
    (window as any).lenis = lenis;

    // Sync ScrollTrigger with Lenis
    function update(time: number) {
      lenis.raf(time * 1000);
    }
    
    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(500, 33);

    // Refresh ScrollTrigger on resize with debounce to prevent glitches
    let resizeTimer: ReturnType<typeof setTimeout>;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        ScrollTrigger.refresh();
      }, 200);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      gsap.ticker.remove(update);
      window.removeEventListener('resize', handleResize);
      clearTimeout(resizeTimer);
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    // Only reset scroll for actual route changes, not hash/section navigations
    const mainRoutes = ['/', '/work', '/projects'];
    if (mainRoutes.includes(location.pathname) || location.pathname.startsWith('/project/')) {
      window.scrollTo(0, 0);
      lenisRef.current?.scrollTo(0, { immediate: true });
    }
  }, [location.pathname]);

  return (
    <div className="relative">
      <TransitionScreen />
      <Navigation />
      
      <AnimatePresence mode="wait">
        <Suspense fallback={<div className="min-h-screen bg-[#F6F3EE]" />}>
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/work" element={<Work />} />
            <Route path="/projects" element={<Work />} />
            <Route path="/project/:id" element={<ProjectDetail />} />
            <Route path="/about" element={<Home />} />
            <Route path="/skills" element={<Home />} />
            <Route path="/experience" element={<Home />} />
            <Route path="/contact" element={<Home />} />
            <Route path="/certificates" element={<Home />} />
            <Route path="/uses" element={<Home />} />
            <Route path="/education" element={<Home />} />
            <Route path="/github-stats" element={<GitHubStats />} />
            <Route path="/leetcode-stats" element={<LeetCodeStats />} />
            <Route path="/youtube-videos" element={<YouTubeVideos />} />
            <Route path="/all-certificates" element={<AllCertificates />} />
          </Routes>
        </Suspense>
      </AnimatePresence>
    </div>
  );
}
