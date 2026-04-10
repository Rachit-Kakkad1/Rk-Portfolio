import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Github, Globe, FileText, ExternalLink, Shield, Zap, BarChart3, Cpu, Layers, Leaf, ChevronRight } from 'lucide-react';

interface AgriCertDetailProps {
  onClose: () => void;
}

function SectionTag({ number, label }: { number: string; label: string }) {
  return (
    <div className="flex items-center gap-4 mb-8">
      <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '11px', letterSpacing: '3px', color: '#16a34a', fontWeight: 700 }}>{number}</span>
      <div style={{ width: '40px', height: '1px', background: 'linear-gradient(to right, #16a34a, transparent)' }} />
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

export default function AgriCertDetail({ onClose }: AgriCertDetailProps) {
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

  const accent = '#16a34a';
  const accentBg = 'rgba(22,163,74,';
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
      {/* ─── FIXED NAV BAR ─── */}
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
            { href: 'https://github.com/Rachit-Kakkad1/agricert-platform', icon: <Github size={16} /> },
            { href: 'https://agricert-khaki.vercel.app', icon: <Globe size={16} /> },
            { href: 'https://docs.google.com/document/d/1SQXzdd0F696l9_OcGtVPnEA_DszccIw5KZ2__57ZIeY/edit?usp=sharing', icon: <FileText size={16} /> },
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
      {/* SECTION 1: HERO */}
      {/* ═══════════════════════════════════════════ */}
      <section style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '20%', left: '50%', transform: 'translate(-50%, -50%)', width: '600px', height: '600px', background: `radial-gradient(circle, ${accentBg}0.06) 0%, transparent 70%)`, pointerEvents: 'none' }} />

        <div style={sectionStyle}>
          <motion.div initial={{ opacity: 0, y: 60 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}>
            <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '11px', letterSpacing: '5px', color: accent, textTransform: 'uppercase', marginBottom: '24px', fontWeight: 600 }}>
              Case Study — 2026
            </p>
            <h1 style={{ fontSize: 'clamp(48px, 12vw, 140px)', fontWeight: 900, color: textPrimary, lineHeight: 0.9, letterSpacing: '-4px', margin: '0 0 24px 0' }}>
              Agri<span style={{ color: accent }}>Cert</span>
            </h1>
            <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 'clamp(14px, 2vw, 20px)', color: textSecondary, maxWidth: '700px', lineHeight: 1.6, margin: '0 0 40px 0' }}>
              Digital Proof of Purity — Reimagining Agricultural Trust Through Cryptography, Design & Systems Thinking
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
              <a href="https://agricert-khaki.vercel.app" target="_blank" rel="noopener noreferrer"
                style={{ padding: '14px 28px', background: accent, color: '#ffffff', fontFamily: "'IBM Plex Mono', monospace", fontSize: '11px', letterSpacing: '2px', fontWeight: 700, textTransform: 'uppercase', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px', borderRadius: '4px' }}>
                <ExternalLink size={14} /> View Live
              </a>
              <a href="https://github.com/Rachit-Kakkad1/agricert-platform" target="_blank" rel="noopener noreferrer"
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
      {/* SECTION 2: THE PROBLEM */}
      {/* ═══════════════════════════════════════════ */}
      <section style={{ padding: 'clamp(80px, 10vw, 160px) 0', borderTop: `1px solid ${borderColor}` }}>
        <div style={sectionStyle}>
          <FadeIn>
            <SectionTag number="01" label="The Problem" />
            <h2 style={{ fontSize: 'clamp(28px, 5vw, 48px)', fontWeight: 800, color: textPrimary, lineHeight: 1.1, letterSpacing: '-1px', margin: '0 0 32px 0', maxWidth: '700px' }}>
              Trust in agriculture is paradoxically fragile
            </h2>
            <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '15px', lineHeight: 1.8, color: textSecondary, maxWidth: '700px', margin: '0 0 48px 0' }}>
              In a world where global food trade depends on trust, agricultural certification remains paper-based, slow, and easily manipulated. These are not UI problems — they are trust architecture failures.
            </p>
          </FadeIn>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '24px' }}>
            {[
              { icon: '⏱', stat: '7–10 days', label: 'Processing cycle delays' },
              { icon: '⚠️', stat: 'High Risk', label: 'Easily forgeable documents' },
              { icon: '🔍', stat: 'Zero', label: 'Real-time stakeholder visibility' },
              { icon: '📋', stat: 'Manual', label: 'Verification at customs' },
            ].map((item, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div style={{ padding: '28px', border: `1px solid ${borderColor}`, borderRadius: '12px', background: cardBg }}>
                  <span style={{ fontSize: '28px', display: 'block', marginBottom: '16px' }}>{item.icon}</span>
                  <p style={{ fontSize: '24px', fontWeight: 800, color: textPrimary, margin: '0 0 4px 0' }}>{item.stat}</p>
                  <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '12px', color: textMuted, margin: 0 }}>{item.label}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════ */}
      {/* SECTION 3: THE VISION */}
      {/* ═══════════════════════════════════════════ */}
      <section style={{ padding: 'clamp(80px, 10vw, 160px) 0', borderTop: `1px solid ${borderColor}` }}>
        <div style={sectionStyle}>
          <FadeIn>
            <SectionTag number="02" label="The Vision" />
            <h2 style={{ fontSize: 'clamp(28px, 5vw, 48px)', fontWeight: 800, color: textPrimary, lineHeight: 1.1, letterSpacing: '-1px', margin: '0 0 32px 0', maxWidth: '800px' }}>
              "Trust should be <span style={{ color: accent }}>computed</span>, not assumed"
            </h2>
            <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '15px', lineHeight: 1.8, color: textSecondary, maxWidth: '700px', margin: '0 0 48px 0' }}>
              AgriCert transforms certification into a cryptographically verifiable event, not a document. Instead of "trusting the issuer", the system enables trust in computation, cryptographic proof, and immutable records.
            </p>
          </FadeIn>
          <FadeIn delay={0.2}>
            <div style={{ padding: '40px', border: `1px solid ${accentBg}0.15)`, borderRadius: '16px', background: `linear-gradient(135deg, ${accentBg}0.04) 0%, ${accentBg}0.01) 100%)` }}>
              <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '18px', color: accent, fontWeight: 600, lineHeight: 1.6, margin: 0, textAlign: 'center' }}>
                "What if every crop carried a verifiable digital identity?"
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══════════════════════════════════════════ */}
      {/* SECTION 4: THE SOLUTION */}
      {/* ═══════════════════════════════════════════ */}
      <section style={{ padding: 'clamp(80px, 10vw, 160px) 0', borderTop: `1px solid ${borderColor}` }}>
        <div style={sectionStyle}>
          <FadeIn>
            <SectionTag number="03" label="The Solution" />
            <h2 style={{ fontSize: 'clamp(28px, 5vw, 48px)', fontWeight: 800, color: textPrimary, lineHeight: 1.1, letterSpacing: '-1px', margin: '0 0 32px 0', maxWidth: '700px' }}>
              A decentralized certification pipeline
            </h2>
            <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '15px', lineHeight: 1.8, color: textSecondary, maxWidth: '700px', margin: '0 0 48px 0' }}>
              AgriCert is architected as a distributed trust pipeline connecting three actors: Exporter → QA Agency → Importer. Each interaction is logged, signed & verifiable.
            </p>
          </FadeIn>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '24px' }}>
            {[
              { icon: <Shield size={24} />, title: 'QR Verification', desc: 'Instant, real-world verification of certificate authenticity via QR codes.' },
              { icon: <Zap size={24} />, title: 'Cryptographic Signatures', desc: 'Every certificate is digitally signed, guaranteeing authenticity and origin.' },
              { icon: <Layers size={24} />, title: 'Immutable Logs', desc: 'All certification events are permanently recorded in an unalterable audit trail.' },
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
      {/* SECTION 5: EXPERIENCE DESIGN */}
      {/* ═══════════════════════════════════════════ */}
      <section style={{ padding: 'clamp(80px, 10vw, 160px) 0', borderTop: `1px solid ${borderColor}` }}>
        <div style={sectionStyle}>
          <FadeIn>
            <SectionTag number="04" label="Experience Design" />
            <h2 style={{ fontSize: 'clamp(28px, 5vw, 48px)', fontWeight: 800, color: textPrimary, lineHeight: 1.1, letterSpacing: '-1px', margin: '0 0 32px 0', maxWidth: '700px' }}>
              Clarity over Complexity
            </h2>
          </FadeIn>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
            {[
              { label: 'Whitespace', desc: 'Breathing room for cognitive clarity' },
              { label: 'Typographic Hierarchy', desc: 'Clear visual information structure' },
              { label: 'Muted Palette', desc: 'Authority and professionalism' },
              { label: 'Green Accents', desc: 'Verification & authenticity signals' },
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
      {/* SECTION 6: SYSTEM ARCHITECTURE */}
      {/* ═══════════════════════════════════════════ */}
      <section style={{ padding: 'clamp(80px, 10vw, 160px) 0', borderTop: `1px solid ${borderColor}` }}>
        <div style={sectionStyle}>
          <FadeIn><SectionTag number="05" label="System Architecture" /></FadeIn>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
            {[
              { layer: 'Frontend', tech: 'React 19 + Vite', reason: 'Ultra-fast rendering, modular UI' },
              { layer: 'Backend', tech: 'Node.js + Express', reason: 'Event-driven scalability' },
              { layer: 'Database', tech: 'MongoDB Atlas', reason: 'Flexible document storage' },
              { layer: 'Security', tech: 'JWT + Bcrypt', reason: 'Hardened authentication' },
              { layer: 'Crypto', tech: 'CryptoJS + QR', reason: 'Lightweight crypto layer' },
              { layer: 'Architecture', tech: 'Stateless APIs', reason: 'RBAC + service decoupling' },
            ].map((item, i) => (
              <FadeIn key={i} delay={i * 0.06}>
                <div style={{ padding: '24px', border: `1px solid ${borderColor}`, borderRadius: '8px', background: cardBg }}>
                  <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '10px', letterSpacing: '3px', color: accent, textTransform: 'uppercase', margin: '0 0 8px 0', fontWeight: 600 }}>{item.layer}</p>
                  <p style={{ fontSize: '16px', fontWeight: 700, color: textPrimary, margin: '0 0 4px 0' }}>{item.tech}</p>
                  <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '12px', color: textMuted, margin: 0 }}>{item.reason}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════ */}
      {/* SECTION 7: CORE INNOVATION */}
      {/* ═══════════════════════════════════════════ */}
      <section style={{ padding: 'clamp(80px, 10vw, 160px) 0', borderTop: `1px solid ${borderColor}`, background: `linear-gradient(180deg, ${accentBg}0.03) 0%, transparent 100%)` }}>
        <div style={sectionStyle}>
          <FadeIn>
            <SectionTag number="06" label="Core Innovation" />
            <h2 style={{ fontSize: 'clamp(28px, 5vw, 48px)', fontWeight: 800, color: textPrimary, lineHeight: 1.1, letterSpacing: '-1px', margin: '0 0 32px 0' }}>
              Every certificate = <span style={{ color: accent }}>Hash + Signature + QR</span>
            </h2>
          </FadeIn>
          <FadeIn delay={0.2}>
            <div style={{ padding: '48px 40px', border: `2px solid ${accentBg}0.2)`, borderRadius: '16px', background: `${accentBg}0.04)`, textAlign: 'center' }}>
              <p style={{ fontSize: 'clamp(36px, 7vw, 72px)', fontWeight: 900, color: accent, margin: '0 0 8px 0', lineHeight: 1 }}>3 seconds</p>
              <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '14px', color: textMuted, margin: 0, letterSpacing: '2px', textTransform: 'uppercase' }}>Trust verification — usable anywhere globally</p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══════════════════════════════════════════ */}
      {/* SECTION 8: PRODUCT BREAKDOWN */}
      {/* ═══════════════════════════════════════════ */}
      <section style={{ padding: 'clamp(80px, 10vw, 160px) 0', borderTop: `1px solid ${borderColor}` }}>
        <div style={sectionStyle}>
          <FadeIn><SectionTag number="07" label="Product Breakdown" /></FadeIn>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
            {[
              { title: 'Exporter Layer', items: ['Batch creation in < 2 minutes', 'Real-time lifecycle tracking', 'Trade-ready digital documentation'] },
              { title: 'QA Agency Layer', items: ['Structured inspection modules', 'Automated certificate issuance', 'Immutable audit logs'] },
              { title: 'Importer Layer', items: ['Instant QR validation', 'Zero-ambiguity data access', 'Direct procurement workflows'] },
            ].map((layer, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div style={{ padding: '32px', border: `1px solid ${borderColor}`, borderRadius: '12px', background: cardBg, height: '100%' }}>
                  <h3 style={{ fontSize: '18px', fontWeight: 700, color: accent, margin: '0 0 20px 0', fontFamily: "'IBM Plex Mono', monospace" }}>{layer.title}</h3>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {layer.items.map((item, j) => (
                      <li key={j} style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '13px', color: textSecondary, display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                        <span style={{ color: accent, flexShrink: 0, marginTop: '2px' }}>▸</span> {item}
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
      {/* SECTION 9: IMPACT METRICS */}
      {/* ═══════════════════════════════════════════ */}
      <section style={{ padding: 'clamp(80px, 10vw, 160px) 0', borderTop: `1px solid ${borderColor}` }}>
        <div style={sectionStyle}>
          <FadeIn><SectionTag number="08" label="Impact Metrics" /></FadeIn>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '32px' }}>
            {[
              { value: '70–80%', label: 'Reduction in certification time' },
              { value: '99%+', label: 'Verification accuracy' },
              { value: '≈ 0', label: 'Forgery probability' },
              { value: 'Instant', label: 'Verification vs manual checks' },
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
      {/* SECTION 10: DIFFERENTIATOR */}
      {/* ═══════════════════════════════════════════ */}
      <section style={{ padding: 'clamp(80px, 10vw, 160px) 0', borderTop: `1px solid ${borderColor}` }}>
        <div style={sectionStyle}>
          <FadeIn>
            <SectionTag number="09" label="The Differentiator" />
            <h2 style={{ fontSize: 'clamp(28px, 5vw, 48px)', fontWeight: 800, color: textPrimary, lineHeight: 1.1, letterSpacing: '-1px', margin: '0 0 32px 0', maxWidth: '800px' }}>
              Most systems digitize workflows. AgriCert digitizes <span style={{ color: accent }}>trust itself</span>.
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '600px' }}>
              {['Removes reliance on intermediaries', 'Enables global interoperability', 'Scales without increasing trust friction'].map((item, i) => (
                <FadeIn key={i} delay={i * 0.1}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: accent, flexShrink: 0 }} />
                    <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '14px', color: textSecondary, margin: 0 }}>{item}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══════════════════════════════════════════ */}
      {/* SECTION 11: FUTURE ROADMAP */}
      {/* ═══════════════════════════════════════════ */}
      <section style={{ padding: 'clamp(80px, 10vw, 160px) 0', borderTop: `1px solid ${borderColor}` }}>
        <div style={sectionStyle}>
          <FadeIn><SectionTag number="10" label="Future Trajectory" /></FadeIn>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
            {[
              { icon: <Layers size={20} />, title: 'Blockchain Layer', desc: 'Transition to permissioned ledger' },
              { icon: <Cpu size={20} />, title: 'AI Engine', desc: 'Predict crop shelf-life & quality' },
              { icon: <Zap size={20} />, title: 'Mobile QA App', desc: 'Offline-first field inspections' },
              { icon: <Leaf size={20} />, title: 'Carbon Intelligence', desc: 'ESG scoring per shipment' },
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
      {/* SECTION 12: FOOTER / META */}
      {/* ═══════════════════════════════════════════ */}
      <section style={{ padding: 'clamp(60px, 8vw, 120px) 0', borderTop: `1px solid ${accentBg}0.15)`, background: `linear-gradient(0deg, ${accentBg}0.03) 0%, transparent 100%)` }}>
        <div style={sectionStyle}>
          <FadeIn>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '32px', marginBottom: '48px' }}>
              {[
                { label: 'Role', value: 'Full-Stack Engineer / System Designer' },
                { label: 'Domain', value: 'AgriTech × Cryptography × Supply Chain' },
                { label: 'Type', value: 'Production-grade Web Platform' },
                { label: 'Focus', value: 'Trust Infrastructure, System Design, UX Precision' },
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
              <a href="https://agricert-khaki.vercel.app" target="_blank" rel="noopener noreferrer"
                style={{ padding: '14px 28px', background: accent, color: '#ffffff', fontFamily: "'IBM Plex Mono', monospace", fontSize: '11px', letterSpacing: '2px', fontWeight: 700, textTransform: 'uppercase', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px', borderRadius: '4px' }}>
                <ExternalLink size={14} /> View Live
              </a>
              <a href="https://github.com/Rachit-Kakkad1/agricert-platform" target="_blank" rel="noopener noreferrer"
                style={{ padding: '14px 28px', border: `1px solid ${borderColor}`, color: textPrimary, fontFamily: "'IBM Plex Mono', monospace", fontSize: '11px', letterSpacing: '2px', fontWeight: 700, textTransform: 'uppercase', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px', borderRadius: '4px', background: cardBg }}>
                <Github size={14} /> GitHub
              </a>
              <a href="https://docs.google.com/document/d/1SQXzdd0F696l9_OcGtVPnEA_DszccIw5KZ2__57ZIeY/edit?usp=sharing" target="_blank" rel="noopener noreferrer"
                style={{ padding: '14px 28px', border: `1px solid ${borderColor}`, color: textPrimary, fontFamily: "'IBM Plex Mono', monospace", fontSize: '11px', letterSpacing: '2px', fontWeight: 700, textTransform: 'uppercase', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px', borderRadius: '4px', background: cardBg }}>
                <FileText size={14} /> Documentation
              </a>
            </div>
          </FadeIn>
          <FadeIn delay={0.3}>
            <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '11px', color: textMuted, textAlign: 'center', margin: '64px 0 0 0', letterSpacing: '2px' }}>
              PORTFOLIO OF RACHIT KAKKAD — 2026
            </p>
          </FadeIn>
        </div>
      </section>
    </motion.div>
  );
}
