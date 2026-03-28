export interface ProjectData {
  id: string;
  headline: string;
  tag: string;
  description: string;
  longDescription: string;
  tech: string[];
  year: string;
  image: string;
  github: string;
  live: string;
  docs: string;
  demoVideo: string;
  challenge: string;
  solution: string;
  results: { value: string; label: string }[];
  achievement?: string;
  gallery?: string[];
}

export interface ArchiveProject {
  id: string;
  title: string;
  category: string;
  year: string;
  role: string;
  stack: string;
  challenge: string;
  solution: string;
  description: string;
  results: { value: number | string; suffix: string; label: string }[];
  features: { title: string; description: string }[];
  image: string;
  github: string;
  live: string;
  docs: string;
  gallery: string[];
}

export interface HackathonData {
  id: number;
  title: string;
  project: string;
  outcome: string;
  longDescription?: string;
  tech: string[];
  highlights: string[];
  challenges?: string[];
  achievement: string;
  image?: string;
  images?: string[];
  links?: {
    github?: string;
    live?: string;
    docs?: string;
  };
}

export const PROJECT_DATA: ProjectData[] = [
  {
    id: 'agricert',
    headline: 'AgriCert',
    tag: 'BLOCKCHAIN · WEB3 · AGRICULTURE',
    description: 'Blockchain-powered agricultural certification. Cryptographic trust for farmers, auditors, and consumers — all on one chain.',
    longDescription: 'AgriCert revolutionizes the agricultural supply chain by providing a transparent, immutable ledger for crop certification. By leveraging blockchain technology and AI-driven image analysis, it ensures authenticity from farm to table. Every certification is permanently stored as an NFT, creating an unbreakable chain of trust.',
    tech: ['React', 'Node.js', 'MongoDB', 'Solidity', 'Ethereum'],
    year: '2026',
    image: '/agricert-main.jpg',
    github: 'https://github.com/Rachit-Kakkad1/agricert-platform',
    live: 'https://agricert-khaki.vercel.app',
    docs: 'https://docs.google.com/document/d/1SQXzdd0F696l9_OcGtVPnEA_DszccIw5KZ2__57ZIeY/edit?usp=sharing',
    demoVideo: '#',
    challenge: 'The agricultural supply chain suffers from a lack of transparency, leading to counterfeit certifications and consumer distrust.',
    solution: 'A decentralized application (dApp) that tokenizes crop certifications as NFTs on a low-cost blockchain with AI-driven verification.',
    results: [{ value: '100%', label: 'Traceability' }, { value: '40%', label: 'Faster Certification' }, { value: '200+', label: 'Test Users' }],
  },
  {
    id: 'lifelens',
    headline: 'LifeLens AI',
    tag: 'AI · CLIMATE · WELLNESS',
    description: 'The first platform connecting personal wellness to real-time planetary health signals. AI that cares about you and the earth.',
    longDescription: 'LifeLens is an intelligent behavioral analytics platform that connects personal wellness data with environmental impact insights. By combining lifestyle tracking with AI-powered analysis via Gemini AI, the platform helps users understand how their daily habits influence both personal health and climate footprint through a dual-impact scoring system.',
    tech: ['Python', 'TensorFlow', 'React', 'FastAPI', 'Climate API'],
    year: '2026',
    image: '/lifelens.jpg',
    github: 'https://github.com/Rachit-Kakkad1/lifelens-ai-dashboard',
    live: 'https://lifelens-ai-dashboard.vercel.app/',
    docs: 'https://docs.google.com/document/d/1cFIByWAw5mDLpWVWPRsOm6qveijE7rSGvvqcr_tJ2-U/edit?usp=sharing',
    demoVideo: '#',
    challenge: 'Health tracking and climate action are typically treated as separate systems with no correlation between personal habits and environmental impact.',
    solution: 'A dual-impact analytics system that evaluates both internal wellness signals and external environmental footprint using Gemini AI.',
    results: [{ value: '2x', label: 'Dual Impact Score' }, { value: '100%', label: 'Real-Time Sync' }, { value: 'Active', label: 'Beta Users' }],
  },
  {
    id: 'threatlens',
    headline: 'ThreatLens',
    tag: 'CYBERSECURITY · AI · DEVSECOPS',
    description: 'Secure code. Clear risks. Zero exploitation. Static analysis meets AI threat modeling for teams who ship fast.',
    longDescription: 'An advanced cybersecurity education and research platform designed to perform ethical static code analysis and deterministic threat modeling. ThreatLens uses AST parsing and ethical threat modeling algorithms to identify risks safely, providing transparent risk scoring and actionable metrics for security teams.',
    tech: ['Next.js', 'Python', 'GraphQL', 'FastAPI', 'LLM'],
    year: '2026',
    image: '/threatlens.jpg',
    github: 'https://github.com/Rachit-Kakkad1/ThreatLens/tree/main/Code',
    live: 'https://threatlens-topaz.vercel.app',
    docs: 'https://docs.google.com/document/d/1AuiSrd1yMwjebAwYMWGrqnAixB53S5ombRf-EQyiQQU/edit?usp=sharing',
    demoVideo: '#',
    challenge: 'Cybersecurity education lacks safe environments for analyzing vulnerabilities without risking active exploitation.',
    solution: 'A static analysis engine utilizing AST parsing and ethical threat modeling algorithms to identify risks safely.',
    results: [{ value: '100%', label: 'Zero Exploitation' }, { value: '5', label: 'Analysis Modules' }, { value: '500+', label: 'Threat Patterns' }],
    achievement: '2nd Place Winner — ElectroSphere 2K26',
  },
  {
    id: 'fleetflow',
    headline: 'FleetFlow',
    tag: 'LOGISTICS · ANALYTICS · REAL-TIME',
    description: 'Modern fleet intelligence. Real-time tracking, predictive analytics, and route optimization for the logistics era.',
    longDescription: 'FleetFlow is a modern logistics command platform designed to manage fleet operations, dispatch coordination, driver workflows, and operational analytics in real time. Powered by WebSockets for live updates and AI-driven anomaly detection for predictive fleet monitoring.',
    tech: ['Vue.js', 'Node.js', 'PostgreSQL', 'Maps API', 'Socket.io'],
    year: '2026',
    image: '/fleetflow.jpg',
    github: 'https://github.com/Rachit-Kakkad1/FleetFlow',
    live: 'https://fleet-flow-smoky-eta.vercel.app/',
    docs: 'https://docs.google.com/document/d/1OBtAA_lxoXI50-U0dwHdGy9KY2ZdGEG58A7syHKZDeY/edit?usp=sharing',
    demoVideo: '#',
    challenge: 'Logistics operations are fragmented across disconnected systems, resulting in delayed operational insights.',
    solution: 'A centralized logistics intelligence platform powered by real-time data synchronization and role-governed workflows.',
    results: [{ value: '100%', label: 'Real-Time Sync' }, { value: '4', label: 'Role Portals' }, { value: '99%', label: 'Anomaly Detection' }],
  },
  {
    id: 'plmflow',
    headline: 'PLM Flow',
    tag: 'ENTERPRISE · PLM · ENGINEERING',
    description: 'Enterprise product lifecycle control. Dual-database failover, real-time SLA tracking, and ECO approvals at scale.',
    longDescription: 'PLM Flow is an enterprise-grade product lifecycle management system with dual-database failover architecture (Supabase + MongoDB Atlas), real-time SLA tracking dashboards, and multi-level ECO approval workflows designed for engineering teams at scale.',
    tech: ['React', 'Node.js', 'Supabase', 'MongoDB Atlas', 'Framer Motion'],
    year: '2026',
    image: '',
    github: 'https://github.com/Rachit-Kakkad1/Odoo_X_GV_PLM',
    live: 'https://plm-x-odooxgv.vercel.app/',
    docs: 'https://docs.google.com/document/d/1Yg9hS-GvHKx78EqMVn_XZEPGbSU4UotWM1XLT5FpHpk/edit?usp=sharing',
    demoVideo: '#',
    challenge: 'Enterprise PLM tools are rigid, expensive, and fail to provide real-time visibility into product lifecycle changes.',
    solution: 'A modern PLM platform with dual-database architecture for zero-downtime failover and real-time SLA dashboards.',
    results: [{ value: '99.9%', label: 'Uptime' }, { value: '2x', label: 'Database Redundancy' }, { value: '< 1s', label: 'SLA Response' }],
  },
  {
    id: 'cos',
    headline: 'COS',
    tag: 'AI · LOCAL LLM · PRODUCTIVITY · OS',
    description: 'Say "What was I doing?" — get your exact cognitive state back in under 1 second. 8 AI models. All local. Zero cloud.',
    longDescription: 'COS (Cognitive Operating System) is a revolutionary local-first AI productivity platform that captures and restores your exact cognitive context. Running 8 specialized AI models entirely on-device — including Whisper for speech, FAISS for semantic search, and MiniLM for embeddings — it provides instant context restoration with zero cloud dependency.',
    tech: ['Python', 'FastAPI', 'React', 'Whisper', 'FAISS', 'React Native', 'MiniLM'],
    year: '2026',
    image: '',
    github: 'https://github.com/Rachit-Kakkad1/build-with-ai-hackcrux-2026',
    live: 'https://cos-cognitiveoperatingsystem.vercel.app/',
    docs: 'https://docs.google.com/document/d/1w1YYJ2Cu5fKI3OBfKgHwMGrGMzQzoGKCNKIualZrZk8/edit?usp=sharing',
    demoVideo: '#',
    challenge: 'Context switching destroys productivity. Returning to a previous task requires manually reconstructing your mental state.',
    solution: '8 AI models running locally that continuously capture cognitive context and restore it in under 1 second on demand.',
    results: [{ value: '< 1s', label: 'Context Restore' }, { value: '8', label: 'AI Models' }, { value: '0', label: 'Cloud Dependencies' }],
  },
  {
    id: 'arovia',
    headline: 'Arovia',
    tag: 'AUTOMATION · WORKFLOWS · INTEGRATIONS',
    description: 'Connect everything. Automate anything. Powerful workflows, real-time execution, and seamless integrations.',
    longDescription: 'Arovia is an automation platform that connects disparate services through powerful workflow orchestration. Build complex multi-step automations with a visual editor, trigger them via webhooks or schedules, and monitor execution in real-time with detailed logging.',
    tech: ['React', 'Node.js', 'Webhooks', 'REST APIs'],
    year: '2026',
    image: '',
    github: '#',
    live: '#',
    docs: '#',
    demoVideo: '#',
    challenge: 'Businesses rely on dozens of disconnected tools with no unified way to orchestrate cross-platform workflows.',
    solution: 'A visual workflow builder with webhook triggers, REST API integrations, and real-time execution monitoring.',
    results: [{ value: '∞', label: 'Integrations' }, { value: '< 50ms', label: 'Trigger Latency' }, { value: '24/7', label: 'Execution Engine' }],
  },
  {
    id: 'attendify',
    headline: 'Attendify',
    tag: 'EDTECH · ANALYTICS · FIREBASE',
    description: 'Smart attendance tracking, forecasting, bunk calculator, and productivity analytics for students who want full control.',
    longDescription: 'Attendify is an intelligent student analytics platform that goes beyond attendance tracking. It features predictive forecasting, a bunk calculator, and productivity analytics powered by Firebase and Firestore, giving students complete control over their academic performance data.',
    tech: ['React', 'TypeScript', 'Firebase', 'Firestore', 'TailwindCSS'],
    year: '2026',
    image: '',
    github: '#',
    live: '#',
    docs: '#',
    demoVideo: '#',
    challenge: 'Students lack data-driven tools to understand attendance patterns and make informed decisions about class participation.',
    solution: 'An analytics dashboard with predictive models, bunk calculators, and real-time attendance synchronization via Firebase.',
    results: [{ value: '95%', label: 'Prediction Accuracy' }, { value: 'Real-time', label: 'Sync' }, { value: 'Pilot', label: 'Program' }],
  },
];

export const CODINGGITA_DATA: ProjectData = {
  id: 'codinggita',
  headline: 'CodingGita Auction',
  tag: 'EDTECH · REAL-TIME · AUCTION',
  description: 'Real-time deterministic student auction platform built for live institutional events.',
  longDescription: 'CodingGita Auction is a real-time deterministic auction platform designed for live institutional events. Built with React 18 and TypeScript, it handles concurrent bidding with deterministic conflict resolution, animated bid visualizations via Framer Motion, and persistent state management with MongoDB.',
  tech: ['React 18', 'TypeScript', 'Framer Motion', 'MongoDB'],
  year: '2026',
  image: '',
  github: 'https://github.com/Rachit-Kakkad1/CodingGita_Auction',
  live: 'https://codinggita-auction.vercel.app',
  docs: 'https://docs.google.com/document/d/1ql21e0VmAiTVRYbsys-W5urtwtFetfLbO55X5rVThe8/edit?usp=sharing',
  demoVideo: '#',
  challenge: 'Live auction events need millisecond-precision bid handling with deterministic outcomes across concurrent users.',
  solution: 'A purpose-built auction engine with deterministic conflict resolution and real-time animated bid visualizations.',
  results: [{ value: '< 100ms', label: 'Bid Latency' }, { value: '100%', label: 'Deterministic' }, { value: 'Live', label: 'Events Hosted' }],
};

export const ARCHIVE_PROJECTS: ArchiveProject[] = [
  {
    id: "lifelens",
    title: "LifeLens AI",
    category: "AI-Powered Personal & Planetary Health Intelligence Platform",
    year: "2026",
    role: "Full Stack Developer",
    stack: "React · TypeScript · TailwindCSS · Recharts · Supabase · Gemini AI",
    challenge: "Health tracking and climate action are typically treated as separate systems. Fitness apps focus only on personal health metrics, while sustainability tools focus only on carbon emissions.",
    solution: "LifeLens introduces a dual-impact analytics system that evaluates both internal wellness signals and external environmental footprint using Gemini AI.",
    description: "LifeLens is an intelligent behavioral analytics platform that connects personal wellness data with environmental impact insights. By combining lifestyle tracking with AI-powered analysis, the platform helps users understand how their daily habits influence both personal health and climate footprint.",
    results: [
      { value: 2, suffix: "x", label: "Dual Impact Score" },
      { value: 100, suffix: "%", label: "Real-Time Sync" },
      { value: 95, suffix: "%", label: "User Retention" }
    ],
    features: [
      { title: "AI Behavioral Engine", description: "Dual health and climate scoring system that identifies correlations in lifestyle choices." },
      { title: "Personalized Insights", description: "AI-generated actionable insights to improve both well-being and reduce carbon emissions." }
    ],
    image: "/lifelens.jpg",
    github: 'https://github.com/Rachit-Kakkad1/lifelens-ai-dashboard',
    live: 'https://lifelens-ai-dashboard.vercel.app/',
    docs: 'https://docs.google.com/document/d/1cFIByWAw5mDLpWVWPRsOm6qveijE7rSGvvqcr_tJ2-U/edit?usp=sharing',
    gallery: ["https://images.unsplash.com/photo-1633412802994-5c058f151b66?q=80&w=2000&auto=format&fit=crop"]
  },
  {
    id: "agricert",
    title: "AgriCert",
    category: "Blockchain Platform",
    year: "2023",
    role: "Full Stack Developer",
    stack: "React · Node · MongoDB · Blockchain",
    challenge: "The agricultural supply chain suffers from a lack of transparency, leading to counterfeit certifications.",
    solution: "We developed a decentralized application (dApp) that tokenizes crop certifications as NFTs on a low-cost blockchain.",
    description: "AgriCert revolutionizes the agricultural supply chain by providing a transparent, immutable ledger for crop certification. By leveraging blockchain technology and AI-driven image analysis, it ensures authenticity from farm to table.",
    results: [
      { value: 100, suffix: "%", label: "Traceability" },
      { value: 40, suffix: "%", label: "Faster Certification" },
      { value: 15, suffix: "k+", label: "Farmers Onboarded" }
    ],
    features: [
      { title: "Immutable Ledger", description: "All certifications are permanently stored on the blockchain." },
      { title: "AI Verification", description: "Computer vision models verify crop health from uploaded images." },
      { title: "Smart Contracts", description: "Automated payouts when certification criteria are met." }
    ],
    image: "/agricert-main.jpg",
    github: 'https://github.com/Rachit-Kakkad1/agricert-platform',
    live: 'https://agricert-khaki.vercel.app',
    docs: 'https://docs.google.com/document/d/1SQXzdd0F696l9_OcGtVPnEA_DszccIw5KZ2__57ZIeY/edit?usp=sharing',
    gallery: [
      "/agricert-1.png",
      "/agricert-2.png",
      "/agricert-3.png",
      "/agricert-4.png"
    ]
  },
  {
    id: "fleetflow",
    title: "FleetFlow",
    category: "Real-Time Logistics & Fleet Intelligence Platform",
    year: "2026",
    role: "Full Stack Developer",
    stack: "React · Node.js · Express · PostgreSQL · Prisma · Socket.IO",
    challenge: "Logistics operations are fragmented across disconnected systems, resulting in delayed operational insights and inefficient dispatch coordination.",
    solution: "A centralized logistics intelligence platform powered by real-time data synchronization and role-governed workflows.",
    description: "FleetFlow is a modern logistics command platform designed to manage fleet operations, dispatch coordination, driver workflows, and operational analytics in real time.",
    results: [
      { value: 100, suffix: "%", label: "Real-Time Sync" },
      { value: 4, suffix: "", label: "Role Portals" },
      { value: 99, suffix: "%", label: "Anomaly Detection" }
    ],
    features: [
      { title: "Real-Time Sync", description: "Live operational updates via WebSockets for instantaneous fleet visibility." },
      { title: "AI Anomaly Detection", description: "Predictive monitoring flags fuel consumption irregularities for audit." }
    ],
    image: "/fleetflow.jpg",
    github: 'https://github.com/Rachit-Kakkad1/FleetFlow',
    live: 'https://fleet-flow-smoky-eta.vercel.app/',
    docs: 'https://docs.google.com/document/d/1OBtAA_lxoXI50-U0dwHdGy9KY2ZdGEG58A7syHKZDeY/edit?usp=sharing',
    gallery: ["https://images.unsplash.com/photo-1551076805-e18690c5e561?q=80&w=2000&auto=format&fit=crop"]
  },
  {
    id: "threatlens",
    title: "ThreatLens",
    category: "Ethical Static Cybersecurity Analysis & Threat Modeling Platform",
    year: "2026",
    role: "Security Engineer",
    stack: "Python · FastAPI · React · AST Parsers · Docker",
    challenge: "Cybersecurity education lacks safe environments for analyzing vulnerabilities without risking active exploitation.",
    solution: "Built a static analysis engine utilizing AST parsing and ethical threat modeling algorithms to identify risks safely.",
    description: "An advanced cybersecurity education and research platform designed to perform ethical static code analysis and deterministic threat modeling.",
    results: [
      { value: 100, suffix: "%", label: "Zero Exploitation" },
      { value: 5, suffix: "", label: "Analysis Modules" },
      { value: 500, suffix: "+", label: "Threat Patterns" }
    ],
    features: [
      { title: "Deterministic Analysis", description: "Safe, static code evaluation without active execution risks." },
      { title: "Transparent Risk Scoring", description: "Clear, actionable metrics for prioritizing security patches." }
    ],
    image: "/threatlens.jpg",
    github: 'https://github.com/Rachit-Kakkad1/ThreatLens/tree/main/Code',
    live: 'https://threatlens-topaz.vercel.app',
    docs: 'https://docs.google.com/document/d/1AuiSrd1yMwjebAwYMWGrqnAixB53S5ombRf-EQyiQQU/edit?usp=sharing',
    gallery: ["https://images.unsplash.com/photo-1642104704074-907c0698cbd9?q=80&w=2000&auto=format&fit=crop"]
  }
];

export const hackathons: HackathonData[] = [
  {
    id: 1,
    title: 'ELECTROSPHERE 2K26 — SWAMINARAYAN UNIVERSITY',
    project: 'ThreatLens',
    outcome: '“Secured 2nd place by building an ethical cybersecurity analysis system using static analysis.”',
    longDescription: 'Developed an advanced cybersecurity education and research platform designed to perform ethical static code analysis and deterministic threat modeling. ThreatLens uses AST parsing to identify risks safely, providing transparent risk scoring for security teams.',
    tech: ['React', 'Node.js', 'MongoDB'],
    highlights: ['Static vulnerability detection', 'Risk scoring system', 'Security-focused architecture'],
    challenges: ['Translating complex security vulnerabilities into deterministic, static analysis patterns without requiring cloud compute.'],
    achievement: '🥈 Rank 2 — Software Edition',
    image: '/certificates/hackathons/ElectroSphere_2K26.jpg',
    images: ['/certificates/hackathons/ElectroSphere_2K26.jpg', '/threatlens.jpg'],
    links: {
      github: 'https://github.com/Rachit-Kakkad1/ThreatLens/tree/main/Code',
      live: 'https://threatlens-topaz.vercel.app',
      docs: 'https://docs.google.com/document/d/1AuiSrd1yMwjebAwYMWGrqnAixB53S5ombRf-EQyiQQU/edit?usp=sharing'
    }
  },
  {
    id: 2,
    title: 'NATIONAL DIGITAL IDENTITY & INNOVATION HACKATHON — IIT MADRAS',
    project: 'SecureID Nexus',
    outcome: '“Led a 5-member team to secure Rank 4 in Round 3 at a national-level hackathon.”',
    longDescription: 'Architected and deployed a highly secure, scalable identity management infrastructure. Built specifically for the National Digital Identity hackathon, the platform orchestrates JWT-based asymmetric workflows and zero-trust authentication protocols.',
    tech: ['Node.js', 'Express', 'MongoDB', 'JWT', 'React'],
    highlights: ['Secure identity workflows', 'Backend architecture', 'Team leadership'],
    challenges: ['Designing a federated identity protocol that meets stringent national security requirements within a 36-hour sprint.'],
    achievement: '🏅 Rank 4 — Round 3 Finalist',
    image: '/certificates/hackathons/National_Digital_Identity_&_Innovation_Hackathon_2025.png',
    images: ['/certificates/hackathons/National_Digital_Identity_&_Innovation_Hackathon_2025.png'],
    links: {}
  },
  {
    id: 3,
    title: 'ODOO × GUJARAT VIDHYAPITH',
    project: 'PLM Flow',
    outcome: '“Built a fault-tolerant PLM system with dual-database failover and real-time ECO tracking.”',
    longDescription: 'Engineered an enterprise-grade Product Lifecycle Management system featuring a robust dual-database (Supabase + MongoDB) synchronized failover mechanism, ensuring exactly-once processing for Engineering Change Orders.',
    tech: ['React', 'Node.js', 'PostgreSQL', 'MongoDB', 'Tailwind'],
    highlights: ['Dual-database failover', 'Real-time SLA tracking', 'Role-based access control'],
    challenges: ['Maintaining strict ACID consistency across disparate database architectures (SQL vs NoSQL) during simulated network partitions.'],
    achievement: 'Hackathon Finalist',
    images: [
      '/certificates/hackathons/Odoo_X_Gujarat_Vidyapith_Hackathon_26.png',
      '/certificates/hackathons/odoo/odoo-frame.jpg',
      '/certificates/hackathons/odoo/odoo-wristband.png',
      '/certificates/hackathons/odoo/odoo-ui-hero.png',
      '/certificates/hackathons/odoo/odoo-ui-features.png'
    ],
    links: {
      github: 'https://github.com/Rachit-Kakkad1/Odoo_X_GV_PLM',
      live: 'https://plm-x-odooxgv.vercel.app/',
      docs: 'https://docs.google.com/document/d/1Yg9hS-GvHKx78EqMVn_XZEPGbSU4UotWM1XLT5FpHpk/edit?usp=sharing'
    }
  },
  {
    id: 4,
    title: 'HACKCRUX × LNMIT',
    project: 'COS Engine',
    outcome: '“Developed a cognitive operating system to track and reconstruct user mental state using AI.”',
    longDescription: 'Built a cognitive intelligence layer that runs entirely on-device to reconstruct lost user context using local natural language models (Whisper) and vector memory databases (FAISS + MiniLM) executing in sub-second latency.',
    tech: ['FastAPI', 'React', 'Whisper', 'FAISS'],
    highlights: ['AI-based cognition tracking', 'Local-first system design', 'Real-time processing'],
    challenges: ['Orchestrating 8 local AI models dynamically without thermal throttling the host machine or exceeding VRAM limits.'],
    achievement: 'Hackathon Submission',
    image: '/certificates/hackathons/HackCrux X LNMIT.png',
    images: ['/certificates/hackathons/HackCrux X LNMIT.png'],
    links: {
      github: 'https://github.com/Rachit-Kakkad1/build-with-ai-hackcrux-2026',
      live: 'https://cos-cognitiveoperatingsystem.vercel.app/',
      docs: 'https://docs.google.com/document/d/1w1YYJ2Cu5fKI3OBfKgHwMGrGMzQzoGKCNKIualZrZk8/edit?usp=sharing'
    }
  },
  {
    id: 5,
    title: 'DEV HEAT — IIIT SURAT',
    project: 'LifeLens AI',
    outcome: '“Built an AI system connecting personal wellness with environmental sustainability using dual-impact analytics.”',
    longDescription: 'Created a dual-impact analytics engine utilizing Google Gemini AI to find correlations between personal health metrics and planetary carbon footprint, offering behavioral insights that benefit both user and environment.',
    tech: ['React', 'TypeScript', 'Tailwind', 'Framer Motion', 'Gemini AI', 'Supabase'],
    highlights: ['Dual-lens analytics', 'AI behavioral insights', 'Real-time feedback system'],
    challenges: ['Engineering a normalized scoring algorithm that accurately weights highly disparate data sets (biometrics vs emissions).'],
    achievement: 'Participation (Gemini Competition)',
    images: ['/lifelens.jpg'],
    links: {
      github: 'https://github.com/Rachit-Kakkad1/lifelens-ai-dashboard',
      live: 'https://lifelens-ai-dashboard.vercel.app/',
      docs: 'https://docs.google.com/document/d/1cFIByWAw5mDLpWVWPRsOm6qveijE7rSGvvqcr_tJ2-U/edit?usp=sharing'
    }
  },
  {
    id: 6,
    title: 'OPENPOOLS × DOPPELGANGER',
    project: 'AgriCert',
    outcome: '“Built a blockchain-based agricultural certification system with cryptographic verification.”',
    longDescription: 'Architected a decentralized, tamper-proof certification pipeline allowing instant QR-based verification of agricultural origins, bringing cryptographic trust to an otherwise paper-driven supply chain.',
    tech: ['React', 'Node.js', 'MongoDB'],
    highlights: ['QR verification', 'Certification pipeline', 'Role-based system'],
    challenges: ['Designing an immutable state machine for certification transfers while ensuring zero-knowledge privacy for farmers.'],
    achievement: 'Score: 79.5',
    image: '/certificates/hackathons/Openpools ( 30 hrs ).jpg',
    images: ['/certificates/hackathons/Openpools ( 30 hrs ).jpg'],
    links: {
      github: 'https://github.com/Rachit-Kakkad1/agricert-platform',
      live: 'https://agricert-khaki.vercel.app',
      docs: 'https://docs.google.com/document/d/1SQXzdd0F696l9_OcGtVPnEA_DszccIw5KZ2__57ZIeY/edit?usp=sharing'
    }
  }
];
