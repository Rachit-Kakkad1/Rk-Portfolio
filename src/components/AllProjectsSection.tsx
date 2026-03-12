import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, X } from 'lucide-react';

const ARCHIVE_PROJECTS = [
  {
    id: "lifelens",
    title: "LifeLens AI",
    category: "AI-Powered Personal & Planetary Health Intelligence Platform",
    year: "2026",
    role: "Full Stack Developer",
    stack: "React · TypeScript · TailwindCSS · Recharts · Supabase · Gemini AI",
    challenge: "Health tracking and climate action are typically treated as separate systems. Fitness apps focus only on personal health metrics, while sustainability tools focus only on carbon emissions.",
    solution: "LifeLens introduces a dual-impact analytics system that evaluates both internal wellness signals and external environmental footprint using Gemini AI.",
    description: "LifeLens is an intelligent behavioral analytics platform that connects personal wellness data with environmental impact insights. By combining lifestyle tracking with AI-powered analysis, the platform helps users understand how their daily habits influence both personal health and climate footprint.",
    results: [
      { value: 2, suffix: "x", label: "Dual Impact Score" },
      { value: 100, suffix: "%", label: "Real-Time Sync" },
      { value: 95, suffix: "%", label: "User Retention" }
    ],
    features: [
      { title: "AI Behavioral Engine", description: "Dual health and climate scoring system that identifies correlations in lifestyle choices." },
      { title: "Personalized Insights", description: "AI-generated actionable insights to improve both well-being and reduce carbon emissions." }
    ],
    image: "/lifelens.jpg",
    github: '#',
    live: '#',
    gallery: ["https://images.unsplash.com/photo-1633412802994-5c058f151b66?q=80&w=2000&auto=format&fit=crop"]
  },
  {
    id: "agricert",
    title: "AgriCert",
    category: "Blockchain Platform",
    year: "2023",
    role: "Full Stack Developer",
    stack: "React · Node · MongoDB · Blockchain",
    challenge: "The agricultural supply chain suffers from a lack of transparency, leading to counterfeit certifications.",
    solution: "We developed a decentralized application (dApp) that tokenizes crop certifications as NFTs on a low-cost blockchain.",
    description: "AgriCert revolutionizes the agricultural supply chain by providing a transparent, immutable ledger for crop certification. By leveraging blockchain technology and AI-driven image analysis, it ensures authenticity from farm to table.",
    results: [
      { value: 100, suffix: "%", label: "Traceability" },
      { value: 40, suffix: "%", label: "Faster Certification" },
      { value: 15, suffix: "k+", label: "Farmers Onboarded" }
    ],
    features: [
      { title: "Immutable Ledger", description: "All certifications are permanently stored on the blockchain." },
      { title: "AI Verification", description: "Computer vision models verify crop health from uploaded images." },
      { title: "Smart Contracts", description: "Automated payouts when certification criteria are met." }
    ],
    image: "/agricert-main.jpg",
    github: 'https://github.com/rachitkakkad/agricert',
    live: 'https://agricert-khaki.vercel.app',
    gallery: [
      "/agricert-1.png",
      "/agricert-2.png",
      "/agricert-3.png",
      "/agricert-4.png"
    ]
  },
  {
    id: "fleetflow",
    title: "FleetFlow",
    category: "Real-Time Logistics & Fleet Intelligence Platform",
    year: "2026",
    role: "Full Stack Developer",
    stack: "React · Node.js · Express · PostgreSQL · Prisma · Socket.IO",
    challenge: "Logistics operations are fragmented across disconnected systems, resulting in delayed operational insights and inefficient dispatch coordination.",
    solution: "A centralized logistics intelligence platform powered by real-time data synchronization and role-governed workflows.",
    description: "FleetFlow is a modern logistics command platform designed to manage fleet operations, dispatch coordination, driver workflows, and operational analytics in real time.",
    results: [
      { value: 100, suffix: "%", label: "Real-Time Sync" },
      { value: 4, suffix: "", label: "Role Portals" },
      { value: 99, suffix: "%", label: "Anomaly Detection" }
    ],
    features: [
      { title: "Real-Time Sync", description: "Live operational updates via WebSockets for instantaneous fleet visibility." },
      { title: "AI Anomaly Detection", description: "Predictive monitoring flags fuel consumption irregularities for audit." }
    ],
    image: "/fleetflow.jpg",
    github: '#',
    live: '#',
    gallery: ["https://images.unsplash.com/photo-1551076805-e18690c5e561?q=80&w=2000&auto=format&fit=crop"]
  },
  {
    id: "threatlens",
    title: "ThreatLens",
    category: "Ethical Static Cybersecurity Analysis & Threat Modeling Platform",
    year: "2026",
    role: "Security Engineer",
    stack: "Python · FastAPI · React · AST Parsers · Docker",
    challenge: "Cybersecurity education lacks safe environments for analyzing vulnerabilities without risking active exploitation.",
    solution: "Built a static analysis engine utilizing AST parsing and ethical threat modeling algorithms to identify risks safely.",
    description: "An advanced cybersecurity education and research platform designed to perform ethical static code analysis and deterministic threat modeling.",
    results: [
      { value: 100, suffix: "%", label: "Zero Exploitation" },
      { value: 5, suffix: "", label: "Analysis Modules" },
      { value: 500, suffix: "+", label: "Threat Patterns" }
    ],
    features: [
      { title: "Deterministic Analysis", description: "Safe, static code evaluation without active execution risks." },
      { title: "Transparent Risk Scoring", description: "Clear, actionable metrics for prioritizing security patches." }
    ],
    image: "/threatlens.jpg",
    github: '#',
    live: '#',
    gallery: ["https://images.unsplash.com/photo-1642104704074-907c0698cbd9?q=80&w=2000&auto=format&fit=crop"]
  }
];

export default function AllProjectsSection({ onClose, onProjectClick }: { onClose: () => void, onProjectClick: (project: any) => void }) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Lock body scroll when overlay is active
  React.useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0, y: "100%" }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: "100%" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-0 z-[200] bg-[#F6F3EE] text-[#1C1C1C] overflow-y-auto"
      data-lenis-prevent="true"
    >
      <section 
        className="relative w-full min-h-screen py-32 md:py-48"
        onMouseLeave={() => setHoveredIndex(null)}
      >
        <button 
          onClick={onClose}
          className="fixed top-8 right-8 z-[210] w-14 h-14 rounded-full bg-black/5 backdrop-blur-md border border-black/10 text-black flex items-center justify-center hover:bg-black hover:text-white transition-colors duration-300"
        >
          <X size={24} />
        </button>

        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 md:mb-32 gap-8">
            <h2 className="text-5xl md:text-8xl font-medium tracking-tight">
              Project<br/>Archive
            </h2>
            <p className="text-neutral-600 max-w-sm text-lg">
              A comprehensive list of my selected works, experiments, and open-source contributions over the years.
            </p>
          </div>

          <div className="flex flex-col border-t border-black/15">
            {ARCHIVE_PROJECTS.map((project, index) => (
              <motion.div
                key={index}
                className="group relative flex flex-col md:flex-row md:items-center py-12 md:py-20 border-b border-black/15 cursor-pointer"
                onMouseEnter={() => setHoveredIndex(index)}
                onClick={() => onProjectClick(project)}
                initial="initial"
                whileHover="hover"
              >
                {/* Number Section */}
                <div className="flex-shrink-0 w-16 md:w-24">
                  <span className="text-neutral-400 font-mono text-sm tracking-widest transition-colors duration-300 group-hover:text-[#B45309]">
                    0{index + 1}
                  </span>
                </div>
                
                {/* Title & Category Section */}
                <div className="flex-grow flex flex-col md:flex-row md:items-center gap-4 md:gap-12 relative z-20">
                  <motion.h3 
                    className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight text-black/60 group-hover:text-black transition-colors duration-300 whitespace-nowrap"
                    variants={{
                      initial: { x: 0 },
                      hover: { x: 20 }
                    }}
                    transition={{ type: "spring", stiffness: 150, damping: 20 }}
                  >
                    {project.title}
                  </motion.h3>
                  
                  <motion.span 
                    className="text-neutral-400 text-sm md:text-base lg:text-lg max-w-sm md:max-w-md transition-colors duration-300 group-hover:text-neutral-600 leading-relaxed"
                  >
                    {project.category}
                  </motion.span>
                </div>

                {/* Fixed Hover Image - Floating on Top */}
                <AnimatePresence>
                  {hoveredIndex === index && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8, x: -40, rotate: -4 }}
                      animate={{ opacity: 1, scale: 1, x: 20, rotate: 3 }}
                      exit={{ opacity: 0, scale: 0.9, x: 0, rotate: 0 }}
                      transition={{ type: "spring", stiffness: 200, damping: 25 }}
                      className="fixed left-[50%] md:left-[60%] top-1/2 -translate-y-1/2 w-[380px] h-[240px] rounded-2xl overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] z-[300] hidden lg:block pointer-events-none border border-white/20"
                    >
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/5" />
                    </motion.div>
                  )}
                </AnimatePresence>
                
                {/* Year & Action Section */}
                <div className="flex-shrink-0 flex items-center gap-12 mt-8 md:mt-0 z-20">
                  <span className="text-neutral-500 font-mono text-sm hidden md:block group-hover:text-[#B45309] transition-colors duration-300">
                    {project.year}
                  </span>
                  <div className="w-14 h-14 rounded-full border border-black/10 flex items-center justify-center group-hover:bg-black group-hover:text-white transition-all duration-300 shadow-sm">
                    <ArrowUpRight className="w-6 h-6" />
                  </div>
                </div>
                
                {/* Row Hover Background */}
                <div className="absolute inset-0 bg-black/[0.01] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              </motion.div>
            ))}
          </div>
        </div>


      </section>
    </motion.div>
  );
}
