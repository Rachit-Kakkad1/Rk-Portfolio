import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Github, Linkedin, Youtube, ChevronDown, Monitor, MessageSquare, BookOpen, FileText } from 'lucide-react';
import { LeetCode } from './Icons';
import GuestbookModal from './GuestbookModal';

const NAV_ITEMS = [
  { label: 'About', target: 'about' },
  { label: 'Skills', target: 'skills' },
  { label: 'Work', target: 'work' },
  { label: 'Experience', target: 'freelance' },
  { label: 'Contact', target: 'contact' },
];

const SOCIAL_LINKS = [
  { name: 'Github', url: 'https://github.com/Rachit-Kakkad1', Icon: Github },
  { name: 'LinkedIn', url: 'https://www.linkedin.com/in/rachit-kakkad-r29052007k', Icon: Linkedin },
  { name: 'YouTube', url: 'https://www.youtube.com/@RachitKakkad', Icon: Youtube },
  { name: 'LeetCode', url: 'https://leetcode.com/u/kUyAWXHOC5', Icon: LeetCode },
];

const MORE_ITEMS = [
  { label: 'Uses', icon: Monitor, target: 'uses', type: 'scroll' },
  { label: 'Guestbook', icon: MessageSquare, target: 'guestbook', type: 'modal' },
  { label: 'Education', icon: BookOpen, target: 'education', type: 'scroll' },
  { label: 'Resume', icon: FileText, target: "/Rachit Kakkad's Resume.pdf", type: 'link' },
];



export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('about');
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const [isGuestbookOpen, setIsGuestbookOpen] = useState(false);
  const isDarkTheme = activeSection === 'contact';

  const observerRef = useRef<IntersectionObserver | null>(null);
  // Lock observer updates during programmatic scroll to prevent flickering
  const scrollLockRef = useRef(false);
  const scrollLockTimerRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  // Performance-optimized Section Tracking & Sticky Trigger
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > window.innerHeight * 0.8);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // IntersectionObserver for Section Tracking
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -70% 0px',
      threshold: 0
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      // Skip observer updates while a nav-click scroll is in progress
      if (scrollLockRef.current) return;

      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          // Grouping logic: map specific sections to "work"
          if (id === 'projects' || id === 'hackathon') {
            setActiveSection('work');
          } else {
            setActiveSection(id);
          }
        }
      });
    };

    observerRef.current = new IntersectionObserver(observerCallback, observerOptions);
    
    // Sections to observe
    const sectionIds = ['home', 'about', 'skills', 'hackathon', 'projects', 'freelance', 'education', 'certificates', 'contact', 'uses'];
    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observerRef.current?.observe(element);
    });

    return () => observerRef.current?.disconnect();
  }, []);



  const handleNavClick = (e: React.MouseEvent, target: string) => {
    e.preventDefault();
    
    // Immediately set active section & lock observer to prevent flicker
    setActiveSection(target);
    scrollLockRef.current = true;
    clearTimeout(scrollLockTimerRef.current);
    scrollLockTimerRef.current = setTimeout(() => {
      scrollLockRef.current = false;
    }, 1200); // Matches Lenis scroll duration

    // Special handling for grouped "work"
    const scrollTarget = target === 'work' ? 'hackathon' : target;
    const element = document.getElementById(scrollTarget);
    
    if (element) {
      (window as any).lenis?.scrollTo(element, { offset: -80 });
    }
    setIsOpen(false);
    setIsMoreOpen(false);
  };

  const handleMoreItemClick = (item: typeof MORE_ITEMS[0]) => {
    if (item.type === 'scroll') {
      // Lock observer during scroll to prevent flicker
      setActiveSection(item.target);
      scrollLockRef.current = true;
      clearTimeout(scrollLockTimerRef.current);
      scrollLockTimerRef.current = setTimeout(() => {
        scrollLockRef.current = false;
      }, 1200);

      const element = document.getElementById(item.target);
      if (element) {
        (window as any).lenis?.scrollTo(element, { offset: -80 });
      }
    } else if (item.type === 'modal') {
      setIsGuestbookOpen(true);
    } else if (item.type === 'link') {
      window.open(item.target, '_blank');
    }
    setIsMoreOpen(false);
    setIsOpen(false);
  };

  return (
    <>
      <GuestbookModal isOpen={isGuestbookOpen} onClose={() => setIsGuestbookOpen(false)} />

      {/* === DESKTOP: Unified Premium Navigation === */}
      <nav 
        className={`fixed top-0 left-0 w-full z-[90] transition-all duration-500 hidden md:block ${
          isScrolled 
            ? (isDarkTheme ? 'bg-[#0a0a0a]/80 border-b border-white/5 py-4 backdrop-blur-2xl shadow-2xl opacity-100 pointer-events-auto' : 'bg-[#F6F3EE]/80 border-b border-black/5 py-4 backdrop-blur-2xl shadow-2xl opacity-100 pointer-events-auto')
            : 'bg-transparent py-8 opacity-100 pointer-events-auto'
        }`}
        style={{ willChange: 'padding, background-color, backdrop-filter, border-color' }}
      >
        <div className="max-w-[1400px] mx-auto px-12 flex items-center justify-between">
          
          {/* Identity */}
          <div className="w-[200px]">
            <a 
              href="/" 
              onClick={(e) => { e.preventDefault(); (window as any).lenis?.scrollTo(0); }} 
              className="group flex flex-col"
            >
              <span className={`font-bold text-lg tracking-tighter uppercase leading-none transition-colors duration-500 ${
                isScrolled ? (isDarkTheme ? 'text-white' : 'text-[#0E0F14]') : 'text-white'
              }`}>
                Rachit Kakkad
              </span>
              <span className={`text-[10px] font-mono uppercase tracking-[0.2em] transition-colors duration-500 ${
                isScrolled ? (isDarkTheme ? 'text-white/40' : 'text-[#0E0F14]/40') : 'text-white/30'
              } group-hover:text-[#B45309]`}>
                Full Stack Developer
              </span>
            </a>
          </div>

          {/* Navigation Links */}
          <div className={`flex items-center gap-1 p-1 rounded-full border backdrop-blur-sm transition-all duration-500 ${
            isScrolled 
              ? (isDarkTheme ? 'bg-white/5 border-white/5' : 'bg-black/5 border-black/5') 
              : 'bg-white/5 border-white/5'
          }`}>
            {NAV_ITEMS.map(item => {
              const isActive = activeSection === item.target;
              return (
                <a
                  key={item.label}
                  href={`#${item.target}`}
                  onClick={(e) => handleNavClick(e, item.target)}
                  className={`relative px-4 py-2 text-[11px] font-bold uppercase tracking-widest transition-all duration-300 rounded-full ${
                    isActive 
                      ? (isScrolled ? (isDarkTheme ? 'text-white' : 'text-[#0E0F14]') : 'text-white') 
                      : (isScrolled ? (isDarkTheme ? 'text-white/40 hover:text-white/70' : 'text-[#0E0F14]/40 hover:text-[#0E0F14]/70') : 'text-white/40 hover:text-white')
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="active-nav-bg"
                      className={`absolute inset-0 rounded-full border transition-colors duration-500 ${
                        isScrolled ? (isDarkTheme ? 'bg-white/10 border-white/10' : 'bg-black/5 border-black/10') : 'bg-white/10 border-white/10'
                      }`}
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{item.label}</span>
                </a>
              );
            })}
            
            {/* More Dropdown */}
            <div className="relative" onMouseEnter={() => setIsMoreOpen(true)} onMouseLeave={() => setIsMoreOpen(false)}>
              <button className={`px-4 py-2 text-[11px] font-bold uppercase tracking-widest transition-colors flex items-center gap-1.5 ${
                isScrolled ? (isDarkTheme ? 'text-white/40 hover:text-white' : 'text-[#0E0F14]/40 hover:text-[#0E0F14]') : 'text-white/40 hover:text-white'
              }`}>
                More <ChevronDown size={12} className={`transition-transform duration-300 ${isMoreOpen ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {isMoreOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className={`absolute top-full right-0 mt-2 w-48 backdrop-blur-2xl border rounded-2xl overflow-hidden shadow-2xl p-1.5 ${
                      isScrolled 
                        ? (isDarkTheme ? 'bg-[#0a0a0a]/90 border-white/10' : 'bg-white/90 border-black/10') 
                        : 'bg-black/80 border-white/10'
                    }`}
                  >
                    {MORE_ITEMS.map(item => (
                      <button
                        key={item.label}
                        onClick={() => handleMoreItemClick(item)}
                        className={`w-full flex items-center gap-3 px-4 py-3 text-[10px] font-bold uppercase tracking-widest rounded-xl transition-all ${
                          isScrolled 
                            ? (isDarkTheme ? 'text-white/50 hover:text-white hover:bg-white/10' : 'text-[#0E0F14]/50 hover:text-[#0E0F14] hover:bg-black/5') 
                            : 'text-white/50 hover:text-white hover:bg-white/10'
                        }`}
                      >
                        <item.icon size={14} className={isScrolled ? (isDarkTheme ? 'text-white/40' : 'text-black/40') : 'text-white/40'} />
                        {item.label}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Social Links */}
          <div className="w-[200px] flex justify-end items-center gap-5">
            {SOCIAL_LINKS.map(link => (
              <a 
                key={link.name} 
                href={link.url} 
                target="_blank" 
                rel="noopener noreferrer" 
                className={`transition-all duration-500 hover:scale-110 ${
                  isScrolled ? (isDarkTheme ? 'text-white/40 hover:text-white' : 'text-[#0E0F14]/40 hover:text-[#B45309]') : 'text-white/40 hover:text-white'
                }`}
              >
                <link.Icon size={18} />
              </a>
            ))}
          </div>
        </div>

        {/* Signature Glow Accent (only on scroll) */}
        {isScrolled && (
          <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#B45309]/30 to-transparent origin-center" />
        )}
      </nav>

      {/* === MOBILE: High-End Hamburger & Overlay === */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed top-6 right-6 z-[100] w-14 h-14 rounded-full bg-[#0E0F14] border border-white/10 text-[#F6F3EE] flex items-center justify-center shadow-2xl md:hidden transition-all duration-500 ${isOpen ? 'scale-100 opacity-100' : 'scale-100 opacity-100'}`}
      >
        <AnimatePresence mode="wait">
          {isOpen ? <X key="x" size={24} /> : <Menu key="m" size={24} />}
        </AnimatePresence>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            className="fixed inset-0 h-full w-full bg-[#F6F3EE] z-[95] flex flex-col md:hidden overflow-y-auto"
          >
            <div className="flex-1 flex flex-col justify-center px-12 pt-32 pb-12 gap-6">
              <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#0E0F14]/30 mb-4">Main Navigation</p>
              {NAV_ITEMS.map((item, idx) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + idx * 0.05 }}
                  onClick={(e) => handleNavClick(e as any, item.target)}
                  className="group cursor-pointer"
                >
                  <span className={`text-5xl font-bold uppercase tracking-tighter transition-colors ${activeSection === item.target ? 'text-[#B45309]' : 'text-[#0E0F14]/40 group-hover:text-[#0E0F14]'}`}>
                    {item.label}
                  </span>
                </motion.div>
              ))}
              
              <div className="h-px w-full bg-black/5 my-6" />
              
              <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#0E0F14]/30 mb-4">Other Links</p>
              <div className="grid grid-cols-2 gap-4">
                {MORE_ITEMS.map((item, idx) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + idx * 0.05 }}
                    onClick={() => handleMoreItemClick(item)}
                    className="flex items-center gap-3 p-4 bg-black/5 rounded-2xl active:bg-black/10 transition-colors"
                  >
                    <item.icon size={18} className="text-[#0E0F14]/40" />
                    <span className="text-xs font-bold uppercase tracking-widest text-[#0E0F14]">{item.label}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="p-12 border-t border-black/5 flex justify-center gap-6">
              {SOCIAL_LINKS.map(link => (
                <a key={link.name} href={link.url} className="w-14 h-14 rounded-full border border-black/10 flex items-center justify-center text-[#0E0F14]/40 hover:text-[#B45309] hover:border-[#B45309] transition-all"><link.Icon size={20} /></a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
