import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, ExternalLink } from 'lucide-react';

const CERTIFICATES = [
  // Hackathon Certificates
    {
      id: 'hackathon-electrosphere',
      year: '2026',
      title: 'ElectroSphere 2K26 — 2nd Place Winner',
      description: 'Awarded 2nd Place for ThreatLens, an ethical cybersecurity analysis platform using deterministic static analysis.',
      issuer: 'Swaminarayan University, Kalol',
      credentialId: 'ES-2026-WINNER',
      link: '/certificates/hackathons/ElectroSphere_2K26.jpg',
      skills: ['Cybersecurity', 'Static Analysis', 'React', 'Node.js'],
      category: 'hackathons'
    },
    {
      id: 'hackathon-national-id',
      year: '2026',
      title: 'National Digital Identity & Innovation Hackathon',
      description: 'Secured Rank 4 in Round 3 as Team Leader of a 5-member team (API Assassins), demonstrating outstanding technical excellence, strategic problem-solving, and innovation in large-scale digital identity systems.',
      issuer: 'Digital Innovation & Citizen Services Consortium (DICSC)',
      credentialId: 'NDI-2026-HACK',
      link: '/certificates/hackathons/National_Digital_Identity_&_Innovation_Hackathon_2025.png',
      skills: ['System Design', 'Digital Identity', 'Leadership', 'Scalable Architecture'],
      category: 'hackathons'
    },
    {
      id: 'hackathon-odoo-gv',
      year: '2026',
      title: "Odoo X Gujarat Vidyapith Hackathon '26",
      description: 'Developed a full-stack Product Lifecycle Management (PLM) system with dual-database failover.',
      issuer: 'Odoo',
      credentialId: 'ODOO-GV-2026',
      link: '/certificates/hackathons/Odoo_X_Gujarat_Vidyapith_Hackathon_26.png',
      skills: ['Node.js', 'PostgreSQL', 'SLA Tracking'],
      category: 'hackathons'
    },
    {
      id: 'hackathon-convolve',
      year: '2025',
      title: 'Convolve-4.0 ( IIT GUWAHATI )',
      description: 'ML/AI focused hackathon solving complex predictive modeling challenges.',
      issuer: 'IIT Guwahati',
      credentialId: 'IITG-CONVOLVE-2025',
      link: '/certificates/hackathons/Convolve-4.0 ( IIT GUWAHATI ).jpg',
      skills: ['Machine Learning', 'Data Science'],
      category: 'hackathons'
    },
    {
      id: 'hackathon-mosip',
      year: '2025',
      title: 'MOSIP ( IIT MADRAS )',
      description: 'Developed innovative solutions for digital identity systems in global populations.',
      issuer: 'IIT Madras',
      credentialId: 'IITM-MOSIP-2025',
      link: '/certificates/hackathons/MOSIP ( IIT MADRAS ).jpg',
      skills: ['Digital ID', 'Security'],
      category: 'hackathons'
    },
    {
      id: 'hackathon-appian',
      year: '2025',
      title: 'Appian ( IIT MADRAS )',
      description: 'Competition focused on low-code automation and enterprise process management.',
      issuer: 'IIT Madras',
      credentialId: 'IITM-APPIAN-2025',
      link: '/certificates/hackathons/Appian ( IIT MADRAS ).jpg',
      skills: ['Automation', 'BPM'],
      category: 'hackathons'
    },
    {
      id: 'hackathon-openpools',
      year: '2025',
      title: 'Openpools ( 30 hrs )',
      description: '30-hour intensive building phase for decentralized finance protocols.',
      issuer: 'Openpools',
      credentialId: 'OP-HACK-2025',
      link: '/certificates/hackathons/Openpools ( 30 hrs ).jpg',
      skills: ['DeFi', 'Web3'],
      category: 'hackathons'
    },
    {
      id: 'hackathon-changethon',
      year: '2025',
      title: 'Changethon ( IIT ROORKEE )',
      description: 'Social impact innovation challenge tackling real-world sustainability issues.',
      issuer: 'IIT Roorkee',
      credentialId: 'IITR-CHANGE-2025',
      link: '/certificates/hackathons/Changethon ( IIT ROORKEE ).jpg',
      skills: ['Social Impact', 'Innovation'],
      category: 'hackathons'
    },
    {
      id: 'hackathon-codesummit',
      year: '2025',
      title: 'CodeSummit Competitive Coding',
      description: 'ACM organized competitive coding event focusing on algorithmic efficiency.',
      issuer: 'ACM',
      credentialId: 'ACM-CS-2025',
      link: '/certificates/hackathons/CodeSummit_Competitive_Coding_Event_ACM.jpg',
      skills: ['Algorithms', 'Data Structures'],
      category: 'hackathons'
    },
    {
      id: 'hackathon-devheat',
      year: '2025',
      title: 'DEV HEAT',
      description: 'Intensive development sprint focused on rapid feature deployment.',
      issuer: 'Dev Heat Organization',
      credentialId: 'DH-PARTIC-25',
      link: '/certificates/hackathons/DEV_HEAT_PARTICIPATION.jpg',
      skills: ['Full Stack', 'Agile'],
      category: 'hackathons'
    },
    {
      id: 'hackathon-corporate-quiz',
      year: '2025',
      title: 'Corporate Quiz ( IIT MADRAS )',
      description: 'Strategy and business operations centered quiz competition.',
      issuer: 'IIT Madras',
      credentialId: 'IITM-CORP-2025',
      link: '/certificates/hackathons/Corporate Quiz ( IIT MADRAS ).jpg',
      skills: ['Strategy', 'Operations'],
      category: 'hackathons'
    },
    {
      id: 'hackathon-tata',
      year: '2025',
      title: 'Crucible Campus Quiz ( TATA )',
      description: 'Prestigious national business quiz by the Tata Group.',
      issuer: 'TATA',
      credentialId: 'TATA-CRUCIBLE-25',
      link: '/certificates/hackathons/Crucible Campus Quiz ( TATA ).jpg',
      skills: ['Business Intelligence', 'Logic'],
      category: 'hackathons'
    },
  // Skill Certificates
  {
    id: 'skill-gemini',
    year: '2026',
    title: 'Google Gemini AI Specialization',
    description: 'Mastering Large Language Models and Generative AI applications using Google Gemini.',
    issuer: 'Google',
    credentialId: 'G-GEMINI-2026',
    link: '/certificates/skills/gemini.png',
    skills: ['Gen AI', 'LLMs'],
    category: 'skills'
  },
  {
    id: 'skill-github',
    year: '2025',
    title: 'Version Control with Git & GitHub',
    description: 'Advanced workflow management, branching strategies, and collaboration via Git.',
    issuer: 'Meta',
    credentialId: 'META-GIT-2025',
    link: '/certificates/skills/git-github.png',
    skills: ['Git', 'Version Control'],
    category: 'skills'
  },
  {
    id: 'skill-google-ml',
    year: '2025',
    title: 'Machine Learning Foundations',
    description: 'Core concepts of supervised and unsupervised learning models.',
    issuer: 'Google',
    credentialId: 'G-ML-FOUND-25',
    link: '/certificates/skills/google-ml.png',
    skills: ['Machine Learning', 'AI'],
    category: 'skills'
  },
  {
    id: 'skill-google-js',
    year: '2025',
    title: 'Programming with JavaScript',
    description: 'Building dynamic web applications with modern JavaScript ES6+ standards.',
    issuer: 'Google',
    credentialId: 'G-JS-PROG-25',
    link: '/certificates/skills/google-programming.png',
    skills: ['JavaScript', 'Frontend'],
    category: 'skills'
  },
  {
    id: 'skill-google-python',
    year: '2025',
    title: 'Crash Course on Python',
    description: 'In-depth exploration of Python syntax, data structures, and automation.',
    issuer: 'Google',
    credentialId: 'G-PYTHON-CRASH-25',
    link: '/certificates/skills/google-python.png',
    skills: ['Python', 'Automation'],
    category: 'skills'
  },
  {
    id: 'skill-outskill-genai',
    year: '2026',
    title: 'Generative AI Mastery',
    description: 'Developing applications with vector databases and prompt engineering.',
    issuer: 'Outskill',
    credentialId: 'OUT-GENAI-2026',
    link: '/certificates/skills/outskill-genai.png',
    skills: ['Generative AI', 'Vector DB'],
    category: 'skills'
  },
  {
    id: 'skill-mongodb',
    year: '2025',
    title: 'MongoDB Database Essentials',
    description: 'NoSQL database design, indexing, and complex aggregation pipelines.',
    issuer: 'WsCube Tech',
    credentialId: 'WS-MONGO-25',
    link: '/certificates/skills/wscube-mongodb.jpg',
    skills: ['MongoDB', 'NoSQL'],
    category: 'skills'
  }
];

function NewsCard({ cert, index, onClick }: { cert: typeof CERTIFICATES[0]; index: number; onClick: () => void }) {
  // Every certificate is verified now as per request
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay: Math.min(index * 0.04, 0.3) }}
      onClick={onClick}
      className="group relative cursor-pointer bg-[#fcfaf0] p-4 border border-[#e0ddcf] shadow-[2px_2px_0px_rgba(0,0,0,0.05)] hover:shadow-[8px_8px_0px_rgba(0,0,0,0.1)] transition-all duration-300 flex flex-col aspect-[4/5] overflow-hidden"
    >
      {/* Newspaper Grain Texture Overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-multiply bg-[url('data:image/svg+xml,%3Csvg_viewBox=%220_0_200_200%22_xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter_id=%22n%22%3E%3CfeTurbulence_type=%22fractalNoise%22_baseFrequency=%220.65%22_numOctaves=%223%22_stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect_width=%22100%25%22_height=%22100%25%22_filter=%22url(%23n)%22/%3E%3C/svg%3E')]" />

      {/* Header Info (Classified Style) */}
      <div className="flex justify-between items-center mb-3 border-b border-[#e0ddcf] pb-2">
        <span className="text-[9px] font-black uppercase tracking-widest text-black/40 font-serif italic">Vol. {cert.year}</span>
        <span className="text-[9px] font-black uppercase tracking-widest text-[#B45309] font-serif">Verified Ledger</span>
      </div>

      {/* Image Container (Halftone Effect) */}
      <div className="relative w-full aspect-video mb-4 overflow-hidden bg-white border border-[#e0ddcf] p-2 grayscale group-hover:grayscale-0 transition-all duration-700">
        <img
          src={cert.link}
          alt={cert.title}
          className="w-full h-full object-contain filter contrast-[1.1] brightness-[0.95]"
        />
        {/* Halftone Dot Overlay */}
        <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(circle,black_1px,transparent_1px)] bg-[size:3px_3px]" />
      </div>

      {/* Card Content */}
      <div className="flex flex-col flex-1">
        <div className="text-[8px] font-black uppercase tracking-tighter text-[#B45309] mb-1 font-serif italic">
          {cert.issuer}
        </div>
        <h3 className="text-lg font-black leading-[1.1] text-black tracking-tighter mb-2 group-hover:text-[#B45309] transition-colors duration-300 font-serif overflow-hidden line-clamp-2">
          {cert.title}
        </h3>
        <p className="text-[11px] leading-relaxed text-black/60 line-clamp-2 italic font-serif opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          "{cert.description}"
        </p>
      </div>

      {/* Red Stamp (All Certificates) */}
      <div className="absolute top-[60%] right-[-10%] rotate-[-15deg] pointer-events-none opacity-20 group-hover:opacity-60 transition-opacity duration-500">
        <div className="border-[3px] border-red-600 px-3 py-0.5 text-red-600 font-serif font-black text-lg uppercase tracking-widest rounded shadow-sm">
          VERIFIED
        </div>
      </div>

      {/* Footer Column (News Sidebar) */}
      <div className="mt-auto pt-3 border-t border-double border-[#e0ddcf] flex justify-between items-center">
        <div className="flex gap-2">
          {cert.skills.slice(0, 2).map(skill => (
            <span key={skill} className="text-[8px] font-bold text-black/30 uppercase tracking-[0.1em]">{skill}</span>
          ))}
        </div>
        <ArrowUpRight size={12} className="text-black/20 group-hover:text-black transition-colors" />
      </div>
    </motion.div>
  );
}

export default function CertificateSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedCert, setSelectedCert] = useState<any | null>(null);

  const hackathons = CERTIFICATES.filter(c => c.category === 'hackathons').slice(0, 6);
  const skills = CERTIFICATES.filter(c => c.category === 'skills').slice(0, 6);

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-screen bg-[#F6F3EE] text-[#1C1C1C] py-24"
    >
      <div className="w-full h-full flex flex-col">
        {/* Newspaper Headroom Masthead */}
        <div className="relative z-30 max-w-7xl mx-auto px-6 w-full mb-12 border-b-4 border-black pb-8">
          {/* Ticker Tape (Breaking News) */}
          <div className="w-full bg-black text-[#fcfaf0] py-2 mb-8 overflow-hidden whitespace-nowrap border-y border-black uppercase font-mono text-[9px] font-bold flex">
            <motion.div
              animate={{ x: [0, -1000] }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              className="flex gap-20 shrink-0"
            >
              {[...Array(10)].map((_, i) => (
                <span key={i}>
                  Breaking News: Rachit Kakkad secures 2nd Place in ElectroSphere 2K26 • Tech Chronicle: AI Specialization Completed • Official: Rank 4 in National Digital Identity Hackathon • 
                </span>
              ))}
            </motion.div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-end gap-6">
            <div className="flex-1 w-full">
              <div className="flex items-center gap-4 mb-4 font-serif italic text-[10px] text-[#B45309] font-black tracking-[0.3em] uppercase">
                <span>The Global Archives</span>
                <span className="w-12 h-[1px] bg-[#B45309]/30"></span>
                <span>Issue No. 04</span>
                <span className="w-12 h-[1px] bg-[#B45309]/30"></span>
                <span>Price: Professional Excellence</span>
              </div>
              <h2 className="text-[clamp(32px,12vw,140px)] font-black tracking-[-0.06em] leading-[0.8] text-black uppercase select-none font-serif">
                THE LEDGER <span className="text-[#B45309]">POST</span>
              </h2>
            </div>
            <div className="max-w-xs border-l-[3px] border-black pl-6 hidden lg:block">
              <div className="mb-2 font-serif font-black text-xs uppercase italic tracking-tighter">Editorial Note:</div>
              <p className="font-serif italic text-[11px] leading-relaxed text-black/60">
                A definitive collection of competitive victories and technical proficiencies, curated for the modern technological landscape. Verified for authenticity via blockchain ledger.
              </p>
            </div>
          </div>
        </div>

        {/* Section 1: Hackathons */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 md:px-6 mb-24">
          <div className="flex items-center gap-4 mb-10 overflow-hidden border-y-[1px] border-black/10 py-3">
            <span className="font-serif font-black text-xs uppercase bg-black text-white px-2 py-0.5 shrink-0">FRONT PAGE</span>
            <h3 className="text-3xl md:text-5xl font-black font-serif italic text-black tracking-tighter">
              Competitive <span className="text-[#B45309]">Excellence</span>
            </h3>
            <div className="flex-1 h-[2px] bg-black/10 border-y-[1px] border-black/5"></div>
            <span className="font-serif italic text-[10px] text-black/40 hidden md:block uppercase font-bold tracking-widest shrink-0">Section A — Hackathons</span>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-12">
            {hackathons.map((cert, index) => (
              <NewsCard
                key={cert.id}
                cert={cert}
                index={index}
                onClick={() => setSelectedCert(cert)}
              />
            ))}
          </div>
        </div>

        {/* Section 2: Skills */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 md:px-6">
          <div className="flex items-center gap-4 mb-10 overflow-hidden border-y-[1px] border-black/10 py-3">
            <span className="font-serif font-black text-xs uppercase bg-black text-white px-2 py-0.5 shrink-0">FEATURES</span>
            <h3 className="text-3xl md:text-5xl font-black font-serif italic text-black tracking-tighter">
              Technical <span className="text-[#B45309]">Proficiencies</span>
            </h3>
            <div className="flex-1 h-[2px] bg-black/10 border-y-[1px] border-black/5"></div>
            <span className="font-serif italic text-[10px] text-black/40 hidden md:block uppercase font-bold tracking-widest shrink-0">Section B — Core Skills</span>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-12 mb-16">
            {skills.map((cert, index) => (
              <NewsCard
                key={cert.id}
                cert={cert}
                index={index + hackathons.length}
                onClick={() => setSelectedCert(cert)}
              />
            ))}
          </div>

          <div className="flex justify-center mt-12 mb-12">
            <a 
              href="/all-certificates" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="group flex items-center gap-3 px-8 py-4 bg-[#B45309] text-white font-serif uppercase text-xs tracking-[0.2em] font-black hover:bg-black transition-colors duration-500 shadow-xl"
            >
              View All Certificates 
              <ArrowUpRight size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
            </a>
          </div>
        </div>

        {/* Classifieds / Footer Info */}
        <div className="max-w-7xl mx-auto px-6 w-full mt-24 border-t-2 border-black pt-8 grid grid-cols-1 md:grid-cols-3 gap-8">
           <div className="border-r border-black/10 pr-6">
              <h4 className="font-serif font-black text-[10px] uppercase tracking-widest mb-4 text-[#B45309]">The Classifieds</h4>
              <p className="text-[10px] font-serif leading-loose text-black/50">
                WANTED: Scalable engineering challenges. <br/>
                OFFERED: Production-grade AI systems, blockchain protocols, and cinematic web experiences. <br/>
                CONTACT: Rachit Kakkad via LinkedIn.
              </p>
           </div>
           <div className="border-r border-black/10 pr-6">
              <h4 className="font-serif font-black text-[10px] uppercase tracking-widest mb-4 text-[#B45309]">Weather Report</h4>
              <p className="text-[10px] font-serif leading-loose text-black/50 italic">
                A warm front of innovation is moving across the development stack. High probability of rapid deployment and pixel-perfection in the coming days.
              </p>
           </div>
           <div className="pl-0 md:pl-6 text-right">
              <h4 className="font-serif font-black text-[10px] uppercase tracking-widest mb-4">Stock Market</h4>
              <div className="text-[10px] font-serif font-black flex flex-col gap-1 items-end uppercase text-black/40">
                 <span>REACT (RKT) ▲ 9.3%</span>
                 <span>BLOCKCHAIN (BLC) ▲ 12.1%</span>
                 <span>AI/ML (GEN) ▲ 15.4%</span>
              </div>
           </div>
        </div>



        {/* Global Verification Badge - Moved outside sticky for better breathing room */}
        <div className="flex justify-center pb-12 relative z-50 mt-auto">
          <motion.div
            className="px-6 py-3 border border-black/10 rounded-full flex items-center gap-3 bg-white/80 backdrop-blur-md shadow-xl"
            animate={{
              borderColor: ["rgba(0,0,0,0.1)", "rgba(180,83,9,0.3)", "rgba(0,0,0,0.1)"]
            }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-[10px] font-bold tracking-[0.2em] uppercase opacity-60">Verified Credentials Online</span>
          </motion.div>
        </div>

      </div>

      {/* Fullscreen Certificate Preview Modal */}
      <AnimatePresence>
        {selectedCert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[500] flex items-center justify-center p-6 md:p-12 bg-[#1C1C1CB3] cursor-zoom-out"
            onClick={() => setSelectedCert(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="relative max-w-5xl w-full h-full flex flex-col items-center justify-center gap-8 cursor-default"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative w-full h-[70vh] md:h-[80vh] rounded-2xl overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.5)] border border-white/10 group">
                <img
                  src={selectedCert.link}
                  alt={selectedCert.title}
                  className="w-full h-full object-contain bg-black/40"
                />

                {/* Modal Close Hint */}
                <button
                  onClick={() => setSelectedCert(null)}
                  className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/20 flex items-center justify-center text-white hover:bg-white hover:text-black transition-[background,color] duration-300 border border-white/20"
                >
                  <ExternalLink size={20} className="rotate-45" />
                </button>
              </div>

              <div className="text-center text-white max-w-2xl px-4">
                <h4 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">{selectedCert.title}</h4>
                <p className="text-white/60 text-lg mb-6">{selectedCert.issuer} — {selectedCert.year}</p>
                <div className="flex flex-wrap gap-2 justify-center">
                  {selectedCert.skills.map((skill: string) => (
                    <span key={skill} className="px-4 py-1.5 bg-white/5 border border-white/10 rounded-full text-xs font-bold uppercase tracking-widest">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
