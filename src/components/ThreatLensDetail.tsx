import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Globe, FileText, ExternalLink, ShieldCheck, Search, Cpu, Database, Network, Eye, Lock, BrainCircuit, Activity } from 'lucide-react';
import { Github } from './Icons';

interface ThreatLensDetailProps {
  onClose: () => void;
}

function SectionTag({ number, label }: { number: string; label: string }) {
  return (
    <div className="flex items-center gap-4 mb-8">
      <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '11px', letterSpacing: '3px', color: '#2563eb', fontWeight: 700 }}>{number}</span>
      <div style={{ width: '40px', height: '1px', background: 'linear-gradient(to right, #2563eb, transparent)' }} />
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

export default function ThreatLensDetail({ onClose }: ThreatLensDetailProps) {
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

  const accent = '#2563eb'; // Royal Blue for trust
  const accentRed = '#dc2626'; // Deep red for threat highlights
  const accentBg = 'rgba(37,99,235,'; 
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
      style={{ minHeight: '100vh', background: bg, overflowX: 'hidden', color: textPrimary, paddingTop: '80px' }}
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
            { href: 'https://github.com/Rachit-Kakkad1/ThreatLens_UI_Backend', icon: <Github size={16} /> },
            { href: 'https://threat-lens-ui-backend.vercel.app/', icon: <Globe size={16} /> },
            { href: 'https://docs.google.com/document/d/1_T0Fp1jR8zFqM2tCq4Ew5uXvXhM2xU4F4RzFqM2tCq4/edit?usp=sharing', icon: <FileText size={16} /> },
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
      {/* SECTION 1: HERO - TRUST-FIRST ENTRY */}
      {/* ═══════════════════════════════════════════ */}
      <section style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', position: 'relative', overflow: 'hidden', background: '#0a0f1c' }}>
        {/* Dark Architectural Network Background */}
        <div style={{ position: 'absolute', top: '15%', left: '50%', transform: 'translate(-50%, -50%)', width: '800px', height: '800px', background: `radial-gradient(circle, ${accentBg}0.15) 0%, transparent 60%)`, pointerEvents: 'none' }} />
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

        <div style={{ ...sectionStyle, position: 'relative', zIndex: 10 }}>
          <motion.div initial={{ opacity: 0, y: 60 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}>
            <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '12px', letterSpacing: '5px', color: accent, textTransform: 'uppercase', marginBottom: '24px', fontWeight: 600 }}>
              Ethical Cybersecurity Analysis Platform
            </p>
            <h1 style={{ fontSize: 'clamp(56px, 12vw, 150px)', fontWeight: 900, color: '#ffffff', lineHeight: 0.9, letterSpacing: '-5px', margin: '0 0 32px 0' }}>
              Threat<span style={{ color: 'rgba(255,255,255,0.4)' }}>Lens</span>
            </h1>
            <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 'clamp(16px, 2.5vw, 24px)', color: 'rgba(255,255,255,0.8)', maxWidth: '800px', lineHeight: 1.6, margin: '0 0 16px 0' }}>
              Secure Code. Clear Risks. Zero Exploitation.
            </p>
            <p style={{ fontSize: 'clamp(15px, 2vw, 18px)', color: 'rgba(255,255,255,0.5)', maxWidth: '600px', lineHeight: 1.6, margin: '0 0 48px 0', borderLeft: `2px solid ${accentRed}`, paddingLeft: '16px' }}>
              Understand vulnerabilities — without executing them.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
              <a href="https://threat-lens-ui-backend.vercel.app/" target="_blank" rel="noopener noreferrer"
                style={{ padding: '16px 32px', background: accent, color: '#ffffff', fontFamily: "'IBM Plex Mono', monospace", fontSize: '12px', letterSpacing: '2px', fontWeight: 700, textTransform: 'uppercase', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px', borderRadius: '4px', boxShadow: `0 8px 30px ${accentBg}0.3)` }}>
                <ExternalLink size={16} /> Enter Platform
              </a>
            </div>
          </motion.div>
        </div>

        {/* Diagonal cut transition */}
        <div style={{ position: 'absolute', bottom: '-1px', left: 0, right: 0, height: '120px', background: bg, clipPath: 'polygon(0 100%, 100% 0, 100% 100%)' }} />
      </section>

      {/* ═══════════════════════════════════════════ */}
      {/* SECTION 2: THE PROBLEM */}
      {/* ═══════════════════════════════════════════ */}
      <section style={{ padding: 'clamp(80px, 10vw, 160px) 0' }}>
        <div style={sectionStyle}>
          <FadeIn>
            <SectionTag number="01" label="The Structural Flaw" />
            <h2 style={{ fontSize: 'clamp(32px, 5vw, 56px)', fontWeight: 800, color: textPrimary, lineHeight: 1.1, letterSpacing: '-1.5px', margin: '0 0 32px 0', maxWidth: '800px' }}>
              Cybersecurity today is paradoxical. The tools designed to teach security often introduce real risk.
            </h2>
            <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '16px', lineHeight: 1.8, color: textSecondary, maxWidth: '750px', margin: '0 0 48px 0' }}>
              Modern security learning relies heavily on live exploitation and black-box scanners. Learners see what is broken, but rarely understand why it breaks. This creates a dangerous gap: knowledge without understanding.
            </p>
          </FadeIn>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
             <FadeIn delay={0.1}>
                <div style={{ padding: '32px', borderLeft: `2px solid ${accentRed}`, background: cardBg }}>
                  <h3 style={{ fontSize: '18px', fontWeight: 800, color: textPrimary, margin: '0 0 12px 0' }}>Live Exploitation</h3>
                  <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '13px', color: textSecondary, lineHeight: 1.6, margin: 0 }}>Exposing real systems to payloads creates severe operational hazards.</p>
                </div>
              </FadeIn>
              <FadeIn delay={0.2}>
                <div style={{ padding: '32px', borderLeft: `2px solid ${accentRed}`, background: cardBg }}>
                  <h3 style={{ fontSize: '18px', fontWeight: 800, color: textPrimary, margin: '0 0 12px 0' }}>Black-Box Scanners</h3>
                  <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '13px', color: textSecondary, lineHeight: 1.6, margin: 0 }}>They highlight an endpoint failure without revealing the architectural root cause.</p>
                </div>
              </FadeIn>
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
                "Security tools show what is broken. <span style={{ color: accent }}>They rarely explain why.</span>"
              </h2>
              <div style={{ maxWidth: '600px' }}>
                <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '16px', lineHeight: 1.8, color: textSecondary, marginBottom: '24px' }}>
                  ThreatLens introduces Ethical-First Security Intelligence. A system where vulnerabilities are analyzed, not exploited; risks are explained, not executed; and learning is safe by design.
                </p>
                <p style={{ fontSize: '20px', fontWeight: 600, color: textPrimary, lineHeight: 1.5 }}>
                  Understanding vulnerabilities requires context, not commands. Security is not about tools. It is about thinking.
                </p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════ */}
      {/* SECTION 4: CORE ENGINE - STATIC ANALYSIS */}
      {/* ═══════════════════════════════════════════ */}
      <section style={{ padding: 'clamp(80px, 10vw, 160px) 0' }}>
        <div style={sectionStyle}>
          <FadeIn>
            <SectionTag number="02" label="Core Engine Analysis" />
            <h2 style={{ fontSize: 'clamp(32px, 5vw, 56px)', fontWeight: 800, color: textPrimary, lineHeight: 1.1, letterSpacing: '-1.5px', margin: '0 0 32px 0', maxWidth: '800px' }}>
              Deterministic Security Engine
            </h2>
            <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '16px', lineHeight: 1.8, color: accent, fontWeight: 700, margin: '0 0 64px 0' }}>
              "Every result is traceable and defensible. No execution. No payloads. Fully explainable outputs."
            </p>
          </FadeIn>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '32px' }}>
            {[
              { title: 'SQL Injection Context', icon: <Database size={24} color={accent}/>, desc: 'Detects unsanitized literal queries without attacking the actual data store.' },
              { title: 'Cross-Site Scripting', icon: <Network size={24} color={accent}/>, desc: 'Identifies reflective payload potential without running malicious DOM scripts.' },
              { title: 'Hardcoded Secrets', icon: <Lock size={24} color={accent}/>, desc: 'Maps repository leaks and critical key exposure cleanly and statically.' },
            ].map((node, i) => (
               <FadeIn key={i} delay={i * 0.1}>
                 <div style={{ padding: '40px', border: `1px solid ${borderColor}`, borderRadius: '16px', background: `linear-gradient(135deg, ${cardBg} 0%, ${bg} 100%)`, height: '100%' }}>
                   <div style={{ marginBottom: '24px', background: `${accentBg}0.1)`, width: '48px', height: '48px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '12px' }}>{node.icon}</div>
                   <h3 style={{ fontSize: '20px', fontWeight: 800, color: textPrimary, margin: '0 0 12px 0' }}>{node.title}</h3>
                   <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '13px', color: textSecondary, lineHeight: 1.6, margin: 0 }}>{node.desc}</p>
                 </div>
               </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════ */}
      {/* SECTION 5: AI LAYER & RED TEAM MODELING */}
      {/* ═══════════════════════════════════════════ */}
      <section style={{ padding: 'clamp(80px, 10vw, 160px) 0', borderTop: `1px solid ${borderColor}`, background: `linear-gradient(180deg, ${accentBg}0.02) 0%, transparent 100%)` }}>
        <div style={sectionStyle}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '64px' }}>
            <FadeIn>
              <SectionTag number="03" label="Constrained AI Architecture" />
              <h2 style={{ fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 800, color: textPrimary, lineHeight: 1.1, letterSpacing: '-1px', margin: '0 0 24px 0' }}>
                AI assists. <br />It never acts.
              </h2>
              <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '15px', color: textSecondary, lineHeight: 1.7, marginBottom: '32px' }}>
                ThreatLens integrates AI strictly as an advisory layer. It explains vulnerabilities, suggests secure coding practices, and provides contextual reasoning.
              </p>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {[
                  'Cannot generate exploits',
                  'Cannot execute remote commands',
                  'Cannot override deterministic logic'
                ].map((item, j) => (
                  <li key={j} style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '14px', color: textPrimary, display: 'flex', gap: '12px', alignItems: 'center', fontWeight: 600 }}>
                    <ShieldCheck size={16} color={accentRed} /> {item}
                  </li>
                ))}
              </ul>
            </FadeIn>

            <FadeIn delay={0.2}>
              <SectionTag number="04" label="Ethical Red Teaming" />
              <h2 style={{ fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 800, color: textPrimary, lineHeight: 1.1, letterSpacing: '-1px', margin: '0 0 24px 0' }}>
                The Attacker Mindset (Safely Modeled)
              </h2>
              <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '15px', color: textSecondary, lineHeight: 1.7, marginBottom: '32px' }}>
                We model phishing, DDoS, and API risks conceptually to build defensive awareness and impact understanding.
              </p>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {[
                  'No operational attack guidance',
                  'No malicious scripts',
                  'No step-by-step exploit walkthroughs'
                ].map((item, j) => (
                  <li key={j} style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '14px', color: textPrimary, display: 'flex', gap: '12px', alignItems: 'center', fontWeight: 600 }}>
                    <ShieldCheck size={16} color={accent} /> {item}
                  </li>
                ))}
              </ul>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════ */}
      {/* SECTION 6: SYSTEM ARCHITECTURE (VISUAL FIRST) */}
      {/* ═══════════════════════════════════════════ */}
      <section style={{ padding: 'clamp(80px, 10vw, 160px) 0', borderTop: `1px solid ${borderColor}`, background: cardBg }}>
        <div style={sectionStyle}>
          <FadeIn><SectionTag number="05" label="Architecture Pipeline" /></FadeIn>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <p style={{ fontSize: '18px', fontWeight: 600, color: textPrimary, margin: '0 0 32px 0', textAlign: 'center' }}>
              A clean, auditable pipeline designed for transparency and safety.
            </p>
            {/* Diagram Flow */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px' }}>
              {[
                { label: 'Code Input', icon: <FileText size={20} color={textMuted}/> },
                { label: 'Static Analysis', icon: <Search size={20} color={textPrimary}/> },
                { label: 'Risk Engine', icon: <Activity size={20} color={accentRed}/> },
                { label: 'AI Advisory', icon: <BrainCircuit size={20} color={accent}/> },
                { label: 'Dashboard', icon: <Eye size={20} color={textPrimary}/> }
              ].map((node, i) => (
                <FadeIn key={i} delay={i * 0.1}>
                  <div style={{ padding: '32px 24px', border: `1px solid ${borderColor}`, background: bg, borderRadius: '8px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', height: '100%' }}>
                    {node.icon}
                    <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '11px', color: textPrimary, textTransform: 'uppercase', letterSpacing: '2px', margin: 0, fontWeight: 700 }}>{node.label}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════ */}
      {/* SECTION 7: WHAT IT DOES NOT DO */}
      {/* ═══════════════════════════════════════════ */}
      <section style={{ padding: 'clamp(80px, 10vw, 160px) 0', borderTop: `1px solid ${borderColor}` }}>
        <div style={sectionStyle}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '64px' }}>
            <FadeIn>
              <SectionTag number="06" label="The Absolute Negatives" />
              <div style={{ padding: '40px', background: `${accentBg}0.05)`, border: `1px solid ${accentBg}0.2)`, borderRadius: '16px' }}>
                <p style={{ fontSize: '16px', color: textSecondary, marginBottom: '24px' }}>This system intentionally avoids:</p>
                <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 32px 0', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <li style={{ textDecoration: 'line-through', color: textMuted, fontFamily: "'IBM Plex Mono', monospace", fontSize: '14px' }}>Penetration testing</li>
                  <li style={{ textDecoration: 'line-through', color: textMuted, fontFamily: "'IBM Plex Mono', monospace", fontSize: '14px' }}>Live payload attacks</li>
                  <li style={{ textDecoration: 'line-through', color: textMuted, fontFamily: "'IBM Plex Mono', monospace", fontSize: '14px' }}>Exploit scripts</li>
                  <li style={{ textDecoration: 'line-through', color: textMuted, fontFamily: "'IBM Plex Mono', monospace", fontSize: '14px' }}>Hacking tutorials</li>
                </ul>
                <p style={{ fontSize: '20px', fontWeight: 800, color: textPrimary, lineHeight: 1.4, margin: 0 }}>
                  This ensures academic safety, ethical compliance, and Judge-ready integrity.
                </p>
              </div>
            </FadeIn>
            
            <FadeIn delay={0.2}>
              <SectionTag number="07" label="Ethical Architecture" />
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                <p style={{ fontSize: '28px', color: accent, lineHeight: 1.2, fontWeight: 900, margin: 0 }}>
                  "Ethics is enforced by system design — not user intention."
                </p>
                <p style={{ fontSize: '15px', color: textSecondary, lineHeight: 1.6, margin: 0 }}>
                  The platform translates complexity into clarity via deterministic risk scores (0–100), severity segmentation, and trend analysis. It is designed to feel Enterprise-grade, avoiding aggressive hacker aesthetics in favor of calm, authoritative education.
                </p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════ */}
      {/* SECTION 8: FOOTER / META */}
      {/* ═══════════════════════════════════════════ */}
      <section style={{ padding: 'clamp(80px, 10vw, 160px) 0', borderTop: `1px solid ${borderColor}`, background: '#0a0f1c', color: '#F5F2ED' }}>
        <div style={sectionStyle}>
          <FadeIn>
            <h2 style={{ fontSize: 'clamp(32px, 5vw, 64px)', fontWeight: 900, color: '#F5F2ED', lineHeight: 1.1, letterSpacing: '-1.5px', margin: '0 0 16px 0', textAlign: 'center' }}>
              Understand threats.
            </h2>
            <h2 style={{ fontSize: 'clamp(32px, 5vw, 64px)', fontWeight: 900, color: accent, lineHeight: 1.1, letterSpacing: '-1.5px', margin: '0 0 80px 0', textAlign: 'center' }}>
              Without becoming one.
            </h2>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '32px', marginBottom: '64px', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '64px' }}>
              {[
                { label: 'Role', value: 'Full Stack + Security System Designer' },
                { label: 'Domain', value: 'Cybersecurity × Education × Ethical AI' },
                { label: 'Type', value: 'Static Analysis & Threat Platform' },
                { label: 'Stack', value: 'React · Node.js · MongoDB · TypeScript' },
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
              <a href="https://threat-lens-ui-backend.vercel.app/" target="_blank" rel="noopener noreferrer"
                style={{ padding: '16px 36px', background: accent, color: '#ffffff', fontFamily: "'IBM Plex Mono', monospace", fontSize: '12px', letterSpacing: '2px', fontWeight: 700, textTransform: 'uppercase', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px', borderRadius: '4px' }}>
                <ExternalLink size={16} /> Enter Platform
              </a>
              <a href="https://github.com/Rachit-Kakkad1/ThreatLens_UI_Backend" target="_blank" rel="noopener noreferrer"
                style={{ padding: '16px 36px', border: `1px solid rgba(255,255,255,0.2)`, color: '#ffffff', fontFamily: "'IBM Plex Mono', monospace", fontSize: '12px', letterSpacing: '2px', fontWeight: 700, textTransform: 'uppercase', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px', borderRadius: '4px', background: 'transparent' }}>
                <Github size={16} /> GitHub
              </a>
            </div>
          </FadeIn>
          <FadeIn delay={0.3}>
            <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '11px', color: 'rgba(255,255,255,0.3)', textAlign: 'center', margin: '80px 0 0 0', letterSpacing: '4px', fontWeight: 700 }}>
              SECURITY — EXPLAINED, NOT EXPLOITED.
            </p>
          </FadeIn>
        </div>
      </section>
    </motion.div>
  );
}
