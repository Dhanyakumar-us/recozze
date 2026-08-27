import React from 'react';
import { X, Scale, ArrowRight } from 'lucide-react';
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
} from '../utils/laptopUtils';

interface CompareMatrixProps {
  compareLaptops: Laptop[];
  isOpen: boolean;
  onClose: () => void;
  onRemovePin: (id: string) => void;
}

export const CompareMatrix: React.FC<CompareMatrixProps> = ({
  compareLaptops,
  isOpen,
  onClose,
  onRemovePin,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-slate-950/80 backdrop-blur-md">
      <div className="relative w-full max-w-6xl bg-white dark:bg-slate-900 rounded-3xl overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800 my-8 flex flex-col max-h-[90vh]">
        <div className="px-8 py-5 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center bg-white/80 dark:bg-slate-900/80 backdrop-blur-md sticky top-0 z-10">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-xl bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400">
              <Scale className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-extrabold tracking-widest text-slate-400 uppercase">
                SIDE-BY-SIDE MATRIX
              </span>
              <h2 className="text-xl font-bold font-display text-slate-900 dark:text-white">
                COMPARE LAPTOPS ({compareLaptops.length})
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-8 overflow-y-auto">
          {compareLaptops.length === 0 ? (
            <div className="text-center py-16 text-slate-500">
              No laptops selected for comparison. Pin laptops using the scale icon on cards.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {compareLaptops.map((laptop) => (
                <div
                  key={laptop.id}
                  className="rounded-3xl border border-slate-200 dark:border-slate-800 p-6 space-y-6 flex flex-col justify-between bg-slate-50/50 dark:bg-slate-800/40 relative"
                >
                  <button
                    onClick={() => onRemovePin(laptop.id)}
                    className="absolute top-4 right-4 p-1.5 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-300 cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>

                  <div className="space-y-4">
                    <div className="h-44 rounded-2xl overflow-hidden bg-slate-900">
                      <img
                        src={getLaptopImage(laptop)}
                        alt={laptop.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div>
                      <span className="text-[10px] font-extrabold tracking-widest text-blue-600 dark:text-blue-400 uppercase">
                        {laptop.brand}
                      </span>
                      <h3 className="text-lg font-bold font-display text-slate-900 dark:text-white line-clamp-1">
                        {laptop.name}
                      </h3>
                      <p className="text-xl font-black text-slate-900 dark:text-white mt-1">
                        ₹{getLaptopPrice(laptop).toLocaleString('en-IN')}
                      </p>
                    </div>

                    <div className="space-y-2 text-xs text-slate-600 dark:text-slate-400 pt-4 border-t border-slate-200 dark:border-slate-800">
                      <div className="flex justify-between">
                        <span className="font-semibold text-slate-400">GPU & TGP</span>
                        <span className="font-bold text-slate-900 dark:text-white">{getLaptopGpu(laptop)} ({getLaptopTgp(laptop)}W)</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-semibold text-slate-400">CPU</span>
                        <span className="font-bold text-slate-900 dark:text-white">{getLaptopCpu(laptop)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-semibold text-slate-400">RAM</span>
                        <span className="font-bold text-slate-900 dark:text-white">{getLaptopRam(laptop)} GB DDR5</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-semibold text-slate-400">Storage</span>
                        <span className="font-bold text-slate-900 dark:text-white">{getLaptopSsd(laptop)} GB SSD</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-semibold text-slate-400">Weight</span>
                        <span className="font-bold text-slate-900 dark:text-white">{getLaptopWeight(laptop)} KG</span>
                      </div>
                    </div>
                  </div>

                  <a
                    href={laptop.retailerPrices?.amazonUrl || '#'}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full py-3 rounded-full bg-blue-600 text-white font-bold text-xs text-center hover:bg-blue-700 transition-colors inline-block"
                  >
                    View Retailer Offer →
                  </a>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

interface FloatingCompareBarProps {
  pinnedCount: number;
  onOpenCompare: () => void;
}

export const FloatingCompareBar: React.FC<FloatingCompareBarProps> = ({
  pinnedCount,
  onOpenCompare,
}) => {
  if (pinnedCount === 0) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40">
      <button
        onClick={onOpenCompare}
        className="px-6 py-3.5 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-extrabold text-xs shadow-2xl hover:scale-105 transition-transform flex items-center space-x-3 cursor-pointer border border-slate-700/50"
      >
        <Scale className="w-4 h-4 text-blue-400 dark:text-blue-600" />
        <span>COMPARE ({pinnedCount} PINNED)</span>
        <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  );
};
