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
  const [visitorCount, setVisitorCount] = useState<string | null>(() => {
    try {
      return localStorage.getItem('dhruva_real_visitor_count');
    } catch {
      return null;
    }
  });
  const [loading, setLoading] = useState<boolean>(!visitorCount);

  useEffect(() => {
    let isMounted = true;

    const recordVisit = async () => {
      try {
        // Deduplicate counts within the same browser session so refreshing doesn't spam
        let hasCountedInSession = false;
        try {
          hasCountedInSession = sessionStorage.getItem('dhruva_session_visited') === 'true';
        } catch {}

        // Use 'hit' if new session, or 'get' if already counted in this session
        const endpoint = hasCountedInSession
          ? 'https://countapi.mileshilliard.com/api/v1/get/vudatha-dhruva-sai-me'
          : 'https://countapi.mileshilliard.com/api/v1/hit/vudatha-dhruva-sai-me';

        const res = await fetch(endpoint, {
          method: 'GET',
          headers: { 'Accept': 'application/json' },
          cache: 'no-store'
        });

        if (res.ok) {
          const data = await res.json();
          if (typeof data.value === 'number' && isMounted) {
            const formatted = data.value.toLocaleString();
            setVisitorCount(formatted);
            setLoading(false);
            try {
              sessionStorage.setItem('dhruva_session_visited', 'true');
              localStorage.setItem('dhruva_real_visitor_count', formatted);
            } catch {}
            return;
          }
        }
      } catch (err) {
        console.warn('Real-time visitor count fetch error:', err);
      }

      if (isMounted) {
        setLoading(false);
      }
    };

    recordVisit();

    return () => {
      isMounted = false;
    };
  }, []);

  if (showBadgeOnly) {
    return (
      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-indigo-600 text-white font-mono text-xs ${className}`}>
        <Eye className="w-3.5 h-3.5" />
        <span>{visitorCount || '1'} visitors</span>
      </span>
    );
  }

  return (
    <div
      className={`inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/70 dark:bg-neutral-900/80 backdrop-blur-md border border-black/5 dark:border-white/10 text-xs font-mono text-neutral-700 dark:text-neutral-300 shadow-2xs hover:border-indigo-500/40 transition-colors select-none ${className}`}
      title="Live real-time visitor count (deduplicated per browser session)"
    >
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
      </span>
      <Eye className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
      <span className="text-[11px] font-medium text-neutral-500 dark:text-neutral-400">Live Visitors:</span>
      <span className="font-bold text-neutral-950 dark:text-white tracking-wide">
        {loading ? (
          <span className="inline-block w-6 h-3 bg-neutral-300 dark:bg-neutral-800 rounded animate-pulse" />
        ) : (
          visitorCount || '1'
        )}
      </span>
    </div>
  );
};
