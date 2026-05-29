import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, X, Globe, FileText } from 'lucide-react';
import { Github } from './Icons';

import { ARCHIVE_PROJECTS } from '../data/projects';

export default function AllProjectsSection({ onClose, onProjectClick }: { onClose: () => void, onProjectClick: (project: any) => void }) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Lock body scroll when overlay is active
  React.useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0, y: "100%" }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: "100%" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-0 z-[200] bg-[#F6F3EE] text-[#1C1C1C] overflow-y-auto"
      data-lenis-prevent="true"
    >
      <section 
        className="relative w-full min-h-screen py-32 md:py-48"
        onMouseLeave={() => setHoveredIndex(null)}
      >
        <button 
          onClick={onClose}
          className="fixed top-8 right-8 z-[210] w-14 h-14 rounded-full bg-black/10 border border-black/10 text-black flex items-center justify-center hover:bg-black hover:text-white transition-colors duration-300"
        >
          <X size={24} />
        </button>

        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 md:mb-32 gap-8">
            <h2 className="text-5xl md:text-8xl font-medium tracking-tight">
              Project<br/>Archive
            </h2>
            <p className="text-neutral-600 max-w-sm text-lg">
              A comprehensive list of my selected works, experiments, and open-source contributions over the years.
            </p>
          </div>

          <div className="flex flex-col border-t border-black/15">
            {ARCHIVE_PROJECTS.map((project, index) => (
              <motion.div
                key={index}
                className="group relative flex flex-col md:flex-row md:items-center py-12 md:py-20 border-b border-black/15 cursor-pointer"
                onMouseEnter={() => setHoveredIndex(index)}
                onClick={() => onProjectClick(project)}
                initial="initial"
                whileHover="hover"
              >
                {/* Number Section */}
                <div className="flex-shrink-0 w-16 md:w-24">
                  <span className="text-neutral-400 font-mono text-sm tracking-widest transition-colors duration-300 group-hover:text-[#B45309]">
                    0{index + 1}
                  </span>
                </div>
                
                {/* Title & Category Section */}
                <div className="flex-grow flex flex-col md:flex-row md:items-center gap-4 md:gap-12 relative z-20">
                  <motion.h3 
                    className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight text-black/60 group-hover:text-black transition-colors duration-300 whitespace-nowrap"
                    variants={{
                      initial: { x: 0 },
                      hover: { x: 20 }
                    }}
                    transition={{ type: "spring", stiffness: 150, damping: 20 }}
                  >
                    {project.title}
                  </motion.h3>
                  
                  <motion.span 
                    className="text-neutral-400 text-sm md:text-base lg:text-lg max-w-sm md:max-w-md transition-colors duration-300 group-hover:text-neutral-600 leading-relaxed"
                  >
                    {project.category}
                  </motion.span>
                </div>

                {/* Fixed Hover Image - Floating on Top */}
                <AnimatePresence>
                  {hoveredIndex === index && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8, x: -40, rotate: -4 }}
                      animate={{ opacity: 1, scale: 1, x: 20, rotate: 3 }}
                      exit={{ opacity: 0, scale: 0.9, x: 0, rotate: 0 }}
                      transition={{ type: "spring", stiffness: 200, damping: 25 }}
                      className="fixed left-[50%] md:left-[60%] top-1/2 -translate-y-1/2 w-[380px] h-[240px] rounded-2xl overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] z-[300] hidden lg:block pointer-events-none border border-white/20"
                    >
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/5" />
                    </motion.div>
                  )}
                </AnimatePresence>
                
                {/* Year & Action Section */}
                <div className="flex-shrink-0 flex items-center gap-6 md:gap-12 mt-8 md:mt-0 z-20">
                  <span className="text-neutral-500 font-mono text-sm hidden md:block group-hover:text-[#B45309] transition-colors duration-300">
                    {project.year}
                  </span>
                  
                  {/* Quick Link Icons */}
                  <div className="flex items-center gap-2 md:gap-4">
                    {project.github && (
                      <a 
                        href={project.github} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="p-2 rounded-full hover:bg-black hover:text-white transition-all duration-300 text-neutral-400 group-hover:text-black/40 hover:!text-white"
                        title="GitHub Repository"
                      >
                        <Github size={18} />
                      </a>
                    )}
                    {project.live && (
                      <a 
                        href={project.live} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="p-2 rounded-full hover:bg-black hover:text-white transition-all duration-300 text-neutral-400 group-hover:text-black/40 hover:!text-white"
                        title="Live Site"
                      >
                        <Globe size={18} />
                      </a>
                    )}
                    {project.docs && (
                      <a 
                        href={project.docs} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="p-2 rounded-full hover:bg-black hover:text-white transition-all duration-300 text-neutral-400 group-hover:text-black/40 hover:!text-white"
                        title="Documentation"
                      >
                        <FileText size={18} />
                      </a>
                    )}
                  </div>

                  <div className="w-14 h-14 rounded-full border border-black/10 flex items-center justify-center group-hover:bg-black group-hover:text-white transition-all duration-300 shadow-sm">
                    <ArrowUpRight className="w-6 h-6" />
                  </div>
                </div>
                
                {/* Row Hover Background */}
                <div className="absolute inset-0 bg-black/[0.01] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              </motion.div>
            ))}
          </div>
        </div>


      </section>
    </motion.div>
  );
}
