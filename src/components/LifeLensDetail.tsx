import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowLeft, Github, Globe, FileText, ExternalLink, Activity, Leaf, Brain, Zap, Moon, Cloud, CheckCircle, Smartphone } from 'lucide-react';

interface LifeLensDetailProps {
  onClose: () => void;
}

function SectionTag({ number, label }: { number: string; label: string }) {
  return (
    <div className="flex items-center gap-4 mb-8">
      <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '11px', letterSpacing: '3px', color: '#10b981', fontWeight: 700 }}>{number}</span>
      <div style={{ width: '40px', height: '1px', background: 'linear-gradient(to right, #10b981, transparent)' }} />
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
      transition={{ duration: 1, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function LifeLensDetail({ onClose }: LifeLensDetailProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ container: containerRef });
  
  // Parallax for Background Gradient
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);

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
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 clamp(16px, 4vw, 48px)',
    position: 'relative',
    zIndex: 10,
  };

  const textPrimary = '#1A1816';
  const textSecondary = 'rgba(26,24,22,0.6)';
  const textMuted = 'rgba(26,24,22,0.35)';
  const bg = '#F5F2ED';
  const glassBg = 'rgba(255, 255, 255, 0.5)';
  const glassBorder = 'rgba(255, 255, 255, 0.6)';
  const borderColor = 'rgba(0,0,0,0.06)';

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      data-lenis-prevent="true"
      style={{ position: 'fixed', inset: 0, zIndex: 200, background: bg, overflowY: 'auto', overflowX: 'hidden', color: textPrimary }}
    >
      {/* ─── AMBIENT BACKGROUND GRADIENT ─── */}
      <motion.div 
        style={{ 
          position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0,
          y: bgY,
          background: 'radial-gradient(circle at 20% 10%, rgba(16, 185, 129, 0.08) 0%, transparent 40%), radial-gradient(circle at 80% 60%, rgba(59, 130, 246, 0.08) 0%, transparent 40%), radial-gradient(circle at 50% 90%, rgba(168, 85, 247, 0.06) 0%, transparent 50%)',
          filter: 'blur(40px)',
        }} 
      />

      {/* ─── FIXED NAV BAR ─── */}
      <div style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 210,
        background: 'rgba(245,242,237,0.7)', backdropFilter: 'blur(20px)',
        borderBottom: `1px solid ${borderColor}`,
        padding: '16px clamp(16px, 4vw, 48px)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <button onClick={onClose} style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'none', border: 'none', color: textSecondary, cursor: 'pointer', fontFamily: "'IBM Plex Mono', monospace", fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', transition: 'color 0.3s' }}
          onMouseEnter={e => (e.currentTarget.style.color = textPrimary)}
          onMouseLeave={e => (e.currentTarget.style.color = textSecondary as string)}
        ><ArrowLeft size={16} /> Back to Dashboard</button>
        <div style={{ display: 'flex', gap: '12px' }}>
          {[
            { href: '#', icon: <Github size={16} /> },
            { href: '#', icon: <Globe size={16} /> },
          ].map((link, i) => (
            <a key={i} href={link.href} target="_blank" rel="noopener noreferrer"
              style={{ padding: '8px', borderRadius: '12px', border: `1px solid ${glassBorder}`, color: textMuted, display: 'flex', alignItems: 'center', transition: 'all 0.3s', background: glassBg, backdropFilter: 'blur(10px)' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = textPrimary; e.currentTarget.style.color = textPrimary; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = glassBorder; e.currentTarget.style.color = textMuted; }}
            >{link.icon}</a>
          ))}
        </div>
      </div>

      {/* ═══════════════════════════════════════════ */}
      {/* SECTION 1: HERO - EMOTIONAL ENTRY */}
      {/* ═══════════════════════════════════════════ */}
      <section style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', paddingTop: '80px' }}>
        <div style={sectionStyle}>
          <motion.div initial={{ opacity: 0, y: 60 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '8px 16px', background: glassBg, backdropFilter: 'blur(10px)', border: `1px solid ${glassBorder}`, borderRadius: '100px', marginBottom: '40px' }}>
              <Leaf size={14} color="#10b981" />
              <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '11px', letterSpacing: '2px', color: textSecondary, textTransform: 'uppercase', fontWeight: 600, margin: 0 }}>
                Dual Intelligence for Human & Planet
              </p>
            </div>
            
            <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(56px, 10vw, 130px)', fontWeight: 900, color: textPrimary, lineHeight: 1, letterSpacing: '-3px', margin: '0 0 32px 0', textShadow: '0 10px 40px rgba(0,0,0,0.03)' }}>
              LifeLens AI
            </h1>
            
            <p style={{ fontFamily: "'Playfair Display', serif", fontStyle: 'italic', fontSize: 'clamp(24px, 4vw, 40px)', color: textPrimary, maxWidth: '800px', lineHeight: 1.3, margin: '0 0 24px 0' }}>
              "Feel better. Live smarter. Heal the planet."
            </p>
            
            <p style={{ fontSize: 'clamp(16px, 2vw, 20px)', color: textSecondary, maxWidth: '600px', lineHeight: 1.6, margin: '0 0 48px 0' }}>
              What if your habits could optimize both you and the Earth?
            </p>

            <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} style={{ width: '1px', height: '80px', background: 'linear-gradient(to bottom, rgba(0,0,0,0.2), transparent)' }} />
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════ */}
      {/* SECTION 2: THE PROBLEM */}
      {/* ═══════════════════════════════════════════ */}
      <section style={{ padding: 'clamp(80px, 10vw, 160px) 0' }}>
        <div style={sectionStyle}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '40px' }}>
            <div className="col-span-12 md:col-span-5">
              <FadeIn>
                <SectionTag number="01" label="Disconnected Systems" />
                <h2 style={{ fontSize: 'clamp(32px, 5vw, 56px)', fontWeight: 800, color: textPrimary, lineHeight: 1.1, letterSpacing: '-1.5px', margin: '0 0 32px 0' }}>
                  Two realities.<br/>Never synchronized.
                </h2>
              </FadeIn>
            </div>
            <div className="col-span-12 md:col-span-6 md:col-start-7">
              <FadeIn delay={0.2}>
                <p style={{ fontSize: '20px', lineHeight: 1.6, color: textSecondary, margin: '0 0 32px 0', borderLeft: `2px solid ${borderColor}`, paddingLeft: '24px' }}>
                  Health tracking is isolated. Sustainability tracking is abstract.<br/>
                  Existing tools provide fragmented insights, failing to create true behavioral change.
                </p>
                <div style={{ padding: '32px', background: glassBg, backdropFilter: 'blur(20px)', borderRadius: '24px', border: `1px solid ${glassBorder}` }}>
                  <p style={{ fontSize: '18px', fontWeight: 600, color: textPrimary, margin: 0 }}>
                    Result: <span style={{ color: textSecondary }}>People cannot see the actual impact of their daily decisions. Awareness exists without action.</span>
                  </p>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════ */}
      {/* SECTION 3: THE INSIGHT & THE VISION */}
      {/* ═══════════════════════════════════════════ */}
      <section style={{ padding: 'clamp(80px, 10vw, 160px) 0', borderTop: `1px solid ${borderColor}` }}>
        <div style={sectionStyle}>
          <FadeIn>
            <div style={{ textAlign: 'center', maxWidth: '900px', margin: '0 auto 120px' }}>
              <SectionTag number="02" label="The Insight" />
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontStyle: 'italic', fontSize: 'clamp(40px, 6vw, 64px)', fontWeight: 600, color: textPrimary, lineHeight: 1.1, margin: '0 0 32px 0' }}>
                "The same habit that improves your health can reduce your carbon footprint."
              </h2>
              <p style={{ fontSize: '18px', color: textSecondary }}>Human behavior is not linear. It is deeply interconnected.</p>
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <SectionTag number="03" label="The Vision" />
            <h2 style={{ fontSize: 'clamp(32px, 5vw, 56px)', fontWeight: 800, color: textPrimary, lineHeight: 1.1, letterSpacing: '-1.5px', margin: '0 0 64px 0' }}>Dual-Lens Intelligence.</h2>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px' }}>
              <div style={{ padding: '48px', background: glassBg, backdropFilter: 'blur(20px)', borderRadius: '32px', border: `1px solid ${glassBorder}`, boxShadow: '0 20px 40px rgba(0,0,0,0.02)' }}>
                <Activity size={32} color="#10b981" style={{ marginBottom: '24px' }} />
                <h3 style={{ fontSize: '24px', fontWeight: 700, margin: '0 0 16px 0' }}>Internal Lens</h3>
                <p style={{ fontSize: '16px', color: textSecondary, margin: '0 0 24px 0' }}>Vitality tracking mapping sleep, physical energy, and mood stability.</p>
              </div>
              
              <div style={{ padding: '48px', background: glassBg, backdropFilter: 'blur(20px)', borderRadius: '32px', border: `1px solid ${glassBorder}`, boxShadow: '0 20px 40px rgba(0,0,0,0.02)' }}>
                <Cloud size={32} color="#3b82f6" style={{ marginBottom: '24px' }} />
                <h3 style={{ fontSize: '24px', fontWeight: 700, margin: '0 0 16px 0' }}>External Lens</h3>
                <p style={{ fontSize: '16px', color: textSecondary, margin: '0 0 24px 0' }}>Footprint computation mapping carbon output, transport choices, and lifestyle.</p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══════════════════════════════════════════ */}
      {/* SECTION 4: CORE ENGINE - DUAL ANALYTICS */}
      {/* ═══════════════════════════════════════════ */}
      <section style={{ padding: 'clamp(80px, 10vw, 160px) 0' }}>
        <div style={sectionStyle}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '64px' }}>
            <FadeIn>
              <SectionTag number="04" label="Core Analytics Engine" />
              <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '40px' }}>
                <h2 style={{ fontSize: 'clamp(32px, 5vw, 64px)', fontWeight: 800, color: textPrimary, lineHeight: 1.1, letterSpacing: '-2px', maxWidth: '600px', margin: 0 }}>
                  Your internal state and external impact evolve together.
                </h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '400px' }}>
                  <p style={{ fontSize: '16px', color: textSecondary, lineHeight: 1.6, margin: 0 }}>
                    LifeLens simultaneously processes vitality score calculations and carbon footprint computations utilizing synchronized data updates. Data points aren't just logged; they are synthesized into a living, unified metric.
                  </p>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════ */}
      {/* SECTION 5: AI INTELLIGENCE (GEMINI) */}
      {/* ═══════════════════════════════════════════ */}
      <section style={{ padding: 'clamp(80px, 10vw, 160px) 0', borderTop: `1px solid ${borderColor}`, background: `linear-gradient(180deg, transparent 0%, rgba(255,255,255,0.4) 100%)` }}>
        <div style={sectionStyle}>
          <FadeIn>
            <SectionTag number="05" label="Gemini AI Intelligence" />
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '40px' }}>
              <div className="col-span-12 lg:col-span-5 relative">
                <Brain size={120} color="#a855f7" className="mb-8 opacity-20" />
                <h2 style={{ fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: 800, color: textPrimary, lineHeight: 1.1, letterSpacing: '-1.5px', margin: '0 0 24px 0' }}>
                  AI is analytical,<br/>not chat-based.
                </h2>
                <p style={{ fontSize: '18px', color: textSecondary, lineHeight: 1.6, marginBottom: '32px' }}>
                  LifeLens uses <strong>Google Gemini</strong> as a behavioral reasoning engine. It detects hidden correlations, predicts outcomes, and suggests optimized habits entirely autonomously.
                </p>
              </div>
              
              <div className="col-span-12 lg:col-span-6 lg:col-start-7 flex flex-col justify-center gap-6">
                {[
                  { title: "Better sleep correlates with lower emissions", text: "Users record 18% better sleep patterns on zero-emission transport days." },
                  { title: "Mood influences consumption", text: "Balanced emotional states drastically reduce impulsive, high-carbon activities." }
                ].map((insight, i) => (
                  <FadeIn key={i} delay={i * 0.1}>
                    <div style={{ padding: '32px', background: glassBg, backdropFilter: 'blur(20px)', borderRadius: '24px', border: `1px solid ${glassBorder}` }}>
                      <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '13px', color: '#a855f7', fontWeight: 600, textTransform: 'uppercase', marginBottom: '12px' }}>[ Insight Synthesis ]</p>
                      <h4 style={{ fontSize: '20px', fontWeight: 700, margin: '0 0 8px 0', color: textPrimary }}>{insight.title}</h4>
                      <p style={{ fontSize: '16px', color: textSecondary, margin: 0, lineHeight: 1.5 }}>{insight.text}</p>
                    </div>
                  </FadeIn>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══════════════════════════════════════════ */}
      {/* SECTION 6: ZERO-LATENCY EXPERIENCE */}
      {/* ═══════════════════════════════════════════ */}
      <section style={{ padding: 'clamp(80px, 10vw, 160px) 0' }}>
        <div style={sectionStyle}>
          <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 80px' }}>
             <FadeIn>
               <SectionTag number="06" label="Zero-Latency Feedback" />
               <h2 style={{ fontSize: 'clamp(40px, 6vw, 72px)', fontWeight: 800, color: textPrimary, lineHeight: 1, letterSpacing: '-2px', margin: '0 0 32px 0' }}>
                 Every input triggers an <br/>instant visual response.
               </h2>
               <p style={{ fontSize: '20px', color: textSecondary }}>
                 No delay. No waiting. The interface feels addictive, responsive, and alive. Designed to reinforce optimal behavioral choices the second they are made.
               </p>
             </FadeIn>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════ */}
      {/* SECTION 7: SYSTEM ARCHITECTURE */}
      {/* ═══════════════════════════════════════════ */}
      <section style={{ padding: 'clamp(80px, 10vw, 160px) 0', borderTop: `1px solid ${borderColor}`, background: '#ffffff' }}>
        <div style={sectionStyle}>
          <FadeIn>
            <SectionTag number="07" label="System Architecture" />
          </FadeIn>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '40px' }}>
            <FadeIn delay={0.1}>
              <h4 style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '13px', color: '#10b981', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '24px' }}>Frontend & UI</h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '16px', fontSize: '18px', fontWeight: 500, color: textPrimary }}>
                <li>React 18 + TypeScript</li>
                <li>TailwindCSS + Shadcn UI</li>
                <li>Framer Motion + GSAP</li>
                <li style={{ color: textSecondary, fontSize: '15px', marginTop: '8px' }}>Glassmorphism & fluid gradients</li>
              </ul>
            </FadeIn>
            <FadeIn delay={0.2}>
              <h4 style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '13px', color: '#10b981', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '24px' }}>AI Engine</h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '16px', fontSize: '18px', fontWeight: 500, color: textPrimary }}>
                <li>Google Gemini Context API</li>
                <li>Behavioral Analysis Layer</li>
                <li>Real-Time Model Tuning</li>
              </ul>
            </FadeIn>
            <FadeIn delay={0.3}>
              <h4 style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '13px', color: '#10b981', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '24px' }}>Backend & Edge</h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '16px', fontSize: '18px', fontWeight: 500, color: textPrimary }}>
                <li>Supabase (Real-time Sync + Auth)</li>
                <li>Vercel Edge Deployment</li>
                <li>Zero-Latency Caching</li>
              </ul>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════ */}
      {/* SECTION 8: DIFFERENTIATION & CLOSING */}
      {/* ═══════════════════════════════════════════ */}
      <section style={{ padding: 'clamp(80px, 10vw, 160px) 0', borderTop: `1px solid ${borderColor}` }}>
        <div style={sectionStyle}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '40px' }}>
            <div className="col-span-12 md:col-span-6">
              <FadeIn>
                <div style={{ padding: '48px', background: glassBg, backdropFilter: 'blur(20px)', borderRadius: '32px', border: `1px solid ${glassBorder}`, height: '100%' }}>
                  <SectionTag number="08" label="Differentiation" />
                  <p style={{ fontSize: '16px', color: textSecondary, marginBottom: '24px' }}>This is not:</p>
                  <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 32px 0', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <li style={{ textDecoration: 'line-through', color: textMuted, fontFamily: "'IBM Plex Mono', monospace", fontSize: '14px' }}>a standard fitness tracker</li>
                    <li style={{ textDecoration: 'line-through', color: textMuted, fontFamily: "'IBM Plex Mono', monospace", fontSize: '14px' }}>a simple carbon calculator</li>
                  </ul>
                  <p style={{ fontSize: '16px', color: textSecondary, marginBottom: '16px' }}>This is:</p>
                  <p style={{ fontSize: '28px', fontWeight: 800, color: textPrimary, lineHeight: 1.2, margin: 0 }}>
                    A unified behavioral intelligence system.
                  </p>
                </div>
              </FadeIn>
            </div>
            
            <div className="col-span-12 md:col-span-6 flex flex-col justify-end">
              <FadeIn delay={0.2}>
                <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(40px, 6vw, 72px)', fontWeight: 900, color: textPrimary, lineHeight: 1, letterSpacing: '-2px', margin: '0 0 24px 0' }}>
                  The future isn't just healthy. <br/>
                  <span style={{ fontStyle: 'italic', color: '#10b981' }}>It's aligned.</span>
                </h2>
                <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '12px', letterSpacing: '4px', color: textSecondary, textTransform: 'uppercase', fontWeight: 600, margin: 0 }}>
                  Your life. Your impact. One system. 🌿👁️
                </p>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════ */}
      {/* SECTION 9: FOOTER / META */}
      {/* ═══════════════════════════════════════════ */}
      <section style={{ padding: 'clamp(64px, 10vw, 120px) 0', borderTop: `1px solid ${borderColor}`, background: '#ffffff' }}>
        <div style={sectionStyle}>
          <FadeIn>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '32px', marginBottom: '64px' }}>
              {[
                { label: 'Role', value: 'Full Stack + AI System Designer' },
                { label: 'Domain', value: 'HealthTech × Sustainability × AI' },
                { label: 'Type', value: 'Intelligent Wellness Ecosystem' },
                { label: 'Stack', value: 'React · Tailwind · Gemini AI · Supabase' },
              ].map((meta, i) => (
                <div key={i}>
                  <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '10px', letterSpacing: '3px', color: textSecondary, textTransform: 'uppercase', margin: '0 0 8px 0', fontWeight: 600 }}>{meta.label}</p>
                  <p style={{ fontSize: '14px', color: textPrimary, fontWeight: 500, margin: 0 }}>{meta.value}</p>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>
    </motion.div>
  );
}
