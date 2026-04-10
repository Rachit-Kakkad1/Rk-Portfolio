import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ProjectData } from '../data/projects';

export default function ProjectDetailOverlay({ project, onClose }: { project: ProjectData; onClose: () => void }) {
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
