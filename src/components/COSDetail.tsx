import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Github, Globe, FileText, ExternalLink, Brain, Mic, Eye, Shield, Zap, Database, Cpu, Network, ChevronRight, Lock, Layers, BarChart3 } from 'lucide-react';

interface COSDetailProps {
  onClose: () => void;
}

function SectionTag({ number, label }: { number: string; label: string }) {
  return (
    <div className="flex items-center gap-4 mb-8">
      <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '11px', letterSpacing: '3px', color: '#7c3aed', fontWeight: 700 }}>{number}</span>
      <div style={{ width: '40px', height: '1px', background: 'linear-gradient(to right, #7c3aed, transparent)' }} />
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

export default function COSDetail({ onClose }: COSDetailProps) {
  const containerRef = useRef<HTMLDivElement>(null);

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

  const accent = '#7c3aed';
  const accentBg = 'rgba(124,58,237,';
  const textPrimary = '#1A1816';
  const textSecondary = 'rgba(26,24,22,0.55)';
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
      style={{ minHeight: '100vh', background: bg, overflowX: 'hidden', color: textPrimary, paddingTop: '80px' }}
    >
      {/* ─── FIXED NAV ─── */}
      <div style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 210,
        background: 'rgba(245,242,237,0.9)', backdropFilter: 'blur(12px)',
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
            { href: 'https://github.com/Rachit-Kakkad1/build-with-ai-hackcrux-2026', icon: <Github size={16} /> },
            { href: 'https://cos-cognitiveoperatingsystem.vercel.app/', icon: <Globe size={16} /> },
            { href: 'https://docs.google.com/document/d/1w1YYJ2Cu5fKI3OBfKgHwMGrGMzQzoGKCNKIualZrZk8/edit?usp=sharing', icon: <FileText size={16} /> },
          ].map((link, i) => (
            <a key={i} href={link.href} target="_blank" rel="noopener noreferrer"
              style={{ padding: '8px', borderRadius: '8px', border: `1px solid ${borderColor}`, color: textMuted, display: 'flex', alignItems: 'center', transition: 'all 0.3s' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = accent; e.currentTarget.style.color = accent; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = borderColor; e.currentTarget.style.color = textMuted; }}
            >{link.icon}</a>
          ))}
        </div>
      </div>

      {/* ═══════════════════════════════════════════ */}
      {/* 1. HERO */}
      {/* ═══════════════════════════════════════════ */}
      <section style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '15%', left: '30%', width: '500px', height: '500px', background: `radial-gradient(circle, ${accentBg}0.05) 0%, transparent 70%)`, pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', inset: 0, backgroundImage: `linear-gradient(${accentBg}0.03) 1px, transparent 1px), linear-gradient(90deg, ${accentBg}0.03) 1px, transparent 1px)`, backgroundSize: '60px 60px', pointerEvents: 'none' }} />

        <div style={sectionStyle}>
          <motion.div initial={{ opacity: 0, y: 60 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}>
            <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '11px', letterSpacing: '5px', color: accent, textTransform: 'uppercase', marginBottom: '24px', fontWeight: 600 }}>
              Case Study — 2026
            </p>
            <h1 style={{ fontSize: 'clamp(56px, 14vw, 160px)', fontWeight: 900, color: textPrimary, lineHeight: 0.85, letterSpacing: '-5px', margin: '0 0 16px 0' }}>
              C<span style={{ color: accent }}>O</span>S
            </h1>
            <p style={{ fontSize: 'clamp(16px, 2.5vw, 28px)', fontWeight: 600, color: textPrimary, margin: '0 0 12px 0', letterSpacing: '-0.5px' }}>
              Cognitive Operating System
            </p>
            <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 'clamp(13px, 1.8vw, 18px)', color: textSecondary, maxWidth: '650px', lineHeight: 1.6, margin: '0 0 16px 0' }}>
              Your brain, externalized. Your context, instantly restored.
            </p>
            <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '12px', color: textMuted, maxWidth: '500px', lineHeight: 1.5, margin: '0 0 40px 0' }}>
              Ask "What was I doing?" — get your exact context back in under 1 second. No cloud. No screenshots. No keystrokes.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
              <a href="https://cos-cognitiveoperatingsystem.vercel.app/" target="_blank" rel="noopener noreferrer"
                style={{ padding: '14px 28px', background: accent, color: '#ffffff', fontFamily: "'IBM Plex Mono', monospace", fontSize: '11px', letterSpacing: '2px', fontWeight: 700, textTransform: 'uppercase', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px', borderRadius: '4px' }}>
                <ExternalLink size={14} /> View Live
              </a>
              <a href="https://github.com/Rachit-Kakkad1/build-with-ai-hackcrux-2026" target="_blank" rel="noopener noreferrer"
                style={{ padding: '14px 28px', border: `1px solid ${borderColor}`, color: textPrimary, fontFamily: "'IBM Plex Mono', monospace", fontSize: '11px', letterSpacing: '2px', fontWeight: 700, textTransform: 'uppercase', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px', borderRadius: '4px', background: cardBg }}>
                <Github size={14} /> Source Code
              </a>
            </div>
          </motion.div>
        </div>

        <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 2, repeat: Infinity }}
          style={{ position: 'absolute', bottom: '40px', left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', color: textMuted }}>
          <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '9px', letterSpacing: '3px', textTransform: 'uppercase' }}>Scroll to explore</span>
          <ChevronRight size={16} style={{ transform: 'rotate(90deg)' }} />
        </motion.div>
      </section>

      {/* ═══════════════════════════════════════════ */}
      {/* 2. THE PROBLEM */}
      {/* ═══════════════════════════════════════════ */}
      <section style={{ padding: 'clamp(80px, 10vw, 160px) 0', borderTop: `1px solid ${borderColor}` }}>
        <div style={sectionStyle}>
          <FadeIn>
            <SectionTag number="01" label="The Problem" />
            <h2 style={{ fontSize: 'clamp(28px, 5vw, 48px)', fontWeight: 800, color: textPrimary, lineHeight: 1.1, letterSpacing: '-1px', margin: '0 0 32px 0', maxWidth: '750px' }}>
              Human cognition is not stateless. <span style={{ color: accent }}>Computers are.</span>
            </h2>
            <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '15px', lineHeight: 1.8, color: textSecondary, maxWidth: '700px', margin: '0 0 48px 0' }}>
              Every interruption creates a cognitive gap — tabs multiply, context fragments, focus decays. Existing solutions capture artifacts, not thought flow.
            </p>
          </FadeIn>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '24px' }}>
            {[
              { icon: '🧠', stat: 'Context Loss', label: 'Switching tasks erases mental state' },
              { icon: '⏱', stat: '23 min', label: 'Average recovery time per switch' },
              { icon: '🔀', stat: 'Fragmentation', label: 'Tools store data, not cognition' },
            ].map((item, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div style={{ padding: '28px', border: `1px solid ${borderColor}`, borderRadius: '12px', background: cardBg }}>
                  <span style={{ fontSize: '28px', display: 'block', marginBottom: '16px' }}>{item.icon}</span>
                  <p style={{ fontSize: '20px', fontWeight: 800, color: textPrimary, margin: '0 0 4px 0' }}>{item.stat}</p>
                  <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '12px', color: textMuted, margin: 0 }}>{item.label}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════ */}
      {/* 3. THE INSIGHT */}
      {/* ═══════════════════════════════════════════ */}
      <section style={{ padding: 'clamp(80px, 10vw, 160px) 0', borderTop: `1px solid ${borderColor}` }}>
        <div style={sectionStyle}>
          <FadeIn>
            <SectionTag number="02" label="The Insight" />
            <div style={{ padding: '48px 40px', border: `1px solid ${accentBg}0.15)`, borderRadius: '16px', background: `linear-gradient(135deg, ${accentBg}0.04) 0%, ${accentBg}0.01) 100%)`, textAlign: 'center' }}>
              <p style={{ fontSize: 'clamp(20px, 3vw, 32px)', fontWeight: 800, color: textPrimary, lineHeight: 1.3, margin: '0 0 16px 0' }}>
                "Computers store <span style={{ color: textMuted, textDecoration: 'line-through' }}>data</span>."
              </p>
              <p style={{ fontSize: 'clamp(20px, 3vw, 32px)', fontWeight: 800, color: accent, lineHeight: 1.3, margin: 0 }}>
                "Humans operate on context."
              </p>
            </div>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '14px', lineHeight: 1.8, color: textSecondary, maxWidth: '600px', margin: '32px auto 0', textAlign: 'center' }}>
              Cognition is temporal + semantic. Existing tools capture outputs, not thinking. COS captures thinking itself.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ═══════════════════════════════════════════ */}
      {/* 4. THE VISION */}
      {/* ═══════════════════════════════════════════ */}
      <section style={{ padding: 'clamp(80px, 10vw, 160px) 0', borderTop: `1px solid ${borderColor}` }}>
        <div style={sectionStyle}>
          <FadeIn>
            <SectionTag number="03" label="The Vision" />
            <h2 style={{ fontSize: 'clamp(28px, 5vw, 48px)', fontWeight: 800, color: textPrimary, lineHeight: 1.1, letterSpacing: '-1px', margin: '0 0 32px 0' }}>
              Cognitive State as <span style={{ color: accent }}>Infrastructure</span>
            </h2>
            <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '15px', lineHeight: 1.8, color: textSecondary, maxWidth: '700px', margin: 0 }}>
              Not files. Not tabs. But memories, context graphs, and semantic recall. Your work becomes queryable like a database.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ═══════════════════════════════════════════ */}
      {/* 5. THE EXPERIENCE */}
      {/* ═══════════════════════════════════════════ */}
      <section style={{ padding: 'clamp(80px, 10vw, 160px) 0', borderTop: `1px solid ${borderColor}`, background: `linear-gradient(180deg, ${accentBg}0.02) 0%, transparent 100%)` }}>
        <div style={sectionStyle}>
          <FadeIn><SectionTag number="04" label="The Experience" /></FadeIn>
          <FadeIn delay={0.1}>
            <div style={{ background: cardBg, border: `1px solid ${borderColor}`, borderRadius: '16px', overflow: 'hidden', marginBottom: '40px' }}>
              <div style={{ padding: '12px 20px', borderBottom: `1px solid ${borderColor}`, display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ef4444' }} />
                <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#eab308' }} />
                <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#22c55e' }} />
                <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '11px', color: textMuted, marginLeft: '12px' }}>COS Voice Interface</span>
              </div>
              <div style={{ padding: '32px', fontFamily: "'IBM Plex Mono', monospace", fontSize: '14px', lineHeight: 2, background: '#fafaf8' }}>
                <p style={{ color: textMuted, margin: '0 0 8px 0' }}>// User opens Gmail → switches to YouTube → comes back</p>
                <p style={{ color: textMuted, margin: '0 0 16px 0' }}>// 47 minutes later...</p>
                <p style={{ margin: '0 0 8px 0' }}><span style={{ color: accent }}>user →</span> <span style={{ color: textPrimary }}>"What was I doing?"</span></p>
                <p style={{ margin: '0 0 4px 0' }}><span style={{ color: '#16a34a' }}>cos  →</span> <span style={{ color: textSecondary }}>Reconstructing context...</span></p>
                <div style={{ padding: '16px', background: `${accentBg}0.04)`, border: `1px solid ${accentBg}0.1)`, borderRadius: '8px', margin: '8px 0 0 32px' }}>
                  <p style={{ color: textPrimary, margin: '0 0 4px 0', fontSize: '13px' }}>📧 <strong>Task:</strong> Drafting reply to client re: Q2 metrics</p>
                  <p style={{ color: textPrimary, margin: '0 0 4px 0', fontSize: '13px' }}>🕐 <strong>Last active:</strong> 47m ago (Gmail)</p>
                  <p style={{ color: textPrimary, margin: '0 0 4px 0', fontSize: '13px' }}>💡 <strong>Suggestion:</strong> Resume draft — 3 bullet points pending</p>
                  <p style={{ color: accent, margin: '8px 0 0 0', fontSize: '12px', fontWeight: 600 }}>⚡ Restored in 0.8s</p>
                </div>
              </div>
            </div>
          </FadeIn>
          <FadeIn delay={0.2}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px' }}>
              {[
                { label: '< 1 second', desc: 'Total response time' },
                { label: 'Zero clicks', desc: 'No UI friction required' },
                { label: 'Voice-first', desc: 'Natural cognition mapping' },
              ].map((item, i) => (
                <div key={i} style={{ padding: '20px', borderLeft: `2px solid ${accent}`, background: `${accentBg}0.03)` }}>
                  <p style={{ fontSize: '16px', fontWeight: 700, color: textPrimary, margin: '0 0 4px 0' }}>{item.label}</p>
                  <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '11px', color: textMuted, margin: 0 }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══════════════════════════════════════════ */}
      {/* 6. ZERO-CLOUD */}
      {/* ═══════════════════════════════════════════ */}
      <section style={{ padding: 'clamp(80px, 10vw, 160px) 0', borderTop: `1px solid ${borderColor}` }}>
        <div style={sectionStyle}>
          <FadeIn>
            <SectionTag number="05" label="Zero-Cloud Architecture" />
            <h2 style={{ fontSize: 'clamp(28px, 5vw, 48px)', fontWeight: 800, color: textPrimary, lineHeight: 1.1, letterSpacing: '-1px', margin: '0 0 32px 0' }}>
              Privacy is not a feature. <br />It is the <span style={{ color: accent }}>architecture</span>.
            </h2>
          </FadeIn>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
            {[
              { icon: <Lock size={20} />, label: 'No cloud storage' },
              { icon: <Shield size={20} />, label: 'No API calls' },
              { icon: <Eye size={20} />, label: 'No hidden tracking' },
              { icon: <Cpu size={20} />, label: 'On-device only' },
            ].map((item, i) => (
              <FadeIn key={i} delay={i * 0.08}>
                <div style={{ padding: '24px', border: `1px solid ${borderColor}`, borderRadius: '12px', background: cardBg, display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div style={{ color: accent }}>{item.icon}</div>
                  <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '13px', color: textPrimary, margin: 0, fontWeight: 600 }}>{item.label}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════ */}
      {/* 7. CORE INNOVATION */}
      {/* ═══════════════════════════════════════════ */}
      <section style={{ padding: 'clamp(80px, 10vw, 160px) 0', borderTop: `1px solid ${borderColor}` }}>
        <div style={sectionStyle}>
          <FadeIn>
            <SectionTag number="06" label="Core Innovation" />
            <h2 style={{ fontSize: 'clamp(28px, 5vw, 48px)', fontWeight: 800, color: textPrimary, lineHeight: 1.1, letterSpacing: '-1px', margin: '0 0 32px 0' }}>
              Memory ≠ Logs → Memory = <span style={{ color: accent }}>Meaning</span>
            </h2>
          </FadeIn>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '24px' }}>
            {[
              { icon: <Database size={24} />, title: 'Semantic Embeddings', desc: 'Meaning-aware recall — search by intent, not keywords.' },
              { icon: <Layers size={24} />, title: 'Temporal Clustering', desc: 'Automatic task grouping based on time and context proximity.' },
              { icon: <Network size={24} />, title: 'Graph Structures', desc: 'Connected cognition — a web of related ideas and actions.' },
            ].map((item, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div style={{ padding: '32px', border: `1px solid ${borderColor}`, borderRadius: '12px', background: cardBg, height: '100%' }}>
                  <div style={{ color: accent, marginBottom: '16px' }}>{item.icon}</div>
                  <h3 style={{ fontSize: '18px', fontWeight: 700, color: textPrimary, margin: '0 0 8px 0' }}>{item.title}</h3>
                  <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '13px', color: textMuted, lineHeight: 1.6, margin: 0 }}>{item.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════ */}
      {/* 8. PRODUCT ECOSYSTEM */}
      {/* ═══════════════════════════════════════════ */}
      <section style={{ padding: 'clamp(80px, 10vw, 160px) 0', borderTop: `1px solid ${borderColor}` }}>
        <div style={sectionStyle}>
          <FadeIn><SectionTag number="07" label="Product Ecosystem" /></FadeIn>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
            {[
              { emoji: '🧠', title: 'COS Personal', items: ['Individual cognitive memory', 'Voice recall + timeline + graph', '5 adaptive human modes'] },
              { emoji: '⚡', title: 'COS Teams', items: ['Shared cognitive layer', 'Real-time team context visibility', 'Cognitive Handoff via encrypted QR'] },
              { emoji: '🏢', title: 'WorkSense', items: ['Organizational intelligence', 'Focus analytics (not surveillance)', 'Ethical productivity insights'] },
            ].map((product, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div style={{ padding: '32px', border: `1px solid ${borderColor}`, borderRadius: '12px', background: cardBg, height: '100%' }}>
                  <span style={{ fontSize: '32px', display: 'block', marginBottom: '16px' }}>{product.emoji}</span>
                  <h3 style={{ fontSize: '18px', fontWeight: 700, color: accent, margin: '0 0 20px 0', fontFamily: "'IBM Plex Mono', monospace" }}>{product.title}</h3>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {product.items.map((item, j) => (
                      <li key={j} style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '13px', color: textSecondary, display: 'flex', gap: '8px' }}>
                        <span style={{ color: accent, flexShrink: 0 }}>▸</span> {item}
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
      {/* 9. TAB GUARDIAN */}
      {/* ═══════════════════════════════════════════ */}
      <section style={{ padding: 'clamp(80px, 10vw, 160px) 0', borderTop: `1px solid ${borderColor}`, background: `linear-gradient(180deg, ${accentBg}0.02) 0%, transparent 100%)` }}>
        <div style={sectionStyle}>
          <FadeIn>
            <SectionTag number="08" label="Interaction Design" />
            <h2 style={{ fontSize: 'clamp(28px, 5vw, 48px)', fontWeight: 800, color: textPrimary, lineHeight: 1.1, letterSpacing: '-1px', margin: '0 0 16px 0' }}>Tab Guardian</h2>
            <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '16px', color: textSecondary, margin: '0 0 40px 0', fontStyle: 'italic' }}>"A system that thinks before you forget."</p>
          </FadeIn>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
            {[
              { step: '01', title: 'Detects context shift', desc: 'Monitors application switches in real-time' },
              { step: '02', title: 'Surfaces previous intent', desc: 'Recalls what you were working on before' },
              { step: '03', title: 'Offers instant recovery', desc: 'One-tap return to your exact mental state' },
            ].map((item, i) => (
              <FadeIn key={i} delay={i * 0.08}>
                <div style={{ padding: '28px', border: `1px solid ${borderColor}`, borderRadius: '12px', background: cardBg }}>
                  <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '28px', fontWeight: 900, color: `${accentBg}0.15)`, display: 'block', marginBottom: '12px' }}>{item.step}</span>
                  <h3 style={{ fontSize: '16px', fontWeight: 700, color: textPrimary, margin: '0 0 6px 0' }}>{item.title}</h3>
                  <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '12px', color: textMuted, margin: 0 }}>{item.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════ */}
      {/* 10. SYSTEM ARCHITECTURE */}
      {/* ═══════════════════════════════════════════ */}
      <section style={{ padding: 'clamp(80px, 10vw, 160px) 0', borderTop: `1px solid ${borderColor}` }}>
        <div style={sectionStyle}>
          <FadeIn><SectionTag number="09" label="System Architecture" /></FadeIn>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
            {[
              { layer: 'Input', items: ['Screen OCR', 'Window tracking', 'Microphone stream', 'Browser extension'], color: '#2563eb' },
              { layer: 'Processing', items: ['RNNoise → noise suppression', 'WebRTC VAD → speech detect', 'Whisper → speech-to-text', 'MiniLM → embeddings'], color: accent },
              { layer: 'Storage', items: ['FAISS → vector memory', 'SQLite → metadata', 'NetworkX → cognitive graph'], color: '#16a34a' },
              { layer: 'Output', items: ['FastAPI endpoints', 'React dashboards', 'Mobile + extension'], color: '#d97706' },
            ].map((col, i) => (
              <FadeIn key={i} delay={i * 0.08}>
                <div style={{ padding: '28px', border: `1px solid ${borderColor}`, borderRadius: '12px', background: cardBg, height: '100%' }}>
                  <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '10px', letterSpacing: '3px', color: col.color, textTransform: 'uppercase', margin: '0 0 16px 0', fontWeight: 700 }}>{col.layer} Layer</p>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {col.items.map((item, j) => (
                      <li key={j} style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '12px', color: textSecondary, display: 'flex', gap: '6px' }}>
                        <span style={{ color: col.color }}>→</span> {item}
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
      {/* 11. AI STACK */}
      {/* ═══════════════════════════════════════════ */}
      <section style={{ padding: 'clamp(80px, 10vw, 160px) 0', borderTop: `1px solid ${borderColor}` }}>
        <div style={sectionStyle}>
          <FadeIn>
            <SectionTag number="10" label="AI Stack" />
            <h2 style={{ fontSize: 'clamp(28px, 5vw, 48px)', fontWeight: 800, color: textPrimary, lineHeight: 1.1, letterSpacing: '-1px', margin: '0 0 16px 0' }}>
              8 AI Models. <span style={{ color: accent }}>0 APIs. 0 Cloud.</span>
            </h2>
            <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '16px', color: accent, margin: '0 0 48px 0', fontWeight: 600 }}>"$0 per query. Infinite recall."</p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <div style={{ overflowX: 'auto', background: cardBg, borderRadius: '12px', border: `1px solid ${borderColor}` }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: "'IBM Plex Mono', monospace", fontSize: '13px' }}>
                <thead>
                  <tr style={{ borderBottom: `1px solid ${accentBg}0.15)` }}>
                    <th style={{ textAlign: 'left', padding: '16px 20px', color: accent, fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', fontSize: '10px' }}>Model</th>
                    <th style={{ textAlign: 'left', padding: '16px 20px', color: accent, fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', fontSize: '10px' }}>Purpose</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['MiniLM', 'Semantic memory search'],
                    ['Whisper', 'Offline voice recognition'],
                    ['RNNoise', 'Real-time noise filtering'],
                    ['WebRTC VAD', 'Speech activity gating'],
                    ['FAISS', 'Sub-ms vector retrieval'],
                    ['DBSCAN', 'Automatic task clustering'],
                    ['Tesseract', 'Screen text extraction (OCR)'],
                    ['NetworkX', 'Cognitive graph construction'],
                  ].map(([model, purpose], i) => (
                    <tr key={i} style={{ borderBottom: `1px solid ${borderColor}` }}>
                      <td style={{ padding: '12px 20px', color: textPrimary, fontWeight: 600 }}>{model}</td>
                      <td style={{ padding: '12px 20px', color: textSecondary }}>{purpose}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══════════════════════════════════════════ */}
      {/* 12. PERFORMANCE */}
      {/* ═══════════════════════════════════════════ */}
      <section style={{ padding: 'clamp(80px, 10vw, 160px) 0', borderTop: `1px solid ${borderColor}` }}>
        <div style={sectionStyle}>
          <FadeIn><SectionTag number="11" label="Performance" /></FadeIn>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '32px' }}>
            {[
              { value: '~0.8s', label: 'Total recall latency' },
              { value: 'Sub-ms', label: 'Vector search (FAISS)' },
              { value: '10,000+', label: 'Memories indexed locally' },
              { value: '$0', label: 'Cost per query' },
            ].map((metric, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div style={{ borderLeft: `3px solid ${accent}`, paddingLeft: '24px' }}>
                  <p style={{ fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: 900, color: textPrimary, margin: '0 0 8px 0', lineHeight: 1 }}>{metric.value}</p>
                  <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '12px', color: textMuted, margin: 0, letterSpacing: '1px', textTransform: 'uppercase' }}>{metric.label}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════ */}
      {/* 13. DESIGN PHILOSOPHY */}
      {/* ═══════════════════════════════════════════ */}
      <section style={{ padding: 'clamp(80px, 10vw, 160px) 0', borderTop: `1px solid ${borderColor}` }}>
        <div style={sectionStyle}>
          <FadeIn><SectionTag number="12" label="Design Philosophy" /></FadeIn>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
            {[
              { label: 'Invisible Interface', desc: 'Interaction disappears — focus stays' },
              { label: 'Voice-First UX', desc: 'Natural cognition mapping' },
              { label: 'Graph-Based Thinking', desc: 'Mirrors how human memory works' },
              { label: 'Minimal UI', desc: 'Maximum clarity, zero distraction' },
            ].map((item, i) => (
              <FadeIn key={i} delay={i * 0.08}>
                <div style={{ padding: '24px', borderLeft: `2px solid ${accent}`, background: `${accentBg}0.03)` }}>
                  <p style={{ fontSize: '14px', fontWeight: 700, color: textPrimary, margin: '0 0 4px 0' }}>{item.label}</p>
                  <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '12px', color: textMuted, margin: 0 }}>{item.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════ */}
      {/* 14. DIFFERENTIATION */}
      {/* ═══════════════════════════════════════════ */}
      <section style={{ padding: 'clamp(80px, 10vw, 160px) 0', borderTop: `1px solid ${borderColor}` }}>
        <div style={sectionStyle}>
          <FadeIn>
            <SectionTag number="13" label="The Differentiator" />
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px' }}>
              <div>
                <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '14px', color: textMuted, margin: '0 0 16px 0', fontWeight: 600 }}>This is NOT:</p>
                {['a productivity app', 'a note-taking tool', 'a tracker'].map((item, i) => (
                  <p key={i} style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '16px', color: textMuted, margin: '0 0 8px 0', textDecoration: 'line-through' }}>— {item}</p>
                ))}
              </div>
              <div>
                <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '14px', color: accent, margin: '0 0 16px 0', fontWeight: 600 }}>This IS:</p>
                <h3 style={{ fontSize: 'clamp(24px, 4vw, 36px)', fontWeight: 800, color: textPrimary, lineHeight: 1.2, margin: 0 }}>
                  → An Operating System<br />for Human <span style={{ color: accent }}>Cognition</span>
                </h3>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══════════════════════════════════════════ */}
      {/* 15. ETHICS */}
      {/* ═══════════════════════════════════════════ */}
      <section style={{ padding: 'clamp(80px, 10vw, 160px) 0', borderTop: `1px solid ${borderColor}` }}>
        <div style={sectionStyle}>
          <FadeIn>
            <SectionTag number="14" label="Ethical Layer" />
            <h2 style={{ fontSize: 'clamp(28px, 5vw, 48px)', fontWeight: 800, color: textPrimary, lineHeight: 1.1, letterSpacing: '-1px', margin: '0 0 32px 0' }}>
              Privacy as a <span style={{ color: accent }}>primitive</span>, not a feature
            </h2>
          </FadeIn>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '600px' }}>
            {['No cloud storage — ever', 'No hidden tracking or telemetry', 'Full user-aware transparency', 'On-device processing only'].map((item, i) => (
              <FadeIn key={i} delay={i * 0.08}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: accent, flexShrink: 0 }} />
                  <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '14px', color: textSecondary, margin: 0 }}>{item}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════ */}
      {/* 16. FUTURE */}
      {/* ═══════════════════════════════════════════ */}
      <section style={{ padding: 'clamp(80px, 10vw, 160px) 0', borderTop: `1px solid ${borderColor}` }}>
        <div style={sectionStyle}>
          <FadeIn><SectionTag number="15" label="Future Trajectory" /></FadeIn>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
            {[
              { icon: <Brain size={20} />, title: 'Predictive Cognition', desc: "Anticipate what you'll need before you ask" },
              { icon: <Network size={20} />, title: 'Cross-Device Memory', desc: 'Privacy-safe sync without cloud exposure' },
              { icon: <Layers size={20} />, title: 'Deeper Graph Intel', desc: 'Multi-layered cognitive relationship mapping' },
              { icon: <Zap size={20} />, title: 'Autonomous Focus', desc: 'Self-optimizing concentration management' },
            ].map((item, i) => (
              <FadeIn key={i} delay={i * 0.08}>
                <div style={{ padding: '28px', border: `1px solid ${borderColor}`, borderRadius: '12px', background: cardBg }}>
                  <div style={{ color: accent, marginBottom: '12px' }}>{item.icon}</div>
                  <h3 style={{ fontSize: '16px', fontWeight: 700, color: textPrimary, margin: '0 0 6px 0' }}>{item.title}</h3>
                  <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '12px', color: textMuted, margin: 0, lineHeight: 1.5 }}>{item.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════ */}
      {/* 17. CLOSING */}
      {/* ═══════════════════════════════════════════ */}
      <section style={{ padding: 'clamp(80px, 10vw, 160px) 0', borderTop: `1px solid ${accentBg}0.15)`, background: `linear-gradient(0deg, ${accentBg}0.03) 0%, transparent 100%)` }}>
        <div style={sectionStyle}>
          <FadeIn>
            <div style={{ textAlign: 'center', marginBottom: '64px' }}>
              <p style={{ fontSize: 'clamp(20px, 4vw, 36px)', fontWeight: 800, color: textPrimary, lineHeight: 1.4, margin: '0 0 8px 0' }}>
                Your next interruption is inevitable.
              </p>
              <p style={{ fontSize: 'clamp(20px, 4vw, 36px)', fontWeight: 800, color: accent, lineHeight: 1.4, margin: 0 }}>
                Losing your context isn't.
              </p>
            </div>
          </FadeIn>
          <FadeIn delay={0.1}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '32px', marginBottom: '48px' }}>
              {[
                { label: 'Role', value: 'System Architect + Full Stack + AI Engineer' },
                { label: 'Domain', value: 'HCI × AI Systems × Cognitive Computing' },
                { label: 'Type', value: 'Multi-product platform (Personal, Teams, Enterprise)' },
                { label: 'Core Idea', value: 'Externalizing human memory into a queryable system' },
              ].map((meta, i) => (
                <div key={i}>
                  <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '10px', letterSpacing: '3px', color: accent, textTransform: 'uppercase', margin: '0 0 8px 0', fontWeight: 600 }}>{meta.label}</p>
                  <p style={{ fontSize: '14px', color: textSecondary, margin: 0 }}>{meta.value}</p>
                </div>
              ))}
            </div>
          </FadeIn>
          <FadeIn delay={0.2}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', paddingTop: '32px', borderTop: `1px solid ${borderColor}` }}>
              <a href="https://cos-cognitiveoperatingsystem.vercel.app/" target="_blank" rel="noopener noreferrer"
                style={{ padding: '14px 28px', background: accent, color: '#ffffff', fontFamily: "'IBM Plex Mono', monospace", fontSize: '11px', letterSpacing: '2px', fontWeight: 700, textTransform: 'uppercase', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px', borderRadius: '4px' }}>
                <ExternalLink size={14} /> View Live
              </a>
              <a href="https://github.com/Rachit-Kakkad1/build-with-ai-hackcrux-2026" target="_blank" rel="noopener noreferrer"
                style={{ padding: '14px 28px', border: `1px solid ${borderColor}`, color: textPrimary, fontFamily: "'IBM Plex Mono', monospace", fontSize: '11px', letterSpacing: '2px', fontWeight: 700, textTransform: 'uppercase', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px', borderRadius: '4px', background: cardBg }}>
                <Github size={14} /> GitHub
              </a>
              <a href="https://docs.google.com/document/d/1w1YYJ2Cu5fKI3OBfKgHwMGrGMzQzoGKCNKIualZrZk8/edit?usp=sharing" target="_blank" rel="noopener noreferrer"
                style={{ padding: '14px 28px', border: `1px solid ${borderColor}`, color: textPrimary, fontFamily: "'IBM Plex Mono', monospace", fontSize: '11px', letterSpacing: '2px', fontWeight: 700, textTransform: 'uppercase', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px', borderRadius: '4px', background: cardBg }}>
                <FileText size={14} /> Docs
              </a>
            </div>
          </FadeIn>
          <FadeIn delay={0.3}>
            <div style={{ textAlign: 'center', marginTop: '64px' }}>
              <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '12px', color: textMuted, margin: '0 0 8px 0', letterSpacing: '3px' }}>
                No cloud. No surveillance. No compromise.
              </p>
              <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '11px', color: textMuted, margin: 0, letterSpacing: '2px' }}>
                PORTFOLIO OF RACHIT KAKKAD — 2026
              </p>
            </div>
          </FadeIn>
        </div>
      </section>
    </motion.div>
  );
}
