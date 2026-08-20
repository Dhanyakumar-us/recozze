import React from 'react';
import { X, Scale, ExternalLink, Zap, Gauge, GraduationCap, ChevronUp, Trash2 } from 'lucide-react';
import type { Laptop } from '../types/laptop';

interface CompareMatrixProps {
  laptops: Laptop[];
  unidaysActive: boolean;
  onRemovePin: (id: string) => void;
  onClearAll: () => void;
  onClose: () => void;
}

export const CompareMatrix: React.FC<CompareMatrixProps> = ({
  laptops,
  unidaysActive,
  onRemovePin,
  onClearAll,
  onClose
}) => {
  if (laptops.length === 0) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto animate-fadeIn">
      <div className="relative w-full max-w-6xl glass-panel rounded-3xl border-slate-200/80 dark:border-slate-800 overflow-hidden shadow-2xl my-8 text-slate-950 dark:text-white">
        
        {/* Header */}
        <div className="p-6 border-b border-slate-200/80 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-900">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-cyan-600 dark:bg-cyan-500 text-white dark:text-slate-950">
              <Scale className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-black">Side-by-Side Spec & TGP Comparison Matrix</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">Comparing {laptops.length} pinned models side-by-side</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onClearAll}
              className="text-xs font-semibold text-slate-500 hover:text-rose-600 transition-colors flex items-center gap-1"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear All Pinned</span>
            </button>
            <button
              onClick={onClose}
              className="p-2.5 rounded-full bg-slate-200/80 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white transition-all"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Comparison Table */}
        <div className="p-6 overflow-x-auto max-h-[75vh]">
          <table className="w-full text-left border-collapse text-xs font-mono">
            <thead>
              <tr className="border-b border-slate-200/80 dark:border-slate-800">
                <th className="p-3 w-48 text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider">Specs & Features</th>
                {laptops.map((laptop) => (
                  <th key={laptop.id} className="p-3 min-w-[240px] align-top">
                    <div className="relative p-4 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 space-y-2">
                      <button
                        onClick={() => onRemovePin(laptop.id)}
                        className="absolute top-2 right-2 p-1 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-500 hover:text-rose-500"
                        title="Remove"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>

                      <div className="h-24 rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-800 mb-2">
                        <img src={laptop.image} alt={laptop.name} className="w-full h-full object-cover" />
                      </div>

                      <span className="text-[10px] uppercase font-bold text-cyan-600 dark:text-cyan-400 block">{laptop.brand}</span>
                      <h4 className="font-bold text-sm text-slate-950 dark:text-white line-clamp-1">{laptop.name}</h4>

                      <div className="flex items-baseline gap-1 text-base font-extrabold text-slate-950 dark:text-white">
                        ₹{(unidaysActive ? laptop.studentPriceInr : laptop.currentBestPriceInr).toLocaleString('en-IN')}
                      </div>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200/80 dark:divide-slate-800">
              {/* GPU & TGP Wattage */}
              <tr>
                <td className="p-3 font-bold text-slate-500 dark:text-slate-400">GPU & TGP Wattage</td>
                {laptops.map((l) => (
                  <td key={l.id} className="p-3 font-bold text-amber-600 dark:text-amber-400">
                    <div className="flex items-center gap-1">
                      <Zap className="w-3.5 h-3.5 fill-amber-500" />
                      <span>{l.specs.gpu} ({l.specs.tgpWatts}W TGP)</span>
                    </div>
                  </td>
                ))}
              </tr>

              {/* Power Score */}
              <tr>
                <td className="p-3 font-bold text-slate-500 dark:text-slate-400">10-Point Power Score</td>
                {laptops.map((l) => (
                  <td key={l.id} className="p-3 font-bold text-cyan-600 dark:text-cyan-400">
                    <div className="flex items-center gap-1">
                      <Gauge className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
                      <span>{l.powerRating10} / 10</span>
                    </div>
                  </td>
                ))}
              </tr>

              {/* CPU Processor */}
              <tr>
                <td className="p-3 font-bold text-slate-500 dark:text-slate-400">CPU Processor</td>
                {laptops.map((l) => (
                  <td key={l.id} className="p-3 text-slate-800 dark:text-slate-200">{l.specs.cpu}</td>
                ))}
              </tr>

              {/* RAM & Storage */}
              <tr>
                <td className="p-3 font-bold text-slate-500 dark:text-slate-400">RAM & Storage</td>
                {laptops.map((l) => (
                  <td key={l.id} className="p-3 text-slate-800 dark:text-slate-200">
                    {l.specs.ramGb}GB {l.specs.ramType} | {l.specs.ssdStorageGb}GB SSD
                  </td>
                ))}
              </tr>

              {/* Thermals */}
              <tr>
                <td className="p-3 font-bold text-slate-500 dark:text-slate-400">Thermal Temp & Noise</td>
                {laptops.map((l) => (
                  <td key={l.id} className="p-3">
                    <span className="text-amber-600 dark:text-amber-400 font-bold block">{l.cooling.maxSurfaceTempC}°C Peak Surface</span>
                    <span className="text-slate-500 text-[11px]">{l.cooling.fanCount} Fans • {l.cooling.peakNoiseLevelDb} dB</span>
                  </td>
                ))}
              </tr>

              {/* Cinebench R23 */}
              <tr>
                <td className="p-3 font-bold text-slate-500 dark:text-slate-400">Cinebench R23 Multi</td>
                {laptops.map((l) => (
                  <td key={l.id} className="p-3 font-bold text-purple-600 dark:text-purple-400">
                    {l.benchmarks.cinebenchR23Multi.toLocaleString()} pts
                  </td>
                ))}
              </tr>

              {/* Time Spy GPU */}
              <tr>
                <td className="p-3 font-bold text-slate-500 dark:text-slate-400">3DMark Time Spy GPU</td>
                {laptops.map((l) => (
                  <td key={l.id} className="p-3 font-bold text-cyan-600 dark:text-cyan-400">
                    {l.benchmarks.timeSpyGpu.toLocaleString()} pts
                  </td>
                ))}
              </tr>

              {/* UNiDAYS Student Cashback */}
              <tr>
                <td className="p-3 font-bold text-slate-500 dark:text-slate-400">UNiDAYS Student Perks</td>
                {laptops.map((l) => (
                  <td key={l.id} className="p-3 text-emerald-600 dark:text-emerald-400 font-bold">
                    <div className="flex items-center gap-1">
                      <GraduationCap className="w-3.5 h-3.5" />
                      <span>₹{l.studentBenefits.cashbackInr.toLocaleString('en-IN')} Cashback</span>
                    </div>
                  </td>
                ))}
              </tr>

              {/* Direct Store Link */}
              <tr>
                <td className="p-3 font-bold text-slate-500 dark:text-slate-400">Official Store Link</td>
                {laptops.map((l) => (
                  <td key={l.id} className="p-3">
                    <a
                      href={l.retailerPrices.officialUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 px-4 py-1.5 rounded-full text-xs font-bold bg-cyan-600 dark:bg-cyan-500 text-white dark:text-slate-950 hover:bg-cyan-700 dark:hover:bg-cyan-400 transition-all shadow-sm"
                    >
                      <span>Checkout Store</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

interface FloatingCompareBarProps {
  pinnedCount: number;
  onExpand: () => void;
  onClear: () => void;
}

export const FloatingCompareBar: React.FC<FloatingCompareBarProps> = ({
  pinnedCount,
  onExpand,
  onClear
}) => {
  if (pinnedCount === 0) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 glass-panel rounded-full px-6 py-3 border border-cyan-500/50 shadow-2xl flex items-center gap-4 animate-slide-up">
      <div className="flex items-center gap-2">
        <span className="flex items-center justify-center w-6 h-6 rounded-full bg-cyan-600 text-white font-bold text-xs">
          {pinnedCount}
        </span>
        <span className="text-xs font-bold text-slate-950 dark:text-white">
          {pinnedCount === 1 ? '1 Laptop Pinned' : `${pinnedCount} Laptops Pinned`}
        </span>
      </div>

      <div className="h-4 w-px bg-slate-300 dark:bg-slate-700" />

      <button
        onClick={onExpand}
        className="flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold bg-cyan-600 dark:bg-cyan-400 text-white dark:text-slate-950 hover:bg-cyan-700 transition-all"
      >
        <span>Compare Side-by-Side</span>
        <ChevronUp className="w-4 h-4" />
      </button>

      <button
        onClick={onClear}
        className="text-[11px] font-mono text-slate-500 hover:text-rose-500 transition-colors"
      >
        Clear
      </button>
    </div>
  );
};
