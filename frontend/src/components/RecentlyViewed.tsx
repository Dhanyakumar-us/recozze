import React, { useState, useEffect } from 'react';
import type { Laptop } from '../types/laptop';
import { LaptopCard } from './LaptopCard';

interface RecentlyViewedProps {
  allLaptops: Laptop[];
  unidaysActive: boolean;
  pinnedIds: string[];
  onTogglePin: (id: string) => void;
  onSelectLaptop: (laptop: Laptop) => void;
}

export const RecentlyViewed: React.FC<RecentlyViewedProps> = ({
  allLaptops,
  unidaysActive,
  pinnedIds,
  onTogglePin,
  onSelectLaptop,
}) => {
  const [recentLaptops, setRecentLaptops] = useState<Laptop[]>([]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('reco_recently_viewed');
      if (saved) {
        const ids: string[] = JSON.parse(saved);
        const filtered = allLaptops.filter((l) => ids.includes(l.id));
        if (filtered.length > 0) {
          setRecentLaptops(filtered);
          return;
        }
      }
    } catch (e) {
      console.warn('Failed to load recently viewed laptops:', e);
    }
    setRecentLaptops(allLaptops.slice(0, 2));
  }, [allLaptops]);

  if (recentLaptops.length === 0) return null;

  return (
    <section className="w-full py-12 space-y-6">
      <div className="border-b border-slate-200 dark:border-slate-800 pb-4">
        <span className="text-xs font-bold uppercase text-blue-600 dark:text-blue-400 tracking-wider">
          PERSISTENT HISTORY
        </span>
        <h2 className="text-2xl font-bold font-display text-slate-900 dark:text-white">CONTINUE EXPLORING</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {recentLaptops.slice(0, 2).map((laptop) => (
          <LaptopCard
            key={laptop.id}
            laptop={laptop}
            unidaysActive={unidaysActive}
            isPinned={pinnedIds.includes(laptop.id)}
            onPin={onTogglePin}
            onSelect={onSelectLaptop}
          />
        ))}
      </div>
    </section>
  );
};
