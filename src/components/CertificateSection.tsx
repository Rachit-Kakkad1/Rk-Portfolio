import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { ExternalLink } from 'lucide-react';

const CERTIFICATES = [
  {
    id: 'gcp',
    year: '2024',
    title: 'Google Cloud Professional Architect',
    description: 'Cloud architecture, security, and scalable systems design.',
    issuer: 'Google',
    credentialId: 'GCP-19283746',
    link: '#',
    skills: ['Cloud Systems', 'Architecture']
  },
  {
    id: 'meta',
    year: '2023',
    title: 'Meta Front-End Developer',
    description: 'Advanced React patterns, state management, and performance.',
    issuer: 'Meta',
    credentialId: 'META-FE-998273',
    link: '#',
    skills: ['Frontend', 'React']
  },
  {
    id: 'aws',
    year: '2023',
    title: 'AWS Certified Solutions Architect',
    description: 'Distributed systems, serverless computing, and database design.',
    issuer: 'Amazon Web Services',
    credentialId: 'AWS-SA-554433',
    link: '#',
    skills: ['Cloud Systems', 'Serverless']
  },
  {
    id: 'ml',
    year: '2022',
    title: 'Deep Learning Specialization',
    description: 'Neural networks, computer vision, and sequence models.',
    issuer: 'DeepLearning.AI',
    credentialId: 'DLAI-DL-112233',
    link: '#',
    skills: ['Machine Learning', 'AI']
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

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Calculate progress points
  // 0.0 - 0.1: Initialization
  // 0.1 - 0.7: Entries writing & scrolling
  // 0.7 - 0.9: Summary
  // 0.9 - 1.0: Exit

  const initOpacity = useTransform(scrollYProgress, [0, 0.05, 0.1], [0, 1, 1]);
  const initTextOpacity = useTransform(scrollYProgress, [0, 0.02, 0.05, 0.08], [0, 1, 1, 0]);
  const headerOpacity = useTransform(scrollYProgress, [0.06, 0.1], [0, 1]);

  const ledgerY = useTransform(scrollYProgress, [0.1, 0.7], [0, -350]);
  const ledgerOpacity = useTransform(scrollYProgress, [0.7, 0.75], [1, 0]);

  const summaryOpacity = useTransform(scrollYProgress, [0.75, 0.8], [0, 1]);
  const summaryY = useTransform(scrollYProgress, [0.75, 0.8], [20, 0]);

  const exitOpacity = useTransform(scrollYProgress, [0.9, 0.95], [1, 0]);
  const exitTextOpacity = useTransform(scrollYProgress, [0.9, 0.95], [0, 1]);

  return (
    <section 
      ref={containerRef} 
      className="relative w-full h-[300vh] bg-[#F6F3EE] text-[#1C1C1C]"
    >
      <div className="sticky top-0 w-full h-screen overflow-hidden flex flex-col items-center pt-24 md:pt-32">
        
        {/* Background Elements */}
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center overflow-hidden">
          <div className="text-[15vw] font-bold tracking-tighter text-black opacity-[0.04] whitespace-nowrap select-none">
            CERTIFICATIONS
          </div>
        </div>
        
        {/* Subtle Grid */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-[0.05]"
          style={{
            backgroundImage: 'linear-gradient(#1C1C1C 1px, transparent 1px), linear-gradient(90deg, #1C1C1C 1px, transparent 1px)',
            backgroundSize: '40px 40px'
          }}
        />

        {/* Main Content Area */}
        <motion.div 
          className="relative z-10 w-full max-w-4xl mx-auto px-6 font-mono"
          style={{ opacity: exitOpacity }}
        >
          {/* Initialization Sequence */}
          <motion.div className="absolute -top-10 left-6 right-6" style={{ opacity: initTextOpacity }}>
            <p className="text-[#B45309] text-lg">&gt; verifying knowledge credentials...</p>
          </motion.div>

          {/* Ledger Header */}
          <motion.div 
            className="border-b-2 border-[#1C1C1C] pb-4 mb-12"
            style={{ opacity: headerOpacity }}
          >
            <h2 className="text-2xl md:text-4xl font-bold uppercase tracking-widest">Developer Knowledge Ledger</h2>
          </motion.div>

          {/* Ledger Entries */}
          <motion.div 
            className="relative overflow-visible"
            style={{ y: ledgerY, opacity: ledgerOpacity }}
          >
            {CERTIFICATES.map((cert, index) => (
              <CertificateEntry
                key={cert.id}
                cert={cert}
                index={index}
                scrollYProgress={scrollYProgress}
                hoveredId={hoveredId}
                setHoveredId={setHoveredId}
              />
            ))}
          </motion.div>

          {/* Knowledge Summary */}
          <motion.div 
            className="absolute top-32 left-6 right-6 bg-[#F6F3EE] p-8 border-2 border-[#1C1C1C]"
            style={{ opacity: summaryOpacity, y: summaryY, pointerEvents: 'none' }}
          >
            <h3 className="text-2xl font-bold uppercase tracking-widest mb-8 text-[#B45309]">Knowledge Verified</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Array.from(new Set(CERTIFICATES.flatMap(c => c.skills))).map((skill, i) => (
                <div key={i} className="flex items-center gap-4 text-lg">
                  <span className="text-[#B45309]">✓</span>
                  <span>{skill}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Exit Text */}
        <motion.div 
          className="absolute inset-0 flex items-center justify-center pointer-events-none z-20"
          style={{ opacity: exitTextOpacity }}
        >
          <div className="text-3xl md:text-5xl font-mono font-bold text-[#B45309] tracking-widest uppercase">
            Credentials Verified
          </div>
        </motion.div>

      </div>
    </section>
  );
}
