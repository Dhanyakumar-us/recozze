import React from 'react';
import { Zap, ShieldCheck, TrendingDown, Sparkles, SlidersHorizontal } from 'lucide-react';
import type { UserPreferences } from '../types/laptop';

interface HeroBannerProps {
  preferences: UserPreferences;
  onPreferenceChange: (updated: Partial<UserPreferences>) => void;
  onOpenSpecMatcher: () => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  preferences,
  onOpenSpecMatcher
}) => {
  const getTgpLabel = (tier: string) => {
    if (tier === 'thin_light') return 'Thin & Light (45W-50W)';
    if (tier === 'balanced') return 'High-Performance (90W-115W)';
    if (tier === 'unlocked') return 'Max Unlocked (140W-175W)';
    return 'All TGP Tiers';
  };

  return (
    <div className="relative overflow-hidden py-12 lg:py-16 px-4 lg:px-8 border-b border-slate-200/80 dark:border-slate-800 bg-slate-100/50 dark:bg-slate-950/50 transition-colors duration-500">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Editorial Headline */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-mono font-bold bg-cyan-500/15 border border-cyan-500/30 text-cyan-700 dark:text-cyan-300">
              <Sparkles className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
              <span>GPU TGP Verification & Price Forecasting Engine</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight text-slate-950 dark:text-white">
              Match True{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600 dark:from-cyan-400 dark:via-purple-400 dark:to-emerald-400">
                GPU TGP Wattage
              </span>{' '}
              & Predict Price Drops.
            </h1>

            <p className="text-base sm:text-lg text-slate-700 dark:text-slate-300 max-w-2xl font-medium leading-relaxed">
              Evaluating actual GPU power limits (140W–175W max TGP), thermal fan decibels, Cinebench R23 scores, and verified UNiDAYS student perks (₹ INR).
            </p>

            {/* Active Live Spec Filter Pills */}
            <div className="pt-2 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-widest font-mono text-slate-500 font-bold flex items-center gap-1.5">
                  <SlidersHorizontal className="w-3.5 h-3.5" />
                  Active Filter Parameters
                </span>
                <button
                  onClick={onOpenSpecMatcher}
                  className="flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold bg-cyan-600 dark:bg-cyan-500 text-white dark:text-slate-950 hover:bg-cyan-700 dark:hover:bg-cyan-400 transition-all active:scale-95 shadow-sm"
                >
                  <SlidersHorizontal className="w-3.5 h-3.5" />
                  <span>Tune Specs</span>
                </button>
              </div>

              <div className="flex flex-wrap gap-2 text-xs font-mono">
                <span className="px-3.5 py-1.5 rounded-full bg-white dark:bg-slate-900 border border-slate-300/80 dark:border-slate-800 text-slate-950 dark:text-slate-200 font-bold shadow-sm">
                  Workload: <span className="uppercase text-cyan-600 dark:text-cyan-400">{preferences.workload}</span>
                </span>
                <span className="px-3.5 py-1.5 rounded-full bg-white dark:bg-slate-900 border border-slate-300/80 dark:border-slate-800 text-emerald-600 dark:text-emerald-400 font-bold shadow-sm">
                  Max Budget: ₹{preferences.budgetMax.toLocaleString('en-IN')}
                </span>
                <span className="px-3.5 py-1.5 rounded-full bg-white dark:bg-slate-900 border border-slate-300/80 dark:border-slate-800 text-amber-600 dark:text-amber-400 font-bold flex items-center gap-1 shadow-sm">
                  <Zap className="w-3 h-3 text-amber-500 fill-amber-500" />
                  TGP Tier: {getTgpLabel(preferences.tgpTier)}
                </span>
                <span className="px-3.5 py-1.5 rounded-full bg-white dark:bg-slate-900 border border-slate-300/80 dark:border-slate-800 text-purple-600 dark:text-purple-400 font-bold shadow-sm">
                  Min RAM: {preferences.minRamGb} GB
                </span>
              </div>
            </div>
          </div>

          {/* Right Cards */}
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="glass-panel-interactive p-5 rounded-3xl">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2.5 rounded-2xl bg-amber-500/10 text-amber-500">
                  <Zap className="w-5 h-5 fill-amber-500" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-950 dark:text-white">GPU TGP Verification</h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">Up to 175W Unlocked Power</p>
                </div>
              </div>
              <p className="text-xs text-slate-700 dark:text-slate-300 font-medium">
                Filters low-power 45W discrete GPUs out of heavy gaming algorithms.
              </p>
            </div>

            <div className="glass-panel-interactive p-5 rounded-3xl">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2.5 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-950 dark:text-white">UNiDAYS Hub</h4>
                  <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold">Verified Instant Cashback</p>
                </div>
              </div>
              <p className="text-xs text-slate-700 dark:text-slate-300 font-medium">
                Calculates up to ₹12,000 student cashback and bundled free AirPods/mice.
              </p>
            </div>

            <div className="glass-panel-interactive p-5 rounded-3xl sm:col-span-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-2xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-400">
                    <TrendingDown className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-950 dark:text-white">Price Forecast Intelligence</h4>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">NAND & DRAM Market Signal</p>
                  </div>
                </div>
                <span className="px-3 py-1 rounded-full text-[11px] font-mono font-bold bg-cyan-500/15 border border-cyan-500/30 text-cyan-700 dark:text-cyan-300">
                  BUY vs WAIT
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
