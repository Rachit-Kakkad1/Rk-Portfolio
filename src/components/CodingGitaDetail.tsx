import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowLeft, Github, Globe, FileText, ExternalLink, ShieldAlert, Cpu, Database, Volume2, Users, Layers, Zap, CheckCircle2, Server } from 'lucide-react';

interface CodingGitaDetailProps {
  onClose: () => void;
}

function SectionTag({ number, label }: { number: string; label: string }) {
  return (
    <div className="flex items-center gap-4 mb-8">
      <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '11px', letterSpacing: '3px', color: '#D4AF37', fontWeight: 700 }}>{number}</span>
      <div style={{ width: '40px', height: '1px', background: 'linear-gradient(to right, #D4AF37, transparent)' }} />
      <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '10px', letterSpacing: '4px', color: '#FFFFFF', opacity: 0.4, textTransform: 'uppercase', fontWeight: 600 }}>{label}</span>
    </div>
  );
}

function FadeIn({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, filter: 'blur(10px)', y: 20 }}
      whileInView={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 1.2, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function CodingGitaDetail({ onClose }: CodingGitaDetailProps) {
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

  const accent = '#6366f1';
  const accentBg = 'rgba(99,102,241,';
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
        background: 'rgba(3,3,8,0.85)', backdropFilter: 'blur(20px)',
        borderBottom: `1px solid ${borderColor}`,
        padding: '16px clamp(16px, 4vw, 48px)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <button onClick={onClose} style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'none', border: 'none', color: textSecondary, cursor: 'pointer', fontFamily: "'IBM Plex Mono', monospace", fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', transition: 'color 0.3s' }}
          onMouseEnter={e => (e.currentTarget.style.color = textPrimary)}
          onMouseLeave={e => (e.currentTarget.style.color = textSecondary as string)}
        ><ArrowLeft size={16} /> Exit Arena</button>
        <div style={{ display: 'flex', gap: '12px' }}>
          {[
            { href: '#', icon: <Github size={16} /> },
            { href: '#', icon: <Globe size={16} /> },
          ].map((link, i) => (
            <a key={i} href={link.href} target="_blank" rel="noopener noreferrer"
              style={{ padding: '8px', borderRadius: '4px', border: `1px solid ${borderColor}`, color: textMuted, display: 'flex', alignItems: 'center', transition: 'all 0.3s', background: 'transparent' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = accent; e.currentTarget.style.color = accent; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = borderColor; e.currentTarget.style.color = textMuted; }}
            >{link.icon}</a>
          ))}
        </div>
      </div>

      {/* ═══════════════════════════════════════════ */}
      {/* SECTION 1: HERO - DETERMINISTIC ARENA */}
      {/* ═══════════════════════════════════════════ */}
      <section style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', position: 'relative' }}>
        {/* Subtle grid background */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        
        <div style={sectionStyle}>
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }} style={{ borderLeft: `2px solid ${accent}`, paddingLeft: '32px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '32px' }}>
              <div style={{ width: '8px', height: '8px', background: accent, boxShadow: `0 0 12px ${accent}` }} />
              <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '11px', letterSpacing: '4px', color: accent, textTransform: 'uppercase', fontWeight: 700, margin: 0 }}>
                Official Auction Arena
              </p>
            </div>
            
            <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(48px, 8vw, 110px)', fontWeight: 900, color: textPrimary, lineHeight: 1, letterSpacing: '-2px', margin: '0 0 24px 0' }}>
              CodingGita<br/>Auction.
            </h1>
            
            <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 'clamp(18px, 3vw, 28px)', color: textSecondary, maxWidth: '800px', lineHeight: 1.4, margin: '0 0 48px 0', fontWeight: 400 }}>
              Real-time. Without randomness.
            </p>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '24px', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <CheckCircle2 size={16} color={accent} />
                <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '12px', color: textMuted, textTransform: 'uppercase', letterSpacing: '1px' }}>Deterministic Queue</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <CheckCircle2 size={16} color={accent} />
                <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '12px', color: textMuted, textTransform: 'uppercase', letterSpacing: '1px' }}>Cross-Tab Sync</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <CheckCircle2 size={16} color={accent} />
                <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '12px', color: textMuted, textTransform: 'uppercase', letterSpacing: '1px' }}>Zero-Failure Execution</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════ */}
      {/* SECTION 2: THE PROBLEM */}
      {/* ═══════════════════════════════════════════ */}
      <section style={{ padding: 'clamp(80px, 10vw, 160px) 0', borderTop: `1px solid ${borderColor}`, background: '#05050A' }}>
        <div style={sectionStyle}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '40px' }}>
            <div className="col-span-12 md:col-span-6">
              <FadeIn>
                <SectionTag number="01" label="The Problem" />
                <h2 style={{ fontSize: 'clamp(32px, 5vw, 56px)', fontWeight: 800, color: textPrimary, lineHeight: 1.1, letterSpacing: '-1px', margin: '0 0 32px 0' }}>
                  Live events don't<br/>forgive failure.
                </h2>
              </FadeIn>
            </div>
            <div className="col-span-12 md:col-span-6 flex flex-col justify-center">
              <FadeIn delay={0.2}>
                <p style={{ fontSize: '18px', lineHeight: 1.6, color: textSecondary, margin: '0 0 32px 0' }}>
                  Most supposedly "real-time" applications crumble under the strict requirements of a live institutional event. They suffer from race conditions, inconsistent states upon refresh, and catastrophic queue drifting when network latency strikes.
                </p>
                <div style={{ padding: '24px', background: cardBg, border: `1px solid ${borderColor}` }}>
                  <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '14px', color: accent, margin: 0, textTransform: 'uppercase', letterSpacing: '1px' }}>
                    UNRELIABLE SYSTEMS = BROKEN AUTHORITY
                  </p>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════ */}
      {/* SECTION 3: THE INSIGHT & VISION */}
      {/* ═══════════════════════════════════════════ */}
      <section style={{ padding: 'clamp(80px, 10vw, 160px) 0', borderTop: `1px solid ${borderColor}` }}>
        <div style={sectionStyle}>
          <FadeIn>
            <div style={{ textAlign: 'center', maxWidth: '900px', margin: '0 auto' }}>
              <SectionTag number="02" label="The Insight" />
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontStyle: 'italic', fontSize: 'clamp(40px, 6vw, 64px)', fontWeight: 600, color: textPrimary, lineHeight: 1.1, margin: '0 0 40px 0' }}>
                "Real-time systems fail without determinism."
              </h2>
              <p style={{ fontSize: '20px', color: textSecondary, maxWidth: '600px', margin: '0 auto 80px' }}>
                The solution is a deterministic real-time architecture engineered for correctness, fairness, and absolute zero-failure execution.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══════════════════════════════════════════ */}
      {/* SECTION 4: SYSTEM CAPABILITIES & RELIABILITY */}
      {/* ═══════════════════════════════════════════ */}
      <section style={{ padding: 'clamp(80px, 10vw, 160px) 0', borderTop: `1px solid ${borderColor}`, background: '#05050A' }}>
        <div style={sectionStyle}>
          <FadeIn>
            <SectionTag number="03" label="Live Reliability Guarantees" />
          </FadeIn>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px' }}>
            {[
              { title: 'Refresh-Safe State', desc: 'No data loss on page refresh powered by atomic LocalStorage syncing.', icon: <Database /> },
              { title: 'Cross-Tab Synchronization', desc: 'BroadcastChannel API ensures all windows reflect identical state instantly without server roundtrips.', icon: <Layers /> },
              { title: 'Deterministic Seeded PRNG', desc: 'No queue drift across sessions. The randomizer generates the exact same sequence every time.', icon: <Cpu /> },
              { title: 'Debounced Audio Routing', desc: 'No overlapping sounds or race conditions. Conditional event-based triggers.', icon: <Volume2 /> },
            ].map((prop, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div style={{ padding: '40px', background: cardBg, border: `1px solid ${borderColor}`, height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <div style={{ color: accent, marginBottom: '24px' }}>{prop.icon}</div>
                  <h3 style={{ fontSize: '20px', fontWeight: 700, color: textPrimary, margin: '0 0 16px 0' }}>{prop.title}</h3>
                  <p style={{ fontSize: '15px', color: textSecondary, margin: 0, lineHeight: 1.6 }}>{prop.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════ */}
      {/* SECTION 5: ARCHITECTURE TOPOLOGY */}
      {/* ═══════════════════════════════════════════ */}
      <section style={{ padding: 'clamp(80px, 10vw, 160px) 0', borderTop: `1px solid ${borderColor}` }}>
        <div style={sectionStyle}>
          <FadeIn>
            <SectionTag number="04" label="Architecture Topology" />
            <h2 style={{ fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: 800, color: textPrimary, lineHeight: 1.1, letterSpacing: '-1px', margin: '0 0 64px 0' }}>
              Authoritative State Store
            </h2>
          </FadeIn>

          <FadeIn delay={0.2}>
            {/* Minimalist ASCII-inspired architecture breakdown */}
            <div style={{ border: `1px solid ${borderColor}`, background: cardBg, padding: 'clamp(24px, 5vw, 64px)', fontFamily: "'IBM Plex Mono', monospace", overflowX: 'auto' }}>
              <pre style={{ fontSize: '13px', color: textSecondary, lineHeight: 1.6, margin: 0 }}>
{`┌─────────────────────────────────────────────────────────────┐
│                    CodingGita Auction                       │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌─────────────┐    ┌─────────────┐    ┌─────────────┐      │
│  │   Landing   │───▶│   Auction   │───▶│    Admin    │      │
│  │   Ceremony  │    │    Stage    │    │   Portal    │      │
│  └─────────────┘    └─────────────┘    └─────────────┘      │
│                            │                                │
│                            ▼                                │
│  ┌──────────────────────────────────────────────────────┐   │
│  │              Authoritative State Store               │   │
│  │  • LocalStorage Persistence                          │   │
│  │  • BroadcastChannel Sync                             │   │
│  │  • Seeded PRNG Queue                                 │   │
│  └──────────────────────────────────────────────────────┘   │
│                            │                                │
│                            ▼ (Async)                        │
│                  ┌───────────────────┐                      │
│                  │   Backend (API)   │                      │
│                  └─────────┬─────────┘                      │
│                            │                                │
│             ┌──────────────┴──────────────┐                 │
│             ▼                             ▼                 │
│      MongoDB (Log)                Google Sheets (Live)      │
└─────────────────────────────────────────────────────────────┘`}
              </pre>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══════════════════════════════════════════ */}
      {/* SECTION 6: PERFORMANCE & DIFFERENTIATION */}
      {/* ═══════════════════════════════════════════ */}
      <section style={{ padding: 'clamp(80px, 10vw, 160px) 0', borderTop: `1px solid ${borderColor}`, background: '#05050A' }}>
        <div style={sectionStyle}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '40px' }}>
            <div className="col-span-12 md:col-span-6">
              <FadeIn>
                <div style={{ padding: '48px', border: `1px solid ${accent}`, background: `rgba(212, 175, 55, 0.03)`, height: '100%' }}>
                  <SectionTag number="05" label="Differentiation" />
                  <p style={{ fontSize: '16px', color: textSecondary, marginBottom: '24px' }}>This is not:</p>
                  <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 32px 0', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <li style={{ textDecoration: 'line-through', color: textMuted, fontFamily: "'IBM Plex Mono', monospace", fontSize: '14px' }}>a gamified UI</li>
                    <li style={{ textDecoration: 'line-through', color: textMuted, fontFamily: "'IBM Plex Mono', monospace", fontSize: '14px' }}>a random auction app</li>
                  </ul>
                  <p style={{ fontSize: '16px', color: textSecondary, marginBottom: '16px' }}>This is:</p>
                  <p style={{ fontSize: '28px', fontWeight: 800, color: accent, lineHeight: 1.2, margin: 0 }}>
                    A strict deterministic event system.
                  </p>
                </div>
              </FadeIn>
            </div>
            
            <div className="col-span-12 md:col-span-6 flex flex-col justify-end">
              <FadeIn delay={0.2}>
                <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(40px, 6vw, 72px)', fontWeight: 900, color: textPrimary, lineHeight: 1, letterSpacing: '-2px', margin: '0 0 24px 0' }}>
                  Correctness<br/>
                  <span style={{ fontStyle: 'italic', color: accent }}>is the feature.</span>
                </h2>
                <div style={{ padding: '32px', background: cardBg, border: `1px solid ${borderColor}`, marginTop: '40px' }}>
                   <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '13px', color: textMuted, textTransform: 'uppercase', marginBottom: '16px', letterSpacing: '1px' }}>Performance Targets</p>
                   <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', fontFamily: "'IBM Plex Mono', monospace", fontSize: '14px' }}>
                     <div><span style={{ color: textSecondary }}>FCP</span> <br/><span style={{ color: textPrimary }}>&lt; 1s</span></div>
                     <div><span style={{ color: textSecondary }}>TTI</span> <br/><span style={{ color: textPrimary }}>&lt; 2s</span></div>
                     <div><span style={{ color: textSecondary }}>Bundle</span> <br/><span style={{ color: textPrimary }}>&lt; 500KB</span></div>
                     <div><span style={{ color: textSecondary }}>Latency</span> <br/><span style={{ color: accent, fontWeight: 700 }}>0ms (Optimistic)</span></div>
                   </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════ */}
      {/* SECTION 7: FOOTER / META */}
      {/* ═══════════════════════════════════════════ */}
      <section style={{ padding: 'clamp(64px, 10vw, 120px) 0', borderTop: `1px solid ${borderColor}`, background: '#030308' }}>
        <div style={sectionStyle}>
          <FadeIn>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '32px', marginBottom: '64px' }}>
              {[
                { label: 'Role', value: 'System Architect' },
                { label: 'Domain', value: 'Live Events × Determinism' },
                { label: 'Type', value: 'Production Ready Private' },
                { label: 'Stack', value: 'React 18 · TypeScript · Vite · MongoDB' },
              ].map((meta, i) => (
                <div key={i}>
                  <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '10px', letterSpacing: '3px', color: textSecondary, textTransform: 'uppercase', margin: '0 0 8px 0', fontWeight: 600 }}>{meta.label}</p>
                  <p style={{ fontSize: '14px', color: textPrimary, fontWeight: 500, margin: 0 }}>{meta.value}</p>
                </div>
              ))}
            </div>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '10px', color: textMuted, textAlign: 'center', margin: '80px 0 0 0', letterSpacing: '2px', textTransform: 'uppercase' }}>
              "Correctness over convenience. Authority over spectacle. Reliability over novelty."
            </p>
          </FadeIn>
        </div>
      </section>
    </motion.div>
  );
}
