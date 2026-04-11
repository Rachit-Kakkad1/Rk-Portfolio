import React, { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, X, ExternalLink, Github, FileText, Globe, ChevronLeft, ChevronRight, MousePointerClick, Eye, EyeOff } from 'lucide-react';
import { hackathons, HackathonData } from '../data/projects';
import AgriCertDetail from './AgriCertDetail';
import COSDetail from './COSDetail';
import PLMDetail from './PLMDetail';
import ThreatLensDetail from './ThreatLensDetail';

// ==========================================
// KINETIC FLIP CARD COMPONENT
// ==========================================
function KineticFlipCard({ hack, index, isSpan2Type, onClick }: { hack: HackathonData; index: number; isSpan2Type: 'col-span-1' | 'col-span-2' | 'row-span-2'; onClick: () => void }) {
  const [showGallery, setShowGallery] = useState(false);
  const [currentImg, setCurrentImg] = useState(0);

  // Determine span classes for bento grid layout
  const spanClass = 
    isSpan2Type === 'col-span-2' ? 'md:col-span-2' : 
    isSpan2Type === 'row-span-2' ? 'md:row-span-2 md:col-span-1' : 
    'md:col-span-1';

  // Collect all images for the slideshow
  const allImages: string[] = [];
  if (hack.images) allImages.push(...hack.images);
  if (hack.image && !allImages.includes(hack.image)) allImages.unshift(hack.image);
  if (allImages.length === 0) allImages.push(''); // Fallback

  // Slideshow interval
  useEffect(() => {
    if (!showGallery || allImages.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentImg(prev => (prev + 1) % allImages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [showGallery, allImages.length]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className={`group relative h-full min-h-[500px] ${spanClass} cursor-pointer w-full rounded-[24px] overflow-hidden bg-white/90 border border-black/5 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col`}
      onClick={onClick}
    >
      {/* ─── GALLERY VIEW (ON) ─── */}
      <AnimatePresence>
        {showGallery && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 z-40 bg-[#1A1816]"
          >
            {allImages[currentImg] ? (
              <AnimatePresence mode="popLayout">
                <motion.img 
                  key={currentImg}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8 }}
                  src={allImages[currentImg]} 
                  alt={`${hack.project} view`} 
                  className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-luminosity" 
                  loading="lazy"
                  decoding="async"
                />
              </AnimatePresence>
            ) : (
              <div className="absolute inset-0 bg-[#1A1816] flex items-center justify-center p-8 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-white/10 via-[#1A1816] to-[#1A1816]">
                <div className="border border-white/10 w-full h-full flex items-center justify-center rounded-xl relative overflow-hidden">
                  <span className="font-mono text-white/30 text-sm uppercase tracking-[0.4em]">Official Record</span>
                </div>
              </div>
            )}
            
            {/* Cinematic Gradient for Text Blending */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent mix-blend-multiply" />

            {/* Float EyeOff Button */}
            <div className="group/eyeoff absolute top-6 right-6 md:top-8 md:right-8 z-50">
              <button
                onClick={(e) => { e.stopPropagation(); setShowGallery(false); }}
                className="p-2.5 bg-black/20 backdrop-blur-md rounded-full shadow-lg border border-white/20 text-white hover:bg-[#B45309] transition-all duration-300"
                aria-label="Return to Details"
              >
                <EyeOff size={18} />
              </button>
              {/* Tooltip Hint */}
              <div className="absolute top-14 right-0 px-3 py-1.5 bg-white text-[#1A1816] text-[9px] font-bold font-mono tracking-[0.2em] uppercase rounded shadow-xl opacity-0 pointer-events-none group-hover/eyeoff:opacity-100 group-hover/eyeoff:translate-y-1 transition-all duration-300 whitespace-nowrap z-50">
                Hide Certificates
                <div className="absolute -top-1 right-4 w-2 h-2 bg-white rotate-45" />
              </div>
            </div>
            
            {/* Blended Title Content */}
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 z-50 pointer-events-none">
              <p className="font-mono text-[11px] md:text-[12px] text-[#B45309] uppercase tracking-[0.3em] font-black drop-shadow-md mb-3">{hack.project}</p>
              <h3 className="text-3xl lg:text-[clamp(1.8rem,3vw,3rem)] font-black tracking-tighter text-white leading-[1.05] drop-shadow-2xl">{hack.title}</h3>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── DEFAULT DETAILS VIEW (OFF) ─── */}
      <div className={`relative flex-1 p-6 md:p-8 flex flex-col transition-opacity duration-500 z-10 ${showGallery ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
        {/* Subtle noise texture */}
        <div className="absolute inset-0 opacity-[0.015] pointer-events-none mix-blend-overlay" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }} />
        
        {/* Achievement Badge + Social Links */}
        <div className="flex flex-wrap justify-between items-start gap-3 mb-5 relative z-30 w-full">
          <div className="px-3 md:px-4 py-2 bg-[#1A1816] text-[#F5F2ED] rounded-lg shadow-[4px_4px_0px_#B45309] shrink-0 pointer-events-none">
            <span className="text-[9px] md:text-[10px] font-black tracking-[0.2em] uppercase leading-tight block">{hack.achievement}</span>
          </div>
          <div className="flex items-center gap-1 md:gap-2 ml-auto shrink-0">
            {(hack.links?.github || hack.links?.live || hack.links?.docs) && (
              <div className="flex items-center gap-1 md:gap-1.5 bg-white/80 backdrop-blur-md p-1 md:p-1.5 rounded-full border border-black/10 shadow-sm pointer-events-auto shrink-0">
                {hack.links?.github && (
                  <a href={hack.links.github} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()}
                    className="p-1.5 md:p-2 rounded-full text-[#1A1816]/50 hover:bg-[#1A1816] hover:text-[#F5F2ED] transition-all duration-300 cursor-pointer" title="GitHub">
                    <Github className="w-4 h-4 md:w-4 md:h-4" />
                  </a>
                )}
                {hack.links?.live && (
                  <a href={hack.links.live} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()}
                    className="p-1.5 md:p-2 rounded-full text-[#1A1816]/50 hover:bg-[#1A1816] hover:text-[#F5F2ED] transition-all duration-300 cursor-pointer" title="Live Site">
                    <Globe className="w-4 h-4 md:w-4 md:h-4" />
                  </a>
                )}
                {hack.links?.docs && (
                  <a href={hack.links.docs} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()}
                    className="p-1.5 md:p-2 rounded-full text-[#1A1816]/50 hover:bg-[#1A1816] hover:text-[#F5F2ED] transition-all duration-300 cursor-pointer" title="Documentation">
                    <FileText className="w-4 h-4 md:w-4 md:h-4" />
                  </a>
                )}
              </div>
            )}
            
            <div className="group/eye relative shrink-0 z-50">
              <button
                onClick={(e) => { e.stopPropagation(); setShowGallery(true); }}
                className="p-2.5 md:p-2.5 bg-white/80 backdrop-blur-md rounded-full shadow-sm border border-black/10 text-[#1A1816]/60 hover:bg-[#B45309] hover:border-[#B45309] hover:text-[#F5F2ED] transition-all duration-300 pointer-events-auto shrink-0"
                aria-label="View Certificate"
              >
                <Eye size={18} />
              </button>
              {/* Tooltip Hint */}
              <div className="absolute top-12 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-[#1A1816] text-[#F5F2ED] text-[9px] font-bold font-mono tracking-[0.2em] uppercase rounded shadow-lg opacity-0 pointer-events-none group-hover/eye:opacity-100 group-hover/eye:translate-y-1 transition-all duration-300 whitespace-nowrap z-50">
                Show Certificates
                <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-[#1A1816] rotate-45" />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 md:mt-12 relative z-10 w-full pointer-events-none flex flex-col justify-start">
          <div className="pointer-events-none hidden md:block">
            <p className="text-[10px] md:text-[11px] font-mono text-[#B45309] uppercase tracking-[0.2em] mb-2 font-bold line-clamp-1 border-l-2 border-[#B45309] pl-3 leading-relaxed w-full">{hack.project}</p>
            <h3 className="text-2xl lg:text-[clamp(1.5rem,2.5vw,2.5rem)] font-black tracking-tight text-[#1A1816] leading-[1.05] mb-3 w-full pr-4 line-clamp-4">{hack.title}</h3>

            {hack.longDescription && (
              <div className="w-full bg-black/[0.02] p-2.5 rounded-lg border border-black/5 mb-2">
                <p className="text-[11px] lg:text-[11px] font-mono text-[#1A1816]/60 leading-[1.6] line-clamp-2 italic">
                  "{hack.longDescription}"
                </p>
              </div>
            )}
          </div>

          <div className="pointer-events-none block md:hidden mt-4">
             <p className="text-[10px] font-mono text-[#B45309] uppercase tracking-[0.2em] mb-2 font-bold line-clamp-1 border-l-2 border-[#B45309] pl-3 leading-relaxed w-full">{hack.project}</p>
             <h3 className="text-3xl font-black tracking-tight text-[#1A1816] leading-[1.05] mb-3 w-full pr-4 line-clamp-4">{hack.title}</h3>
          </div>

          <div className={`flex ${isSpan2Type === 'col-span-2' ? 'flex-row flex-wrap gap-2 lg:gap-4' : 'flex-col gap-2'} mb-4 lg:mb-6 mt-4 w-full`}>
            {hack.highlights.slice(0, 3).map((h, i) => (
              <div key={i} className="flex items-start gap-2.5 w-full">
                <div className="w-1 h-1 lg:w-1.5 lg:h-1.5 rounded-full bg-[#1A1816]/20 mt-1.5 lg:mt-2 shrink-0 group-hover:bg-[#B45309] transition-colors duration-500" />
                <span className="text-[12px] lg:text-[13px] font-mono font-medium text-[#1A1816]/60 leading-tight line-clamp-1 w-full">{h}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-1.5 pt-4 lg:pt-5 border-t border-black/5 relative w-full mt-auto">
            {hack.tech.map(t => (
              <span key={t} className="px-2 lg:px-2.5 py-1 bg-black/5 rounded-md border border-black/5 text-[9px] lg:text-[10px] font-mono font-bold text-[#1A1816]/50 uppercase tracking-wider shrink-0 break-words">{t}</span>
            ))}
            
            <motion.div 
              initial={{ opacity: 0, x: -10 }}
              whileHover={{ scale: 1.05 }}
              animate={{ opacity: 1, x: 0 }}
              className="ml-auto hidden md:flex items-center gap-1.5 text-[#B45309] font-mono text-[9px] font-bold tracking-[0.2em] uppercase bg-white/80 backdrop-blur pl-2 pointer-events-auto cursor-pointer group-hover:underline shrink-0"
              onClick={onClick}
            >
              Inspect <MousePointerClick size={12} />
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}


// ==========================================
// HACKATHON DETAIL OVERLAY (Light Theme)
// ==========================================
function HackathonDetailOverlay({ hack, onClose }: { hack: HackathonData; onClose: () => void }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose]);

  // Build 5 images: use available images, pad with hero/placeholder
  const allImages: string[] = [];
  if (hack.images) allImages.push(...hack.images);
  if (hack.image && !allImages.includes(hack.image)) allImages.unshift(hack.image);
  while (allImages.length < 5 && allImages.length > 0) {
    allImages.push(allImages[allImages.length % allImages.length]);
  }
  const images = allImages.slice(0, 5);

  // Auto-rotate carousel
  useEffect(() => {
    if (images.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % images.length);
    }, 4000); // Slower, more elegant rotation
    return () => clearInterval(timer);
  }, [images.length]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      data-lenis-prevent="true"
      className="fixed inset-0 z-[200] bg-[#F5F2ED] overflow-y-auto overflow-x-hidden border-t-4 border-[#B45309]"
    >
      {/* Top Nav */}
      <div className="sticky top-0 bg-[#F5F2ED]/90 backdrop-blur-xl border-b border-black/5 px-6 md:px-12 py-5 flex items-center justify-between z-50 shadow-sm">
        <button onClick={onClose}
          className="flex items-center gap-3 text-[#1A1816]/50 hover:text-[#B45309] font-mono text-[11px] tracking-[0.2em] uppercase transition-colors cursor-pointer bg-transparent border-none font-bold">
          <ChevronLeft size={16} /> Close Insight
        </button>
        <span className="font-mono text-[10px] text-[#1A1816]/30 tracking-[0.3em] uppercase font-bold hidden md:block">Competition Record</span>
      </div>

      <div className="max-w-[1200px] mx-auto px-6 md:px-12 py-16 md:py-24">
        {/* Header */}
        <div className="mb-16 md:mb-24 flex flex-col md:flex-row gap-12 justify-between items-start">
          <div className="flex-1 max-w-3xl">
            <div className="inline-block px-4 py-2 bg-[#B45309] text-white font-mono text-[10px] uppercase font-black tracking-[0.2em] mb-6 shadow-md rounded-sm">
              {hack.achievement}
            </div>
            <h1 className="text-5xl md:text-[clamp(4rem,8vw,7rem)] font-black text-[#1A1816] tracking-tighter leading-[0.9] mb-6">{hack.project}</h1>
            <p className="font-mono text-[12px] md:text-[14px] text-[#B45309] uppercase tracking-[0.2em] font-bold">{hack.title}</p>
          </div>
          
          <div className="md:w-64 shrink-0 flex flex-col gap-4">
            {hack.links?.live && (
              <a href={hack.links.live} target="_blank" rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-[#1A1816] text-[#F5F2ED] hover:bg-[#B45309] hover:shadow-[0_8px_30px_rgba(180,83,9,0.3)] font-bold text-[11px] uppercase tracking-[0.2em] rounded-lg transition-all duration-300 transform hover:-translate-y-1">
                <Globe size={16} /> Live Deployment
              </a>
            )}
            {hack.links?.github && (
              <a href={hack.links.github} target="_blank" rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-white text-[#1A1816] font-bold text-[11px] uppercase tracking-[0.2em] rounded-lg hover:bg-white/50 border border-black/10 transition-all shadow-sm">
                <Github size={16} /> View Source
              </a>
            )}
            {hack.links?.docs && (
              <a href={hack.links.docs} target="_blank" rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-white text-[#1A1816] font-bold text-[11px] uppercase tracking-[0.2em] rounded-lg hover:bg-white/50 border border-black/10 transition-all shadow-sm">
                <FileText size={16} /> System Design
              </a>
            )}
          </div>
        </div>

        {/* 5-Image Stacked Carousel (Editorial Style) */}
        {images.length > 0 && (
          <div className="relative mb-24 h-[400px] md:h-[600px] w-full max-w-[1000px] mx-auto perspective-[2000px]">
            {images.map((img, i) => {
              const isActive = i === currentSlide;
              const offset = (i - currentSlide + images.length) % images.length;
              // A more dramatic, cinematic stack
              const scale = offset === 0 ? 1 : Math.max(0.6, 1 - offset * 0.08);
              const yOffset = offset * 24; 
              const rotationX = offset === 0 ? 0 : 5;
              const rotationZ = offset === 0 ? 0 : (offset % 2 === 0 ? 1 : -1) * offset * 2;
              const zIndex = images.length - offset;
              const opacity = offset > 3 ? 0 : 1 - offset * 0.2;

              return (
                <div
                  key={i}
                  className="absolute left-0 right-0 top-0 bottom-12 rounded-[24px] overflow-hidden border border-black/10 shadow-[0_20px_60px_rgba(0,0,0,0.1)] mx-auto max-w-[800px] bg-[#1A1816]"
                  style={{
                    transform: `translateY(${yOffset}px) translateZ(${-offset * 50}px) scale(${scale}) rotateX(${rotationX}deg) rotateZ(${rotationZ}deg)`,
                    zIndex,
                    opacity,
                    transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
                    transformStyle: 'preserve-3d'
                  }}
                >
                  <img src={img} alt={`${hack.project} ${i + 1}`} className="w-full h-full object-cover opacity-90 mix-blend-luminosity hover:mix-blend-normal transition-all duration-500" />
                  {!isActive && <div className="absolute inset-0 bg-white/20 backdrop-blur-[2px]" />}
                </div>
              );
            })}

            {/* Premium Carousel Controls */}
            {images.length > 1 && (
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 z-50 flex items-center gap-8">
                <button onClick={(e) => { e.stopPropagation(); setCurrentSlide(p => (p - 1 + images.length) % images.length); }}
                  className="w-12 h-12 rounded-full bg-white border border-black/5 flex items-center justify-center hover:bg-[#1A1816] hover:text-white shadow-lg transition-all cursor-pointer">
                  <ChevronLeft size={20} />
                </button>
                <div className="flex gap-3 px-6 py-3 bg-white/80 backdrop-blur-md rounded-full border border-black/5 shadow-sm">
                  {images.map((_, i) => (
                    <button key={i} onClick={(e) => { e.stopPropagation(); setCurrentSlide(i); }}
                      className={`h-2 rounded-full transition-all cursor-pointer border-none ${i === currentSlide ? 'w-8 bg-[#B45309]' : 'w-2 bg-[#1A1816]/20 hover:bg-[#1A1816]/40'}`} />
                  ))}
                </div>
                <button onClick={(e) => { e.stopPropagation(); setCurrentSlide(p => (p + 1) % images.length); }}
                  className="w-12 h-12 rounded-full bg-white border border-black/5 flex items-center justify-center hover:bg-[#1A1816] hover:text-white shadow-lg transition-all cursor-pointer">
                  <ChevronRight size={20} />
                </button>
              </div>
            )}
          </div>
        )}

        {/* Content Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-24">
          
          {/* Outcome (Spans 8 cols) */}
          <div className="lg:col-span-8 bg-white p-8 md:p-12 rounded-[24px] border border-black/5 shadow-sm">
            <h3 className="font-mono text-[11px] text-[#B45309] uppercase tracking-[0.2em] mb-6 font-bold flex items-center gap-3">
              <span className="w-4 h-[1px] bg-[#B45309]" /> Project Outcome
            </h3>
            <p className="text-xl md:text-3xl font-black text-[#1A1816] leading-[1.3] tracking-tight border-l-4 border-[#B45309] pl-6 md:pl-8">{hack.outcome}</p>
          </div>

          {/* Tech Stack (Spans 4 cols) */}
          <div className="lg:col-span-4 bg-[#1A1816] p-8 md:p-12 rounded-[24px] shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#B45309]/20 blur-[50px] pointer-events-none" />
            <h3 className="font-mono text-[11px] text-[#B45309] uppercase tracking-[0.2em] mb-8 font-bold flex items-center gap-3">
              <span className="w-4 h-[1px] bg-[#B45309]" /> Architecture Stack
            </h3>
            <div className="flex flex-col gap-3 relative z-10">
              {hack.tech.map(t => (
                <div key={t} className="flex justify-between items-center py-3 border-b border-white/10 group">
                  <span className="text-[14px] font-mono font-bold text-[#F5F2ED] group-hover:text-[#B45309] transition-colors">{t}</span>
                  <ArrowUpRight size={14} className="text-white/20 group-hover:text-[#B45309] transition-colors" />
                </div>
              ))}
            </div>
          </div>

          {/* Architecture Details (Spans 6 cols) */}
          {hack.longDescription && (
            <div className="lg:col-span-6 bg-white p-8 md:p-12 rounded-[24px] border border-black/5 shadow-sm">
              <h3 className="font-mono text-[11px] text-[#B45309] uppercase tracking-[0.2em] mb-6 font-bold flex items-center gap-3">
                <span className="w-4 h-[1px] bg-[#B45309]" /> System Design Overview
              </h3>
              <p className="text-[15px] md:text-[16px] text-[#1A1816]/70 leading-[1.8] font-mono">{hack.longDescription}</p>
            </div>
          )}

          {/* Primary Challenges (Spans 6 cols) */}
          {hack.challenges && hack.challenges.length > 0 && (
             <div className="lg:col-span-6 bg-[#B45309]/5 p-8 md:p-12 rounded-[24px] border border-[#B45309]/10 shadow-sm relative overflow-hidden">
             <div className="absolute -right-8 -bottom-8 font-mono text-[180px] font-black text-[#B45309]/5 pointer-events-none leading-none">?</div>
             <h3 className="font-mono text-[11px] text-[#B45309] uppercase tracking-[0.2em] mb-6 font-bold flex items-center gap-3 relative z-10">
               <span className="w-4 h-[1px] bg-[#B45309]" /> Engineering Bottlenecks
             </h3>
             <div className="flex flex-col gap-4 relative z-10">
               {hack.challenges.map((c, i) => (
                 <div key={i} className="flex gap-4 p-5 bg-white rounded-xl shadow-sm border border-[#B45309]/10">
                   <div className="w-8 h-8 rounded-full bg-[#B45309] text-white flex items-center justify-center font-bold text-sm shrink-0">!</div>
                   <p className="text-[14px] text-[#1A1816] leading-[1.6] font-medium">{c}</p>
                 </div>
               ))}
             </div>
           </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-black/10 pt-12 flex flex-col md:flex-row justify-between items-center gap-6">
           <div className="flex items-center gap-4">
             <div className="w-2 h-2 rounded-full bg-[#B45309] animate-pulse" />
             <p className="font-mono text-[11px] text-[#1A1816]/60 tracking-[0.2em] uppercase font-bold">End of Insight</p>
           </div>
           <button onClick={onClose} className="px-8 py-3 bg-[#1A1816] text-white font-mono text-[11px] tracking-[0.2em] uppercase font-bold rounded-lg hover:bg-[#B45309] transition-colors shadow-lg">
             Return to Dashboard
           </button>
        </div>
      </div>
    </motion.div>
  );
}


// ==========================================
// MAIN COMPONENT
// ==========================================
export default function HackathonExperience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedHackathon, setSelectedHackathon] = useState<HackathonData | null>(null);
  const [showAgriCert, setShowAgriCert] = useState(false);
  const [showCOS, setShowCOS] = useState(false);
  const [showPLM, setShowPLM] = useState(false);
  const [showThreatLens, setShowThreatLens] = useState(false);

  const handleCardClick = (hack: HackathonData) => {
    if (hack.id === 6) { setShowAgriCert(true); return; }
    if (hack.id === 4) { setShowCOS(true); return; }
    if (hack.id === 3) { setShowPLM(true); return; }
    if (hack.id === 0) { setShowThreatLens(true); return; }
    setSelectedHackathon(hack);
  };

  return (
    <div ref={containerRef} className="relative w-full bg-[#F5F2ED] py-32 md:py-48 overflow-hidden text-[#1A1816] selection:bg-[#B45309] selection:text-white">
      {/* Background Architectural Grid */}
      <div className="absolute inset-0 pointer-events-none opacity-40" style={{ backgroundImage: 'linear-gradient(rgba(0,0,0,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.03) 1px, transparent 1px)', backgroundSize: '80px 80px' }} />
      <div className="absolute top-[20%] right-[-10%] w-[800px] h-[800px] bg-[radial-gradient(circle,_rgba(180,83,9,0.03)_0%,_transparent_70%)] pointer-events-none" />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12">
        {/* Editorial Header */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col gap-6 mb-24 md:mb-32"
        >
          <div className="flex items-center gap-4">
            <div className="w-2 h-2 rounded-full bg-[#B45309] shadow-[0_0_10px_#B45309]" />
            <span className="text-[#B45309] font-mono tracking-[0.3em] uppercase text-[11px] font-bold">Engineering Dashboard</span>
          </div>
          <h2 className="text-[clamp(3rem,8vw,7rem)] font-black tracking-tighter text-[#1A1816] uppercase leading-[0.85] max-w-[1200px]">
            Competition<br/>Record.
          </h2>
          <p className="text-[#1A1816]/60 max-w-xl text-[16px] md:text-[20px] font-medium leading-[1.6] mt-4">
            High-performance engineering under strict time constraints. A record of systemic problem-solving and rapid execution. Hover cards for certificates.
          </p>
        </motion.div>

        {/* Asymmetric Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 auto-rows-auto">
          {hackathons.map((hack, i) => {
            // Editorial Grid Logic:
            // 0 (ThreatLens) - Normal (col-span-1)
            // 1 (SecureID Nexus) - Spans 2 columns to break monotony
            // 2 (PLM Flow) - Tall card (row-span-2) -- simulated by css logic below
            // 3 (COS Engine) - Normal
            // 4 (LifeLens AI) - Normal
            // 5 (AgriCert) - Spans 2 columns 
            let spanType: 'col-span-1' | 'col-span-2' | 'row-span-2' = 'col-span-1';
            
            // Just for visual asymmetry (requires adjusting the grid css or tailwind config for perfect masonry, 
            // but we can simulate it cleanly with col-span-2 on specific indices)
            if (i === 1 || i === 5) spanType = 'col-span-2';
            
            // To make sure mobile works correctly and doesn't break, span 2 is only applied down to md breakpoint.
            return (
              <div key={hack.id} className={`w-full h-full ${spanType === 'col-span-2' ? 'lg:col-span-2' : ''}`}>
                 <KineticFlipCard 
                   hack={hack} 
                   index={i}  
                   isSpan2Type={spanType} 
                   onClick={() => handleCardClick(hack)} 
                 />
              </div>
            );
          })}
        </div>
      </div>

      {/* Detail Overlays */}
      <AnimatePresence>
        {showAgriCert && <AgriCertDetail onClose={() => setShowAgriCert(false)} />}
        {showCOS && <COSDetail onClose={() => setShowCOS(false)} />}
        {showPLM && <PLMDetail onClose={() => setShowPLM(false)} />}
        {showThreatLens && <ThreatLensDetail onClose={() => setShowThreatLens(false)} />}
        {selectedHackathon && (
          <HackathonDetailOverlay hack={selectedHackathon} onClose={() => setSelectedHackathon(null)} />
        )}
      </AnimatePresence>
    </div>
  );
}
