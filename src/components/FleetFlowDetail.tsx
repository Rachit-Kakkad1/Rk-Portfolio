import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Github, Globe, FileText, ExternalLink, Activity, Map, Radio, ShieldCheck, Truck, Users, Banknote, ShieldAlert, Zap, Layers, Server } from 'lucide-react';

interface FleetFlowDetailProps {
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
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function FleetFlowDetail({ onClose }: FleetFlowDetailProps) {
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

  const accent = '#10b981'; // Emerald Green for Live/Active operations
  const accentPulse = 'rgba(16, 185, 129,';
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
        ><ArrowLeft size={16} /> Back to Dashboard</button>
        <div style={{ display: 'flex', gap: '12px' }}>
          {[
            { href: '#', icon: <Github size={16} /> },
            { href: '#', icon: <Globe size={16} /> },
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
      {/* SECTION 1: HERO - COMMAND CENTER ENTRY */}
      {/* ═══════════════════════════════════════════ */}
      <section style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', position: 'relative', overflow: 'hidden', background: '#090a0b' }}>
        {/* Dark Map / Radar Background */}
        <div style={{ position: 'absolute', top: '20%', left: '50%', transform: 'translate(-50%, -50%)', width: '1000px', height: '1000px', background: `radial-gradient(circle, ${accentPulse}0.1) 0%, transparent 60%)`, pointerEvents: 'none' }} />
        <div className="absolute inset-0 opacity-[0.05] pointer-events-none" style={{ backgroundImage: 'linear-gradient(rgba(16,185,129,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(16,185,129,0.3) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
        
        {/* Simulated Live Asset Blips */}
        <motion.div animate={{ opacity: [0.2, 1, 0.2] }} transition={{ duration: 2, repeat: Infinity }} style={{ position: 'absolute', top: '30%', left: '20%', width: '6px', height: '6px', borderRadius: '50%', background: accent, boxShadow: `0 0 20px ${accent}` }} />
        <motion.div animate={{ opacity: [0.2, 1, 0.2] }} transition={{ duration: 3, delay: 1, repeat: Infinity }} style={{ position: 'absolute', top: '60%', right: '25%', width: '8px', height: '8px', borderRadius: '50%', background: accent, boxShadow: `0 0 20px ${accent}` }} />

        <div style={{ ...sectionStyle, position: 'relative', zIndex: 10, width: '100%' }}>
          <motion.div initial={{ opacity: 0, y: 60 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
              <div style={{ width: '8px', height: '8px', background: accent, borderRadius: '50%', boxShadow: `0 0 12px ${accent}` }} />
              <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '12px', letterSpacing: '5px', color: accent, textTransform: 'uppercase', fontWeight: 600, margin: 0 }}>
                Next-Gen Logistics & Fleet Management
              </p>
            </div>
            <h1 style={{ fontSize: 'clamp(56px, 12vw, 160px)', fontWeight: 900, color: '#ffffff', lineHeight: 0.9, letterSpacing: '-5px', margin: '0 0 32px 0' }}>
              Fleet<span style={{ color: 'rgba(255,255,255,0.4)' }}>Flow</span>
            </h1>
            <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 'clamp(16px, 2.5vw, 24px)', color: 'rgba(255,255,255,0.8)', maxWidth: '800px', lineHeight: 1.6, margin: '0 0 16px 0' }}>
              Command the road in real time.
            </p>
            <p style={{ fontSize: 'clamp(15px, 2vw, 18px)', color: 'rgba(255,255,255,0.5)', maxWidth: '600px', lineHeight: 1.6, margin: '0 0 48px 0', borderLeft: `2px solid ${accent}`, paddingLeft: '16px' }}>
              From dispatch to delivery — every signal, synchronized.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
              <a href="#" style={{ padding: '16px 32px', background: accent, color: '#090a0b', fontFamily: "'IBM Plex Mono', monospace", fontSize: '12px', letterSpacing: '2px', fontWeight: 700, textTransform: 'uppercase', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px', borderRadius: '4px', boxShadow: `0 8px 30px ${accentPulse}0.3)` }}>
                <Activity size={16} /> Enter Control
              </a>
            </div>
          </motion.div>
        </div>

        <div style={{ position: 'absolute', bottom: '-1px', left: 0, right: 0, height: '120px', background: bg, clipPath: 'polygon(0 100%, 100% 0, 100% 100%)' }} />
      </section>

      {/* ═══════════════════════════════════════════ */}
      {/* SECTION 2: THE PROBLEM */}
      {/* ═══════════════════════════════════════════ */}
      <section style={{ padding: 'clamp(80px, 10vw, 160px) 0' }}>
        <div style={sectionStyle}>
          <FadeIn>
            <SectionTag number="01" label="Logistics Chaos" />
            <h2 style={{ fontSize: 'clamp(32px, 5vw, 56px)', fontWeight: 800, color: textPrimary, lineHeight: 1.1, letterSpacing: '-1.5px', margin: '0 0 32px 0', maxWidth: '800px' }}>
              Logistics is a live system of moving entities. <br/>
              <span style={{ color: textMuted }}>Yet tools treat it like a spreadsheet.</span>
            </h2>
            <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '16px', lineHeight: 1.8, color: textSecondary, maxWidth: '750px', margin: '0 0 48px 0' }}>
              Modern fleet operations suffer from deep, systemic inefficiencies. Disconnected systems create delayed updates across teams. When dispatch, safety, and finance operate in silos, real-time visibility craters and strict accountability vanishes. The result? Decisions are made on outdated information.
            </p>
          </FadeIn>
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
                "Logistics fails when systems <span style={{ color: accent }}>don't talk.</span>"
              </h2>
              <div style={{ maxWidth: '600px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
                <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '16px', lineHeight: 1.8, color: textSecondary }}>
                  Latency kills efficiency. Lack of synchronization translates directly to loss of operational control. Traditional systems store events and require manual refreshing.
                </p>
                <div style={{ padding: '32px', background: bg, border: `1px solid ${borderColor}`, borderRadius: '12px' }}>
                  <p style={{ fontSize: '18px', fontWeight: 800, color: textPrimary, margin: '0 0 16px 0', textTransform: 'uppercase', letterSpacing: '1px' }}>FleetFlow OS Pipeline</p>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px', fontFamily: "'IBM Plex Mono', monospace", fontSize: '14px', color: textSecondary }}>
                    <li><span style={{ color: accent }}>→</span> Events instead of logs</li>
                    <li><span style={{ color: accent }}>→</span> Streams instead of states</li>
                    <li><span style={{ color: accent }}>→</span> Synchronization instead of refresh</li>
                  </ul>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════ */}
      {/* SECTION 4: EXPERIENCE DESIGN (IMAGE GRID) */}
      {/* ═══════════════════════════════════════════ */}
      <section style={{ padding: 'clamp(80px, 10vw, 160px) 0' }}>
        <div style={sectionStyle}>
          <FadeIn>
            <SectionTag number="02" label="Experience Design" />
            <h2 style={{ fontSize: 'clamp(32px, 5vw, 56px)', fontWeight: 800, color: textPrimary, lineHeight: 1.1, letterSpacing: '-1.5px', margin: '0 0 32px 0' }}>
              Data-Dense. Minimal. Native.
            </h2>
            <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '15px', color: textSecondary, marginBottom: '64px', maxWidth: '600px' }}>
              Designed as a command interface, not a generic dashboard. Smooth transitions via Framer Motion complement map-first visualization. Each user sees only what they need to act—instantly.
            </p>
          </FadeIn>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '24px' }}>
            <FadeIn className="col-span-12 md:col-span-8" delay={0.1}>
              <div style={{ height: '400px', borderRadius: '16px', overflow: 'hidden', border: `1px solid ${borderColor}`, background: '#e5e7eb' }}>
                <img src="https://cdn.dribbble.com/userupload/43507872/file/original-df7180b18e97f8487d50bd65cba0a013.png" alt="FleetFlow Map UI" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
            </FadeIn>
            <FadeIn className="col-span-12 md:col-span-4" delay={0.2}>
              <div style={{ height: '400px', borderRadius: '16px', overflow: 'hidden', border: `1px solid ${borderColor}`, background: '#e5e7eb' }}>
                <img src="https://cdn.dribbble.com/userupload/46022208/file/8aca27dd4923fe021369e27d1c03ef37.png?format=webp&resize=400x300&vertical=center" alt="FleetFlow Fleet Status" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
            </FadeIn>
            <FadeIn className="col-span-12 md:col-span-6" delay={0.3}>
              <div style={{ height: '300px', borderRadius: '16px', overflow: 'hidden', border: `1px solid ${borderColor}`, background: '#e5e7eb' }}>
                <img src="https://cdn.dribbble.com/userupload/43832604/file/original-a52682284edbeca9ba0e0359aebd2ef3.png?resize=400x300" alt="FleetFlow KPI Grid" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
            </FadeIn>
            <FadeIn className="col-span-12 md:col-span-6" delay={0.4}>
              <div style={{ height: '300px', borderRadius: '16px', overflow: 'hidden', border: `1px solid ${borderColor}`, background: '#e5e7eb' }}>
                <img src="https://freightprint.com/uploads/projgallery/App-demo-freightprint.jpg" alt="FleetFlow Mobile Driver View" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════ */}
      {/* SECTION 5: REAL-TIME ENGINE & AI */}
      {/* ═══════════════════════════════════════════ */}
      <section style={{ padding: 'clamp(80px, 10vw, 160px) 0', borderTop: `1px solid ${borderColor}`, background: `linear-gradient(135deg, ${accentPulse}0.03) 0%, transparent 100%)` }}>
        <div style={sectionStyle}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '64px' }}>
            <FadeIn>
              <SectionTag number="03" label="Real-Time Engine" />
              <h2 style={{ fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 800, color: textPrimary, lineHeight: 1.1, letterSpacing: '-1px', margin: '0 0 24px 0' }}>
                "No refresh. Only events."
              </h2>
              <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '15px', color: textSecondary, lineHeight: 1.7, marginBottom: '32px' }}>
                Powered exclusively by WebSockets, the core engine propagates live trip status, broadcasts instant SOS GPS coordinates, and triggers delivery confirmations directly via data streams ensuring absolute real-time accuracy.
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', background: cardBg, padding: '24px', borderRadius: '8px', border: `1px solid ${borderColor}` }}>
                <Radio size={24} color={accent} className="animate-pulse" />
                <span style={{ fontSize: '16px', fontWeight: 700, color: textPrimary }}>Event-Driven WebSocket Matrix</span>
              </div>
            </FadeIn>

            <FadeIn delay={0.2}>
              <SectionTag number="04" label="AI Fuel Defense" />
              <h2 style={{ fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 800, color: textPrimary, lineHeight: 1.1, letterSpacing: '-1px', margin: '0 0 24px 0' }}>
                Transformation of fuel data into fraud intelligence.
              </h2>
              <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '15px', color: textSecondary, lineHeight: 1.7, marginBottom: '32px' }}>
                A predictive safeguard layer analyzes fuel integrity. By computing expected consumption versus actual fuel logs, any deviation higher than 15% triggers automated managerial alerts.
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', background: cardBg, padding: '24px', borderRadius: '8px', border: `1px solid ${borderColor}` }}>
                <ShieldAlert size={24} color={accent} />
                <span style={{ fontSize: '16px', fontWeight: 700, color: textPrimary }}>Predictive & Preventative Intelligence</span>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════ */}
      {/* SECTION 6: CORE SYSTEM (RBAC) & PRODUCT CAPABILITIES */}
      {/* ═══════════════════════════════════════════ */}
      <section style={{ padding: 'clamp(80px, 10vw, 160px) 0', borderTop: `1px solid ${borderColor}` }}>
        <div style={sectionStyle}>
          <FadeIn>
             <SectionTag number="05" label="5-Tier RBAC Architecture" />
             <h2 style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 800, color: textPrimary, lineHeight: 1.1, letterSpacing: '-1px', margin: '0 0 16px 0', maxWidth: '800px' }}>
               Access is not shared. <span style={{ color: accent }}>It is engineered.</span>
             </h2>
             <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '15px', color: textSecondary, lineHeight: 1.7, marginBottom: '64px', maxWidth: '700px' }}>
               Strict operational boundaries isolate concerns, enabling total scale and absolute security.
             </p>
          </FadeIn>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '24px' }}>
            {[
              { role: 'Manager', ability: 'Macro control & anomaly oversight', icon: <Map size={24} /> },
              { role: 'Dispatcher', ability: 'Live trip assignment & orchestration', icon: <Activity size={24} /> },
              { role: 'Safety Officer', ability: 'Compliance gatekeeping & checkpoints', icon: <ShieldCheck size={24} /> },
              { role: 'Driver', ability: 'Mobile-first proof of delivery execution', icon: <Truck size={24} /> },
              { role: 'Finance', ability: 'ROI tracking & cost intelligence', icon: <Banknote size={24} /> }
            ].map((node, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div style={{ padding: '32px 24px', border: `1px solid ${borderColor}`, background: cardBg, borderRadius: '12px', height: '100%' }}>
                  <div style={{ color: accent, marginBottom: '24px' }}>{node.icon}</div>
                  <h3 style={{ fontSize: '18px', fontWeight: 800, color: textPrimary, margin: '0 0 8px 0' }}>{node.role}</h3>
                  <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '13px', color: textSecondary, lineHeight: 1.6, margin: 0 }}>{node.ability}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════ */}
      {/* SECTION 7: SYSTEM ARCHITECTURE & PERFORMANCE */}
      {/* ═══════════════════════════════════════════ */}
      <section style={{ padding: 'clamp(80px, 10vw, 160px) 0', borderTop: `1px solid ${borderColor}`, background: cardBg }}>
        <div style={sectionStyle}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '64px' }}>
            <FadeIn>
              <SectionTag number="06" label="System Architecture" />
               {/* Architecture Visual Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '16px' }}>
                <div className="col-span-12 md:col-span-7" style={{ height: '350px', borderRadius: '12px', overflow: 'hidden', border: `1px solid ${borderColor}` }}>
                  <img src="https://substackcdn.com/image/fetch/$s_%21rV6K%21%2Cf_auto%2Cq_auto:good%2Cfl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fce6c233f-68a5-412e-96ce-398cf42774ef_1618x1334.png" alt="Architecture Graph" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div className="col-span-12 md:col-span-5" style={{ height: '350px', borderRadius: '12px', overflow: 'hidden', border: `1px solid ${borderColor}` }}>
                   <img src="https://miro.medium.com/v2/resize:fit:1200/1*tSfMCU55qv12b_MPkzE5iw.jpeg" alt="System Nodes" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
              </div>
            </FadeIn>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '32px' }}>
              <FadeIn delay={0.1}>
                 <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '13px', color: accent, textTransform: 'uppercase', letterSpacing: '2px', fontWeight: 700, margin: '0 0 16px 0' }}>Frontend Layer</p>
                 <p style={{ fontSize: '18px', fontWeight: 600, color: textPrimary, margin: '0 0 8px 0' }}>React + Vite</p>
                 <p style={{ fontSize: '18px', fontWeight: 600, color: textPrimary, margin: '0 0 8px 0' }}>Framer Motion</p>
                 <p style={{ fontSize: '18px', fontWeight: 600, color: textPrimary, margin: 0 }}>Recharts</p>
              </FadeIn>
              <FadeIn delay={0.2}>
                 <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '13px', color: accent, textTransform: 'uppercase', letterSpacing: '2px', fontWeight: 700, margin: '0 0 16px 0' }}>Backend Layer</p>
                 <p style={{ fontSize: '18px', fontWeight: 600, color: textPrimary, margin: '0 0 8px 0' }}>Node.js + Express</p>
                 <p style={{ fontSize: '18px', fontWeight: 600, color: textPrimary, margin: '0 0 8px 0' }}>Socket.IO</p>
                 <p style={{ fontSize: '18px', fontWeight: 600, color: textPrimary, margin: 0 }}>JWT + RBAC Middleware</p>
              </FadeIn>
              <FadeIn delay={0.3}>
                 <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '13px', color: accent, textTransform: 'uppercase', letterSpacing: '2px', fontWeight: 700, margin: '0 0 16px 0' }}>Data Layer</p>
                 <p style={{ fontSize: '18px', fontWeight: 600, color: textPrimary, margin: '0 0 8px 0' }}>PostgreSQL</p>
                 <p style={{ fontSize: '18px', fontWeight: 600, color: textPrimary, margin: 0 }}>Prisma</p>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════ */}
      {/* SECTION 8: DIFFERENTIATION & PHILOSOPHY */}
      {/* ═══════════════════════════════════════════ */}
      <section style={{ padding: 'clamp(80px, 10vw, 160px) 0', borderTop: `1px solid ${borderColor}` }}>
        <div style={sectionStyle}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '64px' }}>
            <FadeIn>
              <SectionTag number="07" label="Differentiation" />
              <div style={{ padding: '40px', background: `${accentPulse}0.05)`, border: `1px solid ${accentPulse}0.2)`, borderRadius: '16px' }}>
                <p style={{ fontSize: '16px', color: textSecondary, marginBottom: '24px' }}>This is not:</p>
                <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 32px 0', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <li style={{ textDecoration: 'line-through', color: textMuted, fontFamily: "'IBM Plex Mono', monospace", fontSize: '14px' }}>a tracking tool</li>
                  <li style={{ textDecoration: 'line-through', color: textMuted, fontFamily: "'IBM Plex Mono', monospace", fontSize: '14px' }}>a generic delivery app</li>
                </ul>
                <p style={{ fontSize: '16px', color: textSecondary, marginBottom: '16px' }}>This is:</p>
                <p style={{ fontSize: '28px', fontWeight: 900, color: accent, lineHeight: 1.1, margin: 0 }}>
                  A logistics command system.
                </p>
              </div>
            </FadeIn>
            
            <FadeIn delay={0.2}>
              <SectionTag number="08" label="Design Philosophy" />
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', height: '100%', justifyContent: 'center' }}>
                {[
                  { title: 'Clarity under complexity' },
                  { title: 'Speed over friction' },
                  { title: 'Role-first UX architecture' },
                  { title: 'System engineering over interface design' },
                ].map((s, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '16px', border: `1px solid ${borderColor}`, borderRadius: '8px', background: cardBg }}>
                    <div style={{ width: '6px', height: '6px', background: accent, borderRadius: '50%' }} />
                    <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '14px', fontWeight: 600, color: textPrimary }}>{s.title}</span>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════ */}
      {/* SECTION 9: FOOTER / META */}
      {/* ═══════════════════════════════════════════ */}
      <section style={{ padding: 'clamp(80px, 10vw, 160px) 0', borderTop: `1px solid ${borderColor}`, background: '#090a0b', color: '#F5F2ED' }}>
        <div style={sectionStyle}>
          <FadeIn>
            <h2 style={{ fontSize: 'clamp(32px, 5vw, 64px)', fontWeight: 900, color: '#F5F2ED', lineHeight: 1.1, letterSpacing: '-1.5px', margin: '0 0 16px 0', textAlign: 'center' }}>
              When every second matters,
            </h2>
            <h2 style={{ fontSize: 'clamp(32px, 5vw, 64px)', fontWeight: 900, color: accent, lineHeight: 1.1, letterSpacing: '-1.5px', margin: '0 0 80px 0', textAlign: 'center' }}>
              your system should already know.
            </h2>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '32px', marginBottom: '64px', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '64px' }}>
              {[
                { label: 'Role', value: 'Full Stack Engineer + Architect' },
                { label: 'Domain', value: 'Logistics × Real-Time Systems' },
                { label: 'Type', value: 'Production-grade UI/Backend' },
                { label: 'Stack', value: 'React · Node.js · PostgreSQL · Socket.IO' },
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
              <a href="#" style={{ padding: '16px 36px', background: accent, color: '#090a0b', fontFamily: "'IBM Plex Mono', monospace", fontSize: '12px', letterSpacing: '2px', fontWeight: 700, textTransform: 'uppercase', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px', borderRadius: '4px' }}>
                <ExternalLink size={16} /> Enterprise Access
              </a>
              <a href="#" style={{ padding: '16px 36px', border: `1px solid rgba(255,255,255,0.2)`, color: '#ffffff', fontFamily: "'IBM Plex Mono', monospace", fontSize: '12px', letterSpacing: '2px', fontWeight: 700, textTransform: 'uppercase', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px', borderRadius: '4px', background: 'transparent' }}>
                <Github size={16} /> Repository
              </a>
            </div>
          </FadeIn>
          <FadeIn delay={0.3}>
            <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '11px', color: 'rgba(255,255,255,0.3)', textAlign: 'center', margin: '80px 0 0 0', letterSpacing: '4px', fontWeight: 700 }}>
              ENGINEERED FOR THE FAST LANE. BUILT TO SCALE.
            </p>
          </FadeIn>
        </div>
      </section>
    </motion.div>
  );
}
