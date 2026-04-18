import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ExternalLink, ArrowUpRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import SEO from '../components/SEO';
import { CERTIFICATES } from '../data/certificates';

function CertCard({ cert, index, onClick }: { cert: typeof CERTIFICATES[0]; index: number; onClick: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: Math.min(index * 0.05, 0.4) }}
      onClick={onClick}
      className="group relative cursor-pointer bg-[#fcfaf0] p-5 border border-[#e0ddcf] shadow-[4px_4px_0px_rgba(0,0,0,0.05)] hover:shadow-[12px_12px_0px_rgba(0,0,0,0.1)] transition-all duration-300 flex flex-col h-[480px] overflow-hidden"
    >
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-multiply bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

      <div className="flex justify-between items-center mb-4 border-b border-[#e0ddcf] pb-2">
        <span className="text-[10px] font-black uppercase tracking-widest text-black/40 font-serif italic">Vol. {cert.year}</span>
        <span className="text-[10px] font-black uppercase tracking-widest text-[#B45309] font-serif">Verified Ledger</span>
      </div>

      <div className="relative w-full h-48 mb-6 overflow-hidden bg-white border border-[#e0ddcf] p-2 grayscale group-hover:grayscale-0 transition-all duration-700">
        <img
          src={cert.link}
          alt={cert.title}
          className="w-full h-full object-contain filter contrast-[1.1] brightness-[0.95]"
        />
        <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(circle,black_1px,transparent_1px)] bg-[size:3px_3px]" />
      </div>

      <div className="flex flex-col flex-1">
        <div className="text-[9px] font-black uppercase tracking-[0.2em] text-[#B45309] mb-2 font-serif italic">
          {cert.issuer}
        </div>
        <h3 className="text-xl font-black leading-[1.1] text-black tracking-tighter mb-3 group-hover:text-[#B45309] transition-colors duration-300 font-serif line-clamp-2">
          {cert.title}
        </h3>
        <p className="text-xs leading-relaxed text-black/60 line-clamp-3 italic font-serif">
          "{cert.description}"
        </p>
      </div>

      <div className="mt-auto pt-4 border-t border-double border-[#e0ddcf] flex justify-between items-center">
        <div className="flex flex-wrap gap-2">
          {cert.skills.slice(0, 3).map(skill => (
            <span key={skill} className="text-[9px] font-bold text-black/40 uppercase tracking-[0.1em] bg-black/5 px-2 py-0.5 rounded-sm">{skill}</span>
          ))}
        </div>
        <ArrowUpRight size={14} className="text-black/20 group-hover:text-black transition-colors" />
      </div>
    </motion.div>
  );
}

export default function AllCertificates() {
  const navigate = useNavigate();
  const [selectedCert, setSelectedCert] = useState<any | null>(null);

  const hackathons = CERTIFICATES.filter(c => c.category === 'hackathons');
  const skills = CERTIFICATES.filter(c => c.category === 'skills');

  const handleReturn = () => {
    window.dispatchEvent(new CustomEvent('trigger-transition', { 
      detail: { name: 'Returning Home', target: 'home' } 
    }));
    setTimeout(() => navigate('/'), 400);
  };

  return (
    <main className="min-h-screen bg-[#F6F3EE] text-[#1C1C1C] selection:bg-[#B45309] selection:text-white">
      <SEO title="The Complete Archives | Verified Credentials" />

      {/* Sticky Header */}
      <nav className="fixed top-0 left-0 w-full z-[100] px-6 md:px-12 py-6 flex items-center justify-between bg-[#F6F3EE]/90 backdrop-blur-xl border-b border-black/10">
        <div className="flex items-center gap-4 font-serif">
          <span className="text-xs font-black uppercase tracking-widest text-[#B45309] italic hidden sm:block">Volume ∞</span>
          <h1 className="text-xl md:text-2xl font-black uppercase tracking-tighter">The Complete Archives</h1>
        </div>
        <button 
          onClick={handleReturn}
          className="group flex items-center gap-2 px-6 py-2 bg-black text-white font-serif uppercase text-[10px] md:text-xs font-black tracking-widest hover:bg-[#B45309] transition-all shadow-[4px_4px_0px_rgba(0,0,0,0.2)] hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px]"
        >
          <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> Back to Front Page
        </button>
      </nav>

      <div className="max-w-[1600px] mx-auto px-6 md:px-12 pt-40 pb-32">
        {/* Newspaper Title Header */}
        <div className="w-full mb-20 border-b-4 border-black pb-10 text-center">
          <h1 className="text-[clamp(3rem,10vw,120px)] font-black tracking-tighter leading-[0.8] text-black uppercase font-serif mb-6">
            THE OFFICIAL <span className="text-[#B45309]">LEDGER</span>
          </h1>
          <p className="max-w-2xl mx-auto font-serif italic text-sm md:text-base text-black/60 leading-relaxed">
            A comprehensive, verified collection of all competitive hackathon victories and certified technical proficiencies achieved throughout the career timeline.
          </p>
        </div>

        {/* Hackathons Archive */}
        <div className="mb-32">
          <div className="flex items-center gap-6 mb-12 overflow-hidden border-y border-black/10 py-4">
            <span className="font-serif font-black text-sm uppercase bg-black text-white px-4 py-1 shrink-0">SECTION A</span>
            <h2 className="text-4xl md:text-6xl font-black font-serif italic text-black tracking-tighter shrink-0">
              Hackathon <span className="text-[#B45309]">Victories</span>
            </h2>
            <div className="flex-1 h-[2px] bg-black/10"></div>
            <span className="font-serif text-xs font-bold uppercase tracking-widest text-black/40 hidden md:block shrink-0">Total: {hackathons.length}</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {hackathons.map((cert, idx) => (
              <CertCard key={cert.id} cert={cert} index={idx} onClick={() => setSelectedCert(cert)} />
            ))}
          </div>
        </div>

        {/* Skills Archive */}
        <div>
          <div className="flex items-center gap-6 mb-12 overflow-hidden border-y border-black/10 py-4">
            <span className="font-serif font-black text-sm uppercase bg-black text-white px-4 py-1 shrink-0">SECTION B</span>
            <h2 className="text-4xl md:text-6xl font-black font-serif italic text-black tracking-tighter shrink-0">
              Professional <span className="text-[#B45309]">Certifications</span>
            </h2>
            <div className="flex-1 h-[2px] bg-black/10"></div>
            <span className="font-serif text-xs font-bold uppercase tracking-widest text-black/40 hidden md:block shrink-0">Total: {skills.length}</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {skills.map((cert, idx) => (
              <CertCard key={cert.id} cert={cert} index={idx} onClick={() => setSelectedCert(cert)} />
            ))}
          </div>
        </div>
      </div>

      {/* Modal Preview */}
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
    </main>
  );
}
