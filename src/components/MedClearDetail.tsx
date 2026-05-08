import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { 
  ArrowLeft, ShieldAlert, ScanLine, FileText, AlertTriangle, 
  CheckCircle2, Globe, Database, Cpu, Youtube, Layout, 
  Terminal, Search, Fingerprint, Activity, Share2, ExternalLink
} from 'lucide-react';
import { Github } from './Icons';

export default function MedClearDetail({ onClose }: { onClose: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  const progressBar = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 1.1]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  const projectLinks = [
    { label: 'Live Audit', icon: <Globe size={14} />, url: '#', color: '#1A1816' },
    { label: 'Evidence (GitHub)', icon: <Github size={14} />, url: '#', color: '#1A1816' },
    { label: 'Blueprint (Figma)', icon: <Layout size={14} />, url: '#', color: '#1A1816' },
    { label: 'Report (Docs)', icon: <FileText size={14} />, url: '#', color: '#1A1816' },
    { label: 'Exposé (YouTube)', icon: <Youtube size={14} />, url: '#', color: '#D9230F' },
    { label: 'API Specs (Postman)', icon: <Terminal size={14} />, url: '#', color: '#FF6C37' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[300] bg-[#FBF9F4] text-[#1A1816] overflow-y-auto overflow-x-hidden selection:bg-[#B45309] selection:text-white"
      ref={containerRef}
    >
      {/* Intelligence Bar - Quick Access Links */}
      <div className="fixed left-6 top-1/2 -translate-y-1/2 z-[310] hidden xl:flex flex-col gap-4">
        {projectLinks.map((link, i) => (
          <motion.a
            key={i}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 + i * 0.1 }}
            className="group relative flex items-center justify-center w-12 h-12 bg-white border border-[#1A1816]/10 rounded-full shadow-lg hover:bg-[#1A1816] hover:text-white transition-all duration-500"
            title={link.label}
          >
            <span className="absolute left-14 px-3 py-1 bg-[#1A1816] text-white text-[10px] font-bold tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
              {link.label}
            </span>
            {link.icon}
          </motion.a>
        ))}
      </div>

      {/* Progress Bar */}
      <motion.div 
        style={{ width: progressBar }}
        className="fixed top-0 left-0 h-1.5 bg-[#D9230F] z-[320]"
      />

      {/* Sticky Intelligence Nav */}
      <nav className="sticky top-0 w-full bg-[#FBF9F4]/90 backdrop-blur-xl border-b border-[#1A1816]/10 z-[305] px-6 md:px-16 py-4 flex justify-between items-center">
        <button 
          onClick={onClose}
          className="group flex items-center gap-3 font-mono text-xs font-black tracking-widest uppercase hover:text-[#D9230F] transition-colors"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-2 transition-transform duration-500" />
          Terminate Investigation
        </button>
        <div className="flex items-center gap-8">
           <div className="hidden lg:flex items-center gap-6 font-mono text-[9px] tracking-[0.3em] font-black text-[#1A1816]/30 uppercase">
            <span>Case: MC-2026-X</span>
            <div className="w-1.5 h-1.5 bg-[#D9230F] rounded-full animate-pulse" />
            <span>Security Clear: Level 5</span>
          </div>
          <div className="h-8 w-px bg-[#1A1816]/10 hidden sm:block" />
          <div className="flex items-center gap-4">
            <Share2 size={16} className="text-[#1A1816]/40 hover:text-[#1A1816] cursor-pointer transition-colors" />
            <a href="#" className="bg-[#1A1816] text-white px-4 py-2 text-[10px] font-black tracking-widest uppercase hover:bg-[#B45309] transition-colors">
              Download Report
            </a>
          </div>
        </div>
      </nav>

      <div className="relative">
        {/* Hero Section */}
        <header className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 pt-20">
          <motion.div style={{ scale: heroScale, opacity: heroOpacity }} className="z-10">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center gap-3 border-2 border-[#1A1816] px-8 py-3 mb-12 bg-white shadow-[8px_8px_0px_#1A1816]"
            >
              <Fingerprint className="text-[#D9230F]" size={18} />
              <span className="font-mono text-xs font-black tracking-[0.5em] uppercase">Flagship Investigation</span>
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="text-[clamp(4rem,12vw,14rem)] leading-[0.85] font-black tracking-tighter mb-12"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              MedClear
            </motion.h1>
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 1.5, delay: 0.5 }}
              className="h-1 bg-[#1A1816] mb-12 max-w-4xl mx-auto" 
            />
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="text-2xl md:text-4xl font-serif italic text-[#B45309] max-w-4xl mx-auto leading-[1.1] tracking-tight"
            >
              “An architectural intervention against the systemic exploitation of healthcare billing.”
            </motion.p>
          </motion.div>

          {/* Background Decorative Element */}
          <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden opacity-[0.03]">
             <span className="text-[40vw] font-black text-[#1A1816] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none">EXPOSÉ</span>
          </div>

          <motion.div 
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 opacity-30"
          >
            <span className="font-mono text-[9px] uppercase tracking-[0.3em] font-black">Scroll to investigate</span>
            <div className="w-px h-12 bg-[#1A1816]" />
          </motion.div>
        </header>

        <div className="max-w-[1400px] mx-auto px-6 md:px-16 py-32">
          
          {/* Dashboard Preview / Mockup Zone */}
          <section className="mb-48">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end mb-16">
              <div className="lg:col-span-8">
                <h2 className="text-5xl md:text-8xl font-black tracking-tighter uppercase mb-8">The Interface <br/>of Truth</h2>
                <p className="text-xl text-[#1A1816]/60 max-w-2xl leading-relaxed">
                  We designed a high-fidelity audit terminal that transforms hundreds of pages of hospital data into 
                  a deterministic map of financial fraud. No fluff, just hard evidence.
                </p>
              </div>
              <div className="lg:col-span-4 flex lg:justify-end">
                <div className="flex gap-4">
                   <div className="text-center">
                      <div className="text-4xl font-black text-[#D9230F]">850ms</div>
                      <div className="text-[10px] font-bold uppercase tracking-widest text-[#1A1816]/40">Scan Speed</div>
                   </div>
                   <div className="w-px h-12 bg-[#1A1816]/10" />
                   <div className="text-center">
                      <div className="text-4xl font-black text-[#B45309]">99.4%</div>
                      <div className="text-[10px] font-bold uppercase tracking-widest text-[#1A1816]/40">Accuracy</div>
                   </div>
                </div>
              </div>
            </div>

            {/* Immersive Scrollable Gallery */}
            <div className="space-y-32">
              <motion.div 
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="relative aspect-video bg-white border border-[#1A1816]/10 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)] overflow-hidden group"
              >
                <div className="absolute top-0 left-0 w-full h-12 bg-[#1A1816] flex items-center px-6 gap-2">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#D9230F]" />
                    <div className="w-2.5 h-2.5 rounded-full bg-[#B45309]" />
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
                  </div>
                  <div className="flex-1 text-center font-mono text-[10px] text-white/40 tracking-[0.2em]">MEDCLEAR_AUDIT_DASHBOARD_V1.0.PRD</div>
                </div>
                <div className="mt-12 w-full h-full bg-[#FBF9F4] p-12 flex items-center justify-center">
                  {/* Placeholder for actual high-res screenshot or UI component */}
                  <div className="text-center">
                     <Activity size={80} className="mx-auto mb-8 text-[#1A1816]/10 animate-pulse" />
                     <p className="font-serif italic text-2xl text-[#1A1816]/30">Visual Audit Interface: Heatmap Mode</p>
                  </div>
                </div>
                {/* Annotation Overlay */}
                <div className="absolute bottom-12 right-12 max-w-xs bg-[#1A1816] text-white p-6 shadow-2xl border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <span className="font-mono text-[9px] text-[#B45309] block mb-2 tracking-[0.2em] font-black uppercase">Annotation 04-B</span>
                  <p className="text-xs leading-relaxed font-mono opacity-70">
                    Real-time visualization of detected markups versus government pricing caps. 
                    Red zones indicate legal violations.
                  </p>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Deep Technical Deep-Dive */}
          <section className="mb-48">
            <div className="flex items-center gap-6 mb-16">
              <h2 className="text-4xl font-black uppercase tracking-tighter">The Forensic Stack</h2>
              <div className="flex-1 h-px bg-[#1A1816]/10" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-[#1A1816]/10 border border-[#1A1816]/10">
              {[
                { title: 'Frontend', tech: 'React / Framer / TS', desc: 'A cinematic single-page application focused on high-density information display.' },
                { title: 'AI Engine', tech: 'Python / Tesseract', desc: 'Custom OCR pipeline tuned for low-quality thermal printer invoice extraction.' },
                { title: 'Backend', tech: 'FastAPI / Redis', desc: 'Distributed task queuing for high-speed concurrent billing audits.' },
                { title: 'Database', tech: 'PostgreSQL / Vector', desc: 'Semantic search infrastructure for fuzzy matching against hospital service codes.' },
              ].map((item, i) => (
                <div key={i} className="bg-[#FBF9F4] p-10 hover:bg-white transition-all duration-500 group">
                  <div className="font-mono text-[10px] text-[#B45309] mb-4 tracking-[0.3em] font-black uppercase">Layer 0{i+1}</div>
                  <h4 className="text-2xl font-black mb-2 uppercase tracking-tighter">{item.title}</h4>
                  <div className="font-mono text-[11px] font-bold text-[#1A1816]/40 mb-6">{item.tech}</div>
                  <p className="text-sm text-[#1A1816]/60 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Detailed Investigation Phases */}
          <section className="mb-48">
             <div className="max-w-4xl">
               <h3 className="text-5xl md:text-7xl font-black tracking-tighter uppercase mb-16">The Investigative <br/>Pipeline</h3>
               
               <div className="space-y-24">
                  {[
                    { phase: '01', title: 'OCR EXTRACTION', desc: 'We ingest PDFs, JPEGs, and thermal paper scans. Our pipeline normalizes the noise, extracts structured line items, and classifies them using NLP.', icon: <ScanLine /> },
                    { phase: '02', title: 'SEMANTIC MATCHING', desc: 'Hospital items often use cryptic names. We use semantic embedding models to match "SYR_50ML_DISP" to the government-regulated "Syringe, Disposable, 50ml".', icon: <Search /> },
                    { phase: '03', title: 'FRAUD HEURISTICS', desc: 'Our engine runs 15+ deterministic audits including Pricing Cap Violations, Duplicate Billing, and Unbundling Detection (splitting one service into multiple charges).', icon: <ShieldAlert /> },
                    { phase: '04', title: 'EVIDENCE PACKAGING', desc: 'The system generates a legal-ready report showing the exact markup percentage and the specific government regulation being violated.', icon: <FileText /> },
                  ].map((p, i) => (
                    <div key={i} className="flex gap-12 group">
                      <div className="flex-shrink-0 w-20">
                        <span className="text-5xl font-black text-[#1A1816]/5 group-hover:text-[#D9230F]/20 transition-colors duration-500">{p.phase}</span>
                      </div>
                      <div>
                        <div className="flex items-center gap-4 mb-4">
                           <span className="p-3 bg-white border border-[#1A1816]/10 shadow-lg text-[#B45309]">{p.icon}</span>
                           <h4 className="text-2xl font-black uppercase tracking-tight">{p.title}</h4>
                        </div>
                        <p className="text-xl text-[#1A1816]/60 leading-relaxed">{p.desc}</p>
                      </div>
                    </div>
                  ))}
               </div>
             </div>
          </section>

          {/* Social / Action Links (Mobile Version) */}
          <section className="xl:hidden mb-48 border-y border-[#1A1816]/10 py-16">
             <h4 className="font-mono text-[10px] font-black tracking-[0.3em] uppercase mb-8 text-center">Case Access Links</h4>
             <div className="grid grid-cols-2 gap-4">
               {projectLinks.map((link, i) => (
                 <a key={i} href={link.url} className="flex items-center gap-3 p-4 bg-white border border-[#1A1816]/10 text-xs font-bold uppercase tracking-widest">
                   {link.icon} {link.label}
                 </a>
               ))}
             </div>
          </section>

          {/* Final Summary Editorial */}
          <footer className="bg-[#1A1816] text-[#FBF9F4] p-12 md:p-32 text-center overflow-hidden relative">
             <div className="relative z-10 max-w-3xl mx-auto">
               <h3 className="text-4xl md:text-7xl font-black tracking-tighter uppercase mb-12 leading-[0.9]">Transparency <br/>is not a Feature.<br/>It is a Right.</h3>
               <p className="text-white/50 text-xl leading-relaxed mb-16">
                 MedClear was built to arm patients with the data they need to fight back against 
                 institutionalized billing exploitation. This is just the beginning of our healthcare transparency mission.
               </p>
               <div className="flex flex-col md:flex-row gap-6 justify-center">
                  <button onClick={onClose} className="bg-white text-[#1A1816] px-12 py-5 text-xs font-black tracking-[0.3em] uppercase hover:bg-[#B45309] hover:text-white transition-all duration-500 shadow-2xl">
                    Back to Portfolio
                  </button>
                  <a href="#" className="border border-white/20 px-12 py-5 text-xs font-black tracking-[0.3em] uppercase hover:bg-white hover:text-[#1A1816] transition-all duration-500">
                    Partner With Us
                  </a>
               </div>
             </div>
             {/* Large background text */}
             <div className="absolute -bottom-20 -left-10 text-[25vw] font-black text-white/[0.02] leading-none pointer-events-none select-none">TRUTH</div>
          </footer>
        </div>
      </div>
    </motion.div>
  );
}
