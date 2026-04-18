import React, { useEffect } from 'react';
import { ArrowRight, Github, Globe, FileText, ExternalLink } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { PROJECT_DATA } from '../data/projects';

// --- Sub-components ---

const PaperTexture = () => (
  <div className="absolute inset-0 pointer-events-none opacity-[0.03]" style={{ zIndex: 1 }}>
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <filter id="noiseFilter">
        <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
      </filter>
      <rect width="100%" height="100%" filter="url(#noiseFilter)" />
    </svg>
  </div>
);

interface ProjectCellProps {
  id: string;
  tag: string;
  headline: string;
  year: string;
  description: string;
  tech: string[];
  isFeatured?: boolean;
  achievement?: string;
  github?: string;
  live?: string;
  docs?: string;
  onClick?: () => void;
}

function ProjectCell(props: ProjectCellProps) {
  return (
    <div
      className={`group relative flex flex-col cursor-pointer overflow-hidden transition-all duration-500 ease-in-out bg-white/50 backdrop-blur-[2px] ${
        props.isFeatured
          ? 'border-t-[3.5px] border-[#1A1816] hover:bg-white hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.15)]'
          : 'border-t border-[#1A1816]/30 hover:border-[#1A1816] hover:bg-white/80 hover:shadow-2xl'
      }`}
      onClick={props.onClick}
      style={{
        transform: 'translateZ(0)',
        willChange: 'transform, background-color',
      }}
    >
      <div className={props.isFeatured ? 'p-8 md:p-10' : 'p-6 md:p-8'} style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Header: Tag & Year */}
        <div className="flex justify-between items-baseline mb-8 md:mb-10">
          <div className="flex flex-wrap items-center gap-4">
            <span className="font-mono text-[10px] md:text-[11px] tracking-[0.4em] uppercase text-[#1A1816]/60 font-black">
              {props.tag}
            </span>
            {props.achievement && (
              <span className="bg-[#B45309] text-white text-[9px] px-3 py-1 rounded-sm font-black tracking-widest uppercase shadow-sm">
                {props.achievement.includes('WINNER') ? '🏆 WINNER' : 'SELECTED'}
              </span>
            )}
          </div>
          <span className="font-mono text-[11px] md:text-[12px] font-black text-[#B45309] tracking-widest">
            {props.year}
          </span>
        </div>

        {/* Title */}
        <h3 className={`font-serif leading-[0.9] tracking-[-0.03em] text-[#1A1816] mb-6 transition-all duration-700 ease-out group-hover:tracking-tight ${
          props.isFeatured ? 'text-[clamp(32px,5vw,64px)] font-black' : 'text-[clamp(24px,3.5vw,36px)] font-black'
        }`}>
          {props.headline}
        </h3>

        {/* Description */}
        <p className={`font-mono leading-relaxed text-[#1A1816]/70 mb-8 max-w-2xl transition-colors duration-500 group-hover:text-black ${
          props.isFeatured ? 'text-sm md:text-base' : 'text-xs md:text-sm'
        }`}>
          {props.description}
        </p>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-2.5 mb-12">
          {props.tech.map(t => (
            <span key={t} className="font-mono text-[10px] tracking-widest text-[#1A1816]/40 border border-[#1A1816]/10 px-3 py-1.5 uppercase font-black group-hover:border-[#1A1816]/30 group-hover:text-[#1A1816]/60 transition-all duration-300">
              {t}
            </span>
          ))}
        </div>

        {/* Action Bar */}
        <div className="mt-auto pt-8 border-t border-[#1A1816]/10 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-3 group/cta">
              <span className="font-mono text-[11px] md:text-[12px] font-black tracking-[0.25em] uppercase text-[#1A1816]">
                View Case Study
              </span>
              <ArrowRight className="w-4 h-4 transform group-hover/cta:translate-x-2 transition-transform duration-500" />
            </div>
            <div className="h-5 w-px bg-[#1A1816]/20 hidden sm:block" />
            <div className="flex items-center gap-5">
              {props.github && <Github size={18} className="text-[#1A1816]/40 hover:text-[#1A1816] hover:scale-110 transition-all" />}
              {props.live && <Globe size={18} className="text-[#1A1816]/40 hover:text-[#1A1816] hover:scale-110 transition-all" />}
              {props.docs && <FileText size={18} className="text-[#1A1816]/40 hover:text-[#1A1816] hover:scale-110 transition-all" />}
            </div>
          </div>
          <ExternalLink className="w-5 h-5 text-[#1A1816]/10 group-hover:text-[#1A1816]/30 transition-all duration-500 transform group-hover:rotate-12" />
        </div>
      </div>
    </div>
  );
}

// --- Main Section ---

export default function ProjectsSection() {
  const navigate = useNavigate();

  useEffect(() => {
    // Inject premium fonts
    const fontId = 'broadsheet-fonts';
    if (!document.getElementById(fontId)) {
      const link = document.createElement('link');
      link.id = fontId;
      link.href = 'https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;0,800;0,900;1,400&family=IBM+Plex+Mono:wght@300;400;500;600;700&display=swap';
      link.rel = 'stylesheet';
      document.head.appendChild(link);
    }
  }, []);

  return (
    <section
      id="projects"
      className="relative overflow-hidden bg-[#FBF9F4] text-[#1A1816] py-20 md:py-28"
      style={{ fontFamily: "'IBM Plex Mono', monospace" }}
    >
      <PaperTexture />

      {/* Grid Overlay Lines (The Architectural Frame) */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.05]" style={{ zIndex: 1 }}>
        <div className="h-full w-px bg-black absolute left-[5%] shadow-sm" />
        <div className="h-full w-px bg-black absolute left-[50%] shadow-sm" />
        <div className="h-full w-px bg-black absolute left-[95%] shadow-sm" />
        <div className="w-full h-px bg-black absolute top-[15%] shadow-sm" />
        <div className="w-full h-px bg-black absolute top-[85%] shadow-sm" />
      </div>

      <div className="relative z-10 max-w-[1600px] mx-auto px-6 md:px-16">
        {/* The Masthead - Flagship Header */}
        <div className="border-b-[4px] border-[#1A1816] pb-10 mb-12">
          <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-12">
            <div className="max-w-4xl">
              <div className="flex items-center gap-6 mb-6">
                <span className="font-mono text-[11px] md:text-[13px] font-black tracking-[0.6em] uppercase text-[#B45309]">
                  BROADSHEET EDITION // VOL. 2026
                </span>
                <div className="h-[2px] flex-1 bg-[#1A1816]/10" />
              </div>
              <h2
                className="font-serif text-[clamp(48px,10vw,120px)] font-black leading-[0.75] tracking-[-0.05em] uppercase cursor-pointer hover:text-[#B45309] transition-colors duration-300"
                onClick={() => navigate('/projects')}
                role="link"
                aria-label="Open full projects page"
              >
                Projects
              </h2>
            </div>
            
            <div className="flex flex-col gap-8 xl:text-right">
              <div className="font-mono text-[13px] md:text-[15px] leading-relaxed max-w-[340px] xl:ml-auto font-medium">
                <span className="font-black text-[#1A1816]">ARCHIVE STATISTICS:</span><br />
                88 Systems Built // Full Stack Architecture // Deep AI Integration
              </div>
              <div className="flex items-center xl:justify-end gap-10 border-t-2 border-[#1A1816]/20 pt-6">
                <div className="text-center group">
                  <div className="font-serif italic text-2xl font-black group-hover:text-[#B45309] transition-colors">24</div>
                  <div className="font-mono text-[9px] uppercase tracking-widest text-[#1A1816]/50 font-bold">Deployments</div>
                </div>
                <div className="text-center group">
                  <div className="font-serif italic text-2xl font-black group-hover:text-[#B45309] transition-colors">99.9%</div>
                  <div className="font-mono text-[9px] uppercase tracking-widest text-[#1A1816]/50 font-bold">Resilience</div>
                </div>
                <div className="text-center group">
                  <div className="font-serif italic text-2xl font-black group-hover:text-[#B45309] transition-colors">8x</div>
                  <div className="font-mono text-[9px] uppercase tracking-widest text-[#1A1816]/50 font-bold">AI Core</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* The Broadsheet Grid - High Density Architecture */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[#1A1816]/10 border border-[#1A1816]/20 overflow-hidden shadow-[0_50px_100px_-30px_rgba(0,0,0,0.2)]">
          {/* Row 1: The Major Headlines */}
          <div className="bg-[#FBF9F4] md:border-r border-[#1A1816]/10">
            <ProjectCell
              {...PROJECT_DATA[0]}
              isFeatured
              onClick={() => window.open('/project/' + PROJECT_DATA[0].id, '_blank')}
            />
          </div>
          <div className="bg-[#FBF9F4]">
            <ProjectCell
              {...PROJECT_DATA[1]}
              isFeatured
              onClick={() => window.open('/project/' + PROJECT_DATA[1].id, '_blank')}
            />
          </div>

          {/* Row 2: Secondary Features - 3 Column Layout */}
          <div className="md:col-span-2 grid grid-cols-1 lg:grid-cols-3 gap-px bg-[#1A1816]/10">
            <div className="bg-[#FBF9F4]">
              <ProjectCell
                {...PROJECT_DATA[2]}
                onClick={() => window.open('/project/' + PROJECT_DATA[2].id, '_blank')}
              />
            </div>
            <div className="bg-[#FBF9F4]">
              <ProjectCell
                {...PROJECT_DATA[3]}
                onClick={() => window.open('/project/' + PROJECT_DATA[3].id, '_blank')}
              />
            </div>
            <div className="bg-[#FBF9F4]">
              <ProjectCell
                {...PROJECT_DATA[4]}
                onClick={() => window.open('/project/' + PROJECT_DATA[4].id, '_blank')}
              />
            </div>
          </div>
        </div>

        {/* The Editorial Footer */}
        <div className="mt-28 flex flex-col items-center">
          <div className="flex items-center gap-8 mb-12">
            <div className="w-16 md:w-32 h-px bg-[#1A1816]/20" />
            <span className="font-mono text-[10px] uppercase tracking-[0.5em] text-[#1A1816]/40 font-bold">End of Preview</span>
            <div className="w-16 md:w-32 h-px bg-[#1A1816]/20" />
          </div>
          <button
            onClick={() => navigate('/projects')}
            className="group flex flex-col items-center gap-8"
          >
            <div className="relative overflow-hidden">
               <span className="block font-mono text-[12px] md:text-[14px] font-black tracking-[0.5em] uppercase text-[#1A1816] group-hover:text-[#B45309] transition-colors duration-500">
                Access Full Project Index
              </span>
              <div className="absolute bottom-0 left-0 w-full h-px bg-[#B45309] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left" />
            </div>
            <div className="w-20 h-20 rounded-full border-2 border-[#1A1816]/10 flex items-center justify-center group-hover:bg-[#1A1816] group-hover:text-white group-hover:border-[#1A1816] transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] transform group-hover:scale-110 shadow-lg">
              <ArrowRight className="w-8 h-8 transform group-hover:translate-x-1 transition-transform" />
            </div>
          </button>
        </div>
      </div>
    </section>
  );
}
