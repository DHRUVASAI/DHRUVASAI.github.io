import React from 'react';
import { Cpu } from 'lucide-react';

export interface TechItem {
  id: string;
  name: string;
  category: 'Languages' | 'Frontend' | 'Cloud' | 'Databases & Tools' | 'Core CS';
  icon: React.ReactNode;
  accentColor: string;
  level: string;
}

export const TECH_ITEMS: TechItem[] = [
  // Programming Languages
  {
    id: 'python',
    name: 'Python',
    category: 'Languages',
    accentColor: '#3776AB',
    level: 'AI/ML & Core Scripting',
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
        <path
          d="M11.91 2C6.98 2 7.28 4.14 7.28 4.14L7.3 6.35H12V7H5.2C2.7 7 2.7 10.45 2.7 10.45L2.7 12.38C2.7 14.6 4.3 14.6 4.3 14.6H5.8V12.7C5.8 10.45 7.6 10.45 7.6 10.45H12.2V10.44C14.7 10.44 14.7 8.5 14.7 8.5V4.14C14.7 2 11.91 2 11.91 2ZM9.4 3.4C9.8 3.4 10.1 3.7 10.1 4.1C10.1 4.5 9.8 4.8 9.4 4.8C9 4.8 8.7 4.5 8.7 4.1C8.7 3.7 9 3.4 9.4 3.4Z"
          fill="#387EB8"
        />
        <path
          d="M12.09 22C17.02 22 16.72 19.86 16.72 19.86L16.7 17.65H12V17H18.8C21.3 17 21.3 13.55 21.3 13.55L21.3 11.62C21.3 9.4 19.7 9.4 19.7 9.4H18.2V11.3C18.2 13.55 16.4 13.55 16.4 13.55H11.8V13.56C9.3 13.56 9.3 15.5 9.3 15.5V19.86C9.3 22 12.09 22 12.09 22ZM14.6 20.6C14.2 20.6 13.9 20.3 13.9 19.9C13.9 19.5 14.2 19.2 14.6 19.2C15 19.2 15.3 19.5 15.3 19.9C15.3 20.3 15 20.6 14.6 20.6Z"
          fill="#FFE052"
        />
      </svg>
    )
  },
  {
    id: 'java',
    name: 'Java',
    category: 'Languages',
    accentColor: '#E76F00',
    level: 'OOP & Systems Design',
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
        <path
          d="M8.8 17.8c0 0-1.8.3 1.2.4 3.7.1 5.7-.3 8.3-1.6 0 0-1.2.8-4.2 1.2-4.5.6-7.8-.1-5.3-2.2 0 0-1.4.7 0 2.2zm-1.1-3.6c0 0-2 .4 1.3.5 4.1.1 7.2-.4 10.3-2.1 0 0-1.5.9-4.8 1.4-5.3.7-9.5 0-6.8-2.6 0 0-1.8.8 0 2.8zm7.4-4.8c1.3 1.4.3 2.8-.7 4.2 2.3-.9 4.1-2.4 2.8-4.5-1.1-1.7-4-2.8-2.1-5.6-4.6 1.8-3.4 4.5 0 5.9zm-4.9-2.7c-2 2-1 3.5.3 4.8 1.6-1.3 2.5-2.7 1.2-4.3-.9-1.2-1.7-2.3.4-4.3-3.6 1.1-3.7 2.4-1.9 3.8zM4.5 21c3.8.3 9.4.2 14.3-.9 1.1-.3 2.2-.6 2.2-.6s-.8.6-2 1c-5.1 1.4-11.6 1.3-15.5-.3 0 0-1-.6 1-.8z"
          fill="#EA2D2E"
        />
        <path
          d="M17.8 19.7c-4.8 1.4-10.7 1.4-14.8.1-1.1-.3.5-.8 1.1-1 4.2-.7 9.8-.6 14.5.3.7.2.5.5-.8.6z"
          fill="#0074BD"
        />
      </svg>
    )
  },
  {
    id: 'c',
    name: 'C',
    category: 'Languages',
    accentColor: '#00599C',
    level: 'Systems & Memory Model',
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
        <path d="M12 2L3 7.2V16.8L12 22L21 16.8V7.2L12 2Z" fill="#00599C" />
        <path
          d="M16.5 15.2C15.4 16.3 13.8 17 12 17C8.7 17 6.5 14.5 6.5 12C6.5 9.5 8.7 7 12 7C13.8 7 15.3 7.7 16.4 8.8L14.7 10.3C14 9.6 13.1 9.1 12 9.1C10.1 9.1 8.7 10.4 8.7 12C8.7 13.6 10.1 14.9 12 14.9C13.1 14.9 14.1 14.4 14.8 13.7L16.5 15.2Z"
          fill="#FFFFFF"
        />
      </svg>
    )
  },

  // Frontend Development
  {
    id: 'react',
    name: 'React.js',
    category: 'Frontend',
    accentColor: '#61DAFB',
    level: 'State & Component Flow',
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
        <ellipse cx="12" cy="12" rx="10" ry="4" stroke="#61DAFB" strokeWidth="1.6" />
        <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)" stroke="#61DAFB" strokeWidth="1.6" />
        <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(120 12 12)" stroke="#61DAFB" strokeWidth="1.6" />
        <circle cx="12" cy="12" r="1.8" fill="#61DAFB" />
      </svg>
    )
  },
  {
    id: 'nextjs',
    name: 'Next.js',
    category: 'Frontend',
    accentColor: '#000000',
    level: 'SSR & App Router',
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="10" fill="#000000" className="dark:fill-white" />
        <path d="M15 8V16M9 8V16L17.5 19.5" stroke="#FFFFFF" className="dark:stroke-black" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )
  },
  {
    id: 'html5',
    name: 'HTML5',
    category: 'Frontend',
    accentColor: '#E34F26',
    level: 'Semantic Architecture',
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
        <path d="M4 3L5.5 20L12 22L18.5 20L20 3H4Z" fill="#E44D26" />
        <path d="M12 4.5V20.2L17.1 18.7L18.3 4.5H12Z" fill="#F16529" />
        <path d="M12 8.3H8.3L8.6 11.2H12V14.1H8.9L9.1 16.5L12 17.3V19.2L7.2 17.8L6.7 11.2L6.4 6.3H12V8.3ZM12 8.3H15.7L15.4 11.2H12V14.1H15.1L14.8 17.3L12 18.1V16.1L13.4 15.7L13.6 13.2H12V8.3Z" fill="#FFFFFF" />
      </svg>
    )
  },
  {
    id: 'css3',
    name: 'CSS3',
    category: 'Frontend',
    accentColor: '#1572B6',
    level: 'Modern Responsive Design',
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
        <path d="M4 3L5.5 20L12 22L18.5 20L20 3H4Z" fill="#1572B6" />
        <path d="M12 4.5V20.2L17.1 18.7L18.3 4.5H12Z" fill="#33A9DC" />
        <path d="M12 8.3H8.3L8.6 11.2H12V14.1H8.9L9.1 16.5L12 17.3V19.2L7.2 17.8L6.7 11.2L6.4 6.3H17.6L17.4 8.3H12ZM15.7 11.2L15.1 17.3L12 18.1V16.1L13.4 15.7L13.6 13.2H12V11.2H15.7Z" fill="#FFFFFF" />
      </svg>
    )
  },

  // Cloud Platforms
  {
    id: 'aws',
    name: 'AWS',
    category: 'Cloud',
    accentColor: '#FF9900',
    level: 'AI for Bharat Recognition',
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
        <path
          d="M18.8 15.4C17.6 16.3 15.3 17.1 12 17.1C7.8 17.1 4.7 15.2 3.2 13.3C3 13 3.3 12.6 3.7 12.8C5.2 13.9 8.2 15.3 12 15.3C14.7 15.3 17.4 14.5 18.3 13.8C18.7 13.5 19.1 14 18.8 15.4Z"
          fill="#FF9900"
        />
        <path
          d="M19.4 14.4C19.2 14.2 18.5 14.3 17.8 14.4C17 14.5 16.1 14.7 16 14.4C15.9 14.1 16.3 13.5 16.7 13.2C17.4 12.8 18.6 12.4 19.2 12.8C19.8 13.2 19.7 14 19.4 14.4Z"
          fill="#FF9900"
        />
        <path
          d="M7.4 10.7C7.4 11.6 7.8 12.2 8.7 12.2C9.5 12.2 10.1 11.5 10.1 10.5V6.8H11.8V12.9H10.2V11.7C9.6 12.5 8.7 13 7.8 13C6.3 13 5.7 11.9 5.7 10.4V6.8H7.4V10.7Z"
          fill="#232F3E"
          className="dark:fill-white"
        />
        <path
          d="M14.2 10.7C14.2 11.6 14.6 12.2 15.5 12.2C16.3 12.2 16.9 11.5 16.9 10.5V6.8H18.6V12.9H17V11.7C16.4 12.5 15.5 13 14.6 13C13.1 13 12.5 11.9 12.5 10.4V6.8H14.2V10.7Z"
          fill="#232F3E"
          className="dark:fill-white"
        />
      </svg>
    )
  },
  {
    id: 'azure',
    name: 'Microsoft Azure',
    category: 'Cloud',
    accentColor: '#0089D6',
    level: 'Azure AI-900 Certified',
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
        <path d="M13.2 3L5.5 16.8H10.3L13.2 3Z" fill="#0078D4" />
        <path d="M13.2 3L11.5 8.7L14.7 16.8H20.5L13.2 3Z" fill="#5EA0EF" />
        <path d="M3.5 21H17.2L20.5 16.8H10.3L3.5 21Z" fill="#0078D4" />
      </svg>
    )
  },
  {
    id: 'gcp',
    name: 'Google Cloud Platform',
    category: 'Cloud',
    accentColor: '#4285F4',
    level: 'GenAI Academy 2.0',
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
        <path d="M19.4 10.3C18.9 7.8 16.6 6 14 6C12.4 6 10.9 6.7 9.9 7.8L11.4 9.3C12.1 8.5 13 8 14 8C15.7 8 17.2 9.2 17.4 10.9L17.7 12.5H19.3C20.3 12.5 21 13.3 21 14.2C21 15.2 20.2 16 19.3 16H6.5C5.1 16 4 14.9 4 13.5C4 12.2 5 11.1 6.3 11L7.7 10.8L8.1 9.4C8.7 7.2 10.7 5.6 13.1 5.6C14.7 5.6 16.2 6.4 17.2 7.6L18.6 6.2C17.2 4.6 15.2 3.6 13.1 3.6C9.8 3.6 7 5.8 6.1 8.9C4.3 9.4 3 11 3 13C3 15.2 4.8 17 7 17H19C20.7 17 22 15.7 22 14C22 12.4 20.8 10.8 19.4 10.3Z" fill="#4285F4" />
        <circle cx="14" cy="11" r="2.5" fill="#34A853" />
        <circle cx="9" cy="12" r="1.8" fill="#FBBC05" />
        <circle cx="17.5" cy="13.5" r="1.5" fill="#EA4335" />
      </svg>
    )
  },
  {
    id: 'ibm',
    name: 'IBM Cloud',
    category: 'Cloud',
    accentColor: '#054ADA',
    level: 'SkillsBuild AI & Cloud',
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="5" width="18" height="2" fill="#054ADA" />
        <rect x="3" y="8" width="18" height="2" fill="#054ADA" />
        <rect x="3" y="11" width="18" height="2" fill="#054ADA" />
        <rect x="3" y="14" width="18" height="2" fill="#054ADA" />
        <rect x="3" y="17" width="18" height="2" fill="#054ADA" />
      </svg>
    )
  },

  // Databases and Tools
  {
    id: 'mysql',
    name: 'MySQL',
    category: 'Databases & Tools',
    accentColor: '#00618A',
    level: 'Relational Schemas & SQL',
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
        <ellipse cx="12" cy="7" rx="8" ry="3.5" stroke="#00758F" strokeWidth="1.8" fill="#F29111" fillOpacity="0.2" />
        <path d="M4 7V12C4 13.9 7.6 15.5 12 15.5C16.4 15.5 20 13.9 20 12V7" stroke="#00758F" strokeWidth="1.8" />
        <path d="M4 12V17C4 18.9 7.6 20.5 12 20.5C16.4 20.5 20 18.9 20 17V12" stroke="#00758F" strokeWidth="1.8" />
      </svg>
    )
  },
  {
    id: 'git',
    name: 'Git',
    category: 'Databases & Tools',
    accentColor: '#F05032',
    level: 'Branching & GitOps',
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
        <path
          d="M21.7 10.7L13.3 2.3C12.9 1.9 12.3 1.9 11.9 2.3L9.5 4.7L12.5 7.7C13.2 7.4 14.1 7.6 14.6 8.2C15.2 8.8 15.3 9.7 15 10.4L17.9 13.3C18.6 13 19.5 13.1 20.1 13.7C20.9 14.5 20.9 15.7 20.1 16.5C19.3 17.3 18.1 17.3 17.3 16.5C16.7 15.9 16.6 15 16.9 14.3L14.2 11.6V16.2C14.5 16.5 14.7 17 14.6 17.5C14.4 18.3 13.6 18.8 12.8 18.8C12 18.8 11.2 18.1 11.2 17.3C11.2 16.6 11.6 16.1 12.2 15.9V11.2C11.6 11 11.2 10.5 11.2 9.8C11.2 9.3 11.4 8.9 11.7 8.5L8.7 5.5L2.3 11.9C1.9 12.3 1.9 12.9 2.3 13.3L10.7 21.7C11.1 22.1 11.7 22.1 12.1 21.7L21.7 12.1C22.1 11.7 22.1 11.1 21.7 10.7Z"
          fill="#F05032"
        />
      </svg>
    )
  },
  {
    id: 'github',
    name: 'GitHub',
    category: 'Databases & Tools',
    accentColor: '#181717',
    level: 'CI/CD & Open Source',
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
        />
      </svg>
    )
  },

  // Core Computer Science
  {
    id: 'dsa',
    name: 'Data Structures',
    category: 'Core CS',
    accentColor: '#10B981',
    level: 'Trees, Graphs, Hash Maps',
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <circle cx="12" cy="5" r="2.5" className="fill-emerald-500/20 stroke-emerald-500" />
        <circle cx="6" cy="18" r="2.5" className="fill-emerald-500/20 stroke-emerald-500" />
        <circle cx="18" cy="18" r="2.5" className="fill-emerald-500/20 stroke-emerald-500" />
        <path d="M10.5 7L7.5 16" className="stroke-emerald-500" />
        <path d="M13.5 7L16.5 16" className="stroke-emerald-500" />
      </svg>
    )
  },
  {
    id: 'algorithms',
    name: 'Algorithms',
    category: 'Core CS',
    accentColor: '#6366F1',
    level: 'DP, Divide & Conquer',
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M4 19L9 14L13 17L20 8" className="stroke-indigo-500" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="20" cy="8" r="2" className="fill-indigo-500 stroke-indigo-500" />
        <circle cx="4" cy="19" r="2" className="fill-indigo-500 stroke-indigo-500" />
      </svg>
    )
  },
  {
    id: 'oop',
    name: 'OOP',
    category: 'Core CS',
    accentColor: '#8B5CF6',
    level: 'Polymorphism & SOLID',
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="3" y="3" width="7" height="7" rx="1.5" className="stroke-purple-500 fill-purple-500/20" />
        <rect x="14" y="3" width="7" height="7" rx="1.5" className="stroke-purple-500 fill-purple-500/20" />
        <rect x="8.5" y="14" width="7" height="7" rx="1.5" className="stroke-purple-500 fill-purple-500/20" />
        <path d="M6.5 10V12H17.5V10" className="stroke-purple-500" />
        <path d="M12 12V14" className="stroke-purple-500" />
      </svg>
    )
  },
  {
    id: 'ml',
    name: 'Machine Learning',
    category: 'Core CS',
    accentColor: '#EC4899',
    level: 'Tensors & Vector Search',
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <circle cx="6" cy="6" r="2" className="fill-pink-500 stroke-pink-500" />
        <circle cx="6" cy="18" r="2" className="fill-pink-500 stroke-pink-500" />
        <circle cx="18" cy="6" r="2" className="fill-pink-500 stroke-pink-500" />
        <circle cx="18" cy="18" r="2" className="fill-pink-500 stroke-pink-500" />
        <circle cx="12" cy="12" r="2.5" className="fill-pink-500/40 stroke-pink-500" />
        <path d="M7.5 7.5L10.5 10.5M13.5 13.5L16.5 16.5M7.5 16.5L10.5 13.5M13.5 10.5L16.5 7.5" className="stroke-pink-500/70" />
      </svg>
    )
  },
  {
    id: 'compiler',
    name: 'Compiler Design',
    category: 'Core CS',
    accentColor: '#F59E0B',
    level: 'AST, Parsers & Grammars',
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M4 6H20M4 12H14M4 18H18" className="stroke-amber-500" strokeLinecap="round" />
        <circle cx="18" cy="12" r="2" className="fill-amber-500 stroke-amber-500" />
      </svg>
    )
  }
];

export const TechStackWidget: React.FC = () => {
  // Defined categorical groups for neat structured presentation
  const groups: { title: string; category: TechItem['category']; color: string }[] = [
    { title: 'Programming Languages', category: 'Languages', color: '#387EB8' },
    { title: 'Frontend Development', category: 'Frontend', color: '#0284C7' },
    { title: 'Cloud Platforms', category: 'Cloud', color: '#EA580C' },
    { title: 'Databases & Tools', category: 'Databases & Tools', color: '#DC2626' },
    { title: 'Core Computer Science', category: 'Core CS', color: '#059669' }
  ];

  return (
    <div className="frosted-glass rounded-3xl p-5 sm:p-6 md:p-7 flex flex-col justify-between transition-all duration-300 hover:-translate-y-0.5 h-full">
      {/* Top Header - Spacious, Clean, Guaranteed No Overlap */}
      <div>
        <div className="flex items-center justify-between gap-3 pb-3.5 mb-3.5 border-b border-black/10 dark:border-white/10">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-9 h-9 rounded-xl bg-indigo-500/10 dark:bg-indigo-400/15 border border-indigo-500/20 flex items-center justify-center text-indigo-600 dark:text-indigo-400 shrink-0 shadow-2xs">
              <Cpu className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <h3 className="text-sm sm:text-base font-bold tracking-tight text-neutral-950 dark:text-white truncate">
                Core Stack &amp; Computer Science
              </h3>
              <p className="text-[11px] text-neutral-500 dark:text-neutral-400 font-mono truncate">
                Languages · Frontend · Cloud · Databases · Systems
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <span className="text-[11px] font-mono font-bold px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20 flex items-center gap-1.5 shadow-2xs">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>19 Technologies</span>
            </span>
          </div>
        </div>

        {/* Content View: Neat Structured Group Rows */}
        <div className="space-y-3 pt-1">
            {groups.map((group) => {
              const items = TECH_ITEMS.filter((item) => item.category === group.category);
              return (
                <div
                  key={group.category}
                  className="flex flex-col lg:flex-row lg:items-center gap-2 py-1.5 border-b border-black/5 dark:border-white/5 last:border-none"
                >
                  {/* Category Label */}
                  <div className="w-44 shrink-0 flex items-center gap-2 text-[11px] font-mono text-neutral-600 dark:text-neutral-400 font-medium">
                    <span
                      className="w-2 h-2 rounded-full shrink-0"
                      style={{ backgroundColor: group.color }}
                    ></span>
                    <span className="truncate">{group.title}</span>
                  </div>

                  {/* Compact Clean Technology Badges */}
                  <div className="flex flex-wrap items-center gap-1.5 flex-1">
                    {items.map((tech) => (
                      <div
                        key={tech.id}
                        className="group/tech inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/80 dark:bg-neutral-800/80 hover:bg-white dark:hover:bg-neutral-700 border border-black/5 dark:border-white/10 hover:border-black/20 dark:hover:border-white/20 transition-all shadow-2xs"
                        title={`${tech.name} · ${tech.level}`}
                      >
                        <span className="w-4 h-4 flex items-center justify-center shrink-0 group-hover/tech:scale-110 transition-transform">
                          {tech.icon}
                        </span>
                        <span className="text-xs font-semibold text-neutral-900 dark:text-white">
                          {tech.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
        </div>
      </div>

      {/* Footer Info Strip */}
      <div className="pt-3 border-t border-black/5 dark:border-white/10 mt-4 flex flex-wrap items-center justify-between gap-2 text-[11px] text-neutral-500 dark:text-neutral-400 font-mono">
        <div className="flex items-center gap-2">
          <span>5 Disciplines</span>
          <span>•</span>
          <span className="text-emerald-600 dark:text-emerald-400 font-semibold">Production Ready</span>
        </div>
        <span className="text-neutral-600 dark:text-neutral-300">
          Clean Architecture · Scalable Engineering
        </span>
      </div>
    </div>
  );
};
