import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, X, Sparkles, Send, Loader2 } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';
import gsap from 'gsap';

const SYSTEM_PROMPT = `You are "Rachit's AI Guide," an intelligent assistant embedded inside the portfolio of Rachit Kakkad.
Rachit is a Full Stack & AI Developer specializing in building cinematic, highly interactive web applications using the MERN stack, GSAP, Framer Motion, and integrating Machine Learning models.
Your ONLY purpose is to proudly explain Rachit's portfolio, projects, skills, and experience to visitors.
- DO NOT answer questions unrelated to Rachit, his portfolio, software development, or his stack.
- If the user asks a random question, politely pivot back to his skills or projects.
- Keep your answers concise, professional, and slightly enthusiastic. Format with short paragraphs. Do not use overly formal robot language.
- Known Projects to reference: "AgriCert" (React/Node/Blockchain for agriculture), "Nexus AI" (Next.js/OpenAI generative workspace), "Lumina Health" (Python/WebRTC telemedicine), "Orbit Finance" (Solidity ZK-Rollup DEX).
- Current App context: This portfolio features a completely custom, interactive 3D Spline keyboard where keys can be pressed to command you, god-level smooth scrolling powered by Lenis, and cinematic GSAP animations.`;

interface Message {
  role: 'user' | 'ai';
  content: string;
}

export default function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'ai', content: "Hi! I'm Rachit's AI Guide. How can I help you explore this portfolio?" }
  ]);
  const [inputVal, setInputVal] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // Handle Global "ai-ask" events (e.g., from the Keyboard)
  useEffect(() => {
    const handleAskAI = (e: Event) => {
      const customEvent = e as CustomEvent<string>;
      const question = customEvent.detail;
      
      if (!isOpen) setIsOpen(true);
      
      // Optional: Add a slight delay for dramatic effect if it was just opened
      setTimeout(() => {
        handleSend(question);
      }, 300);
    };

    window.addEventListener('ai-ask', handleAskAI);
    return () => window.removeEventListener('ai-ask', handleAskAI);
  }, [isOpen]);

  const handleSend = async (queryOverride?: string) => {
    const textToSend = queryOverride || inputVal;
    if (!textToSend.trim() || isTyping) return;

    if (!queryOverride) setInputVal('');
    
    // Add User Message
    setMessages(prev => [...prev, { role: 'user', content: textToSend.trim() }]);
    setIsTyping(true);

    try {
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
         throw new Error("Missing API Key. Please add GEMINI_API_KEY to your .env file.");
      }

      const ai = new GoogleGenAI({ apiKey: apiKey });

      // Format previous history for Gemini
      const contents = [
        { role: 'user', parts: [{ text: SYSTEM_PROMPT }] },
        { role: 'model', parts: [{ text: "Understood. I will act exclusively as Rachit's Portfolio AI Guide." }] },
        ...messages.map(m => ({ 
          role: m.role === 'ai' ? 'model' : 'user', 
          parts: [{ text: m.content }] 
        })),
        { role: 'user', parts: [{ text: textToSend.trim() }]}
      ];

      const response = await ai.models.generateContent({
        model: 'gemini-2.0-flash',
        contents: contents,
      });

      const responseText = response.text || "I'm sorry, my systems are currently rebooting. Please try again later.";
      
      setMessages(prev => [...prev, { role: 'ai', content: responseText }]);
      
    } catch (error: any) {
      console.error('AI Error:', error);
      let errorMsg = "I'm currently unable to connect to my neural network. Please try manually exploring the sections!";
      if (error?.message?.includes('API key not valid')) errorMsg = "The Google Gemini API key provided is invalid.";
      if (error?.message?.includes('404')) errorMsg = "Model not found. Please ensure the API key has the correct model permissions.";
      
      setMessages(prev => [...prev, { role: 'ai', content: errorMsg }]);
    } finally {
      setIsTyping(false);
    }
  };

  // GSAP Typewriter Effect for the newest AI message
  useEffect(() => {
    if (isOpen && messages.length > 0 && messages[messages.length - 1].role === 'ai' && !isTyping) {
      const target = `.ai-msg-${messages.length - 1} span`;
      // Only animate if the panel is open and the DOM elements actually exist
      if (document.querySelector(target)) {
        gsap.fromTo(target, 
          { opacity: 0 },
          { opacity: 1, duration: 0.01, stagger: 0.01, ease: 'none' }
        );
      }
    }
  }, [messages, isTyping, isOpen]);

  return (
    <div className="fixed bottom-6 right-6 md:bottom-12 md:right-12 z-[100] flex flex-col items-end">
      
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.95, transition: { duration: 0.2 } }}
            className="w-[90vw] md:w-[400px] h-[500px] max-h-[70vh] mb-6 rounded-2xl bg-[#0a0a0a]/80 backdrop-blur-2xl border border-white/10 shadow-[0_30px_60px_rgba(0,0,0,0.5)] flex flex-col overflow-hidden transform-gpu"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#151515]/50 shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#1C1C1C] border border-white/10 flex items-center justify-center shrink-0">
                  <Sparkles size={16} className="text-[#B45309]" />
                </div>
                <div>
                  <h3 className="text-white font-medium text-sm leading-tight">Rachit's AI Guide</h3>
                  <p className="text-[#B45309] text-[10px] font-mono tracking-widest uppercase">Contextual Assistant</p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-full flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6 scrollbar-hide shrink">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] rounded-2xl px-5 py-3 text-sm leading-relaxed ${
                    msg.role === 'user' 
                      ? 'bg-white text-black rounded-tr-sm' 
                      : 'bg-[#1C1C1C] text-gray-300 border border-white/5 rounded-tl-sm'
                  }`}>
                    {msg.role === 'user' ? (
                      msg.content
                    ) : (
                      <div className={`ai-msg-${i}`}>
                        {msg.content.split('').map((char, index) => (
                          <span key={index}>{char}</span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start">
                  <div className="max-w-[85%] rounded-2xl rounded-tl-sm bg-[#1C1C1C] border border-white/5 px-5 py-4 flex items-center gap-2">
                    <Loader2 size={14} className="text-[#B45309] animate-spin" />
                    <span className="text-xs font-mono text-gray-500 uppercase tracking-widest">Synthesizing...</span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 border-t border-white/10 bg-[#0a0a0a] shrink-0">
              <form 
                onSubmit={(e) => { e.preventDefault(); handleSend(); }}
                className="flex items-center gap-2 p-1.5 rounded-full bg-[#1C1C1C] border border-white/10 focus-within:border-white/30 transition-colors"
              >
                <input 
                  ref={inputRef}
                  type="text"
                  value={inputVal}
                  onChange={(e) => setInputVal(e.target.value)}
                  placeholder="Ask about my projects or skills..."
                  disabled={isTyping}
                  className="flex-1 bg-transparent border-none outline-none text-white text-sm px-4 placeholder:text-gray-600 focus:ring-0 disabled:opacity-50"
                />
                <button 
                  type="submit"
                  disabled={isTyping || !inputVal.trim()}
                  className="w-9 h-9 shrink-0 rounded-full bg-white text-black flex items-center justify-center disabled:opacity-50 disabled:bg-[#333] disabled:text-gray-500 hover:scale-105 transition-transform"
                >
                  <Send size={14} className={inputVal.trim() ? "translate-x-[1px]" : ""} />
                </button>
              </form>
              
              <div className="mt-3 flex gap-2 overflow-x-auto scrollbar-hide pb-1">
                {['Explain AgriCert', 'What is your stack?', 'Tell me about Rachit'].map((suggestion) => (
                  <button
                    key={suggestion}
                    type="button"
                    onClick={() => handleSend(suggestion)}
                    disabled={isTyping}
                    className="whitespace-nowrap px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/5 text-[11px] text-gray-400 transition-colors"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>

          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Toggle Button - God Level Upgrade */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="relative group w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center p-0 overflow-visible"
      >
        {/* Orbital Ring - Constant Rotation */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute inset-[-8px] border-2 border-dashed border-white/10 rounded-full pointer-events-none group-hover:border-white/30 transition-colors duration-500"
        />
        
        {/* Secondary Orbital Ring - Faster, Reverse Rotation */}
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
          className="absolute inset-[-4px] border border-white/5 rounded-full pointer-events-none opacity-50"
        />

        {/* The Core Orb */}
        <div className="relative w-full h-full rounded-full bg-[#1C1C1C] border border-white/10 flex items-center justify-center shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden z-10 transition-transform duration-500 group-hover:scale-105">
          {/* Glass Specular Highlights */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />
          
          {/* Inner Glow / Core Light */}
          <motion.div 
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className={`absolute inset-4 rounded-full blur-xl bg-blend-screen pointer-events-none ${isOpen ? 'bg-[#B45309]' : 'bg-white'}`}
          />

          <AnimatePresence mode="wait">
            <motion.div
              key={isOpen ? 'close' : 'bot'}
              initial={{ rotate: -180, opacity: 0, scale: 0.5 }}
              animate={{ rotate: 0, opacity: 1, scale: 1 }}
              exit={{ rotate: 180, opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.4, ease: "backOut" }}
              className="relative z-20 text-white"
            >
              {isOpen ? (
                <X size={28} strokeWidth={1.5} />
              ) : (
                <div className="relative w-full h-full p-2.5 flex items-center justify-center">
                  <motion.svg
                    viewBox="0 0 100 100"
                    className="w-full h-full drop-shadow-[0_0_15px_rgba(180,83,9,0.5)]"
                    initial={{ rotate: -10 }}
                    animate={{ rotate: 0 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                  >
                    <defs>
                      <linearGradient id="logo-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#D97706" />
                        <stop offset="100%" stopColor="#B45309" />
                      </linearGradient>
                      <filter id="glow">
                        <feGaussianBlur stdDeviation="2.5" result="coloredBlur"/>
                        <feMerge>
                          <feMergeNode in="coloredBlur"/>
                          <feMergeNode in="SourceGraphic"/>
                        </feMerge>
                      </filter>
                    </defs>
                    
                    {/* Neural Core */}
                    <motion.circle 
                      cx="50" cy="50" r="12" 
                      fill="url(#logo-grad)"
                      animate={{ 
                        scale: [1, 1.2, 1],
                        opacity: [0.8, 1, 0.8]
                      }}
                      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    />
                    
                    {/* Connection Web - Outer Hexagon */}
                    <motion.path 
                      d="M50 15 L80 32 L80 68 L50 85 L20 68 L20 32 Z" 
                      fill="none" 
                      stroke="url(#logo-grad)" 
                      strokeWidth="1.5"
                      strokeDasharray="100 200"
                      animate={{ strokeDashoffset: [200, 0] }}
                      transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                    />
                    
                    {/* Inner Connections */}
                    <g opacity="0.6">
                      <path d="M50 15 L50 38" stroke="#B45309" strokeWidth="1" />
                      <path d="M80 32 L60 45" stroke="#B45309" strokeWidth="1" />
                      <path d="M80 68 L60 55" stroke="#B45309" strokeWidth="1" />
                      <path d="M50 85 L50 62" stroke="#B45309" strokeWidth="1" />
                      <path d="M20 68 L40 55" stroke="#B45309" strokeWidth="1" />
                      <path d="M20 32 L40 45" stroke="#B45309" strokeWidth="1" />
                    </g>
                    
                    {/* Dynamic Data Nodes */}
                    {[15, 32, 68, 85, 68, 32].map((y, i) => {
                      const x = [50, 80, 80, 50, 20, 20][i];
                      return (
                        <motion.circle
                          key={i}
                          cx={x} cy={y} r="2.5"
                          fill="#FDE68A"
                          animate={{ opacity: [0.3, 1, 0.3] }}
                          transition={{ duration: 2, delay: i * 0.3, repeat: Infinity }}
                        />
                      );
                    })}
                  </motion.svg>
                  
                  <motion.div
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute top-2 right-2"
                  >
                    <Sparkles size={14} className="text-[#FDE68A]" />
                  </motion.div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Core Pulsing Ring */}
          <div className={`absolute inset-0 border-2 rounded-full transition-colors duration-500 pointer-events-none ${isOpen ? 'border-[#B45309]/50' : 'border-white/5'}`} />
        </div>

        {/* Global Outer Pulse */}
        <motion.div
          animate={{ scale: [1, 1.4, 1], opacity: [0.1, 0, 0.1] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeOut" }}
          className={`absolute inset-0 rounded-full border-2 pointer-events-none ${isOpen ? 'border-[#B45309]' : 'border-white'}`}
        />
        
        {/* Glow behind button */}
        <div className={`absolute inset-4 rounded-full blur-2xl group-hover:opacity-60 transition-all duration-500 pointer-events-none ${isOpen ? 'bg-[#B45309]/40 opacity-40' : 'bg-white/20 opacity-20'}`} />
        
        {!isOpen && (
          <div className="absolute -top-12 right-0 whitespace-nowrap px-4 py-2 rounded-xl bg-black border border-white/10 text-[11px] font-mono tracking-[0.2em] uppercase text-[#B45309] opacity-0 group-hover:opacity-100 group-hover:-translate-y-2 transition-all duration-500 pointer-events-none shadow-2xl backdrop-blur-md">
            Execute Assistant phase
          </div>
        )}
      </motion.button>

      <style dangerouslySetInnerHTML={{__html: `
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}} />
    </div>
  );
}
