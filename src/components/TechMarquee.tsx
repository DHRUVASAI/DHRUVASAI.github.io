import React from 'react';
import ShinyText from './ui/ShinyText/ShinyText';
import { playHoverSound } from '../utils/soundEffects.ts';

// 100% Verified from Dhruva Sai's Official Resume & Academic Record
const ROW_SKILLS = [
  { name: 'Python', category: 'Programming Language', dot: 'bg-yellow-400' },
  { name: 'Java', category: 'Programming Language', dot: 'bg-amber-500' },
  { name: 'C Language', category: 'Programming Language', dot: 'bg-blue-400' },
  { name: 'React.js', category: 'Frontend Development', dot: 'bg-cyan-400' },
  { name: 'Next.js', category: 'Full-Stack Framework', dot: 'bg-white' },
  { name: 'HTML5 & CSS3', category: 'Web Standards', dot: 'bg-orange-400' },
  { name: 'Tailwind CSS', category: 'UI & Styling', dot: 'bg-teal-400' },
  { name: 'MySQL', category: 'Relational Database', dot: 'bg-sky-500' },
  { name: 'Git & GitHub', category: 'Version Control', dot: 'bg-neutral-300' },
  { name: 'Data Structures & Algorithms', category: 'Core CS', dot: 'bg-indigo-400' },
  { name: 'Object-Oriented Programming (OOP)', category: 'Core CS', dot: 'bg-emerald-400' },
  { name: 'Machine Learning', category: 'Core CS', dot: 'bg-rose-400' }
];

const ROW_HONORS = [
  { name: 'AWS AI for Bharat Badge', category: 'National Hackathon Recognition', dot: 'bg-amber-400' },
  { name: 'Microsoft Azure AI-900', category: 'Global Certification', dot: 'bg-blue-500' },
  { name: 'CodeChef 2-Star', category: 'Competitive Programming', dot: 'bg-purple-400' },
  { name: 'Google Cloud Gen AI 2.0', category: 'Cloud Certification', dot: 'bg-red-400' },
  { name: 'Cisco Data Analytics', category: 'Networking Academy', dot: 'bg-cyan-400' },
  { name: 'Cambridge English (B2)', category: 'Linguaskill Certified', dot: 'bg-emerald-400' },
  { name: 'IBM SkillsBuild – AI & Cloud', category: 'Internship Program', dot: 'bg-blue-600' },
  { name: 'ServiceNow Virtual Internship', category: 'SmartBridge + AICTE', dot: 'bg-teal-400' },
  { name: '9.33 / 10.0 CGPA', category: 'KL University Academic Standing', dot: 'bg-emerald-500' }
];

export const TechMarquee: React.FC = () => {
  return (
    <section className="w-full py-10 sm:py-14 overflow-hidden border-y border-black/10 dark:border-white/10 relative">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-8 mb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-2">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <ShinyText
              text="Verified Credentials & Repertoire"
              speed={2.8}
              className="text-xs uppercase tracking-widest text-neutral-500 dark:text-neutral-400 font-semibold"
            />
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-950 dark:text-white">
            Technical Skills &amp; Certifications
          </h2>
        </div>
        <span className="text-xs font-mono text-neutral-500 dark:text-neutral-400">
          Source: Official Curriculum Vitae · KL University (9.33 CGPA)
        </span>
      </div>

      {/* Row 1: Leftward scroll (Technical Skills) */}
      <div className="relative w-full overflow-hidden mb-3">
        {/* Left & Right Fade Masks */}
        <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-r from-[#ECECEB] dark:from-[#070A14] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-l from-[#ECECEB] dark:from-[#070A14] to-transparent z-10 pointer-events-none" />

        <div className="flex w-max animate-[marqueeLeft_35s_linear_infinite] hover:[animation-play-state:paused] gap-3">
          {[...ROW_SKILLS, ...ROW_SKILLS].map((tech, i) => (
            <div
              key={`${tech.name}-${i}`}
              onMouseEnter={playHoverSound}
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/70 dark:bg-[#0C0E18]/80 border border-black/5 dark:border-white/10 hover:border-indigo-500/40 dark:hover:border-indigo-400/40 backdrop-blur-md transition-all shadow-2xs group cursor-default"
            >
              <span className={`w-2 h-2 rounded-full ${tech.dot} group-hover:scale-125 transition-transform`} />
              <span className="text-xs font-semibold text-neutral-900 dark:text-neutral-100 whitespace-nowrap">
                {tech.name}
              </span>
              <span className="text-[10px] font-mono text-neutral-500 dark:text-neutral-400 uppercase">
                {tech.category}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Row 2: Rightward scroll (Honors & Certifications) */}
      <div className="relative w-full overflow-hidden">
        {/* Left & Right Fade Masks */}
        <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-r from-[#ECECEB] dark:from-[#070A14] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-l from-[#ECECEB] dark:from-[#070A14] to-transparent z-10 pointer-events-none" />

        <div className="flex w-max animate-[marqueeRight_38s_linear_infinite] hover:[animation-play-state:paused] gap-3">
          {[...ROW_HONORS, ...ROW_HONORS].map((honor, i) => (
            <div
              key={`${honor.name}-${i}`}
              onMouseEnter={playHoverSound}
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/70 dark:bg-[#0C0E18]/80 border border-black/5 dark:border-white/10 hover:border-emerald-500/40 dark:hover:border-emerald-400/40 backdrop-blur-md transition-all shadow-2xs group cursor-default"
            >
              <span className={`w-2 h-2 rounded-full ${honor.dot} group-hover:scale-125 transition-transform`} />
              <span className="text-xs font-semibold text-neutral-900 dark:text-neutral-100 whitespace-nowrap">
                {honor.name}
              </span>
              <span className="text-[10px] font-mono text-neutral-500 dark:text-neutral-400 uppercase">
                {honor.category}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
