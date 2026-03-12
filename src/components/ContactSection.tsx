import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Check } from 'lucide-react';
import emailjs from '@emailjs/browser';
import gsap from 'gsap';

export default function ContactSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);

  const [isHovered, setIsHovered] = useState(false);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    org: '',
    services: '',
    budget: '',
    timeline: '',
    message: ''
  });

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [buttonPos, setButtonPos] = useState({ x: 0, y: 0 });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"]
  });

  const bgDarken = useTransform(scrollYProgress, [0, 0.5], ["#9a9a9a", "#0a0a0a"]);
  const textOpacity = useTransform(scrollYProgress, [0.2, 0.8], [0, 0.05]);
  const textY = useTransform(scrollYProgress, [0.2, 0.8], [100, 0]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });

      if (buttonRef.current && !isFormVisible) {
        const rect = buttonRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const distanceX = e.clientX - centerX;
        const distanceY = e.clientY - centerY;
        const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

        if (distance < 150) {
          setButtonPos({
            x: distanceX * 0.2,
            y: distanceY * 0.2
          });
        } else {
          setButtonPos({ x: 0, y: 0 });
        }
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isFormVisible]);

  useEffect(() => {
    if (marqueeRef.current) {
      gsap.to(marqueeRef.current, {
        xPercent: -50,
        repeat: -1,
        duration: 20,
        ease: "none",
      });
    }
  }, []);

  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleGetInTouch = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setIsFormVisible(true);
    }, 800);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);

    try {
      await emailjs.send(
        process.env.EMAILJS_SERVICE_ID!,
        process.env.EMAILJS_TEMPLATE_ID!,
        {
          from_name: formData.name,
          reply_to: formData.email,
          org: formData.org,
          services: formData.services,
          message: formData.message,
          budget: formData.budget,
          timeline: formData.timeline,
          submitted_at: new Date().toLocaleString(),
        },
        process.env.EMAILJS_PUBLIC_KEY!
      );
      setIsSubmitted(true);
    } catch (error) {
      console.error('Failed to send email:', error);
      alert('Failed to send message. Please try again.');
    } finally {
      setIsSending(false);
    }
  };

  const scrollToTop = () => {
    (window as any).lenis?.scrollTo(0);
  };

  return (
    <motion.section
      ref={containerRef}
      className="relative w-full min-h-screen overflow-hidden text-white"
      style={{ backgroundColor: bgDarken }}
    >
      {/* Ambient Motion Background */}
      <div className="absolute inset-0 pointer-events-none opacity-5">
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500 rounded-full blur-[100px]"
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
            scale: [1, 1.2, 1]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-purple-500 rounded-full blur-[120px]"
          animate={{
            x: [0, -100, 0],
            y: [0, 50, 0],
            scale: [1, 1.5, 1]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at center, white 1px, transparent 1px)', backgroundSize: '40px 40px', opacity: 0.2 }} />
      </div>

      {/* Giant Background Typography */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden"
        style={{ opacity: textOpacity, y: textY }}
      >
        <h1 className="text-[20vw] md:text-[15vw] font-bold leading-[0.8] tracking-[-0.03em] text-center whitespace-nowrap">
          LET'S BUILD<br />SOMETHING<br />TOGETHER
        </h1>
      </motion.div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-32 min-h-screen flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">

          {/* Left Side: CTA */}
          <div className="flex flex-col items-start relative">
            <h2 className="text-5xl md:text-7xl font-medium tracking-tight mb-16 leading-tight">
              LET'S START<br />A PROJECT<br />TOGETHER
            </h2>

            {/* Floating Profile Element */}
            <motion.div
              className="absolute top-0 right-0 md:right-20 w-12 h-12 md:w-16 md:h-16 rounded-full overflow-hidden border border-white/20 bg-[#1C1C1C]"
              whileHover={{ rotate: 15, scale: 1.1 }}
            >
              <img src="/profile.png" alt="Rachit Profile" className="w-full h-full object-cover object-top" />
            </motion.div>

            {/* Giant CTA Button */}
            <div className="relative w-[200px] h-[200px] flex items-center justify-center">
              <AnimatePresence>
                {!isFormVisible && (
                  <motion.button
                    ref={buttonRef}
                    onClick={handleGetInTouch}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    className="absolute w-[180px] h-[180px] rounded-full bg-[#4A63F3] text-white font-medium text-lg flex items-center justify-center shadow-[0_0_40px_rgba(74,99,243,0.3)] z-20"
                    animate={{
                      x: isTransitioning ? 0 : buttonPos.x,
                      y: isTransitioning ? 0 : buttonPos.y,
                      scale: isTransitioning ? 50 : isHovered ? 1.1 : 1,
                      backgroundColor: isTransitioning ? "#0a0a0a" : "#4A63F3",
                    }}
                    transition={{
                      type: isTransitioning ? "tween" : "spring",
                      stiffness: 150,
                      damping: 15,
                      mass: 0.5,
                      duration: isTransitioning ? 0.8 : undefined,
                      ease: isTransitioning ? "easeInOut" : undefined
                    }}
                  >
                    <motion.span
                      animate={{ x: isHovered ? 5 : 0, opacity: isTransitioning ? 0 : 1 }}
                      className="flex items-center gap-2"
                    >
                      Get in touch <ArrowUpRight size={20} />
                    </motion.span>
                  </motion.button>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Right Side: Form & Details */}
          <div className="relative min-h-[600px] flex flex-col justify-center">
            <AnimatePresence>
              {isFormVisible && !isSubmitted && (
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="w-full max-w-md"
                >
                  <form onSubmit={handleSubmit} className="flex flex-col gap-8">
                    {[
                      { id: 'name', label: "01 What's your name?", type: 'text' },
                      { id: 'email', label: "02 What's your email?", type: 'email' },
                      { id: 'org', label: "03 Organization name", type: 'text' },
                      { id: 'services', label: "04 What services are you looking for?", type: 'text' },
                      { id: 'budget', label: "05 Estimated budget", type: 'text' },
                      { id: 'timeline', label: "06 Project timeline", type: 'text' }
                    ].map((field) => (
                      <div key={field.id} className="relative group">
                        <motion.label
                          htmlFor={field.id}
                          className="absolute left-0 text-white/50 pointer-events-none transition-all duration-300"
                          animate={{
                            y: focusedField === field.id || formData[field.id as keyof typeof formData] ? -24 : 0,
                            fontSize: focusedField === field.id || formData[field.id as keyof typeof formData] ? '12px' : '16px',
                            color: focusedField === field.id ? '#fff' : 'rgba(255,255,255,0.5)'
                          }}
                        >
                          {field.label}
                        </motion.label>
                        <input
                          type={field.type}
                          id={field.id}
                          value={formData[field.id as keyof typeof formData]}
                          onChange={(e) => setFormData({ ...formData, [field.id]: e.target.value })}
                          onFocus={() => setFocusedField(field.id)}
                          onBlur={() => setFocusedField(null)}
                          className="w-full bg-transparent border-b border-white/20 py-2 text-white outline-none focus:border-transparent transition-colors"
                          required
                        />
                        <motion.div
                          className="absolute bottom-0 left-0 h-[1px] bg-white origin-left"
                          initial={{ scaleX: 0 }}
                          animate={{ scaleX: focusedField === field.id ? 1 : 0 }}
                          transition={{ duration: 0.3 }}
                          style={{ width: '100%' }}
                        />
                      </div>
                    ))}

                    <div className="relative group mt-4">
                      <motion.label
                        htmlFor="message"
                        className="absolute left-0 text-white/50 pointer-events-none transition-all duration-300"
                        animate={{
                          y: focusedField === 'message' || formData.message ? -24 : 0,
                          fontSize: focusedField === 'message' || formData.message ? '12px' : '16px',
                          color: focusedField === 'message' ? '#fff' : 'rgba(255,255,255,0.5)'
                        }}
                      >
                        05 Message
                      </motion.label>
                      <textarea
                        id="message"
                        rows={4}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        onFocus={() => setFocusedField('message')}
                        onBlur={() => setFocusedField(null)}
                        className="w-full bg-transparent border-b border-white/20 py-2 text-white outline-none focus:border-transparent transition-colors resize-none"
                        required
                      />
                      <motion.div
                        className="absolute bottom-1 left-0 h-[1px] bg-white origin-left"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: focusedField === 'message' ? 1 : 0 }}
                        transition={{ duration: 0.3 }}
                        style={{ width: '100%' }}
                      />
                    </div>

                    <motion.button
                      type="submit"
                      disabled={isSending}
                      className="mt-8 w-full py-4 rounded-full bg-white text-black font-medium hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      whileHover={{ scale: isSending ? 1 : 1.02 }}
                      whileTap={{ scale: isSending ? 1 : 0.98 }}
                    >
                      {isSending ? 'Sending...' : 'Send Message'}
                    </motion.button>
                  </form>
                </motion.div>
              )}

              {isSubmitted && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center h-full text-center"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", delay: 0.2 }}
                    className="w-24 h-24 rounded-full bg-green-500 flex items-center justify-center mb-8"
                  >
                    <Check size={40} className="text-white" />
                  </motion.div>
                  <h3 className="text-3xl font-medium mb-4">Message sent.</h3>
                  <p className="text-white/60 text-lg">Let's build something amazing.</p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Business Details Block */}
            <motion.div
              className="mt-16 md:mt-24 pt-8 md:pt-12 border-t border-white/10 grid grid-cols-1 sm:grid-cols-2 gap-8 md:gap-12"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <div>
                <h4 className="text-white/40 text-sm uppercase tracking-widest mb-6">Contact Details</h4>
                <div className="flex flex-col gap-4">
                  <a href="mailto:kakkadrachit1@gmail.com" className="group relative w-fit hover:text-white transition-colors">
                    kakkadrachit1@gmail.com
                    <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-white transition-all duration-300 group-hover:w-full"></span>
                  </a>
                  <a href="tel:+918200250915" className="group relative w-fit hover:text-white transition-colors">
                    +918200250915
                    <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-white transition-all duration-300 group-hover:w-full"></span>
                  </a>
                </div>
              </div>
              <div>
                <h4 className="text-white/40 text-sm uppercase tracking-widest mb-6">Socials</h4>
                <div className="flex flex-col gap-4">
                  {[
                    { name: 'GitHub', url: 'https://github.com/Rachit-Kakkad1' },
                    { name: 'LinkedIn', url: 'https://www.linkedin.com/in/rachit-kakkad-r29052007k' },
                    { name: 'Twitter', url: 'https://x.com/rachit_kakk2957' }
                  ].map((social) => (
                    <a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group relative w-fit hover:text-white transition-colors"
                    >
                      {social.name}
                      <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-white transition-all duration-300 group-hover:w-full"></span>
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Exit Interaction */}
      <div className="absolute bottom-6 right-6 md:bottom-12 md:right-12 z-20">
        <button
          onClick={scrollToTop}
          className="text-white/50 hover:text-white transition-colors flex items-center gap-2 text-sm uppercase tracking-widest"
        >
          Back to top <ArrowUpRight size={16} className="rotate-[-45deg]" />
        </button>
      </div>

      {/* Reversed Marquee */}
      <div className="absolute bottom-[2vh] left-0 w-full whitespace-nowrap text-[10vw] leading-none text-white/10 font-medium z-0 pointer-events-none flex items-end overflow-hidden" style={{ letterSpacing: '-0.06em' }}>
        <div ref={marqueeRef} className="flex w-max">
          <span className="inline-block pr-[4vw]">Let's build something great — Let's build something great —</span>
          <span className="inline-block pr-[4vw]">Let's build something great — Let's build something great —</span>
        </div>
      </div>
    </motion.section>
  );
}
