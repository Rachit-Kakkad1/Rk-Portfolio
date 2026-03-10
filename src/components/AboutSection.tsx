import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent, AnimatePresence } from 'framer-motion';

export default function AboutSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const [codeLines, setCodeLines] = useState(0);
  const [theme, setTheme] = useState(0);
  const [hoveredLine, setHoveredLine] = useState<number | null>(null);
  const [showCompiled, setShowCompiled] = useState(false);

  // Scroll mapping
  // 0 - 0.2: Entry & Typing
  // 0.2 - 0.6: Theme transitions
  // 0.6 - 0.8: Exit
  
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    // Typing
    if (latest < 0.05) setCodeLines(0);
    else if (latest < 0.2) {
      const progress = (latest - 0.05) / 0.15;
      setCodeLines(Math.floor(progress * 8));
    } else {
      setCodeLines(8);
    }

    // Themes
    if (latest < 0.3) setTheme(0); // Developer
    else if (latest < 0.4) setTheme(1); // Engineer
    else if (latest < 0.5) setTheme(2); // AI Mode
    else setTheme(3); // Minimal Creator

    // Compiled message
    if (latest > 0.55 && latest < 0.8) {
      setShowCompiled(true);
    } else {
      setShowCompiled(false);
    }
  });

  const editorOpacity = useTransform(scrollYProgress, [0, 0.05, 0.7, 0.8], [0, 1, 1, 0]);
  const particlesOpacity = useTransform(scrollYProgress, [0.75, 0.85], [0, 1]);

  const themes = [
    { name: "Developer", keyword: "text-green-600", string: "text-orange-500", property: "text-blue-600", number: "text-blue-600", bg: "bg-white/80" },
    { name: "Engineer", keyword: "text-amber-700", string: "text-amber-500", property: "text-stone-700", number: "text-stone-700", bg: "bg-stone-50/80" },
    { name: "AI Mode", keyword: "text-violet-600", string: "text-cyan-500", property: "text-fuchsia-500", number: "text-blue-500", bg: "bg-slate-900/90 text-slate-200" },
    { name: "Minimal", keyword: "text-neutral-800", string: "text-neutral-500", property: "text-neutral-800", number: "text-neutral-500", bg: "bg-neutral-100/80" }
  ];

  const currentTheme = themes[theme];

  const fragments = ["AI", "SYSTEMS", "DATA", "LOGIC", "API", "MODEL", "INTERFACE"];

  return (
    <div ref={containerRef} className="relative w-full h-[2400px]" style={{ background: 'radial-gradient(circle at center, #F6F3EE 0%, #ECE7DF 80%)' }}>
      <div className="sticky top-0 w-full h-screen overflow-hidden flex items-center justify-center">
        
        {/* Layer 2: Giant Typography */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
          <h1 className="text-[150px] md:text-[260px] font-bold opacity-[0.04] tracking-[-0.03em] leading-[0.85] text-center text-black">
            WHO<br/>IS<br/>RACHIT
          </h1>
        </div>

        {/* Layer 3: System Grid & Fragments */}
        <div className="absolute inset-0 z-0 pointer-events-none opacity-5" style={{ backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', backgroundSize: '100px 100px' }}></div>
        
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          {fragments.map((frag, i) => (
            <motion.div
              key={frag}
              className="absolute text-xs font-mono tracking-widest opacity-20 text-black"
              style={{
                top: `${20 + (i * 15)}%`,
                left: `${10 + (i * 12)}%`,
              }}
              animate={{ y: [-10, 10, -10] }}
              transition={{ duration: 10 + i, repeat: Infinity, ease: "easeInOut" }}
            >
              {frag}
            </motion.div>
          ))}
        </div>

        {/* Layer 4: Interactive Code Editor */}
        <motion.div 
          className={`relative z-10 w-[90vw] max-w-2xl rounded-xl border border-black/10 shadow-2xl backdrop-blur-md transition-colors duration-700 overflow-hidden ${currentTheme.bg}`}
          style={{ opacity: editorOpacity }}
        >
          {/* Editor Header */}
          <div className="flex items-center px-4 py-3 border-b border-black/10 text-xs font-mono text-black/40">
            <div className="flex gap-1.5 mr-4">
              <div className="w-2.5 h-2.5 rounded-full bg-black/20"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-black/20"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-black/20"></div>
            </div>
            developer.js
            <div className="ml-auto opacity-50 transition-opacity duration-500">{currentTheme.name} Theme</div>
          </div>

          {/* Editor Body */}
          <div className="p-6 font-mono text-sm md:text-base leading-relaxed relative">
            
            {/* Hover Panels */}
            <AnimatePresence>
              {hoveredLine === 2 && (
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} className="absolute right-6 top-12 w-48 p-4 bg-black text-white text-xs rounded-lg shadow-xl z-20">
                  Full stack developer focused on modern web architecture and intelligent systems.
                </motion.div>
              )}
              {hoveredLine === 4 && (
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} className="absolute right-6 top-24 w-48 p-4 bg-black text-white text-xs rounded-lg shadow-xl z-20 flex flex-wrap gap-2">
                  {["React", "Node", "MongoDB", "Express", "Python", "TensorFlow"].map(tech => (
                    <span key={tech} className="px-2 py-1 bg-white/20 rounded">{tech}</span>
                  ))}
                </motion.div>
              )}
              {hoveredLine === 5 && (
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} className="absolute right-6 top-32 w-48 p-4 bg-black text-white text-xs rounded-lg shadow-xl z-20">
                  Interfaces where design meets engineering.
                </motion.div>
              )}
            </AnimatePresence>

            <div className="flex">
              {/* Line Numbers */}
              <div className="flex flex-col text-black/20 select-none pr-4 text-right border-r border-black/10 mr-4">
                {[1,2,3,4,5,6,7,8].map(n => (
                  <div key={n} className={n <= codeLines ? "opacity-100" : "opacity-0"}>{n}</div>
                ))}
              </div>

              {/* Code Content */}
              <div className="flex flex-col w-full">
                {codeLines >= 1 && (
                  <div className="hover:bg-black/5 -mx-2 px-2 rounded transition-colors cursor-default">
                    <span className={currentTheme.keyword}>const</span> <span className={currentTheme.property}>developer</span> = {'{'}
                  </div>
                )}
                {codeLines >= 2 && (
                  <div className="hover:bg-black/5 -mx-2 px-2 rounded transition-colors cursor-default" onMouseEnter={() => setHoveredLine(2)} onMouseLeave={() => setHoveredLine(null)}>
                    &nbsp;&nbsp;<span className={currentTheme.property}>name</span>: <span className={currentTheme.string}>"Rachit Kakkad"</span>,
                  </div>
                )}
                {codeLines >= 3 && (
                  <div className="hover:bg-black/5 -mx-2 px-2 rounded transition-colors cursor-default">
                    &nbsp;&nbsp;<span className={currentTheme.property}>role</span>: <span className={currentTheme.string}>"Full Stack Dev"</span>,
                  </div>
                )}
                {codeLines >= 4 && (
                  <div className="hover:bg-black/5 -mx-2 px-2 rounded transition-colors cursor-default" onMouseEnter={() => setHoveredLine(4)} onMouseLeave={() => setHoveredLine(null)}>
                    &nbsp;&nbsp;<span className={currentTheme.property}>stack</span>: [<span className={currentTheme.string}>"MERN"</span>, <span className={currentTheme.string}>"AI"</span>],
                  </div>
                )}
                {codeLines >= 5 && (
                  <div className="hover:bg-black/5 -mx-2 px-2 rounded transition-colors cursor-default" onMouseEnter={() => setHoveredLine(5)} onMouseLeave={() => setHoveredLine(null)}>
                    &nbsp;&nbsp;<span className={currentTheme.property}>focus</span>: <span className={currentTheme.string}>"Interactive"</span>,
                  </div>
                )}
                {codeLines >= 6 && (
                  <div className="hover:bg-black/5 -mx-2 px-2 rounded transition-colors cursor-default">
                    &nbsp;&nbsp;<span className={currentTheme.property}>goal</span>: <span className={currentTheme.string}>"Intelligent UI"</span>
                  </div>
                )}
                {codeLines >= 7 && (
                  <div className="hover:bg-black/5 -mx-2 px-2 rounded transition-colors cursor-default">
                    {'}'}
                  </div>
                )}
                {codeLines >= 8 && (
                  <div className="hover:bg-black/5 -mx-2 px-2 rounded transition-colors cursor-default mt-2">
                    <span className={currentTheme.keyword}>export default</span> <span className={currentTheme.property}>developer</span>
                    <motion.span animate={{ opacity: [1, 0] }} transition={{ repeat: Infinity, duration: 0.8 }}>_</motion.span>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* Final Code Event */}
          <AnimatePresence>
            {showCompiled && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="bg-black/90 text-green-400 text-xs font-mono p-3 border-t border-white/10"
              >
                {'>'} identity compiled successfully
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Transition to Skills Section (Particles) */}
        <motion.div 
          className="absolute inset-0 z-20 pointer-events-none flex items-center justify-center"
          style={{ opacity: particlesOpacity }}
        >
          {/* We can simulate the dissolve effect with some falling elements */}
          <div className="relative w-full h-full">
             {Array.from({ length: 50 }).map((_, i) => (
               <motion.div
                 key={i}
                 className="absolute w-1 h-1 bg-black/40 rounded-full"
                 style={{
                   left: `${Math.random() * 100}%`,
                   top: `${Math.random() * 100}%`,
                 }}
                 animate={{
                   y: [0, Math.random() * 500 + 200],
                   opacity: [1, 0]
                 }}
                 transition={{
                   duration: Math.random() * 2 + 1,
                   repeat: Infinity,
                   ease: "linear"
                 }}
               />
             ))}
          </div>
        </motion.div>

      </div>
    </div>
  );
}
