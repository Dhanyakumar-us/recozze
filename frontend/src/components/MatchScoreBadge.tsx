import React from 'react';
import { motion } from 'framer-motion';
import type { MatchBreakdown } from '../types/laptop';

interface MatchScoreBadgeProps {
  score: number;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
}

export const getScoreConfig = (score: number) => {
  if (score >= 90) {
    return {
      label: 'Excellent Match',
      badgeBg: 'bg-blue-500/10 border-blue-500/30 text-blue-400',
      ringColor: '#3B82F6',
      textColor: 'text-blue-400',
    };
  } else if (score >= 80) {
    return {
      label: 'Great Match',
      badgeBg: 'bg-cyan-500/10 border-cyan-500/30 text-cyan-400',
      ringColor: '#06B6D4',
      textColor: 'text-cyan-400',
    };
  } else if (score >= 70) {
    return {
      label: 'Good Match',
      badgeBg: 'bg-amber-500/10 border-amber-500/30 text-amber-400',
      ringColor: '#F59E0B',
      textColor: 'text-amber-400',
    };
  } else {
    return {
      label: 'Consider Alternatives',
      badgeBg: 'bg-rose-500/10 border-rose-500/30 text-rose-400',
      ringColor: '#F43F5E',
      textColor: 'text-rose-400',
    };
  }
};

export const MatchScoreBadge: React.FC<MatchScoreBadgeProps> = ({
  score,
  size = 'md',
  showLabel = true,
}) => {
  const config = getScoreConfig(score);

  if (size === 'sm') {
    return (
      <span className={`px-2.5 py-1 rounded-full text-xs font-mono font-bold border ${config.badgeBg}`}>
        {score}% {showLabel && config.label}
      </span>
    );
  }

  const strokeWidth = size === 'lg' ? 8 : 6;
  const radius = size === 'lg' ? 44 : 26;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div className="flex items-center gap-4">
      <div className="relative flex items-center justify-center">
        <svg
          className={size === 'lg' ? 'w-28 h-28' : 'w-16 h-16'}
          viewBox="0 0 100 100"
        >
          <circle
            cx="50"
            cy="50"
            r={radius}
            className="stroke-slate-900"
            strokeWidth={strokeWidth}
            fill="transparent"
          />
          <motion.circle
            cx="50"
            cy="50"
            r={radius}
            stroke={config.ringColor}
            strokeWidth={strokeWidth}
            fill="transparent"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            strokeLinecap="round"
            transform="rotate(-90 50 50)"
          />
        </svg>
        <span className={`absolute font-mono font-extrabold text-white ${size === 'lg' ? 'text-2xl' : 'text-xs'}`}>
          {score}%
        </span>
      </div>

      {showLabel && (
        <div>
          <span className={`text-xs font-mono font-bold uppercase tracking-wider block ${config.textColor}`}>
            {config.label}
          </span>
          <span className="text-[11px] text-slate-400">RecoZee Match Engine</span>
        </div>
      )}
    </div>
  );
};

interface MatchBreakdownCardProps {
  score: number;
  breakdown?: MatchBreakdown;
  laptopName: string;
}

export const MatchBreakdownCard: React.FC<MatchBreakdownCardProps> = ({
  score,
  breakdown,
  laptopName,
}) => {
  const defaultBars = [
    { label: 'PERFORMANCE', value: Math.min(100, score + 2) },
    { label: 'VALUE', value: Math.min(100, score - 3) },
    { label: 'DISPLAY', value: Math.min(100, score) },
    { label: 'BATTERY', value: Math.max(70, score - 12) },
    { label: 'PORTABILITY', value: Math.max(68, score - 16) },
  ];

  const bars = breakdown
    ? [
        { label: 'PERFORMANCE', value: breakdown.performance },
        { label: 'VALUE', value: breakdown.budget },
        { label: 'DISPLAY', value: breakdown.display },
        { label: 'BATTERY', value: breakdown.battery },
        { label: 'PORTABILITY', value: breakdown.portability },
      ]
    : defaultBars;

  return (
    <div className="p-8 rounded-3xl bg-[#0A0A0A] border border-white/10 space-y-6 shadow-2xl">
      
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <span className="text-xs font-mono font-bold uppercase text-blue-400 tracking-widest block mb-1">
            TOP RECOMMENDATION
          </span>
          <h3 className="text-xl font-black text-white">{laptopName}</h3>
          <p className="text-xs text-slate-400">We found your match.</p>
        </div>

        <MatchScoreBadge score={score} size="lg" showLabel={false} />
      </div>

      {/* Spec Breakdown Progress Bars */}
      <div className="space-y-4 font-mono text-xs">
        {bars.map((bar) => (
          <div key={bar.label} className="space-y-1.5">
            <div className="flex justify-between items-center text-slate-300">
              <span className="font-bold tracking-wider">{bar.label}</span>
              <span className="font-bold text-blue-400">{bar.value}%</span>
            </div>
            <div className="w-full h-2.5 bg-[#101010] rounded-full overflow-hidden border border-white/5">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${bar.value}%` }}
                transition={{ duration: 1, ease: 'easeOut' }}
                className="h-full bg-blue-500 rounded-full"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
