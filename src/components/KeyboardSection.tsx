import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Add TypeScript support for the custom spline-viewer element
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'spline-viewer': any;
    }
  }
}

const skills = [
  { id: 'react', title: "React.js", description: "Building interactive user interfaces with component architecture." },
  { id: 'node', title: "Node.js", description: "Backend services and scalable APIs." },
  { id: 'mongo', title: "MongoDB", description: "Flexible NoSQL database for modern applications." },
  { id: 'docker', title: "Docker", description: "Containerized deployment workflows." },
  { id: 'python', title: "Python / AI", description: "Machine learning and intelligent system development." }
];

export default function KeyboardSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const keyboardWorldRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const skillPanelRef = useRef<HTMLDivElement>(null);

  const [activeSkillIndex, setActiveSkillIndex] = useState(0);
  const [terminalState, setTerminalState] = useState({
    prompt: '',
    title: '',
    description: '',
    phase: 'idle'
  });

  useEffect(() => {
    let isCancelled = false;
    
    const typeText = async (text: string, setter: (val: string) => void, speed = 30) => {
      for (let i = 0; i <= text.length; i++) {
        if (isCancelled) break;
        setter(text.slice(0, i));
        await new Promise(r => setTimeout(r, speed));
      }
    };

    const runSequence = async () => {
      const skill = skills[activeSkillIndex];
      if (!skill) return;

      // Reset and show loading
      setTerminalState({ prompt: '> loading skill...', title: '', description: '', phase: 'loading' });
      
      // Brief pause for cinematic effect
      await new Promise(r => setTimeout(r, 250));
      if (isCancelled) return;

      // Update prompt
      setTerminalState(prev => ({ ...prev, prompt: `> loading skill: ${skill.id}`, phase: 'typing-title' }));
      
      // Type title
      await typeText(skill.title, (val) => setTerminalState(prev => ({ ...prev, title: val })), 40);
      if (isCancelled) return;

      setTerminalState(prev => ({ ...prev, phase: 'typing-desc' }));

      // Type description
      await typeText(skill.description, (val) => setTerminalState(prev => ({ ...prev, description: val })), 25);
      if (isCancelled) return;

      setTerminalState(prev => ({ ...prev, phase: 'done' }));
    };

    runSequence();

    return () => {
      isCancelled = true;
    };
  }, [activeSkillIndex]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Scroll-triggered emergence animation
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=400vh", // Extended pin duration for scrolling through skills
          scrub: 1.2,
          pin: true,
          onUpdate: (self) => {
            // 0 to 0.1 is emergence, 0.1 to 1.0 is scrolling through skills
            if (self.progress > 0.1) {
              const skillProgress = (self.progress - 0.1) / 0.9;
              const index = Math.min(
                Math.floor(skillProgress * skills.length),
                skills.length - 1
              );
              setActiveSkillIndex(index);
            } else {
              setActiveSkillIndex(0);
            }
          }
        }
      });

      // Initial state
      gsap.set(keyboardWorldRef.current, {
        y: 300,
        rotationX: 55,
        scale: 0.7,
        opacity: 0
      });
      
      gsap.set(glowRef.current, { opacity: 0 });
      gsap.set(skillPanelRef.current, { opacity: 0, y: 60 });

      // 0% to 10%: Keyboard rises & terminal appears
      tl.to(keyboardWorldRef.current, {
        y: 0,
        rotationX: 0,
        scale: 1,
        opacity: 1,
        duration: 0.1,
        ease: "power2.out"
      }, 0);

      tl.to(glowRef.current, {
        opacity: 1,
        duration: 0.1,
        ease: "power2.out"
      }, 0);

      tl.to(skillPanelRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.1,
        ease: "power3.out"
      }, 0);

      // 10% to 100%: Empty space in timeline to allow scrolling through skills
      tl.to({}, { duration: 0.9 });

      // 2. Micro-interaction: Breathing animation
      gsap.to(keyboardWorldRef.current, {
        y: "+=12",
        duration: 6,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 0.5
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      id="keyboardScene" 
      ref={sectionRef}
      className="relative w-full h-screen bg-[#F6F3EE] text-[#1C1C1C] overflow-hidden flex items-center justify-center font-sans"
      style={{ perspective: "1000px" }}
    >
      <div className="keyboard-stage w-full max-w-7xl mx-auto px-6 h-full flex flex-col md:flex-row items-center justify-between">
        
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
            style={{ transformStyle: 'preserve-3d' }}
          >
            <spline-viewer 
              url="https://prod.spline.design/6Wq1Q7YGyM-iab9i/scene.splinecode"
              class="w-full h-full"
            ></spline-viewer>
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
    </section>
  );
}
