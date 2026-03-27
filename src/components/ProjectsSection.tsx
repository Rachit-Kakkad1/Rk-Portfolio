import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight, ArrowUpRight, Github, Globe, FileText } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { PROJECT_DATA, CODINGGITA_DATA, ProjectData } from '../data/projects';

interface ProjectCellProps {
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
      className={`group relative flex flex-col cursor-pointer overflow-hidden transition-all duration-300 ease-out will-change-transform ${
        props.isFeatured
          ? 'bg-white border border-[#C8C4BC]/60 hover:border-[#1A1816]/30 hover:shadow-2xl hover:-translate-y-1'
          : 'bg-white/80 border border-[#C8C4BC]/40 hover:bg-white hover:border-[#C8C4BC] hover:shadow-xl hover:-translate-y-0.5'
      }`}
      onClick={props.onClick}
      role={props.onClick ? 'button' : undefined}
      tabIndex={props.onClick ? 0 : undefined}
      onKeyDown={(e) => { if (e.key === 'Enter' && props.onClick) props.onClick(); }}
    >
      {/* Newspaper-style top rule */}
      <div style={{ height: props.isFeatured ? '3px' : '1px', background: '#1A1816' }} />

      <div className={props.isFeatured ? 'p-8 md:p-10' : 'p-6 md:p-8'} style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Tag & Year row */}
        <div className="flex justify-between items-center" style={{ marginBottom: props.isFeatured ? '16px' : '12px' }}>
          <div className="flex items-center gap-3">
            <p style={{
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: '9px',
              letterSpacing: '3px',
              color: '#8A8680',
              textTransform: 'uppercase',
              margin: 0,
              maxWidth: '180px',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis'
            }} title={props.tag}>{props.tag}</p>
            {props.achievement && (
              <span style={{
                background: '#B45309',
                color: 'white',
                fontSize: '8px',
                padding: '2px 8px',
                borderRadius: '4px',
                fontWeight: 800,
                letterSpacing: '1px',
                textTransform: 'uppercase'
              }}>🏆 WINNER</span>
            )}
          </div>
          <span style={{
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: '9px',
            letterSpacing: '2px',
            color: '#B45309',
            fontWeight: 700,
          }}>{props.year}</span>
        </div>

        {/* Thin rule */}
        <div style={{ height: '1px', background: '#E8E5DF', marginBottom: props.isFeatured ? '20px' : '14px' }} />

        {/* Headline */}
        <h3 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: props.isFeatured ? 'clamp(28px, 4vw, 44px)' : 'clamp(22px, 2.5vw, 30px)',
          fontWeight: props.isFeatured ? 900 : 700,
          color: '#1A1816',
          lineHeight: 1.05,
          letterSpacing: '-0.5px',
          margin: '0 0 14px 0',
        }}>{props.headline}</h3>

        {/* Description */}
        <p style={{
          fontFamily: "'IBM Plex Mono', monospace",
          fontSize: props.isFeatured ? '14px' : '13px',
          lineHeight: 1.7,
          color: '#6A6660',
          margin: '0 0 16px 0',
          flex: 1,
        }}>{props.description}</p>

        {/* Tech Stack Pills */}
        <div className="flex flex-wrap gap-1.5" style={{ marginBottom: '16px' }}>
          {props.tech.map(t => (
            <span key={t} style={{
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: '9px',
              letterSpacing: '1px',
              fontWeight: 600,
              color: '#6A6660',
              background: '#F5F2ED',
              border: '1px solid #E8E5DF',
              padding: '4px 10px',
              textTransform: 'uppercase',
            }}>{t}</span>
          ))}
        </div>

        {/* CTA & Quick Links */}
        <div className="flex items-center justify-between group-hover:border-[#1A1816]/20" style={{
          paddingTop: '14px',
          borderTop: '1px solid #E8E5DF',
          transition: 'border-color 0.3s ease',
        }}>
          <div className="flex items-center gap-4">
            <span style={{
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: '10px',
              letterSpacing: '2px',
              color: '#1A1816',
              fontWeight: 700,
              textTransform: 'uppercase',
            }}>View Case Study</span>
            <div className="h-3 w-px bg-black/10 hidden sm:block" />
            <div className="flex items-center gap-3">
              {props.github && (
                <a 
                  href={props.github} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="p-1.5 rounded-full hover:bg-black hover:text-white transition-all duration-300"
                  title="GitHub Repository"
                >
                  <Github size={18} />
                </a>
              )}
              {props.live && (
                <a 
                  href={props.live} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="p-1.5 rounded-full hover:bg-black hover:text-white transition-all duration-300"
                  title="Live Site"
                >
                  <Globe size={18} />
                </a>
              )}
              {props.docs && (
                <a 
                  href={props.docs} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="p-1.5 rounded-full hover:bg-black hover:text-white transition-all duration-300"
                  title="Documentation"
                >
                  <FileText size={18} />
                </a>
              )}
            </div>
          </div>
          <ArrowRight className="w-3.5 h-3.5 text-[#1A1816] transform group-hover:translate-x-1.5 transition-transform duration-300" />
        </div>
      </div>
    </div>
  );
}

function ProjectDetailOverlay({ project, onClose }: { project: ProjectData; onClose: () => void }) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const parent = canvas.parentElement;
    if (!parent) return;
    const rect = parent.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let rafId: number;
    const particles: { x: number; y: number; vx: number; vy: number; life: number; maxLife: number }[] = [];
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      if (Math.random() < 0.15) {
        particles.push({
          x: Math.random() * canvas.width,
          y: canvas.height + 5,
          vx: (Math.random() - 0.5) * 0.5,
          vy: -(0.3 + Math.random() * 0.7),
          life: 0,
          maxLife: 120 + Math.random() * 180,
        });
      }
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.life++;
        const alpha = Math.max(0, 1 - p.life / p.maxLife) * 0.08;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 1.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(26,24,22,${alpha})`;
        ctx.fill();
        if (p.life >= p.maxLife) particles.splice(i, 1);
      }
      rafId = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(rafId);
  }, []);


  const linkBtnStyle: React.CSSProperties = {
    fontFamily: "'IBM Plex Mono', monospace",
    fontSize: '11px',
    letterSpacing: '2px',
    textTransform: 'uppercase',
    color: '#1A1816',
    border: '1px solid #C8C4BC',
    padding: '14px 28px',
    background: 'transparent',
    cursor: 'pointer',
    textDecoration: 'none',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    transition: 'all 0.3s ease',
  };

  return (
    <motion.div
      ref={overlayRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 200,
        background: '#F5F2ED',
        overflowY: 'auto',
        overflowX: 'hidden',
      }}
      data-lenis-prevent="true"
    >
      {/* Floating particles background */}
      <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, pointerEvents: 'none', zIndex: 0 }}>
        <canvas ref={canvasRef} style={{ width: '100%', height: '100%', display: 'block' }} />
      </div>

      {/* Close button */}
      <button
        onClick={onClose}
        onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = '#1A1816'; (e.currentTarget as HTMLButtonElement).style.color = '#F5F2ED'; }}
        onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = 'transparent'; (e.currentTarget as HTMLButtonElement).style.color = '#1A1816'; }}
        style={{
          position: 'fixed',
          top: '32px',
          right: '32px',
          zIndex: 210,
          width: '56px',
          height: '56px',
          border: '1px solid #C8C4BC',
          background: 'transparent',
          color: '#1A1816',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: "'IBM Plex Mono', monospace",
          fontSize: '20px',
          transition: 'all 0.3s ease',
        }}
      >✕</button>

      <motion.div
        ref={contentRef}
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 30 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: 'relative',
          zIndex: 1,
          maxWidth: '1200px',
          margin: '0 auto',
          padding: 'clamp(40px, 5vw, 80px) clamp(16px, 4vw, 48px) 120px',
        }}
      >
        {/* Back link */}
        <p
          onClick={onClose}
          style={{
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: '10px',
            letterSpacing: '3px',
            color: '#8A8680',
            textTransform: 'uppercase',
            margin: '0 0 40px 0',
            cursor: 'pointer',
          }}
        >← BACK TO ALL PROJECTS</p>

        {/* Tag */}
        <p style={{
          fontFamily: "'IBM Plex Mono', monospace",
          fontSize: '10px',
          letterSpacing: '4px',
          color: '#8A8680',
          textTransform: 'uppercase',
          margin: '0 0 16px 0',
        }}>{project.tag}</p>

        {/* Headline */}
        <h1 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: 'clamp(36px, 8vw, 72px)',
          fontWeight: 900,
          color: '#1A1816',
          lineHeight: 0.95,
          letterSpacing: '-2px',
          margin: '0 0 24px 0',
        }}>{project.headline}</h1>

        {project.achievement && (
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '12px',
            background: '#B45309',
            padding: '12px 24px',
            borderRadius: '12px',
            marginBottom: '32px',
            boxShadow: '0 8px 32px rgba(180, 83, 9, 0.2)',
          }}>
            <span style={{ fontSize: '24px' }}>🏆</span>
            <div>
              <p style={{
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: '10px',
                fontWeight: 700,
                color: 'rgba(255,255,255,0.7)',
                textTransform: 'uppercase',
                margin: 0,
                letterSpacing: '2px',
              }}>PROJECT ACHIEVEMENT</p>
              <p style={{
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: '16px',
                fontWeight: 900,
                color: '#FFFFFF',
                margin: 0,
              }}>{project.achievement}</p>
            </div>
          </div>
        )}

        {/* Byline and year */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '24px', margin: '0 0 48px 0' }}>
          <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '12px', color: '#8A8680', margin: 0 }}>By Rachit Kakkad — {project.year}</p>
          <div style={{ flex: 1, height: '1px', background: '#C8C4BC' }} />
        </div>

        {/* Hero image or styled placeholder */}
        <div style={{
          width: '100%',
          height: '420px',
          overflow: 'hidden',
          margin: '0 0 64px 0',
          position: 'relative',
          background: '#E8E5DF',
        }}>
          {project.image ? (
            <img
              src={project.image}
              alt={project.headline}
              loading="lazy"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block',
              }}
            />
          ) : (
            <div style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'linear-gradient(135deg, #E8E5DF 0%, #F5F2ED 50%, #EDE9E3 100%)',
            }}>
              <span style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: '120px',
                fontWeight: 900,
                color: '#C8C4BC',
                letterSpacing: '-4px',
                opacity: 0.4,
              }}>{project.headline}</span>
            </div>
          )}
          {/* Overlay gradient */}
          <div style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '120px',
            background: 'linear-gradient(to top, #F5F2ED, transparent)',
          }} />
        </div>

        {/* Description */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'clamp(24px, 4vw, 64px)', margin: '0 0 64px 0' }}>
          <div>
            <p style={{
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: '9px',
              letterSpacing: '3px',
              color: '#8A8680',
              textTransform: 'uppercase',
              margin: '0 0 16px 0',
            }}>ABOUT THIS PROJECT</p>
            <div style={{ height: '1px', background: '#C8C4BC', margin: '0 0 20px 0' }} />
            <p style={{
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: '15px',
              lineHeight: 1.9,
              color: '#6A6660',
              margin: 0,
            }}>{project.longDescription}</p>
          </div>
          <div>
            <p style={{
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: '9px',
              letterSpacing: '3px',
              color: '#8A8680',
              textTransform: 'uppercase',
              margin: '0 0 16px 0',
            }}>THE CHALLENGE</p>
            <div style={{ height: '1px', background: '#C8C4BC', margin: '0 0 20px 0' }} />
            <p style={{
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: '14px',
              lineHeight: 1.8,
              color: '#6A6660',
              margin: '0 0 32px 0',
            }}>{project.challenge}</p>
            <p style={{
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: '9px',
              letterSpacing: '3px',
              color: '#8A8680',
              textTransform: 'uppercase',
              margin: '0 0 16px 0',
            }}>THE SOLUTION</p>
            <div style={{ height: '1px', background: '#C8C4BC', margin: '0 0 20px 0' }} />
            <p style={{
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: '14px',
              lineHeight: 1.8,
              color: '#6A6660',
              margin: 0,
            }}>{project.solution}</p>
          </div>
        </div>

        {/* Results metrics */}
        <div style={{ margin: '0 0 64px 0' }}>
          <p style={{
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: '9px',
            letterSpacing: '3px',
            color: '#8A8680',
            textTransform: 'uppercase',
            margin: '0 0 16px 0',
          }}>KEY METRICS</p>
          <div style={{ height: '1px', background: '#C8C4BC', margin: '0 0 32px 0' }} />
          <div style={{ display: 'grid', gridTemplateColumns: `repeat(${project.results.length}, 1fr)`, gap: '32px' }}>
            {project.results.map((r, i) => (
              <div key={i} style={{ borderLeft: '2px solid #1A1816', paddingLeft: '20px' }}>
                <p style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: '36px',
                  fontWeight: 700,
                  color: '#1A1816',
                  margin: '0 0 8px 0',
                  lineHeight: 1,
                }}>{r.value}</p>
                <p style={{
                  fontFamily: "'IBM Plex Mono', monospace",
                  fontSize: '11px',
                  letterSpacing: '2px',
                  color: '#8A8680',
                  textTransform: 'uppercase',
                  margin: 0,
                }}>{r.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Tech stack */}
        <div style={{ margin: '0 0 64px 0' }}>
          <p style={{
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: '9px',
            letterSpacing: '3px',
            color: '#8A8680',
            textTransform: 'uppercase',
            margin: '0 0 16px 0',
          }}>TECHNOLOGY STACK</p>
          <div style={{ height: '1px', background: '#C8C4BC', margin: '0 0 24px 0' }} />
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            {project.tech.map((t, i) => (
              <span key={i} style={{
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: '11px',
                letterSpacing: '1px',
                color: '#1A1816',
                border: '1px solid #C8C4BC',
                padding: '8px 16px',
                textTransform: 'uppercase',
              }}>{t}</span>
            ))}
          </div>
        </div>

        {/* Action links */}
        <div style={{ margin: '0 0 64px 0' }}>
          <p style={{
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: '9px',
            letterSpacing: '3px',
            color: '#8A8680',
            textTransform: 'uppercase',
            margin: '0 0 16px 0',
          }}>PROJECT LINKS</p>
          <div style={{ height: '1px', background: '#C8C4BC', margin: '0 0 24px 0' }} />
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
            {project.github && project.github !== '#' && (
              <a href={project.github} target="_blank" rel="noopener noreferrer"
                onMouseEnter={(e) => { e.currentTarget.style.background = '#1A1816'; e.currentTarget.style.color = '#F5F2ED'; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#1A1816'; }}
                style={linkBtnStyle}>◇ GITHUB</a>
            )}
            {project.live && project.live !== '#' && (
              <a href={project.live} target="_blank" rel="noopener noreferrer"
                onMouseEnter={(e) => { e.currentTarget.style.background = '#1A1816'; e.currentTarget.style.color = '#F5F2ED'; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#1A1816'; }}
                style={linkBtnStyle}>◆ LIVE SITE</a>
            )}
            {project.demoVideo && project.demoVideo !== '#' && (
              <a href={project.demoVideo} target="_blank" rel="noopener noreferrer"
                onMouseEnter={(e) => { e.currentTarget.style.background = '#1A1816'; e.currentTarget.style.color = '#F5F2ED'; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#1A1816'; }}
                style={linkBtnStyle}>▷ DEMO VIDEO</a>
            )}
            {project.docs && project.docs !== '#' && (
              <a href={project.docs} target="_blank" rel="noopener noreferrer"
                onMouseEnter={(e) => { e.currentTarget.style.background = '#1A1816'; e.currentTarget.style.color = '#F5F2ED'; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#1A1816'; }}
                style={linkBtnStyle}>▤ DOCUMENTATION</a>
            )}
            {(!project.github || project.github === '#') && (!project.live || project.live === '#') && (
              <span style={{ ...linkBtnStyle, opacity: 0.5, cursor: 'default' }}>⏳ COMING SOON</span>
            )}
          </div>
        </div>

        {/* Bottom rule */}
        <div style={{ height: '1px', background: '#C8C4BC', margin: '0 0 32px 0' }} />
        <p style={{
          fontFamily: "'IBM Plex Mono', monospace",
          fontSize: '10px',
          color: '#8A8680',
          textAlign: 'center',
          margin: 0,
        }}>PORTFOLIO OF RACHIT KAKKAD — {project.year}</p>
      </motion.div>
    </motion.div>
  );
}

function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null);

  useEffect(() => {
    if (!document.querySelector('link[href*="Playfair"]')) {
      const link = document.createElement('link');
      link.href = 'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=IBM+Plex+Mono:wght@400;500&display=swap';
      link.rel = 'stylesheet';
      document.head.appendChild(link);
    }
  }, []);

  useEffect(() => {
    if (!document.getElementById('projects-styles')) {
      const style = document.createElement('style');
      style.id = 'projects-styles';
      style.textContent = ``;
      document.head.appendChild(style);
    }
  }, []);



  return (
    <section
      id="projects"
      style={{
        position: 'relative',
        overflow: 'hidden',
        background: '#F5F2ED',
        width: '100%',
        fontFamily: "'IBM Plex Mono', monospace",
      }}
    >
      <AnimatePresence>
        {selectedProject && (
          <ProjectDetailOverlay
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
      {/* ── Layer 1: Editorial Grid Background ── */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 0,
        pointerEvents: 'none',
      }}>
        {/* Vertical column lines */}
        {['16.6667%', '33.3333%', '50%', '66.6667%', '83.3333%'].map((left, idx) => (
          <div key={idx} className="hidden lg:block" style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            left,
            width: '1px',
            background: 'rgba(200, 196, 188, 0.4)',
          }} />
        ))}
        {/* Horizontal rules */}
        {['25%', '50%', '75%'].map((top, idx) => (
          <div key={idx} className="hidden lg:block" style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top,
            height: '1px',
            background: 'rgba(200, 196, 188, 0.25)',
          }} />
        ))}
      </div>

      {/* ── Layer 2: Content (Foreground) ── */}
      <div style={{ position: 'relative', zIndex: 10 }}>

        {/* ═══ Newspaper Masthead ═══ */}
        <div style={{
          borderTop: '3px solid #1A1816',
          borderBottom: '1px solid #C8C4BC',
          padding: 'clamp(20px, 3vw, 32px) clamp(16px, 4vw, 48px)',
        }}>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
            <div>
              <p style={{
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: '9px',
                letterSpacing: '4px',
                color: '#B45309',
                textTransform: 'uppercase',
                margin: '0 0 10px 0',
                fontWeight: 700,
              }}>Portfolio Edition — 2026</p>
              <h2 style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 'clamp(28px, 5vw, 56px)',
                fontWeight: 900,
                letterSpacing: '-1px',
                color: '#1A1816',
                lineHeight: 1.05,
                margin: 0,
                maxWidth: '700px',
              }}>PROJECTS</h2>
            </div>
            <div className="hidden md:block" style={{ textAlign: 'right' }}>
              <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '10px', color: '#8A8680', margin: '0 0 4px 0' }}>08 Systems Built</p>
              <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '10px', color: '#8A8680', margin: 0 }}>Full Stack · AI · Real-Time</p>
            </div>
          </div>
          {/* Double rule under masthead */}
          <div style={{ marginTop: '16px' }}>
            <div style={{ height: '2px', background: '#1A1816' }} />
            <div style={{ height: '1px', background: '#1A1816', marginTop: '3px' }} />
          </div>
        </div>

        {/* ═══ Featured Story (Front Page) ═══ */}
        <div style={{ padding: 'clamp(24px, 4vw, 48px) clamp(16px, 4vw, 48px) 0' }}>
          <p style={{
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: '9px',
            letterSpacing: '3px',
            color: '#B45309',
            textTransform: 'uppercase',
            margin: '0 0 16px 0',
            fontWeight: 700,
          }}>◆ Featured Story</p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10">
            <ProjectCell
              tag="BLOCKCHAIN · WEB3 · AGRICULTURE"
              headline="AgriCert"
              year="2026"
              description="Blockchain-powered agricultural certification. Cryptographic trust for farmers, auditors, and consumers — all on one chain."
              tech={['React', 'Node.js', 'MongoDB', 'Solidity', 'Ethereum']}
              isFeatured={true}
              achievement={PROJECT_DATA[0].achievement}
              github={PROJECT_DATA[0].github}
              live={PROJECT_DATA[0].live}
              docs={PROJECT_DATA[0].docs}
              onClick={() => setSelectedProject(PROJECT_DATA[0])}
            />
            <ProjectCell
              tag="AI · LOCAL LLM · PRODUCTIVITY"
              headline="COS Engine"
              year="2026"
              description='Say "What was I doing?" — get your exact cognitive state back in under 1 second. 8 AI models running entirely on-device. Zero cloud.'
              tech={['Python', 'FastAPI', 'Whisper', 'FAISS', 'MiniLM']}
              isFeatured={true}
              achievement={PROJECT_DATA[5].achievement}
              github={PROJECT_DATA[5].github}
              live={PROJECT_DATA[5].live}
              docs={PROJECT_DATA[5].docs}
              onClick={() => setSelectedProject(PROJECT_DATA[5])}
            />
          </div>
        </div>

        {/* ═══ Secondary Grid ═══ */}
        <div style={{ padding: 'clamp(24px, 4vw, 48px) clamp(16px, 4vw, 48px)' }}>
          {/* Section divider */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
            <p style={{
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: '9px',
              letterSpacing: '3px',
              color: '#8A8680',
              textTransform: 'uppercase',
              margin: 0,
              flexShrink: 0,
            }}>More Projects</p>
            <div style={{ flex: 1, height: '1px', background: '#C8C4BC' }} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            <ProjectCell
              tag="ENTERPRISE · PLM · ENGINEERING"
              headline="PLM Flow"
              year="2026"
              description="Enterprise product lifecycle control. Dual-database failover, real-time SLA tracking, and ECO approvals at scale."
              tech={['React', 'Node.js', 'Supabase', 'MongoDB Atlas']}
              achievement={PROJECT_DATA[4].achievement}
              github={PROJECT_DATA[4].github}
              live={PROJECT_DATA[4].live}
              docs={PROJECT_DATA[4].docs}
              onClick={() => setSelectedProject(PROJECT_DATA[4])}
            />
            <ProjectCell
              tag="CYBERSECURITY · AI · DEVSECOPS"
              headline="ThreatLens"
              year="2026"
              description="Secure code. Clear risks. Zero exploitation. Static analysis meets AI threat modeling for teams who ship fast."
              tech={['Next.js', 'Python', 'GraphQL', 'LLM']}
              achievement={PROJECT_DATA[2].achievement}
              github={PROJECT_DATA[2].github}
              live={PROJECT_DATA[2].live}
              docs={PROJECT_DATA[2].docs}
              onClick={() => setSelectedProject(PROJECT_DATA[2])}
            />
            <ProjectCell
              tag="LOGISTICS · ANALYTICS · REAL-TIME"
              headline="FleetFlow"
              year="2026"
              description="Modern fleet intelligence. Real-time tracking, predictive analytics, and route optimization."
              tech={['Vue.js', 'Node.js', 'PostgreSQL', 'Socket.io']}
              achievement={PROJECT_DATA[3].achievement}
              github={PROJECT_DATA[3].github}
              live={PROJECT_DATA[3].live}
              docs={PROJECT_DATA[3].docs}
              onClick={() => setSelectedProject(PROJECT_DATA[3])}
            />
            <ProjectCell
              tag="AI · CLIMATE · WELLNESS"
              headline="LifeLens AI"
              year="2026"
              description="The first platform connecting personal wellness to real-time planetary health signals."
              tech={['Python', 'TensorFlow', 'React', 'FastAPI']}
              achievement={PROJECT_DATA[1].achievement}
              github={PROJECT_DATA[1].github}
              live={PROJECT_DATA[1].live}
              docs={PROJECT_DATA[1].docs}
              onClick={() => setSelectedProject(PROJECT_DATA[1])}
            />
            <ProjectCell
              tag="AUTOMATION · WORKFLOWS"
              headline="Arovia"
              year="2026"
              description="Connect everything. Automate anything. Visual workflow builder with webhook triggers and real-time execution."
              tech={['React', 'Node.js', 'Webhooks', 'REST APIs']}
              achievement={PROJECT_DATA[6].achievement}
              github={PROJECT_DATA[6].github}
              live={PROJECT_DATA[6].live}
              docs={PROJECT_DATA[6].docs}
              onClick={() => setSelectedProject(PROJECT_DATA[6])}
            />
            <ProjectCell
              tag="EDTECH · ANALYTICS · FIREBASE"
              headline="Attendify"
              year="2026"
              description="Smart attendance tracking, forecasting, bunk calculator, and productivity analytics for students."
              tech={['React', 'TypeScript', 'Firebase', 'Firestore']}
              achievement={PROJECT_DATA[7].achievement}
              github={PROJECT_DATA[7].github}
              live={PROJECT_DATA[7].live}
              docs={PROJECT_DATA[7].docs}
              onClick={() => setSelectedProject(PROJECT_DATA[7])}
            />
          </div>
        </div>

        {/* ═══ CodingGita Strip ═══ */}
        <div
          onClick={() => setSelectedProject(CODINGGITA_DATA)}
          className="group cursor-pointer"
          style={{
            background: '#1A1816',
            padding: 'clamp(16px, 2vw, 24px) clamp(16px, 4vw, 48px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '24px',
            flexWrap: 'wrap',
          }}
        >
          <div style={{ flex: 1, minWidth: '200px' }}>
            <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '9px', letterSpacing: '3px', color: '#B45309', margin: '0 0 6px 0', fontWeight: 700 }}>FEATURED BUILD ◆</p>
            <p style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(16px, 2vw, 22px)', fontWeight: 700, color: '#F5F2ED', margin: 0, lineHeight: 1.3 }}>CodingGita Auction — Real-time deterministic student auction platform</p>
          </div>
          <div style={{ textAlign: 'right', flexShrink: 0 }}>
            <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '10px', color: '#8A8680', margin: 0 }}>React 18 · TypeScript · MongoDB</p>
            <div className="flex items-center justify-end gap-4 mt-3">
              <div className="flex items-center gap-2">
                {CODINGGITA_DATA.github && CODINGGITA_DATA.github !== '#' && (
                  <a
                    href={CODINGGITA_DATA.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="p-1.5 text-white/50 hover:text-white hover:bg-white/10 rounded-full transition-all duration-300"
                    title="GitHub Repository"
                  >
                    <Github size={16} />
                  </a>
                )}
                {CODINGGITA_DATA.live && CODINGGITA_DATA.live !== '#' && (
                  <a
                    href={CODINGGITA_DATA.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="p-1.5 text-white/50 hover:text-white hover:bg-white/10 rounded-full transition-all duration-300"
                    title="Live Site"
                  >
                    <Globe size={16} />
                  </a>
                )}
                {CODINGGITA_DATA.docs && CODINGGITA_DATA.docs !== '#' && (
                  <a
                    href={CODINGGITA_DATA.docs}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="p-1.5 text-white/50 hover:text-white hover:bg-white/10 rounded-full transition-all duration-300"
                    title="Documentation"
                  >
                    <FileText size={16} />
                  </a>
                )}
              </div>
              <span style={{
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: '9px',
                letterSpacing: '2px',
                color: '#F5F2ED',
                display: 'inline-block',
                opacity: 0.7,
              }}>VIEW CASE STUDY →</span>
            </div>
          </div>
        </div>

        {/* ═══ Global CTA ═══ */}
        <div style={{
          padding: 'clamp(32px, 4vw, 64px) clamp(16px, 4vw, 48px)',
          display: 'flex',
          justifyContent: 'center',
          borderTop: '1px solid #C8C4BC',
        }}>
          <a
            href="https://github.com/Rachit-Kakkad1"
            target="_blank"
            rel="noopener noreferrer"
            className="group"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '12px',
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: '11px',
              letterSpacing: '2px',
              textTransform: 'uppercase',
              color: '#1A1816',
              border: '1px solid #C8C4BC',
              padding: '16px 32px',
              textDecoration: 'none',
              transition: 'all 0.3s ease',
              background: 'transparent',
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = '#1A1816'; (e.currentTarget as HTMLAnchorElement).style.color = '#F5F2ED'; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = 'transparent'; (e.currentTarget as HTMLAnchorElement).style.color = '#1A1816'; }}
          >
            <span>View All GitHub Repositories</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>

        {/* ═══ Bottom rule ═══ */}
        <div style={{ padding: '0 clamp(16px, 4vw, 48px)' }}>
          <div style={{ height: '2px', background: '#1A1816' }} />
          <div style={{ height: '1px', background: '#1A1816', marginTop: '3px' }} />
        </div>
      </div>

    </section>
  );
}

export default ProjectsSection;
