import { AuthorProfile, ProjectCaseStudy, HandoffTask, RunbookFAQ, ColleagueTribute, GuestbookNote, MetricStat } from '../types/portfolio';

export const DEFAULT_PROFILES: Record<string, AuthorProfile> = {
  aria: {
    id: 'aria',
    fullName: 'Aria Chen',
    role: 'Staff Software Engineer',
    company: 'Vortex Cloud Platform',
    department: 'Core Infrastructure & Architecture',
    managerName: 'Marcus Vance',
    managerRole: 'VP of Engineering',
    startDate: 'October 12, 2023',
    submissionDate: 'October 22, 2026',
    lastWorkingDay: 'November 06, 2026',
    noticePeriodDays: 14,
    location: 'San Francisco, CA',
    avatarUrl: '/src/assets/images/profile_engineer_author_1792682886149.jpg',
    nextChapterHeadline: 'Taking a 3-week hiking sabbatical, then founding a local-first data infrastructure lab.',
    nextChapterBio: 'After 3 exhilarating years scaling distributed streams and high-throughput systems, I am preparing for my next adventure. Until November 6th, my entire focus is ensuring an airtight handoff with zero unanswered Slack threads.',
    contactEmail: 'aria.chen.dev@example.com',
    linkedinUrl: 'https://linkedin.com',
    githubUrl: 'https://github.com',
    twitterUrl: 'https://x.com',
    signatureText: 'Aria Chen',
    hasDrawnSignature: true
  },
  ritesh: {
    id: 'ritesh',
    fullName: 'Ritesh Gautam',
    role: 'Lead Architect & Senior Engineer',
    company: 'Apex Digital Solutions',
    department: 'Full-Stack & Cloud Systems',
    managerName: 'Devon Lee',
    managerRole: 'Director of Technology',
    startDate: 'March 15, 2023',
    submissionDate: 'October 22, 2026',
    lastWorkingDay: 'November 06, 2026',
    noticePeriodDays: 14,
    location: 'Global Remote',
    avatarUrl: '/src/assets/images/profile_engineer_author_1792682886149.jpg',
    nextChapterHeadline: 'Embarking on new horizon engineering leadership & distributed systems exploration.',
    nextChapterBio: 'Grateful for the incredible team, late-night breakthrough deployments, and resilient platforms we architected together. Here is my structured handover and official farewell portfolio.',
    contactEmail: 'riteshgautam.9967@gmail.com',
    linkedinUrl: 'https://linkedin.com',
    githubUrl: 'https://github.com',
    twitterUrl: 'https://x.com',
    signatureText: 'Ritesh Gautam',
    hasDrawnSignature: true
  },
  julian: {
    id: 'julian',
    fullName: 'Julian Vance',
    role: 'Principal Product Designer',
    company: 'Kite Creative Labs',
    department: 'Product Experience & Design Systems',
    managerName: 'Elena Rostova',
    managerRole: 'Chief Product Officer',
    startDate: 'January 9, 2024',
    submissionDate: 'October 22, 2026',
    lastWorkingDay: 'November 06, 2026',
    noticePeriodDays: 14,
    location: 'New York, NY',
    avatarUrl: '/src/assets/images/profile_engineer_author_1792682886149.jpg',
    nextChapterHeadline: 'Stepping into independent studio practice & guest lecturing typography.',
    nextChapterBio: 'Designing every microinteraction and token library at Kite has been the honor of my career. Leaving behind clean Figma components, 0 unlinked variables, and full token documentation.',
    contactEmail: 'julian.vance@example.com',
    linkedinUrl: 'https://linkedin.com',
    githubUrl: 'https://github.com',
    twitterUrl: 'https://x.com',
    signatureText: 'Julian Vance',
    hasDrawnSignature: true
  }
};

export const DEFAULT_STATS: MetricStat[] = [
  {
    id: 'prs',
    value: '418',
    label: 'Pull Requests Merged',
    context: 'Across 14 microservices and libraries'
  },
  {
    id: 'uptime',
    value: '99.99%',
    label: 'Core System Uptime',
    context: 'Zero severity-1 breaches on my watch'
  },
  {
    id: 'latency',
    value: '-64ms',
    label: 'P99 Latency Reduced',
    context: 'Saving $380k in annual compute spend'
  },
  {
    id: 'friday',
    value: '0',
    label: 'Friday 5 PM Outages',
    context: 'The streak remains proudly unbroken'
  }
];

export const LETTER_TEMPLATES: Record<string, { title: string; subtitle: string; body: (p: AuthorProfile) => string }> = {
  gracious: {
    title: 'Formal & Gracious',
    subtitle: 'Executive, dignified, and warmly appreciative of the team’s trust.',
    body: (p: AuthorProfile) => `Dear ${p.managerName},

Please accept this letter as formal notification that I am resigning from my position as ${p.role} at ${p.company}. In accordance with my notice period, my last working day will be ${p.lastWorkingDay}.

Reflecting on my tenure since ${p.startDate}, I want to extend my deepest appreciation for your leadership, mentorship, and the opportunities provided to me within ${p.department}. Together, our team has achieved remarkable technical and product milestones—delivering mission-critical platforms, improving our reliability, and building a culture of craftsmanship that I will always cherish.

Over the next two weeks leading to ${p.lastWorkingDay}, I am fully committed to executing a seamless transition. As detailed in the accompanying Handoff Matrix below, all documentation, repository architectures, and in-flight initiatives have been organized with assigned leads to guarantee zero interruption to business continuity.

I hope to stay closely in touch and wish you, our leadership, and the entire team continued success in the quarters ahead. Thank you sincerely for three unforgettable years.

With warm regards and respect,`
  },
  direct: {
    title: 'Direct & Pragmatic',
    subtitle: 'Clear, milestone-oriented, and focused on seamless operational continuity.',
    body: (p: AuthorProfile) => `Dear ${p.managerName},

This document serves as formal notice of my resignation from ${p.company} as ${p.role}, effective today, ${p.submissionDate}. My final day of employment will be ${p.lastWorkingDay}.

The transition timeline is organized as follows:
1. Operational Handoff: Handing over primary ownership of the core microservices and deployment pipelines to designated team leads by end of next week.
2. Knowledge Transfer: Completion of 4 architecture walkthroughs and updated runbook documentation stored in Notion and GitHub.
3. Access & Rotation: Scheduled offboarding sync with SecOps on ${p.lastWorkingDay}.

I appreciate the collaboration during my time with the team. I look forward to finalizing the remaining sprint deliverables and leaving the infrastructure in exemplary standing.

Best regards,`
  },
  heartfelt: {
    title: 'Heartfelt & Nostalgic',
    subtitle: 'Celebrating shared memories, breakthrough moments, and teammates.',
    body: (p: AuthorProfile) => `Dearest ${p.managerName} and the wonderful ${p.company} team,

It is bittersweet to write these words, but after careful reflection, I am officially submitting my resignation as ${p.role}. My last day will be ${p.lastWorkingDay}.

From my first day on ${p.startDate} when we wrestled with our initial staging deployments over cold takeout pizza, to launching systems serving millions of daily users, this journey has shaped me profoundly. The trust you placed in me to spearhead foundational initiatives meant the world to me. 

More than the code merged or the latency curves shaved, what I will cherish most is the laughter in our retro syncs, the patient code reviews, and the extraordinary camaraderie of this group. You are among the sharpest, kindest professionals I have ever worked alongside.

I’m dedicating my final two weeks to making sure everyone feels 100% comfortable taking the reins. Please consider me an eternal cheerleader for this company.

With genuine gratitude and love,`
  },
  micdrop: {
    title: 'The Honest Mic Drop',
    subtitle: 'Witty, celebratory, acknowledging the quirks of modern tech work.',
    body: (p: AuthorProfile) => `Hey ${p.managerName},

Consider this my official, beautifully formatted two-week notice as ${p.role} at ${p.company}. My last official login will occur on ${p.lastWorkingDay}.

Let the permanent record show:
- I leave the codebase 64% faster than I found it.
- I fixed more merge conflicts than I have grey hairs (close call, though).
- The staging environment is currently working—do not breathe on it until Monday.
- I have thoroughly commented all esoteric regex patterns so no one has to curse my name at 3 AM.

It has been an absolute blast shipping high-stakes features with this squad. I’ve documented every hidden cron job, handed over root keys, and created this interactive portfolio so no one can say "Aria left without leaving notes."

Buy me a coffee before ${p.lastWorkingDay}, and let’s toast to clean logs!

Cheers and onwards,`
  }
};

export const DEFAULT_CASE_STUDIES: ProjectCaseStudy[] = [
  {
    id: 'aurora-mesh',
    title: 'Project Aurora: Distributed Edge Mesh',
    subtitle: 'Sub-second real-time routing engine handling 140M requests/day',
    timeframe: '2024 – 2025',
    role: 'Lead Architect',
    imageUrl: '/src/assets/images/showcase_core_architecture_1792682886684.jpg',
    metric: '-64% Latency',
    metricContext: 'P99 global response reduced from 180ms to 64ms',
    summary: 'Rewrote the core routing topology from an aging single-region proxy into a geo-distributed edge mesh with zero downtime.',
    detailedDescription: 'Spearheaded the redesign and multi-phase rollout of the platform backbone. Migrated 4.2M active sessions with automated canary verification and zero customer-facing errors. Introduced distributed tracing and circuit-breakers that prevented cascaded failures during Black Friday peak traffic.',
    technologies: ['TypeScript', 'Go', 'Distributed Cache', 'OpenTelemetry', 'Kubernetes'],
    handoffOwner: 'David K. (Senior Infra Lead)',
    handoffDocLink: 'https://notion.so/aurora-architecture-v3',
    impactBullets: [
      'Engineered multi-region failover resolving 99.999% failover targets in <800ms',
      'Reduced monthly cloud egress bills by $32,000 via intelligent payload compression',
      'Authored 48-page operational handbook and held 6 training workshops for operations team'
    ]
  },
  {
    id: 'design-system',
    title: 'Aether Component & Token System',
    subtitle: 'Unified design language and React component library across 4 product suites',
    timeframe: '2024',
    role: 'Co-creator & Engineering Partner',
    imageUrl: '/src/assets/images/showcase_design_system_1792682887311.jpg',
    metric: '10x Speed',
    metricContext: 'Front-end feature delivery time cut from weeks to days',
    summary: 'Partnered with Product Design to build a tokenized, accessible design library used by 32 engineers and adopted across all customer apps.',
    detailedDescription: 'Built accessible, battle-tested UI primitives adhering to strict WCAG AAA guidelines. Enforced zero layout shifts, headless token synchronization with Figma APIs, and automated visual regression testing in CI pipelines.',
    technologies: ['React 19', 'Tailwind CSS', 'Figma API', 'Radix Primitives', 'Storybook'],
    handoffOwner: 'Maya S. (Staff UI Engineer)',
    handoffDocLink: 'https://github.com/vortex/aether-design-system',
    impactBullets: [
      'Standardized 54 reusable components with 100% TypeScript type coverage',
      'Eliminated 14 duplicate ad-hoc modal and dropdown implementations across repos',
      'Created automated color contrast & accessibility linting step in pre-commit hooks'
    ]
  },
  {
    id: 'monolith-migration',
    title: 'The Great Database Decoupling',
    subtitle: 'Splitting monolithic database into isolated domain event streams',
    timeframe: '2025',
    role: 'Principal Contributor',
    metric: '0s Outage',
    metricContext: '450GB data migrated live with dual-write reconciliation',
    summary: 'Led the high-wire migration of our legacy PostgreSQL billing table into idempotent Kafka streams and purpose-built read replicas.',
    detailedDescription: 'Devised a shadow dual-write pipeline verifying data parity for 30 consecutive days before cutover. Successfully deprecated 18 brittle foreign keys that previously triggered cascading table locks during customer billing runs.',
    technologies: ['PostgreSQL', 'Kafka', 'CDC Debezium', 'Redis Streams'],
    handoffOwner: 'Kenji T. (Principal Data Engineer)',
    handoffDocLink: 'https://notion.so/data-decoupling-runbook',
    impactBullets: [
      'Completely eliminated peak 9 AM database connection exhaustion incidents',
      'Zero lost transactions across $18M in quarterly billing volume during migration',
      'Documented rollback protocols and disaster drills with 100% team pass rate'
    ]
  },
  {
    id: 'mentorship-craft',
    title: 'Engineering Craftsmanship & Mentorship',
    subtitle: 'Cultivating culture, RFC standards, and mentoring rising talent',
    timeframe: '2023 – 2026',
    role: 'Internal Champion',
    metric: '6 Promoted',
    metricContext: 'Directly mentored 6 engineers who advanced to Senior/Staff',
    summary: 'Founded weekly architecture tear-downs, created onboarding bootcamps, and institutionalized friendly, empathetic code review principles.',
    detailedDescription: 'Championed clear asynchronous RFC processes to evaluate architectural trade-offs without endless meeting loops. Hosted 28 internal tech talks and wrote the foundational onboarding curriculum for incoming staff hires.',
    technologies: ['Engineering RFCs', 'Tech Talks', 'Career Coaching', 'Pair Programming'],
    handoffOwner: 'Sarah T. (Engineering Manager)',
    handoffDocLink: 'https://notion.so/engineering-onboarding-playbook',
    impactBullets: [
      'Reduced average new-hire ramp time to first production pull request from 18 days to 4 days',
      'Standardized RFC template adopted company-wide by 120+ engineers',
      'Delivered keynote at internal annual hackathon on fault-tolerant systems'
    ]
  }
];

export const DEFAULT_HANDOFF_TASKS: HandoffTask[] = [
  {
    id: 'task-1',
    title: 'Core Mesh Ingress & Edge Proxy Ownership',
    category: 'Core Systems',
    assignee: 'David K.',
    status: 'Ready for Review',
    dueDate: 'Oct 28',
    notes: 'Walkthrough completed on Oct 20. David has repository admin access and deployment rights.',
    resourceLink: 'https://github.com/vortex/edge-mesh-proxy'
  },
  {
    id: 'task-2',
    title: 'Aether Component Token Sync & Figma Hooks',
    category: 'Core Systems',
    assignee: 'Maya S.',
    status: 'Completed',
    dueDate: 'Oct 25',
    notes: 'Handover pairing completed. Maya published v2.4.0 independently last Thursday.',
    resourceLink: 'https://github.com/vortex/aether-design'
  },
  {
    id: 'task-3',
    title: 'Production SSL Wildcard Certificate Rotation Runbook',
    category: 'Documentation',
    assignee: 'Kenji T.',
    status: 'In Progress',
    dueDate: 'Nov 02',
    notes: 'Documenting the cert-manager ACME webhook procedure and fallback Cloudflare manual DNS steps.',
    resourceLink: 'https://notion.so/ssl-rotation-guide'
  },
  {
    id: 'task-4',
    title: 'Staging Environment IAM & Vault Secrets Rotation',
    category: 'Access & Keys',
    assignee: 'SecOps Team (Devon)',
    status: 'Scheduled',
    dueDate: 'Nov 06',
    notes: 'Scheduled for 3:00 PM on final day. Handing over Master GPG key and Slack admin privileges.',
    resourceLink: 'https://vault.internal/keys'
  },
  {
    id: 'task-5',
    title: 'Q4 Performance OKR Metrics & Dashboard Handover',
    category: 'Ongoing Initiatives',
    assignee: 'Sarah T.',
    status: 'Ready for Review',
    dueDate: 'Oct 30',
    notes: 'Grafana dashboards shared with executive team. Alerting thresholds verified.',
    resourceLink: 'https://grafana.internal/d/perf-q4'
  }
];

export const DEFAULT_RUNBOOK_FAQS: RunbookFAQ[] = [
  {
    id: 'faq-1',
    question: 'What is that cron job running every Tuesday at 3:15 AM?',
    answer: 'It vacuums and analyzes the audit_events partition table and archives stale cold logs to S3 glacier storage. It is strictly idempotent and monitored by pager alert #412.',
    emergencyContact: 'Slack #infra-emergencies or David K.'
  },
  {
    id: 'faq-2',
    question: 'Where are the staging sandbox test credentials stored?',
    answer: 'In 1Password under "Engineering Shared -> Staging Vault". The master recovery phrase is stored in the company safe with the Director of IT.',
    emergencyContact: 'Devon Lee (IT Operations)'
  },
  {
    id: 'faq-3',
    question: 'If the P99 latency spikes during a flash sale, what is step 1?',
    answer: 'Run `/scale-edge-mesh burst-mode` in Slack #ops-command. This activates our multi-cloud cache tier with 300% head-room instantly.',
    emergencyContact: 'Kenji T. or On-Call Engineer'
  },
  {
    id: 'faq-4',
    question: 'Can I reach Aria if a catastrophic emergency occurs after the last day?',
    answer: 'Yes! My personal phone number and personal email are preserved below. I am always happy to answer a quick question to help my teammates succeed.',
    emergencyContact: 'Personal Email or Mobile'
  }
];

export const DEFAULT_TRIBUTES: ColleagueTribute[] = [
  {
    id: 'trib-1',
    recipientName: 'Marcus Vance',
    recipientRole: 'VP of Engineering',
    message: 'Thank you for giving me the latitude to dream up bold technical bets and having my back whenever we challenged legacy assumptions.',
    tag: 'Executive Sponsor'
  },
  {
    id: 'trib-2',
    recipientName: 'David & Kenji',
    recipientRole: 'Staff Infrastructure Partners',
    message: 'The best pair programmers in the industry. Late-night debugging sessions with you two felt like solving master puzzles together.',
    tag: 'Systems Cohort'
  },
  {
    id: 'trib-3',
    recipientName: 'Maya & Product Design',
    recipientRole: 'Design Systems Team',
    message: 'You taught me that engineering without relentless empathy for the user is just moving bytes. Aether will continue to shine in your hands.',
    tag: 'Design Partners'
  },
  {
    id: 'trib-4',
    recipientName: 'All Engineering Mentees',
    recipientRole: 'Rising Talent',
    message: 'Watching each of you grow into confident, fearless system builders has been the absolute highlight of my 3 years here.',
    tag: 'Next Generation'
  }
];

export const INITIAL_GUESTBOOK_NOTES: GuestbookNote[] = [
  {
    id: 'note-1',
    authorName: 'Marcus Vance',
    roleOrTeam: 'VP of Engineering',
    message: 'You set the gold standard for what a Staff Engineer looks like at this company. Thank you for your leadership and brilliant systems. You will be sorely missed!',
    timestamp: '2 hours ago',
    emoji: '⭐'
  },
  {
    id: 'note-2',
    authorName: 'Maya Lin',
    roleOrTeam: 'Staff UI Designer',
    message: 'No one has ever respected design tokens the way you did! Thank you for making our design system dream a reality. Go crush your next chapter!',
    timestamp: '5 hours ago',
    emoji: '🎨'
  },
  {
    id: 'note-3',
    authorName: 'David K.',
    roleOrTeam: 'Infrastructure Lead',
    message: 'Promising to never deploy to prod after 4 PM on Fridays in your honor. Safe travels on the Pacific Crest Trail!',
    timestamp: 'Yesterday',
    emoji: '🚀'
  }
];
