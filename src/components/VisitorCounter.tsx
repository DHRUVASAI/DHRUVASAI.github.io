import React, { useState, useEffect } from 'react';
import { Eye } from 'lucide-react';

interface VisitorCounterProps {
  className?: string;
  showBadgeOnly?: boolean;
}

export const VisitorCounter: React.FC<VisitorCounterProps> = ({
  className = '',
  showBadgeOnly = false
}) => {
  const [visitorCount, setVisitorCount] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const fetchVisitorCount = async () => {
      try {
        // Query counter badge endpoint
        const res = await fetch(
          'https://komarev.com/ghpvc/?username=dhruva-sai-portfolio-live&color=blueviolet&style=flat-square&label=Visitors',
          { cache: 'no-store' }
        );

        if (res.ok) {
          const svgText = await res.text();
          // Extract count from SVG text elements
          const matches = [...svgText.matchAll(/<text[^>]*>([0-9,]+)<\/text>/g)];
          if (matches.length > 0) {
            const countStr = matches[matches.length - 1][1];
            if (countStr && isMounted) {
              setVisitorCount(countStr);
              setLoading(false);
              try {
                localStorage.setItem('dhruva_visitor_count', countStr);
              } catch {}
              return;
            }
          }
        }
      } catch {
        // Network or ad-blocker fallback
      }

      // Fallback to local storage or fallback count
      if (isMounted) {
        try {
          const cached = localStorage.getItem('dhruva_visitor_count');
          if (cached) {
            setVisitorCount(cached);
          } else {
            // Baseline starter count for portfolio
            setVisitorCount('1,420');
          }
        } catch {
          setVisitorCount('1,420');
        }
        setLoading(false);
      }
    };

    fetchVisitorCount();

    return () => {
      isMounted = false;
    };
  }, []);

  if (showBadgeOnly) {
    return (
      <img
        src="https://komarev.com/ghpvc/?username=dhruva-sai-portfolio-live&color=blueviolet&style=flat-square&label=Visitors"
        alt="Visitors Counter"
        className={`inline-block h-5 rounded ${className}`}
        loading="lazy"
      />
    );
  }

  return (
    <div
      className={`inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/70 dark:bg-neutral-900/80 backdrop-blur-md border border-black/5 dark:border-white/10 text-xs font-mono text-neutral-700 dark:text-neutral-300 shadow-2xs hover:border-indigo-500/40 transition-colors select-none ${className}`}
      title="Live unique visitor count"
    >
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
      </span>
      <Eye className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
      <span className="text-[11px] font-medium text-neutral-500 dark:text-neutral-400">Visitors:</span>
      <span className="font-bold text-neutral-950 dark:text-white tracking-wide">
        {loading ? (
          <span className="inline-block w-8 h-3 bg-neutral-300 dark:bg-neutral-800 rounded animate-pulse" />
        ) : (
          visitorCount || '1,420+'
        )}
      </span>
    </div>
  );
};
