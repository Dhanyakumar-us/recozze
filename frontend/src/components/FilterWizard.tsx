import React from 'react';
import { SlidersHorizontal, Zap, GraduationCap, Gamepad2, Code, Laptop, Sparkles, RefreshCw, Briefcase, Battery, HardDrive } from 'lucide-react';
import type { UserPreferences, WorkloadType, TgpTierType } from '../types/laptop';

interface FilterWizardProps {
  preferences: UserPreferences;
  onPreferenceChange: (updated: Partial<UserPreferences>) => void;
  onResetFilters: () => void;
}

export const FilterWizard: React.FC<FilterWizardProps> = ({
  preferences,
  onPreferenceChange,
  onResetFilters
}) => {
  const workloads: { id: WorkloadType; label: string; desc: string; icon: React.ReactNode }[] = [
    { id: 'student', label: 'Student', desc: 'Battery & UNiDAYS Value', icon: <GraduationCap className="w-4 h-4 text-emerald-500" /> },
    { id: 'gaming', label: 'Esports & AAA Gaming', desc: 'Max TGP Wattage & High FPS', icon: <Gamepad2 className="w-4 h-4 text-[#415FFF]" /> },
    { id: 'coding', label: 'Coding & AI/ML', desc: 'VRAM & 32GB+ Memory', icon: <Code className="w-4 h-4 text-cyan-500" /> },
    { id: 'creator', label: 'Video Creator & 3D', desc: 'Color Gamut & Cinebench', icon: <Sparkles className="w-4 h-4 text-amber-500" /> },
    { id: 'business', label: 'Business & Office', desc: 'Slim & All-Day Battery', icon: <Briefcase className="w-4 h-4 text-rose-500" /> },
    { id: 'budget', label: 'Everyday Budget', desc: 'Reliability & Value', icon: <Laptop className="w-4 h-4 text-slate-400" /> }
  ];

  const tgpTiers: { id: TgpTierType; label: string; desc: string }[] = [
    { id: 'all', label: 'All Power Tiers', desc: 'Show all GPU configurations' },
    { id: 'thin_light', label: 'Thin & Light (45W–50W)', desc: 'Power efficient discrete GPUs' },
    { id: 'balanced', label: 'High-Performance (90W–115W)', desc: 'Balanced thermals & gaming FPS' },
    { id: 'unlocked', label: 'Max Unlocked (140W–175W)', desc: 'Maximum raw graphics performance' }
  ];

  return (
    <div className="glass-panel p-6 sm:p-8 rounded-3xl border-slate-200 dark:border-slate-800 space-y-6">
      <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-[#415FFF]/10 text-[#415FFF]">
            <SlidersHorizontal className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Smart Matcher & Granular Spec Controls</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">Configure workloads, GPU TGP power limits, RAM, SSD, and battery targets</p>
          </div>
        </div>

        <button
          onClick={onResetFilters}
          className="flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Reset Filters</span>
        </button>
      </div>

      {/* 1. Workload Category Cards */}
      <div className="space-y-3">
        <label className="text-xs uppercase tracking-wider font-mono text-slate-500 dark:text-slate-400 font-bold block">
          1. Select Target Workload Category
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {workloads.map((w) => {
            const isSelected = preferences.workload === w.id;
            return (
              <button
                key={w.id}
                onClick={() => onPreferenceChange({ workload: w.id })}
                className={`p-4 rounded-3xl border text-left transition-all duration-300 ${
                  isSelected
                    ? 'bg-[#415FFF] text-white border-[#415FFF] shadow-glow-iris'
                    : 'bg-slate-50 dark:bg-[#12141A] border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-[#415FFF]'
                }`}
              >
                <div className="flex items-center gap-2 mb-1.5">
                  {w.icon}
                  <span className="text-xs font-bold">{w.label}</span>
                </div>
                <p className="text-[10px] opacity-85 line-clamp-1">{w.desc}</p>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. GPU Class & TGP Power Selector */}
      <div className="space-y-3 pt-2 border-t border-slate-200 dark:border-slate-800">
        <span className="uppercase tracking-wider font-mono text-slate-500 dark:text-slate-400 font-bold text-xs flex items-center gap-2">
          <Zap className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
          2. GPU Class & TGP Power Tier (Wattage Allocation)
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {tgpTiers.map((tier) => {
            const active = preferences.tgpTier === tier.id;
            return (
              <button
                key={tier.id}
                onClick={() => onPreferenceChange({ tgpTier: tier.id })}
                className={`p-4 rounded-3xl border text-left transition-all duration-300 ${
                  active
                    ? 'bg-amber-50 dark:bg-amber-950/40 border-amber-500 text-amber-900 dark:text-amber-300 font-bold shadow-sm'
                    : 'bg-slate-50 dark:bg-[#12141A] border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-amber-400'
                }`}
              >
                <span className="text-xs font-bold block mb-0.5">{tier.label}</span>
                <span className="text-[10px] opacity-75 block">{tier.desc}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Budget Range Slider & RAM / SSD / Battery Controls */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start pt-2 border-t border-slate-200 dark:border-slate-800">
        {/* Rupee Budget Slider */}
        <div className="lg:col-span-6 space-y-3">
          <div className="flex justify-between items-center text-xs">
            <span className="uppercase tracking-wider font-mono text-slate-500 dark:text-slate-400 font-bold">
              3. Maximum Budget Limit
            </span>
            <span className="font-mono font-extrabold text-[#415FFF] text-base">
              ₹{preferences.budgetMax.toLocaleString('en-IN')}
            </span>
          </div>
          <input
            type="range"
            min={40000}
            max={350000}
            step={5000}
            value={preferences.budgetMax}
            onChange={(e) => onPreferenceChange({ budgetMax: Number(e.target.value) })}
            className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-[#415FFF]"
          />
          <div className="flex justify-between text-[10px] text-slate-400 font-mono">
            <span>₹40,000</span>
            <span>₹1,50,000</span>
            <span>₹2,50,000</span>
            <span>₹3,50,000+</span>
          </div>
        </div>

        {/* RAM, Storage, Battery Hardware Controls */}
        <div className="lg:col-span-6 space-y-4">
          {/* Min RAM */}
          <div className="space-y-1.5">
            <span className="uppercase tracking-wider font-mono text-slate-500 dark:text-slate-400 font-bold text-xs block">
              Minimum RAM Capacity
            </span>
            <div className="grid grid-cols-4 gap-2">
              {[8, 16, 32, 64].map((ram) => (
                <button
                  key={ram}
                  onClick={() => onPreferenceChange({ minRamGb: ram })}
                  className={`py-2 rounded-full text-xs font-mono font-bold border transition-all ${
                    preferences.minRamGb === ram
                      ? 'bg-[#415FFF] text-white border-[#415FFF] shadow-glow-iris'
                      : 'bg-slate-50 dark:bg-[#12141A] border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-[#415FFF]'
                  }`}
                >
                  {ram} GB
                </button>
              ))}
            </div>
          </div>

          {/* SSD Storage & Battery Target */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <span className="uppercase tracking-wider font-mono text-slate-500 dark:text-slate-400 font-bold text-[11px] flex items-center gap-1">
                <HardDrive className="w-3 h-3" />
                Min SSD Storage
              </span>
              <div className="grid grid-cols-3 gap-1 text-[11px]">
                {[512, 1024, 2048].map((ssd) => (
                  <button
                    key={ssd}
                    onClick={() => onPreferenceChange({ minSsdGb: ssd })}
                    className={`py-1.5 rounded-full font-mono font-bold border text-center transition-all ${
                      preferences.minSsdGb === ssd
                        ? 'bg-[#415FFF] text-white border-[#415FFF]'
                        : 'bg-slate-50 dark:bg-[#12141A] border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    {ssd >= 1024 ? `${ssd / 1024}TB` : `${ssd}GB`}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-1.5">
              <span className="uppercase tracking-wider font-mono text-slate-500 dark:text-slate-400 font-bold text-[11px] flex items-center gap-1">
                <Battery className="w-3 h-3" />
                Battery Target
              </span>
              <div className="grid grid-cols-3 gap-1 text-[11px]">
                {[4, 6, 9].map((hours) => (
                  <button
                    key={hours}
                    onClick={() => onPreferenceChange({ batteryTargetHours: hours })}
                    className={`py-1.5 rounded-full font-mono font-bold border text-center transition-all ${
                      preferences.batteryTargetHours === hours
                        ? 'bg-[#415FFF] text-white border-[#415FFF]'
                        : 'bg-slate-50 dark:bg-[#12141A] border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    {hours}+ hrs
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
