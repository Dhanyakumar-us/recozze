import React from 'react';
import { Zap, GraduationCap, ChevronRight, Flame, Gauge, ExternalLink, Plus, Check } from 'lucide-react';
import type { Laptop } from '../types/laptop';

interface LaptopCardProps {
  laptop: Laptop;
  unidaysActive: boolean;
  isPinned: boolean;
  onTogglePin: (id: string) => void;
  onSelect: (laptop: Laptop) => void;
  index?: number;
}

export const LaptopCard: React.FC<LaptopCardProps> = ({
  laptop,
  unidaysActive,
  isPinned,
  onTogglePin,
  onSelect,
  index = 0
}) => {
  const displayPrice = unidaysActive ? laptop.studentPriceInr : laptop.currentBestPriceInr;
  const savings = laptop.msrpInr - displayPrice;
  const matchPct = laptop.calculatedMatchPct || 92.0;
  const rec = laptop.buyRecommendation;

  return (
    <div
      style={{ animationDelay: `${index * 80}ms` }}
      className="group relative glass-panel-interactive rounded-3xl overflow-hidden flex flex-col justify-between animate-slide-up"
    >
      
      {/* Top Banner Badges */}
      <div className="p-4 pb-0 flex items-start justify-between gap-2 relative z-10 font-mono">
        <div className="flex flex-wrap items-center gap-1.5">
          {/* TGP Wattage Badge */}
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-amber-100 dark:bg-amber-500/20 border border-amber-300 dark:border-amber-500/40 text-amber-900 dark:text-amber-300">
            <Zap className="w-3 h-3 text-amber-600 dark:text-amber-400 fill-amber-500" />
            {laptop.specs.tgpWatts}W TGP
          </span>

          {/* 10-Point Power Score */}
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-cyan-100 dark:bg-cyan-500/20 border border-cyan-300 dark:border-cyan-500/40 text-cyan-900 dark:text-cyan-300">
            <Gauge className="w-3 h-3 text-cyan-600 dark:text-cyan-400" />
            {laptop.powerRating10}/10
          </span>

          {/* Buy vs Wait Pill */}
          <span
            className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold border uppercase ${
              rec.status === 'BUY_NOW'
                ? 'bg-emerald-100 dark:bg-emerald-950/80 border-emerald-300 dark:border-emerald-500/40 text-emerald-900 dark:text-emerald-300'
                : 'bg-amber-100 dark:bg-amber-950/80 border-amber-300 dark:border-amber-500/40 text-amber-900 dark:text-amber-300'
            }`}
          >
            {rec.status === 'BUY_NOW' ? 'BUY NOW' : `WAIT (-${rec.projected_drop_pct}%)`}
          </span>
        </div>

        {/* Pin for Side-by-Side Compare */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onTogglePin(laptop.id);
          }}
          className={`p-2.5 rounded-full border transition-all duration-300 active:scale-95 ${
            isPinned
              ? 'bg-cyan-600 dark:bg-cyan-500 text-white dark:text-slate-950 border-cyan-600 dark:border-cyan-400 shadow-sm'
              : 'bg-white/90 dark:bg-slate-900 border-slate-300/80 dark:border-slate-800 text-slate-500 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400'
          }`}
          title={isPinned ? 'Remove from Compare Matrix' : 'Add to Compare Matrix (+)'}
        >
          {isPinned ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
        </button>
      </div>

      {/* Product Image & Match Score Ring */}
      <div className="relative px-6 py-4 cursor-pointer" onClick={() => onSelect(laptop)}>
        <div className="relative h-44 w-full flex items-center justify-center overflow-hidden rounded-2xl bg-slate-100 dark:bg-slate-950/60">
          <img
            src={laptop.image}
            alt={laptop.name}
            className="h-full w-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
          />
        </div>

        {/* Workload Match % Float */}
        <div className="absolute bottom-6 right-8 px-3.5 py-1 rounded-full bg-slate-950/90 dark:bg-slate-900/90 border border-slate-700 dark:border-cyan-500/60 backdrop-blur-md">
          <span className="text-[11px] font-mono font-bold text-white dark:text-cyan-300">
            {matchPct}% Match
          </span>
        </div>
      </div>

      {/* Card Details & Cinebench Stats */}
      <div className="p-5 pt-0 space-y-4 cursor-pointer" onClick={() => onSelect(laptop)}>
        <div>
          <span className="text-[11px] uppercase font-mono tracking-widest text-cyan-600 dark:text-cyan-400 font-semibold">
            {laptop.brand} • {laptop.category}
          </span>
          <h3 className="text-base font-bold text-slate-950 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-300 transition-colors line-clamp-1">
            {laptop.name}
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 line-clamp-1 font-medium">
            {laptop.specs.cpu} • {laptop.specs.gpu}
          </p>
        </div>

        {/* Specs Grid with Cinebench R23 */}
        <div className="grid grid-cols-2 gap-2 text-xs bg-slate-100/90 dark:bg-slate-900 p-3 rounded-2xl border border-slate-200/80 dark:border-slate-800 font-mono">
          <div>
            <span className="text-[10px] text-slate-500 block">RAM & Storage</span>
            <span className="font-bold text-slate-900 dark:text-slate-200">{laptop.specs.ramGb}GB | {laptop.specs.ssdStorageGb}GB</span>
          </div>
          <div>
            <span className="text-[10px] text-slate-500 block">Peak Surface Temp</span>
            <span className="font-bold text-amber-600 dark:text-amber-300 flex items-center gap-1">
              <Flame className="w-3 h-3 text-amber-500" />
              {laptop.cooling.maxSurfaceTempC}°C
            </span>
          </div>
          <div>
            <span className="text-[10px] text-slate-500 block">Cinebench R23</span>
            <span className="font-bold text-purple-600 dark:text-purple-300">{laptop.benchmarks.cinebenchR23Multi.toLocaleString()}</span>
          </div>
          <div>
            <span className="text-[10px] text-slate-500 block">Time Spy GPU</span>
            <span className="font-bold text-cyan-600 dark:text-cyan-400">{laptop.benchmarks.timeSpyGpu.toLocaleString()}</span>
          </div>
        </div>

        {/* Dynamic UNiDAYS Perks */}
        {unidaysActive ? (
          <div className="flex items-center gap-2 p-2.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-500/30 text-emerald-800 dark:text-emerald-300 text-xs">
            <GraduationCap className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
            <div className="line-clamp-1 text-[11px]">
              <span className="font-bold">₹{laptop.studentBenefits.cashbackInr.toLocaleString('en-IN')} Cashback</span> + {laptop.studentBenefits.bundledPerks[0]}
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-2 p-2.5 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 text-slate-500 dark:text-slate-400 text-xs font-mono">
            <span className="text-[11px] line-clamp-1">
              Standard Deal • Toggle UNiDAYS for student cashback
            </span>
          </div>
        )}

        {/* Dynamic Price Display & Direct Checkout */}
        <div className="pt-2 border-t border-slate-200/80 dark:border-slate-800 flex items-end justify-between gap-2">
          <div>
            {savings > 0 && (
              <span className="text-[11px] text-slate-400 line-through block font-mono">
                ₹{laptop.msrpInr.toLocaleString('en-IN')}
              </span>
            )}
            <div className="flex items-baseline gap-1.5">
              <span className="text-xl font-black text-slate-950 dark:text-white font-mono">
                ₹{displayPrice.toLocaleString('en-IN')}
              </span>
              {unidaysActive && savings > 0 && (
                <span className="text-[10px] font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-950/80 px-2 py-0.5 rounded-full border border-emerald-300 dark:border-emerald-500/30">
                  Save ₹{savings.toLocaleString('en-IN')}
                </span>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={laptop.retailerPrices.officialUrl}
              target="_blank"
              rel="noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="p-2.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors active:scale-95"
              title="Buy Direct from Official Store"
            >
              <ExternalLink className="w-4 h-4" />
            </a>

            <button
              onClick={() => onSelect(laptop)}
              className="flex items-center gap-1 px-4 py-2 rounded-full text-xs font-bold bg-cyan-600 dark:bg-cyan-500 text-white dark:text-slate-950 hover:bg-cyan-700 dark:hover:bg-cyan-400 transition-all active:scale-95 shadow-sm"
            >
              <span>Details</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

    </div>
  );
};
