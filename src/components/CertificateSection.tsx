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
      year: '2025',
      title: 'National Digital Identity & Innovation Hackathon',
      description: 'Secured Rank 4 in Round 3 as Team Leader of a 5-member team (API Assassins), demonstrating outstanding technical excellence, strategic problem-solving, and innovation in large-scale digital identity systems.',
      issuer: 'Digital Innovation & Citizen Services Consortium (DICSC)',
      credentialId: 'NDI-2025-HACK',
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
      year: '2024',
      title: 'Convolve-4.0 ( IIT GUWAHATI )',
      description: 'ML/AI focused hackathon solving complex predictive modeling challenges.',
      issuer: 'IIT Guwahati',
      credentialId: 'IITG-CONVOLVE-2024',
      link: '/certificates/hackathons/Convolve-4.0 ( IIT GUWAHATI ).jpg',
      skills: ['Machine Learning', 'Data Science'],
      category: 'hackathons'
    },
    {
      id: 'hackathon-mosip',
      year: '2024',
      title: 'MOSIP ( IIT MADRAS )',
      description: 'Developed innovative solutions for digital identity systems in global populations.',
      issuer: 'IIT Madras',
      credentialId: 'IITM-MOSIP-2024',
      link: '/certificates/hackathons/MOSIP ( IIT MADRAS ).jpg',
      skills: ['Digital ID', 'Security'],
      category: 'hackathons'
    },
    {
      id: 'hackathon-appian',
      year: '2024',
      title: 'Appian ( IIT MADRAS )',
      description: 'Competition focused on low-code automation and enterprise process management.',
      issuer: 'IIT Madras',
      credentialId: 'IITM-APPIAN-2024',
      link: '/certificates/hackathons/Appian ( IIT MADRAS ).jpg',
      skills: ['Automation', 'BPM'],
      category: 'hackathons'
    },
    {
      id: 'hackathon-openpools',
      year: '2024',
      title: 'Openpools ( 30 hrs )',
      description: '30-hour intensive building phase for decentralized finance protocols.',
      issuer: 'Openpools',
      credentialId: 'OP-HACK-2024',
      link: '/certificates/hackathons/Openpools ( 30 hrs ).jpg',
      skills: ['DeFi', 'Web3'],
      category: 'hackathons'
    },
    {
      id: 'hackathon-changethon',
      year: '2024',
      title: 'Changethon ( IIT ROORKEE )',
      description: 'Social impact innovation challenge tackling real-world sustainability issues.',
      issuer: 'IIT Roorkee',
      credentialId: 'IITR-CHANGE-2024',
      link: '/certificates/hackathons/Changethon ( IIT ROORKEE ).jpg',
      skills: ['Social Impact', 'Innovation'],
      category: 'hackathons'
    },
    {
      id: 'hackathon-codesummit',
      year: '2023',
      title: 'CodeSummit Competitive Coding',
      description: 'ACM organized competitive coding event focusing on algorithmic efficiency.',
      issuer: 'ACM',
      credentialId: 'ACM-CS-2023',
      link: '/certificates/hackathons/CodeSummit_Competitive_Coding_Event_ACM.jpg',
      skills: ['Algorithms', 'Data Structures'],
      category: 'hackathons'
    },
    {
      id: 'hackathon-devheat',
      year: '2023',
      title: 'DEV HEAT',
      description: 'Intensive development sprint focused on rapid feature deployment.',
      issuer: 'Dev Heat Organization',
      credentialId: 'DH-PARTIC-23',
      link: '/certificates/hackathons/DEV_HEAT_PARTICIPATION.jpg',
      skills: ['Full Stack', 'Agile'],
      category: 'hackathons'
    },
    {
      id: 'hackathon-corporate-quiz',
      year: '2024',
      title: 'Corporate Quiz ( IIT MADRAS )',
      description: 'Strategy and business operations centered quiz competition.',
      issuer: 'IIT Madras',
      credentialId: 'IITM-CORP-2024',
      link: '/certificates/hackathons/Corporate Quiz ( IIT MADRAS ).jpg',
      skills: ['Strategy', 'Operations'],
      category: 'hackathons'
    },
    {
      id: 'hackathon-tata',
      year: '2024',
      title: 'Crucible Campus Quiz ( TATA )',
      description: 'Prestigious national business quiz by the Tata Group.',
      issuer: 'TATA',
      credentialId: 'TATA-CRUCIBLE-24',
      link: '/certificates/hackathons/Crucible Campus Quiz ( TATA ).jpg',
      skills: ['Business Intelligence', 'Logic'],
      category: 'hackathons'
    },
  // Skill Certificates
  {
    id: 'skill-gemini',
    year: '2024',
    title: 'Google Gemini AI Specialization',
    description: 'Mastering Large Language Models and Generative AI applications using Google Gemini.',
    issuer: 'Google',
    credentialId: 'G-GEMINI-2024',
    link: '/certificates/skills/gemini.png',
    skills: ['Gen AI', 'LLMs'],
    category: 'skills'
  },
  {
    id: 'skill-github',
    year: '2023',
    title: 'Version Control with Git & GitHub',
    description: 'Advanced workflow management, branching strategies, and collaboration via Git.',
    issuer: 'Meta',
    credentialId: 'META-GIT-9912',
    link: '/certificates/skills/git-github.png',
    skills: ['Git', 'Version Control'],
    category: 'skills'
  },
  {
    id: 'skill-google-ml',
    year: '2023',
    title: 'Machine Learning Foundations',
    description: 'Core concepts of supervised and unsupervised learning models.',
    issuer: 'Google',
    credentialId: 'G-ML-FOUND-23',
    link: '/certificates/skills/google-ml.png',
    skills: ['Machine Learning', 'AI'],
    category: 'skills'
  },
  {
    id: 'skill-google-js',
    year: '2023',
    title: 'Programming with JavaScript',
    description: 'Building dynamic web applications with modern JavaScript ES6+ standards.',
    issuer: 'Google',
    credentialId: 'G-JS-PROG-23',
    link: '/certificates/skills/google-programming.png',
    skills: ['JavaScript', 'Frontend'],
    category: 'skills'
  },
  {
    id: 'skill-google-python',
    year: '2022',
    title: 'Crash Course on Python',
    description: 'In-depth exploration of Python syntax, data structures, and automation.',
    issuer: 'Google',
    credentialId: 'G-PYTHON-CRASH',
    link: '/certificates/skills/google-python.png',
    skills: ['Python', 'Automation'],
    category: 'skills'
  },
  {
    id: 'skill-outskill-genai',
    year: '2024',
    title: 'Generative AI Mastery',
    description: 'Developing applications with vector databases and prompt engineering.',
    issuer: 'Outskill',
    credentialId: 'OUT-GENAI-101',
    link: '/certificates/skills/outskill-genai.png',
    skills: ['Generative AI', 'Vector DB'],
    category: 'skills'
  },
  {
    id: 'skill-mongodb',
    year: '2023',
    title: 'MongoDB Database Essentials',
    description: 'NoSQL database design, indexing, and complex aggregation pipelines.',
    issuer: 'WsCube Tech',
    credentialId: 'WS-MONGO-23',
    link: '/certificates/skills/wscube-mongodb.jpg',
    skills: ['MongoDB', 'NoSQL'],
    category: 'skills'
  }
];

function BentoCard({ cert, index, onClick }: { cert: typeof CERTIFICATES[0]; index: number; onClick: () => void }) {
  const isFeatured = ['hackathon-electrosphere', 'hackathon-national-id', 'hackathon-odoo-gv', 'hackathon-mosip', 'skill-gemini'].includes(cert.id);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{
        duration: 0.5,
        delay: index * 0.05,
        layout: { type: "spring", stiffness: 300, damping: 30 }
      }}
      onClick={onClick}
      className={`relative group cursor-pointer rounded-[2rem] overflow-hidden bg-white border border-black/5 shadow-sm hover:shadow-2xl transition-all duration-500 will-change-transform ${
        isFeatured ? 'md:col-span-2 md:row-span-1' : 'col-span-1'
      }`}
    >
      {/* Refractive Ledger Container */}
      <div className="relative w-full h-full p-6 flex flex-col gap-5">
        {/* Certificate Image Frame */}
        <div className={`relative w-full overflow-hidden rounded-2xl bg-[#F9F8F6] border border-black/[0.03] transition-transform duration-700 group-hover:scale-[1.03] ${
          isFeatured ? 'h-[320px] md:h-[400px]' : 'h-[220px]'
        }`}>
          <img
            src={cert.link}
            alt={cert.title}
            className="w-full h-full object-contain p-6 md:p-8 drop-shadow-2xl"
          />

          {/* Prismatic Border Overlay */}
          <div className="absolute inset-0 border border-black/5 rounded-2xl pointer-events-none" />

          {/* Holographic Verification Seal (Featured Only) */}
          {isFeatured && (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute top-6 right-6 w-16 h-16 opacity-10 pointer-events-none"
            >
              <svg viewBox="0 0 100 100" className="w-full h-full fill-[#B45309]">
                <path d="M50 0 L61.8 38.2 L100 50 L61.8 61.8 L50 100 L38.2 61.8 L0 50 L38.2 38.2 Z" />
              </svg>
            </motion.div>
          )}
        </div>

        {/* Info Block — Museum-Grade Typography */}
        <div className="flex flex-col gap-2 px-2 pb-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-black tracking-[0.3em] text-[#B45309] uppercase">{cert.issuer}</span>
            <div className="flex items-center gap-2">
              {isFeatured && (
                <div className="flex items-center gap-1.5 px-2 py-0.5 bg-green-500/10 rounded-full">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-[8px] font-bold text-green-700 uppercase tracking-tighter">Verified</span>
                </div>
              )}
              <span className="text-[10px] font-bold text-black/20 font-mono tracking-tighter">{cert.year}</span>
            </div>
          </div>

          <h3 className={`font-black tracking-tight text-black leading-tight ${isFeatured ? 'text-2xl md:text-3xl pr-8' : 'text-sm'}`}>
            {cert.title}
          </h3>

          <p className="text-[11px] text-black/40 line-clamp-2 leading-relaxed font-mono mt-1 pr-4">
            {cert.description}
          </p>

          <div className="flex flex-wrap gap-2 mt-4">
            {cert.skills.map(skill => (
              <span key={skill} className="px-2.5 py-1 bg-black/5 border border-black/[0.03] rounded-full text-[9px] font-bold uppercase tracking-tight text-black/50">
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Hover Spotlight Effect */}
        <div className="absolute inset-0 bg-gradient-to-tr from-[#B45309]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      </div>

      {/* Corner Arrow Indicator */}
      <div className="absolute top-8 right-8 w-10 h-10 rounded-full bg-white border border-black/5 flex items-center justify-center opacity-0 group-hover:opacity-100 shadow-xl transform translate-x-4 group-hover:translate-x-0 transition-all duration-500">
        <ArrowUpRight size={18} className="text-black" />
      </div>
    </motion.div>
  );
}


export default function CertificateSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<'hackathons' | 'skills'>('hackathons');
  const [selectedCert, setSelectedCert] = useState<any | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const headerOpacity = useTransform(scrollYProgress, [0, 0.05], [0, 1]);
  const exitOpacity = useTransform(scrollYProgress, [0.95, 1], [1, 0]);

  // High-End Vertical Parallax for the Ledger
  // We offset the list based on its height to ensure it fits the scroll-progress
  const ledgerY = useTransform(scrollYProgress, [0.1, 0.9], ["0%", "-65%"]);

  const filteredCerts = CERTIFICATES.filter(c => c.category === activeCategory);

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-screen bg-[#F6F3EE] text-[#1C1C1C] py-20"
    >
      <div className="w-full h-full flex flex-col">
        {/* ─── THE PRISMATIC OPTIC REVEAL HEADLINE ─── */}
        <div className="relative z-30 max-w-6xl mx-auto px-6 w-full mb-20">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row md:items-end justify-between gap-8 md:gap-20"
          >
            <div className="flex-1 relative group">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="flex items-center gap-4 mb-6"
              >
                <div className="px-3 py-1 bg-black text-white text-[10px] font-bold rounded-full uppercase tracking-widest">Section 04</div>
                <div className="h-px w-12 bg-black/10" />
                <span className="text-[#B45309] font-mono tracking-[0.4em] uppercase text-[10px] font-black">Verification Ledger</span>
              </motion.div>

              <div className="relative overflow-hidden">
                {/* Scanner Beam (Controlled by Scroll) */}
                <motion.div
                  style={{
                    left: useTransform(scrollYProgress, [0.05, 0.25], ["-20%", "120%"]),
                    willChange: 'left'
                  }}
                  className="absolute top-0 bottom-0 w-[2px] bg-[#B45309] z-[31] shadow-[0_0_20px_#B45309] pointer-events-none"
                />

                {/* Base Layer: Black */}
                <h2 className="text-[clamp(48px,8vw,120px)] font-black tracking-[-0.04em] leading-[0.9] text-black uppercase select-none">
                  {["Certifications", "& Awards"].map((word, i) => (
                    <motion.span
                      key={i}
                      initial={{ opacity: 0, y: 40, rotateX: -30 }}
                      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                      transition={{ duration: 0.8, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
                      className="block"
                    >
                      {word}
                    </motion.span>
                  ))}
                </h2>

                {/* Masked Highlight Layer: Prismatic Glow */}
                <motion.h2
                  style={{
                    maskImage: useTransform(scrollYProgress, (v) =>
                      `linear-gradient(to right, transparent ${v * 400 - 50}%, black ${v * 400}%, transparent ${v * 400 + 50}%)`
                    ),
                    WebkitMaskImage: useTransform(scrollYProgress, (v) =>
                      `linear-gradient(to right, transparent ${v * 400 - 50}%, black ${v * 400}%, transparent ${v * 400 + 50}%)`
                    ),
                  }}
                  className="absolute inset-0 text-[clamp(48px,8vw,120px)] font-black tracking-[-0.04em] leading-[0.9] text-[#B45309] uppercase select-none z-[30] pointer-events-none transition-opacity duration-300"
                >
                  {["Certifications", "& Awards"].map((word, i) => (
                    <span key={i} className="block">{word}</span>
                  ))}
                </motion.h2>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="max-w-[300px] mb-4"
            >
              <p className="font-mono text-[11px] leading-relaxed text-black/40 uppercase tracking-widest text-right">
                A verified ledger of academic excellence and technical specialization across global institutions.
              </p>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ scaleX: 0, originX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="h-[2px] w-full bg-black/5 mt-12"
          />
        </div>

        {/* Cinematic Background Typography - Opacity Adjusted for Perceptual Speed */}
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
              animate={{ opacity: 0.03, scale: 1, filter: 'blur(0px)' }}
              exit={{ opacity: 0, scale: 1.05, filter: 'blur(10px)' }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="text-[20vw] font-bold tracking-tighter text-black whitespace-nowrap select-none will-change-transform"
            >
              {activeCategory.toUpperCase()}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Category Explorer Toggle */}
        <div className="relative z-30 max-w-4xl mx-auto px-6 w-full mb-12">
          <div className="flex bg-[#E8E8E8] p-1.5 rounded-2xl border border-black/5 w-fit mx-auto overflow-hidden">
            {(['hackathons', 'skills'] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`relative px-8 py-3 rounded-xl text-sm font-bold tracking-widest uppercase transition-all duration-500 overflow-hidden ${activeCategory === cat ? 'text-white' : 'text-black/40 hover:text-black'
                  }`}
              >
                <span className="relative z-10">{cat}</span>
                {activeCategory === cat && (
                  <motion.div
                    layoutId="category-bg"
                    className="absolute inset-0 bg-[#1C1C1C] z-0"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>
        <div
          className="relative z-10 w-full max-w-6xl mx-auto px-6 h-auto pb-40"
        >
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8 pb-32"
            >
              {filteredCerts.map((cert, index) => (
                <BentoCard
                  key={cert.id}
                  cert={cert}
                  index={index}
                  onClick={() => setSelectedCert(cert)}
                />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Categories Marker */}
        <div className="absolute top-[20%] right-8 md:right-12 h-[60vh] w-[1px] bg-black/5 flex flex-col items-center z-40 hidden md:flex">
          <div className="text-[10px] font-bold text-black/20 uppercase tracking-widest rotate-90 mb-8 whitespace-nowrap">Ledger Progress</div>
          <div className="flex-1 w-px bg-black/5 relative">
            <motion.div
              className="absolute top-0 left-0 w-full bg-[#B45309]"
              style={{ height: useTransform(scrollYProgress, [0, 1], ["0%", "100%"]) }}
            />
          </div>
          <div className="mt-8">
            <motion.div
              className="w-2 h-2 rounded-full bg-green-500 animate-pulse"
            />
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
