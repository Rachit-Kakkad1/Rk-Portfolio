import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Menu, X } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const NAV_ITEMS = [
  { label: 'About', media: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop' },
  { label: 'Skills', media: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2000&auto=format&fit=crop' },
  { label: 'Projects', media: 'https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?q=80&w=2000&auto=format&fit=crop' },
  { label: 'Education', media: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2000&auto=format&fit=crop' },
  { label: 'Experience', media: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2000&auto=format&fit=crop' },
  { label: 'Contact', media: 'https://images.unsplash.com/photo-1604871000636-074fa5117945?q=80&w=2000&auto=format&fit=crop' },
];

const SOCIAL_LINKS = [
  { name: 'Leetcode', url: 'https://leetcode.com/u/kUyAWXHOC5/' },
  { name: 'YouTube', url: 'https://www.youtube.com/@RachitKakkad' },
  { name: 'Github', url: 'https://github.com/Rachit-Kakkad1' },
  { name: 'Twitter', url: 'https://x.com/rachit_kakk2957' },
  { name: 'LinkedIn', url: 'https://www.linkedin.com/in/rachit-kakkad-r29052007k' }
];

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  
  const buttonRef = useRef<HTMLButtonElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const navItemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const socialsRef = useRef<HTMLDivElement>(null);

  // Handle scroll to show/hide button
  useEffect(() => {
    const handleScroll = () => {
      const heroHeight = window.innerHeight;
      if (window.scrollY > heroHeight * 0.5) {
        setShowButton(true);
      } else {
        setShowButton(false);
        if (isOpen) setIsOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isOpen]);

  // Button entrance animation
  useEffect(() => {
    if (showButton && buttonRef.current) {
      gsap.to(buttonRef.current, {
        scale: 1,
        rotation: 90,
        duration: 0.6,
        ease: 'power3.out',
      });
    } else if (buttonRef.current) {
      gsap.to(buttonRef.current, {
        scale: 0,
        rotation: 0,
        duration: 0.4,
        ease: 'power3.in',
      });
    }
  }, [showButton]);

  // Handle open/close animations
  useEffect(() => {
    if (!overlayRef.current) return;

    const tl = gsap.timeline();

    if (isOpen) {
      // Open sequence
      overlayRef.current.style.pointerEvents = 'auto';
      
      tl.to(overlayRef.current, {
        x: '0%',
        opacity: 1,
        duration: 0.6,
        ease: 'power4.inOut',
      })
      .fromTo(navItemsRef.current, 
        { x: 50, opacity: 0 },
        { x: 0, opacity: 1, stagger: 0.1, duration: 0.6, ease: 'power3.out' },
        "-=0.3"
      )
      .fromTo(socialsRef.current?.children || [],
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, stagger: 0.1, duration: 0.6, ease: 'power2.out' },
        "-=0.1"
      );
    } else {
      // Close sequence
      overlayRef.current.style.pointerEvents = 'none';
      
      tl.to(socialsRef.current?.children || [], {
        opacity: 0,
        y: 10,
        stagger: 0.05,
        duration: 0.3,
      })
      .to(navItemsRef.current, {
        x: 30,
        opacity: 0,
        stagger: 0.05,
        duration: 0.3,
        ease: 'power2.in',
      }, "-=0.2")
      .to(overlayRef.current, {
        x: '100%',
        opacity: 0,
        duration: 0.5,
        ease: 'power4.inOut',
      }, "-=0.2");
    }
  }, [isOpen]);

  const handleNavClick = (e: React.MouseEvent, label: string) => {
    e.preventDefault();
    const targetId = label.toLowerCase();
    
    // Dispatch transition event
    window.dispatchEvent(new CustomEvent('trigger-transition', {
      detail: { name: label, target: targetId }
    }));

    // Close menu
    setIsOpen(false);
  };

  return (
    <>
      {/* Floating Menu Button */}
      <button
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        onMouseEnter={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          const centerX = rect.left + rect.width / 2;
          const centerY = rect.top + rect.height / 2;
          gsap.to(e.currentTarget, {
            x: (e.clientX - centerX) * 0.3,
            y: (e.clientY - centerY) * 0.3,
            duration: 0.3,
            ease: "power2.out"
          });
        }}
        onMouseLeave={(e) => {
          gsap.to(e.currentTarget, { x: 0, y: 0, duration: 0.5, ease: "elastic.out(1, 0.3)" });
        }}
        className="fixed top-8 right-8 z-[100] w-[60px] h-[60px] md:w-[70px] md:h-[70px] rounded-full bg-[#0E0F14] text-[#F6F3EE] flex items-center justify-center shadow-[0_0_30px_rgba(180,83,9,0.3)] hover:shadow-[0_0_40px_rgba(180,83,9,0.5)] transition-shadow duration-300 scale-0"
        style={{ transformOrigin: 'center' }}
      >
        {isOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      {/* Side Panel Overlay */}
      <div 
        ref={overlayRef}
        className="fixed top-0 right-0 h-full w-full md:w-[450px] bg-[#0E0F14] border-l border-white/10 z-[95] flex flex-col justify-center opacity-0 pointer-events-none overflow-hidden translate-x-full"
      >
        {/* Background Shapes */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div 
            className="absolute top-[20%] left-[10%] w-[40vw] h-[40vw] rounded-full bg-[#B45309] opacity-10 blur-[120px] mix-blend-screen" 
            style={{ animation: 'float 10s ease-in-out infinite alternate' }}
          />
          <div 
            className="absolute bottom-[10%] right-[10%] w-[30vw] h-[30vw] rounded-full bg-blue-900 opacity-10 blur-[100px] mix-blend-screen"
            style={{ animation: 'float 12s ease-in-out infinite alternate-reverse' }}
          />
        </div>

        {/* Navigation Items */}
        <nav className="flex flex-col items-start pl-24 md:pl-32 gap-6 z-20 w-full">
          {NAV_ITEMS.map((item, index) => (
            <div 
              key={item.label}
              ref={el => navItemsRef.current[index] = el}
              className="relative group cursor-pointer overflow-hidden py-2"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              onClick={(e) => handleNavClick(e, item.label)}
            >
              {/* Text Layer (Mask) */}
              <span 
                className="relative z-10 block text-3xl md:text-4xl font-medium leading-[1.2] uppercase tracking-tight transition-all duration-300 ease-out"
                style={{
                  color: hoveredIndex === index ? 'transparent' : '#F6F3EE',
                  WebkitTextStroke: hoveredIndex === index ? '1px rgba(246, 243, 238, 0.2)' : '0px transparent',
                  transform: hoveredIndex === index ? 'scale(1.05)' : 'scale(1)',
                  letterSpacing: hoveredIndex === index ? '0.05em' : 'normal',
                  backgroundImage: hoveredIndex === index ? `url(${item.media})` : 'none',
                  backgroundSize: '120% auto',
                  backgroundPosition: hoveredIndex === index ? 'center center' : 'top left',
                  WebkitBackgroundClip: hoveredIndex === index ? 'text' : 'none',
                  backgroundClip: hoveredIndex === index ? 'text' : 'none',
                  animation: hoveredIndex === index ? 'panImage 10s linear infinite alternate' : 'none',
                }}
              >
                {item.label}
              </span>
            </div>
          ))}
        </nav>

        {/* Social Links */}
        <div 
          ref={socialsRef}
          className="absolute left-6 md:left-10 top-1/2 -translate-y-1/2 flex flex-col items-center gap-4 text-[#F6F3EE] opacity-60 text-xs uppercase tracking-widest z-20"
        >
          <div className="w-[1px] h-8 md:h-12 bg-[#F6F3EE]/30 origin-bottom" />
          {SOCIAL_LINKS.map(link => (
            <div key={link.name} className="py-1">
              <a 
                href={link.url} 
                target="_blank"
                rel="noopener noreferrer"
                className="block hover:opacity-100 hover:text-[#B45309] transition-all duration-300 hover:-translate-y-1"
                style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
              >
                {link.name}
              </a>
            </div>
          ))}
          <div className="w-[1px] h-8 md:h-12 bg-[#F6F3EE]/30 origin-top" />
        </div>
      </div>

      <style>{`
        @keyframes float {
          0% { transform: translateY(-20px) scale(1); }
          100% { transform: translateY(20px) scale(1.1); }
        }
        @keyframes panImage {
          0% { background-position: 0% 50%; }
          100% { background-position: 100% 50%; }
        }
      `}</style>
    </>
  );
}
