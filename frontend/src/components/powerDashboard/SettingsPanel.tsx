import React from 'react';
import { X, Settings, RotateCcw } from 'lucide-react';
import type { DashboardSettings } from '../../types/systemMonitor';

interface SettingsPanelProps {
  isOpen: boolean;
  onClose: () => void;
  settings: DashboardSettings;
  onUpdateSettings: (updated: Partial<DashboardSettings>) => void;
  onReset: () => void;
}

export const SettingsPanel: React.FC<SettingsPanelProps> = ({
  isOpen,
  onClose,
  settings,
  onUpdateSettings,
  onReset,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in">
      <div className="relative w-full max-w-md bg-slate-900 border border-cyan-500/30 rounded-3xl p-6 shadow-2xl space-y-6 font-mono text-xs">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center space-x-2">
            <Settings className="w-4 h-4 text-cyan-400" />
            <h3 className="text-sm font-bold text-white uppercase tracking-wider font-display">
              DASHBOARD SETTINGS
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Monitoring Interval */}
        <div className="space-y-2">
          <label className="text-slate-300 font-bold block">Monitoring Interval</label>
          <div className="grid grid-cols-4 gap-2">
            {[1000, 2000, 3000, 5000].map((ms) => (
              <button
                key={ms}
                onClick={() => onUpdateSettings({ intervalMs: ms })}
                className={`py-1.5 rounded-xl border text-center font-bold transition-all cursor-pointer ${
                  settings.intervalMs === ms
                    ? 'bg-cyan-500 text-slate-950 border-cyan-400 shadow-md'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                {ms / 1000}s
              </button>
            ))}
          </div>
        </div>

        {/* Animation Intensity */}
        <div className="space-y-2">
          <label className="text-slate-300 font-bold block">Animation Intensity</label>
          <div className="grid grid-cols-3 gap-2">
            {(['low', 'medium', 'high'] as const).map((level) => (
              <button
                key={level}
                onClick={() => onUpdateSettings({ animationIntensity: level })}
                className={`py-1.5 rounded-xl border text-center font-bold uppercase transition-all cursor-pointer ${
                  settings.animationIntensity === level
                    ? 'bg-blue-600 text-white border-blue-500 shadow-md'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                {level}
              </button>
            ))}
          </div>
        </div>

        {/* Toggles */}
        <div className="space-y-3 pt-2 border-t border-slate-800/80">
          <label className="flex items-center justify-between cursor-pointer">
            <span className="text-slate-300">Show Simulated Data Badge</span>
            <input
              type="checkbox"
              checked={settings.showSimulatedDataBadge}
              onChange={(e) => onUpdateSettings({ showSimulatedDataBadge: e.target.checked })}
              className="accent-cyan-400 w-4 h-4 rounded cursor-pointer"
            />
          </label>

          <label className="flex items-center justify-between cursor-pointer">
            <span className="text-slate-300">Reduced Motion Mode</span>
            <input
              type="checkbox"
              checked={settings.reducedMotion}
              onChange={(e) => onUpdateSettings({ reducedMotion: e.target.checked })}
              className="accent-cyan-400 w-4 h-4 rounded cursor-pointer"
            />
          </label>
        </div>

        {/* Reset Dashboard */}
        <div className="pt-4 border-t border-slate-800 flex justify-between items-center">
          <button
            onClick={onReset}
            className="flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 hover:bg-rose-500/20 text-xs font-bold transition-all cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Dashboard</span>
          </button>

          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition-all cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
