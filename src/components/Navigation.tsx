import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Github, Linkedin, Youtube, ChevronDown, Monitor, MessageSquare, BookOpen, Award, Briefcase } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { LeetCode, XIcon } from './Icons';
import GuestbookModal from './GuestbookModal';

const NAV_ITEMS = [
  { label: 'About', target: 'about', path: '/about' },
  { label: 'Skills', target: 'skills', path: '/skills' },
  { label: 'Work', target: 'work', path: '/projects' },
  { label: 'Experience', target: 'freelance', path: '/experience' },
  { label: 'Contact', target: 'contact', path: '/contact' },
];

const SOCIAL_LINKS = [
  { name: 'Github', url: 'https://github.com/Rachit-Kakkad1', Icon: Github },
  { name: 'LinkedIn', url: 'https://www.linkedin.com/in/rachit-kakkad-r29052007k', Icon: Linkedin },
  { name: 'YouTube', url: 'https://www.youtube.com/@RachitKakkad', Icon: Youtube },
  { name: 'X', url: 'https://x.com/rachit_kakk2957', Icon: XIcon },
  { name: 'LeetCode', url: 'https://leetcode.com/u/kUyAWXHOC5', Icon: LeetCode },
];

const MORE_ITEMS = [
  { label: 'Projects', icon: Briefcase, target: 'work', type: 'route', path: '/projects' },
  { label: 'Certificates', icon: Award, target: 'certificates', type: 'route', path: '/all-certificates' },
  { label: 'Guestbook', icon: MessageSquare, target: 'guestbook', type: 'modal' },
  { label: 'Education', icon: BookOpen, target: 'education', type: 'scroll', path: '/education' },
  { label: 'GitHub Stats', icon: Github, target: 'github-stats', type: 'external', path: '/github-stats' },
  { label: 'LeetCode Stats', icon: LeetCode, target: 'leetcode-stats', type: 'external', path: '/leetcode-stats' },
  { label: 'YouTube Videos', icon: Youtube, target: 'youtube-videos', type: 'external', path: '/youtube-videos' },
];

// ─── TYPEWRITER LOGO ─────────────────────────────────────────────────────────
// Shows "©RK" by default, typewriter-expands to "©Rachit Kakkad" on hover
const COLLAPSED = '©RK';
const EXPANDED  = '©Rachit Kakkad';

function TypewriterLogo({ isScrolled, isDarkTheme }: { isScrolled: boolean; isDarkTheme: boolean }) {
  const [displayText, setDisplayText] = useState(COLLAPSED);
  const [isHovered, setIsHovered] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearTimers = () => {
    if (intervalRef.current) { clearInterval(intervalRef.current); intervalRef.current = null; }
    if (timeoutRef.current) { clearTimeout(timeoutRef.current); timeoutRef.current = null; }
  };

  useEffect(() => {
    clearTimers();

    if (isHovered) {
      // Type forward: ©RK → ©Rachit Kakkad
      let i = COLLAPSED.length;
      setDisplayText(COLLAPSED);
      // Small initial delay before typing starts
      timeoutRef.current = setTimeout(() => {
        intervalRef.current = setInterval(() => {
          i++;
          if (i <= EXPANDED.length) {
            setDisplayText(EXPANDED.slice(0, i));
          } else {
            clearTimers();
          }
        }, 55); // ~55ms per character for fast, snappy typing
      }, 100);
    } else {
      // Erase backward: ©Rachit Kakkad → ©RK
      let current = displayText;
      if (current.length <= COLLAPSED.length) return;
      
      let len = current.length;
      intervalRef.current = setInterval(() => {
        len--;
        if (len >= COLLAPSED.length) {
          setDisplayText(EXPANDED.slice(0, len));
        } else {
          setDisplayText(COLLAPSED);
          clearTimers();
        }
      }, 35); // Faster erase for snappy feel
    }

    return clearTimers;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isHovered]);

  const textColor = isScrolled
    ? (isDarkTheme ? 'text-white' : 'text-[#0E0F14]')
    : 'text-white';

  return (
    <div
      className="relative flex items-center"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <span
        className={`font-black text-lg tracking-tight leading-none transition-colors duration-300 whitespace-nowrap font-mono ${textColor}`}
      >
        {displayText}
      </span>
      {/* Typewriter cursor — blinking caret */}
      <motion.span
        className={`inline-block w-[2px] h-[16px] ml-[2px] ${
          isScrolled ? (isDarkTheme ? 'bg-white' : 'bg-[#0E0F14]') : 'bg-white'
        }`}
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.6, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
      />
    </div>
  );
}

export default function Navigation() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('about');
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const [isGuestbookOpen, setIsGuestbookOpen] = useState(false);
  const isDarkTheme = activeSection === 'contact' || 
                      location.pathname === '/youtube-videos' || 
                      location.pathname === '/github-stats' || 
                      location.pathname === '/leetcode-stats';

  const observerRef = useRef<IntersectionObserver | null>(null);
  const scrollLockRef = useRef(false);
  const scrollLockTimerRef = useRef<ReturnType<typeof setTimeout>>(undefined);
  const isScrolledRef = useRef(false);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const nextIsScrolled = window.scrollY > window.innerHeight * 0.8;
          if (nextIsScrolled !== isScrolledRef.current) {
            isScrolledRef.current = nextIsScrolled;
            setIsScrolled(nextIsScrolled);
          }
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -70% 0px',
      threshold: 0
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      if (scrollLockRef.current) return;

      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          if (id === 'projects' || id === 'hackathon') {
            setActiveSection('work');
          } else {
            setActiveSection(id);
          }
        }
      });
    };

    observerRef.current = new IntersectionObserver(observerCallback, observerOptions);
    
    const sectionIds = ['home', 'about', 'skills', 'hackathon', 'projects', 'freelance', 'education', 'certificates', 'contact', 'uses'];
    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observerRef.current?.observe(element);
    });

    return () => observerRef.current?.disconnect();
  }, [location.pathname]);

  const handleNavClick = (e: React.MouseEvent, target: string, path: string) => {
    e.preventDefault();
    
    setActiveSection(target);
    scrollLockRef.current = true;
    clearTimeout(scrollLockTimerRef.current);
    scrollLockTimerRef.current = setTimeout(() => {
      scrollLockRef.current = false;
    }, 1200);

    if (location.pathname === '/' || location.pathname === path || NAV_ITEMS.some(item => item.path === location.pathname) ||
        ['/certificates', '/uses', '/education'].includes(location.pathname)) {
      const scrollTarget = target === 'work' ? 'hackathon' : target;
      const element = document.getElementById(scrollTarget);
      if (element) {
        (window as any).lenis?.scrollTo(element, { 
          offset: -80,
          duration: 1.5,
          easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
        });
      }
      // Update URL without hash
      window.history.pushState(null, '', path);
    } else {
      navigate(path);
    }
    
    setIsOpen(false);
    setIsMoreOpen(false);
  };

  const handleMoreItemClick = (item: typeof MORE_ITEMS[0]) => {
    if (item.type === 'route' && item.path) {
      window.dispatchEvent(new CustomEvent('trigger-transition', { 
        detail: { name: `Accessing ${item.label}...`, target: 'home' } 
      }));
      setTimeout(() => navigate(item.path!), 400);
    } else if (item.type === 'external' && item.path) {
      window.dispatchEvent(new CustomEvent('trigger-transition', { 
        detail: { name: `Initializing ${item.label}...`, target: 'home' } 
      }));
      setTimeout(() => navigate(item.path!, { state: { fromSection: activeSection } }), 400);
    } else if (item.type === 'scroll' && item.path) {
      setActiveSection(item.target);
      scrollLockRef.current = true;
      clearTimeout(scrollLockTimerRef.current);
      scrollLockTimerRef.current = setTimeout(() => {
        scrollLockRef.current = false;
      }, 1200);

      // All these routes render <Home />, so we can scroll directly
      const homeRoutes = ['/', '/about', '/skills', '/work', '/projects', '/experience', '/contact', '/certificates', '/uses', '/education'];
      if (homeRoutes.includes(location.pathname)) {
        const element = document.getElementById(item.target);
        if (element) {
          (window as any).lenis?.scrollTo(element, { 
            offset: -80,
            duration: 1.5,
            easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
          });
        }
        window.history.pushState(null, '', item.path);
      } else {
        navigate(item.path);
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

      <nav 
        className={`fixed top-0 left-0 w-full z-[90] transition-all duration-500 hidden md:block ${
          isScrolled 
            ? (isDarkTheme ? 'bg-[#0a0a0a]/80 border-b border-white/5 py-4 backdrop-blur-2xl shadow-2xl opacity-100 pointer-events-auto' : 'bg-[#F6F3EE]/80 border-b border-black/5 py-4 backdrop-blur-2xl shadow-2xl opacity-100 pointer-events-auto')
            : 'bg-transparent py-8 opacity-100 pointer-events-auto'
        }`}
        style={{ willChange: 'padding, background-color, backdrop-filter, border-color' }}
      >
        <div className="max-w-[1400px] mx-auto px-12 flex items-center justify-between">
          
          <div className="w-[200px]">
            <a 
              href="/" 
              onClick={(e) => { e.preventDefault(); navigate('/'); (window as any).lenis?.scrollTo(0); }} 
              className="group inline-block"
            >
              <TypewriterLogo isScrolled={isScrolled} isDarkTheme={isDarkTheme} />
            </a>
          </div>

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
                  href={item.path}
                  onClick={(e) => handleNavClick(e, item.target, item.path)}
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
        className={`fixed top-6 right-6 z-[120] w-14 h-14 rounded-full bg-[#0E0F14] border border-white/10 text-[#F6F3EE] flex items-center justify-center shadow-2xl md:hidden transition-all duration-500 ${isOpen ? 'scale-100 opacity-100' : 'scale-100 opacity-100'}`}
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
            className="fixed inset-0 h-full w-full bg-[#F6F3EE] z-[110] flex flex-col md:hidden overflow-y-auto"
          >
            <div className="flex-1 flex flex-col justify-start px-8 md:px-12 pt-24 pb-12 gap-4 md:gap-6">
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#0E0F14]/30 mb-2">Main Navigation</p>
              <div className="flex flex-col gap-4">
                {NAV_ITEMS.map((item, idx) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + idx * 0.05 }}
                    onClick={(e) => handleNavClick(e as any, item.target, item.path)}
                    className="group cursor-pointer"
                  >
                    <span className={`text-4xl md:text-5xl font-black uppercase tracking-tighter transition-colors ${activeSection === item.target ? 'text-[#B45309]' : 'text-[#0E0F14]/40 group-hover:text-[#0E0F14]'}`}>
                      {item.label}
                    </span>
                  </motion.div>
                ))}
              </div>
              
              <div className="h-px w-full bg-black/5 my-4" />
              
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#0E0F14]/30 mb-2">Other Links</p>
              <div className="grid grid-cols-1 xs:grid-cols-2 gap-3 pb-8">
                {MORE_ITEMS.map((item, idx) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + idx * 0.05 }}
                    onClick={() => handleMoreItemClick(item)}
                    className="flex items-center gap-3 p-4 bg-black/5 rounded-2xl active:bg-black/10 transition-colors"
                  >
                    <item.icon size={16} className="text-[#0E0F14]/40" />
                    <span className="text-[11px] font-black uppercase tracking-widest text-[#0E0F14]">{item.label}</span>
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
