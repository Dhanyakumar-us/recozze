import React, { useState } from 'react';
import { Zap, ChevronDown, ChevronUp } from 'lucide-react';
import type { GPUData } from '../../types/systemMonitor';
import { MetricTooltip } from './MetricTooltip';

interface GPUCardProps {
  gpu: GPUData;
}

export const GPUCard: React.FC<GPUCardProps> = ({ gpu }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-blue-500/40 transition-all duration-300 backdrop-blur-xl group">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20 group-hover:scale-110 transition-transform">
            <Zap className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center space-x-1.5">
              <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">
                GPU GRAPHICS CARD
              </span>
              <MetricTooltip content="Percentage of simulated GPU workload and 3D graphics rendering hardware currently active." />
            </div>
            <h3 className="text-sm font-bold text-white font-display line-clamp-1">{gpu.model}</h3>
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
          <p className="text-base font-extrabold text-blue-400">{gpu.usagePct}%</p>
        </div>
        <div>
          <span className="text-[10px] text-slate-400 uppercase">Clock</span>
          <p className="text-base font-extrabold text-white">{gpu.clockGHz} GHz</p>
        </div>
        <div>
          <span className="text-[10px] text-slate-400 uppercase">VRAM</span>
          <p className="text-base font-extrabold text-slate-300">
            {gpu.vramUsedGb}/{gpu.vramTotalGb} GB
          </p>
        </div>
      </div>

      {/* Animated Usage Bar */}
      <div className="space-y-1">
        <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${gpu.usagePct}%` }}
          />
        </div>
      </div>

      {/* Expandable Technical Details */}
      {expanded && (
        <div className="mt-4 pt-3 border-t border-slate-800/80 space-y-2 text-xs font-mono text-slate-300 animate-in fade-in slide-in-from-top-2">
          <div className="flex justify-between py-1 border-b border-slate-800/40">
            <span className="text-slate-400">Architecture</span>
            <span className="font-bold text-blue-400">{gpu.arch}</span>
          </div>
          <div className="flex justify-between py-1 border-b border-slate-800/40">
            <span className="text-slate-400">Total Graphics Power (TGP)</span>
            <span className="font-bold text-cyan-400">{gpu.tgpWatts} W</span>
          </div>
          <div className="flex justify-between py-1 border-b border-slate-800/40">
            <span className="text-slate-400">Real-Time Power Draw</span>
            <span className="font-bold text-amber-400">{gpu.powerW} W</span>
          </div>
          <div className="flex justify-between py-1 border-b border-slate-800/40">
            <span className="text-slate-400">VRAM Allocation</span>
            <span className="font-bold">{gpu.vramTotalGb} GB GDDR6</span>
          </div>
          <div className="flex justify-between py-1">
            <span className="text-slate-400">GPU Core Temp</span>
            <span className="font-bold text-emerald-400">{gpu.tempC}°C</span>
          </div>
        </div>
      )}
    </div>
  );
};
