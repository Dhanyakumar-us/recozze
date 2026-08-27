import React, { useState } from 'react';
import { Cpu, ChevronDown, ChevronUp } from 'lucide-react';
import type { CPUData } from '../../types/systemMonitor';
import { MetricTooltip } from './MetricTooltip';

interface CPUCardProps {
  cpu: CPUData;
}

export const CPUCard: React.FC<CPUCardProps> = ({ cpu }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-cyan-500/40 transition-all duration-300 backdrop-blur-xl group">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 group-hover:scale-110 transition-transform">
            <Cpu className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center space-x-1.5">
              <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">
                CPU PROCESSOR
              </span>
              <MetricTooltip content="Percentage of simulated CPU workload currently being used by active processes." />
            </div>
            <h3 className="text-sm font-bold text-white font-display line-clamp-1">{cpu.model}</h3>
          </div>
        </div>

        <button
          onClick={() => setExpanded(!expanded)}
          className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
        >
          {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
      </div>

      {/* Main Metrics Grid */}
      <div className="grid grid-cols-3 gap-2 my-4 pt-3 border-t border-slate-800/60 text-center font-mono">
        <div>
          <span className="text-[10px] text-slate-400 uppercase">Usage</span>
          <p className="text-base font-extrabold text-cyan-400">{cpu.usagePct}%</p>
        </div>
        <div>
          <span className="text-[10px] text-slate-400 uppercase">Clock</span>
          <p className="text-base font-extrabold text-white">{cpu.clockGHz} GHz</p>
        </div>
        <div>
          <span className="text-[10px] text-slate-400 uppercase">Cores/Threads</span>
          <p className="text-base font-extrabold text-slate-300">{cpu.cores}/{cpu.threads}</p>
        </div>
      </div>

      {/* Animated Usage Bar */}
      <div className="space-y-1">
        <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${cpu.usagePct}%` }}
          />
        </div>
      </div>

      {/* Expandable Technical Details */}
      {expanded && (
        <div className="mt-4 pt-3 border-t border-slate-800/80 space-y-2 text-xs font-mono text-slate-300 animate-in fade-in slide-in-from-top-2">
          <div className="flex justify-between py-1 border-b border-slate-800/40">
            <span className="text-slate-400">Base Clock Speed</span>
            <span className="font-bold">{cpu.baseClockGHz} GHz</span>
          </div>
          <div className="flex justify-between py-1 border-b border-slate-800/40">
            <span className="text-slate-400">Max Boost Clock</span>
            <span className="font-bold text-cyan-400">{cpu.boostClockGHz} GHz</span>
          </div>
          <div className="flex justify-between py-1 border-b border-slate-800/40">
            <span className="text-slate-400">L3 Smart Cache</span>
            <span className="font-bold">{cpu.cacheMb} MB</span>
          </div>
          <div className="flex justify-between py-1 border-b border-slate-800/40">
            <span className="text-slate-400">Power Draw (TDP)</span>
            <span className="font-bold text-amber-400">{cpu.powerW} W</span>
          </div>
          <div className="flex justify-between py-1">
            <span className="text-slate-400">Core Temp</span>
            <span className="font-bold text-emerald-400">{cpu.tempC}°C</span>
          </div>
        </div>
      )}
    </div>
  );
};
