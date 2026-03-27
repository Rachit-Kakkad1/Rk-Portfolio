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

gsap.registerPlugin(ScrollTrigger);

// Prevent stuttering caused by the mobile browser address bar hiding/showing on scroll
ScrollTrigger.config({ ignoreMobileResize: true });

function RotatingGlobe() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let phi = 0;
    const globe = createGlobe(canvasRef.current!, {
      devicePixelRatio: 1,
      width: 64,
      height: 64,
      phi: 0,
      theta: 0.2,
      dark: 1,
      diffuse: 1.2,
      mapSamples: 4000,
      mapBrightness: 6,
      baseColor: [0.604, 0.604, 0.604],
      markerColor: [1, 1, 1],
      glowColor: [0.604, 0.604, 0.604],
      markers: [
        { location: [23.2156, 72.6369], size: 0.1 }
      ],
      onRender: (state) => {
        state.phi = phi;
        phi += 0.005;
      }
    });

    return () => {
      globe.destroy();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ width: 64, height: 64 }}
      className="rounded-full"
    />
  );
}

function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);
  const mouseX = useRef(0);
  const mouseY = useRef(0);
  const followerX = useRef(0);
  const followerY = useRef(0);

  useEffect(() => {
    // Skip on mobile/touch
    if (window.matchMedia('(pointer: coarse)').matches) return;
    
    const cursor = cursorRef.current;
    const follower = followerRef.current;
    if (!cursor || !follower) return;

    let rafId: number;

    // Direct CSS transform — no GSAP overhead per frame
    const tick = () => {
      // Cursor follows instantly
      cursor.style.transform = `translate(${mouseX.current}px, ${mouseY.current}px) translate(-50%, -50%)`;
      
      // Follower lerps smoothly (0.12 = ~8 frames to catch up)
      followerX.current += (mouseX.current - followerX.current) * 0.12;
      followerY.current += (mouseY.current - followerY.current) * 0.12;
      follower.style.transform = `translate(${followerX.current}px, ${followerY.current}px) translate(-50%, -50%)`;
      
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);

    const onMouseMove = (e: MouseEvent) => {
      mouseX.current = e.clientX;
      mouseY.current = e.clientY;
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      <div ref={cursorRef} className="fixed top-0 left-0 w-2 h-2 bg-black rounded-full pointer-events-none z-[9999] hidden lg:block shadow-[0_0_10px_rgba(255,255,255,0.5)]" style={{ willChange: 'transform' }} />
      <div ref={followerRef} className="fixed top-0 left-0 w-10 h-10 border border-white/30 rounded-full pointer-events-none z-[9998] hidden lg:block" style={{ willChange: 'transform' }} />
    </>
  );
}

export default function App() {
  const containerRef = useRef<HTMLDivElement>(null);
  const portraitRef = useRef<HTMLImageElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const [isDownloading, setIsDownloading] = useState(false);

  // Initialize Global Smooth Scrolling
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.1,
      touchMultiplier: 1.5,
      lerp: 0.1,
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

      // Throttled ScrollTrigger update for marquee speed
      let lastVelocity = 0;
      ScrollTrigger.create({
        onUpdate: (self) => {
          const currentVelocity = self.getVelocity() / 300;
          if (Math.abs(currentVelocity - lastVelocity) < 0.1) return; // Ignore micro-adjustments
          
          lastVelocity = currentVelocity;
          const targetScale = self.direction !== 0 ? (self.direction + currentVelocity) : 1;
          
          gsap.to(marquee, {
            timeScale: targetScale,
            duration: 0.4,
            overwrite: "auto",
            ease: "power1.out"
          });
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <main className="bg-[#9a9a9a]">
      <TransitionScreen />
      
      <div ref={containerRef} className="relative w-full h-[200vh] bg-[#9a9a9a] font-sans selection:bg-white selection:text-black">
        <div className="sticky top-0 w-full h-screen overflow-hidden">
          <div className="absolute top-0 left-0 w-full px-6 md:px-12 py-6 md:py-10 flex justify-between items-center text-white z-30 pointer-events-none opacity-0">
            {/* Legacy navbar removed to prevent overlap with new premium Navigation system */}
          </div>

          {/* Left Pill */}
          <div className="absolute left-0 top-[30%] md:top-1/2 -translate-y-1/2 bg-[#1a1a1a] text-white rounded-r-full flex items-center py-2 pr-2 pl-4 md:pl-8 z-30 shadow-2xl">
            <div className="text-[12px] md:text-[14px] leading-[1.3] mr-4 md:mr-6 font-medium tracking-wide text-left">
              Located<br />in<br />Gandhinagar, India
            </div>
            <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-[#0a0a0a] flex items-center justify-center shrink-0 overflow-hidden">
              <RotatingGlobe />
            </div>
          </div>

          {/* Right Text */}
          <div className="absolute right-4 md:right-12 top-[55%] md:top-[42%] -translate-y-1/2 text-white z-30 flex flex-col gap-3 md:gap-5 items-start max-w-[55%] md:max-w-none">
            {/* Available badge */}
            <div className="flex items-center gap-2 px-3 py-1.5 bg-[#1F1F1F] border border-white/20 rounded-full">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-[10px] md:text-xs font-medium tracking-wider uppercase">Available for Work</span>
            </div>
            <h1 className="text-[24px] md:text-[48px] leading-[1.1] font-bold tracking-tight text-left">
              Rachit Kakkad
            </h1>
            <div className="text-[16px] md:text-[22px] leading-[1.3] font-medium tracking-tight text-white/80 text-left">
              Full Stack Developer & AI Engineer
            </div>
            <p className="text-[12px] md:text-[14px] text-white/60 leading-relaxed max-w-md hidden md:block">
              Building production-grade AI systems, blockchain platforms & cinematic web experiences with React, Node.js & Python.
            </p>
            {/* Social Links */}
            <div className="flex items-center gap-3 mt-1">
              <a href="https://github.com/Rachit-Kakkad1" target="_blank" rel="noopener noreferrer" className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-[#1F1F1F] border border-white/20 flex items-center justify-center hover:bg-[#2A2A2A] transition-[background-color,transform] duration-300" aria-label="GitHub"><Github size={18} /></a>
              <a href="https://www.linkedin.com/in/rachit-kakkad-r29052007k" target="_blank" rel="noopener noreferrer" className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-[#1F1F1F] border border-white/20 flex items-center justify-center hover:bg-[#2A2A2A] transition-[background-color,transform] duration-300" aria-label="LinkedIn"><Linkedin size={18} /></a>
              <a href="https://www.youtube.com/@RachitKakkad" target="_blank" rel="noopener noreferrer" className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-[#1F1F1F] border border-white/20 flex items-center justify-center hover:bg-[#2A2A2A] transition-[background-color,transform] duration-300" aria-label="YouTube"><Youtube size={18} /></a>
              <a href="https://leetcode.com/u/kUyAWXHOC5" target="_blank" rel="noopener noreferrer" className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-[#1F1F1F] border border-white/20 flex items-center justify-center hover:bg-[#2A2A2A] transition-[background-color,transform] duration-300" aria-label="LeetCode"><LeetCode size={18} /></a>
            </div>
            
            {/* Hero Action Buttons */}
            <motion.div 
              className="flex flex-row gap-4 mt-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
            >
              <a 
                href="#projects" 
                onClick={(e) => { e.preventDefault(); window.dispatchEvent(new CustomEvent('trigger-transition', { detail: { name: 'Projects', target: 'projects' } })); }}
                onMouseEnter={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const centerX = rect.left + rect.width / 2;
                  const centerY = rect.top + rect.height / 2;
                  gsap.to(e.currentTarget, {
                    x: (e.clientX - centerX) * 0.2,
                    y: (e.clientY - centerY) * 0.2,
                    duration: 0.3,
                    ease: "power2.out"
                  });
                }}
                onMouseLeave={(e) => {
                  gsap.to(e.currentTarget, { x: 0, y: 0, duration: 0.5, ease: "elastic.out(1, 0.3)" });
                }}
                className="px-6 py-3 md:px-8 md:py-3.5 bg-white text-black font-semibold text-xs md:text-sm tracking-wide rounded-full hover:bg-gray-200 hover:scale-105 transition-all duration-300 flex items-center justify-center shadow-[0_0_20px_rgba(255,255,255,0.15)]"
              >
                View my work
              </a>
                <button 
                  onClick={handleDownloadResume}
                  disabled={isDownloading}
                  onMouseEnter={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const centerX = rect.left + rect.width / 2;
                    const centerY = rect.top + rect.height / 2;
                    gsap.to(e.currentTarget, {
                      x: (e.clientX - centerX) * 0.2,
                      y: (e.clientY - centerY) * 0.2,
                      duration: 0.3,
                      ease: "power2.out"
                    });
                  }}
                  onMouseLeave={(e) => {
                    gsap.to(e.currentTarget, { x: 0, y: 0, duration: 0.5, ease: "elastic.out(1, 0.3)" });
                  }}
                  className={`px-6 py-3 md:px-8 md:py-3.5 ${isDownloading ? 'bg-[#B45309]' : 'bg-[#1F1F1F]'} text-white font-medium text-xs md:text-sm tracking-wide rounded-full border border-white/20 hover:bg-[#2A2A2A] hover:scale-105 transition-[background-color,transform] duration-500 flex items-center justify-center relative overflow-hidden`}
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
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
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
                  
                  {/* God Effect Shine */}
                  {isDownloading && (
                    <motion.div 
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent z-10"
                      initial={{ x: '-100%' }}
                      animate={{ x: '200%' }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                    />
                  )}
                </button>
              </motion.div>
          </div>

          {/* Person Image */}
          <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 h-[105vh] z-10 pointer-events-none origin-bottom flex justify-center">
            <img 
              ref={portraitRef}
              src="/profile.png" 
              alt="Portrait of Rachit Kakkad, Full Stack Developer & AI Engineer" 
              className="h-full w-auto max-w-none object-cover object-bottom"
            />
          </div>

          {/* Huge Text */}
          <div className="absolute bottom-[2vh] left-0 w-full whitespace-nowrap text-[22vw] md:text-[14vw] leading-none text-white font-medium z-20 pointer-events-none flex items-end overflow-hidden" style={{ letterSpacing: '-0.06em', willChange: 'transform' }}>
            <div ref={headlineRef} className="flex w-max">
              <span className="inline-block pr-[4vw]">AI/ML Enthusiast — Full Stack Developer — MERN Stack —</span>
              <span className="inline-block pr-[4vw]">AI/ML Enthusiast — Full Stack Developer — MERN Stack —</span>
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
      
      <section id="uses" className="py-32 bg-[#F6F3EE] border-t border-black/5">
        <div className="max-w-[1400px] mx-auto px-12">
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#B45309] mb-4">Hardware & Software</p>
          <h2 className="text-5xl md:text-7xl font-bold tracking-tighter text-[#0E0F14] mb-12">Uses</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="p-8 bg-black/5 rounded-3xl border border-black/5">
              <h3 className="text-xl font-bold mb-4 uppercase tracking-tight">Development</h3>
              <p className="text-sm text-[#0E0F14]/60 leading-relaxed font-mono">VS Code / WSL2 / Docker / Git / Postman / Oh My Zsh</p>
            </div>
            <div className="p-8 bg-black/5 rounded-3xl border border-black/5">
              <h3 className="text-xl font-bold mb-4 uppercase tracking-tight">Design</h3>
              <p className="text-sm text-[#0E0F14]/60 leading-relaxed font-mono">Figma / Canva / Adobe Suite</p>
            </div>
            <div className="p-8 bg-black/5 rounded-3xl border border-black/5">
              <h3 className="text-xl font-bold mb-4 uppercase tracking-tight">System</h3>
              <p className="text-sm text-[#0E0F14]/60 leading-relaxed font-mono">Windows 11 / ProArt Studiobook / mechanical keyboards</p>
            </div>
          </div>
        </div>
      </section>
      
      <section id="certificates" aria-label="Certificates"><CertificateSection /></section>
      <section id="freelance" aria-label="Freelance Experience"><FreelanceExperience /></section>
      <section id="education" aria-label="Education"><EducationSection /></section>
      <section id="contact" aria-label="Contact"><ContactSection /></section>
      
      <CustomCursor />
      <AIAssistant />
    </main>
  );
}
