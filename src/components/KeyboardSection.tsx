import React, { Suspense, useEffect, useRef, useState } from 'react';
import type { Application } from '@splinetool/runtime';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const Spline = React.lazy(() => import('@splinetool/react-spline'));

gsap.registerPlugin(ScrollTrigger);

const skills = [
  // Row 1
  { id: 'js', title: "JavaScript", description: "The core engine of modern web logic and interactive experiences." },
  { id: 'ts', title: "TypeScript", description: "Bulletproof scalability with strict typing and advanced safety." },
  { id: 'html', title: "HTML5", description: "The semantic foundation of the modern web ecosystem." },
  { id: 'css', title: "CSS3", description: "Advanced layouts and animations using modern grid and flex physics." },
  { id: 'react', title: "React.js", description: "Modular component architecture for high-end cinematic interfaces." },
  { id: 'vite', title: "Vite", description: "The next-generation frontend tool providing lightning-fast dev builds." },

  // Row 2
  { id: 'next', title: "Next.js", description: "The React framework for production with SSR and edge-ready speed." },
  { id: 'tailwind', title: "Tailwind CSS", description: "Utility-first framework for crafting pixel-perfect designs with velocity." },
  { id: 'node', title: "Node.js", description: "High-performance runtime for scalable and robust backend systems." },
  { id: 'express', title: "Express.js", description: "Minimalist and flexible web framework for building powerful APIs." },
  { id: 'postgre', title: "PostgreSQL", description: "The world's most advanced open source relational database system." },
  { id: 'mongo', title: "MongoDB", description: "Agile NoSQL database for flexible and rapid data scaling." },

  // Row 3
  { id: 'git', title: "Git", description: "Pro-level version control for streamlined and secure code management." },
  { id: 'github', title: "GitHub", description: "The command center for collaborative development and global hosting." },
  { id: 'prettier', title: "Prettier", description: "An opinionated code formatter that ensures consistent style across the codebase." },
  { id: 'npm', title: "npm", description: "The vital nexus for over 2 million packages in the JS ecosystem." },
  { id: 'firebase', title: "Firebase", description: "Google's mobile and web app development platform for rapid scaling." },
  { id: 'wordpress', title: "WordPress", description: "The engine for over 40% of the web, powering enterprise content." },

  // Row 4
  { id: 'linux', title: "Linux", description: "The core OS architecture powering secure and robust server environments." },
  { id: 'docker', title: "Docker", description: "Seamless containerization for consistent deployment across any cloud." },
  { id: 'nginx', title: "Nginx", description: "High-performance web server and load balancer for secure traffic." },
  { id: 'aws', title: "AWS", description: "Enterprise-grade cloud infrastructure for global reach and reliability." },
  { id: 'vim', title: "Vim", description: "High-velocity code editing for maximum efficiency and developer flow." },
  { id: 'vercel', title: "Vercel", description: "The premier platform for frontend deployment and edge-ready speed." }
];

export default function KeyboardSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const keyboardWorldRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const skillPanelRef = useRef<HTMLDivElement>(null);

  const [activeSkillId, setActiveSkillId] = useState('react');
  const [splineApp, setSplineApp] = useState<Application>();
  const [isDesktop, setIsDesktop] = useState(true);
  const [terminalState, setTerminalState] = useState({
    prompt: '',
    title: '',
    description: '',
    phase: 'idle'
  });

  // Check viewport size on mount
  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 1024);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

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
    // Optimized sound pooling for rapid playback
    const soundPool = {
      press: new Audio(`/keycap-sounds/press.mp3`),
      release: new Audio(`/keycap-sounds/release.mp3`)
    };
    
    // Prerender sounds
    soundPool.press.load();
    soundPool.release.load();

    const playSound = (type: 'press' | 'release') => {
      const sound = soundPool[type].cloneNode(true) as HTMLAudioElement;
      sound.volume = 0.35;
      sound.play().catch(() => {});
    };

    // Update side panel based on Hover
    app.addEventListener("mouseHover", (e: any) => {
      if (e.target && e.target.name) {
        const hoveredName = e.target.name.toLowerCase();
        
        // High-precision matching: prioritize exact matches and handle 'js' vs 'nextjs' collisions
        const foundSkill = skills.find(s => {
          const sId = s.id.toLowerCase();
          const cleanName = hoveredName.replace('keycap', '').replace(/[^a-z0-9]/g, '');
          
          // Exact match is king
          if (cleanName === sId) return true;
          
          // Special handling for 'js' to avoid eating 'nextjs'
          if (sId === 'js') {
            return cleanName === 'js' || cleanName === 'javascript' || hoveredName.includes('javascript');
          }
          
          return cleanName.includes(sId) || sId.includes(cleanName);
        });
        
        if (foundSkill && activeSkillId !== foundSkill.id) {
          setActiveSkillId(foundSkill.id);
          playSound('press'); // Sensory feedback on hover
        }
      }
    });

    // Play sound and trigger AI/Navigation on Click
    app.addEventListener("mouseDown", (e: any) => {
      if (e.target && e.target.name) {
        const clickedName = e.target.name.toLowerCase();

        // Fuzzy matching for clicks
        const foundSkill = skills.find(s => {
          const sId = s.id.toLowerCase();
          const cleanName = clickedName.replace('keycap', '').replace(/[^a-z0-9]/g, '');
          
          if (cleanName === sId) return true;
          
          if (sId === 'js') {
            return cleanName === 'js' || cleanName === 'javascript' || clickedName.includes('javascript');
          }
          
          return cleanName.includes(sId) || sId.includes(cleanName);
        });
        if (foundSkill && activeSkillId !== foundSkill.id) {
          setActiveSkillId(foundSkill.id);
        }

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
    
    const tickAudio = new Audio('/keycap-sounds/press.mp3');
    tickAudio.volume = 0.1;

    const typeText = async (text: string, setter: (val: string) => void, speed = 5, playAudio = true) => {
      for (let i = 0; i <= text.length; i++) {
        if (isCancelled) break;
        setter(text.slice(0, i));
        
        if (playAudio && i > 0 && i % 3 === 0) {
          tickAudio.currentTime = 0;
          tickAudio.play().catch(() => {});
        }

        if (speed > 0) {
          await new Promise(r => setTimeout(r, speed));
        } else {
          // Force a tiny yield to keep UI responsive but move as fast as possible
          if (i % 5 === 0) await new Promise(r => requestAnimationFrame(r));
        }
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
      
      // Instant title display
      await typeText(skill.title, (val) => setTerminalState(prev => ({ ...prev, title: val })), 0);
      if (isCancelled) return;

      setTerminalState(prev => ({ ...prev, phase: 'typing-desc' }));

      // Turbo-fast description
      await typeText(skill.description, (val) => setTerminalState(prev => ({ ...prev, description: val })), 1);
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
      // Setup simple scroll emergence fade without pinning
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 60%",
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

    // Dynamically adjust scale based on device width to prevent mobile clipping
    const isMobile = window.innerWidth < 768;
    const baseScale = isMobile ? 0.15 : 0.28;
    const baseY = isMobile ? -10 : 0;

    // Perfect middle ground size to fit inside container without clipping
    gsap.set(kbd.position, { y: baseY, x: 0 }); // Centered, slightly lifted on mobile
    gsap.set(kbd.rotation, { x: Math.PI / 8 }); // ~22.5 deg
    gsap.set(kbd.scale, { x: baseScale, y: baseScale, z: baseScale }); 

    // Gentle floating breathing animation (static visually, just hovering slightly)
    gsap.to(kbd.position, {
      y: baseY + 15, // float range within safe bounds
      duration: 4,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });

    // --- High-End Performance Culling ---
    // Pause the 3D engine completely when scrolled out of view
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          try { splineApp.play(); } catch(e) {}
        } else {
          try { splineApp.stop(); } catch(e) {}
        }
      },
      { rootMargin: "200px 0px" } // Start rendering just before it enters view
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [splineApp]);

  return (
    <div 
      id="keyboardScene" 
      ref={sectionRef}
      className="relative w-full min-h-screen py-24 md:py-0 md:h-screen bg-[#F6F3EE] text-[#1C1C1C] overflow-hidden flex items-center justify-center font-sans smooth-gpu"
      style={{ isolation: 'isolate' }}
    >
      {/* Dynamic Cinematic Background Typography */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.h2
            key={activeSkillId}
            initial={{ opacity: 0, scale: 0.98, filter: "blur(10px)" }}
            animate={{ opacity: 0.04, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 1.02, filter: "blur(10px)" }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="text-[clamp(60px,25vw,180px)] md:text-[220px] font-bold text-black whitespace-nowrap tracking-tighter smooth-gpu"
            style={{ translateZ: 0, backfaceVisibility: 'hidden' }}
          >
            {skills.find(s => s.id === activeSkillId)?.title.toUpperCase()}
          </motion.h2>
        </AnimatePresence>
      </div>

      <div className="keyboard-stage w-full max-w-7xl mx-auto px-6 h-full flex flex-col md:flex-row items-center justify-between relative z-10">
        
        {/* Keyboard Area (60%) — Desktop: 3D Spline, Mobile: Static grid */}
        <div className="relative w-full lg:w-[60%] h-auto lg:h-[80vh] flex flex-col items-center justify-center order-2 md:order-1">
          {isDesktop ? (
            <>
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
            </>
          ) : (
            /* Mobile: Categorized Premium Tactile Grid */
            <div className="w-full flex flex-col gap-10 p-4 sm:p-6 pb-24">
              {/* Ultra-Premium Mobile Title */}
              <motion.div 
                className="flex flex-col pt-8 pb-4"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-px bg-[#B45309]"></div>
                  <span className="text-[#B45309] font-mono font-bold tracking-[0.3em] text-[10px] sm:text-[11px] uppercase">Technical Arsenal</span>
                </div>
                <h2 className="text-[2.75rem] sm:text-6xl font-black tracking-tighter text-[#1A1816] leading-[0.95] mb-2">
                  System<br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1A1816] to-[#A0A0A0]">Architecture.</span>
                </h2>
              </motion.div>

              {[
                { name: "Frontend Architecture", items: ['js', 'ts', 'react', 'next', 'html', 'css', 'tailwind', 'vite'] },
                { name: "Backend & Systems", items: ['node', 'express', 'postgre', 'mongo', 'firebase', 'wordpress'] },
                { name: "Cloud & DevSecOps", items: ['linux', 'aws', 'docker', 'nginx', 'vercel'] },
                { name: "Developer Ecosystem", items: ['git', 'github', 'npm', 'prettier', 'vim'] }
              ].map((category, catIndex) => (
                <motion.div 
                  key={category.name}
                  className="flex flex-col gap-4"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: catIndex * 0.1, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="flex items-center gap-4">
                    <span className="text-[10px] sm:text-xs font-mono tracking-widest text-[#B45309] font-bold uppercase">{category.name}</span>
                    <div className="flex-1 h-px bg-black/10" />
                  </div>
                  <div className="flex flex-wrap items-start gap-2 sm:gap-3">
                    {category.items.map(itemId => {
                      const skill = skills.find(s => s.id === itemId);
                      if (!skill) return null;
                      
                      const isActive = activeSkillId === skill.id;
                      return (
                        <button
                          key={skill.id}
                          onClick={() => {
                              setActiveSkillId(skill.id);
                              if (typeof window !== 'undefined' && window.navigator && window.navigator.vibrate) {
                                  window.navigator.vibrate(20);
                              }
                          }}
                          className={`relative flex items-center justify-center px-4 py-3 rounded-xl sm:rounded-2xl text-[10px] sm:text-[11px] font-black uppercase tracking-[0.15em] transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] border ${
                            isActive 
                              ? 'bg-[#1A1816] text-[#F6F3EE] border-[#B45309]/50 shadow-[0_8px_20px_rgba(180,83,9,0.2)] scale-[1.05] z-10' 
                              : 'bg-white/70 text-[#1A1816]/70 border-black/5 hover:bg-white hover:text-[#1A1816] hover:border-black/10 hover:shadow-md hover:-translate-y-0.5'
                          }`}
                        >
                          {isActive && (
                            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-[#B45309] rounded-full shadow-[0_0_8px_rgba(180,83,9,0.8)] border-2 border-[#1A1816]" />
                          )}
                          {skill.title}
                        </button>
                      );
                    })}
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>

        {/* Terminal Panel (40%) */}
        <div className="hidden md:flex w-full md:w-[35%] z-20 mt-32 md:mt-0 mb-8 md:mb-0 flex-col justify-center order-1 md:order-2">
          <div 
            ref={skillPanelRef}
            className="font-mono text-[#ECE7DF] bg-[#1C1C1C] p-8 rounded-2xl shadow-[0_0_40px_rgba(0,0,0,0.15)] h-[320px] w-full flex flex-col relative overflow-hidden border border-white/5"
            style={{ willChange: 'transform, opacity' }}
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
