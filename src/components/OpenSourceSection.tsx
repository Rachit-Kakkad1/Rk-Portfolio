import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, GitPullRequest, GitMerge, CheckCircle2, Shield, Zap, Code2, Layers, Lock } from 'lucide-react';
import { Github } from './Icons';

// ─── CONTRIBUTION DATA ───────────────────────────────────────────────────────

interface Contribution {
  repo: string;
  repoUrl: string;
  prUrl: string;
  prNumber: string;
  title: string;
  status: 'merged' | 'closed';
  focusAreas: string[];
  highlights: string[];
  labels?: string[];
  icon: React.ReactNode;
}

const CONTRIBUTIONS: Contribution[] = [
  {
    repo: 'iloveAgents',
    repoUrl: 'https://github.com/AditthyaSS/iloveAgents',
    prUrl: 'https://github.com/AditthyaSS/iloveAgents/pull/202',
    prNumber: '#202',
    title: 'fix: prevent frontend crashes from malformed AI responses in ScorecardOutput',
    status: 'merged',
    focusAreas: ['Security & Stability', 'Defensive Frontend', 'AI Response Hardening'],
    highlights: [
      'Prevented runtime crashes caused by malformed AI-generated JSON',
      'Added safer rendering and parsing checks',
      'Hardened ScorecardOutput rendering pipeline',
    ],
    labels: ['gssoc:approved', 'level:beginner', 'type:security'],
    icon: <Shield size={20} />,
  },
  {
    repo: 'iloveAgents',
    repoUrl: 'https://github.com/AditthyaSS/iloveAgents',
    prUrl: 'https://github.com/AditthyaSS/iloveAgents/pull/197',
    prNumber: '#197',
    title: '[GSSoC 2026] Fix navbar logo scroll-to-top behavior',
    status: 'closed',
    focusAreas: ['UX Improvement', 'Frontend Navigation'],
    highlights: [
      'Fixed navbar logo scroll behavior',
      'Improved navigation consistency',
      'Enhanced frontend interaction experience',
    ],
    icon: <Code2 size={20} />,
  },
  {
    repo: 'CommitPulse',
    repoUrl: 'https://github.com/JhaSourav07/commitpulse',
    prUrl: 'https://github.com/JhaSourav07/commitpulse/pull/186',
    prNumber: '#186',
    title: 'refactor(svg): centralize validation and sanitization for dynamic SVG params',
    status: 'merged',
    focusAreas: ['Security Engineering', 'Backend Validation', 'SVG Hardening'],
    highlights: [
      'Centralized SVG query parameter sanitization',
      'Built reusable validation infrastructure (hex, font, radius, speed)',
      'Prevented malformed interpolation/injection vectors',
      'Added extensive test coverage',
    ],
    icon: <Lock size={20} />,
  },
  {
    repo: 'CommitPulse',
    repoUrl: 'https://github.com/JhaSourav07/commitpulse',
    prUrl: 'https://github.com/JhaSourav07/commitpulse/pull/581',
    prNumber: '#581',
    title: 'feat(api): implement centralized API rate limiting middleware',
    status: 'merged',
    focusAreas: ['Infrastructure Engineering', 'API Protection', 'Backend Stability'],
    highlights: [
      'Added centralized API rate limiting middleware',
      'Protected GitHub API quota from abuse/exhaustion',
      'Implemented lightweight in-memory request tracking',
      'Added proper 429 handling and rate-limit headers',
    ],
    icon: <Zap size={20} />,
  },
];

// ─── COMPONENT ───────────────────────────────────────────────────────────────

export default function OpenSourceSection() {
  const mergedCount = CONTRIBUTIONS.filter(c => c.status === 'merged').length;

  return (
    <section
      className="relative min-h-[80vh] bg-[#FBF9F4] text-[#1A1816] overflow-hidden py-28 md:py-40 selection:bg-[#B45309] selection:text-[#FBF9F4]"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      {/* Paper Texture Noise */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.04] mix-blend-multiply z-0">
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <filter id="oss-noise">
            <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="3" stitchTiles="stitch" />
          </filter>
          <rect width="100%" height="100%" filter="url(#oss-noise)" />
        </svg>
      </div>

      {/* Editorial Grid Lines */}
      <div className="absolute inset-0 pointer-events-none z-0 opacity-[0.06]">
        <div className="h-full w-px bg-[#1A1816] absolute left-[5%]" />
        <div className="h-full w-px bg-[#1A1816] absolute left-[50%] hidden lg:block" />
        <div className="h-full w-px bg-[#1A1816] absolute right-[5%]" />
      </div>

      <div className="max-w-[1600px] mx-auto px-6 md:px-16 relative z-10">

        {/* Newspaper Style Section Masthead */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 border-t-4 border-b-2 border-[#1A1816] py-6 flex flex-col items-center justify-center text-center"
        >
          <div className="flex items-center gap-12 mb-2">
            <div className="hidden lg:block h-px w-32 bg-[#1A1816]/20" />
            <span className="font-mono text-[10px] md:text-xs font-black tracking-[0.6em] uppercase text-[#1A1816]">
              COMMUNITY & COLLABORATION
            </span>
            <div className="hidden lg:block h-px w-32 bg-[#1A1816]/20" />
          </div>
          <h2
            className="text-[clamp(2.5rem,6vw,5.5rem)] font-black uppercase leading-[0.85] tracking-tighter text-[#1A1816]"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Open Source
          </h2>
          <div className="mt-4 flex items-center gap-6 font-mono text-[9px] uppercase tracking-[0.3em] font-bold text-[#B45309]">
            <span>{CONTRIBUTIONS.length} Pull Requests</span>
            <div className="w-1.5 h-1.5 bg-[#B45309] rounded-full" />
            <span>{mergedCount} Merged</span>
            <div className="w-1.5 h-1.5 bg-[#B45309] rounded-full" />
            <span>GSSoC 2026</span>
          </div>
        </motion.div>

        {/* Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row items-center justify-between border-b-2 border-[#1A1816] pb-8 mb-16 gap-6"
          style={{ fontFamily: "'IBM Plex Mono', monospace" }}
        >
          <div className="flex items-center gap-4">
            <GitMerge size={18} className="text-[#16a34a]" />
            <span className="text-xs md:text-sm font-bold tracking-[0.2em] uppercase text-[#1A1816]">
              Contribution Log — Active Contributor
            </span>
          </div>
          <div className="flex items-center gap-8">
            {[
              { label: 'Repos', value: '2' },
              { label: 'PRs', value: '4' },
              { label: 'Merged', value: String(mergedCount) },
            ].map((s, i) => (
              <div key={i} className="text-center">
                <div className="text-2xl font-black text-[#1A1816]" style={{ fontFamily: "'Playfair Display', serif" }}>{s.value}</div>
                <div className="text-[9px] uppercase tracking-widest text-[#1A1816]/50 font-bold">{s.label}</div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Contribution Cards */}
        <div className="space-y-0">
          {CONTRIBUTIONS.map((contrib, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className="group relative border-b border-[#1A1816]/15 py-10 md:py-14 cursor-pointer"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">

                {/* Left — Repo + PR Number */}
                <div className="lg:col-span-2 flex lg:flex-col items-center lg:items-start gap-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 ${
                      contrib.status === 'merged'
                        ? 'bg-[#16a34a]/10 text-[#16a34a] group-hover:bg-[#16a34a] group-hover:text-white'
                        : 'bg-[#B45309]/10 text-[#B45309] group-hover:bg-[#B45309] group-hover:text-white'
                    }`}>
                      {contrib.status === 'merged' ? <GitMerge size={16} /> : <CheckCircle2 size={16} />}
                    </div>
                    <div>
                      <div className="font-mono text-[10px] tracking-[0.3em] uppercase text-[#1A1816]/40 font-black">
                        PR {contrib.prNumber}
                      </div>
                      <div className={`font-mono text-[9px] tracking-widest uppercase font-black ${
                        contrib.status === 'merged' ? 'text-[#16a34a]' : 'text-[#B45309]'
                      }`}>
                        {contrib.status === 'merged' ? '✓ MERGED' : '✓ COMPLETED'}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Center — Title + Details */}
                <div className="lg:col-span-7 flex flex-col">
                  {/* Repo Name */}
                  <a
                    href={contrib.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="inline-flex items-center gap-2 mb-3 w-fit"
                  >
                    <Github size={14} className="text-[#1A1816]/40" />
                    <span className="font-mono text-[11px] font-black tracking-[0.2em] uppercase text-[#1A1816]/40 hover:text-[#B45309] transition-colors">
                      {contrib.repo}
                    </span>
                  </a>

                  {/* PR Title */}
                  <h3
                    className="text-xl md:text-2xl font-black tracking-tight text-[#1A1816]/70 group-hover:text-[#1A1816] transition-colors duration-500 mb-5 leading-tight"
                  >
                    {contrib.title}
                  </h3>

                  {/* Focus Area Tags */}
                  <div className="flex flex-wrap gap-2 mb-5">
                    {contrib.focusAreas.map((area) => (
                      <span
                        key={area}
                        className="font-mono text-[9px] tracking-widest text-[#1A1816]/40 border border-[#1A1816]/10 px-3 py-1.5 uppercase font-black group-hover:border-[#1A1816]/25 group-hover:text-[#1A1816]/60 transition-all duration-300"
                      >
                        {area}
                      </span>
                    ))}
                  </div>

                  {/* Highlights */}
                  <ul className="space-y-2">
                    {contrib.highlights.map((h, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-[#1A1816]/50 group-hover:text-[#1A1816]/70 transition-colors duration-500 font-mono leading-relaxed">
                        <span className="text-[#B45309] mt-1 flex-shrink-0">›</span>
                        {h}
                      </li>
                    ))}
                  </ul>

                  {/* Labels */}
                  {contrib.labels && (
                    <div className="flex flex-wrap gap-2 mt-5">
                      {contrib.labels.map((label) => (
                        <span
                          key={label}
                          className="font-mono text-[8px] tracking-widest bg-[#1A1816]/5 text-[#1A1816]/40 px-2.5 py-1 uppercase font-bold rounded-sm"
                        >
                          {label}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Right — Icon + Arrow */}
                <div className="lg:col-span-3 flex lg:flex-col items-center lg:items-end justify-between lg:justify-center gap-4">
                  <div className="p-4 bg-white border border-[#1A1816]/10 shadow-lg text-[#B45309] group-hover:shadow-2xl transition-all duration-500">
                    {contrib.icon}
                  </div>
                  <a
                    href={contrib.prUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="w-12 h-12 rounded-full border border-[#1A1816]/10 flex items-center justify-center group-hover:bg-[#1A1816] group-hover:text-white group-hover:border-[#1A1816] transition-all duration-500"
                  >
                    <ArrowUpRight size={18} />
                  </a>
                </div>
              </div>

              {/* Row hover glow */}
              <div className="absolute inset-0 bg-[#1A1816]/[0.005] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            </motion.div>
          ))}
        </div>

        {/* Summary Footer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 flex flex-col items-center text-center"
        >
          <div className="flex items-center gap-8 mb-10">
            <div className="w-16 md:w-32 h-px bg-[#1A1816]/20" />
            <span className="font-mono text-[10px] uppercase tracking-[0.5em] text-[#1A1816]/40 font-bold">End of Contribution Log</span>
            <div className="w-16 md:w-32 h-px bg-[#1A1816]/20" />
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href="https://github.com/Rachit-Kakkad1"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 border border-[#1A1816] px-8 py-4 font-mono text-[11px] font-black tracking-[0.3em] uppercase hover:bg-[#1A1816] hover:text-white transition-all duration-500"
            >
              <Github size={16} />
              View Full GitHub Profile
              <ArrowUpRight size={14} className="transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
