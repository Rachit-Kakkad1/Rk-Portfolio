import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const experiences = [
  {
    id: 1,
    date: "2025",
    title: "Entering Computer Science",
    description: "Started my computer science journey focusing on programming fundamentals and algorithmic thinking.",
    skills: ["C++", "Data Structures", "Algorithms"]
  },
  {
    id: 2,
    date: "2025",
    title: "Software Engineering Internship",
    description: "Began professional development work building modern web interfaces and collaborating using Git workflows.",
    skills: ["React", "JavaScript", "Tailwind", "Git"]
  },
  {
    id: 3,
    date: "2026",
    title: "Building Real Systems",
    description: "Developed full-stack applications including AgriCert and ThreatLens.",
    skills: ["Node.js", "Express", "MongoDB", "REST APIs"]
  },
  {
    id: 4,
    date: "2026 — Present",
    title: "AI-Driven Engineering",
    description: "Building AI-powered systems, portfolio assistants, and experimental cognitive software platforms.",
    skills: ["Next.js", "TypeScript", "AI APIs", "System Design"]
  }
];

function getCardTransforms(index: number, total: number) {
  const step = 1 / total;
  
  const inputs = [];
  const yOutputs = [];
  const scaleOutputs = [];
  const opacityOutputs = [];
  
  for (let i = 0; i <= total; i++) {
    const t = i * step;
    
    // Add a point slightly before the step for the entry animation
    if (i === index && i > 0) {
      inputs.push(t - step * 0.4);
      yOutputs.push(200); // Start lower
      scaleOutputs.push(1);
      opacityOutputs.push(0);
    }
    
    inputs.push(t);
    
    if (i < index) {
      yOutputs.push(200);
      scaleOutputs.push(1);
      opacityOutputs.push(0);
    } else if (i === index) {
      yOutputs.push(0); // Active position
      scaleOutputs.push(1);
      opacityOutputs.push(1);
    } else {
      const pushLevels = i - index;
      yOutputs.push(-40 * pushLevels); // Push up
      scaleOutputs.push(1 - (0.04 * pushLevels)); // Scale down
      opacityOutputs.push(1 - (0.2 * pushLevels)); // Fade out
    }
  }
  
  return { inputs, yOutputs, scaleOutputs, opacityOutputs };
}

export default function ExperienceSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  return (
    <section ref={containerRef} className="relative w-full bg-[#F6F3EE]" style={{ height: '400vh' }}>
      <div className="sticky top-0 w-full h-screen overflow-hidden flex items-center justify-center perspective-[1200px]">
        
        {/* Faint Background Typography */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
          <h2 className="text-[12vw] font-black tracking-tighter text-black opacity-[0.04] select-none">
            EXPERIENCE
          </h2>
        </div>

        {/* Papers Container */}
        <div className="relative w-full max-w-[600px] h-[450px] sm:h-[400px] z-10 perspective-[1200px] px-6 md:px-0">
          {experiences.map((exp, index) => {
            const { inputs, yOutputs, scaleOutputs, opacityOutputs } = getCardTransforms(index, experiences.length);
            
            const y = useTransform(scrollYProgress, inputs, yOutputs);
            const scale = useTransform(scrollYProgress, inputs, scaleOutputs);
            const opacity = useTransform(scrollYProgress, inputs, opacityOutputs);
            
            // Subtle rotation for organic feel
            const rotateZ = index % 2 === 0 ? -1 : 1;

            return (
              <motion.div
                key={exp.id}
                className="absolute top-0 left-0 right-0 mx-auto w-full bg-white rounded-2xl p-8 md:p-12 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] border border-black/5 cursor-pointer transform-gpu"
                style={{
                  y,
                  scale,
                  opacity,
                  rotateZ,
                  transformOrigin: "top center",
                  zIndex: index,
                }}
                whileHover={{
                  rotateX: 2,
                  rotateY: -2,
                  scale: 1.02,
                  boxShadow: "0 30px 50px -15px rgba(0,0,0,0.15)",
                  transition: { duration: 0.4, ease: "easeOut" }
                }}
              >
                {/* Paper Texture Overlay */}
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none rounded-2xl" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/paper-fibers.png")' }}></div>

                <div className="relative z-10">
                  <div className="text-sm font-mono text-[#B45309] mb-6 tracking-wider border-b border-black/10 pb-4">
                    {exp.date}
                  </div>
                  <h3 className="font-bold text-2xl md:text-4xl mb-4 leading-tight text-gray-900">
                    {exp.title}
                  </h3>
                  <p className="text-base md:text-lg text-gray-600 leading-relaxed mb-8">
                    {exp.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {exp.skills.map(skill => (
                      <span key={skill} className="px-3 py-1.5 bg-[#F6F3EE] text-gray-700 text-xs font-semibold rounded-lg border border-black/5">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
