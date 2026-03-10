import React, { useEffect, useRef } from 'react';
import { ArrowDownRight } from 'lucide-react';
import createGlobe from 'cobe';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import AboutSection from './components/AboutSection';
import KeyboardSection from './components/KeyboardSection';
import ProjectsSection from './components/ProjectsSection';
import CertificateSection from './components/CertificateSection';
import ExperienceSection from './components/ExperienceSection';
import ContactSection from './components/ContactSection';
import Navigation from './components/Navigation';
import TransitionScreen from './components/TransitionScreen';

gsap.registerPlugin(ScrollTrigger);

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

export default function App() {
  const containerRef = useRef<HTMLDivElement>(null);
  const portraitRef = useRef<HTMLImageElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const navbarRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Portrait animation
      gsap.to(portraitRef.current, {
        scale: 0.85,
        y: -100,
        opacity: 0.9,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        }
      });

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
            <div className="flex gap-8 text-[18px] font-medium">
              <a href="#about" onClick={(e) => { e.preventDefault(); window.dispatchEvent(new CustomEvent('trigger-transition', { detail: { name: 'About', target: 'about' } })); }} className="hover:opacity-70 transition-opacity">About</a>
              <a href="#skills" onClick={(e) => { e.preventDefault(); window.dispatchEvent(new CustomEvent('trigger-transition', { detail: { name: 'Skills', target: 'skills' } })); }} className="hover:opacity-70 transition-opacity">Skills</a>
              <a href="#projects" onClick={(e) => { e.preventDefault(); window.dispatchEvent(new CustomEvent('trigger-transition', { detail: { name: 'Projects', target: 'projects' } })); }} className="hover:opacity-70 transition-opacity">Projects</a>
              <a href="#education" onClick={(e) => { e.preventDefault(); window.dispatchEvent(new CustomEvent('trigger-transition', { detail: { name: 'Education', target: 'certificates' } })); }} className="hover:opacity-70 transition-opacity">Education</a>
              <a href="#experience" onClick={(e) => { e.preventDefault(); window.dispatchEvent(new CustomEvent('trigger-transition', { detail: { name: 'Experience', target: 'experience' } })); }} className="hover:opacity-70 transition-opacity">Experience</a>
              <a href="#contact" onClick={(e) => { e.preventDefault(); window.dispatchEvent(new CustomEvent('trigger-transition', { detail: { name: 'Contact', target: 'contact' } })); }} className="hover:opacity-70 transition-opacity">Contact</a>
            </div>
          </nav>

          {/* Left Pill */}
          <div className="absolute left-0 top-1/2 -translate-y-1/2 bg-[#1a1a1a] text-white rounded-r-full flex items-center py-2 pr-2 pl-8 z-30 shadow-2xl">
            <div className="text-[14px] leading-[1.3] mr-6 font-medium tracking-wide text-left">
              Located<br />in<br />Gandhinagar, India
            </div>
            <div className="w-16 h-16 rounded-full bg-[#0a0a0a] flex items-center justify-center shrink-0 overflow-hidden">
              <RotatingGlobe />
            </div>
          </div>

          {/* Right Text */}
          <div className="absolute right-12 top-[45%] -translate-y-1/2 text-white z-30 flex flex-col gap-6 items-start">
            <ArrowDownRight className="w-10 h-10" strokeWidth={1.5} />
            <div className="text-[44px] leading-[1.15] font-medium tracking-tight text-left">
              Freelance &<br />Full Stack Developer
            </div>
          </div>

          {/* Person Image */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[85vh] z-10 pointer-events-none origin-bottom">
            <img 
              ref={portraitRef}
              src="https://images.unsplash.com/photo-1583864697784-a0efc8379f70?q=80&w=1000&auto=format&fit=crop" 
              alt="Dennis" 
              className="h-full w-auto object-cover object-bottom"
              style={{
                maskImage: 'radial-gradient(ellipse 90% 100% at 50% 100%, black 60%, transparent 100%)',
                WebkitMaskImage: 'radial-gradient(ellipse 90% 100% at 50% 100%, black 60%, transparent 100%)'
              }}
            />
          </div>

          {/* Huge Text */}
          <div className="absolute bottom-[2vh] left-0 w-full whitespace-nowrap text-[14vw] leading-none text-white font-medium z-20 pointer-events-none flex items-end overflow-hidden" style={{ letterSpacing: '-0.06em' }}>
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
    </main>
  );
}
