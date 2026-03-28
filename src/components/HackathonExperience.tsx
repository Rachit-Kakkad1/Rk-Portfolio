import React, { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Database, Code2, ArrowUpRight, X, ExternalLink, Github, FileText, Globe } from 'lucide-react';
import { hackathons, HackathonData } from '../data/projects';

export default function HackathonExperience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedHackathon, setSelectedHackathon] = React.useState<HackathonData | null>(null);

  // Disable body scroll when side panel is open
  useEffect(() => {
    if (selectedHackathon) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [selectedHackathon]);

  const topTier = hackathons.slice(0, 2);
  const midTier = hackathons.slice(2, 4);
  const compactTier = hackathons.slice(4, 6);

  return (
    <div ref={containerRef} className="relative w-full bg-[#F6F3EE] py-24 md:py-32 overflow-hidden text-[#1A1816]">
      {/* Background Grid Pattern for "Dashboard" feel */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

      <motion.div className="relative z-10 max-w-[1400px] mx-auto px-6">
        <div className="flex flex-col gap-4 mb-16">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-[#B45309] animate-pulse" />
            <span className="text-[#B45309] font-mono tracking-[0.3em] uppercase text-[10px] font-bold">Engineering Dashboard</span>
          </div>
          <h2 className="text-[clamp(1.875rem,8vw,3rem)] font-bold tracking-tight text-[#1A1816] font-mono uppercase break-words leading-[1.1]">
            Competition_Record
          </h2>
          <p className="text-[#1A1816]/50 max-w-xl text-[clamp(0.75rem,2vw,0.875rem)] font-mono leading-relaxed">
            High-performance engineering under strict time constraints. A dashboard of elite hackathon builds, system architectures, and leadership outcomes.
          </p>
        </div>

        <div className="flex flex-col gap-10">
          {/* TOP ROW: FEATURED */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {topTier.map((hack, i) => (
              <FeaturedCard key={hack.id} hack={hack} index={i} onClick={() => setSelectedHackathon(hack)} />
            ))}
          </div>

          {/* MIDDLE ROW: STANDARD */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {midTier.map((hack, i) => (
              <StandardCard key={hack.id} hack={hack} index={i} onClick={() => setSelectedHackathon(hack)} />
            ))}
          </div>

          {/* BOTTOM ROW: COMPACT */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {compactTier.map((hack, i) => (
              <CompactCard key={hack.id} hack={hack} index={i} onClick={() => setSelectedHackathon(hack)} />
            ))}
          </div>
        </div>
      </motion.div>

      {/* SIDE PANEL */}
      <AnimatePresence>
        {selectedHackathon && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedHackathon(null)}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%', transition: { ease: 'easeInOut', duration: 0.3 } }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-full md:w-[600px] bg-[#F5F2ED] border-l border-black/10 z-50 overflow-y-auto shadow-2xl flex flex-col"
            >
              <div className="sticky top-0 bg-[#F5F2ED]/90 backdrop-blur-md border-b border-black/5 p-6 flex items-center justify-between z-10">
                <span className="font-mono text-[10px] text-[#B45309] tracking-widest uppercase font-bold">System Inspection</span>
                <button onClick={() => setSelectedHackathon(null)} className="p-2 hover:bg-black/5 rounded-full transition-colors text-[#1A1816]/50 hover:text-[#1A1816]">
                  <X size={20} />
                </button>
              </div>

              <div className="p-8 flex flex-col gap-8 flex-1">
                <div>
                  <div className="inline-block px-3 py-1 bg-[#B45309]/10 border border-[#B45309]/20 text-[#B45309] font-mono text-[10px] uppercase font-bold tracking-wider mb-4 rounded-md">
                    {selectedHackathon.achievement}
                  </div>
                  <h2 className="text-3xl font-black text-[#1A1816] mb-2 leading-tight">{selectedHackathon.project}</h2>
                  <p className="text-xs font-mono text-[#1A1816]/40 uppercase tracking-widest leading-relaxed">{selectedHackathon.title}</p>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  {selectedHackathon.links?.live && (
                    <a href={selectedHackathon.links.live} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 p-3 bg-black text-white hover:bg-black/80 font-bold text-xs uppercase tracking-wider rounded-lg transition-colors shadow-sm">
                      <ExternalLink size={14} /> Live View
                    </a>
                  )}
                  {selectedHackathon.links?.github && (
                    <a href={selectedHackathon.links.github} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 p-3 bg-white text-black font-bold text-xs uppercase tracking-wider rounded-lg hover:bg-gray-50 border border-black/10 transition-colors shadow-sm">
                      <Github size={14} /> Source
                    </a>
                  )}
                  {selectedHackathon.links?.docs && (
                    <a href={selectedHackathon.links.docs} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 p-3 bg-white text-black font-bold text-xs uppercase tracking-wider rounded-lg hover:bg-gray-50 border border-black/10 transition-colors shadow-sm col-span-2">
                      <FileText size={14} /> Documentation
                    </a>
                  )}
                </div>

                {selectedHackathon.images && selectedHackathon.images.length > 0 && (
                  <div className="flex flex-col gap-4">
                    {selectedHackathon.images.map((img, idx) => (
                      <div key={idx} className="rounded-xl overflow-hidden border border-black/10 bg-white shadow-sm flex-shrink-0">
                        <img src={img} alt={`Proof ${idx + 1}`} className="w-full h-auto object-cover max-h-[300px]" />
                      </div>
                    ))}
                  </div>
                )}

                <div>
                  <h3 className="text-xs font-mono text-[#1A1816]/40 uppercase tracking-widest mb-3 border-b border-black/10 pb-2 font-bold">Outcome</h3>
                  <p className="text-sm text-[#1A1816]/90 leading-relaxed font-bold italic border-l-2 border-[#B45309] pl-4">{selectedHackathon.outcome}</p>
                </div>

                {selectedHackathon.longDescription && (
                  <div>
                    <h3 className="text-xs font-mono text-[#1A1816]/40 uppercase tracking-widest mb-3 border-b border-black/10 pb-2 font-bold">Architecture & Execution</h3>
                    <p className="text-[13px] text-[#1A1816]/70 leading-relaxed font-mono">{selectedHackathon.longDescription}</p>
                  </div>
                )}

                {selectedHackathon.challenges && selectedHackathon.challenges.length > 0 && (
                  <div>
                    <h3 className="text-xs font-mono text-[#1A1816]/40 uppercase tracking-widest mb-3 border-b border-black/10 pb-2 font-bold">Primary Challenge</h3>
                    <div className="flex flex-col gap-2">
                      {selectedHackathon.challenges.map((challenge, i) => (
                        <p key={i} className="text-[13px] text-[#1A1816]/70 leading-relaxed font-mono flex items-start gap-2">
                          <span className="text-[#B45309] font-bold mt-0.5">!</span> {challenge}
                        </p>
                      ))}
                    </div>
                  </div>
                )}

                <div>
                  <h3 className="text-xs font-mono text-[#1A1816]/40 uppercase tracking-widest mb-3 border-b border-black/10 pb-2 font-bold">Technology Stack</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedHackathon.tech.map(t => (
                      <span key={t} className="px-3 py-1.5 bg-white border border-black/10 shadow-sm rounded-md text-[10px] font-mono font-bold text-[#1A1816]/70">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

// ==========================================
// CARD COMPONENTS
// ==========================================

function FeaturedCard({ hack, index, onClick }: { hack: HackathonData, index: number, onClick: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      onClick={onClick}
      className="group relative bg-white border border-black/5 p-6 md:p-8 rounded-2xl hover:-translate-y-1 hover:border-black/15 shadow-sm hover:shadow-xl cursor-pointer transition-all duration-300 flex flex-col h-auto min-h-[400px] overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[#B45309]/5 to-transparent blur-[60px] pointer-events-none group-hover:from-[#B45309]/15 transition-all duration-500" />
      
      <div className="flex flex-wrap justify-between items-start gap-4 mb-6 relative z-10 w-full">
        <div className="px-3 py-1.5 bg-black text-white rounded-md shadow-md shrink-0">
          <span className="text-[9px] md:text-[10px] font-black tracking-widest uppercase break-words">{hack.achievement}</span>
        </div>
        <div className="flex items-center gap-2 md:gap-3">
          {hack.links?.github && (
            <a href={hack.links.github} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} className="p-1 rounded-full text-black/20 hover:bg-black/5 hover:text-[#1A1816] transition-all duration-300">
              <Github className="w-4 h-4 md:w-5 md:h-5" />
            </a>
          )}
          {hack.links?.live && (
            <a href={hack.links.live} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} className="p-1 rounded-full text-black/20 hover:bg-black/5 hover:text-[#1A1816] transition-all duration-300">
              <Globe className="w-4 h-4 md:w-5 md:h-5" />
            </a>
          )}
          {hack.links?.docs && (
            <a href={hack.links.docs} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} className="p-1 rounded-full text-black/20 hover:bg-black/5 hover:text-[#1A1816] transition-all duration-300">
              <FileText className="w-4 h-4 md:w-5 md:h-5" />
            </a>
          )}
          <ArrowUpRight className="text-black/20 w-6 h-6 md:w-8 md:h-8 group-hover:text-[#B45309] transition-colors duration-300 ml-1 md:ml-2" />
        </div>
      </div>

      <div className="relative z-10 mt-auto">
        <p className="text-[10px] md:text-xs font-mono text-[#B45309] uppercase tracking-widest mb-2 font-bold line-clamp-2 md:line-clamp-1">{hack.title}</p>
        <h3 className="text-2xl md:text-[clamp(1.5rem,5vw,3rem)] font-black mb-4 md:mb-6 tracking-tight text-[#1A1816] leading-[1.1]">{hack.project}</h3>
        
        <div className="flex flex-col gap-2 mb-8">
          {hack.highlights.slice(0, 3).map((h, i) => (
            <div key={i} className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-black/10 group-hover:bg-[#B45309] transition-colors" />
              <span className="text-[12px] font-mono font-semibold text-[#1A1816]/60 group-hover:text-[#1A1816]/90 transition-colors">{h}</span>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap gap-2 pt-6 border-t border-black/5">
          {hack.tech.map(t => (
            <span key={t} className="text-[10px] font-mono font-bold text-[#1A1816]/40 group-hover:text-[#1A1816]/60 transition-colors">[{t}]</span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function StandardCard({ hack, index, onClick }: { hack: HackathonData, index: number, onClick: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      onClick={onClick}
      className="group relative bg-[#F5F2ED] border border-black/5 p-6 rounded-xl hover:-translate-y-1 hover:bg-white hover:border-black/10 hover:shadow-lg cursor-pointer transition-all duration-300 flex flex-col h-[280px]"
    >
      <div className="flex flex-wrap justify-between items-start gap-3 border-b border-black/5 pb-4 mb-3 w-full">
        <span className="text-[9px] font-mono font-bold text-[#1A1816]/40 tracking-widest uppercase px-2 py-1 border border-black/10 rounded bg-black/5 group-hover:bg-[#B45309]/10 group-hover:text-[#B45309] group-hover:border-[#B45309]/20 transition-all duration-300 shrink-0 max-w-[75%] break-words">
          {hack.achievement}
        </span>
        <div className="flex items-center gap-2">
          {hack.links?.github && (
            <a href={hack.links.github} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} className="p-1 hover:bg-black/5 rounded-full text-black/20 hover:text-[#1A1816] transition-all duration-300">
              <Github className="w-4 h-4" />
            </a>
          )}
          {hack.links?.live && (
            <a href={hack.links.live} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} className="p-1 hover:bg-black/5 rounded-full text-black/20 hover:text-[#1A1816] transition-all duration-300">
              <Globe className="w-4 h-4" />
            </a>
          )}
          {hack.links?.docs && (
            <a href={hack.links.docs} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} className="p-1 hover:bg-black/5 rounded-full text-black/20 hover:text-[#1A1816] transition-all duration-300">
              <FileText className="w-4 h-4" />
            </a>
          )}
          <Database className="text-black/10 w-5 h-5 group-hover:text-[#B45309] transition-colors duration-300 ml-1" />
        </div>
      </div>
      
      <p className="text-[10px] font-mono tracking-[0.15em] text-[#1A1816]/50 mb-2 uppercase line-clamp-2 font-semibold leading-relaxed">{hack.title}</p>
      <h3 className="text-2xl font-black mb-4 tracking-tight text-[#1A1816] leading-none">{hack.project}</h3>
      <p className="text-[13px] text-[#1A1816]/60 line-clamp-3 leading-relaxed italic mb-auto font-medium">"{hack.outcome.replace(/[“”]/g, '')}"</p>

      <div className="flex flex-wrap gap-2 pt-5 border-t border-black/5 mt-6">
        {hack.tech.slice(0, 4).map(t => (
          <span key={t} className="text-[10px] font-mono font-bold text-[#B45309]/80 group-hover:text-[#B45309] transition-colors">#{t}</span>
        ))}
        {hack.tech.length > 4 && <span className="text-[10px] font-mono font-bold text-[#1A1816]/30">+{hack.tech.length - 4}</span>}
      </div>
    </motion.div>
  );
}

function CompactCard({ hack, index, onClick }: { hack: HackathonData, index: number, onClick: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.3 }}
      onClick={onClick}
      className="group flex flex-col md:flex-row md:items-center justify-between p-4 bg-white/40 border border-black/5 rounded-lg hover:border-black/15 hover:bg-white hover:shadow-md cursor-pointer transition-all duration-300 gap-3"
    >
      <div className="flex items-center gap-4 min-w-0">
        <div className="w-8 h-8 rounded bg-black/5 flex items-center justify-center flex-shrink-0 group-hover:bg-[#B45309]/10 transition-colors">
          <Code2 size={14} className="text-black/30 group-hover:text-[#B45309] transition-colors" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-3">
             <h4 className="text-sm font-black text-[#1A1816] truncate">{hack.project}</h4>
             <span className="text-[8px] font-mono font-bold text-[#1A1816]/40 uppercase tracking-widest truncate max-w-[150px] hidden md:inline-block border-l px-2 border-black/10">{hack.title}</span>
          </div>
          <p className="text-[10px] font-mono font-bold text-[#b45309] truncate mt-0.5">{hack.achievement}</p>
        </div>
      </div>
      <div className="flex items-center gap-3">
         {hack.links?.github && (
           <a href={hack.links.github} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} className="p-1 hover:bg-black/5 rounded-full text-black/20 hover:text-[#1A1816] transition-all duration-300 hidden md:block">
             <Github className="w-[14px] h-[14px]" />
           </a>
         )}
         {hack.links?.live && (
           <a href={hack.links.live} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} className="p-1 hover:bg-black/5 rounded-full text-black/20 hover:text-[#1A1816] transition-all duration-300 hidden md:block">
             <Globe className="w-[14px] h-[14px]" />
           </a>
         )}
         {hack.links?.docs && (
           <a href={hack.links.docs} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} className="p-1 hover:bg-black/5 rounded-full text-black/20 hover:text-[#1A1816] transition-all duration-300 hidden md:block">
             <FileText className="w-[14px] h-[14px]" />
           </a>
         )}
         <span className="hidden lg:inline-block text-[10px] font-mono font-bold text-[#1A1816]/30 uppercase tracking-widest ml-1">{hack.tech.slice(0, 3).join(' · ')}</span>
         <ArrowUpRight size={14} className="hidden md:block text-black/10 group-hover:text-[#B45309] flex-shrink-0 transition-colors" />
      </div>
    </motion.div>
  );
}
