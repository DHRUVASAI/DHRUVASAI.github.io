export interface Project {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  category: string;
  description: string;
  githubUrl: string;
  tags: string[];
  techStack: string[];
  metrics: string;
  features: string[];
  architectureSummary: string;
  architectureDiagram?: string;
  themeColor: string;
  accentBg: string;
  type: 'AI & Agents' | 'Cybersecurity' | 'Full-Stack' | 'Generative AI';
}

export interface FocusArea {
  number: string;
  title: string;
  description: string;
}

export const PERSONAL_INFO = {
  name: 'Dhruva Sai',
  fullName: 'VUDATHA DHRUVA SAI',
  role: 'AI Engineer & Product Builder',
  location: '500090 Hyderabad, India',
  timezone: 'Asia/Kolkata',
  phone: '8074142645',
  formattedPhone: '+91 80741 42645',
  email: 'dhruvasai1706@gmail.com',
  githubUrl: 'https://github.com/DHRUVASAI',
  githubHandle: 'github.com/DHRUVASAI',
  linkedinUrl: 'https://www.linkedin.com/in/vudatha-dhruva-sai-500217315/',
  linkedinHandle: 'linkedin.com/in/vudatha-dhruva-sai',
  portraitUrl: '/dhruva-portrait.png',
  resumeSummary: 'Computer Science undergraduate with hands-on experience building AI-powered systems and cloud-based applications. Developed JanSahayak, a multilingual voice-enabled welfare assistant recognized in the AWS AI for Bharat Hackathon. Passionate about AI, cloud computing, cybersecurity, and building technology that solves real-world problems.',
  aboutBio: [
    "I'm Dhruva Sai — a computer science student and builder fascinated by the space where artificial intelligence, engineering, and thoughtful product design meet. I enjoy taking complex ideas and turning them into systems that are not only technically interesting, but genuinely useful.",
    "My work spans AI/ML, agentic systems, cybersecurity, cloud computing, and full-stack development. From building GARUDA, a context-aware network defense platform, to exploring AI-powered social experiences with VibeVerse, I'm drawn to problems that demand more than a standard solution. I care about how a system thinks, how it behaves in the real world, and how people experience using it.",
    "I believe good engineering goes beyond making something work. It's about understanding the problem deeply, questioning familiar approaches, and paying attention to the details that make a product reliable, intuitive, and meaningful. I enjoy working across the entire process — from the first idea and system architecture to implementation, experimentation, and deployment.",
    "I'm continuously exploring new technologies, building ambitious projects, and learning by shipping. My goal is simple: to create things that solve real problems, challenge conventional thinking, and make technology feel a little more powerful and human."
  ],
  currently: "Pursuing Computer Science Engineering while building real-world AI products, exploring emerging technologies, and participating in innovation challenges.",
  quote: "“I'm less interested in building another version of what's already out there and more interested in discovering what should exist next.”",
  education: [
    {
      degree: 'B.Tech – Computer Science and Engineering',
      institution: 'Koneru Lakshmaiah Education Foundation, Hyderabad, Telangana',
      period: '2024 – 2028 (Expected)',
      grade: 'CGPA: 9.33/10.0'
    },
    {
      degree: 'Higher Secondary Certification (HSC)',
      institution: 'Vinjee, Hyderabad, Telangana',
      period: '2024',
      grade: 'Score: 90%'
    }
  ],
  technicalSkills: {
    programming: 'Python, Java, C',
    frontend: 'React.js, Next.js, HTML5, CSS3',
    cloud: 'AWS, Microsoft Azure, Google Cloud Platform, IBM Cloud',
    databases: 'MySQL, Git, GitHub',
    coreCS: 'Data Structures, Algorithms, OOP, Machine Learning, Compiler Design'
  },
  experience: [
    {
      role: 'IBM SkillsBuild – AI & Cloud Internship',
      location: 'Virtual',
      period: 'Jun 2026 – Jul 2026',
      bullets: [
        'Completed hands-on training in AI and Cloud Computing; built an AI-based project applying machine learning and cloud concepts through mentor-guided sessions.'
      ]
    },
    {
      role: 'SmartBridge + AICTE · ServiceNow University Virtual Internship Program (FY26 Cohort 5)',
      location: 'Virtual',
      period: '10 Jun 2026 – 6 Jul 2026',
      bullets: [
        'Completed hands-on learning on the ServiceNow platform (ITSM, Service Catalog, Workflow Studio, Platform Analytics) and enterprise automation use cases. Grand assessment completed on 3 Jul 2026.'
      ]
    }
  ],
  achievements: [
    'Shortlisted for AI for Bharat Hackathon by AWS and awarded an official AWS badge for building JanSahayak.',
    'Earned Microsoft Certified: Azure AI Fundamentals (AI-900) – globally recognized certification.',
    'Received a college award for achieving a 2-Star rating on CodeChef through consistent competitive programming.',
    'Achieved B2 level on the Cambridge English Linguaskill proficiency test.'
  ],
  certifications: [
    'Google Cloud Gen AI Academy 2.0 (Google Cloud)',
    'Data Analytics Essentials (Cisco Networking Academy)',
    'Aviatrix Certified Engineer – Multicloud Network Associate (Aviatrix)'
  ],
  marqueeItems: [
    "Artificial Intelligence",
    "Agentic Systems",
    "Cybersecurity & Threat Intel",
    "Full-Stack Product Engineering",
    "Cloud Infrastructure",
    "Rapid Prototyping"
  ]
};

export const FOCUS_AREAS: FocusArea[] = [
  {
    number: '01',
    title: 'Artificial Intelligence & Agentic Systems',
    description: 'Designing autonomous workflows, multi-agent frameworks, and reasoning loops that bridge models with purposeful execution.'
  },
  {
    number: '02',
    title: 'Cybersecurity & Threat Detection',
    description: 'Building context-aware defense pipelines, anomaly detection systems, and telemetry architectures that safeguard network layers.'
  },
  {
    number: '03',
    title: 'Full-Stack Product Engineering',
    description: 'End-to-end development marrying responsive, performant user interfaces with scalable, resilient distributed backends.'
  },
  {
    number: '04',
    title: 'Cloud Infrastructure & Deployment',
    description: 'Architecting cloud environments, microservices, container orchestration, and reliable CI/CD delivery pipelines.'
  },
  {
    number: '05',
    title: 'Creative Problem-Solving & Rapid Prototyping',
    description: 'Iterating swiftly from ambiguous ideas to functioning software through rapid feedback loops, pragmatic trade-offs, and first-principles thinking.'
  }
];

export const PROJECTS: Project[] = [
  {
    id: 'edge',
    number: '01',
    title: 'EDGE',
    subtitle: 'Evidence-Driven Game Engine',
    category: 'AI Engineering · Data Science · Cricket Analytics',
    type: 'AI & Agents',
    description: 'An AI-powered cricket intelligence platform that transforms ball-by-ball delivery data into player insights, match predictions, tactical recommendations, and interactive analytics.',
    githubUrl: 'https://github.com/DHRUVASAI/EDGE---Evidence-Driven-Game-Engine',
    tags: ['Cricket Analytics', 'Predictive Modeling', 'Ball-by-Ball Data', 'Data Science', 'Python'],
    techStack: ['Python', 'DuckDB', 'Pandas', 'Monte Carlo Engine', 'Streamlit'],
    metrics: '14,729 Matches Analyzed · 9.5M+ Granular Deliveries Indexed',
    features: [
      'Ingests 9,569,669 ball-by-ball delivery events with Realtime Indexing across T20, ODI, and Test cricket',
      'Profiles 11,985 players with aggregated career histories and 4,104 mapped photographic profiles',
      'International Match Center with live win-chance vector engine and Kingsmead venue-adjusted reports',
      'In-match tactical bowling and crease statistics (Suryakumar Yadav 56* / Hardik Pandya 31*)'
    ],
    architectureSummary: 'High-throughput cricket telemetry pipeline running ball-by-ball stochastic win probability models, player matchup matrix indexes, and ICC rankings cache.',
    architectureDiagram: `flowchart LR
    A[CricAPI & Match Feeds] --> B[Data Ingestion Pipeline]
    B --> C[(9.5M Delivery DB)]
    B --> D[Venue & Pitch Model]
    C --> E[Stochastic Win Engine]
    D --> E
    E --> F[Live Match Center UI]
    C --> G[Player Analytics Matrix]
    G --> H[ICC Rankings Index]`,
    themeColor: '#22c55e',
    accentBg: '#090a0f'
  },
  {
    id: 'vibeverse',
    number: '02',
    title: 'VibeVerse',
    subtitle: 'Mood-Driven Media Discovery & Digital Identity',
    category: 'AI · Recommendation Systems · Full-Stack',
    type: 'Full-Stack',
    description: 'An intelligent entertainment platform that combines mood-based movie and music discovery with personalized recommendations and interactive experiences.',
    githubUrl: 'https://github.com/DHRUVASAI/VibeVerse-master',
    tags: ['Mood-Based AI', 'Recommendation Engine', 'Cinema Discovery', 'Consumer App', 'Vector Search'],
    techStack: ['React.js', 'Node.js', 'Sentence-Transformers', 'ChromaDB', 'TMDb API'],
    metrics: '8 Emotional Vectors · Multi-Modal Mood Discovery Engine',
    features: [
      'Interactive "How Are You Feeling Today?" natural language mood prompt with neural semantic matching',
      '8 Curated emotional vibe nodes: Happy, Sad, Thriller, Romantic, Action, Comedy, Mystery, Surprise Me',
      'Integrated Vibe Map & Vibe Journal for continuous emotional taste tracking',
      'Custom cinematic recommendations aligned with user acoustic profiles and narrative themes'
    ],
    architectureSummary: 'Emotion-to-media embedding pipeline pairing semantic vector distance with user mood journals to generate personalized cinematic matches.',
    architectureDiagram: `flowchart LR
    A[User Mood Prompt / Pill] --> B[Sentiment Vectorizer]
    B --> C[Mood Taxonomy Engine]
    C --> D[(Media Vector DB)]
    D --> E[Hybrid Recommender]
    E --> F[Vibe Map & Streaming Stream]
    G[Vibe Journal] --> E`,
    themeColor: '#a855f7',
    accentBg: '#0d0b18'
  },
  {
    id: 'garuda-x',
    number: '03',
    title: 'GARUDA',
    subtitle: 'Quantum Defense Network Analysis Platform',
    category: 'Cybersecurity · Network Intelligence',
    type: 'Cybersecurity',
    description: 'A context-aware network defense platform that discovers connected devices, assesses network security, and analyzes suspicious activity to generate actionable threat intelligence.',
    githubUrl: 'https://github.com/DHRUVASAI/GARUDA-',
    tags: ['Cybersecurity', 'Network Defense', 'Packet Telemetry', 'Zero-Trust SOC', 'Python'],
    techStack: ['Python', 'Flask', 'Scapy Sniffer', 'Raw Sockets', 'WebGL SOC HUD'],
    metrics: '254 Addresses Scanned in 1.3s · Sub-50ms Threat Telemetry',
    features: [
      'Automated Subnet Scanning (254 addresses scanned in 1.3 seconds across 9 active nodes)',
      'Real-time Threat Level Assessment (Operational / Medium / Critical state monitors)',
      'Dynamic Network Topology visual mapping device fingerprints and gateway nodes',
      'Explainable threat intelligence reports with instant mitigation protocol triggers'
    ],
    architectureSummary: 'Distributed network sensor daemon feeding raw ARP/IP packet telemetry into an anomaly scoring pipeline and holographic topology HUD.',
    architectureDiagram: `flowchart LR
    A[Subnet Scanner] --> B[Packet Telemetry Engine]
    B --> C[Device Fingerprinter]
    C --> D[Topology Mapper]
    B --> E[Anomaly Scoring AI]
    E --> F[Threat Level Engine]
    D --> G[SOC Holographic HUD]
    F --> G`,
    themeColor: '#06b6d4',
    accentBg: '#041019'
  },
  {
    id: 'teamforge-ai',
    number: '04',
    title: 'TeamForge.AI',
    subtitle: 'The AI Engineer That Builds With Your Squad',
    category: 'Agentic AI · Software Engineering',
    type: 'AI & Agents',
    description: 'An AI-powered engineering assistant that analyzes project ideas, designs system architectures, evaluates technology choices, and generates structured development playbooks.',
    githubUrl: 'https://github.com/DHRUVASAI/teamforge-ai',
    tags: ['Agentic AI', 'Software Engineering', 'NVIDIA Nemotron', 'System Architecture', 'LLMs'],
    techStack: ['NVIDIA Nemotron', 'LangChain', 'Docker', 'Multi-Agent Swarm', 'FastAPI'],
    metrics: 'NVIDIA Nemotron Engine · Autonomous Codebase Scaffolding',
    features: [
      'Powered by NVIDIA Nemotron for deep contextual understanding of enterprise codebases',
      'Autonomous system architecture generation with enterprise blueprint synthesis',
      'Dynamic task division and real-time integration assistance for development squads',
      'Retro-engineering terminal HUD with Mission Control status and scaffolding generator'
    ],
    architectureSummary: 'Multi-agent orchestration loop utilizing NVIDIA Nemotron to decompose product requirements into architectural blueprints and task DAGs.',
    architectureDiagram: `flowchart LR
    A[Product Spec / Prompt] --> B[Nemotron Orchestrator]
    B --> C[Architect Agent]
    B --> D[Task Divider Agent]
    B --> E[Integration Assistant]
    C --> F[Enterprise Blueprints]
    D --> G[Sprint Playbooks]
    E --> H[Mission Control Console]`,
    themeColor: '#3b82f6',
    accentBg: '#ffffff'
  },
  {
    id: 'quickpitch',
    number: '05',
    title: 'QuickPitch AI v2.5',
    subtitle: 'Executive-Grade Presentation Deck Synthesizer',
    category: 'Generative AI · GPU Acceleration · Developer Tools',
    type: 'Generative AI',
    description: 'An AI-powered presentation generator that transforms videos, audio, and transcripts into PowerPoint decks with local offline acceleration.',
    githubUrl: 'https://github.com/DHRUVASAI/QuickPitch-AI-PPT-Generator',
    tags: ['Generative AI', 'Video-to-Deck', 'Local RTX 4060', 'Native .pptx', 'Developer Tools'],
    techStack: ['Python', 'Whisper Large-v3', 'PyTorch / CUDA', 'PyAnnote', 'python-pptx'],
    metrics: '3.3s Latency · Local RTX 4060 Offline AI Acceleration',
    features: [
      'Converts YouTube videos, audio lectures, and technical docs into executive slide decks',
      'Local GPU Engine acceleration (RTX 4060) delivering ~3.3s end-to-end synthesis latency',
      '8 Curated executive color themes with support for multilingual Indic and global scripts',
      'Generates 100% native, fully editable PowerPoint (.pptx) files with speaker notes'
    ],
    architectureSummary: 'Multi-modal transcription and semantic chunking pipeline backed by local RTX 4060 tensor acceleration and native XML PowerPoint generator.',
    architectureDiagram: `flowchart LR
    A[YouTube / Audio / Text] --> B[Whisper & Audio Extractor]
    B --> C[Semantic Chunking Engine]
    C --> D[RTX 4060 Layout Synthesizer]
    D --> E[Multi-Theme Engine]
    E --> F[Native .pptx Generator]
    F --> G[Downloadable Deck]`,
    themeColor: '#f43f5e',
    accentBg: '#0f0a10'
  },
  {
    id: 'jansahayak',
    number: '06',
    title: 'JanSahayak',
    subtitle: 'Multilingual Public Welfare Assistant & RPA Form Automation',
    category: 'Generative AI · AWS · Social Impact',
    type: 'Generative AI',
    description: 'A multilingual AI assistant designed to simplify access to government welfare schemes through conversational guidance, document processing, and assisted application workflows.',
    githubUrl: 'https://github.com/DHRUVASAI/JanSahayak-',
    tags: ['Telegram Bot', 'Aadhaar OCR', 'AWS Serverless', 'RPA Automation', 'Social Impact'],
    techStack: ['Python', 'AWS Serverless', 'AWS Textract', 'Bhashini AI', 'Headless RPA'],
    metrics: '6-Step Telegram Bot Workflow · Automated State Portal RPA Filing',
    features: [
      'Live Telegram Bot assistant supporting Indic vernaculars (Telugu, Hindi, English, Tamil, Marathi, Bangla)',
      'Aadhaar card OCR image extraction automatically capturing citizen metadata and Telangana state records',
      'Automated scheme eligibility interview cross-referencing PM-KISAN and Rythu Bandhu criteria',
      'AWS Serverless backend (S3, DynamoDB, SNS) with Robotic Process Automation (RPA) portal form filing'
    ],
    architectureSummary: 'Serverless Telegram webhook pipeline utilizing AWS S3, DynamoDB, Textract OCR, and headless RPA workers to automate public service delivery.',
    architectureDiagram: `flowchart LR
    A[Telegram User] --> B[Telegram Webhook Bot]
    B --> C[Language & Scheme Matcher]
    C --> D[Aadhaar OCR Parser]
    D --> E[(AWS S3 & DynamoDB)]
    E --> F[AWS SNS SMS Dispatch]
    E --> G[Headless RPA Portal Worker]
    G --> H[Govt Welfare Portal Submitted]`,
    themeColor: '#8b5cf6',
    accentBg: '#090814'
  }
];

export const TECH_STACK = [
  { name: 'Python', category: 'Language' },
  { name: 'PyTorch / ML', category: 'AI' },
  { name: 'LangChain & Agents', category: 'AI' },
  { name: 'NVIDIA Nemotron', category: 'AI' },
  { name: 'TypeScript', category: 'Language' },
  { name: 'React / Next.js', category: 'Frontend' },
  { name: 'AWS Cloud', category: 'Cloud' },
  { name: 'Cybersecurity SOC', category: 'Security' },
  { name: 'Docker / Linux', category: 'DevOps' }
];
