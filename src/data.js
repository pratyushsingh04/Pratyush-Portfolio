// Content from Pratyush Singh's resume.

export const profile = {
  name: 'Pratyush Singh',
  first: 'Pratyush',
  last: 'Singh',
  role: 'Full-Stack & Cloud Engineer',
  location: 'Bhopal, India',
  email: 'pratyushsingh604@gmail.com',
  phone: '+91 70547 35054',
  resume: './Pratyush_Singh_Resume.pdf',
  status: 'Open to SDE & Cloud roles',
  headline: ['Full-stack products,', 'shipped to the cloud.'],
  summary:
    'Computer Science student specializing in Cloud Computing & Automation, with hands-on experience across full-stack development, cloud infrastructure and AI-driven applications. I build with React, Node.js, Python and REST APIs — and deploy on AWS and GCP.',
  links: {
    // TODO: replace with your real profile URLs.
    github: 'https://github.com/',
    linkedin: 'https://www.linkedin.com/',
    leetcode: 'https://leetcode.com/',
  },
}

export const stats = [
  { value: 40, suffix: '+', label: 'REST endpoints built' },
  { value: 300, suffix: '+', label: 'DSA problems solved' },
  { value: 4, suffix: '', label: 'Certifications earned' },
  { value: 8, suffix: '.00', label: 'CGPA at VIT Bhopal' },
]

export const marquee = ['React.js', 'Node.js', 'Express', 'Python', 'MongoDB', 'PostgreSQL', 'AWS', 'Docker', 'FastAPI', 'Socket.IO', 'MySQL', 'Flask']

export const projects = [
  {
    id: 'devsync',
    index: '01',
    name: 'DevSync',
    kind: 'Multi-tenant SaaS · Real-time',
    period: 'May 2026 — Present',
    tagline: 'A multi-tenant project platform with real-time collaboration, built secure from the very first request.',
    accent: 'rose',
    points: [
      {
        h: 'Four-level tenancy, zero IDOR',
        p: 'Architected an Organization → Team → Project → Task hierarchy spanning 40+ REST endpoints across 10+ modular services, deriving authorization from each resource so no user can reach another tenant’s data.',
      },
      {
        h: 'Stateless JWT with silent refresh',
        p: 'Engineered 15-minute access tokens with 7-day httpOnly refresh-token rotation, enabling silent session restore through Axios interceptors (401 → refresh → retry) on bcrypt-hashed credentials.',
      },
      {
        h: 'Role-based access, provably enforced',
        p: 'Hardened owner/member RBAC through layered Express middleware, validated by 50+ automated authorization tests with zero access-control failures.',
      },
      {
        h: 'Three live features over WebSockets',
        p: 'Orchestrated a Socket.IO real-time layer powering notifications, drag-and-drop Kanban sync and team chat, scoped to isolated per-organization rooms.',
      },
      {
        h: 'Shipped to production',
        p: 'Deployed the full stack across Render, Vercel and MongoDB Atlas with production CORS, rate limiting and Zod schema validation on every route.',
      },
    ],
    metrics: [
      { k: '40+', v: 'REST endpoints' },
      { k: '4', v: 'tenancy levels' },
      { k: '50+', v: 'authz tests' },
      { k: '0', v: 'access failures' },
    ],
    stack: ['React', 'Node.js', 'Express', 'MongoDB', 'Socket.IO', 'JWT', 'Zod'],
  },
  {
    id: 'ems',
    index: '02',
    name: 'Employee Management System',
    kind: 'Full-stack HR platform',
    period: 'Aug 2025',
    tagline: 'A role-based HR platform covering the entire employee lifecycle — records, projects, tasks, leave and payroll.',
    accent: 'amber',
    points: [
      {
        h: 'Six operational modules',
        p: 'Built a full-stack system covering employee records, departments, projects, tasks, leave and payroll operations in one place.',
      },
      {
        h: 'Three roles, three dashboards',
        p: 'Implemented authentication and role-based access control for Admin, HR and Employee, each with role-specific dashboards and permissions.',
      },
      {
        h: 'REST APIs end to end',
        p: 'Developed RESTful APIs with Node.js and Express.js for employee management, project tracking, task assignment and organizational workflows.',
      },
      {
        h: 'Modelled for real workflows',
        p: 'Designed MongoDB schemas and database operations for users, employees, projects, tasks and company-wide data.',
      },
    ],
    metrics: [
      { k: '3', v: 'user roles' },
      { k: '6', v: 'modules' },
      { k: 'REST', v: 'API design' },
      { k: 'RBAC', v: 'enforced' },
    ],
    stack: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'REST APIs'],
  },
]

export const skills = [
  { group: 'Languages', items: ['Python', 'C++', 'JavaScript', 'SQL', 'HTML', 'CSS'] },
  { group: 'Frameworks', items: ['React.js', 'Node.js', 'Express.js', 'Flask', 'FastAPI'] },
  { group: 'Databases', items: ['MongoDB', 'MySQL', 'PostgreSQL'] },
  { group: 'Cloud & DevOps', items: ['AWS', 'Google Cloud Platform', 'Docker', 'Git', 'GitHub'] },
]

export const certifications = [
  { title: 'AWS Certified Solutions Architect', code: 'Associate · SAA-C03', org: 'Amazon Web Services', featured: true },
  { title: 'AWS Certified Cloud Practitioner', code: 'CLF-C02', org: 'Amazon Web Services', featured: true },
  { title: 'Azure Data Fundamentals', code: 'DP-900', org: 'Microsoft' },
  { title: 'Introduction to Internet of Things', code: 'Certificate', org: 'NPTEL' },
]

export const achievements = [
  { title: '5-Star rating in C++', place: 'HackerRank', note: 'Data structures, algorithms & problem solving' },
  { title: '300+ problems solved', place: 'LeetCode & others', note: 'Consistent competitive programming practice' },
  { title: 'Ranked under 500,000', place: 'LeetCode global', note: 'Across all rated users' },
]

export const education = [
  {
    school: 'VIT Bhopal University',
    detail: 'B.Tech, Computer Science & Engineering — Cloud Computing and Automation',
    place: 'Bhopal, Madhya Pradesh',
    score: 'CGPA 8.00 / 10',
  },
  {
    school: 'Bhavans Kesari Devi Kanoria Vidya Mandir',
    detail: 'Class X — 92.5%   ·   Class XII — 73.5%',
    place: 'Sonebhadra, Uttar Pradesh',
    score: null,
  },
]
