import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';

const MILESTONES = [
  {
    id: 1,
    title: "Hack The Tank 3.0 Winner",
    subtitle: "Won at NIT Surat",
    description: "Built FinIdeas LMS and secured the trophy after multiple offline hackathons.",
    image: "/popup assets/1.jpg",
    fallbackImage: "/certificates/hackathons/HackCrux X LNMIT/group-1.jpg"
  },
  {
    id: 2,
    title: "LeetCode Knight Badge",
    subtitle: "Competitive coding milestone",
    description: "Earned Knight badge by maintaining consistent problem solving and strong ranking performance.",
    image: "/popup assets/2.jpg",
    fallbackImage: "/certificates/hackathons/DEV_HEAT_PARTICIPATION.jpg"
  },
  {
    id: 3,
    title: "9th Rank - Charusat x Ocealab",
    subtitle: "Recent hackathon achievement",
    description: "Reached top-10 with a high-speed, execution-first build and strong solution quality.",
    image: "/popup assets/3.jpg",
    fallbackImage: "/certificates/hackathons/ElectroSphere_2K26.jpg"
  },
  {
    id: 4,
    title: "100K+ Impressions in 10 Months",
    subtitle: "Personal brand growth milestone",
    description: "Reached 100K+ impressions through consistent building, sharing, and compounding content-driven visibility.",
    image: "/popup assets/4.jpg",
    fallbackImage: "/agricert-main.jpg"
  }
];

export default function MilestonePopup({ onComplete }: { onComplete: () => void }) {
  const [timeLeft, setTimeLeft] = useState(8);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (isHovered) return;
    
    if (timeLeft <= 0) {
      onComplete();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, isHovered, onComplete]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[10000] h-svh w-screen flex flex-col items-center justify-between bg-[#050505] text-white overflow-hidden transform-gpu"
      style={{ willChange: 'opacity' }}
    >
      {/* Optimized Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
         <div className="absolute top-0 left-1/4 w-[50vw] h-[50vh] bg-[#B45309] rounded-full blur-[120px] opacity-10 transform-gpu" />
         <div className="absolute bottom-0 right-1/4 w-[50vw] h-[50vh] bg-[#B45309] rounded-full blur-[120px] opacity-10 transform-gpu" />
      </div>

      {/* Header - More Compact */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
        className="relative z-10 text-center pt-8 md:pt-12 shrink-0 px-6 transform-gpu"
        style={{ willChange: 'transform, opacity' }}
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-4 backdrop-blur-sm">
          <Sparkles size={12} className="text-[#B45309]" />
          <span className="text-[9px] font-black uppercase tracking-[0.2em] text-white/50">Milestones</span>
        </div>
        <h1 className="text-2xl md:text-5xl font-black tracking-tighter mb-2 leading-tight text-white">
          Recent milestones that shaped me
        </h1>
        <p className="text-[10px] md:text-base text-white/40 font-medium max-w-xl mx-auto tracking-tight">
          Stronger execution, better systems, and measurable progress.
        </p>
      </motion.div>

      {/* Fanned Cards Section - Responsive Height */}
      <div 
        className="relative z-10 flex-1 w-full max-w-[1200px] flex items-center justify-center"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative w-full h-[45vh] md:h-[50vh] flex items-center justify-center perspective-1000">
          {MILESTONES.map((item, index) => {
            const rotation = (index - 1.5) * 8; 
            const yOffset = Math.abs(index - 1.5) * 20; 
            const zIndex = 10 - Math.abs(index - 1.5);
            
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 150, rotate: 0, x: 0 }}
                animate={{ 
                  opacity: 1, 
                  y: yOffset, 
                  rotate: rotation,
                  x: typeof window !== 'undefined' && window.innerWidth < 768 
                      ? (index - 1.5) * 70 
                      : (index - 1.5) * 220
                }}
                whileHover={{ 
                  scale: 1.08, 
                  y: yOffset - 30, 
                  rotate: rotation * 0.3, 
                  zIndex: 50,
                  boxShadow: "0 20px 40px rgba(180,83,9,0.15)"
                }}
                transition={{ 
                  duration: 0.6, 
                  delay: 0.2 + index * 0.08,
                  type: "spring",
                  stiffness: 200,
                  damping: 25
                }}
                style={{ zIndex, willChange: 'transform, opacity' }}
                className="absolute w-[240px] md:w-[300px] aspect-[4/5] rounded-[1.5rem] md:rounded-[2rem] bg-[#0a0a0a] border border-white/10 flex flex-col overflow-hidden cursor-pointer transition-colors duration-300 hover:border-[#B45309]/50 shadow-[0_10px_30px_rgba(0,0,0,0.5)] origin-bottom transform-gpu"
              >
                {/* Image Section */}
                <div className="h-[45%] w-full relative overflow-hidden bg-black/80">
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent z-10" />
                  <img 
                    src={item.image}
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = item.fallbackImage;
                    }}
                    alt={item.title} 
                    className="w-full h-full object-cover opacity-80 transition-transform duration-700 hover:scale-110"
                    loading="eager"
                  />
                </div>

                {/* Content Section */}
                <div className="flex-1 p-5 md:p-6 flex flex-col relative z-20">
                  <div className="text-[#B45309] font-black text-[10px] md:text-sm mb-1 md:mb-2 font-mono">#{item.id}</div>
                  <h3 className="text-lg md:text-xl font-black leading-[1.1] mb-2 tracking-tight group-hover:text-[#B45309] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-[#B45309]/80 font-bold text-[9px] md:text-[10px] uppercase tracking-widest mb-3">
                    {item.subtitle}
                  </p>
                  <p className="text-white/50 text-xs md:text-sm leading-relaxed font-medium line-clamp-3">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Footer / Action - Compact */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="relative z-10 pb-6 md:pb-10 shrink-0 flex flex-col items-center gap-4 transform-gpu"
        style={{ willChange: 'transform, opacity' }}
      >
        <button
          onClick={onComplete}
          className="group relative flex items-center justify-center gap-3 px-8 py-3 bg-white/5 hover:bg-white text-white hover:text-black border border-white/10 hover:border-white rounded-full font-black text-[10px] md:text-xs uppercase tracking-[0.2em] transition-all duration-300 transform-gpu hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(255,255,255,0.05)]"
        >
          <span>Continue to Portfolio</span>
          <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform duration-300" />
        </button>

        {/* Timer Bar */}
        <div className="flex flex-col items-center gap-1.5 md:gap-2">
          <span className="text-[8px] md:text-[9px] font-black text-white/15 uppercase tracking-[0.3em]">
            Auto-continuing in {timeLeft}s
          </span>
          <div className="w-40 md:w-56 h-1 bg-white/5 rounded-full overflow-hidden border border-white/5 transform-gpu">
            <motion.div 
              initial={{ width: "100%" }}
              animate={{ width: "0%" }}
              transition={{ duration: 8, ease: "linear" }}
              className="h-full bg-gradient-to-r from-[#B45309] to-[#F59E0B]"
              style={{ willChange: 'width' }}
            />
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}