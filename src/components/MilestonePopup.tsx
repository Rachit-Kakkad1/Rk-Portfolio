import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';

const MILESTONE_IMAGES = [
  "/certificates/hackathons/ElectroSphere_2K26.jpg",
  "/leetcode_themed.png",
  "/certificates/hackathons/odoo/odoo-frame.jpg",
  "/certificates/hackathons/HackCrux X LNMIT.png",
  "/certificates/hackathons/National_Digital_Identity_&_Innovation_Hackathon_2025.png",
  "/certificates/hackathons/dev heat/solo-1.jpg",
  "/certificates/hackathons/odoo/odoo-wristband.png",
  "/certificates/hackathons/dev heat/solo-2.jpg",
  "/certificates/hackathons/dev heat/solo-3.jpg"
];

const MILESTONES = [
  {
    id: 1,
    title: "ElectroSphere 2K26",
    subtitle: "2nd Place Winner — Software Edition",
    description: "Secured 2nd place for ThreatLens—an ethical, AI-powered cybersecurity platform focused on vulnerability detection and secure coding practices.",
  },
  {
    id: 2,
    title: "LeetCode Knight Badge",
    subtitle: "Competitive Programming — Top 5% Global",
    description: "Achieved Knight status by maintaining a high contest rating and solving 800+ complex algorithmic challenges with optimized execution.",
  },
  {
    id: 3,
    title: "HackCrux @ LNMIT",
    subtitle: "National Finalist — Strategic Problem Solving",
    description: "Represented the core technical solving team in a national-level innovation sprint focusing on scalable system architectures.",
  },
  {
    id: 4,
    title: "National Digital Identity",
    subtitle: "Rank 4 National — IIT Madras",
    description: "Led 'API Assassins' to secure Rank 4 at IIT Madras Research Campus for building high-speed digital identity security solutions.",
  }
];

export default function MilestonePopup({ onComplete }: { onComplete: () => void }) {
  const [timeLeft, setTimeLeft] = useState(10);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (isHovered) return;
    if (timeLeft <= 0) {
      onComplete();
      return;
    }
    const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft, onComplete, isHovered]);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-[#050505] flex flex-col items-center justify-center font-sans overflow-hidden py-10"
    >
      {/* Dynamic Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[100vw] h-[50vh] bg-gradient-to-b from-[#B45309]/10 to-transparent blur-[120px]" />
      </div>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 text-center mb-8 px-6 shrink-0"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#B45309]/10 border border-[#B45309]/20 rounded-full mb-4">
          <Sparkles size={12} className="text-[#B45309]" />
          <span className="text-[9px] font-black uppercase tracking-[0.2em] text-[#B45309]">Portfolio Showreel</span>
        </div>
        <h1 className="text-2xl md:text-5xl font-black tracking-tight text-white mb-2 leading-none">
          Recent milestones that shaped me
        </h1>
        <p className="text-xs md:text-sm text-white/40 font-medium tracking-tight">
          A kinetic showcase of execution and technical engineering progress.
        </p>
      </motion.div>

      {/* Infinite Image Train (Moving Section) */}
      <div className="relative z-10 w-full overflow-hidden py-6 shrink-0">
        <motion.div 
          animate={{ x: ["0%", "-50%"] }}
          transition={{ 
            duration: 35, 
            repeat: Infinity, 
            ease: "linear",
            repeatType: "loop"
          }}
          className="flex flex-nowrap gap-6 w-max px-6"
        >
          {[...MILESTONE_IMAGES, ...MILESTONE_IMAGES].map((img, index) => (
            <div
              key={index}
              className="relative w-[300px] md:w-[450px] aspect-[16/10] rounded-[2.5rem] overflow-hidden border border-[#B45309]/20 shadow-2xl flex-shrink-0"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/60 to-transparent z-10" />
              <img 
                src={img} 
                className="w-full h-full object-cover grayscale-[30%] hover:grayscale-0 transition-all duration-700" 
                alt="Hackathon Milestone" 
              />
            </div>
          ))}
        </motion.div>
      </div>

      {/* Static Content Grid (Sticky Section) */}
      <div className="relative z-10 w-full max-w-[1400px] grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6 px-6 mt-10">
        {MILESTONES.map((item) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 + item.id * 0.1 }}
            className="bg-[#0a0a0a]/95 backdrop-blur-xl border border-[#B45309]/30 rounded-[2.2rem] p-6 md:p-8 shadow-2xl hover:border-[#B45309]/60 transition-all duration-500"
          >
            <div className="text-[#B45309] font-black text-[10px] md:text-xs mb-1 font-mono tracking-widest">LOG #{item.id}</div>
            <h3 className="text-base md:text-xl font-black text-white mb-2 leading-tight">
              {item.title}
            </h3>
            <p className="text-[#B45309]/80 font-bold text-[9px] md:text-[10px] uppercase tracking-[0.2em] mb-4">
              {item.subtitle}
            </p>
            <p className="text-white/40 text-[10px] md:text-sm leading-relaxed font-medium">
              {item.description}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Footer / Action */}
      <motion.div className="relative z-10 pt-12 pb-6 flex flex-col items-center gap-6 shrink-0">
        <button
          onClick={onComplete}
          className="group relative flex items-center justify-center gap-4 px-12 py-5 bg-white text-black rounded-full font-black text-xs uppercase tracking-[0.2em] transition-all duration-300 hover:scale-105 active:scale-95 shadow-[0_20px_40px_rgba(255,255,255,0.1)]"
        >
          Explore Full Portfolio
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-2" />
        </button>
        <div className="flex flex-col items-center gap-2">
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/20">
            Auto-continuing in {timeLeft}s
          </span>
          <div className="w-48 md:w-64 h-1 bg-white/5 rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: "100%" }}
              animate={{ width: "0%" }}
              transition={{ duration: 10, ease: "linear" }}
              className="h-full bg-[#B45309]"
            />
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}