import React from 'react';
import { RefreshCw, Settings, Pause, Play, Zap } from 'lucide-react';
import type { PerformanceMode } from '../../types/systemMonitor';
import type { Laptop } from '../../types/laptop';

interface DashboardHeaderProps {
  laptop: Laptop;
  allLaptops: Laptop[];
  onSelectLaptop: (laptop: Laptop) => void;
  mode: PerformanceMode;
  onChangeMode: (mode: PerformanceMode) => void;
  lastUpdated: string;
  isPaused: boolean;
  onTogglePause: () => void;
  onRefresh: () => void;
  onOpenSettings: () => void;
}

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  laptop,
  allLaptops,
  onSelectLaptop,
  mode,
  onChangeMode,
  lastUpdated,
  isPaused,
  onTogglePause,
  onRefresh,
  onOpenSettings,
}) => {
  return (
    <header className="relative z-10 border-b border-cyan-500/20 bg-slate-950/80 backdrop-blur-xl px-4 sm:px-8 py-5">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        {/* Left Title & Status */}
        <div className="space-y-1">
          <div className="flex items-center space-x-3 flex-wrap gap-y-1">
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white font-display flex items-center space-x-2">
              <Zap className="w-6 h-6 text-cyan-400 fill-cyan-400/20 animate-pulse" />
              <span>LAPTOP POWER DASHBOARD</span>
            </h1>

            <div className="flex items-center space-x-2">
              <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-[10px] font-mono font-bold tracking-wider uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
                <span>● SIMULATED DATA</span>
              </span>

              <span className="text-xs text-slate-400 font-mono hidden sm:inline">
                Last Updated: {lastUpdated}
              </span>
            </div>
          </div>

          <p className="text-xs text-slate-400 font-mono flex items-center space-x-2">
            <span>Real-Time Performance Analyzer & Diagnostic Engine</span>
            <span>•</span>
            <span className="text-cyan-300 font-semibold">{laptop.name}</span>
          </p>
        </div>

        {/* Right Controls */}
        <div className="flex items-center space-x-2 sm:space-x-3 flex-wrap gap-y-2 w-full md:w-auto justify-start md:justify-end">
          {/* Laptop Switcher Dropdown */}
          <div className="relative">
            <select
              value={laptop.id}
              onChange={(e) => {
                const target = allLaptops.find((l) => l.id === e.target.value);
                if (target) onSelectLaptop(target);
              }}
              className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700 text-slate-200 text-xs font-mono focus:outline-none focus:border-cyan-500 cursor-pointer"
            >
              {allLaptops.map((l) => (
                <option key={l.id} value={l.id}>
                  {l.brand} — {l.name}
                </option>
              ))}
            </select>
          </div>

          {/* Performance Mode Selector */}
          <div className="flex items-center bg-slate-900 border border-slate-800 p-1 rounded-xl">
            {(['silent', 'balanced', 'performance', 'turbo'] as PerformanceMode[]).map((m) => (
              <button
                key={m}
                onClick={() => onChangeMode(m)}
                className={`px-3 py-1 rounded-lg text-xs font-mono font-bold uppercase transition-all cursor-pointer ${
                  mode === m
                    ? m === 'turbo'
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-pink-500/20'
                      : m === 'performance'
                      ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg shadow-cyan-500/20'
                      : m === 'silent'
                      ? 'bg-emerald-600 text-white'
                      : 'bg-cyan-500 text-slate-950 shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {m}
              </button>
            ))}
          </div>

          {/* Live Monitoring Pause/Play */}
          <button
            onClick={onTogglePause}
            title={isPaused ? 'Resume live metrics' : 'Pause live metrics'}
            className={`p-2 rounded-xl border transition-all cursor-pointer ${
              isPaused
                ? 'bg-amber-500/20 text-amber-400 border-amber-500/40'
                : 'bg-slate-900 text-slate-300 border-slate-800 hover:border-slate-700'
            }`}
          >
            {isPaused ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
          </button>

          {/* Refresh Button */}
          <button
            onClick={onRefresh}
            title="Refresh metrics & recalculate score"
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 text-cyan-300 text-xs font-mono font-bold transition-all cursor-pointer active:scale-95"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Refresh</span>
          </button>

          {/* Settings Modal Button */}
          <button
            onClick={onOpenSettings}
            title="Dashboard Settings"
            className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700 transition-all cursor-pointer"
          >
            <Settings className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};
