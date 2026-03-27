import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Clock, Globe, Loader2 } from 'lucide-react';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function BookingModal({ isOpen, onClose }: BookingModalProps) {
  const [isLoading, setIsLoading] = useState(true);

  // Official Cal.com link provided by user
  const calLink = "https://cal.com/rachit-kakkad-x1stip/30min?theme=dark";

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-0 md:p-6 overflow-hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-5xl h-full md:h-[85vh] bg-[#0E0F14] md:rounded-3xl overflow-hidden shadow-2xl border border-white/10 flex flex-col"
          >
            {/* Header */}
            <div className="flex justify-between items-center p-6 md:p-8 border-b border-white/5 bg-[#0E0F14]/50 backdrop-blur-xl z-20">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[#4A63F3] flex items-center justify-center text-white shadow-[0_0_20px_rgba(74,99,243,0.3)]">
                  <Calendar size={24} />
                </div>
                <div>
                  <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight">Schedule a Call</h3>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="flex items-center gap-1 text-[10px] uppercase tracking-widest text-white/40 font-bold">
                      <Clock size={12} /> 30-min intro
                    </span>
                    <span className="w-1 h-1 rounded-full bg-white/20" />
                    <span className="flex items-center gap-1 text-[10px] uppercase tracking-widest text-white/40 font-bold">
                      <Globe size={12} /> Remote / Video
                    </span>
                  </div>
                </div>
              </div>
              
              <button
                onClick={onClose}
                className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-white hover:bg-white/10 transition-all border border-white/5"
                aria-label="Close"
              >
                <X size={24} />
              </button>
            </div>

            {/* Content / Iframe */}
            <div className="flex-1 relative bg-[#0E0F14]">
              {isLoading && (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 z-10 bg-[#0E0F14]">
                  <Loader2 size={40} className="text-[#4A63F3] animate-spin" />
                  <p className="text-xs font-mono uppercase tracking-[0.2em] text-white/30">Loading Calendar...</p>
                </div>
              )}
              
              <iframe
                src={calLink}
                className={`w-full h-full border-none transition-opacity duration-700 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
                onLoad={() => setIsLoading(false)}
                title="Schedule a call with Rachit Kakkad"
              />
            </div>

            {/* Footer Fallback */}
            <div className="p-4 bg-black/50 border-t border-white/5 text-center">
              <p className="text-[10px] text-white/30 uppercase tracking-[0.2em]">
                Trouble loading? <a href={calLink} target="_blank" rel="noopener noreferrer" className="text-[#4A63F3] hover:underline">Open in new tab</a>
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
