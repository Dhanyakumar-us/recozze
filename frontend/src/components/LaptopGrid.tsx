import React, { useState } from 'react';
import { Search, ArrowUpDown } from 'lucide-react';
import type { Laptop, UserPreferences } from '../types/laptop';
import { LaptopCard } from './LaptopCard';
import {
  getLaptopPrice,
  getLaptopMatchScore,
} from '../utils/laptopUtils';

interface LaptopGridProps {
  laptops: Laptop[];
  loading: boolean;
  preferences: UserPreferences;
  onPreferenceChange: (updated: Partial<UserPreferences>) => void;
  pinnedIds: string[];
  onPinLaptop: (id: string) => void;
  onSelectLaptop: (laptop: Laptop) => void;
  onAnalyzePower?: (laptop: Laptop) => void;
}

export const LaptopGrid: React.FC<LaptopGridProps> = ({
  laptops,
  loading,
  preferences,
  onPreferenceChange,
  pinnedIds,
  onPinLaptop,
  onSelectLaptop,
  onAnalyzePower,
}) => {
  const [sortBy, setSortBy] = useState<'match' | 'price_asc' | 'price_desc' | 'power'>('match');

  const sortedLaptops = [...laptops].sort((a, b) => {
    const pA = getLaptopPrice(a, preferences.unidaysActive);
    const pB = getLaptopPrice(b, preferences.unidaysActive);
    if (sortBy === 'price_asc') return pA - pB;
    if (sortBy === 'price_desc') return pB - pA;
    if (sortBy === 'power') return (b.powerRating10 || 0) - (a.powerRating10 || 0);
    return getLaptopMatchScore(b) - getLaptopMatchScore(a);
  });

  return (
    <section className="py-20 px-6 sm:px-8 max-w-7xl mx-auto space-y-12">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-slate-200 dark:border-slate-800">
        <div>
          <span className="text-xs font-bold tracking-widest text-slate-400 uppercase">
            FULL SHOWROOM CATALOG
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-slate-900 dark:text-white mt-1">
            ALL LAPTOPS ({laptops.length})
          </h2>
        </div>

        <div className="w-full md:w-auto flex flex-col sm:flex-row items-center gap-3">
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search model, GPU, CPU..."
              value={preferences.searchQuery || ''}
              onChange={(e) => onPreferenceChange({ searchQuery: e.target.value })}
              className="w-full pl-10 pr-4 py-2 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-blue-600 shadow-xs"
            />
          </div>

          <div className="flex items-center space-x-2 w-full sm:w-auto">
            <ArrowUpDown className="w-4 h-4 text-slate-400 shrink-0" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="w-full sm:w-auto px-4 py-2 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-900 dark:text-white focus:outline-none cursor-pointer shadow-xs"
            >
              <option value="match">Sort by Match Score</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
              <option value="power">Sort by 10-Pt Power Rating</option>
            </select>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="h-[380px] rounded-3xl bg-slate-200 dark:bg-slate-800/60 animate-pulse"
            />
          ))}
        </div>
      ) : sortedLaptops.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {sortedLaptops.map((laptop) => (
            <LaptopCard
              key={laptop.id}
              laptop={laptop}
              unidaysActive={preferences.unidaysActive}
              isPinned={pinnedIds.includes(laptop.id)}
              onPin={onPinLaptop}
              onSelect={onSelectLaptop}
              onAnalyzePower={onAnalyzePower}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8">
          <p className="text-lg font-bold text-slate-900 dark:text-white">
            No laptops match your criteria.
          </p>
          <p className="text-xs text-slate-500 mt-1">
            Try adjusting your search query or expanding your budget range.
          </p>
        </div>
      )}
    </section>
  );
};
