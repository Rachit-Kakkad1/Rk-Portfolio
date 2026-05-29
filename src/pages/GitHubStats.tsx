import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, Github, Star, GitFork, Activity, ShieldCheck, Zap } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import SEO from '../components/SEO';

const GITHUB_USERNAME = "Rachit-Kakkad1";

const StatCard = ({ children, title, delay = 0 }: { children: React.ReactNode, title: string, delay?: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, delay }}
    className="bg-[#1A1816] border border-white/10 p-6 md:p-8 rounded-3xl shadow-2xl group hover:border-[#B45309]/50 transition-all duration-500"
  >
    <div className="flex items-center gap-3 mb-6">
      <div className="w-10 h-10 rounded-full bg-[#B45309]/10 flex items-center justify-center text-[#B45309] group-hover:bg-[#B45309] group-hover:text-white transition-all duration-500">
        <Activity size={20} />
      </div>
      <h3 className="text-white/40 font-mono text-[10px] uppercase tracking-[0.3em] font-black">{title}</h3>
    </div>
    <div className="w-full">
      {children}
    </div>
  </motion.div>
);

export default function GitHubStats() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleReturn = () => {
    window.dispatchEvent(new CustomEvent('trigger-transition', { 
      detail: { name: 'Returning Home', target: 'home' } 
    }));
    const scrollTo = (location.state as any)?.fromSection || 'home';
    setTimeout(() => navigate('/', { state: { skipIntro: true, scrollTo } }), 400);
  };

  return (
    <main className="min-h-screen bg-[#0E0F14] text-white selection:bg-[#B45309] selection:text-white py-24 md:py-32 overflow-x-hidden">
      <Helmet>
        <title>GitHub Stats | Rachit Kakkad</title>
        <meta name="description" content="GitHub contribution metrics and open source activity of Rachit Kakkad." />
        <link rel="canonical" href="https://rachit-hk-portfolio.vercel.app/github-stats" />
      </Helmet>
      <SEO title="System Intelligence | GitHub Analytics" />
      
      {/* Background Decorative Grid */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-0">
        <div className="w-full h-full" style={{ 
          backgroundImage: `linear-gradient(to right, #B45309 1px, transparent 1px), 
                           linear-gradient(to bottom, #B45309 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Top Navigation */}
        <motion.button 
          onClick={handleReturn}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="group flex items-center gap-4 text-white/40 hover:text-white transition-colors mb-16"
        >
          <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:border-[#B45309] group-hover:bg-[#B45309] group-hover:text-white transition-all duration-500">
            <ArrowLeft size={20} />
          </div>
          <span className="font-mono text-xs font-black uppercase tracking-widest">Back to Hub</span>
        </motion.button>

        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 mb-24">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-3 px-4 py-2 bg-[#B45309]/10 rounded-full border border-[#B45309]/20 mb-8"
            >
              <ShieldCheck size={16} className="text-[#B45309]" />
              <span className="font-mono text-[10px] font-black text-[#B45309] uppercase tracking-widest">Repository Intelligence Sync</span>
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-8xl font-black tracking-tighter uppercase leading-[0.9]"
            >
              GitHub <br/>Analytics
            </motion.h1>
          </div>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col gap-6 md:text-right"
          >
            <div className="font-mono text-[10px] text-white/30 uppercase tracking-[0.4em] font-black leading-relaxed">
              Active Session: {GITHUB_USERNAME}<br/>
              Status: Connected // real-time sync
            </div>
            <div className="flex md:justify-end gap-4">
               <a href={`https://github.com/${GITHUB_USERNAME}`} target="_blank" rel="noopener noreferrer" className="p-4 bg-white/5 border border-white/10 rounded-full hover:bg-[#B45309] hover:text-white transition-all duration-500">
                  <Github size={20} />
               </a>
               <div className="p-4 bg-white/5 border border-white/10 rounded-full text-green-400">
                  <Zap size={20} className="animate-pulse" />
               </div>
            </div>
          </motion.div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Main GitHub Stats */}
          <StatCard title="Overall Statistics" delay={0.4}>
            <img 
              src={`https://github-readme-stats.vercel.app/api?username=${GITHUB_USERNAME}&show_icons=true&theme=transparent&title_color=B45309&text_color=ffffff&icon_color=B45309&border_color=ffffff10&hide_border=true&hide_rank=false&bg_color=1A181600`}
              alt="GitHub Stats"
              className="w-full"
            />
          </StatCard>

          {/* Top Languages */}
          <StatCard title="Tech Spectrum" delay={0.5}>
            <img 
              src={`https://github-readme-stats.vercel.app/api/top-langs/?username=${GITHUB_USERNAME}&layout=compact&theme=transparent&title_color=B45309&text_color=ffffff&icon_color=B45309&border_color=ffffff10&hide_border=true&bg_color=1A181600`}
              alt="Top Languages"
              className="w-full"
            />
          </StatCard>

          {/* Contribution Graph - Full Width */}
          <div className="md:col-span-2">
            <StatCard title="Activity Pulse" delay={0.6}>
              <img 
                src={`https://github-readme-streak-stats.herokuapp.com/?user=${GITHUB_USERNAME}&theme=transparent&hide_border=true&stroke=B45309&ring=B45309&fire=D9230F&currStreakLabel=B45309&sideNums=ffffff&sideLabels=ffffff&dates=ffffff&currStreakNum=ffffff`}
                alt="Contribution Streak"
                className="w-full"
              />
            </StatCard>
          </div>
        </div>

        {/* System Footer */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-32 pt-12 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-8 font-mono text-[10px] text-white/20 tracking-[0.2em] font-black uppercase"
        >
          <div>© 2026 Archive Statistics // RACHIT KAKKAD</div>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
               <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
               SYSTEM_ONLINE
            </div>
            <span>Encrypted Connection</span>
          </div>
        </motion.div>

      </div>
    </main>
  );
}
