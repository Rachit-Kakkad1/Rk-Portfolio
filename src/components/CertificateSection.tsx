import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, ExternalLink } from 'lucide-react';

const CERTIFICATES = [
  // Hackathon Certificates
  {
    id: 'hackathon-mosip',
    year: '2024',
    title: 'MOSIP ( IIT MADRAS )',
    description: 'Developed innovative solutions for digital identity systems in global populations.',
    issuer: 'IIT Madras',
    credentialId: 'IITM-MOSIP-2024',
    link: '/certificates/hackathons/MOSIP ( IIT MADRAS ).jpg',
    skills: ['Digitial ID', 'Security'],
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
    id: 'hackathon-national-id',
    year: '2025',
    title: 'National Digital Identity & Innovation Hackathon',
    description: 'National level hackathon for large-scale digital architecture and identity.',
    issuer: 'National Innovation Cell',
    credentialId: 'NDI-2025-HACK',
    link: '/certificates/hackathons/National_Digital_Identity_&_Innovation_Hackathon_2025.jpeg',
    skills: ['Scale', 'Architecture'],
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
    id: 'hackathon-electrosphere',
    year: '2026',
    title: 'ElectroSphere 2K26',
    description: 'Emerging tech hackathon exploring hardware-software integrations.',
    issuer: 'ElectroSphere',
    credentialId: 'ES-2026-XP',
    link: '/certificates/hackathons/ElectroSphere_2K26.jpg',
    skills: ['Hardware', 'Embedded'],
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

function CertificateEntry({ cert, index, scrollYProgress, hoveredId, setHoveredId }: any) {
  const start = 0.1 + (index * 0.15);
  const appear = start + 0.05;
  const stamp = appear + 0.05;

  const entryOpacity = useTransform(scrollYProgress, [start, appear], [0, 1]);
  const entryY = useTransform(scrollYProgress, [start, appear], [20, 0]);
  
  const stampScale = useTransform(scrollYProgress, [appear, stamp], [1.5, 1]);
  const stampOpacity = useTransform(scrollYProgress, [appear, stamp], [0, 1]);

  return (
    <motion.div 
      className="mb-8 md:mb-12 relative group cursor-pointer"
      style={{ opacity: entryOpacity, y: entryY }}
      onMouseEnter={() => setHoveredId(cert.id)}
      onMouseLeave={() => setHoveredId(null)}
    >
      <div className="flex flex-col md:flex-row gap-4 md:gap-12">
        <div className="text-neutral-500 w-24 shrink-0 pt-1">{cert.year}</div>
        <div className="flex-1">
          <h3 className="text-xl md:text-2xl font-bold mb-2">{cert.title}</h3>
          <p className="text-neutral-600 mb-4">{cert.description}</p>
          <div className="flex items-center gap-4 text-sm font-bold">
            <span className="text-neutral-500">STATUS:</span>
            <span className="text-[#B45309]">VERIFIED ✓</span>
          </div>

          {/* Expandable Details */}
          <AnimatePresence>
            {hoveredId === cert.id && (
              <motion.div 
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="mt-6 p-6 bg-white/50 border border-black/10 rounded-lg flex flex-col gap-3">
                  <div className="flex justify-between">
                    <span className="text-neutral-500">Issued by</span>
                    <span className="font-medium">{cert.issuer}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-500">Credential ID</span>
                    <span className="font-medium">{cert.credentialId}</span>
                  </div>
                  <a 
                    href={cert.link}
                    className="mt-2 inline-flex items-center gap-2 text-[#B45309] hover:text-black transition-colors"
                  >
                    <span>View Certificate</span>
                    <ExternalLink size={16} />
                  </a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Verification Stamp */}
      <motion.div 
        className="absolute right-0 top-0 pointer-events-none hidden md:flex items-center justify-center w-24 h-24 border-4 border-[#B45309] text-[#B45309] rounded-full opacity-80 rotate-[-15deg]"
        style={{ 
          scale: stampScale, 
          opacity: stampOpacity,
          mixBlendMode: 'multiply'
        }}
      >
        <div className="text-center">
          <div className="text-lg font-bold tracking-widest uppercase">Verified</div>
          <div className="text-[8px] tracking-widest border-t border-[#B45309] mt-1 pt-1">{cert.year}</div>
        </div>
      </motion.div>
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

  const filteredCerts = CERTIFICATES.filter(c => c.category === activeCategory);

  return (
    <section 
      ref={containerRef} 
      className="relative w-full h-[250vh] bg-[#F6F3EE] text-[#1C1C1C]"
    >
      <div className="sticky top-0 w-full h-screen overflow-hidden flex flex-col pt-24 md:pt-32">
        
        {/* Cinematic Background Typography */}
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div 
              key={activeCategory}
              initial={{ opacity: 0, scale: 0.9, filter: 'blur(20px)' }}
              animate={{ opacity: 0.05, scale: 1, filter: 'blur(0px)' }}
              exit={{ opacity: 0, scale: 1.1, filter: 'blur(20px)' }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="text-[20vw] font-bold tracking-tighter text-black whitespace-nowrap select-none"
            >
              {activeCategory.toUpperCase()}
            </motion.div>
          </AnimatePresence>
        </div>
        
        {/* Category Explorer Toggle */}
        <div className="relative z-30 max-w-4xl mx-auto px-6 w-full mb-12">
          <div className="flex bg-black/5 p-1.5 rounded-2xl backdrop-blur-xl border border-black/5 w-fit mx-auto overflow-hidden">
            {(['hackathons', 'skills'] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`relative px-8 py-3 rounded-xl text-sm font-bold tracking-widest uppercase transition-all duration-500 overflow-hidden ${
                  activeCategory === cat ? 'text-white' : 'text-black/40 hover:text-black'
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

        {/* Dynamic Ledger Content */}
        <motion.div 
          className="relative z-10 w-full max-w-4xl mx-auto px-6 font-mono h-[60vh] overflow-y-auto no-scrollbar scroll-smooth"
          style={{ opacity: exitOpacity }}
          data-lenis-prevent="true"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="grid grid-cols-1 gap-6 pb-20">
                {filteredCerts.map((cert, index) => (
                  <motion.div
                    key={cert.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="group relative bg-white/40 border border-black/5 p-8 rounded-3xl backdrop-blur-md hover:bg-white/80 transition-all duration-500 cursor-pointer overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1"
                    onMouseEnter={() => setHoveredId(cert.id)}
                    onMouseLeave={() => setHoveredId(null)}
                    onClick={() => setSelectedCert(cert)}
                  >
                     <div className="flex flex-col md:flex-row justify-between gap-6">
                        <div className="flex flex-col gap-2">
                           <div className="flex items-center gap-3">
                              <span className="px-3 py-1 bg-black text-white text-[10px] font-bold rounded-full uppercase tracking-tighter">{cert.year}</span>
                              <span className="text-[10px] font-bold text-[#B45309] uppercase tracking-widest">{cert.issuer}</span>
                           </div>
                           <h3 className="text-2xl font-medium tracking-tight mt-2">{cert.title}</h3>
                           <p className="text-neutral-500 text-sm max-w-lg leading-relaxed">{cert.description}</p>
                        </div>
                        
                        <div className="flex flex-col items-end justify-between">
                            <div className="flex flex-wrap gap-2 justify-end">
                               {cert.skills.map(skill => (
                                 <span key={skill} className="px-3 py-1 bg-black/5 rounded-full text-[10px] font-bold uppercase">{skill}</span>
                               ))}
                            </div>
                            <div className="mt-6 w-12 h-12 rounded-full border border-black/10 flex items-center justify-center group-hover:bg-black group-hover:text-white transition-all duration-300">
                               <ArrowUpRight size={20} />
                            </div>
                        </div>
                     </div>

                     {/* Subtle Scanline Effect */}
                     <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-[#B45309]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* Global Verification Badge */}
        <div className="mt-12 flex justify-center pb-8">
            <motion.div 
               className="px-6 py-3 border-2 border-black/10 rounded-full flex items-center gap-3 bg-white/20 backdrop-blur-md shadow-lg"
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
            className="fixed inset-0 z-[500] flex items-center justify-center p-6 md:p-12 bg-black/90 backdrop-blur-2xl cursor-zoom-out"
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
                  className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white hover:bg-white hover:text-black transition-all duration-300 border border-white/20"
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
