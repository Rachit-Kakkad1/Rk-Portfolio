import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Youtube, Play, Eye, Clock, ThumbsUp, Monitor, Code, Database, Shield, Cpu, Video, ExternalLink, PlayCircle } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import SEO from '../components/SEO';
import gsap from 'gsap';

const categories = [
  { name: 'All', icon: Monitor },
  { name: 'AI', icon: Cpu },
  { name: 'Projects', icon: Code },
  { name: 'Security', icon: Shield },
  { name: 'Backend', icon: Database },
  { name: 'Tutorial', icon: Video },
];

const VideoCard = ({ video, index }: { video: any; index: number }) => {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;
    
    gsap.to(cardRef.current, {
      rotateX,
      rotateY,
      duration: 0.5,
      ease: "power2.out"
    });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (!cardRef.current) return;
    gsap.to(cardRef.current, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.8,
      ease: "elastic.out(1, 0.5)"
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="perspective-1000"
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        onClick={() => window.open(video.link || 'https://www.youtube.com/@RachitKakkad', '_blank')}
        className="relative group cursor-pointer bg-white/5 rounded-[2rem] border border-white/10 overflow-hidden backdrop-blur-sm transition-all duration-500 hover:border-[#B45309]/50 hover:shadow-[0_0_50px_rgba(180,83,9,0.15)]"
      >
        {/* Cinematic Thumbnail Area */}
        <div className="relative aspect-video overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />
          
          <motion.div 
            animate={{ scale: isHovered ? 1.1 : 1 }}
            transition={{ duration: 0.8, ease: "circOut" }}
            className="w-full h-full bg-[#1a1a1a] flex items-center justify-center transform-gpu"
          >
            {video.thumbnail ? (
              <img 
                src={video.thumbnail} 
                alt={video.title}
                className="w-full h-full object-cover transition-all duration-700"
                style={{ filter: isHovered ? 'none' : 'grayscale(20%)' }}
              />
            ) : (
              <Youtube size={64} className="text-white/5 opacity-20" />
            )}
          </motion.div>

          {/* Floating Play Button */}
          <motion.div
            animate={{ 
              scale: isHovered ? 1.2 : 1,
              opacity: isHovered ? 1 : 0,
              y: isHovered ? 0 : 20
            }}
            className="absolute inset-0 flex items-center justify-center z-20"
          >
            <div className="w-20 h-20 rounded-full bg-[#B45309] flex items-center justify-center shadow-[0_0_30px_rgba(180,83,9,0.5)]">
              <Play size={32} className="text-white fill-current ml-1" />
            </div>
          </motion.div>

          <div className="absolute bottom-4 right-4 z-20 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[10px] font-black tracking-widest text-white">
            {video.duration}
          </div>
          
          <div className="absolute top-4 left-4 z-20 px-3 py-1 rounded-full bg-[#B45309]/80 backdrop-blur-md text-[9px] font-black tracking-[0.2em] text-white uppercase">
            {video.category}
          </div>
        </div>

        {/* Content Area */}
        <div className="p-8 space-y-4">
          <h3 className="text-xl md:text-2xl font-black text-white leading-tight group-hover:text-[#B45309] transition-colors line-clamp-2">
            {video.title}
          </h3>
          <p className="text-sm text-white/40 font-medium line-clamp-2 leading-relaxed">
            {video.description}
          </p>
          
          <div className="flex items-center justify-between pt-4 border-t border-white/5">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2 text-white/30">
                <Eye size={14} className="text-[#B45309]/60" />
                <span className="text-[11px] font-bold tracking-widest uppercase">{video.views.toLocaleString()}</span>
              </div>
              <div className="flex items-center gap-2 text-white/30">
                <ThumbsUp size={14} className="text-[#B45309]/60" />
                <span className="text-[11px] font-bold tracking-widest uppercase">{video.likes}</span>
              </div>
            </div>
            <motion.div
              animate={{ x: isHovered ? 5 : 0 }}
              className="text-[#B45309] flex items-center gap-2"
            >
              <span className="text-[9px] font-black tracking-[0.2em] uppercase">Watch Now</span>
              <ExternalLink size={14} />
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default function YouTubeVideos() {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('All');

  const videos = [
    { 
      id: '1', 
      title: 'This AI Tracks Your Health AND Saves The Planet | LifeLens AI', 
      description: 'LifeLens AI is an experimental platform connecting personal wellness with environmental impact. Tracks sleep, mood, and carbon footprint using AI-powered insights. Tech: React, TypeScript, Recharts, Gemini API, Supabase.', 
      duration: '12:45', 
      views: 12500, 
      likes: 890, 
      category: 'AI',
      link: 'https://youtu.be/xszEvdfK6Vw?si=boyWUHdP7d8qBRYD',
      thumbnail: '/youtube/lifelens_Ai.png'
    },
    { 
      id: '2', 
      title: '🚀 Engineering a Production-Grade Developer Portfolio | Complete Breakdown', 
      description: 'Breakdown of a production-grade portfolio built with real-world engineering, system design, and high-quality UI/UX. Tech: React, Tailwind CSS, JavaScript.', 
      duration: '18:45', 
      views: 8200, 
      likes: 567, 
      category: 'Tutorial',
      link: 'https://youtu.be/6zPrQ5RO1-M?si=INJPVQyBMOCOgsL3',
      thumbnail: '/youtube/dev_portfolio.png'
    },
    { 
      id: '3', 
      title: 'XRP Ledger Project Explained 🔥 | Real-World Blockchain Build', 
      description: 'Deep dive into a production-grade XRP Ledger project focused on speed, scalability, and real-world Web3 use cases. Tech: XRPL, React, Node.js.', 
      duration: '20:15', 
      views: 15600, 
      likes: 1234, 
      category: 'Frontend',
      link: 'https://youtu.be/sCrhX9X_JIo?si=Ne4RIE-puUrw-j53',
      thumbnail: '/youtube/xrp_ledger.png'
    },
    { id: '4', title: 'LifeLens - AI Health Analytics', description: 'Building a dual-impact AI scoring system for climate and wellness.', duration: '25:10', views: 9800, likes: 723, category: 'AI', link: 'https://www.youtube.com/@RachitKakkad' },
    { id: '5', title: 'Smart Contract Development with Solidity', description: 'Mastering Ethereum smart contracts for decentralized traceability.', duration: '35:00', views: 22400, likes: 1876, category: 'Backend', link: 'https://www.youtube.com/@RachitKakkad' },
    { id: '6', title: 'React Portfolio - Cinematic Masterclass', description: 'Behind the scenes of building a 120fps hardware-accelerated portfolio.', duration: '45:00', views: 45000, likes: 3421, category: 'Tutorial', link: 'https://www.youtube.com/@RachitKakkad' },
  ];

  const filteredVideos = activeCategory === 'All' ? videos : videos.filter(v => v.category === activeCategory);

  return (
    <main className="min-h-screen bg-[#0a0a0a] selection:bg-[#B45309] selection:text-white pb-32">
      <Helmet>
        <title>YouTube Videos | Rachit Kakkad</title>
        <meta name="description" content="LeetCode explainer videos and coding content by Rachit Kakkad on YouTube." />
        <link rel="canonical" href="https://rachit-hk-portfolio.vercel.app/youtube-videos" />
      </Helmet>
      <SEO title="YouTube Videos" />
      
      {/* GOD-TIER HERO */}
      <section className="relative h-[90vh] flex flex-col items-center justify-center overflow-hidden px-6">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(180,83,9,0.1),transparent_50%)]" />
        
        {/* Floating Icons Background */}
        <div className="absolute inset-0 pointer-events-none opacity-20">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              animate={{ 
                y: [0, -20, 0],
                rotate: [0, 10, 0],
                opacity: [0.1, 0.2, 0.1]
              }}
              transition={{ duration: 5 + i, repeat: Infinity, ease: "easeInOut" }}
              className="absolute text-white/5"
              style={{
                left: `${15 * i}%`,
                top: `${10 * (i % 4)}%`
              }}
            >
              <Youtube size={120} />
            </motion.div>
          ))}
        </div>

        <div className="relative z-10 text-center max-w-4xl mx-auto space-y-8">
          <motion.h1 
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-[clamp(3rem,10vw,8rem)] font-black leading-none tracking-tighter text-white uppercase"
          >
            Watch the <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#B45309] to-[#F59E0B]">
              Mastery
            </span>
          </motion.h1>

          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-2xl text-white/40 max-w-2xl mx-auto font-medium leading-relaxed"
          >
            Technical walkthroughs, production engineering, and building high-impact AI systems.
          </motion.p>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex flex-wrap items-center justify-center gap-6 pt-8"
          >
            <a 
              href="https://www.youtube.com/@RachitKakkad" 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-12 py-5 bg-[#B45309] text-white font-black text-xs uppercase tracking-[0.3em] rounded-full hover:bg-[#92400E] transition-all hover:scale-105 shadow-[0_0_30px_rgba(180,83,9,0.3)] flex items-center gap-3"
            >
              <PlayCircle size={20} />
              Subscribe Now
            </a>
            <button
              onClick={() => {
                const el = document.getElementById('grid');
                if (el) (window as any).lenis?.scrollTo(el, { offset: -100 });
              }}
              className="px-12 py-5 bg-white/5 border border-white/10 text-white font-black text-xs uppercase tracking-[0.3em] rounded-full hover:bg-white/10 transition-all"
            >
              Browse Library
            </button>
          </motion.div>
        </div>

        <motion.div
          animate={{ y: [0, 15, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-10"
        >
          <div className="w-px h-20 bg-gradient-to-b from-[#B45309] to-transparent" />
        </motion.div>
      </section>

      {/* FILTER BAR - STICKY ELITE */}
      <section className="sticky top-20 z-50 py-8 px-6 md:px-12">
        <div className="max-w-screen-2xl mx-auto">
          <div className="flex flex-wrap items-center justify-center gap-3 p-2 rounded-[2rem] bg-white/5 border border-white/10 backdrop-blur-2xl">
            {categories.map((cat) => (
              <button
                key={cat.name}
                onClick={() => setActiveCategory(cat.name)}
                className={`flex items-center gap-3 px-8 py-3 rounded-full text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-500 ${
                  activeCategory === cat.name
                    ? 'bg-white text-black shadow-xl scale-105'
                    : 'text-white/40 hover:text-white hover:bg-white/5'
                }`}
              >
                <cat.icon size={14} />
                {cat.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* VIDEO GRID - GOD LEVEL SPACING */}
      <section id="grid" className="max-w-screen-2xl mx-auto px-6 md:px-12 mt-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 md:gap-20">
          <AnimatePresence mode="popLayout">
            {filteredVideos.map((video, idx) => (
              <VideoCard key={video.id} video={video} index={idx} />
            ))}
          </AnimatePresence>
        </div>
      </section>

      {/* FOOTER CALL TO ACTION */}
      <section className="mt-40 px-6 md:px-12">
        <div className="max-w-screen-xl mx-auto p-20 rounded-[4rem] bg-gradient-to-br from-[#B45309]/20 to-transparent border border-[#B45309]/20 text-center space-y-12 backdrop-blur-3xl">
          <h2 className="text-4xl md:text-7xl font-black text-white tracking-tighter uppercase leading-none">
            Join the <br /> 
            <span className="text-[#B45309]">Engineering</span> <br /> 
            Journey
          </h2>
          <p className="text-xl text-white/40 font-medium max-w-xl mx-auto">
            Get exclusive access to project source code and early looks at new AI systems.
          </p>
          <div className="flex justify-center">
            <button 
              onClick={() => navigate('/')}
              className="px-16 py-6 bg-white text-black font-black text-xs uppercase tracking-[0.4em] rounded-full hover:scale-105 transition-all shadow-2xl"
            >
              Return to Matrix
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
