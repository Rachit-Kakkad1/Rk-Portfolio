import React, { Suspense, useEffect, useRef, useState } from 'react';
import type { Application } from '@splinetool/runtime';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const Spline = React.lazy(() => import('@splinetool/react-spline'));

gsap.registerPlugin(ScrollTrigger);

const skills = [
  { id: 'js', title: "JavaScript", description: "The core engine of modern web logic and interactive experiences." },
  { id: 'ts', title: "TypeScript", description: "Bulletproof scalability with strict typing and advanced safety." },
  { id: 'react', title: "React.js", description: "Modular component architecture for high-end cinematic interfaces." },
  { id: 'node', title: "Node.js", description: "High-performance runtime for scalable backend infrastructure." },
  { id: 'mongo', title: "MongoDB", description: "Agile NoSQL database for flexible and rapid data scaling." },
  { id: 'html', title: "HTML5", description: "The semantic foundation of the modern web ecosystem." },
  { id: 'css', title: "CSS3", description: "Advanced layouts and animations using modern grid and flex physics." },
  { id: 'tailwind', title: "Tailwind CSS", description: "Rapid styling with a utility-first framework for pixel-perfect designs." },
  { id: 'ex', title: "Express.js", description: "Minimalist and flexible web application framework for Node.js." },
  { id: 'postgre', title: "PostgreSQL", description: "The world's most advanced open source relational database." },
  { id: 'git', title: "Git", description: "Pro-level version control for streamlined team collaboration." },
  { id: 'github', title: "GitHub", description: "The global command center for collaborative development and code hosting." },
  { id: 'docker', title: "Docker", description: "Seamless containerization for consistent deployment across any environment." },
  { id: 'aws', title: "AWS", description: "Enterprise-grade cloud infrastructure for global reach and reliability." },
  { id: 'next', title: "Next.js", description: "The React framework for production with SSR and edge-ready speed." },
  { id: 'vim', title: "Vim", description: "High-velocity code editing for maximum efficiency and flow." },
  { id: 'python', title: "Python / AI", description: "Machine learning and intelligent agent development for the future." }
];

export default function KeyboardSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const keyboardWorldRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const skillPanelRef = useRef<HTMLDivElement>(null);

  const [activeSkillId, setActiveSkillId] = useState('react');
  const [splineApp, setSplineApp] = useState<Application>();
  const [terminalState, setTerminalState] = useState({
    prompt: '',
    title: '',
    description: '',
    phase: 'idle'
  });

  // Setup interactions once Spline loads
  const handleSplineInteractions = (app: Application) => {
    setSplineApp(app);
    
    // Ensure hidden keycaps are visible
    const allObjects = app.getAllObjects();
    allObjects.forEach((obj) => {
      if (obj.name.includes("keycap") || obj.name.includes("text")) {
        obj.visible = true;
      }
    });

    // Setup sounds
    const playSound = (type: 'press' | 'release') => {
      const audio = new Audio(`/keycap-sounds/${type}.mp3`);
      audio.volume = 0.5;
      audio.play().catch(e => console.log('Audio play failed:', e));
    };

    // Update side panel based on Hover
    app.addEventListener("mouseHover", (e: any) => {
      if (e.target && e.target.name) {
        const hoveredName = e.target.name.toLowerCase();
        
        // Accurate matching: handle specific prefixes like 'keycap_js' or just 'js'
        const foundSkill = skills.find(s => 
          hoveredName === s.id || 
          hoveredName === `keycap_${s.id}` ||
          hoveredName.includes(`keycap-${s.id}`)
        );
        
        if (foundSkill && activeSkillId !== foundSkill.id) {
          setActiveSkillId(foundSkill.id);
        }
      }
    });

    // Play sound and trigger AI/Navigation on Click
    app.addEventListener("mouseDown", (e: any) => {
      if (e.target && e.target.name) {
        const clickedName = e.target.name.toLowerCase();

        // 3D Keyboard command integration
        if (clickedName.includes('react')) {
          window.dispatchEvent(new CustomEvent('ai-ask', { detail: 'Briefly explain how React.js is used in this portfolio.' }));
        } else if (clickedName.includes('js') || clickedName.includes('javascript')) {
          window.dispatchEvent(new CustomEvent('ai-ask', { detail: 'How does JavaScript power the interactions in this portfolio?' }));
        } else if (clickedName.includes('ts') || clickedName.includes('typescript')) {
          window.dispatchEvent(new CustomEvent('ai-ask', { detail: 'Why was TypeScript chosen for this project?' }));
        } else if (clickedName.includes('tailwind') || clickedName.includes('css')) {
          window.dispatchEvent(new CustomEvent('ai-ask', { detail: 'Explain the styling system using Tailwind CSS.' }));
        } else if (clickedName.includes('node') || clickedName.includes('express')) {
          window.dispatchEvent(new CustomEvent('ai-ask', { detail: 'Explain the backend architecture and Node.js usage.' }));
        } else if (clickedName.includes('mongo') || clickedName.includes('postgre')) {
          window.dispatchEvent(new CustomEvent('ai-ask', { detail: 'Explain the database design (MongoDB/PostgreSQL).' }));
        } else if (clickedName.includes('docker') || clickedName.includes('aws')) {
          window.dispatchEvent(new CustomEvent('ai-ask', { detail: 'Explain the deployment and cloud infrastructure (Docker/AWS).' }));
        } else if (clickedName.includes('github') || clickedName.includes('git')) {
          window.dispatchEvent(new CustomEvent('ai-ask', { detail: 'Explain your version control and GitHub workflow.' }));
        } else if (clickedName.includes('next')) {
          window.dispatchEvent(new CustomEvent('ai-ask', { detail: 'How is Next.js used in your projects?' }));
        } else if (clickedName.includes('vim')) {
          window.dispatchEvent(new CustomEvent('ai-ask', { detail: 'Why do you use Vim for development?' }));
        } else if (clickedName.includes('python') || clickedName.includes('ai') || clickedName.includes('machine')) {
          window.dispatchEvent(new CustomEvent('ai-ask', { detail: 'Explain your Machine Learning and AI projects/experience.' }));
        } else if (clickedName.includes('work') || clickedName.includes('project')) {
          window.dispatchEvent(new CustomEvent('trigger-transition', { detail: { name: 'Projects', target: 'projects' } }));
        } else if (clickedName.includes('about') || clickedName.includes('me')) {
          window.dispatchEvent(new CustomEvent('trigger-transition', { detail: { name: 'About', target: 'about' } }));
        } else if (clickedName.includes('contact')) {
          window.dispatchEvent(new CustomEvent('trigger-transition', { detail: { name: 'Contact', target: 'contact' } }));
        }

        if (clickedName.includes('keycap') || clickedName.includes('text')) {
          playSound('press'); 
          
          // Add a subtle depress animation to the clicked keycap
          if (e.target.position) {
            gsap.to(e.target.position, {
              y: e.target.position.y - 5,
              duration: 0.1,
              yoyo: true,
              repeat: 1
            });
          }
        }
      }
    });
    
    // Listen for physical typing if the spline scene supports it
    app.addEventListener("keyDown", () => playSound('press'));
    app.addEventListener("keyUp", () => playSound('release'));
  };

  // Terminal Typing Animation Effect - Optimized for Speed
  useEffect(() => {
    let isCancelled = false;
    
    const typeText = async (text: string, setter: (val: string) => void, speed = 15) => {
      for (let i = 0; i <= text.length; i++) {
        if (isCancelled) break;
        setter(text.slice(0, i));
        if (speed > 0) await new Promise(r => setTimeout(r, speed));
      }
    };

    const runSequence = async () => {
      const skill = skills.find(s => s.id === activeSkillId) || skills[0];

      // Reset and show initial prompt immediately
      setTerminalState({ 
        prompt: `> loading skill: ${skill.id}`, 
        title: '', 
        description: '', 
        phase: 'typing-title' 
      });
      
      // Speed up typing significantly
      await typeText(skill.title, (val) => setTerminalState(prev => ({ ...prev, title: val })), 15);
      if (isCancelled) return;

      setTerminalState(prev => ({ ...prev, phase: 'typing-desc' }));

      // Fast description typing
      await typeText(skill.description, (val) => setTerminalState(prev => ({ ...prev, description: val })), 8);
      if (isCancelled) return;

      setTerminalState(prev => ({ ...prev, phase: 'done' }));
    };

    runSequence();

    return () => {
      isCancelled = true;
    };
  }, [activeSkillId]);

  // Handle Fade animations 
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Setup simple scroll emergence fade
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=150vh", // Shorter pin purely for a clean fade sequence
          scrub: 1,
          pin: true,
        }
      });

      gsap.set(keyboardWorldRef.current, { opacity: 0 });
      gsap.set(glowRef.current, { opacity: 0 });
      gsap.set(skillPanelRef.current, { opacity: 0, y: 30 });

      // Fade in smoothly over scroll
      tl.to(keyboardWorldRef.current, {
        opacity: 1,
        duration: 0.2,
        ease: "power2.out"
      }, 0);

      tl.to(glowRef.current, {
        opacity: 1,
        duration: 0.2,
        ease: "power2.out"
      }, 0);

      tl.to(skillPanelRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.2,
        ease: "power3.out"
      }, 0);

      tl.to({}, { duration: 0.8 }); // Let it rest on screen
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Set the Spline native scale exactly once when it loads
  useEffect(() => {
    if (!splineApp) return;
    const kbd = splineApp.findObjectByName("keyboard");
    if (!kbd) return;

    // Perfect middle ground size to fit inside container without clipping
    gsap.set(kbd.position, { y: 0 }); // Perfectly centered vertically
    gsap.set(kbd.rotation, { x: Math.PI / 8 }); // ~22.5 deg
    gsap.set(kbd.scale, { x: 0.28, y: 0.28, z: 0.28 }); 

    // Gentle floating breathing animation (static visually, just hovering slightly)
    gsap.to(kbd.position, {
      y: 15, // float range within safe bounds
      duration: 4,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });
  }, [splineApp]);

  return (
    <div 
      id="keyboardScene" 
      ref={sectionRef}
      className="relative w-full min-h-screen py-24 md:py-0 md:h-screen bg-[#F6F3EE] text-[#1C1C1C] overflow-hidden flex items-center justify-center font-sans smooth-gpu"
    >
      {/* Dynamic Cinematic Background Typography */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.h2
            key={activeSkillId}
            initial={{ opacity: 0, y: 50, filter: "blur(10px)", scale: 0.9 }}
            animate={{ opacity: 0.04, y: 0, filter: "blur(0px)", scale: 1 }}
            exit={{ opacity: 0, y: -50, filter: "blur(10px)", scale: 1.1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-[120px] md:text-[220px] font-bold text-black whitespace-nowrap tracking-tighter"
          >
            {skills.find(s => s.id === activeSkillId)?.title.toUpperCase()}
          </motion.h2>
        </AnimatePresence>
      </div>

      <div className="keyboard-stage w-full max-w-7xl mx-auto px-6 h-full flex flex-col md:flex-row items-center justify-between relative z-10">
        
        {/* Keyboard Area (60%) */}
        <div className="relative w-full md:w-[60%] h-[50vh] md:h-[80vh] flex items-center justify-center">
          {/* Radial Glow */}
          <div 
            ref={glowRef}
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'radial-gradient(circle at center, rgba(0,0,0,0.15) 0%, transparent 60%)',
              transform: 'translateY(10%) scale(1.2)'
            }}
          />
          
          {/* Keyboard World */}
          <div 
            ref={keyboardWorldRef}
            className="keyboard-world w-full h-full relative z-10"
          >
            <Suspense fallback={
              <div className="w-full h-full flex items-center justify-center">
                <div className="animate-spin w-8 h-8 border-2 border-black/20 border-t-black rounded-full"></div>
              </div>
            }>
              <Spline
                className="w-full h-full"
                scene="/skills-keyboard.splinecode"
                onLoad={handleSplineInteractions}
              />
            </Suspense>
          </div>
        </div>

        {/* Terminal Panel (40%) */}
        <div className="w-full md:w-[35%] z-20 mt-12 md:mt-0 flex flex-col justify-center">
          <div 
            ref={skillPanelRef}
            className="font-mono text-[#ECE7DF] bg-[#1C1C1C] p-8 rounded-2xl shadow-[0_0_40px_rgba(0,0,0,0.15)] h-[320px] w-full flex flex-col relative overflow-hidden border border-white/5"
          >
            {/* Terminal Header */}
            <div className="flex items-center gap-2 mb-6 opacity-50">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>

            <div className="text-[#B45309] mb-4 text-sm md:text-base">
              {terminalState.prompt}
              {terminalState.phase === 'loading' && <span className="animate-pulse">|</span>}
            </div>
            
            <div className="text-2xl md:text-3xl font-bold mb-4 text-white min-h-[2.5rem]">
              {terminalState.title}
              {terminalState.phase === 'typing-title' && <span className="animate-pulse text-[#B45309]">|</span>}
            </div>
            
            <div className="text-sm md:text-base leading-relaxed text-gray-400">
              {terminalState.description}
              {(terminalState.phase === 'typing-desc' || terminalState.phase === 'done') && <span className="animate-pulse text-[#B45309]">|</span>}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
