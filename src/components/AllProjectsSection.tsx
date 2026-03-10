import React, { useState, useRef, useEffect } from 'react';
import { motion, useSpring, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, X } from 'lucide-react';

const ARCHIVE_PROJECTS = [
  {
    title: "Nexus AI",
    category: "Generative AI Workspace",
    year: "2024",
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1000&auto=format&fit=crop"
  },
  {
    title: "AgriCert",
    category: "Blockchain Platform",
    year: "2023",
    image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?q=80&w=1000&auto=format&fit=crop"
  },
  {
    title: "Lumina Health",
    category: "Telemedicine App",
    year: "2023",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=1000&auto=format&fit=crop"
  },
  {
    title: "Aura OS",
    category: "Web Desktop Interface",
    year: "2023",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000&auto=format&fit=crop"
  },
  {
    title: "Orbit Finance",
    category: "DeFi Exchange",
    year: "2022",
    image: "https://images.unsplash.com/photo-1639762681485-074b7f4ec051?q=80&w=1000&auto=format&fit=crop"
  },
  {
    title: "Vanguard",
    category: "E-Commerce Experience",
    year: "2022",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1000&auto=format&fit=crop"
  },
  {
    title: "Echo",
    category: "Social Audio Platform",
    year: "2021",
    image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1000&auto=format&fit=crop"
  }
];

export default function AllProjectsSection({ onClose }: { onClose: () => void }) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const mouseX = useSpring(0, { stiffness: 150, damping: 20 });
  const mouseY = useSpring(0, { stiffness: 150, damping: 20 });

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: "100%" }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: "100%" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-0 z-[200] bg-[#0E0F14] text-white overflow-y-auto"
    >
      <section 
        ref={containerRef}
        className="relative w-full min-h-screen py-32 md:py-48"
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setHoveredIndex(null)}
      >
        <button 
          onClick={onClose}
          className="fixed top-8 right-8 z-[210] w-14 h-14 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white flex items-center justify-center hover:bg-white hover:text-black transition-colors duration-300"
        >
          <X size={24} />
        </button>

        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 md:mb-32 gap-8">
            <h2 className="text-5xl md:text-8xl font-medium tracking-tight">
              Project<br/>Archive
            </h2>
            <p className="text-neutral-400 max-w-sm text-lg">
              A comprehensive list of my selected works, experiments, and open-source contributions over the years.
            </p>
          </div>

          <div className="flex flex-col border-t border-white/10">
            {ARCHIVE_PROJECTS.map((project, index) => (
              <motion.div
                key={index}
                className="group relative flex flex-col md:flex-row md:items-center justify-between py-8 md:py-12 border-b border-white/10 cursor-pointer"
                onMouseEnter={() => setHoveredIndex(index)}
                initial="initial"
                whileHover="hover"
              >
                <div className="flex items-center gap-8 md:gap-16 z-10">
                  <span className="text-neutral-500 font-mono text-sm md:text-base transition-colors duration-300 group-hover:text-[#B45309]">
                    0{index + 1}
                  </span>
                  <motion.h3 
                    className="text-3xl md:text-6xl font-medium tracking-tight text-white/70 group-hover:text-white transition-colors duration-300"
                    variants={{
                      initial: { x: 0 },
                      hover: { x: 20 }
                    }}
                    transition={{ type: "spring", stiffness: 200, damping: 20 }}
                  >
                    {project.title}
                  </motion.h3>
                </div>
                
                <motion.div 
                  className="flex items-center gap-8 mt-4 md:mt-0 pl-14 md:pl-0 z-10"
                  variants={{
                    initial: { x: 0 },
                    hover: { x: -20 }
                  }}
                  transition={{ type: "spring", stiffness: 200, damping: 20 }}
                >
                  <span className="text-neutral-400 text-sm md:text-lg group-hover:text-white/80 transition-colors duration-300">{project.category}</span>
                  <span className="text-neutral-500 font-mono text-sm md:text-base hidden md:block group-hover:text-white/60 transition-colors duration-300">{project.year}</span>
                  <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-colors duration-300">
                    <ArrowUpRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Floating Image Reveal (Desktop Only) */}
        <div className="hidden md:block pointer-events-none fixed top-0 left-0 w-full h-full z-0 overflow-hidden">
          <motion.div
            className="absolute w-[350px] h-[250px] rounded-2xl overflow-hidden shadow-2xl"
            style={{
              x: mouseX,
              y: mouseY,
              translateX: "-50%",
              translateY: "-50%",
            }}
            initial={{ opacity: 0, scale: 0.5, rotate: -5 }}
            animate={{ 
              opacity: hoveredIndex !== null ? 0.6 : 0, 
              scale: hoveredIndex !== null ? 1 : 0.5,
              rotate: hoveredIndex !== null ? 0 : -5
            }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            {ARCHIVE_PROJECTS.map((project, index) => (
              <img
                key={index}
                src={project.image}
                alt={project.title}
                className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500"
                style={{ opacity: hoveredIndex === index ? 1 : 0 }}
              />
            ))}
            {/* Overlay to ensure text readability if it goes behind */}
            <div className="absolute inset-0 bg-black/20" />
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
}
