import React from 'react';
import { Fan } from 'lucide-react';
import type { FanData } from '../../types/systemMonitor';
import { MetricTooltip } from './MetricTooltip';

interface FanSpeedPanelProps {
  fan: FanData;
}

export const FanSpeedPanel: React.FC<FanSpeedPanelProps> = ({ fan }) => {
  // Compute spin duration in seconds based on RPM (higher RPM = faster spin)
  const getSpinDuration = (rpm: number) => {
    if (rpm <= 0) return '0s';
    const duration = Math.max(0.2, 60 / (rpm / 60));
    return `${duration.toFixed(2)}s`;
  };

  return (
    <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 backdrop-blur-xl space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
            <Fan className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center space-x-1">
              <h3 className="text-xs font-mono font-bold tracking-wider text-slate-300 uppercase">
                COOLING SYSTEM
              </h3>
              <MetricTooltip content="Simulated cooling fan rotation speeds in RPM (Revolutions Per Minute)." />
            </div>
            <p className="text-[10px] text-slate-400 font-mono">Max: {fan.maxRpm} RPM</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 font-mono">
        {/* CPU Fan */}
        <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 flex items-center space-x-3">
          <div
            className="p-2 rounded-full bg-slate-900 text-cyan-400 border border-cyan-500/30"
            style={{
              animation: `spin ${getSpinDuration(fan.cpuFanRpm)} linear infinite`,
            }}
          >
            <Fan className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] text-slate-400 uppercase">CPU FAN</span>
            <p className="text-sm font-extrabold text-white">{fan.cpuFanRpm} RPM</p>
          </div>
        </div>

        {/* GPU Fan */}
        <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 flex items-center space-x-3">
          <div
            className="p-2 rounded-full bg-slate-900 text-blue-400 border border-blue-500/30"
            style={{
              animation: `spin ${getSpinDuration(fan.gpuFanRpm)} linear infinite`,
            }}
          >
            <Fan className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] text-slate-400 uppercase">GPU FAN</span>
            <p className="text-sm font-extrabold text-white">{fan.gpuFanRpm} RPM</p>
          </div>
        </div>
      </div>
    </div>
  );
};
