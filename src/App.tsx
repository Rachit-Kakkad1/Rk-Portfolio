import React, { useEffect, useRef, useState } from 'react';
import { ArrowDownRight, Github, Linkedin, Youtube } from 'lucide-react';
import { LeetCode } from './components/Icons';
import { motion, AnimatePresence } from 'framer-motion';
import createGlobe from 'cobe';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from '@studio-freight/lenis';
import AboutSection from './components/AboutSection';
import KeyboardSection from './components/KeyboardSection';
import ProjectsSection from './components/ProjectsSection';
import CertificateSection from './components/CertificateSection';
import HackathonExperience from './components/HackathonExperience';
import FreelanceExperience from './components/FreelanceExperience';
import EducationSection from './components/EducationSection';
import ContactSection from './components/ContactSection';
import Navigation from './components/Navigation';
import TransitionScreen from './components/TransitionScreen';
import AIAssistant from './components/AIAssistant';
import CinemaIntro from './components/CinemaIntro';

gsap.registerPlugin(ScrollTrigger);

// Prevent stuttering caused by the mobile browser address bar hiding/showing on scroll
ScrollTrigger.config({ ignoreMobileResize: true });

function RotatingGlobe() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let phi = 0;
    let observer: IntersectionObserver;
    let isVisible = true;

    const globe = createGlobe(canvasRef.current!, {
      devicePixelRatio: 1,
      width: 64,
      height: 64,
      phi: 0,
      theta: 0.2,
      dark: 1,
      diffuse: 1.2,
      mapSamples: 2000, // Reduced slightly for massive performance gain, no visual delta at 64px
      mapBrightness: 6,
      baseColor: [0.604, 0.604, 0.604],
      markerColor: [1, 1, 1],
      glowColor: [0.604, 0.604, 0.604],
      markers: [
        { location: [23.2156, 72.6369], size: 0.1 }
      ],
      onRender: (state) => {
        if (!isVisible) return; // Freeze globe when off-screen
        state.phi = phi;
        phi += 0.005;
      }
    });

    observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0 }
    );
    if (canvasRef.current) {
      observer.observe(canvasRef.current);
    }

    return () => {
      globe.destroy();
      observer.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ width: 64, height: 64, willChange: 'transform' }}
      className="rounded-full"
    />
  );
}


export default function App() {
  const containerRef = useRef<HTMLDivElement>(null);
  const portraitRef = useRef<HTMLImageElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const [showIntro, setShowIntro] = useState(true);

  // Initialize Global Smooth Scrolling
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.5,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 2.0,
      lerp: 0.05,
    });

    (window as any).lenis = lenis;

    // Debounced ScrollTrigger update to reduce scroll-driven recalc
    let scrollRafId: number;
    lenis.on('scroll', () => {
      cancelAnimationFrame(scrollRafId);
      scrollRafId = requestAnimationFrame(() => ScrollTrigger.update());
    });

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
    };
  }, []);

  const handleDownloadResume = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDownloading(true);

    // Cinematic delay for "God Effect"
    setTimeout(() => {
      const link = document.createElement('a');
      link.href = "/Rachit Kakkad's Resume.pdf";
      link.download = "Rachit_Kakkad_Resume.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setTimeout(() => {
        setIsDownloading(false);
      }, 1000);
    }, 1500); // 1.5s build-up animation time
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Portrait animation - made static by removing scroll trigger logic
      // gsap.to(portraitRef.current, {
      //   scale: 0.85,
      //   opacity: 0.9,
      //   ease: "none",
      //   scrollTrigger: {
      //     trigger: containerRef.current,
      //     start: "top top",
      //     end: "bottom top",
      //     scrub: true,
      //   }
      // });

      // Continuous marquee that never stops
      const marquee = gsap.to(headlineRef.current, {
        xPercent: -50,
        repeat: -1,
        duration: 25,
        ease: "none",
      });

      // Highly Optimized ScrollTrigger update for marquee speed
      // Calculates velocity without triggering layout recalculations (thrashing)
      let lastVelocity = 0;
      ScrollTrigger.create({
        onUpdate: (self) => {
          // Clamp and smooth velocity heavily
          const currentVelocity = self.getVelocity() / 300;
          if (Math.abs(currentVelocity - lastVelocity) < 0.1) return;

          lastVelocity = currentVelocity;
          const targetScale = self.direction !== 0 ? (self.direction + currentVelocity) : 1;

          gsap.to(marquee, {
            timeScale: targetScale,
            duration: 0.8, // Slower smoothing prevents abrupt CPU spikes
            overwrite: "auto",
            ease: "power2.out"
          });
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Auto-scroll to hash route when intro finishes
  useEffect(() => {
    if (!showIntro && window.location.hash) {
      setTimeout(() => {
        const id = window.location.hash.replace('#', '');
        const element = document.getElementById(id);
        if (element && (window as any).lenis) {
          // A bit of offset for the floating nav header
          (window as any).lenis.scrollTo(element, { offset: -80, immediate: true });
        }
      }, 500); // Allow fade transitions to settle
    }
  }, [showIntro]);

  return (
    <main className={`bg-[#9a9a9a] ${showIntro ? 'h-screen overflow-hidden' : ''}`}>
      <AnimatePresence>
        {showIntro && (
          <CinemaIntro onComplete={() => setShowIntro(false)} />
        )}
      </AnimatePresence>

      <div className={`transition-opacity duration-1000 ${showIntro ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
        <TransitionScreen />

        <div id="home" ref={containerRef} className="relative w-full h-[200vh] bg-[#9a9a9a] font-sans selection:bg-white selection:text-black">
          <div className="sticky top-0 w-full h-screen overflow-hidden">



            {/* ─── PORTRAIT IMAGE (FULL-WIDTH CENTERED BACKGROUND) ─── */}
            <div className="absolute inset-0 w-full h-full z-10 pointer-events-none overflow-hidden bg-black/20">
              <img
                ref={portraitRef}
                src="/profile2.png"
                alt="Portrait of Rachit Kakkad, Full Stack Developer & AI Engineer"
                className="w-full h-full object-cover"
                style={{ objectPosition: 'center 15%' }}
              />
              {/* Mobile-only subtle gradient overlay to ensure text readability */}
              <div className="absolute inset-0 md:hidden bg-gradient-to-b from-black/60 via-black/20 to-black/60" />
              <div className="absolute inset-0 hidden md:block bg-gradient-to-r from-black/40 via-transparent to-transparent" />
            </div>

            {/* ─── LEFT CONTENT BLOCK ─── */}
            <div className="absolute left-6 md:left-10 lg:left-16 top-[45%] md:top-[45%] -translate-y-1/2 text-white z-20 flex flex-col gap-4 md:gap-5 items-start max-w-[90%] md:max-w-[50%] lg:max-w-[40%]">
              {/* Available badge */}
              <div className="flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 bg-[#1F1F1F]/80 backdrop-blur-md border border-white/15 rounded-full shadow-lg">
                <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="text-[9px] md:text-xs font-semibold tracking-[0.15em] uppercase">Available for Work</span>
              </div>

              <h1 className="text-[clamp(1.8rem,8vw,4rem)] md:text-[52px] lg:text-[72px] leading-[1.05] font-black tracking-tight text-left drop-shadow-xl">
                Rachit Kakkad
              </h1>

              <div className="text-[14px] md:text-[20px] lg:text-[24px] leading-[1.3] font-bold tracking-tight text-white/85 text-left drop-shadow-lg">
                Full Stack Developer & AI Engineer
              </div>

              <p className="text-[11px] md:text-[14px] text-white/70 leading-relaxed max-w-[320px] md:max-w-md drop-shadow-md">
                Building production-grade AI systems, blockchain platforms & cinematic web experiences with React, Node.js & Python.
              </p>

              {/* Social Links */}
              <div className="flex flex-wrap items-center gap-2 md:gap-3 mt-2">
                <a href="https://github.com/Rachit-Kakkad1" target="_blank" rel="noopener noreferrer" className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-[#1F1F1F]/80 backdrop-blur-md border border-white/20 flex items-center justify-center hover:bg-[#2A2A2A] hover:scale-110 transition-all duration-300" aria-label="GitHub"><Github size={16} /></a>
                <a href="https://www.linkedin.com/in/rachit-kakkad-r29052007k" target="_blank" rel="noopener noreferrer" className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-[#1F1F1F]/80 backdrop-blur-md border border-white/20 flex items-center justify-center hover:bg-[#2A2A2A] hover:scale-110 transition-all duration-300" aria-label="LinkedIn"><Linkedin size={16} /></a>
                <a href="https://www.youtube.com/@RachitKakkad" target="_blank" rel="noopener noreferrer" className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-[#1F1F1F]/80 backdrop-blur-md border border-white/20 flex items-center justify-center hover:bg-[#2A2A2A] hover:scale-110 transition-all duration-300" aria-label="YouTube"><Youtube size={16} /></a>
                <a href="https://leetcode.com/u/kUyAWXHOC5" target="_blank" rel="noopener noreferrer" className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-[#1F1F1F]/80 backdrop-blur-md border border-white/20 flex items-center justify-center hover:bg-[#2A2A2A] hover:scale-110 transition-all duration-300" aria-label="LeetCode"><LeetCode size={16} /></a>
              </div>

              {/* Hero Action Buttons - Responsive Row/Col */}
              <motion.div
                className="flex flex-row flex-wrap gap-3 md:gap-4 mt-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
              >
                <a
                  href="#projects"
                  onClick={(e) => { e.preventDefault(); window.dispatchEvent(new CustomEvent('trigger-transition', { detail: { name: 'Projects', target: 'projects' } })); }}
                  className="px-5 py-2.5 md:px-8 md:py-3.5 bg-white text-black font-black text-[10px] md:text-sm tracking-[0.1em] uppercase rounded-full hover:bg-gray-200 hover:scale-105 transition-all duration-300 flex items-center justify-center shadow-[0_0_20px_rgba(255,255,255,0.15)]"
                >
                  View Work
                </a>
                <button
                  onClick={handleDownloadResume}
                  disabled={isDownloading}
                  className={`px-5 py-2.5 md:px-8 md:py-3.5 ${isDownloading ? 'bg-[#B45309]' : 'bg-[#1F1F1F]/80 backdrop-blur-md'} text-white font-black text-[10px] md:text-sm tracking-[0.1em] uppercase rounded-full border border-white/20 hover:bg-[#2A2A2A] hover:scale-105 transition-all duration-500 flex items-center justify-center relative overflow-hidden min-w-[140px] md:min-w-[180px]`}
                >
                  <AnimatePresence mode="wait">
                    {isDownloading ? (
                      <motion.div
                        key="loading"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="flex items-center gap-2"
                      >
                        <div className="w-3 h-3 md:w-4 md:h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>PREPARING...</span>
                      </motion.div>
                    ) : (
                      <motion.span
                        key="idle"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                      >
                        Download CV
                      </motion.span>
                    )}
                  </AnimatePresence>
                </button>
              </motion.div>
            </div>

            {/* ─── ROTATING HEADLINE BADGE (RIGHT SIDE) ─── */}
            <div className="absolute right-6 md:right-16 top-[75%] md:top-[55%] -translate-y-1/2 z-30 mix-blend-difference opacity-40 md:opacity-80 pointer-events-none scale-[0.7] md:scale-100 origin-right">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                className="w-32 h-32 md:w-48 md:h-48 relative flex items-center justify-center smooth-gpu"
              >
                <div className="absolute inset-0 border border-white/20 rounded-full scale-75" />
                <svg viewBox="0 0 100 100" className="w-full h-full text-white">
                  <path id="circlePath" d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" fill="transparent" />
                  <text className="text-[9.5px] font-bold tracking-[0.25em] uppercase fill-current">
                    <textPath href="#circlePath" startOffset="0%">
                      • FULL STACK DEVELOPER • AI ENGINEER • WEB3 ENTHUSIAST
                    </textPath>
                  </text>
                </svg>
                {/* Center dot/star */}
                <div className="absolute w-2 h-2 bg-white rounded-full animate-pulse" />
              </motion.div>
            </div>

            {/* ─── BOTTOM MARQUEE TEXT ─── */}
            {/* Behind portrait (z-5) so the person partially overlaps the text */}
            <div className="absolute bottom-[2vh] left-0 w-full whitespace-nowrap text-[30vw] md:text-[14vw] leading-none text-white/90 font-black z-[5] pointer-events-none flex items-end overflow-hidden smooth-gpu" style={{ letterSpacing: '-0.06em', WebkitTextStroke: '1px rgba(255,255,255,0.05)' }}>
              <div ref={headlineRef} className="flex w-max smooth-gpu">
                <span className="inline-block pr-[4vw]">AI/ML • DEV • MERN •</span>
                <span className="inline-block pr-[4vw]">AI/ML • DEV • MERN •</span>
              </div>
            </div>
          </div>
        </div>
        <Navigation />
        <section id="about" aria-label="About"><AboutSection /></section>
        <section id="skills" aria-label="Skills">
          <KeyboardSection />
        </section>
        <div id="work">
          <section id="hackathon" aria-label="Hackathon Experience"><HackathonExperience /></section>
          <section id="projects" aria-label="Projects"><ProjectsSection /></section>
        </div>

        <section id="uses" className="py-20 md:py-32 bg-[#F6F3EE] border-t border-black/5">
          <div className="max-w-[1400px] mx-auto px-6 md:px-12">
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#B45309] mb-4">Hardware & Software</p>
            <h2 className="text-4xl md:text-7xl font-black tracking-tighter text-[#0E0F14] mb-12 uppercase">Uses</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-12">
              <div className="p-6 md:p-8 bg-black/5 rounded-3xl border border-black/5">
                <h3 className="text-lg md:text-xl font-black mb-4 uppercase tracking-tighter">Development</h3>
                <p className="text-[12px] md:text-sm text-[#0E0F14]/60 leading-relaxed font-mono">VS Code / WSL2 / Docker / Git / Postman / Oh My Zsh</p>
              </div>
              <div className="p-6 md:p-8 bg-black/5 rounded-3xl border border-black/5">
                <h3 className="text-lg md:text-xl font-black mb-4 uppercase tracking-tighter">Design</h3>
                <p className="text-[12px] md:text-sm text-[#0E0F14]/60 leading-relaxed font-mono">Figma / Canva / Adobe Suite</p>
              </div>
              <div className="p-6 md:p-8 bg-black/5 rounded-3xl border border-black/5">
                <h3 className="text-lg md:text-xl font-black mb-4 uppercase tracking-tighter">System</h3>
                <p className="text-[12px] md:text-sm text-[#0E0F14]/60 leading-relaxed font-mono">Windows 11 / ProArt Studiobook / mechanical keyboards</p>
              </div>
            </div>
          </div>
        </section>

        <section id="certificates" aria-label="Certificates"><CertificateSection /></section>
        <section id="freelance" aria-label="Freelance Experience"><FreelanceExperience /></section>
        <section id="education" aria-label="Education"><EducationSection /></section>
        <section id="contact" aria-label="Contact"><ContactSection /></section>

        <AIAssistant />
      </div>
    </main>
  );
}
