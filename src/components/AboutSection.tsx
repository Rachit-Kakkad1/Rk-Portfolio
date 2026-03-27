import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, AnimatePresence } from 'framer-motion';

gsap.registerPlugin(ScrollTrigger);

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const bgTextRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(contentRef.current, { opacity: 0, y: 30 });
      gsap.set(bgTextRef.current, { opacity: 0 });

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 70%",
        onEnter: () => {
          gsap.to(bgTextRef.current, { opacity: 0.03, scale: 1, duration: 1.5, ease: "power2.out" });
          gsap.to(contentRef.current, { opacity: 1, y: 0, duration: 1, ease: "power3.out" });
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full min-h-screen py-24 bg-[#F6F3EE] overflow-hidden flex items-center justify-center">

      {/* Background Typography */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
        <h2
          ref={bgTextRef}
          className="text-[80px] md:text-[120px] font-black leading-[0.85] text-black select-none text-center tracking-tighter uppercase"
        >
          ABOUT<br />ME
        </h2>
      </div>

      {/* Main Content */}
      <div ref={contentRef} className="relative z-10 w-full max-w-6xl mx-auto px-6 h-full flex items-center justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center w-full">

          {/* Portrait with Stacked Image Gallery */}
          <div className="relative aspect-[4/5] h-full max-h-[60vh] isolate pointer-events-auto">
            <StackedImageGallery />
          </div>

          {/* Bio + Highlights */}
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-3">
              <span className="text-[#B45309] font-mono tracking-[0.3em] uppercase text-xs font-bold">Who I Am</span>
              <h2 className="text-3xl md:text-5xl font-black tracking-tight leading-tight">
                BEYOND<br /><span className="text-[#B45309]">THE CODE</span>
              </h2>
            </div>

            <div className="flex flex-col gap-4 text-black/70 font-medium text-sm md:text-base leading-relaxed">
              <p>
                I'm Rachit Kakkad — a full-stack developer and AI engineer based in Gandhinagar, India. I've built 25+ applications and shipped 10+ production-ready systems using React, Node.js, and Python — from blockchain certification platforms to AI-powered analytics engines.
              </p>
              <p>
                Currently pursuing B.Tech in Computer Engineering (CGPA: 9.3) while shipping real products. I focus on building systems that are both technically sound and visually exceptional.
              </p>
            </div>

            {/* Key Highlights */}
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="bg-white/60 border border-black/5 rounded-xl p-4">
                <div className="text-2xl font-black text-[#B45309]">25+</div>
                <div className="text-xs font-medium text-black/50 mt-1">Projects Built</div>
              </div>
              <div className="bg-white/60 border border-black/5 rounded-xl p-4">
                <div className="text-2xl font-black text-[#B45309]">10+</div>
                <div className="text-xs font-medium text-black/50 mt-1">Projects Shipped</div>
              </div>
              <div className="bg-white/60 border border-black/5 rounded-xl p-4">
                <div className="text-2xl font-black text-[#B45309]">6</div>
                <div className="text-xs font-medium text-black/50 mt-1">IIT Hackathons</div>
              </div>
              <div className="bg-white/60 border border-black/5 rounded-xl p-4">
                <div className="text-2xl font-black text-[#B45309]">9.3</div>
                <div className="text-xs font-medium text-black/50 mt-1">CGPA (B.Tech)</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// =====================================
// STACKED IMAGE GALLERY COMPONENT
// =====================================

const GALLERY_IMAGES = [
  "/about/rachit-1.jpg",
  "/about/rachit-2.jpg",
  "/about/rachit-3.jpg",
];

function StackedImageGallery() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % GALLERY_IMAGES.length);
    }, 3500); // 3.5 seconds auto-rotate
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <AnimatePresence>
        {GALLERY_IMAGES.map((src, i) => {
          // Calculate relative position: 0 is front, 1 is next layer down, 2 is behind that, etc.
          const offset = (i - currentIndex + GALLERY_IMAGES.length) % GALLERY_IMAGES.length;
          const isFront = offset === 0;
          
          // Define card stacking metrics based on offset
          let y = offset * 25; // Stack downwards by 25px per layer
          let scale = 1 - offset * 0.06; // Shrink layers by 6% sequentially
          let zIndex = GALLERY_IMAGES.length - offset;
          let opacity = offset > 2 ? 0 : 1 - offset * 0.15; // Fade out layers further back
          
          // Adding a very subtle scattered rotation
          let rotateZ = offset === 0 ? 0 : offset === 1 ? -3 : offset === 2 ? 3 : 0;

          return (
            <motion.div
              key={src}
              className="absolute w-full h-full rounded-[2rem] overflow-hidden shadow-2xl bg-black flex items-center justify-center"
              initial={false}
              animate={{
                y,
                scale,
                zIndex,
                opacity,
                rotateZ,
              }}
              transition={{ duration: 0.85, ease: [0.165, 0.84, 0.44, 1] }}
              style={{ top: 0, left: 0 }}
            >
              <img src={src} alt={`Gallery image ${i + 1}`} className="w-full h-full object-cover" />
              
              {/* Overlay for depth perception on background cards */}
              {!isFront && <div className="absolute inset-0 bg-[#F6F3EE]/30 backdrop-blur-[2px]" />}
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
