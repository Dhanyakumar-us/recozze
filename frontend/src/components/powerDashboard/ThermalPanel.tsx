import React from 'react';
import { Thermometer } from 'lucide-react';
import type { ThermalData } from '../../types/systemMonitor';
import { MetricTooltip } from './MetricTooltip';

interface ThermalPanelProps {
  thermal: ThermalData;
}

export const ThermalPanel: React.FC<ThermalPanelProps> = ({ thermal }) => {
  const getStatusBadge = (status: ThermalData['status']) => {
    switch (status) {
      case 'CRITICAL':
        return 'bg-rose-500/20 text-rose-400 border-rose-500/40';
      case 'HIGH':
        return 'bg-amber-500/20 text-amber-400 border-amber-500/40';
      case 'WARM':
        return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/40';
      default:
        return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40';
    }
  };

  return (
    <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 backdrop-blur-xl space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="p-2 rounded-xl bg-rose-500/10 text-rose-400 border border-rose-500/20">
            <Thermometer className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center space-x-1">
              <h3 className="text-xs font-mono font-bold tracking-wider text-slate-300 uppercase">
                THERMAL MONITOR
              </h3>
              <MetricTooltip content="Simulated hardware temperatures and cooling architecture indicators." />
            </div>
            <p className="text-[10px] text-slate-400 font-mono">Ambient: {thermal.ambientTempC}°C</p>
          </div>
        </div>

        <span
          className={`px-3 py-0.5 rounded-full border text-[10px] font-mono font-bold tracking-wider uppercase ${getStatusBadge(
            thermal.status
          )}`}
        >
          {thermal.status}
        </span>
      </div>

      {/* CPU & GPU Temperature Progress Bars */}
      <div className="space-y-3 font-mono">
        <div>
          <div className="flex justify-between text-xs mb-1">
            <span className="text-slate-400">CPU Temperature</span>
            <span className="font-extrabold text-white">{thermal.cpuTempC}°C</span>
          </div>
          <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                thermal.cpuTempC > 80
                  ? 'bg-rose-500'
                  : thermal.cpuTempC > 70
                  ? 'bg-amber-500'
                  : 'bg-emerald-500'
              }`}
              style={{ width: `${Math.min(100, (thermal.cpuTempC / 100) * 100)}%` }}
            />
          </div>
        </div>

        <div>
          <div className="flex justify-between text-xs mb-1">
            <span className="text-slate-400">GPU Temperature</span>
            <span className="font-extrabold text-white">{thermal.gpuTempC}°C</span>
          </div>
          <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                thermal.gpuTempC > 80
                  ? 'bg-rose-500'
                  : thermal.gpuTempC > 70
                  ? 'bg-amber-500'
                  : 'bg-cyan-500'
              }`}
              style={{ width: `${Math.min(100, (thermal.gpuTempC / 100) * 100)}%` }}
            />
          </div>
        </div>
      </div>

      {/* Thermal Badges */}
      <div className="flex items-center space-x-2 pt-2 border-t border-slate-800/60 text-[10px] font-mono">
        {thermal.vaporChamber && (
          <span className="px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
            ✓ Vapor Chamber
          </span>
        )}
        {thermal.liquidMetal && (
          <span className="px-2 py-0.5 rounded bg-purple-500/10 text-purple-300 border border-purple-500/30">
            ✓ Liquid Metal
          </span>
        )}
        <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-400">
          Noise: {thermal.noiseLevelDb} dB
        </span>
      </div>
    </div>
  );
};
