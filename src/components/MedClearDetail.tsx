import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { 
  ArrowLeft, ShieldCheck, ScanLine, FileText, Heart,
  CheckCircle2, Globe, Database, Cpu, Layout, 
  Terminal, Search, Activity, Share2, ExternalLink,
  Pill, MapPin, BarChart3, Sparkles, Eye, Layers
} from 'lucide-react';
import { Github } from './Icons';

export default function SanjeevaniDetail({ onClose }: { onClose: () => void }) {
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
    { label: 'Live Platform', icon: <Globe size={14} />, url: 'https://sanjeevani-healthcare.vercel.app' },
    { label: 'Source Code', icon: <Github size={14} />, url: 'https://github.com/Rachit-Kakkad1/Sanjeevani' },
    { label: 'Architecture', icon: <Layout size={14} />, url: '#' },
    { label: 'Documentation', icon: <FileText size={14} />, url: '#' },
    { label: 'API Reference', icon: <Terminal size={14} />, url: '#' },
  ];

  const features = [
    { icon: <ScanLine size={20} />, title: 'OCR Bill Analysis', desc: 'Upload hospital bills & prescriptions — our OCR pipeline extracts medicines, tests, and procedures automatically.' },
    { icon: <Database size={20} />, title: 'CGHS Dataset Integration', desc: 'Compare extracted items against official Central Government Health Scheme pricing benchmarks in real-time.' },
    { icon: <Pill size={20} />, title: 'Jan Aushadhi Discovery', desc: 'Discover affordable generic alternatives through Jan Aushadhi store mapping and availability intelligence.' },
    { icon: <Search size={20} />, title: 'Fuzzy Matching Engine', desc: 'Advanced medical terminology normalization that maps cryptic hospital codes to standardized drug and procedure names.' },
    { icon: <BarChart3 size={20} />, title: 'Cost Transparency Dashboard', desc: 'Interactive audit insights showing potential savings, pricing comparisons, and healthcare spending analytics.' },
    { icon: <MapPin size={20} />, title: 'Store Discovery & Mapping', desc: 'Locate nearest Jan Aushadhi stores for affordable medicine alternatives with integrated mapping.' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[300] bg-[#FBF9F4] text-[#1A1816] overflow-y-auto overflow-x-hidden selection:bg-[#16a34a] selection:text-white"
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
        className="fixed top-0 left-0 h-1.5 bg-[#16a34a] z-[320]"
      />

      {/* Sticky Nav */}
      <nav className="sticky top-0 w-full bg-[#FBF9F4]/90 backdrop-blur-xl border-b border-[#1A1816]/10 z-[305] px-6 md:px-16 py-4 flex justify-between items-center">
        <button 
          onClick={onClose}
          className="group flex items-center gap-3 font-mono text-xs font-black tracking-widest uppercase hover:text-[#16a34a] transition-colors"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-2 transition-transform duration-500" />
          Back to Portfolio
        </button>
        <div className="flex items-center gap-8">
           <div className="hidden lg:flex items-center gap-6 font-mono text-[9px] tracking-[0.3em] font-black text-[#1A1816]/30 uppercase">
            <span>Healthcare Transparency</span>
            <div className="w-1.5 h-1.5 bg-[#16a34a] rounded-full animate-pulse" />
            <span>Open Source</span>
          </div>
          <div className="h-8 w-px bg-[#1A1816]/10 hidden sm:block" />
          <div className="flex items-center gap-4">
            <Share2 size={16} className="text-[#1A1816]/40 hover:text-[#1A1816] cursor-pointer transition-colors" />
            <a href="https://sanjeevani-healthcare.vercel.app" target="_blank" rel="noopener noreferrer" className="bg-[#1A1816] text-white px-4 py-2 text-[10px] font-black tracking-widest uppercase hover:bg-[#16a34a] transition-colors">
              Try Sanjeevani
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
              <Heart className="text-[#16a34a]" size={18} />
              <span className="font-mono text-xs font-black tracking-[0.5em] uppercase">Healthcare Transparency</span>
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="text-[clamp(4rem,12vw,14rem)] leading-[0.85] font-black tracking-tighter mb-12"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Sanjeevani
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
              className="text-2xl md:text-4xl font-serif italic text-[#16a34a] max-w-4xl mx-auto leading-[1.1] tracking-tight"
            >
              "Empowering patients to understand their medical bills and discover affordable healthcare alternatives."
            </motion.p>
          </motion.div>

          {/* Background Decorative Element */}
          <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden opacity-[0.03]">
             <span className="text-[40vw] font-black text-[#1A1816] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none">सं</span>
          </div>

          <motion.div 
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 opacity-30"
          >
            <span className="font-mono text-[9px] uppercase tracking-[0.3em] font-black">Scroll to explore</span>
            <div className="w-px h-12 bg-[#1A1816]" />
          </motion.div>
        </header>

        <div className="max-w-[1400px] mx-auto px-6 md:px-16 py-32">
          
          {/* Problem Statement */}
          <section className="mb-48">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              <div className="lg:col-span-7">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  <div className="flex items-center gap-4 mb-8">
                    <span className="font-mono text-[10px] font-black tracking-[0.5em] uppercase text-[#16a34a]">The Problem</span>
                    <div className="flex-1 h-px bg-[#1A1816]/10" />
                  </div>
                  <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase mb-8 leading-[0.9]">
                    Information<br/>Asymmetry in<br/>Healthcare
                  </h2>
                  <p className="text-xl text-[#1A1816]/60 leading-relaxed max-w-xl">
                    Millions of patients pay hospital bills without having a reliable way to verify pricing. 
                    Medical documents are often complex, pricing information is fragmented, and awareness of 
                    affordable government-backed alternatives remains limited — leading to unnecessary 
                    healthcare expenses and reduced transparency.
                  </p>
                </motion.div>
              </div>
              <div className="lg:col-span-5 flex flex-col gap-6">
                {[
                  { stat: '₹ Lakhs', label: 'Overpaid annually by patients on medicines' },
                  { stat: '80%', label: 'Patients unaware of Jan Aushadhi alternatives' },
                  { stat: 'Complex', label: 'Hospital bills designed to be opaque' },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.15 }}
                    className="p-8 bg-white border border-[#1A1816]/10 shadow-lg hover:shadow-2xl transition-shadow duration-500"
                  >
                    <div className="text-3xl font-black text-[#1A1816] mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
                      {item.stat}
                    </div>
                    <div className="font-mono text-xs text-[#1A1816]/50 tracking-wide">{item.label}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Solution */}
          <section className="mb-48">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-[#1A1816] text-[#FBF9F4] p-12 md:p-20 relative overflow-hidden"
            >
              <div className="absolute -top-20 -right-20 text-[20vw] font-black text-white/[0.02] leading-none pointer-events-none select-none">💊</div>
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-8">
                  <Sparkles className="text-[#16a34a]" size={18} />
                  <span className="font-mono text-[10px] font-black tracking-[0.5em] uppercase text-[#16a34a]">The Solution</span>
                </div>
                <h2 className="text-4xl md:text-7xl font-black tracking-tighter uppercase mb-8 leading-[0.9]">
                  Sanjeevani Bridges<br/>The Gap
                </h2>
                <p className="text-xl text-white/60 leading-relaxed max-w-3xl mb-12">
                  By combining OCR technology, official healthcare datasets (CGHS & Jan Aushadhi), and an intelligent 
                  fuzzy matching engine, Sanjeevani provides patients with an easy-to-understand audit of their medical 
                  bills — empowering them to make more informed healthcare decisions.
                </p>
                <div className="flex flex-wrap gap-3">
                  {['React', 'Node.js', 'MongoDB', 'Python', 'OpenCV', 'EasyOCR', 'Tesseract', 'Express.js', 'Vite', 'Tailwind CSS'].map(t => (
                    <span key={t} className="font-mono text-[10px] tracking-widest text-white/40 border border-white/10 px-4 py-2 uppercase font-black hover:border-[#16a34a]/40 hover:text-[#16a34a] transition-all duration-300">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </section>

          {/* Key Features Grid */}
          <section className="mb-48">
            <div className="flex items-center gap-6 mb-16">
              <h2 className="text-4xl font-black uppercase tracking-tighter">Key Features</h2>
              <div className="flex-1 h-px bg-[#1A1816]/10" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-[#1A1816]/10 border border-[#1A1816]/10">
              {features.map((feat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="bg-[#FBF9F4] p-10 hover:bg-white transition-all duration-500 group"
                >
                  <div className="flex items-center gap-4 mb-6">
                    <span className="p-3 bg-white border border-[#1A1816]/10 shadow-lg text-[#16a34a] group-hover:bg-[#16a34a] group-hover:text-white transition-all duration-500">
                      {feat.icon}
                    </span>
                    <span className="font-mono text-[10px] text-[#16a34a] tracking-[0.3em] font-black uppercase">0{i + 1}</span>
                  </div>
                  <h4 className="text-xl font-black mb-3 uppercase tracking-tighter">{feat.title}</h4>
                  <p className="text-sm text-[#1A1816]/60 leading-relaxed">{feat.desc}</p>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Dashboard Preview */}
          <section className="mb-48">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end mb-16">
              <div className="lg:col-span-8">
                <h2 className="text-5xl md:text-8xl font-black tracking-tighter uppercase mb-8">The<br/>Dashboard</h2>
                <p className="text-xl text-[#1A1816]/60 max-w-2xl leading-relaxed">
                  An intuitive cost transparency dashboard that transforms complex hospital bills into clear, 
                  actionable insights — showing pricing comparisons, savings opportunities, and affordable alternatives at a glance.
                </p>
              </div>
              <div className="lg:col-span-4 flex lg:justify-end">
                <div className="flex gap-8">
                   <div className="text-center">
                      <div className="text-4xl font-black text-[#16a34a]">CGHS</div>
                      <div className="text-[10px] font-bold uppercase tracking-widest text-[#1A1816]/40">Govt. Pricing</div>
                   </div>
                   <div className="w-px h-12 bg-[#1A1816]/10" />
                   <div className="text-center">
                      <div className="text-4xl font-black text-[#B45309]">OCR</div>
                      <div className="text-[10px] font-bold uppercase tracking-widest text-[#1A1816]/40">Bill Scan</div>
                   </div>
                </div>
              </div>
            </div>

            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="relative aspect-video bg-white border border-[#1A1816]/10 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)] overflow-hidden group"
            >
              <div className="absolute top-0 left-0 w-full h-12 bg-[#1A1816] flex items-center px-6 gap-2">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#ef4444]" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#f59e0b]" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#16a34a]" />
                </div>
                <div className="flex-1 text-center font-mono text-[10px] text-white/40 tracking-[0.2em]">SANJEEVANI_HEALTHCARE_DASHBOARD</div>
              </div>
              <div className="mt-12 w-full h-full bg-[#FBF9F4] p-12 flex items-center justify-center">
                <div className="text-center">
                   <Activity size={80} className="mx-auto mb-8 text-[#16a34a]/20 animate-pulse" />
                   <p className="font-serif italic text-2xl text-[#1A1816]/30">Healthcare Cost Transparency Dashboard</p>
                </div>
              </div>
              <div className="absolute bottom-12 right-12 max-w-xs bg-[#1A1816] text-white p-6 shadow-2xl border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <span className="font-mono text-[9px] text-[#16a34a] block mb-2 tracking-[0.2em] font-black uppercase">Live Feature</span>
                <p className="text-xs leading-relaxed font-mono opacity-70">
                  Real-time comparison of billed prices against CGHS government rates with savings calculation and Jan Aushadhi alternatives.
                </p>
              </div>
            </motion.div>
          </section>

          {/* Technical Pipeline */}
          <section className="mb-48">
             <div className="max-w-4xl">
               <h3 className="text-5xl md:text-7xl font-black tracking-tighter uppercase mb-16">How It<br/>Works</h3>
               
               <div className="space-y-24">
                  {[
                    { phase: '01', title: 'DOCUMENT UPLOAD', desc: 'Users upload hospital bills, prescriptions, or pharmacy receipts. Our pipeline accepts PDFs, images, and camera-scanned documents.', icon: <ScanLine /> },
                    { phase: '02', title: 'OCR EXTRACTION', desc: 'Using Python, OpenCV, and EasyOCR/Tesseract, we extract structured data — medicine names, diagnostic tests, procedures, and their billed amounts from the document.', icon: <Eye /> },
                    { phase: '03', title: 'FUZZY MATCHING', desc: 'Hospital billing codes and abbreviated drug names are normalized using fuzzy matching algorithms to map them to standardized government healthcare references.', icon: <Search /> },
                    { phase: '04', title: 'GOVT. COMPARISON', desc: 'Each extracted item is compared against CGHS pricing benchmarks and Jan Aushadhi catalogs. Potential overcharges are flagged with exact pricing differentials.', icon: <ShieldCheck /> },
                    { phase: '05', title: 'INSIGHTS & SAVINGS', desc: 'The system generates an interactive audit report showing potential savings, affordable alternatives at Jan Aushadhi stores, and a healthcare cost breakdown.', icon: <BarChart3 /> },
                  ].map((p, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      className="flex gap-12 group"
                    >
                      <div className="flex-shrink-0 w-20">
                        <span className="text-5xl font-black text-[#1A1816]/5 group-hover:text-[#16a34a]/20 transition-colors duration-500">{p.phase}</span>
                      </div>
                      <div>
                        <div className="flex items-center gap-4 mb-4">
                           <span className="p-3 bg-white border border-[#1A1816]/10 shadow-lg text-[#16a34a]">{p.icon}</span>
                           <h4 className="text-2xl font-black uppercase tracking-tight">{p.title}</h4>
                        </div>
                        <p className="text-xl text-[#1A1816]/60 leading-relaxed">{p.desc}</p>
                      </div>
                    </motion.div>
                  ))}
               </div>
             </div>
          </section>

          {/* Tech Stack Deep Dive */}
          <section className="mb-48">
            <div className="flex items-center gap-6 mb-16">
              <h2 className="text-4xl font-black uppercase tracking-tighter">The Tech Stack</h2>
              <div className="flex-1 h-px bg-[#1A1816]/10" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-[#1A1816]/10 border border-[#1A1816]/10">
              {[
                { title: 'Frontend', tech: 'React / Vite / Tailwind', desc: 'Fast, responsive UI with real-time dashboard updates and interactive bill analysis views.' },
                { title: 'Backend', tech: 'Node.js / Express.js', desc: 'RESTful API handling document processing, dataset queries, and fuzzy matching orchestration.' },
                { title: 'OCR Engine', tech: 'Python / OpenCV / EasyOCR', desc: 'Custom OCR pipeline tuned for hospital bills, prescriptions, and thermal printer receipts.' },
                { title: 'Database', tech: 'MongoDB', desc: 'Stores CGHS datasets, Jan Aushadhi catalogs, user audits, and processed medical bill records.' },
              ].map((item, i) => (
                <div key={i} className="bg-[#FBF9F4] p-10 hover:bg-white transition-all duration-500 group">
                  <div className="font-mono text-[10px] text-[#16a34a] mb-4 tracking-[0.3em] font-black uppercase">Layer 0{i+1}</div>
                  <h4 className="text-2xl font-black mb-2 uppercase tracking-tighter">{item.title}</h4>
                  <div className="font-mono text-[11px] font-bold text-[#1A1816]/40 mb-6">{item.tech}</div>
                  <p className="text-sm text-[#1A1816]/60 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Future Scope */}
          <section className="mb-48">
            <div className="flex items-center gap-6 mb-16">
              <h2 className="text-4xl font-black uppercase tracking-tighter">Future Scope</h2>
              <div className="flex-1 h-px bg-[#1A1816]/10" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                'Multilingual healthcare explanations',
                'Expanded national healthcare datasets',
                'Insurance policy integrations',
                'AI-powered healthcare insights',
                'Public healthcare pricing APIs',
                'Predictive healthcare cost analysis',
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="flex items-center gap-4 p-6 bg-white border border-[#1A1816]/10 hover:border-[#16a34a]/30 transition-all duration-300 group"
                >
                  <Layers size={16} className="text-[#16a34a] flex-shrink-0" />
                  <span className="font-mono text-sm font-bold text-[#1A1816]/70 group-hover:text-[#1A1816] transition-colors">{item}</span>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Mobile Links */}
          <section className="xl:hidden mb-48 border-y border-[#1A1816]/10 py-16">
             <h4 className="font-mono text-[10px] font-black tracking-[0.3em] uppercase mb-8 text-center">Project Links</h4>
             <div className="grid grid-cols-2 gap-4">
               {projectLinks.map((link, i) => (
                 <a key={i} href={link.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-4 bg-white border border-[#1A1816]/10 text-xs font-bold uppercase tracking-widest hover:bg-[#1A1816] hover:text-white transition-all duration-300">
                   {link.icon} {link.label}
                 </a>
               ))}
             </div>
          </section>

          {/* Final Footer */}
          <footer className="bg-[#1A1816] text-[#FBF9F4] p-12 md:p-32 text-center overflow-hidden relative">
             <div className="relative z-10 max-w-3xl mx-auto">
               <h3 className="text-4xl md:text-7xl font-black tracking-tighter uppercase mb-12 leading-[0.9]">Healthcare<br/>Transparency<br/>For Everyone.</h3>
               <p className="text-white/50 text-xl leading-relaxed mb-16">
                 Sanjeevani was built to arm patients with the data they need to understand their medical bills 
                 and access affordable alternatives. Transparent pricing is not a privilege — it's a right.
               </p>
               <div className="flex flex-col md:flex-row gap-6 justify-center">
                  <a href="https://sanjeevani-healthcare.vercel.app" target="_blank" rel="noopener noreferrer" className="bg-white text-[#1A1816] px-12 py-5 text-xs font-black tracking-[0.3em] uppercase hover:bg-[#16a34a] hover:text-white transition-all duration-500 shadow-2xl">
                    Try Sanjeevani
                  </a>
                  <button onClick={onClose} className="border border-white/20 px-12 py-5 text-xs font-black tracking-[0.3em] uppercase hover:bg-white hover:text-[#1A1816] transition-all duration-500">
                    Back to Portfolio
                  </button>
               </div>
             </div>
             <div className="absolute -bottom-20 -left-10 text-[25vw] font-black text-white/[0.02] leading-none pointer-events-none select-none">स्वस्थ</div>
          </footer>
        </div>
      </div>
    </motion.div>
  );
}
