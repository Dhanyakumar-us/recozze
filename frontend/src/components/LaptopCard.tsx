import React from 'react';
import { ArrowRight, Scale, GraduationCap, Zap } from 'lucide-react';
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
  getLaptopMsrpPrice,
  getLaptopStudentDiscountPct,
  getLaptopStudentCashbackInr,
} from '../utils/laptopUtils';

interface LaptopCardProps {
  laptop: Laptop;
  unidaysActive: boolean;
  isPinned: boolean;
  onPin: (id: string) => void;
  onSelect: (laptop: Laptop) => void;
  onAnalyzePower?: (laptop: Laptop) => void;
}

export const LaptopCard: React.FC<LaptopCardProps> = ({
  laptop,
  unidaysActive,
  isPinned,
  onPin,
  onSelect,
  onAnalyzePower,
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
          {unidaysActive && getLaptopStudentDiscountPct(laptop) > 0 && (
            <span className="px-2.5 py-1 rounded-full bg-emerald-600/90 backdrop-blur-md text-white text-[10px] font-bold flex items-center space-x-1">
              <GraduationCap className="w-3 h-3" />
              <span>SAVE {getLaptopStudentDiscountPct(laptop)}%</span>
            </span>
          )}
        </div>

        <div className="absolute top-3 right-3 flex items-center space-x-1.5 z-10">
          {onAnalyzePower && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onAnalyzePower(laptop);
              }}
              title="Analyze Power Dashboard"
              className="p-2 rounded-full bg-slate-900/80 hover:bg-cyan-500 text-cyan-300 hover:text-slate-950 backdrop-blur-md transition-all cursor-pointer opacity-0 group-hover:opacity-100"
            >
              <Zap className="w-4 h-4 fill-current" />
            </button>
          )}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onPin(laptop.id);
            }}
            title={isPinned ? 'Remove from Compare' : 'Pin to Compare'}
            className={`p-2 rounded-full backdrop-blur-md transition-all cursor-pointer ${
              isPinned
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-white/80 dark:bg-slate-900/80 text-slate-600 dark:text-slate-300 opacity-0 group-hover:opacity-100 hover:bg-white dark:hover:bg-slate-800'
            }`}
          >
            <Scale className="w-4 h-4" />
          </button>
        </div>
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
            <div className="flex items-center space-x-2">
              <span className="text-xs text-slate-400 font-medium">Price</span>
              {unidaysActive && getLaptopMsrpPrice(laptop) > displayPrice && (
                <span className="text-xs text-slate-400 line-through">
                  ₹{getLaptopMsrpPrice(laptop).toLocaleString('en-IN')}
                </span>
              )}
            </div>
            <p className="text-lg font-extrabold text-slate-900 dark:text-white font-display flex items-center space-x-2">
              <span>₹{displayPrice.toLocaleString('en-IN')}</span>
              {unidaysActive && getLaptopStudentDiscountPct(laptop) > 0 && (
                <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-1.5 py-0.5 rounded">
                  {getLaptopStudentDiscountPct(laptop)}% OFF
                </span>
              )}
            </p>
            {unidaysActive && getLaptopStudentCashbackInr(laptop) > 0 && (
              <p className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400">
                + ₹{getLaptopStudentCashbackInr(laptop).toLocaleString('en-IN')} Cashback
              </p>
            )}
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
