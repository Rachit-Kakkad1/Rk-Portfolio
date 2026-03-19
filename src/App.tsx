import React, { useEffect, useRef, useState } from 'react';
import { ArrowDownRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import createGlobe from 'cobe';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from '@studio-freight/lenis';
import AboutSection from './components/AboutSection';
import KeyboardSection from './components/KeyboardSection';
import ProjectsSection from './components/ProjectsSection';
import CertificateSection from './components/CertificateSection';
import ExperienceSection from './components/ExperienceSection';
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
      devicePixelRatio: 2,
      width: 128,
      height: 128,
      phi: 0,
      theta: 0.2,
      dark: 1,
      diffuse: 1.2,
      mapSamples: 16000,
      mapBrightness: 6,
      baseColor: [0.604, 0.604, 0.604],
      markerColor: [1, 1, 1],
      glowColor: [0.604, 0.604, 0.604],
      markers: [
        { location: [23.2156, 72.6369], size: 0.1 }
      ],
      onRender: (state) => {
        state.phi = phi;
        phi += 0.01;
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

  useEffect(() => {
    const cursor = cursorRef.current;
    const follower = followerRef.current;
    if (!cursor || !follower) return;

    const onMouseMove = (e: MouseEvent) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
        ease: "power2.out"
      });
      gsap.to(follower, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.3,
        ease: "power2.out"
      });
    };

    const onMouseDown = () => {
      gsap.to([cursor, follower], { scale: 0.8, duration: 0.2 });
    };

    const onMouseUp = () => {
      gsap.to([cursor, follower], { scale: 1, duration: 0.2 });
    };

    const onHover = () => {
      gsap.to(cursor, { scale: 0, duration: 0.2 });
      gsap.to(follower, { scale: 2.5, backgroundColor: "rgba(255,255,255,0.2)", duration: 0.3 });
    };

    const onLeave = () => {
      gsap.to(cursor, { scale: 1, duration: 0.2 });
      gsap.to(follower, { scale: 1, backgroundColor: "transparent", duration: 0.3 });
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);

    const interactiveElements = document.querySelectorAll('button, a, .cursor-pointer');
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', onHover);
      el.addEventListener('mouseleave', onLeave);
    });

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', onHover);
        el.removeEventListener('mouseleave', onLeave);
      });
    };
  }, []);

  return (
    <>
      <div ref={cursorRef} className="fixed top-0 left-0 w-2 h-2 bg-white rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 mix-blend-difference hidden md:block" />
      <div ref={followerRef} className="fixed top-0 left-0 w-10 h-10 border border-white/30 rounded-full pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2 hidden md:block" />
    </>
  );
}

export default function App() {
  const containerRef = useRef<HTMLDivElement>(null);
  const portraitRef = useRef<HTMLImageElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const navbarRef = useRef<HTMLElement>(null);
  const [isDownloading, setIsDownloading] = useState(false);

  // Initialize Global Smooth Scrolling
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      lerp: 0.1, 
      // syncTouch: true causes extreme lag on mobile by hijacking native touch scroll.
      // Keeping it false allows pure hardware-accelerated scroll on touch devices.
      syncTouch: false,
    });

    (window as any).lenis = lenis;

    lenis.on('scroll', ScrollTrigger.update);

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

      // Continuous marquee that changes direction on scroll
      const marquee = gsap.to(headlineRef.current, {
        xPercent: -50,
        repeat: -1,
        duration: 20,
        ease: "none",
      });

      // Navbar fade out on scroll
      gsap.to(navbarRef.current, {
        y: -50,
        opacity: 0,
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=500",
          scrub: true,
        }
      });

      ScrollTrigger.create({
        onUpdate: (self) => {
          gsap.to(marquee, {
            timeScale: self.direction,
            duration: 0.3,
            overwrite: true
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
          {/* Navbar */}
          <nav ref={navbarRef} className="absolute top-0 left-0 w-full px-12 py-10 flex justify-between items-center text-white z-30">
            <div className="relative group cursor-pointer text-[18px] font-medium tracking-wide">
              <span className="block transition-all duration-300 ease-in-out transform group-hover:-translate-y-2 group-hover:opacity-0">© RK</span>
              <span className="absolute top-0 left-0 block transition-all duration-300 ease-in-out transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 whitespace-nowrap">Rachit Kakkad</span>
            </div>
            <div className="hidden md:flex gap-8 text-[18px] font-medium">
              <a href="#about" onClick={(e) => { e.preventDefault(); window.dispatchEvent(new CustomEvent('trigger-transition', { detail: { name: 'About', target: 'about' } })); }} className="hover:opacity-70 transition-opacity">About</a>
              <a href="#skills" onClick={(e) => { e.preventDefault(); window.dispatchEvent(new CustomEvent('trigger-transition', { detail: { name: 'Skills', target: 'skills' } })); }} className="hover:opacity-70 transition-opacity">Skills</a>
              <a href="#projects" onClick={(e) => { e.preventDefault(); window.dispatchEvent(new CustomEvent('trigger-transition', { detail: { name: 'Projects', target: 'projects' } })); }} className="hover:opacity-70 transition-opacity">Projects</a>
              <a href="#education" onClick={(e) => { e.preventDefault(); window.dispatchEvent(new CustomEvent('trigger-transition', { detail: { name: 'Education', target: 'certificates' } })); }} className="hover:opacity-70 transition-opacity">Education</a>
              <a href="#experience" onClick={(e) => { e.preventDefault(); window.dispatchEvent(new CustomEvent('trigger-transition', { detail: { name: 'Experience', target: 'experience' } })); }} className="hover:opacity-70 transition-opacity">Experience</a>
              <a href="#contact" onClick={(e) => { e.preventDefault(); window.dispatchEvent(new CustomEvent('trigger-transition', { detail: { name: 'Contact', target: 'contact' } })); }} className="hover:opacity-70 transition-opacity">Contact</a>
            </div>
          </nav>

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
          <div className="absolute right-4 md:right-12 top-[65%] md:top-[45%] -translate-y-1/2 text-white z-30 flex flex-col gap-4 md:gap-6 items-start">
            <ArrowDownRight className="w-8 h-8 md:w-10 md:h-10" strokeWidth={1.5} />
            <div className="text-[28px] md:text-[44px] leading-[1.15] font-medium tracking-tight text-left">
              Freelance &<br />Full Stack Developer
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
                  className={`px-6 py-3 md:px-8 md:py-3.5 ${isDownloading ? 'bg-[#B45309]' : 'bg-black/40'} text-white font-medium text-xs md:text-sm tracking-wide rounded-full border border-white/20 backdrop-blur-md hover:bg-white/10 hover:scale-105 transition-all duration-500 flex items-center justify-center relative overflow-hidden`}
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
              alt="Rachit" 
              className="h-full w-auto max-w-none object-cover object-bottom"
            />
          </div>

          {/* Huge Text */}
          <div className="absolute bottom-[2vh] left-0 w-full whitespace-nowrap text-[22vw] md:text-[14vw] leading-none text-white font-medium z-20 pointer-events-none flex items-end overflow-hidden" style={{ letterSpacing: '-0.06em' }}>
            <div ref={headlineRef} className="flex w-max">
              <span className="inline-block pr-[4vw]">AI/ML Enthusiast — Full Stack Developer — MERN Stack —</span>
              <span className="inline-block pr-[4vw]">AI/ML Enthusiast — Full Stack Developer — MERN Stack —</span>
            </div>
          </div>
        </div>
      </div>
      <Navigation />
      <div id="about"><AboutSection /></div>
      <div id="skills"><KeyboardSection /></div>
      <div id="projects"><ProjectsSection /></div>
      <div id="certificates"><CertificateSection /></div>
      <div id="experience"><ExperienceSection /></div>
      <div id="contact"><ContactSection /></div>
      
      <CustomCursor />
      <AIAssistant />
    </main>
  );
}
