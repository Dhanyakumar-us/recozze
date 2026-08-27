import React from 'react';
import { X, Zap, Flame, ShieldCheck, ExternalLink } from 'lucide-react';
import type { Laptop } from '../types/laptop';
import {
  getLaptopImage,
  getLaptopPrice,
  getLaptopCpu,
  getLaptopGpu,
  getLaptopTgp,
  getLaptopRam,
  getLaptopSsd,
  getLaptopWeight,
  getLaptopRefreshHz,
  getLaptopMatchScore,
} from '../utils/laptopUtils';

interface DetailModalProps {
  laptop: Laptop | null;
  unidaysActive: boolean;
  onClose: () => void;
  onPin: (id: string) => void;
  isPinned: boolean;
}

export const DetailModal: React.FC<DetailModalProps> = ({
  laptop,
  unidaysActive,
  onClose,
  onPin,
  isPinned,
}) => {
  if (!laptop) return null;

  const displayPrice = getLaptopPrice(laptop, unidaysActive);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-slate-950/80 backdrop-blur-md">
      <div className="relative w-full max-w-5xl bg-white dark:bg-slate-900 rounded-3xl overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800 my-8 max-h-[90vh] flex flex-col">
        <div className="px-8 py-5 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center bg-white/80 dark:bg-slate-900/80 backdrop-blur-md sticky top-0 z-20">
          <div>
            <span className="text-[10px] font-extrabold tracking-widest text-blue-600 dark:text-blue-400 uppercase">
              {laptop.brand} PRODUCT SHOWCASE
            </span>
            <h2 className="text-xl font-bold font-display text-slate-900 dark:text-white line-clamp-1">
              {laptop.name}
            </h2>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={() => onPin(laptop.id)}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                isPinned
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
              }`}
            >
              {isPinned ? 'Pinned for Compare' : 'Pin to Compare'}
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-full text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="p-8 sm:p-12 overflow-y-auto space-y-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="rounded-3xl overflow-hidden bg-slate-900 h-80 sm:h-96 shadow-lg">
              <img
                src={getLaptopImage(laptop)}
                alt={laptop.name}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="space-y-6">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 text-xs font-bold">
                <ShieldCheck className="w-4 h-4" />
                <span>{getLaptopMatchScore(laptop)}% Fit Rating Index</span>
              </div>

              <h1 className="text-3xl sm:text-4xl font-black font-display text-slate-900 dark:text-white">
                {laptop.name}
              </h1>

              <div>
                <span className="text-xs text-slate-400 uppercase tracking-wider font-bold">
                  RETAIL PRICE
                </span>
                <p className="text-3xl font-black text-slate-900 dark:text-white font-display">
                  ₹{displayPrice.toLocaleString('en-IN')}
                </p>
                {unidaysActive && laptop.studentPriceInr && (
                  <p className="text-xs text-emerald-600 dark:text-emerald-400 font-bold mt-1">
                    ✓ Includes UNiDAYS Student Discount & Instant Cashback
                  </p>
                )}
              </div>

              <div className="pt-2 flex flex-wrap gap-3">
                <a
                  href={laptop.retailerPrices?.amazonUrl || '#'}
                  target="_blank"
                  rel="noreferrer"
                  className="px-6 py-3 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold text-xs hover:scale-105 transition-transform flex items-center space-x-2"
                >
                  <span>Buy on Retailer</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center border-y border-slate-200 dark:border-slate-800 py-12">
            <div className="space-y-1">
              <span className="text-4xl sm:text-5xl font-black font-display text-blue-600 dark:text-blue-400">
                {getLaptopTgp(laptop)}W
              </span>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                TGP WATTAGE
              </p>
            </div>

            <div className="space-y-1">
              <span className="text-4xl sm:text-5xl font-black font-display text-slate-900 dark:text-white">
                {getLaptopRam(laptop)} GB
              </span>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                DDR5 MEMORY
              </p>
            </div>

            <div className="space-y-1">
              <span className="text-4xl sm:text-5xl font-black font-display text-indigo-600 dark:text-indigo-400">
                {getLaptopRefreshHz(laptop)} Hz
              </span>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                DISPLAY RATE
              </p>
            </div>

            <div className="space-y-1">
              <span className="text-4xl sm:text-5xl font-black font-display text-emerald-600 dark:text-emerald-400">
                {getLaptopWeight(laptop)} KG
              </span>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                PORTABILITY
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-2xl font-bold font-display text-slate-900 dark:text-white flex items-center space-x-2">
              <Zap className="w-5 h-5 text-blue-600" />
              <span>PERFORMANCE & SYNTHETICS</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-800 space-y-1">
                <span className="text-xs font-bold text-slate-400 uppercase">GPU ARCHITECTURE</span>
                <p className="text-lg font-extrabold text-slate-900 dark:text-white">{getLaptopGpu(laptop)}</p>
                <p className="text-xs text-slate-500">{getLaptopTgp(laptop)}W Maximum Graphics Power</p>
              </div>

              <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-800 space-y-1">
                <span className="text-xs font-bold text-slate-400 uppercase">CPU PROCESSOR</span>
                <p className="text-lg font-extrabold text-slate-900 dark:text-white">{getLaptopCpu(laptop)}</p>
                <p className="text-xs text-slate-500">Cinebench R23 Score: {laptop.benchmarks?.cinebenchR23Multi || 18500} pts</p>
              </div>

              <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-800 space-y-1">
                <span className="text-xs font-bold text-slate-400 uppercase">STORAGE & SPEED</span>
                <p className="text-lg font-extrabold text-slate-900 dark:text-white">{getLaptopSsd(laptop)} GB NVMe</p>
                <p className="text-xs text-slate-500">High-speed PCIe Gen4 read rates</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-2xl font-bold font-display text-slate-900 dark:text-white flex items-center space-x-2">
              <Flame className="w-5 h-5 text-emerald-600" />
              <span>THERMAL COOLING & ACOUSTICS</span>
            </h3>
            <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-6">
              <div>
                <p className="text-sm font-bold text-slate-900 dark:text-white">
                  {laptop.cooling?.heatpipeCount || 4} Copper Heat Pipes • {laptop.cooling?.fanCount || 2} High-CFM Fans
                </p>
                <p className="text-xs text-slate-500 mt-1">
                  Peak Surface Temp: {laptop.cooling?.maxSurfaceTempC || 42}°C • Fan Noise: {laptop.cooling?.peakNoiseLevelDb || 44} dB
                </p>
              </div>
              <div className="px-4 py-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 font-bold text-xs">
                Thermal Rating: Excellent
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
