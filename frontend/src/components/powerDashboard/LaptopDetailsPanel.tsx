import React from 'react';
import { Laptop as LaptopIcon } from 'lucide-react';
import type { Laptop } from '../../types/laptop';
import {
  getLaptopCpu,
  getLaptopGpu,
  getLaptopTgp,
  getLaptopRam,
  getLaptopSsd,
  getLaptopRefreshHz,
  getLaptopScreenSize,
  getLaptopResolution,
} from '../../utils/laptopUtils';

interface LaptopDetailsPanelProps {
  laptop: Laptop;
}

export const LaptopDetailsPanel: React.FC<LaptopDetailsPanelProps> = ({ laptop }) => {
  return (
    <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 backdrop-blur-xl space-y-4">
      <div className="flex items-center space-x-2">
        <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
          <LaptopIcon className="w-4 h-4" />
        </div>
        <div>
          <h3 className="text-xs font-mono font-bold tracking-wider text-slate-300 uppercase">
            LAPTOP HARDWARE SPECIFICATIONS
          </h3>
          <p className="text-[10px] text-slate-400 font-mono">System Hardware Record</p>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono text-xs">
        <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80">
          <span className="text-[10px] text-slate-500 uppercase block">Model Name</span>
          <span className="font-bold text-white line-clamp-1">{laptop.name}</span>
        </div>

        <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80">
          <span className="text-[10px] text-slate-500 uppercase block">Processor</span>
          <span className="font-bold text-cyan-400 line-clamp-1">{getLaptopCpu(laptop)}</span>
        </div>

        <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80">
          <span className="text-[10px] text-slate-500 uppercase block">Graphics Card</span>
          <span className="font-bold text-blue-400 line-clamp-1">
            {getLaptopGpu(laptop)} ({getLaptopTgp(laptop)}W TGP)
          </span>
        </div>

        <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80">
          <span className="text-[10px] text-slate-500 uppercase block">Memory & Storage</span>
          <span className="font-bold text-indigo-400 line-clamp-1">
            {getLaptopRam(laptop)}GB DDR5 / {getLaptopSsd(laptop)}GB SSD
          </span>
        </div>

        <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80">
          <span className="text-[10px] text-slate-500 uppercase block">Display Panel</span>
          <span className="font-bold text-slate-300 line-clamp-1">
            {getLaptopScreenSize(laptop)}" {getLaptopResolution(laptop)} ({getLaptopRefreshHz(laptop)}Hz)
          </span>
        </div>

        <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80">
          <span className="text-[10px] text-slate-500 uppercase block">Battery Capacity</span>
          <span className="font-bold text-emerald-400 line-clamp-1">
            {(laptop as any).battery_wh || (laptop as any).batteryWh || 80} Wh (
            {(laptop as any).battery_hours_real_world || (laptop as any).batteryHours || 6}h)
          </span>
        </div>

        <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80">
          <span className="text-[10px] text-slate-500 uppercase block">Weight / Chassis</span>
          <span className="font-bold text-slate-300 line-clamp-1">
            {(laptop as any).weight_kg || (laptop as any).weightKg || 2.1} kg
          </span>
        </div>

        <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80">
          <span className="text-[10px] text-slate-500 uppercase block">Operating System</span>
          <span className="font-bold text-cyan-300 line-clamp-1">Windows 11 Home 64-bit</span>
        </div>
      </div>
    </div>
  );
};
