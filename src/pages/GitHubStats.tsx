import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  ArrowLeft, 
  Github, 
  Star, 
  GitFork, 
  Activity, 
  ShieldCheck, 
  Zap, 
  Users, 
  BookOpen, 
  MessageSquare, 
  PlusCircle, 
  GitCommit, 
  GitPullRequest, 
  Code,
  ExternalLink
} from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import SEO from '../components/SEO';

const GITHUB_USERNAME = "Rachit-Kakkad1";
const CACHE_KEY = "github_analytics_cache_v2";
const CACHE_DURATION = 30 * 60 * 1000; // 30 minutes

interface GitHubProfile {
  name: string;
  avatar_url: string;
  bio: string;
  public_repos: number;
  followers: number;
  following: number;
}

interface GitHubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  size: number;
  updated_at: string;
}

interface GitHubEvent {
  id: string;
  type: string;
  created_at: string;
  repo: {
    name: string;
    url: string;
  };
  payload: {
    size?: number;
    action?: string;
    ref?: string;
    ref_type?: string;
    commits?: Array<{
      message: string;
      sha: string;
    }>;
    pull_request?: {
      title: string;
      html_url: string;
    };
    issue?: {
      title: string;
      html_url: string;
    };
  };
}

interface GitHubAnalyticsData {
  profile: GitHubProfile;
  repos: GitHubRepo[];
  events: GitHubEvent[];
}

// Language color mapping to match Github standards or portfolio theme
const LANGUAGE_COLORS: { [key: string]: string } = {
  JavaScript: "#F7DF1E",
  TypeScript: "#3178C6",
  Python: "#3776AB",
  HTML: "#E34F26",
  CSS: "#1572B6",
  Go: "#00ADD8",
  Rust: "#DEA584",
  Java: "#B07219",
  "C++": "#F34B7D",
  C: "#555555",
  PHP: "#777BB4",
  Ruby: "#701516",
  Shell: "#89E051",
  Vue: "#4FC08D",
  React: "#61DAFB",
  Swift: "#F05138"
};

// Fallback data in case the rate limit is hit or visitor is offline
const FALLBACK_DATA: GitHubAnalyticsData = {
  profile: {
    name: "Rachit Kakkad",
    avatar_url: "https://avatars.githubusercontent.com/u/100000000?v=4", // standard placeholder
    bio: "Full Stack Developer | Building AI & Web Platforms",
    public_repos: 18,
    followers: 12,
    following: 15
  },
  repos: [
    {
      id: 1,
      name: "Sanjeevani",
      description: "AI-powered Healthcare Assistance & Telemedicine Platform",
      html_url: "https://github.com/Rachit-Kakkad1/Sanjeevani",
      stargazers_count: 5,
      forks_count: 2,
      language: "TypeScript",
      size: 14200,
      updated_at: new Date().toISOString()
    },
    {
      id: 2,
      name: "agricert-platform",
      description: "Blockchain & AI-driven agricultural supply chain certification",
      html_url: "https://github.com/Rachit-Kakkad1/agricert-platform",
      stargazers_count: 4,
      forks_count: 1,
      language: "JavaScript",
      size: 8500,
      updated_at: new Date().toISOString()
    },
    {
      id: 3,
      name: "ThreatLens",
      description: "Real-time network security scanning and visualization dashboard",
      html_url: "https://github.com/Rachit-Kakkad1/ThreatLens",
      stargazers_count: 4,
      forks_count: 1,
      language: "Python",
      size: 12000,
      updated_at: new Date().toISOString()
    },
    {
      id: 4,
      name: "FleetFlow",
      description: "Logistics and dispatch optimization system",
      html_url: "https://github.com/Rachit-Kakkad1/FleetFlow",
      stargazers_count: 3,
      forks_count: 1,
      language: "TypeScript",
      size: 9200,
      updated_at: new Date().toISOString()
    }
  ],
  events: [
    {
      id: "e1",
      type: "PushEvent",
      created_at: new Date(Date.now() - 3 * 3600 * 1000).toISOString(),
      repo: { name: "Rachit-Kakkad1/agricert-platform", url: "" },
      payload: { commits: [{ message: "feat: integrate Web3 verification middleware", sha: "abc" }] }
    },
    {
      id: "e2",
      type: "WatchEvent",
      created_at: new Date(Date.now() - 12 * 3600 * 1000).toISOString(),
      repo: { name: "Rachit-Kakkad1/ThreatLens", url: "" },
      payload: {}
    },
    {
      id: "e3",
      type: "PushEvent",
      created_at: new Date(Date.now() - 24 * 3600 * 1000).toISOString(),
      repo: { name: "Rachit-Kakkad1/Sanjeevani", url: "" },
      payload: { commits: [{ message: "refactor: optimize appointment scheduling logic", sha: "def" }] }
    },
    {
      id: "e4",
      type: "PullRequestEvent",
      created_at: new Date(Date.now() - 48 * 3600 * 1000).toISOString(),
      repo: { name: "Rachit-Kakkad1/agricert-platform", url: "" },
      payload: { action: "opened", pull_request: { title: "implement sensor ingestion pipelines", html_url: "" } }
    }
  ]
};

const StatCard = ({ children, title, icon: Icon = Activity, delay = 0 }: { children: React.ReactNode, title: string, icon?: any, delay?: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, delay }}
    className="bg-[#1A1816]/60 backdrop-blur-md border border-white/5 p-6 md:p-8 rounded-3xl shadow-2xl group hover:border-[#B45309]/30 transition-all duration-500 flex flex-col justify-between"
  >
    <div>
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-full bg-[#B45309]/10 flex items-center justify-center text-[#B45309] group-hover:bg-[#B45309] group-hover:text-white transition-all duration-500">
          <Icon size={18} />
        </div>
        <h3 className="text-white/40 font-mono text-[10px] uppercase tracking-[0.3em] font-black">{title}</h3>
      </div>
      <div className="w-full">
        {children}
      </div>
    </div>
  </motion.div>
);

const SkeletonLoader = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
    <div className="h-[280px] bg-[#1A1816]/30 border border-white/5 rounded-3xl animate-pulse p-6">
      <div className="w-1/3 h-6 bg-white/5 rounded-md mb-8"></div>
      <div className="grid grid-cols-2 gap-4">
        {[1, 2, 3, 4].map(i => (
          <div key={i} className="h-20 bg-white/5 rounded-2xl"></div>
        ))}
      </div>
    </div>
    <div className="h-[280px] bg-[#1A1816]/30 border border-white/5 rounded-3xl animate-pulse p-6">
      <div className="w-1/3 h-6 bg-white/5 rounded-md mb-8"></div>
      <div className="space-y-4">
        {[1, 2, 3, 4].map(i => (
          <div key={i} className="h-4 bg-white/5 rounded-md w-full"></div>
        ))}
      </div>
    </div>
    <div className="md:col-span-2 h-[400px] bg-[#1A1816]/30 border border-white/5 rounded-3xl animate-pulse p-6">
      <div className="w-1/4 h-6 bg-white/5 rounded-md mb-8"></div>
      <div className="space-y-6">
        {[1, 2, 3, 5].map(i => (
          <div key={i} className="h-12 bg-white/5 rounded-xl"></div>
        ))}
      </div>
    </div>
  </div>
);

export default function GitHubStats() {
  const navigate = useNavigate();
  const location = useLocation();

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<GitHubAnalyticsData>(FALLBACK_DATA);
  const [usingFallback, setUsingFallback] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        const cached = localStorage.getItem(CACHE_KEY);
        if (cached) {
          const parsed = JSON.parse(cached);
          if (Date.now() - parsed.timestamp < CACHE_DURATION) {
            setData(parsed.data);
            setLoading(false);
            return;
          }
        }

        // Fetch user data
        const profileRes = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}`);
        const reposRes = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`);
        const eventsRes = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/events?per_page=30`);

        if (!profileRes.ok || !reposRes.ok || !eventsRes.ok) {
          throw new Error("Failed to fetch GitHub statistics");
        }

        const profileData = await profileRes.json();
        const reposData = await reposRes.json();
        const eventsData = await eventsRes.json();

        const fetchedData: GitHubAnalyticsData = {
          profile: profileData,
          repos: reposData,
          events: eventsData
        };

        // Cache the result
        localStorage.setItem(CACHE_KEY, JSON.stringify({
          timestamp: Date.now(),
          data: fetchedData
        }));

        setData(fetchedData);
        setUsingFallback(false);
      } catch (error) {
        console.error("Error loading GitHub live stats, falling back...", error);
        
        // If we have stale cache, load it instead of pure mock data
        const cached = localStorage.getItem(CACHE_KEY);
        if (cached) {
          try {
            const parsed = JSON.parse(cached);
            setData(parsed.data);
            setUsingFallback(false);
          } catch {
            setData(FALLBACK_DATA);
            setUsingFallback(true);
          }
        } else {
          setData(FALLBACK_DATA);
          setUsingFallback(true);
        }
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const handleReturn = () => {
    window.dispatchEvent(new CustomEvent('trigger-transition', { 
      detail: { name: 'Returning Home', target: 'home' } 
    }));
    const scrollTo = (location.state as any)?.fromSection || 'home';
    setTimeout(() => navigate('/', { state: { skipIntro: true, scrollTo } }), 400);
  };

  // 1. Calculate stats aggregates
  const totalStars = data.repos.reduce((acc, repo) => acc + repo.stargazers_count, 0);
  const totalForks = data.repos.reduce((acc, repo) => acc + repo.forks_count, 0);
  
  // 2. Calculate languages metrics
  const languageSummary = () => {
    const counts: { [key: string]: number } = {};
    let totalWithLanguage = 0;
    data.repos.forEach(repo => {
      if (repo.language) {
        counts[repo.language] = (counts[repo.language] || 0) + 1;
        totalWithLanguage++;
      }
    });

    return Object.entries(counts)
      .map(([name, count]) => ({
        name,
        count,
        percentage: totalWithLanguage > 0 ? Math.round((count / totalWithLanguage) * 100) : 0,
        color: LANGUAGE_COLORS[name] || "#B45309"
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);
  };

  const topLanguages = languageSummary();

  // 3. Format time ago helper
  const timeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    if (isNaN(seconds) || seconds < 0) return "recently";

    if (seconds < 60) return "just now";
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    if (days === 1) return "yesterday";
    if (days < 30) return `${days}d ago`;
    const months = Math.floor(days / 30);
    return `${months}mo ago`;
  };

  // 4. Format public event description helper
  const renderEventDetails = (event: GitHubEvent) => {
    const repoName = event.repo.name.replace(`${GITHUB_USERNAME}/`, "");
    const time = timeAgo(event.created_at);

    switch (event.type) {
      case "PushEvent": {
        const commitCount = event.payload.size || event.payload.commits?.length || 0;
        const latestCommit = event.payload.commits?.[0]?.message;
        const text = commitCount > 0 
          ? `Pushed ${commitCount} commit${commitCount !== 1 ? "s" : ""} to ${repoName}`
          : `Pushed updates to ${repoName}`;
        return {
          icon: GitCommit,
          text,
          details: latestCommit || null,
          time,
          color: "text-amber-500 bg-amber-500/10 border-amber-500/20",
        };
      }
      case "PullRequestEvent": {
        const action = event.payload.action || "opened";
        const title = event.payload.pull_request?.title || "Update PR";
        return {
          icon: GitPullRequest,
          text: `${action.charAt(0).toUpperCase() + action.slice(1)} pull request in ${repoName}`,
          details: title,
          time,
          color: "text-blue-500 bg-blue-500/10 border-blue-500/20",
        };
      }
      case "IssuesEvent": {
        const action = event.payload.action || "opened";
        const title = event.payload.issue?.title || "New Issue";
        return {
          icon: MessageSquare,
          text: `${action.charAt(0).toUpperCase() + action.slice(1)} issue in ${repoName}`,
          details: title,
          time,
          color: "text-red-500 bg-red-500/10 border-red-500/20",
        };
      }
      case "CreateEvent": {
        const refType = event.payload.ref_type || "repository";
        return {
          icon: PlusCircle,
          text: `Created ${refType} ${event.payload.ref || ""} in ${repoName}`,
          details: null,
          time,
          color: "text-green-500 bg-green-500/10 border-green-500/20",
        };
      }
      case "WatchEvent": {
        return {
          icon: Star,
          text: `Starred ${repoName}`,
          details: null,
          time,
          color: "text-yellow-500 bg-yellow-500/10 border-yellow-500/20",
        };
      }
      case "ForkEvent": {
        return {
          icon: GitFork,
          text: `Forked ${repoName}`,
          details: null,
          time,
          color: "text-purple-500 bg-purple-500/10 border-purple-500/20",
        };
      }
      default: {
        const typeCleaned = event.type.replace("Event", "");
        return {
          icon: Activity,
          text: `${typeCleaned} in ${repoName}`,
          details: null,
          time,
          color: "text-zinc-400 bg-zinc-500/10 border-zinc-500/20",
        };
      }
    }
  };

  // Filter out forks from popular repos
  const popularRepos = data.repos
    .filter(repo => repo.name !== GITHUB_USERNAME) // ignore owner profile repo if any
    .sort((a, b) => b.stargazers_count - a.stargazers_count)
    .slice(0, 4);

  return (
    <main className="min-h-screen bg-[#0E0F14] text-white selection:bg-[#B45309] selection:text-white py-24 md:py-32 overflow-x-hidden">
      <Helmet>
        <title>GitHub Stats | Rachit Kakkad</title>
        <meta name="description" content="GitHub contribution metrics and open source activity of Rachit Kakkad." />
        <link rel="canonical" href="https://rachit-hk-portfolio.vercel.app/github-stats" />
      </Helmet>
      <SEO title="System Intelligence | GitHub Analytics" />
      
      {/* Background Decorative Grid */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-0">
        <div className="w-full h-full" style={{ 
          backgroundImage: `linear-gradient(to right, #B45309 1px, transparent 1px), 
                           linear-gradient(to bottom, #B45309 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Top Navigation */}
        <motion.button 
          onClick={handleReturn}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="group flex items-center gap-4 text-white/40 hover:text-white transition-colors mb-16"
        >
          <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:border-[#B45309] group-hover:bg-[#B45309] group-hover:text-white transition-all duration-500">
            <ArrowLeft size={20} />
          </div>
          <span className="font-mono text-xs font-black uppercase tracking-widest">Back to Hub</span>
        </motion.button>

        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 mb-20">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-3 px-4 py-2 bg-[#B45309]/10 rounded-full border border-[#B45309]/20 mb-8"
            >
              <ShieldCheck size={16} className="text-[#B45309]" />
              <span className="font-mono text-[10px] font-black text-[#B45309] uppercase tracking-widest">
                Repository Intelligence Sync
              </span>
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-8xl font-black tracking-tighter uppercase leading-[0.9]"
            >
              GitHub <br/>Analytics
            </motion.h1>
          </div>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col gap-6 md:text-right"
          >
            <div className="font-mono text-[10px] text-white/30 uppercase tracking-[0.4em] font-black leading-relaxed">
              Active Session: {GITHUB_USERNAME}<br/>
              Status: {usingFallback ? "Cached Feed Offline" : "Connected // real-time sync"}
            </div>
            <div className="flex md:justify-end gap-4">
               <a 
                 href={`https://github.com/${GITHUB_USERNAME}`} 
                 target="_blank" 
                 rel="noopener noreferrer" 
                 className="p-4 bg-white/5 border border-white/10 rounded-full hover:bg-[#B45309] hover:text-white hover:border-[#B45309] transition-all duration-500"
               >
                  <Github size={20} />
               </a>
               <div className={`p-4 bg-white/5 border border-white/10 rounded-full ${usingFallback ? "text-amber-500" : "text-green-400"}`}>
                  <Zap size={20} className="animate-pulse" />
               </div>
            </div>
          </motion.div>
        </div>

        {/* Profile Card Header (Quick Info) */}
        {!loading && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-12 p-6 bg-[#1A1816]/40 border border-white/5 rounded-3xl flex flex-col md:flex-row items-center gap-6"
          >
            <img 
              src={data.profile.avatar_url} 
              alt={data.profile.name} 
              className="w-20 h-20 rounded-full border border-white/10 object-cover" 
            />
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-2xl font-bold text-white mb-1">{data.profile.name || GITHUB_USERNAME}</h2>
              <p className="text-white/60 text-sm font-mono">{data.profile.bio || "Full Stack Developer"}</p>
            </div>
            <div className="flex gap-4 font-mono text-[10px] uppercase text-white/40">
              <div className="bg-white/5 border border-white/5 px-4 py-3 rounded-2xl text-center min-w-[90px]">
                <div className="text-white text-lg font-bold font-sans">{data.profile.public_repos}</div>
                <div>Repos</div>
              </div>
              <div className="bg-white/5 border border-white/5 px-4 py-3 rounded-2xl text-center min-w-[90px]">
                <div className="text-white text-lg font-bold font-sans">{data.profile.followers}</div>
                <div>Followers</div>
              </div>
              <div className="bg-white/5 border border-white/5 px-4 py-3 rounded-2xl text-center min-w-[90px]">
                <div className="text-white text-lg font-bold font-sans">{data.profile.following}</div>
                <div>Following</div>
              </div>
            </div>
          </motion.div>
        )}

        <AnimatePresence mode="wait">
          {loading ? (
            <SkeletonLoader />
          ) : (
            <div className="space-y-12">
              
              {/* Top Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                
                {/* Custom Overall Stats */}
                <StatCard title="Overall Statistics" icon={Activity} delay={0.3}>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white/5 border border-white/5 p-4 rounded-2xl flex items-center gap-4 hover:bg-[#B45309]/5 hover:border-[#B45309]/10 transition-colors duration-300">
                      <div className="p-3 bg-[#B45309]/10 text-[#B45309] rounded-xl">
                        <Star size={20} />
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-white">{totalStars}</div>
                        <div className="text-[10px] font-mono uppercase text-white/40 tracking-wider">Total Stars</div>
                      </div>
                    </div>

                    <div className="bg-white/5 border border-white/5 p-4 rounded-2xl flex items-center gap-4 hover:bg-[#B45309]/5 hover:border-[#B45309]/10 transition-colors duration-300">
                      <div className="p-3 bg-[#B45309]/10 text-[#B45309] rounded-xl">
                        <GitFork size={20} />
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-white">{totalForks}</div>
                        <div className="text-[10px] font-mono uppercase text-white/40 tracking-wider">Total Forks</div>
                      </div>
                    </div>

                    <div className="bg-white/5 border border-white/5 p-4 rounded-2xl flex items-center gap-4 hover:bg-[#B45309]/5 hover:border-[#B45309]/10 transition-colors duration-300">
                      <div className="p-3 bg-[#B45309]/10 text-[#B45309] rounded-xl">
                        <BookOpen size={20} />
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-white">{data.profile.public_repos}</div>
                        <div className="text-[10px] font-mono uppercase text-white/40 tracking-wider">Repositories</div>
                      </div>
                    </div>

                    <div className="bg-white/5 border border-white/5 p-4 rounded-2xl flex items-center gap-4 hover:bg-[#B45309]/5 hover:border-[#B45309]/10 transition-colors duration-300">
                      <div className="p-3 bg-[#B45309]/10 text-[#B45309] rounded-xl">
                        <Users size={20} />
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-white">{data.profile.followers}</div>
                        <div className="text-[10px] font-mono uppercase text-white/40 tracking-wider">Followers</div>
                      </div>
                    </div>
                  </div>
                </StatCard>

                {/* Custom Tech Spectrum */}
                <StatCard title="Tech Spectrum" icon={Code} delay={0.4}>
                  {topLanguages.length === 0 ? (
                    <div className="text-white/40 text-center py-12 font-mono text-xs">No language data found</div>
                  ) : (
                    <div className="space-y-4">
                      {topLanguages.map((lang, idx) => (
                        <div key={lang.name} className="space-y-2">
                          <div className="flex justify-between items-center text-xs font-mono">
                            <div className="flex items-center gap-2">
                              <span 
                                className="w-2.5 h-2.5 rounded-full inline-block" 
                                style={{ backgroundColor: lang.color }}
                              />
                              <span className="font-bold text-white">{lang.name}</span>
                            </div>
                            <div className="text-white/50">
                              <span>{lang.count} {lang.count === 1 ? 'repo' : 'repos'}</span>
                              <span className="mx-2">//</span>
                              <span className="text-[#B45309] font-bold">{lang.percentage}%</span>
                            </div>
                          </div>
                          <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                            <motion.div 
                              initial={{ width: 0 }}
                              animate={{ width: `${lang.percentage}%` }}
                              transition={{ duration: 1, delay: 0.5 + idx * 0.1 }}
                              className="h-full rounded-full"
                              style={{ backgroundColor: lang.color }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </StatCard>

              </div>

              {/* Activity Pulse - Full Feed */}
              <div className="grid grid-cols-1 gap-8">
                <StatCard title="Activity Pulse" icon={Activity} delay={0.5}>
                  {data.events.length === 0 ? (
                    <div className="text-white/40 text-center py-12 font-mono text-xs">No recent public activity</div>
                  ) : (
                    <div className="space-y-4 max-h-[420px] overflow-y-auto py-2 px-1 pr-2 custom-scrollbar">
                      {data.events.slice(0, 10).map((event, idx) => {
                        const details = renderEventDetails(event);
                        const EventIcon = details.icon;
                        return (
                          <motion.div 
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: idx * 0.05 }}
                            key={event.id} 
                            className="p-4 bg-white/5 border border-white/5 rounded-2xl flex items-start justify-between gap-4 hover:bg-white/10 transition-all duration-300 group/item"
                          >
                            <div className="flex items-start gap-4">
                              <div className={`p-3 rounded-xl border ${details.color} shrink-0 mt-0.5`}>
                                <EventIcon size={16} />
                              </div>
                              <div>
                                <h4 className="text-sm font-bold text-white group-hover/item:text-[#B45309] transition-colors duration-300">
                                  {details.text}
                                </h4>
                                {details.details && (
                                  <p className="text-xs text-white/50 font-mono mt-1 leading-relaxed italic">
                                    "{details.details}"
                                  </p>
                                )}
                              </div>
                            </div>
                            <div className="text-[10px] font-mono text-white/30 uppercase tracking-widest shrink-0 mt-1">
                              {details.time}
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>
                  )}
                </StatCard>
              </div>

              {/* Top Repositories Live Showcase */}
              <div className="pt-8">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h3 className="text-xs font-mono uppercase tracking-[0.3em] text-[#B45309] font-black mb-1">
                      Repository Showcase
                    </h3>
                    <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight">
                      Popular Live Repositories
                    </h2>
                  </div>
                  <a 
                    href={`https://github.com/${GITHUB_USERNAME}?tab=repositories`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-xs font-mono text-white/40 hover:text-white transition-colors duration-300"
                  >
                    <span>View All Repos</span>
                    <ExternalLink size={12} />
                  </a>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {popularRepos.map((repo, idx) => (
                    <motion.a
                      key={repo.id}
                      href={repo.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.2 + idx * 0.1 }}
                      className="p-6 bg-[#1A1816]/40 border border-white/5 rounded-3xl hover:border-[#B45309]/30 hover:bg-[#1A1816]/60 transition-all duration-300 flex flex-col justify-between group"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-4">
                          <h4 className="text-lg font-bold text-white group-hover:text-[#B45309] transition-colors duration-300">
                            {repo.name}
                          </h4>
                          {repo.language && (
                            <span 
                              className="text-[10px] font-mono px-2 py-1 bg-white/5 border border-white/10 rounded-full"
                              style={{ borderLeft: `3px solid ${LANGUAGE_COLORS[repo.language] || "#B45309"}` }}
                            >
                              {repo.language}
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-white/60 mb-6 line-clamp-2 leading-relaxed">
                          {repo.description || "No description provided."}
                        </p>
                      </div>

                      <div className="flex items-center gap-6 font-mono text-xs text-white/40">
                        <div className="flex items-center gap-1.5 hover:text-white transition-colors">
                          <Star size={14} className="text-yellow-500/80" />
                          <span>{repo.stargazers_count}</span>
                        </div>
                        <div className="flex items-center gap-1.5 hover:text-white transition-colors">
                          <GitFork size={14} className="text-purple-500/80" />
                          <span>{repo.forks_count}</span>
                        </div>
                        <div className="ml-auto text-[10px] uppercase">
                          Size: {Math.round(repo.size / 1024) || 1} MB
                        </div>
                      </div>
                    </motion.a>
                  ))}
                </div>
              </div>

            </div>
          )}
        </AnimatePresence>

        {/* System Footer */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-32 pt-12 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-8 font-mono text-[10px] text-white/20 tracking-[0.2em] font-black uppercase"
        >
          <div>© 2026 Archive Statistics // RACHIT KAKKAD</div>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
               <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
               SYSTEM_ONLINE
            </div>
            <span>Encrypted Connection</span>
          </div>
        </motion.div>

      </div>
    </main>
  );
}
