import React, { useEffect, useRef, useState } from 'react';
import { Linkedin, Youtube } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { LeetCode, XIcon, Github } from '../components/Icons';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import createGlobe from 'cobe';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import AIAssistant from '../components/AIAssistant';
import StampIntro from '../components/StampPreloader';
import LazySection from '../components/LazySection';
import SEO from '../components/SEO';
import { useScrollReveal } from '../useScrollReveal';

const LazyAboutSection = React.lazy(() => import('../components/AboutSection'));
const LazyKeyboardSection = React.lazy(() => import('../components/KeyboardSection'));
const LazyProjectsSection = React.lazy(() => import('../components/ProjectsSection'));
const LazyOpenSourceSection = React.lazy(() => import('../components/OpenSourceSection'));
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
  const location = useLocation();
  const navigate = useNavigate();
  const [introDone, setIntroDone] = useState(
    !!(location.state as any)?.skipIntro
  );

  useScrollReveal([introDone]);

  const handleIntroComplete = () => setIntroDone(true);

  useEffect(() => {
    if (!introDone) return;
    const path = location.pathname.substring(1);
    const target = (location.state as any)?.scrollTo || path;
    if (target && target !== 'home') {
      const el = document.getElementById(target === 'work' ? 'hackathon' : target);
      if (el) setTimeout(() => (window as any).lenis?.scrollTo(el, { offset: -80, immediate: true }), 100);
    } else if ((location.state as any)?.skipIntro) {
      (window as any).lenis?.scrollTo(0, { immediate: true });
    }
  }, [introDone]);

  return (
    <main className="bg-[#9a9a9a] relative overflow-x-hidden">
      <Helmet>
        <title>Rachit Kakkad | Full Stack & AI Engineer</title>
        <meta name="description" content="Portfolio of Rachit Kakkad — Full Stack Developer and AI Engineer from Gujarat, India. React, Node.js, Python, FastAPI, LLM integrations." />
        <link rel="canonical" href="https://rachit-hk-portfolio.vercel.app/" />
      </Helmet>
      <SEO
        description="Official portfolio of Rachit Kakkad. Building production-grade AI systems, blockchain platforms & cinematic web experiences. Specialist in React, Node.js, and Python."
      />
      <AnimatePresence mode="wait">
        {!introDone && (
          <StampIntro key="stamp-intro" onComplete={handleIntroComplete} />
        )}
      </AnimatePresence>

      <div className="relative">
        <div id="home" ref={containerRef} className="relative w-full h-screen bg-[#9a9a9a] font-sans selection:bg-white selection:text-black">
          <div className="absolute inset-0 w-full h-full overflow-hidden">
            <div className="absolute inset-0 w-full h-full z-10 pointer-events-none overflow-hidden">
              <picture className="w-full h-full block">
                <source media="(max-width: 767px)" srcSet="/hero-mobile.png" />
                <source media="(min-width: 768px)" srcSet="/hero.png" />
                <img
                  ref={portraitRef}
                  src="/hero.png"
                  alt="Portrait of Rachit Kakkad"
                  className="w-full h-full object-cover object-center"
                  style={{ contentVisibility: 'visible' }}
                  width="1920"
                  height="1080"
                  loading="eager"
                  fetchPriority="high"
                  decoding="sync"
                />
              </picture>
              <div className="absolute inset-0 md:hidden bg-gradient-to-b from-black/80 via-black/40 to-black/80" />
              <div className="absolute inset-0 hidden md:block bg-gradient-to-r from-black/90 via-black/50 to-transparent w-[80%]" />
            </div>

            <div className="absolute left-6 md:left-10 lg:left-16 top-[15%] md:top-[45%] md:-translate-y-1/2 text-white z-20 flex flex-col items-start max-w-[90%] md:max-w-[50%] lg:max-w-[40%]">
              <div className="flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 bg-[#1F1F1F]/80 backdrop-blur-md border border-white/15 rounded-full shadow-lg">
                <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="text-[9px] md:text-xs font-semibold tracking-[0.15em] uppercase">Available for Work</span>
              </div>

              <h1 className="mt-4 md:mt-5 text-[clamp(1.8rem,8vw,4rem)] md:text-[52px] lg:text-[72px] leading-[1.05] font-black tracking-tight text-left drop-shadow-xl">
                Rachit Kakkad
              </h1>

              <div className="mt-1 md:mt-2 text-[12px] md:text-[16px] lg:text-[18px] leading-[1.3] font-bold tracking-tight text-white/85 text-left drop-shadow-lg">
                Full Stack Engineer · AI Systems Builder · Open Source Contributor
              </div>

              <p className="mt-3 md:mt-5 text-[11px] md:text-[13px] text-white/70 leading-relaxed max-w-[320px] md:max-w-lg drop-shadow-md">
                First-year CS student who doesn't wait to be ready. Built Sanjeevani - an AI system auditing hospital bills against 1,995 live government rates. Selected for GSSoC out of 42,000+ applicants. I ship real things with React, Node,x FastAPI & Python.
              </p>

              <div className="mt-4 md:mt-6 flex flex-wrap items-center gap-4 md:gap-5">
                <a href="https://github.com/Rachit-Kakkad1" target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-white hover:scale-110 transition-all duration-300" aria-label="GitHub"><Github size={22} /></a>
                <a href="https://www.linkedin.com/in/rachit-kakkad-r29052007k" target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-white hover:scale-110 transition-all duration-300" aria-label="LinkedIn"><Linkedin size={22} /></a>
                <a href="https://www.youtube.com/@RachitKakkad" target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-white hover:scale-110 transition-all duration-300" aria-label="YouTube"><Youtube size={22} /></a>
                <a href="https://x.com/rachit_kakk2957" target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-white hover:scale-110 transition-all duration-300" aria-label="X (Twitter)"><XIcon size={22} /></a>
                <a href="https://leetcode.com/u/kUyAWXHOC5" target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-white hover:scale-110 transition-all duration-300" aria-label="LeetCode"><LeetCode size={22} /></a>
              </div>

              <motion.div
                className="mt-8 md:mt-10 flex flex-row flex-wrap gap-4 md:gap-6"
                initial={{ opacity: 0, y: 30, rotateX: 45 }}
                animate={{ opacity: 1, y: 0, rotateX: 25 }}
                transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
                style={{
                  perspective: '1000px',
                  transformStyle: 'preserve-3d',
                }}
              >
                <a
                  href="/projects"
                  onClick={(e) => { e.preventDefault(); navigate('/projects'); }}
                  className="px-8 py-3.5 md:px-10 md:py-4 bg-white text-black font-black text-[11px] md:text-sm tracking-[0.15em] uppercase rounded-xl hover:bg-gray-200 hover:-translate-y-1 transition-all duration-300 flex items-center justify-center shadow-[0_15px_30px_rgba(0,0,0,0.4)] border-b-4 border-gray-300 active:border-b-0 active:translate-y-1"
                >
                  View Work
                </a>
                <a
                  href="/Rachit Kakkad's Resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-3.5 md:px-10 md:py-4 bg-[#1F1F1F]/90 backdrop-blur-md text-white font-black text-[11px] md:text-sm tracking-[0.15em] uppercase rounded-xl border border-white/20 border-b-4 border-b-black hover:bg-[#2A2A2A] hover:-translate-y-1 transition-all duration-300 flex items-center justify-center min-w-[150px] md:min-w-[200px] shadow-[0_15px_30px_rgba(0,0,0,0.4)] active:border-b active:translate-y-1"
                >
                  View Resume
                </a>
              </motion.div>

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

            <LazySection id="opensource">
              <section aria-label="Open Source Contributions" data-scroll-reveal="fade-up">
                <LazyOpenSourceSection />
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



          <AIAssistant />
        </React.Suspense>
      </div>
    </main>
  );
}
