import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const experiences = [
  {
    id: 1,
    date: "2025",
    title: "Entered Computer Science",
    description: "Started B.Tech in Computer Engineering at Swaminarayan University. Built strong foundations in C++, data structures, algorithms, and object-oriented programming.",
    deliverables: ["Data Structures in C++", "Algorithm Design", "OOP Fundamentals"],
    skills: ["C++", "Data Structures", "Algorithms"],
  },
  {
    id: 2,
    date: "2025",
    title: "Software Engineering Internship",
    description: "Joined a development team building production web applications. Shipped React components, implemented Git workflows, and contributed to code reviews across 3 projects.",
    deliverables: ["Built 12+ React components", "Established Git branching strategy", "Contributed to 3 client projects"],
    skills: ["React", "JavaScript", "Tailwind", "Git"],
  },
  {
    id: 3,
    date: "2026",
    title: "Full Stack Development — Freelance",
    description: "Built AgriCert (blockchain certification), ThreatLens (cybersecurity platform), and FleetFlow (logistics dashboard) as production-ready applications with real users.",
    deliverables: ["3 full-stack apps shipped", "Blockchain + AI integration", "Live deployments on Vercel"],
    skills: ["Node.js", "Express", "MongoDB", "REST APIs"],
  },
  {
    id: 4,
    date: "2026 — Present",
    title: "AI-Driven Engineering",
    description: "Building COS (Cognitive Operating System) with 8 local AI models, and LifeLens AI connecting wellness data with climate impact using Gemini AI.",
    deliverables: ["8 AI models running locally", "Gemini AI integration", "Cross-platform React Native app"],
    skills: ["Python", "FastAPI", "AI/ML", "System Design", "TypeScript"],
  },
];

export default function FreelanceExperience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const headerOpacity = useTransform(scrollYProgress, [0, 0.15], [0, 1]);

  return (
    <div ref={containerRef} className="relative w-full bg-[#F6F3EE] py-24 md:py-32 overflow-hidden">
      {/* Background Typography */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
        <h2 className="text-[10vw] md:text-[12vw] font-black tracking-tighter text-black opacity-[0.03] select-none whitespace-nowrap">
          EXPERIENCE
        </h2>
      </div>

      <motion.div
        className="relative z-10 max-w-4xl mx-auto px-6"
        style={{ opacity: headerOpacity }}
      >
        {/* Section Header */}
        <div className="flex flex-col gap-4 mb-16">
          <span className="text-[#B45309] font-mono tracking-[0.3em] uppercase text-xs font-bold">Professional Journey</span>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight">Freelance & Work</h2>
          <p className="text-black/50 max-w-xl text-base">
            From learning fundamentals to shipping production applications with real users.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-0 md:left-8 top-0 bottom-0 w-[2px] bg-black/10" />

          <div className="flex flex-col gap-12">
            {experiences.map((exp, index) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: index * 0.15, duration: 0.5 }}
                className="relative pl-8 md:pl-20"
              >
                {/* Timeline dot */}
                <div className="absolute left-0 md:left-8 top-2 w-3 h-3 -translate-x-[5px] rounded-full bg-[#B45309] border-2 border-[#F6F3EE]" />

                {/* Date badge */}
                <div className="text-sm font-mono text-[#B45309] mb-3 tracking-wider font-bold">{exp.date}</div>

                {/* Card */}
                <div className="bg-white/70 border border-black/5 rounded-2xl p-8 hover:bg-white/90 hover:shadow-lg transition-all duration-300 will-change-transform">
                  <h3 className="font-bold text-xl md:text-2xl mb-3 leading-tight text-gray-900">{exp.title}</h3>
                  <p className="text-sm md:text-base text-gray-600 leading-relaxed mb-6">{exp.description}</p>

                  {/* Deliverables */}
                  <div className="mb-6">
                    <span className="text-[10px] font-bold text-black/40 uppercase tracking-widest mb-2 block">Key Deliverables</span>
                    <ul className="flex flex-col gap-1.5">
                      {exp.deliverables.map((d, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                          <span className="text-[#B45309] mt-1">→</span>
                          {d}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2">
                    {exp.skills.map(skill => (
                      <span key={skill} className="px-3 py-1.5 bg-[#F6F3EE] text-gray-700 text-xs font-semibold rounded-lg border border-black/5">{skill}</span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
