import React from 'react';
import { PERSONAL_INFO } from '../data/portfolioData.ts';

interface IdentityCardProps {
  variant?: 'bento' | 'about';
  className?: string;
}

export const IdentityCard: React.FC<IdentityCardProps> = ({ variant = 'bento', className = '' }) => {
  const photo = PERSONAL_INFO.portraitUrl || '/dhruva-portrait.png';

  return (
    <div className={`relative rounded-3xl overflow-hidden bg-neutral-950 shadow-md group border border-black/10 dark:border-white/10 ${className}`}>
      <img
        src={photo}
        alt="Dhruva Sai"
        className="w-full h-full object-cover object-[center_15%] group-hover:scale-102 transition-transform duration-500 ease-out"
      />
      {/* Deep contrast gradient overlay for razor-sharp text visibility */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/35 to-transparent pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-black/40 to-transparent pointer-events-none" />

      {/* Card Footer */}
      <div className="absolute bottom-4 left-5 right-5 text-white flex items-end justify-between pointer-events-none z-10">
        <div>
          <div className="text-[11px] uppercase tracking-wider text-emerald-400 font-bold font-mono">
            AI Engineer
          </div>
          <div className="text-base sm:text-lg font-bold tracking-tight text-white drop-shadow-md">
            {PERSONAL_INFO.name}
          </div>
        </div>
        <span className="text-[11px] px-3 py-1 rounded-full bg-black/70 dark:bg-black/85 backdrop-blur-md text-white font-semibold border border-white/20 flex items-center gap-1.5 shadow-md">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span>Hyderabad, IN</span>
        </span>
      </div>
    </div>
  );
};
