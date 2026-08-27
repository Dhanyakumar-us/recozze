import React from 'react';
import { Zap, ArrowLeft, Scale, Bot, CheckCircle } from 'lucide-react';
import type { Laptop } from '../../types/laptop';

interface DashboardHeaderProps {
  laptop: Laptop;
  allLaptops: Laptop[];
  onSelectLaptop: (laptop: Laptop) => void;
  onBackToLaptop: () => void;
  onOpenCompare: () => void;
  onOpenChat: () => void;
}

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  laptop,
  allLaptops,
  onSelectLaptop,
  onBackToLaptop,
  onOpenCompare,
  onOpenChat,
}) => {
  return (
    <header className="relative z-10 border-b border-cyan-500/20 bg-slate-950/80 backdrop-blur-xl px-4 sm:px-8 py-5">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
        {/* Left Title & Status */}
        <div className="space-y-1">
          <div className="flex items-center space-x-3 flex-wrap gap-y-1">
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white font-display flex items-center space-x-2">
              <Zap className="w-6 h-6 text-cyan-400 fill-cyan-400/20" />
              <span>LAPTOP POWER DASHBOARD</span>
            </h1>

            <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-[10px] font-mono font-bold tracking-wider uppercase">
              <CheckCircle className="w-3 h-3 text-cyan-400" />
              <span>SPECIFICATION-BASED ANALYSIS</span>
            </span>
          </div>

          <p className="text-xs text-slate-400 font-mono flex items-center space-x-2">
            <span>Performance Analyzer</span>
            <span>•</span>
            <span className="text-cyan-300 font-semibold">{laptop.brand} {laptop.name}</span>
          </p>
        </div>

        {/* Right Controls */}
        <div className="flex items-center space-x-2 sm:space-x-3 flex-wrap gap-y-2 w-full lg:w-auto justify-start lg:justify-end">
          {/* Laptop Selector */}
          <select
            value={laptop.id}
            onChange={(e) => {
              const target = allLaptops.find((l) => l.id === e.target.value);
              if (target) onSelectLaptop(target);
            }}
            className="px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 text-xs font-mono focus:outline-none focus:border-cyan-500 cursor-pointer"
          >
            {allLaptops.map((l) => (
              <option key={l.id} value={l.id}>
                {l.brand} — {l.name}
              </option>
            ))}
          </select>

          {/* Back to Laptop Button */}
          <button
            onClick={onBackToLaptop}
            className="flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 text-xs font-mono font-bold transition-all cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Laptop</span>
          </button>

          {/* Compare Button */}
          <button
            onClick={onOpenCompare}
            className="flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-blue-600/20 border border-blue-500/40 text-blue-300 hover:bg-blue-600/30 text-xs font-mono font-bold transition-all cursor-pointer"
          >
            <Scale className="w-3.5 h-3.5" />
            <span>Compare</span>
          </button>

          {/* Ask Reco AI Button */}
          <button
            onClick={onOpenChat}
            className="flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-xs font-mono font-bold transition-all shadow-md shadow-purple-500/20 hover:scale-105 cursor-pointer"
          >
            <Bot className="w-3.5 h-3.5" />
            <span>Ask Reco AI</span>
          </button>
        </div>
      </div>
    </header>
  );
};
