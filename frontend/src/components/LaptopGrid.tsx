import React, { useState } from 'react';
import { LaptopCard } from './LaptopCard';
import type { Laptop } from '../types/laptop';
import { SlidersHorizontal, AlertCircle } from 'lucide-react';

interface LaptopGridProps {
  laptops: Laptop[];
  loading: boolean;
  unidaysActive: boolean;
  pinnedIds: string[];
  onTogglePin: (id: string) => void;
  onSelectLaptop: (laptop: Laptop) => void;
}

export const LaptopGrid: React.FC<LaptopGridProps> = ({
  laptops,
  loading,
  unidaysActive,
  pinnedIds,
  onTogglePin,
  onSelectLaptop
}) => {
  const [sortBy, setSortBy] = useState<'match' | 'tgp' | 'power' | 'priceAsc' | 'priceDesc'>('match');

  const sortedLaptops = [...laptops].sort((a, b) => {
    if (sortBy === 'match') return (b.calculatedMatchPct || 0) - (a.calculatedMatchPct || 0);
    if (sortBy === 'tgp') return b.specs.tgpWatts - a.specs.tgpWatts;
    if (sortBy === 'power') return b.powerRating10 - a.powerRating10;
    const priceA = unidaysActive ? a.studentPriceInr : a.currentBestPriceInr;
    const priceB = unidaysActive ? b.studentPriceInr : b.currentBestPriceInr;
    if (sortBy === 'priceAsc') return priceA - priceB;
    if (sortBy === 'priceDesc') return priceB - priceA;
    return 0;
  });

  return (
    <div className="space-y-6">
      {/* Header Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/80 dark:border-slate-800 pb-4">
        <div>
          <h2 className="text-xl font-black text-slate-950 dark:text-white">
            Matched Laptops & TGP Power Ranking
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {laptops.length} models verified for TGP wattage limits & thermals
          </p>
        </div>

        {/* Sort Selector */}
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-4 h-4 text-slate-400" />
          <span className="text-xs font-mono font-bold text-slate-500">Sort By:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="bg-white dark:bg-slate-900 border border-slate-300/80 dark:border-slate-800 rounded-full px-3 py-1.5 text-xs font-semibold text-slate-950 dark:text-slate-100 focus:outline-none focus:border-cyan-500 font-sans"
          >
            <option value="match">Workload Match % (Highest)</option>
            <option value="tgp">GPU TGP Wattage (Highest)</option>
            <option value="power">10-Point Power Score</option>
            <option value="priceAsc">Price: Low to High</option>
            <option value="priceDesc">Price: High to Low</option>
          </select>
        </div>
      </div>

      {/* Shimmer Skeleton Loaders */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="glass-panel p-6 rounded-3xl space-y-4 animate-pulse">
              <div className="h-44 bg-slate-200 dark:bg-slate-800 rounded-2xl animate-shimmer" />
              <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded-full w-3/4 animate-shimmer" />
              <div className="h-3 bg-slate-200 dark:bg-slate-800 rounded-full w-1/2 animate-shimmer" />
              <div className="h-16 bg-slate-200 dark:bg-slate-800 rounded-2xl animate-shimmer" />
            </div>
          ))}
        </div>
      ) : sortedLaptops.length === 0 ? (
        /* Empty State */
        <div className="glass-panel p-12 rounded-3xl text-center space-y-4 max-w-lg mx-auto">
          <AlertCircle className="w-12 h-12 text-amber-500 mx-auto" />
          <h3 className="text-lg font-bold text-slate-950 dark:text-white">No Laptops Match These Exact Constraints</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Try adjusting your budget limit, lowering RAM capacity, or selecting "All Power Tiers" in the Spec Matcher.
          </p>
        </div>
      ) : (
        /* Laptop Cards Grid */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedLaptops.map((laptop, index) => (
            <LaptopCard
              key={laptop.id}
              laptop={laptop}
              index={index}
              unidaysActive={unidaysActive}
              isPinned={pinnedIds.includes(laptop.id)}
              onTogglePin={onTogglePin}
              onSelect={onSelectLaptop}
            />
          ))}
        </div>
      )}
    </div>
  );
};
