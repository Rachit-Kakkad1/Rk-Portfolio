import React, { useEffect, useRef, useState } from 'react';
import { Linkedin, Youtube, Gamepad2 } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { LeetCode, XIcon, Github } from '../components/Icons';
import { motion, AnimatePresence } from 'framer-motion';
import createGlobe from 'cobe';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import AIAssistant from '../components/AIAssistant';
import HandwrittenIntro from '../components/HandwrittenIntro';
import LazySection from '../components/LazySection';
import SEO from '../components/SEO';
import { useScrollReveal } from '../useScrollReveal';

const LazyAboutSection = React.lazy(() => import('../components/AboutSection'));
const LazyKeyboardSection = React.lazy(() => import('../components/KeyboardSection'));
const LazyProjectsSection = React.lazy(() => import('../components/ProjectsSection'));
const LazyMedClearShowcase = React.lazy(() => import('../components/MedClearShowcase'));
const LazyCertificateSection = React.lazy(() => import('../components/CertificateSection'));
const LazyHackathonExperience = React.lazy(() => import('../components/HackathonExperience'));
const LazyFreelanceExperience = React.lazy(() => import('../components/FreelanceExperience'));
const LazyEducationSection = React.lazy(() => import('../components/EducationSection'));
const LazyContactSection = React.lazy(() => import('../components/ContactSection'));

const NAME = 'Rachit Kakkad';
const HEADLINE_ITEMS = [
  'Full-Stack Developer',
  'AI Systems Engineer',
  'Backend Engineer',
  'Security Systems Engineer',
];

gsap.registerPlugin(ScrollTrigger);

function RotatingGlobe() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (window.innerWidth < 768) return;

    let phi = 0;
    let observer: IntersectionObserver;
    let isVisible = false;
    let globe: any;

    const initGlobe = () => {
      if (globe) return;
      globe = createGlobe(canvasRef.current!, {
        devicePixelRatio: 1,
        width: 64,
        height: 64,
        phi: 0,
        theta: 0.2,
        dark: 1,
        diffuse: 1.2,
        mapSamples: 2000,
        mapBrightness: 6,
        baseColor: [0.604, 0.604, 0.604],
        markerColor: [1, 1, 1],
        glowColor: [0.604, 0.604, 0.604],
        markers: [
          { location: [23.2156, 72.6369], size: 0.1 }
        ],
        onRender: (state) => {
          if (!isVisible) return;
          state.phi = phi;
          phi += 0.005;
        }
      });
    };

    observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        if (isVisible && !globe) {
          initGlobe();
        }
      },
      { threshold: 0 }
    );
    if (canvasRef.current) {
      observer.observe(canvasRef.current);
    }

    return () => {
      if (globe) globe.destroy();
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

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const portraitRef = useRef<HTMLImageElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const [introState, setIntroState] = useState<'signature' | 'done'>(
    (location.state as any)?.skipIntro ? 'done' : 'signature'
  );

  useScrollReveal([introState === 'done']);

  const handleSignatureComplete = () => {
    setIntroState('done');
  };

  useEffect(() => {
    if (introState === 'done') {
      const path = location.pathname.substring(1);
      const target = (location.state as any)?.scrollTo || path;
      
      if (target && target !== 'home') {
        const targetId = target === 'work' ? 'hackathon' : target;
        const element = document.getElementById(targetId);
        if (element) {
          setTimeout(() => {
            (window as any).lenis?.scrollTo(element, { offset: -80, immediate: true });
          }, 100);
        }
      } else if ((location.state as any)?.skipIntro) {
        (window as any).lenis?.scrollTo(0, { immediate: true });
      }
    }
  }, [introState]);

  useEffect(() => {
    let ctx: any;
    const initMarquee = () => {
      ctx = gsap.context(() => {
        gsap.to(headlineRef.current, {
          xPercent: -50,
          repeat: -1,
          duration: 25,
          ease: "none",
        });
      }, containerRef);
    };

    if ('requestIdleCallback' in window) {
      (window as any).requestIdleCallback(initMarquee);
    } else {
      setTimeout(initMarquee, 1000);
    }

    return () => ctx?.revert();
  }, []);

  return (
    <main className="bg-[#9a9a9a] relative overflow-x-hidden">
      <SEO 
        description="Official portfolio of Rachit Kakkad. Building production-grade AI systems, blockchain platforms & cinematic web experiences. Specialist in React, Node.js, and Python."
      />
      <AnimatePresence>
        {introState === 'signature' && (
          <HandwrittenIntro onComplete={handleSignatureComplete} />
        )}
      </AnimatePresence>

      <div className="relative">
        <div id="home" ref={containerRef} className="relative w-full h-screen bg-[#9a9a9a] font-sans selection:bg-white selection:text-black">
          <div className="absolute inset-0 w-full h-full overflow-hidden">
            <div className="absolute inset-0 w-full h-full z-10 pointer-events-none overflow-hidden">
              <img
                ref={portraitRef}
                src="/profile2.png"
                alt="Portrait of Rachit Kakkad"
                className="w-full h-full object-cover"
                style={{ objectPosition: 'center 15%', contentVisibility: 'visible' }}
                width="1920"
                height="1080"
                loading="eager"
                fetchPriority="high"
                decoding="sync"
              />
              <div className="absolute inset-0 md:hidden bg-gradient-to-b from-black/60 via-black/20 to-black/60" />
              <div className="absolute inset-0 hidden md:block bg-gradient-to-r from-black/40 via-transparent to-transparent" />
            </div>

            <div className="absolute left-6 md:left-10 lg:left-16 top-[45%] md:top-[45%] -translate-y-1/2 text-white z-20 flex flex-col gap-4 md:gap-5 items-start max-w-[90%] md:max-w-[50%] lg:max-w-[40%]">
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

              <div className="flex flex-wrap items-center gap-2 md:gap-3 mt-2">
                <a href="https://github.com/Rachit-Kakkad1" target="_blank" rel="noopener noreferrer" className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-[#1F1F1F]/80 backdrop-blur-md border border-white/20 flex items-center justify-center hover:bg-[#2A2A2A] hover:scale-110 transition-all duration-300" aria-label="GitHub"><Github size={16} /></a>
                <a href="https://www.linkedin.com/in/rachit-kakkad-r29052007k" target="_blank" rel="noopener noreferrer" className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-[#1F1F1F]/80 backdrop-blur-md border border-white/20 flex items-center justify-center hover:bg-[#2A2A2A] hover:scale-110 transition-all duration-300" aria-label="LinkedIn"><Linkedin size={16} /></a>
                <a href="https://www.youtube.com/@RachitKakkad" target="_blank" rel="noopener noreferrer" className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-[#1F1F1F]/80 backdrop-blur-md border border-white/20 flex items-center justify-center hover:bg-[#2A2A2A] hover:scale-110 transition-all duration-300" aria-label="YouTube"><Youtube size={16} /></a>
                <a href="https://x.com/rachit_kakk2957" target="_blank" rel="noopener noreferrer" className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-[#1F1F1F]/80 backdrop-blur-md border border-white/20 flex items-center justify-center hover:bg-[#2A2A2A] hover:scale-110 transition-all duration-300" aria-label="X (Twitter)"><XIcon size={16} /></a>
                <a href="https://leetcode.com/u/kUyAWXHOC5" target="_blank" rel="noopener noreferrer" className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-[#1F1F1F]/80 backdrop-blur-md border border-white/20 flex items-center justify-center hover:bg-[#2A2A2A] hover:scale-110 transition-all duration-300" aria-label="LeetCode"><LeetCode size={16} /></a>
              </div>

              <motion.div
                className="flex flex-row flex-wrap gap-3 md:gap-4 mt-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
              >
                <a
                  href="/projects"
                  onClick={(e) => { e.preventDefault(); navigate('/projects'); }}
                  className="px-5 py-2.5 md:px-8 md:py-3.5 bg-white text-black font-black text-[10px] md:text-sm tracking-[0.1em] uppercase rounded-full hover:bg-gray-200 hover:scale-105 transition-all duration-300 flex items-center justify-center shadow-[0_0_20px_rgba(255,255,255,0.15)]"
                >
                  View Work
                </a>
                <a
                  href="/Rachit Kakkad's Resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 md:px-8 md:py-3.5 bg-[#1F1F1F]/80 backdrop-blur-md text-white font-black text-[10px] md:text-sm tracking-[0.1em] uppercase rounded-full border border-white/20 hover:bg-[#2A2A2A] hover:scale-105 transition-all duration-500 flex items-center justify-center min-w-[140px] md:min-w-[180px]"
                >
                  View Resume
                </a>
              </motion.div>
            </div>

            <div className="absolute bottom-[4vh] md:bottom-[6vh] left-0 w-full whitespace-nowrap text-[12vw] md:text-[7vw] leading-[1] text-white font-black z-[15] pointer-events-none flex items-end overflow-hidden px-2 md:px-4 smooth-gpu" style={{ fontFamily: 'Inter, sans-serif', letterSpacing: '-0.03em' }}>
              <div ref={headlineRef} className="flex items-baseline w-max pl-[3vw] md:pl-[1.5vw] smooth-gpu">
                {[0, 1].map((copy) => (
                  <React.Fragment key={copy}>
                    {HEADLINE_ITEMS.map((item, index) => (
                      <React.Fragment key={`${copy}-${item}`}>
                        <span className="inline-block">{item}</span>
                        {index < HEADLINE_ITEMS.length - 1 && (
                          <span className="inline-block px-[2vw] md:px-[1.5vw] text-white/30">—</span>
                        )}
                      </React.Fragment>
                    ))}
                    <span className="inline-block px-[2vw] md:px-[1.5vw] text-white/30">—</span>
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>
        </div>

        <React.Suspense fallback={<div className="h-screen bg-[#F6F3EE]" />}>
          <LazySection id="about">
            <section aria-label="About" data-scroll-reveal="fade-up"><LazyAboutSection /></section>
          </LazySection>

          <LazySection id="skills">
            <section aria-label="Skills" data-scroll-reveal="fade-up" data-scroll-delay="0.1">
              <LazyKeyboardSection />
            </section>
          </LazySection>

          <div id="work">
            <LazySection id="hackathon">
              <section aria-label="Hackathon Experience" data-scroll-reveal="fade-up"><LazyHackathonExperience /></section>
            </LazySection>
            
            <LazySection id="projects">
              <section aria-label="Projects" data-scroll-reveal="fade-up"><LazyProjectsSection /></section>
            </LazySection>

            <LazySection id="medclear">
              <section aria-label="MedClear Flagship Showcase" data-scroll-reveal="fade-up">
                <LazyMedClearShowcase />
              </section>
            </LazySection>
          </div>

          <LazySection id="uses" className="py-20 md:py-32 bg-[#F6F3EE] border-t border-black/5">
            <div className="max-w-[1400px] mx-auto px-6 md:px-12" data-scroll-reveal="fade-up">
              <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#B45309] mb-4">Hardware & Software</p>
              <h2 className="text-4xl md:text-7xl font-black tracking-tighter text-[#0E0F14] mb-12 uppercase">Uses</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-12" data-scroll-reveal="fade-up" data-scroll-stagger="0.1">
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
          </LazySection>

          <LazySection id="certificates">
            <section aria-label="Certificates"><LazyCertificateSection /></section>
          </LazySection>

          <LazySection id="freelance">
            <section aria-label="Freelance Experience"><LazyFreelanceExperience /></section>
          </LazySection>

          <LazySection id="education">
            <section aria-label="Education" data-scroll-reveal="fade-up"><LazyEducationSection /></section>
          </LazySection>

          <LazySection id="contact">
            <section aria-label="Contact"><LazyContactSection /></section>
          </LazySection>

          {/* GitHub Game Floating Button */}
          <motion.button
            onClick={() => {
              window.dispatchEvent(new CustomEvent('trigger-transition', { 
                detail: { name: 'Initializing Game...', target: 'github-stats' } 
              }));
              setTimeout(() => navigate('/github-stats', { state: { fromSection: 'home' } }), 400);
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="fixed bottom-[104px] right-6 md:bottom-[144px] md:right-12 z-[99] w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center p-0 overflow-visible group"
            aria-label="Play GitHub Game"
          >
            {/* Orbital Ring - Constant Rotation */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute inset-[-8px] border-2 border-dashed border-[#B45309]/30 rounded-full pointer-events-none group-hover:border-[#B45309]/60 transition-colors duration-500"
            />
            
            {/* Secondary Orbital Ring - Faster, Reverse Rotation */}
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
              className="absolute inset-[-4px] border border-[#B45309]/20 rounded-full pointer-events-none opacity-50"
            />

            {/* The Core Orb */}
            <div className="relative w-full h-full rounded-full bg-[#1C1C1C] border border-[#B45309]/20 flex items-center justify-center shadow-[0_0_30px_rgba(180,83,9,0.3)] overflow-hidden z-10 transition-transform duration-500 group-hover:scale-105 group-hover:bg-[#1a1a1a]">
               <Gamepad2 size={28} className="text-[#B45309] animate-pulse group-hover:animate-none" />
            </div>
          </motion.button>

          <AIAssistant />
        </React.Suspense>
      </div>
    </main>
  );
}
