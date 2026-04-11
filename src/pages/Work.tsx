import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Github, Globe, FileText, ArrowLeft, ArrowUpRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ARCHIVE_PROJECTS } from '../data/projects';
import SEO from '../components/SEO';

export default function Work() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleProjectClick = (project: any) => {
    if (project.id) {
      navigate('/project/' + project.id);
    } else if (project.live && project.live !== '#') {
      window.open(project.live, '_blank');
    } else if (project.github && project.github !== '#') {
      window.open(project.github, '_blank');
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-[#F6F3EE] text-[#1C1C1C] overflow-x-hidden pt-20"
    >
      <SEO 
        title="Projects"
        description="Explore the complete archive of Rachit Kakkad's projects, including AI systems, blockchain protocols, and high-performance web applications."
        keywords="Rachit Kakkad Projects, AI Portfolio, Web3 Projects, Full Stack Case Studies, Software Engineering Archive"
      />
      <section 
        className="relative w-full min-h-screen py-20 md:py-32"
        onMouseLeave={() => setHoveredIndex(null)}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 relative z-10">
          <button 
            onClick={() => navigate('/')}
            className="group flex items-center gap-2 mb-12 text-neutral-500 hover:text-black transition-colors duration-300 font-mono text-xs uppercase tracking-widest"
          >
            <ArrowLeft size={16} /> Back to Home
          </button>

          <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 md:mb-32 gap-8">
            <h2 className="text-5xl md:text-8xl font-black tracking-tighter uppercase leading-none">
              Project<br/>Archive
            </h2>
            <p className="text-neutral-600 max-w-sm text-lg leading-relaxed">
              A comprehensive list of my selected works, experiments, and open-source contributions over the years.
            </p>
          </div>

          <div className="flex flex-col border-t border-black/15">
            {ARCHIVE_PROJECTS.map((project, index) => (
              <motion.div
                key={index}
                className="group relative flex flex-col md:flex-row md:items-center py-12 md:py-20 border-b border-black/15 cursor-pointer"
                onMouseEnter={() => setHoveredIndex(index)}
                onClick={() => handleProjectClick(project)}
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

                {/* Arrow Section */}
                <div className="hidden md:flex flex-shrink-0 items-center justify-center w-24">
                  <motion.div
                    variants={{
                      initial: { rotate: 45, opacity: 0.2, scale: 0.8 },
                      hover: { rotate: 0, opacity: 1, scale: 1.2 }
                    }}
                    transition={{ type: "spring", stiffness: 200, damping: 20 }}
                    className="text-black"
                  >
                    <ArrowUpRight size={32} />
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="mt-32 pt-12 border-t border-black/15 flex flex-col md:flex-row justify-between items-center gap-8">
            <p className="text-neutral-500 font-mono text-xs tracking-widest uppercase">
              Curated Works 2024 — 2026
            </p>
            <div className="flex gap-8">
              <a href="https://github.com/Rachit-Kakkad1" target="_blank" rel="noopener noreferrer" className="text-black font-medium hover:text-[#B45309] transition-colors duration-300 underline underline-offset-8 decoration-black/10 hover:decoration-[#B45309]/30">GitHub</a>
              <a href="https://www.linkedin.com/in/rachit-kakkad-r29052007k" target="_blank" rel="noopener noreferrer" className="text-black font-medium hover:text-[#B45309] transition-colors duration-300 underline underline-offset-8 decoration-black/10 hover:decoration-[#B45309]/30">LinkedIn</a>
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
}
