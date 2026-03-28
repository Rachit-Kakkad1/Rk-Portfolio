import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform, motionValue } from 'framer-motion';
import { ArrowLeft, Github, Globe, FileText, ExternalLink, Activity, Database, GitMerge, FileDigit, Cpu, Layers, ShieldCheck, Maximize, ActivitySquare } from 'lucide-react';

interface PLMDetailProps {
  onClose: () => void;
}

function SectionTag({ number, label }: { number: string; label: string }) {
  return (
    <div className="flex items-center gap-4 mb-8">
      <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '11px', letterSpacing: '3px', color: '#ea580c', fontWeight: 700 }}>{number}</span>
      <div style={{ width: '40px', height: '1px', background: 'linear-gradient(to right, #ea580c, transparent)' }} />
      <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '10px', letterSpacing: '4px', color: '#1A1816', opacity: 0.4, textTransform: 'uppercase', fontWeight: 600 }}>{label}</span>
    </div>
  );
}

function FadeIn({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function BentoItem({ src, index }: { src: string; index: number }) {
  const isLarge = index === 0 || index === 2; // Feature the UI Hero and the Certificate
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`relative group rounded-2xl overflow-hidden bg-white border border-black/5 shadow-sm hover:shadow-xl transition-all duration-500 will-change-transform ${
        isLarge ? 'md:col-span-2' : 'col-span-1'
      }`}
    >
      <div className={`relative w-full ${isLarge ? 'h-[300px] md:h-[400px]' : 'h-[250px] md:h-[300px]'} bg-[#F9F8F6] p-6 md:p-10 transition-transform duration-700 group-hover:scale-[1.03]`}>
        <img 
          src={src} 
          alt="Technical Artifact" 
          className="w-full h-full object-contain filter drop-shadow-lg"
        />
        
        {/* Technical Corner Accents */}
        <div className="absolute top-4 left-4 w-4 h-4 border-t border-l border-black/10" />
        <div className="absolute bottom-4 right-4 w-4 h-4 border-b border-r border-black/10" />
      </div>
      
      {/* Glossy Overlay */}
      <div className="absolute inset-0 bg-gradient-to-tr from-black/[0.02] to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </motion.div>
  );
}

function BentoGallery({ images }: { images: string[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl mx-auto px-6">
      {images.map((src, i) => (
        <BentoItem key={i} src={src} index={i} />
      ))}
    </div>
  );
}

export default function PLMDetail({ onClose }: PLMDetailProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose]);

  const sectionStyle: React.CSSProperties = {
    maxWidth: '1100px',
    margin: '0 auto',
    padding: '0 clamp(16px, 4vw, 48px)',
  };

  const accent = '#ea580c';
  const accentBg = 'rgba(234,88,12,'; // Tailwind orange-600 baseline
  const textPrimary = '#1A1816';
  const textSecondary = 'rgba(26,24,22,0.6)';
  const textMuted = 'rgba(26,24,22,0.35)';
  const bg = '#F5F2ED';
  const cardBg = '#ffffff';
  const borderColor = 'rgba(0,0,0,0.06)';

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      data-lenis-prevent="true"
      style={{ position: 'fixed', inset: 0, zIndex: 200, background: bg, overflowY: 'auto', overflowX: 'hidden', color: textPrimary }}
    >
      {/* ─── FIXED NAV BAR ─── */}
      <div style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 210,
        background: 'rgba(245,242,237,0.85)', backdropFilter: 'blur(16px)',
        borderBottom: `1px solid ${borderColor}`,
        padding: '16px clamp(16px, 4vw, 48px)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <button onClick={onClose} style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'none', border: 'none', color: textSecondary, cursor: 'pointer', fontFamily: "'IBM Plex Mono', monospace", fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', transition: 'color 0.3s' }}
          onMouseEnter={e => (e.currentTarget.style.color = accent)}
          onMouseLeave={e => (e.currentTarget.style.color = textSecondary as string)}
        ><ArrowLeft size={16} /> Back to Projects</button>
        <div style={{ display: 'flex', gap: '12px' }}>
          {[
            { href: 'https://github.com/Rachit-Kakkad1/Odoo_X_GV_PLM', icon: <Github size={16} /> },
            { href: 'https://plm-x-odooxgv.vercel.app/', icon: <Globe size={16} /> },
            { href: 'https://docs.google.com/document/d/1Yg9hS-GvHKx78EqMVn_XZEPGbSU4UotWM1XLT5FpHpk/edit?usp=sharing', icon: <FileText size={16} /> },
          ].map((link, i) => (
            <a key={i} href={link.href} target="_blank" rel="noopener noreferrer"
              style={{ padding: '8px', borderRadius: '8px', border: `1px solid ${borderColor}`, color: textMuted, display: 'flex', alignItems: 'center', transition: 'all 0.3s', background: cardBg }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = accent; e.currentTarget.style.color = accent; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = borderColor; e.currentTarget.style.color = textMuted; }}
            >{link.icon}</a>
          ))}
        </div>
      </div>

      {/* ═══════════════════════════════════════════ */}
      {/* SECTION 1: HERO - POWER ENTRY */}
      {/* ═══════════════════════════════════════════ */}
      <section style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', position: 'relative', overflow: 'hidden', background: '#11100f' }}>
        {/* Dark Cinematic Background for Hero */}
        <div style={{ position: 'absolute', top: '15%', left: '50%', transform: 'translate(-50%, -50%)', width: '800px', height: '800px', background: `radial-gradient(circle, ${accentBg}0.15) 0%, transparent 60%)`, pointerEvents: 'none' }} />
        <div className="absolute inset-0 opacity-20 pointer-events-none mix-blend-overlay" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }} />

        <div style={{ ...sectionStyle, position: 'relative', zIndex: 10 }}>
          <motion.div initial={{ opacity: 0, y: 60 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}>
            <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '12px', letterSpacing: '5px', color: accent, textTransform: 'uppercase', marginBottom: '24px', fontWeight: 600 }}>
              Product Lifecycle & Engineering Control Matrix
            </p>
            <h1 style={{ fontSize: 'clamp(56px, 12vw, 150px)', fontWeight: 900, color: '#F5F2ED', lineHeight: 0.9, letterSpacing: '-5px', margin: '0 0 32px 0' }}>
              PLM <span style={{ color: textMuted }}>Flow</span>
            </h1>
            <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 'clamp(16px, 2.5vw, 24px)', color: 'rgba(245,242,237,0.7)', maxWidth: '800px', lineHeight: 1.6, margin: '0 0 16px 0' }}>
              Where engineering chaos becomes structured intelligence.
            </p>
            <p style={{ fontSize: 'clamp(15px, 2vw, 18px)', color: 'rgba(245,242,237,0.5)', maxWidth: '600px', lineHeight: 1.6, margin: '0 0 48px 0', borderLeft: `2px solid ${accent}`, paddingLeft: '16px' }}>
              One system. Total control. Zero ambiguity.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
              <a href="https://plm-x-odooxgv.vercel.app/" target="_blank" rel="noopener noreferrer"
                style={{ padding: '16px 32px', background: accent, color: '#ffffff', fontFamily: "'IBM Plex Mono', monospace", fontSize: '12px', letterSpacing: '2px', fontWeight: 700, textTransform: 'uppercase', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px', borderRadius: '4px', boxShadow: `0 8px 30px ${accentBg}0.3)` }}>
                <ExternalLink size={16} /> Enter Matrix
              </a>
              <a href="https://github.com/Rachit-Kakkad1/Odoo_X_GV_PLM" target="_blank" rel="noopener noreferrer"
                style={{ padding: '16px 32px', border: `1px solid rgba(255,255,255,0.1)`, color: '#F5F2ED', fontFamily: "'IBM Plex Mono', monospace", fontSize: '12px', letterSpacing: '2px', fontWeight: 700, textTransform: 'uppercase', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px', borderRadius: '4px', background: 'rgba(255,255,255,0.03)', backdropFilter: 'blur(10px)' }}>
                <Github size={16} /> Source Code
              </a>
            </div>
          </motion.div>
        </div>

        {/* Diagonal cut to transition back to light theme */}
        <div style={{ position: 'absolute', bottom: '-1px', left: 0, right: 0, height: '120px', background: bg, clipPath: 'polygon(0 100%, 100% 0, 100% 100%)' }} />
      </section>

      {/* ─── PREMIUM STACK CAROUSEL ─── */}
      <section style={{ padding: '100px 0', background: bg, overflow: 'hidden' }}>
        <div style={{ ...sectionStyle, marginBottom: '60px', textAlign: 'center' }}>
          <FadeIn>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <div style={{ width: '8px', height: '8px', background: accent, borderRadius: '2px' }} />
              <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '11px', letterSpacing: '3px', color: accent, textTransform: 'uppercase', fontWeight: 700, margin: 0 }}>
                Visual Artifacts & Capture
              </p>
            </div>
            <h2 style={{ fontSize: 'clamp(32px, 5vw, 56px)', fontWeight: 800, color: textPrimary, lineHeight: 1.1, letterSpacing: '-2px', margin: '0 0 16px 0' }}>
              Engineering Gallery
            </h2>
            <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '14px', color: textSecondary, textTransform: 'uppercase', letterSpacing: '4px', margin: 0 }}>
              Auto-Rotating Matrix
            </p>
          </FadeIn>
        </div>

        <div style={{ position: 'relative', width: '100%', padding: '0 0 60px 0' }}>
          <BentoGallery images={[
            '/certificates/hackathons/odoo/odoo-ui-hero.png',
            '/certificates/hackathons/odoo/odoo-frame.jpg',
            '/certificates/hackathons/Odoo_X_Gujarat_Vidyapith_Hackathon_26.png',
            '/certificates/hackathons/odoo/odoo-ui-features.png',
            '/certificates/hackathons/odoo/odoo-wristband.png',
          ]} />
        </div>
      </section>

      {/* ═══════════════════════════════════════════ */}
      {/* SECTION 2: THE PROBLEM */}
      {/* ═══════════════════════════════════════════ */}
      <section style={{ padding: 'clamp(80px, 10vw, 160px) 0' }}>
        <div style={sectionStyle}>
          <FadeIn>
            <SectionTag number="01" label="The Premise & Problem" />
            <h2 style={{ fontSize: 'clamp(32px, 5vw, 56px)', fontWeight: 800, color: textPrimary, lineHeight: 1.1, letterSpacing: '-1.5px', margin: '0 0 32px 0', maxWidth: '800px' }}>
              Modern hardware companies don’t fail because of bad ideas.
              <br/><span style={{ color: textMuted }}>They fail because of broken systems.</span>
            </h2>
            <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '16px', lineHeight: 1.8, color: textSecondary, maxWidth: '750px', margin: '0 0 48px 0' }}>
              Files scatter. Versions conflict. Decisions vanish. Engineering at scale is inherently chaotic, plagued by multiple "final" versions of the same file, no traceability on critical decisions, and broken communication between teams. Without structure, organizations operate in controlled chaos.
            </p>
          </FadeIn>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
            {[
              { title: 'Version Conflicts', desc: 'The "Final_v3 vs Final_v4" paradigm destroys single-source integrity.' },
              { title: 'Zero Traceability', desc: 'Critical engineering decisions are lost in Slack channels and email threads.' },
              { title: 'Broken Workflows', desc: 'Cross-functional teams lack real-time visibility into the product lifecycle.' },
            ].map((item, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div style={{ padding: '32px', border: `1px solid ${borderColor}`, borderRadius: '12px', background: cardBg }}>
                  <div style={{ width: '40px', height: '2px', background: accent, marginBottom: '24px' }} />
                  <h3 style={{ fontSize: '20px', fontWeight: 800, color: textPrimary, margin: '0 0 12px 0' }}>{item.title}</h3>
                  <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '13px', color: textSecondary, lineHeight: 1.6, margin: 0 }}>{item.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════ */}
      {/* SECTION 3: THE INSIGHT & VISION */}
      {/* ═══════════════════════════════════════════ */}
      <section style={{ padding: 'clamp(80px, 10vw, 160px) 0', background: cardBg, borderTop: `1px solid ${borderColor}`, borderBottom: `1px solid ${borderColor}` }}>
        <div style={sectionStyle}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '80px' }}>
            <FadeIn>
              <h2 style={{ fontSize: 'clamp(40px, 6vw, 72px)', fontWeight: 900, color: textPrimary, lineHeight: 1, letterSpacing: '-2px', margin: '0 0 24px 0' }}>
                "Spreadsheets are<br/><span style={{ color: accent }}>not systems.</span>"
              </h2>
              <div style={{ maxWidth: '600px' }}>
                <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '16px', lineHeight: 1.8, color: textSecondary, marginBottom: '24px' }}>
                  Excel manages data. It does not manage products. Spreadsheets lack relational integrity, fail under scale, and cannot enforce workflows.
                </p>
                <p style={{ fontSize: '20px', fontWeight: 600, color: textPrimary, lineHeight: 1.5 }}>
                  PLM becomes the Central Nervous System of product development. Not just storage. Not just dashboards. A governance layer, a decision engine, and a traceability protocol.
                </p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════ */}
      {/* SECTION 4: BREAKTHROUGH ARCHITECTURE */}
      {/* ═══════════════════════════════════════════ */}
      <section style={{ padding: 'clamp(80px, 10vw, 160px) 0' }}>
        <div style={sectionStyle}>
          <FadeIn>
            <SectionTag number="02" label="Breakthrough Architecture" />
            <h2 style={{ fontSize: 'clamp(32px, 5vw, 56px)', fontWeight: 800, color: textPrimary, lineHeight: 1.1, letterSpacing: '-1.5px', margin: '0 0 32px 0', maxWidth: '800px' }}>
              Dual-Database Failover System
            </h2>
            <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '16px', lineHeight: 1.8, color: accent, fontWeight: 700, margin: '0 0 64px 0' }}>
              "If one fails, the system continues. This is not redundancy. This is continuity engineering."
            </p>
          </FadeIn>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px' }}>
            <FadeIn delay={0.1}>
              <div style={{ padding: '40px', border: `1px solid ${borderColor}`, borderRadius: '16px', background: `linear-gradient(135deg, ${cardBg} 0%, ${bg} 100%)`, height: '100%' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
                  <Database size={32} color={accent} />
                  <h3 style={{ fontSize: '24px', fontWeight: 800, color: textPrimary, margin: 0 }}>PostgreSQL</h3>
                </div>
                <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '14px', color: textSecondary, margin: '0 0 16px 0', textTransform: 'uppercase', letterSpacing: '1px' }}>Core Relational Truth</p>
                <p style={{ fontSize: '15px', color: textSecondary, lineHeight: 1.6 }}>Enforces strict ACID compliance, relational integrity for BOMs, and deterministic state history for all engineering changes.</p>
              </div>
            </FadeIn>
            <FadeIn delay={0.2}>
              <div style={{ padding: '40px', border: `1px solid ${borderColor}`, borderRadius: '16px', background: `linear-gradient(135deg, ${cardBg} 0%, ${bg} 100%)`, height: '100%' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
                  <Layers size={32} color={accent} />
                  <h3 style={{ fontSize: '24px', fontWeight: 800, color: textPrimary, margin: 0 }}>MongoDB</h3>
                </div>
                <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '14px', color: textSecondary, margin: '0 0 16px 0', textTransform: 'uppercase', letterSpacing: '1px' }}>High-Speed Document Sync</p>
                <p style={{ fontSize: '15px', color: textSecondary, lineHeight: 1.6 }}>Acts as the real-time synchronization layer and unstructured data fallback, capturing rapid telemetric and state changes seamlessly.</p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════ */}
      {/* SECTION 5: PRODUCT CAPABILITIES */}
      {/* ═══════════════════════════════════════════ */}
      <section style={{ padding: 'clamp(80px, 10vw, 160px) 0', borderTop: `1px solid ${borderColor}`, background: `linear-gradient(180deg, ${accentBg}0.02) 0%, transparent 100%)` }}>
        <div style={sectionStyle}>
          <FadeIn><SectionTag number="03" label="Product Capabilities" /></FadeIn>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
            {[
              { icon: <GitMerge size={24} />, title: 'BOM Management', items: ['Structured, relational component trees', 'Version-controlled assemblies', 'Where-used traceability'] },
              { icon: <Activity size={24} />, title: 'ECO Pipeline', items: ['Rigid approval pipelines', 'SLA tracking & compliance', 'Automated escalation protocols'] },
              { icon: <ActivitySquare size={24} />, title: 'Real-Time SLA Engine', items: ['Live countdown timers', 'Visual delay & bottleneck indicators', 'Predictive failure flagging'] },
              { icon: <FileDigit size={24} />, title: 'PDF Intelligence', items: ['Auto-generated compliance docs', 'Boardroom-ready visual reports', 'Cryptographic signing'] },
            ].map((module, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div style={{ padding: '32px', border: `1px solid ${borderColor}`, borderRadius: '16px', background: cardBg, height: '100%', position: 'relative', overflow: 'hidden' }}>
                  <div style={{ position: 'absolute', top: 0, right: 0, padding: '24px', opacity: 0.05 }}><Cpu size={120} /></div>
                  <div style={{ color: accent, marginBottom: '24px', background: `${accentBg}0.1)`, width: '48px', height: '48px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '12px' }}>{module.icon}</div>
                  <h3 style={{ fontSize: '20px', fontWeight: 800, color: textPrimary, margin: '0 0 20px 0' }}>{module.title}</h3>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px', position: 'relative', zIndex: 10 }}>
                    {module.items.map((item, j) => (
                      <li key={j} style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '13px', color: textSecondary, display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                        <span style={{ color: accent, flexShrink: 0, marginTop: '2px' }}>—</span> {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════ */}
      {/* SECTION 6: CORE INNOVATION & UX */}
      {/* ═══════════════════════════════════════════ */}
      <section style={{ padding: 'clamp(80px, 10vw, 160px) 0', borderTop: `1px solid ${borderColor}` }}>
        <div style={sectionStyle}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '64px' }}>
            <FadeIn>
              <SectionTag number="04" label="Core Innovation" />
              <h2 style={{ fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 800, color: textPrimary, lineHeight: 1.1, letterSpacing: '-1px', margin: '0 0 24px 0' }}>
                ECO Intelligence Engine
              </h2>
              <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '15px', color: textSecondary, lineHeight: 1.7, marginBottom: '32px' }}>
                Engineering Change Orders are the lifeblood of manufacturing. This engine introduces automated revision control, visual & parametric diffing, and immutable audit trails.
              </p>
              <div style={{ padding: '24px', background: textPrimary, color: cardBg, borderRadius: '8px' }}>
                <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '14px', margin: 0, letterSpacing: '1px' }}>
                  <span style={{ color: accent }}>{`>`}</span> Every change becomes: Traceable. Verifiable. Reversible.
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={0.2}>
              <SectionTag number="05" label="Experience Design" />
              <h2 style={{ fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 800, color: textPrimary, lineHeight: 1.1, letterSpacing: '-1px', margin: '0 0 24px 0' }}>
                Cinematic Enterprise UX
              </h2>
              <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '15px', color: textSecondary, lineHeight: 1.7, marginBottom: '32px' }}>
                Designed for power users—Engineers, Operations, Decision-makers. We utilize glassmorphic surfaces and fluid transitions (GSAP + Framer) to present high-density data with low cognitive load.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {['Tactile 3D Component Visualization (Three.js)', 'In-line Visual Diff System', 'Fast. Visual. Deterministic interactions.'].map((item, i) => (
                   <div key={i} style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                     <Maximize size={16} color={accent} />
                     <span style={{ fontSize: '15px', fontWeight: 600, color: textPrimary }}>{item}</span>
                   </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════ */}
      {/* SECTION 7: SYSTEM ARCHITECTURE (VISUAL FIRST) */}
      {/* ═══════════════════════════════════════════ */}
      <section style={{ padding: 'clamp(80px, 10vw, 160px) 0', borderTop: `1px solid ${borderColor}`, background: cardBg }}>
        <div style={sectionStyle}>
          <FadeIn><SectionTag number="06" label="System Architecture" /></FadeIn>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {/* Diagram Flow */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
              {[
                { label: 'UI / Interaction Layer', tech: 'React 19 + Tailwind V4 + GSAP' },
                { label: 'API / Logic Hub', tech: 'Node.js + Express Services' },
                { label: 'State Integrity', tech: 'PostgreSQL (ACID Core)' },
                { label: 'Live Telemetry', tech: 'MongoDB (Sync Engine)' }
              ].map((node, i) => (
                <FadeIn key={i} delay={i * 0.1}>
                  <div style={{ padding: '32px 24px', border: `1px solid ${borderColor}`, background: bg, borderRadius: '8px', textAlign: 'center' }}>
                    <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '11px', color: accent, textTransform: 'uppercase', letterSpacing: '2px', margin: '0 0 12px 0', fontWeight: 700 }}>{node.label}</p>
                    <p style={{ fontSize: '16px', fontWeight: 800, color: textPrimary, margin: 0 }}>{node.tech}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════ */}
      {/* SECTION 8: DIFFERENTIATION & SECURITY */}
      {/* ═══════════════════════════════════════════ */}
      <section style={{ padding: 'clamp(80px, 10vw, 160px) 0', borderTop: `1px solid ${borderColor}` }}>
        <div style={sectionStyle}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '64px' }}>
            <FadeIn>
              <SectionTag number="07" label="Differentiation" />
              <div style={{ padding: '40px', background: `${accentBg}0.05)`, border: `1px solid ${accentBg}0.2)`, borderRadius: '16px' }}>
                <p style={{ fontSize: '16px', color: textSecondary, marginBottom: '24px' }}>This is not:</p>
                <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 32px 0', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <li style={{ textDecoration: 'line-through', color: textMuted, fontFamily: "'IBM Plex Mono', monospace", fontSize: '14px' }}>a spreadsheet replacement</li>
                  <li style={{ textDecoration: 'line-through', color: textMuted, fontFamily: "'IBM Plex Mono', monospace", fontSize: '14px' }}>a dashboard tool</li>
                </ul>
                <p style={{ fontSize: '16px', color: textSecondary, marginBottom: '16px' }}>This is:</p>
                <p style={{ fontSize: '28px', fontWeight: 900, color: accent, lineHeight: 1.1, margin: 0 }}>
                  A lifecycle control system.
                </p>
              </div>
            </FadeIn>
            
            <FadeIn delay={0.2}>
              <SectionTag number="08" label="Security & Governance" />
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                <p style={{ fontSize: '18px', color: textPrimary, lineHeight: 1.6, fontWeight: 500, margin: 0 }}>
                  Built for enterprise-grade reliability, not prototypes. Every action is accountable.
                </p>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '16px' }}>
                  {[
                    { title: 'JWT Authentication', icon: <ShieldCheck size={20} color={accent}/> },
                    { title: 'Role-Based Access Control (RBAC)', icon: <ShieldCheck size={20} color={accent}/> },
                    { title: 'Immutable Audit Logs', icon: <ShieldCheck size={20} color={accent}/> },
                  ].map((s, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '16px', border: `1px solid ${borderColor}`, borderRadius: '8px', background: cardBg }}>
                      {s.icon}
                      <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '14px', fontWeight: 600, color: textPrimary }}>{s.title}</span>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════ */}
      {/* SECTION 9: FOOTER / META */}
      {/* ═══════════════════════════════════════════ */}
      <section style={{ padding: 'clamp(80px, 10vw, 160px) 0', borderTop: `1px solid ${borderColor}`, background: '#11100f', color: '#F5F2ED' }}>
        <div style={sectionStyle}>
          <FadeIn>
            <h2 style={{ fontSize: 'clamp(32px, 5vw, 64px)', fontWeight: 900, color: '#F5F2ED', lineHeight: 1.1, letterSpacing: '-1.5px', margin: '0 0 16px 0', textAlign: 'center' }}>
              Stop managing products like spreadsheets.
            </h2>
            <h2 style={{ fontSize: 'clamp(32px, 5vw, 64px)', fontWeight: 900, color: accent, lineHeight: 1.1, letterSpacing: '-1.5px', margin: '0 0 80px 0', textAlign: 'center' }}>
              Start engineering systems that scale.
            </h2>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '32px', marginBottom: '64px', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '64px' }}>
              {[
                { label: 'Role', value: 'Full Stack + System Architect' },
                { label: 'Domain', value: 'Enterprise SaaS × Manufacturing' },
                { label: 'Type', value: 'Production-grade PLM ecosystem' },
                { label: 'Stack', value: 'React · Node · PostgreSQL · MongoDB · Three.js' },
                { label: 'Future', value: 'AI Predictions · Digital Twins' },
              ].map((meta, i) => (
                <div key={i}>
                  <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '10px', letterSpacing: '3px', color: accent, textTransform: 'uppercase', margin: '0 0 8px 0', fontWeight: 600 }}>{meta.label}</p>
                  <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.7)', margin: 0 }}>{meta.value}</p>
                </div>
              ))}
            </div>
          </FadeIn>
          <FadeIn delay={0.2}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', justifyContent: 'center' }}>
              <a href="https://plm-x-odooxgv.vercel.app/" target="_blank" rel="noopener noreferrer"
                style={{ padding: '16px 36px', background: accent, color: '#ffffff', fontFamily: "'IBM Plex Mono', monospace", fontSize: '12px', letterSpacing: '2px', fontWeight: 700, textTransform: 'uppercase', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px', borderRadius: '4px' }}>
                <ExternalLink size={16} /> View System
              </a>
              <a href="https://github.com/Rachit-Kakkad1/Odoo_X_GV_PLM" target="_blank" rel="noopener noreferrer"
                style={{ padding: '16px 36px', border: `1px solid rgba(255,255,255,0.2)`, color: '#ffffff', fontFamily: "'IBM Plex Mono', monospace", fontSize: '12px', letterSpacing: '2px', fontWeight: 700, textTransform: 'uppercase', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px', borderRadius: '4px', background: 'transparent' }}>
                <Github size={16} /> GitHub
              </a>
            </div>
          </FadeIn>
          <FadeIn delay={0.3}>
            <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '11px', color: 'rgba(255,255,255,0.3)', textAlign: 'center', margin: '80px 0 0 0', letterSpacing: '4px', fontWeight: 700 }}>
              PRECISION. POWER. CONTROL.
            </p>
          </FadeIn>
        </div>
      </section>
    </motion.div>
  );
}
