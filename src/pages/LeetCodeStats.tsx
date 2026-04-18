import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Trophy, Code2, Clock, Zap, Star, Target, TrendingUp, Calendar, ChevronRight, Flame, Award, Brain, CheckCircle, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
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

interface Problem {
  id: string;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  category: string;
  date: string;
  status: string;
}

const difficultyColors = {
  Easy: '#22c55e',
  Medium: '#f59e0b',
  Hard: '#ef4444',
};

const AnimatedGrid = () => {
  const gridRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={gridRef} className="absolute inset-0 opacity-[0.15] pointer-events-none" style={{
      backgroundImage: `linear-gradient(rgba(245,158,11,0.08) 1.5px, transparent 1.5px),
                      linear-gradient(90deg, rgba(245,158,11,0.08) 1.5px, transparent 1.5px)`,
      backgroundSize: '60px 60px',
    }}>
      {Array.from({ length: 50 }).map((_, i) => (
        <motion.div 
          key={i} 
          animate={{ 
            opacity: [0.2, 0.5, 0.2],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: Math.random() * 3 + 2,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
          className="absolute w-1.5 h-1.5 bg-amber-500/40 rounded-full blur-[1px]"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
        />
      ))}
    </div>
  );
};

const CircularProgress = ({ value, max, label, color, delay }: { value: number; max: number; label: string; color: string; delay: number }) => {
  const circleRef = useRef<SVGCircleElement>(null);
  const percentage = Math.round((value / max) * 100);
  const circumference = 2 * Math.PI * 45;

  useEffect(() => {
    const circle = circleRef.current;
    if (!circle) return;

    gsap.fromTo(circle,
      { strokeDashoffset: circumference },
      {
        strokeDashoffset: circumference - (percentage / 100) * circumference,
        duration: 2.5,
        delay: delay * 0.3,
        ease: "power4.out",
        scrollTrigger: {
          trigger: circle,
          start: "top 90%"
        }
      }
    );
  }, [delay, percentage, circumference]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      className="relative w-32 h-32 md:w-40 md:h-40"
    >
      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
        <circle
          cx="50"
          cy="50"
          r="45"
          fill="none"
          stroke="rgba(255,255,255,0.03)"
          strokeWidth="6"
        />
        <circle
          ref={circleRef}
          cx="50"
          cy="50"
          r="45"
          fill="none"
          stroke={color}
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray={circumference}
          style={{
            filter: `drop-shadow(0 0 15px ${color}60)`,
          }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-2xl md:text-3xl font-black text-white">{value}</span>
        <span className="text-[10px] md:text-[11px] font-black uppercase tracking-[0.2em] text-white/30">{label}</span>
      </div>
    </motion.div>
  );
};

const StatCard = ({ 
  icon: Icon, 
  label, 
  value, 
  subValue, 
  delay, 
  color 
}: { 
  icon: any; 
  label: string; 
  value: string | number; 
  subValue?: string;
  delay: number; 
  color: string;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: delay * 0.1, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -10, scale: 1.02 }}
      className="relative p-10 rounded-[2.5rem] bg-white/[0.03] border border-white/[0.08] backdrop-blur-2xl overflow-hidden group cursor-default"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700" />

      <div className="relative z-10 space-y-6">
        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${color} shadow-2xl transition-transform duration-500 group-hover:rotate-12`}>
          <Icon size={28} className="text-white" />
        </div>
        <div>
          <div className="text-[11px] font-black uppercase tracking-[0.4em] text-white/30 mb-3">{label}</div>
          <div className="text-5xl font-black text-white tracking-tighter leading-none">{value}</div>
          {subValue && (
            <div className="text-xs font-bold text-amber-500/60 mt-3 uppercase tracking-widest">{subValue}</div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

const ProblemCard = ({ problem, index }: { problem: Problem; index: number }) => {
  return (
    <motion.a
      href={`https://leetcode.com/problems/${problem.title.toLowerCase().replace(/\s+/g, '-')}`}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ x: 10, backgroundColor: 'rgba(255,255,255,0.06)' }}
      className="flex items-center gap-6 p-6 rounded-3xl bg-white/[0.03] border border-white/[0.08] hover:border-amber-500/40 transition-all duration-500 group cursor-pointer"
    >
      <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-white/5 group-hover:bg-white/10 transition-colors">
        <Code2 size={24} style={{ color: difficultyColors[problem.difficulty] }} />
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="text-lg font-black text-white mb-2 truncate group-hover:text-amber-500 transition-colors">{problem.title}</h3>
        <div className="flex items-center gap-4 text-[11px] font-bold uppercase tracking-widest text-white/30">
          <span style={{ color: difficultyColors[problem.difficulty] }}>{problem.difficulty}</span>
          <span>•</span>
          <span>{problem.category}</span>
          <span>•</span>
          <span>{new Date(problem.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
        </div>
      </div>
      <ChevronRight size={20} className="text-white/20 group-hover:text-amber-500 transition-transform group-hover:translate-x-2" />
    </motion.a>
  );
};

export default function LeetCodeStats() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState<LeetCodeProfile | null>(null);
  const [loading, setLoading] = useState(true);

  const handleReturn = () => {
    window.dispatchEvent(new CustomEvent('trigger-transition', { 
      detail: { name: 'Returning Home', target: 'home' } 
    }));
    setTimeout(() => navigate('/'), 400);
  };

  useEffect(() => {
    setProfile({
      username: 'kUyAWXHOC5',
      totalSolved: 425,
      easySolved: 180,
      mediumSolved: 210,
      hardSolved: 35,
      ranking: 12000,
      contributionPoints: 85,
      reputation: 2450,
      submissionCalendar: {},
    });
    setLoading(false);
  }, []);

  const solvedProblems: Problem[] = [
    { id: '1', title: 'Two Sum', difficulty: 'Easy', category: 'Array', date: '2024-01-15', status: 'Solved' },
    { id: '2', title: 'Add Two Numbers', difficulty: 'Medium', category: 'Linked List', date: '2024-01-14', status: 'Solved' },
    { id: '3', title: 'Longest Substring Without Repeating Characters', difficulty: 'Medium', category: 'String', date: '2024-01-13', status: 'Solved' },
    { id: '4', title: 'Median of Two Sorted Arrays', difficulty: 'Hard', category: 'Binary Search', date: '2024-01-12', status: 'Solved' },
    { id: '5', title: 'Valid Parentheses', difficulty: 'Easy', category: 'Stack', date: '2024-01-11', status: 'Solved' },
    { id: '6', title: 'Merge Two Sorted Lists', difficulty: 'Easy', category: 'Linked List', date: '2024-01-10', status: 'Solved' },
  ];

  return (
    <main className="min-h-screen bg-[#080808] text-white selection:bg-amber-500 selection:text-black pb-40">
      <SEO title="Neural Interface | LeetCode Analytics" />
      <AnimatedGrid />
      <div className="absolute inset-0 opacity-[0.03] cinema-grain pointer-events-none" />

      {loading ? (
        <section className="h-screen flex items-center justify-center">
          <div className="flex flex-col items-center gap-8">
            <motion.div
              animate={{ rotate: 360, scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-20 h-20 border-2 border-amber-500/20 border-t-amber-500 rounded-full"
            />
            <span className="text-[11px] font-black uppercase tracking-[0.5em] text-white/30 animate-pulse">Syncing Neural Grid...</span>
          </div>
        </section>
      ) : (
        <>
          {/* Hero Section */}
          <section className="relative h-screen flex flex-col items-center justify-center px-6 pt-20 overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(245,158,11,0.12),transparent_60%)]" />

            <div className="relative z-10 text-center max-w-6xl mx-auto space-y-12">
              <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="inline-flex items-center gap-4 px-8 py-3 rounded-full bg-white/[0.03] border border-white/10 backdrop-blur-3xl mx-auto"
              >
                <Trophy size={18} className="text-amber-500" />
                <span className="text-[11px] font-black uppercase tracking-[0.5em] text-white/50">Competitive Intelligence @{profile?.username}</span>
              </motion.div>

              <motion.h1
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                className="text-[clamp(4rem,15vw,12rem)] font-black leading-[0.85] tracking-tighter text-white uppercase italic"
              >
                Neural <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 via-orange-500 to-amber-500">Interface</span>
              </motion.h1>

              <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 1 }}
                className="flex flex-wrap items-center justify-center gap-12 md:gap-24 pt-12"
              >
                {[
                  { label: 'Total Solved', value: profile?.totalSolved, color: 'text-white' },
                  { label: 'Global Rank', value: `#${profile?.ranking?.toLocaleString()}`, color: 'text-amber-500' },
                  { label: 'Percentile', value: `${profile?.contributionPoints}%`, color: 'text-emerald-500' }
                ].map((stat, i) => (
                  <div key={stat.label} className="text-center group cursor-default">
                    <div className={`text-6xl md:text-8xl font-black ${stat.color} tracking-tighter group-hover:scale-110 transition-transform duration-500`}>{stat.value}</div>
                    <div className="text-[11px] font-black uppercase tracking-[0.4em] text-white/20 mt-4">{stat.label}</div>
                  </div>
                ))}
              </motion.div>
            </div>

            <motion.div 
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute bottom-12 flex flex-col items-center gap-4 opacity-20"
            >
              <span className="text-[10px] font-black tracking-[0.5em] uppercase text-white">Initialize Analysis</span>
              <div className="w-[1px] h-12 bg-gradient-to-b from-amber-500 to-transparent" />
            </motion.div>
          </section>

          {/* Core Metrics */}
          <section className="max-w-[1600px] mx-auto px-6 md:px-12 py-32">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
              <StatCard icon={Code2} label="Logic Units" value={profile?.totalSolved || 0} delay={1} color="bg-amber-600/30" />
              <StatCard icon={Target} label="Neural Rank" value={`#${profile?.ranking?.toLocaleString() || 0}`} subValue="Global Position" delay={2} color="bg-orange-600/30" index={1} />
              <StatCard icon={Zap} label="Efficiency" value={`${profile?.contributionPoints || 0}%`} subValue="Percentile Beats" delay={3} color="bg-emerald-600/30" index={2} />
              <StatCard icon={TrendingUp} label="Reputation" value={profile?.reputation?.toLocaleString() || 0} delay={4} color="bg-violet-600/30" index={3} />
            </div>
          </section>

          {/* Deep Analytics */}
          <section className="max-w-[1600px] mx-auto px-6 md:px-12 py-40">
            <div className="grid lg:grid-cols-5 gap-20 lg:gap-32 items-start">
              <div className="lg:col-span-2 space-y-16">
                <div className="border-l-4 border-amber-500 pl-8 space-y-4">
                  <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter uppercase leading-none">Complexity<br/><span className="text-amber-500">Matrix</span></h2>
                  <p className="text-xl text-white/30 font-medium leading-relaxed">Multidimensional breakdown of algorithmic problem-solving capacity across complexity tiers.</p>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-12 bg-white/[0.02] p-12 rounded-[3rem] border border-white/5">
                  <CircularProgress value={profile?.easySolved || 0} max={profile?.totalSolved || 1} label="Easy" color={difficultyColors.Easy} delay={0.1} />
                  <CircularProgress value={profile?.mediumSolved || 0} max={profile?.totalSolved || 1} label="Medium" color={difficultyColors.Medium} delay={0.2} />
                  <CircularProgress value={profile?.hardSolved || 0} max={profile?.totalSolved || 1} label="Hard" color={difficultyColors.Hard} delay={0.3} />
                </div>
              </div>

              <div className="lg:col-span-3 space-y-12">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-[11px] font-black uppercase tracking-[0.5em] text-white/20">Recent Decryption Logs</h3>
                  <a href={`https://leetcode.com/${profile?.username}`} target="_blank" rel="noopener noreferrer" className="text-amber-500 text-[10px] font-black uppercase tracking-widest hover:text-white transition-colors">View Master Profile</a>
                </div>
                <div className="grid gap-6">
                  {solvedProblems.map((problem, index) => (
                    <ProblemCard key={problem.id} problem={problem} index={index} />
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* BACK NAVIGATION */}
          <section className="py-24 flex flex-col items-center justify-center px-6 text-center space-y-12">
            <div className="space-y-4">
              <h3 className="text-white/20 font-black text-[11px] uppercase tracking-[1em]">Termination Protocol</h3>
              <p className="text-2xl text-white font-bold tracking-tight">Return to the primary core hub?</p>
            </div>

            <button 
              onClick={handleReturn}
              className="group relative flex items-center gap-8 px-16 py-8 bg-white text-black font-black text-sm uppercase tracking-[0.5em] rounded-full hover:scale-110 active:scale-95 transition-all duration-700 shadow-[0_0_50px_rgba(245,158,11,0.2)]"
            >
              <div className="absolute inset-0 rounded-full bg-white blur-2xl opacity-0 group-hover:opacity-20 transition-opacity" />
              <ArrowLeft size={20} className="group-hover:-translate-x-3 transition-transform duration-500" />
              Return to Core
            </button>
          </section>
        </>
      )}
    </main>
  );
}