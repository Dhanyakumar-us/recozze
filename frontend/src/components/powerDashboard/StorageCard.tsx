import React, { useState } from 'react';
import { HardDrive, ChevronDown, ChevronUp } from 'lucide-react';
import type { StorageData } from '../../types/systemMonitor';
import { MetricTooltip } from './MetricTooltip';

interface StorageCardProps {
  storage: StorageData;
}

export const StorageCard: React.FC<StorageCardProps> = ({ storage }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-emerald-500/40 transition-all duration-300 backdrop-blur-xl group">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 group-hover:scale-110 transition-transform">
            <HardDrive className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center space-x-1.5">
              <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">
                PRIMARY STORAGE (SSD)
              </span>
              <MetricTooltip content="High-speed PCIe NVMe SSD drive capacity, simulated read/write throughput, and disk utilization." />
            </div>
            <h3 className="text-sm font-bold text-white font-display">
              {storage.capacityGb >= 1000
                ? `${storage.capacityGb / 1000} TB`
                : `${storage.capacityGb} GB`}{' '}
              {storage.type}
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
          <p className="text-base font-extrabold text-emerald-400">{storage.usedPct}%</p>
        </div>
        <div>
          <span className="text-[10px] text-slate-400 uppercase">Read</span>
          <p className="text-base font-extrabold text-white">{storage.readSpeedMBs} MB/s</p>
        </div>
        <div>
          <span className="text-[10px] text-slate-400 uppercase">Write</span>
          <p className="text-base font-extrabold text-slate-300">{storage.writeSpeedMBs} MB/s</p>
        </div>
      </div>

      {/* Animated Usage Bar */}
      <div className="space-y-1">
        <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${storage.usedPct}%` }}
          />
        </div>
      </div>

      {/* Expandable Technical Details */}
      {expanded && (
        <div className="mt-4 pt-3 border-t border-slate-800/80 space-y-2 text-xs font-mono text-slate-300 animate-in fade-in slide-in-from-top-2">
          <div className="flex justify-between py-1 border-b border-slate-800/40">
            <span className="text-slate-400">Drive Interface Type</span>
            <span className="font-bold text-emerald-400">{storage.type}</span>
          </div>
          <div className="flex justify-between py-1 border-b border-slate-800/40">
            <span className="text-slate-400">Disk Capacity</span>
            <span className="font-bold">{storage.capacityGb} GB</span>
          </div>
          <div className="flex justify-between py-1 border-b border-slate-800/40">
            <span className="text-slate-400">Max Sequential Read</span>
            <span className="font-bold text-cyan-400">{storage.readSpeedMBs} MB/s</span>
          </div>
          <div className="flex justify-between py-1">
            <span className="text-slate-400">Max Sequential Write</span>
            <span className="font-bold text-amber-400">{storage.writeSpeedMBs} MB/s</span>
          </div>
        </div>
      )}
    </div>
  );
};
