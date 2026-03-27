import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, MessageSquare } from 'lucide-react';

interface GuestbookModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function GuestbookModal({ isOpen, onClose }: GuestbookModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 md:p-6">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-lg bg-[#F6F3EE] rounded-3xl overflow-hidden shadow-2xl border border-black/5"
          >
            <div className="p-8">
              <div className="flex justify-between items-center mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#B45309] flex items-center justify-center text-white">
                    <MessageSquare size={20} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#0E0F14] tracking-tight">Guestbook</h3>
                    <p className="text-xs text-[#0E0F14]/50 font-mono uppercase tracking-widest">Leave a message</p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="w-10 h-10 rounded-full bg-black/5 flex items-center justify-center text-[#0E0F14] hover:bg-black/10 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-[#0E0F14]/40 ml-1">Your Name</label>
                  <input
                    type="text"
                    placeholder="Recruiter / Fellow Dev / Guest"
                    className="w-full px-5 py-4 bg-black/5 border border-transparent rounded-2xl focus:border-[#B45309] focus:bg-white transition-all outline-none text-[#0E0F14]"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-[#0E0F14]/40 ml-1">Message</label>
                  <textarea
                    rows={4}
                    placeholder="Write something nice..."
                    className="w-full px-5 py-4 bg-black/5 border border-transparent rounded-2xl focus:border-[#B45309] focus:bg-white transition-all outline-none text-[#0E0F14] resize-none"
                  />
                </div>
                <button
                  className="w-full py-5 bg-[#0E0F14] text-white rounded-2xl font-bold tracking-widest uppercase text-xs flex items-center justify-center gap-2 hover:bg-[#B45309] transition-all group"
                >
                  <Send size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  Post to Guestbook
                </button>
              </div>

              <p className="mt-6 text-center text-[10px] text-[#0E0F14]/30 uppercase tracking-[0.2em]">
                Your message will be displayed publicly.
              </p>
            </div>

            {/* Accent Line */}
            <div className="h-1.5 w-full bg-gradient-to-r from-transparent via-[#B45309] to-transparent opacity-30" />
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
