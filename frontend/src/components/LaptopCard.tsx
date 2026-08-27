import React from 'react';
import { ArrowRight, Scale, GraduationCap } from 'lucide-react';
import type { Laptop } from '../types/laptop';
import {
  getLaptopImage,
  getLaptopPrice,
  getLaptopCpu,
  getLaptopGpu,
  getLaptopTgp,
  getLaptopRam,
  getLaptopSsd,
  getLaptopRefreshHz,
} from '../utils/laptopUtils';

interface LaptopCardProps {
  laptop: Laptop;
  unidaysActive: boolean;
  isPinned: boolean;
  onPin: (id: string) => void;
  onSelect: (laptop: Laptop) => void;
}

export const LaptopCard: React.FC<LaptopCardProps> = ({
  laptop,
  unidaysActive,
  isPinned,
  onPin,
  onSelect,
}) => {
  const displayPrice = getLaptopPrice(laptop, unidaysActive);

  return (
    <div
      onClick={() => onSelect(laptop)}
      className="group relative rounded-3xl overflow-hidden bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-400 cursor-pointer flex flex-col justify-between"
    >
      <div className="relative h-60 sm:h-64 overflow-hidden bg-slate-100 dark:bg-slate-800/80 flex items-center justify-center p-4">
        <img
          src={getLaptopImage(laptop)}
          alt={laptop.name}
          className="w-full h-full object-cover rounded-xl group-hover:scale-105 transition-transform duration-500"
        />

        <div className="absolute top-3 left-3 flex items-center space-x-2 z-10">
          <span className="px-3 py-1 rounded-full bg-slate-900/80 backdrop-blur-md text-white text-[10px] font-bold tracking-wider uppercase">
            {laptop.brand}
          </span>
          {unidaysActive && laptop.studentPriceInr && (
            <span className="px-2.5 py-1 rounded-full bg-emerald-600/90 backdrop-blur-md text-white text-[10px] font-bold flex items-center space-x-1">
              <GraduationCap className="w-3 h-3" />
              <span>UNiDAYS</span>
            </span>
          )}
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onPin(laptop.id);
          }}
          title={isPinned ? 'Remove from Compare' : 'Pin to Compare'}
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-all z-10 cursor-pointer ${
            isPinned
              ? 'bg-blue-600 text-white shadow-md'
              : 'bg-white/80 dark:bg-slate-900/80 text-slate-600 dark:text-slate-300 opacity-0 group-hover:opacity-100 hover:bg-white dark:hover:bg-slate-800'
          }`}
        >
          <Scale className="w-4 h-4" />
        </button>
      </div>

      <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex justify-between items-start">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white font-display line-clamp-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              {laptop.name}
            </h3>
          </div>

          <p className="text-xs text-slate-500 mt-1 line-clamp-1">
            {getLaptopCpu(laptop)} • {getLaptopGpu(laptop)} ({getLaptopTgp(laptop)}W TGP)
          </p>

          <div className="flex items-center space-x-3 text-xs font-semibold text-slate-700 dark:text-slate-300 mt-3 pt-3 border-t border-slate-100 dark:border-slate-800">
            <span>{getLaptopRam(laptop)}GB RAM</span>
            <span>•</span>
            <span>
              {getLaptopSsd(laptop) >= 1000
                ? `${getLaptopSsd(laptop) / 1000}TB`
                : `${getLaptopSsd(laptop)}GB`}{' '}
              SSD
            </span>
            <span>•</span>
            <span>{getLaptopRefreshHz(laptop)}Hz</span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-2">
          <div>
            <span className="text-xs text-slate-400 font-medium">Price</span>
            <p className="text-lg font-extrabold text-slate-900 dark:text-white font-display">
              ₹{displayPrice.toLocaleString('en-IN')}
            </p>
          </div>

          <div className="inline-flex items-center space-x-1 text-xs font-bold text-blue-600 dark:text-blue-400 group-hover:translate-x-1 transition-transform">
            <span>EXPLORE</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </div>
      </div>
    </div>
  );
};
