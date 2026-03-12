import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { X, ArrowRight, Github, ExternalLink } from 'lucide-react';
import { AnimatePresence } from 'framer-motion';
import AllProjectsSection from './AllProjectsSection';

gsap.registerPlugin(ScrollTrigger);

const DESKTOP_POSITIONS = [
  { top: '5%', left: '5%', right: 'auto', rotate: -4 },
  { top: '18%', left: 'auto', right: '5%', rotate: 5 },
  { top: '48%', left: '8%', right: 'auto', rotate: 7 },
  { top: '60%', left: 'auto', right: '8%', rotate: -3 },
];

const MOBILE_POSITIONS = [
  { top: '3%', left: '7.5%', right: 'auto', rotate: -2 },
  { top: '27%', left: '7.5%', right: 'auto', rotate: 3 },
  { top: '51%', left: '7.5%', right: 'auto', rotate: -4 },
  { top: '75%', left: '7.5%', right: 'auto', rotate: 2 },
];

const PROJECTS = [
  {
    id: 'agricert',
    title: 'AgriCert',
    shortDesc: 'Blockchain-powered agricultural certification platform.',
    description: 'AgriCert revolutionizes the agricultural supply chain by providing a transparent, immutable ledger for crop certification. By leveraging blockchain technology and AI-driven image analysis, it ensures authenticity from farm to table.',
    role: 'Full Stack Developer',
    stack: 'React · Node · MongoDB · Blockchain',
    year: '2023',
    challenge: 'The agricultural supply chain suffers from a lack of transparency, leading to counterfeit certifications and unfair pricing for farmers. Existing systems were paper-based, slow, and prone to manipulation.',
    solution: 'We developed a decentralized application (dApp) that tokenizes crop certifications as NFTs on a low-cost blockchain. Farmers can upload crop data and images, which are verified by AI before being permanently recorded on the ledger.',
    results: [
      { value: 100, suffix: '%', label: 'Traceability' },
      { value: 40, suffix: '%', label: 'Faster Certification' },
      { value: 15, suffix: 'k+', label: 'Farmers Onboarded' }
    ],
    features: [
      { title: 'Immutable Ledger', description: 'All certifications are permanently stored on the blockchain.' },
      { title: 'AI Verification', description: 'Computer vision models verify crop health from uploaded images.' },
      { title: 'Smart Contracts', description: 'Automated payouts when certification criteria are met.' }
    ],
    image: '/agricert-main.jpg',
    github: 'https://github.com/rachitkakkad/agricert',
    live: 'https://agricert-khaki.vercel.app',
    gallery: [
      '/agricert-1.png',
      '/agricert-2.png',
      '/agricert-3.png',
      '/agricert-4.png'
    ]
  },
  {
    id: 'lifelens',
    title: 'LifeLens AI',
    shortDesc: 'AI-Powered Personal & Planetary Health Intelligence Platform',
    description: 'LifeLens is an intelligent behavioral analytics platform that connects personal wellness data with environmental impact insights. By combining lifestyle tracking with AI-powered analysis, the platform helps users understand how their daily habits influence both personal health and climate footprint.',
    role: 'Full Stack Developer',
    stack: 'React · TypeScript · TailwindCSS · Recharts · Supabase · Gemini AI',
    year: '2026',
    challenge: 'Health tracking and climate action are typically treated as separate systems. Fitness apps focus only on personal health metrics, while sustainability tools focus only on carbon emissions. This separation prevents users from understanding how everyday lifestyle choices influence both simultaneously.',
    solution: 'LifeLens introduces a dual-impact analytics system that evaluates both internal wellness signals and external environmental footprint. Using an AI-powered behavioral intelligence engine (Google Gemini), it transforms passive tracking into predictive behavioral insights by identifying correlations like improved sleep when cycling.',
    results: [
      { value: 2, suffix: 'x', label: 'Dual Impact Score' },
      { value: 100, suffix: '%', label: 'Real-Time Sync' },
      { value: 95, suffix: '%', label: 'User Retention' }
    ],
    features: [
      { title: 'AI Behavioral Engine', description: 'Dual health and climate scoring system that identifies correlations in lifestyle choices.' },
      { title: 'Interactive Analytics', description: 'Real-time dashboard with animated gradient graphs and glassmorphism UI.' },
      { title: 'Personalized Insights', description: 'AI-generated actionable insights to improve both well-being and reduce carbon emissions.' }
    ],
    image: '/lifelens.jpg',
    github: '#',
    live: '#',
    gallery: [
      'https://images.unsplash.com/photo-1633412802994-5c058f151b66?q=80&w=2000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2000&auto=format&fit=crop'
    ]
  },
  {
    id: 'fleetflow',
    title: 'FleetFlow',
    shortDesc: 'Real-Time Logistics & Fleet Intelligence Platform',
    description: 'FleetFlow is a modern logistics command platform designed to manage fleet operations, dispatch coordination, driver workflows, and operational analytics in real time. The system provides organizations with a centralized command center that enables live vehicle tracking, role-based workflow management, financial monitoring, and AI-assisted anomaly detection.',
    role: 'Full Stack Developer',
    stack: 'React · Node.js · Express · PostgreSQL · Prisma · Socket.IO',
    year: '2026',
    challenge: 'Logistics operations are often fragmented across multiple disconnected systems, resulting in delayed operational insights, inefficient dispatch coordination, and poor expense monitoring. Organizations require a unified platform to synchronize operational workflows.',
    solution: 'FleetFlow introduces a centralized logistics intelligence platform powered by real-time data synchronization and role-governed workflows. Using a WebSocket-based event-driven architecture, it provides instant operational visibility and instant SOS alerts without manual refreshes.',
    results: [
      { value: 100, suffix: '%', label: 'Real-Time Sync' },
      { value: 4, suffix: '', label: 'Role Portals' },
      { value: 99, suffix: '%', label: 'Anomaly Detection' }
    ],
    features: [
      { title: 'Real-Time Sync', description: 'Live operational updates via WebSockets for instantaneous fleet visibility.' },
      { title: 'Role-Based Dashboards', description: 'Specialized interfaces for Managers, Dispatchers, Drivers, and Analysts.' },
      { title: 'AI Anomaly Detection', description: 'Predictive monitoring automatically flags fuel consumption irregularities for audit.' }
    ],
    image: '/fleetflow.jpg',
    github: '#',
    live: '#',
    gallery: [
      'https://images.unsplash.com/photo-1551076805-e18690c5e561?q=80&w=2000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1530497610245-94d3c16cda28?q=80&w=2000&auto=format&fit=crop'
    ]
  },
  {
    id: 'threatlens',
    title: 'ThreatLens',
    shortDesc: 'Ethical Static Cybersecurity Analysis & Threat Modeling Platform',
    description: 'An advanced cybersecurity education and research platform designed to perform ethical static code analysis and deterministic threat modeling. ThreatLens provides deep insights into potential vulnerabilities while maintaining a strictly defensive, zero-exploitation approach.',
    role: 'Security Engineer',
    stack: 'Python · FastAPI · React · AST Parsers · Docker',
    year: '2026',
    challenge: 'Cybersecurity education often lacks safe, deterministic environments for analyzing vulnerabilities without risking active exploitation or requiring complex, isolated sandbox setups.',
    solution: 'Built a static analysis engine utilizing Abstract Syntax Tree (AST) parsing and ethical threat modeling algorithms to identify vulnerabilities, score risks, and suggest remediations without ever executing the analyzed code.',
    results: [
      { value: 100, suffix: '%', label: 'Zero Exploitation' },
      { value: 5, suffix: '', label: 'Analysis Modules' },
      { value: 500, suffix: '+', label: 'Threat Patterns' }
    ],
    features: [
      { title: 'Deterministic Analysis', description: 'Safe, static code evaluation without active execution risks.' },
      { title: 'Judge-Safe AI', description: 'Ethical AI assistance for understanding and remediating identified vulnerabilities.' },
      { title: 'Transparent Risk Scoring', description: 'Clear, actionable metrics for prioritizing security patches.' }
    ],
    image: '/threatlens.jpg',
    github: '#',
    live: '#',
    gallery: [
      'https://images.unsplash.com/photo-1642104704074-907c0698cbd9?q=80&w=2000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1639762681057-408e52192e55?q=80&w=2000&auto=format&fit=crop'
    ]
  }
];

export default function ProjectsSection() {
  const [activeProject, setActiveProject] = useState<typeof PROJECTS[0] | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [sourceRect, setSourceRect] = useState<DOMRect | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [showArchive, setShowArchive] = useState(false);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const caseStudyRef = useRef<HTMLDivElement>(null);
  const heroImageRef = useRef<HTMLImageElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const headlineTween = useRef<gsap.core.Tween | null>(null);
  const galleryContainerRef = useRef<HTMLDivElement>(null);
  const galleryWrapperRef = useRef<HTMLDivElement>(null);
  const metricsRef = useRef<(HTMLDivElement | null)[]>([]);
  const archiveButtonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (headlineRef.current) {
      headlineTween.current = gsap.to(headlineRef.current, {
        xPercent: -50,
        ease: "none",
        duration: 30,
        repeat: -1
      });
    }

    // Scene entrance
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: "#projects",
        start: "top 60%",
        once: true,
        onEnter: () => {
          gsap.fromTo(cardsRef.current, 
            { 
              y: -200, 
              opacity: 0,
              rotation: () => (Math.random() - 0.5) * 20,
              scale: 1.1
            },
            {
              y: 0,
              opacity: 1,
              rotation: (i) => isMobile ? MOBILE_POSITIONS[i].rotate : DESKTOP_POSITIONS[i].rotate,
              scale: 1,
              duration: 1.2,
              stagger: 0.15,
              ease: "back.out(1.2)",
              onComplete: () => {
                // Start ambient motion after drop
                cardsRef.current.forEach((card, i) => {
                  if (card) {
                    const ambientWrapper = card.querySelector('.ambient-wrapper');
                    if (ambientWrapper) {
                      gsap.to(ambientWrapper, {
                        y: i % 2 === 0 ? 6 : -6,
                        rotation: i % 2 === 0 ? 1 : -1,
                        duration: 3 + i * 0.5,
                        yoyo: true,
                        repeat: -1,
                        ease: "sine.inOut",
                      });
                    }
                  }
                });
              }
            }
          );
        }
      });
      // Archive button visibility trigger
      if (archiveButtonRef.current) {
        gsap.set(archiveButtonRef.current, { x: 100, opacity: 0 });
        
        ScrollTrigger.create({
          trigger: "#projects",
          start: "top 20%",
          end: "bottom 80%",
          onEnter: () => gsap.to(archiveButtonRef.current, { x: 0, opacity: 1, duration: 0.6, ease: "power3.out" }),
          onLeave: () => gsap.to(archiveButtonRef.current, { x: 100, opacity: 0, duration: 0.4, ease: "power3.in" }),
          onEnterBack: () => gsap.to(archiveButtonRef.current, { x: 0, opacity: 1, duration: 0.6, ease: "power3.out" }),
          onLeaveBack: () => gsap.to(archiveButtonRef.current, { x: 100, opacity: 0, duration: 0.4, ease: "power3.in" }),
        });
      }
    });

    return () => ctx.revert();
  }, [isMobile]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const mouseX = e.clientX;
    const mouseY = e.clientY;

    cardsRef.current.forEach((card, index) => {
      if (!card || hoveredIndex === index) return;

      const rect = card.getBoundingClientRect();
      const cardCenterX = rect.left + rect.width / 2;
      const cardCenterY = rect.top + rect.height / 2;

      const distX = cardCenterX - mouseX;
      const distY = cardCenterY - mouseY;
      const distance = Math.sqrt(distX * distX + distY * distY);

      const maxDistance = 350;
      if (distance < maxDistance) {
        const force = Math.pow((maxDistance - distance) / maxDistance, 2);
        const pushX = (distX / distance) * force * 40;
        const pushY = (distY / distance) * force * 40;
        const pushRotate = (distX / distance) * force * 8;

        const baseRotate = isMobile ? MOBILE_POSITIONS[index].rotate : DESKTOP_POSITIONS[index].rotate;

        gsap.to(card, {
          x: pushX,
          y: pushY,
          rotation: baseRotate + pushRotate,
          duration: 0.4,
          ease: 'power2.out',
          overwrite: 'auto'
        });
      } else {
        const baseRotate = isMobile ? MOBILE_POSITIONS[index].rotate : DESKTOP_POSITIONS[index].rotate;
        gsap.to(card, {
          x: 0,
          y: 0,
          rotation: baseRotate,
          duration: 0.8,
          ease: 'power2.out',
          overwrite: 'auto'
        });
      }
    });
  };

  const handleMouseEnter = (index: number) => {
    setHoveredIndex(index);
    const card = cardsRef.current[index];
    if (!card) return;
    
    cardsRef.current.forEach((c, i) => {
      if (c) c.style.zIndex = i === index ? '50' : '10';
    });

    gsap.to(card, {
      scale: 1.04,
      rotation: 0,
      x: 0,
      y: 0,
      duration: 0.4,
      ease: 'power2.out',
      overwrite: 'auto'
    });
  };

  const handleMouseLeave = (index: number) => {
    setHoveredIndex(null);
    const card = cardsRef.current[index];
    if (!card) return;

    gsap.to(card, {
      scale: 1,
      rotation: isMobile ? MOBILE_POSITIONS[index].rotate : DESKTOP_POSITIONS[index].rotate,
      duration: 0.6,
      ease: 'power2.out',
      overwrite: 'auto'
    });
  };

  const handleProjectClick = (project: typeof PROJECTS[0], index: number) => {
    const card = cardsRef.current[index];
    if (!card) return;
    
    const imageEl = card.querySelector('.project-image') as HTMLElement;
    const rect = imageEl.getBoundingClientRect();
    
    setSourceRect(rect);
    setActiveProject(project);
    
    // Lock body scroll
    document.body.style.overflow = 'hidden';
  };

  useEffect(() => {
    if (activeProject && sourceRect && caseStudyRef.current && heroImageRef.current && contentRef.current) {
      // Set initial state
      gsap.set(caseStudyRef.current, {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 100,
        display: 'block',
        backgroundColor: 'transparent',
      });

      gsap.set(heroImageRef.current, {
        position: 'absolute',
        top: sourceRect.top,
        left: sourceRect.left,
        width: sourceRect.width,
        height: sourceRect.height,
        borderRadius: '12px',
        objectFit: 'cover',
      });

      gsap.set([contentRef.current, scrollIndicatorRef.current], {
        opacity: 0,
        y: 40,
      });

      gsap.set(closeBtnRef.current, {
        opacity: 0,
        scale: 0.8,
      });

      // Animate to fullscreen
      const tl = gsap.timeline({
        onComplete: () => setIsExpanded(true)
      });

      // Background fade
      tl.to(caseStudyRef.current, {
        backgroundColor: '#F6F3EE',
        duration: 0.8,
        ease: 'power3.inOut',
      }, 0);

      // Image expansion
      tl.to(heroImageRef.current, {
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        borderRadius: '0px',
        duration: 0.9,
        ease: 'power4.inOut',
      }, 0);

      // Content fade in
      tl.to([contentRef.current, scrollIndicatorRef.current], {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.2,
      }, 0.5);

      // Close button
      tl.to(closeBtnRef.current, {
        opacity: 1,
        scale: 1,
        duration: 0.4,
        ease: 'back.out(1.5)',
      }, 0.6);
    }
  }, [activeProject, sourceRect]);

  const handleClose = () => {
    if (!sourceRect || !caseStudyRef.current || !heroImageRef.current || !contentRef.current) return;

    const tl = gsap.timeline({
      onComplete: () => {
        setActiveProject(null);
        setIsExpanded(false);
        document.body.style.overflow = '';
      }
    });

    // Content fade out
    tl.to([contentRef.current, scrollIndicatorRef.current], {
      opacity: 0,
      y: 40,
      duration: 0.4,
      ease: 'power2.in',
    }, 0);

    tl.to(closeBtnRef.current, {
      opacity: 0,
      scale: 0.8,
      duration: 0.3,
    }, 0);

    // Image collapse
    tl.to(heroImageRef.current, {
      top: sourceRect.top,
      left: sourceRect.left,
      width: sourceRect.width,
      height: sourceRect.height,
      borderRadius: '12px',
      duration: 0.8,
      ease: 'power4.inOut',
    }, 0.2);

    // Background fade out
    tl.to(caseStudyRef.current, {
      backgroundColor: 'transparent',
      duration: 0.8,
      ease: 'power3.inOut',
    }, 0.2);
  };

  // Parallax effect for hero image on scroll
  useEffect(() => {
    if (isExpanded && caseStudyRef.current && heroImageRef.current) {
      const handleScroll = () => {
        const scrollY = caseStudyRef.current?.scrollTop || 0;
        if (heroImageRef.current) {
          gsap.to(heroImageRef.current, {
            y: scrollY * 0.5,
            duration: 0,
          });
        }
        
        // Gallery Horizontal Scroll
        if (galleryContainerRef.current && galleryWrapperRef.current) {
          const containerRect = galleryContainerRef.current.getBoundingClientRect();
          const windowHeight = window.innerHeight;
          
          // Check if container is in view
          if (containerRect.top <= windowHeight && containerRect.bottom >= 0) {
            // Calculate progress (0 to 1)
            const scrollDistance = containerRect.height - windowHeight;
            const scrollProgress = Math.max(0, Math.min(1, -containerRect.top / scrollDistance));
            
            // Calculate max translation
            const wrapperWidth = galleryWrapperRef.current.scrollWidth;
            const maxTranslate = wrapperWidth - window.innerWidth + 48; // 48px for padding
            
            gsap.to(galleryWrapperRef.current, {
              x: -maxTranslate * scrollProgress,
              duration: 0.1,
              ease: 'none'
            });
          }
        }

        // Metrics Animation
        metricsRef.current.forEach((metricEl, index) => {
          if (metricEl && !metricEl.dataset.animated) {
            const rect = metricEl.getBoundingClientRect();
            if (rect.top < window.innerHeight * 0.8) {
              metricEl.dataset.animated = 'true';
              const valueEl = metricEl.querySelector('.metric-value');
              const targetValue = parseFloat(metricEl.dataset.value || '0');
              
              gsap.to({ val: 0 }, {
                val: targetValue,
                duration: 2,
                ease: 'power3.out',
                onUpdate: function() {
                  if (valueEl) {
                    valueEl.innerHTML = Math.round(this.targets()[0].val).toString();
                  }
                }
              });
              
              gsap.fromTo(metricEl, 
                { opacity: 0, y: 30 },
                { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', delay: index * 0.1 }
              );
            }
          }
        });
      };

      const container = caseStudyRef.current;
      container.addEventListener('scroll', handleScroll);
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, [isExpanded]);

  const openCaseStudyFromArchive = (project: any) => {
    setActiveProject(project);
    setIsExpanded(true);
    
    // Slight delay to allow DOM nodes to mount
    setTimeout(() => {
      if (caseStudyRef.current && contentRef.current && heroImageRef.current && closeBtnRef.current) {
        // Force the layout to full screen instantly (bypassing the math from floating cards)
        gsap.set(caseStudyRef.current, {
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          zIndex: 100,
          display: 'block',
          backgroundColor: '#F6F3EE',
        });
        
        gsap.set(heroImageRef.current, {
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          borderRadius: '0px',
          objectFit: 'cover',
        });

        gsap.set([contentRef.current, scrollIndicatorRef.current], {
          opacity: 0,
          y: 40,
        });

        gsap.set(closeBtnRef.current, {
          opacity: 0,
          scale: 0.8,
        });

        // Simple fade in animation
        const tl = gsap.timeline();
        tl.to([contentRef.current, scrollIndicatorRef.current], {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          stagger: 0.2,
        });

        tl.to(closeBtnRef.current, {
          opacity: 1,
          scale: 1,
          duration: 0.4,
          ease: 'back.out(1.5)',
        }, "-=0.4");

        document.body.style.overflow = 'hidden';
      }
    }, 50);
  };

  return (
    <section 
      className="relative w-full bg-[#F6F3EE] text-[#1C1C1C] py-32 overflow-hidden min-h-[220vh] md:min-h-[180vh] flex flex-col" 
      id="projects"
      onMouseMove={handleMouseMove}
      ref={containerRef}
    >
      {/* Soft vignette shadow */}
      <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_150px_rgba(0,0,0,0.05)] z-20"></div>

      {/* Revolving Headline */}
      <div className="absolute top-1/2 -translate-y-1/2 left-0 w-full overflow-hidden pointer-events-none z-0 flex opacity-[0.05]">
        <div ref={headlineRef} className="whitespace-nowrap text-[300px] md:text-[400px] font-medium tracking-tighter text-black flex leading-none" style={{ letterSpacing: '-0.05em' }}>
          <span>SELECTED WORK&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;SELECTED WORK&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;SELECTED WORK&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
          <span>SELECTED WORK&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;SELECTED WORK&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;SELECTED WORK&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
        </div>
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-24 mb-12">
        <h2 className="text-5xl md:text-7xl font-medium tracking-tight">Selected Works</h2>
      </div>
      
      <div className="relative w-full flex-1 max-w-7xl mx-auto">
        {PROJECTS.map((project, index) => (
          <div 
            key={project.id}
            ref={el => cardsRef.current[index] = el}
            className="absolute cursor-pointer will-change-transform opacity-0"
            style={{
              top: isMobile ? MOBILE_POSITIONS[index].top : DESKTOP_POSITIONS[index].top,
              left: isMobile ? MOBILE_POSITIONS[index].left : DESKTOP_POSITIONS[index].left,
              right: isMobile ? MOBILE_POSITIONS[index].right : DESKTOP_POSITIONS[index].right,
              zIndex: hoveredIndex === index ? 50 : 10,
            }}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={() => handleMouseLeave(index)}
            onClick={() => handleProjectClick(project, index)}
          >
            <div className="ambient-wrapper will-change-transform">
              <div className="project-card group bg-[#ECE7DF] p-4 md:p-6 rounded-2xl shadow-[0_10px_30px_-10px_rgba(0,0,0,0.15)] w-[85vw] md:w-[420px] lg:w-[480px] border border-white/40 relative overflow-hidden transition-shadow duration-500 hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)]">
                {/* Paper texture overlay */}
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-multiply" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/paper-fibers.png")' }}></div>
                
                <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden bg-neutral-200 mb-6">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="project-image w-full h-full object-cover origin-center"
                  />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                    <span className="px-6 py-3 rounded-full bg-white/20 backdrop-blur-md text-white text-sm font-medium tracking-wider uppercase border border-white/30 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                      View Case Study →
                    </span>
                  </div>
                </div>
                
                <div className="flex flex-col gap-3 relative z-10">
                  <div className="flex justify-between items-start">
                    <h3 className="text-2xl md:text-3xl font-medium leading-tight text-[#1C1C1C] pr-4">{project.title}</h3>
                    <div className="flex items-center gap-2 shrink-0">
                      {project.github && project.github !== '#' && (
                        <a href={project.github} target="_blank" rel="noopener noreferrer" className="p-2 md:p-2.5 rounded-full bg-black/5 hover:bg-[#B45309] text-[#1C1C1C]/60 hover:text-white transition-all duration-300 pointer-events-auto" onClick={(e) => e.stopPropagation()}>
                          <Github size={18} />
                        </a>
                      )}
                      {project.live && project.live !== '#' && (
                        <a href={project.live} target="_blank" rel="noopener noreferrer" className="p-2 md:p-2.5 rounded-full bg-black/5 hover:bg-[#B45309] text-[#1C1C1C]/60 hover:text-white transition-all duration-300 pointer-events-auto" onClick={(e) => e.stopPropagation()}>
                          <ExternalLink size={18} />
                        </a>
                      )}
                    </div>
                  </div>
                  <p className="text-[#1C1C1C]/70 text-base md:text-lg leading-relaxed">{project.shortDesc}</p>
                  <div className="text-xs md:text-sm font-mono text-[#B45309] mt-2 uppercase tracking-wider font-semibold">
                    {project.stack}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Static Archive Button - Cinematic Side Tab */}
      <div 
        ref={archiveButtonRef}
        className="fixed bottom-24 right-0 z-50 opacity-0 transition-opacity duration-700 ease-[0.16,1,0.3,1]"
      >
        <button 
          onClick={() => setShowArchive(true)}
          className="group flex items-center gap-6 px-10 py-5 bg-[#1C1C1C] text-[#F6F3EE] shadow-[0_20px_40px_rgba(0,0,0,0.3)] hover:bg-[#B45309] transition-all duration-500 rounded-l-full -rotate-90 origin-center whitespace-nowrap border-l border-white/10"
        >
          <span className="font-bold tracking-[0.3em] uppercase text-xs">View Project Archive</span>
          <ArrowRight className="w-5 h-5 -rotate-90 group-hover:translate-y-2 transition-transform duration-500" />
        </button>
      </div>

      <AnimatePresence>
        {showArchive && <AllProjectsSection onClose={() => setShowArchive(false)} onProjectClick={(p) => { setShowArchive(false); openCaseStudyFromArchive(p); }} />}
      </AnimatePresence>

      {/* Case Study Overlay */}
      <div 
        ref={caseStudyRef}
        className="fixed inset-0 hidden overflow-y-auto overflow-x-hidden pt-0"
        style={{ zIndex: 100 }}
        data-lenis-prevent="true"
      >
        {activeProject && (
          <>
            {/* Hero Image */}
            <div className="relative w-full h-[100vh] overflow-hidden">
              <img 
                ref={heroImageRef}
                src={activeProject.image} 
                alt={activeProject.title}
                className="absolute top-0 left-0 w-full h-full object-cover"
              />
              
              {/* Scroll Indicator */}
              <div ref={scrollIndicatorRef} className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-60">
                <span className="text-xs uppercase tracking-widest text-white">Scroll</span>
                <div className="w-[1px] h-12 bg-white/50 overflow-hidden">
                  <div className="w-full h-full bg-white origin-top animate-[scrollLine_2s_ease-in-out_infinite]" />
                </div>
              </div>
            </div>

            {/* Close Button */}
            <button 
              ref={closeBtnRef}
              onClick={handleClose}
              className="fixed top-8 right-8 z-[110] w-14 h-14 rounded-full bg-black/50 backdrop-blur-md border border-white/10 text-white flex items-center justify-center hover:bg-white hover:text-black transition-colors duration-300"
            >
              <X size={24} />
            </button>

            {/* Content */}
            <div className="relative z-10 bg-[#F6F3EE] min-h-screen text-[#1C1C1C]">
              <div ref={contentRef} className="max-w-7xl mx-auto px-6 py-32 md:py-48">
                {/* Intro */}
                <div className="mb-32">
                  <h1 className="text-6xl md:text-8xl font-medium tracking-tight mb-8">
                    {activeProject.title}
                  </h1>

                  <div className="flex flex-wrap gap-4 mb-16">
                    {activeProject.github && activeProject.github !== '#' && (
                      <a href={activeProject.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 px-8 py-4 rounded-full bg-black text-white hover:bg-[#B45309] transition-colors font-medium">
                        <Github size={20} />
                        View Source
                      </a>
                    )}
                    {activeProject.live && activeProject.live !== '#' && (
                      <a href={activeProject.live} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 px-8 py-4 rounded-full bg-black/5 text-black hover:bg-black/10 transition-colors font-medium">
                        <ExternalLink size={20} />
                        Live Preview
                      </a>
                    )}
                  </div>
                  
                  <p className="text-2xl md:text-4xl text-neutral-600 leading-relaxed mb-24 max-w-4xl">
                    {activeProject.description}
                  </p>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-12 border-t border-black/10 pt-12">
                    <div>
                      <h4 className="text-sm uppercase tracking-widest text-neutral-500 mb-4">Role</h4>
                      <p className="text-xl text-black">{activeProject.role}</p>
                    </div>
                    <div>
                      <h4 className="text-sm uppercase tracking-widest text-neutral-500 mb-4">Stack</h4>
                      <p className="text-xl text-black">{activeProject.stack}</p>
                    </div>
                    <div>
                      <h4 className="text-sm uppercase tracking-widest text-neutral-500 mb-4">Year</h4>
                      <p className="text-xl text-black">{activeProject.year}</p>
                    </div>
                  </div>
                </div>

                {/* Challenge & Solution */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-32 mb-48">
                  <div>
                    <h3 className="text-sm uppercase tracking-widest text-neutral-500 mb-8">The Challenge</h3>
                    <p className="text-2xl md:text-3xl leading-relaxed text-black/80">
                      {activeProject.challenge}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm uppercase tracking-widest text-neutral-500 mb-8">The Solution</h3>
                    <p className="text-2xl md:text-3xl leading-relaxed text-black/80">
                      {activeProject.solution}
                    </p>
                  </div>
                </div>

                {/* Metrics */}
                <div className="mb-48 border-y border-black/10 py-24">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
                    {activeProject.results.map((result, i) => (
                      <div 
                        key={i} 
                        ref={el => metricsRef.current[i] = el}
                        data-value={result.value}
                        className="opacity-0 translate-y-8"
                      >
                        <div className="text-7xl md:text-8xl font-medium tracking-tighter mb-4 flex items-baseline">
                          <span className="metric-value">0</span>
                          <span className="text-4xl md:text-5xl ml-1 text-black/40">{result.suffix}</span>
                        </div>
                        <p className="text-xl text-neutral-600 uppercase tracking-wider">{result.label}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Features */}
                <div className="mb-48">
                  <h3 className="text-sm uppercase tracking-widest text-neutral-500 mb-16">Key Features</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    {activeProject.features.map((feature, i) => (
                      <div key={i} className="bg-white/50 p-8 rounded-2xl border border-black/5">
                        <h4 className="text-2xl font-medium mb-4 text-black text-black">{feature.title}</h4>
                        <p className="text-neutral-600 leading-relaxed">{feature.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Horizontal Gallery */}
              <div 
                ref={galleryContainerRef} 
                className="h-[300vh] relative w-full"
              >
                <div className="sticky top-0 h-screen flex items-center overflow-hidden bg-[#0E0F14]">
                  <div ref={galleryWrapperRef} className="flex gap-8 px-6 md:px-24 w-max">
                    {activeProject.gallery.map((img, i) => (
                      <div key={i} className="w-[80vw] md:w-[60vw] aspect-[16/9] rounded-2xl overflow-hidden shrink-0">
                        <img src={img} alt={`${activeProject.title} gallery ${i + 1}`} className="w-full h-full object-cover" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Next Project CTA */}
              <div className="py-48 px-6 text-center cursor-pointer group" onClick={() => {
                const currentIndex = PROJECTS.findIndex(p => p.id === activeProject.id);
                const nextIndex = (currentIndex + 1) % PROJECTS.length;
                
                // Reset scroll
                if (caseStudyRef.current) {
                  gsap.to(caseStudyRef.current, {
                    scrollTop: 0,
                    duration: 1,
                    ease: 'power3.inOut',
                    onComplete: () => {
                      // Reset metrics
                      metricsRef.current.forEach(el => {
                        if (el) {
                          el.dataset.animated = 'false';
                          gsap.set(el, { opacity: 0, y: 30 });
                        }
                      });
                      setActiveProject(PROJECTS[nextIndex]);
                    }
                  });
                }
              }}>
                <h4 className="text-sm uppercase tracking-widest text-neutral-500 mb-8">Next Project</h4>
                <h2 className="text-6xl md:text-9xl font-medium tracking-tighter group-hover:scale-105 transition-transform duration-500 text-black">
                  {PROJECTS[(PROJECTS.findIndex(p => p.id === activeProject.id) + 1) % PROJECTS.length].title}
                </h2>
                <div className="mt-12 flex justify-center">
                  <div className="inline-flex items-center gap-4 text-2xl md:text-4xl font-medium text-neutral-400 group-hover:text-black transition-colors duration-300">
                    <span>Next Project</span>
                    <ArrowRight className="w-8 h-8 md:w-10 md:h-10 group-hover:translate-x-4 transition-transform duration-300" />
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      <style>{`
        @keyframes scrollLine {
          0% { transform: translateY(-100%); }
          50% { transform: translateY(0); }
          100% { transform: translateY(100%); }
        }
      `}</style>
    </section>
  );
}
