import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const EDUCATION_DATA = [
  {
    type: "Degree",
    degree: "B.E in Computer Engineering",
    institution: "Swaminarayan University, Kalol, Gujarat",
    duration: "2025 — 2029",
    status: "1st Year (Pursuing)",
    performance: {
      label: "CGPA",
      value: "9.3",
      note: "Top Tier"
    },
    focusAreas: [
      "Data Structures & Algorithms",
      "Database Management Systems",
      "System Design & Architecture",
      "AI & Machine Learning",
      "Full Stack Development",
      "Operating Systems"
    ]
  },
  {
    type: "HSCE",
    degree: "Higher Secondary Education (12th)",
    institution: "Shakti Higher Secondary School, Rajkot",
    duration: "Completed in 2025",
    status: "Gujarat Board (GSEB)",
    performance: {
      label: "Result",
      value: "12th",
      note: "Science Stream"
    },
    focusAreas: ["Mathematics", "Physics", "Chemistry", "Computer Science"]
  },
  {
    type: "SSCE",
    degree: "Secondary Education (10th)",
    institution: "SMT J.V. GEMS, Porbandar",
    duration: "Completed in 2023",
    status: "Gujarat Board (GSEB)",
    performance: {
      label: "Result",
      value: "10th",
      note: "Distinction"
    },
    focusAreas: ["Mathematics", "Science", "English", "Social Science"]
  }
];

export default function EducationSection() {
  const containerRef = useRef<HTMLElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section 
      id="education" 
      ref={containerRef}
      className="relative w-full py-24 md:py-32 bg-[#F6F3EE] overflow-hidden"
    >
      <motion.div 
        className="max-w-4xl mx-auto px-6"
        style={{ y, opacity }}
      >
        {/* Section Header */}
        <div className="mb-16 md:mb-24 text-center md:text-left">
          <h2 className="text-[10px] md:text-xs font-bold tracking-[0.4em] uppercase text-[#B45309] mb-4">
            Academic Foundation
          </h2>
          <h3 className="text-4xl sm:text-6xl md:text-8xl font-bold tracking-tighter text-black uppercase leading-none">
            Education
          </h3>
        </div>

        {/* Education Timeline */}
        <div className="flex flex-col gap-12 md:gap-20">
          {EDUCATION_DATA.map((item, idx) => (
            <div key={idx} className="relative group">
              {/* Decorative Blur Background */}
              <div className="absolute -inset-4 bg-white/20 rounded-[2rem] blur-xl opacity-0 group-hover:opacity-100 transition-all duration-700" />
              
              <div className="relative bg-white border border-black/5 p-8 md:p-12 rounded-[2rem] shadow-sm hover:shadow-xl transition-all duration-300 will-change-transform">
                <div className="flex flex-col md:flex-row justify-between items-start gap-8">
                  
                  {/* Primary Info */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="px-3 py-1 bg-[#F6F3EE] rounded-full text-[10px] font-bold text-black/40 uppercase tracking-widest">
                        {item.duration}
                      </div>
                      <div className="text-[10px] font-bold text-[#B45309] uppercase tracking-widest">
                        {item.status}
                      </div>
                    </div>
                    
                    <h4 className="text-3xl md:text-5xl font-serif italic mb-4 text-black leading-tight">
                      {item.degree}
                    </h4>
                    
                    <p className="text-lg md:text-xl font-mono text-black/60 tracking-tight mb-8">
                      {item.institution}
                    </p>

                    {/* Focus Areas Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-4 gap-x-4 border-t border-black/5 pt-8">
                      {item.focusAreas.map((area, fIdx) => (
                        <div key={fIdx} className="flex items-center gap-2">
                          <div className="w-1 h-1 rounded-full bg-[#B45309]/30" />
                          <span className="text-[12px] font-medium text-black/60 tracking-tight">{area}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Performance Indicator */}
                  <div className="w-full md:w-auto flex md:flex-col items-center md:items-end justify-between md:justify-start gap-2 pt-4 md:pt-0 border-t md:border-t-0 border-black/5">
                    <div className="text-right mt-4 md:mt-0">
                      <span className="block text-[10px] font-bold tracking-[0.2em] uppercase text-black/30 mb-1">
                        {item.performance.label}
                      </span>
                      <div className="text-4xl md:text-7xl font-bold tracking-tighter text-black leading-none">
                        {item.performance.value}
                      </div>
                      <span className="text-[10px] font-bold text-[#B45309] uppercase tracking-widest mt-2 block">
                        {item.performance.note}
                      </span>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Credibility Footer */}
        <div className="mt-20 flex items-center justify-between border-t border-black/5 pt-8 px-4 opacity-40 grayscale group-hover:grayscale-0 transition-all duration-700">
           <span className="text-[10px] font-mono uppercase tracking-widest">Official Academic Ledger</span>
           <div className="flex gap-8">
              <span className="text-[10px] font-mono tracking-widest uppercase">Verified 2026</span>
              <span className="text-[10px] font-mono tracking-widest uppercase">Honors List</span>
           </div>
        </div>
      </motion.div>
    </section>
  );
}
