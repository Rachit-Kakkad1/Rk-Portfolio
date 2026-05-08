import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ShieldAlert, ScanLine, FileText, ArrowRight, AlertTriangle } from 'lucide-react';

export default function MedClearShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Parallax calculations for the editorial feel
  const yText = useTransform(scrollYProgress, [0, 1], ["0%", "-10%"]);
  const rotateDoc = useTransform(scrollYProgress, [0, 1], [2, -2]);

  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen bg-[#FBF9F4] text-[#1A1816] overflow-hidden py-32 md:py-48 selection:bg-[#B45309] selection:text-[#FBF9F4]"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      {/* Paper Texture Noise Overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.04] mix-blend-multiply z-0">
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <filter id="medclear-noise">
            <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="3" stitchTiles="stitch" />
          </filter>
          <rect width="100%" height="100%" filter="url(#medclear-noise)" />
        </svg>
      </div>

      {/* Editorial Grid Lines */}
      <div className="absolute inset-0 pointer-events-none z-0 opacity-[0.06]">
        <div className="h-full w-px bg-[#1A1816] absolute left-[5%]" />
        <div className="h-full w-px bg-[#1A1816] absolute left-[50%] hidden lg:block" />
        <div className="h-full w-px bg-[#1A1816] absolute right-[5%]" />
      </div>

      <div className="max-w-[1600px] mx-auto px-6 md:px-16 relative z-10">
        
        {/* Newspaper Style Flagship Masthead */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 border-t-4 border-b-2 border-[#1A1816] py-6 flex flex-col items-center justify-center text-center"
        >
          <div className="flex items-center gap-12 mb-2">
            <div className="hidden lg:block h-px w-32 bg-[#1A1816]/20" />
            <span className="font-mono text-[10px] md:text-xs font-black tracking-[0.6em] uppercase text-[#1A1816]">
              SPECIAL INVESTIGATIVE EDITION
            </span>
            <div className="hidden lg:block h-px w-32 bg-[#1A1816]/20" />
          </div>
          <h2 
            className="text-[clamp(2.5rem,6vw,5.5rem)] font-black uppercase leading-[0.85] tracking-tighter text-[#1A1816]"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Flagship Project
          </h2>
          <div className="mt-4 flex items-center gap-6 font-mono text-[9px] uppercase tracking-[0.3em] font-bold text-[#B45309]">
            <span>Vol. XCIV</span>
            <div className="w-1.5 h-1.5 bg-[#B45309] rounded-full" />
            <span>Archive Ref: 2026-MC</span>
            <div className="w-1.5 h-1.5 bg-[#B45309] rounded-full" />
            <span>Digital Systems</span>
          </div>
        </motion.div>

        {/* Top Metadata Bar */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row md:items-center justify-between border-b-2 border-[#1A1816] pb-6 mb-16 lg:mb-24 gap-6"
        >
          <div className="flex items-center gap-4">
            <span className="w-3 h-3 bg-[#D9230F] rounded-full animate-pulse" />
            <span 
              className="text-xs md:text-sm font-bold tracking-[0.3em] uppercase text-[#D9230F]"
              style={{ fontFamily: "'IBM Plex Mono', monospace" }}
            >
              ACTIVE FRAUD INVESTIGATION
            </span>
          </div>
          <span 
            className="text-[10px] md:text-xs tracking-[0.2em] uppercase text-[#1A1816]/60 font-medium"
            style={{ fontFamily: "'IBM Plex Mono', monospace" }}
          >
            CASE FILE REF: MC-84920-X // CLASSIFIED
          </span>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">
          
          {/* Left Column: The Story & Typography */}
          <motion.div style={{ y: yText }} className="lg:col-span-6 flex flex-col z-20">
            <motion.h1 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-[clamp(5rem,10vw,12rem)] leading-[0.8] tracking-[-0.04em] font-black text-[#1A1816] mb-8"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              MedClear
            </motion.h1>

            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-2xl md:text-4xl text-[#B45309] font-medium italic leading-tight tracking-tight mb-10 border-l-4 border-[#B45309] pl-6"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              “We found ₹85,000 hidden inside a single hospital invoice.”
            </motion.h2>

            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.2 }}
              className="text-lg md:text-xl text-[#1A1816]/80 leading-relaxed max-w-xl mb-16"
            >
              An AI-assisted healthcare auditing infrastructure that exposes hidden medical overcharges, 
              duplicate procedures, and inflated pricing through high-speed OCR extraction, 
              fraud heuristics, and government NPPA benchmark verification.
            </motion.p>

            {/* Investigative Data Grid */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="grid grid-cols-2 gap-x-8 gap-y-12 py-10 border-y border-[#1A1816]/20 mb-16"
              style={{ fontFamily: "'IBM Plex Mono', monospace" }}
            >
              <div>
                <div className="text-[10px] tracking-[0.2em] uppercase text-[#1A1816]/50 mb-2">Automated Pipeline</div>
                <div className="text-xl font-bold text-[#1A1816] flex items-center gap-2">
                  <ScanLine size={20} className="text-[#B45309]" /> OCR + AI
                </div>
              </div>
              <div>
                <div className="text-[10px] tracking-[0.2em] uppercase text-[#1A1816]/50 mb-2">Gov. Verification</div>
                <div className="text-xl font-bold text-[#1A1816] flex items-center gap-2">
                  <ShieldAlert size={20} className="text-[#B45309]" /> NPPA SYNC
                </div>
              </div>
              <div>
                <div className="text-[10px] tracking-[0.2em] uppercase text-[#D9230F] mb-2">Maximum Detected</div>
                <div className="text-3xl font-black text-[#D9230F]">+1788%</div>
              </div>
              <div>
                <div className="text-[10px] tracking-[0.2em] uppercase text-[#1A1816]/50 mb-2">Core Heuristic</div>
                <div className="text-sm font-bold text-[#1A1816] leading-tight">
                  DUPLICATE<br/>BILLING
                </div>
              </div>
            </motion.div>

            {/* CTA */}
            <motion.button 
              onClick={() => navigate('/project/medclear')}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="group relative inline-flex items-center gap-6 self-start overflow-hidden border border-[#1A1816] px-8 py-5 transition-colors duration-500 hover:text-[#FBF9F4]"
              style={{ fontFamily: "'IBM Plex Mono', monospace" }}
            >
              <span className="absolute inset-0 bg-[#1A1816] transform origin-left scale-x-0 transition-transform duration-500 ease-out group-hover:scale-x-100 z-0" />
              <span className="relative z-10 text-xs font-bold tracking-[0.3em] uppercase">Open Investigation</span>
              <ArrowRight className="relative z-10 w-5 h-5 transform transition-transform duration-500 group-hover:translate-x-2" />
            </motion.button>
          </motion.div>

          {/* Right Column: The Evidence Board */}
          <div className="lg:col-span-6 relative h-[600px] md:h-[800px] w-full flex items-center justify-center perspective-[2000px]">
            
            {/* The Document Container */}
            <motion.div 
              style={{ rotateZ: rotateDoc, rotateY: -4, rotateX: 2 }}
              className="relative w-full max-w-[500px] bg-white p-8 md:p-12 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.15)] border border-[#1A1816]/10 z-10 group"
            >
              {/* Animated OCR Scanner Line */}
              <motion.div 
                animate={{ top: ["0%", "100%", "0%"] }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                className="absolute left-0 right-0 h-[2px] bg-[#D9230F] shadow-[0_0_15px_rgba(217,35,15,0.6)] z-50 pointer-events-none"
              >
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[100px] bg-gradient-to-b from-[#D9230F]/0 via-[#D9230F]/5 to-[#D9230F]/0 pointer-events-none" />
              </motion.div>

              {/* Document Header */}
              <div className="border-b-2 border-[#1A1816] pb-6 mb-8 flex justify-between items-start font-mono text-xs text-[#1A1816]">
                <div>
                  <h3 className="font-bold text-xl mb-1 tracking-tight">HOSPITAL_INVOICE</h3>
                  <span className="text-[#1A1816]/50">DOC_ID: 994-A82</span>
                </div>
                <div className="text-right">
                  <div className="bg-[#1A1816] text-white px-2 py-1 select-none">CONFIDENTIAL</div>
                  <div className="mt-2 text-[#1A1816]/40">PAGE 1 OF 1</div>
                </div>
              </div>

              {/* Document Body / Line Items */}
              <div className="space-y-6 font-mono text-sm relative">
                
                <div className="flex justify-between border-b border-dashed border-[#1A1816]/20 pb-2">
                  <span className="text-[#1A1816]/80">ICU_ROOM_CHARGES (2 DAYS)</span>
                  <span className="text-[#1A1816]">₹12,000.00</span>
                </div>

                <div className="flex justify-between border-b border-dashed border-[#1A1816]/20 pb-2">
                  <span className="text-[#1A1816]/80">CONSULTATION_FEE_DR_<span className="bg-[#1A1816] text-[#1A1816] select-none">REDACTED</span></span>
                  <span className="text-[#1A1816]">₹2,500.00</span>
                </div>

                {/* The Discovered Fraud Row */}
                <div className="relative">
                  <div className="absolute -inset-x-4 -inset-y-2 bg-[#D9230F]/10 border border-[#D9230F] z-0 animate-pulse" />
                  <div className="relative z-10 flex justify-between border-b border-dashed border-[#1A1816]/20 pb-2">
                    <span className="font-bold text-[#D9230F] flex items-center gap-2">
                      <AlertTriangle size={14} />
                      SYRINGE_DISPOSABLE_50ML
                    </span>
                    <div className="text-right flex items-center gap-3">
                      <span className="text-[10px] text-[#D9230F] uppercase tracking-wider font-bold">Overcharge</span>
                      <span className="text-[#D9230F] font-black">₹1,200.00</span>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between border-b border-dashed border-[#1A1816]/20 pb-2">
                  <span className="text-[#1A1816]/80">BLOOD_TEST_CBC_PROFILE</span>
                  <span className="text-[#1A1816]">₹850.00</span>
                </div>

                {/* Duplicate Fraud Row */}
                <div className="relative mt-8">
                  <div className="absolute -inset-x-4 -inset-y-2 bg-[#B45309]/10 border border-[#B45309] z-0" />
                  <div className="relative z-10 flex justify-between border-b border-dashed border-[#1A1816]/20 pb-2">
                    <span className="font-bold text-[#B45309]">
                      BLOOD_TEST_CBC_PROFILE (DUP)
                    </span>
                    <span className="text-[#B45309] font-black">₹850.00</span>
                  </div>
                </div>

              </div>
            </motion.div>

            {/* Floating Investigative Panels */}
            
            {/* NPPA Panel */}
            <motion.div 
              initial={{ opacity: 0, x: 50, y: -20 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ type: "spring", stiffness: 100, delay: 0.6 }}
              className="absolute top-[10%] -right-4 md:-right-16 z-30 bg-[#1A1816] text-[#FBF9F4] p-5 shadow-2xl border border-white/10 max-w-[240px]"
              style={{ fontFamily: "'IBM Plex Mono', monospace" }}
            >
              <div className="flex items-center gap-3 text-[#D9230F] mb-3 border-b border-white/10 pb-3">
                <AlertTriangle size={16} />
                <span className="text-[10px] tracking-[0.2em] font-bold uppercase">Discrepancy Found</span>
              </div>
              <div className="font-serif text-3xl font-medium text-[#FBF9F4] mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
                1788% Markup
              </div>
              <div className="text-xs text-[#FBF9F4]/60 leading-relaxed">
                Govt. NPPA cap for item is ₹15.00. Billed amount exceeds legal limit.
              </div>
            </motion.div>

            {/* AI Heuristic Panel */}
            <motion.div 
              initial={{ opacity: 0, x: -50, y: 20 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ type: "spring", stiffness: 100, delay: 0.8 }}
              className="absolute bottom-[20%] -left-4 md:-left-12 z-30 bg-[#FBF9F4] text-[#1A1816] p-5 shadow-2xl border border-[#1A1816] max-w-[220px]"
              style={{ fontFamily: "'IBM Plex Mono', monospace" }}
            >
              <div className="flex items-center gap-3 text-[#B45309] mb-3 border-b border-[#1A1816]/10 pb-3">
                <FileText size={16} />
                <span className="text-[10px] tracking-[0.2em] font-bold uppercase">AI Heuristic</span>
              </div>
              <div className="text-sm font-bold text-[#1A1816] mb-2 uppercase tracking-wide">
                Duplicate Entry
              </div>
              <div className="text-xs text-[#1A1816]/60 leading-relaxed">
                Exact procedure code billed twice within identical timestamp.
              </div>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
}
