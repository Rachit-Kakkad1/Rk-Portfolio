import React, { useState, useRef, useEffect } from 'react';
import { 
  motion, 
  AnimatePresence, 
  useMotionValue, 
  useSpring, 
  useMotionTemplate,
  animate
} from "framer-motion";
import { GraduationCap, School, BookOpen, Sparkles, Terminal, Cpu, Layout, Code } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const education = [
  {
    type: "B.Tech in Computer Engineering",
    institution: "Swaminarayan University — Kalol, Gujarat",
    details: "1st Year (Pursuing) | CGPA: 9.3",
    period: "2025 – 2029",
    icon: GraduationCap,
    color: "from-blue-500/20 to-cyan-500/20"
  },
  {
    type: "Higher Secondary Education (12th)",
    institution: "Shakti Higher Secondary School — Rajkot",
    details: "Gujarat Board | Science Stream",
    period: "Completed in 2025",
    icon: School,
    color: "from-amber-500/20 to-orange-500/20"
  },
  {
    type: "Secondary Education (10th)",
    institution: "SMT J.V. GEMS — Porbandar",
    details: "Gujarat Board",
    period: "Completed in 2023",
    icon: BookOpen,
    color: "from-emerald-500/20 to-teal-500/20"
  }
];

const themes = [
  { 
    name: "Developer", icon: Terminal, keyword: "text-green-600", string: "text-orange-500", property: "text-blue-600", number: "text-blue-600", bg: "bg-white/80",
    role: "Full Stack Dev", stack: ["React", "Node", "MongoDB", "Python"]
  },
  { 
    name: "Engineer", icon: Cpu, keyword: "text-amber-700", string: "text-amber-500", property: "text-stone-700", number: "text-stone-700", bg: "bg-stone-50/80",
    role: "Software Engineer", stack: ["TypeScript", "C++", "Docker", "AWS"]
  },
  { 
    name: "AI Mode", icon: Sparkles, keyword: "text-violet-600", string: "text-cyan-500", property: "text-fuchsia-500", number: "text-blue-500", bg: "bg-slate-900/90 text-slate-200",
    role: "ML Engineer", stack: ["PyTorch", "TensorFlow", "OpenAI", "RAG"]
  },
  { 
    name: "Minimal", icon: Layout, keyword: "text-neutral-800", string: "text-neutral-500", property: "text-neutral-800", number: "text-neutral-500", bg: "bg-neutral-100/80",
    role: "Creative Dev", stack: ["Three.js", "Framer", "GSAP", "WebGL"]
  }
];

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const editorRef = useRef<HTMLDivElement>(null);
  const bioRef = useRef<HTMLDivElement>(null);
  const eduRef = useRef<HTMLDivElement>(null);
  const bgTextRef = useRef<HTMLHeadingElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);

  const [activeTheme, setActiveTheme] = useState(0);

  // Portrait Mask Effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const maskRadius = useMotionValue(0);
  const maskPath = useMotionTemplate`circle(${maskRadius}px at ${mouseX}% ${mouseY}%)`;

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!imageContainerRef.current) return;
    const rect = imageContainerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    mouseX.set(x);
    mouseY.set(y);
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Initial Setup
      gsap.set([cardsRef.current, editorRef.current, bioRef.current, eduRef.current], { opacity: 0, y: 100 });
      gsap.set(bgTextRef.current, { opacity: 1, scale: 2.0, filter: "blur(0px)" });

      // 2. Multi-Stage Timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=500%", // 5 Viewports of pinning
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          onUpdate: (self) => {
            // Theme cycling based on scroll progress in the editor stage (0.2 to 0.5)
            if (self.progress > 0.2 && self.progress < 0.5) {
              const themeProgress = (self.progress - 0.2) / 0.3;
              const index = Math.min(Math.floor(themeProgress * themes.length), themes.length - 1);
              setActiveTheme(index);
            }
          }
        }
      });

      // Stage 1: Entrance & Background (Maximum Cinematic Impact)
      tl.to(bgTextRef.current, { opacity: 1, scale: 2.5, duration: 1.5, ease: "power2.out" })
        .to(cardsRef.current, { opacity: 1, y: 0, duration: 1, ease: "power3.out" }, "-=1")
        .to(bgTextRef.current, { opacity: 0.15, filter: "blur(8px)", duration: 1, ease: "power2.inOut" }, "-=0.4");

      // Stage 2: 4 System Cards Exit & Editor Entrance
      tl.to(cardsRef.current, { opacity: 0, y: -50, duration: 1, ease: "power3.in" }, "+=1")
        .to(editorRef.current, { opacity: 1, y: 0, duration: 1, ease: "power3.out" }, "-=0.2");

      // Stage 3: Editor Stays, Theme Cycles (handled by onUpdate), then Editor Exits & Bio Enters
      tl.to({}, { duration: 2 }) // Empty space for theme cycling
        .to(editorRef.current, { opacity: 0, scale: 0.95, duration: 1, ease: "power3.in" })
        .to(bioRef.current, { opacity: 1, y: 0, duration: 1, ease: "power3.out" }, "-=0.3");

      // Stage 4: Bio Exits & Education Enters
      tl.to(bioRef.current, { opacity: 0, x: -100, duration: 1, ease: "power3.in" }, "+=1")
        .to(eduRef.current, { opacity: 1, y: 0, duration: 1, ease: "power3.out" }, "-=0.5");

      // Final: Ensure background stays softly blurred
      tl.to(bgTextRef.current, { opacity: 0.1, filter: "blur(10px)", duration: 1, ease: "sine.inOut" });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const currentTheme = themes[activeTheme];

  return (
    <section ref={sectionRef} className="relative w-full h-screen bg-[#F6F3EE] overflow-hidden flex flex-col items-center justify-center">
      
      {/* Background Typography */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
        <h1 
          ref={bgTextRef} 
          className="text-[120px] md:text-[100px] font-black leading-[0.85] text-black select-none text-center tracking-tighter uppercase will-change-[transform,opacity,filter]"
          style={{ filter: "blur(1px)", opacity: 1 }}
        >
          WHO<br />
          IS<br />
          RACHIT
        </h1>
      </div>

      <div ref={containerRef} className="relative z-10 w-full max-w-7xl mx-auto px-6 h-full flex items-center justify-center">
        
        {/* Stage 1: The 4 Cards */}
        <div ref={cardsRef} className="absolute inset-0 flex items-center justify-center">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full px-12">
            {themes.map((theme, i) => (
              <div key={i} className="bg-white/40 backdrop-blur-[20px] p-8 rounded-[2.5rem] shadow-[0_8px_32px_0_rgba(0,0,0,0.05)] border border-white/40 flex flex-col gap-4">
                <div className="w-12 h-12 rounded-2xl bg-black text-white flex items-center justify-center shadow-lg">
                  <theme.icon size={24} />
                </div>
                <h3 className="text-xl font-bold">{theme.name}</h3>
                <p className="text-sm text-black/60 font-medium">Expertise in {theme.stack.join(", ")}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Stage 2: The Interactive Editor */}
        <div ref={editorRef} className="absolute inset-0 flex items-center justify-center -translate-y-12">
          <div className={`w-full max-w-4xl rounded-[2.5rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.15)] border border-white/40 overflow-hidden transition-all duration-700 backdrop-blur-[30px] ${currentTheme.name === "AI Mode" ? "bg-slate-900/40 text-slate-200" : "bg-white/40"}`}>
            <div className="flex items-center px-6 py-4 border-b border-black/10 text-sm font-mono opacity-40">
              <div className="flex gap-2 mr-6">
                <div className="w-3 h-3 rounded-full bg-red-400"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                <div className="w-3 h-3 rounded-full bg-green-400"></div>
              </div>
              rachit_profile.ts
              <div className="ml-auto flex items-center gap-2">
                <currentTheme.icon size={14} />
                {currentTheme.name} MODE
              </div>
            </div>
            <div className="p-10 font-mono text-base md:text-lg leading-relaxed relative">
              <div className="flex">
                <div className="pr-8 border-r border-black/10 mr-8 text-black/20 select-none text-right">
                  {Array.from({length: 8}).map((_, i) => <div key={i}>{i+1}</div>)}
                </div>
                <div>
                  <div className="flex gap-2">
                    <span className={currentTheme.keyword}>const</span> 
                    <span className={currentTheme.property}>Rachit</span> 
                    <span className="text-black/40">=</span> 
                    <span className="text-black/40">{'{'}</span>
                  </div>
                  <div className="pl-6">
                    <span className={currentTheme.property}>role</span>: <span className={currentTheme.string}>"{currentTheme.role}"</span>,
                  </div>
                  <div className="pl-6">
                    <span className={currentTheme.property}>focus</span>: <span className={currentTheme.string}>"{currentTheme.name === "Minimal" ? "Interactive Web" : "Scalable Architecture"}"</span>,
                  </div>
                  <div className="pl-6">
                    <span className={currentTheme.property}>stack</span>: [<br />
                    <div className="pl-6">
                      {currentTheme.stack.map((item, idx) => (
                        <span key={idx} className={currentTheme.string}>"{item}"{idx < currentTheme.stack.length - 1 ? "," : ""} </span>
                      ))}
                    </div>
                    ]
                  </div>
                  <div className="text-black/40">{'}'}</div>
                  <div className="mt-4 flex gap-2">
                    <span className={currentTheme.keyword}>export default</span> 
                    <span className={currentTheme.property}>Rachit</span>
                    <motion.div animate={{ opacity: [1, 0] }} transition={{ repeat: Infinity, duration: 0.8 }} className="w-2 h-6 bg-black/40" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stage 3: Biography */}
        <div ref={bioRef} className="absolute inset-0 flex items-center justify-center mt-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center px-12">
            <motion.div 
              ref={imageContainerRef}
              className="relative aspect-[4/5] rounded-[2rem] overflow-hidden shadow-2xl bg-black/5 group cursor-crosshair isolate pointer-events-auto"
              onMouseMove={handleMouseMove}
              onMouseEnter={() => animate(maskRadius, 800, { duration: 0.6, ease: "easeOut" })}
              onMouseLeave={() => animate(maskRadius, 0, { duration: 0.4, ease: "easeIn" })}
            >
              <img src="/ai_made_image.png" alt="AI Context" className="absolute inset-0 w-full h-full object-cover pointer-events-none" />
              <motion.div 
                className="absolute inset-0 w-full h-full pointer-events-none isolate" 
                style={{ 
                  clipPath: maskPath,
                  WebkitClipPath: maskPath
                }}
              >
                <img src="/own_image.png" alt="Rachit" className="w-full h-full object-cover pointer-events-none" />
              </motion.div>
            </motion.div>
            <div className="flex flex-col gap-8">
              <div className="flex flex-col gap-4">
                <span className="text-[#B45309] font-mono tracking-widest uppercase text-xs font-bold">The Narrative</span>
                <h2 className="text-5xl md:text-7xl font-black tracking-tight leading-none">BEYOND<br /><span className="text-[#B45309]">THE CODE</span></h2>
              </div>
              <div className="flex flex-col gap-6 text-black/70 font-medium text-lg leading-relaxed">
                <p>I am Rachit Kakkad, a passionate Full Stack Developer driven by the intersection of intelligent systems and cinematic user experiences.</p>
                <p>Full-stack development is more than just connecting a frontend to a database; it's about architecting seamless, end-to-end digital ecosystems. By mastering both visual precision and server-side logic, I bridge the gap between user intent and technical execution.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Stage 4: Education */}
        <div ref={eduRef} className="absolute inset-0 flex items-center justify-center">
          <div className="flex flex-col gap-12 w-full px-12">
            <div className="flex flex-col items-center text-center gap-4">
              <span className="text-[#B45309] font-mono tracking-[0.4em] uppercase text-xs font-bold">Academic Journey</span>
              <h3 className="text-4xl md:text-6xl font-bold tracking-tight">Foundation Of Excellence</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {education.map((item, i) => (
                <div key={i} className="group p-10 bg-white/40 backdrop-blur-[20px] rounded-[3rem] shadow-[0_8px_32px_0_rgba(0,0,0,0.05)] border border-white/40 flex flex-col gap-6 transition-all duration-500 hover:shadow-2xl hover:bg-white/60">
                  <div className="w-16 h-16 rounded-2xl bg-black text-white flex items-center justify-center shadow-xl">
                    <item.icon size={30} />
                  </div>
                  <div className="flex flex-col gap-2">
                    <span className="text-[#B45309] font-mono text-[10px] uppercase tracking-widest font-bold">{item.period}</span>
                    <h4 className="text-xl font-black text-black leading-tight">{item.type}</h4>
                    <p className="text-sm font-bold text-black/60">{item.institution}</p>
                    <p className="text-xs text-black/40 font-medium mt-2">{item.details}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
