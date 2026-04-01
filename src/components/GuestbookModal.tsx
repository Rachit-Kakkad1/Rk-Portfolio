import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, MessageSquare, CheckCircle2 } from 'lucide-react';

interface GuestbookModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Message {
  id: string;
  name: string;
  content: string;
  timestamp: number;
}

export default function GuestbookModal({ isOpen, onClose }: GuestbookModalProps) {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [savedMessages, setSavedMessages] = useState<Message[]>([]);

  // Load messages from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem('guestbook_messages');
    if (stored) {
      try {
        setSavedMessages(JSON.parse(stored));
      } catch (e) {
        console.error('Failed to parse messages', e);
      }
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !message) return;

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    const newMessage: Message = {
      id: Date.now().toString(),
      name,
      content: message,
      timestamp: Date.now(),
    };

    const updatedMessages = [newMessage, ...savedMessages].slice(0, 50); // Keep last 50
    setSavedMessages(updatedMessages);
    localStorage.setItem('guestbook_messages', JSON.stringify(updatedMessages));

    setIsSubmitting(false);
    setIsSuccess(true);
    
    // Reset success state after 3 seconds
    setTimeout(() => {
      setIsSuccess(false);
      setName('');
      setMessage('');
    }, 3000);
  };

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

              {!isSuccess ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-[#0E0F14]/40 ml-1">Your Name</label>
                    <input
                      required
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Recruiter / Fellow Dev / Guest"
                      className="w-full px-5 py-4 bg-black/5 border border-transparent rounded-2xl focus:border-[#B45309] focus:bg-white transition-all outline-none text-[#0E0F14]"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-[#0E0F14]/40 ml-1">Message</label>
                    <textarea
                      required
                      rows={4}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Write something nice..."
                      className="w-full px-5 py-4 bg-black/5 border border-transparent rounded-2xl focus:border-[#B45309] focus:bg-white transition-all outline-none text-[#0E0F14] resize-none"
                    />
                  </div>
                  <button
                    disabled={isSubmitting}
                    type="submit"
                    className="w-full py-5 bg-[#0E0F14] text-white rounded-2xl font-bold tracking-widest uppercase text-xs flex items-center justify-center gap-2 hover:bg-[#B45309] transition-all group disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>
                        <Send size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        Post to Guestbook
                      </>
                    )}
                  </button>
                </form>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-12 flex flex-col items-center justify-center text-center space-y-4"
                >
                  <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                    <CheckCircle2 size={32} />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-[#0E0F14]">Thank you!</h4>
                    <p className="text-[#0E0F14]/60">Your message has been posted.</p>
                  </div>
                </motion.div>
              )}

              <div className="mt-8 space-y-4 max-h-[200px] overflow-y-auto pr-2 custom-scrollbar">
                 <p className="text-[10px] font-bold uppercase tracking-widest text-[#0E0F14]/30">Recent Messages</p>
                 {savedMessages.length > 0 ? (
                   savedMessages.slice(0, 3).map((msg) => (
                     <div key={msg.id} className="p-4 bg-black/5 rounded-2xl border border-black/5">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-[10px] font-bold text-[#B45309] uppercase">{msg.name}</span>
                          <span className="text-[8px] text-black/30">{new Date(msg.timestamp).toLocaleDateString()}</span>
                        </div>
                        <p className="text-xs text-[#0E0F14]/70 italic leading-relaxed">"{msg.content}"</p>
                     </div>
                   ))
                 ) : (
                   <p className="text-center text-[10px] text-[#0E0F14]/20 italic py-4">No messages yet. Be the first!</p>
                 )}
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
