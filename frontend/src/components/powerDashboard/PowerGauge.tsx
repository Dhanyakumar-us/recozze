import React, { useEffect, useState } from 'react';
import { Zap } from 'lucide-react';
import type { PowerScoreBreakdown } from '../../services/powerScore';
import { MetricTooltip } from './MetricTooltip';

interface PowerGaugeProps {
  breakdown: PowerScoreBreakdown;
}

export const PowerGauge: React.FC<PowerGaugeProps> = ({ breakdown }) => {
  const [animatedScore, setAnimatedScore] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = breakdown.overallScore;
    const duration = 1200; // ms
    const startTime = performance.now();

    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(1, elapsed / duration);
      const easeOut = 1 - Math.pow(1 - progress, 3);
      setAnimatedScore(Math.round(start + (end - start) * easeOut));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [breakdown.overallScore]);

  // Semicircular SVG math
  const radius = 110;
  const strokeWidth = 14;
  const circumference = Math.PI * radius; // 180 degree arc
  const strokeDashoffset = circumference - (animatedScore / 100) * circumference;

  const getGaugeColor = (score: number) => {
    if (score >= 90) return 'from-purple-500 via-pink-500 to-cyan-400';
    if (score >= 80) return 'from-cyan-500 via-blue-500 to-indigo-400';
    if (score >= 70) return 'from-emerald-400 via-teal-500 to-cyan-400';
    if (score >= 60) return 'from-amber-400 to-yellow-500';
    return 'from-red-500 to-rose-600';
  };

  return (
    <div className="relative flex flex-col items-center justify-center p-6 rounded-3xl bg-slate-900/60 border border-cyan-500/20 backdrop-blur-xl shadow-2xl">
      <div className="flex items-center space-x-2 text-xs font-mono font-bold tracking-widest text-slate-400 uppercase mb-2">
        <Zap className="w-4 h-4 text-cyan-400" />
        <span>OVERALL POWER SCORE</span>
        <MetricTooltip content="Combined performance score dynamically calculated from CPU (30%), GPU (30%), RAM (15%), Storage (10%), and Thermal Efficiency (15%)." />
      </div>

      {/* Semicircular SVG Gauge */}
      <div className="relative w-64 h-36 flex items-center justify-center overflow-hidden">
        <svg className="w-64 h-64 -rotate-180 transform" viewBox="0 0 260 260">
          {/* Background Track */}
          <path
            d="M 20,130 A 110,110 0 0,1 240,130"
            fill="none"
            stroke="rgba(30, 41, 59, 0.8)"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
          />

          {/* Animated Value Stroke */}
          <path
            d="M 20,130 A 110,110 0 0,1 240,130"
            fill="none"
            stroke="url(#powerGaugeGradient)"
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-300 ease-out"
          />

          <defs>
            <linearGradient id="powerGaugeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#06b6d4" />
              <stop offset="50%" stopColor="#3b82f6" />
              <stop offset="100%" stopColor="#a855f7" />
            </linearGradient>
          </defs>
        </svg>

        {/* Center Text Display */}
        <div className="absolute top-12 flex flex-col items-center justify-center text-center">
          <div className="flex items-baseline space-x-1">
            <span className="text-5xl font-black tracking-tight text-white font-display">
              {animatedScore}
            </span>
            <span className="text-xl font-bold text-cyan-400">%</span>
          </div>

          <span
            className={`mt-1 px-3 py-0.5 rounded-full text-xs font-mono font-black tracking-wider uppercase bg-gradient-to-r ${getGaugeColor(
              animatedScore
            )} text-white shadow-md`}
          >
            {breakdown.rating}
          </span>
        </div>
      </div>

      {/* Sub-Score Category Matrix Pills */}
      <div className="w-full grid grid-cols-5 gap-2 pt-4 border-t border-slate-800 text-center">
        <div>
          <span className="text-[10px] font-mono text-slate-400 uppercase">CPU</span>
          <p className="text-xs font-bold text-cyan-400 font-mono">{breakdown.cpuScore}</p>
        </div>
        <div>
          <span className="text-[10px] font-mono text-slate-400 uppercase">GPU</span>
          <p className="text-xs font-bold text-blue-400 font-mono">{breakdown.gpuScore}</p>
        </div>
        <div>
          <span className="text-[10px] font-mono text-slate-400 uppercase">RAM</span>
          <p className="text-xs font-bold text-indigo-400 font-mono">{breakdown.ramScore}</p>
        </div>
        <div>
          <span className="text-[10px] font-mono text-slate-400 uppercase">SSD</span>
          <p className="text-xs font-bold text-emerald-400 font-mono">{breakdown.storageScore}</p>
        </div>
        <div>
          <span className="text-[10px] font-mono text-slate-400 uppercase">COOL</span>
          <p className="text-xs font-bold text-purple-400 font-mono">{breakdown.thermalScore}</p>
        </div>
      </div>
    </div>
  );
};
