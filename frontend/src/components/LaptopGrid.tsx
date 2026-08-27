import React, { useState } from 'react';
import { LaptopCard } from './LaptopCard';
import type { Laptop, CurrencyType } from '../types/laptop';
import { SlidersHorizontal, AlertCircle } from 'lucide-react';
import { SkeletonLoader } from './SkeletonLoader';

interface LaptopGridProps {
  laptops: Laptop[];
  loading: boolean;
  unidaysActive: boolean;
  currency?: CurrencyType;
  currencyRates?: Record<string, number>;
  pinnedIds: string[];
  favoriteIds?: string[];
  onTogglePin: (id: string) => void;
  onToggleFavorite?: (id: string) => void;
  onSelectLaptop: (laptop: Laptop) => void;
}

export const LaptopGrid: React.FC<LaptopGridProps> = ({
  laptops,
  loading,
  unidaysActive,
  currency = 'INR',
  currencyRates,
  pinnedIds,
  favoriteIds = [],
  onTogglePin,
  onToggleFavorite,
  onSelectLaptop,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('ALL');
  const [sortBy, setSortBy] = useState<'match' | 'price_low' | 'price_high' | 'power'>('match');

  const categories = ['ALL', 'GAMING', 'CODING', 'STUDENT', 'CREATOR', 'BUSINESS'];

  const filteredLaptops = laptops.filter((laptop) => {
    if (activeCategory === 'ALL') return true;
    return laptop.category.toUpperCase().includes(activeCategory);
  });

  const sortedLaptops = [...filteredLaptops].sort((a, b) => {
    const priceA = unidaysActive ? a.studentPriceInr : a.currentBestPriceInr;
    const priceB = unidaysActive ? b.studentPriceInr : b.currentBestPriceInr;

    if (sortBy === 'price_low') return priceA - priceB;
    if (sortBy === 'price_high') return priceB - priceA;
    if (sortBy === 'power') return b.powerRating10 - a.powerRating10;
    return (b.calculatedMatchPct || 90) - (a.calculatedMatchPct || 90);
  });

  return (
    <section className="w-full py-12 space-y-8">
      {/* Header & Category Tabs */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-6">
        <div className="space-y-2">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-blue-400">
            HARDWARE SHOWROOM
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            EXPLORE DEVICES
          </h2>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap items-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-mono font-bold transition-all cursor-pointer ${
                activeCategory === cat
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20'
                  : 'bg-[#101010] text-slate-400 border border-white/10 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Sorting Control Row */}
      <div className="flex items-center justify-between text-xs font-mono text-slate-400">
        <span>Showing {sortedLaptops.length} Verified Devices</span>

        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-3.5 h-3.5 text-blue-400" />
          <span>Sort By:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="bg-[#101010] text-white border border-white/10 rounded-xl px-3 py-1.5 focus:outline-none focus:border-blue-500 cursor-pointer"
          >
            <option value="match">Match Score (Highest)</option>
            <option value="price_low">Price (Low to High)</option>
            <option value="price_high">Price (High to Low)</option>
            <option value="power">Power Rating (10/10)</option>
          </select>
        </div>
      </div>

      {/* Skeleton Loading State */}
      {loading && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {[1, 2, 3, 4].map((i) => (
            <SkeletonLoader key={i} />
          ))}
        </div>
      )}

      {/* Empty State */}
      {!loading && sortedLaptops.length === 0 && (
        <div className="p-12 text-center rounded-3xl bg-[#101010] border border-white/10 space-y-4 max-w-md mx-auto">
          <AlertCircle className="w-8 h-8 text-amber-400 mx-auto" />
          <h3 className="text-base font-bold text-white">No devices found in category</h3>
          <p className="text-xs text-slate-400">Try adjusting your filters or selecting "ALL".</p>
          <button
            onClick={() => setActiveCategory('ALL')}
            className="px-5 py-2 rounded-full bg-blue-600 text-white text-xs font-bold"
          >
            Show All Devices
          </button>
        </div>
      )}

      {/* Editorial Grid Layout (Alternating full vs half width card spans) */}
      {!loading && sortedLaptops.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {sortedLaptops.map((laptop, index) => (
            <div
              key={laptop.id}
              className={index % 3 === 0 ? 'lg:col-span-2' : 'lg:col-span-1'}
            >
              <LaptopCard
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
            </div>
          ))}
        </div>
      )}
    </section>
  );
};
