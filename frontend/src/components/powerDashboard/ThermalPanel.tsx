import React from 'react';
import { Thermometer, AlertCircle } from 'lucide-react';
import type { SpecDetails } from '../../services/powerDashboard';

interface ThermalPanelProps {
  specs: SpecDetails;
}

export const ThermalPanel: React.FC<ThermalPanelProps> = ({ specs }) => {
  const getBadgeColor = (rating: SpecDetails['thermalRating']) => {
    switch (rating) {
      case 'EXCELLENT':
        return 'bg-purple-500/20 text-purple-300 border-purple-500/40';
      case 'GOOD':
        return 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40';
      case 'AVERAGE':
        return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/40';
      default:
        return 'bg-slate-800 text-slate-400 border-slate-700';
    }
  };

  return (
    <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 backdrop-blur-xl space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="p-2 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
            <Thermometer className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-xs font-mono font-bold tracking-wider text-slate-300 uppercase">
              THERMAL PERFORMANCE
            </h3>
            <span className="text-[9px] text-cyan-400 font-mono block">
              ✓ Estimated from specifications
            </span>
          </div>
        </div>

        <span
          className={`px-3 py-0.5 rounded-full border text-[10px] font-mono font-bold tracking-wider uppercase ${getBadgeColor(
            specs.thermalRating
          )}`}
        >
          {specs.thermalRating === 'UNAVAILABLE' ? 'Thermal Data Unavailable' : `${specs.thermalRating} COOLING`}
        </span>
      </div>

      {specs.thermalRating !== 'UNAVAILABLE' ? (
        <div className="space-y-3 font-mono text-xs">
          <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 space-y-1">
            <span className="text-[10px] text-slate-400 uppercase font-bold block">
              COOLING ARCHITECTURE ESTIMATE
            </span>
            <p className="text-slate-200 font-sans text-xs">{specs.thermalDescription}</p>
          </div>

          {specs.coolingTech && (
            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 flex items-center justify-between">
              <span className="text-slate-400">Thermal Material / Chamber</span>
              <span className="font-bold text-cyan-300">{specs.coolingTech}</span>
            </div>
          )}
        </div>
      ) : (
        <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80 text-center font-mono text-xs text-slate-400 space-y-1">
          <AlertCircle className="w-5 h-5 text-slate-500 mx-auto" />
          <p>Detailed thermal specification data unavailable in dataset.</p>
        </div>
      )}
    </div>
  );
};
