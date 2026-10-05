import { Project, WorkExperience, SkillCategory } from '../types/portfolio';

// Local high-fidelity image assets generated for Sapna's portfolio
import sapnaPortrait from '../assets/images/sapna_portrait_1791203775208.webp';
import hero3DImg from '../assets/images/hero_3d_developer_1791205738670.webp';
import about3DImg from '../assets/images/about_3d_developer_1791205752043.webp';
import adasPortalImg from '../assets/images/adas_portal_ui_1791203792361.webp';
import analyticsDashboardImg from '../assets/images/analytics_dashboard_1791203809588.webp';
import fullstackPlatformImg from '../assets/images/fullstack_platform_1791203825759.webp';

export const PERSONAL_INFO = {
  name: 'Sapna Labde',
  title: 'Frontend Developer',
  specialization: 'React.js, Real-Time Architecture & Performance Optimization',
  experienceYears: '4+',
  location: 'Pune, Maharashtra, India',
  email: 'sapnal1997@gmail.com',
  phone: '+91-8600825135',
  linkedinUrl: 'https://www.linkedin.com/in/sapna-labde',
  linkedinDisplay: 'in/sapna-labde',
  githubUrl: 'https://github.com/sapnal1997', // Accessible fallback
  portraitImage: sapnaPortrait,
  hero3DImage: hero3DImg,
  about3DImage: about3DImg,
  bio: 'Frontend Developer with 4+ years of experience building scalable, real-time, and high-performance web applications using React.js and modern JavaScript ecosystems. Strong expertise in state management (Redux), real-time communication (Socket.io), REST APIs, authentication systems, and performance optimization. Experienced in product environments delivering responsive, production-grade applications handling live data streams. Passionate about clean architecture, reusable components, and delivering seamless user experiences at scale.',
  quickStats: [
    { label: 'Production Uptime', value: '99.8%' },
    { label: 'UI Speed Improvement', value: '+38%' },
    { label: 'Technical Debt Cut', value: '-44%' },
    { label: 'Active Dashboard Users', value: '1,000+' }
  ]
};

export const WORK_EXPERIENCES: WorkExperience[] = [
  {
    id: 'starkenn',
    role: 'Frontend Developer',
    company: 'Starkenn Technologies Pvt Ltd',
    period: 'April 2023 – February 2026',
    location: 'Pune, India',
    type: 'Full-time',
    summary: 'Spearheaded frontend architecture and real-time dashboard engineering for telemetry-driven automotive platforms, serving 1,000+ daily active enterprise users.',
    achievements: [
      'Engineered and deployed Front End solutions for a dashboard project serving 1,000+ users, utilizing React.js and TypeScript over 12 months to maintain 99.8% uptime and boost UI load speed by 38% through code-splitting, Vite, and Webpack optimizations while ensuring cross-browser compatibility and fully responsive UI across devices.',
      'Spearheaded migration of legacy UI to React.js for a multi-module web application over 18 months, achieving 44% reduction in technical debt, 27% faster feature delivery cadence, and consistent component library integration using TypeScript.',
      'Directed end-to-end implementation of a feature-rich analytics dashboard using React.js, TypeScript, and Redux Toolkit over 9 months, increasing user engagement by 23% and supporting seamless integration with third-party APIs for real-time insights.',
      'Implemented version control strategies using Git, streamlining code collaboration for a 6-member team and reducing merge conflicts by 68% over 18 months, ensuring efficient CI/CD pipeline integration via GitHub Actions and integrated AWS services including S3, SES, and CodePipeline.',
      'Diagnosed and resolved complex frontend issues through advanced debugging in Chrome DevTools and React Developer Tools, decreasing critical bug resolution time by 63% across 14 releases over an 18-month project lifecycle.'
    ],
    technologies: [
      'React.js',
      'TypeScript',
      'Redux Toolkit',
      'Socket.io',
      'Vite',
      'Webpack',
      'Tailwind CSS',
      'AWS (S3, SES, CodePipeline)',
      'GitHub Actions',
      'Git'
    ],
    keyMetrics: [
      { label: 'UI Load Speed', value: '+38%' },
      { label: 'Tech Debt Reduction', value: '-44%' },
      { label: 'Critical Bug Time', value: '-63%' },
      { label: 'Merge Conflict Reduction', value: '-68%' }
    ]
  },
  {
    id: 'cloudstrats',
    role: 'Full Stack Developer',
    company: 'Cloudstrats Pvt Ltd',
    period: 'January 2022 – March 2023',
    location: 'Pune, India',
    type: 'Full-time',
    summary: 'Delivered end-to-end web applications combining React.js frontend interfaces with robust Python (Django/Flask) backend architectures.',
    achievements: [
      'Delivered full stack web solutions by connecting React.js user interfaces with Django and Flask servers, supporting consistent state management and reliable cross-layer integration.',
      'Designed and deployed REST APIs while redesigning database structures in Django and Flask, reinforcing data consistency and streamlining transactions between client and server.',
      'Integrated secure authentication workflows and granular role-based access control (RBAC) mechanisms to safeguard user data and enforce permissions across full stack applications.',
      'Developed interactive wireframes using Figma for 4 web projects over 12 months, enabling client approval within one week on 90% of deliverables and accelerating front-end React.js implementation by 30%.'
    ],
    technologies: [
      'React.js',
      'JavaScript',
      'Python',
      'Django',
      'Flask',
      'REST APIs',
      'RBAC Auth',
      'Figma',
      'SQL / Databases'
    ],
    keyMetrics: [
      { label: 'Implementation Cadence', value: '+30%' },
      { label: 'Client Approval Rate', value: '90%' },
      { label: 'Web Projects Delivered', value: '4' }
    ]
  }
];

export const PROJECTS: Project[] = [
  {
    id: 'adas-v3',
    title: 'ADAS Portal — Version 3',
    subtitle: 'Next-Generation Advanced Driver Assistance Systems Platform',
    category: 'Real-Time & ADAS',
    period: '2024 – 2026',
    company: 'Starkenn Technologies',
    summary: 'A mission-critical automotive telematics hub delivering live vehicle telemetry tracking, socket-based instant alerts, polygon geofencing, and integrated operator chat.',
    image: adasPortalImg,
    tags: ['React.js', 'TypeScript', 'Socket.io', 'Redux Toolkit', 'Geofencing', 'Live Telemetry'],
    metrics: [
      { label: 'Socket Latency', value: '<25ms' },
      { label: 'Telemetry Frequency', value: '60 FPS' },
      { label: 'Geofence Precision', value: 'Sub-meter' }
    ],
    bulletPoints: [
      'Enhanced ADAS Portal with advanced real-time features including live notifications, geofencing, reporting dashboards, and integrated chat support.',
      'Implemented socket-based real-time communication for instant alerts and live telemetry updates.',
      'Architected Redux-based state management for efficient data flow across complex telemetry modules.',
      'Developed geofencing functionality enabling location-based vehicle monitoring and automated alert triggers.'
    ],
    architectureDetails: {
      overview: 'Engineered as a high-throughput reactive single-page application capable of ingesting high-frequency CAN-bus and GPS streams relayed over WebSockets, transforming raw payloads into responsive canvas-rendered vector maps and synchronized gauge dashboards.',
      keyChallenges: [
        'Preventing main-thread stuttering when 100+ telemetry packets arrive per second.',
        'Synchronizing geofence polygon boundary checks with dynamic GPS coordinate updates.',
        'Ensuring zero state corruption during intermittent cellular connectivity drops.'
      ],
      technicalSolutions: [
        'Implemented custom requestAnimationFrame batching queue in React and Redux middleware to throttle UI re-renders to 60fps.',
        'Offloaded coordinate ray-casting polygon algorithms to client-side spatial helpers for zero-latency geofence notifications.',
        'Constructed optimistic socket reconnection protocols with automated state synchronization upon network recovery.'
      ],
      stack: ['React 18', 'TypeScript', 'Redux Toolkit', 'Socket.io Client', 'Tailwind CSS', 'Vite']
    }
  },
  {
    id: 'starkenn-analytics',
    title: 'Enterprise Real-Time Analytics Dashboard',
    subtitle: 'High-Throughput Analytics & Telemetry Insights Engine',
    category: 'Analytics & Performance',
    period: '2023 – 2025',
    company: 'Starkenn Technologies',
    summary: 'An enterprise analytics console serving 1,000+ daily fleet operators with sub-second page loads, custom visual report builders, and automated AWS pipeline integration.',
    image: analyticsDashboardImg,
    tags: ['React.js', 'Redux Toolkit', 'Vite', 'Code-Splitting', 'AWS SES & S3', 'REST APIs'],
    metrics: [
      { label: 'Uptime', value: '99.8%' },
      { label: 'Page Load Speed', value: '+38%' },
      { label: 'User Engagement', value: '+23%' }
    ],
    bulletPoints: [
      'Directed end-to-end implementation of a feature-rich analytics dashboard using React.js, TypeScript, and Redux Toolkit over 9 months.',
      'Increased user engagement by 23% and supported seamless integration with third-party APIs for real-time telemetry insights.',
      'Optimized asset bundling through dynamic code-splitting in Vite and Webpack, boosting overall UI load speed by 38%.',
      'Configured CI/CD automation with GitHub Actions and integrated AWS S3 for report storage and AWS SES for scheduled notification delivery.'
    ],
    architectureDetails: {
      overview: 'Modular dashboard architecture utilizing compound component patterns, atomic state slices via Redux Toolkit, and route-level code splitting with lazy loading.',
      keyChallenges: [
        'Heavy initial JavaScript bundles degrading first-contentful-paint on mobile field devices.',
        'Complex cross-filter aggregation over tens of thousands of fleet telemetry logs.'
      ],
      technicalSolutions: [
        'Restructured routing with dynamic imports and Vite manual chunk distribution.',
        'Normalized Redux entity states, eliminating redundant O(n) array searches in favor of O(1) indexed lookups.'
      ],
      stack: ['React.js', 'TypeScript', 'Redux Toolkit', 'Vite', 'AWS S3', 'AWS SES', 'GitHub Actions']
    }
  },
  {
    id: 'adas-v2',
    title: 'ADAS Portal — Version 2',
    subtitle: 'High-Performance Vehicle Telemetry Tracking Interface',
    category: 'Real-Time & ADAS',
    period: '2023 – 2024',
    company: 'Starkenn Technologies',
    summary: 'Telemetry monitoring system designed for continuous live data streaming, responsive cross-device consistency, and zero-latency instrument displays.',
    image: fullstackPlatformImg,
    tags: ['React.js', 'Telemetry Streaming', 'Responsive UI', 'Performance Optimization'],
    metrics: [
      { label: 'Bug Resolution', value: '-63%' },
      { label: 'Cross-Device Coverage', value: '100%' },
      { label: 'Latency Overhead', value: '<16ms' }
    ],
    bulletPoints: [
      'Developed live data monitoring system enabling real-time vehicle telemetry tracking.',
      'Converted UI/UX designs into pixel-perfect production-ready code with responsive desktop, tablet, and mobile layouts.',
      'Optimized frontend performance for handling continuous telemetry streams with minimal latency.',
      'Collaborated cross-functionally with hardware firmware engineers and product leads to deliver scalable features.'
    ],
    architectureDetails: {
      overview: 'Foundation system that introduced component-driven development and telemetry parsing for the ADAS fleet line.',
      keyChallenges: [
        'Ensuring touch responsiveness on in-cab ruggedized tablet hardware.',
        'High memory footprint from continuous stream subscriptions.'
      ],
      technicalSolutions: [
        'Strict memory lifecycle cleanup in useEffect hooks and lightweight DOM rendering.',
        'Engineered responsive touch targets exceeding 44px for gloved and mobile operator usage.'
      ],
      stack: ['React.js', 'JavaScript', 'Context API', 'SCSS', 'Chrome DevTools']
    }
  },
  {
    id: 'cloudstrats-suite',
    title: 'Full Stack Enterprise Cloud Solutions',
    subtitle: 'Secure Multi-Role Web Applications with Django & React',
    category: 'Full Stack Architecture',
    period: '2022 – 2023',
    company: 'Cloudstrats',
    summary: 'Enterprise web systems featuring strict Role-Based Access Control (RBAC), normalized relational database schemas, and accelerated Figma-to-code workflows.',
    image: fullstackPlatformImg,
    tags: ['React.js', 'Django', 'Flask', 'REST APIs', 'RBAC Auth', 'Figma'],
    metrics: [
      { label: 'Design Approval', value: '1 Week' },
      { label: 'Delivery Cadence', value: '+30%' },
      { label: 'Web Projects', value: '4 Delivered' }
    ],
    bulletPoints: [
      'Delivered full stack web solutions by connecting React.js user interfaces with Django and Flask servers.',
      'Designed and deployed REST APIs while redesigning database structures in Django and Flask to enforce data integrity.',
      'Integrated secure authentication workflows and granular role-based access control (RBAC) mechanisms.',
      'Developed interactive wireframes in Figma for 4 web projects over 12 months, enabling 90% client approval within 1 week.'
    ],
    architectureDetails: {
      overview: 'Hybrid frontend-backend development coupling reactive user interfaces with robust Python web microservices.',
      keyChallenges: [
        'Complex permission inheritance models between client organizations, branch managers, and operational staff.',
        'Gap between client design approvals and functional frontend implementation.'
      ],
      technicalSolutions: [
        'Designed JWT-based RBAC middleware validated at both API route and React component boundary levels.',
        'Created a systematic Figma design token library mapping directly to reusable React component props.'
      ],
      stack: ['React.js', 'Python', 'Django', 'Flask', 'PostgreSQL', 'Figma']
    }
  }
];

export const HIGHLIGHT_SKILLS = [
  { name: 'React.js', proficiency: 96, color: '#3b82f6', tag: 'Core Frontend', barColor: 'from-orange-500 to-amber-400' },
  { name: 'TypeScript', proficiency: 92, color: '#0ea5e9', tag: 'Type Safety', barColor: 'from-sky-400 to-blue-500' },
  { name: 'Redux Toolkit', proficiency: 94, color: '#8b5cf6', tag: 'State Management', barColor: 'from-purple-500 to-indigo-500' },
  { name: 'Socket.io', proficiency: 95, color: '#f59e0b', tag: 'Real-Time Telemetry', barColor: 'from-amber-400 to-orange-500' },
  { name: 'Tailwind CSS', proficiency: 93, color: '#06b6d4', tag: 'Responsive UI', barColor: 'from-teal-400 to-cyan-500' },
  { name: 'Vite & Webpack', proficiency: 90, color: '#eab308', tag: 'Bundling & Perf', barColor: 'from-yellow-400 to-amber-500' },
  { name: 'Python / Django', proficiency: 86, color: '#10b981', tag: 'Backend & APIs', barColor: 'from-emerald-400 to-teal-500' },
  { name: 'AWS & CI/CD', proficiency: 88, color: '#f97316', tag: 'Cloud Deployment', barColor: 'from-orange-500 to-rose-500' },
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: 'Languages',
    description: 'Core programming languages used daily in high-throughput production environments',
    skills: [
      { name: 'JavaScript (ESNext)', level: 'Advanced', highlight: true, useCase: 'Modern asynchronous programming, event loop optimization, WebSockets' },
      { name: 'TypeScript', level: 'Advanced', highlight: true, useCase: 'Strict typing, generic component interfaces, Redux action safety' },
      { name: 'Python', level: 'Proficient', useCase: 'Django & Flask backend APIs, data munging, scripting' }
    ]
  },
  {
    title: 'Frontend Engineering',
    description: 'Component architecture, state management, and modern bundlers',
    skills: [
      { name: 'React.js', level: 'Expert', highlight: true, useCase: 'Hooks, custom primitives, code-splitting, compound components' },
      { name: 'Redux & Redux Toolkit', level: 'Advanced', highlight: true, useCase: 'Normalized state stores, entity adapters, middleware streaming' },
      { name: 'Context API', level: 'Advanced', useCase: 'Theme, authentication, and localization state distribution' },
      { name: 'Tailwind CSS', level: 'Advanced', highlight: true, useCase: 'Utility-first responsive layouts, zero runtime CSS overhead' },
      { name: 'Vite & Webpack', level: 'Advanced', highlight: true, useCase: 'Tree shaking, bundle optimization, fast HMR, manual chunking' },
      { name: 'Material UI & SCSS', level: 'Proficient', useCase: 'Enterprise component systems and custom design tokens' },
      { name: 'Figma', level: 'Proficient', useCase: 'Interactive wireframing, rapid UI/UX prototyping, design-to-code' }
    ]
  },
  {
    title: 'Real-Time & Telemetry',
    description: 'Streaming protocols, low-latency data feeds, and reactive interfaces',
    skills: [
      { name: 'Socket.io & WebSockets', level: 'Advanced', highlight: true, useCase: 'Bidirectional telemetry, instant vehicle alerts, live chat feeds' },
      { name: 'Live Geofencing', level: 'Advanced', highlight: true, useCase: 'Dynamic boundary calculation, coordinate tracking, alert triggers' },
      { name: 'Telemetry Streaming', level: 'Advanced', highlight: true, useCase: 'High-frequency telemetry ingestion with throttled 60fps rendering' }
    ]
  },
  {
    title: 'Backend & Data',
    description: 'Server architecture, API contract design, and security models',
    skills: [
      { name: 'Django & Flask', level: 'Proficient', useCase: 'RESTful API microservices, ORM query optimization' },
      { name: 'REST APIs', level: 'Advanced', highlight: true, useCase: 'Contract-first endpoint design, payload compression, error handling' },
      { name: 'RBAC Authentication', level: 'Advanced', useCase: 'Granular role-based access control and token workflows' }
    ]
  },
  {
    title: 'Cloud, CI/CD & Tooling',
    description: 'Cloud deployment, automated pipelines, and performance debugging',
    skills: [
      { name: 'AWS Services', level: 'Proficient', useCase: 'S3 static asset storage, SES transactional notifications, CodePipeline' },
      { name: 'GitHub Actions & CI/CD', level: 'Proficient', highlight: true, useCase: 'Automated test suites, linting, build pipelines, deployments' },
      { name: 'Git & Collaboration', level: 'Advanced', useCase: 'Branching models, merge conflict reduction, release cadence' },
      { name: 'Chrome & React DevTools', level: 'Advanced', highlight: true, useCase: 'Profiler memory leak audits, render pass debugging (-63% bug resolution)' }
    ]
  }
];

export const EDUCATION = {
  degree: "Bachelor's Degree in Electronics and Communication",
  institution: 'Rashtrasant Tukadoji Maharaj Nagpur University (RTMNU)',
  location: 'Nagpur, Maharashtra, India',
  graduationYear: '2018',
  highlights: [
    'Strong grounding in digital electronics, microprocessors, signals & systems, and hardware-software communication.',
    'Directly underpins technical intuition in handling embedded telemetry streams, CAN-bus data formats, and ADAS communication protocols.',
    'Systematic problem-solving discipline applied to modern distributed web architectures.'
  ]
};
