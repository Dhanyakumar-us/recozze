import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Scale, ExternalLink, Trash2, Trophy, ArrowRight } from 'lucide-react';
import type { Laptop } from '../types/laptop';
import { formatPrice } from '../services/api';

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
  onClose,
}) => {
  if (laptops.length === 0) return null;

  const bestGpuLaptop = [...laptops].sort((a, b) => b.specs.tgpWatts - a.specs.tgpWatts)[0];
  const bestBatteryLaptop = [...laptops].sort((a, b) => b.specs.batteryHours - a.specs.batteryHours)[0];
  const bestValueLaptop = [...laptops].sort((a, b) => {
    const pA = unidaysActive ? a.studentPriceInr : a.currentBestPriceInr;
    const pB = unidaysActive ? b.studentPriceInr : b.currentBestPriceInr;
    return pA - pB;
  })[0];
  const bestStudentLaptop = [...laptops].sort((a, b) => b.studentBenefits.cashbackInr - a.studentBenefits.cashbackInr)[0];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative w-full max-w-6xl bg-[#0A0A0A] border border-white/10 rounded-3xl overflow-hidden shadow-2xl my-8 text-white"
        >
          {/* Header */}
          <div className="p-6 border-b border-white/10 flex items-center justify-between bg-[#050505]">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-2xl bg-blue-500/10 text-blue-400 border border-blue-500/30">
                <Scale className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-2xl font-black text-white">CHOOSE YOUR WINNER.</h2>
                <p className="text-xs text-slate-400">Comparing {laptops.length} selected models side-by-side</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={onClearAll}
                className="text-xs font-mono font-bold text-slate-400 hover:text-rose-400 transition-colors flex items-center gap-1 cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Clear All</span>
              </button>
              <button
                onClick={onClose}
                className="p-2 rounded-full bg-[#101010] text-slate-400 hover:text-white transition-colors border border-white/10 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="p-6 overflow-x-auto max-h-[75vh] space-y-8">
            <table className="w-full text-left border-collapse text-xs font-mono">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="p-3 w-44 text-slate-400 font-bold uppercase">Specifications</th>
                  {laptops.map((laptop) => (
                    <th key={laptop.id} className="p-3 min-w-[240px] align-top">
                      <div className="relative p-4 rounded-2xl bg-[#101010] border border-white/10 space-y-3">
                        <button
                          onClick={() => onRemovePin(laptop.id)}
                          className="absolute top-2 right-2 p-1 rounded-full bg-[#050505] text-slate-400 hover:text-rose-400"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>

                        <img src={laptop.image} alt={laptop.name} className="h-28 w-full object-contain rounded-xl" />
                        
                        <div>
                          <span className="text-[10px] uppercase font-bold text-blue-400 block">{laptop.brand}</span>
                          <h4 className="font-bold text-sm text-white line-clamp-1">{laptop.name}</h4>
                        </div>

                        <div className="text-base font-extrabold text-white">
                          {formatPrice(unidaysActive ? laptop.studentPriceInr : laptop.currentBestPriceInr)}
                        </div>

                        {/* Winner Indicators */}
                        <div className="space-y-1 pt-1">
                          {bestGpuLaptop?.id === laptop.id && (
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-500/10 text-blue-400 border border-blue-500/30">
                              <Trophy className="w-3 h-3" /> BEST PERFORMANCE ✓
                            </span>
                          )}
                          {bestValueLaptop?.id === laptop.id && (
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                              <Trophy className="w-3 h-3" /> BEST VALUE ✓
                            </span>
                          )}
                          {bestBatteryLaptop?.id === laptop.id && (
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                              <Trophy className="w-3 h-3" /> BEST BATTERY ✓
                            </span>
                          )}
                          {bestStudentLaptop?.id === laptop.id && (
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-purple-500/10 text-purple-400 border border-purple-500/30">
                              <Trophy className="w-3 h-3" /> BEST FOR STUDENTS ✓
                            </span>
                          )}
                        </div>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {/* Score */}
                <tr>
                  <td className="p-3 font-bold text-slate-400">RecoZee Score</td>
                  {laptops.map((l) => (
                    <td key={l.id} className="p-3 font-bold text-blue-400">{l.calculatedMatchPct || 94}% Match</td>
                  ))}
                </tr>
                {/* CPU */}
                <tr>
                  <td className="p-3 font-bold text-slate-400">CPU</td>
                  {laptops.map((l) => (
                    <td key={l.id} className="p-3 text-slate-200">{l.specs.cpu}</td>
                  ))}
                </tr>
                {/* GPU */}
                <tr>
                  <td className="p-3 font-bold text-slate-400">GPU & TGP</td>
                  {laptops.map((l) => (
                    <td key={l.id} className="p-3 font-bold text-blue-400">{l.specs.gpu} ({l.specs.tgpWatts}W)</td>
                  ))}
                </tr>
                {/* RAM */}
                <tr>
                  <td className="p-3 font-bold text-slate-400">RAM</td>
                  {laptops.map((l) => (
                    <td key={l.id} className="p-3 text-slate-200">{l.specs.ramGb}GB ({l.specs.ramType})</td>
                  ))}
                </tr>
                {/* SSD */}
                <tr>
                  <td className="p-3 font-bold text-slate-400">Storage</td>
                  {laptops.map((l) => (
                    <td key={l.id} className="p-3 text-slate-200">{l.specs.ssdStorageGb}GB SSD</td>
                  ))}
                </tr>
                {/* Display */}
                <tr>
                  <td className="p-3 font-bold text-slate-400">Display & Refresh</td>
                  {laptops.map((l) => (
                    <td key={l.id} className="p-3 text-slate-200">{l.specs.display.size_inches}" ({l.specs.display.refresh_rate_hz}Hz)</td>
                  ))}
                </tr>
                {/* Battery */}
                <tr>
                  <td className="p-3 font-bold text-slate-400">Battery Life</td>
                  {laptops.map((l) => (
                    <td key={l.id} className="p-3 text-emerald-400 font-bold">{l.specs.batteryHours} hrs</td>
                  ))}
                </tr>
                {/* Weight */}
                <tr>
                  <td className="p-3 font-bold text-slate-400">Weight</td>
                  {laptops.map((l) => (
                    <td key={l.id} className="p-3 text-slate-200">{l.specs.weightKg} kg</td>
                  ))}
                </tr>
                {/* Link */}
                <tr>
                  <td className="p-3 font-bold text-slate-400">Action</td>
                  {laptops.map((l) => (
                    <td key={l.id} className="p-3">
                      <a
                        href={l.retailerPrices.officialUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white transition-all"
                      >
                        <span>Store Link</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
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
  onClear,
}) => {
  if (pinnedCount === 0) return null;

  return (
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 50, opacity: 0 }}
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 bg-[#0A0A0A]/95 backdrop-blur-xl rounded-full px-6 py-3 border border-white/10 shadow-2xl flex items-center gap-4"
    >
      <div className="flex items-center gap-2">
        <span className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-600 text-white font-bold text-xs font-mono">
          {pinnedCount}
        </span>
        <span className="text-xs font-bold text-white font-mono uppercase tracking-wider">
          COMPARE ({pinnedCount})
        </span>
      </div>

      <div className="h-4 w-px bg-white/10" />

      <button
        onClick={onExpand}
        className="flex items-center gap-1.5 px-5 py-2 rounded-full text-xs font-extrabold bg-blue-600 hover:bg-blue-500 text-white transition-all shadow-md shadow-blue-600/30 cursor-pointer"
      >
        <span>COMPARE NOW</span>
        <ArrowRight className="w-3.5 h-3.5" />
      </button>

      <button
        onClick={onClear}
        className="text-xs font-mono text-slate-400 hover:text-rose-400 transition-colors cursor-pointer"
      >
        Clear all
      </button>
    </motion.div>
  );
};
