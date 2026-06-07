import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import { Trophy, Code2, Clock, Zap, Star, Target, TrendingUp, Calendar, ChevronRight, Flame, Award, Brain, CheckCircle, ArrowLeft, Activity, Cpu, Binary, Network, Shield, ZapIcon, Globe, Command, Terminal, Layers, Eye, Radio, Fingerprint, Sparkles } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { LeetCode } from '../components/Icons';
import { useNavigate, useLocation } from 'react-router-dom';
import SEO from '../components/SEO';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface LeetCodeProfile {
  username: string;
  totalSolved: number;
  easySolved: number;
  mediumSolved: number;
  hardSolved: number;
  ranking: number;
  contributionPoints: number;
  reputation: number;
  submissionCalendar: Record<string, number>;
}

const difficultyColors = {
  Easy: '#22c55e',
  Medium: '#f59e0b',
  Hard: '#ef4444',
};

// --- BEYOND GOD TIER UTILITY COMPONENTS ---

const ScrambleText = ({ text, delay = 0 }: { text: string, delay?: number }) => {
  const [displayText, setDisplayText] = useState('');
  const chars = '!@#$%^&*()_+{}:"<>?-=[];,./';

  useEffect(() => {
    let iteration = 0;
    const interval = setInterval(() => {
      setDisplayText(
        text
          .split('')
          .map((char, index) => {
            if (index < iteration) return text[index];
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join('')
      );

      if (iteration >= text.length) clearInterval(interval);
      iteration += 1 / 3;
    }, 30);
    return () => clearInterval(interval);
  }, [text]);

  return <span>{displayText}</span>;
};

const PerspectiveGrid = () => {
  const { scrollY } = useScroll();
  const rotateX = useTransform(scrollY, [0, 5000], [20, 60]);
  const translateZ = useTransform(scrollY, [0, 5000], [0, 200]);
  const opacity = useTransform(scrollY, [0, 1000], [0.2, 0.05]);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none perspective-[1000px]">
      <motion.div 
        style={{ rotateX, translateZ, opacity }}
        className="absolute inset-x-0 bottom-[-50%] h-[200%] origin-bottom"
      >
        <div className="w-full h-full" style={{ 
          backgroundImage: `linear-gradient(to right, #f59e0b 1px, transparent 1px), 
                           linear-gradient(to bottom, #f59e0b 1px, transparent 1px)`,
          backgroundSize: '80px 80px',
          maskImage: 'linear-gradient(to top, black, transparent 80%)'
        }} />
      </motion.div>
    </div>
  );
};

const QuantumHUD = () => {
  const { scrollYProgress } = useScroll();
  const scaleY = useSpring(scrollYProgress, { stiffness: 40, damping: 15 });

  return (
    <>
      {/* Left HUD */}
      <div className="fixed left-8 top-1/2 -translate-y-1/2 z-40 hidden xl:flex flex-col items-center gap-10">
        <div className="flex flex-col items-center gap-2">
          <div className="w-1 h-32 bg-white/5 rounded-full overflow-hidden">
            <motion.div style={{ scaleY }} className="w-full h-full bg-amber-500 origin-top shadow-[0_0_15px_#f59e0b]" />
          </div>
          <span className="text-[8px] font-black uppercase tracking-[0.5em] vertical-text text-white/20">Sync Progress</span>
        </div>
        <div className="flex flex-col gap-6">
          <Radio size={12} className="text-amber-500 animate-pulse" />
          <Fingerprint size={12} className="text-white/20" />
          <Globe size={12} className="text-white/20" />
        </div>
      </div>

      {/* Right HUD */}
      <div className="fixed right-8 top-1/2 -translate-y-1/2 z-40 hidden xl:flex flex-col items-center gap-10">
        <div className="space-y-1">
          {Array.from({ length: 12 }).map((_, i) => (
            <motion.div 
              key={i}
              animate={{ opacity: [0.1, 0.5, 0.1], scaleX: [1, 1.5, 1] }}
              transition={{ duration: 3, repeat: Infinity, delay: i * 0.1, ease: "easeInOut" }}
              className="w-8 h-[2px] bg-amber-500/40 rounded-full"
            />
          ))}
        </div>
        <div className="vertical-text text-[8px] font-black uppercase tracking-[0.5em] text-white/20">Neural Synapse v4.0</div>
      </div>
    </>
  );
};

const HoloCard = ({ children, className = "", delay = 0 }: { children: React.ReactNode, className?: string, delay?: number }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-100, 100], [10, -10]), { stiffness: 100, damping: 30 });
  const rotateY = useSpring(useTransform(x, [-100, 100], [-10, 10]), { stiffness: 100, damping: 30 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (rect) {
      x.set(e.clientX - (rect.left + rect.width / 2));
      y.set(e.clientY - (rect.top + rect.height / 2));
    }
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 30, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 1.2, delay, ease: [0.16, 1, 0.3, 1] }}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d", willChange: "transform" }}
      className={`relative group rounded-[3.5rem] border border-white/5 bg-white/[0.02] backdrop-blur-3xl p-10 transition-colors duration-700 hover:border-amber-500/30 holo-card-reveal ${className}`}
    >
      <div style={{ transform: "translateZ(50px)" }} className="relative z-10 h-full">
        {children}
      </div>
      
      {/* Dynamic Glow */}
      <motion.div 
        className="pointer-events-none absolute -inset-px rounded-[3.5rem] opacity-0 group-hover:opacity-100 transition-opacity duration-700"
        style={{
          background: useTransform(
            [x, y],
            ([mx, my]: any) => `radial-gradient(800px circle at ${(mx as number) + 200}px ${(my as number) + 200}px, rgba(245, 158, 11, 0.1), transparent 80%)`
          ),
        }}
      />
    </motion.div>
  );
};

// --- NEW GOD-LEVEL SINGULARITY COMPONENT ---
const SingularityCore = ({ value }: { value: number }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (rect) {
      mouseX.set(e.clientX - rect.left - rect.width / 2);
      mouseY.set(e.clientY - rect.top - rect.height / 2);
    }
  };

  const rotateX = useSpring(useTransform(mouseY, [-200, 200], [15, -15]), { stiffness: 50, damping: 20 });
  const rotateY = useSpring(useTransform(mouseX, [-200, 200], [-15, 15]), { stiffness: 50, damping: 20 });

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { mouseX.set(0); mouseY.set(0); }}
      className="relative w-full h-full flex items-center justify-center perspective-[1000px] overflow-hidden"
    >
      {/* Background Matrix Rain */}
      <div className="absolute inset-0 overflow-hidden opacity-10 pointer-events-none">
        {Array.from({ length: 15 }).map((_, i) => (
          <motion.div
            key={i}
            initial={{ y: -100 }}
            animate={{ y: [0, 400] }}
            transition={{ duration: Math.random() * 5 + 3, repeat: Infinity, ease: "linear", delay: Math.random() * 2 }}
            className="absolute text-[8px] font-mono text-amber-500/40 whitespace-nowrap"
            style={{ left: `${i * 7}%` }}
          >
            {Array.from({ length: 20 }).map(() => Math.random() > 0.5 ? '1' : '0').join('\n')}
          </motion.div>
        ))}
      </div>

      {/* Kinetic Rings */}
      <motion.div style={{ rotateX, rotateY, transformStyle: "preserve-3d" }} className="relative">
        <motion.div 
          animate={{ rotateZ: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute inset-[-80px] border-2 border-dashed border-amber-500/10 rounded-full"
        />
        <motion.div 
          animate={{ rotateZ: -360 }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute inset-[-50px] border border-white/5 rounded-full"
        />
        
        {/* Central Singularity */}
        <div style={{ transform: "translateZ(100px)" }} className="relative text-center">
          <motion.div
            animate={{ 
              scale: [1, 1.02, 1],
              filter: ["blur(0px)", "blur(1px)", "blur(0px)"]
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="text-[10rem] font-black italic tracking-tighter text-white drop-shadow-[0_0_40px_rgba(245,158,11,0.4)]"
          >
            {value}
          </motion.div>
          <div className="mt-2 text-[10px] font-black uppercase tracking-[1em] text-amber-500/60 drop-shadow-[0_0_10px_#f59e0b]">
            Decryptions
          </div>
        </div>

        {/* Floating Metadata Particles */}
        {['CORE_HEAT: 42.1C', 'LOGIC: STABLE', 'SYNC: 100%', 'SECTOR: 7G'].map((text, i) => (
          <motion.div
            key={text}
            style={{ 
              transform: `translateZ(${60 + i * 15}px)`,
              top: i % 2 === 0 ? '-100px' : '160px',
              left: i < 2 ? '-140px' : '140px'
            }}
            animate={{ 
              y: [0, -15, 0],
              opacity: [0.1, 0.3, 0.1]
            }}
            transition={{ duration: 5, repeat: Infinity, delay: i * 0.8, ease: "easeInOut" }}
            className="absolute text-[7px] font-mono text-white/40 whitespace-nowrap border border-white/5 px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-xl"
          >
            {text}
          </motion.div>
        ))}
      </motion.div>

      {/* Corner Brackets */}
      <div className="absolute top-8 left-8 w-10 h-10 border-t-2 border-l-2 border-amber-500/20 rounded-tl-2xl" />
      <div className="absolute top-8 right-8 w-10 h-10 border-t-2 border-r-2 border-amber-500/20 rounded-tr-2xl" />
      <div className="absolute bottom-8 left-8 w-10 h-10 border-b-2 border-l-2 border-amber-500/20 rounded-bl-2xl" />
      <div className="absolute bottom-8 right-8 w-10 h-10 border-b-2 border-r-2 border-amber-500/20 rounded-br-2xl" />
    </div>
  );
};

export default function LeetCodeStats() {
  const navigate = useNavigate();
  const location = useLocation();
  const [profile, setProfile] = useState<LeetCodeProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Artificial delay for cinematic loading
    const timer = setTimeout(() => {
      setProfile({
        username: 'Rachit-Kakkad1',
        totalSolved: 162,
        easySolved: 101,
        mediumSolved: 48,
        hardSolved: 13,
        ranking: 968621,
        contributionPoints: 30,
        reputation: 0,
        submissionCalendar: {
          "1756857600": 3,
          "1758844800": 1,
          "1759104000": 2,
          "1762646400": 12,
          "1762732800": 15,
          "1762819200": 19,
          "1763337600": 3,
          "1763424000": 3,
          "1763683200": 5,
          "1763856000": 6,
          "1764028800": 5,
          "1767312000": 4,
          "1768003200": 2,
          "1768089600": 1,
          "1769817600": 14,
          "1770508800": 2,
          "1770595200": 2,
          "1770681600": 8,
          "1770768000": 14,
          "1770854400": 12,
          "1771286400": 3,
          "1771977600": 2,
          "1772064000": 2,
          "1772236800": 2,
          "1772409600": 2,
          "1772668800": 1,
          "1772755200": 1,
          "1772841600": 7,
          "1772928000": 4,
          "1773014400": 5,
          "1773100800": 2,
          "1773187200": 2,
          "1773273600": 3,
          "1773792000": 2,
          "1774569600": 2,
          "1774742400": 2,
          "1774828800": 2,
          "1774915200": 4,
          "1775001600": 2,
          "1775088000": 6,
          "1775174400": 8,
          "1775260800": 1,
          "1775347200": 2,
          "1775433600": 7,
          "1775520000": 9,
          "1775692800": 4,
          "1775779200": 8,
          "1775865600": 14,
          "1775952000": 42,
          "1776038400": 6,
          "1776124800": 3,
          "1776211200": 2,
          "1776297600": 1,
          "1776384000": 5,
          "1776470400": 1,
          "1776556800": 9,
          "1776816000": 1
        },
      });
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!loading && containerRef.current) {
      const cards = containerRef.current.querySelectorAll('.holo-card-reveal');
      gsap.fromTo(cards, 
        { opacity: 0, y: 50, scale: 0.95 },
        { 
          opacity: 1, 
          y: 0, 
          scale: 1, 
          duration: 1.5, 
          stagger: 0.15, 
          ease: "expo.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
          }
        }
      );
    }
  }, [loading]);

  const handleReturn = () => {
    window.dispatchEvent(new CustomEvent('trigger-transition', { 
      detail: { name: 'De-initializing Matrix', target: 'home' } 
    }));
    const scrollTo = (location.state as any)?.fromSection || 'home';
    setTimeout(() => navigate('/', { state: { skipIntro: true, scrollTo } }), 400);
  };

  return (
    <main ref={containerRef} className="relative min-h-screen bg-[#020202] text-white selection:bg-amber-500 selection:text-black overflow-x-hidden">
      <Helmet>
        <title>LeetCode Stats | Rachit Kakkad</title>
        <meta name="description" content="LeetCode problem-solving stats of Rachit Kakkad — DSA practice in C++." />
        <link rel="canonical" href="https://rachit-hk-portfolio.vercel.app/leetcode-stats" />
      </Helmet>
      <SEO title="Neural Singularity | LeetCode Command" />
      <PerspectiveGrid />
      <QuantumHUD />

      <AnimatePresence mode="wait">
        {loading ? (
          <motion.section 
            key="loader"
            exit={{ opacity: 0, filter: "blur(20px)", scale: 1.1 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center p-10"
          >
            <div className="relative w-64 h-64 mb-16">
              <motion.div 
                animate={{ rotate: 360, scale: [1, 1.1, 1] }}
                transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 border-2 border-dashed border-amber-500/20 rounded-full"
              />
              <motion.div 
                animate={{ rotate: -360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                className="absolute inset-8 border border-white/5 rounded-full"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <LeetCode size={64} className="text-amber-500 drop-shadow-[0_0_20px_rgba(245,158,11,0.6)] animate-pulse" />
              </div>
            </div>
            <div className="space-y-6 text-center">
              <h2 className="text-[10px] font-black uppercase tracking-[1.5em] text-white/30">Neural Hub v4.0.26</h2>
              <div className="text-4xl font-black italic tracking-tighter uppercase overflow-hidden">
                <motion.div
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.8, ease: "circOut" }}
                >
                  <ScrambleText text="SYNCHRONIZING..." />
                </motion.div>
              </div>
            </div>
          </motion.section>
        ) : (
          <motion.div 
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
            className="relative z-10 pb-60"
          >
            {/* HERO - APEX SINGULARITY */}
            <header className="relative h-screen flex flex-col items-center justify-center px-6 text-center overflow-hidden">
              <motion.div 
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 2.5, ease: [0.16, 1, 0.3, 1] }}
                className="relative z-10 space-y-16"
              >
                <div className="inline-flex items-center gap-4 px-8 py-3 rounded-full bg-white/5 border border-white/10 backdrop-blur-3xl shadow-[0_0_40px_rgba(0,0,0,0.5)]">
                  <LeetCode size={16} className="text-amber-500 shadow-[0_0_15px_#f59e0b]" />
                  <span className="text-[10px] font-black uppercase tracking-[0.6em] text-white/60">Neural Identity: {profile?.username}</span>
                </div>

                <div className="space-y-4">
                  <h1 className="text-[clamp(4rem,18vw,16rem)] font-black leading-[0.8] tracking-tighter uppercase italic">
                    Neural<br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-b from-white via-white/80 to-white/5 drop-shadow-2xl">Entropy</span>
                  </h1>
                </div>

                <p className="max-w-3xl mx-auto text-sm md:text-xl text-white/40 font-medium tracking-tight leading-relaxed">
                  A high-fidelity visualization of cross-functional algorithmic logic and multi-tier structural engineering performance metrics.
                </p>
              </motion.div>

              {/* Decorative Scan Line */}
              <motion.div 
                animate={{ top: ["-10%", "110%"] }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-amber-500/40 to-transparent z-0 blur-[1px]"
              />
            </header>

            {/* BENTO APEX */}
            <section className="max-w-[1600px] mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-10 auto-rows-[280px]">
              
              {/* SINGULARITY CORE - TOTAL SOLVED (The New God-Tier Piece) */}
              <HoloCard className="md:col-span-8 md:row-span-2 overflow-hidden bg-black/40 border-amber-500/10">
                <SingularityCore value={profile?.totalSolved || 0} />
              </HoloCard>

              {/* Efficiency Hub */}
              <HoloCard className="md:col-span-4 md:row-span-2 flex flex-col items-center justify-center gap-16 text-center border-amber-500/20 bg-amber-500/[0.02]">
                <div className="relative w-64 h-64 group/gauge">
                  <svg className="w-full h-full -rotate-90 filter drop-shadow-[0_0_20px_rgba(245,158,11,0.2)]" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="46" fill="none" stroke="white" strokeWidth="0.5" className="opacity-10" />
                    <motion.circle 
                      cx="50" cy="50" r="46" fill="none" stroke="#f59e0b" strokeWidth="6" 
                      strokeDasharray="289"
                      initial={{ strokeDashoffset: 289 }}
                      whileInView={{ strokeDashoffset: 289 - (289 * (profile?.contributionPoints || 0)) / 100 }}
                      transition={{ duration: 3.5, ease: [0.16, 1, 0.3, 1] }}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.5 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 1.5, delay: 0.5 }}
                      className="text-8xl font-black italic tracking-tighter text-amber-500"
                    >
                      {profile?.contributionPoints}
                    </motion.div>
                    <div className="text-[10px] font-black uppercase tracking-[0.6em] text-white/30">Efficiency</div>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="text-[11px] font-black uppercase tracking-[0.5em] text-white/30">Synaptic Ranking</div>
                  <div className="text-2xl font-black italic tracking-tight text-white/90 uppercase">
                    TOP {profile?.ranking ? ((profile.ranking / 4000000) * 100).toFixed(1) : '24.2'}% GLOBAL
                  </div>
                </div>
              </HoloCard>

              {/* Complexity Matrix - Wide */}
              <HoloCard className="md:col-span-12 md:row-span-1 bg-white/[0.01]">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-20 h-full items-center">
                  {[
                    { label: 'L1: Basic', count: profile?.easySolved, color: difficultyColors.Easy },
                    { label: 'L2: Neural', count: profile?.mediumSolved, color: difficultyColors.Medium },
                    { label: 'L3: Apex', count: profile?.hardSolved, color: difficultyColors.Hard }
                  ].map((tier, idx) => (
                    <div key={tier.label} className="space-y-6">
                      <div className="flex justify-between items-end">
                        <span className="text-[11px] font-black uppercase tracking-[0.4em] text-white/30">{tier.label}</span>
                        <span className="text-4xl font-black italic tracking-tighter" style={{ color: tier.color }}>{tier.count}</span>
                      </div>
                      <div className="relative h-2 bg-white/5 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          whileInView={{ width: `${(tier.count! / profile?.totalSolved!) * 100}%` }}
                          transition={{ duration: 2.5, delay: 0.2 * idx, ease: [0.16, 1, 0.3, 1] }}
                          style={{ backgroundColor: tier.color }}
                          className="h-full shadow-[0_0_20px_currentColor]"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </HoloCard>

              {/* Secondary Stats */}
              <HoloCard className="md:col-span-6 md:row-span-1 border-indigo-500/10 hover:border-indigo-500/30">
                <div className="flex items-center gap-10 h-full">
                  <div className="w-24 h-24 rounded-full border border-white/10 flex items-center justify-center relative overflow-hidden group/icon">
                    <div className="absolute inset-0 bg-indigo-500/10 blur-2xl group-hover/icon:bg-indigo-500/20 transition-colors duration-700" />
                    <Network size={40} className="text-indigo-500 relative z-10 transition-transform duration-700 group-hover/icon:scale-110" />
                  </div>
                  <div>
                    <div className="text-[11px] font-black uppercase tracking-[0.5em] text-white/20 mb-2">Reputation Protocol</div>
                    <div className="text-6xl font-black italic tracking-tighter text-white/90 uppercase">{profile?.reputation} Units</div>
                  </div>
                </div>
              </HoloCard>

              <HoloCard className="md:col-span-6 md:row-span-1 border-emerald-500/10 hover:border-emerald-500/30">
                <div className="flex items-center gap-10 h-full">
                  <div className="w-24 h-24 rounded-full border border-white/10 flex items-center justify-center relative overflow-hidden group/icon">
                    <div className="absolute inset-0 bg-emerald-500/10 blur-2xl group-hover/icon:bg-emerald-500/20 transition-colors duration-700" />
                    <Target size={40} className="text-emerald-500 relative z-10 transition-transform duration-700 group-hover/icon:scale-110" />
                  </div>
                  <div>
                    <div className="text-[11px] font-black uppercase tracking-[0.5em] text-white/20 mb-2">Neural Rank</div>
                    <div className="text-6xl font-black italic tracking-tighter text-white/90 uppercase">#{profile?.ranking?.toLocaleString()}</div>
                  </div>
                </div>
              </HoloCard>

            </section>

            {/* ARCHIVES - APEX LIST */}
            <section className="max-w-[1200px] mx-auto px-6 py-60">
              <div className="space-y-20">
                <div className="flex items-center gap-8">
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: 64 }}
                    className="h-px bg-amber-500" 
                  />
                  <h2 className="text-6xl font-black italic uppercase tracking-tighter">Decryption Logs</h2>
                </div>

                <div className="grid gap-8">
                  {[
                    { title: 'Zigzag Conversion', diff: 'Medium', cat: 'String', score: '1,420', delay: 0.1 },
                    { title: 'Fizz Buzz', diff: 'Easy', cat: 'Math', score: '850', delay: 0.2 },
                    { title: 'Self Crossing', diff: 'Hard', cat: 'Geometry', score: '1,100', delay: 0.3 },
                    { title: 'Number of Good Pairs', diff: 'Easy', cat: 'Array', score: '620', delay: 0.4 },
                    { title: 'Convert the Temperature', diff: 'Easy', cat: 'Math', score: '540', delay: 0.5 }
                  ].map((log, i) => (
                    <motion.div
                      key={log.title}
                      initial={{ opacity: 0, x: -50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 1.2, delay: log.delay, ease: [0.16, 1, 0.3, 1] }}
                      whileHover={{ x: 30, backgroundColor: "rgba(255,255,255,0.03)" }}
                      className="group p-12 rounded-[3rem] border border-white/5 bg-white/[0.01] flex flex-col md:flex-row items-start md:items-center justify-between cursor-pointer transition-all duration-700 backdrop-blur-sm"
                    >
                      <div className="flex items-center gap-12">
                        <div className="w-20 h-20 rounded-3xl bg-white/5 flex items-center justify-center group-hover:bg-amber-500/10 transition-colors duration-700">
                          <LeetCode size={32} style={{ color: (difficultyColors as any)[log.diff] }} className="group-hover:scale-125 transition-transform duration-700 drop-shadow-[0_0_12px_currentColor]" />
                        </div>
                        <div>
                          <h4 className="text-3xl font-black italic tracking-tighter group-hover:text-amber-500 transition-colors duration-700 uppercase">{log.title}</h4>
                          <div className="flex items-center gap-8 mt-4">
                            <span className="text-[10px] font-bold uppercase tracking-[0.3em]" style={{ color: (difficultyColors as any)[log.diff] }}>{log.diff}</span>
                            <span className="w-1.5 h-1.5 rounded-full bg-white/10" />
                            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/30">{log.cat}</span>
                          </div>
                        </div>
                      </div>
                      <div className="mt-8 md:mt-0 text-left md:text-right">
                        <div className="text-[11px] font-black uppercase tracking-[0.4em] text-white/10 mb-2">Yield</div>
                        <div className="text-3xl font-black italic group-hover:text-white transition-colors duration-700">+{log.score}</div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>

            {/* EXIT PROTOCOL */}
            <section className="py-60 flex flex-col items-center">
              <motion.button 
                onClick={handleReturn}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="group relative w-64 h-64 rounded-full flex items-center justify-center overflow-hidden"
              >
                <div className="absolute inset-0 border-2 border-dashed border-white/10 rounded-full animate-[spin_30s_linear_infinite]" />
                <div className="absolute inset-4 bg-white rounded-full translate-y-full group-hover:translate-y-0 transition-transform duration-[0.8s] ease-[0.16,1,0.3,1]" />
                <div className="relative z-10 flex flex-col items-center gap-4 group-hover:text-black transition-colors duration-[0.8s] ease-[0.16,1,0.3,1]">
                  <ArrowLeft size={40} className="group-hover:-translate-x-2 transition-transform duration-700" />
                  <span className="text-[10px] font-black uppercase tracking-[0.6em]">Initialize Jump</span>
                </div>
              </motion.button>
            </section>

          </motion.div>
        )}
      </AnimatePresence>

      <footer className="relative z-10 py-32 border-t border-white/5 text-center bg-black/40 backdrop-blur-md">
        <div className="text-[10px] font-black uppercase tracking-[2em] text-white/10 italic">
          Rachit Kakkad — Neural Interface v4.0.26 — Optimized for Kinetic Logic
        </div>
      </footer>
    </main>
  );
}
