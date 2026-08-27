import React, { useState } from 'react';
import { Gamepad2, Code2, Video, Brain, Layers, ChevronDown, ChevronUp } from 'lucide-react';
import type { UseCaseScore } from '../../services/useCaseScore';

interface UseCasePanelProps {
  scores: UseCaseScore[];
}

const CATEGORY_ICONS = {
  Gaming: Gamepad2,
  Programming: Code2,
  'Video Editing': Video,
  'AI / ML': Brain,
  Multitasking: Layers,
};

export const UseCasePanel: React.FC<UseCasePanelProps> = ({ scores }) => {
  const [expandedCat, setExpandedCat] = useState<string | null>(null);

  const toggleExpand = (cat: string) => {
    setExpandedCat((prev) => (prev === cat ? null : cat));
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xs font-mono font-bold tracking-wider text-slate-300 uppercase">
          PERFORMANCE BY USE CASE
        </h2>
        <span className="text-[10px] font-mono text-cyan-400 font-bold uppercase">SCORES OUT OF 10</span>
      </div>

      <div className="space-y-3">
        {scores.map((item) => {
          const IconComponent = CATEGORY_ICONS[item.category] || Layers;
          const isExpanded = expandedCat === item.category;
          const scorePct = (item.score / 10) * 100;

          return (
            <div
              key={item.category}
              onClick={() => toggleExpand(item.category)}
              className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-cyan-500/40 transition-all duration-300 backdrop-blur-xl cursor-pointer group"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2 rounded-xl bg-slate-800 text-cyan-400 group-hover:bg-cyan-500/10 transition-colors">
                    <IconComponent className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white font-display">{item.category}</h3>
                    <p className="text-[10px] text-slate-400 font-mono">
                      Rating: <span className="text-cyan-400 font-bold">{item.rating}</span>
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-3 font-mono">
                  <div className="text-right">
                    <span className="text-base font-black text-white">{item.score}</span>
                    <span className="text-xs text-slate-500"> / 10</span>
                  </div>
                  <button className="p-1 rounded-lg text-slate-500 group-hover:text-slate-300">
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-full h-1.5 rounded-full bg-slate-800 mt-3 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500 rounded-full transition-all duration-500"
                  style={{ width: `${scorePct}%` }}
                />
              </div>

              {/* Formula & Detail Breakdown */}
              {isExpanded && (
                <div className="mt-4 pt-3 border-t border-slate-800/80 space-y-3 text-xs font-mono animate-in fade-in slide-in-from-top-2">
                  <div className="grid grid-cols-4 gap-1 text-center bg-slate-950/60 p-2 rounded-xl border border-slate-800">
                    <div>
                      <span className="text-[9px] text-slate-500 uppercase">GPU Weight</span>
                      <p className="font-bold text-blue-400">{item.gpuImpactPct}%</p>
                    </div>
                    <div>
                      <span className="text-[9px] text-slate-500 uppercase">CPU Weight</span>
                      <p className="font-bold text-cyan-400">{item.cpuImpactPct}%</p>
                    </div>
                    <div>
                      <span className="text-[9px] text-slate-500 uppercase">RAM Weight</span>
                      <p className="font-bold text-indigo-400">{item.ramImpactPct}%</p>
                    </div>
                    <div>
                      <span className="text-[9px] text-slate-500 uppercase">SSD Weight</span>
                      <p className="font-bold text-emerald-400">{item.storageImpactPct}%</p>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <span className="text-[10px] text-slate-400 uppercase tracking-wider font-bold">
                      SUITABLE WORKLOADS
                    </span>
                    <p className="text-slate-300 font-sans text-xs">{item.recommendedWorkload}</p>
                  </div>

                  <div className="space-y-1 pt-1 border-t border-slate-800/40">
                    <span className="text-[10px] text-slate-400 uppercase tracking-wider font-bold">
                      POTENTIAL LIMITATIONS
                    </span>
                    <p className="text-amber-400/90 font-sans text-xs">{item.limitations}</p>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
