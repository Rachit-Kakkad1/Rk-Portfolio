import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowLeft, Globe, FileText, ExternalLink, Calculator, Calendar, BarChart3, Zap, ShieldCheck, Clock, CheckCircle2, LayoutDashboard, BrainCircuit, ShieldAlert } from 'lucide-react';
import { Github } from './Icons';

interface AttendifyDetailProps {
  onClose: () => void;
}

function SectionTag({ number, label }: { number: string; label: string }) {
  return (
    <div className="flex items-center gap-4 mb-8">
      <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '11px', letterSpacing: '3px', color: '#B45309', fontWeight: 700 }}>{number}</span>
      <div style={{ width: '40px', height: '1px', background: 'linear-gradient(to right, #B45309, transparent)' }} />
      <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '10px', letterSpacing: '4px', color: '#1A1816', opacity: 0.4, textTransform: 'uppercase', fontWeight: 600 }}>{label}</span>
    </div>
  );
}

function FadeIn({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 1, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function AttendifyDetail({ onClose }: AttendifyDetailProps) {
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

  const accent = '#0369a1';
  const accentBg = 'rgba(3,105,161,';
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
        background: 'rgba(245,242,237,0.7)', backdropFilter: 'blur(20px)',
        borderBottom: `1px solid ${borderColor}`,
        padding: '16px clamp(16px, 4vw, 48px)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <button onClick={onClose} style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'none', border: 'none', color: textSecondary, cursor: 'pointer', fontFamily: "'IBM Plex Mono', monospace", fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', transition: 'all 0.3s' }}
          className="hover:text-[#1A1816]"
        ><ArrowLeft size={16} /> Dashboard</button>
        <div style={{ display: 'flex', gap: '12px' }}>
          {[
            { href: 'https://github.com/Rachit-Kakkad1/Attendify-College-Attendance-Predictor', icon: <Github size={16} /> },
            { href: '#', icon: <Globe size={16} /> },
          ].map((link, i) => (
            <a key={i} href={link.href} target="_blank" rel="noopener noreferrer"
              className="p-2 rounded-xl border border-white/60 bg-white/40 backdrop-blur-md text-slate-400 hover:border-slate-900 hover:text-slate-900 transition-all duration-300"
            >{link.icon}</a>
          ))}
        </div>
      </div>

      {/* ─── HERO ─── */}
      <section style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', paddingTop: '80px' }}>
        <div style={sectionStyle}>
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}>
            <SectionTag number="00" label="Academic Intelligence" />
            <h1 className="font-serif font-black leading-[0.95] tracking-tighter mb-8" style={{ fontSize: 'clamp(64px, 12vw, 160px)' }}>
              Attendify<span className="text-orange-700">.</span>
            </h1>
            <p className="font-serif italic text-[clamp(24px, 4vw, 48px)] text-[#1A1816] leading-tight mb-8">
              "Track smarter. Predict better."
            </p>
            <div className="flex flex-wrap gap-8 items-center border-t border-black/5 pt-8">
              <p className="font-mono text-[13px] tracking-widest text-slate-400 uppercase">Decision Engineering</p>
              <div className="w-1.5 h-1.5 rounded-full bg-orange-700/30" />
              <p className="font-mono text-[13px] tracking-widest text-slate-400 uppercase">Institutional Logic</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── THE PREMISE & PROBLEM ─── */}
      <section className="py-24 md:py-48 border-t border-black/5">
        <div style={sectionStyle}>
          <div className="grid grid-cols-12 gap-y-16 md:gap-x-12">
            <div className="col-span-12 lg:col-span-5">
              <FadeIn>
                <SectionTag number="01" label="The Premise" />
                <h2 className="text-[clamp(32px, 5vw, 64px)] font-bold leading-[1.1] tracking-tight mb-8">
                  Attendance is a trajectory, not a record.
                </h2>
                <p className="text-xl text-slate-500 leading-relaxed">
                  Academic attendance systems are fundamentally broken. Manual tracking leads to error-prone data, leaving students with zero predictive visibility. Awareness often comes only after the damage is irreversible.
                </p>
              </FadeIn>
            </div>
            <div className="col-span-12 lg:col-span-6 lg:col-start-7 flex flex-col justify-center">
              <FadeIn delay={0.2}>
                <div className="p-8 md:p-12 bg-white/40 border border-white/60 backdrop-blur-xl rounded-[40px] shadow-sm relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:rotate-12 transition-transform duration-700 text-orange-900">
                    <ShieldAlert size={120} />
                  </div>
                  <p className="font-mono text-[11px] tracking-[4px] uppercase text-orange-700 font-bold mb-6">[ SYSTEM DIAGNOSIS ]</p>
                  <p className="text-2xl font-medium leading-relaxed mb-6">
                    "Students don’t fail because they don’t attend. They fail because they don’t know where they stand."
                  </p>
                  <div className="flex items-center gap-4 text-slate-400 font-mono text-xs uppercase tracking-widest">
                    <span>Guesswork</span>
                    <div className="w-12 h-px bg-slate-300" />
                    <span className="text-slate-900 font-bold">Intelligence</span>
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* ─── THE INSIGHT & VISION ─── */}
      <section className="py-24 md:py-48 bg-white/30 border-y border-black/5">
        <div style={sectionStyle}>
          <FadeIn>
            <div className="max-w-4xl">
              <SectionTag number="02" label="The Insight" />
              <h2 className="text-[clamp(32px, 5vw, 64px)] font-bold mb-12 leading-[1.1] tracking-tight">
                Attendance as an Intelligence System.
              </h2>
              <div className="grid md:grid-cols-2 gap-12">
                <div className="space-y-6">
                  <p className="text-lg text-slate-500 leading-relaxed">
                    Existing tools log past data but fail to guide future decisions. Attendify introduces a predictive model that calculates target attendance trajectory, suggesting safe absence limits based on real-time data inputs.
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                   {[
                     { label: 'Tracking', desc: 'Precise Ledger' },
                     { label: 'Analysis', desc: 'Subject Stats' },
                     { label: 'Forecasting', desc: 'Trajectory' },
                     { label: 'Outcome', desc: 'Decision Ready' }
                   ].map((item, i) => (
                     <div key={i} className="p-4 border border-black/5 bg-white/50 rounded-2xl">
                       <p className="font-mono text-[10px] uppercase tracking-widest text-slate-400 mb-1">{item.label}</p>
                       <p className="font-bold text-sm tracking-tight">{item.desc}</p>
                     </div>
                   ))}
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ─── CORE SYSTEM & BUNK CALCULATOR ─── */}
      <section className="py-24 md:py-48 overflow-hidden">
        <div style={sectionStyle}>
          <div className="grid grid-cols-12 gap-y-16 md:gap-x-12 items-center">
            <div className="col-span-12 lg:col-span-6 relative">
              <FadeIn>
                 <div className="relative z-10 p-1 bg-white border border-black/5 rounded-[48px] shadow-2xl overflow-hidden aspect-[4/5] md:aspect-square group">
                    <div className="absolute inset-0 bg-gradient-to-br from-orange-50 to-white" />
                    <div className="relative h-full w-full p-8 flex flex-col">
                       <div className="flex justify-between items-start mb-12">
                          <div>
                            <p className="font-mono text-[10px] text-slate-400 uppercase tracking-widest mb-1">Predictive Engine</p>
                            <h4 className="text-2xl font-bold tracking-tight">Attendify Live</h4>
                          </div>
                          <div className="w-12 h-12 rounded-2xl bg-orange-700/10 flex items-center justify-center text-orange-700">
                             <LayoutDashboard size={20} />
                          </div>
                       </div>
                       
                       <div className="flex-1 flex flex-col justify-center space-y-8">
                          {/* Simulated Stats */}
                          <div className="space-y-4">
                             <div className="flex justify-between items-end">
                                <span className="text-slate-400 font-mono text-xs uppercase tracking-widest">Current Percentage</span>
                                <span className="text-5xl font-serif italic text-orange-700">82.4%</span>
                             </div>
                             <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                                <motion.div initial={{ width: 0 }} whileInView={{ width: '82.4%' }} transition={{ duration: 1.5, delay: 0.5 }} className="h-full bg-orange-700" />
                             </div>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-4">
                             <div className="p-6 bg-slate-50/50 rounded-3xl border border-black/5">
                                <p className="text-[10px] font-mono uppercase tracking-widest text-slate-400 mb-2">Can Bunk</p>
                                <p className="text-3xl font-bold text-slate-900">4 <span className="text-sm font-normal text-slate-400">LECTURES</span></p>
                             </div>
                             <div className="p-6 bg-slate-50/50 rounded-3xl border border-black/5">
                                <p className="text-[10px] font-mono uppercase tracking-widest text-slate-400 mb-2">Must Attend</p>
                                <p className="text-3xl font-bold text-slate-900">0 <span className="text-sm font-normal text-slate-400">LECTURES</span></p>
                             </div>
                          </div>
                       </div>
                       
                       <div className="mt-auto pt-8 border-t border-black/5 flex items-center justify-between">
                          <p className="text-[10px] font-mono text-slate-300 uppercase tracking-[3px]">Next-Gen Forecasting</p>
                          <div className="flex gap-1">
                             {[1,1,1,0.5].map((op, i) => <div key={i} className="w-1.5 h-1.5 rounded-full bg-orange-700" style={{ opacity: op }} />)}
                          </div>
                       </div>
                    </div>
                 </div>
              </FadeIn>
            </div>
            
            <div className="col-span-12 lg:col-span-1" />
            
            <div className="col-span-12 lg:col-span-5">
              <FadeIn delay={0.3}>
                <SectionTag number="03" label="Signature Feature" />
                <h2 className="text-5xl font-bold mb-8 tracking-tight">The Bunk Calculator.</h2>
                <p className="text-lg text-slate-500 leading-relaxed mb-8">
                  Attendify's standout feature provides deterministic answers to critical student questions. By inputting target attendance (e.g., 75%), the system instantly calculates exactly how many lectures can be safely skipped or how many must be attended to meet the threshold.
                </p>
                <div className="space-y-4">
                   {[
                     { label: 'Target Alignment', desc: 'Sync with institutional minimums' },
                     { label: 'Smart Projection', desc: 'Calculates necessary future streaks' },
                     { label: 'Drift Resistance', desc: 'Updates instantly after every lecture' }
                   ].map((item, i) => (
                     <div key={i} className="flex gap-4 items-start">
                        <CheckCircle2 size={18} className="text-orange-700 mt-1 shrink-0" />
                        <div>
                           <p className="font-bold text-sm">{item.label}</p>
                           <p className="text-xs text-slate-400 uppercase tracking-widest mt-0.5">{item.desc}</p>
                        </div>
                     </div>
                   ))}
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* ─── ANALYTICS & ARCHITECTURE ─── */}
      <section className="py-24 md:py-48 bg-white border-t border-black/5">
        <div style={sectionStyle}>
          <div className="grid md:grid-cols-2 gap-24">
            <FadeIn>
               <SectionTag number="04" label="Performance Stack" />
               <h3 className="text-4xl font-bold mb-8 tracking-tight">Engineered for Consistency.</h3>
               <p className="text-slate-500 leading-relaxed mb-12">
                  Built on React 19 and Firebase, Attendify ensures real-time synchronization across devices. Using Vite for ultra-fast rendering and Recharts for data visualization, the system maintains high performance even with complex trajectory calculations.
               </p>
               <div className="grid grid-cols-2 gap-8">
                  <div>
                    <p className="font-mono text-[10px] text-slate-400 uppercase tracking-[4px] mb-4">Core Tech</p>
                    <ul className="space-y-3 font-medium">
                      <li className="flex items-center gap-2"><div className="w-1 h-1 bg-black rounded-full" /> React 19 / Vite</li>
                      <li className="flex items-center gap-2"><div className="w-1 h-1 bg-black rounded-full" /> TypeScript</li>
                      <li className="flex items-center gap-2"><div className="w-1 h-1 bg-black rounded-full" /> Firebase</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-mono text-[10px] text-slate-400 uppercase tracking-[4px] mb-4">Integrations</p>
                    <ul className="space-y-3 font-medium">
                      <li className="flex items-center gap-2"><div className="w-1 h-1 bg-black rounded-full" /> Recharts / Visuals</li>
                      <li className="flex items-center gap-2"><div className="w-1 h-1 bg-black rounded-full" /> GSAP / Motion</li>
                      <li className="flex items-center gap-2"><div className="w-1 h-1 bg-black rounded-full" /> Date-fns / Time</li>
                    </ul>
                  </div>
               </div>
            </FadeIn>
            
            <FadeIn delay={0.2}>
               <div className="h-full flex flex-col justify-center">
                  <div className="p-12 bg-slate-50 rounded-[48px] border border-black/5 space-y-12">
                     <div className="text-center">
                        <BarChart3 size={48} className="mx-auto mb-6 text-orange-700 opacity-20" />
                        <h4 className="text-2xl font-bold mb-2 tracking-tight">Data Integrity</h4>
                        <p className="text-sm text-slate-400 max-w-[240px] mx-auto uppercase tracking-widest leading-relaxed">Behavioral reinforcement through consistent visibility.</p>
                     </div>
                     <div className="space-y-6">
                        <div className="flex justify-between items-center text-xs font-mono tracking-widest text-slate-400">
                           <span>SYNC LATENCY</span>
                           <span className="text-orange-700 font-bold">~120MS</span>
                        </div>
                        <div className="h-px w-full bg-slate-200" />
                        <div className="flex justify-between items-center text-xs font-mono tracking-widest text-slate-400">
                           <span>BUNDLE SIZE</span>
                           <span className="text-slate-900 font-bold">42KB (GZIPPED)</span>
                        </div>
                     </div>
                  </div>
               </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ─── DIFFERENTIATION & CLOSING ─── */}
      <section className="py-24 md:py-48 pb-64">
        <div style={sectionStyle}>
          <div className="flex flex-col items-center text-center">
            <FadeIn>
               <SectionTag number="05" label="Differentiation" />
               <h2 className="text-[clamp(40px, 8vw, 96px)] font-bold mb-12 leading-[0.95] tracking-tighter">
                 Control your <br/><span className="text-orange-700 italic font-serif font-black">Attendance.</span>
               </h2>
               <div className="inline-flex flex-wrap justify-center gap-4 bg-white/50 border border-black/5 p-2 rounded-full mb-16">
                  <span className="px-6 py-3 rounded-full bg-white text-sm font-bold shadow-sm">Not a Tracker.</span>
                  <span className="px-6 py-3 rounded-full text-sm font-medium text-slate-400">A Forecasting Engine.</span>
               </div>
               
               <p className="max-w-2xl text-xl text-slate-500 leading-relaxed mb-24 uppercase font-mono tracking-widest text-[14px]">
                 Transforming academic awareness into <br/> deterministic decision intelligence.
               </p>
               
               <div className="grid md:grid-cols-4 gap-8 w-full max-w-4xl border-t border-black/5 pt-12 text-left">
                  {[
                    { label: 'Developer', value: 'Rachit Kakkad' },
                    { label: 'Role', value: 'Full Stack Dev' },
                    { label: 'Stack', value: 'React + Firebase' },
                    { label: 'Year', value: '2026' }
                  ].map((item, i) => (
                    <div key={i}>
                      <p className="font-mono text-[9px] text-orange-700 uppercase tracking-[3px] font-bold mb-2">{item.label}</p>
                      <p className="text-sm font-bold text-slate-900 tracking-tight">{item.value}</p>
                    </div>
                  ))}
               </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className="py-12 border-t border-black/5 bg-white/50 backdrop-blur-sm">
        <div style={sectionStyle}>
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <p className="font-mono text-[10px] tracking-[4px] text-slate-300 uppercase">Academic Intelligence System — 2026</p>
            <button onClick={onClose} className="group flex items-center gap-2 px-8 py-4 bg-black text-white rounded-full font-bold tracking-widest text-[11px] uppercase hover:bg-orange-700 transition-colors duration-500">
               <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
               Return to Dashboard
            </button>
          </div>
        </div>
      </footer>
    </motion.div>
  );
}
