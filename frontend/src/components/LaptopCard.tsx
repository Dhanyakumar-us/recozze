import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Plus, Check, ExternalLink } from 'lucide-react';
import type { Laptop, CurrencyType } from '../types/laptop';
import { formatPrice } from '../services/api';

interface LaptopCardProps {
  laptop: Laptop;
  index: number;
  unidaysActive: boolean;
  currency?: CurrencyType;
  currencyRates?: Record<string, number>;
  isPinned: boolean;
  isFavorite?: boolean;
  onTogglePin: (id: string) => void;
  onToggleFavorite?: (id: string) => void;
  onSelect: (laptop: Laptop) => void;
}

export const LaptopCard: React.FC<LaptopCardProps> = ({
  laptop,
  index,
  unidaysActive,
  currency = 'INR',
  currencyRates,
  isPinned,
  isFavorite = false,
  onTogglePin,
  onToggleFavorite,
  onSelect,
}) => {
  const displayPriceInr = unidaysActive ? laptop.studentPriceInr : laptop.currentBestPriceInr;
  const matchScore = laptop.calculatedMatchPct || Math.max(78, 98 - index * 3);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      whileHover={{ y: -6, scale: 1.01 }}
      className="group relative p-6 sm:p-8 rounded-3xl bg-[#101010] border border-white/10 hover:border-blue-500/50 transition-all duration-300 shadow-xl overflow-hidden cursor-pointer"
      onClick={() => onSelect(laptop)}
    >
      {/* Top Hover Electric Blue Line Indicator */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Header Row: Brand & Match Badge */}
      <div className="flex items-center justify-between gap-4 mb-4">
        <div>
          <span className="text-xs font-mono font-bold uppercase text-slate-400 group-hover:text-blue-400 transition-colors">
            {laptop.brand}
          </span>
          <h3 className="text-xl sm:text-2xl font-black text-white line-clamp-1 mt-0.5">
            {laptop.name}
          </h3>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={(e) => {
              e.stopPropagation();
              if (onToggleFavorite) onToggleFavorite(laptop.id);
            }}
            className={`p-2 rounded-full border transition-all ${
              isFavorite
                ? 'bg-rose-500/20 border-rose-500/40 text-rose-400'
                : 'bg-slate-900 border-white/10 text-slate-400 hover:text-rose-400'
            }`}
          >
            <Heart className={`w-4 h-4 ${isFavorite ? 'fill-rose-400' : ''}`} />
          </button>

          <span className="px-3.5 py-1.5 rounded-full text-xs font-mono font-extrabold bg-blue-500/10 text-blue-400 border border-blue-500/30">
            {matchScore}% MATCH
          </span>
        </div>
      </div>

      {/* Large Central Laptop Image Presentation */}
      <div className="my-6 h-48 sm:h-56 w-full rounded-2xl bg-[#050505] flex items-center justify-center p-4 border border-white/5 relative overflow-hidden">
        <img
          src={laptop.image}
          alt={laptop.name}
          className="max-h-full object-contain filter drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)] group-hover:scale-105 group-hover:rotate-1 transition-all duration-500"
        />
      </div>

      {/* Specifications HUD Chips */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-mono mb-6">
        <div className="p-2.5 rounded-xl bg-[#050505] border border-white/5 text-slate-300 font-semibold truncate">
          {laptop.specs.gpu}
        </div>
        <div className="p-2.5 rounded-xl bg-[#050505] border border-white/5 text-slate-300 font-semibold truncate">
          {laptop.specs.cpu.split(' ')[0]} {laptop.specs.cpu.split(' ')[1] || ''}
        </div>
        <div className="p-2.5 rounded-xl bg-[#050505] border border-white/5 text-slate-300 font-semibold truncate">
          {laptop.specs.ramGb}GB RAM
        </div>
        <div className="p-2.5 rounded-xl bg-[#050505] border border-white/5 text-slate-300 font-semibold truncate">
          {laptop.specs.ssdStorageGb}GB SSD
        </div>
      </div>

      {/* Footer Row: Price & Compare Pin Action */}
      <div className="flex items-center justify-between pt-4 border-t border-white/10">
        <div>
          <span className="text-[10px] font-mono text-slate-500 uppercase block">Current Price</span>
          <span className="text-xl sm:text-2xl font-black font-mono text-white">
            {formatPrice(displayPriceInr, currency, currencyRates)}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onTogglePin(laptop.id);
            }}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold border transition-all ${
              isPinned
                ? 'bg-blue-600 border-blue-500 text-white'
                : 'bg-slate-900 border-white/10 text-slate-300 hover:text-white hover:border-slate-700'
            }`}
          >
            {isPinned ? <Check className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
            <span>{isPinned ? 'PINNED' : '+ COMPARE'}</span>
          </button>

          <a
            href={laptop.retailerPrices.officialUrl}
            target="_blank"
            rel="noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="p-2.5 rounded-xl bg-blue-600 text-white hover:bg-blue-500 transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </motion.div>
  );
};
