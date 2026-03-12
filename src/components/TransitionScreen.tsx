import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function TransitionScreen() {
  const [isActive, setIsActive] = useState(false);
  const [sectionName, setSectionName] = useState('');

  useEffect(() => {
    const handleTransition = (e: CustomEvent) => {
      setSectionName(e.detail.name);
      setIsActive(true);

      setTimeout(() => {
        const target = document.getElementById(e.detail.target);
        if (target) {
          (window as any).lenis?.scrollTo(target, { immediate: true });
        }
      }, 600);

      setTimeout(() => {
        setIsActive(false);
      }, 1200);
    };

    window.addEventListener('trigger-transition', handleTransition as EventListener);
    return () => window.removeEventListener('trigger-transition', handleTransition as EventListener);
  }, []);

  return (
    <AnimatePresence>
      {isActive && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="fixed inset-0 z-[999] bg-[#1a1a1a] flex items-center justify-center"
        >
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            className="flex items-center gap-4 text-[#e5e5e5]"
          >
            <div className="w-2.5 h-2.5 rounded-full bg-[#e5e5e5]" />
            <h2 className="text-4xl md:text-6xl font-medium tracking-tight">
              {sectionName}
            </h2>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
