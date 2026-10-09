// Content from Pratyush Singh's resume.

export const profile = {
  name: 'Pratyush Singh',
  first: 'Pratyush',
  last: 'Singh',
  role: 'Cloud & Full-Stack Engineer',
  location: 'Bhopal, India',
  email: 'pratyushsingh604@gmail.com',
  phone: '+91 70547 35054',
  resume: './Pratyush_Singh_Resume.pdf',
  status: 'Open to SDE & Cloud roles',
  headline: ['Full-stack products,', 'shipped to the cloud.'],
  summary:
    'Computer Science Engineering student (B.Tech, 2027) specializing in Cloud Computing and Automation, with a focus on backend and cloud engineering. I work across the stack with TypeScript, Node.js, React and PostgreSQL, and deploy applications on AWS, Vercel and Neon.',
  links: {
    github: 'https://github.com/pratyushsingh04',
    linkedin: 'https://www.linkedin.com/in/pratyush-singh-28411328a/',
    leetcode: 'https://leetcode.com/u/Pratyush23__/',
  },
}

export const stats = [
  { value: 85, suffix: '+', label: 'REST endpoints shipped' },
  { value: 300, suffix: '+', label: 'DSA problems solved' },
  { value: 5, suffix: '★', label: 'C++ on HackerRank' },
  { value: 8, suffix: '.00', label: 'CGPA at VIT Bhopal' },
]

export const marquee = ['AWS EC2', 'Docker', 'Next.js', 'TypeScript', 'Node.js', 'Express', 'PostgreSQL', 'Prisma', 'Socket.IO', 'React.js', 'Python', 'FastAPI', 'MongoDB', 'Vercel', 'Neon']

export const projects = [
  {
    id: 'worknest',
    index: '01',
    name: 'WorkNest',
    kind: 'Multi-tenant cloud SaaS · Real-time',
    period: 'Oct 2025 — Present',
    tagline: 'One workspace for service companies — HR, project delivery and a client portal, isolated per tenant and deployed on AWS.',
    accent: 'rose',
    shots: [
      { src: './shots/worknest-1.jpg', thumb: './shots/worknest-1-t.jpg', cap: 'Landing' },
      { src: './shots/worknest-2.jpg', thumb: './shots/worknest-2-t.jpg', cap: 'Platform pillars' },
      { src: './shots/worknest-3.jpg', thumb: './shots/worknest-3-t.jpg', cap: 'A working day' },
      { src: './shots/worknest-4.jpg', thumb: './shots/worknest-4-t.jpg', cap: 'Live boards' },
      { src: './shots/worknest-5.jpg', thumb: './shots/worknest-5-t.jpg', cap: 'Capabilities' },
    ],
    flowTitle: 'How it is deployed',
    flowLabel: 'Next.js on Vercel talks over REST and WebSockets to Express and Socket.IO on AWS EC2, which reaches PostgreSQL on Neon through Prisma',
    flow: [
      { k: 'Vercel', v: 'Next.js' },
      { link: 'REST · WSS' },
      { k: 'AWS EC2', v: 'Express · Socket.IO' },
      { link: 'Prisma' },
      { k: 'Neon', v: 'PostgreSQL' },
    ],
    links: {
      live: 'https://worknest-snowy-five.vercel.app',
      code: 'https://github.com/pratyushsingh04/worknest',
    },
    points: [
      {
        h: '85+ endpoints on a 23-model schema',
        p: 'Architected and deployed a multi-tenant cloud SaaS workspace unifying HR, project delivery and a client portal for service companies, exposing 85+ REST API endpoints across 18 Express modules on a 23-model PostgreSQL schema via Prisma.',
      },
      {
        h: 'Four roles, every tenant isolated',
        p: 'Implemented JWT authentication in httpOnly cookies with bcrypt hashing and role-based access control for 4 roles — Admin, Manager, Employee and Client — isolating tenants by scoping every query to a company ID.',
      },
      {
        h: 'Onboarding hardened end to end',
        p: 'Secured onboarding with single-use SHA-256-hashed invite and password-reset tokens, brute-force rate limiting (15-minute lockout after 8 failed sign-ins), Zod schema validation and searchable audit logs.',
      },
      {
        h: 'Real-time over authenticated WebSockets',
        p: 'Orchestrated a real-time layer with Socket.IO over cookie-authenticated WebSockets and 4 isolated room scopes (company, project, client, user), live-syncing a Kanban board, activity feeds, attendance and notifications.',
      },
      {
        h: 'Geofencing, an AI assistant, and AWS',
        p: 'Integrated geofenced attendance (Haversine distance), approval workflows for 4 leave types and an AI assistant using LLM tool calling (Gemini/Groq). The Node.js/Express backend is deployed on AWS EC2, with Vercel and Neon PostgreSQL.',
      },
      {
        h: 'One command to run it locally',
        p: 'Documented architecture, setup and deployment in a detailed README, enabling one-command local setup with an embedded PostgreSQL database and no Docker dependency.',
      },
    ],
    metrics: [
      { k: '85+', v: 'REST endpoints' },
      { k: '23', v: 'Prisma models' },
      { k: '18', v: 'Express modules' },
      { k: '4', v: 'RBAC roles' },
    ],
    stack: ['Next.js', 'TypeScript', 'Node.js', 'Express', 'PostgreSQL', 'Prisma', 'Socket.IO', 'JWT'],
  },
  {
    id: 'wardrobe-ai',
    index: '02',
    name: 'Wardrobe AI',
    kind: 'Multimodal AI · Full-stack',
    period: 'Oct 2026',
    tagline: 'An AI outfit assistant that looks at a photo of what you are wearing and scores it for the occasion.',
    accent: 'amber',
    shots: [
      { src: './shots/wardrobe-ai-1.jpg', thumb: './shots/wardrobe-ai-1-t.jpg', cap: 'Landing' },
      { src: './shots/wardrobe-ai-2.jpg', thumb: './shots/wardrobe-ai-2-t.jpg', cap: 'Outfit check' },
      { src: './shots/wardrobe-ai-3.jpg', thumb: './shots/wardrobe-ai-3-t.jpg', cap: 'The lookbook' },
      { src: './shots/wardrobe-ai-4.jpg', thumb: './shots/wardrobe-ai-4-t.jpg', cap: 'How it works' },
    ],
    flowTitle: 'How a check runs',
    flowLabel: 'The browser sends a compressed photo to Next.js API routes, which ask a vision LLM (Gemini or Claude) for Zod-validated JSON',
    flow: [
      { k: 'Browser', v: 'photo · event' },
      { link: 'REST' },
      { k: 'Next.js', v: 'API routes · SQLite' },
      { link: 'Zod JSON' },
      { k: 'Vision LLM', v: 'Gemini · Claude' },
    ],
    links: {
      live: 'https://wardrobe-ai-pearl.vercel.app',
      code: 'https://github.com/pratyushsingh04/wardrobe-ai',
    },
    points: [
      {
        h: 'A photo in, a 0–100 score out',
        p: 'Developed an AI-powered outfit assistant that analyzes an uploaded outfit photo with a multimodal vision LLM and returns a 0–100 suitability score across 4 dimensions: formality, coordination, weather and event context.',
      },
      {
        h: 'One AI layer, two providers',
        p: 'Engineered a provider-agnostic cloud AI layer integrating 2 LLM providers (Google Gemini and Anthropic Claude) with Zod-validated structured JSON output, ensuring type-safe responses and consistent error handling.',
      },
      {
        h: 'A closet that tags itself',
        p: 'Created a digital closet with automatic AI tagging across 8 clothing categories, 4 seasons and 7 occasions, plus outfit recommendations with a rule-based fallback that keeps suggestions working when the AI is unavailable.',
      },
      {
        h: 'Five routes, live weather, lean uploads',
        p: 'Designed 5 REST API routes with the Next.js App Router and SQLite, integrated live weather from the cloud-based Open-Meteo API, and added client-side image compression to keep photo uploads under the 5 MB limit.',
      },
    ],
    metrics: [
      { k: '0–100', v: 'suitability score' },
      { k: '4', v: 'scoring dimensions' },
      { k: '2', v: 'LLM providers' },
      { k: '5', v: 'API routes' },
    ],
    stack: ['Next.js', 'React', 'TypeScript', 'Gemini API', 'Claude API', 'SQLite', 'Zod', 'Tailwind CSS'],
  },
]

export const skills = [
  { group: 'Languages', items: ['Python', 'C++', 'JavaScript', 'TypeScript', 'SQL', 'HTML', 'CSS'] },
  { group: 'Frameworks', items: ['React.js', 'Next.js', 'Node.js', 'Express.js', 'Flask', 'FastAPI'] },
  { group: 'Databases', items: ['PostgreSQL', 'MongoDB', 'MySQL', 'SQLite'] },
  { group: 'Cloud & DevOps', items: ['AWS (EC2)', 'Docker', 'Git', 'GitHub', 'Vercel', 'Neon'] },
]

export const certifications = [
  {
    title: 'Azure Data Fundamentals',
    code: 'Certificate',
    org: 'Microsoft',
    featured: true,
    url: 'https://drive.google.com/file/d/1n_VJK0f1HFrd7Pb-EATlcwKXn8cu22bw/view',
  },
  {
    title: 'Introduction to Internet of Things',
    code: 'Certificate',
    org: 'NPTEL',
    url: 'https://drive.google.com/file/d/1xWlhc9JkfJ3mHS3FHNwbatpm0Kks8Ezz/view',
  },
]

export const achievements = [
  { big: '5★', title: '5-Star rating in C++', place: 'HackerRank', note: 'Earned by solving challenges across data structures and algorithms' },
  { big: '300+', title: '300+ problems solved', place: 'LeetCode & others', note: 'Coding problems across LeetCode and other platforms' },
  { big: '<500K', title: 'Ranked under 500,000', place: 'LeetCode global', note: 'Global LeetCode ranking' },
]

export const education = [
  {
    school: 'VIT Bhopal University',
    detail: 'B.Tech, Computer Science & Engineering — Cloud Computing and Automation',
    place: 'Bhopal, Madhya Pradesh · May 2027',
    score: 'CGPA 8.00 / 10',
  },
  {
    school: 'Bhavan’s Kesari Devi Kanoria Vidya Mandir',
    detail: 'Class X — 92.5% (2021)   ·   Class XII — 73.5% (2023)',
    place: 'Sonebhadra, Uttar Pradesh',
    score: null,
  },
]
