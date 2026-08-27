import React, { useState } from 'react';
import { Layers, ChevronDown, ChevronUp } from 'lucide-react';
import type { RAMData } from '../../types/systemMonitor';
import { MetricTooltip } from './MetricTooltip';

interface RAMCardProps {
  ram: RAMData;
}

export const RAMCard: React.FC<RAMCardProps> = ({ ram }) => {
  const [expanded, setExpanded] = useState(false);
  const usedPct = Math.round((ram.usedGb / ram.totalGb) * 100);

  return (
    <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-indigo-500/40 transition-all duration-300 backdrop-blur-xl group">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 group-hover:scale-110 transition-transform">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center space-x-1.5">
              <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">
                SYSTEM MEMORY (RAM)
              </span>
              <MetricTooltip content="Simulated active system memory consumption across browser tabs, OS processes, and active applications." />
            </div>
            <h3 className="text-sm font-bold text-white font-display">
              {ram.totalGb} GB {ram.type}
            </h3>
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
          <span className="text-[10px] text-slate-400 uppercase">Used</span>
          <p className="text-base font-extrabold text-indigo-400">{ram.usedGb} GB</p>
        </div>
        <div>
          <span className="text-[10px] text-slate-400 uppercase">Available</span>
          <p className="text-base font-extrabold text-white">{ram.availableGb} GB</p>
        </div>
        <div>
          <span className="text-[10px] text-slate-400 uppercase">Speed</span>
          <p className="text-base font-extrabold text-slate-300">{ram.speedMHz} MHz</p>
        </div>
      </div>

      {/* Animated Usage Bar */}
      <div className="space-y-1">
        <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${usedPct}%` }}
          />
        </div>
      </div>

      {/* Expandable Technical Details */}
      {expanded && (
        <div className="mt-4 pt-3 border-t border-slate-800/80 space-y-2 text-xs font-mono text-slate-300 animate-in fade-in slide-in-from-top-2">
          <div className="flex justify-between py-1 border-b border-slate-800/40">
            <span className="text-slate-400">Total Installed Memory</span>
            <span className="font-bold text-indigo-400">{ram.totalGb} GB</span>
          </div>
          <div className="flex justify-between py-1 border-b border-slate-800/40">
            <span className="text-slate-400">Memory Utilization</span>
            <span className="font-bold">{usedPct}% ({ram.usedGb} GB)</span>
          </div>
          <div className="flex justify-between py-1 border-b border-slate-800/40">
            <span className="text-slate-400">Memory Bus Speed</span>
            <span className="font-bold text-cyan-400">{ram.speedMHz} MHz</span>
          </div>
          <div className="flex justify-between py-1">
            <span className="text-slate-400">Channel Architecture</span>
            <span className="font-bold">{ram.type}</span>
          </div>
        </div>
      )}
    </div>
  );
};
