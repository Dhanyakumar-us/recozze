import React, { useState, useEffect } from 'react';
import type { Laptop, CurrencyType } from '../types/laptop';
import { LaptopCard } from './LaptopCard';

interface RecentlyViewedProps {
  allLaptops: Laptop[];
  unidaysActive: boolean;
  currency?: CurrencyType;
  currencyRates?: Record<string, number>;
  pinnedIds: string[];
  favoriteIds: string[];
  onTogglePin: (id: string) => void;
  onToggleFavorite: (id: string) => void;
  onSelectLaptop: (laptop: Laptop) => void;
}

export const RecentlyViewed: React.FC<RecentlyViewedProps> = ({
  allLaptops,
  unidaysActive,
  currency = 'INR',
  currencyRates,
  pinnedIds,
  favoriteIds,
  onTogglePin,
  onToggleFavorite,
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
      <div className="border-b border-white/10 pb-4">
        <span className="text-xs font-mono font-bold uppercase text-blue-400 tracking-wider">
          PERSISTENT HISTORY
        </span>
        <h2 className="text-2xl font-black text-white">CONTINUE EXPLORING</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {recentLaptops.slice(0, 2).map((laptop, index) => (
          <LaptopCard
            key={laptop.id}
            laptop={laptop}
            index={index}
            unidaysActive={unidaysActive}
            currency={currency}
            currencyRates={currencyRates}
            isPinned={pinnedIds.includes(laptop.id)}
            isFavorite={favoriteIds.includes(laptop.id)}
            onTogglePin={onTogglePin}
            onToggleFavorite={onToggleFavorite}
            onSelect={onSelectLaptop}
          />
        ))}
      </div>
    </section>
  );
};
